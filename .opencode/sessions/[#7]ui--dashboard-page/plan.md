# 📋 Plan: [#7] ui--dashboard-page

**Session Name:** `[#7]ui--dashboard-page`  
**Date:** 2026-01-24  
**Branch:** `feat/dashboard-page`

---

## 🎯 목표

대시보드 페이지 UI 구현 (두 가지 레이아웃 시안)

- `/dashboard1` - Sidebar Inset + 각진 모서리
- `/dashboard2` - 일반 Sidebar
- 레퍼런스 레이아웃 기반 구성
- Zieglers 디자인 언어 적용 (따뜻한 색감, 직각 모서리, 종이 질감)
- Mock 데이터로 UI 검증

---

## 🏗️ 아키텍처 결정 (Oracle 검토 결과)

### 1. 라우트 그룹 구조

```
src/app/(app)/
├── (inset-sidebar)/              # Inset 레이아웃 (메인이 사이드바 배경 위에 떠있음)
│   ├── layout.tsx                # SidebarInset + rounded-none
│   └── dashboard1/page.tsx
├── (default-sidebar)/            # 일반 레이아웃 (전통적인 사이드바)
│   ├── layout.tsx
│   └── dashboard2/page.tsx
└── boards/[id]/page.tsx          # 기존 유지
```

**이점:** 나중에 하나로 결정 시 폴더 하나만 삭제하고 파일명 변경하면 됨

### 2. FSD-Lite 위젯 구조

```
src/widgets/
├── landing/                      # 기존 유지
├── app-sidebar/                  # NEW: 앱 전용 사이드바
│   └── AppSidebar.tsx
├── dashboard-summary/            # NEW: 4개 통계 카드
│   ├── DashboardSummary.tsx
│   └── model.ts
├── dashboard-charts/             # NEW: 차트 영역
│   ├── DashboardCharts.tsx
│   └── model.ts
└── dashboard-boards/             # NEW: 보드 목록
    ├── DashboardBoards.tsx
    └── model.ts
```

**Mock 데이터 위치:** 각 위젯의 `model.ts` 내부 (응집도 높음, API 전환 용이)

### 3. 사이드바 리팩토링

- `shared/ui/SidebarExample.tsx` → `widgets/app-sidebar/AppSidebar.tsx`로 이동
- 메뉴: Dashboard / My Boards / Popular
- 상단: 로고 + `+ New Board` 버튼
- 하단: 사용자 프로필 (placeholder - 하드코딩된 가짜 데이터)

---

## 📦 사전 작업 (Infra)

### 1. components.json 경로 수정

```json
{
  "aliases": {
    "ui": "@/shared/ui/shadcn",
    "components": "@/shared/ui/shadcn",
    "utils": "@/shared/lib/utils",
    "lib": "@/shared/lib",
    "hooks": "@/shared/lib/hooks"
  }
}
```

### 2. shadcn Chart 컴포넌트 설치

```bash
pnpm dlx shadcn@latest add chart
```

→ Recharts 자동 설치, `Chart.tsx` 생성

### 3. Progress 컴포넌트 설치 (보드 카드용)

```bash
pnpm dlx shadcn@latest add progress
```

---

## ✅ 구현 체크리스트

### Phase 1: 인프라 설정 (~30min)

- [ ] `components.json` 경로 수정
- [ ] `pnpm dlx shadcn@latest add chart` 실행
- [ ] `pnpm dlx shadcn@latest add progress` 실행
- [ ] 파일 경로 수동 이동 (필요 시)
- [ ] 타입 검증 (`pnpm tsc --noEmit`)

### Phase 2: 사이드바 리팩토링 (~1h)

- [ ] `widgets/app-sidebar/AppSidebar.tsx` 생성
  - Huge Icons 적용
  - 메뉴: Dashboard / My Boards / Popular
  - `+ New Board` 버튼 (primary 스타일)
  - 사용자 정보 placeholder
- [ ] `shared/ui/SidebarExample.tsx` 삭제

### Phase 3: 라우트 그룹 분리 (~30min)

- [ ] `(app)/(inset-sidebar)/layout.tsx` 생성 - Inset + rounded-none
- [ ] `(app)/(default-sidebar)/layout.tsx` 생성 - 일반 사이드바
- [ ] `(app)/(inset-sidebar)/dashboard1/page.tsx` 생성
- [ ] `(app)/(default-sidebar)/dashboard2/page.tsx` 생성
- [ ] 기존 `(app)/layout.tsx`, `(app)/dashboard/page.tsx` 정리

### Phase 4: Dashboard Summary Cards (~1h)

- [ ] `widgets/dashboard-summary/model.ts` - Mock 데이터 + `useSummaryStats()`
- [ ] `widgets/dashboard-summary/DashboardSummary.tsx` - 4개 카드 그리드
  - Total Boards
  - Completed Tasks
  - Active Goals
  - Overall Progress
- [ ] Zieglers 스타일 적용 (직각 모서리, 오프셋 그림자)

### Phase 5: Dashboard Charts (~2h)

- [ ] `widgets/dashboard-charts/model.ts` - Mock 차트 데이터
- [ ] `widgets/dashboard-charts/DashboardCharts.tsx`
  - Goal Progress (Area Chart) - 6개월 추이
  - Status Distribution (Donut Chart) - Completed/In Progress/Pending
- [ ] CSS 변수 연동 (`--chart-1`, `--chart-2` 등)

### Phase 6: Dashboard Boards (~1.5h)

- [ ] `widgets/dashboard-boards/model.ts` - Mock 보드 목록
- [ ] `widgets/dashboard-boards/DashboardBoards.tsx`
  - 보드 카드 그리드 (제목, 진행률 프로그레스 바, 최근 업데이트)
  - `+ Create New Board` 점선 카드
- [ ] globals.css에 정의된 색상만 사용

### Phase 7: 페이지 통합 (~30min)

- [ ] `/dashboard1`, `/dashboard2` 페이지에 위젯 통합
- [ ] 반응형 레이아웃 검증 (모바일, 태블릿, 데스크톱)
- [ ] 다크모드 검증

### Phase 8: 최종 검증 (~30min)

- [ ] `pnpm build` 성공 확인
- [ ] `pnpm lint` 통과
- [ ] 브라우저 테스트 (라이트/다크 모드)
- [ ] 커밋 생성

---

## 🎨 디자인 가이드라인

### 색상 (globals.css 기준)

| 용도    | Light                     | Dark                 |
| ------- | ------------------------- | -------------------- |
| 배경    | `brand-bg` (#f2ede4)      | `brand-fg` (#2d2d2d) |
| 카드    | `brand-bg-lighter`        | `brand-fg-lighter`   |
| Primary | `brand-primary` (#8c3027) | `brand-secondary`    |
| Chart 1 | `--chart-1` (secondary)   | -                    |
| Chart 2 | `--chart-2` (primary)     | -                    |

### 스타일 규칙

- **모서리**: `rounded-none` (직각)
- **그림자**: `shadow-[4px_4px_0px_0px_rgba(45,45,45,0.1)]`
- **카드 장식**: 상단 색상 띠 (globals.css 색상만 사용)
- **호버**: `hover:-translate-y-1` 상승 효과

### 아이콘 매핑 (Huge Icons)

| 용도         | 아이콘               |
| ------------ | -------------------- |
| Dashboard    | `Dashboard02Icon`    |
| My Boards    | `FolderOpenIcon`     |
| Popular      | `TrendingUpIcon`     |
| New Board    | `Add01Icon`          |
| Total Boards | `GridViewIcon`       |
| Tasks        | `CheckListIcon`      |
| Goals        | `Target02Icon`       |
| Progress     | `ChartHistogramIcon` |
| Update       | `Clock04Icon`        |

---

## 📝 커밋 계획

| Phase | 커밋 메시지                                                               |
| ----- | ------------------------------------------------------------------------- |
| 1     | `:package: chore: add shadcn chart and progress components`               |
| 2     | `:recycle: refactor: create app-sidebar widget from SidebarExample`       |
| 3     | `:building_construction: chore: split route groups for sidebar variants`  |
| 4     | `:sparkles: feat: add dashboard summary cards widget`                     |
| 5     | `:sparkles: feat: add dashboard charts widget with area and donut charts` |
| 6     | `:sparkles: feat: add dashboard boards widget with board cards`           |
| 7     | `:lipstick: style: integrate dashboard pages with all widgets`            |

---

## ⚠️ 주의사항

1. **Hydration Mismatch**: 차트 컴포넌트는 `"use client"` 필수
2. **shadcn 내부 수정 금지**: `src/shared/ui/shadcn/` 파일은 절대 수정하지 않음
3. **Chart Container Height**: `min-h-[200px]` 또는 `aspect-*` 클래스 필요
4. **Huge Icons Only**: Lucide 아이콘 사용 금지
5. **색상**: globals.css에 정의된 색상만 사용 (레퍼런스 이미지 색상 무시)

---

## 🚀 예상 소요 시간

| Phase                | 시간      |
| -------------------- | --------- |
| Phase 1: 인프라      | ~30min    |
| Phase 2: 사이드바    | ~1h       |
| Phase 3: 라우트 그룹 | ~30min    |
| Phase 4: Summary     | ~1h       |
| Phase 5: Charts      | ~2h       |
| Phase 6: Boards      | ~1.5h     |
| Phase 7-8: 통합/검증 | ~1h       |
| **Total**            | **~7.5h** |

---

## ✅ 승인됨

2026-01-24 사용자 승인 완료. 구현 시작.
