"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  Save,
  Share2,
  FileDown,
  Download,
  AlertTriangle,
  Shield,
  TrendingUp,
  BarChart2,
  Activity,
  Wallet,
} from "lucide-react";
import { Button, LoadingState, ErrorState } from "@/components/ui";
import { formatAddress, formatCurrency, getRiskBadgeClass } from "@/lib/utils";
import { useReportById } from "@/hooks/useReports";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const TABS = ["Summary", "Risk Analysis", "Portfolio", "Recommendations"] as const;
type Tab = (typeof TABS)[number];

interface ReportDetailProps {
  reportId: string;
}

function getRiskColor(level: string): string {
  switch (level?.toLowerCase()) {
    case "critical": return "text-danger";
    case "high":     return "text-warning";
    case "moderate":
    case "medium":   return "text-yellow-400";
    default:         return "text-success";
  }
}

function getRiskBarColor(level: string): string {
  switch (level?.toLowerCase()) {
    case "critical": return "bg-danger";
    case "high":     return "bg-warning";
    case "moderate":
    case "medium":   return "bg-yellow-500";
    default:         return "bg-success";
  }
}

export function ReportDetailView({ reportId }: ReportDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Summary");

  const { data: report, isLoading, isError, refetch } = useReportById(reportId);

  // ── loading ───────────────────────────────────────────────────────────────
  if (isLoading) return <LoadingState message="Loading report..." size="lg" />;

  // ── error ─────────────────────────────────────────────────────────────────
  if (isError || !report) {
    return (
      <div className="glass-card p-4">
        <ErrorState title="Report not found" onRetry={() => refetch()} />
      </div>
    );
  }

  // ── normalise risk_score field ────────────────────────────────────────────
  let riskScore: number | null = null;
  let riskLevel: string | null = null;

  if (report.risk_score != null) {
    if (typeof report.risk_score === "number") {
      riskScore = report.risk_score;
    } else if (typeof report.risk_score === "object") {
      const rs = report.risk_score as { score?: number; risk_level?: string };
      riskScore = rs.score ?? null;
      riskLevel = rs.risk_level ?? null;
    }
  }

  const riskColor       = riskLevel ? getRiskColor(riskLevel) : "text-text-secondary";
  const strokeColor     = riskLevel
    ? riskLevel.toLowerCase() === "critical" ? "#DC2626"
      : riskLevel.toLowerCase() === "high"   ? "#F5C542"
      : riskLevel.toLowerCase() === "medium" ? "#EAB308"
      : "#22C55E"
    : "#58A6FF";

  const address    = report.wallet_address ?? "";
  const createdAt  = report.created_at
    ? new Date(report.created_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
    : null;

  // ── any report ────────────────────────────────────────────────────────────
  // The ReportAPI type has a summary field but the extended report returned by
  // /reports/:id may carry the full AnalysisResult-style aiReport fields.
  // We cast to `any` once and destructure what we need so the component stays typed.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const full = report as any;
  const aiReport        = full.aiReport ?? null;
  const portfolio       = full.portfolio ?? null;
  const riskDimensions  = full.riskScore?.dimensions ?? null;

  // Build bar chart data from dimensions when available
  type DimEntry = { name: string; score: number; level: string };
  const dimEntries: DimEntry[] = riskDimensions
    ? [
        { name: "Concentration", score: riskDimensions.concentration ?? 0,    level: "High"   },
        { name: "Volatility",    score: riskDimensions.volatility ?? 0,        level: "High"   },
        { name: "Stablecoin",    score: riskDimensions.stablecoinBuffer ?? 0,  level: "Medium" },
        { name: "Activity",      score: riskDimensions.activity ?? 0,          level: "Low"    },
        { name: "Diversity",     score: riskDimensions.diversification ?? 0,   level: "Low"    },
      ]
    : [];

  const barData = dimEntries.map(d => ({ name: d.name, score: d.score }));

  // Key risk factors synthesised from the AI report text
  const keyFactors: Array<{ icon: React.ElementType; color: string; text: string }> = [];
  if (aiReport?.concentrationAnalysis) {
    keyFactors.push({ icon: AlertTriangle, color: "text-danger",  text: aiReport.concentrationAnalysis });
  }
  if (aiReport?.riskExplanation) {
    keyFactors.push({ icon: Shield,        color: "text-warning", text: aiReport.riskExplanation       });
  }
  if (aiReport?.injectiveContext) {
    keyFactors.push({ icon: TrendingUp,    color: "text-accent",  text: aiReport.injectiveContext       });
  }
  if (aiReport?.summary && keyFactors.length === 0) {
    keyFactors.push({ icon: Activity,      color: "text-success", text: aiReport.summary                });
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <Link href="/dashboard/reports" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Reports
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-text-secondary">Report Detail</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-text-primary mb-1">
            {report.label ?? "Wallet Report"}
          </h1>
          {createdAt && (
            <p className="text-xs text-text-muted">Full AI Analysis · Generated {createdAt}</p>
          )}
          {address && (
            <p className="text-[11px] font-mono text-text-muted mt-1">{address}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Save className="h-3.5 w-3.5" /> Save Report
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="h-3.5 w-3.5" /> Share
          </Button>
          <Button variant="accent" size="sm">
            <FileDown className="h-3.5 w-3.5" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-xs text-text-muted">Risk Score</p>
          <p className={`text-lg font-bold ${riskColor}`}>{riskScore ?? "—"}</p>
          <p className="text-xs text-text-muted">
            {riskLevel ? `${riskLevel} risk level` : "No risk data"}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-text-muted">Portfolio Value</p>
          <p className="text-lg font-bold text-text-primary">
            {portfolio?.totalValueUsd != null ? formatCurrency(portfolio.totalValueUsd) : "—"}
          </p>
          <p className="text-xs text-text-muted">As of analysis date</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-text-muted">Total Assets</p>
          <p className="text-lg font-bold text-accent">
            {portfolio?.tokenCount ?? "—"}
          </p>
          <p className="text-xs text-text-muted">distinct tokens</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-text-muted">Status</p>
          <p className="text-lg font-bold text-text-primary capitalize">{report.status ?? "—"}</p>
          <p className="text-xs text-text-muted">analysis status</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border overflow-x-auto scrollbar-hide">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content + sidebar */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Summary tab */}
          {activeTab === "Summary" && (
            <div className="space-y-5">
              {/* AI report summary */}
              {(aiReport?.summary || report.summary) && (
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <BarChart2 className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary">AI Wallet Intelligence</h3>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {aiReport?.summary ?? report.summary}
                  </p>
                  {aiReport?.injectiveContext && (
                    <p className="text-xs text-text-muted leading-relaxed mt-3 border-l-2 border-accent/30 pl-3">
                      {aiReport.injectiveContext}
                    </p>
                  )}
                </div>
              )}

              {/* Risk dimensions bars */}
              {dimEntries.length > 0 && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-text-primary mb-4">Risk Assessment</h3>
                  <div className="space-y-3 mb-5">
                    {dimEntries.map(({ name, score, level }) => (
                      <div key={name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-text-secondary">{name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-text-primary">{score}</span>
                            <span className={getRiskBadgeClass(level)}>{level}</span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-surface-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getRiskBarColor(level)}`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {barData.length > 0 && (
                    <ResponsiveContainer width="100%" height={110}>
                      <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#30363D" vertical={false} />
                        <XAxis dataKey="name" tick={{ fill: "#8B949E", fontSize: 10 }} tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} tick={{ fill: "#8B949E", fontSize: 10 }} tickLine={false} axisLine={false} />
                        <Tooltip
                          content={({ active, payload }) =>
                            active && payload?.length ? (
                              <div className="glass-card px-2 py-1 text-xs">
                                <p className="text-accent font-semibold">{payload[0].value}</p>
                              </div>
                            ) : null
                          }
                        />
                        <Bar dataKey="score" fill="#0066FF" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              )}

              {/* Concentration analysis */}
              {aiReport?.concentrationAnalysis && (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Concentration Analysis</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{aiReport.concentrationAnalysis}</p>
                </div>
              )}
            </div>
          )}

          {/* Risk Analysis tab */}
          {activeTab === "Risk Analysis" && (
            <div className="space-y-5">
              {aiReport?.riskExplanation ? (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-text-primary mb-3">Risk Explanation</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{aiReport.riskExplanation}</p>
                </div>
              ) : (
                <div className="glass-card p-10 flex flex-col items-center gap-3 text-center">
                  <Wallet className="h-8 w-8 text-text-muted" />
                  <p className="text-sm font-semibold text-text-primary">No detailed risk data</p>
                  <p className="text-xs text-text-secondary">Risk breakdown not available for this report.</p>
                </div>
              )}
            </div>
          )}

          {/* Portfolio tab */}
          {activeTab === "Portfolio" && (
            <div className="space-y-5">
              {portfolio?.holdings && portfolio.holdings.length > 0 ? (
                <div className="glass-card overflow-hidden">
                  <div className="p-5 border-b border-border">
                    <h3 className="text-sm font-semibold text-text-primary">Token Holdings</h3>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-surface-2/30">
                        {["Token", "Balance", "Value (USD)", "% Portfolio"].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-text-muted uppercase">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {portfolio.holdings.map((h: any) => (
                        <tr key={h.symbol} className="border-b border-border/40 hover:bg-surface-2/50">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">
                                {(h.symbol as string)[0]}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-text-primary">{h.symbol}</p>
                                <p className="text-[10px] text-text-muted">{h.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-xs text-text-secondary">
                            {typeof h.amount === "number" ? (h.amount as number).toLocaleString() : h.amount}
                          </td>
                          <td className="px-5 py-3 text-xs font-semibold text-text-primary">
                            {formatCurrency(h.value_usd as number)}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 rounded-full bg-surface-3">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                  style={{ width: `${Math.min(h.percent as number, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs text-text-secondary">{h.percent}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="glass-card p-10 flex flex-col items-center gap-3 text-center">
                  <Wallet className="h-8 w-8 text-text-muted" />
                  <p className="text-sm font-semibold text-text-primary">No portfolio data</p>
                  <p className="text-xs text-text-secondary">Holdings not available for this report.</p>
                </div>
              )}
            </div>
          )}

          {/* Recommendations tab */}
          {activeTab === "Recommendations" && (
            <div className="space-y-5">
              {aiReport?.suggestedNextSteps && aiReport.suggestedNextSteps.length > 0 ? (
                <div className="glass-card p-5">
                  <h3 className="text-sm font-semibold text-text-primary mb-4">Suggested Next Steps</h3>
                  <ul className="space-y-3">
                    {(aiReport.suggestedNextSteps as string[]).map((step, i) => (
                      <li key={i} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-xs text-text-secondary leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ul>
                  {aiReport.disclaimer && (
                    <p className="text-[10px] text-text-muted mt-4 italic">{aiReport.disclaimer}</p>
                  )}
                </div>
              ) : (
                <div className="glass-card p-10 flex flex-col items-center gap-3 text-center">
                  <Wallet className="h-8 w-8 text-text-muted" />
                  <p className="text-sm font-semibold text-text-primary">No recommendations</p>
                  <p className="text-xs text-text-secondary">Recommendations not available for this report.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Risk score circle */}
          <div className="glass-card p-5 flex flex-col items-center gap-3">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#30363D" strokeWidth="2.5" />
                {riskScore != null && (
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke={strokeColor} strokeWidth="2.5"
                    strokeDasharray={`${riskScore} ${100 - riskScore}`}
                    strokeLinecap="round"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-bold ${riskColor}`}>{riskScore ?? "—"}</span>
                <span className="text-[10px] text-text-muted">Risk</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-text-primary">
                {riskLevel ? `${riskLevel} Risk` : "No risk data"}
              </p>
              <p className="text-xs text-text-muted">Score out of 100</p>
            </div>
          </div>

          {/* Wallet info */}
          {address && (
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-2">Wallet</h3>
              <p className="text-[11px] font-mono text-text-muted break-all">{formatAddress(address, 10)}</p>
              {riskLevel && (
                <span className={`${getRiskBadgeClass(riskLevel)} mt-2 inline-block`}>{riskLevel}</span>
              )}
            </div>
          )}

          {/* Download options */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Download Options</h3>
            <div className="space-y-2">
              <Button variant="accent" size="sm" className="w-full gap-2 justify-start">
                <FileDown className="h-3.5 w-3.5" /> Download PDF
              </Button>
              <Button variant="secondary" size="sm" className="w-full gap-2 justify-start">
                <Download className="h-3.5 w-3.5" /> Export CSV
              </Button>
              <Button variant="secondary" size="sm" className="w-full gap-2 justify-start">
                <Download className="h-3.5 w-3.5" /> Export JSON
              </Button>
            </div>
          </div>

          {/* Key risk factors */}
          {keyFactors.length > 0 && (
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Key Risk Factors</h3>
              <ul className="space-y-2.5">
                {keyFactors.slice(0, 4).map(({ icon: Icon, color, text }, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Icon className={`h-3.5 w-3.5 ${color} shrink-0 mt-0.5`} />
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
