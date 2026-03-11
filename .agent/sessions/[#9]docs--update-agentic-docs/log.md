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
