<div align="center">

<img src="docs/logo.png" alt="InjSight AI" width="90" />

# Contributing to InjSight AI

[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-22C55E?style=for-the-badge)](https://github.com/mokwathedeveloper/injsight-ai/pulls)
[![Branch](https://img.shields.io/badge/Main_Branch-trunc-0066FF?style=for-the-badge)](https://github.com/mokwathedeveloper/injsight-ai/tree/trunc)
[![License](https://img.shields.io/badge/License-MIT-F5C542?style=for-the-badge)](LICENSE)

Thank you for your interest in contributing to InjSight AI — the AI-native wallet intelligence platform for Injective DeFi.

</div>

---

## 🌿 Branch Strategy

InjSight AI uses a **feature-branch workflow** with `trunc` as the integration branch:

```
trunc (integration branch)
  └── feature/your-feature  ← create from trunc, merge back to trunc
  └── fix/your-fix
  └── docs/your-docs
```

| Rule | Detail |
|---|---|
| Base branch | Always create from `trunc` |
| Merge target | Always merge back to `trunc` |
| Never merge to | `main` (legacy, do not use) |
| Branch naming | `feature/`, `fix/`, `docs/`, `perf/` prefixes |
| Delete after merge | No — keep branches for audit trail |

```bash
git checkout trunc
git pull origin trunc
git checkout -b feature/your-feature
# ... make changes ...
git push origin feature/your-feature
# Open PR → trunc
```

---

## 📐 Code Standards

### Frontend (TypeScript + Next.js 14)

- TypeScript strict mode — **zero `any` types** (except unavoidable API shape unknowns)
- No new mock data — every component must use TanStack Query hooks against real API
- Every data-fetching component must handle: `isLoading` → skeleton, `isError` → `<ErrorState>`, empty → `<EmptyState>`
- CSS classes only from design tokens — no arbitrary Tailwind values
- New pages must use `DashboardLayout` (authenticated) or `Navbar` + `Footer` (public)

### Backend (Python 3.11 + FastAPI)

- Type hints on all function signatures
- Pydantic schemas for all request/response bodies
- No SQLite-only code — must work with PostgreSQL (SQLite is fallback only)
- New routes must be registered in `app/main.py`
- Cache frequently-called external API calls using `app/core/cache.py`

### Git Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add Helix DEX position tracking
fix: wallet detail page returning 500 on Next.js 14 params
docs: update API reference with new /injective endpoints
perf: cache staking data for 5 minutes
refactor: extract risk scoring into standalone module
chore: update pydantic-core to 2.27.2
```

---

## 🔧 Development Setup

```bash
# 1. Clone and checkout trunc
git clone https://github.com/mokwathedeveloper/injsight-ai.git
cd injsight-ai && git checkout trunc

# 2. Frontend
cd app
cp .env.example .env.local   # fill in NEXT_PUBLIC_API_URL + Supabase keys
npm install --legacy-peer-deps
npm run dev                  # → http://localhost:3000

# 3. Backend
cd ../backend
cp .env.example .env         # fill in DATABASE_URL, OPENROUTER_API_KEY
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --port 8000 --reload
```

---

## ✅ PR Checklist

Before opening a pull request:

- [ ] Code runs locally without errors
- [ ] `npx tsc --noEmit` passes (zero TypeScript errors)
- [ ] No new `MOCK_*` arrays introduced — use real API hooks
- [ ] New pages have loading, error, and empty states
- [ ] PR targets `trunc`, not `main`
- [ ] Commit messages follow Conventional Commits format
- [ ] API changes are reflected in `/api` page or API reference docs

---

## 🔍 What We Need

| Area | Contribution ideas |
|---|---|
| 🔗 Injective | More token denom mappings, Helix DEX positions, Mito vault data |
| 🤖 AI | Better risk scoring dimensions, more precise LLM prompts |
| 🌐 Frontend | More responsive improvements, accessibility (WCAG) |
| 🧪 Testing | Jest unit tests, Playwright e2e tests |
| 📚 Documentation | Translations, tutorials, video guides |
| 🔐 Security | Security audit, penetration testing |

---

## 💬 Contact

- GitHub Issues: https://github.com/mokwathedeveloper/injsight-ai/issues
- Security disclosures: See [SECURITY.md](SECURITY.md)

---

<div align="center">

Built for the **Injective DeFi Community** · MIT License

[📚 README](README.md) · [📋 Changelog](CHANGELOG.md) · [🔐 Security](SECURITY.md)

</div>
