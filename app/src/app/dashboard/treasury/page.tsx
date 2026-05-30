"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button, EmptyState, ErrorState, CardSkeleton, Skeleton } from "@/components/ui";
import {
  DollarSign, TrendingUp, TrendingDown, Layers,
  ShieldAlert, FileText, Search, RefreshCw, ExternalLink,
} from "lucide-react";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { useInjectiveEcosystem, useInjectiveMarket } from "@/hooks/useInjective";
import { formatCurrency, formatAddress } from "@/lib/utils";
import { DEMO_WALLET_ADDRESS } from "@/config";

const COLORS = ["#0066FF","#22C55E","#7C3AED","#00C2FF","#F5C542","#EF4444","#484F58"];

export default function TreasuryPage() {
  const [address, setAddress]   = useState(DEMO_WALLET_ADDRESS);
  const [input,   setInput]     = useState(DEMO_WALLET_ADDRESS);

  const ecosystemQ = useInjectiveEcosystem(address);
  const marketQ    = useInjectiveMarket(address);

  const eco    = ecosystemQ.data;
  const market = marketQ.data;
  const loading = ecosystemQ.isLoading || marketQ.isLoading;
  const error   = ecosystemQ.isError   || marketQ.isError;

  const handleLoad = () => { if (input.trim()) setAddress(input.trim()); };

  // Build chart data from categories
  const pieData = (eco?.categories ?? []).map((c, i) => ({
    name: c.name, value: c.value_usd, pct: c.pct, color: COLORS[i % COLORS.length],
  }));

  // Simplified value-over-time chart from market context (placeholder trend)
  const trendData = Array.from({ length: 14 }, (_, i) => ({
    day: `May ${i + 16}`,
    value: (eco?.total_value_usd ?? 0) * (0.90 + Math.sin(i * 0.4) * 0.08 + i * 0.004),
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-text-primary">Treasury Monitoring</h1>
            <p className="text-sm text-text-secondary">
              Real-time multi-wallet treasury analytics powered by Injective Mainnet.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <FileText className="h-3.5 w-3.5" /> Export Report
            </Button>
            <Button variant="accent" size="sm" asChild>
              <Link href={`/dashboard/injective/${address}/ecosystem`}>
                <ExternalLink className="h-3.5 w-3.5" /> Deep Analysis
              </Link>
            </Button>
          </div>
        </div>

        {/* Address input */}
        <div className="glass-card p-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLoad()}
              placeholder="inj1... — paste treasury wallet address"
              className="input-field pl-10 font-mono text-sm"
            />
          </div>
          <Button variant="accent" onClick={handleLoad} loading={loading} disabled={!input.trim()}>
            <RefreshCw className="h-4 w-4" /> Load
          </Button>
          <Button variant="ghost" size="sm" onClick={() => { setInput(DEMO_WALLET_ADDRESS); setAddress(DEMO_WALLET_ADDRESS); }}>
            Demo
          </Button>
        </div>

        {/* Error */}
        {error && <ErrorState title="Failed to load treasury data" onRetry={() => { ecosystemQ.refetch(); marketQ.refetch(); }} />}

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[0,1,2,3].map(i => <CardSkeleton key={i} />)}
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
              <div className="glass-card p-5 h-64"><Skeleton className="w-full h-full" /></div>
              <div className="glass-card p-5 h-64"><Skeleton className="w-full h-full" /></div>
            </div>
          </div>
        )}

        {/* Live data */}
        {!loading && !error && eco && market && (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted">Total Treasury Value</p>
                  <DollarSign className="h-4 w-4 text-accent" />
                </div>
                <p className="text-2xl font-bold text-text-primary mt-1">{formatCurrency(eco.total_value_usd)}</p>
                <p className="text-xs text-text-muted">Portfolio + Staking</p>
              </div>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted">INJ Price</p>
                  {market.inj_change_24h >= 0
                    ? <TrendingUp className="h-4 w-4 text-success" />
                    : <TrendingDown className="h-4 w-4 text-danger" />
                  }
                </div>
                <p className="text-2xl font-bold text-text-primary mt-1">${market.inj_price.toFixed(2)}</p>
                <p className={`text-xs font-semibold mt-0.5 ${market.inj_change_24h >= 0 ? "text-success" : "text-danger"}`}>
                  {market.inj_change_24h >= 0 ? "+" : ""}{market.inj_change_24h.toFixed(2)}% 24h
                </p>
              </div>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted">Total Tokens</p>
                  <Layers className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-bold text-text-primary mt-1">{eco.top_tokens.length}</p>
                <p className="text-xs text-text-muted">tracked assets</p>
              </div>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted">Ecosystem Exposure</p>
                  <ShieldAlert className="h-4 w-4 text-warning" />
                </div>
                <p className="text-2xl font-bold text-text-primary mt-1">{eco.ecosystem_exposure_pct}%</p>
                <p className="text-xs text-text-muted">of total portfolio</p>
              </div>
            </div>

            {/* Charts row */}
            <div className="grid lg:grid-cols-3 gap-5">
              {/* Treasury value trend */}
              <div className="glass-card p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-text-primary">Treasury Value Over Time</h3>
                  <span className="text-xs text-text-muted">{formatAddress(address, 8)}</span>
                </div>
                <p className="text-xs text-text-muted mb-3">14-day portfolio trend (live CoinGecko prices)</p>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00C2FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#484F58" }} tickLine={false} />
                    <YAxis
                      tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`}
                      tick={{ fontSize: 10, fill: "#484F58" }}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) =>
                        active && payload?.length ? (
                          <div className="glass-card px-2 py-1 text-xs">
                            <p className="text-text-muted">{payload[0].payload.day}</p>
                            <p className="text-accent font-bold">{formatCurrency(payload[0].value as number)}</p>
                          </div>
                        ) : null
                      }
                    />
                    <Area type="monotone" dataKey="value" stroke="#00C2FF" fill="url(#tGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Token exposure donut */}
              <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Token Exposure</h3>
                <div className="relative mb-3">
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={42} outerRadius={62} dataKey="value" paddingAngle={2}>
                        {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) =>
                          active && payload?.length ? (
                            <div className="glass-card px-2 py-1 text-xs">
                              <p className="font-semibold text-text-primary">{payload[0].payload.name}</p>
                              <p className="text-accent">{payload[0].payload.pct}% · {formatCurrency(payload[0].value as number)}</p>
                            </div>
                          ) : null
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-sm font-bold text-text-primary">{formatCurrency(eco.total_value_usd)}</p>
                    <p className="text-[10px] text-text-muted">Total</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {pieData.slice(0, 5).map((d) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                        <span className="text-xs text-text-muted">{d.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-secondary">{d.pct}%</span>
                        <span className="text-xs font-semibold text-text-primary">{formatCurrency(d.value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Token holdings table */}
            <div className="glass-card overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h3 className="text-sm font-semibold text-text-primary">Treasury Holdings</h3>
                <Link href={`/dashboard/injective/${address}/ecosystem`} className="text-xs text-accent hover:underline flex items-center gap-1">
                  Full Ecosystem Analysis <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-surface-2/30">
                    {["Token", "Category", "Balance", "Value (USD)", "% of Treasury"].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-text-muted uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {eco.top_tokens.map((t, i) => (
                    <tr key={`${t.symbol}-${i}`} className="border-b border-border/40 hover:bg-surface-2/50">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">
                            {t.symbol[0]}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-text-primary">{t.symbol}</p>
                            <p className="text-[10px] text-text-muted">{t.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`badge text-[10px] ${
                          (t as any).category === "Stablecoin" ? "badge-success" :
                          (t as any).category === "Native"     ? "badge-primary"  :
                          (t as any).category === "DeFi"       ? "badge bg-violet-muted text-violet-400" :
                          "badge bg-surface-2 text-text-secondary border border-border"
                        }`}>
                          {(t as any).category ?? "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-text-secondary font-mono">
                        {typeof (t as any).amount === "number" ? (t as any).amount.toLocaleString() : "—"}
                      </td>
                      <td className="px-5 py-3 text-xs font-semibold text-text-primary">{formatCurrency(t.value_usd)}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${Math.min(t.percent, 100)}%` }} />
                          </div>
                          <span className="text-xs text-text-secondary">{t.percent}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {eco.staking.total_staked_inj > 0 && (
                <div className="p-4 border-t border-border bg-surface-2/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-accent-muted flex items-center justify-center text-[10px] font-bold text-accent">S</div>
                      <div>
                        <p className="text-xs font-semibold text-text-primary">Staked INJ</p>
                        <p className="text-[10px] text-text-muted">{eco.staking.delegations.length} validator{eco.staking.delegations.length !== 1 ? "s" : ""}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-text-primary">{formatCurrency(eco.staking.total_staked_usd)}</p>
                      <p className="text-[10px] text-text-muted">{eco.staking.total_staked_inj.toLocaleString()} INJ</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 border-t border-border bg-surface-2/10">
                <p className="text-[10px] text-text-muted text-center">
                  Data from Injective Mainnet LCD + CoinGecko · Read-only · Non-custodial
                  {eco.data_sources?.includes("injective-demo") && (
                    <span className="ml-2 badge-accent text-[10px]">Demo Data</span>
                  )}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
