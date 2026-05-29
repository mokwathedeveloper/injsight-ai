import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { unwrapData } from "@/lib/apiClient";

export interface DashboardSummary {
  total_analyses: number;
  avg_risk_score: number;
  saved_wallets: number;
  active_alerts: number;
  recent_analyses: DashboardRecentAnalysis[];
}

export interface DashboardRecentAnalysis {
  id: string;
  wallet_address: string;
  label?: string;
  risk_score?: number | { score: number; risk_level: string };
  total_value_usd?: number;
  analyzed_at?: string;
  created_at?: string;
  status?: string;
}

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async (): Promise<DashboardSummary> => {
      const res = await apiClient.get("/v1/dashboard/summary"); const data = unwrapData(res) as DashboardSummary;
      return data;
    },
    staleTime: 30_000,
  });
}
