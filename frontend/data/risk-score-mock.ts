import { WalletRiskData } from "../types/risk-score";

export const MOCK_RISK_DATA: WalletRiskData = {
  totalScore: 24,
  level: "Low Risk",
  dimensions: [
    {
      id: "concentration",
      label: "Asset Concentration",
      score: 15,
      status: "success",
      description: "Portfolio is well-diversified across 12+ assets.",
    },
    {
      id: "volatility",
      label: "Volatility Exposure",
      score: 42,
      status: "warning",
      description: "High exposure to INJ price swings (60% weight).",
    },
    {
      id: "security",
      label: "Smart Contract Risk",
      score: 10,
      status: "success",
      description: "Interactions limited to audited blue-chip protocols.",
    },
    {
      id: "liquidity",
      label: "Liquidity Risk",
      score: 8,
      status: "success",
      description: "92% of assets can be exited within 1 block.",
    },
  ],
  peerComparison: {
    walletScore: 24,
    averageScore: 48,
    percentile: 82, // 82% safer than others
  },
};
