"use client";

import { ArrowLeft, TrendingUp, TrendingDown, Minus, Settings, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button, CardSkeleton, EmptyState, ErrorState } from "@/components/ui";
import { useInjectiveMarket, type AssetMarketItem } from "@/hooks/useInjective";
import { formatAddress, formatCurrency } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatRelativeTime(ts: string): string {
  if (!ts) return "Unknown";
  try {
    const diff = Date.now() - new Date(ts).getTime();
    const secs = Math.floor(diff / 1000);
    if (secs < 60) return `${secs}s ago`;
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ago`;
  } catch {
    return ts;
  }
}

function formatChange(change: number): string {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div className="stat-card">
      <p className="section-label">{label}</p>
      <div className="text-xl font-bold text-text-primary">{value}</div>
      {sub && <div className="text-xs text-text-secondary">{sub}</div>}
    </div>
  );
}

function ChangeCell({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="flex items-center gap-0.5 text-success text-xs font-semibold">
        <TrendingUp className="h-3.5 w-3.5" />
        {formatChange(change)}
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="flex items-center gap-0.5 text-danger text-xs font-semibold">
        <TrendingDown className="h-3.5 w-3.5" />
        {formatChange(change)}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-0.5 text-text-muted text-xs">
      <Minus className="h-3.5 w-3.5" />
      {formatChange(change)}
    </span>
  );
}

function AssetTable({ assets }: { assets: AssetMarketItem[] }) {
  const sorted = [...assets].sort((a, b) => b.value_usd - a.value_usd);

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 pt-4 pb-3 border-b border-border">
        <h3 className="text-sm font-semibold text-text-primary">Asset Market Overview</h3>
        <p className="text-xs text-text-muted">Sorted by portfolio value</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-left">
              <th className="px-5 py-3 text-xs font-semibold text-text-muted">Asset</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-muted">Category</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-muted">Price (USD)</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-muted">24h Change</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-muted">Portfolio Value</th>
              <th className="px-5 py-3 text-xs font-semibold text-text-muted">% Portfolio</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((asset) => (
              <tr
                key={asset.symbol}
                className="border-b border-border/30 hover:bg-surface-2/50 transition-colors last:border-0"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-surface-3 border border-border flex items-center justify-center text-[9px] font-bold text-accent shrink-0">
                      {asset.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">{asset.symbol}</p>
                      <p className="text-[10px] text-text-muted">{asset.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="badge badge-primary text-[10px]">{asset.category}</span>
                </td>
                <td className="px-5 py-3 text-xs text-text-primary font-mono">
                  {asset.price > 0 ? `$${asset.price.toFixed(asset.price < 1 ? 6 : 2)}` : "—"}
                </td>
                <td className="px-5 py-3">
                  <ChangeCell change={asset.change24h} />
                </td>
                <td className="px-5 py-3 text-xs font-semibold text-text-primary">
                  {formatCurrency(asset.value_usd)}
                </td>
                <td className="px-5 py-3 text-xs text-text-secondary">
                  {asset.pct.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MarketInsightsPanel() {
  const insights = [
    {
      icon: TrendingUp,
      color: "#00C2FF",
      title: "Market Trend",
      body: "Monitor INJ for trend signals",
    },
    {
      icon: Zap,
      color: "#22C55E",
      title: "Asset Reliability",
      body: "Data from CoinGecko",
    },
    {
      icon: TrendingUp,
      color: "#7C3AED",
      title: "Injective Ecosystem",
      body: "Live Mainnet data",
    },
  ];

  return (
    <div className="glass-card p-5 space-y-4">
      <h3 className="text-sm font-semibold text-text-primary">Market Insights</h3>
      <div className="space-y-3">
        {insights.map(({ icon: Icon, color, title, body }) => (
          <div
            key={title}
            className="flex items-start gap-3 p-3 rounded-lg bg-surface-2 border border-border/50"
          >
            <div
              className="p-1.5 rounded-md shrink-0"
              style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color }} />
            </div>
            <div>
              <p className="text-xs font-semibold text-text-primary">{title}</p>
              <p className="text-[11px] text-text-muted">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main view
// ---------------------------------------------------------------------------

function MarketView({ address }: { address: string }) {
  const { data, isLoading, isError, refetch } = useInjectiveMarket(address);

  const changeIsPositive = (data?.inj_change_24h ?? 0) >= 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <Link
            href="/dashboard/injective"
            className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h1 className="text-xl font-bold text-text-primary">
            Injective <span className="gradient-text">Market Context</span>
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-text-muted bg-surface-2 border border-border rounded-md px-2 py-0.5">
              {formatAddress(address, 8)}
            </span>
            {data && (
              <span className="badge badge-accent text-[10px] flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Updated {formatRelativeTime(data.last_updated)}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-success text-xs">Add to Grade</span>
          <Button variant="secondary" size="sm" className="gap-2">
            <Settings className="h-4 w-4" /> Customize View
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
          <CardSkeleton />
        </div>
      ) : isError ? (
        <ErrorState
          title="Failed to load market data"
          message="Could not retrieve market context from Injective Mainnet."
          onRetry={() => refetch()}
        />
      ) : !data ? (
        <EmptyState
          icon={<TrendingUp className="h-8 w-8" />}
          title="No market data found"
          description="No market data is available for this address."
        />
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard
              label="Total Portfolio Value"
              value={formatCurrency(data.total_value_usd)}
            />
            <StatCard
              label="INJ Price"
              value={`$${data.inj_price.toFixed(2)}`}
              sub={
                <span
                  className={
                    changeIsPositive ? "text-success font-semibold" : "text-danger font-semibold"
                  }
                >
                  {formatChange(data.inj_change_24h)} 24h
                </span>
              }
            />
            <StatCard
              label="24h Change (INJ)"
              value={
                <span className={changeIsPositive ? "text-success" : "text-danger"}>
                  {formatChange(data.inj_change_24h)}
                </span>
              }
            />
            <StatCard
              label="Dominant Asset"
              value={data.dominant_asset}
              sub={`${data.dominant_pct.toFixed(1)}% of portfolio`}
            />
            <StatCard
              label="Last Updated"
              value={formatRelativeTime(data.last_updated)}
              sub={
                <span className="text-[10px] text-text-muted">
                  {data.last_updated
                    ? new Date(data.last_updated).toLocaleTimeString()
                    : "—"}
                </span>
              }
            />
          </div>

          {/* Main table + insights side panel */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              {data.asset_market_data.length === 0 ? (
                <EmptyState
                  icon={<TrendingUp className="h-8 w-8" />}
                  title="No assets found"
                  description="No asset market data available for this wallet."
                />
              ) : (
                <AssetTable assets={data.asset_market_data} />
              )}
            </div>
            <div className="lg:col-span-1">
              <MarketInsightsPanel />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MarketPage({ params }: { params: { address: string } }) {
  return (
    <DashboardLayout>
      <MarketView address={params.address} />
    </DashboardLayout>
  );
}
