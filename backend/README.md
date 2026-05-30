<div align="center">

<img src="../docs/logo.png" alt="InjSight AI" width="90" />

# InjSight AI — Backend

[![FastAPI](https://img.shields.io/badge/FastAPI_0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Render](https://img.shields.io/badge/Deployed-Render-46E3B7?style=for-the-badge)](https://injsight-ai-backend.onrender.com)

</div>

---

## Overview

FastAPI Python backend for InjSight AI. Real Injective Mainnet data, OpenRouter AI, LangChain agent, Supabase PostgreSQL.

**Live:** https://injsight-ai-backend.onrender.com  
**API Docs:** https://injsight-ai-backend.onrender.com/docs

## Stack

- FastAPI 0.115 + Python 3.11
- SQLAlchemy 2.0 + Alembic (PostgreSQL/SQLite)
- LangChain 0.3 ReAct agent (4 Injective tools)
- OpenRouter AI (llama-3.3-70b-instruct)
- Supabase (PostgreSQL + Realtime)
- In-memory TTL cache (508× speed improvement)

## Development

```bash
cp .env.example .env
# Set DATABASE_URL, OPENROUTER_API_KEY, Supabase keys

python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --port 8000 --reload
```

## Environment

```env
DATABASE_URL=postgresql://injsight:injsight@localhost:5432/injsight_db
OPENROUTER_API_KEY=sk-or-v1-...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGci...
JWT_SECRET=your-secret
```

---

[← Back to root README](../README.md)
