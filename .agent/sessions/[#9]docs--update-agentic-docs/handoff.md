# Handoff

## Context

- Branch: `docs/9--update-agentic-docs`
- Goal: Align project documents and branch workflow guidance with the accepted skill set and current implementation conventions, then keep Korean translations synchronized.
- Status: This branch is complete. The next work should start in a new docs branch for `docs/MASTER-PLAN.md`.

## Completed

1. Aligned English project docs with the current branch-cycle workflow, `.agent` artifact model, frontend architecture rules, FSD-lite scaffold wording, and current server/client boundaries.
2. Synchronized Korean translations in `docs/ko/` with the finalized English source documents.
3. Simplified `AGENTS.md` so it keeps only project-wide rules that matter on every task, and added explicit UI reuse / design-token rules.
4. Tightened the local `frontend-architecture-rules` skill to enforce:
   - reuse installed `shadcn/ui` primitives first
   - check existing shared UI such as `src/shared/ui/common` before creating a new project-specific primitive
   - rely on semantic tokens backed by `src/app/globals.css` for UI colors and theme values
5. Recorded the doc work in these commits:
   - `db60da2` `:memo: docs: align agents and scaffold docs with current skills`
   - `4a76516` `:memo: docs: sync product and tech references with current architecture`
   - `d513d98` `:memo: docs: update korean translations for aligned project docs`
   - `1c6d207` `:memo: docs: simplify agent guidance and scaffold terminology`
   - `bdbd572` `:memo: docs: add ui reuse and design token rules`
   - `03a572a` `:memo: docs: reorganize source and translated project docs`
6. Reorganized the core English source docs under `docs/` and the Korean translations under `docs/ko/`.
7. Preserved the current implementation baseline that the next branch should plan against:
   - project setup is already in place
   - landing UI exists
   - dashboard UI exists
   - design tokens and visual identity live in `src/app/globals.css`

## Pending (ordered)

1. Create a new branch for the master plan work, recommended format: `docs/<n>--write-master-plan`.
2. In the new branch, start a fresh branch cycle and write `docs/MASTER-PLAN.md` as the canonical English source document.
3. Use these required inputs when drafting the new branch spec and plan:
   - `AGENTS.md`
   - `docs/PRD.md`
   - `docs/TECH_REFERENCE.md`
   - `docs/SCAFFOLD_STRUCTURE.md`
   - current landing/dashboard UI baseline in `src/app/(landing)/page.tsx` and `src/app/(app)/dashboard/page.tsx`
4. Keep the already agreed direction in scope for the next branch:
   - preserve service name, color direction, design tokens, and the memo/note-taking concept
   - include branch-by-branch roadmap and execution order inside the master plan
   - treat UI refresh as a likely follow-up branch, not as part of this completed docs-alignment branch
5. Leave unrelated existing worktree changes alone unless explicitly asked:
   - `.github/workflows/playwright.yml`
   - `pnpm-lock.yaml`

## Risks / Decisions

- `AGENTS.md` should only contain project-wide rules that are always relevant; explanatory role taxonomies were intentionally removed.
- `docs/SCAFFOLD_STRUCTURE.md` is now positioned as an FSD-lite scaffold adapted to the Next.js App Router.
- Locale routing in `docs/PRD.md` is documented as path-based locale routing, with `/dashboard` and `/en/dashboard` as examples.
- UI color/theme values should come from the shared token system in `src/app/globals.css`, not ad-hoc local color choices.
- Installed `shadcn/ui` primitives and existing shared project UI must be checked before adding new UI primitives.
- `docs/MASTER-PLAN.md` should be the canonical English master plan location so it matches the existing skill expectations.
- If Korean translation is added later, place it at `docs/ko/MASTER-PLAN.md`.

## Verification

- Commands:
  - `pnpm prettier:docs`
  - `git diff --check -- AGENTS.md docs/SCAFFOLD_STRUCTURE.md docs/PRD.md docs/TECH_REFERENCE.md docs/ko/AGENTS.md docs/ko/SCAFFOLD_STRUCTURE.md docs/ko/PRD.md docs/ko/TECH_REFERENCE.md`
  - `rg -n "\\.ai/sessions|thread-handoff-writer|frontend-ui-global" AGENTS.md docs/SCAFFOLD_STRUCTURE.md docs/PRD.md docs/TECH_REFERENCE.md docs/ko/*.md`
  - `rg -n "UI Reuse Rule|Design Token Rule|UI 재사용 규칙|디자인 토큰 규칙|src/app/globals.css|shared/ui/common" AGENTS.md docs/ko/AGENTS.md /Users/nagi/.agents/skills/frontend-architecture-rules/SKILL.md`
- Result:
  - pass for the doc-alignment changes
  - current worktree still contains unrelated existing changes in `.github/workflows/playwright.yml` and `pnpm-lock.yaml`

## Resume

- Next prompt: "Read `/Users/nagi/Documents/projects/mandalart/zieglers/.agent/sessions/[#9]docs--update-agentic-docs/handoff.md`, `/Users/nagi/Documents/projects/mandalart/zieglers/AGENTS.md`, `/Users/nagi/Documents/projects/mandalart/zieglers/docs/PRD.md`, `/Users/nagi/Documents/projects/mandalart/zieglers/docs/TECH_REFERENCE.md`, and `/Users/nagi/Documents/projects/mandalart/zieglers/docs/SCAFFOLD_STRUCTURE.md`, then start a new branch-cycle for writing `/Users/nagi/Documents/projects/mandalart/zieglers/docs/MASTER-PLAN.md`."
