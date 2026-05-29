/**
 * Wallet store — client-side state for the active wallet analysis session.
 *
 * Does NOT persist to localStorage (analysis results are ephemeral per session).
 * Saved wallets and history are server state — handled by TanStack Query hooks.
 */
import { create } from "zustand";
import type { WalletAnalysisResult } from "@/types/wallet-analyzer";

type AnalysisStatus = "idle" | "loading" | "success" | "error";

interface WalletState {
  /** The address currently being analyzed (or the last one analyzed). */
  activeAddress: string | null;
  /** Result of the most recent analysis in this session. */
  lastResult: WalletAnalysisResult | null;
  /** Status of the in-progress or last analysis. */
  status: AnalysisStatus;
  /** Error message if status === "error". */
  errorMessage: string | null;

  setActiveAddress: (address: string) => void;
  setLoading: () => void;
  setResult: (result: WalletAnalysisResult) => void;
  setError: (message: string) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  activeAddress: null,
  lastResult: null,
  status: "idle",
  errorMessage: null,

  setActiveAddress: (address) => set({ activeAddress: address }),
  setLoading: () => set({ status: "loading", errorMessage: null }),
  setResult: (result) => set({ lastResult: result, status: "success", errorMessage: null }),
  setError: (message) => set({ status: "error", errorMessage: message }),
  reset: () => set({ activeAddress: null, lastResult: null, status: "idle", errorMessage: null }),
}));
