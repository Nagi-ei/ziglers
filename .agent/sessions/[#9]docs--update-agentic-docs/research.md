# Research

## Goal

Define how this project should document and gate pre-implementation research for agentic development, and decide how `Research`, `Spec`, and `Plan` should relate inside the branch cycle.

## Research Questions

- How is research commonly documented in agentic/spec-driven development workflows?
- Should `Research` be a mandatory stage in the orchestrator or a conditional gate?
- Should `Spec` come before `Research`, or can `Research` precede `Spec`?
- What output should a local research stage produce so that `Spec` and `Planner` can consume it deterministically?

## Scope

- In:
  - branch workflow documentation for research/spec/plan
  - skill and artifact expectations for a research stage
  - stage ordering and decision rules
- Out:
  - implementation of the new research skill
  - implementation of the new spec stage
  - updates to `docs/PRD.md`, `docs/TECH_REFERENCE.md`, and `AGENTS.md`

## Current Baseline

- The current branch-cycle stack is `Planner -> Execution -> Hardening -> Review -> Refactor -> Final Verify`.
- Session artifacts now resolve to `<project-root>/.agent/sessions/[#<issue-number>]<prefix>--<slug>/`.
- `frontend-architecture-rules` is a binding project lens for frontend work.
- There is no dedicated `research` skill yet.
- There is no branch-local `spec.md` artifact yet.

## External Patterns Reviewed

### 1. Spec Kit

- Pattern observed: spec-driven workflow with distinct artifacts such as `spec.md`, `plan.md`, `tasks.md`, and implementation-detail artifacts including `research.md`.
- Relevant takeaway: research is documented as a discrete artifact and should narrow technical uncertainty instead of becoming an unbounded note dump.
- Source:
  - [GitHub Spec Kit](https://github.com/github/spec-kit)

### 2. Shotgun

- Pattern observed: explicit phase chain `Research -> Specify -> Plan -> Tasks -> Export`.
- Relevant takeaway: a discovery-first flow is reasonable when the problem shape is not yet stable enough to write a good spec.
- Source:
  - [Shotgun](https://github.com/shotgun-sh/shotgun)

### 3. Claude Code Plan Mode

- Pattern observed: read-only exploration and analysis before making changes.
- Relevant takeaway: pre-implementation investigation is a valid and encouraged phase even before planning or editing.
- Source:
  - [Claude Code Tutorials / Plan Mode](https://code.claude.com/docs/en/tutorials)

### 4. ADR / MADR decision format

- Pattern observed: decisions are made legible through context, options, outcome, and consequences.
- Relevant takeaway: research output should include options, recommendation, and consequences rather than raw findings only.
- Source:
  - [MADR Template](https://adr.github.io/madr/decisions/adr-template.html)

## Findings

1. There is no single universal standard for agentic-development research documentation.
2. The common pattern is artifact-based staging, not hidden reasoning:
   - discovery/research artifact
   - scope/spec artifact
   - execution plan artifact
3. Two valid operating models exist:
   - discovery-first: `Research -> Spec -> Plan`
   - intent-first: `Spec -> Research? -> Plan`
4. Discovery-first is better when the branch is defining a new process, architecture rule, or workflow contract.
5. Intent-first is better when the user already knows what should be built and only technical uncertainty remains.
6. For this branch, discovery-first is the better fit because the branch is designing the workflow itself.

## Recommendation

### For this branch

Use:

`Research -> Spec -> Plan -> Execution -> Hardening -> Review -> Refactor -> Final Verify`

Reason:

- This branch is still defining the workflow contract.
- The spec should be written after the research conclusions are accepted.
- The next `spec.md` should translate this research into explicit branch-process requirements.

### For the orchestrator design going forward

Use a hybrid model:

1. `Spec` becomes a formal stage for non-trivial branches.
2. `Research` becomes a conditional pre-planning gate.
3. `Research` runs when:
   - the user explicitly asks for it
   - the orchestrator detects unresolved high-impact uncertainty
4. `Planner` must read `research.md` if it exists.
5. `Planner` must hard-stop if high-impact decisions remain unresolved and no accepted research conclusion exists.

Recommended steady-state branch flow:

`Spec -> Research Decision -> Research? -> Planner -> Execution -> Hardening -> Review -> Refactor -> Final Verify`

## Research Trigger Criteria

Research should run before planning when any of the following is true:

- unfamiliar framework, library, API, or platform behavior
- multiple viable implementation options with meaningful tradeoffs
- architecture, migration, RLS, security, or performance decisions must be made first
- existing project patterns do not clearly answer the implementation approach
- handoff or prior logs explicitly say "investigate first"
- the user asks to research before planning

Research can be skipped when:

- the task is a small extension of an established local pattern
- the primary skill lens and implementation shape are already clear
- the branch scope is narrow and low-risk

## Recommended Research Artifact Contract

Research output should be written to:

- `<session-root>/research.md`

Recommended sections:

```md
# Research

## Goal

## Research Questions

## Scope

## Current Baseline

## Constraints

## Options Considered

## Evidence

## Recommendation

## Tradeoffs

## Open Questions

## Planning Impact
```

`Planning Impact` should always include:

- recommended primary skill lens
- architectural implications
- constraints the spec must preserve
- issues that must be resolved before planning

## Implications For The Upcoming Spec

The next `spec.md` for this branch should define:

- whether `Spec` is mandatory for all non-trivial branches
- whether `Research` is optional, conditional, or mandatory in certain classes of work
- where `research.md` sits in the session artifact root
- the exact handoff between `Research`, `Spec`, and `Planner`
- hard-stop conditions when research is required but missing
- whether an optional future `prototype` or `feasibility` artifact should exist

## Open Questions

- Should the future `Spec` stage allow a micro-spec format for very small branches?
- Should research be archived only as `research.md`, or also support a `research/` subfolder for sub-notes?
- Should the orchestrator distinguish between `discovery-first` branches and normal implementation branches explicitly?

## Conclusion

For this branch, proceed with `research.md` first and write `spec.md` after the research is accepted.

For the long-term orchestrator, prefer:

- mandatory `Spec` for non-trivial branches
- conditional `Research` before `Planner`
- `research.md` as the canonical branch-local research artifact
