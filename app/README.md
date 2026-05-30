<div align="center">

<img src="../docs/logo.png" alt="InjSight AI" width="90" />

# InjSight AI — Frontend

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)](https://injsight-ai.vercel.app)

</div>

---

## Overview

Next.js 14 App Router frontend for InjSight AI. 53 routes, zero mock data, dark fintech design system.

**Live:** https://injsight-ai.vercel.app

## Stack

- Next.js 14 + TypeScript + Tailwind CSS
- TanStack Query v5 — all server state
- Zustand — auth state with JWT persistence
- Recharts — portfolio and risk visualizations
- Supabase JS — Realtime subscriptions

## Development

```bash
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

npm install --legacy-peer-deps
npm run dev       # → http://localhost:3000
npm run build     # production build
npx tsc --noEmit  # type check (must be zero errors)
```

## Environment

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

[← Back to root README](../README.md)
