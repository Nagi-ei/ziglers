# Branch Plan

- Primary classification: `react-ui`
- Secondary classification: `next-app-router`
- Primary skill lens: `frontend-architecture-rules`
- Secondary skill lens: `frontend-design`

## Scope

- In:
  - implement the low-regret shared design foundation recommended by `research.md`
  - preserve the existing semantic token palette while adding only minimal note/paper/tape support values if necessary
  - refine the existing shared accent helpers in `src/shared/ui/common`
  - add one reusable low-level note/paper surface component in `src/shared/ui/common`
  - validate the foundation on a small number of representative landing and dashboard sections without redesigning those pages end-to-end
  - keep the branch compatible with a later 3-concept landing exploration
- Out:
  - full landing-page redesign
  - full dashboard redesign
  - final concept selection among the future landing-page directions
  - shared page-header systems, hero shells, or section-storytelling components
  - broad typography overhauls unless a low-risk shared requirement appears during execution and is explicitly replanned

## Interface / Type Changes

- No API, data, or route contract changes are planned.
- Planned shared UI additions/refinements:
  - refine `src/shared/ui/common/DecoTape.tsx`
  - refine `src/shared/ui/common/GridPatternBackground.tsx`
  - add `src/shared/ui/common/NoteSurface.tsx`
- Planned global theme changes:
  - minimal additions in `src/app/globals.css` only if needed for shared paper/tape/line/shadow roles
- Explicit non-additions for this branch:
  - no shared section-header component
  - no shared landing hero composition component
  - no shared dashboard page-shell component

## Slice 1

- Goal:
  - Formalize the low-level note foundation in theme values and shared accent helpers without widening into page structure.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - `src/app/globals.css` keeps the current palette intact and adds only the minimum theme values needed for reusable paper/tape/line/shadow behavior
  - `DecoTape` and `GridPatternBackground` become configurable, restrained shared accents rather than fixed one-off recipes
  - no page-specific layout or story semantics are introduced into the common layer
- Out of scope:
  - adding the main paper container primitive
  - updating landing/dashboard widgets
- Planned files:
  - `src/app/globals.css`
  - `src/shared/ui/common/DecoTape.tsx`
  - `src/shared/ui/common/GridPatternBackground.tsx`
- User checkpoint: `not required`
- Task checklist:
  1. Map the repeated inline surface values from the audit to the smallest justified set of shared theme roles.
  2. Update `globals.css` with only those minimal roles.
  3. Refine `DecoTape` props and classes to support restrained shared usage.
  4. Refine `GridPatternBackground` so it remains an atmospheric opt-in layer rather than a hard-coded page blanket.
- RED:
  - Compare the current repeated paper/tape style recipes against the research recommendation and fail on the lack of reusable low-level theme roles and helper flexibility.
- GREEN:
  - Add the minimal theme values and helper refinements needed for a stable low-level foundation.
- REFACTOR:
  - Trim any speculative tokens, normalize helper prop names, and remove any common-layer logic that implies page-specific composition.
- Verify:
  - `pnpm exec biome check src/app/globals.css src/shared/ui/common/DecoTape.tsx src/shared/ui/common/GridPatternBackground.tsx`
  - `pnpm exec eslint src/shared/ui/common/DecoTape.tsx src/shared/ui/common/GridPatternBackground.tsx`
  - `git diff --check -- src/app/globals.css src/shared/ui/common/DecoTape.tsx src/shared/ui/common/GridPatternBackground.tsx`
- Failure recovery:
  - If the token set starts growing beyond low-level paper/tape/line/shadow roles, collapse it back to the smallest shared-system set and defer concept-specific values to Phase 3.
- Commit:
  - `:art: style: refine note foundation tokens and accents`

## Slice 2

- Goal:
  - Introduce one reusable square-corner note/paper surface primitive that captures the shared paper contract without freezing page-level composition.
- Binding skill lens:
  - `frontend-architecture-rules`
- Done criteria:
  - the new shared component provides a composable note/paper wrapper with the agreed visual foundation
  - the component API stays low-level and does not encode page or feature semantics
  - the component is expressive enough to replace repeated paper-surface class recipes in later slices
- Out of scope:
  - shared section headers
  - hero/dashboard-specific compound components
- Planned files:
  - `src/shared/ui/common/NoteSurface.tsx`
- User checkpoint: `not required`
- Task checklist:
  1. Define the smallest viable prop surface for the shared note container.
  2. Implement the paper/tape-friendly wrapper using the Slice 1 theme values.
  3. Keep the component composable for different child content without page assumptions.
  4. Recheck the API against the research warning about over-extraction.
- RED:
  - Fail on the current inability to reuse a consistent note/paper container without copying local border, shadow, background, and corner recipes.
- GREEN:
  - Add the shared note-surface primitive.
- REFACTOR:
  - Simplify variant names, keep props explicit and minimal, and remove any styling affordance that is too concept-specific for Phase 2.
- Verify:
  - `pnpm exec biome check src/shared/ui/common/NoteSurface.tsx`
  - `pnpm exec eslint src/shared/ui/common/NoteSurface.tsx`
  - `git diff --check -- src/shared/ui/common/NoteSurface.tsx`
- Failure recovery:
  - If the component starts needing page-role props such as `hero`, `dashboard`, or `cta`, reduce it back to a lower-level surface primitive and leave those concerns local.
- Commit:
  - `:sparkles: feat: add shared note surface primitive`

## Slice 3

- Goal:
  - Validate the new foundation on a small public-facing landing sample without turning this branch into the landing redesign branch.
- Binding skill lens:
  - `frontend-design`
- Done criteria:
  - the selected landing sections adopt the new foundation and read more intentional and consistent than the current inline recipes
  - the changes stay conservative enough that the next landing branch can still compare multiple concepts meaningfully
  - no hero-level or page-structure redesign slips into this slice
- Out of scope:
  - reworking the landing hero
  - changing page information architecture
  - locking in a final landing section-title system
- Planned files:
  - `src/widgets/landing/MethodSection.tsx`
  - `src/widgets/landing/CtaSection.tsx`
- User checkpoint: `required`
- Task checklist:
  1. Replace repeated paper/tape recipes in the selected landing sections with the new shared foundation.
  2. Keep current content structure intact while improving the note/paper treatment.
  3. Remove ornamental styling that the research marked as unstable or too page-specific.
  4. Recheck that the result still leaves room for the later 3-concept landing exploration.
- RED:
  - Fail on the selected landing sections still depending on ad-hoc local paper/tape styling that cannot prove the foundation works.
- GREEN:
  - Apply the shared foundation to the representative landing sections.
- REFACTOR:
  - Strip out any style move that starts acting like a concept decision instead of a reusable foundation validation.
- Verify:
  - `pnpm exec biome check src/widgets/landing/MethodSection.tsx src/widgets/landing/CtaSection.tsx`
  - `pnpm exec eslint src/widgets/landing/MethodSection.tsx src/widgets/landing/CtaSection.tsx`
  - `git diff --check -- src/widgets/landing/MethodSection.tsx src/widgets/landing/CtaSection.tsx`
- Failure recovery:
  - If a section only looks correct after introducing new layout or typography decisions, back that part out and keep only the low-regret foundation adoption.
- Commit:
  - `:lipstick: style: apply note foundation to landing sections`

## Slice 4

- Goal:
  - Validate the same foundation on representative dashboard surfaces so the shared language already works on the authenticated app side.
- Binding skill lens:
  - `frontend-design`
- Done criteria:
  - selected dashboard sections adopt the shared note foundation without changing data behavior or dashboard structure
  - the dashboard usage feels like the same system as landing, but not a forced copy of landing composition
  - chart- or data-specific concerns remain local to the widgets
- Out of scope:
  - full dashboard page refresh
  - changing dashboard data or chart logic
  - converting every dashboard widget in this branch
- Planned files:
  - `src/widgets/dashboard-summary/DashboardSummary.tsx`
  - `src/widgets/dashboard-charts/DashboardCharts.tsx`
- User checkpoint: `not required`
- Task checklist:
  1. Replace repeated outer paper/tape styling in the selected dashboard widgets with the new shared foundation.
  2. Keep chart internals and data semantics local while unifying the surrounding surface language.
  3. Confirm the app-surface translation still feels restrained and not overly decorative.
  4. Recheck that no landing-specific assumptions leaked into dashboard usage.
- RED:
  - Fail on the selected dashboard widgets still relying on duplicated local paper-card styling and not yet proving the shared foundation on the app surface.
- GREEN:
  - Apply the shared foundation to the representative dashboard widgets.
- REFACTOR:
  - Remove any landing-specific styling assumptions and keep the app-side usage tight and reusable.
- Verify:
  - `pnpm exec biome check src/widgets/dashboard-summary/DashboardSummary.tsx src/widgets/dashboard-charts/DashboardCharts.tsx`
  - `pnpm exec eslint src/widgets/dashboard-summary/DashboardSummary.tsx src/widgets/dashboard-charts/DashboardCharts.tsx`
  - `git diff --check -- src/widgets/dashboard-summary/DashboardSummary.tsx src/widgets/dashboard-charts/DashboardCharts.tsx`
- Failure recovery:
  - If chart wrappers need special treatment, keep the chart-specific behavior local and limit shared extraction to the outer note surface and accent usage.
- Commit:
  - `:lipstick: style: apply note foundation to dashboard surfaces`

## Final Stages

- Hardening:
  - audit touched files for remaining ad-hoc opacity/shadow recipes that should have moved to the shared foundation
  - verify that no page-local composition leaked into `src/shared/ui/common`
  - confirm token additions stayed minimal and identity-consistent
- Review:
  - run a UI-focused review for over-extraction, weak shared/local boundaries, inconsistent paper/tape usage, and any drift away from the preserved palette and memo identity
  - include a design review check that the branch still leaves room for the later 3-concept landing exploration
- Refactor:
  - apply only fixes justified by hardening/review findings
  - collapse redundant variants or props if the shared surface API is broader than the research recommendation
- Final Verify:
  - `pnpm exec biome check src/app/globals.css src/shared/ui/common/DecoTape.tsx src/shared/ui/common/GridPatternBackground.tsx src/shared/ui/common/NoteSurface.tsx src/widgets/landing/MethodSection.tsx src/widgets/landing/CtaSection.tsx src/widgets/dashboard-summary/DashboardSummary.tsx src/widgets/dashboard-charts/DashboardCharts.tsx`
  - `pnpm exec eslint src/shared/ui/common/DecoTape.tsx src/shared/ui/common/GridPatternBackground.tsx src/shared/ui/common/NoteSurface.tsx src/widgets/landing/MethodSection.tsx src/widgets/landing/CtaSection.tsx src/widgets/dashboard-summary/DashboardSummary.tsx src/widgets/dashboard-charts/DashboardCharts.tsx`
  - `git diff --check -- src/app/globals.css src/shared/ui/common/DecoTape.tsx src/shared/ui/common/GridPatternBackground.tsx src/shared/ui/common/NoteSurface.tsx src/widgets/landing/MethodSection.tsx src/widgets/landing/CtaSection.tsx src/widgets/dashboard-summary/DashboardSummary.tsx src/widgets/dashboard-charts/DashboardCharts.tsx '.agent/sessions/[#17]ui--refresh-design-foundation-codex'`
  - manual responsive and visual review on landing and dashboard surfaces
  - E2E expectation at closeout: `recommended`
