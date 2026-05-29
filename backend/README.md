# InjSight AI — Backend API

FastAPI + SQLAlchemy + Alembic backend for InjSight AI. Read-only and
non-custodial: it never requests or stores private keys.

## Stack
- FastAPI (REST API, `/api` base path)
- SQLAlchemy 2.0 ORM + Alembic migrations
- PostgreSQL in production; SQLite by default for zero-setup local dev
- JWT auth (access + refresh) with bcrypt password hashing
- Deterministic Injective data + rule-based risk scoring + AI report generation
  (swap `app/integrations/injective` and `app/ai` for live providers)

## Quickstart

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate   # or use the bootstrap below
pip install -r requirements.txt
cp .env.example .env

# Apply schema
alembic upgrade head        # or rely on SQLite auto-create on first boot

# Run
uvicorn app.main:app --reload --port 8000
# python run.py also works
```

Interactive docs: http://localhost:8000/docs · Health: `GET /api/health`

### PostgreSQL
Set `DATABASE_URL` in `.env`, e.g.:
```
DATABASE_URL=postgresql+psycopg2://injsight:injsight@localhost:5432/injsight
```
then `alembic upgrade head`.

## Key endpoints
| Method | Path | Auth |
|---|---|---|
| GET | `/api/health` | – |
| POST | `/api/public/analyze-wallet` | – |
| GET | `/api/public/demo-wallet` | – |
| POST | `/api/auth/signup` · `/api/auth/login` · `/api/auth/refresh` | – |
| GET | `/api/auth/me` · `/api/users/usage` | Bearer |
| GET/POST | `/api/wallets` · `POST /api/wallets/:id/analyze` | Bearer |
| GET | `/api/analysis` · `/api/analysis/:id` | Bearer |
| GET | `/api/reports` · `POST /api/reports/:id/export` | Bearer |
| GET | `/api/alerts` · `PUT /api/alerts/:id/read` | Bearer |

Responses use `{ "data": ..., "message": ... }`; errors use
`{ "error": ..., "message": ..., "statusCode": ... }`.

## Frontend wiring
The Next.js app reads `NEXT_PUBLIC_API_URL` (see `frontend/.env.local.example`)
and calls these endpoints via `frontend/lib/api/`. If the API is unreachable the
analyzer falls back to labeled sample data so the UI never breaks.
