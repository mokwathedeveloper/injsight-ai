"use client";

import { ArrowLeft, Download, Database, Layers, TrendingUp } from "lucide-react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button, CardSkeleton, EmptyState, ErrorState } from "@/components/ui";
import { useInjectiveEcosystem } from "@/hooks/useInjective";
import { formatAddress, formatCurrency } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<string, string> = {
  Native:     "#0066FF",
  Stablecoin: "#22C55E",
  DeFi:       "#7C3AED",
  Staking:    "#00C2FF",
  Unknown:    "#484F58",
};

function getCategoryColor(name: string): string {
  return CATEGORY_COLORS[name] ?? "#484F58";
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
      <p className="text-xl font-bold text-text-primary">{value}</p>
      {sub && <div className="text-xs text-text-secondary">{sub}</div>}
    </div>
  );
}

interface CategoryItem {
  name: string;
  value_usd: number;
  pct: number;
}

function DonutChart({
  categories,
  totalValueUsd,
}: {
  categories: CategoryItem[];
  totalValueUsd: number;
}) {
  const chartData = categories.map((c) => ({
    name: c.name,
    value: c.pct > 0 ? c.pct : 0.01, // keep tiny slice visible
    value_usd: c.value_usd,
    pct: c.pct,
  }));

  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">Portfolio Breakdown</h3>
        <p className="text-xs text-text-muted">By category</p>
      </div>

      {/* Chart */}
      <div className="relative flex items-center justify-center">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={getCategoryColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload as {
                  name: string;
                  pct: number;
                  value_usd: number;
                };
                return (
                  <div className="glass-card px-3 py-2 text-xs">
                    <p className="font-semibold text-text-primary">{d.name}</p>
                    <p className="text-text-secondary">
                      {d.pct.toFixed(1)}% · {formatCurrency(d.value_usd)}
                    </p>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-base font-bold text-text-primary">
            {formatCurrency(totalValueUsd)}
          </p>
          <p className="text-[10px] text-text-muted">Total Value</p>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: getCategoryColor(cat.name) }}
              />
              <span className="text-xs text-text-secondary">{cat.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-muted w-12 text-right">
                {cat.pct.toFixed(1)}%
              </span>
              <span className="text-xs font-semibold text-text-primary w-20 text-right">
                {formatCurrency(cat.value_usd)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryBars({ categories }: { categories: CategoryItem[] }) {
  const max = Math.max(...categories.map((c) => c.pct), 1);

  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">Exposure by Category</h3>
        <p className="text-xs text-text-muted">Portfolio weight</p>
      </div>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-text-primary">{cat.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">{formatCurrency(cat.value_usd)}</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: getCategoryColor(cat.name) }}
                >
                  {cat.pct.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(cat.pct / max) * 100}%`,
                  background: getCategoryColor(cat.name),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopTokens({
  tokens,
}: {
  tokens: { symbol: string; name: string; value_usd: number; percent: number }[];
}) {
  return (
    <div className="glass-card p-5 flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">Top Ecosystem Token Exposures</h3>
        <p className="text-xs text-text-muted">By portfolio weight</p>
      </div>
      {tokens.length === 0 ? (
        <p className="text-xs text-text-muted italic">No token data available.</p>
      ) : (
        <div className="space-y-3">
          {tokens.map((token) => (
            <div
              key={token.symbol}
              className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-surface-3 flex items-center justify-center text-[10px] font-bold text-accent border border-border shrink-0">
                  {token.symbol.slice(0, 3)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-primary">{token.symbol}</p>
                  <p className="text-[10px] text-text-muted">{token.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-text-primary">
                  {formatCurrency(token.value_usd)}
                </p>
                <p className="text-[10px] text-text-muted">{token.percent.toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main view
// ---------------------------------------------------------------------------

function EcosystemView({ address }: { address: string }) {
  const { data, isLoading, isError, refetch } = useInjectiveEcosystem(address);

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
            Injective <span className="gradient-text">Ecosystem Exposure</span>
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-text-muted bg-surface-2 border border-border rounded-md px-2 py-0.5">
              {formatAddress(address, 8)}
            </span>
            {data && (
              <span className="badge-primary">
                <Database className="h-3 w-3 inline mr-1" />
                {data.data_sources?.length ?? 0} sources
              </span>
            )}
          </div>
        </div>
        <Button variant="secondary" size="sm">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : isError ? (
        <ErrorState
          title="Failed to load ecosystem data"
          message="Could not retrieve ecosystem exposure from Injective Mainnet."
          onRetry={() => refetch()}
        />
      ) : !data ? (
        <EmptyState
          icon={<Layers className="h-8 w-8" />}
          title="No ecosystem data found"
          description="No portfolio data is available for this address."
        />
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Total Value"
              value={formatCurrency(data.total_value_usd)}
            />
            <StatCard
              label="Ecosystem Exposure"
              value={`${data.ecosystem_exposure_pct.toFixed(1)}%`}
            />
            <StatCard
              label="Native Assets"
              value={data.categories.length}
              sub="categories"
            />
            <StatCard
              label="Data Sources"
              value={data.data_sources.length}
              sub={data.data_sources.join(", ")}
            />
          </div>

          {/* Three-column breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DonutChart categories={data.categories} totalValueUsd={data.total_value_usd} />
            <CategoryBars categories={data.categories} />
            <TopTokens tokens={data.top_tokens} />
          </div>

          {/* Staking section */}
          {data.staking && data.staking.delegations.length > 0 && (
            <div className="glass-card p-5 space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-semibold text-text-primary">Staking Summary</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="section-label">Total Staked</p>
                  <p className="text-base font-bold text-text-primary">
                    {data.staking.total_staked_inj.toFixed(4)} INJ
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="section-label">Staked Value</p>
                  <p className="text-base font-bold text-text-primary">
                    {formatCurrency(data.staking.total_staked_usd)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="section-label">Pending Rewards</p>
                  <p className="text-base font-bold text-success">
                    {data.staking.total_rewards_inj.toFixed(6)} INJ
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="section-label">Delegations</p>
                  <p className="text-base font-bold text-text-primary">
                    {data.staking.delegations.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EcosystemPage({ params }: { params: { address: string } }) {
  return (
    <DashboardLayout>
      <EcosystemView address={params.address} />
    </DashboardLayout>
  );
}
