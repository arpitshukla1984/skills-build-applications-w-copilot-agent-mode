# OctoFit Tracker — Backend

Minimal Node.js + Express + TypeScript backend for OctoFit Tracker.

Quick start

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Install dependencies and run in dev mode:

```bash
npm install
npm run dev
```

Defaults:
- Server port: `8000` (use `PORT` env var to override)
- MongoDB: `mongodb://localhost:27017/octofit` (use `MONGO_URI` env var to override)

The server exposes a health endpoint at `GET /health`.
