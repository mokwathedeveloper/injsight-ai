<div align="center">

<img src="docs/logo.png" alt="InjSight AI" width="90" />

</div>

# Security Policy — InjSight AI

[![Security](https://img.shields.io/badge/Security-Read--Only_·_Non--Custodial-22C55E?style=for-the-badge)](SECURITY.md)
[![RLS](https://img.shields.io/badge/Supabase-Row_Level_Security_Enabled-3ECF8E?style=for-the-badge)](https://supabase.com)

## Our Security Commitment

InjSight AI is built on a single non-negotiable principle: **we never take custody of anything**. Our platform reads public blockchain data and generates AI reports. That is all.

---

## What We Never Do

| ❌ We NEVER | Reason |
|---|---|
| Request private keys | Read-only platform — no signing needed |
| Request seed phrases | No wallet connection required |
| Execute transactions | Analytics only |
| Store wallet credentials | Nothing sensitive is collected |
| Share data with advertisers | No advertising model |
| Accept custody of funds | Non-custodial by design |

---

## Supported Versions

| Version | Supported |
|---|---|
| 1.0.x (current) | ✅ Active support |
| 0.9.x (beta) | ⚠️ Critical fixes only |
| < 0.9.0 | ❌ End of life |

---

## Security Architecture

### Authentication
- JWT tokens — stateless, configurable expiry (30 min access, 7 day refresh)
- Passwords hashed with bcrypt (cost factor 12) via passlib
- Never logged, never stored in plaintext

### Database
- Supabase Row Level Security (RLS) — users can only access their own rows
- Service role key used only on backend — never exposed to frontend
- Anon key used for Realtime subscriptions only (read-safe operations)

### API Security
- CORS restricted to known frontend origins
- Input validation on all endpoints (Pydantic schemas)
- Wallet address format validation (bech32, `inj1` prefix, length 38–50)
- Rate limiting on public analysis endpoint

### Data Transmission
- All production traffic over HTTPS (Vercel + Render enforce TLS)
- No sensitive data in URL parameters
- Credentials stored only in `.env` files (gitignored, never committed)

---

## Security Audit Findings

| ID | Severity | Component | Description | Status |
|---|---|---|---|---|
| ISA-001 | Medium | `db.py` | SQLite fallback allows deployment without PostgreSQL (data not persistent) | ✅ Resolved — documented as intentional fallback |
| ISA-002 | Low | Navbar | `/reports` link caused 404 prefetch noise in browser | ✅ Fixed in v1.0.0 |
| ISA-003 | Low | Auth token | Token persisted in localStorage (XSS risk in theory) | ⚠️ Accepted — standard SPA pattern, mitigated by CSP |
| ISA-004 | Info | Demo wallet | Address `inj1qg5...kkxh` had invalid bech32 checksum | ✅ Fixed — updated to valid address |
| ISA-005 | Info | OpenRouter key | API key exposed in backend `.env` (gitignored) | ✅ Not tracked in git — `.env` is gitignored |

---

## Responsible Disclosure

If you discover a security vulnerability, please do NOT open a public GitHub issue.

**Report via:**

1. GitHub Security Advisories: `https://github.com/mokwathedeveloper/injsight-ai/security/advisories`
2. GitHub Issues (for non-sensitive findings): `https://github.com/mokwathedeveloper/injsight-ai/issues`

**Please include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (optional)

**We will:**
- Acknowledge receipt within 48 hours
- Provide a status update within 7 days
- Credit the reporter in the changelog (if desired)

---

## Privacy

See [app/src/app/privacy/page.tsx](/app/src/app/privacy/page.tsx) and the live [Privacy Policy](https://injsight-ai.vercel.app/privacy) for full details.

InjSight AI collects only what is needed:
- Email address + hashed password (for accounts)
- Wallet addresses you choose to analyze (public blockchain addresses)
- Analysis history (stored in your account)

We do not sell data, run advertising, or share data with third parties beyond our infrastructure providers (Supabase, Vercel, Render, OpenRouter, CoinGecko).

---

*InjSight AI Security Policy v1.0 — May 2026*
