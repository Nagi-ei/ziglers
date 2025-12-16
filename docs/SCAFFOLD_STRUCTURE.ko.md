## 1) 폴더 트리

```bash
src/
├─ app/                                  # Next App Router (RSC 가능)
│  ├─ layout.tsx
│  ├─ page.tsx                           # 랜딩
│  ├─ dashboard/
│  │  └─ page.tsx                        # 대시보드
│  └─ boards/
│     └─ [id]/
│        └─ page.tsx                     # 보드 상세 (편집 UI는 Client)
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
│  │  │  ├─ repository.ts                # 포트(인터페이스)
│  │  │  ├─ supabase.adapter.ts          # 어댑터(구현) → M2에서 http.adapter.ts로 교체
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
│  ├─ ui/                                # shadcn 확장(버튼/모달/토스트 등)
│  ├─ lib/
│  │  ├─ supabase/
│  │  │  ├─ client.ts                    # 클라이언트 전용 supabase
│  │  │  └─ server.ts                    # 서버/RSC 전용 supabase (@supabase/ssr)
│  │  ├─ queryClient.ts                  # TanStack Query 클라이언트/Provider
│  │  ├─ i18n/
│  │  │  ├─ provider.tsx
│  │  │  ├─ locales/
│  │  │  │  ├─ ko.json
│  │  │  │  └─ en.json
│  │  │  └─ helpers.ts
│  │  ├─ theme/provider.tsx              # next-themes Provider
│  │  ├─ validators/                     # Zod 스키마
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

> **pages/**, **processes/** 레이어는 생략(FSD-lite). 라우팅은 전부 `app/`에서만.

---

## 2) 경계 규칙 (필수)

- **의존 방향 강제**: `app → widgets → features → entities → shared`  
    (상위가 하위만 import, 반대 금지. 예: entities가 widgets를 import ❌)
    
- **Public API**: 각 슬라이스 루트 `index.ts`에서 외부로 노출할 최소만 export
-     - 예시: 
```ts
// src/entities/board/index.ts
export * from './model/types';
export * from './model/queries';
export * from './lib/repository';
```
    
- **데이터 접근**: **entities/lib/**에서만 DB/API 접근. 페이지/위젯/피처에서 직접 Supabase 호출 금지
    
- **쿼리 키/무효화**: `entities/*/model/keys.ts`의 키만 사용해 invalidate/revalidate
    

---

## 3) 필수 초기 파일 (샘플)

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

### 3.2 `shared/lib/supabase/server.ts` (RSC/서버용)

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

### 3.3 `shared/lib/supabase/client.ts` (Client용)

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
  // 간단 시작: ko 고정. 추후 locale 라우팅 연동
  return <NextIntlClientProvider messages={ko}>{children}</NextIntlClientProvider>;
}
```

---

## 4) Entities 레이어 (Board 예시)

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

### 4.3 `entities/board/lib/repository.ts` (포트)

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

### 4.4 `entities/board/lib/supabase.adapter.ts` (어댑터)

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

## 5) Features 레이어 (Toggle Task 예시)

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
      // (PRD 예시 코드 로직 연결)
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

## 6) Widgets 레이어 (대시보드 카드 예시)

### 6.1 `widgets/dashboard-cards/model.ts`

```ts
// 여러 쿼리 결합/가공(derive) 책임
export function useDashboardSummary() {
  // useBoardsQuery, useMonthlyStatsQuery 등을 조합해 메모이즈된 요약을 리턴
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
      <div className="rounded-2xl p-4 shadow">총 진행률: {(totalProgress * 100).toFixed(0)}%</div>
      {/* Recharts 카드 등 */}
    </section>
  );
}
```

---

## 7) App 라우팅 파일

### 7.1 `app/page.tsx` (랜딩)

```tsx
export default async function Page() {
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Mandalart</h1>
      {/* TemplatePicker 등 */}
    </main>
  );
}
```

### 7.2 `app/dashboard/page.tsx` (RSC)

```tsx
import { DashboardCards } from '@/widgets/dashboard-cards/ui';

export const revalidate = 60; // 예시

export default async function DashboardPage() {
  // 필요하면 서버 Supabase로 읽기 후 props로 위젯에 내려주기 가능
  return (
    <main className="container py-8">
      <DashboardCards />
    </main>
  );
}
```

### 7.3 `app/boards/[id]/page.tsx`

```tsx
export const fetchCache = 'default-no-store'; // 필요 시

export default async function BoardPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/boards/${params.id}`, {
    next: { tags: [`board:${params.id}`] },
  });
  const board = await res.json();
  return <main className="container py-8">{/* <BoardGrid board={board} /> */}</main>;
}
```

---

## 8) 환경 변수 & 설정

- `.env.local`
    
    - `NEXT_PUBLIC_SUPABASE_URL`
        
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
        
- 선택(서버 전용): `SUPABASE_SERVICE_ROLE` (Route Handler/Action에서만)
    

**경고:** `SUPABASE_SERVICE_ROLE`은 **클라이언트 노출 금지**

---

## 9) 경로 alias (tsconfig)

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

## 10) 테스트 디렉터리 가이드

- **unit**: entities의 유틸/매퍼/계산
    
- **integration**: features의 mutation 흐름(MSW로 Supabase 응답 모킹)
    
- **e2e**: Playwright로 “로그인→보드 생성→체크→PDF” 시나리오
    

---

## 11) 다크모드 & i18n 배치 규칙

- 다크모드: `ThemeProvider`(next-themes) + Tailwind `dark:`. 토글은 `shared/ui/theme-toggle.tsx`로 별도 분리 권장
    
- i18n: `I18nProvider`(next-intl). 키 네이밍 `page.section.key` 유지, 기본 ko / `/en/*` 라우트로 영어
    

---

## 12) 무효화/리밸리데이션 정책

- 쓰기 성공 시:
    
    - **TanStack**: 관련 `queryKey` 무효화 (e.g., `boardKeys.detail(id)`)
        
    - **RSC**: `revalidateTag('board:{id}')` 사용(서버에서 태깅된 fetch가 있을 때)
        

---

## 13) M2 전환 대비 포인트

- `entities/*/lib/repository.ts` 유지, `supabase.adapter.ts`만 `http.adapter.ts`로 교체
    
- RN(Expo)는 동일 `keys.ts` 네이밍과 API 응답 타입을 공유하면, 캐시 정책 재사용 쉬움
    

---