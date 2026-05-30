"use client";

import { ArrowLeft, ExternalLink, Layers, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CardSkeleton, EmptyState, ErrorState } from "@/components/ui";
import { useInjectiveStaking } from "@/hooks/useInjective";
import { formatAddress, formatCurrency } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Truncate a validator address for table display */
function shortValidator(v: string): string {
  if (!v) return "—";
  if (v.length <= 20) return v;
  return `${v.slice(0, 12)}...${v.slice(-8)}`;
}

/** Convert a short validator string to a plausible full operator address.
 *  The hook returns `validator` which may already be the full address; we
 *  use it verbatim for the Explorer link.
 */
function explorerValidatorUrl(validator: string): string {
  return `https://explorer.injective.network/validators/${encodeURIComponent(validator)}`;
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

// ---------------------------------------------------------------------------
// Main view
// ---------------------------------------------------------------------------

function StakingView({ address }: { address: string }) {
  const { data, isLoading, isError, refetch } = useInjectiveStaking(address);

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
            INJ <span className="gradient-text">Staking Positions</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-muted bg-surface-2 border border-border rounded-md px-2 py-0.5">
              {formatAddress(address, 8)}
            </span>
            <span className="badge-success text-xs">Live</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : isError ? (
        <ErrorState
          title="Failed to load staking data"
          message="Could not fetch staking positions from Injective Mainnet."
          onRetry={() => refetch()}
        />
      ) : !data ? (
        <EmptyState
          icon={<Layers className="h-8 w-8" />}
          title="No staking positions found. Stake INJ to earn rewards."
          description="Stake your INJ tokens with a validator to start earning staking rewards."
        />
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Total Staked INJ"
              value={`${data.total_staked_inj.toFixed(4)} INJ`}
            />
            <StatCard
              label="Staked USD Value"
              value={formatCurrency(data.total_staked_usd)}
            />
            <StatCard
              label="Total Rewards"
              value={
                <span className="text-success">
                  {data.total_rewards_inj.toFixed(6)} INJ
                </span>
              }
            />
            <StatCard
              label="INJ Price"
              value={`$${data.inj_price.toFixed(2)}`}
            />
          </div>

          {/* Delegations Table */}
          <div className="glass-card overflow-hidden">
            <div className="px-5 pt-4 pb-3 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Delegations</h3>
                <p className="text-xs text-text-muted">Active staking positions</p>
              </div>
              <span className="badge-primary">{data.delegations.length} validators</span>
            </div>

            {data.delegations.length === 0 ? (
              <EmptyState
                icon={<Layers className="h-7 w-7" />}
                title="No staking positions found. Stake INJ to earn rewards."
                description="Delegate your INJ to a validator to start earning rewards."
                className="py-10"
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 text-left">
                      <th className="px-5 py-3 text-xs font-semibold text-text-muted">Validator</th>
                      <th className="px-5 py-3 text-xs font-semibold text-text-muted">Staked Amount (INJ)</th>
                      <th className="px-5 py-3 text-xs font-semibold text-text-muted">USD Value</th>
                      <th className="px-5 py-3 text-xs font-semibold text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.delegations.map((d, i) => {
                      const usdValue = d.amount * data.inj_price;
                      return (
                        <tr
                          key={`${d.validator}-${i}`}
                          className="border-b border-border/30 hover:bg-surface-2/50 transition-colors last:border-0"
                        >
                          <td className="px-5 py-3">
                            <span className="font-mono text-xs text-text-primary">
                              {shortValidator(d.validator)}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-xs font-semibold text-text-primary font-mono">
                            {d.amount.toFixed(6)} INJ
                          </td>
                          <td className="px-5 py-3 text-xs text-text-secondary">
                            {formatCurrency(usdValue)}
                          </td>
                          <td className="px-5 py-3">
                            <a
                              href={explorerValidatorUrl(d.validator)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
                            >
                              Explorer <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pending Rewards Table */}
          <div className="glass-card overflow-hidden">
            <div className="px-5 pt-4 pb-3 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Pending Rewards</h3>
                <p className="text-xs text-text-muted">Claimable staking rewards per validator</p>
              </div>
              <span className="badge-success">
                {formatCurrency(data.total_rewards_usd)} total
              </span>
            </div>

            {data.rewards.length === 0 ? (
              <div className="px-5 py-6 text-center text-xs text-text-muted italic">
                No pending rewards at this time.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 text-left">
                      <th className="px-5 py-3 text-xs font-semibold text-text-muted">Validator</th>
                      <th className="px-5 py-3 text-xs font-semibold text-text-muted">
                        Pending Rewards (INJ)
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold text-text-muted">USD Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rewards.map((r, i) => {
                      const usdValue = r.amount * data.inj_price;
                      return (
                        <tr
                          key={`${r.validator}-${i}`}
                          className="border-b border-border/30 hover:bg-surface-2/50 transition-colors last:border-0"
                        >
                          <td className="px-5 py-3 font-mono text-xs text-text-primary">
                            {shortValidator(r.validator)}
                          </td>
                          <td className="px-5 py-3 text-xs font-semibold text-success font-mono">
                            {r.amount.toFixed(8)} INJ
                          </td>
                          <td className="px-5 py-3 text-xs text-text-secondary">
                            {formatCurrency(usdValue)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Read-only note */}
          <div className="glass-card p-4 flex items-start gap-3 border-l-2 border-l-warning">
            <ShieldCheck className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary leading-relaxed">
              InjSight is read-only. Use the{" "}
              <a
                href="https://hub.injective.network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Injective Hub
              </a>{" "}
              or a wallet app to stake.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function StakingPage({ params }: { params: { address: string } }) {
  return (
    <DashboardLayout>
      <StakingView address={params.address} />
    </DashboardLayout>
  );
}
