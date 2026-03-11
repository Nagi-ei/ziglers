# AGENTS.md (for Mandalart Web)

_Last updated: 2026-03-12 (KST)_

---

## 1) Purpose

This document defines the AI-agent operating model for Mandalart Web.
It aligns project documents and implementation workflow with the currently installed skills, especially:

- branch-cycle delivery under `.agent/sessions/...`
- project-specific frontend architecture rules
- current server/client data-access boundaries
- English source docs plus Korean translation sync

`PRD.md`, `SCAFFOLD_STRUCTURE.md`, and `TECH_REFERENCE.md` remain the core project documents.
This file defines how agents are expected to work across them.

---

## 2) Source of Truth

- Product goals and scope: `PRD.md`
- Project scaffold and layer boundaries: `SCAFFOLD_STRUCTURE.md`
- Technical implementation details: `TECH_REFERENCE.md`
- Branch-local execution artifacts:
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/spec.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/research.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/plan.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/plans/*.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/log.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/handoff.md`

English project documents are the source of truth.
Korean documents under `docs/*.ko.md` must be synchronized after the English source changes are finalized.

---

## 3) Agent Hierarchy

| Level       | Name                     | Role                                                                     | Reference Document                |
| ----------- | ------------------------ | ------------------------------------------------------------------------ | --------------------------------- |
| Core Agent  | **Architect**            | Enforces scaffold, layer boundaries, and server/client data-access rules | `SCAFFOLD_STRUCTURE.md`           |
| Logic Agent | **Feature Builder**      | Implements accepted branch specs into server/client application code     | `TECH_REFERENCE.md`               |
| UI Agent    | **Interface Crafter**    | Builds or refines user-facing UI using project UI rules and shadcn/ui    | `PRD.md`, `SCAFFOLD_STRUCTURE.md` |
| QA Agent    | **Validator**            | Runs verification, review, and branch quality gates                      | `TECH_REFERENCE.md`               |
| Ops Agent   | **CI/CD Manager**        | Verifies environment, CI/CD, and deployment assumptions                  | `TECH_REFERENCE.md`               |
| Doc Agent   | **Knowledge Maintainer** | Keeps English and Korean docs synchronized with accepted branch changes  | All documents                     |

---

## 4) Global Coding & Generation Rules

### Component File Rule

- Each React component must live in its own file.
- When a new component is introduced, create a new file immediately.
- Defining multiple app-specific React components in one file is not allowed.

#### Allowed Exceptions

| Exception                           | Example                                                                      | Conditions                                                                                                             |
| ----------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Route-local wrapper**             | `page.tsx` with a private wrapper for Suspense or Error Boundary composition | Must stay local to the route file, must not be exported, and must exist only for a direct page-level boundary          |
| **Installed shadcn primitive file** | installed files such as `Tabs`, `DropdownMenu`, `NavigationMenu`             | The file must belong to the canonical shadcn primitive surface defined by `components.json` and project scaffold rules |

#### Additional Conditions

- Installed shadcn primitive files are treated as vendor-like UI primitives.
- They may be patched for styling, variants, accessibility, typing, or upstream-compatible fixes.
- They must not absorb feature logic, business logic, data fetching, or mutation orchestration.

### Data Access Rule

- All database access is server-side only.
- Prisma is the primary application data-access layer.
- Supabase remains responsible for auth/session, storage, and database-level RLS authorization.
- Client components must never access the database directly.
- Prefer:
  - reads in Server Components or server-only modules
  - writes via Server Actions
  - Route Handlers only for public API, webhook, or external callback boundaries

### Query Key Rule

- Use explicit, stable TanStack Query key factories.
- Prefer hierarchical key factories such as:
  - `all -> list -> listBy -> entity/detail -> subresource`
- Keep key helpers in a domain-owned key module rather than scattering inline query keys across components.

### Abstraction Rule

- Do not create service, repository, or adapter layers by default.
- Introduce a repository/adapter boundary only when its responsibility is independently meaningful and explainable, such as:
  - a stable contract for a real transport or backend swap
  - a multi-source boundary
  - a clear mapping/auth/transaction boundary
- Forwarding-only wrapper layers are considered a smell, not a standard.

---

## 5) Detailed Roles

### 5.1 Architect Agent

- **Goal:** Enforce scaffold and boundary rules.
- **Reference:** `SCAFFOLD_STRUCTURE.md`
- **Main functions:**
  - Detect violations of import direction (`app -> widgets -> features -> entities -> shared`) when those layers exist
  - Detect client-side database access or Prisma usage outside server-only boundaries
  - Detect ad-hoc folders or redundant parallel structures that bypass the scaffold
  - Detect invalid expansion of the shadcn multi-export exception outside the installed primitive surface
- **Trigger:** On architecture changes, scaffold changes, or refactor-heavy branches

### 5.2 Feature Builder Agent

- **Goal:** Implement accepted branch specs into actual code structure.
- **Reference:** `TECH_REFERENCE.md`, `SCAFFOLD_STRUCTURE.md`
- **Main functions:**
  - Translate branch `spec.md` and `plan.md` into implementation slices
  - Prefer Server Component reads, Server Action writes, and feature-local UI mutation hooks
  - Apply TanStack Query key/invalidation rules from the accepted project convention
  - Introduce repository/adapter boundaries only when the plan explicitly justifies their value
- **Output Example:** `feature_task_done.diff`

### 5.3 Interface Crafter Agent

- **Goal:** Maintain consistent and intentional UI implementation quality.
- **Reference:** `PRD.md`, `SCAFFOLD_STRUCTURE.md`
- **Main functions:**
  - Reuse installed shadcn/ui primitives before creating custom UI primitives
  - Keep project-specific UI components outside the installed shadcn primitive surface
  - Apply one-component-per-file discipline except for the accepted exceptions
  - Use the design-oriented skill path when a branch is explicitly creating or redesigning user-facing UI
- **Output Example:** `ui_report.md`

### 5.4 Validator Agent

- **Goal:** Maintain correctness, stability, and review quality.
- **Reference:** `TECH_REFERENCE.md`
- **Main functions:**
  - Run lint, type, test, and other branch-appropriate verification
  - Review changed files against branch acceptance criteria and relevant specialist skills
  - For UI changes, include accessibility and web-interface guideline review when appropriate
  - For document branches, verify cross-document consistency, dead examples, and stale names/paths
- **Output:** `qa_report.md`

### 5.5 CI/CD Manager

- **Goal:** Ensure environment and delivery assumptions stay correct.
- **Reference:** `TECH_REFERENCE.md`
- **Main functions:**
  - Verify GitHub Actions and deployment assumptions against the current repository state
  - Validate environment variable names and server/client exposure boundaries
  - Keep package-manager and runtime assumptions aligned with the actual project configuration
  - Trigger preview/prod deployment workflows when applicable

### 5.6 Knowledge Maintainer

- **Goal:** Keep documentation and branch artifacts synchronized.
- **Reference:** `PRD.md`, `SCAFFOLD_STRUCTURE.md`, `TECH_REFERENCE.md`
- **Main functions:**
  - Ensure cross-document consistency when implementation rules change
  - Keep English source docs and `docs/*.ko.md` aligned
  - Update branch-local `spec.md`, `research.md`, `plan.md`, `log.md`, and `handoff.md` as the cycle progresses
  - Prevent removed or stale patterns from reappearing in translated docs

---

## 6) Collaboration Rules

| Rule                              | Description                                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Single Responsibility**         | Each agent should operate within a clear responsibility boundary.                                          |
| **Structure Changes Need Intent** | Structure-changing edits must be justified in the branch spec/plan rather than introduced casually.        |
| **Automation First**              | Non-trivial branch work follows the branch-cycle workflow by default.                                      |
| **Documentation First**           | When architecture or workflow rules change, update English source docs before syncing Korean translations. |
| **Skill Precedence**              | Project-specific skills take precedence over generic framework or vendor advice when they conflict.        |

---

## 7) Branch Delivery Workflow

Use this workflow for non-trivial branch work:

1. **Spec**
2. **Research** (conditional)
3. **Planner**
4. **Execution**
5. **Hardening**
6. **Review**
7. **Refactor**
8. **Final Verify**

### Session Convention

- Git branch format: `<prefix>/<issue-number>--<slug>`
- Allowed prefixes: `feature`, `ui`, `refactor`, `fix`, `docs`, `chore`
- Session folder format: `[#<issue-number>]<prefix>--<slug>`
- Artifact root: `.agent/sessions/[#<issue-number>]<prefix>--<slug>/`

### Artifact Behavior

- `spec.md` fixes branch intent.
- `research.md` exists only when required.
- `plan.md` is the latest accepted execution plan.
- `plans/*.md` stores plan snapshots.
- `log.md` is append-only execution history.
- `handoff.md` is the rolling latest-state resume document.
- Mid-session compaction rewrites `handoff.md` and appends a compact checkpoint to `log.md`.

### Notes For Document Branches

- Document branches use the same stage order.
- The difference is in verification evidence, not in stage names:
  - hardening focuses on consistency, stale examples, and terminology drift
  - final verification focuses on cross-document alignment and file/path/tooling correctness

---

## 8) Future Expansion

| Item                             | Description                                                                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Transport Boundary for M2**    | If a real Nest API or external transport boundary is introduced, document a justified server-only adapter boundary rather than assuming one by default. |
| **Mobile Integration (RN/Expo)** | Share stable query-key and type conventions where they provide real reuse value.                                                                        |
| **Auto Translation**             | Improve doc synchronization workflows for English/Korean project documents.                                                                             |
| **Test Scenario Generation**     | Generate Playwright E2E scenarios from accepted branch specs or product requirements.                                                                   |

---

## Summary

This file defines how AI agents should operate in Mandalart Web today:

- follow the branch-cycle workflow
- keep docs and translations aligned
- prefer direct, explainable server/client boundaries
- avoid low-value abstraction
- treat installed shadcn primitives and project UI code as distinct surfaces
