# Mandalart Web - MASTER PLAN (v0.1)

_Last updated: 2026-03-17 (KST)_

---

## 1) 목적

이 문서는 Mandalart Web의 최상위 전달 계획 문서다.
현재 소스 오브 트루스 문서들을 연결하고, 활성 프로젝트 baseline을 고정하며, 앞으로의 이슈 기반 브랜치가 현재 상태에서 MVP 완료까지 어떤 순서로 진행되어야 하는지 정의하기 위해 존재한다.

이 문서는 핵심 문서를 대체하지 않는다.

- `docs/PRD.md`는 제품 목표, 범위, 기능 요구사항을 계속 소유한다.
- `docs/SCAFFOLD_STRUCTURE.md`는 스캐폴드, 레이어, 파일 배치 규칙을 계속 소유한다.
- `docs/TECH_REFERENCE.md`는 기술 구현 세부사항을 계속 소유한다.
- `AGENTS.md`는 항상 적용되는 프로젝트 및 워크플로 규칙을 계속 소유한다.

이 마스터 플랜은 그 위 계층의 내용을 소유한다.

- 현재 전달 baseline
- 협상 불가능한 프로젝트 제약
- 앞으로의 브랜치를 어떤 순서로 실행해야 하는지
- 브랜치 작업이 프로젝트 아이덴티티와 아키텍처에 맞게 유지되도록 하는 체크포인트

---

## 2) 소스 오브 트루스 맵

향후 브랜치를 계획하거나 실행할 때는 아래 순서로 프로젝트 문서를 사용한다.

1. `docs/MASTER-PLAN.md`
   - 전달 baseline
   - 브랜치 로드맵
   - 문서 간 사용 순서
   - 프로젝트 수준 의사결정 체크포인트
2. `docs/PRD.md`
   - 제품 목표
   - MVP 범위
   - 사용자-facing 요구사항
3. `docs/SCAFFOLD_STRUCTURE.md`
   - 앱 구조
   - 레이어 경계
   - UI 표면 소유권
4. `docs/TECH_REFERENCE.md`
   - 툴체인
   - 스키마 및 데이터 세부사항
   - 기술 구현 규약
5. `AGENTS.md`
   - 프로젝트 전역 AI 규칙
   - 브랜치 사이클 워크플로
   - 문서 동기화 기대사항

`.agent/sessions/[#<issue-number>]<prefix>--<slug>/` 아래의 브랜치 로컬 아티팩트는 각 브랜치의 실행 기록으로 유지되며, 로컬 의도는 이 마스터 플랜과 위의 소유 문서들을 기준으로 파생되어야 한다.

---

## 3) 현재 Baseline

이 저장소는 이제 greenfield scaffold가 아니라 활성 baseline으로 다뤄야 한다.

### 3.1 전달 Baseline

- 프로젝트 셋업과 툴체인 기반은 이미 갖춰져 있다.
- 공유 색상 및 테마 토큰 기반 작업이 이미 반영되어 있다.
- 공유 shadcn/ui 기반이 이미 설치되어 사용 중이다.
- 브랜치 사이클 프로젝트 문서는 이전 docs 브랜치에서 정렬되었다.

### 3.2 제품 및 UI Baseline

- 서비스 아이덴티티는 애플리케이션 메타데이터와 현재 UI에 이미 반영되어 있다.
- 랜딩 페이지는 이미 구현되어 있다.
- 대시보드 페이지는 이미 구현되어 있다.
- 제품 방향은 generic productivity tool이 아니라 Mandalart 계획 방식에 맞춰져 있다.

### 3.3 시각 Baseline

- `src/app/globals.css`가 이미 semantic color token 계약을 정의하고 있다.
- 현재 UI는 이미 warm paper 스타일 팔레트, 카드 표면, 메모 같은 포인트를 사용하고 있다.
- 기존 컴포넌트는 tape, pinned-card composition, planning-board 언어 같은 note-board 단서를 이미 사용하고 있다.

### 3.4 워크플로 Baseline

- 각 브랜치는 하나의 이슈에 대응한다.
- 각 브랜치는 각자의 스레드에서 작업한다.
- 비사소한 작업은 `.agent/sessions/...` 아래의 브랜치 사이클을 따른다.

이 baseline이 중요한 이유는, 후속 브랜치가 아무것도 구현되지 않은 상태를 가정하는 것이 아니라 지금 존재하는 것을 정제하고 확장해야 하기 때문이다.

---

## 4) 고정 제약

이 제약들은 프로젝트 수준의 결정이며, 이후 브랜치에서 문서화된 정당화와 함께 명시적으로 변경하지 않는 한 참으로 가정해야 한다.

### 4.1 아이덴티티 제약

- 서비스명과 현재 제품 아이덴티티를 유지한다.
- Mandalart를 목표 계획과 보드 기반 실행의 핵심 프레이밍으로 유지한다.
- 제품을 generic dashboard나 generic note-taking app으로 재포지셔닝하지 않는다.

### 4.2 시각 시스템 제약

- 현재 색상 방향을 기본 시각 방향으로 유지한다.
- `src/app/globals.css`의 semantic token 시스템을 공유 스타일 계약으로 유지한다.
- 메모/종이/노트 작성 컨셉을 제품 시각 아이덴티티의 일부로 유지한다.
- 이후 UI refresh 작업은 레이아웃, 타이포그래피, 간격, 모션, 구성은 재해석할 수 있지만, token 기반 아이덴티티 시스템을 버리면 안 된다.

### 4.3 아키텍처 제약

- 현재의 App Router + TypeScript + Prisma + Supabase 아키텍처 방향을 유지한다.
- 데이터베이스 접근은 server-side only로 유지한다.
- Prisma를 애플리케이션의 주요 데이터 접근 계층으로 유지한다.
- Supabase는 auth/session, storage, RLS enforcement를 담당하도록 유지한다.
- 스캐폴드는 `docs/SCAFFOLD_STRUCTURE.md`에 정의된 FSD-lite 구조에 맞춰 유지한다.

### 4.4 워크플로 제약

- 브랜치당 하나의 이슈, 하나의 스레드 규칙을 유지한다.
- 비사소한 작업은 브랜치 사이클을 유지한다.
- `docs/*.md` 아래의 영문 문서를 소스 오브 트루스로 유지한다.
- 한국어 문서는 영문 소스가 확정된 뒤에만 동기화한다.

---

## 5) 이 마스터 플랜이 명확히 해야 할 것

이 문서는 향후 브랜치가 아래 프로젝트 수준 질문에 대해 일관된 답을 얻도록 해야 한다.

- 무엇이 이미 구현되어 있고 활성 baseline으로 다뤄져야 하는가?
- 현재 아이덴티티 중 무엇이 고정이고 무엇이 재설계 가능한가?
- 지금 시점부터 제품, UI, 기능 작업을 어떤 순서로 진행해야 하는가?
- 어떤 종류의 결정이 어떤 소유 문서에 속하는가?
- 프로젝트가 브랜치 단위로 진행될 때 어떤 검증 및 문서 동기화 기대사항이 적용되는가?

이후 섹션은 이미 다른 문서가 소유하는 상세 제품/기술 명세를 중복하지 않으면서, 위 질문들을 실행 가능한 로드맵으로 전환한다.

---

## 6) 제품 및 경험 방향

마스터 플랜은 작업 순서를 정하는 데 필요한 수준의 제품 및 경험 방향만 정의해야 한다.
상세 요구사항, 필드 규칙, 사용자-facing acceptance는 계속 `docs/PRD.md`에 속한다.

### 6.1 제품 방향

- `docs/PRD.md`에 이미 정의된 MVP 흐름을 우선한다.
  - 계정 기반 접근
  - 보드 생성 및 관리
  - 태스크 완료 흐름
  - 대시보드 가시성
  - 내보내기 출력
- 현재 랜딩과 대시보드 구현을 버릴 실험이 아니라 정제할 baseline 표면으로 취급한다.
- 로드맵은 정적이거나 데모 중심의 UI 표면에서 실제 MVP 동작으로 통제된 순서로 이동해야 한다.

### 6.2 UX 방향

- 랜딩, 대시보드, 향후 보드 관련 표면 전반에서 메모/종이/planning-board 컨셉을 유지한다.
- 제품은 우선 읽기 쉽고 구조적이어야 하며, 시각 refresh는 장식적 복잡성보다 명확성, 위계, 계획 흐름을 강화해야 한다.
- 보드 흐름을 핵심 경험으로 두고, 대시보드는 주요 편집 표면이 아니라 요약 및 진행률 표면으로 유지한다.
- 랜딩과 대시보드 refresh는 서비스 아이덴티티가 하나의 시스템처럼 읽히도록 시각적으로 정렬되어야 한다.
- 기본 보드 화면은 overview 상태이면서 동시에 편집 진입점으로 취급한다.
  - 비집중 상태의 보드가 곧 normal board view여야 한다.
  - 셀 선택 시 drawer나 side panel 같은 focused edit surface로 전환되어야 한다.
  - 별도 read-only board mode는 이후 브랜치에서 구체적인 sharing 또는 presentation 요구가 생기지 않는 한 MVP에 필요하지 않다.

---

## 7) 아키텍처 및 전달 원칙

마스터 플랜은 로드맵 순서에 실질적으로 영향을 주는 아키텍처 및 전달 규칙만 다시 적어야 한다.
상세 파일 배치 및 기술 구현 규칙은 계속 `docs/SCAFFOLD_STRUCTURE.md`, `docs/TECH_REFERENCE.md`, `AGENTS.md`에 속한다.

### 7.1 아키텍처 원칙

- 데이터베이스 접근은 server-side only로 유지하고, Prisma를 주요 데이터 접근 계층으로, Supabase를 auth, storage, RLS 담당으로 유지한다.
- App Router scaffold, layer boundary, UI surface separation은 `docs/SCAFFOLD_STRUCTURE.md`에 정의된 방향을 유지한다.
- 새 프로젝트 UI primitive나 로컬 색상 결정을 도입하기 전에 설치된 `shadcn/ui`, 기존 shared UI, semantic token을 우선 재사용한다.
- 새 작업은 import와 boundary만 봐도 설명 가능해야 하며, 저가치 repository, adapter, wrapper layer는 피한다.

### 7.2 브랜치 전달

- 브랜치당 하나의 이슈, 하나의 스레드 규칙을 유지한다.
- 비사소한 작업은 문서화된 브랜치 사이클과 `.agent/sessions/...` 아래 브랜치 로컬 아티팩트를 사용한다.
- UI refresh 작업은 깊은 feature 브랜치 안에 숨기지 말고 dedicated UI 브랜치로 유지한다.
- 로드맵이나 아키텍처 가이드가 변경될 때는 영문 소스 문서를 먼저 업데이트하고, 그 뒤 한국어 문서를 동기화한다.

---

## 8) 브랜치 로드맵

로드맵은 아래 두 가지를 동시에 최적화해야 한다.

- UI가 refresh되는 동안 현재 서비스 아이덴티티를 보존하는 것
- 시각 시스템과 앱/데이터 기초가 안정되기 전에 기능 구현 범위를 무리하게 넓히지 않는 것

### 8.1 시퀀싱 로직

- 최상위 계획 문서를 먼저 완료해서 이후 브랜치가 하나의 baseline과 하나의 source-of-truth map을 상속받게 한다.
- 더 많은 화면이나 기능 흐름을 확장하기 전에 shared design foundation을 먼저 refresh한다.
- 랜딩과 대시보드는 이미 존재하고 서비스의 가시적 아이덴티티를 결정하므로 이른 시점에 refresh한다.
- 유저 소유 보드 흐름을 확장하기 전에 auth와 application shell 동작을 정립한다.
- 실제 대시보드 지표와 export output을 연결하기 전에 보드 도메인과 편집 워크플로를 먼저 정립한다.
- 주요 MVP 루프가 들어온 뒤에 hardening 및 release-readiness 작업으로 마무리한다.

### 8.2 Phase 모델

- phase는 delivery milestone이지, 반드시 한 브랜치로 끝나야 하는 경계가 아니다.
- 대부분의 phase는 각각 하나의 주요 책임을 가진 `1-3`개의 작은 브랜치로 실행하는 것이 좋다.
- 하나의 브랜치가 아래를 동시에 먹게 되면 phase를 여러 브랜치로 분리한다.
  - shared UI foundation 작업과 page redesign
  - auth/session 작업과 unrelated account surface
  - domain modeling과 여러 페이지, interaction-heavy editing
- 아래 로드맵은 먼저 권장 phase 범위를 적고, 그 다음 가능한 브랜치 분해를 적는다.

### 8.3 Phase 상세

#### Phase 0 - 완료된 Baseline

- 완료된 브랜치:
  - `feat/1--color`
  - `ui/3--shadcn-components`
  - `ui/5--landing-page`
  - `ui/7--dashboard-page`
  - `docs/9--update-agentic-docs`
- 책임:
  - token foundation, shared UI primitive, 초기 landing/dashboard surface, 정렬된 프로젝트 문서를 확보한다.
- 다음으로 넘어가기 전 검증:
  - 현재 저장소 상태를 향후 계획의 고정 baseline으로 취급한다.

#### Phase 1 - 현재 계획 브랜치

- 현재 브랜치:
  - `docs/11--define-project-master-plan`
- 책임:
  - 마스터 플랜을 완성하고, 전달 순서를 고정하며, source-of-truth ownership을 명시적으로 유지한다.
- 다음으로 넘어가기 전 검증:
  - 승인된 `docs/MASTER-PLAN.md`
  - 검증된 session artifact
  - 최종 문서 정렬

#### Phase 2 - Design Foundation Refresh

- 이 phase가 필요한 이유:
  - 랜딩과 대시보드는 이미 존재하지만, 더 많은 기능 표면을 추가하기 전에 refreshed UI 방향을 먼저 통일해야 한다.
- 권장 브랜치:
  - `ui/<n>--refresh-design-foundation`
    - 현재 시각 언어를 audit한다.
    - refreshed note/paper 방향을 고정한다.
    - 페이지 전반에서 사용할 최소 shared surface를 구현하거나 정리한다.
    - 예시: note-like card, taped section treatment, shared page header pattern, 안정적인 spacing/typography rule
- 이 phase를 작업하는 방법:
  - 먼저 baseline audit를 요청한다.
  - 그 다음 page redesign 전에 필요한 최소 shared UI surface 추출을 요청한다.
  - 같은 브랜치 안에서 landing이나 dashboard를 재구축하지 말고 shared design foundation에만 집중한다.
- 다음으로 넘어가기 전 검증:
  - shared UI review
  - token compliance
  - responsive baseline
  - page-level 작업을 시작하기에 충분히 방향이 명확한지에 대한 design-review pass

#### Phase 3 - Surface Refresh

- 권장 브랜치 분할:
  - `ui/<n>--refresh-landing-page`
  - `ui/<n>--refresh-dashboard-page`
- 책임:
  - refreshed design foundation 위에서 이미 존재하는 두 visible surface를 재구성한다.
  - landing은 public-facing tone을 정의해야 한다.
  - dashboard는 그 tone을 authenticated app surface로 번역해야 한다.
- 의존성:
  - Phase 2
- 다음으로 넘어가기 전 검증:
  - landing responsive check 및 accessibility review
  - dashboard empty/loading-state review 및 app-surface consistency check
  - 두 브랜치 완료 후 landing과 dashboard 간 visual alignment 확인
  - 권장 실행 순서: landing 먼저, 그다음 dashboard
  - 병렬 실행은 shared design foundation이 충분히 안정되어 두 브랜치가 같은 시각 규칙을 따를 수 있을 때만 허용한다.

#### Phase 4 - Account Foundation

- 권장 브랜치 분할:
  - `feature/<n>--auth-entry-flow`
    - 회원가입, 로그인, auth UI, 세션 진입 동작
  - `feature/<n>--app-shell-route-guard`
    - protected route, authenticated shell, navigation framing
  - `feature/<n>--profile-page`
    - MVP용 최소 account/profile 표면
    - 예시 범위: account info, display name, logout entry, profile-level navigation anchor
- 의존성:
  - Phase 3
- 다음으로 넘어가기 전 검증:
  - login/logout smoke flow
  - protected-route 동작
  - app-shell navigation check
  - profile page 기본 account-flow coverage

#### Phase 5 - Board Foundation

- 권장 브랜치 분할:
  - `feature/<n>--board-domain-foundation`
    - server-side board, cell, task, event 기반
    - 최소 persisted board creation flow
    - 생성된 보드를 불러와 렌더링할 수 있는 route-level board detail shell
  - `feature/<n>--boards-page`
    - 유저 소유 board list 또는 "My Boards" 표면
    - boards list, board creation entry, board detail shell 간 navigation
- 참고:
  - boards list page는 MVP 범위이며 optional로 다루면 안 된다.
  - 이 phase는 create/list/detail shell 동작까지만 다뤄야 하며, 전체 editing interaction model까지 흡수하면 안 된다.
- 의존성:
  - Phase 4
- 다음으로 넘어가기 전 검증:
  - data-boundary verification
  - schema 또는 contract check
  - board create/list/detail-shell flow에 대한 최소 integration coverage

#### Phase 6 - Board Editing

- 권장 브랜치 분할:
  - `feature/<n>--board-view-surface`
    - 비집중 overview state를 가진 기본 board screen
  - `feature/<n>--cell-detail-flow`
    - focused cell detail, task editing, completion change
  - `feature/<n>--board-save-flow`
    - autosave, failure handling, MVP 명세에 필요한 conflict/version 동작
- 참고:
  - 비집중 보드 상태가 곧 normal board view여야 한다.
  - 별도 read-only page 또는 mode는 기본 MVP 요구사항이 아니다.
  - export preview나 sharing-oriented presentation view는 이후 브랜치에서 정말 필요성이 입증될 때까지 뒤로 미룬다.
- 의존성:
  - Phase 5
- 다음으로 넘어가기 전 검증:
  - core board smoke flow
  - failure-path handling
  - mutation consistency check

#### Phase 7 - Dashboard Data Integration

- 권장 브랜치 분할:
  - `feature/<n>--dashboard-data-integration`
- 책임:
  - placeholder dashboard 값을 board workflow에서 파생된 실제 progress, activity, board data로 교체한다.
- 의존성:
  - Phase 6
- 다음으로 넘어가기 전 검증:
  - summary metric의 data-integrity check
  - chart correctness
  - recent activity accuracy
  - dashboard 링크나 summary가 실제 board state에 의존할 때의 board-list accuracy

#### Phase 8 - Export and Templates

- 권장 브랜치 분할:
  - `feature/<n>--board-export`
  - `feature/<n>--template-entry-flow`
- 의존성:
  - Phases 6-7
- 다음으로 넘어가기 전 검증:
  - export quality check
  - template creation flow check
  - board creation regression check

#### Phase 9 - MVP Hardening

- 권장 브랜치 분할:
  - `chore/<n>--mvp-hardening-and-e2e`
- 책임:
  - resilience gap을 닫고, critical journey smoke coverage를 추가하며, MVP가 release-ready인지 확인한다.
- 의존성:
  - Phases 4-8
- 다음으로 넘어가기 전 검증:
  - E2E smoke pass
  - failure-path review
  - 문서 동기화
  - final verification evidence

### 8.4 Dependency 규칙

- design foundation과 두 visible baseline surface가 refresh되기 전에는 깊은 feature 브랜치를 시작하지 않는다.
- board domain과 board editor flow가 존재하기 전에는 실제 dashboard data를 연결하지 않는다.
- export나 template을 first-wave 작업으로 취급하지 않는다. 둘 다 먼저 안정된 board model과 core editing loop에 의존한다.
- 향후 브랜치가 이 순서를 의미 있게 깨야 한다면, 조용히 drift하지 말고 branch-local spec과 master plan을 먼저 업데이트한다.

---

## 9) 검증 및 문서 동기화

검증은 브랜치 유형에 비례해야 하지만, 모든 phase는 다음 브랜치가 baseline을 신뢰할 수 있을 만큼의 근거를 남겨야 한다.

### 9.1 브랜치 검증 기대사항

- **문서 브랜치**
  - 문서 구조, 경로, 용어, 문서 간 ownership을 검증한다.
  - 완료 전에 formatting 및 diff-safety check를 실행한다.
- **UI 브랜치**
  - responsive 동작, 기본 접근성, semantic-token compliance, 승인된 design foundation 정렬 여부를 검증한다.
- **기능 브랜치**
  - happy path, 최소 하나의 failure path, data-boundary correctness를 검증한다.
  - 다음 phase가 의존하기 전에 새 사용자 흐름에 대한 smoke 또는 integration 근거를 남긴다.
- **Hardening 브랜치**
  - cross-flow regression, release-readiness evidence, 최종 MVP 주요 경로를 검증한다.

### 9.2 문서 동기화 순서

- 영문 소스 문서를 먼저 확정한다.
- 한국어 문서는 현재 브랜치에서 영문 소스가 승인된 뒤에만 동기화한다.
- 로드맵 변경이 다른 프로젝트 문서에 영향을 줄 때는 아래 순서로 업데이트한다.
  1. 소유 영문 소스 문서
  2. 대응하는 한국어 문서
  3. 필요하다면 현재 브랜치의 handoff 및 verification note

### 9.3 브랜치 사이클 근거

- 각 비사소한 브랜치는 아래 아티팩트를 남겨야 한다.
  - `spec.md`
  - 필요한 경우 `research.md`
  - `plan.md`
  - `log.md`
  - `handoff.md`
- 향후 브랜치는 이 아티팩트를 optional note가 아니라 execution evidence로 취급해야 한다.

---

## 10) 리스크 및 의사결정 체크포인트

로드맵은 현실이 바뀔 때 의도적으로 업데이트되어야 한다. 목표는 프로젝트를 영원히 고정하는 것이 아니라, 조용한 drift를 막는 것이다.

### 10.1 주요 리스크

- **디자인 drift**
  - shared design foundation이 약하면 landing, dashboard, board surface가 서로 다른 방향으로 갈 수 있다.
- **과도하게 큰 브랜치**
  - 로드맵 phase를 나눠도 여러 관심사를 한 브랜치에 묶으면 다시 비대해질 수 있다.
- **너무 이른 기능 연결**
  - dashboard metric, export, template 흐름을 너무 일찍 연결하면 board model과 editing loop가 안정되기 전에 재작업이 생길 수 있다.
- **문서 중복**
  - section ownership을 지키지 않으면 `MASTER-PLAN`, `PRD`, `SCAFFOLD_STRUCTURE`, `TECH_REFERENCE`가 중복될 수 있다.

### 10.2 리플랜 트리거

아래 상황에서는 patch로 때우지 말고 멈춰서 리플랜한다.

- 브랜치가 승인된 phase 순서를 의미 있게 가로질러야 할 때
- 브랜치가 하나의 명확한 책임 범위를 넘어설 때
- UI refresh가 token contract 또는 core visual identity 변경을 요구할 때
- board domain 또는 editing model이 downstream roadmap 가정을 깨는 방향으로 바뀔 때
- MVP에 별도 read-only board mode, sharing mode, 혹은 여기에 없는 새 surface가 갑자기 필요해질 때

### 10.3 의사결정 규칙

- 변경이 하나의 브랜치 내부 구현 세부사항에만 영향을 주면 branch-local plan을 업데이트한다.
- 변경이 여러 미래 브랜치에 영향을 주면, 먼저 이 master plan을 업데이트한 뒤 수정된 roadmap 기준으로 실행을 이어간다.
