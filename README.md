# Tejeswaar Interactive Portfolio

An interactive developer portfolio built with Next.js and Supabase. This project extends beyond a traditional portfolio by introducing a hybrid identity system, real-time engagement tracking, a dynamic leaderboard, and gameplay-driven progression.

---

## Overview

This portfolio is designed as a system-driven experience rather than a static showcase. It tracks user behavior, supports optional authentication via GitHub, and integrates gameplay elements to create a more engaging and measurable environment.

The goal is to demonstrate how core systems—identity, state, and interaction—can be combined into a cohesive product.

---

## Core Features

### Hybrid Identity System

The application supports both guest and authenticated users:

* **Guest Users**

  * Assigned a `visitor_id` stored in localStorage
  * No login required
  * Leaderboard entry is created only after earning game or achievement points
  * Guest data is preserved independently and never merged into existing accounts

* **Authenticated Users (GitHub OAuth)**

  * Login via GitHub using Supabase Auth
  * Profile data (username, avatar) is synced
  * One-time upgrade: guest data carries over only when creating a new account for the first time
  * Achievements and progress persist across devices via database sync

---

### Engagement Tracking

User interaction is tracked in real time:

* Time spent on the site (`active_seconds`)
* Clicks and interactions
* Game scores and achievements
* Session activity

All data is associated with a persistent identity (`visitor_id` or `user_id`).

---

### Leaderboard System

A scalable, dynamic leaderboard ranks users based on overall engagement.

#### Scoring Factors

* Time spent on the website
* Number of interactions
* Game performance (×5 multiplier)
* Achievement unlocks

The score is calculated consistently at the database level.

#### Display

* **Top 10** always visible
* **±25 context window** around the current user's rank (for users outside top 10)
* Visual gap separator (`· · ·`) between top 10 and user context when applicable
* Total player count shown in the rank card
* Seamless handling for any number of users (10 to 100,000+)

#### Guest Row Creation

Guest accounts are only created when a user earns their first game or achievement point — passive browsing does not create leaderboard entries.

---

### Achievement System

* Persistent achievements stored in the database
* Synced across devices on login (green dot friendship, discoveries, etc.)
* Achievement progress carries over during first-time account creation

---

### Identity Merge Logic

The merge system follows strict rules:

| Scenario | Behavior |
|---|---|
| Guest plays → creates GitHub account (first time) | Guest row upgraded to user row, all scores kept |
| Existing user logs in from any device | Guest row left untouched, user row loads independently |
| User logs out | Falls back to guest identity on that device |

* Merge happens **once** — only on first-time account creation
* Guest rows are never deleted on login (they may belong to another user on that device)
* No score duplication is possible

---

### Automated Cleanup

* Stale guest accounts (below rank 100, inactive for 1+ month) are automatically cleaned up
* Runs weekly via Vercel Cron (Sundays at 3 AM UTC)
* GitHub-linked accounts are never affected
* Can also be triggered manually via admin endpoint

---

### Blog System

A lightweight content system supports:

* Markdown-based posts
* Optional YouTube embeds
* Minimal, clean presentation

Used for updates, notes, or technical write-ups.

---

### Interactive Systems

The portfolio incorporates game-inspired interactions:

* Event-driven UI behavior
* Hidden mechanics and triggers (Green Dot storyline)
* Integrated text-based gameplay (Hamurabi)
* Snake game with score tracking

These elements are designed to reflect a systems-oriented approach to development.

---

### GitHub Integration

* Displays recent repository activity
* Uses GitHub API
* Supports optional token for higher rate limits

---

## Architecture

### Frontend

* Next.js (App Router)
* Component-based structure
* Tailwind CSS (Catppuccin theme)
* Framer Motion animations

### Backend

* Supabase (PostgreSQL + Auth)
* Row-level security policies
* API routes for:

  * Engagement tracking
  * Leaderboard (scalable top 10 + context window)
  * Identity merging (one-time upgrade)
  * Admin cleanup (automated via cron)

---

## Database Design

### Visitors

Stores identity and engagement data:

* `visitor_id` — browser-level guest identity
* `user_id` — GitHub-linked identity
* `clicks`, `active_seconds` — engagement metrics
* `game_score`, `achievement_score` — gameplay metrics
* `score` — computed total (database-level)
* `display_name`, `avatar_url`, `github_username` — profile data
* `achievements` — array of unlocked achievement IDs
* `last_seen` — last activity timestamp

### Posts

* `title`, `slug`, `content`
* `youtube_url`
* `published`

### Global Stats

* Aggregated metrics such as total clicks

---

## Authentication Flow

1. User visits → assigned a `visitor_id`
2. Activity is tracked (leaderboard entry created only on first game/achievement)
3. User logs in via GitHub
4. If first-time account → guest row upgraded to user row (scores preserved)
5. If existing account → user row loads, guest row left untouched
6. Achievements sync from database to localStorage on any device

---

## Privacy and Security

* No sensitive data is exposed publicly
* Authentication handled via Supabase
* Environment variables excluded from version control
* Row-level security enforced at the database level
* Cron endpoints protected by secret token

---

## Tech Stack

* Next.js 14
* Supabase (PostgreSQL + Auth)
* Tailwind CSS (Catppuccin)
* Framer Motion
* GitHub API
* Vercel (hosting + cron)

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CRON_SECRET=              # For automated cleanup
ADMIN_SECRET=             # For admin terminal access
```

---

## Notes

This is an actively evolving project focused on experimentation with systems, interaction, and user-driven data.
