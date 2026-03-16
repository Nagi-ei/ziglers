# Spec

## Goal

- Stabilize the repository lint baseline for `chore/13--stabilize-lint-baseline` by resolving the currently reproducible Biome, ESLint, and formatting failures blocking `pnpm run lint`.
- Leave the repository with lint entrypoints that match the current Next.js 16 and ESLint flat-config toolchain instead of carrying forward broken lint commands into later branches.

## Problem / Background

- `pnpm run lint` currently fails before the repository can establish a clean baseline for routine branch work.
- The current `lint` stack is split between Biome and ESLint, but both halves have baseline problems:
  - `biome.json` points at schema `2.2.0` while the installed Biome CLI is `2.3.9`
  - `src/app/globals.css` uses Tailwind v4 directives that Biome is not currently configured to parse
  - `playwright.config.ts`, `src/shared/lib/utils.ts`, and `tests/e2e/example.spec.ts` contain existing formatting/import-order issues
- `src/shared/ui/ComponentExample.tsx` and `src/shared/ui/Example.tsx` are setup-time demo components unrelated to the actual project surface, and they are safe candidates for removal instead of lint-compliance maintenance
- The `lint:eslint` entrypoint is also stale for the current toolchain:
  - `package.json` still uses `next lint`
  - under Next.js `16.0.10`, `next lint` is no longer a valid CLI subcommand, so `pnpm run lint:eslint` fails before it reaches real repository diagnostics
  - running `pnpm exec eslint .` reveals the actual remaining ESLint findings, including `@next/next/no-img-element` in `src/shared/ui/ComponentExample.tsx`, `react-hooks/set-state-in-effect` in `src/shared/ui/ThemeToggle.tsx`, and the deprecated `.eslintignore` warning under flat config
- This branch exists to clean the current baseline, not to expand product or UI scope.

## Desired Outcome

- `pnpm run lint` exits successfully on this branch.
- `pnpm run lint:biome` and `pnpm run lint:eslint` both run against the current toolchain and exit cleanly.
- Biome is aligned with the installed CLI version and current Tailwind CSS syntax.
- The existing repository lint noise is removed with minimal, explainable maintenance changes rather than broad refactors.

## Scope

- In:
  - update lint entrypoints/configuration needed to make the current Biome and ESLint commands executable and compatible
  - align `biome.json` with the installed Biome version and Tailwind directive parsing needs
  - delete the unused setup/demo components `src/shared/ui/ComponentExample.tsx` and `src/shared/ui/Example.tsx`
  - fix the currently reported Biome format/import failures in `playwright.config.ts`, `src/shared/lib/utils.ts`, and `tests/e2e/example.spec.ts`
  - fix the currently reported ESLint finding in `src/shared/ui/ThemeToggle.tsx`
  - update supporting config such as `eslint.config.mjs` or `.eslintignore` only when required to make lint pass cleanly
- Out:
  - broad repository-wide formatting beyond files required to achieve a clean lint baseline
  - unrelated feature work, UI redesign, or architectural refactors
  - moving files or introducing new layers
  - changing design tokens or visual direction except for minimal adjustments strictly required for lint compliance

## Non-Goals

- Redesigning or restructuring example/demo surfaces beyond what lint compliance requires
- Refactoring `src/shared/ui/ComponentExample.tsx` into a new component structure unless lint compliance forces it
- Changing repository tooling beyond the current Biome, ESLint, and Next.js stack
- Fixing unrelated issues that are not necessary to achieve a clean `pnpm run lint` baseline

## Constraints / Assumptions

- This branch must follow the documented branch cycle and keep all artifacts under `.agent/sessions/[#13]chore--stabilize-lint-baseline/`.
- Changes should stay minimal and directly traceable to observed lint failures.
- The branch must preserve the existing scaffold and frontend rules from `docs/SCAFFOLD_STRUCTURE.md` and project `AGENTS.md`.
- Prefer configuration alignment and code compliance over rule suppression when a supported toolchain fix is available.
- If additional lint failures appear after current blockers are removed, they are in scope only when they are required to make `pnpm run lint` clean and still fit this branch's maintenance intent.

## Acceptance Criteria

- `pnpm run lint` exits `0`.
- `pnpm run lint:biome` exits `0` without schema mismatch errors, Tailwind directive parse failures, or existing formatter/import failures in the currently known files.
- `pnpm run lint:eslint` uses a toolchain-compatible command and exits `0` without CLI usage errors or `.eslintignore` deprecation warnings.
- `src/shared/ui/ComponentExample.tsx` and `src/shared/ui/Example.tsx` are removed without breaking project imports.
- `src/shared/ui/ThemeToggle.tsx` no longer triggers `react-hooks/set-state-in-effect`.
- The branch diff remains focused on lint baseline maintenance rather than unrelated cleanup or redesign.

## Open Questions

- After the Biome and ESLint entrypoints are aligned, do any additional repository lint findings surface that must be treated as in-scope to reach a fully clean baseline?
- Do the setup/demo component deletions surface any unexpected import references outside the currently known code paths?

## Research Decision

- Required: no
- Why:
  - the current failures are concrete, reproducible locally, and narrow enough to plan directly
  - the branch does not need an architecture or library-choice decision before implementation
- If yes, research questions:
  - n/a
