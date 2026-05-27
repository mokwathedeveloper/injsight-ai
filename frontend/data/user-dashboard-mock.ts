import { UserDashboardData } from "../types/user-dashboard";

export const MOCK_DASHBOARD_DATA: UserDashboardData = {
  stats: {
    totalWallets: 4,
    totalValueUsd: 1358240,
    activeAlerts: 3,
    riskScoreAvg: 32,
  },
  recentAnalyses: [
    {
      id: "ana-1",
      address: "inj1whale...asdf",
      timestamp: "2026-05-27T10:30:00Z",
      riskScore: 24,
      totalValue: 1250430,
      status: "completed",
    },
    {
      id: "ana-2",
      address: "inj1degen...hjkl",
      timestamp: "2026-05-26T14:45:00Z",
      riskScore: 88,
      totalValue: 12450,
      status: "completed",
    },
    {
      id: "ana-3",
      address: "inj1farm...qwer",
      timestamp: "2026-05-25T09:15:00Z",
      riskScore: 12,
      totalValue: 45200,
      status: "completed",
    },
    {
      id: "ana-4",
      address: "inj1test...zxcv",
      timestamp: "2026-05-24T18:20:00Z",
      riskScore: 45,
      totalValue: 50160,
      status: "completed",
    },
  ],
  alerts: [
    {
      id: "alt-1",
      type: "risk",
      severity: "high",
      message: "High volatility detected in NINJA holdings for Whale Portfolio.",
      timestamp: "2 hours ago",
    },
    {
      id: "alt-2",
      type: "yield",
      severity: "medium",
      message: "New staking opportunity available for unstaked INJ tokens.",
      timestamp: "5 hours ago",
    },
    {
      id: "alt-3",
      type: "security",
      severity: "low",
      message: "Monthly security audit report is now available.",
      timestamp: "1 day ago",
    },
  ],
};
