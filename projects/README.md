# projects/

This folder contains standalone demo projects. Each one lives in its own subdirectory and is fully self-contained — it can be cloned or copied independently.

## Existing projects

| Folder | Description | Stack |
|--------|-------------|-------|
| [todo-app/](./todo-app/) | Full-stack Todo app | React, Express, SQLite |
| [weather-dashboard/](./weather-dashboard/) | Live weather from a free public API | React, Open-Meteo |

## Project conventions

- Every project has its own `README.md` with stack, structure, and run instructions.
- Frontend projects use **React + Vite** by default.
- Backend projects use **Node.js + Express** with **SQLite** for single-file simplicity, or **PostgreSQL** when a relational model is needed.
- Projects should run with `npm install && npm run dev` (or `docker compose up --build` if Docker is provided).

## Adding a new project

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full checklist.
