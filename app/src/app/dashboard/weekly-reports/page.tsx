"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui";
import {
  Star,
  Plus,
  Wallet,
  Calendar,
  Download,
  Eye,
  Mail,
  Clock,
  ChevronDown,
} from "lucide-react";

// ── data ───────────────────────────────────────────────────────────────────────

interface ReportGroup {
  id: string;
  name: string;
  description: string;
  lastReportDate: string;
  walletCount: number;
  riskLevel: string;
  riskClass: string;
  schedule: string;
}

const REPORT_GROUPS: ReportGroup[] = [
  {
    id: "rg1",
    name: "DeFi Core Portfolio",
    description: "Primary DeFi positions across Helix, Astroport and Mito protocols",
    lastReportDate: "May 26, 2025",
    walletCount: 8,
    riskLevel: "High",
    riskClass: "badge-warning",
    schedule: "Every Monday",
  },
  {
    id: "rg2",
    name: "High Value Wallets",
    description: "Wallets with portfolio value exceeding $500K — closely monitored",
    lastReportDate: "May 26, 2025",
    walletCount: 5,
    riskLevel: "Critical",
    riskClass: "badge-danger",
    schedule: "Every Monday",
  },
  {
    id: "rg3",
    name: "Trading Activity Watch",
    description: "Active trading wallets with high transaction volume and DeFi exposure",
    lastReportDate: "May 26, 2025",
    walletCount: 12,
    riskLevel: "Medium",
    riskClass: "badge bg-yellow-400/10 text-yellow-400",
    schedule: "Every Monday",
  },
  {
    id: "rg4",
    name: "Long-Term Holdings",
    description: "Conservative wallets focused on long-term INJ and blue-chip accumulation",
    lastReportDate: "May 26, 2025",
    walletCount: 6,
    riskLevel: "Low",
    riskClass: "badge-success",
    schedule: "Every Monday",
  },
];

interface ReportHistory {
  id: string;
  period: string;
  type: string;
  wallets: number;
  generatedOn: string;
  status: "Delivered" | "Pending" | "Failed";
}

const REPORT_HISTORY: ReportHistory[] = [
  { id: "h1", period: "May 19 – 25",  type: "DeFi Core Portfolio",    wallets: 8,  generatedOn: "May 26, 2025 06:00 AM", status: "Delivered" },
  { id: "h2", period: "May 19 – 25",  type: "High Value Wallets",     wallets: 5,  generatedOn: "May 26, 2025 06:02 AM", status: "Delivered" },
  { id: "h3", period: "May 19 – 25",  type: "Trading Activity Watch", wallets: 12, generatedOn: "May 26, 2025 06:05 AM", status: "Delivered" },
  { id: "h4", period: "May 19 – 25",  type: "Long-Term Holdings",     wallets: 6,  generatedOn: "May 26, 2025 06:07 AM", status: "Delivered" },
  { id: "h5", period: "May 12 – 18",  type: "DeFi Core Portfolio",    wallets: 8,  generatedOn: "May 19, 2025 06:00 AM", status: "Delivered" },
  { id: "h6", period: "May 12 – 18",  type: "High Value Wallets",     wallets: 5,  generatedOn: "May 19, 2025 06:02 AM", status: "Delivered" },
];

const statusClass: Record<ReportHistory["status"], string> = {
  Delivered: "badge-success",
  Pending:   "badge-warning",
  Failed:    "badge-danger",
};

// ── view ───────────────────────────────────────────────────────────────────────

function WeeklyReportsView() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [frequency, setFrequency] = useState("weekly");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-text-primary">Weekly AI Reports</h1>
            <span className="badge-accent flex items-center gap-1">
              <Star className="h-3 w-3" /> AI
            </span>
          </div>
          <p className="text-sm text-text-secondary">Automated AI-powered portfolio intelligence delivered every week</p>
        </div>
        <Button variant="accent" size="sm">
          <Plus className="h-3.5 w-3.5" /> Create Weekly Report
        </Button>
      </div>

      {/* Report group cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {REPORT_GROUPS.map((group) => (
          <div key={group.id} className="glass-card-hover p-5 flex gap-4">
            <div className="p-2.5 rounded-lg bg-primary/10 shrink-0 self-start">
              <Wallet className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{group.name}</h3>
                  <p className="text-xs text-text-secondary mt-0.5">{group.description}</p>
                </div>
                <span className={group.riskClass}>{group.riskLevel}</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-text-muted" />
                  <span className="text-xs text-text-muted">Last: {group.lastReportDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wallet className="h-3.5 w-3.5 text-text-muted" />
                  <span className="text-xs text-text-muted">{group.walletCount} wallets</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-text-muted" />
                  <span className="text-xs text-text-muted">{group.schedule}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="secondary" size="sm">
                  <Eye className="h-3.5 w-3.5" /> View Report
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* History + Settings */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* History table */}
        <div className="glass-card lg:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Recent Report History</h3>
            <span className="text-xs text-text-muted">Last 6 reports</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Period", "Report Type", "Wallets", "Generated On", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REPORT_HISTORY.map((row) => (
                  <tr key={row.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                    <td className="px-5 py-3 text-xs text-text-muted whitespace-nowrap">{row.period}</td>
                    <td className="px-5 py-3 text-xs font-medium text-text-primary whitespace-nowrap">{row.type}</td>
                    <td className="px-5 py-3 text-xs text-text-secondary">{row.wallets}</td>
                    <td className="px-5 py-3 text-xs text-text-muted whitespace-nowrap">{row.generatedOn}</td>
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span className={statusClass[row.status]}>{row.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schedule settings */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Report Schedule Settings</h3>
            <div className="space-y-4">
              {/* Frequency */}
              <div>
                <label className="section-label block mb-2">Frequency</label>
                <div className="relative">
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="input-field appearance-none pr-8 text-xs"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly (Recommended)</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted pointer-events-none" />
                </div>
              </div>

              {/* Timezone */}
              <div>
                <label className="section-label block mb-2">Timezone</label>
                <div className="relative">
                  <select className="input-field appearance-none pr-8 text-xs">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                    <option>PST (Pacific Standard Time)</option>
                    <option>CET (Central European Time)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted pointer-events-none" />
                </div>
              </div>

              {/* Email toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs font-medium text-text-primary">Email Delivery</p>
                    <p className="text-[10px] text-text-muted">Send reports to your email</p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailEnabled(!emailEnabled)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${emailEnabled ? "bg-primary" : "bg-surface-3"}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform transition-transform duration-200 ${emailEnabled ? "translate-x-4" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <Button variant="secondary" size="sm" className="w-full">Save Schedule</Button>
            </div>
          </div>

          {/* Email Preview */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Email Preview</h3>
            <div className="bg-surface-2 rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
                  <Star className="h-3.5 w-3.5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-primary">InjSight AI Weekly Report</p>
                  <p className="text-[10px] text-text-muted">noreply@injsight.ai → mokwaohuru@gmail.com</p>
                </div>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Your weekly portfolio intelligence summary is ready. 4 report groups analyzed across 31 wallets. 2 high-priority insights require attention.
              </p>
              <Button variant="ghost" size="sm" className="mt-3 text-xs w-full">Preview Email Template</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WeeklyReportsPage() {
  return (
    <DashboardLayout>
      <WeeklyReportsView />
    </DashboardLayout>
  );
}
