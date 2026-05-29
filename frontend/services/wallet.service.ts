/**
 * Wallet service — abstract layer between UI and the backend API.
 *
 * Callers import from this file; swapping mock ↔ real is a single change here.
 * The live backend is already wired in lib/api/endpoints.ts; these service
 * functions wrap those calls with the richer domain logic the UI needs.
 */
import { walletsApi, analysisApi } from "@/lib/api/endpoints";
import { adaptWallet, adaptHistoryEntry, adaptAnalysis } from "@/lib/api/adapters";
import type { SavedWallet } from "@/types/saved-wallets";
import type { AnalysisHistoryEntry } from "@/types/analysis-history";
import type { WalletAnalysisResult } from "@/types/wallet-analyzer";
import { MOCK_SAVED_WALLETS } from "@/data/saved-wallets-mock";
import { MOCK_ANALYSIS_HISTORY } from "@/data/analysis-history-mock";
import { mockAnalysisResult } from "@/data/wallet-analyzer";

export const walletService = {
  /**
   * Fetch the authenticated user's saved wallets.
   * Falls back to mock data when the API is unreachable.
   */
  async getSavedWallets(): Promise<SavedWallet[]> {
    try {
      const data = await walletsApi.list();
      return data.map(adaptWallet);
    } catch {
      return MOCK_SAVED_WALLETS;
    }
  },

  /** Save a new wallet for the authenticated user. */
  async saveWallet(address: string, label?: string): Promise<SavedWallet> {
    const data = await walletsApi.save(address, label);
    return adaptWallet(data);
  },

  /** Delete a saved wallet. */
  async deleteWallet(id: string): Promise<void> {
    await walletsApi.remove(id);
  },

  /**
   * Analyze a wallet address (public — no auth required).
   * Falls back gracefully if the API is down.
   */
  async analyzeWallet(address: string): Promise<WalletAnalysisResult> {
    try {
      const data = await analysisApi.publicAnalyze(address);
      return adaptAnalysis(data);
    } catch {
      return { ...mockAnalysisResult, address };
    }
  },

  /** Fetch the analysis history for the authenticated user. */
  async getAnalysisHistory(): Promise<AnalysisHistoryEntry[]> {
    try {
      const data = await analysisApi.list();
      return data.map(adaptHistoryEntry);
    } catch {
      return MOCK_ANALYSIS_HISTORY;
    }
  },
};
