# InjSight AI — Security Checklist

## 1. Security Principle

InjSight AI should be secure by design. The MVP must remain read-only, non-custodial, and safe for users to try without risking their funds.

The product should analyze public wallet data, not control wallets or execute transactions.

## 2. Wallet and Crypto Safety

- [ ] Do not request private keys.
- [ ] Do not request seed phrases.
- [ ] Do not store private keys.
- [ ] Do not store seed phrases.
- [ ] Do not execute trades in the MVP.
- [ ] Do not ask users to sign transactions for analysis.
- [ ] Clearly state that wallet analysis is read-only.
- [ ] If Connect Wallet is added later, use it only for identity or convenience unless explicitly needed.
- [ ] Never imply the app has custody of user funds.

## 3. Authentication Security

- [ ] Hash passwords using bcrypt or equivalent secure password hashing.
- [ ] Never store raw passwords.
- [ ] Use JWT access tokens with expiration.
- [ ] Use refresh token rotation or revocation.
- [ ] Store refresh tokens securely.
- [ ] Rate-limit login attempts.
- [ ] Add password strength validation.
- [ ] Protect all user routes with authentication middleware.
- [ ] Implement logout properly.

## 4. API Security

- [ ] Validate all request bodies.
- [ ] Validate wallet address input.
- [ ] Reject malformed input early.
- [ ] Use consistent error responses.
- [ ] Rate-limit public wallet analysis endpoint.
- [ ] Rate-limit authentication endpoints.
- [ ] Do not expose raw provider secrets.
- [ ] Do not expose internal stack traces.
- [ ] Use HTTPS in production.
- [ ] Restrict CORS to approved frontend domains.

## 5. Database Security

- [ ] Use ORM parameterized queries.
- [ ] Avoid raw SQL string concatenation.
- [ ] Use database migrations.
- [ ] Use least-privilege database credentials.
- [ ] Store only necessary wallet and report data.
- [ ] Allow users to delete saved wallets and reports.
- [ ] Do not store sensitive secrets in the database.
- [ ] Back up production database securely.

## 6. Environment and Secret Management

- [ ] Use `.env` files only for local development.
- [ ] Never commit `.env` files.
- [ ] Provide `.env.example`.
- [ ] Store production secrets in deployment platform environment settings.
- [ ] Rotate secrets if exposed.
- [ ] Separate development and production credentials.
- [ ] Do not hardcode API keys.
- [ ] Do not log secrets.

## 7. Injective Integration Security

- [ ] Treat all external provider data as untrusted.
- [ ] Normalize and validate provider responses.
- [ ] Handle provider downtime gracefully.
- [ ] Use caching to reduce provider abuse and cost.
- [ ] Do not expose provider keys to frontend.
- [ ] Add timeouts to external API calls.
- [ ] Add retries with backoff where appropriate.
- [ ] Clearly label stale or cached data.

## 8. AI Safety and Prompt Security

- [ ] Do not send unnecessary personal data to AI providers.
- [ ] Sanitize and structure wallet data before AI analysis.
- [ ] Avoid passing raw untrusted text directly into system prompts.
- [ ] Use fixed system prompts.
- [ ] Require structured AI output where possible.
- [ ] Validate AI responses before displaying.
- [ ] Add disclaimers that reports are informational, not financial advice.
- [ ] Prevent AI from giving direct buy/sell orders.
- [ ] Prevent AI from claiming certainty about future prices.
- [ ] Log AI errors safely without exposing sensitive data.

## 9. Frontend Security

- [ ] Do not store sensitive secrets in frontend code.
- [ ] Only expose environment variables with safe public values.
- [ ] Escape rendered content where needed.
- [ ] Avoid unsafe HTML rendering.
- [ ] Protect authenticated routes.
- [ ] Clear user state on logout.
- [ ] Handle expired sessions gracefully.
- [ ] Show clear errors without leaking backend internals.

## 10. Rate Limiting and Abuse Prevention

- [ ] Limit anonymous wallet analyses.
- [ ] Limit AI report generation per user plan.
- [ ] Limit login attempts.
- [ ] Limit signup abuse.
- [ ] Add IP-based throttling for public endpoints.
- [ ] Add user-based usage tracking for authenticated endpoints.
- [ ] Add bot protection later if public usage increases.

## 11. Logging and Monitoring

- [ ] Log backend errors.
- [ ] Log failed provider calls.
- [ ] Log AI provider errors.
- [ ] Do not log passwords.
- [ ] Do not log tokens.
- [ ] Do not log secrets.
- [ ] Monitor rate limit violations.
- [ ] Monitor failed login spikes.
- [ ] Add production error monitoring.

## 12. Deployment Security

- [ ] Enforce HTTPS.
- [ ] Set secure CORS origins.
- [ ] Use production environment variables.
- [ ] Disable debug mode in production.
- [ ] Use secure headers where possible.
- [ ] Keep dependencies updated.
- [ ] Run dependency vulnerability checks.
- [ ] Restrict database network access.
- [ ] Use managed database backups.

## 13. SaaS and Billing Security

When billing is added:

- [ ] Use a trusted payment provider.
- [ ] Verify webhook signatures.
- [ ] Do not store card details directly.
- [ ] Store payment provider IDs only.
- [ ] Check subscription status server-side.
- [ ] Prevent client-side plan spoofing.
- [ ] Add audit logs for plan changes.

## 14. Team and Enterprise Security

When team features are added:

- [ ] Add role-based access control.
- [ ] Validate team membership on every team resource.
- [ ] Add owner/admin/member/viewer roles.
- [ ] Add audit logs for team actions.
- [ ] Prevent users from accessing wallets outside their team.
- [ ] Add invitation expiry.
- [ ] Add member removal controls.

## 15. MVP Security Must-Haves

Before public demo, complete these:

- [ ] Read-only wallet analysis only
- [ ] No private key handling
- [ ] Public endpoint rate limiting
- [ ] Input validation
- [ ] CORS restriction
- [ ] Safe AI prompt design
- [ ] Financial advice disclaimer
- [ ] No hardcoded secrets
- [ ] `.env.example` included
- [ ] Production debug mode disabled
