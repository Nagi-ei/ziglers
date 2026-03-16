# Branch Plan

- Primary classification: `react-ui`
- Secondary classification: `next-app-router`
- Primary skill lens: `frontend-architecture-rules`
- Secondary skill lens: `frontend-design`

## Scope

- In:
  - create `docs/MASTER-PLAN.md` as the canonical English master-plan document
  - document the current baseline, fixed identity constraints, document map, execution principles, and branch roadmap
  - translate the accepted master plan into `docs/ko/MASTER-PLAN.md` if the English source is finalized in this branch
  - make only minimal source-of-truth cross-reference updates if a concrete clarity gap appears during execution
- Out:
  - landing/dashboard UI implementation changes
  - feature implementation
  - broad rewrites to the existing core docs unrelated to the master-plan document

## Interface / Type Changes

- No runtime interface or TypeScript contract changes are planned.
- New document surfaces:
  - `docs/MASTER-PLAN.md`
  - `docs/ko/MASTER-PLAN.md` after English finalization

## Slice 1

- Goal:
  - Create the English master-plan skeleton and lock the branch baseline, document role, and fixed identity constraints.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - `docs/MASTER-PLAN.md` explicitly positions itself above `PRD`, `SCAFFOLD_STRUCTURE`, `TECH_REFERENCE`, and `AGENTS`
  - the document records the current implementation baseline rather than describing a greenfield project
  - the document preserves service name, color direction, token system, and memo/paper concept as fixed constraints
- Out of scope:
  - detailed branch-by-branch roadmap content beyond the initial section placeholders
- Planned files:
  - `docs/MASTER-PLAN.md`
- User checkpoint: `required`
- Task checklist:
  1. Write the document purpose and source-of-truth relationship.
  2. Summarize the current repository baseline and completed branch foundations.
  3. Record the fixed design and architecture constraints that future branches must preserve.
  4. Add the high-level section skeleton for the remaining master-plan content.
- RED:
  - Compare the accepted spec and research conclusions against the missing `docs/MASTER-PLAN.md`; fail on absent baseline, missing document role, and missing fixed-constraint statements.
- GREEN:
  - Add the minimum English sections needed to satisfy the baseline, role, and fixed-constraint requirements.
- REFACTOR:
  - Tighten wording, remove duplicated statements from adjacent sections, and ensure the document stays above detailed PRD/tech content.
- Verify:
  - `pnpm prettier:docs`
  - `rg -n "Current Baseline|Fixed Constraints|Source of Truth|Roadmap" docs/MASTER-PLAN.md`
- Failure recovery:
  - If the draft starts duplicating PRD or TECH_REFERENCE detail, trim back to summary language and link responsibilities to the owning docs before continuing.
- Commit:
  - `:memo: docs: add master plan baseline and constraints`

## Slice 2

- Goal:
  - Add the planning-level product, UX, architecture, and branch-delivery principles that the roadmap must obey.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - the document captures planning-level guidance for product scope, UX direction, design-system continuity, and server/client architecture boundaries
  - the content points detailed ownership back to the existing source docs instead of duplicating them
  - the master plan explains how issue-per-branch and thread-per-branch execution should operate
- Out of scope:
  - detailed branch sequencing tables
- Planned files:
  - `docs/MASTER-PLAN.md`
- User checkpoint: `not required`
- Task checklist:
  1. Add planning-level product and UX direction sections.
  2. Add architecture and document-ownership guidance tied back to the core docs.
  3. Add branch-cycle and execution-principle guidance for future branches.
  4. Check that no section drifts into low-value duplication.
- RED:
  - Check the slice 1 draft against spec acceptance criteria and fail on missing planning rules for product direction, document ownership, and branch execution.
- GREEN:
  - Add the minimum planning-level sections needed to cover those missing rules.
- REFACTOR:
  - Merge overlapping guidance, simplify repetitive language, and keep section boundaries explicit.
- Verify:
  - `pnpm prettier:docs`
  - `rg -n "Product Direction|UX Direction|Architecture Principles|Branch Delivery" docs/MASTER-PLAN.md`
- Failure recovery:
  - If section boundaries blur, rewrite the headings so each section owns one planning responsibility and defer detailed specifics to the owning doc.
- Commit:
  - `:memo: docs: define master plan operating principles`

## Slice 3

- Goal:
  - Define the branch-by-branch roadmap, recommended sequence, dependency logic, and verification expectations from the current state through MVP delivery.
- Binding skill lens:
  - `frontend-design`
- Done criteria:
  - the roadmap names the recommended next branches in order
  - the roadmap explains where UI refresh branches fit and why they happen at that stage
  - each roadmap stage states its responsibility and what must be true before the next stage
  - the roadmap stays at planning level rather than becoming a full per-branch implementation spec
- Out of scope:
  - writing future branch-local specs or plans
- Planned files:
  - `docs/MASTER-PLAN.md`
- User checkpoint: `required`
- Task checklist:
  1. Define the roadmap stages from current docs baseline to MVP completion.
  2. Group the roadmap into docs, UI refresh, platform/app-shell, feature delivery, and hardening phases.
  3. Add dependencies and verification expectations for each phase.
  4. Check that the roadmap preserves the fixed identity constraints through the planned UI refresh.
- RED:
  - Compare the draft against the accepted research recommendation and fail on missing sequence logic, missing UI refresh placement, or missing dependency explanations.
- GREEN:
  - Add the roadmap table or structured list with the minimum information required to remove sequencing ambiguity.
- REFACTOR:
  - Compress repetitive roadmap entries, normalize wording across stages, and remove branch detail that belongs in future branch-local plans.
- Verify:
  - `pnpm prettier:docs`
  - `rg -n "Roadmap|Phase|Dependency|Verification" docs/MASTER-PLAN.md`
- Failure recovery:
  - If the roadmap becomes too implementation-specific, step back to milestone-level responsibilities and move branch-local detail out of the master plan.
- Commit:
  - `:memo: docs: add master plan branch roadmap`

## Slice 4

- Goal:
  - Finalize the English source, sync the Korean translation, and apply only the minimal cross-reference touch-ups required for document clarity.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - `docs/MASTER-PLAN.md` is final for this branch
  - `docs/ko/MASTER-PLAN.md` matches the accepted English source if translation is included
  - any supporting doc touch-ups stay minimal and do not widen branch scope
- Out of scope:
  - unrelated edits in existing docs
- Planned files:
  - `docs/MASTER-PLAN.md`
  - `docs/ko/MASTER-PLAN.md`
  - one additional source doc only if a concrete cross-reference gap is found during execution; otherwise none
- User checkpoint: `not required`
- Task checklist:
  1. Review the English source for consistency and terminology drift.
  2. Translate the finalized content into Korean.
  3. Apply only necessary cross-reference touch-ups if a specific clarity gap is confirmed.
  4. Run final document verification commands.
- RED:
  - Check the near-final English source and fail on unresolved wording conflicts, unsynced translation, or source-of-truth ambiguity.
- GREEN:
  - Apply the minimal edits needed to finalize the English source, add the Korean translation, and close confirmed cross-reference gaps.
- REFACTOR:
  - Tighten translation consistency, normalize headings, and remove stray duplication across the touched docs.
- Verify:
  - `pnpm prettier:docs`
  - `git diff --check -- docs/MASTER-PLAN.md docs/ko/MASTER-PLAN.md`
  - `rg -n "MASTER-PLAN|Master Plan|마스터 플랜" docs docs/ko`
- Failure recovery:
  - If translation reveals unresolved English-source ambiguity, fix the English source first, then re-sync Korean instead of patching around the mismatch.
- Commit:
  - `:memo: docs: finalize and sync master plan`

## Final Stages

- Hardening:
  - check for terminology drift, duplicated ownership statements, stale path references, and roadmap entries that contradict the current baseline or core docs
- Review:
  - run a doc-focused review for scope creep, source-of-truth confusion, weak sequencing logic, and any roadmap step that cannot be justified from the current baseline
- Refactor:
  - apply only wording, structure, or cross-reference fixes justified by hardening or review findings
- Final Verify:
  - `pnpm prettier:docs`
  - `git diff --check`
  - `rg -n "docs/MASTER-PLAN.md|docs/ko/MASTER-PLAN.md|\\.agent/sessions" AGENTS.md docs/*.md docs/ko/*.md`
