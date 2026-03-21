# Research

## Goal

- Decide how this Phase 2 branch should define a stronger shared design foundation without either fossilizing the current landing/dashboard implementation or drifting into full page redesign work.
- Resolve whether the next landing-page branch should compare multiple visual concepts and what this branch must freeze versus deliberately defer.

## Research Questions

- Which current landing/dashboard visual patterns should be kept, refined, or removed from the shared design language?
- Which existing motifs have enough cross-page reuse value to belong in `src/shared/ui/common`?
- How can this branch preserve room for a later 3-concept landing exploration instead of locking the next branch into the current UI?
- What is the minimum token expansion, if any, that is justified for a reusable paper/note/tape surface system?

## Scope

- In:
  - inspect the current local design baseline in landing, dashboard, not-found, shared common helpers, and `globals.css`
  - compare viable branch strategies for Phase 2
  - recommend a design-foundation boundary that preserves both branch discipline and later creative freedom
  - identify the minimum shared surface set and the minimum token additions worth planning
- Out:
  - selecting the final landing-page redesign concept
  - implementing the full landing or dashboard refresh
  - external trend research or framework/vendor browsing
  - redefining product identity or replacing the established palette

## Current Baseline

- Relevant session artifacts:
  - `spec.md` fixes the branch intent as an audit-first design-foundation branch and explicitly marks research as required.
  - `handoff.md` records the main risk as over-extracting page-local patterns into `src/shared/ui/common`.
- Relevant project documents:
  - `docs/MASTER-PLAN.md` Phase 2 says this branch should audit the current visual language, lock the refreshed note/paper direction, and implement only the minimum reusable shared surfaces needed before page-level redesign.
  - `docs/SCAFFOLD_STRUCTURE.md` requires reusable project UI to live in `src/shared/ui/common` and page/screen compositions to remain in widget or route layers.
  - `docs/PRD.md` confirms landing and dashboard are user-facing MVP surfaces, but does not require their redesign in this branch.
  - `docs/TECH_REFERENCE.md` confirms Tailwind v4, shadcn/ui, and semantic token usage through `src/app/globals.css`.
- Current code baseline:
  - `src/app/globals.css` already defines the warm paper-like palette and semantic color-token contract.
  - `src/shared/ui/common` currently contains only `BackButton`, `DecoTape`, and `GridPatternBackground`.
  - Landing and dashboard both already reuse tape, paper-card, border, shadow, and memo-board cues.
  - `src/app/not-found.tsx` also reuses the same visual language, which confirms some motifs already cross more than one page.
- Pattern reality from the current implementation:
  - good visual language exists, but much of it is embedded as repeated inline class recipes such as `bg-primary/5`, `border-primary/10`, repeated shadow tokens, one-off rotations, and local highlight bars
  - the current common layer captures only the simplest motifs and does not yet define a reusable paper/note surface contract

## Constraints

- Product constraints:
  - preserve the current warm pastel palette and semantic token base from `src/app/globals.css`
  - preserve the `Zieglers` identity and the brick-by-brick progress feeling
  - preserve the handwritten note / memo / diary-decoration tone
  - preserve sharper, more squared paper-like corners
- Technical constraints:
  - keep shared reusable UI in `src/shared/ui/common`
  - do not move page-specific story/layout compositions into the shared layer
  - do not bypass semantic tokens with raw Tailwind color decisions when a shared token can express the need
  - each new React component must live in its own file
- Workflow constraints:
  - this branch is Phase 2 design foundation, not Phase 3 page redesign
  - the branch should reduce ambiguity for the later landing/dashboard refresh branches, not consume their work

## Options Considered

### Option A

- Description:
  - Extract shared components directly from the current landing/dashboard implementation and standardize around the existing visual recipes with minimal reinterpretation.
- Pros:
  - lowest short-term implementation risk
  - fastest way to reduce repeated inline classes
  - keeps close continuity with the current baseline
- Cons:
  - strongly couples the shared layer to today's page designs
  - makes the next landing refresh feel like a cleanup pass instead of a real concept exploration
  - risks canonizing current page-specific decisions such as section-title treatments, hover rotations, and decorative accents

### Option B

- Description:
  - Skip most foundation work and use this branch to pursue page-level concept exploration immediately, effectively folding landing redesign decisions into Phase 2.
- Pros:
  - maximum design freedom right away
  - easier to judge bold concepts in a full-page context
- Cons:
  - violates the intended Phase 2 scope from `docs/MASTER-PLAN.md`
  - leaves dashboard without a stable shared foundation
  - makes reusable/common extraction reactive to one chosen page concept rather than deliberate
  - increases rework risk if the first concept does not generalize to the authenticated app surface

### Option C

- Description:
  - Build a flexible, low-regret foundation now: refine tokens and low-level accents, introduce one shared note/paper surface, and validate it on a few representative sections while explicitly deferring higher-variance page-concept choices to the next landing branch.
- Pros:
  - preserves branch discipline and Phase 2 intent
  - reduces repeated style recipes without freezing the full current layout language
  - keeps the next landing branch free to compare three concepts
  - gives the later dashboard refresh a shared visual base that is not tied to one landing composition
- Cons:
  - some later tuning is still likely once a specific landing concept is chosen
  - requires restraint to avoid turning “foundation” into an underspecified non-change
  - may leave some currently repeated patterns intentionally unabstracted until Phase 3

## Evidence

- Local findings:
  - Cross-page motifs already worth preserving:
    - warm paper/background palette anchored in `globals.css`
    - squared cards with tactile borders and offset shadows
    - tape as an identity cue
    - paper-board atmosphere through optional grid/pattern backdrops
  - Current motifs that are strong candidates to refine into reusable shared surfaces:
    - `DecoTape` should become a configurable accent rather than a fixed rectangle recipe
    - `GridPatternBackground` should remain opt-in and quieter, not a default page blanket
    - repeated paper-card wrappers suggest a missing shared surface primitive such as a low-level `NoteSurface`
  - Current motifs that should stay local or be deferred from shared extraction:
    - the landing hero Mandalart-grid composition
    - handwritten arrows and annotation doodles
    - template thumbtack details
    - dashboard summary/chart/board layouts
    - shared page-header patterns, which are still too concept-sensitive
    - aggressive hover rotations on every card, which currently read more ornamental than structural
  - The current code already proves the risk of overfitting:
    - section title underline treatments appear in multiple places, but their spacing, weight, and role are inconsistent enough that making a shared section-header component now would likely freeze a still-unstable choice
    - much of the current “paper” look is expressed through repeated opacity values and custom shadows rather than semantic surface rules
  - The current code also proves a low-regret foundation is possible:
    - tape and pattern background are reused in landing, dashboard, and not-found
    - paper-card treatments recur across landing and dashboard, even though the page compositions differ
- Keep / Refine / Remove summary:
  - Keep:
    - warm pastel token palette
    - memo/paper identity
    - squared-corner paper silhouettes
    - tactile border + shadow depth
    - tape as a recurring but restrained cue
  - Refine:
    - paper-surface contract
    - tape variants and placement rules
    - background pattern intensity and usage rules
    - shadow and border recipes via semantic theme values
    - brick-by-brick metaphor through rhythm and layering rather than literal bricks
  - Remove from shared foundation or defer:
    - one-off hover gimmicks
    - hero-specific visuals
    - page-level storytelling composition
    - current section-title implementation details
    - handwritten annotations as default shared primitives
- External findings:
  - none needed; local project evidence is sufficient for this branch decision
- Version-sensitive notes:
  - none; this research is based on stable local project state rather than unstable vendor behavior

## Recommendation

- Recommended option:
  - `Option C` — build a flexible, low-regret foundation now and defer concept selection to the next landing branch
- Why this option is preferred:
  - It matches the Phase 2 role defined in `docs/MASTER-PLAN.md` while addressing the user's valid concern about getting trapped by the current implementation.
  - It preserves the right things at the right level:
    - identity and palette are fixed
    - low-level paper/tape/background rules become shared
    - page-level composition remains open for exploration
  - It creates the best setup for the next landing branch to compare three concepts without wasting this branch:
    - one concept can stay close to the current direction
    - two concepts can stay identity- and color-consistent while being more creative
    - all three can build on the same low-regret paper/tape/token foundation
- Recommended Phase 2 execution boundary:
  - add only the minimum token/theme roles needed for paper/tape/line/shadow consistency
  - refine `DecoTape` and `GridPatternBackground`
  - add one shared low-level paper/note container in `src/shared/ui/common`
  - prove the foundation on a small number of representative landing/dashboard sections
  - explicitly defer section-header systems, typography overhauls, and page concept decisions to Phase 3
- Recommended input for the next landing branch:
  - begin with a lightweight concept-study pass before committing to the full page implementation
  - select one concept direction from that study
  - after the concept is selected, compare three landing variants within the chosen direction before committing to the final page build
  - suggested concept-study mix:
    - `Concept 1`: preserve-and-polish current memo-board direction
    - `Concept 2`: scrapbook/editorial diary direction using the same palette and identity
    - `Concept 3`: workshop/atelier direction that hints at brick-by-brick construction through stacked modules and structured rhythm

## Tradeoffs

- Cost:
  - this branch will not resolve every visual decision; some shared primitives may be tuned after the landing concept is chosen
- Risk:
  - if the implementation drifts into section-level or page-level abstraction, the shared layer will become too rigid too early
  - if the implementation stays too timid, the branch may not meaningfully improve the design foundation
- Follow-up burden:
  - the next landing branch must still compare and choose a concept
  - the next dashboard branch must translate the chosen direction to the app surface, which may reveal minor foundation adjustments

## Open Questions

- How visible should the brick-by-brick metaphor be in shared surfaces:
  - subtle stacked rhythm and structure
  - or more explicit material cues
- Should typography changes remain entirely deferred to the landing concept branch, or is one low-risk shared display/body pairing justified sooner?
- After the concept comparison, will a shared page-header or section-heading treatment emerge as truly cross-page, or should those remain page-local permanently?

## Planning Impact

- Recommended primary skill lens:
  - `frontend-design`
- Recommended secondary skill lens:
  - `frontend-architecture-rules`
- Mandatory review lens for this branch:
  - `web-design-guidelines`
- Architectural implications:
  - treat `frontend-design` as the branch's primary creative and visual decision lens
  - use `frontend-architecture-rules` as the binding boundary and file-placement guardrail so shared/common extraction does not drift into page composition
  - keep `src/shared/ui/common` limited to low-level, reusable design primitives
  - do not create shared page shells, hero frames, or section-level storytelling components in this branch
  - use representative adoption on a few existing sections to validate the foundation without broad page rewrites
  - preserve space for the next landing branch to start with a concept-study pass and then a 3-variant comparison inside the selected concept
- Constraints the next step must preserve:
  - no full landing/dashboard redesign in this branch
  - no extraction of unstable page-level patterns such as section-header systems or story layouts
  - no raw color drift away from the current token contract
  - token additions must be minimal and justified by shared surface needs
  - any visible landing changes in this branch should stay conservative enough that the next 3-concept exploration is still meaningful
- Conditions that would force a replan:
  - a planned shared primitive turns out to encode page-specific structure or copy semantics
  - the token additions expand beyond a minimal paper/tape/line/shadow foundation
  - a representative adoption requires layout or typography decisions that belong to the later concept branch
