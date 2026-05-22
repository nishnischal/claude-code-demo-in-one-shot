# claude-code-demo-in-one-shot

A collection of demo projects built in a single session using [Claude Code](https://claude.ai/code). Each project is self-contained, fully documented, and runnable locally.

## What's in this repo

| Project | Stack | Description |
|---------|-------|-------------|
| [portfolio/](./portfolio/) | React + Vite, Docker, Nginx | Personal portfolio site — Phase 1 (static) with Phase 2 (backend) planned |
| [projects/todo-app/](./projects/todo-app/) | React, Node.js/Express, SQLite | Full-stack Todo app with REST API |
| [projects/weather-dashboard/](./projects/weather-dashboard/) | React + Vite, Open-Meteo API | Live weather dashboard using a free public API |

## Running a project locally

Each project has its own `README.md` with full setup instructions. Quick summary:

### portfolio

```bash
cd portfolio/frontend
npm install
npm run dev          # → http://localhost:5173

# or with Docker
cd portfolio
docker compose up --build   # → http://localhost:8080
```

### todo-app

```bash
cd projects/todo-app
npm install           # installs both frontend + backend deps
npm run dev           # starts both servers concurrently
# frontend → http://localhost:5173
# API      → http://localhost:3001
```

### weather-dashboard

```bash
cd projects/weather-dashboard
npm install
npm run dev           # → http://localhost:5173
```

## Tech stack overview

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Styling | Plain CSS (custom design tokens) |
| Backend | Node.js 20, Express.js |
| Database | SQLite (via `better-sqlite3`) |
| Containers | Docker, Docker Compose |
| Web server | Nginx |
| External APIs | GitHub REST API, Open-Meteo (free, no key) |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add a new project to this repo.

## License

[MIT](./LICENSE)
