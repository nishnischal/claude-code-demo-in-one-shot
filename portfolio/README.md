# Portfolio

Personal portfolio site built with React + Vite, served by Nginx inside Docker.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 7 |
| Styling | Plain CSS with custom properties |
| Web server | Nginx 1.27 (Alpine) |
| Container | Docker multi-stage build |
| Orchestration | Docker Compose |
| Tunnel (optional) | ngrok |

## Project structure

```
portfolio/
├── frontend/               # React + Vite source
│   ├── src/
│   │   ├── components/     # Navbar, Hero, ProjectsGrid, ProjectCard, About, Footer
│   │   ├── styles/         # index.css (global tokens + base styles)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile          # Multi-stage: node build → nginx serve
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── nginx/
│   ├── Dockerfile          # Nginx image with custom config
│   └── nginx.conf          # Gzip, cache headers, SPA fallback
├── ngrok/
│   └── ngrok.yml           # ngrok tunnel config
├── backend/                # Phase 2 placeholder (not yet implemented)
├── database/               # Phase 2 placeholder (not yet implemented)
├── decisions/              # Architecture decision records (ADRs)
├── docker-compose.yml      # Phase 1: single portfolio service on :8080
├── docker-compose.phase2.yml  # Phase 2: adds backend + postgres
├── .env.example            # Environment variable template
└── task.md                 # Development task log
```

## Running locally

### Without Docker (recommended for development)

```bash
cd frontend
npm install
npm run dev     # → http://localhost:5173
```

### With Docker (mirrors production)

```bash
# from the portfolio/ directory
docker compose up --build   # → http://localhost:8080
```

To stop:

```bash
docker compose down
```

### ngrok tunnel (expose to internet)

1. Copy `.env.example` to `.env` and fill in your `NGROK_AUTHTOKEN`.
2. Start the Docker stack first (`docker compose up --build`).
3. Run:

```bash
ngrok start --config ngrok/ngrok.yml portfolio
```

## Docker architecture

```
                ┌────────────────────────────────────────┐
                │  Docker Compose                        │
                │                                        │
  :8080   ────▶ │  portfolio  (frontend/Dockerfile)      │
                │   └─ nginx serving /usr/share/nginx/html│
                └────────────────────────────────────────┘
```

The frontend `Dockerfile` uses a two-stage build:

1. **Build stage** (`node:20-alpine`): runs `npm run build`, producing `dist/`.
2. **Serve stage** (`nginx:1.27-alpine`): copies `dist/` into the nginx web root.

## Nginx features

- **Gzip** compression for text/CSS/JS/SVG.
- **Long-lived cache** (`Cache-Control: public, immutable`) for static assets.
- **SPA fallback**: every path serves `index.html` so React Router works correctly.
- **Phase 2 stub**: `/api/` reverse-proxy block is commented in `nginx.conf` — uncomment when the backend is live.

## Architecture decisions

See [`decisions/`](./decisions/) for the recorded rationale behind key choices:

- [001 — Frontend stack (React + Vite)](./decisions/001-frontend-stack.md)
- [002 — Docker architecture](./decisions/002-docker-architecture.md)
- [003 — Nginx as server](./decisions/003-nginx-as-server.md)
- [004 — Phase 2 backend stack](./decisions/004-phase2-backend-stack.md)

## Phase 2 (planned)

Phase 2 adds an Express.js backend and PostgreSQL database. See [`backend/README.md`](./backend/README.md) for the planned API surface and folder layout.

To start the Phase 2 stack once implemented:

```bash
docker compose -f docker-compose.yml -f docker-compose.phase2.yml up --build
```
