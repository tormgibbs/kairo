# Kairo — Activity Tracker: Project Context

## 1. Project Overview

**Client:** Npontu Technologies (interview assignment)
**Project Name:** Kairo — Activity Tracker
**Goal:** A web app for tracking daily activities of an applications support team. Personnel log activities, update statuses, and managers get a clear handover view each day.

**Key Features:**
1. Admin creates daily activities (e.g. "Daily SMS count vs log count")
2. Staff update each activity's status (`pending` / `done`) + add a remark
3. Every update captures who did it and exactly when
4. Dashboard = daily view — all activities, latest status, who updated, at what time
5. Reports page — filter activity history by custom date range
6. Auth required before any access

---

## 2. Current State

**Completed:**
- Laravel 12 + official React starter kit (Inertia.js v3 + React 19 + TypeScript + Tailwind v4 + shadcn/ui)
- PostgreSQL connected
- Migrations: `users` (extended), `activities`, `activity_logs`
- Models: `User`, `Activity`, `ActivityLog` with relationships
- Middleware: `RoleMiddleware` registered in `bootstrap/app.php`
- Routes: fully defined in `routes/web.php`
- Controllers: `DailyViewController`, `ActivityController`, `ActivityLogController`, `ReportController`
- Seeder: `AdminUserSeeder`
- Sidebar nav: Dashboard, Activities, Reports
- Types: `User`, `Activity`, `ActivityLog` defined in `resources/js/types/`
- CSS: custom design system applied in `resources/css/app.css`
- shadcn components added: `field`, `field-group`, `toggle-group`, `form`

**Components:**
- `resources/js/components/status-badge.tsx` ✅
- `resources/js/components/log-form.tsx` ✅
- `resources/js/components/activity-card.tsx` ✅
- `resources/js/components/stats-bar.tsx` ✅

**Pages:**
- `resources/js/pages/dashboard.tsx` ⏳
- `resources/js/pages/activities/index.tsx` ⏳
- `resources/js/pages/activities/create.tsx` ⏳
- `resources/js/pages/activities/edit.tsx` ⏳
- `resources/js/pages/reports/index.tsx` ⏳

**Next:** Build `dashboard.tsx` by composing existing components, then activities pages, then reports.

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 12 |
| Frontend | React 19 + TypeScript + Inertia.js v3 |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL |
| Auth | Laravel Fortify (bundled in starter kit) |
| UI Components | shadcn/ui (Radix mode) + lucide-react |
| Forms | react-hook-form + zod + @hookform/resolvers |

---

## 4. Database Schema

**users:** `id, name, email, password, role (admin|staff), phone, department`
**activities:** `id, title, description, category, status (pending|done), activity_date, created_by (FK users)`
**activity_logs:** `id, activity_id (FK), user_id (FK), status, remark, logged_at, timestamps`

---

## 5. Shared Types (`resources/js/types/`)

```ts
// auth.ts
export type User = {
    id: number
    name: string
    email: string
    role: 'admin' | 'staff'
    phone?: string
    department?: string
    avatar?: string
    email_verified_at: string | null
    created_at: string
    updated_at: string
    [key: string]: unknown
}

// index.ts additions
export type ActivityLog = {
    id: number
    user: User
    status: 'pending' | 'done'
    remark?: string
    logged_at: string
}

export type Activity = {
    id: number
    title: string
    description?: string
    category: string
    status: 'pending' | 'done'
    activity_date: string
    creator: User
    logs: ActivityLog[]
    latest_log?: ActivityLog
}
```

---

## 6. Design System

### Aesthetic
Clean, utilitarian ops dashboard. Professional tone. Data-dense but breathable. Deep slate sidebar, electric indigo primary, teal success, amber warning.

### Fonts
- **All text:** `DM Sans` — weights 400, 500, 600, 700
- **Timestamps/mono:** `JetBrains Mono`
- Loaded via Google Fonts at top of `app.css`

### Semantic Tokens
```
Primary actions     → bg-primary, text-primary-foreground
Muted text          → text-muted-foreground
Card surfaces       → bg-card, bg-muted
Borders             → border, border-input
Destructive         → text-destructive, bg-destructive
Success (done)      → text-success, bg-success, bg-success-subtle
Warning (pending)   → text-warning, bg-warning, bg-warning-subtle
```

### Custom Tokens (defined in `app.css`)
```css
/* light */
--primary: oklch(0.5 0.24 264);           /* electric indigo */
--success: oklch(0.52 0.14 180);          /* teal */
--success-foreground: oklch(0.99 0 0);
--success-subtle: oklch(0.94 0.04 180);
--warning: oklch(0.65 0.15 70);           /* amber */
--warning-foreground: oklch(0.2 0.04 70);
--warning-subtle: oklch(0.96 0.04 70);
--sidebar: oklch(0.18 0.03 264);          /* deep slate */

/* dark equivalents defined in .dark {} */
```

### Spacing
Tailwind default scale. `gap-*` only — never `space-x-*` or `space-y-*`.

---

## 7. shadcn/ui Rules (strictly enforced)

### Styling
- Semantic tokens only — never raw Tailwind color classes (`text-emerald-600` etc.)
- `gap-*` not `space-x-*` / `space-y-*`
- `size-*` when width = height
- `cn()` for all conditional class merging
- No manual `z-index` on overlays
- No `dark:` manual overrides

### Forms
- **Never use shadcn `<Form>` component** — use react-hook-form directly with native `<form>`
- Layout uses `FieldGroup` + `Field` — never raw `div` wrappers
- `Field data-invalid` + `aria-invalid` on control for validation states
- `Field data-disabled` + `disabled` on control for disabled states
- **2–7 option sets → `ToggleGroup` + `ToggleGroupItem`** — never looping buttons or `Select`
- Labels via shadcn `Label` — `className="sr-only"` when visually hidden
- Errors: `<p className="text-destructive text-xs">{error.message}</p>`

### Cards
```tsx
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
  </CardHeader>
  <CardContent />
  <CardFooter />
</Card>
```

### Overlays
- `Dialog` → focused task/input
- `AlertDialog` → destructive confirmation
- `Sheet` → side panel / filters
- `DialogTitle`, `SheetTitle`, `DrawerTitle` always required — `sr-only` if hidden

### Icons (lucide-react)
- No sizing classes on icons inside shadcn components
- Icons in buttons: `data-icon="inline-start"` or `data-icon="inline-end"`

### Status Indicators
- `Badge` with semantic token classes only — never raw colors or styled spans

### Button Loading
- No `isLoading` prop — compose with `Spinner` + `disabled`

---

## 8. Engineering Guidelines

- **Separation of concerns** — controllers pass data, pages render, components are dumb UI
- **No fat files** — split at ~150 lines
- **No over-abstraction** — only abstract when used 3+ times
- **Inertia pattern** — pages receive props, never fetch data themselves
- **Validation** — `$request->validate()` on backend always. Zod on frontend for UX only.
- **No `any` in TypeScript**
- **Role checks** — middleware only, never inside controller logic

---

## 9. Response Style Rules (for AI agents)

- **Never rewrite entire files** unless explicitly told "complete rewrite"
- Show only modified lines with 2–3 lines of surrounding context
- Use `// ... rest unchanged`, `// ... existing logic ...` for omitted sections
- For single-line changes use: `Change line X from: old to: new`
- Never ask to paste output unless something fails
- Provide related small components together in one response
- Only split responses when code is genuinely large

---

## 10. File & Naming Conventions

| Context | Convention | Example |
|---|---|---|
| React/TSX files | kebab-case | `activity-card.tsx` |
| PHP classes | PascalCase | `ActivityController.php` |
| PHP methods | camelCase | `latestLog()` |
| DB columns | snake_case | `activity_date`, `logged_at` |
| Inertia render | match file path | `Inertia::render('activities/index')` |
| Routes | kebab-case | `/activities`, `/reports` |
| CSS classes | semantic tokens | `bg-primary`, `text-muted-foreground` |

---

## 11. Installed shadcn Components
```
alert, avatar, badge, breadcrumb, button, card, checkbox,
collapsible, dialog, dropdown-menu, field, field-group, form,
input, input-otp, label, navigation-menu, select, separator,
sheet, sidebar, skeleton, spinner, toggle, toggle-group, tooltip
```

