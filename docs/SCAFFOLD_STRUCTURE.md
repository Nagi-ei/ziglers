# Mandalart Web – SCAFFOLD_STRUCTURE (v2.0)

_Last updated: 2026-03-13 (KST)_

---

## 1) Purpose

This document defines the project scaffold and boundary rules for Mandalart Web.
It is the source of truth for:

- where files should live
- which layers may import which
- how UI primitives differ from application UI
- where data access is allowed
- how TanStack Query keys and mutation boundaries should be organized

This is a scaffold and architecture document, not a code dump.
Only keep examples here when they illustrate a project-specific rule that would otherwise be ambiguous.
This project uses an **FSD-lite scaffold** adapted to the Next.js App Router.

---

## 2) Current Project Shape

```bash
src/
├─ app/
│  ├─ (landing)/
│  ├─ (app)/
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  └─ globals.css
├─ widgets/
│  ├─ landing/
│  ├─ dashboard-summary/
│  ├─ dashboard-charts/
│  ├─ dashboard-boards/
│  └─ app-sidebar/
├─ features/                           # optional; add only when a stable feature boundary exists
├─ entities/                           # optional; add only when a stable entity/domain boundary exists
├─ shared/
│  ├─ ui/
│  │  ├─ shadcn/                       # installed shadcn primitive surface (from components.json)
│  │  └─ common/                       # project-specific shared UI
│  └─ lib/
│     ├─ hooks/
│     ├─ theme/
│     └─ utils.ts
└─ generated/
   └─ prisma/

tests/
├─ e2e/
└─ integration/

prisma/
├─ schema.prisma
└─ migrations/
```

### Notes

- `src/app/` replaces the traditional `pages/` layer and owns routing, page/layout composition, and route entry points.
- `processes/` is not used.
- `features/` and `entities/` should not be scaffolded by default just to satisfy a pattern.
- Add a layer only when it owns a stable responsibility that cannot stay in an existing layer cleanly.

---

## 3) Layer Rules

### Dependency Direction

When these layers exist, imports should flow:

`app -> widgets -> features -> entities -> shared`

Higher layers may import lower layers.
Lower layers must not import higher layers.

### Practical Interpretation

- `app/` owns route boundaries, page/layout composition, and server-rendered entry points.
- `widgets/` compose screen-level or section-level UI.
- `features/` own reusable user interactions or mutation-oriented UI behavior when a real feature boundary exists.
- `entities/` own domain-facing types, query keys, and other stable domain artifacts when a real entity boundary exists.
- `shared/` owns reusable cross-app infrastructure and UI primitives.

### Anti-patterns

- creating parallel folder conventions beside the scaffold
- adding empty `features/*` or `entities/*` folders “just in case”
- introducing a new layer without explaining what responsibility could not stay in an existing one

---

## 4) UI Surface Rules

### Installed shadcn primitive surface

- The canonical installed shadcn primitive surface is defined by `components.json`.
- In the current repository, `components.json` points installed shadcn components to `@/shared/ui/shadcn`.
- Files in that installed primitive surface may preserve upstream multi-export compound structure.

### Project UI

- Project-specific UI that is not an installed shadcn primitive belongs outside that installed primitive surface.
- Use `shared/ui/common` for reusable project UI and visual helpers.
- Use `widgets/`, `features/`, or other scaffold-appropriate layers for application UI with domain or screen responsibility.

### Component file rule

- Each app-specific React component must live in its own file.
- Allowed exceptions:
  - a non-exported route-local wrapper component used directly for Suspense or Error Boundary composition
  - installed shadcn primitive files in the canonical shadcn surface

### Do not do this

- mix feature logic, data fetching, or mutation orchestration into installed shadcn primitive files
- use the shadcn exception to justify multi-component app files elsewhere

---

## 5) Data Access Boundaries

### Default model

- Database access is server-side only.
- Prisma is the primary application data-access layer.
- Supabase remains responsible for auth/session, storage, and database-level RLS enforcement.

### Allowed boundaries

- Server Components may perform reads directly or through server-only helper modules.
- Server Actions are the default write boundary for internal create/update/delete flows.
- Route Handlers are reserved for public API, webhooks, or other external interface boundaries.
- Client components must never access the database directly.

### Repository / Adapter rule

Repository or adapter layers are optional, not default.
Add them only when they provide clear value such as:

- a stable server-only transport boundary
- a real multi-source integration boundary
- contract mapping or auth/transaction logic that is clearer in its own module

Do not add forwarding-only repositories or adapters that merely wrap one lower-level call without owning a meaningful boundary.

---

## 6) Query Keys and Mutations

### Query key ownership

Use stable hierarchical key factories rather than ad-hoc inline query keys.
The scaffold concern here is ownership and placement, not the canonical example shape itself.

### Placement

- Prefer `src/entities/<domain>/model/keys.ts` when the domain boundary exists.
- Otherwise use a clearly named shared or feature-local query-key module.

### Mutation boundaries

- Prefer `Server Action + useMutation` for application writes.
- Keep success handling explicit:
  - invalidate
  - revalidate
  - refresh
  - navigation
- When mutation orchestration is reused or non-trivial, move it into a feature-local UI hook instead of repeating inline logic across components.

---

## 7) Shared Infrastructure

### Providers and shared libs

- Keep reusable infrastructure in `src/shared/lib/`.
- The current repository already uses:
  - `src/shared/lib/theme/`
  - `src/shared/lib/hooks/`
  - `src/shared/lib/utils.ts`

### Styles

- Global styles belong in `src/app/globals.css`.

### Generated code

- Generated Prisma output belongs in `src/generated/prisma/`.
- Hand-written application code should not be mixed into generated folders.

---

## 8) Route and Rendering Rules

- Prefer Server Component reads for page/view data.
- Keep `use client` boundaries as narrow as possible.
- Validate route params and search params at route boundaries.
- Place Suspense and Error Boundaries at meaningful route or feature boundaries rather than scattering ad-hoc loading/error logic across unrelated components.

---

## 9) Testing Placement

Current root-level test directories:

- `tests/e2e/`
- `tests/integration/`

If unit tests are introduced or expanded, keep them under a stable root-level test directory rather than inventing ad-hoc per-folder test placement without a project-wide rule.

---

## 10) Migration Notes

- If a future M2 architecture introduces a real HTTP or NestJS transport boundary, document and justify that server-only boundary explicitly.
- Do not preserve older client-side adapter conventions as the default just to keep migration language around.
- Share query key naming and stable contracts only where they provide real reuse value across clients.

---

## Summary

The Mandalart Web scaffold favors:

- an FSD-lite layer model adapted to the Next.js App Router
- clear layer ownership
- narrow server/client boundaries
- installed shadcn primitives separated from application UI
- explicit query-key ownership and placement
- direct, explainable architecture over low-value abstraction
