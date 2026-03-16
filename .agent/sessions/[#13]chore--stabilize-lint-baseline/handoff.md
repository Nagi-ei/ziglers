# Handoff

## Context

- Branch: `chore/13--stabilize-lint-baseline`
- Goal: establish a clean, reproducible lint baseline for the current repository.
- Status: branch work is complete for the accepted lint-baseline scope. Lint now passes; unrelated test/environment baseline issues remain outside this branch.

## Completed

1. Resolved the session root at `.agent/sessions/[#13]chore--stabilize-lint-baseline/`.
2. Confirmed the initial lint baseline with fresh local runs:
   - `pnpm run lint` fails in Biome before a clean baseline can be established.
   - `pnpm run lint:eslint` is currently broken because the repo still uses `next lint` under Next.js 16.
   - `pnpm exec eslint .` exposes the real remaining ESLint findings and the `.eslintignore` warning.
3. Wrote the branch-local artifacts for the new cycle:
   - `spec.md`
   - `plan.md`
   - `plans/01-branch-baseline.md`
   - `log.md`
4. Replanned the accepted branch scope around the actual current failures:
   - delete the setup/demo files `src/shared/ui/ComponentExample.tsx` and `src/shared/ui/Example.tsx` instead of maintaining them for lint compliance
   - ESLint entrypoint compatibility
   - Biome schema and Tailwind parsing alignment
   - known formatting/import cleanup
   - remaining `ThemeToggle` lint finding
5. Executed the planned slices and committed them in small units:
   - deleted `src/shared/ui/ComponentExample.tsx` and `src/shared/ui/Example.tsx`
   - replaced `next lint` with `eslint .`, moved ignores into `eslint.config.mjs`, and removed `.eslintignore`
   - aligned `biome.json` to schema `2.3.9` and enabled `css.parser.tailwindDirectives`
   - applied Biome formatting/import fixes to `playwright.config.ts`, `src/shared/lib/utils.ts`, and `tests/e2e/example.spec.ts`
   - replaced the `ThemeToggle` effect-driven mounted flag with a `useSyncExternalStore` hydration guard, then formatted the result for Biome
6. Completed hardening and review:
   - confirmed no stale imports remain for the deleted setup/demo files
   - confirmed `pnpm run lint:biome`, `pnpm run lint:eslint`, and `pnpm run lint` all pass
   - recorded no branch-specific review findings

## Decisions

- This branch stays a maintenance branch only; no feature work, redesign, or broad refactoring belongs here.
- Primary classification: `react-ui`
- Secondary classification: `next-app-router`
- Primary skill lens: `frontend-architecture-rules`
- Secondary skill lens: `next-best-practices`
- Research is not required because the failures are concrete and reproducible locally.
- `pnpm run lint` is the final branch success signal; split lint commands are supporting diagnostics during execution.
- The setup/demo components `src/shared/ui/ComponentExample.tsx` and `src/shared/ui/Example.tsx` are not part of the actual product surface and were removed instead of being maintained for lint compliance.

## Pending

1. Optional follow-up only:
   - if desired, open a separate maintenance branch for the pre-existing Jest/unit-test lane issue
   - if desired, set up Playwright browser installation and a less restricted environment for e2e verification

## Risks / Notes

- `pnpm run test:unit` currently fails outside this branch scope because Jest includes `tests/e2e/*.spec.ts` and crashes on Playwright imports.
- `pnpm run test:e2e` currently fails in this environment because:
  - Chromium launch is blocked by sandbox permission errors
  - Firefox and WebKit browser executables are not installed locally
- Unrelated worktree changes in `.github/workflows/playwright.yml` and `pnpm-lock.yaml` were left untouched.

## Verification

- Branch-scope verification passed:
  - `pnpm exec biome check biome.json src/app/globals.css`
  - `pnpm exec biome check playwright.config.ts src/shared/lib/utils.ts tests/e2e/example.spec.ts`
  - `pnpm exec eslint src/shared/ui/ThemeToggle.tsx`
  - `pnpm run lint:biome`
  - `pnpm run lint:eslint`
  - `pnpm run lint`
  - `pnpm exec tsc --noEmit`
- Out-of-scope / environment-limited verification:
  - `pnpm run test:unit` -> fail because Jest includes Playwright e2e specs
  - `pnpm run test:e2e` -> fail because Chromium cannot launch under current sandbox permissions and Firefox/WebKit binaries are not installed

## Resume

- Next prompt: "Start a follow-up branch for the Jest/Playwright test baseline."
