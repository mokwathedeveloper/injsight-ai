<div align="center">

<img src="../logo.png" alt="InjSight AI" width="80" />

[![Database](https://img.shields.io/badge/Supabase-PostgreSQL_15-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)

</div>

---

# InjSight AI — Supabase Database Migration

## Overview

This document contains the complete SQL migration for InjSight AI's Supabase database.

**Supabase Project:** `xufsfvdzxbwnudwrojor`  
**Project URL:** `https://xufsfvdzxbwnudwrojor.supabase.co`

---

## Where to Find Your Keys (before you start)

Go to: **Supabase Dashboard → Settings → API**

You will see all three on the same page:

| What | Where on the page | Used for |
|---|---|---|
| **Project URL** | Top of the page | Both frontend and backend |
| **anon key** | Under "Project API keys" | Frontend only (browser) |
| **service_role key** | Under "Project API keys" → click **Reveal** | Backend only (server) |

> You do NOT need the database connection string.  
> Project URL + service_role key is enough to connect the backend.

Once you have the service_role key, paste it into `backend/.env`:
```
SUPABASE_SERVICE_KEY=eyJhbGci...   ← paste here
```

---

## Step 1 — Run the SQL Migration

Go to: **Supabase Dashboard → SQL Editor → New Query**  
Paste the entire block below and click **Run**.

```sql
-- ============================================================
-- InjSight AI — Supabase Database Migration
-- Paste this entire block into Supabase SQL Editor and Run
-- ============================================================

-- Enable UUID generation (Supabase has this by default, safe to re-run)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── 1. users ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    email          VARCHAR(255) NOT NULL UNIQUE,
    name           VARCHAR(120),
    password_hash  VARCHAR(255) NOT NULL,
    plan           VARCHAR(50)  NOT NULL DEFAULT 'free',
    email_verified BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_users_email ON users (email);

-- ── 2. wallets ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wallets (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address          VARCHAR(128) NOT NULL,
    chain            VARCHAR(50)  NOT NULL DEFAULT 'injective',
    label            VARCHAR(120),
    is_demo          BOOLEAN      NOT NULL DEFAULT FALSE,
    last_analyzed_at TIMESTAMPTZ,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_wallets_user_id ON wallets (user_id);
CREATE INDEX IF NOT EXISTS ix_wallets_address  ON wallets (address);

-- ── 3. wallet_analysis_runs ──────────────────────────────────
CREATE TABLE IF NOT EXISTS wallet_analysis_runs (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID         REFERENCES users(id)   ON DELETE SET NULL,
    wallet_id       UUID         REFERENCES wallets(id) ON DELETE SET NULL,
    wallet_address  VARCHAR(128) NOT NULL,
    chain           VARCHAR(50)  NOT NULL DEFAULT 'injective',
    status          VARCHAR(30)  NOT NULL DEFAULT 'pending',
    data_source     VARCHAR(120),
    normalized_data JSONB,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    completed_at    TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS ix_wallet_analysis_runs_wallet_address
    ON wallet_analysis_runs (wallet_address);

-- ── 4. ai_reports ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_reports (
    id                     UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_run_id        UUID         NOT NULL
        REFERENCES wallet_analysis_runs(id) ON DELETE CASCADE,
    user_id                UUID         REFERENCES users(id) ON DELETE SET NULL,
    wallet_address         VARCHAR(128) NOT NULL,
    summary                TEXT,
    concentration_analysis TEXT,
    risk_explanation       TEXT,
    injective_context      TEXT,
    suggested_next_steps   JSONB,
    full_report            JSONB,
    model_name             VARCHAR(120),
    created_at             TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_ai_reports_wallet_address
    ON ai_reports (wallet_address);

-- ── 5. risk_scores ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS risk_scores (
    id                      UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_run_id         UUID         NOT NULL
        REFERENCES wallet_analysis_runs(id) ON DELETE CASCADE,
    wallet_address          VARCHAR(128) NOT NULL,
    score                   INTEGER      NOT NULL,
    risk_level              VARCHAR(30)  NOT NULL,
    concentration_score     INTEGER,
    volatility_score        INTEGER,
    stablecoin_buffer_score INTEGER,
    activity_score          INTEGER,
    diversification_score   INTEGER,
    methodology_version     VARCHAR(50),
    created_at              TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_risk_scores_wallet_address
    ON risk_scores (wallet_address);

-- ── 6. alerts ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alerts (
    id             UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id        UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    wallet_address VARCHAR(128),
    type           VARCHAR(50)  NOT NULL DEFAULT 'info',
    severity       VARCHAR(30)  NOT NULL DEFAULT 'low',
    title          VARCHAR(200) NOT NULL,
    message        TEXT,
    is_read        BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_alerts_user_id ON alerts (user_id);

-- ── 7. usage_events ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS usage_events (
    id         UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID         REFERENCES users(id) ON DELETE SET NULL,
    event_type VARCHAR(60)  NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ── 8. updated_at auto-trigger ───────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_wallets_updated_at
    BEFORE UPDATE ON wallets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── 9. Row Level Security (RLS) ───────────────────────────────
-- Supabase runs PostgreSQL 15 — CREATE POLICY does NOT support IF NOT EXISTS.
-- Drop existing policies first so this script is safe to re-run.

ALTER TABLE users                ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets               ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_analysis_runs  ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_reports            ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_scores           ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts                ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_events          ENABLE ROW LEVEL SECURITY;

-- Drop policies first (safe if they don't exist — errors are suppressed below)
DO $$ BEGIN
    DROP POLICY IF EXISTS "users: own row"          ON users;
    DROP POLICY IF EXISTS "wallets: own rows"        ON wallets;
    DROP POLICY IF EXISTS "analyses: own rows"       ON wallet_analysis_runs;
    DROP POLICY IF EXISTS "ai_reports: own rows"     ON ai_reports;
    DROP POLICY IF EXISTS "alerts: own rows"         ON alerts;
    DROP POLICY IF EXISTS "risk_scores: deny direct" ON risk_scores;
    DROP POLICY IF EXISTS "usage_events: deny direct" ON usage_events;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Create policies (no IF NOT EXISTS — not supported in PostgreSQL 15)
CREATE POLICY "users: own row"
    ON users FOR ALL USING (auth.uid()::text = id::text);

CREATE POLICY "wallets: own rows"
    ON wallets FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "analyses: own rows"
    ON wallet_analysis_runs FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "ai_reports: own rows"
    ON ai_reports FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "alerts: own rows"
    ON alerts FOR ALL USING (auth.uid()::text = user_id::text);

-- Backend-only tables: deny all direct client access
CREATE POLICY "risk_scores: deny direct"
    ON risk_scores FOR ALL USING (FALSE);

CREATE POLICY "usage_events: deny direct"
    ON usage_events FOR ALL USING (FALSE);

-- ── Done ─────────────────────────────────────────────────────
SELECT 'InjSight AI migration complete' AS status;
```

---

## Step 2 — Verify Tables Were Created

After running, check the **Table Editor** in Supabase Dashboard. You should see these 7 tables:

| Table | Description |
|---|---|
| `users` | Registered accounts (email, hashed password, plan) |
| `wallets` | Saved Injective wallets per user |
| `wallet_analysis_runs` | Every analysis run with portfolio data |
| `ai_reports` | OpenRouter AI-generated wallet reports |
| `risk_scores` | Computed risk scores per analysis run |
| `alerts` | User risk alerts and notifications |
| `usage_events` | API usage tracking per user |

---

## Step 3 — Connect Backend to Supabase

Get the PostgreSQL connection string from:  
**Supabase Dashboard → Settings → Database → Connection string → URI (Transaction mode)**

It will look like:
```
postgresql://postgres.xufsfvdzxbwnudwrojor:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
```

Update `backend/.env`:

```env
# Replace the existing DATABASE_URL line with your Supabase URI:
DATABASE_URL=postgresql://postgres.xufsfvdzxbwnudwrojor:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres

# Keep these as-is:
SUPABASE_URL=https://xufsfvdzxbwnudwrojor.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **Where to find the database password:**  
> Supabase Dashboard → Settings → Database → Reset database password  
> (if you don't remember the one set during project creation)

---

## Step 4 — Restart the Backend

```bash
cd backend
.venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The backend will now read and write to Supabase PostgreSQL instead of the local Docker database.

---

## Schema Diagram

```
users
  └── wallets              (user_id → users.id)
  └── wallet_analysis_runs (user_id → users.id)
        └── ai_reports     (analysis_run_id → wallet_analysis_runs.id)
        └── risk_scores    (analysis_run_id → wallet_analysis_runs.id)
  └── alerts               (user_id → users.id)
  └── usage_events         (user_id → users.id)
```

---

## Rollback (Drop All Tables)

Only run this if you need to start over completely:

```sql
-- WARNING: This deletes all data permanently
DROP TABLE IF EXISTS usage_events          CASCADE;
DROP TABLE IF EXISTS alerts                CASCADE;
DROP TABLE IF EXISTS risk_scores           CASCADE;
DROP TABLE IF EXISTS ai_reports            CASCADE;
DROP TABLE IF EXISTS wallet_analysis_runs  CASCADE;
DROP TABLE IF EXISTS wallets               CASCADE;
DROP TABLE IF EXISTS users                 CASCADE;
DROP FUNCTION IF EXISTS update_updated_at  CASCADE;
```
