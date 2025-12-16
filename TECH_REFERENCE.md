# Mandalart Web – TECH_REFERENCE (v1.0)

_Last updated: 2025-11-08 (KST)_

---

## 1) Overview

This document defines the **technical implementation details of the Mandalart Web project**.  
It serves as the technical foundation for realizing the requirements defined in **PRD.md**,  
and is the top-level technical specification referenced during code generation and maintenance.

---

## 2) Environment & Toolchain

| Item                | Description                                               |
| ------------------- | --------------------------------------------------------- |
| **Framework**       | Next.js (App Router, v16.0.1), React (v19.2.0)            |
| **Language**        | TypeScript (v5.x)                                         |
| **Package Manager** | pnpm (v10.18.2)                                           |
| **Database**        | Supabase (PostgreSQL 15)                                  |
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

### 3.2 Indexes (Performance Optimization)

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

> ✅ **Notes:**
> 
> - `owner_id`, `board_id`, and `cell_id` are essential filter keys for all queries — indexing required.
>     
> - `updated_at`, `done_at`, and `created_at` indexes improve sorting performance.
>     
> - `events` may later include a composite index `(user_id, created_at)` for monthly aggregation queries.
>     

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

### 5.1 Monthly Completed Tasks for Dashboard

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

### 5.2 Progress Rate by Board

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

## 6) Repository Layer (Example)

```ts
// repositories/boardRepository.ts
import { sb } from '@/lib/supabase/client'

export const boardRepository = {
	async listBoards() {
		const { data, error } = await sb
			.from('boards')
			.select('id, title, description, updated_at')
			.order('updated_at', { ascending: false })
		if (error) throw error
		return data
	},

	async createBoard(input) {
		const { data, error } = await sb
			.from('boards')
			.insert(input)
			.select('id, title, description')
			.single()
		if (error) throw error
		return data
	},
	
	async getBoard(id: string) {
		const { data, error } = await sb
			.from('boards')
			.select('*, cells(*, tasks(*))')
			.eq('id', id)
			.single()
		if (error) throw error
		return data
	}
}
```

> ✅ **Reference:**
> 
> - This layer enables migration to NestJS with minimal code changes.
>     
> - Separate repositories are maintained per domain (`board`, `task`, `event`).
>     

---

## 7) TanStack Query Keys

```ts
export const queryKeys = {
	boards: ['boards'] as const,
	board: (id: string) => ['board', id] as const,
	cells: (boardId: string) => ['board', boardId, 'cells'] as const,
	tasks: (cellId: string) => ['cell', cellId, 'tasks'] as const,
}
```

> The hierarchical array structure allows for unified cache invalidation using `invalidateQueries(['board', id])`.

---

## 8) API Example (Client Action)

```ts
'use server'
import { sb } from '@/lib/supabase/server'

export async function toggleTaskDone(id: string, next: boolean, userId: string) {
	const { error } = await sb
		.from('tasks')
		.update({
			is_done: next,
			done_at: next ? new Date().toISOString() : null
		})
		.eq('id', id)
		
	if (error) throw error
	
	await sb.from('events').insert({
		user_id: userId,
		task_id: id,
		type: next ? 'task_done' : 'task_undone'
	})
}
```

---

## 9) Validation (Zod Schemas)

```ts
export const BoardSchema = z.object({
	title: z.string().min(1).max(50),
	description: z.string().max(200).optional()
})

export const CellSchema = z.object({
	title: z.string().min(1).max(40),
	note: z.string().max(200).optional()
})

export const TaskSchema = z.object({
	content: z.string().min(1).max(80)
})
```

---

## 10) Testing Reference

### 10.1 Jest Config (package.json)

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

### 10.2 E2E (Playwright)

```bash
pnpm exec playwright install --with-deps
pnpm exec playwright test --reporter=line
```

> Automatically saves `trace.zip` and screenshots upon execution.  
> `baseURL` in `playwright.config.ts` = `http://localhost:3000`

---

## 11) Lint & Format

### 11.1 Biome Config (`biome.json`)

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

### 11.2 ESLint Extension

```js
extends: [
	"next/core-web-vitals",
	"plugin:@tanstack/eslint-plugin-query/recommended"
]
```

---

## 12) CI / CD (GitHub Actions)


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

## 13) Version Matrix

| Item           | Version | Note                            |
| -------------- | ------- | ------------------------------- |
| Node.js        | 22.14.0 | Default Vercel environment      |
| Next.js        | 16.0.1  | App Router                      |
| TypeScript     | 5.x     | Strict Mode                     |
| Supabase-js    | 2.x     | Supports RLS and Edge Functions |
| TailwindCSS    | 4       | JIT                             |
| shadcn/ui      | Latest  | CLI installation                |
| TanStack Query | 5.90.8  | Supports Suspense               |
| Zustand        | 5.0.8   | Includes Middleware             |
| Zod            | 4.1.12  | Integrated with react-hook-form |
| Biome          | 2.2.0   | ESLint replacement              |
| Jest           | 30.2.0  | SWC-based                       |
| Playwright     | 1.56.1  | Chromium/Firefox/WebKit         |
| pnpm           | 10.18.2 | Monorepo support                |

---

✅ **Summary:**  
This document defines the **technical specifications and implementation standards** for Mandalart Web.  
While **PRD.md** defines product requirements, this serves as the actual **development reference**.  
Indexes, RLS, repository structure, and testing configurations are all maintained according to this document.