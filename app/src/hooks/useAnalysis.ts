import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient, unwrapData } from "@/lib/apiClient";

export interface TokenHolding {
  symbol: string; name: string; category: string; denom: string;
  amount: number; price: number; value_usd: number; percent: number;
}

export interface AnalysisResult {
  id: string;
  walletAddress: string;
  chain: string;
  status: string;
  dataSource: string;
  completedAt: string;
  is_demo?: boolean;
  portfolio: { totalValueUsd: number; tokenCount: number; holdings: TokenHolding[] };
  riskScore: {
    score: number;
    level: string;                // API returns "level", not "riskLevel"
    dimensions: {
      concentration: number;
      volatility: number;
      stablecoinBuffer: number;
      activity: number;
      diversification: number;
    };
    methodologyVersion?: string;
  };
  aiReport: {                     // API returns "aiReport", not "report"
    summary: string;
    concentrationAnalysis: string;
    riskExplanation: string;
    injectiveContext: string;
    suggestedNextSteps: string[];
    disclaimer: string;
  };
}

export function useAnalyzeWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (address: string): Promise<AnalysisResult> => {
      const res = await apiClient.post("/public/analyze-wallet", { walletAddress: address });
      return unwrapData(res) as AnalysisResult;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["analysis-history"] });
      qc.invalidateQueries({ queryKey: ["dashboard-summary"] });
    },
  });
}

export function useAnalysisHistory() {
  return useQuery({
    queryKey: ["analysis-history"],
    queryFn: async (): Promise<AnalysisResult[]> => {
      const res = await apiClient.get("/analysis");
      return (unwrapData(res) as AnalysisResult[]) ?? [];
    },
  });
}

export function useAnalysisById(id: string | null) {
  return useQuery({
    queryKey: ["analysis", id],
    queryFn: async (): Promise<AnalysisResult> => {
      const res = await apiClient.get(`/analysis/${id}`);
      return unwrapData(res) as AnalysisResult;
    },
    enabled: !!id,
  });
}
