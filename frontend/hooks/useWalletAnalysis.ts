"use client";

import { useMutation } from "@tanstack/react-query";
import { analysisApi } from "@/lib/api/endpoints";
import { adaptAnalysis } from "@/lib/api/adapters";
import { ApiError } from "@/lib/api/client";
import type { WalletAnalysisResult } from "@/types/wallet-analyzer";

/**
 * Analyze a wallet against the live backend, returning the UI-shaped result.
 * Throws ApiError (e.g. INVALID_WALLET 422, NETWORK_ERROR 0) for the caller
 * to surface or fall back from.
 */
export function useWalletAnalysis() {
  return useMutation<WalletAnalysisResult, ApiError, string>({
    mutationFn: async (address: string) => {
      const result = await analysisApi.publicAnalyze(address);
      return adaptAnalysis(result);
    },
  });
}
