# 1) Folder Tree

```bash
src/
├─ app/                                  # Next App Router (RSC-enabled)
│  ├─ layout.tsx
│  ├─ page.tsx                           # Landing page
│  ├─ dashboard/
│  │  └─ page.tsx                        # Dashboard
│  └─ boards/
│     └─ [id]/
│        └─ page.tsx                     # Board detail (edit UI is Client-side)
│
├─ widgets/
│  ├─ dashboard-cards/
│  │  ├─ ui.tsx
│  │  └─ model.ts
│  └─ board-grid/
│     ├─ ui.tsx
│     └─ model.ts
│
├─ features/
│  ├─ toggle-task/
│  │  ├─ ui.tsx
│  │  └─ model.ts
│  ├─ edit-cell/
│  │  ├─ ui.tsx
│  │  └─ model.ts
│  ├─ create-board/
│  │  ├─ ui.tsx
│  │  └─ model.ts
│  └─ export-board/
│     ├─ ui.tsx
│     └─ model.ts
│
├─ entities/
│  ├─ board/
│  │  ├─ model/
│  │  │  ├─ types.ts
│  │  │  ├─ keys.ts
│  │  │  └─ queries.ts
│  │  ├─ lib/
│  │  │  ├─ repository.ts                # Port (interface)
│  │  │  ├─ supabase.adapter.ts          # Adapter (implementation) → Replaced by http.adapter.ts in M2
│  │  │  └─ mapper.ts
│  │  ├─ ui/
│  │  │  └─ card.tsx
│  │  └─ index.ts
│  ├─ cell/
│  │  ├─ model/{types.ts, keys.ts, queries.ts}
│  │  └─ lib/{repository.ts, supabase.adapter.ts, mapper.ts}
│  │  └─ index.ts
│  └─ task/
│     ├─ model/{types.ts, keys.ts, queries.ts}
│     └─ lib/{repository.ts, supabase.adapter.ts, mapper.ts}
│  │  └─ index.ts
│
├─ shared/
│  ├─ ui/                                # shadcn extensions (buttons/modals/toasts, etc.)
│  ├─ lib/
│  │  ├─ supabase/
│  │  │  ├─ client.ts                    # Supabase for client
│  │  │  └─ server.ts                    # Supabase for server/RSC (@supabase/ssr)
│  │  ├─ queryClient.ts                  # TanStack Query client/provider
│  │  ├─ i18n/
│  │  │  ├─ provider.tsx
│  │  │  ├─ locales/
│  │  │  │  ├─ ko.json
│  │  │  │  └─ en.json
│  │  │  └─ helpers.ts
│  │  ├─ theme/provider.tsx              # next-themes Provider
│  │  ├─ validators/                     # Zod schemas
│  │  └─ utils.ts
│  ├─ config/
│  │  ├─ env.ts
│  │  └─ constants.ts
│  └─ styles/globals.css
│
└─ test/
   ├─ unit/
   ├─ integration/
   └─ e2e/
```

> **pages/** and **processes/** layers are omitted (FSD-lite).  
> All routing is handled exclusively in the `app/` directory.

---

# 2) Boundary Rules (Required)

- **Dependency Direction:** `app → widgets → features → entities → shared`  
    (Higher layers may import lower layers, never the reverse.  
    Example: entities importing widgets ❌)
    
- **Public API:** Each slice exposes only minimal exports via `index.ts`
    
    - Example:
        
    ```ts
// src/entities/board/index.ts
export * from './model/types';
export * from './model/queries';
export * from './lib/repository';
	```
        
- **Data Access:** Only allowed inside **entities/lib/**.  
    Direct Supabase calls in pages/widgets/features are prohibited.
    
- **Query Keys / Invalidation:**  
    Use only keys defined in `entities/*/model/keys.ts` for invalidate/revalidate operations.
    

---

# 3) Required Initial Files (Samples)

### 3.1 `app/layout.tsx`

```tsx
import './globals.css';
import { QueryProvider } from '@/shared/lib/queryClient';
import { ThemeProvider } from '@/shared/lib/theme/provider';
import { I18nProvider } from '@/shared/lib/i18n/provider';

export const metadata = { title: 'Mandalart', description: 'Mandalart Web' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <I18nProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

```


### 3.2 `shared/lib/supabase/server.ts` (For RSC/Server)

```ts
import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export function getServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (k: string) => cookieStore.get(k)?.value } }
  );
}
```

### 3.3 `shared/lib/supabase/client.ts` (For Client)

```ts
'use client';
import { createClient } from '@supabase/supabase-js';

export function getClientSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 3.4 `shared/lib/queryClient.tsx`

```tsx
'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [qc] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { staleTime: 30_000, retry: 1 },
      mutations: { retry: 0 },
    },
  }));
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
```

### 3.5 `shared/lib/theme/provider.tsx`

```tsx
'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider(props: any) {
  return <NextThemesProvider {...props} />;
}
```

### 3.6 `shared/lib/i18n/provider.tsx`

```tsx
'use client';
import { NextIntlClientProvider } from 'next-intl';
import ko from './locales/ko.json';
import en from './locales/en.json';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Simple start: fixed to ko. Later linked with locale routing.
  return <NextIntlClientProvider messages={ko}>{children}</NextIntlClientProvider>;
}
```

---

# 4) Entities Layer (Board Example)

### 4.1 `entities/board/model/types.ts`

```ts
import { z } from 'zod';

export const BoardSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
  updated_at: z.string().datetime().optional(),
});
export type Board = z.infer<typeof BoardSchema>;

export const CreateBoardInputSchema = BoardSchema.pick({ title: true, description: true }).partial({ description: true });
export type CreateBoardInput = z.infer<typeof CreateBoardInputSchema>;
```

### 4.2 `entities/board/model/keys.ts`

```ts
export const boardKeys = {
  all: ['board'] as const,
  lists: () => [...boardKeys.all, 'list'] as const,
  list: (ownerId: string) => [...boardKeys.lists(), ownerId] as const,
  details: () => [...boardKeys.all, 'detail'] as const,
  detail: (id: string) => [...boardKeys.details(), id] as const,
};
```

### 4.3 `entities/board/lib/repository.ts` (Port)

```ts
import { Board, CreateBoardInput } from '../model/types';

export interface BoardRepository {
  listBoards(ownerId: string): Promise<Board[]>;
  getBoard(id: string): Promise<Board | null>;
  createBoard(input: CreateBoardInput & { owner_id: string }): Promise<Board>;
  updateBoard(id: string, patch: Partial<CreateBoardInput>): Promise<Board>;
  deleteBoard(id: string): Promise<void>;
}
```

### 4.4 `entities/board/lib/supabase.adapter.ts` (Adapter)

```ts
import { getClientSupabase } from '@/shared/lib/supabase/client';
import { BoardRepository } from './repository';
import { Board } from '../model/types';

const toBoard = (row: any): Board => ({
  id: row.id, title: row.title, description: row.description ?? undefined, updated_at: row.updated_at,
});

export const supabaseBoardRepository: BoardRepository = {
  async listBoards(ownerId) {
    const sb = getClientSupabase();
    const { data, error } = await sb
      .from('boards')
      .select('id,title,description,updated_at')
      .eq('owner_id', ownerId)
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return (data ?? []).map(toBoard);
  },
  
  async getBoard(id) {
    const sb = getClientSupabase();
    const { data, error } = await sb
      .from('boards')
      .select('id,title,description,updated_at')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? toBoard(data) : null;
  },
  
  async createBoard(input) {
    const sb = getClientSupabase();
    const { data, error } = await sb
      .from('boards')
      .insert(input)
      .select('id,title,description,updated_at')
      .single();
    if (error) throw error;
    return toBoard(data);
  },

  async updateBoard(id, patch) {
    const sb = getClientSupabase();
    const { data, error } = await sb
      .from('boards')
      .update(patch)
      .eq('id', id)
      .select('id,title,description,updated_at')
      .single();
    if (error) throw error;
    return toBoard(data);
  },
  
  async deleteBoard(id) {
    const sb = getClientSupabase();
    const { error } = await sb.from('boards').delete().eq('id', id);
    if (error) throw error;
  },
};
```

### 4.5 `entities/board/model/queries.ts`

```ts
'use client';
import { useQuery } from '@tanstack/react-query';
import { supabaseBoardRepository as repo } from '../lib/supabase.adapter';
import { boardKeys } from './keys';

export function useBoardsQuery(ownerId: string) {
  return useQuery({
    queryKey: boardKeys.list(ownerId),
    queryFn: () => repo.listBoards(ownerId),
  });
}
```

---

# 5) Features Layer (Toggle Task Example)

### 5.1 `features/toggle-task/model.ts`

```ts
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskKeys } from '@/entities/task/model/keys';
// import repo from '@/entities/task/lib/supabase.adapter';

export function useToggleTask(taskId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (next: boolean) => {
      // await repo.toggleDone(taskId, next)
      // (Connect with PRD example logic)
    },
    onMutate: async (next) => {
      const key = taskKeys.detail(taskId);
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<any>(key);
      qc.setQueryData(key, (old: any) => ({ ...old, is_done: next, done_at: next ? new Date().toISOString() : null }));
      return { prev, key };
    },
    onError: (_e, _next, ctx) => {
      if (ctx?.prev && ctx.key) qc.setQueryData(ctx.key, ctx.prev);
    },
    // onSuccess: () => qc.invalidateQueries(boardKeys.detail(boardId)),
  });
}
```

### 5.2 `features/toggle-task/ui.tsx`

```tsx
'use client';
import { Checkbox } from '@/shared/ui/checkbox';
import { useToggleTask } from './model';

export function ToggleTask({ taskId, checked }: { taskId: string; checked: boolean }) {
  const { mutate } = useToggleTask(taskId);
  return <Checkbox defaultChecked={checked} onCheckedChange={(v) => mutate(!!v)} />;
}
```

---

# 6) Widgets Layer (Dashboard Card Example)

### 6.1 `widgets/dashboard-cards/model.ts`

```ts
// Responsible for combining/deriving multiple queries
export function useDashboardSummary() {
  // Combine useBoardsQuery, useMonthlyStatsQuery, etc. and return memoized summary
  return { totalProgress: 0.72, monthlyDone: [/* ... */], recent: [/* ... */] };
}
```

### 6.2 `widgets/dashboard-cards/ui.tsx`

```tsx
'use client';
import { useDashboardSummary } from './model';

export function DashboardCards() {
  const { totalProgress } = useDashboardSummary();
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl p-4 shadow">Total Progress: {(totalProgress * 100).toFixed(0)}%</div>
      {/* Recharts cards, etc. */}
    </section>
  );
}
```

---

# 7) App Routing Files

### 7.1 `app/page.tsx` (Landing)

```tsx
export default async function Page() {
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Mandalart</h1>
      {/* TemplatePicker, etc. */}
    </main>
  );
}
```

### 7.2 `app/dashboard/page.tsx` (RSC)

```tsx
import { DashboardCards } from '@/widgets/dashboard-cards/ui';

export const revalidate = 60; // Example

export default async function DashboardPage() {
  // Can optionally read from server Supabase and pass props to widgets
  return (
    <main className="container py-8">
      <DashboardCards />
    </main>
  );
}
```

### 7.3 `app/boards/[id]/page.tsx`

```tsx
export const fetchCache = 'default-no-store'; // Optional

export default async function BoardPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/boards/${params.id}`, {
    next: { tags: [`board:${params.id}`] },
  });
  const board = await res.json();
  return <main className="container py-8">{/* <BoardGrid board={board} /> */}</main>;
}
```

---

# 8) Environment Variables & Configuration

- `.env.local`
    
    - `NEXT_PUBLIC_SUPABASE_URL`
        
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
        
- Optional (Server-only): `SUPABASE_SERVICE_ROLE` (for Route Handler/Actions only)
    

⚠️ **Warning:** `SUPABASE_SERVICE_ROLE` must **never be exposed to clients**.

---

# 9) Path Alias (tsconfig)

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

---

# 10) Test Directory Guide

- **unit**: Utilities/mappers/calculations in entities
    
- **integration**: Feature mutation flows (mock Supabase responses with MSW)
    
- **e2e**: Playwright scenarios for “Login → Create Board → Check → PDF”
    

---

# 11) Dark Mode & i18n Placement Rules

- Dark mode: Use `ThemeProvider` (next-themes) + Tailwind `dark:`.  
    Toggle component recommended as `shared/ui/theme-toggle.tsx`.
    
- i18n: Use `I18nProvider` (next-intl).  
    Key naming convention: `page.section.key`.  
    Default locale: `ko`, English accessible via `/en/*` routes.
    

---

# 12) Invalidation / Revalidation Policy

- On successful write:
    
    - **TanStack:** Invalidate related `queryKey` (e.g., `boardKeys.detail(id)`)
        
    - **RSC:** Use `revalidateTag('board:{id}')` when fetches are tagged server-side.
        

---

# 13) Preparation for M2 Migration

- Keep `entities/*/lib/repository.ts`, replace only `supabase.adapter.ts` with `http.adapter.ts`.
    
- For RN (Expo), sharing the same `keys.ts` naming and API response types simplifies cache policy reuse.
    

---

✅ **Summary:**  
This document defines the **folder structure and layer boundaries** for the Mandalart Web project following **FSD-Lite architecture**.  
It standardizes dependency direction, public API exposure, initialization files, and data access rules for scalable and maintainable development.

---
