# Mandalart Web – TECH_REFERENCE (v1.1)

_Last updated: 2025-12-18 (KST)_

---

## 1) Overview

이 문서는 **Mandalart Web 프로젝트의 기술 구현 세부 사항**을 정의한다.  
PRD.md에서 정의한 요구사항을 기술적으로 실현하기 위한 기준이며,  
코드 자동 생성 및 유지보수 시 참조되는 최상위 기술 명세다.

---

## 2) Environment & Toolchain

| 항목                | 내용                                                      |
| ------------------- | --------------------------------------------------------- |
| **Framework**       | Next.js (App Router, v16.0.1), React (v19.2.0)            |
| **Language**        | TypeScript (v5.x)                                         |
| **Package Manager** | pnpm (v10.18.2)                                           |
| **Database**        | Supabase (PostgreSQL 15)                                  |
| **ORM**             | Prisma (v5.x)                                             |
| **Styling/UI**      | TailwindCSS (v4), shadcn/ui                               |
| **State/Data**      | TanStack Query (v5.90.8), Zustand (v5.0.8), Zod (v4.1.12) |
| **Form**            | react-hook-form (v7.66.0) + zodResolver (v5.2.2)          |
| **Testing**         | Jest + Playwright + MSW                                   |
| **Lint/Format**     | Biome + ESLint(next) + Prettier                           |
| **CI/CD**           | GitHub Actions + Vercel Preview Deploy                    |
| **Timezone**        | Asia/Seoul (KST)                                          |
| **Font**            | Pretendard Variable (woff2)                               |

---

## 3) Database Schema (Supabase / Postgres)

### 3.1 DDL (SQL)

```sql
-- profiles
create table if not exists profiles (
	id uuid primary key references auth.users(id) on delete cascade,
	display_name text,
	created_at timestamptz default now()
);

-- boards
create table if not exists boards (
	id uuid primary key default gen_random_uuid(),
	owner_id uuid not null references profiles(id) on delete cascade,
	title text not null,
	description text,
	is_public boolean default false,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

-- cells
create table if not exists cells (
	id uuid primary key default gen_random_uuid(),
	board_id uuid not null references boards(id) on delete cascade,
	idx smallint not null check (idx between 0 and 8),
	title text not null,
	note text,
	child_board_id uuid references boards(id) on delete set null,
	created_at timestamptz default now(),
	updated_at timestamptz default now(),
	unique (board_id, idx)
);

-- tasks
create table if not exists tasks (
	id uuid primary key default gen_random_uuid(),
	cell_id uuid not null references cells(id) on delete cascade,
	content text not null,
	is_done boolean default false,
	done_at timestamptz,
	sort_order integer default 0,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

-- events
create table if not exists events (
	id bigserial primary key,
	user_id uuid not null references profiles(id) on delete cascade,
	board_id uuid references boards(id) on delete set null,
	cell_id uuid references cells(id) on delete set null,
	task_id uuid references tasks(id) on delete set null,
	type text not null check (type in ('task_done','task_undone','board_created')),
	created_at timestamptz default now()
);
```

---

### 3.2 Indexes (성능 최적화)

```sql
-- boards
create index if not exists idx_boards_owner_id on boards(owner_id);
create index if not exists idx_boards_updated_at on boards(updated_at desc);

-- cells
create index if not exists idx_cells_board_id on cells(board_id);
create index if not exists idx_cells_child_board_id on cells(child_board_id);

-- tasks
create index if not exists idx_tasks_cell_id on tasks(cell_id);
create index if not exists idx_tasks_done_at on tasks(done_at);
create index if not exists idx_tasks_sort_order on tasks(sort_order);

-- events
create index if not exists idx_events_user_id on events(user_id);
create index if not exists idx_events_created_at on events(created_at desc);
create index if not exists idx_events_type on events(type);
```

> ✅ **설명:**
>
> - `owner_id`, `board_id`, `cell_id`는 모든 데이터 접근의 기본 필터 기준이므로 인덱싱 필수
> - `updated_at`, `done_at`, `created_at` 인덱스로 정렬 성능 향상
> - `events`는 월별 집계 쿼리를 고려해 `(user_id, created_at)` 복합 인덱스도 추가 가능

---

## 4) Row Level Security (RLS)

```sql
alter table profiles enable row level security;
alter table boards enable row level security;
alter table cells enable row level security;
alter table tasks enable row level security;
alter table events enable row level security;

-- profiles: 본인만 접근
create policy profiles_self on profiles
	for all using (id = auth.uid()) with check (id = auth.uid());

-- boards: 소유자만 접근, 공개 보드는 읽기 허용
create policy boards_owner_rw on boards
	for all using (owner_id = auth.uid())
	with check (owner_id = auth.uid());

create policy boards_public_r on boards
	for select using (is_public = true);

-- cells/tasks: 소유자만 접근
create policy cells_owner on cells
	for all using (
		exists (select 1 from boards b where b.id = board_id and b.owner_id = auth.uid())
	)
	with check (
		exists (select 1 from boards b where b.id = board_id and b.owner_id = auth.uid())
	);

create policy tasks_owner on tasks
	for all using (
		exists (
			select 1 from cells c join boards b on b.id = c.board_id
			where c.id = cell_id and b.owner_id = auth.uid()
		)
	)
	with check (
		exists (
			select 1 from cells c join boards b on b.id = c.board_id
			where c.id = cell_id and b.owner_id = auth.uid()
		)
	);

-- events: 본인만 접근
create policy events_owner on events
	for all using (user_id = auth.uid()) with check (user_id = auth.uid());
```

---

## 5) Queries & Data Fetching

### 5.1 대시보드 월별 완료 수

```sql
select
	 to_char((created_at at time zone 'Asia/Seoul')::date, 'YYYY-MM') as ym,
	 count(*) as done_count
from events
where user_id = auth.uid()
	and type = 'task_done'
	and created_at >= date_trunc('month', now() - interval '11 months')
	and created_at <= now()
group by ym
order by ym;
```

### 5.2 보드별 진행률

```sql
select
	b.id,
	b.title,
	coalesce(sum(case when t.is_done then 1 else 0 end)::float / nullif(count(t.id), 0), 0) as progress
from boards b
left join cells c on c.board_id = b.id
left join tasks t on t.cell_id = c.id
where b.owner_id = auth.uid()
group by b.id, b.title
order by b.updated_at desc;
```

---

## 6) Prisma 설정 및 사용 정책 (Prisma Setup & Usage Policy)

- **Prisma Client는** `shared/lib/prisma/client.ts` 에서 단일 인스턴스로 초기화한다.
- **모든 서버 사이드 데이터베이스 접근은 Prisma를 통해서만 수행한다.**
- **클라이언트 사이드에서의 직접적인 DB 접근은 허용하지 않는다.**
- **Supabase의 역할은 다음으로 한정한다:**
  - 인증(Auth)
  - 스토리지(Storage)
  - Row Level Security(RLS) 기반 인가(Authorization) 강제

> Prisma는 애플리케이션 레벨의 데이터 접근 표준을 제공하며,  
> Supabase RLS는 데이터베이스 레벨에서 최종적인 보안 경계를 담당한다.

---

## 7) Repository Layer (예시)

```ts
// repositories/boardRepository.ts

import { prisma } from "@/lib/prisma";

export const boardRepository = {
  async listBoards(userId: string) {
    return prisma.board.findMany({
      where: { ownerId: userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        updatedAt: true,
      },
    });
  },

  async createBoard(userId: string, input: { title: string; description?: string }) {
    return prisma.board.create({
      data: {
        ownerId: userId,
        ...input,
      },
      select: { id: true, title: true, description: true },
    });
  },

  async getBoard(userId: string, id: string) {
    return prisma.board.findFirst({
      where: { id, ownerId: userId },
      include: {
        cells: {
          include: { tasks: true },
        },
      },
    });
  },
};
```

> ✅ Reference
>
> - Prisma는 서버 사이드의 주요 데이터 접근 레이어로 사용된다.
> - Supabase의 RLS(Row Level Security)는 데이터베이스 레벨에서 계속 적용된다.
> - 이 Repository 구조는 향후 NestJS로 이전 시에도 재사용 가능하도록 설계되었다.

---

## 8) TanStack Query Keys

```ts
export const queryKeys = {
  boards: ["boards"] as const,
  board: (id: string) => ["board", id] as const,
  cells: (boardId: string) => ["board", boardId, "cells"] as const,
  tasks: (cellId: string) => ["cell", cellId, "tasks"] as const,
};
```

> 계층 구조 배열을 사용하여 `invalidateQueries(['board', id])` 시 관련 캐시를 일괄 무효화 가능.

---

## 9) API 예시 (Server Action)

```ts
"use server";

import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function toggleTaskDone(id: string, next: boolean) {
  const user = await getUser();

  await prisma.$transaction([
    prisma.task.update({
      where: { id },
      data: {
        isDone: next,
        doneAt: next ? new Date() : null,
      },
    }),
    prisma.event.create({
      data: {
        userId: user.id,
        taskId: id,
        type: next ? "task_done" : "task_undone",
      },
    }),
  ]);
}
```

> - 모든 데이터 변경(mutation)은 서버에서만 실행된다.
> - 인가(Authorization)는 Supabase RLS에 의해 최종적으로 검증된다.
> - Prisma는 관계 처리 및 트랜잭션 무결성을 담당한다.

---

## 10) Validation (Zod Schemas)

```ts
export const BoardSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
});

export const CellSchema = z.object({
  title: z.string().min(1).max(40),
  note: z.string().max(200).optional(),
});

export const TaskSchema = z.object({
  content: z.string().min(1).max(80),
});
```

---

## 11) Testing Reference

### 11.1 Jest Config (package.json)

```json
{
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.ts"],
    "coveragePathIgnorePatterns": ["/node_modules/", "/.next/"]
  }
}
```

### 11.2 E2E (Playwright)

```bash
pnpm exec playwright install --with-deps
pnpm exec playwright test --reporter=line
```

> 실행 시 자동으로 `trace.zip` 및 스크린샷 저장.  
> `playwright.config.ts` 내 baseURL = `http://localhost:3000`

---

## 12) Lint & Format

### 12.1 Biome 설정 (`biome.json`)

```json
{
  "formatter": { "indentStyle": "space", "lineWidth": 100 },
  "linter": {
    "rules": {
      "style/noUnusedVars": "error",
      "performance/noUnnecessaryAwait": "warn"
    }
  }
}
```

### 12.2 ESLint 확장

```js
extends: [
	"next/core-web-vitals",
	"plugin:@tanstack/eslint-plugin-query/recommended"
]
```

---

## 13) CI / CD (GitHub Actions)

```yaml
name: CI

on:
	pull_request:
		branches: [main, dev]

jobs:
	build-and-test:
		runs-on: ubuntu-latest

	steps:
		- uses: actions/checkout@v4
		- uses: pnpm/action-setup@v2
			with:
				version: 9
		- run: pnpm install
		- run: pnpm biome check
		- run: pnpm next lint
		- run: pnpm test --runInBand --coverage
		- run: pnpm exec playwright test --reporter=line
```

---

## 14) Version Matrix

| 항목           | 버전    | 비고                      |
| -------------- | ------- | ------------------------- |
| Node.js        | 22.14.0 | Vercel 기본 환경          |
| Next.js        | 16.0.1  | App Router                |
| TypeScript     | 5.x     | Strict Mode               |
| Supabase-js    | 2.x     | RLS 및 Edge Function 대응 |
| TailwindCSS    | 4       | JIT                       |
| shadcn/ui      | Latest  | CLI 설치                  |
| TanStack Query | 5.90.8  | Suspense 대응             |
| Zustand        | 5.0.8   | Middleware 포함           |
| Zod            | 4.1.12  | react-hook-form 연동      |
| Biome          | 2.2.0   | ESLint 대체               |
| Jest           | 30.2.0  | SWC 기반                  |
| Playwright     | 1.56.1  | Chromium/Firefox/WebKit   |
| pnpm           | 10.18.2 | monorepo 대응             |

---

✅ **요약:**  
이 문서는 Mandalart Web의 기술 사양과 구현 기준을 정의한다.  
PRD.md는 제품 요구 정의, 본 문서는 실제 개발 기준이다.  
인덱스, RLS, Repository 구조, 테스트 설정 등은 모두 여기 기준으로 유지·관리한다.
