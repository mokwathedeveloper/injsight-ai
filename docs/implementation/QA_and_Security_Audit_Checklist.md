# InjSight AI — QA and Security Audit Checklist

## 1. Purpose

This checklist should be used before public demos, hackathon submission, production deployment, and major feature releases.

It focuses on common risks in AI, wallet analytics, SaaS authentication, API usage, external providers, and frontend state.

---

## 2. Critical Security Checks

### 2.1 Public API Abuse

- [ ] Public wallet analysis endpoint is rate-limited.
- [ ] Public wallet analysis endpoint has request size limits.
- [ ] Public demo endpoint does not call expensive external services unnecessarily.
- [ ] AI report endpoint cannot be abused anonymously without limits.
- [ ] Injective provider endpoints are not exposed directly without protection.
- [ ] Expensive AI calls require limits, authentication, or CAPTCHA later.

### 2.2 Authentication

- [ ] Protected endpoints return `401` for unauthenticated users.
- [ ] Protected endpoints never return fake fallback data.
- [ ] Users can only access their own wallets and reports.
- [ ] Token expiration is handled cleanly.
- [ ] Logout clears client state.
- [ ] Refresh token handling is secure.

### 2.3 No Fake Data as Real Data

- [ ] Demo data is labeled clearly.
- [ ] No fabricated wallet history is presented as real.
- [ ] No fake user counts or traction metrics.
- [ ] No fake risk score history.
- [ ] No fake Injective provider responses in production.
- [ ] No fake AI confidence claims.

### 2.4 Wallet Safety

- [ ] App never requests private keys.
- [ ] App never requests seed phrases.
- [ ] App does not execute trades.
- [ ] App does not sign transactions for analysis.
- [ ] Read-only status is visible in the UI.
- [ ] Wallet connection, if added later, is optional for analysis.

---

## 3. AI Safety Checks

- [ ] AI input is normalized and bounded.
- [ ] Prompt cannot be overridden by user input.
- [ ] AI output is validated before display.
- [ ] Raw AI provider output is not exposed on errors.
- [ ] AI does not give direct buy/sell instructions.
- [ ] AI does not guarantee returns.
- [ ] Financial disclaimer appears with reports.
- [ ] Long wallet data inputs are summarized before AI call.
- [ ] AI provider errors are logged safely server-side.
- [ ] AI report sections are structured, not freeform only.

---

## 4. API Validation Checks

- [ ] Wallet address validation exists.
- [ ] Email validation exists.
- [ ] Password validation exists.
- [ ] Report export format validation exists.
- [ ] Pagination validation exists.
- [ ] Request JSON schema validation exists.
- [ ] Unknown fields are ignored or rejected consistently.
- [ ] Invalid content type returns clean error.
- [ ] Backend never crashes on malformed input.

---

## 5. Frontend QA Checks

### 5.1 Pages

- [ ] Landing page works on desktop and mobile.
- [ ] Analyzer page validates wallet addresses.
- [ ] Demo page clearly labels demo data.
- [ ] Pricing page has accurate plan names and limits.
- [ ] Login page handles errors.
- [ ] Signup page validates password.
- [ ] Dashboard requires login.
- [ ] Saved wallets page handles empty state.
- [ ] Reports page handles empty state.
- [ ] Settings page handles loading state.

### 5.2 UI States

Every major screen has:

- [ ] loading state
- [ ] error state
- [ ] empty state
- [ ] success state

### 5.3 React and State

- [ ] TanStack Query keys use stable scalar values.
- [ ] No unsafe non-null assertions where state may be missing.
- [ ] Auth state does not cause blank page flashes.
- [ ] Query functions guard against missing user/session.
- [ ] Timers and subscriptions are cleaned up.
- [ ] WebSocket connections close on unmount.
- [ ] Error boundaries exist for major dashboard routes later.

---

## 6. Backend QA Checks

- [ ] Unit tests cover wallet validation.
- [ ] Unit tests cover risk score calculation.
- [ ] Integration tests cover public wallet analysis.
- [ ] Integration tests cover auth.
- [ ] Integration tests cover saved wallet ownership.
- [ ] AI service can be mocked in tests.
- [ ] Injective service can be mocked in tests.
- [ ] Database migrations run cleanly.
- [ ] Rate limit behavior is tested.
- [ ] Error responses are consistent.

---

## 7. Data and Database Checks

- [ ] Users table does not store raw passwords.
- [ ] Wallets belong to users.
- [ ] Reports belong to users.
- [ ] Analysis runs store status.
- [ ] Failed analysis runs are handled cleanly.
- [ ] JSONB fields have expected shape.
- [ ] Delete wallet does not expose orphaned data incorrectly.
- [ ] Database indexes exist for user_id and wallet_address.
- [ ] Migrations are committed.
- [ ] Production migrations are reviewed.

---

## 8. External Provider Checks

### Injective Provider

- [ ] Timeouts are configured.
- [ ] Provider errors are caught.
- [ ] Data is normalized.
- [ ] Cached data is labeled if stale.
- [ ] Missing token metadata is handled.
- [ ] Unsupported wallet is handled.

### AI Provider

- [ ] Timeouts are configured.
- [ ] API key is backend-only.
- [ ] Response is schema-validated.
- [ ] Costly calls are rate-limited.
- [ ] Prompt inputs are capped.

---

## 9. Security Headers and Deployment

- [ ] HTTPS enabled.
- [ ] Production debug mode disabled.
- [ ] CORS restricted to frontend domain.
- [ ] Secrets are not committed.
- [ ] `.env.example` exists.
- [ ] Dependency vulnerability check completed.
- [ ] Backend logs do not leak secrets.
- [ ] Frontend does not expose private env vars.
- [ ] Database backups enabled.
- [ ] Error monitoring configured later.

---

## 10. Pre-Demo Checklist

Before recording demo video:

- [ ] Landing page loads.
- [ ] Demo wallet works.
- [ ] Real wallet analysis works or fallback is explained.
- [ ] AI report generates.
- [ ] Risk score displays.
- [ ] Read-only notice visible.
- [ ] No fake production claims.
- [ ] README is updated.
- [ ] Setup instructions work.
- [ ] Deployed app link works.
- [ ] GitHub repo is public or ready to share.

---

## 11. Severity Classification

### Critical

Must fix before demo or public release.

Examples:

- unauthenticated expensive endpoint
- raw AI output leaked
- private key requested
- user can access another user's report
- fake data returned as real

### High

Should fix before public launch.

Examples:

- unbounded prompt input
- missing rate limits
- broken auth refresh
- unstable dashboard state
- provider errors crash API

### Medium

Fix before serious users.

Examples:

- weak empty states
- inconsistent loading states
- missing tests
- unclear error messages

### Low

Improve polish.

Examples:

- copy improvements
- minor spacing issues
- icon consistency
- non-critical performance tuning
