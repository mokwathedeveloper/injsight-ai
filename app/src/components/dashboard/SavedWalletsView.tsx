"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Star, Trash2, ExternalLink, Filter, RefreshCw, Wallet, TrendingUp, AlertTriangle, CheckCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency, formatAddress } from "@/lib/utils";

const MOCK_WALLETS = [
  { id: "1", address: "inj1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh", label: "Main Portfolio",     chain: "Injective", riskScore: 72, riskLevel: "high"     as const, value: 45680.25,  lastAnalyzed: "May 22, 2025 10:33",  watchlist: true  },
  { id: "2", address: "inj1hcm8vtmfntcjl7pgz3d68kpzthfa9x3tzkmzh", label: "Trading Wallet",    chain: "Injective", riskScore: 48, riskLevel: "medium"   as const, value: 18420.50,  lastAnalyzed: "May 21, 2025 09:15",  watchlist: true  },
  { id: "3", address: "inj1xyz4a8b2c6d7e9f0a1b2c3d4e5f6a7b8c9d0e", label: "DeFi Investments",  chain: "Injective", riskScore: 65, riskLevel: "high"     as const, value: 87500.00,  lastAnalyzed: "May 20, 2025 14:22",  watchlist: false },
  { id: "4", address: "inj1abc1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b", label: "Long-Term Holdings", chain: "Injective", riskScore: 28, riskLevel: "low"      as const, value: 12480.00,  lastAnalyzed: "May 20, 2025 11:45",  watchlist: false },
  { id: "5", address: "inj1def4a8b2c6d7e9f0a1b2c3d4e5f6a7b8c9d0e", label: "Staking Wallet",    chain: "Injective", riskScore: 35, riskLevel: "low"      as const, value: 9870.00,   lastAnalyzed: "May 19, 2025 16:10",  watchlist: true  },
  { id: "6", address: "inj1ghi1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b", label: "DeFi #2",          chain: "Injective", riskScore: 81, riskLevel: "critical" as const, value: 321507.00, lastAnalyzed: "May 19, 2025 08:30",  watchlist: false },
  { id: "7", address: "inj1jkl4a8b2c6d7e9f0a1b2c3d4e5f6a7b8c9d0e", label: "Analytics Wallet",  chain: "Injective", riskScore: 55, riskLevel: "medium"   as const, value: 8200.00,   lastAnalyzed: "May 18, 2025 12:00",  watchlist: true  },
  { id: "8", address: "inj1mno1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b", label: "Backup Wallet",     chain: "Injective", riskScore: 22, riskLevel: "low"      as const, value: 500.00,    lastAnalyzed: "May 17, 2025 07:45",  watchlist: false },
];

const RISK_DIST = [
  { name: "Critical", value: 1, color: "#DC2626" },
  { name: "High",     value: 2, color: "#EF4444" },
  { name: "Medium",   value: 2, color: "#F5C542" },
  { name: "Low",      value: 3, color: "#22C55E" },
];

const riskBadge: Record<string, string> = {
  low:      "badge-success",
  medium:   "badge bg-yellow-400/10 text-yellow-400",
  high:     "badge-warning",
  critical: "badge-danger",
};

const riskIcon: Record<string, React.ElementType> = {
  low:      CheckCircle,
  medium:   AlertTriangle,
  high:     AlertTriangle,
  critical: AlertTriangle,
};

export function SavedWalletsView() {
  const [search, setSearch]         = useState("");
  const [riskFilter, setRiskFilter] = useState("All Risk Levels");
  const [showAdd, setShowAdd]       = useState(false);
  const [newAddr, setNewAddr]       = useState("");
  const [newLabel, setNewLabel]     = useState("");

  const visible = MOCK_WALLETS.filter(w => {
    const matchSearch = !search || w.label.toLowerCase().includes(search.toLowerCase()) ||
      w.address.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === "All Risk Levels" || w.riskLevel === riskFilter.toLowerCase();
    return matchSearch && matchRisk;
  });

  const avgRisk = Math.round(MOCK_WALLETS.reduce((s, w) => s + w.riskScore, 0) / MOCK_WALLETS.length);
  const highRisk = MOCK_WALLETS.filter(w => w.riskLevel === "high" || w.riskLevel === "critical").length;
  const totalValue = MOCK_WALLETS.reduce((s, w) => s + w.value, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Saved Wallets</h1>
          <p className="text-sm text-text-secondary">Manage and analyse your saved Injective wallets.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Filter className="h-3.5 w-3.5" /> Export
          </Button>
          <Button variant="accent" size="sm" onClick={() => setShowAdd(!showAdd)}>
            <Plus className="h-3.5 w-3.5" /> Add Wallet
          </Button>
        </div>
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Your Saved Wallets</p>
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{MOCK_WALLETS.length}</p>
          <p className="text-xs text-text-muted">across 1 chain</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Portfolio Value</p>
            <TrendingUp className="h-4 w-4 text-accent" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{formatCurrency(totalValue)}</p>
          <p className="text-xs text-success">+2.4% today</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Average Risk Score</p>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{avgRisk}</p>
          <p className="text-xs text-text-muted">/ 100 portfolio avg</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">High Risk Wallets</p>
            <AlertTriangle className="h-4 w-4 text-danger" />
          </div>
          <p className="text-2xl font-bold text-danger">{highRisk}</p>
          <p className="text-xs text-text-muted">require attention</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        {/* Main table — 3 cols */}
        <div className="lg:col-span-3 space-y-3">
          {/* Search + filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search wallets or addresses..."
                className="input-field pl-9 py-2 text-xs h-9"
              />
            </div>
            <select
              value={riskFilter}
              onChange={e => setRiskFilter(e.target.value)}
              className="input-field h-9 text-xs w-40"
            >
              {["All Risk Levels", "Low", "Medium", "High", "Critical"].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <Button variant="secondary" size="sm">
              <Filter className="h-3.5 w-3.5" /> Filters
            </Button>
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface-2/40">
                  {["Wallet Label", "Address", "Risk Score", "Portfolio Value", "Last Analysis", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-text-muted uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map(w => {
                  const RiskIcon = riskIcon[w.riskLevel];
                  return (
                    <tr key={w.id} className="border-b border-border/40 hover:bg-surface-2/50 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[11px] font-bold text-accent shrink-0">
                            {w.label[0]}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-text-primary">{w.label}</p>
                            <span className="badge-primary text-[10px]">{w.chain}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[11px] font-mono text-text-muted">{formatAddress(w.address, 8)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-text-primary">{w.riskScore}</span>
                          <span className={riskBadge[w.riskLevel]}>{w.riskLevel}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-text-primary">{formatCurrency(w.value)}</td>
                      <td className="px-4 py-3 text-[11px] text-text-muted whitespace-nowrap">{w.lastAnalyzed}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/wallets/${w.id}`}><ExternalLink className="h-3.5 w-3.5" /></Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/analyze?address=${w.address}`}><RefreshCw className="h-3.5 w-3.5" /></Link>
                          </Button>
                          <Button variant="ghost" size="icon" className={w.watchlist ? "text-warning" : ""}>
                            <Star className="h-3.5 w-3.5" fill={w.watchlist ? "currentColor" : "none"} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-danger hover:text-danger">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-surface-2/20">
              <p className="text-xs text-text-muted">Showing {visible.length} of {MOCK_WALLETS.length} wallets</p>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
                <span className="text-xs px-2 py-1 bg-primary text-white rounded">1</span>
                <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Risk distribution */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Risk Distribution</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <ResponsiveContainer width={80} height={80}>
                  <PieChart>
                    <Pie data={RISK_DIST} cx="50%" cy="50%" innerRadius={24} outerRadius={37} dataKey="value" paddingAngle={2}>
                      {RISK_DIST.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) =>
                        active && payload?.length ? (
                          <div className="glass-card px-2 py-1 text-[11px]">
                            <p className="text-text-primary">{payload[0].payload.name}: {payload[0].value}</p>
                          </div>
                        ) : null
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-text-primary">{MOCK_WALLETS.length}</span>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {RISK_DIST.map(d => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                      <span className="text-text-muted">{d.name}</span>
                    </div>
                    <span className="font-semibold text-text-primary">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Analyze New Wallet",    href: "/analyze"  },
                { label: "View Watchlist",         href: "/dashboard/watchlist" },
                { label: "Export Wallet List",     href: "#" },
                { label: "View Risk Report",       href: "/dashboard/reports" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-accent shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Add new wallet panel */}
          {showAdd ? (
            <div className="glass-card p-5 border-accent/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-text-primary">Add New Wallet</h3>
                <button onClick={() => setShowAdd(false)} className="text-text-muted hover:text-text-primary">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-text-secondary block mb-1">Wallet Address</label>
                  <input
                    value={newAddr}
                    onChange={e => setNewAddr(e.target.value)}
                    placeholder="inj1..."
                    className="input-field text-xs py-2 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-text-secondary block mb-1">Label (optional)</label>
                  <input
                    value={newLabel}
                    onChange={e => setNewLabel(e.target.value)}
                    placeholder="e.g. Trading Wallet"
                    className="input-field text-xs py-2"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => setShowAdd(false)}>Cancel</Button>
                  <Button variant="accent" size="sm" className="flex-1">Add Wallet</Button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAdd(true)}
              className="glass-card-hover p-4 w-full border-dashed border-border/80 flex items-center gap-2 text-xs text-text-muted hover:text-accent transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add New Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
