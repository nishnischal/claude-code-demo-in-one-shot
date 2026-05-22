# Backend — Phase 2 (Not Yet Implemented)

This folder is a placeholder for the Phase 2 Express.js backend.

## Planned Stack
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Database**: PostgreSQL 16 (via `pg` driver)
- **Container**: `node:20-alpine` Dockerfile

## Planned API Surface

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | Return projects from DB (curated list) |
| POST | `/api/contact` | Accept contact form submission |

## Planned Folder Structure

```
backend/
├── Dockerfile
├── package.json
├── src/
│   ├── index.js          # Express app entry
│   ├── routes/
│   │   ├── projects.js
│   │   └── contact.js
│   ├── db/
│   │   └── client.js     # pg Pool setup
│   └── middleware/
│       └── validate.js
```

## Phase 2 Activation Steps

1. Scaffold the above structure
2. Run `docker compose -f docker-compose.yml -f docker-compose.phase2.yml up --build`
3. Update `ProjectsGrid.jsx` to fetch from `/api/projects` instead of GitHub API
4. Add the nginx `/api/` proxy block in `nginx/nginx.conf`
