# Decision 001 — Frontend Stack: React + Vite

**Date:** 2026-05-21
**Status:** Accepted

## Decision
Use React + Vite for the Phase 1 frontend.

## Rationale
- Component-based architecture makes it easy to add data-fetching layers in Phase 2 without restructuring
- Vite provides fast HMR for local development and a clean production build (outputs to `dist/`)
- React is the most familiar ecosystem for integrating future state management (Zustand/Redux) or data libraries (React Query) if needed in Phase 2
- The built `dist/` folder is static HTML/CSS/JS — nginx serves it with zero runtime dependency

## Alternatives Considered
- **Plain HTML/CSS/JS**: Simpler but no component reuse; would require restructuring when Phase 2 adds dynamic data
- **Next.js**: SSR is overkill for Phase 1; adds build complexity; can migrate to if SEO becomes a priority
