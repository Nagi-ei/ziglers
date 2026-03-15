# Branch Plan

- Primary classification: `react-ui`
- Secondary classification: `next-app-router`
- Primary skill lens: `frontend-architecture-rules`
- Secondary skill lens: `next-best-practices`

## Scope

- In:
  - align `AGENTS.md` with the current branch-cycle skills, `.agent` artifact model, and frontend rules
  - align `docs/SCAFFOLD_STRUCTURE.md` with the current data-access direction, query key pattern, shadcn exception rule, and retained example policy
  - correct stale implementation/tooling wording in `docs/PRD.md` and `docs/TECH_REFERENCE.md` without changing product goals
  - update `docs/ko/AGENTS.md`
  - update `docs/ko/SCAFFOLD_STRUCTURE.md`
  - update `docs/ko/PRD.md`
  - update `docs/ko/TECH_REFERENCE.md`
- Out:
  - any application code change
  - skill rewrites beyond the already accepted updates
  - creating new product requirements
  - writing `docs/MASTER-PLAN.md`

## Interface / Type Changes

- No application interface or runtime type changes.
- Documented query key convention should be normalized to the hierarchical factory pattern already accepted in the skills.
- Documented shadcn exception wording should refer to the canonical installed primitive surface derived from `components.json` and scaffold conventions.

## Slice 1

- Goal:
  - Align `AGENTS.md` and `docs/SCAFFOLD_STRUCTURE.md` with the current branch workflow, artifact model, frontend rules, shadcn exception, query key convention, and current data-access direction.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - `AGENTS.md` no longer prescribes the old execution pipeline or stale frontend/data-layer defaults
  - `docs/SCAFFOLD_STRUCTURE.md` no longer conflicts with current read/write boundaries or stale client-side Supabase adapter/query-hook defaults
  - retained examples, if any, are clearly canonical and not contradictory to the active skills
- Out of scope:
  - `docs/PRD.md`, `docs/TECH_REFERENCE.md`, and Korean translations
- Planned files:
  - `AGENTS.md`
  - `docs/SCAFFOLD_STRUCTURE.md`
- RED:
  - confirm current contradictions remain present via targeted grep and manual comparison before editing
- GREEN:
  - update both English architecture/agent documents to the accepted current rules
- REFACTOR:
  - collapse redundant prose, remove dead example patterns, normalize terms and file/path names
- Verify:
  - `pnpm prettier:docs`
  - `rg -n "\\.ai/sessions|thread-handoff-writer|frontend-ui-global|supabase\\.adapter|model/queries\\.ts|Execution Pipeline" AGENTS.md docs/SCAFFOLD_STRUCTURE.md`
- Failure recovery:
  - if workflow wording and scaffold wording drift apart, pause and normalize English source documents before continuing
- Commit:
  - `:memo: docs: align agents and scaffold docs with current skills`

## Slice 2

- Goal:
  - Correct `docs/PRD.md` and `docs/TECH_REFERENCE.md` wherever stale implementation wording, toolchain details, and boundary definitions conflict with the accepted architecture, while preserving product goals.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - `docs/PRD.md` keeps the same product scope but no longer contradicts current read/write, route-handler, or tooling expectations where it is meant to be normative
  - `docs/TECH_REFERENCE.md` no longer drifts from the accepted English architecture direction on data access, query keys, or toolchain details
  - any retained examples are consistent with the accepted architecture and repository reality
- Out of scope:
  - Korean translations
  - new product scope decisions
- Planned files:
  - `docs/PRD.md`
  - `docs/TECH_REFERENCE.md`
- RED:
  - confirm stale wording/toolchain drift still exists in the current English source documents
- GREEN:
  - update the English product and technical references to the accepted current rules without changing product intent
- REFACTOR:
  - trim or rewrite outdated examples, normalize version/env/tool naming, and remove contradictory implementation prose
- Verify:
  - `pnpm prettier:docs`
  - `rg -n "Prisma Client|Server Actions|Route Handlers|pnpm|Node\\.js|next-intl|Vercel Preview Deploy|SUPABASE" docs/PRD.md docs/TECH_REFERENCE.md`
- Failure recovery:
  - if a wording change starts to alter product intent, revert to the existing feature scope and keep the edit limited to implementation guidance
- Commit:
  - `:memo: docs: sync product and tech references with current architecture`

## Slice 3

- Goal:
  - Update the Korean translations in `docs/` so they match the finalized English source documents and preserve technical identifiers accurately.
- Binding skill lens:
  - `branch-cycle-orchestrator`
- Done criteria:
  - `docs/ko/AGENTS.md`, `docs/ko/SCAFFOLD_STRUCTURE.md`, `docs/ko/PRD.md`, and `docs/ko/TECH_REFERENCE.md` reflect the final English docs
  - technical names, file paths, env vars, and stage names remain accurate
  - no Korean document reintroduces rules or examples already removed from the English source
- Out of scope:
  - further English-source rewrites unless translation reveals a real source inconsistency
- Planned files:
  - `docs/ko/AGENTS.md`
  - `docs/ko/SCAFFOLD_STRUCTURE.md`
  - `docs/ko/PRD.md`
  - `docs/ko/TECH_REFERENCE.md`
- RED:
  - confirm the current Korean docs no longer match the finalized English source after slices 1-2
- GREEN:
  - translate and synchronize all four Korean docs from the accepted English source
- REFACTOR:
  - normalize Korean terminology, preserve English technical identifiers where needed, and remove stale translated examples
- Verify:
  - `pnpm prettier:docs`
  - `rg -n "\\.agent|Spec|Research|Planner|Execution|Hardening|Review|Refactor|Final Verify|Prisma|TanStack Query|shadcn|components\\.json" docs/ko/AGENTS.md docs/ko/SCAFFOLD_STRUCTURE.md docs/ko/PRD.md docs/ko/TECH_REFERENCE.md`
- Failure recovery:
  - if translation introduces ambiguity, preserve the English technical identifier and tighten the surrounding Korean explanation rather than inventing a new term
- Commit:
  - `:memo: docs: update korean translations for aligned project docs`

## Final Stages

- Hardening:
  - run a cross-document consistency pass for workflow order, `.agent` artifact naming, data-access boundaries, query key conventions, shadcn exception wording, env var names, and toolchain versions
- Review:
  - review the final diffs against the current installed skills and actual repository files such as `components.json` and `package.json`
- Refactor:
  - remove duplicated explanations, dead examples, and stale implementation notes that remain after review findings are addressed
- Final Verify:
  - `pnpm prettier:docs`
  - `git diff --check`
  - `rg -n "\\.ai/sessions|thread-handoff-writer|frontend-ui-global" AGENTS.md docs/SCAFFOLD_STRUCTURE.md docs/PRD.md docs/TECH_REFERENCE.md docs/ko/*.md`
