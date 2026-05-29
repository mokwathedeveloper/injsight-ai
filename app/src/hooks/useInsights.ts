import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, unwrapData } from "@/lib/apiClient";

export interface InsightItem {
  id:            string;
  type:          string;
  severity:      "critical" | "high" | "medium" | "low" | "info";
  severityLabel: string;
  title:         string;
  description:   string;
  wallet:        string;
  walletLabel:   string;
  walletId:      string;
  riskScore:     number;
  analyzedAt:    string | null;
  isNew:         boolean;
}

export interface InsightsStats {
  total:        number;
  highPriority: number;
  thisWeek:     number;
  avgRiskScore: number;
}

export interface InsightsData {
  insights: InsightItem[];
  stats:    InsightsStats;
}

export function useInsights() {
  return useQuery({
    queryKey: ["insights"],
    queryFn: async (): Promise<InsightsData> => {
      const res  = await apiClient.get("/insights");
      const data = unwrapData(res) as InsightsData;
      return data ?? { insights: [], stats: { total: 0, highPriority: 0, thisWeek: 0, avgRiskScore: 0 } };
    },
    staleTime: 60_000,
  });
}

export function useGenerateInsights() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (): Promise<InsightsData> => {
      const res  = await apiClient.post("/insights/generate");
      return unwrapData(res) as InsightsData;
    },
    onSuccess: (data) => {
      // Immediately update the cache with fresh data
      qc.setQueryData(["insights"], data);
    },
  });
}
