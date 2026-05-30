"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Copy,
  ExternalLink,
  Search,
  Activity,
  CheckCircle,
  XCircle,
  Database,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button, CardSkeleton, EmptyState, ErrorState, Select } from "@/components/ui";
import { useInjectiveTransactions, type Transaction } from "@/hooks/useInjective";
import { formatAddress } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function truncateHash(hash: string): string {
  if (hash.length <= 16) return hash;
  return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
}

function formatFee(fee: number): string {
  return fee > 0 ? fee.toFixed(6) : "0.000000";
}

function formatTime(ts: string): string {
  if (!ts) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(ts));
  } catch {
    return ts;
  }
}

function countUniqueTypes(txs: Transaction[]): number {
  return new Set(txs.map((t) => t.type)).size;
}

const TX_TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "Transfer", label: "Transfer" },
  { value: "Send", label: "Send" },
  { value: "Delegate", label: "Delegate" },
  { value: "Undelegate", label: "Undelegate" },
  { value: "WithdrawReward", label: "Withdraw Reward" },
  { value: "Swap", label: "Swap" },
];

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

function TxRow({ tx }: { tx: Transaction }) {
  const [copied, setCopied] = useState(false);

  async function copyHash() {
    await navigator.clipboard.writeText(tx.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <tr className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
      {/* Hash */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-text-primary">{truncateHash(tx.hash)}</span>
          <button
            onClick={copyHash}
            className="text-text-muted hover:text-accent transition-colors"
            title="Copy hash"
          >
            {copied ? (
              <CheckCircle className="h-3.5 w-3.5 text-success" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </td>
      {/* Type */}
      <td className="px-4 py-3">
        <span className="badge badge-primary text-xs">{tx.type || "Unknown"}</span>
      </td>
      {/* Height */}
      <td className="px-4 py-3 text-xs text-text-secondary font-mono">
        {tx.height ? tx.height.toLocaleString() : "—"}
      </td>
      {/* Fee */}
      <td className="px-4 py-3 text-xs text-text-primary font-mono">
        {formatFee(tx.fee)} INJ
      </td>
      {/* Status */}
      <td className="px-4 py-3">
        {tx.status === "success" ? (
          <span className="badge-success flex items-center gap-1 w-fit">
            <CheckCircle className="h-3 w-3" /> Success
          </span>
        ) : (
          <span className="badge-danger flex items-center gap-1 w-fit">
            <XCircle className="h-3 w-3" /> Failed
          </span>
        )}
      </td>
      {/* Time */}
      <td className="px-4 py-3 text-xs text-text-secondary whitespace-nowrap">
        {formatTime(tx.timestamp)}
      </td>
      {/* Actions */}
      <td className="px-4 py-3">
        <a
          href={`https://explorer.injective.network/transaction/${tx.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
        >
          Explorer <ExternalLink className="h-3 w-3" />
        </a>
      </td>
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Main view
// ---------------------------------------------------------------------------

function TransactionsView({ address }: { address: string }) {
  const { data, isLoading, isError, refetch } = useInjectiveTransactions(address);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const transactions = data?.transactions ?? [];

  const filtered = transactions.filter((tx) => {
    const matchType = typeFilter === "all" || tx.type === typeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      tx.hash.toLowerCase().includes(q) ||
      tx.type.toLowerCase().includes(q) ||
      String(tx.height).includes(q);
    return matchType && matchSearch;
  });

  const isLive = data?.data_source?.toLowerCase().includes("lcd");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/injective"
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </div>
          <h1 className="text-xl font-bold text-text-primary">
            Injective <span className="gradient-text">Transaction Activity</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-muted bg-surface-2 border border-border rounded-md px-2 py-0.5">
              {formatAddress(address, 8)}
            </span>
            {data && (
              <span className={isLive ? "badge-success" : "badge-accent"}>
                {isLive ? "Live" : "Demo"}
              </span>
            )}
          </div>
        </div>
        <Button variant="secondary" size="sm" className="gap-2">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      {/* Stats */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState
          title="Failed to load transactions"
          message="Could not fetch transaction data from Injective Mainnet."
          onRetry={() => refetch()}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Transactions" value={data?.total_count ?? 0} />
            <StatCard
              label="Unique Types"
              value={countUniqueTypes(transactions)}
            />
            <StatCard
              label="Data Source"
              value={
                <span className="badge-primary text-xs">
                  <Database className="h-3 w-3 inline mr-1" />
                  {data?.data_source ?? "—"}
                </span>
              }
            />
            <StatCard
              label="Status"
              value={
                isLive ? (
                  <span className="badge-success">Live</span>
                ) : (
                  <span className="badge-accent">Demo</span>
                )
              }
            />
          </div>

          {/* Filter Bar */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search by hash, type, or height..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                options={TX_TYPE_OPTIONS}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Activity className="h-8 w-8" />}
              title="No transactions found for this address"
              description="There are no on-chain transactions matching your current filters."
            />
          ) : (
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-3 text-xs font-semibold text-text-muted">Hash</th>
                      <th className="px-4 py-3 text-xs font-semibold text-text-muted">Type</th>
                      <th className="px-4 py-3 text-xs font-semibold text-text-muted">Height</th>
                      <th className="px-4 py-3 text-xs font-semibold text-text-muted">Fee (INJ)</th>
                      <th className="px-4 py-3 text-xs font-semibold text-text-muted">Status</th>
                      <th className="px-4 py-3 text-xs font-semibold text-text-muted">Time</th>
                      <th className="px-4 py-3 text-xs font-semibold text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((tx) => (
                      <TxRow key={tx.hash} tx={tx} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer note */}
      <div className="flex items-center gap-2 text-xs text-text-muted pt-2">
        <Database className="h-3.5 w-3.5 text-text-muted" />
        <span>Powered by Injective Mainnet LCD —&nbsp;</span>
        <a
          href="https://lcd.injective.network"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          lcd.injective.network
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TransactionsPage({ params }: { params: { address: string } }) {
  return (
    <DashboardLayout>
      <TransactionsView address={params.address} />
    </DashboardLayout>
  );
}
