# Timeline UI (Boo-inspired)

Mock social timeline built with the Next.js Pages Router, React, TypeScript, and Tailwind CSS v4. The UI recreates Boo-style surfaces: a home feed, question cards, universes list, promo rail, and premium upsell modal, all driven by mock API routes.

## What’s inside
- Next.js 16 (Pages Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@import "tailwindcss";`) with lightweight global styles in `src/styles/globals.css`
- Reusable UI primitives in `src/components/ui` (`Card`, `Avatar`, `Badge`, `IconButton`)
- Timeline components in `src/components/timeline` (feed, universes rail, right column promo, notifications slideout, Infinity modal, top bar, icons)
- Mock data + API routes:
  - `src/server/mock/home.ts` powers home, profile, and settings pages
  - `src/server/mock/notifications.ts` powers `/api/notifications`
  - `src/pages/api/feed.ts` returns sorted “best/new” posts
- Types in `src/types` and small utilities in `src/lib`

## App tour
- Home feed (`src/pages/index.tsx`): Question of the Day, comment composer, “best/new” tabs (sorted via `/api/feed`), local like toggles, and a related posts rail with promo countdown.
- Left rail (`LeftRail`) with collapse toggle and nav to Profile and Settings.
- Infinity upsell modal (`InfinityModal`) showing plan cards and perks; opens by default with dismiss support.
- Notifications slideout (`NotificationsModal`) that animates in/out and fetches mock notifications.
- Profile (`src/pages/profile.tsx`) and Settings (`src/pages/settings.tsx`) pages mirror Boo layout with lifestyle/settings rows and toggles.

## Getting started
Prereqs: Node 18+ recommended.

```bash
npm install
npm run dev
```

Visit http://localhost:3000. Profile lives at `/profile`, settings at `/settings`.

## Scripts
- `npm run dev` – start the dev server
- `npm run build` – production build
- `npm run start` – run the built app
- `npm run lint` – ESLint checks

## Work log
- Time: 17 Dec, 13:00–16:30 GMT+7 (estimate; refer to commit timestamps for precise timing).
- Completed: home page polish; collapsible left panel; initial Infinity pop-up; notifications pop-up; profile and settings pages.
- Skipped: tests/extra visual QA.
- With more time: refine animations, micro-details, and functionality while keeping the current look and feel.
