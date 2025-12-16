# Mandalart Web – PRD (v1.0)

_Last updated: 2025-11-08 (KST)_

---

## 1) Product Overview

**One-liner**  
A web app that allows users to create mandal-art boards by theme, track progress, view account-based dashboard statistics, and export completed boards as images or PDFs.

**Primary Users**

- Personal goal managers: users who structure and manage goals related to personal life, learning, or career.
    

**Main Goals (from Nagi)**

1. Create multiple mandal-art boards by theme and check item completion
    
2. Provide an account-based dashboard (achievement rate, monthly completion count, etc.) + allow download of completed boards as image/PDF
    

---

## 2) Scope

### 2.1 MVP Features

- **Auth/Account:** Supabase Auth (email/password + OAuth)
    
- **Board Management:** 3×3 cell structure, each cell with title, memo, and checklist items
    
- **Check/Completion:** Mark tasks as complete/incomplete
    
- **Dashboard:** Overall/board-level progress rate, monthly completion count, recent activity logs
    
- **Export:** Single board → image (PNG) and PDF download
    
- **Landing Page:** Service introduction, examples, popular topics (templates)
    
- **My Page:** Dashboard, new board creation, list of user’s boards
    

### 2.2 Post-MVP (Later)

- Board sharing (read/comment)
    
- Template gallery + community popular templates
    
- Notifications (reminders)
    
- Mobile app (React Native + Nest.js backend)
    

---

## 3) UX & IA

### 3.1 Main Screens

- **Landing Page:** Mandal-art introduction, use examples, popular topics, CTA (get started)
    
- **My Page:**
    
    - Dashboard (progress rate, monthly chart, recent logs)
        
    - Add new mandal-art (choose template or blank)
        
    - My boards list (sorted by recent updates)
        
- **Board Screen (Core):**
    
    - 3×3 grid (center: main goal, surrounding 8: sub-goals)
        
    - Cell detail: title, memo, checklist, completion visualization
        
    - Export button (PNG/PDF)
        

### 3.2 User Flow Summary

1. Sign up / log in
    
2. Create new board (enter topic / select template)
    
3. Input cell content and tasks
    
4. Check tasks
    
5. View progress on dashboard
    
6. Export as PNG/PDF when completed
    

---

## 4) Tech Stack (Summary)

- **Framework:** Next.js (App Router) + TypeScript
    
- **DB/Backend:** Supabase (Postgres, Auth, Storage, RLS)
    
- **Styling/UI:** TailwindCSS, shadcn/ui
    
- **State/Data:** TanStack Query, Zustand, Zod
    
- **Charts:** Recharts
    
- **Export:** html-to-image, jsPDF
    
- **Testing:** Jest, Playwright, MSW
    
- **CI:** GitHub Actions
    
- **Package Manager:** pnpm
    
- **Lint/Format:** Biome + ESLint(next) + Prettier
    

> For detailed versions, settings, indexes, and rationale for library choices, see **TECH_REFERENCE.md**.

---

## 5) Data Model (Summary)

Mandalart consists of a 3×3 cell structure (central goal + 8 sub-goals).  
The MVP supports **only one level of expansion (1-depth)**.

### 5.1 Entity Overview

- **profiles:** user profile (linked to Auth)
    
- **boards:** mandal-art board (topic, description, owner)
    
- **cells:** each board’s 3×3 cells (title, memo, hierarchical link)
    
- **tasks:** checklist items per cell (content, completion status)
    
- **events:** user activity log (task completion, etc.)
    

### 5.2 Database Definition

- All tables have RLS enabled
    
- Foreign keys use `on delete cascade` policy
    
- Indexes on board_id, cell_id, owner_id
    
- Actual SQL definitions and indexes are in **TECH_REFERENCE.md**
    

---

## 6) Functional Requirements

### 6.1 Board

- 3×3 grid-based cell structure
    
- Clicking a cell opens a Drawer detail view
    
- Cell editing auto-saves with 600ms debounce
    
- On blur, saves immediately
    
- Conflict detection (`updated_at`) triggers new version alert
    

### 6.2 Task Check

- Record event log in `events` when toggled
    
- Use optimistic update, rollback + toast on failure
    

### 6.3 Dashboard

- Overall completion = completed tasks / total tasks
    
- Show monthly completions and 10 most recent logs
    
- All times follow `Asia/Seoul` timezone
    

### 6.4 Export

- PNG (2x, no transparent background)
    
- PDF (A4, 12mm margin, Pretendard font)
    
- Show loading indicator if over 2.5s
    
- Filename rule: `{board-title}_{YYYY-MM-DD}.png|pdf`
    

---

## 7) Data Access & API

- Direct Supabase SDK (`supabase-js`) calls
    
- TanStack Query for cache management and synchronization
    
- Server Actions handle sensitive tasks (e.g., PDF rendering)
    
- Public boards allow anonymous access while maintaining RLS
    
- Cache policy: `revalidateTag('board:{id}')` + `invalidateQueries(['board', id])`
    

> SQL queries, API call examples, and implementation details are in **TECH_REFERENCE.md**

---

## 8) State Management & Validation

- **Zustand:** local UI state (modal, selected cell, etc.)
    
- **TanStack Query:** board/cell/task data management
    
- **Zod:** form validation
    
- **react-hook-form:** form handling
    

> Actual schema code and validation logic are in **TECH_REFERENCE.md**

---

## 9) Component Structure (based on shadcn/ui)

- `BoardGrid` → `BoardCell` → `CellDetailDrawer`
    
- `TaskItem` (checkbox item)
    
- `DashboardCards` (progress, monthly chart, activity log)
    
- `ExportButtonGroup` (PNG/PDF export)
    
- `TemplatePicker` (for new board creation)
    
- `ThemeSwitcher`, `LocaleSwitcher`
    

---

## 10) Performance · Accessibility · Internationalization

- Lighthouse target: Performance ≥ 90 / Accessibility ≥ 95
    
- A11y: keyboard navigation, focus indicators, clear labeling
    
- Lazy loading, Next `<Image>` usage
    
- font-display=swap, minimize critical CSS
    

### 10.1 Dark Mode

- Tailwind `dark:` + `next-themes`
    
- System detection (auto) + user toggle supported
    
- Stored in localStorage as `theme: "light" | "dark" | "system"`
    

### 10.2 Internationalization (Korean/English)

- Based on `next-intl`
    
- Default: `ko` / Secondary: `en`
    
- Routes: `/dashboard`, `/en/dashboard`
    
- Key naming convention: `page.section.key`
    
- Runtime fallback: English
    

---

## 11) Security & Privacy

- User data isolation via Supabase RLS
    
- Only public boards allow anonymous access
    
- Minimize PII in `events` logs
    
- Environment variables:
    
    - `NEXT_PUBLIC_SUPABASE_URL`
        
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
        
    - `SUPABASE_SERVICE_ROLE` (server-only)
        
- Security headers:
    
    - `X-Frame-Options=DENY`
        
    - `Referrer-Policy=strict-origin-when-cross-origin`
        
    - `CSP: script-src 'self'; img-src 'self' data:`
        

---

## 12) Risks & Mitigations

|Risk|Mitigation|
|---|---|
|Canvas capture quality issues|Print-optimized layout + font preload|
|Complex mobile editing UX|Simplify with Drawer-based editing|
|Missing RLS policies|e2e tests + policy audit scripts|
|Supabase cost increase|Limit Edge Function calls + strengthen caching|

---

## 13) Performance & Quality Targets

- LCP ≤ 2.5s / FID ≤ 100ms / CLS ≤ 0.1
    
- Apply lazy loading
    
- RSC cache retention ≥ 80%
    

---

## 14) Testing & CI

### Overview

- **Unit/Integration:** Jest + Testing Library + jest-dom + MSW
    
- **E2E:** Playwright
    
- **Coverage:** Jest(V8)
    
- **CI:** GitHub Actions + pnpm
    

### Pipeline

1. **Lint/Format:** `pnpm biome check`, `pnpm next lint`
    
2. **Unit/Integration:** `pnpm test --runInBand --coverage`
    
3. **E2E:** `pnpm exec playwright install --with-deps` → `pnpm exec playwright test --reporter=line`
    

### Test Pyramid

|Level|Tool|Purpose|Ratio|
|---|---|---|---|
|Unit|Jest|Function/component unit tests|60%|
|Integration|Jest + MSW|Data/state integration|25%|
|E2E|Playwright|Real user flow|15%|

> Detailed scenarios and API mocking examples are in **TECH_REFERENCE.md**

---

## 15) Document Link Structure

- **PRD.md** – Product definition and requirements
    
- **TECH_REFERENCE.md** – Technical specifications, SQL, code examples, version info
    
- **SCAFFOLD_STRUCTURE.md** – Folder and component structure (FSD-Lite)
    
- **AGENTS.md** – Codex agent guidelines and context configuration

---

---

✅ **Summary:**  
This PRD serves as the **MVP product definition document** for Mandalart Web.  
All technical implementations are based on TECH_REFERENCE.md,  
and this document defines the project’s goals, UX flow, policies, and quality standards.

---
