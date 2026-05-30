#!/usr/bin/env bash
set -e

echo "=== Installing dependencies ==="
pip install -r requirements.txt

echo "=== Running database migrations ==="
# Only run alembic if DATABASE_URL is PostgreSQL
if [[ "$DATABASE_URL" == postgresql* ]]; then
  echo "PostgreSQL detected — running Alembic migrations..."
  alembic upgrade head
else
  echo "SQLite fallback — creating tables directly..."
  python3 -c "
from app.db import Base, engine
import app.models  # noqa — registers all models
Base.metadata.create_all(bind=engine)
print('SQLite tables created OK')
"
fi

echo "=== Build complete ==="
