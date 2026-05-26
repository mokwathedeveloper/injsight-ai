# InjSight AI — Development Roadmap

## 1. Roadmap Goal

The roadmap should guide the project from a clean technical foundation to a working MVP, then toward a SaaS-ready product.

The first priority is a professional, working vertical slice:

```txt
Landing page → wallet input → Injective data fetch → AI analysis → risk score → report display
```

## 2. Phase 0 — Product and Documentation Foundation

### Objectives

- Lock product direction
- Define MVP scope
- Create architecture documents
- Confirm stack and folder structure
- Prepare README

### Tasks

- Create project repository: `injsight-ai`
- Add `docs/` directory
- Add foundation documents
- Add README
- Add license
- Add `.gitignore`
- Add `.env.example`

### Deliverables

- Project foundation document
- MVP feature list
- Backend architecture plan
- Database design plan
- API endpoint plan
- Development roadmap
- Security checklist

## 3. Phase 1 — Repository and Frontend Setup

### Objectives

Create a clean frontend foundation.

### Tasks

- Initialize Next.js app
- Add TypeScript
- Add Tailwind CSS
- Add basic layout
- Add landing page
- Add wallet analyzer page
- Add reusable UI components
- Add environment variables
- Add API client

### Frontend pages

- `/`
- `/analyze`
- `/pricing`
- `/login`
- `/signup`
- `/dashboard`

### Deliverables

- Professional landing page
- Wallet input UI
- Demo wallet button
- Responsive layout
- Basic brand styling

## 4. Phase 2 — Backend Setup

### Objectives

Create secure API foundation.

### Tasks

- Initialize Python backend
- Add application factory
- Add configuration system
- Add database connection
- Add Redis connection
- Add health endpoint
- Add CORS rules
- Add validation system
- Add structured error responses
- Add logging

### Deliverables

- Running backend server
- `/api/health`
- Environment configuration
- Database connected
- Redis connected
- Test setup

## 5. Phase 3 — Injective Data Integration

### Objectives

Fetch and normalize Injective wallet data.

### Tasks

- Add Injective integration module
- Validate wallet address format
- Fetch wallet balances
- Normalize token balance output
- Add token metadata handling
- Add provider error handling
- Add caching
- Add demo wallet fallback

### Deliverables

- `/api/public/demo-wallet`
- `/api/public/analyze-wallet`
- Real or documented Injective data fetch
- Normalized wallet data object
- Token balance display in frontend

## 6. Phase 4 — AI Analysis and Risk Score

### Objectives

Turn wallet data into intelligence.

### Tasks

- Create risk scoring function
- Define risk dimensions
- Create AI prompt template
- Call AI model provider
- Return structured AI output
- Add safety guardrails
- Display AI report on frontend

### Deliverables

- Wallet summary
- Risk score
- Concentration analysis
- Suggested next steps
- Injective ecosystem context
- Report UI

## 7. Phase 5 — Authentication and Saved Wallets

### Objectives

Move from one-time tool to SaaS foundation.

### Tasks

- Add user signup
- Add login
- Add logout
- Add JWT authentication
- Add password hashing
- Add current user endpoint
- Add saved wallets CRUD
- Add dashboard page
- Add protected routes

### Deliverables

- Auth system
- User dashboard
- Saved wallets
- Re-analyze saved wallet
- Usage tracking

## 8. Phase 6 — Reports and History

### Objectives

Make analysis persistent and useful over time.

### Tasks

- Store analysis runs
- Store AI reports
- Store risk scores
- Show analysis history
- Add report detail page
- Add export as Markdown or JSON
- Add delete report feature

### Deliverables

- Historical wallet reports
- Report page
- Export function
- User-owned analysis data

## 9. Phase 7 — Alerts and Watchlists

### Objectives

Increase retention and SaaS value.

### Tasks

- Add wallet watchlists
- Add risk score change alerts
- Add large balance change alerts
- Add alert center
- Add read/unread state
- Add background refresh jobs

### Deliverables

- Watchlist page
- Alerts page
- Risk change alerts
- Background wallet monitoring

## 10. Phase 8 — SaaS Packaging

### Objectives

Make the product look and operate like a serious SaaS.

### Tasks

- Add pricing page
- Add plan limits
- Add usage tracking
- Add billing placeholder
- Add team plan messaging
- Add upgrade CTAs
- Add product analytics

### Deliverables

- Free/Pro/Team/Enterprise pricing
- Usage limits
- SaaS-ready UI
- Upgrade paths

## 11. Phase 9 — Testing and Quality

### Objectives

Make the product reliable.

### Tasks

- Backend unit tests
- API integration tests
- Frontend component tests
- Wallet analysis service tests
- Mock Injective provider tests
- AI response validation tests
- Security tests
- Type checks
- Linting

### Deliverables

- Passing test suite
- CI checks
- Build verification
- Error handling coverage

## 12. Phase 10 — Deployment and Demo

### Objectives

Ship a working public product.

### Tasks

- Deploy frontend
- Deploy backend
- Configure production database
- Configure Redis
- Set environment variables
- Add monitoring
- Record demo video
- Update README
- Prepare hackathon submission

### Deliverables

- Live app URL
- GitHub repo
- README
- Demo video
- Submission-ready project

## 13. Recommended Build Order

Use this order for fastest progress:

1. Landing page
2. Wallet analyzer UI
3. Demo wallet mode
4. Backend health endpoint
5. Injective wallet fetch
6. AI report generation
7. Risk score
8. Report display UI
9. Authentication
10. Saved wallets
11. Reports history
12. Alerts
13. Pricing page
14. Deployment
15. Demo video

## 14. MVP Completion Checklist

- [ ] Repo created as `injsight-ai`
- [ ] README written
- [ ] Landing page complete
- [ ] Wallet analyzer page complete
- [ ] Injective wallet data fetch working
- [ ] Demo wallet works
- [ ] AI report generated
- [ ] Risk score generated
- [ ] Report displayed cleanly
- [ ] Security disclaimer included
- [ ] No private key handling
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Demo video recorded
- [ ] Hackathon submission ready
