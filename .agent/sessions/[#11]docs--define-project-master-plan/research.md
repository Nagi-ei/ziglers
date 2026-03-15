# Research

## Goal

- Reduce planning uncertainty for `docs/MASTER-PLAN.md` by fixing:
  - the current project baseline the document must describe
  - the right structure and role for the master plan
  - the recommended sequence for the follow-up branches

## Research Questions

- What current repository baseline and completed branch history must the master plan explicitly anchor on?
- What structure lets `docs/MASTER-PLAN.md` guide execution without duplicating `docs/PRD.md`, `docs/SCAFFOLD_STRUCTURE.md`, or `docs/TECH_REFERENCE.md`?
- Where should the planned UI refresh sit in the roadmap if service identity, token rules, and the memo/paper concept must be preserved?

## Scope

- In:
  - local evidence from the current docs, UI baseline, token system, and git history
  - structure options for `docs/MASTER-PLAN.md`
  - sequence options for the first set of follow-up branches
- Out:
  - implementing UI changes
  - feature-level technical design deeper than needed for branch ordering
  - rewriting product requirements already owned by `PRD`

## Current Baseline

- Source-of-truth documents are already aligned:
  - `AGENTS.md` defines project-wide rules and branch-cycle expectations
  - `docs/PRD.md` defines product scope and MVP targets
  - `docs/SCAFFOLD_STRUCTURE.md` defines the FSD-lite scaffold and boundary rules
  - `docs/TECH_REFERENCE.md` defines the technical implementation baseline
- Previous branch handoff for [#9] documents that the next work should start a new docs branch for `docs/MASTER-PLAN.md`.
- Git history shows the project is not at a greenfield stage:
  - setup and toolchain foundation already landed
  - theme/color work landed in `feat/1--color`
  - shared shadcn/ui foundation landed in `ui/3--shadcn-components`
  - landing page work landed in `ui/5--landing-page`
  - dashboard page work landed in `ui/7--dashboard-page`
  - docs alignment landed in `docs/9--update-agentic-docs`
- Current UI evidence confirms the identity constraints are concrete, not abstract:
  - `src/app/globals.css` defines the warm paper-like brand palette and semantic tokens
  - landing and dashboard widgets use paper/tape/card treatments and memo-like visual language
  - the service is framed around Mandalart planning, not a generic productivity dashboard

## Constraints

- The master plan must sit above, not replace, the existing source-of-truth documents.
- The branch must preserve the user's fixed identity constraints:
  - same service name
  - same color direction
  - same semantic design-token contract
  - same memo/note-taking concept
- The roadmap must fit the issue-per-branch and thread-per-branch workflow.
- The branch should not assume the current landing and dashboard UI are final, but it must recognize them as the active implementation baseline.

## Options Considered

### Option 1: Product-Roadmap-Only Document

- Focus the master plan mostly on product milestones, MVP scope, and future features.
- Leave architecture and document ownership in the existing docs.

### Option 2: Architecture-Charter Document

- Focus the master plan on technical boundaries, document ownership, and implementation rules.
- Leave branch sequencing and UI refresh strategy mostly implicit.

### Option 3: Hybrid Delivery Master Plan

- Combine:
  - current baseline summary
  - fixed product and design constraints
  - document map and ownership
  - execution principles
  - branch-by-branch roadmap with sequencing and dependency logic
- Keep detailed product requirements, scaffold rules, and technical reference material in the existing source docs.

## Evidence

- `AGENTS.md` explicitly says the core project docs remain the source of truth, and that non-trivial work follows the branch cycle.
- `docs/PRD.md` already defines MVP scope, user flow, dashboard/export goals, and product targets.
- `docs/SCAFFOLD_STRUCTURE.md` already defines layer boundaries, UI surface separation, and data-access rules.
- `docs/TECH_REFERENCE.md` already defines toolchain, schema, RLS, and query-key conventions.
- Previous handoff states that the next branch should write `docs/MASTER-PLAN.md`, use the current docs as required inputs, preserve service name/color/token/memo direction, and treat the UI refresh as a likely follow-up branch.
- Git history shows a logical sequence already exists in practice:
  - setup and theme foundation before shared UI
  - shared UI before landing
  - landing before dashboard
  - docs alignment before writing the master plan
- Current UI components show an established visual language:
  - paper/card surfaces
  - tape decorations
  - warm token-backed palette
  - planning-board and note-like affordances

## Recommendation

- Use **Option 3: Hybrid Delivery Master Plan**.
- Structure `docs/MASTER-PLAN.md` around these top-level sections:
  1. Purpose and relationship to the other source-of-truth docs
  2. Current project baseline
  3. Fixed identity and architecture constraints
  4. Product and UX direction at a planning level
  5. Execution principles for branch-based delivery
  6. Branch roadmap and sequencing
  7. Verification strategy and document-sync rules
  8. Risks, decision checkpoints, and deferred items
- Place the planned UI refresh early in the roadmap, but after the master plan is accepted and before deeper feature implementation expands the visual surface area.
- Treat the UI refresh as a sequence of dedicated UI branches, not as incidental cleanup inside feature branches.

## Tradeoffs

- Option 1 would be shorter, but it would not resolve the real planning gap: how to connect the existing docs to actual branch execution.
- Option 2 would improve architecture clarity, but it would leave the product delivery order and UI refresh timing under-specified.
- Option 3 is larger and needs discipline to avoid duplication, but it best matches the branch goal and current repository maturity.

## Open Questions

- Whether the roadmap should include a short post-MVP horizon or stop strictly at MVP.
- Whether Korean translation should land in the same cycle or after the English source stabilizes through review.

## Planning Impact

- Recommended primary classification: `react-ui`
- Recommended secondary classification: `next-app-router`
- Recommended primary skill lens: `frontend-architecture-rules`
- Recommended secondary skill lens: `frontend-design`
- The plan should preserve these constraints:
  - `docs/MASTER-PLAN.md` must not duplicate detailed source-of-truth content that already belongs in PRD, scaffold, or tech docs
  - the roadmap must be written from the current repository baseline, not from scratch
  - the UI refresh must be documented as a deliberate follow-up branch sequence that preserves existing identity constraints
  - English source writing and Korean sync should be separate slices
