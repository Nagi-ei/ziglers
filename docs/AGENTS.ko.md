# 🧩 AGENTS.md (for Mandalart Web)

_Last updated: 2025-11-08 (KST)_

---

## 1) 목적

본 문서는 **Mandalart Web 프로젝트의 AI 에이전트 구성 및 역할 정의서**이다.  
에이전트들은 `PRD.md`, `SCAFFOLD_STRUCTURE.md`, `TECH_REFERENCE.md` 문서를 기반으로  
코드 작성·검증·리팩토링·테스트·배포 과정 전반을 자동화하고 협력한다.

---

## 2) 에이전트 계층 구조

|레벨|이름|역할|주요 기준 문서|
|---|---|---|---|
|🧠 Core Agent|**Architect**|구조 및 의존성 규칙 감시 (`FSD`, 경계 규칙)|`SCAFFOLD_STRUCTURE.md`|
|🧩 Logic Agent|**Feature Builder**|Entity/Feature 단위 코드 생성 및 데이터 로직 구현|`TECH_REFERENCE.md`|
|🎨 UI Agent|**Interface Crafter**|UI 컴포넌트, shadcn 기반 구현 및 theme/i18n 적용|`PRD.md`, `SCAFFOLD_STRUCTURE.md`|
|🔍 QA Agent|**Validator**|코드 린트, 타입, 테스트, 성능 검증|`TECH_REFERENCE.md`|
|📦 Ops Agent|**CI/CD Manager**|GitHub Actions, Vercel, 환경변수 검증 및 배포 자동화|`TECH_REFERENCE.md`|
|📚 Doc Agent|**Knowledge Maintainer**|문서 싱크(`PRD`, `TECH_REFERENCE`) 관리 및 변경 요약|모든 문서|

---

## 3) 역할 상세

### 3.1 🧠 **Architect Agent**

- **목표:** 폴더 구조 및 의존 규칙(FSD-Lite)을 보장한다.
    
- **기준 문서:** `SCAFFOLD_STRUCTURE.md`
    
- **주요 기능:**
    
    - `src/app → widgets → features → entities → shared` 방향 위반 탐지
        
    - 각 슬라이스 루트의 `index.ts` 배럴 파일 누락 감지
        
    - `entities/lib/` 외부에서 Supabase 직접 접근 시 경고
        
    - 비허용 경로 import (`../..` 등) 탐지
        
- **트리거:** PR 생성 시 / AI 리팩토링 실행 시 자동 수행
    
- **출력:** `structure_report.json`
    
    ```json
    {
      "status": "pass",
      "missing_barrels": [],
      "invalid_imports": [],
    }
    ```
    

---

### 3.2 🧩 **Feature Builder Agent**

- **목표:** `PRD.md`의 기능 명세를 실제 코드 구조로 구현한다.
    
- **기준 문서:** `TECH_REFERENCE.md`, `SCAFFOLD_STRUCTURE.md`
    
- **주요 기능:**
    
    - Entity/Feature 단위 scaffold 자동 생성
        
        - `entities/*/model`, `lib`, `ui` 기본 구성 생성
            
    - Supabase Repository (`lib/supabase.adapter.ts`) 및 Query Hook (`model/queries.ts`) 자동 작성
        
    - TanStack Query Key / invalidate 규칙 반영
        
    - Mutation 예시(`features/toggle-task`)를 기준으로 비슷한 패턴 구현
        
- **출력 예시:** `feature_task_done.diff`
    

---

### 3.3 🎨 **Interface Crafter Agent**

- **목표:** UI/UX 레이어의 일관성 유지
    
- **기준 문서:** `PRD.md`, `SCAFFOLD_STRUCTURE.md`
    
- **주요 기능:**
    
    - shadcn/ui 및 Tailwind 기반 컴포넌트 생성
        
    - ThemeProvider / I18nProvider 자동 주입 확인
        
    - 다크모드·로케일 키(`page.section.key`) 명명 컨벤션 점검
        
    - 화면 구조 초안 생성 (`widgets/`, `features/` 내 UI 컴포넌트)
        
- **출력 예시:**  
    `ui_report.md` (컴포넌트 구성 트리, 미적용 다국어 키 목록)
    

---

### 3.4 🔍 **Validator Agent**

- **목표:** 코드 품질 및 안정성 유지
    
- **기준 문서:** `TECH_REFERENCE.md`
    
- **주요 기능:**
    
    - `biome`, `eslint`, `jest`, `playwright` 설정 일관성 검증
        
    - TypeScript strict mode 오류 탐지
        
    - 테스트 커버리지 계산 (`/test/unit`, `/test/integration`)
        
    - CI 파이프라인에서 lint/test 자동 실행
        
- **출력:**  
    `qa_report.md` (lint, test, 타입 통합 요약)
    

---

### 3.5 📦 **Ops Agent**

- **목표:** 빌드/배포 파이프라인의 안정화
    
- **기준 문서:** `TECH_REFERENCE.md`
    
- **주요 기능:**
    
    - GitHub Actions CI 구성 확인 (`biome`, `test`, `playwright`)
        
    - `.env.local` 변수 검증 (`NEXT_PUBLIC_SUPABASE_URL`, `ANON_KEY`, `SERVICE_ROLE`)
        
    - Vercel Preview/Prod Deploy 트리거
        
    - Node 20.x / pnpm 9.x 환경 일관성 점검
        

---

### 3.6 📚 **Knowledge Maintainer**

- **목표:** 문서-코드 동기화 유지
    
- **기준 문서:** `PRD.md`, `SCAFFOLD_STRUCTURE.md`, `TECH_REFERENCE.md`
    
- **주요 기능:**
    
    - 세 문서 간 변경 시 의존 문서 갱신 요청 (예: Schema → Scaffold 반영)
        
    - “PRD 기능 정의 ↔ Entity 스키마 ↔ UI 구조” 일관성 점검
        
    - AI 생성 코드가 기준 문서와 다를 경우 PR 자동 주석
        
    - 주요 변경사항 요약: `docs/changelog.md` 자동 갱신
        

---

## 4) 협업 규칙

|규칙|설명|
|---|---|
|**단일 책임 원칙**|한 에이전트는 자신의 계층 외부 코드에 직접 개입하지 않는다.|
|**계층 의존 금지**|Architect 외에는 상위 레벨 구조를 수정하지 않는다.|
|**자동화 우선**|Scaffold → Feature → Validation → Deploy 파이프라인은 자동화가 기본.|
|**문서 우선 업데이트**|변경은 항상 PRD → TECH_REFERENCE → SCAFFOLD 순으로 전파한다.|

---

## 5) 실행 순서 (자동화 파이프라인)

1. **Doc Sync:**  
    Knowledge Maintainer가 문서 최신화 상태 점검
    
2. **Scaffold Check:**  
    Architect가 구조 일관성 검사
    
3. **Feature Build:**  
    Feature Builder가 신규 기능 Scaffold 및 Repository 생성
    
4. **UI Generation:**  
    Interface Crafter가 shadcn 기반 UI 생성
    
5. **QA Validation:**  
    Validator가 lint/test/type 체크
    
6. **CI/CD Deploy:**  
    Ops Agent가 Actions 및 Vercel 배포 트리거
    

---

## 6) 향후 확장 (M2 준비)

|항목|설명|
|---|---|
|**HTTP Adapter 교체 지원**|Supabase Adapter → HTTP Adapter 자동 변환 (API Gateway 연동)|
|**모바일 공유 (RN/Expo)**|`entities` 키와 타입 재사용 기반의 cross-platform agent 추가|
|**문서 자동 번역**|PRD/Tech 문서의 ko-en 동기화 자동화|
|**테스트 시나리오 생성**|PRD 기능 정의 기반으로 Playwright 테스트 자동 생성|

---

✅ **요약:**  
이 문서는 Mandalart Web 프로젝트의 **AI 및 자동화 에이전트 구성표**로,  
모든 에이전트는 `PRD`, `SCAFFOLD_STRUCTURE`, `TECH_REFERENCE` 문서를 근거로 협력한다.  
이를 통해 일관된 구조, 품질, 배포 프로세스를 **완전 자동화된 개발 사이클**로 유지한다.