"use client";

/**
 * useSavedWallets — convenience hook that wraps the underlying wallet queries
 * and mutations with ergonomic loading / error / data states.
 *
 * Used in the Saved Wallets page and any component that needs wallet CRUD.
 */
import { useWallets, useSaveWallet, useDeleteWallet, useAnalyzeSavedWallet } from "./useDashboardData";

export function useSavedWallets() {
  const query    = useWallets();
  const save     = useSaveWallet();
  const remove   = useDeleteWallet();
  const analyze  = useAnalyzeSavedWallet();

  return {
    /** Fetched wallet list (undefined while loading). */
    wallets:      query.data ?? [],
    isLoading:    query.isLoading,
    isError:      query.isError,
    /** Add a wallet and refresh the list. */
    addWallet:    (address: string, label?: string) => save.mutateAsync({ address, label }),
    /** Remove a wallet by id. */
    removeWallet: (id: string) => remove.mutateAsync(id),
    /** Run a fresh analysis on a saved wallet. */
    analyzeWallet: (id: string) => analyze.mutateAsync(id),
    isSaving:     save.isPending,
    isRemoving:   remove.isPending,
    isAnalyzing:  analyze.isPending,
  };
}
