# Spec

## Goal

- Write `docs/MASTER-PLAN.md` as the canonical English master-plan document for Mandalart Web.
- Fix the project's current baseline, non-negotiable identity constraints, and branch-by-branch execution order so future issue-driven branches can plan and execute against one shared reference.

## Problem / Background

- The repository now has aligned core source-of-truth documents in `docs/PRD.md`, `docs/SCAFFOLD_STRUCTURE.md`, `docs/TECH_REFERENCE.md`, and project-wide operating rules in `AGENTS.md`, but it still lacks a top-level master-plan document that explains how those documents connect and how the project should be delivered from the current baseline.
- The current implementation baseline is no longer hypothetical:
  - project setup is already in place
  - the brand token system is established in `src/app/globals.css`
  - the landing UI exists from the earlier landing-page branch history
  - the dashboard UI exists from the earlier dashboard-page branch history
- The user wants the next phase of the project to preserve the service identity, color direction, semantic design-token system, and memo/note-taking concept while allowing a fresh UI pass using the newly installed skills.
- Without a master plan, future issue-per-branch work can drift on scope, sequencing, document ownership, and how the UI refresh should relate to MVP feature delivery.

## Desired Outcome

- `docs/MASTER-PLAN.md` exists as a clear top-level planning document that:
  - makes the branch roadmap and execution order the primary output of the document
  - describes the current project baseline and fixed constraints
  - explains the role of `PRD`, `SCAFFOLD_STRUCTURE`, `TECH_REFERENCE`, and branch artifacts
  - defines the recommended branch roadmap from the current UI baseline to MVP completion
  - clarifies what should be preserved versus redesigned in follow-up UI branches
  - gives future branch specs and plans a stable reference for sequencing and scope control
- The branch may also produce `docs/ko/MASTER-PLAN.md` after the English source is finalized.

## Scope

- In:
  - write the English source document at `docs/MASTER-PLAN.md`
  - document the current implementation baseline and delivery assumptions
  - define the master-plan structure and the information categories it must cover
  - define a branch-by-branch roadmap, execution order, and dependency logic
  - record the fixed brand and design constraints that follow-up UI branches must preserve
  - add Korean translation sync for the master plan after the English source is accepted
  - make small cross-reference adjustments in existing docs only if they are necessary to keep source-of-truth relationships clear
- Out:
  - implementing the UI refresh itself
  - changing landing or dashboard UI code in this branch
  - changing the service name, replacing the current token system, or redefining the visual identity from scratch
  - implementing auth, board editing, dashboard data integration, export, or other product features
  - large rewrites of `PRD`, `SCAFFOLD_STRUCTURE`, or `TECH_REFERENCE` beyond small alignment edits caused directly by the new master plan

## Non-Goals

- Producing feature implementation code
- Finalizing every detailed requirement for every future branch
- Replacing the existing core source-of-truth documents with a single monolithic document
- Using this branch to redesign the product UI directly

## Constraints / Assumptions

- This branch must follow the documented branch cycle: `Spec -> Research -> Planner -> Execution -> Hardening -> Review -> Refactor -> Final Verify`.
- English documents under `docs/*.md` remain the source of truth; Korean sync happens only after the English source is finalized.
- The master plan must preserve the already agreed design identity:
  - service name stays the same
  - current color direction remains the base direction
  - semantic design tokens in `src/app/globals.css` remain the shared styling contract
  - the memo/paper/note-taking concept remains part of the product identity
- The master plan must treat the current repository state as a real baseline, not a greenfield project:
  - project setup exists
  - landing page UI exists
  - dashboard page UI exists
- Each future branch continues to map to one issue and one working thread.
- Existing unrelated worktree changes in `.github/workflows/playwright.yml` and `pnpm-lock.yaml` are not part of this branch unless explicitly requested later.

## Acceptance Criteria

- `docs/MASTER-PLAN.md` is written as a top-level planning document and explicitly positions itself relative to `docs/PRD.md`, `docs/SCAFFOLD_STRUCTURE.md`, `docs/TECH_REFERENCE.md`, and `AGENTS.md`.
- The document records the current implementation baseline, including setup completion and the existing landing/dashboard UI state.
- The document clearly separates:
  - what is fixed and must be preserved
  - what is open for redesign or future implementation
- The document includes a branch roadmap with recommended execution order, branch responsibilities, and dependency logic from the current state toward MVP delivery.
- The roadmap explains where the planned UI refresh fits and why it should occur in that sequence.
- The roadmap is the primary value of the document; non-roadmap sections stay concise and provide only the context needed to interpret and apply the roadmap.
- The document is specific enough that a future issue-driven branch can derive its branch-local `spec.md` and `plan.md` without redefining project-wide fundamentals.
- If Korean translation is included in this branch, `docs/ko/MASTER-PLAN.md` is synchronized with the finalized English source.

## Open Questions

- Should the roadmap stop at MVP delivery or include a short post-MVP branch horizon as context?
- How much detail should each roadmap branch carry inside the master plan before it becomes too close to branch-local planning?
- Should Korean translation land in the same branch after English finalization, or be deferred if the English document still needs iteration?

## Research Decision

- Required: yes
- Why:
  - the branch needs a decision-ready structure for `docs/MASTER-PLAN.md` so it does not duplicate or dilute the existing core documents
  - the roadmap must reflect the actual implementation baseline and branch history, not a generic greenfield sequence
  - the placement and scope of the planned UI refresh need to be justified before planning slices
- If yes, research questions:
  - What current repository baseline and completed branch history must the master plan explicitly anchor on?
  - What document structure best connects `PRD`, `SCAFFOLD_STRUCTURE`, `TECH_REFERENCE`, and branch-cycle artifacts without turning the master plan into a duplicate PRD?
  - How should the branch roadmap sequence documentation, UI refresh, and MVP feature branches so the preserved identity constraints survive the redesign work?
