# Log

## 2026-03-17 - Cycle setup

- Resolved the session artifact root for `chore/13--stabilize-lint-baseline` as `.agent/sessions/[#13]chore--stabilize-lint-baseline/`.
- Confirmed the active branch is `chore/13--stabilize-lint-baseline`.
- Read the required branch-cycle inputs:
  - `docs/MASTER-PLAN.md`
  - `docs/PRD.md`
  - `docs/SCAFFOLD_STRUCTURE.md`
  - `docs/TECH_REFERENCE.md`
  - `frontend-architecture-rules`
  - `next-best-practices`
  - `branch-spec-gate`
  - `branch-planner`
  - `tdd`
- Re-ran the current lint baseline:
  - `pnpm run lint` -> failed on Biome schema mismatch, Tailwind directive parse errors, formatting/import issues, and `no-img-element`
  - `pnpm run lint:eslint` -> failed because `next lint` is no longer a valid Next.js 16 CLI subcommand
  - `pnpm exec eslint .` -> revealed the remaining actual ESLint findings:
    - `@next/next/no-img-element` in `src/shared/ui/ComponentExample.tsx`
    - `react-hooks/set-state-in-effect` in `src/shared/ui/ThemeToggle.tsx`
    - deprecated `.eslintignore` warning under flat config
- Wrote the accepted branch `spec.md`.
- Wrote the accepted branch `plan.md` and archived the baseline snapshot in `plans/01-branch-baseline.md`.
- Deferred execution to the first planned slice.

## 2026-03-17 - Replan

- User clarified that `src/shared/ui/ComponentExample.tsx` and `src/shared/ui/Example.tsx` are setup-only demo files and should be deleted at the start of the branch rather than brought into lint compliance.
- Updated `spec.md` to:
  - treat the two setup/demo files as deletion targets
  - remove the previous `next/image`/`next.config.ts` maintenance path from accepted scope
  - narrow the remaining shared-ui lint work to `src/shared/ui/ThemeToggle.tsx`
- Updated `plan.md` and `plans/01-branch-baseline.md` to:
  - add a new first slice for deleting the setup/demo files
  - renumber later slices
  - reduce the final shared-ui slice to the `ThemeToggle` fix

## 2026-03-17 - Slice 1 execution

- Slice: `Slice 1`
- Binding skill lens: `frontend-architecture-rules`
- Key enforced constraints:
  - keep the cleanup limited to the two setup/demo files only
  - avoid widening the change into broader shared-ui deletion or restructuring
  - confirm no active project imports would break before committing the removal
- TDD cycle:
  - RED: the current lint baseline still included findings from `src/shared/ui/ComponentExample.tsx`, a setup-only demo file, and that file depended only on the companion `src/shared/ui/Example.tsx`.
  - GREEN: confirmed no external project imports referenced the two files, then deleted both setup/demo files.
  - REFACTOR: re-checked the repository for stale imports and confirmed the remaining ESLint baseline narrowed to `.eslintignore` plus `src/shared/ui/ThemeToggle.tsx`.
- Verify:
  - `rg -n "ComponentExample|ExampleWrapper|from \"@/shared/ui/Example\"|from './Example'|from \"./Example\"|from \"@/shared/ui/ComponentExample\"" src tests` -> pass after deletion via no remaining matches
  - `pnpm exec eslint .` -> fail as expected for later slices; remaining findings are the `.eslintignore` deprecation warning and `react-hooks/set-state-in-effect` in `src/shared/ui/ThemeToggle.tsx`
- Task checklist:
  - complete

## 2026-03-17 - Slice 2 execution

- Slice: `Slice 2`
- Binding skill lens: `next-best-practices`
- Key enforced constraints:
  - use a supported ESLint CLI entrypoint for the current Next.js 16 toolchain
  - keep ignore handling in flat config instead of relying on deprecated `.eslintignore`
  - avoid adding ad-hoc CLI flags when the config can express the intended ignore scope directly
- TDD cycle:
  - RED: `pnpm run lint:eslint` failed immediately because `next lint` is no longer a valid Next.js 16 subcommand, and `pnpm exec eslint .` emitted the deprecated `.eslintignore` warning.
  - GREEN: updated `package.json` to run `eslint .`, moved ignore rules into `eslint.config.mjs`, and removed `.eslintignore`.
  - REFACTOR: kept the ignore list aligned with the existing build-artifact directories already present in the repository.
- Verify:
  - `pnpm exec eslint --print-config src/shared/ui/ThemeToggle.tsx` -> pass
  - `pnpm run lint:eslint` -> fail as expected for later slices; command now executes correctly and reports only `react-hooks/set-state-in-effect` in `src/shared/ui/ThemeToggle.tsx`
- Task checklist:
  - complete

## 2026-03-17 - Slice 3 execution

- Slice: `Slice 3`
- Binding skill lens: `frontend-architecture-rules`
- Key enforced constraints:
  - keep `src/app/globals.css` as the shared token source of truth
  - solve the Tailwind parsing problem through supported Biome configuration rather than CSS rewrites
  - keep the Biome config change minimal and version-aligned
- TDD cycle:
  - RED: `pnpm run lint:biome` failed because `biome.json` still used schema `2.2.0` and `src/app/globals.css` could not be parsed with Tailwind directives disabled.
  - GREEN: ran `biome migrate --write` to align the schema to `2.3.9`, then enabled `css.parser.tailwindDirectives` in `biome.json`.
  - REFACTOR: kept the configuration change limited to the schema update plus the single parser option required for Tailwind v4 directives.
- Verify:
  - `pnpm exec biome check biome.json src/app/globals.css` -> pass
- Task checklist:
  - complete

## 2026-03-17 - Slice 4 execution

- Slice: `Slice 4`
- Binding skill lens: `frontend-architecture-rules`
- Key enforced constraints:
  - keep this slice formatting-only with no behavioral changes
  - limit the edits to the three known baseline files
  - let Biome own import ordering and style normalization instead of hand-editing style drift
- TDD cycle:
  - RED: Biome still reported formatter/import-order failures in `playwright.config.ts`, `src/shared/lib/utils.ts`, and `tests/e2e/example.spec.ts`.
  - GREEN: ran `pnpm exec biome check --write` on the three files to apply the formatter and organize imports.
  - REFACTOR: confirmed the resulting diffs were style-only and did not alter runtime behavior.
- Verify:
  - `pnpm exec biome check playwright.config.ts src/shared/lib/utils.ts tests/e2e/example.spec.ts` -> pass
- Task checklist:
  - complete

## 2026-03-17 - Slice 5 execution

- Slice: `Slice 5`
- Binding skill lens: `frontend-architecture-rules`
- Key enforced constraints:
  - keep the fix localized to `src/shared/ui/ThemeToggle.tsx`
  - preserve user-visible toggle behavior while removing the effect-driven mounted flag
  - solve the hook-rule failure without widening the client boundary or adding new abstractions
- TDD cycle:
  - RED: after the earlier slices, `pnpm run lint:eslint` still reported `react-hooks/set-state-in-effect` in `src/shared/ui/ThemeToggle.tsx`.
  - GREEN: replaced the `useEffect` + `useState` mounted flag with `useSyncExternalStore` and an empty subscription to preserve the hydration guard without synchronous state-setting inside an effect.
  - REFACTOR: kept the implementation to a single local helper and preserved the existing UI fallback and theme toggle behavior.
- Verify:
  - `pnpm exec eslint src/shared/ui/ThemeToggle.tsx` -> pass
  - `pnpm run lint:eslint` -> pass
- Task checklist:
  - complete

## Hardening (branch)

- Failure path tested:
  - searched for stale imports of the deleted setup/demo components with `rg` and confirmed no remaining references
  - re-ran split lint commands after all execution slices to catch any hidden repository-wide failures
- Observability signals checked:
  - `pnpm run lint:biome` and `pnpm run lint:eslint` now emit actionable file/rule diagnostics and both exit cleanly after the final formatting fix
  - when hardening first re-ran `pnpm run lint:biome`, the output isolated the remaining gap to a single formatter expectation in `src/shared/ui/ThemeToggle.tsx`
- UX resilience checked:
  - for this maintenance branch, the practical UX equivalent is developer ergonomics: lint output is now directly actionable and no longer blocked by invalid CLI usage or unrelated setup/demo files
  - the `ThemeToggle` hydration guard remains in place after the hook-rule fix
- Fix / re-verify:
  - `pnpm run lint:biome` initially failed in hardening because `src/shared/ui/ThemeToggle.tsx` still needed Biome line wrapping for the `useSyncExternalStore` call
  - formatted the call to match Biome expectations and re-ran the split lint commands
- Verify commands:
  - `rg -n "ComponentExample|ExampleWrapper|from \"@/shared/ui/Example\"|from './Example'|from \"./Example\"|from \"@/shared/ui/ComponentExample\"" src tests`
  - `pnpm run lint:biome`
  - `pnpm run lint:eslint`
- Result summary:
  - pass after the `ThemeToggle` formatting fix

## Review

- Findings:
  - none
- Open questions / assumptions:
  - `pnpm run test:unit` is not currently a reliable unit-test lane because the repository-level Jest config also picks up `tests/e2e/*.spec.ts`
  - Playwright execution in this environment is blocked by missing Firefox/WebKit browser binaries and Chromium launch permission failures under the sandboxed desktop environment
- Summary:
  - the branch goal and accepted scope were met without introducing scope creep; the remaining verification failures are outside the lint-baseline changes made here

## Refactor Pass

- Findings addressed:
  - no additional review findings required code changes
- Refactor changes:
  - none beyond the earlier hardening-format fix already committed for `src/shared/ui/ThemeToggle.tsx`
- Final verify command(s):
  - `pnpm exec tsc --noEmit`
  - `pnpm run lint`
  - `pnpm run test:unit`
  - `pnpm run test:e2e`
- Final verify result:
  - `pnpm exec tsc --noEmit` -> pass
  - `pnpm run lint` -> pass
  - `pnpm run test:unit` -> fail because Jest currently executes `tests/e2e/*.spec.ts` and crashes on Playwright imports (`TypeError: Class extends value undefined is not a constructor or null`)
  - `pnpm run test:e2e` -> fail in the current environment:
    - Chromium launch fails with `bootstrap_check_in ... Permission denied (1100)` under the sandboxed desktop environment
    - Firefox and WebKit browser executables are not installed in the local Playwright cache

## 2026-03-18 - Follow-up test-lane separation

- User requested the minimal cleanup to stop Jest from owning Playwright e2e specs.
- Updated `jest.config.ts` to:
  - ignore `tests/e2e/` in the Jest lane
  - treat the current absence of Jest-owned tests as non-fatal with `passWithNoTests`
- Verify:
  - `pnpm run test:unit` -> pass (`No tests found, exiting with code 0`)
