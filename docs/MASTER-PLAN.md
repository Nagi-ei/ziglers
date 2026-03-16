# Mandalart Web - MASTER PLAN (v0.1)

_Last updated: 2026-03-17 (KST)_

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

The master plan should only define the product and experience direction needed to sequence the work.
Detailed requirements, field rules, and user-facing acceptance still belong in `docs/PRD.md`.

### 6.1 Product Direction

- Prioritize the MVP flow already described in `docs/PRD.md`:
  - account-based access
  - board creation and management
  - task completion flow
  - dashboard visibility
  - export output
- Treat the current landing and dashboard implementation as baseline surfaces to refine, not disposable experiments.
- Use the roadmap to move from static or demo-oriented UI surfaces toward real MVP behavior in a controlled order.

### 6.2 UX Direction

- Preserve the memo/paper/planning-board concept across landing, dashboard, and future board-related surfaces.
- Keep the product legible and structured first; stylistic refresh work should strengthen clarity, hierarchy, and planning flow rather than add ornamental complexity.
- Make the board flow the core experience and keep the dashboard as a summary and progress surface, not the product's primary editing surface.
- Keep landing and dashboard refresh work visually aligned so the service identity reads as one system.
- Treat the default board screen as both the overview state and the entry point into editing:
  - the non-focused board state should already function as the normal board view
  - selecting a cell should transition into a focused edit surface such as a drawer or side panel
  - a separate read-only board mode is not required for MVP unless a later branch introduces a concrete sharing or presentation need

---

## 7) Architecture and Delivery Principles

The master plan should only restate the architecture and delivery rules that materially affect roadmap order.
Detailed file-placement and technical implementation rules still belong in `docs/SCAFFOLD_STRUCTURE.md`, `docs/TECH_REFERENCE.md`, and `AGENTS.md`.

### 7.1 Architecture Principles

- Keep database access server-side only, with Prisma as the primary application data-access layer and Supabase responsible for auth, storage, and RLS.
- Keep the App Router scaffold, layer boundaries, and UI surface separation defined in `docs/SCAFFOLD_STRUCTURE.md`.
- Reuse installed `shadcn/ui`, existing shared UI, and semantic tokens before introducing new project UI primitives or local color decisions.
- Keep new work explainable from imports and boundaries; avoid low-value repository, adapter, or wrapper layers.

### 7.2 Branch Delivery

- Keep one issue per branch and one thread per branch.
- Keep the documented branch cycle for non-trivial work and use branch-local artifacts under `.agent/sessions/...`.
- Keep UI refresh work in dedicated UI branches instead of hiding it inside deeper feature branches.
- Update English source docs first when roadmap or architecture guidance changes, then sync Korean documentation afterward.

---

## 8) Branch Roadmap

The roadmap should optimize for two things at once:

- preserve the current service identity while the UI gets refreshed
- avoid widening feature implementation before the visual system and app/data foundations are stable

### 8.1 Sequencing Logic

- Complete the top-level planning document first so later branches inherit one baseline and one source-of-truth map.
- Refresh the shared design foundation before expanding more screens or deeper feature flows.
- Refresh the landing and dashboard surfaces early because they already exist and define the visible identity of the product.
- Establish auth and application-shell behavior before user-owned board flows expand.
- Establish the board domain and editing workflow before wiring real dashboard metrics and export output.
- Finish with hardening and release-readiness work after the main MVP loop is in place.

### 8.2 Phase Model

- A phase is a delivery milestone, not a required one-branch boundary.
- Most phases should be executed through `1-3` small branches, each with one main responsibility.
- Split a phase into multiple branches when one branch would otherwise combine:
  - shared UI foundation work plus page redesign
  - auth/session work plus unrelated account surfaces
  - domain modeling plus multiple pages plus interaction-heavy editing
- The roadmap below names the recommended phase scope first and the likely branch splits second.

### 8.3 Phase Breakdown

#### Phase 0 - Completed Baseline

- Completed branches:
  - `feat/1--color`
  - `ui/3--shadcn-components`
  - `ui/5--landing-page`
  - `ui/7--dashboard-page`
  - `docs/9--update-agentic-docs`
- Responsibility:
  - establish the token foundation, shared UI primitives, initial landing/dashboard surfaces, and aligned project docs
- Verification before moving on:
  - treat the current repository state as the fixed baseline for future planning

#### Phase 1 - Current Planning Branch

- Current branch:
  - `docs/11--define-project-master-plan`
- Responsibility:
  - finalize the master plan, freeze the delivery order, and keep source-of-truth ownership explicit
- Verification before moving on:
  - accepted `docs/MASTER-PLAN.md`
  - verified session artifacts
  - final document alignment

#### Phase 2 - Design Foundation Refresh

- Why this phase exists:
  - landing and dashboard already exist, but the refreshed UI direction should be unified before more feature surfaces are added
- Recommended branch:
  - `ui/<n>--refresh-design-foundation`
    - audit the current visual language
    - lock the refreshed note/paper direction
    - implement or refine the minimum reusable shared surfaces needed across pages
    - examples: note-like cards, taped section treatments, shared page header patterns, stable spacing and typography rules
- How to work with this phase:
  - ask for a baseline audit first
  - then ask for the minimum shared UI surface extraction needed before page redesign
  - keep this branch focused on shared design foundations rather than rebuilding landing or dashboard inside the same branch
- Verification before moving on:
  - shared UI review
  - token compliance
  - responsive baseline
  - design-review pass showing the refreshed direction is clear enough for page-level work

#### Phase 3 - Surface Refresh

- Recommended branch split:
  - `ui/<n>--refresh-landing-page`
  - `ui/<n>--refresh-dashboard-page`
- Responsibility:
  - rebuild the two existing visible surfaces on top of the refreshed design foundation
  - landing should define the public-facing tone
  - dashboard should translate that tone into the authenticated app surface
- Dependency:
  - Phase 2
- Verification before moving on:
  - landing responsive checks and accessibility review
  - dashboard empty/loading-state review and app-surface consistency check
  - visual alignment between landing and dashboard after both branches are complete
  - preferred execution order: landing first, then dashboard
  - parallel execution is possible only if the shared design foundation is already stable enough that both branches can follow the same visual rules without divergence

#### Phase 4 - Account Foundation

- Recommended branch split:
  - `feature/<n>--auth-entry-flow`
    - sign up, log in, auth UI, and session entry behavior
  - `feature/<n>--app-shell-route-guard`
    - protected routes, authenticated shell, and navigation framing
  - `feature/<n>--profile-page`
    - minimal account/profile surface for MVP
    - example scope: account info, display name, logout entry, and profile-level navigation anchor
- Dependency:
  - Phase 3
- Verification before moving on:
  - login/logout smoke flow
  - protected-route behavior
  - app-shell navigation checks
  - profile page basic account-flow coverage

#### Phase 5 - Board Foundation

- Recommended branch split:
  - `feature/<n>--board-domain-foundation`
    - server-side board, cell, task, and event foundations
    - minimum persisted board creation flow
    - route-level board detail shell that can load and render a created board
  - `feature/<n>--boards-page`
    - user-owned board list or "My Boards" surface
    - navigation between boards list, board creation entry, and board detail shell
- Notes:
  - the boards list page is part of MVP and should not be treated as optional
  - this phase should stop at create/list/detail shell behavior and should not absorb the full editing interaction model
- Dependency:
  - Phase 4
- Verification before moving on:
  - data-boundary verification
  - schema or contract checks
  - minimal integration coverage for board create/list/detail-shell flows

#### Phase 6 - Board Editing

- Recommended branch split:
  - `feature/<n>--board-view-surface`
    - the default board screen with its non-focused overview state
  - `feature/<n>--cell-detail-flow`
    - focused cell detail, task editing, and completion changes
  - `feature/<n>--board-save-flow`
    - autosave, failure handling, and any conflict/version behavior required by the MVP spec
- Notes:
  - the non-focused board state should already be the normal board view
  - MVP does not require a separate read-only page or mode by default
  - export preview or sharing-oriented presentation views can remain later concerns unless a branch proves they are necessary for MVP
- Dependency:
  - Phase 5
- Verification before moving on:
  - core board smoke flow
  - failure-path handling
  - mutation consistency checks

#### Phase 7 - Dashboard Data Integration

- Recommended branch split:
  - `feature/<n>--dashboard-data-integration`
- Responsibility:
  - replace placeholder dashboard values with real progress, activity, and board data derived from the board workflow
- Dependency:
  - Phase 6
- Verification before moving on:
  - data-integrity checks for summary metrics
  - chart correctness
  - recent activity accuracy
  - board-list accuracy where dashboard links or summaries depend on real board state

#### Phase 8 - Export and Templates

- Recommended branch split:
  - `feature/<n>--board-export`
  - `feature/<n>--template-entry-flow`
- Dependency:
  - Phases 6-7
- Verification before moving on:
  - export quality checks
  - template creation flow checks
  - regression checks on board creation

#### Phase 9 - MVP Hardening

- Recommended branch split:
  - `chore/<n>--mvp-hardening-and-e2e`
- Responsibility:
  - close resilience gaps, add smoke coverage for critical journeys, and confirm the MVP is release-ready
- Dependency:
  - Phases 4-8
- Verification before moving on:
  - E2E smoke pass
  - failure-path review
  - doc sync
  - final verification evidence

### 8.4 Dependency Rules

- Do not start deep feature branches before the design foundation and the two visible baseline surfaces are refreshed.
- Do not wire real dashboard data before the board domain and board editor flows exist.
- Do not treat export or templates as first-wave work; they depend on the board model and core editing loop being stable first.
- If a future branch needs to break this order, update the branch-local spec and the master plan rather than silently drifting from the roadmap.

---

## 9) Verification and Documentation Sync

Verification should stay proportional to the branch type, but every phase should leave behind enough evidence that the next branch does not need to guess whether the baseline is trustworthy.

### 9.1 Branch Verification Expectations

- **Docs branches**
  - verify document structure, paths, terminology, and cross-document ownership
  - run formatting and diff-safety checks before completion
- **UI branches**
  - verify responsive behavior, accessibility basics, semantic-token compliance, and alignment with the approved design foundation
- **Feature branches**
  - verify happy path, at least one failure path, and data-boundary correctness
  - add smoke or integration evidence for the new user-facing flow before the next phase depends on it
- **Hardening branches**
  - verify cross-flow regressions, release-readiness evidence, and the final MVP path set

### 9.2 Documentation Sync Order

- Finalize the English source document first.
- Sync Korean documents only after the English source is accepted for the current branch.
- When a roadmap change affects other project documents, update:
  1. the owning English source document
  2. the corresponding Korean document
  3. the current branch handoff and verification notes when needed

### 9.3 Branch-Cycle Evidence

- Each non-trivial branch should leave behind:
  - `spec.md`
  - `research.md` when required
  - `plan.md`
  - `log.md`
  - `handoff.md`
- Future branches should treat those artifacts as execution evidence, not optional notes.

---

## 10) Risks and Decision Checkpoints

The roadmap should be updated intentionally when reality changes. The goal is not to freeze the project forever, but to prevent silent drift.

### 10.1 Main Risks

- **Design drift**
  - landing, dashboard, and board surfaces can diverge if the shared design foundation is weak
- **Oversized branches**
  - roadmap phases can still become too large if multiple concerns are bundled into one branch
- **Premature feature wiring**
  - wiring dashboard metrics, export, or template flows too early can force rework before the board model and editing loop are stable
- **Document duplication**
  - `MASTER-PLAN`, `PRD`, `SCAFFOLD_STRUCTURE`, and `TECH_REFERENCE` can become redundant if section ownership is not enforced

### 10.2 Replan Triggers

Stop and replan instead of patching around the issue when:

- a branch needs to cross the accepted phase order in a meaningful way
- a branch grows beyond a single clear responsibility
- the UI refresh requires changing the token contract or core visual identity
- the board domain or editing model changes in a way that invalidates downstream roadmap assumptions
- MVP suddenly requires a separate read-only board mode, sharing mode, or other new surface not accounted for here

### 10.3 Decision Rule

- If the change affects only one branch's local implementation details, update the branch-local plan.
- If the change affects multiple future branches, update this master plan first, then continue execution from the corrected roadmap.
