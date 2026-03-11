# AGENTS.md (for Mandalart Web)

_Last updated: 2026-03-12 (KST)_

---

## 1) 목적

이 문서는 Mandalart Web의 AI 에이전트 운영 모델을 정의한다.
특히 현재 설치된 스킬과 구현 워크플로우를 다음 기준에 맞춰 정렬한다.

- `.agent/sessions/...` 기반 브랜치 사이클
- 프로젝트 전용 프론트엔드 아키텍처 규칙
- 현재 서버/클라이언트 데이터 접근 경계
- 영문 원본 문서와 한국어 번역 문서 동기화

`PRD.md`, `SCAFFOLD_STRUCTURE.md`, `TECH_REFERENCE.md`는 계속 핵심 프로젝트 문서로 유지한다.
이 문서는 에이전트가 그 문서들을 기준으로 어떻게 작업해야 하는지를 정의한다.

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

## 3) 에이전트 계층

| 레벨        | 이름                     | 역할                                                           | 기준 문서                         |
| ----------- | ------------------------ | -------------------------------------------------------------- | --------------------------------- |
| Core Agent  | **Architect**            | 스캐폴드, 레이어 경계, 서버/클라이언트 데이터 접근 규칙을 강제 | `SCAFFOLD_STRUCTURE.md`           |
| Logic Agent | **Feature Builder**      | 승인된 브랜치 스펙을 서버/클라이언트 애플리케이션 코드로 구현  | `TECH_REFERENCE.md`               |
| UI Agent    | **Interface Crafter**    | 프로젝트 UI 규칙과 shadcn/ui를 기준으로 사용자 UI를 구현/개선  | `PRD.md`, `SCAFFOLD_STRUCTURE.md` |
| QA Agent    | **Validator**            | 검증, 리뷰, 브랜치 품질 게이트 수행                            | `TECH_REFERENCE.md`               |
| Ops Agent   | **CI/CD Manager**        | 환경, CI/CD, 배포 가정을 검증                                  | `TECH_REFERENCE.md`               |
| Doc Agent   | **Knowledge Maintainer** | 영문/한글 문서와 브랜치 산출물을 동기화                        | 모든 문서                         |

---

## 4) 전역 코딩 및 생성 규칙

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

## 5) 역할 상세

### 5.1 Architect Agent

- **목표:** 스캐폴드와 경계 규칙을 강제한다.
- **기준 문서:** `SCAFFOLD_STRUCTURE.md`
- **주요 기능:**
  - 해당 레이어가 존재할 때 `app -> widgets -> features -> entities -> shared` import 방향 위반 탐지
  - server-only 경계 밖의 Prisma 사용 또는 client-side DB 접근 탐지
  - 스캐폴드를 우회하는 ad-hoc 폴더 및 중복 구조 탐지
  - 설치된 shadcn primitive surface 밖에서 multi-export 예외를 남용하는 경우 탐지
- **트리거:** 아키텍처 변경, 스캐폴드 변경, 리팩토링 비중이 큰 브랜치

### 5.2 Feature Builder Agent

- **목표:** 승인된 브랜치 스펙을 실제 코드 구조로 구현한다.
- **기준 문서:** `TECH_REFERENCE.md`, `SCAFFOLD_STRUCTURE.md`
- **주요 기능:**
  - 브랜치 `spec.md`와 `plan.md`를 구현 slice로 번역
  - Server Component read, Server Action write, feature-local UI mutation hook 우선 적용
  - 승인된 프로젝트 query key / invalidation 규칙 적용
  - repository/adapter는 plan에서 가치가 명시된 경우에만 도입
- **출력 예시:** `feature_task_done.diff`

### 5.3 Interface Crafter Agent

- **목표:** 일관되고 의도적인 UI 구현 품질을 유지한다.
- **기준 문서:** `PRD.md`, `SCAFFOLD_STRUCTURE.md`
- **주요 기능:**
  - custom UI primitive를 만들기 전에 설치된 shadcn/ui primitive를 재사용
  - 프로젝트 전용 UI를 설치된 shadcn primitive surface 밖에 배치
  - 허용된 예외 외에는 one-component-per-file 규칙 적용
  - 새 화면/대규모 시각 재설계처럼 디자인 주도 브랜치에서는 design-oriented skill 경로 사용
- **출력 예시:** `ui_report.md`

### 5.4 Validator Agent

- **목표:** 정확성, 안정성, 리뷰 품질을 유지한다.
- **기준 문서:** `TECH_REFERENCE.md`
- **주요 기능:**
  - lint/type/test 및 브랜치 타입에 맞는 검증 수행
  - 브랜치 acceptance criteria와 specialist skill 기준으로 변경 파일 검토
  - UI 변경 시 접근성 및 web-interface guideline 리뷰 포함
  - 문서 브랜치에서는 문서 간 일관성, 죽은 예시, stale name/path 점검
- **출력:** `qa_report.md`

### 5.5 CI/CD Manager

- **목표:** 환경 및 전달 가정이 계속 맞는 상태인지 보장한다.
- **기준 문서:** `TECH_REFERENCE.md`
- **주요 기능:**
  - GitHub Actions 및 배포 가정이 현재 저장소 상태와 맞는지 확인
  - 환경 변수 이름과 server/client 노출 경계 검증
  - package manager/runtime 가정이 실제 프로젝트 설정과 맞는지 유지
  - 필요 시 preview/prod 배포 워크플로우 트리거

### 5.6 Knowledge Maintainer

- **목표:** 문서와 브랜치 산출물 동기화를 유지한다.
- **기준 문서:** `PRD.md`, `SCAFFOLD_STRUCTURE.md`, `TECH_REFERENCE.md`
- **주요 기능:**
  - 구현 규칙이 바뀔 때 문서 간 일관성 유지
  - 영문 원본과 `docs/*.ko.md` 동기화
  - 브랜치 진행에 따라 `spec.md`, `research.md`, `plan.md`, `log.md`, `handoff.md` 업데이트
  - 영문에서 제거된 stale pattern이 번역 문서에 다시 들어오지 않도록 방지

---

## 6) 협업 규칙

| 규칙                        | 설명                                                                                            |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| **단일 책임**               | 각 에이전트는 설명 가능한 책임 경계 안에서만 동작해야 한다.                                     |
| **구조 변경에는 의도 필요** | 구조를 바꾸는 수정은 casual하게 넣지 말고 브랜치 spec/plan에서 정당화해야 한다.                 |
| **자동화 우선**             | non-trivial branch work는 기본적으로 branch-cycle workflow를 따른다.                            |
| **문서 우선**               | 아키텍처/워크플로우 규칙이 바뀌면 먼저 영문 원본 문서를 고치고 그다음 한국어 번역을 동기화한다. |
| **스킬 우선순위**           | project-specific skill이 generic framework/vendor advice보다 우선한다.                          |

---

## 7) 브랜치 전달 워크플로우

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

---

## 8) 향후 확장

| 항목                      | 설명                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **M2 transport boundary** | 실제 Nest API나 외부 transport 경계가 생기면 기본값처럼 두지 말고, 정당화된 server-only adapter boundary로 문서화한다. |
| **모바일 연동 (RN/Expo)** | 실제 재사용 가치가 있을 때만 query key와 type convention을 공유한다.                                                   |
| **자동 번역**             | 영문/한글 프로젝트 문서 동기화 워크플로우 개선                                                                         |
| **테스트 시나리오 생성**  | 승인된 브랜치 spec 또는 제품 요구로부터 Playwright E2E 시나리오 생성                                                   |

---

## 요약

이 문서는 현재 Mandalart Web의 AI 에이전트 운영 기준을 정의한다.

- branch-cycle workflow를 따른다
- 문서와 번역을 함께 관리한다
- 직접적이고 설명 가능한 server/client boundary를 선호한다
- 저가치 추상화를 피한다
- 설치된 shadcn primitive와 프로젝트 UI를 분리해서 다룬다
