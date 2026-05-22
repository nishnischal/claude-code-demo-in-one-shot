# Decision 002 — Docker Architecture: Multi-Stage Single Service

**Date:** 2026-05-21
**Status:** Accepted

## Decision
Use a single multi-stage `frontend/Dockerfile` (node build stage → nginx serve stage) instead of two separate containers.

## Rationale
- Phase 1 has no inter-service communication, so two containers add overhead with no benefit
- Multi-stage build keeps the final image small (only nginx + static assets, no node_modules)
- `docker compose up --build` is the only command needed to run the whole site
- Phase 2 will add backend and db services to `docker-compose.phase2.yml` — no changes to the frontend service required

## Alternatives Considered
- **Separate frontend (node) + nginx containers**: Adds a volume mount or copy step; unnecessary complexity for Phase 1
- **Single nginx container with pre-built assets**: Requires building outside Docker; breaks reproducibility
