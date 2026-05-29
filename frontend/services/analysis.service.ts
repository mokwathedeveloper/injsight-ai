/**
 * Analysis service — abstract layer for wallet analysis flows.
 *
 * Wraps both the public (unauthenticated) analyze endpoint and the
 * authenticated saved-analysis endpoints. Callers never import from
 * lib/api directly; swapping mock ↔ real backend is a change here only.
 */
import { analysisApi } from "@/lib/api/endpoints";
import { adaptAnalysis, adaptHistoryEntry } from "@/lib/api/adapters";
import type { WalletAnalysisResult } from "@/types/wallet-analyzer";
import type { AnalysisHistoryEntry } from "@/types/analysis-history";
import { mockAnalysisResult } from "@/data/wallet-analyzer";
import { MOCK_ANALYSIS_HISTORY } from "@/data/analysis-history-mock";

export const analysisService = {
  /**
   * Run a public wallet analysis (no auth required).
   * Falls back to labeled mock data when the API is unreachable.
   */
  async analyzeWallet(address: string): Promise<WalletAnalysisResult> {
    try {
      const data = await analysisApi.publicAnalyze(address);
      return adaptAnalysis(data);
    } catch {
      return { ...mockAnalysisResult, address };
    }
  },

  /** Load the demo wallet analysis (pre-seeded deterministic data). */
  async getDemoWallet(): Promise<WalletAnalysisResult> {
    try {
      const data = await analysisApi.demoWallet();
      return adaptAnalysis(data);
    } catch {
      return mockAnalysisResult;
    }
  },

  /**
   * Run an analysis and persist it to the authenticated user's history.
   * Requires a valid access token in the auth store.
   */
  async createAndSaveAnalysis(address: string): Promise<WalletAnalysisResult> {
    const data = await analysisApi.create(address, true);
    return adaptAnalysis(data);
  },

  /** Fetch the full analysis history for the authenticated user. */
  async getHistory(): Promise<AnalysisHistoryEntry[]> {
    try {
      const data = await analysisApi.list();
      return data.map(adaptHistoryEntry);
    } catch {
      return MOCK_ANALYSIS_HISTORY;
    }
  },

  /** Fetch a single analysis result by ID. */
  async getById(id: string): Promise<WalletAnalysisResult> {
    const data = await analysisApi.get(id);
    return adaptAnalysis(data);
  },
};
