import { WalletAnalysisResult } from "@/types/wallet-analyzer";

export const mockAnalysisResult: WalletAnalysisResult = {
  address: "inj1h7x...w9v2",
  network: "mainnet",
  totalValueUsd: 248450.32,
  change24h: 12.5,
  riskScore: 72,
  riskLevel: "High",
  holdings: [
    {
      id: "injective",
      symbol: "INJ",
      name: "Injective",
      balance: 4250.5,
      valueUsd: 105840.12,
      priceUsd: 24.9,
      priceChange24h: 5.2,
      percentOfPortfolio: 42.6,
    },
    {
      id: "tether",
      symbol: "USDT",
      name: "Tether",
      balance: 49938.5,
      valueUsd: 49938.5,
      priceUsd: 1.0,
      priceChange24h: 0.01,
      percentOfPortfolio: 20.1,
    },
    {
      id: "usd-coin",
      symbol: "USDC",
      name: "USD Coin",
      balance: 36770.6,
      valueUsd: 36770.6,
      priceUsd: 1.0,
      priceChange24h: -0.02,
      percentOfPortfolio: 14.8,
    },
    {
      id: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      balance: 6.2,
      valueUsd: 21615.15,
      priceUsd: 3486.3,
      priceChange24h: 2.1,
      percentOfPortfolio: 8.7,
    },
  ],
  riskFactors: [
    {
      label: "Concentration Risk",
      score: 85,
      status: "error",
      description: "High exposure to a single asset (INJ).",
    },
    {
      label: "Volatility Risk",
      score: 65,
      status: "warning",
      description: "Moderate exposure to highly volatile assets.",
    },
    {
      label: "Stablecoin Buffer",
      score: 30,
      status: "error",
      description: "Low percentage of portfolio in stablecoins.",
    },
  ],
  securityFlags: [
    { id: "1", level: "info", message: "Read-only access verified." },
    { id: "2", level: "warning", message: "Multiple high-slippage swaps detected." },
  ],
  insights: [
    {
      title: "Portfolio Concentration",
      category: "risk",
      content: "This wallet shows high exposure to INJ (42.6%) which increases concentration risk. Consider diversifying into lower volatility assets.",
    },
    {
      title: "Staking Opportunity",
      category: "opportunity",
      content: "A significant portion of INJ is currently unstaked. You could earn ~15% APR by delegating to Injective validators.",
    },
  ],
  recentTransactionsCount: 142,
};
