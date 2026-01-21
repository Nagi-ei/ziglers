# 🧩 AGENTS.md (for Mandalart Web)

_Last updated: 2025-12-18 (KST)_

---

## 1) Purpose

This document defines the **AI agent configuration and roles** for the Mandalart Web project.  
All agents collaborate across code creation, validation, refactoring, testing, and deployment automation,  
based on `PRD.md`, `SCAFFOLD_STRUCTURE.md`, and `TECH_REFERENCE.md`.

---

## 2) Agent Hierarchy

| Level          | Name                     | Role                                                                    | Reference Document                |
| -------------- | ------------------------ | ----------------------------------------------------------------------- | --------------------------------- |
| 🧠 Core Agent  | **Architect**            | Enforces structure and dependency rules (`FSD`, boundaries)             | `SCAFFOLD_STRUCTURE.md`           |
| 🧩 Logic Agent | **Feature Builder**      | Generates Entity/Feature-level logic and data layers                    | `TECH_REFERENCE.md`               |
| 🎨 UI Agent    | **Interface Crafter**    | Implements UI components (shadcn, theme, i18n)                          | `PRD.md`, `SCAFFOLD_STRUCTURE.md` |
| 🔍 QA Agent    | **Validator**            | Linting, typing, testing, and performance checks                        | `TECH_REFERENCE.md`               |
| 📦 Ops Agent   | **CI/CD Manager**        | Handles CI/CD, GitHub Actions, environment verification, and deployment | `TECH_REFERENCE.md`               |
| 📚 Doc Agent   | **Knowledge Maintainer** | Synchronizes documents (`PRD`, `TECH_REFERENCE`) and summarizes changes | All documents                     |

---

## 3) Global Coding & Generation Rules

### Component File Rule

- Each file must contain exactly one React component.
- When a component is split, it must be placed in a separate file.
- Defining multiple React components in a single file is not allowed.

#### Exceptions

The following cases are **allowed** as exceptions to the single-component rule:

| Exception                 | Example                                              | Reason                                                |
| ------------------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| **Suspense wrapper**      | `page.tsx` with internal `PageContent` component     | Next.js App Router pattern for `useSearchParams` etc. |
| **ErrorBoundary wrapper** | `page.tsx` with internal error handling component    | React error boundary pattern                          |
| **Compound components**   | `Tabs` with `TabsList`, `TabsTrigger`, `TabsContent` | Design system pattern (only in `shared/ui`)           |

**Conditions for exceptions:**

- The internal component must NOT be exported (private to the file)
- The internal component must be a direct child wrapper, not a reusable component
- The pattern must be a well-known framework convention (Next.js, React)

---

## 4) Detailed Roles

### 4.1 🧠 **Architect Agent**

- **Goal:** Enforce folder structure and dependency rules (FSD-Lite).
- **Reference:** `SCAFFOLD_STRUCTURE.md`
- **Main functions:**
  - Detect violations of import direction (`app → widgets → features → entities → shared`)
  - Warn if Supabase is accessed directly outside of `entities/lib/`
  - Detect disallowed relative imports (`../..`)
- **Trigger:** On PR creation or AI refactor execution
- **Output:** `structure_report.json`
  ```json
  {
    "status": "pass",
    "invalid_imports": []
  }
  ```

---

### 4.2 🧩 **Feature Builder Agent**

- **Goal:** Implement functional specifications from `PRD.md` into actual code structure.
- **Reference:** `TECH_REFERENCE.md`, `SCAFFOLD_STRUCTURE.md`
- **Main functions:**
  - Auto-generate scaffolds for each Entity/Feature
    - Create default folders: `model`, `lib`, `ui`
  - Generate Supabase Repository (`lib/supabase.adapter.ts`) and Query Hook (`model/queries.ts`)
  - Apply TanStack Query Key / invalidation rules
  - Implement mutation patterns similar to `features/toggle-task`
- **Output Example:** `feature_task_done.diff`

---

### 4.3 🎨 **Interface Crafter Agent**

- **Goal:** Maintain consistent UI/UX implementation
- **Reference:** `PRD.md`, `SCAFFOLD_STRUCTURE.md`
- **Main functions:**
  - Generate shadcn/ui + Tailwind-based components
  - Verify ThemeProvider / I18nProvider injection
  - Validate dark mode and i18n key naming (`page.section.key`)
  - Generate initial layout prototypes in `widgets/` or `features/`
- **Output Example:**  
   `ui_report.md` (component tree and untranslated i18n key list)

---

### 4.4 🔍 **Validator Agent**

- **Goal:** Maintain code quality and stability
- **Reference:** `TECH_REFERENCE.md`
- **Main functions:**
  - Validate configuration for `biome`, `eslint`, `jest`, `playwright`
  - Detect TypeScript strict mode errors
  - Measure test coverage (`/test/unit`, `/test/integration`)
  - Run lint/test in CI pipelines
- **Output:**  
   `qa_report.md` (lint, test, and type summary)

---

### 4.5 📦 **Ops Agent**

- **Goal:** Ensure stable build and deployment pipelines
- **Reference:** `TECH_REFERENCE.md`
- **Main functions:**
  - Verify GitHub Actions CI setup (`biome`, `test`, `playwright`)
  - Validate `.env.local` variables (`NEXT_PUBLIC_SUPABASE_URL`, `ANON_KEY`, `SERVICE_ROLE`)
  - Trigger Vercel Preview/Prod deploys
  - Enforce consistent environment (Node 20.x / pnpm 9.x)

---

### 4.6 📚 **Knowledge Maintainer**

- **Goal:** Keep documentation and code synchronized
- **Reference:** `PRD.md`, `SCAFFOLD_STRUCTURE.md`, `TECH_REFERENCE.md`
- **Main functions:**
  - Ensure cross-document updates (e.g., schema ↔ scaffold sync)
  - Validate consistency between PRD features, Entity schemas, and UI structure
  - Add PR comments when generated code diverges from defined specs
  - Update `docs/changelog.md` automatically with major document changes

---

## 5) Collaboration Rules

| Rule                      | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| **Single Responsibility** | Each agent acts only within its own scope.                               |
| **No Cross-layer Edits**  | Only the Architect may modify upper-level structure.                     |
| **Automation First**      | Scaffold → Feature → Validation → Deploy should be automated by default. |
| **Documentation First**   | All changes must propagate in order: PRD → TECH_REFERENCE → SCAFFOLD.    |

---

## 6) Execution Pipeline (Automation Order)

1. **Doc Sync:**  
   Knowledge Maintainer verifies document freshness.
2. **Scaffold Check:**  
   Architect validates structure and dependencies.
3. **Feature Build:**  
   Feature Builder generates new scaffolds and repositories.
4. **UI Generation:**  
   Interface Crafter creates shadcn-based UI components.
5. **QA Validation:**  
   Validator runs lint/test/type checks.
6. **CI/CD Deploy:**  
   Ops Agent triggers GitHub Actions and Vercel deployment.

---

## 7) Future Expansion (for M2)

| Item                             | Description                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| **HTTP Adapter Transition**      | Automatically replace Supabase Adapter → HTTP Adapter for Nest API Gateway integration |
| **Mobile Integration (RN/Expo)** | Add cross-platform agent sharing entity keys and types                                 |
| **Auto Translation**             | Sync and translate PRD/Tech docs (ko-en) automatically                                 |
| **Test Scenario Generation**     | Generate Playwright E2E tests based on PRD feature definitions                         |

---

✅ **Summary:**  
This document defines the **AI & automation agent framework** for Mandalart Web.  
All agents operate collaboratively based on `PRD`, `SCAFFOLD_STRUCTURE`, and `TECH_REFERENCE` documents.  
The system maintains consistent structure, quality, and deployment flow through a **fully automated development cycle**.
