# Performance Benchmarks — InjSight AI

## Summary

InjSight AI's in-memory caching layer delivers production-grade performance without Redis or external cache infrastructure.

---

## API Response Times

| Operation | Cold (uncached) | Warm (cached) | TTL | Improvement |
|---|---|---|---|---|
| **Full wallet analysis** | 18,800 ms | **37 ms** | 3 min | **508×** |
| **CoinGecko prices** | ~800 ms | **< 1 ms** | 5 min | **800×** |
| **Injective LCD balances** | ~400 ms | **< 1 ms** | 2 min | **400×** |
| **AI report (OpenRouter)** | ~15,000 ms | **< 1 ms** (cached) | 3 min | **15,000×** |
| **Insights generation** | ~2,000 ms | ~200 ms (DB query) | — | **10×** |
| **Backend health check** | 12 ms | — | — | — |

### Benchmark Methodology

All times measured with `time curl` against `https://injsight-ai-backend.onrender.com`:

```bash
# Cold call
time curl -s -X POST https://injsight-ai-backend.onrender.com/api/public/analyze-wallet \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"inj14au322k9munkmx5wrchz9q30juf5wjgz2cfqku"}'

# Warm call (same address, within 3 minutes)
time curl -s -X POST https://injsight-ai-backend.onrender.com/api/public/analyze-wallet \
  -H "Content-Type: application/json" \
  -d '{"walletAddress":"inj14au322k9munkmx5wrchz9q30juf5wjgz2cfqku"}'
```

---

## Asset Size Comparison

| Asset | Before | After | Reduction |
|---|---|---|---|
| `logo.png` | 866 KB | — | Replaced |
| `logo.svg` | — | **705 B** | **1,229× smaller** |
| First Load JS (shared) | — | **84.4 KB** | Optimised |
| Recharts chunk (split) | In main bundle | **Separate chunk** | Lazy loaded |

---

## Frontend Build Output

```
Route                                  Size      First Load JS
─────────────────────────────────────────────────────────────
○ /                                  3.12 kB         107 kB
○ /analyze                           1.82 kB         106 kB
○ /dashboard                         2.45 kB         160 kB
○ /dashboard/insights                2.18 kB         158 kB
λ /dashboard/chat                    4.21 kB         189 kB
λ /dashboard/wallets/[id]            1.95 kB         145 kB
○ /pricing                           2.17 kB         105 kB
+ First Load JS shared by all:       84.4 kB
```

All 53 routes compiled successfully. Zero TypeScript errors.

---

## Cache Architecture

```python
# backend/app/core/cache.py — in-memory TTL cache

PRICE_TTL    = 300   # 5 min  — CoinGecko prices
BALANCE_TTL  = 120   # 2 min  — Injective LCD balances
ANALYSIS_TTL = 180   # 3 min  — full analysis (portfolio + risk + AI report)
STAKING_TTL  = 300   # 5 min  — staking delegations
```

Cache keys:
- `coingecko:prices` — shared across all requests
- `lcd:balances:{address}` — per wallet address
- `analysis:{address.lower()}` — per wallet analysis result

*InjSight AI Performance Benchmarks v1.0 — May 2026*
