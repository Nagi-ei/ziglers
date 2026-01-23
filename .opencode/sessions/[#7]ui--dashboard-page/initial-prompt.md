안녕! 이제부터 우리 프로젝트의 두 번째 기능을 개발할 거야.
이번 작업 세션의 이름은 `[#7]ui--dashboard-page`야.

먼저 다음의 초기 설정을 수행해줘:

1. 루트 폴더의 `AGENTS.md`, `PRD.md`, `SCAFFOLD_STRUCTURE.md`를 정독하고 프로젝트 아키텍처(FSD-Lite)와 규칙을 파악해줘. 특히 `SCAFFOLD_STRUCTURE.md`에 정의된 폴더 구조를 엄격히 준수해.
2. `.opencode/instructions.md`를 읽고 세션 관리 및 기록 규칙을 확인해.
3. `.opencode/sessions/[#7]ui--dashboard-page/` 폴더를 생성하고, 거기서 작업을 시작해줘.

이제 아래 요구사항에 맞춰서 [plan.md]를 먼저 작성해줘:

**[작업 내용]**

- **목표:** 대시보드 페이지 UI 구현 (`/dashboard` 경로 예상)
- **레퍼런스:** `.opencode/references/dashboard-sample.png`의 레이아웃과 구성을 참고할 것.
- **스타일 컨셉:** - 현재 구현된 랜딩페이지의 디자인 언어(**따뜻한 색감, 종이에 적어나가는 느낌,, zieglers(벽돌공)라는 서비스명에 맞게 목푤를 이루기위해 하나씩 벽돌을 쌓아나가는 느낌, 각진 코너**)를 대시보드에 적용할 것.
  - 첨부된 이미지는 '배치'와 '기능'을 참고하되, 분위기는 기존 'Zieglers(벽돌공)' 테마의 질감과 색상을 유지할 것.
- **기술적 제약 사항 (필수):**
  - **아이콘:** 반드시 **Huge Icons** (`@hugeicons/core-free-icons`)만 사용할 것. (Lucide 미사용)
  - **차트:** `shadcn/ui`의 Chart 컴포넌트(기반 기술: **Recharts**)를 사용하여 구현할 것.
  - **데이터:** 실제 API 연동 없이, UI 확인을 위한 **Mock Data**를 별도 파일(예: `config/mock-data.ts` 또는 슬라이스 내부)로 분리하여 사용할 것.
  - **컴포넌트:** `rounded-none` (직각) 스타일을 유지하고, `src/shared/ui/shadcn` 내부 코드는 수정하지 말 것.
  - **색상:** `src/app/globals.css`에 정의된 색상만 사용

**[지시 사항]**

- `.opencode/note-template.md`를 복사해서 해당 세션 폴더에 `note.md`를 생성하고 기록을 시작할 것.
- **@oracle (Architect Role):** - 대시보드 레이아웃(사이드바 포함)이 랜딩 페이지와 다르므로, `app/(app)/layout.tsx`와 같이 라우트 그룹을 분리하는 전략이 적절한지 `plan.md`에서 검토해줘.
  - FSD-Lite 구조에 맞춰 위젯(`widgets`)과 피쳐(`features`)를 어떻게 나눌지 구조를 제안해줘.
- 계획이 완료되면 나에게 승인을 받고 구현(Execution) 단계로 넘어갈 것.
- 모든 커밋은 Gitmoji와 Conventional Commits 규격을 따를 것.

스스로 확인할 수 있겠지만 구현된 랜딩페이지도 따로 첨부할게.

준비가 되었으면 환경 파악 결과와 함께 계획 작성을 시작해줘!

[Image 1] [Image 2]
