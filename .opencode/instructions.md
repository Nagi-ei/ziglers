# 🤖 OpenCode Agent Ground Rules

이 문서는 모든 작업 세션에서 에이전트가 준수해야 할 최상위 지시 사항입니다.

## 1. 세션 초기화 및 컨텍스트 파악

- 작업 시작 전 반드시 루트의 `AGENTS.md`, `PRD.md`, `SCAFFOLD_STRUCTURE.md`를 정독한다.
- 현재 프로젝트의 기술 스택(Next.js 14+, pnpm, Zustand, TanStack Query, Tailwind, shadcn/ui)을 확인한다.

## 2. 문서화 및 기록 규칙

- **폴더 생성:** 모든 세션 기록은 `.opencode/sessions/[session-name]/` 폴더에 격리한다.
- **Plan 작성:** 작업을 실행하기 전 반드시 `plan.md`를 작성하고 사용자의 승인을 받는다. 설계 의도와 단계별 체크리스트를 포함한다.
- **Note 작성:** 작업 중 발생하는 모든 결정 사항, 트러블슈팅, 기술적 부채는 실시간으로 `note.md`에 기록한다. 반드시 `.opencode/note-template.md` 형식을 따른다.

## 3. 코딩 및 Git 규칙

- **파일당 1컴포넌트:** 하나의 파일에는 오직 하나의 React 컴포넌트만 작성한다.
- **shadcn/ui 사용:** UI 컴포넌트는 `src/shared/ui/shadcn` 경로에 있는 shadcn/ui 컴포넌트를 최대한 활용하고, 적용된 스타일을 준수하여 구현한다. 이 컴포넌트 파일은 절대 수정하지 않는다.
- **색상 사용:** UI 컴포넌트 색상은 `src/app/globals.css`에 정의된 색상만 사용한다.
- **의존성 관리:** 반드시 `pnpm`을 사용하여 패키지를 관리한다.
- **단위 커밋:** 논리적 작업 단위(예: Architect 단계 완료, Logic 구현 완료)가 끝날 때마다 Conventional Commits 규격에 맞춰 커밋한다.
- **검증:** 코드 작성 후 반드시 `pnpm build` 또는 `tsc --noEmit`을 실행하여 타입 에러가 없는지 확인한다.

## 4. Git 커밋 규칙

- 모든 커밋 메시지 서두에는 **Gitmoji**를 사용한다.
- 커밋 메시지는 영어로 작성한다.
- **Conventional Commits**와 결합하여 다음과 같은 형식을 유지한다: `:[emoji]: [type]: [message]`
- 주요 사용 깃모지:
  - ✨ `:sparkles:` : 새로운 기능 (feat)
  - 🐛 `:bug:` : 버그 수정 (fix)
  - ♻️ `:recycle:` : 리팩토링 (refactor)
  - 💄 `:lipstick:` : UI/스타일 수정 (style)
  - 📝 `:memo:` : 문서 수정 (docs)

## 5. 커뮤니케이션

- 코드를 대량으로 생성하기 전, 모호한 요구사항은 반드시 사용자에게 질문한다.
- "왜 이 방식을 선택했는지"에 대해 `note.md`나 대화를 통해 설명한다.
