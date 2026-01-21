# 📝 Session Note: [#5]ui--landing-page

- **Date:** 2026-01-22
- **Branch:** ui/5--landing-page
- **Agent Role:** Interface Crafter / Technical Writer

## 🎯 세션 요약 (Session Summary)

- 5가지 랜딩 페이지 디자인 변형(gemini1, gemini2, gemini3, gemini4, opus)을 제작했습니다.
- 최종 선택: **gemini4 (Warm Paper/Handwritten)**
- 사용자가 추가 리팩토링 및 브랜치 푸시를 수행했습니다.

### 디자인 변형 목록 (Design Variants Created)

| Variant | Folder                         | Design Direction                                            | Status      |
| ------- | ------------------------------ | ----------------------------------------------------------- | ----------- |
| gemini1 | `src/widgets/landing-gemini1/` | Architectural Zen - geometric, nested 3x3 grid              | Archived    |
| gemini2 | `src/widgets/landing-gemini2/` | Editorial Magazine - typography-first, large uppercase      | Archived    |
| gemini3 | `src/widgets/landing-gemini3/` | Technical Blueprint/Architect - monospace, schematic        | Archived    |
| gemini4 | `src/widgets/landing-gemini4/` | **Warm Paper/Handwritten** - paper texture, hand-drawn feel | ✅ Selected |
| opus    | `src/widgets/landing-opus/`    | Bricklayer/Digital Masonry - brick-stacking theme           | Archived    |

## 🛠 주요 기술적 결정 (Decision Log)

### 1. Variant Switcher System

- 개발 모드 테스트를 위한 `VariantSwitcher.tsx`를 생성했습니다.
- URL 쿼리 파라미터를 통한 전환 지원: `/?variant=gemini1|gemini2|gemini3|gemini4|opus`

### 2. Icon Library 변경

- `lucide-react`를 Huge Icons (`@hugeicons/core-free-icons`)로 교체했습니다.
- 모든 변형에서 `HugeiconsIcon` 컴포넌트를 사용합니다.

### 3. Color System 통합

- 하드코딩된 모든 색상을 CSS 토큰(`bg-background`, `bg-card` 등)으로 교체했습니다.
- 다크 모드 지원을 검증했습니다.

### 4. Navigation Links 수정

- 쿼리 파라미터 보존을 위해 `/#section`에서 `#section`으로 변경했습니다.

### 5. Gemini3 테마 전환 (Theme Transform)

- "Software/Cybernetic"에서 "Architectural/Bricklayer" 테마로 전환했습니다.
- 문구 변경: System_Online → Site_Active, Initialize_Plan → Lay_Foundation 등

### 6. Opus Redesign

- "Ziegler" 벽돌공 브랜드 테마로 완전히 재디자인했습니다.
- 벽돌 쌓기 시각적 메타포, 레이어드 그림자, 건설 관련 용어를 적용했습니다.

### 7. 배럴(barrel) 구조 미사용

- `index.ts` 배럴 파일 사용하지 않음 (사용자 요청)

### 8. 랜딩 페이지 전용 레이아웃

- `src/app/(landing)/layout.tsx` 라우트 그룹 생성하여 Sidebar가 필요한 인증 후 페이지와 분리했습니다.

### 9. 컴포넌트 스타일 (Sharp Corners)

- 모든 컴포넌트에 `rounded-none` 스타일을 적용하여 서비스 정체성을 유지했습니다.

## 🔍 트러블슈팅 및 블로커 (Blockers)

### 1. gemini4 다크 모드 이슈

- **문제:** `bg-[#f2ede4]`와 같은 하드코딩된 색상이 다크 모드에서 변경되지 않음
- **해결:** 테마 토큰(`bg-background`, `bg-card`)으로 교체

### 2. 그리드 셀 테두리 가시성

- **문제:** 다크 모드에서 `border-primary/20`이 너무 희미함
- **해결:** `border-primary/40`으로 변경하여 가시성 확보

### 3. 네비게이션 링크 쿼리 파라미터 유실

- **문제:** 링크 클릭 시 `?variant=` 파라미터가 사라짐
- **해결:** `href="/#method"`를 `href="#method"`로 변경

### 4. gemini3 Hero 영역 반응형 중첩

- **문제:** 1024-1200px 구간에서 콘텐츠가 겹침
- **해결:** `lg:text-7xl`을 `xl:text-7xl`로 변경하여 텍스트 크기 조절 시점을 늦춤

## 📜 Git Commits (Chronological)

```
cfe8989 💄 style: implement gemini1 landing page design with variant switcher
c26a489 💄 style: add gemini2 landing page design (Editorial/Magazine)
105f6ce 💄 style: add gemini3 landing page design (Technical Blueprint)
4bec976 💄 style: add gemini4 landing page design (Warm Paper/Handwritten)
92a69fc 🐛 fix: use theme tokens for gemini4 dark mode support
3c15fdf 🐛 fix: improve gemini4 dark mode icon bg and grid cell border visibility
87ae262 🐛 fix: use hash-only links to preserve variant query param
33ff55d 💄 style: redesign opus landing with brick-stacking Ziegler theme
d32973e 💄 style: transform gemini3 to architectural/bricklayer theme + fix responsive overlap
15350b9 🐛 fix: restore lg breakpoint and delay text size increase to xl for gemini3 hero
```

### 사용자 추가 작업 (User's Additional Work)

```
3b17eeb 🔥 Narrow landing page down to three
33206f2 💄 Edit designs
c147866 🔥 Pick gemini4 version as landing page
31a7d85 ♻️ Refactor landing page
bd2b8ef 💫 Fix arrow hover effect
```

## 📋 준수된 제약 사항 (Constraints Followed)

- Huge Icons만 사용 (lucide-react 미사용)
- `globals.css` 토큰 색상만 사용
- Sharp corners만 사용 (`rounded-*` 미사용)
- shadcn 컴포넌트는 읽기 전용으로 유지
- 배럴 파일 미사용
- 코드 주석 미사용

## ⚠️ 기술적 부채 및 할 일 (Next Steps)

- **브랜치 병합:** `develop` 브랜치로 수동 병합 (사용자 수행 예정)
- **콘텐츠 고도화:** 실제 페이지 문구 및 내용 정교화
