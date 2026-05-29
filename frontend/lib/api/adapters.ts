/** Map backend DTOs into the existing UI-facing shapes. */
import type { ApiAnalysis, ApiWallet, ApiAlert, ApiReport } from "./types";
import type { RiskLevel, WalletAnalysisResult, TokenHolding, RiskFactor, AIInsight } from "@/types/wallet-analyzer";
import type { SavedWallet } from "@/types/saved-wallets";
import type { AnalysisHistoryEntry } from "@/types/analysis-history";
import type { DashboardAlertEntry, AlertType, AlertSeverity } from "@/types/alerts";
import type { AIReportHubEntry } from "@/types/reports";

const RISK_LEVELS: RiskLevel[] = ["Low", "Moderate", "High", "Very High"];
const asRiskLevel = (v: string | null | undefined): RiskLevel =>
  RISK_LEVELS.includes(v as RiskLevel) ? (v as RiskLevel) : "Low";

const relativeTime = (iso: string | null): string => {
  if (!iso) return "Never";
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return "Unknown";
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const factorStatus = (score: number): RiskFactor["status"] =>
  score >= 60 ? "error" : score >= 35 ? "warning" : "success";

const FACTOR_LABELS: Record<string, string> = {
  concentration: "Asset Concentration",
  volatility: "Volatility Exposure",
  stablecoinBuffer: "Stablecoin Buffer",
  activity: "On-chain Activity",
  diversification: "Diversification",
};

export function adaptAnalysis(a: ApiAnalysis): WalletAnalysisResult {
  const holdings: TokenHolding[] = a.portfolio.holdings.map((h, i) => ({
    id: `${a.id}-${h.symbol}-${i}`,
    symbol: h.symbol,
    name: h.name,
    balance: h.amount,
    valueUsd: h.value_usd,
    priceUsd: h.price,
    priceChange24h: 0,
    percentOfPortfolio: h.percent,
  }));

  const dims = a.riskScore?.dimensions ?? {};
  const riskFactors: RiskFactor[] = Object.entries(dims).map(([key, score]) => ({
    label: FACTOR_LABELS[key] ?? key,
    score,
    status: factorStatus(score),
    description: `${FACTOR_LABELS[key] ?? key} contribution to the overall risk score.`,
  }));

  const insights: AIInsight[] = a.aiReport
    ? [
        { title: "Portfolio Summary", content: a.aiReport.summary, category: "portfolio" },
        { title: "Risk Analysis", content: a.aiReport.riskExplanation, category: "risk" },
        { title: "Concentration", content: a.aiReport.concentrationAnalysis, category: "opportunity" },
      ]
    : [];

  return {
    address: a.walletAddress,
    network: "mainnet",
    totalValueUsd: a.portfolio.totalValueUsd,
    change24h: 0,
    riskScore: a.riskScore?.score ?? 0,
    riskLevel: (a.riskScore?.level as RiskLevel) ?? "Low",
    holdings,
    riskFactors,
    securityFlags: [],
    insights,
    recentTransactionsCount: 0,
  };
}

export function adaptWallet(w: ApiWallet): SavedWallet {
  return {
    id: w.id,
    label: w.label || `${w.address.slice(0, 10)}…${w.address.slice(-4)}`,
    address: w.address,
    totalValueUsd: w.totalValueUsd ?? 0,
    riskScore: w.riskScore ?? 0,
    riskLevel: asRiskLevel(w.riskLevel),
    lastAnalyzed: relativeTime(w.lastAnalyzedAt),
  };
}

export function adaptHistoryEntry(a: ApiAnalysis): AnalysisHistoryEntry {
  const status =
    a.status === "completed" ? "completed" : a.status === "failed" ? "failed" : "processing";
  return {
    id: a.id,
    address: a.walletAddress,
    timestamp: relativeTime(a.completedAt ?? a.createdAt),
    riskScore: a.riskScore?.score ?? 0,
    riskLevel: asRiskLevel(a.riskScore?.level),
    totalValueUsd: a.portfolio?.totalValueUsd ?? 0,
    status,
  };
}

export function adaptAlert(a: ApiAlert): DashboardAlertEntry {
  const types: AlertType[] = ["risk", "yield", "security", "system"];
  const severities: AlertSeverity[] = ["low", "medium", "high", "critical"];
  return {
    id: a.id,
    type: (types.includes(a.type as AlertType) ? a.type : "system") as AlertType,
    severity: (severities.includes(a.severity as AlertSeverity) ? a.severity : "low") as AlertSeverity,
    title: a.title,
    message: a.message || "",
    timestamp: relativeTime(a.createdAt),
    isRead: a.isRead,
    walletAddress: a.walletAddress || undefined,
  };
}

export function adaptReport(r: ApiReport): AIReportHubEntry {
  return {
    id: r.id,
    title: r.title,
    walletAddress: r.walletAddress,
    dateGenerated: relativeTime(r.createdAt),
    riskScore: r.riskScore ?? 0,
    riskLevel: asRiskLevel(r.riskLevel),
    status: "ready",
    availableFormats: ["json", "csv", "pdf"],
  };
}
