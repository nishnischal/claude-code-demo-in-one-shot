# Decision 004 — Phase 2 Backend Stack: Node.js (Express) + PostgreSQL

**Date:** 2026-05-21
**Status:** Accepted (for Phase 2)

## Decision
Phase 2 backend will use Express.js with PostgreSQL.

## Rationale
- **JavaScript consistency**: Same language as the React frontend; no context switching
- **Express**: Minimal and flexible — doesn't impose structure that might conflict with the existing Phase 1 layout
- **PostgreSQL**: Relational model fits the portfolio domain well (projects, skills, contact submissions have clear schemas); strong Docker support via `postgres:alpine`
- Easy to add later: the `backend/` and `database/` folders are already scaffolded as placeholders

## Phase 2 Intended API Surface
- `GET /api/projects` — returns projects from DB (cached from GitHub or manually curated)
- `POST /api/contact` — accepts contact form submission, writes to `contact_submissions` table
- `GET /api/health` — health check endpoint for Docker

## Alternatives Considered
- **Python FastAPI + PostgreSQL**: Excellent choice, but adds a second language to the project
- **Node.js + MongoDB**: Flexible schema, but relational structure is more appropriate here
- **Supabase / PlanetScale**: Managed DB removes ops burden but adds vendor lock-in
