export interface DashboardStats {
  totalWallets: number;
  totalValueUsd: number;
  activeAlerts: number;
  riskScoreAvg: number;
}

export interface RecentAnalysis {
  id: string;
  address: string;
  timestamp: string;
  riskScore: number;
  totalValue: number;
  status: "completed" | "pending" | "failed";
}

export interface DashboardAlert {
  id: string;
  type: "risk" | "yield" | "security";
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: string;
}

export interface UserDashboardData {
  stats: DashboardStats;
  recentAnalyses: RecentAnalysis[];
  alerts: DashboardAlert[];
}
