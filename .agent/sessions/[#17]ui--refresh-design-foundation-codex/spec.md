# Spec

## Goal

- Refresh the shared design foundation that the later landing-page and dashboard refresh branches will build on.
- Audit the existing landing/dashboard visual language and define a stronger shared note/paper system without redesigning those pages end-to-end in this branch.

## Problem / Background

- The current UI is not considered a failed baseline; the user sees it as already decent and worth preserving in spirit.
- This branch exists to test how far the newly installed design-oriented skills and workflows can push the product's visual quality while keeping the existing identity intact.
- The current landing and dashboard already express a warm paper-like memo direction through tape accents, paper-like cards, grid patterns, and note-board cues, but much of that language is still embedded in page-local implementations and repeated inline style recipes rather than a clearly defined shared surface system.
- `docs/MASTER-PLAN.md` Phase 2 explicitly requires this branch to:
  - audit the current visual language
  - lock the refreshed note/paper direction
  - implement or refine only the minimum reusable shared surfaces needed before page-level redesign work begins

## Desired Outcome

- The branch leaves behind a clear keep/refine/remove audit of the current landing/dashboard visual language.
- The branch defines and, where appropriate, extracts the minimum reusable note/paper/tape surfaces needed across landing and dashboard into `src/shared/ui/common`.
- The branch clarifies which visual patterns should remain page-local so later redesign branches do not over-extract layout- or story-specific UI.
- The shared design direction is strong enough that the later landing and dashboard refresh branches can execute without redefining the visual foundation from scratch.
- The existing token contract in `src/app/globals.css` remains the shared styling base, with only minimal justified additions if the current token set cannot express a required shared paper/note treatment cleanly.

## Scope

- In:
  - audit the current landing and dashboard visual language against the current codebase baseline
  - classify current patterns as keep, refine, or remove
  - decide which note/paper/tape surfaces belong in `src/shared/ui/common`
  - keep page-local compositions, storytelling, and one-off decorative patterns out of the shared surface layer unless reuse is clearly justified
  - preserve the current semantic token contract in `src/app/globals.css`
  - propose only the minimum new shared tokens that are necessary for the refreshed design foundation
  - establish shared visual rules that are stable enough for the follow-up landing and dashboard refresh branches
  - make the minimum workflow/documentation corrections needed so future design-led UI branches use `frontend-design` and `web-design-guidelines` more explicitly
- Out:
  - end-to-end redesign of the landing page
  - end-to-end redesign of the dashboard page
  - changing the service name or replacing the current product identity
  - discarding the existing warm pastel color direction
  - introducing page-only ad-hoc colors or bypassing semantic tokens with raw Tailwind color decisions
  - implementing unrelated product features such as auth, board flows, or real dashboard data integration
  - broad branch-workflow redesign beyond the specific UI skill-routing gap discovered in this cycle

## Non-Goals

- Producing a full product-wide design system beyond what this branch needs
- Rebuilding every existing landing/dashboard widget in the same branch
- Solving all layout, copy, or information-architecture questions for landing or dashboard
- Repositioning the product away from its current Mandalart and memo/planning identity

## Constraints / Assumptions

- This branch must follow the documented branch cycle and remain a Phase 2 design-foundation branch.
- The branch must stay focused on shared design foundations rather than page rebuilds.
- The current project colors in `src/app/globals.css` must remain the base palette:
  - main and secondary brand colors stay
  - current background-family colors stay
  - additional colors are allowed only when they fit the existing warm, pastel, cozy direction and provide clear shared-system value
- The service name `Zieglers` must be preserved, and the design direction should support the feeling of stacking progress brick by brick rather than shifting toward a generic productivity aesthetic.
- The product should continue to feel like handwritten notes and memo paper placed onto a board, with a diary-decoration sensibility rather than a polished enterprise dashboard look.
- Squared or sharper corner language should remain part of the surface treatment to reinforce the paper/memo direction.
- `src/app/globals.css` remains the source of truth for semantic tokens and theme values.
- Reusable project UI belongs in `src/shared/ui/common`; page-specific composition belongs in the appropriate page or widget layer.
- Existing shared helpers such as `DecoTape` and `GridPatternBackground` are inputs to the audit, not guaranteed final primitives.
- Each new React component introduced by this branch must live in its own file.

## Acceptance Criteria

- The branch produces an explicit audit of the current landing/dashboard visual language with keep/refine/remove decisions.
- The branch defines which note/paper/tape surfaces should move into `src/shared/ui/common` and which should remain page-local.
- The branch preserves the current semantic token contract and introduces only minimal, justified token additions when the existing tokens are insufficient for a shared design need.
- The resulting design foundation clearly reflects the required identity:
  - warm pastel palette
  - `Zieglers` brick-by-brick progress feeling
  - handwritten note and memo-paper character
  - squared paper-like surface styling
- The project workflow guidance is corrected so future design-led UI branches route `frontend-design` more explicitly and include `web-design-guidelines` during review by default.
- The branch remains within Phase 2 scope and does not absorb full landing/dashboard redesign work.
- The resulting foundation is clear enough that the Phase 3 landing and dashboard refresh branches can build on it without reopening the same design-foundation decisions.

## Open Questions

- How literal should the bricklayer / brick-by-brick metaphor become in shared UI surfaces versus staying a subtle compositional cue?
- Which current motifs should survive as shared language after the audit:
  - tape accents
  - grid background
  - highlighted paper labels
  - rotated paper cards
  - handwritten annotation cues
- Does this branch need additional shared typography treatment to express the handwritten/diary feel, or should that stay unchanged until page-level redesign work proves a concrete need?
- Is a shared page-header treatment stable enough to belong in this branch, or should that remain page-local until Phase 3 confirms cross-page reuse?

## Research Decision

- Required: yes
- Why:
  - `docs/MASTER-PLAN.md` explicitly expects a baseline audit before planning implementation for this branch
  - the branch must separate reusable shared surfaces from page-local compositions based on current code and current visual patterns, not assumption
  - token additions should be driven by a real audit of shared design needs rather than speculative styling ideas
- If yes, research questions:
  - Which current landing/dashboard visual elements should be kept, refined, or removed?
  - Which note/paper/tape motifs have enough cross-page reuse value to belong in `src/shared/ui/common`?
  - Which current elements are too page-specific, too ornamental, or too inconsistent to extract into shared foundations?
  - What is the minimum additional token set, if any, that is justified for a shared paper/note design system on top of the existing palette?
