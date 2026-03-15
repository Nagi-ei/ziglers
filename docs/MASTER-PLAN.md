# Mandalart Web - MASTER PLAN (v0.1)

_Last updated: 2026-03-15 (KST)_

---

## 1) Purpose

This document is the top-level delivery plan for Mandalart Web.
It exists to connect the current source-of-truth documents, fix the active project baseline, and define how future issue-driven branches should move from the current state toward MVP completion.

This document does **not** replace the core documents:

- `docs/PRD.md` still owns product goals, scope, and functional requirements
- `docs/SCAFFOLD_STRUCTURE.md` still owns scaffold, layer, and file-placement rules
- `docs/TECH_REFERENCE.md` still owns technical implementation details
- `AGENTS.md` still owns always-on project and workflow rules

This master plan owns what sits above those documents:

- the current delivery baseline
- non-negotiable project constraints
- the order in which future branches should be executed
- the checkpoints that keep branch work aligned with the project identity and architecture

---

## 2) Source-of-Truth Map

Use the project documents in this order when planning or executing future branches:

1. `docs/MASTER-PLAN.md`
   - delivery baseline
   - branch roadmap
   - cross-document usage order
   - project-level decision checkpoints
2. `docs/PRD.md`
   - product goals
   - MVP scope
   - user-facing requirements
3. `docs/SCAFFOLD_STRUCTURE.md`
   - app structure
   - layer boundaries
   - UI surface ownership
4. `docs/TECH_REFERENCE.md`
   - toolchain
   - schema and data details
   - technical implementation conventions
5. `AGENTS.md`
   - project-wide AI rules
   - branch-cycle workflow
   - documentation sync expectations

Branch-local artifacts under `.agent/sessions/[#<issue-number>]<prefix>--<slug>/` remain the execution record for each branch and should derive their local intent from this master plan plus the owning source docs above.

---

## 3) Current Baseline

The repository should now be treated as an active baseline, not as a greenfield scaffold.

### 3.1 Delivery Baseline

- project setup and toolchain foundation are already in place
- shared color and theme-token groundwork has already landed
- shared shadcn/ui foundation is already installed and in use
- branch-cycle project docs were aligned in the previous docs branch

### 3.2 Product and UI Baseline

- the service identity is already established in the application metadata and current UI
- the landing page is already implemented
- the dashboard page is already implemented
- the product direction is already framed around the Mandalart planning method rather than a generic productivity tool

### 3.3 Visual Baseline

- `src/app/globals.css` already defines the semantic color-token contract
- the current UI already uses a warm paper-like palette, card surfaces, and memo-like accents
- existing components already use note-board cues such as tape, pinned-card composition, and planning-board language

### 3.4 Workflow Baseline

- each branch is paired with one issue
- each branch is worked in its own thread
- non-trivial work follows the branch cycle under `.agent/sessions/...`

This baseline matters because follow-up branches should refine and extend what exists today instead of planning as though nothing has been built.

---

## 4) Fixed Constraints

These constraints are project-level decisions and should be assumed true unless a later branch explicitly changes them with a documented justification.

### 4.1 Identity Constraints

- Keep the service name and current product identity intact.
- Keep Mandalart as the core framing method for goal planning and board-based execution.
- Do not reposition the product as a generic dashboard or generic note-taking app.

### 4.2 Visual-System Constraints

- Preserve the current color direction as the base visual direction.
- Preserve the semantic token system in `src/app/globals.css` as the shared styling contract.
- Preserve the memo/paper/note-taking concept as part of the product's visual identity.
- Future UI refresh work may reinterpret layout, typography, spacing, motion, and composition, but it must not discard the token-backed identity system.

### 4.3 Architecture Constraints

- Keep the current App Router + TypeScript + Prisma + Supabase architecture direction.
- Keep database access server-side only.
- Keep Prisma as the primary application data-access layer.
- Keep Supabase responsible for auth/session, storage, and RLS enforcement.
- Keep the scaffold aligned to the FSD-lite structure defined in `docs/SCAFFOLD_STRUCTURE.md`.

### 4.4 Workflow Constraints

- Continue using one issue per branch and one thread per branch.
- Continue using the branch cycle for non-trivial work.
- Keep English documents under `docs/*.md` as the source of truth.
- Sync Korean documents only after the English source is finalized.

---

## 5) What This Master Plan Must Clarify

This document should give future branches a stable answer to these project-level questions:

- What is already implemented and should be treated as the active baseline?
- Which parts of the current identity are fixed and which parts are open for redesign?
- How should product, UI, and feature work be sequenced from this point forward?
- Which source document owns which type of decision?
- What verification and documentation-sync expectations apply as the project moves branch by branch?

The remaining sections of this document will turn those questions into an execution-ready roadmap without duplicating detailed product or technical specification content that already lives elsewhere.

---

## 6) Product and Experience Direction

This section will summarize the planning-level product and UX direction that future branches must preserve while implementing MVP scope.
It should stay above detailed requirements and defer concrete feature ownership to `docs/PRD.md`.

---

## 7) Architecture and Delivery Principles

This section will summarize the planning-level architecture, UI-surface, and branch-delivery principles that future branches must follow.
It should defer detailed scaffold and technical rules to `docs/SCAFFOLD_STRUCTURE.md`, `docs/TECH_REFERENCE.md`, and `AGENTS.md`.

---

## 8) Branch Roadmap

This section will define the recommended branch-by-branch sequence from the current baseline toward MVP completion.
It should explain where the UI refresh happens, what each stage is responsible for, and what must be true before the next stage begins.

---

## 9) Verification and Documentation Sync

This section will define how document verification, branch verification, and English/Korean sync should happen as the roadmap advances.

---

## 10) Risks and Decision Checkpoints

This section will capture the main delivery risks, scope boundaries, and the decision points that should trigger a replan instead of ad-hoc drift.
