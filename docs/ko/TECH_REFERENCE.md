# Mandalart Web – TECH_REFERENCE (v1.2)

_Last updated: 2026-03-12 (KST)_

---

## 1) 개요

이 문서는 **Mandalart Web 프로젝트의 기술 구현 세부 사항**을 정의한다.
`PRD.md`에서 정의한 요구사항을 실제로 구현하기 위한 기술적 기준이며,
코드 생성과 유지보수 시 참조하는 최상위 기술 명세다.

---

## 2) 환경 & 툴체인

| 항목                | 내용                                                       |
| ------------------- | ---------------------------------------------------------- |
| **Framework**       | Next.js (App Router, v16.0.10), React (v19.2.1)            |
| **Language**        | TypeScript (v5.x)                                          |
| **Package Manager** | pnpm (v10.18.2)                                            |
| **Database**        | Supabase (PostgreSQL 15)                                   |
| **ORM**             | Prisma (v7.3.0)                                            |
| **Styling/UI**      | TailwindCSS (v4), shadcn/ui                                |
| **State/Data**      | TanStack Query (v5.90.20), Zustand (v5.0.11), Zod (v4.3.6) |
| **Form**            | react-hook-form (v7.71.1) + zodResolver (v5.2.2)           |
| **Testing**         | Jest + Playwright + MSW                                    |
| **Lint/Format**     | Biome + ESLint(next) + Prettier                            |
| **CI/CD**           | GitHub Actions + Vercel Preview Deploy                     |
| **Timezone**        | Asia/Seoul (KST)                                           |
| **Font**            | Pretendard Variable (woff2)                                |

---

## 3) 데이터베이스 스키마 (Supabase / Postgres)

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

### 3.2 인덱스 (성능 최적화)

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

> ✅ **메모:**
>
> - `owner_id`, `board_id`, `cell_id`는 모든 쿼리의 핵심 필터 키이므로 인덱싱이 필요하다.
> - `updated_at`, `done_at`, `created_at` 인덱스는 정렬 성능을 높인다.
> - `events`는 월별 집계 쿼리를 위해 이후 `(user_id, created_at)` 복합 인덱스를 추가할 수 있다.

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

## 5) 쿼리 & 데이터 조회

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

## 6) Prisma 설정 및 사용 정책

- Prisma Client는 `prisma/schema.prisma`로부터 생성되며 출력 위치는 `src/generated/prisma`다.
- Prisma는 **모든 애플리케이션 레벨 서버 사이드 데이터베이스 접근**에 사용한다.
- 클라이언트 사이드의 직접적인 DB 접근은 금지한다.
- Supabase는 다음을 담당한다.
  - Auth/세션 처리
  - Storage
  - RLS 강제

> Prisma는 서버 사이드의 주요 데이터 접근 계층으로 사용한다.
> Supabase RLS는 데이터베이스 레벨에서 적용된다.

### 경계 규칙

- 조회는 Server Component 또는 다른 server-only 모듈에서 수행하는 것을 우선한다.
- 내부 create/update/delete 흐름에는 Server Action을 우선한다.
- Route Handler는 기본 내부 CRUD 경계가 아니며, public API, webhook, 외부 callback에 한정한다.
- repository/adapter layer는 명시적인 경계 가치가 있을 때만 도입한다.

---

## 7) 애플리케이션 데이터 경계 패턴

기본 애플리케이션 패턴:

- 데이터 조회는 Server Component 또는 server-only 모듈에서 수행한다.
- 쓰기는 Server Action을 통해 수행한다.
- 상호작용이 있는 mutation UX는 필요 시 TanStack Query `useMutation`으로 조정한다.
- 쓰기 성공 후에는 명시적으로 invalidate 또는 revalidate를 수행한다.

repository/adapter 경계는 실제 계약 또는 transport 경계를 제공할 때만 허용한다.
forwarding-only repository layer는 기본값으로 추가하지 않는다.

---

## 8) TanStack Query Keys

```ts
export const boardKeys = {
  all: ["board"] as const,
  list: () => [...boardKeys.all, "list"] as const,
  listBy: (filter: { ownerId?: string }) => [...boardKeys.list(), { filter }] as const,
  detail: (boardId: string) => [...boardKeys.all, "detail", boardId] as const,
  cells: (boardId: string) => [...boardKeys.detail(boardId), "cells"] as const,
};
```

> 컴포넌트마다 inline query 배열을 흩뿌리기보다, 안정적인 계층형 key factory를 사용한다.
> 이런 helper는 `entities/<domain>/model/keys.ts` 또는 명확한 이름의 query-key 모듈에 두는 것을 우선한다.

---

## 9) API 예시 (Server Action)

```ts
"use server";

import { prisma } from "@/generated/prisma/client";

export async function toggleTaskDone(id: string, next: boolean) {
  const user = await requireAuthenticatedUser();

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

> - 모든 mutation은 server-side only로 실행한다.
> - 인가는 Supabase RLS로 강제한다.
> - Prisma가 관계 처리와 트랜잭션 무결성을 담당한다.
> - 쓰기 성공 후에는 일관성을 소유한 client/server 경계에서 명시적으로 cache invalidation 또는 revalidation을 수행한다.
> - `requireAuthenticatedUser()`는 프로젝트의 실제 server-side auth helper를 대신하는 placeholder다.

---

## 10) 검증 (Zod Schemas)

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

## 11) 테스트 기준

- Jest 설정의 기준 파일: `jest.config.ts`
- Playwright 설정의 기준 파일: `playwright.config.ts`
- 현재 package script:
  - `pnpm test:unit`
  - `pnpm test:e2e`
- 현재 테스트 디렉터리:
  - `tests/integration/`
  - `tests/e2e/`

---

## 12) Lint & Format

- Biome 설정의 기준 파일: `biome.json`
- ESLint 설정의 기준 파일: `eslint.config.mjs`
- 현재 package script:
  - `pnpm lint`
  - `pnpm lint:biome`
  - `pnpm lint:eslint`
  - `pnpm prettier:docs`

---

## 13) CI / CD (GitHub Actions)

- Build verification workflow: `.github/workflows/build_verification.yml`
- Playwright workflow: `.github/workflows/playwright.yml`
- 정확한 CI 동작 기준은 저장소의 workflow 파일을 source of truth로 사용한다.
- 문서화된 Node/pnpm 가정은 해당 workflow 파일과 현재 package 설정에 맞춰 유지한다.

---

## 14) 버전 매트릭스

| 항목           | 버전    | 비고                                    |
| -------------- | ------- | --------------------------------------- |
| Node.js        | 22.14.0 | Build verification workflow target      |
| Next.js        | 16.0.10 | App Router                              |
| TypeScript     | 5.x     | Strict Mode                             |
| Supabase-js    | 2.95.3  | RLS 및 Edge Functions 지원              |
| Supabase SSR   | 0.8.0   | 서버/클라이언트 auth session 지원       |
| Prisma         | 7.3.0   | 서버 사이드 ORM, 스키마 및 마이그레이션 |
| TailwindCSS    | 4       | JIT                                     |
| shadcn/ui      | Latest  | CLI 설치                                |
| TanStack Query | 5.90.20 | 클라이언트 사이드 서버 상태 처리        |
| Zustand        | 5.0.11  | 로컬 UI 상태                            |
| Zod            | 4.3.6   | react-hook-form과 통합                  |
| Biome          | 2.3.9   | ESLint 대체                             |
| Jest           | 30.2.0  | SWC 기반                                |
| Playwright     | 1.58.2  | 브라우저 자동화 및 E2E                  |
| pnpm           | 10.18.2 | 모노레포 지원                           |

---

✅ **요약:**
이 문서는 Mandalart Web의 **기술 명세와 구현 기준**을 정의한다.
`PRD.md`가 제품 요구사항을 정의한다면, 이 문서는 실제 **개발 기준 문서** 역할을 한다.
인덱스, RLS, server/client 경계, query-key 규약, 검증 기준은 모두 이 문서를 기준으로 유지한다.
