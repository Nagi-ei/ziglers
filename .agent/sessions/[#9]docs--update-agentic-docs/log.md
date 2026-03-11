# Log

## Slice 1 - AGENTS and Scaffold Alignment

- PLAN:
  - Align `AGENTS.md` and `SCAFFOLD_STRUCTURE.md` with the current branch workflow, `.agent` artifact model, frontend rules, shadcn exception, query key convention, and current data-access direction.
- LENS CHECK:
  - Binding skill lens: `frontend-architecture-rules`
  - Key constraints enforced:
    - one component per file except accepted route-local and installed shadcn exceptions
    - server-side data access only
    - direct, explainable boundaries over low-value repository/adapter indirection
    - explicit hierarchical query key factories

## TDD Cycle

- RED: `AGENTS.md` still described the old execution pipeline and stale frontend/data-layer defaults; `SCAFFOLD_STRUCTURE.md` still prescribed client-side adapter/query-hook examples and oversized stale scaffold samples.
- GREEN: Rewrote `AGENTS.md` around the current branch-cycle workflow and updated `SCAFFOLD_STRUCTURE.md` into a concise scaffold/boundary document aligned with current skills and repository reality.
- REFACTOR: Removed dead sample-heavy sections, normalized shadcn primitive handling to `components.json`-driven conventions, and collapsed outdated migration language into clearer project rules.

## Verify

- Commands:
  - `pnpm prettier:docs`
  - `rg -n "\.ai/sessions|thread-handoff-writer|frontend-ui-global|supabase\.adapter|model/queries\.ts|Execution Pipeline" AGENTS.md SCAFFOLD_STRUCTURE.md`
  - `git diff --check -- AGENTS.md SCAFFOLD_STRUCTURE.md`
- Result:
  - pass

## Slice 2 - PRD and Tech Reference Alignment

- PLAN:
  - Correct `PRD.md` and `TECH_REFERENCE.md` wherever stale implementation wording, toolchain details, and boundary definitions conflict with the accepted architecture, while preserving product goals.
- LENS CHECK:
  - Binding skill lens: `frontend-architecture-rules`
  - Key constraints enforced:
    - reads in server boundaries, writes through Server Actions by default
    - Route Handlers not treated as the default internal CRUD path
    - hierarchical query key factories as the documented convention
    - technical references should favor durable contracts over stale code/config dumps

## TDD Cycle

- RED: `PRD.md` still described reads and writes as `Server Actions and Route Handlers`; `TECH_REFERENCE.md` still pointed to stale Prisma paths, outdated versions, and repository/config examples that no longer reflect the accepted architecture or current repo reality.
- GREEN: Updated `PRD.md` to preserve product requirements while fixing stale implementation wording, and updated `TECH_REFERENCE.md` to reflect current versions, server/client boundary rules, query-key conventions, and repo-backed verification references.
- REFACTOR: Replaced stale config/code dumps with source-of-truth file references where possible, tightened the Server Action example, and normalized wording around i18n, lint/test commands, and cache consistency.

## Verify

- Commands:
  - `pnpm prettier:docs`
  - `rg -n "shared/lib/prisma/client|repositories/boardRepository|next-intl|pnpm next lint|pnpm test --runInBand --coverage|Route Handlers perform all database reads and mutations|ThemeSwitcher" PRD.md TECH_REFERENCE.md`
  - `git diff --check -- PRD.md TECH_REFERENCE.md`
- Result:
  - pass

## Slice 3 - Korean Translation Sync

- PLAN:
  - Sync `docs/*.ko.md` with the accepted English source documents so the Korean references preserve the same workflow, architecture, and terminology decisions.
- LENS CHECK:
  - Binding skill lens: `frontend-architecture-rules`
  - Key constraints enforced:
    - translation files must not reintroduce stale Supabase adapter or old execution-pipeline language
    - branch-cycle, `.agent` artifact rules, and server/client boundary wording must match the English source
    - Korean docs should preserve the same query-key, shadcn, and repository/adapter guidance

## TDD Cycle

- RED: `docs/PRD.ko.md` and `docs/TECH_REFERENCE.ko.md` still reflected stale wording and older boundary/toolchain assumptions, while the newly rewritten `docs/AGENTS.ko.md` and `docs/SCAFFOLD_STRUCTURE.ko.md` needed final sync verification as a set.
- GREEN: Rewrote `docs/PRD.ko.md` and `docs/TECH_REFERENCE.ko.md` against the current English source and confirmed the four Korean docs describe the same branch workflow, scaffold rules, and data-access model.
- REFACTOR: Normalized translated terminology around branch-cycle stages, data boundaries, query-key factories, and installed shadcn primitive handling.

## Verify

- Commands:
  - `pnpm prettier:docs`
  - `rg -n "\\.agent|Spec|Research|Planner|Execution|Hardening|Review|Refactor|Final Verify|Prisma|TanStack Query|shadcn|components\\.json" docs/AGENTS.ko.md docs/SCAFFOLD_STRUCTURE.ko.md docs/PRD.ko.md docs/TECH_REFERENCE.ko.md`
  - `git diff --check -- docs/AGENTS.ko.md docs/SCAFFOLD_STRUCTURE.ko.md docs/PRD.ko.md docs/TECH_REFERENCE.ko.md`
- Result:
  - pass
