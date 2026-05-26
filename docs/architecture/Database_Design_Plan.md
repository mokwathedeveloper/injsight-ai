# InjSight AI — Database Design Plan

## 1. Database Goal

The database should support a professional SaaS foundation for wallet analysis, saved wallets, AI reports, risk scores, alerts, usage tracking, and future team workspaces.

The MVP should use a simple schema that can expand without major rewrites.

## 2. Recommended Database

**Primary Database:** PostgreSQL  
**ORM:** SQLAlchemy  
**Migrations:** Alembic / Flask-Migrate or equivalent  
**Cache and Jobs:** Redis  

## 3. Core Data Model

The initial database should support:

- Users
- Wallets
- Wallet analysis runs
- AI reports
- Risk metrics
- Alerts
- Usage events
- Plans
- Optional teams later

## 4. Tables

## 4.1 users

Stores registered user accounts.

```sql
users
- id UUID PRIMARY KEY
- email VARCHAR(255) UNIQUE NOT NULL
- name VARCHAR(120)
- password_hash VARCHAR(255) NOT NULL
- plan VARCHAR(50) DEFAULT 'free'
- email_verified BOOLEAN DEFAULT FALSE
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Notes:

- Passwords must be hashed with bcrypt.
- Never store raw passwords.
- Plan values can start as `free`, `pro`, `team`, `enterprise`.

## 4.2 wallets

Stores wallets saved by authenticated users.

```sql
wallets
- id UUID PRIMARY KEY
- user_id UUID REFERENCES users(id) ON DELETE CASCADE
- address VARCHAR(128) NOT NULL
- chain VARCHAR(50) DEFAULT 'injective'
- label VARCHAR(120)
- is_demo BOOLEAN DEFAULT FALSE
- last_analyzed_at TIMESTAMP
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Recommended indexes:

```sql
INDEX wallets_user_id_idx ON wallets(user_id);
INDEX wallets_address_idx ON wallets(address);
```

## 4.3 wallet_analysis_runs

Stores each analysis event.

```sql
wallet_analysis_runs
- id UUID PRIMARY KEY
- user_id UUID REFERENCES users(id) ON DELETE SET NULL
- wallet_id UUID REFERENCES wallets(id) ON DELETE SET NULL
- wallet_address VARCHAR(128) NOT NULL
- chain VARCHAR(50) DEFAULT 'injective'
- status VARCHAR(30) DEFAULT 'pending'
- data_source VARCHAR(120)
- raw_data_snapshot JSONB
- normalized_data JSONB
- created_at TIMESTAMP
- completed_at TIMESTAMP
```

Status values:

- `pending`
- `processing`
- `completed`
- `failed`

## 4.4 ai_reports

Stores AI-generated wallet intelligence reports.

```sql
ai_reports
- id UUID PRIMARY KEY
- analysis_run_id UUID REFERENCES wallet_analysis_runs(id) ON DELETE CASCADE
- user_id UUID REFERENCES users(id) ON DELETE SET NULL
- wallet_address VARCHAR(128) NOT NULL
- summary TEXT
- concentration_analysis TEXT
- risk_explanation TEXT
- injective_context TEXT
- suggested_next_steps JSONB
- full_report JSONB
- model_name VARCHAR(120)
- created_at TIMESTAMP
```

Notes:

- `full_report` stores the complete structured AI output.
- Keep important fields separately for querying and UI display.

## 4.5 risk_scores

Stores deterministic and AI-assisted risk score outputs.

```sql
risk_scores
- id UUID PRIMARY KEY
- analysis_run_id UUID REFERENCES wallet_analysis_runs(id) ON DELETE CASCADE
- wallet_address VARCHAR(128) NOT NULL
- score INTEGER NOT NULL
- risk_level VARCHAR(30) NOT NULL
- concentration_score INTEGER
- volatility_score INTEGER
- stablecoin_buffer_score INTEGER
- activity_score INTEGER
- diversification_score INTEGER
- methodology_version VARCHAR(50)
- created_at TIMESTAMP
```

Score range:

```txt
0 = lowest observable risk
100 = highest observable risk
```

Risk levels:

- Low
- Moderate
- High
- Very High

## 4.6 wallet_balances

Optional but useful if you want queryable balance history.

```sql
wallet_balances
- id UUID PRIMARY KEY
- analysis_run_id UUID REFERENCES wallet_analysis_runs(id) ON DELETE CASCADE
- wallet_address VARCHAR(128) NOT NULL
- denom VARCHAR(255)
- symbol VARCHAR(50)
- amount NUMERIC(36, 18)
- usd_value NUMERIC(20, 6)
- percentage_of_portfolio NUMERIC(10, 4)
- created_at TIMESTAMP
```

## 4.7 alerts

Stores alerts for users and saved wallets.

```sql
alerts
- id UUID PRIMARY KEY
- user_id UUID REFERENCES users(id) ON DELETE CASCADE
- wallet_id UUID REFERENCES wallets(id) ON DELETE SET NULL
- alert_type VARCHAR(80) NOT NULL
- severity VARCHAR(20) DEFAULT 'low'
- title VARCHAR(255) NOT NULL
- message TEXT
- is_read BOOLEAN DEFAULT FALSE
- created_at TIMESTAMP
```

Alert types:

- `risk_score_changed`
- `large_balance_change`
- `new_activity_detected`
- `concentration_risk`
- `report_ready`
- `system_notice`

Severity:

- `low`
- `medium`
- `high`

## 4.8 usage_events

Tracks usage for plan limits and future billing.

```sql
usage_events
- id UUID PRIMARY KEY
- user_id UUID REFERENCES users(id) ON DELETE SET NULL
- event_type VARCHAR(80) NOT NULL
- metadata JSONB
- created_at TIMESTAMP
```

Event types:

- `wallet_analysis_created`
- `ai_report_generated`
- `wallet_saved`
- `report_exported`
- `login`
- `signup`

## 4.9 teams

Future table for team workspaces.

```sql
teams
- id UUID PRIMARY KEY
- name VARCHAR(120) NOT NULL
- owner_user_id UUID REFERENCES users(id)
- plan VARCHAR(50) DEFAULT 'team'
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

## 4.10 team_members

Future table for team membership.

```sql
team_members
- id UUID PRIMARY KEY
- team_id UUID REFERENCES teams(id) ON DELETE CASCADE
- user_id UUID REFERENCES users(id) ON DELETE CASCADE
- role VARCHAR(50) DEFAULT 'member'
- created_at TIMESTAMP
```

Roles:

- owner
- admin
- analyst
- viewer

## 5. MVP Database Priority

Build these first:

1. users
2. wallets
3. wallet_analysis_runs
4. ai_reports
5. risk_scores
6. usage_events

Build later:

1. alerts
2. wallet_balances
3. teams
4. team_members
5. billing tables
6. API key tables

## 6. Data Retention Strategy

Suggested MVP retention:

- Public anonymous analysis: short retention or no persistence
- Authenticated analysis: stored under user account
- AI reports: stored unless user deletes
- Raw data snapshots: store carefully and minimize unnecessary data
- Usage events: retained for product analytics and limits

## 7. Privacy Principles

- Do not store private keys.
- Do not store seed phrases.
- Do not request custody permissions.
- Store only wallet addresses and analysis outputs.
- Let users delete saved wallets and reports.
- Clearly label public blockchain data as public.

## 8. Migration Rules

- Use ORM models as source of schema truth.
- Use migration tooling for schema changes.
- Do not manually edit production database tables.
- Every schema change should have a migration file.
- Every migration should be reviewed before production deployment.

## 9. Future Billing Tables

When ready for payments:

```sql
subscriptions
- id UUID PRIMARY KEY
- user_id UUID REFERENCES users(id)
- plan VARCHAR(50)
- status VARCHAR(50)
- provider VARCHAR(50)
- provider_customer_id VARCHAR(255)
- provider_subscription_id VARCHAR(255)
- current_period_start TIMESTAMP
- current_period_end TIMESTAMP
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

## 10. Future API Key Tables

For developer or protocol customers:

```sql
api_keys
- id UUID PRIMARY KEY
- user_id UUID REFERENCES users(id)
- team_id UUID REFERENCES teams(id)
- name VARCHAR(120)
- key_hash VARCHAR(255)
- last_used_at TIMESTAMP
- revoked_at TIMESTAMP
- created_at TIMESTAMP
```

Store only hashed API keys, never raw API keys.
