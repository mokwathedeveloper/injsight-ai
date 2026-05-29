import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { unwrapData } from "@/lib/apiClient";

export interface SavedWalletAPI {
  id: string;
  address: string;
  label?: string;
  chain?: string;
  // Backend returns camelCase (riskScore, riskLevel, etc.)
  riskScore?: number;
  riskLevel?: string;
  totalValueUsd?: number;
  lastAnalyzedAt?: string;
  createdAt?: string;
  // snake_case aliases for components that use old naming
  risk_score?: number;
  risk_level?: string;
  total_value_usd?: number;
  last_analyzed_at?: string;
  latestAnalysis?: unknown;
}

export function useSavedWallets() {
  return useQuery({
    queryKey: ["saved-wallets"],
    queryFn: async (): Promise<SavedWalletAPI[]> => {
      const res = await apiClient.get("/wallets"); const data = (unwrapData(res) as SavedWalletAPI[]) ?? [];
      return data;
    },
  });
}

export function useSaveWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { walletAddress: string; label?: string }): Promise<SavedWalletAPI> => {
      const res = await apiClient.post("/wallets", payload);
      return unwrapData(res) as SavedWalletAPI;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["saved-wallets"] }),
  });
}

export function useDeleteWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.delete(`/wallets/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["saved-wallets"] }),
  });
}
