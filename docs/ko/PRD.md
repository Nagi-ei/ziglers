# Mandalart Web – PRD (v1.1)

_Last updated: 2026-03-13 (KST)_

---

## 1) 제품 개요

**한 줄 소개**
주제별 만다라트 보드를 만들고 진행도를 추적하며, 계정 단위 대시보드 통계를 확인하고 완성된 보드를 이미지 또는 PDF로 내보낼 수 있는 웹앱이다.

**주요 사용자**

- 개인 목표 관리자: 개인 생활, 학습, 커리어와 관련된 목표를 구조화하고 관리하는 사용자

**주요 목표 (Nagi 기준)**

1. 주제별로 여러 만다라트 보드를 만들고 항목 달성을 체크한다.
2. 계정별 대시보드(달성률, 월별 완료 수 등)를 제공하고, 완성된 보드를 이미지/PDF로 다운로드할 수 있게 한다.

---

## 2) 범위

### 2.1 MVP 기능

- **인증/계정:** Supabase Auth (이메일/비밀번호 + OAuth)
- **보드 관리:** 3×3 셀 구조, 각 셀에 제목, 메모, 체크리스트 항목 포함
- **체크/달성:** 태스크 완료/미완료 체크
- **대시보드:** 전체/보드 단위 진행률, 월별 완료 수, 최근 활동 로그
- **내보내기:** 단일 보드를 이미지(PNG) 및 PDF로 다운로드
- **랜딩 페이지:** 서비스 소개, 사용 예시, 인기 주제(템플릿)
- **마이 페이지:** 대시보드, 새 보드 생성, 사용자 보드 목록

### 2.2 Post-MVP (이후)

- 보드 공유(읽기/댓글)
- 템플릿 갤러리 + 커뮤니티 인기 템플릿
- 알림(리마인더)
- 모바일 앱(React Native + Nest.js 백엔드)

---

## 3) UX & IA

### 3.1 주요 화면

- **랜딩 페이지:** 만다라트 소개, 사용 예시, 인기 주제, CTA(시작하기)
- **마이 페이지:**
  - 대시보드(진행률, 월별 차트, 최근 로그)
  - 새 만다라트 추가(템플릿 선택 또는 빈 보드)
  - 내 보드 목록(최근 업데이트 순)
- **보드 화면 (핵심):**
  - 3×3 그리드(중앙: 메인 목표, 주변 8개: 하위 목표)
  - 셀 상세: 제목, 메모, 체크리스트, 완료 시각화
  - 내보내기 버튼(PNG/PDF)

### 3.2 사용자 플로우 요약

1. 회원가입 / 로그인
2. 새 보드 생성(주제 입력 / 템플릿 선택)
3. 셀 내용과 태스크 입력
4. 태스크 체크
5. 대시보드에서 진행 상황 확인
6. 완료 시 PNG/PDF로 내보내기

---

## 4) 기술 스택 (요약)

- **Framework:** Next.js (App Router) + TypeScript
- **DB/Backend:** Supabase (Postgres, Auth, Storage, RLS) + Prisma ORM
- **Styling/UI:** TailwindCSS, shadcn/ui
- **State/Data:** TanStack Query, Zustand, Zod
- **차트:** Recharts
- **내보내기:** html-to-image, jsPDF
- **테스트:** Jest, Playwright, MSW
- **CI:** GitHub Actions
- **패키지 매니저:** pnpm
- **Lint/Format:** Biome + ESLint(next) + Prettier (문서/마크다운)

> Prisma는 서버 사이드의 주요 데이터 접근 계층으로 사용한다. Supabase는 Auth, Storage, RLS 기반 인가를 담당한다.

> 상세 버전, 설정, 인덱스, 라이브러리 선택 근거는 **TECH_REFERENCE.md**를 참고한다.

---

## 5) 데이터 모델 (요약)

Mandalart는 3×3 셀 구조(중앙 목표 + 8개의 하위 목표)로 이루어진다.
MVP는 **1단계 확장(1-depth)**만 지원한다.

### 5.1 엔티티 개요

- **profiles:** 사용자 프로필(Supabase Auth와 연결)
- **boards:** 만다라트 보드(주제, 설명, 소유자)
- **cells:** 각 보드의 3×3 셀(제목, 메모, 계층 연결)
- **tasks:** 셀 단위 체크리스트 항목(내용, 완료 상태)
- **events:** 사용자 활동 로그(태스크 완료 등)

### 5.2 데이터베이스 & ORM 정책

- Prisma 스키마는 애플리케이션 레벨 데이터 모델의 **단일 기준(Single Source of Truth)** 이다.
- Supabase Postgres를 실제 데이터베이스로 사용한다.
- 모든 테이블은 Supabase RLS를 활성화한다.
- Prisma 모델은 데이터베이스 테이블과 관계를 정확히 반영한다.
- 외래 키는 `on delete cascade`를 사용한다.
- `board_id`, `cell_id`, `owner_id`에 인덱스를 둔다.

> Prisma 스키마, 마이그레이션, 생성된 클라이언트 사용 방식은 **TECH_REFERENCE.md**에 정의한다.

---

## 6) 기능 요구사항

### 6.1 보드

- 3×3 그리드 기반 셀 구조
- 셀 클릭 시 Drawer 상세 보기
- 셀 편집은 600ms debounce 자동 저장
- blur 시 즉시 저장
- 충돌 감지(`updated_at`) 시 새 버전 알림 표시

### 6.2 태스크 체크

- 토글 시 `events`에 이벤트 로그 기록
- 낙관적 업데이트 사용, 실패 시 rollback + toast 표시

### 6.3 대시보드

- 전체 완료율 = 완료 태스크 수 / 전체 태스크 수
- 월별 완료 수와 최근 10개 로그 표시
- 모든 시간은 `Asia/Seoul` 타임존 기준

### 6.4 내보내기

- PNG (2x, 투명 배경 없음)
- PDF (A4, 12mm 여백, Pretendard 폰트)
- 2.5초를 넘기면 로딩 인디케이터 표시
- 파일명 규칙: `{board-title}_{YYYY-MM-DD}.png|pdf`

---

## 7) 데이터 접근 & API

- **주요 데이터 접근:** Prisma Client (server-only)
- **Supabase SDK 사용 범위:**
  - Auth (세션, 사용자)
  - Storage (내보낸 파일, 에셋)
- 클라이언트 측에서 데이터베이스에 직접 접근하지 않는다.
- 조회는 Server Component 또는 다른 server-only 경계에서 수행한다.
- Server Action은 내부 CRUD mutation 흐름의 기본 경계다.
- Route Handler는 public API, webhook, 외부 callback 경계에 한정한다.
- Prisma는 다음을 담당한다.
  - CRUD 연산
  - 관계 처리
  - 트랜잭션 관리
- Supabase RLS는 최종 인가 계층으로 유지한다.

> 이 섹션은 **서버 사이드 데이터 접근 책임만** 정의한다.
> 클라이언트 측 캐싱, 동기화, UI 상태 관리는 TanStack Query가 별도로 담당한다(8번 섹션 참고).

- 캐시 정책: `revalidateTag('board:{id}')`

> Prisma 쿼리, Supabase 연동 패턴, API 예시는 **TECH_REFERENCE.md**에 정의한다.

---

## 8) 상태 관리 & 검증

- **Zustand:** 로컬 UI 상태(모달, 선택된 셀 등)
- **TanStack Query:** 클라이언트 사이드 서버 상태 관리
  - 캐싱 및 요청 중복 제거
  - 백그라운드 refetch 및 동기화
  - 낙관적 업데이트(예: 태스크 체크/해제)
  - 서버 변경과 연결된 캐시 무효화
- **Zod:** 폼과 payload 검증
- **react-hook-form:** 폼 처리

> TanStack Query는 **서버 데이터 레이어 위에서** 동작한다.
> Prisma는 클라이언트에 노출되지 않으며, 클라이언트 캐싱이나 동기화 concerns를 대체하지 않는다.

> Query key는 inline 배열을 임의로 흩뿌리기보다, 안정적인 계층형 key-factory 규약을 따라야 한다.

> 실제 스키마 코드와 검증 로직은 **TECH_REFERENCE.md**에 정의한다.

---

## 9) 컴포넌트 구조 (shadcn/ui 기반)

- `BoardGrid` → `BoardCell` → `CellDetailDrawer`
- `TaskItem` (체크박스 항목)
- `DashboardCards` (진행률, 월별 차트, 활동 로그)
- `ExportButtonGroup` (PNG/PDF 내보내기)
- `TemplatePicker` (새 보드 생성용)
- `ThemeToggle`
- `LocaleSwitcher` (앱 셸에서 국제화가 활성화된 경우)

---

## 10) 성능 · 접근성 · 국제화

- Lighthouse 목표: Performance ≥ 90 / Accessibility ≥ 95
- A11y: 키보드 탐색, 포커스 표시, 명확한 레이블
- Lazy loading, Next `<Image>` 사용
- `font-display=swap`, critical CSS 최소화

### 10.1 다크 모드

- Tailwind `dark:` + `next-themes`
- 시스템 감지(auto) + 사용자 토글 지원
- localStorage에 `theme: "light" | "dark" | "system"` 형태로 저장

### 10.2 국제화 (한국어/영어)

- 제품 목표: 경로 기반 locale routing으로 한국어/영어 UI를 분리한다.
- 기본 언어: `ko` / 보조 언어: `en`
- 예시 경로: `/dashboard` (기본 `ko`), `/en/dashboard`
- 키 네이밍 규칙: `page.section.key`
- 런타임 fallback: 영어

> 정확한 i18n 라이브러리와 실제 적용 상태는 저장소에 활성화될 때 **TECH_REFERENCE.md**에 기록한다.

---

## 11) 보안 & 개인정보

- Supabase RLS를 통한 사용자 데이터 격리
- 공개 보드만 익명 접근 허용
- `events` 로그에는 PII를 최소화한다.
- 환경 변수:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE` (server-only)
- 보안 헤더:
  - `X-Frame-Options=DENY`
  - `Referrer-Policy=strict-origin-when-cross-origin`
  - `CSP: script-src 'self'; img-src 'self' data:`

---

## 12) 리스크 & 대응

| 리스크                | 대응 전략                           |
| --------------------- | ----------------------------------- |
| 캔버스 캡처 품질 문제 | 프린트 전용 레이아웃 + 폰트 preload |
| 모바일 편집 UX 복잡도 | Drawer 기반 편집으로 단순화         |
| RLS 정책 누락         | e2e 테스트 + 정책 점검 스크립트     |
| Supabase 비용 증가    | Edge Function 호출 제한 + 캐싱 강화 |

---

## 13) 성능 & 품질 목표

- LCP ≤ 2.5s / FID ≤ 100ms / CLS ≤ 0.1
- lazy loading 적용
- RSC cache retention ≥ 80%

---

## 14) 테스트 & CI

### 구성 개요

- **Unit/Integration:** Jest + Testing Library + jest-dom + MSW
- **E2E:** Playwright
- **Coverage:** Jest(V8)
- **CI:** GitHub Actions + pnpm

### 파이프라인

1. **Lint/Format:** 문서 파일이 바뀌면 `pnpm lint`와 `pnpm prettier:docs`
2. **Unit/Integration:** `pnpm test:unit`
3. **E2E:** `pnpm test:e2e`

### 테스트 피라미드

| 단계        | 도구       | 목적                      | 비율 |
| ----------- | ---------- | ------------------------- | ---- |
| Unit        | Jest       | 함수/컴포넌트 단위 테스트 | 60%  |
| Integration | Jest + MSW | 데이터/상태 통합 테스트   | 25%  |
| E2E         | Playwright | 실제 사용자 플로우        | 15%  |

> 상세 시나리오와 API mocking 예시는 **TECH_REFERENCE.md**에 정리한다.

---

## 15) 문서 링크 구조

- **PRD.md** – 제품 정의 및 요구사항
- **TECH_REFERENCE.md** – 기술 명세, SQL, 코드 예시, 버전 정보
- **SCAFFOLD_STRUCTURE.md** – 폴더 구조, 경계, 스캐폴드 규칙
- **AGENTS.md** – 에이전트 워크플로우, 브랜치 사이클, 문서 동기화 규칙

---

✅ **요약:**
이 PRD는 Mandalart Web의 **MVP 제품 정의 문서**다.
모든 기술 구현은 TECH_REFERENCE.md를 기준으로 진행되며,
이 문서는 프로젝트의 목표, UX 흐름, 정책, 품질 기준을 정의한다.
