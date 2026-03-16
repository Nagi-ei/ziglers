# Branch Plan

- Primary classification: `react-ui`
- Secondary classification: `next-app-router`
- Primary skill lens: `frontend-architecture-rules`
- Secondary skill lens: `next-best-practices`

## Scope

- In:
  - delete the unused setup/demo components before the main lint cleanup slices
  - repair the ESLint entrypoint for the current Next.js 16 and flat-config setup
  - align Biome config with the installed CLI version and Tailwind v4 directive parsing
  - fix the currently reported formatting/import issues in the known baseline files
  - resolve the remaining shared-UI lint finding required for a clean `pnpm run lint`
- Out:
  - unrelated UI redesign or demo cleanup
  - broad repository-wide formatting
  - new layers, abstractions, or file moves

## Interface / Type Changes

- No public runtime or TypeScript contract changes are planned.
- Developer-tooling surface changes are expected:
  - `package.json` lint scripts may change to a supported ESLint CLI entrypoint
  - ignore handling may move fully into `eslint.config.mjs`

## Slice 1

- Goal:
  - Remove the unused setup/demo components so they stop participating in the branch baseline and do not need maintenance-only lint fixes.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - `src/shared/ui/ComponentExample.tsx` and `src/shared/ui/Example.tsx` are deleted
  - no project imports still reference the deleted files
  - the branch baseline is simplified without widening into broader shared-ui cleanup
- Out of scope:
  - deleting any additional shared UI files
- Planned files:
  - `src/shared/ui/ComponentExample.tsx`
  - `src/shared/ui/Example.tsx`
- User checkpoint: `not required`
- Task checklist:
  1. Confirm the two files are not referenced by active project code.
  2. Delete the setup/demo files.
  3. Re-check that no imports remain.
  4. Record the new lint baseline after deletion.
- RED:
  - the current lint baseline still includes findings from two setup/demo files that are unrelated to the project surface.
- GREEN:
  - remove the unused files so later slices focus only on repository-relevant lint work.
- REFACTOR:
  - keep the cleanup narrowly scoped to the two files and any direct import fallout if found.
- Verify:
  - `rg -n "ComponentExample|ExampleWrapper|from \\\"@/shared/ui/Example\\\"|from './Example'|from \\\"./Example\\\"|from \\\"@/shared/ui/ComponentExample\\\"" src tests`
- Failure recovery:
  - if an unexpected import reference appears, update only that direct caller or replan before touching broader shared-ui code.
- Commit:
  - `:fire: chore: remove setup demo components`

## Slice 2

- Goal:
  - Restore a working ESLint entrypoint for the current flat-config and Next.js 16 setup so lint execution reaches real repository diagnostics instead of failing at the CLI layer.
- Binding skill lens:
  - `next-best-practices`
- Done criteria:
  - `pnpm run lint:eslint` no longer fails because of the removed `next lint` subcommand
  - ignore handling is compatible with ESLint flat config and does not emit the `.eslintignore` deprecation warning
  - the command surfaces real file diagnostics until later slices clear them
- Out of scope:
  - fixing the actual file-level lint findings
- Planned files:
  - `package.json`
  - `eslint.config.mjs`
  - `.eslintignore`
- User checkpoint: `not required`
- Task checklist:
  1. Replace the stale `next lint` script with a supported ESLint CLI command.
  2. Move ignore rules into flat-config-compatible config.
  3. Remove or neutralize the obsolete `.eslintignore` file.
  4. Verify that ESLint config loads without CLI or ignore-file warnings.
- RED:
  - `pnpm run lint:eslint` currently fails with an invalid `next lint` command, and `pnpm exec eslint .` warns that `.eslintignore` is no longer supported.
- GREEN:
  - update the lint script and flat-config ignore handling so ESLint runs through the real repository inputs.
- REFACTOR:
  - keep ignore rules minimal and consistent with the current build artifact directories already used elsewhere in the repo.
- Verify:
  - `pnpm exec eslint --print-config src/shared/ui/ThemeToggle.tsx`
- Failure recovery:
  - if `eslint .` pulls in unexpected generated artifacts, tighten `globalIgnores` first instead of adding ad-hoc CLI flags.
- Commit:
  - `:wrench: chore: repair eslint entrypoint`

## Slice 3

- Goal:
  - Align Biome with the installed version and Tailwind CSS syntax so the repository's global CSS and config file can be parsed and checked normally.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - `biome.json` matches the installed Biome CLI schema version
  - Tailwind directives in `src/app/globals.css` parse cleanly under Biome
  - the touched config and CSS files pass Biome checks without introducing token-system drift
- Out of scope:
  - unrelated global CSS design changes
- Planned files:
  - `biome.json`
  - `src/app/globals.css`
- User checkpoint: `not required`
- Task checklist:
  1. Update the Biome schema version to the installed CLI version.
  2. Enable the parser support needed for Tailwind v4 directives.
  3. Apply only the minimal CSS formatting or syntax adjustments required after parser alignment.
  4. Verify the config and global stylesheet with targeted Biome checks.
- RED:
  - `pnpm run lint:biome` currently fails on schema mismatch and Tailwind directive parse errors in `src/app/globals.css`.
- GREEN:
  - align the Biome config and any necessary stylesheet details until both files are checkable.
- REFACTOR:
  - remove any redundant config or formatting churn and keep `src/app/globals.css` as the shared token source of truth.
- Verify:
  - `pnpm exec biome check biome.json src/app/globals.css`
- Failure recovery:
  - if Biome still cannot parse the Tailwind directives after config alignment, stop and re-check the exact parser option names before widening scope.
- Commit:
  - `:wrench: chore: align biome with tailwind css`

## Slice 4

- Goal:
  - Clear the known repository formatting/import-order failures so the remaining Biome baseline is reduced to real logic/config issues only.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - `playwright.config.ts`, `src/shared/lib/utils.ts`, and `tests/e2e/example.spec.ts` pass Biome formatting/import checks
  - changes stay formatting-only and do not alter runtime behavior
- Out of scope:
  - touching unrelated files for formatting consistency
- Planned files:
  - `playwright.config.ts`
  - `src/shared/lib/utils.ts`
  - `tests/e2e/example.spec.ts`
- User checkpoint: `not required`
- Task checklist:
  1. Apply the formatter changes required by Biome in the known files.
  2. Organize imports where Biome reports ordering differences.
  3. Re-run targeted Biome checks on the touched files.
  4. Confirm no functional code path changed while normalizing style.
- RED:
  - Biome currently reports formatter/import-order failures across the three known baseline files.
- GREEN:
  - apply the minimal formatting/import updates needed for Biome compliance.
- REFACTOR:
  - remove any accidental formatting churn outside the reported diffs and keep the slice behavior-preserving.
- Verify:
  - `pnpm exec biome check playwright.config.ts src/shared/lib/utils.ts tests/e2e/example.spec.ts`
- Failure recovery:
  - if a touched file reveals a non-format lint failure, either absorb it here only if it is local to the same file or replan the slice boundary before mixing responsibilities.
- Commit:
  - `:art: style: normalize lint baseline formatting`

## Slice 5

- Goal:
  - Resolve the remaining shared-UI lint finding so the combined Biome and ESLint pipeline reaches a clean repository baseline.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - `src/shared/ui/ThemeToggle.tsx` no longer triggers `react-hooks/set-state-in-effect`
  - the touched UI file stays within maintenance scope and avoids unnecessary structural refactors
- Out of scope:
  - redesigning shared UI or reworking theme-toggle behavior beyond the lint-compliant fix
- Planned files:
  - `src/shared/ui/ThemeToggle.tsx`
- User checkpoint: `not required`
- Task checklist:
  1. Remove the effect-driven mounted-state pattern in `ThemeToggle` with a lint-compliant approach.
  2. Keep the theme toggle behavior unchanged for users.
  3. Verify the touched UI file with targeted ESLint.
  4. Reconfirm the repository-wide ESLint baseline after the fix.
- RED:
  - after deleting the setup/demo files, `pnpm exec eslint .` still reports `set-state-in-effect` in `ThemeToggle`.
- GREEN:
  - apply the minimal code changes needed for `ThemeToggle` to lint cleanly.
- REFACTOR:
  - keep the fix localized, avoid broad component rewrites, and preserve the current shared token and component boundaries.
- Verify:
  - `pnpm exec eslint src/shared/ui/ThemeToggle.tsx`
- Failure recovery:
  - if the mounted-state fix reveals a hydration concern, solve it within `ThemeToggle` rather than widening the client boundary elsewhere.
- Commit:
  - `:bug: fix: clear remaining theme toggle lint issue`

## Final Stages

- Hardening:
  - rerun split lint commands to confirm no hidden failures remain after the CLI/config fixes
  - check that the example image fix did not introduce a missing remote-pattern config or widen scope
  - verify that config changes remain minimal and do not suppress rules that should instead be satisfied
- Review:
  - review for scope creep, config overreach, and any divergence from project frontend rules
  - confirm the branch solved only lint-baseline issues and did not hide behavior changes inside formatting/config updates
- Refactor:
  - apply only cleanup justified by hardening or review findings
  - remove dead config/comments only when directly tied to the lint baseline fixes
- Final Verify:
  - `pnpm run lint`
  - `git diff --check`
