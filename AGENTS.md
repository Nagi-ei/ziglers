# AGENTS.md (for Mandalart Web)

_Last updated: 2026-03-19 (KST)_

---

## 1) Purpose

This document defines the project-wide AI working rules for Mandalart Web.
It aligns project documents and implementation workflow with the currently installed skills, especially:

- branch-cycle delivery under `.agent/sessions/...`
- project-specific frontend architecture rules
- current server/client data-access boundaries
- English source docs plus Korean translation sync

`docs/PRD.md`, `docs/SCAFFOLD_STRUCTURE.md`, and `docs/TECH_REFERENCE.md` remain the core project documents.
This file defines the project-wide instructions that apply across them.

---

## 2) Source of Truth

- Product goals and scope: `docs/PRD.md`
- Project scaffold and layer boundaries: `docs/SCAFFOLD_STRUCTURE.md`
- Technical implementation details: `docs/TECH_REFERENCE.md`
- Branch-local execution artifacts:
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/spec.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/research.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/plan.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/plans/*.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/log.md`
  - `.agent/sessions/[#<issue-number>]<prefix>--<slug>/handoff.md`

English project documents under `docs/*.md` are the source of truth.
Korean documents under `docs/ko/*.md` must be synchronized after the English source changes are finalized.

---

## 3) Global Coding & Generation Rules

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

### UI Reuse Rule

- Reuse installed `shadcn/ui` primitives before creating new UI primitives.
- Before creating new project UI, check existing reusable components such as `src/shared/ui/common` and other established shared surfaces first.
- Only create a new project-specific UI primitive when installed primitives and existing shared components are both clearly insufficient.

### Design Token Rule

- Use only semantic color tokens and CSS variables defined through `src/app/globals.css` for app UI colors and theme values.
- Prefer semantic utilities such as `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-primary`, and related token-backed classes.
- Do not introduce raw Tailwind color utilities or ad-hoc color values in component code when an approved token already exists.
- If a new color/token is truly required, add it to the shared theme token system in `src/app/globals.css` rather than defining a one-off local workaround.
- When the existing brand palette is directionally correct but insufficient for UI material roles, prefer adding a small number of semantic support roles for reusable surfaces such as paper, tape, line, or shadow behavior instead of inventing new brand hues casually.

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

## 4) Collaboration Rules

| Rule                              | Description                                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Single Responsibility**         | Each change should stay within a clear, explainable responsibility boundary.                               |
| **Structure Changes Need Intent** | Structure-changing edits must be justified in the branch spec/plan rather than introduced casually.        |
| **Automation First**              | Non-trivial branch work follows the branch-cycle workflow by default.                                      |
| **Documentation First**           | When architecture or workflow rules change, update English source docs before syncing Korean translations. |
| **Skill Precedence**              | Project-specific skills take precedence over generic framework or vendor advice when they conflict.        |

---

## 5) Branch Delivery Workflow

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

### Notes For UI Branches

- Branches that explicitly create or redesign user-facing UI should use the design-oriented path during Execution and include UI-guideline review during Review.
- For design-led UI branches such as visual-system work, design-foundation work, landing/dashboard refreshes, or other user-facing art-direction changes:
  - prefer `frontend-design` as the primary branch lens
  - keep `frontend-architecture-rules` as a mandatory structural guardrail for shared/local boundaries, file placement, and token discipline
  - treat `web-design-guidelines` as a required Review-stage lens, not an optional add-on
  - if `frontend-design` is not the primary lens for a clearly design-led UI branch, record the reason in branch-local `research.md` or `plan.md`

### E2E Closeout Communication

- At branch closeout, explicitly classify the E2E expectation as one of:
  - `required`
  - `recommended`
  - `not needed`
- Prefer `required` when the branch changes real user flows, auth, routing, forms, create/edit/delete flows, or other critical UI behavior.
- Prefer `recommended` for lower-risk UI or test-surface changes where additional browser validation is useful but not strictly blocking.
- Prefer `not needed` for docs-only branches and non-executable maintenance work such as isolated lint/format cleanup.
- If E2E is `required` or `recommended` and it was not completed in the current thread, explicitly tell the user to run `pnpm run test:e2e` from a normal local terminal.

---

## 6) Future Expansion

| Item                             | Description                                                                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Transport Boundary for M2**    | If a real Nest API or external transport boundary is introduced, document a justified server-only adapter boundary rather than assuming one by default. |
| **Mobile Integration (RN/Expo)** | Share stable query-key and type conventions where they provide real reuse value.                                                                        |
| **Auto Translation**             | Improve doc synchronization workflows for English/Korean project documents.                                                                             |
| **Test Scenario Generation**     | Generate Playwright E2E scenarios from accepted branch specs or product requirements.                                                                   |

---

## Summary

This file defines the project-wide guidance that should stay true for any AI work in Mandalart Web:

- follow the branch-cycle workflow
- keep docs and translations aligned
- prefer direct, explainable server/client boundaries
- avoid low-value abstraction
- treat installed shadcn primitives and project UI code as distinct surfaces
