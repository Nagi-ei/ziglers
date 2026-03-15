# Mandalart Web – SCAFFOLD_STRUCTURE (v2.0)

_Last updated: 2026-03-13 (KST)_

---

## 1) 목적

이 문서는 Mandalart Web의 프로젝트 스캐폴드와 경계 규칙을 정의한다.
다음 내용을 위한 기준 문서다.

- 파일이 어디에 있어야 하는가
- 어떤 레이어가 어떤 레이어를 import할 수 있는가
- UI primitive와 application UI를 어떻게 구분하는가
- 데이터 접근은 어디에서 허용되는가
- TanStack Query key와 mutation 경계를 어떻게 정리하는가

이 문서는 코드 덤프가 아니라 scaffold/architecture 문서다.
프로젝트 전용 규칙이 아니면 긴 예시 코드를 남기지 않는다.
이 프로젝트는 Next.js App Router에 맞게 조정한 **FSD-lite scaffold**를 사용한다.

---

## 2) 현재 프로젝트 형태

```bash
src/
├─ app/
│  ├─ (landing)/
│  ├─ (app)/
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  └─ globals.css
├─ widgets/
│  ├─ landing/
│  ├─ dashboard-summary/
│  ├─ dashboard-charts/
│  ├─ dashboard-boards/
│  └─ app-sidebar/
├─ features/                           # optional; stable feature boundary가 있을 때만 추가
├─ entities/                           # optional; stable entity/domain boundary가 있을 때만 추가
├─ shared/
│  ├─ ui/
│  │  ├─ shadcn/                       # components.json 기준 설치형 shadcn primitive surface
│  │  └─ common/                       # 프로젝트 전용 shared UI
│  └─ lib/
│     ├─ hooks/
│     ├─ theme/
│     └─ utils.ts
└─ generated/
   └─ prisma/

tests/
├─ e2e/
└─ integration/

prisma/
├─ schema.prisma
└─ migrations/
```

### 메모

- `src/app/`이 전통적인 `pages/` 레이어를 대체하며, 라우팅과 page/layout composition, route entry point를 담당한다.
- `processes/`는 사용하지 않는다.
- `features/`, `entities/`는 패턴을 맞추기 위해 빈 폴더를 미리 만들지 않는다.
- 새 레이어는 기존 레이어에 둘 수 없는 안정적인 책임이 있을 때만 추가한다.

---

## 3) 레이어 규칙

### 의존 방향

해당 레이어가 존재할 때 import 방향은 다음을 따른다.

`app -> widgets -> features -> entities -> shared`

상위 레이어는 하위 레이어를 import할 수 있다.
하위 레이어는 상위 레이어를 import하면 안 된다.

### 실무 해석

- `app/`은 route boundary, page/layout composition, server-rendered entry point를 담당한다.
- `widgets/`는 화면 수준/섹션 수준 UI를 조합한다.
- `features/`는 실제 feature boundary가 있을 때 사용자 상호작용이나 mutation-oriented UI를 담당한다.
- `entities/`는 실제 entity/domain boundary가 있을 때 도메인 타입, query key 등 안정적인 도메인 artifact를 담당한다.
- `shared/`는 재사용 가능한 공통 인프라와 UI primitive를 담당한다.

### 안티패턴

- 스캐폴드 바깥에 parallel folder convention 만들기
- `features/*`, `entities/*`를 “혹시 모르니” 미리 만들기
- 새 레이어를 도입하면서 어떤 책임이 기존 레이어에 남을 수 없었는지 설명하지 못하는 경우

---

## 4) UI Surface 규칙

### 설치된 shadcn primitive surface

- canonical installed shadcn primitive surface는 `components.json`이 정의한다.
- 현재 저장소에서는 `components.json`이 설치된 shadcn component 경로를 `@/shared/ui/shadcn`으로 가리킨다.
- 이 installed primitive surface 내부 파일은 upstream multi-export compound 구조를 유지할 수 있다.

### 프로젝트 UI

- 설치된 shadcn primitive가 아닌 프로젝트 전용 UI는 그 surface 밖에 둔다.
- 재사용 가능한 프로젝트 UI 및 visual helper는 `shared/ui/common`을 사용한다.
- 도메인/화면 책임이 있는 UI는 `widgets/`, `features/`, 그 외 scaffold에 맞는 레이어에 둔다.

### 컴포넌트 파일 규칙

- 앱 전용 React 컴포넌트는 각자 자신의 파일에 있어야 한다.
- 허용 예외:
  - Suspense 또는 Error Boundary 구성을 위한 non-exported route-local wrapper
  - canonical shadcn surface 내부의 설치형 primitive 파일

### 하지 말아야 할 것

- 설치된 shadcn primitive 파일에 feature logic, data fetching, mutation orchestration 섞기
- shadcn 예외를 근거로 다른 앱 파일에서 multi-component 구성을 정당화하기

---

## 5) 데이터 접근 경계

### 기본 모델

- 데이터베이스 접근은 서버 사이드에서만 수행한다.
- Prisma가 애플리케이션 레벨의 주요 데이터 접근 계층이다.
- Supabase는 auth/session, storage, 데이터베이스 레벨의 RLS enforcement를 담당한다.

### 허용 경계

- Server Component는 직접 읽거나 server-only helper module을 통해 읽을 수 있다.
- Server Action은 내부 create/update/delete 흐름의 기본 write boundary다.
- Route Handler는 public API, webhook, 외부 인터페이스 경계에 한정한다.
- Client Component는 데이터베이스에 직접 접근하면 안 된다.

### Repository / Adapter 규칙

repository/adapter layer는 기본값이 아니라 선택 사항이다.
다음과 같은 명확한 가치가 있을 때만 추가한다.

- 안정적인 server-only transport boundary
- 실제 multi-source integration boundary
- mapping/auth/transaction 책임을 별도 모듈로 두는 편이 더 명확한 경우

아래 호출을 한 번 감싸는 forwarding-only repository/adapter는 의미 있는 경계로 보지 않는다.

---

## 6) Query Key와 Mutation

### Query Key 소유 규칙

ad-hoc inline query key 대신 안정적인 계층형 key factory를 사용한다.
여기서 중요한 것은 canonical example shape 자체보다, 어떤 레이어가 query key를 소유하고 어디에 배치하는지다.

### 배치 위치

- domain boundary가 있으면 `src/entities/<domain>/model/keys.ts`를 우선한다.
- 그렇지 않으면 명확한 이름의 shared 또는 feature-local query-key module을 사용한다.

### Mutation 경계

- 애플리케이션 write에는 `Server Action + useMutation`을 우선한다.
- success handling은 항상 명시적으로 적는다.
  - invalidate
  - revalidate
  - refresh
  - navigation
- mutation orchestration이 재사용되거나 복잡해지면, 컴포넌트마다 inline으로 반복하지 말고 feature-local UI hook으로 분리한다.

---

## 7) Shared Infrastructure

### Provider와 shared lib

- 재사용 가능한 인프라는 `src/shared/lib/`에 둔다.
- 현재 저장소에는 다음이 이미 존재한다.
  - `src/shared/lib/theme/`
  - `src/shared/lib/hooks/`
  - `src/shared/lib/utils.ts`

### 스타일

- 글로벌 스타일은 `src/app/globals.css`에 둔다.

### 생성 코드

- Prisma generated output은 `src/generated/prisma/`에 둔다.
- generated folder 안에 hand-written application code를 섞지 않는다.

---

## 8) 라우트 및 렌더링 규칙

- 페이지/뷰 데이터 조회는 Server Component를 우선한다.
- `use client` 경계는 가능한 한 좁게 유지한다.
- route params와 search params는 route boundary에서 검증한다.
- 로딩/에러 처리는 관련 없는 컴포넌트에 흩뿌리지 말고, 의미 있는 route/feature boundary에 Suspense와 Error Boundary를 둔다.

---

## 9) 테스트 배치

현재 루트 테스트 디렉터리:

- `tests/e2e/`
- `tests/integration/`

unit test를 도입하거나 확장할 때는, 프로젝트 전역 규칙 없이 임의로 폴더별 test placement를 만드는 대신 안정적인 root-level test directory 아래에 둔다.

---

## 10) 마이그레이션 메모

- 향후 M2 아키텍처에서 실제 HTTP 또는 NestJS transport boundary가 생기면, 그 server-only boundary를 명시적으로 문서화하고 정당화한다.
- 오래된 client-side adapter convention을 migration 언어 때문에 기본값처럼 유지하지 않는다.
- query key naming과 stable contract는 실제 재사용 가치가 있는 경우에만 공유한다.

---

## 요약

Mandalart Web의 scaffold는 다음을 선호한다.

- Next.js App Router에 맞춘 FSD-lite 레이어 모델
- 명확한 레이어 책임
- 좁은 server/client boundary
- 설치된 shadcn primitive와 application UI의 분리
- 명시적인 query key 소유와 배치
- 저가치 추상화보다 직접적이고 설명 가능한 구조
