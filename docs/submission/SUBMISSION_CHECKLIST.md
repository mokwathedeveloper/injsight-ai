# Hackathon Submission Checklist — InjSight AI

**Event:** Injective Solo AI Builder Sprint — May 11–31, 2026
**Submit via:** https://xsxo494365r.typeform.com/to/uT6R8vhf

---

## Typeform Submission Fields

| Field | Status | Value |
|---|---|---|
| Project name | ✅ Ready | `InjSight AI` |
| GitHub repository | ✅ Ready | `https://github.com/mokwathedeveloper/injsight-ai` (branch: `trunc`) |
| Demo link | ✅ Live | `https://injsight-ai.vercel.app` |
| Short description | ✅ Ready | See below |
| Demo video | 🔜 Record | See recording guide below |

**Short description (under 200 chars):**
> AI-powered wallet intelligence for Injective DeFi. Paste any inj1 address — get live risk scores, portfolio composition, LangChain AI reports, and wallet chat. No private keys. No wallet connection.

---

## GitHub Repository Requirements

| Requirement | Status |
|---|---|
| Public repository | ✅ `mokwathedeveloper/injsight-ai` |
| Branch `trunc` is the main branch | ✅ |
| README explains how AI is used | ✅ README.md — LangChain agent, OpenRouter, 4 tools |
| README explains Injective integration | ✅ README.md — LCD API, staking, transactions, ecosystem |
| README explains what project does | ✅ README.md — comprehensive |
| README explains how users interact | ✅ README.md — Quick Start section |
| LICENSE file present | ✅ MIT License |
| WHITEPAPER.md | ✅ Technical deep-dive |
| SECURITY.md | ✅ Security policy + audit findings |
| CHANGELOG.md | ✅ Version history |

---

## Twitter / X Post Checklist

Post **4 separate tweets** (1 per checkpoint):

- [ ] **Tweet 1 — Idea:** "Building InjSight AI for @injective DeFi — paste any inj1 address, get AI risk scores and portfolio analysis. No private keys. 🔒 #Injective #DeFi #AI @NinjaLabsHQ @NinjaLabsCN"
- [ ] **Tweet 2 — Design:** "53 screens designed before writing code. Dark fintech UI — risk cards, AI chat, treasury, mobile. 🎨 #Injective #AI @injective @NinjaLabsHQ @NinjaLabsCN"
- [ ] **Tweet 3 — Development:** "⚙️ Built: Next.js 14 + FastAPI + LangChain agent + Injective Mainnet LCD. Zero mock data. 53 routes all live. github.com/mokwathedeveloper/injsight-ai #Injective @injective @NinjaLabsHQ @NinjaLabsCN"
- [ ] **Tweet 4 — Launch:** "🚀 InjSight AI is LIVE — AI wallet intelligence for @injective DeFi. Live risk scores, OpenRouter AI, wallet chat, staking data. → injsight-ai.vercel.app #Injective #AI @NinjaLabsHQ @NinjaLabsCN"

**Each tweet must include:**
- ✅ What the project does
- ✅ GitHub link or demo link
- ✅ `@injective @NinjaLabsHQ @NinjaLabsCN` tags
- ✅ Screenshots (adds 3× engagement)

---

## Demo Video Guide (2–3 minutes)

Record screen at 1280×720 or higher. Upload to YouTube (unlisted) or Loom.

**Script:**

```
0:00 — Open https://injsight-ai.vercel.app
0:10 — Show landing page, explain "AI wallet intelligence for Injective DeFi"
0:20 — Paste real inj1 address, click Analyze
0:35 — Show live portfolio: token balances, CoinGecko prices, risk score
0:50 — Show AI Report: OpenRouter AI-generated summary, next steps
1:05 — Click "Ask Your Wallet" — type "What is the biggest risk?"
1:20 — Show real-time AI response with wallet context
1:30 — Navigate to Dashboard — show real KPI cards
1:45 — Show Insights page — click Generate Insights
2:00 — Show Injective Hub — Ecosystem Exposure page
2:15 — Show live INJ price, staking positions, ecosystem breakdown
2:30 — Close with GitHub link and URLs
```

---

## Technical Checklist

| Area | Status |
|---|---|
| Frontend deployed on Vercel | ✅ `injsight-ai.vercel.app` |
| Backend deployed on Render | ✅ `injsight-ai-backend.onrender.com` |
| Database migrated (Supabase) | ✅ 7 tables, all migrations applied |
| OpenRouter AI working | ✅ Verified live |
| Injective LCD integration | ✅ Real Mainnet data |
| Auth working (login/signup) | ✅ JWT, tested |
| All 53 routes returning 200 | ✅ Last verified May 30, 2026 |
| TypeScript: zero errors | ✅ `npx tsc --noEmit` clean |
| Footer links all working | ✅ changelog, docs, api, blog, about, privacy, terms |
| Mobile responsive | ✅ Sidebar drawer, touch targets ≥44px |

---

*InjSight AI Submission Checklist — May 30, 2026*
