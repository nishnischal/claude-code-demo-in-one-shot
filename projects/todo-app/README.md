# Todo App

Full-stack todo application with a React frontend and a Node.js/Express REST API backed by SQLite.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Backend | Node.js 20, Express 4 |
| Database | SQLite (via `better-sqlite3`) |
| Styling | Plain CSS |

## Project structure

```
todo-app/
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx    # Input form to add a new todo
│   │   │   ├── TodoItem.jsx    # Single todo row (toggle, delete)
│   │   │   └── TodoList.jsx    # Renders the list of todos
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                # Express REST API
│   ├── src/
│   │   ├── db/
│   │   │   └── client.js       # SQLite connection + schema init
│   │   ├── routes/
│   │   │   └── todos.js        # CRUD routes for /api/todos
│   │   └── index.js            # Express app entry
│   └── package.json
└── package.json            # Root: runs both servers concurrently
```

## API

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/api/todos` | — | List all todos |
| POST | `/api/todos` | `{ "title": "..." }` | Create a todo |
| PATCH | `/api/todos/:id` | `{ "done": true }` | Toggle done status |
| DELETE | `/api/todos/:id` | — | Delete a todo |

## Running locally

```bash
# from the todo-app/ directory
npm install          # installs root + workspace deps
npm run dev          # starts both servers concurrently
```

- Frontend: http://localhost:5173
- API: http://localhost:3001

The Vite dev server proxies `/api` requests to `http://localhost:3001`, so no CORS issues during development.

## Running with Docker

```bash
docker compose up --build   # → http://localhost:8080
```

> **Note:** The `docker-compose.yml` is not yet in this scaffold — add it as a follow-up (Phase 2 of this project).
