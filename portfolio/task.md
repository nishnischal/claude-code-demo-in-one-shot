# Portfolio Tasks

## Phase 1 — Static Frontend (Current)

- [x] Scaffold folder structure
- [x] Create decisions/ logs (4 files)
- [x] React + Vite frontend init (package.json, vite.config.js, index.html, main.jsx, App.jsx, index.css)
- [x] Navbar component
- [x] Hero component
- [x] ProjectCard component
- [x] ProjectsGrid component (GitHub API — fetches nishnischal repos)
- [x] About component
- [x] Footer component
- [x] Minimal/clean CSS design tokens
- [x] Frontend Dockerfile (multi-stage: node build → nginx serve)
- [x] Nginx config (nginx.conf + Dockerfile)
- [x] docker-compose.yml (Phase 1, single service on :8080)
- [x] ngrok config (ngrok/ngrok.yml + .env.example)
- [x] Phase 2 placeholder files (backend/README.md, database/.gitkeep)
- [x] `npm install` — run inside frontend/ to generate package-lock.json
- [x] End-to-end test: `docker compose up --build` → `localhost:8080` works
- [x] ngrok tunnel test: public HTTPS URL serves portfolio

## Phase 2 — Backend + Database (Future)

- [ ] Express.js API scaffold (`/api/projects`, `/api/contact`)
- [ ] PostgreSQL schema + migrations (projects table, contact_submissions table)
- [ ] Activate docker-compose.phase2.yml (promote to main compose)
- [ ] Frontend data-fetch swap: GitHub API → own backend API in ProjectsGrid.jsx
- [ ] Contact form backend handler + DB write
- [ ] Add nginx `/api/` proxy block in nginx/nginx.conf (already commented in place)

---

## Run Commands (Quick Reference)

```bash
# Install frontend dependencies (first time)
cd frontend && npm install

# Build and start with Docker
docker compose up --build

# Start ngrok tunnel (copy .env.example → .env first, fill NGROK_AUTHTOKEN)
ngrok start --config ngrok/ngrok.yml portfolio

# Local dev without Docker
cd frontend && npm run dev        # → http://localhost:5173

# Phase 2 (when backend is ready)
docker compose -f docker-compose.yml -f docker-compose.phase2.yml up --build
```
