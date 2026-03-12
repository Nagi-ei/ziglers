# AGENTS.md (for Mandalart Web)

_Last updated: 2026-03-13 (KST)_

---

## 1) 목적

이 문서는 Mandalart Web의 프로젝트 공통 AI 작업 규칙을 정의한다.
특히 현재 설치된 스킬과 구현 워크플로우를 다음 기준에 맞춰 정렬한다.

- `.agent/sessions/...` 기반 브랜치 사이클
- 프로젝트 전용 프론트엔드 아키텍처 규칙
- 현재 서버/클라이언트 데이터 접근 경계
- 영문 원본 문서와 한국어 번역 문서 동기화

`PRD.md`, `SCAFFOLD_STRUCTURE.md`, `TECH_REFERENCE.md`는 계속 핵심 프로젝트 문서로 유지한다.
이 문서는 그 문서들을 기준으로 항상 적용되어야 하는 프로젝트 공통 지침을 정의한다.

---

## 2) 기준 문서(Source of Truth)

- 제품 목표와 범위: `PRD.md`
- 프로젝트 스캐폴드 및 레이어 경계: `SCAFFOLD_STRUCTURE.md`
- 기술 구현 세부 기준: `TECH_REFERENCE.md`
- 브랜치 로컬 실행 산출물:
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/spec.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/research.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/plan.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/plans/*.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/log.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/handoff.md`

영문 프로젝트 문서를 원본으로 본다.
`docs/*.ko.md`의 한국어 문서는 영문 원본 변경이 확정된 뒤 동기화해야 한다.

---

## 3) 전역 코딩 및 생성 규칙

### 컴포넌트 파일 규칙

- 각 React 컴포넌트는 자신의 파일에 있어야 한다.
- 새 컴포넌트를 만들면 즉시 새 파일로 분리한다.
- 앱 전용 React 컴포넌트를 한 파일에 여러 개 정의하는 것은 허용하지 않는다.

#### 허용 예외

| 예외                             | 예시                                                                     | 조건                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Route-local wrapper**          | Suspense 또는 Error Boundary 구성을 위한 `page.tsx` 내부 private wrapper | 라우트 파일 내부에만 존재해야 하고, export되면 안 되며, 직접적인 페이지 경계 구성 목적이어야 한다 |
| **설치된 shadcn primitive 파일** | `Tabs`, `DropdownMenu`, `NavigationMenu` 같은 설치형 파일                | `components.json`과 프로젝트 스캐폴드가 정의한 canonical shadcn primitive surface에 속해야 한다   |

#### 추가 조건

- 설치된 shadcn primitive 파일은 vendor-like UI primitive로 취급한다.
- 스타일, variant, 접근성, 타입, upstream-compatible fix 정도만 허용한다.
- feature logic, business logic, data fetching, mutation orchestration을 흡수하면 안 된다.

### 데이터 접근 규칙

- 모든 데이터베이스 접근은 서버 사이드에서만 수행한다.
- Prisma가 애플리케이션 레벨의 주요 데이터 접근 계층이다.
- Supabase는 auth/session, storage, 데이터베이스 레벨의 RLS 인가를 담당한다.
- Client Component는 데이터베이스에 직접 접근하면 안 된다.
- 기본 원칙:
  - 조회는 Server Component 또는 server-only 모듈
  - 쓰기는 Server Action
  - Route Handler는 public API, webhook, external callback 경계에만 사용

### Query Key 규칙

- TanStack Query key는 명시적이고 안정적인 factory 형태로 작성한다.
- 다음과 같은 계층형 구조를 권장한다.
  - `all -> list -> listBy -> entity/detail -> subresource`
- key helper는 도메인 소유 모듈에 두고, 컴포넌트 안에 inline query key를 흩뿌리지 않는다.

### 추상화 규칙

- service, repository, adapter 레이어를 기본값으로 만들지 않는다.
- 다음처럼 독립적인 가치가 있을 때만 repository/adapter 경계를 도입한다.
  - 실제 transport/backend swap을 위한 안정적인 계약
  - 다중 데이터 소스 경계
  - mapping/auth/transaction 책임이 분리될 때 더 명확한 경우
- 아래 호출을 한 번 감싸는 forwarding-only wrapper는 표준이 아니라 smell로 본다.

---

## 4) 협업 규칙

| 규칙                        | 설명                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| **단일 책임**               | 각 변경은 설명 가능한 책임 경계 안에 머물러야 한다.                                             |
| **구조 변경에는 의도 필요** | 구조를 바꾸는 수정은 casual하게 넣지 말고 브랜치 spec/plan에서 정당화해야 한다.                 |
| **자동화 우선**             | non-trivial branch work는 기본적으로 branch-cycle workflow를 따른다.                            |
| **문서 우선**               | 아키텍처/워크플로우 규칙이 바뀌면 먼저 영문 원본 문서를 고치고 그다음 한국어 번역을 동기화한다. |
| **스킬 우선순위**           | project-specific skill이 generic framework/vendor advice보다 우선한다.                          |

---

## 5) 브랜치 전달 워크플로우

non-trivial branch work에는 다음 순서를 사용한다.

1. **Spec**
2. **Research** (조건부)
3. **Planner**
4. **Execution**
5. **Hardening**
6. **Review**
7. **Refactor**
8. **Final Verify**

### 세션 규약

- Git branch 형식: `<prefix>/<issue-number>--<slug>`
- 허용 prefix: `feature`, `ui`, `refactor`, `fix`, `docs`, `chore`
- 세션 폴더 형식: `[#<issue-number>]<prefix>--<slug>`
- Artifact root: `.agent/sessions/[#<issue-number>]<prefix>--<slug>/`

### 산출물 동작 방식

- `spec.md`는 브랜치 의도를 고정한다.
- `research.md`는 필요할 때만 존재한다.
- `plan.md`는 최신 승인 실행 계획이다.
- `plans/*.md`는 plan snapshot 저장소다.
- `log.md`는 append-only 실행 이력이다.
- `handoff.md`는 rolling latest-state resume 문서다.
- mid-session compact는 `handoff.md`를 다시 쓰고 `log.md`에 compact checkpoint를 append한다.

### 문서 브랜치에 대한 메모

- 문서 브랜치도 같은 stage 순서를 사용한다.
- 다른 점은 stage 이름이 아니라 검증 증거다.
  - hardening은 문서 간 일관성, stale example, 용어 drift 점검에 집중
  - final verify는 cross-document alignment와 file/path/tooling correctness 점검에 집중

### UI 브랜치에 대한 메모

- 새 화면을 만들거나 사용자 UI를 크게 재설계하는 브랜치는 Execution에서 design-oriented path를 사용하고, Review에서 UI guideline 점검을 포함한다.

---

## 6) 향후 확장

| 항목                      | 설명                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **M2 transport boundary** | 실제 Nest API나 외부 transport 경계가 생기면 기본값처럼 두지 말고, 정당화된 server-only adapter boundary로 문서화한다. |
| **모바일 연동 (RN/Expo)** | 실제 재사용 가치가 있을 때만 query key와 type convention을 공유한다.                                                   |
| **자동 번역**             | 영문/한글 프로젝트 문서 동기화 워크플로우 개선                                                                         |
| **테스트 시나리오 생성**  | 승인된 브랜치 spec 또는 제품 요구로부터 Playwright E2E 시나리오 생성                                                   |

---

## 요약

이 문서는 Mandalart Web에서 어떤 AI 작업이든 항상 따라야 할 프로젝트 공통 지침을 정의한다.

- branch-cycle workflow를 따른다
- 문서와 번역을 함께 관리한다
- 직접적이고 설명 가능한 server/client boundary를 선호한다
- 저가치 추상화를 피한다
- 설치된 shadcn primitive와 프로젝트 UI를 분리해서 다룬다
