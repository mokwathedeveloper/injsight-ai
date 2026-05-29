/** Map backend ApiAnalysis into the existing WalletAnalysisResult UI shape. */
import type { ApiAnalysis } from "./types";
import type { RiskLevel, WalletAnalysisResult, TokenHolding, RiskFactor, AIInsight } from "@/types/wallet-analyzer";

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
