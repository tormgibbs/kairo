# Kairo — Activity Tracker

A web application for tracking daily activities of an applications support team. Personnel log activities, update statuses, and managers get a clear handover view at the end of each shift.

## Tech Stack

**Backend** — Laravel 13 
**Frontend** — React 19 + TypeScript + Inertia.js v3  
**Styling** — Tailwind CSS v4 + shadcn/ui  
**Database** — PostgreSQL  
**Auth** — Laravel Fortify  
**Build** — Vite 8


## Features

- **`Daily Activity Dashboard:`** view all activities for any date, update status and add remarks inline
- **`Activity Management:`** create, edit, and delete activities with category and date tracking
- **`Audit Trail:`** every status update captures who made it and exactly when
- **`Handover View:`** clear per-day snapshot designed for shift handovers between personnel
- **`Reports:`** query activity history by custom date range with expandable log history per activity
- **`Authentication:`** secure login required before any access


## Setup

### Requirements

- PHP 8.2+
- Composer
- Node.js 22+
- pnpm
- PostgreSQL

### Installation

```bash
# Clone the repository
git clone github.com/tormgibbs/kairo
cd kairo

# Install PHP dependencies
composer install

# Install JS dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### Database

Update `.env` with your PostgreSQL credentials:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=kairo
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Then run migrations and seed:

```bash
php artisan migrate --seed
```

### Running Locally

```bash
# Terminal 1 — Laravel
php artisan serve

# Terminal 2 — Vite
pnpm run dev
```

Visit `http://localhost:8000` and log in with the seeded credentials.

---

## Project Structure

```
app/
├── Http/
│   └── Controllers/
│       ├── ActivityController.php
│       ├── ActivityLogController.php
│       ├── DailyViewController.php
│       └── ReportController.php
└── Models/
    ├── Activity.php
    ├── ActivityLog.php
    └── User.php

resources/js/
├── components/          # Reusable UI components
├── pages/               # Inertia page components
│   ├── activities/
│   └── reports/
└── types/               # TypeScript type definitions
```


## Built With

- [Laravel](https://laravel.com)
- [Inertia.js](https://inertiajs.com)
- [React](https://react.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Table](https://tanstack.com/table)
- [Tailwind CSS](https://tailwindcss.com)
