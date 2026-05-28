# URL Shortener

A full-stack URL shortener built with **Next.js 15 (App Router)**, **PostgreSQL**, **Prisma**, and **Temporal** for background workflow processing. Paste a long URL, get a short slug, and track click analytics — all running locally via Docker Compose.

## Features

- Shorten any URL to a memorable slug (auto-generated with `nanoid` or custom)
- Optional link expiry
- Click tracking with referrer and user-agent logging
- Background analytics processing via [Temporal](https://temporal.io/) workflows
- Temporal UI dashboard at `http://localhost:8080`

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React 19) |
| Styling | Tailwind CSS v4, shadcn/ui components |
| Database | PostgreSQL 16 (via Docker) |
| ORM | Prisma 7 |
| Background jobs | Temporal (worker + workflows) |
| Validation | Zod |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- Node.js 20+
- npm

## Local setup

### 1. Start infrastructure

```bash
cd url-shortener
docker compose up -d
```

This starts:
- **PostgreSQL** on port `5432`
- **Temporal server** on port `7233`
- **Temporal UI** on port `8080`

### 2. Install dependencies

```bash
npm install
```

`postinstall` runs `prisma generate` automatically.

### 3. Configure environment

Create a `.env` file in the `url-shortener/` directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/urlshortener"
TEMPORAL_ADDRESS="localhost:7233"
```

### 4. Run database migrations

```bash
npm run db:migrate
```

### 5. Start the Temporal worker

In a separate terminal:

```bash
npm run worker
```

### 6. Start the Next.js dev server

```bash
npm run dev   # → http://localhost:3000
```

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js in development mode |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run worker` | Start Temporal worker process |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:studio` | Open Prisma Studio at `http://localhost:5555` |

## Data model

```
Url
├── id         — CUID primary key
├── slug       — unique short code
├── longUrl    — the original long URL
├── clicks     — running click counter
├── createdAt
├── expiresAt  — optional expiry timestamp
└── clickLogs  → ClickLog[]

ClickLog
├── id
├── urlId      → Url
├── clickedAt
├── referrer
└── userAgent
```

## Stopping

```bash
docker compose down          # stop containers, keep data
docker compose down -v       # stop and delete all data
```
