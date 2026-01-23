안녕! 이제부터 우리 프로젝트의 첫 번째 기능을 개발할 거야.
이번 작업 세션의 이름은 `[#5]ui--landing-page`야.

먼저 다음의 초기 설정을 수행해줘:

1. 루트 폴더의 `AGENTS.md`, `PRD.md`, `SCAFFOLD_STRUCTURE.md`를 정독하고 프로젝트 아키텍처(FSD-Lite)와 규칙을 파악해줘.
2. `.opencode/instructions.md`를 읽고 세션 관리 및 기록 규칙을 확인해.
3. `.opencode/sessions/[#5]ui--landing-page	/` 폴더를 생성하고, 거기서 작업을 시작해줘.

이제 아래 요구사항에 맞춰서 [plan.md]를 먼저 작성해줘:

- 작업 내용:
  랜딩 페이지 ui 구현. `.opencode/references/landing-page-sample.png`의 느낌을 참고하여 구현할 것.
  색상은 `src/app/globals.css`에 정의된 색상만 사용하고, 컴포넌트에 정의된 각진 스타일을 그대로 사용한다. (`src/shared/ui/shadcn`를 직접 수정하지 않고 사용한다.)
  로고는 `public/logo.png`를 사용한다. 서비스 이름은 `Zieglers`.
  Hero 섹션은 서비스를 잘 나타낼수 있는 과감한 디자인을 도전한다. 디자인 후보 3가지를 정해서 제시하고, 사용자의 선택에 따라 방향을 설정한다.

- 지시 사항:
  - `.opencode/note-template.md`를 복사해서 해당 세션 폴더에 `note.md`를 생성하고 기록을 시작할 것.
  - 계획 단계에서 Architect 에이전트로서 폴더 구조가 FSD 규칙에 맞는지 점검할 것.
  - 계획이 완료되면 나에게 승인을 받고 구현(Execution) 단계로 넘어갈 것.
  - 모든 커밋은 Gitmoji와 Conventional Commits 규격을 따를 것.

준비가 되었으면 환경 파악 결과와 함께 계획 작성을 시작해줘!
