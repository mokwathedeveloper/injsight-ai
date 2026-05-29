"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Search, Filter, Download, RefreshCw, CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight, Gauge } from "lucide-react";
import { Button } from "@/components/ui";
import { formatCurrency, formatAddress } from "@/lib/utils";

interface HistoryItem {
  id: string;
  date: string;
  time: string;
  wallet: string;
  label: string;
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  riskLevelLabel: string;
  portfolioValue: number;
  status: "completed" | "in_progress" | "failed";
  report: boolean;
}

const MOCK_HISTORY: HistoryItem[] = [
  { id: "h1",  date: "May 22, 2025", time: "10:33 AM", wallet: "inj1qg5...kkxh", label: "Main Portfolio",     riskScore: 72, riskLevel: "high",     riskLevelLabel: "High Risk",     portfolioValue: 45682.25,  status: "completed",   report: true  },
  { id: "h2",  date: "May 22, 2025", time: "09:12 AM", wallet: "inj1abc...def1", label: "Trading Wallet",    riskScore: 72, riskLevel: "high",     riskLevelLabel: "High Risk",     portfolioValue: 18420.50,  status: "completed",   report: true  },
  { id: "h3",  date: "May 21, 2025", time: "04:10 PM", wallet: "inj1xyz...ghi2", label: "DeFi Investments",  riskScore: 48, riskLevel: "medium",   riskLevelLabel: "Medium Risk",   portfolioValue: 87500.00,  status: "completed",   report: true  },
  { id: "h4",  date: "May 21, 2025", time: "11:55 AM", wallet: "inj1def...jkl3", label: "Staking Portfolio", riskScore: 81, riskLevel: "critical", riskLevelLabel: "Critical Risk", portfolioValue: 12480.00,  status: "in_progress", report: false },
  { id: "h5",  date: "May 20, 2025", time: "03:22 PM", wallet: "inj1mno...pqr4", label: "NFT Collection",    riskScore: 81, riskLevel: "critical", riskLevelLabel: "Critical Risk", portfolioValue: 321507.00, status: "completed",   report: true  },
  { id: "h6",  date: "May 20, 2025", time: "01:30 PM", wallet: "inj1stu...vwx5", label: "Analytics Wallet",  riskScore: 42, riskLevel: "medium",   riskLevelLabel: "Medium Risk",   portfolioValue: 28350.25,  status: "completed",   report: false },
  { id: "h7",  date: "May 19, 2025", time: "08:00 AM", wallet: "inj1yza...bcd6", label: "Backup Wallet",     riskScore: 25, riskLevel: "low",      riskLevelLabel: "Low Risk",      portfolioValue: 8200.00,   status: "completed",   report: true  },
  { id: "h8",  date: "May 18, 2025", time: "06:45 PM", wallet: "inj1efg...hij7", label: "Long-Term Holdings",riskScore: 67, riskLevel: "high",     riskLevelLabel: "High Risk",     portfolioValue: 9870.00,   status: "failed",      report: false },
  { id: "h9",  date: "May 17, 2025", time: "02:20 PM", wallet: "inj1klm...nop8", label: "Research Wallet",   riskScore: 55, riskLevel: "medium",   riskLevelLabel: "Medium Risk",   portfolioValue: 5500.00,   status: "completed",   report: true  },
  { id: "h10", date: "May 16, 2025", time: "11:00 AM", wallet: "inj1qrs...tuv9", label: "Team Fund",         riskScore: 33, riskLevel: "low",      riskLevelLabel: "Low Risk",      portfolioValue: 67890.00,  status: "completed",   report: true  },
];

const riskBadge: Record<string, string> = {
  low:      "badge-success",
  medium:   "badge bg-yellow-400/10 text-yellow-400",
  high:     "badge-warning",
  critical: "badge-danger",
};

const statusConfig = {
  completed:   { label: "Completed",   icon: CheckCircle, color: "text-success", bg: "bg-success-muted" },
  in_progress: { label: "In Progress", icon: Clock,       color: "text-accent",  bg: "bg-accent-muted"  },
  failed:      { label: "Failed",      icon: XCircle,     color: "text-danger",  bg: "bg-danger-muted"  },
};

export function HistoryView() {
  const [search, setSearch]       = useState("");
  const [riskFilter, setRiskFilter] = useState("All Risk Levels");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [page, setPage]           = useState(1);

  const filtered = MOCK_HISTORY.filter(h => {
    if (search && !h.label.toLowerCase().includes(search.toLowerCase()) &&
        !h.wallet.toLowerCase().includes(search.toLowerCase())) return false;
    if (riskFilter !== "All Risk Levels" && h.riskLevel !== riskFilter.toLowerCase().split(" ")[0]) return false;
    if (statusFilter !== "All Status"    && h.status !== statusFilter.toLowerCase().replace(" ", "_")) return false;
    return true;
  });

  const completed   = MOCK_HISTORY.filter(h => h.status === "completed").length;
  const inProgress  = MOCK_HISTORY.filter(h => h.status === "in_progress").length;
  const failed      = MOCK_HISTORY.filter(h => h.status === "failed").length;
  const avgRisk     = Math.round(MOCK_HISTORY.reduce((s, h) => s + h.riskScore, 0) / MOCK_HISTORY.length);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Analysis History</h1>
          <p className="text-sm text-text-secondary">View and manage all your wallet analysis reports.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Total Analyses</p>
            <RefreshCw className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{MOCK_HISTORY.length}</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="h-1 flex-1 rounded-full bg-surface-3 overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "60%" }} />
            </div>
            <span className="text-[10px] text-text-muted">60%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Completed</p>
            <CheckCircle className="h-4 w-4 text-success" />
          </div>
          <p className="text-2xl font-bold text-success">{completed}</p>
          <p className="text-xs text-text-muted">{Math.round((completed / MOCK_HISTORY.length) * 100)}% success rate</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">In Progress</p>
            <Clock className="h-4 w-4 text-accent" />
          </div>
          <p className="text-2xl font-bold text-accent">{inProgress}</p>
          <p className="text-xs text-text-muted">currently running</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Avg. Risk Score</p>
            <Gauge className="h-4 w-4 text-warning" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{avgRisk}</p>
          <p className="text-xs text-text-muted">across all analyses</p>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search analyses..."
            className="input-field pl-9 py-2 text-xs h-9"
          />
        </div>
        <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} className="input-field h-9 text-xs w-36">
          {["All Risk Levels","Low Risk","Medium Risk","High Risk","Critical Risk"].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field h-9 text-xs w-32">
          {["All Status","Completed","In Progress","Failed"].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <Button variant="secondary" size="sm">
          <Filter className="h-3.5 w-3.5" /> Filters
        </Button>
        <div className="ml-auto">
          <span className="text-xs text-text-muted">{filtered.length} of {MOCK_HISTORY.length} analyses</span>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-2/40">
              {["Date & Time", "Wallet", "Risk Score", "Risk Level", "Portfolio Value", "Status", "Report", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-text-muted uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => {
              const sc = statusConfig[item.status];
              const StatusIcon = sc.icon;
              return (
                <tr key={item.id} className="border-b border-border/40 hover:bg-surface-2/50 transition-colors group">
                  <td className="px-4 py-3">
                    <p className="text-xs text-text-primary font-medium">{item.date}</p>
                    <p className="text-[11px] text-text-muted">{item.time}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold text-text-primary">{item.label}</p>
                    <p className="text-[11px] font-mono text-text-muted">{item.wallet}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-text-primary">{item.riskScore}</span>
                      <div className="w-12 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.riskLevel === "critical" ? "bg-danger" : item.riskLevel === "high" ? "bg-warning" : item.riskLevel === "medium" ? "bg-yellow-400" : "bg-success"}`}
                          style={{ width: `${item.riskScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={riskBadge[item.riskLevel]}>{item.riskLevelLabel}</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-text-primary">{formatCurrency(item.portfolioValue)}</td>
                  <td className="px-4 py-3">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold ${sc.bg} ${sc.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {sc.label}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {item.report ? (
                      <span className="badge-success text-[10px]">Available</span>
                    ) : (
                      <span className="badge bg-surface-2 text-text-muted border border-border text-[10px]">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/analyze?address=${item.wallet}`}><RefreshCw className="h-3.5 w-3.5" /></Link>
                      </Button>
                      {item.report && (
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/reports/${item.id}`}><ExternalLink className="h-3.5 w-3.5" /></Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-surface-2/20">
          <p className="text-xs text-text-muted">Showing 1–{filtered.length} of {filtered.length} analyses</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setPage(p => Math.max(1, p - 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[1, 2, 3].map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-7 h-7 rounded text-xs font-medium ${page === n ? "bg-primary text-white" : "text-text-muted hover:bg-surface-2"}`}
              >
                {n}
              </button>
            ))}
            <Button variant="ghost" size="icon" onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
