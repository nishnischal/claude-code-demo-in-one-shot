# Decision 003 — Web Server: Nginx

**Date:** 2026-05-21
**Status:** Accepted

## Decision
Use Nginx (alpine) to serve the built React app.

## Rationale
- Production-grade: handles gzip compression, static file caching headers, and connection management out of the box
- SPA routing: `try_files $uri /index.html` handles client-side React Router paths without a 404
- Tiny footprint: `nginx:alpine` image is ~7MB
- ngrok tunnels directly to the nginx port — no additional reverse-proxy configuration needed
- When Phase 2 adds a backend, nginx can be configured as a reverse proxy (`/api → backend:3000`) with minimal config change

## Alternatives Considered
- **Node.js `serve` package**: Fine for dev, but not production-grade; no gzip, no fine-grained caching control
- **Caddy**: Good option, but nginx is more widely documented and the team is already familiar with it
