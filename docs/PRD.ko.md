# Mandalart Web – PRD (v1.0)
_Last updated: 2025-11-08 (KST)_

---

## 1) Product Overview

**One-liner**  
주제별 만다라트 보드를 만들고 진행도를 체크하며, 계정별 통계 대시보드와 완성본 이미지/PDF 내보내기를 지원하는 웹앱.

**Primary Users**

- 개인 목표 관리자: 개인, 학습, 커리어 등의 목표를 구조화해 관리하는 사용자

**Main Goals (from Nagi)**

1. 주제별 여러 만다라트 보드 생성 및 항목 달성 체크  
2. 계정별 대시보드(달성도, 월별 달성 개수 등) + 보드 완성본 이미지/PDF 다운로드

---

## 2) Scope

### 2.1 MVP 기능

- **인증/계정:** Supabase Auth (이메일/비밀번호 + OAuth)
- **보드 관리:** 3×3 셀 구조, 각 셀 제목·메모·체크 항목 등록
- **체크/달성:** 태스크 단위 완료/미완료 체크
- **대시보드:** 전체/보드별 진행률, 월별 완료 수, 최근 활동 로그
- **내보내기:** 단일 보드 → 이미지(PNG) 및 PDF 다운로드
- **랜딩:** 서비스 소개, 예시, 인기 주제(템플릿)
- **마이 페이지:** 대시보드, 새 보드 추가, 나의 보드 목록

### 2.2 Post-MVP (Later)

- 보드 공유(읽기/코멘트)
- 보드 템플릿 갤러리 + 커뮤니티 인기 템플릿
- 알림(리마인더)
- 모바일 앱(React Native + Nest.js 백엔드)

---

## 3) UX & IA

### 3.1 주요 화면

- **랜딩:** 만다라트 소개, 사용 예시, 인기 주제, CTA(시작하기)
- **마이 페이지:**
  - 대시보드(진행률, 월별 완료 차트, 최근 로그)
  - 새 만다라트 추가(템플릿 선택 or 빈 보드)
  - 나의 보드 리스트(최근 업데이트 순)
- **보드 화면 (핵심):**
  - 3×3 그리드(중앙: 메인 목표, 주변 8개: 하위 목표)
  - 셀 상세: 제목, 메모, 체크리스트, 완료율 시각화
  - 내보내기 버튼(PNG/PDF)

### 3.2 사용자 플로우 요약

1. 가입/로그인  
2. 새 보드 생성 (주제 입력/템플릿 선택)  
3. 셀 내용 및 태스크 입력  
4. 태스크 체크  
5. 대시보드에서 진행 상황 확인  
6. 완료 시 PNG/PDF로 내보내기

---

## 4) 기술 스택 (요약)

- **Framework:** Next.js (App Router) + TypeScript  
- **DB/Backend:** Supabase (Postgres, Auth, Storage, RLS)  
- **Styling/UI:** TailwindCSS, shadcn/ui  
- **State/Data:** TanStack Query, Zustand, Zod  
- **차트:** Recharts  
- **내보내기:** html-to-image, jsPDF  
- **테스트:** Jest, Playwright, MSW  
- **CI:** GitHub Actions  
- **패키지 매니저:** pnpm  
- **Lint/Format:** Biome + ESLint(next) + Prettier  

> 세부 버전, 설정, 인덱스, 라이브러리 선택 근거는 **TECH_REFERENCE.md** 참조

---

## 5) 데이터 모델 (요약)

만다라트는 3×3 셀 구조(중앙 목표 + 8개 하위 목표)로 구성되며, MVP에서는 **1단계 확장(1-depth)**까지만 지원한다.

### 5.1 엔터티 개요

- **profiles:** 사용자 프로필 (Auth 연동)
- **boards:** 만다라트 보드 (주제, 설명, 소유자)
- **cells:** 각 보드의 3×3 셀 (제목, 메모, 계층 연결)
- **tasks:** 셀별 체크 항목 (내용, 완료 여부)
- **events:** 사용자 활동 로그 (태스크 완료 등)

### 5.2 데이터베이스 정의
- 모든 테이블은 RLS 활성화
- 외래키는 `on delete cascade` 정책 사용
- board_id, cell_id, owner_id 기준 인덱스 설정
- 실제 SQL 정의 및 인덱스는 **TECH_REFERENCE.md** 참조

---

## 6) 기능 요구사항

### 6.1 보드
- 3×3 그리드 기반 셀 구조
- 셀 클릭 시 Drawer 상세 보기
- 셀 편집은 600ms 디바운스 자동 저장
- 포커스 아웃 시 즉시 저장
- 충돌 감지(`updated_at`) 시 새 버전 알림 표시

### 6.2 태스크 체크
- 체크/해제 시 `events` 로그 기록
- 낙관적 업데이트 후 실패 시 롤백 및 토스트 표시

### 6.3 대시보드
- 전체 완료율 = 완료 태스크 수 / 전체 태스크 수
- 월별 완료 수, 최근 10건 로그 표시
- 모든 시간은 `Asia/Seoul` 기준

### 6.4 내보내기
- PNG (2x, 투명 배경 off)
- PDF (A4, 여백 12mm, Pretendard 폰트)
- 2.5초 초과 시 로딩 인디케이터 표시
- 파일명 규칙: `{board-title}_{YYYY-MM-DD}.png|pdf`

---

## 7) 데이터 접근 및 API

- Supabase SDK (`supabase-js`) 직접 호출
- TanStack Query로 캐시 관리 및 동기화
- Server Actions로 민감한 작업(PDF 렌더 등) 처리
- 공개 보드는 비로그인 접근 허용 + RLS 일관 유지
- 캐시 정책: `revalidateTag('board:{id}')` + `invalidateQueries(['board', id])`

> SQL 쿼리, API 호출 예시, 구현 코드는 **TECH_REFERENCE.md** 참조

---

## 8) 상태 관리 & 검증

- **Zustand:** UI 로컬 상태(모달, 셀 선택 등)
- **TanStack Query:** 보드/셀/태스크 데이터 관리
- **Zod:** 폼 입력 검증
- **react-hook-form:** 폼 관리

> 실제 스키마 코드 및 검증 로직은 **TECH_REFERENCE.md** 참조

---

## 9) 컴포넌트 구조 (shadcn/ui 기반)

- `BoardGrid` → `BoardCell` → `CellDetailDrawer`
- `TaskItem` (체크박스 항목)
- `DashboardCards` (진행률, 월별 차트, 활동 로그)
- `ExportButtonGroup` (PNG/PDF 내보내기)
- `TemplatePicker` (보드 생성용)
- `ThemeSwitcher`, `LocaleSwitcher`

---

## 10) 성능 · 접근성 · 국제화

- Lighthouse 목표: Performance ≥ 90 / Accessibility ≥ 95  
- A11y: 키보드 탐색, 포커스 표시, 레이블 명확화  
- Lazy loading, Next `<Image>` 사용  
- font-display=swap, Critical CSS 최소화  

### 10.1 다크 모드
- Tailwind `dark:` + `next-themes`
- 시스템 감지(auto) + 사용자 토글 지원
- `theme: "light" | "dark" | "system"` 로컬스토리지 저장

### 10.2 다국어 (한국어/영어)
- `next-intl` 기반
- 기본: `ko` / 보조: `en`
- 경로: `/dashboard`, `/en/dashboard`
- 키 네이밍 규칙: `page.section.key`
- 런타임 폴백: 영어

---

## 11) 보안 & 개인정보

- Supabase RLS로 사용자 데이터 격리
- 공개 보드만 익명 접근 허용
- `events` 로그에 PII 최소화
- 환경 변수:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE` (서버 전용)
- 보안 헤더:
  - `X-Frame-Options=DENY`
  - `Referrer-Policy=strict-origin-when-cross-origin`
  - `CSP: script-src 'self'; img-src 'self' data:`

---

## 12) 리스크 & 대응

| 리스크 | 대응 전략 |
|--------|-----------|
| 캔버스 캡처 품질 문제 | 프린트 전용 레이아웃 + 폰트 preload |
| 모바일 편집 UX 복잡도 | Drawer 중심 편집으로 단순화 |
| RLS 정책 누락 | e2e 테스트 + 정책 점검 스크립트 |
| Supabase 비용 증가 | Edge Function 호출 제한 + 캐싱 강화 |

---

## 13) 성능 & 품질 목표

- LCP ≤ 2.5s / FID ≤ 100ms / CLS ≤ 0.1  
- Lazy loading 적용  
- RSC 캐시 유지율 ≥ 80%  

---

## 14) 테스트 & CI

### 구성 개요
- **Unit/Integration:** Jest + Testing Library + jest-dom + MSW  
- **E2E:** Playwright  
- **Coverage:** Jest(V8)  
- **CI:** GitHub Actions + pnpm  

### 파이프라인
1. **Lint/Format:** `pnpm biome check`, `pnpm next lint`
2. **Unit/Integration:** `pnpm test --runInBand --coverage`
3. **E2E:** `pnpm exec playwright install --with-deps` → `pnpm exec playwright test --reporter=line`

### 테스트 피라미드

| 레벨 | 도구 | 목적 | 비율 |
|------|------|------|------|
| Unit | Jest | 함수·컴포넌트 단위 | 60% |
| Integration | Jest + MSW | 데이터·상태 통합 | 25% |
| E2E | Playwright | 실제 사용자 플로우 | 15% |

> 각 테스트의 세부 시나리오와 API 모킹 예시는 **TECH_REFERENCE.md** 참조

---

## 15) 문서 연결 구조

- **PRD.md** – 제품 정의 및 요구사항  
- **TECH_REFERENCE.md** – 기술 명세, SQL, 코드 예시, 버전 정보  
- **SCAFFOLD_STRUCTURE.md** – 폴더 및 컴포넌트 구조(FSD-Lite)  
- **AGENTS.md** – Codex 에이전트 지침 및 문맥 연결 설정  

---

✅ **요약:**  
이 PRD는 Mandalart Web의 **MVP 제품 정의 기준 문서**다.  
모든 기술적 구현은 TECH_REFERENCE.md를 근거로 하며,  
프로젝트의 목표, UX 흐름, 정책, 품질 기준은 본 문서를 기준으로 유지한다.
