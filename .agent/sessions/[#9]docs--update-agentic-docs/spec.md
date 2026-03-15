# Spec

## Goal

- Align the project documents with the currently installed skills and accepted branch workflow without changing the product goals defined for Mandalart Web.

## Problem / Background

- `AGENTS.md`, `docs/SCAFFOLD_STRUCTURE.md`, `docs/PRD.md`, and `docs/TECH_REFERENCE.md` were written before several skill updates landed.
- The current skills now define:
  - `.agent/sessions/[#<n>]<prefix>--<slug>/` as the branch artifact root
  - `Spec -> Research? -> Planner -> Execution -> Hardening -> Review -> Refactor -> Final Verify` as the non-trivial branch workflow
  - stricter frontend architecture rules for component boundaries, Server Component reads, Server Action writes, query key discipline, and low-value abstraction avoidance
- Some project documents still describe older patterns such as:
  - `supabase.adapter.ts` and client-side query hook generation as the default data access pattern
  - an execution pipeline that does not reflect the current branch-cycle skills
  - outdated environment/tooling details and stale or overly prescriptive example code
- Korean document copies under `docs/ko/*.md` must be updated after the English source documents are finalized.

## Desired Outcome

- The English project documents describe one consistent implementation and workflow model.
- The documents no longer contradict the current skills on:
  - branch-cycle artifacts and stage order
  - frontend/component structure rules
  - server/client data access boundaries
  - query key conventions
  - toolchain and environment details where those details are meant to be normative
- `docs/PRD.md` continues to express the same product goals and scope, but any stale implementation wording is corrected.
- `docs/ko/AGENTS.md`, `docs/ko/SCAFFOLD_STRUCTURE.md`, `docs/ko/PRD.md`, and `docs/ko/TECH_REFERENCE.md` are synchronized to the final English documents.

## Scope

- In:
  - update `AGENTS.md`
  - update `docs/SCAFFOLD_STRUCTURE.md`
  - update `docs/PRD.md`
  - update `docs/TECH_REFERENCE.md`
  - update Korean translations in `docs/ko/`
  - remove or rewrite stale examples where they conflict with the accepted skill direction
- Out:
  - application code changes
  - database/schema implementation changes
  - new feature development
  - additional skill creation beyond the already accepted skill updates
  - creation of `docs/MASTER-PLAN.md`

## Non-Goals

- Re-scoping product requirements for Mandalart Web
- Changing the MVP or post-MVP feature set
- Rewriting every example purely for style if it is still accurate and useful
- Reorganizing the actual repository code to match the docs in this branch

## Constraints / Assumptions

- Use the currently installed skills as the implementation lens when documents conflict with older guidance.
- Preserve product intent in `docs/PRD.md`; only update implementation-adjacent wording where it is stale or contradictory.
- Treat the branch-cycle workflow as applicable to document branches as well; document-specific verification evidence may differ from code-feature branches.
- Respect the actual repository state when documenting toolchain details, package manager, and `components.json`-driven shadcn output conventions.
- Keep the English documents as the source of truth and update Korean translations after the English texts are finalized.

## Acceptance Criteria

- `AGENTS.md` no longer conflicts with the current branch workflow, handoff/compact artifact model, or frontend architecture rules.
- `docs/SCAFFOLD_STRUCTURE.md` no longer prescribes client-side Supabase adapter/query-hook patterns that conflict with the current skill direction, and any retained examples are clearly consistent with the accepted architecture.
- `docs/PRD.md` and `docs/TECH_REFERENCE.md` are corrected wherever stale technical wording, toolchain details, or boundary definitions conflict with the current skills, without changing product goals.
- The docs consistently describe the current query key convention and shadcn exception rule where relevant.
- Korean documents in `docs/ko/` are updated to match the final English documents with technical identifiers preserved accurately.

## Open Questions

- None blocking planning. Keep example-code retention decisions inside the accepted branch scope and resolve them during execution based on consistency with the current skills.

## Research Decision

- Required: no
- Why:
  - the key architectural and workflow decisions for this branch have already been clarified in the accepted `research.md`
  - the remaining work is document alignment and translation, not unresolved technical discovery
- If yes, research questions:
  - n/a
