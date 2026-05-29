"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { walletsApi, alertsApi, reportsApi, analysisApi } from "@/lib/api/endpoints";
import { adaptWallet, adaptAlert, adaptReport, adaptHistoryEntry } from "@/lib/api/adapters";
import { useAuthStore } from "@/store/auth";

/**
 * Dashboard data hooks. Queries are only enabled when authenticated, so
 * logged-out users transparently fall back to mock data in the pages.
 */

export function useWallets() {
  const enabled = useAuthStore((s) => !!s.accessToken);
  return useQuery({
    queryKey: ["wallets"],
    enabled,
    queryFn: async () => (await walletsApi.list()).map(adaptWallet),
  });
}

export function useSaveWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { address: string; label?: string }) =>
      walletsApi.save(input.address, input.label),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wallets"] }),
  });
}

export function useDeleteWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => walletsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wallets"] }),
  });
}

export function useAnalyzeSavedWallet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => walletsApi.analyze(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["wallets"] });
      qc.invalidateQueries({ queryKey: ["analysis-history"] });
      qc.invalidateQueries({ queryKey: ["reports"] });
    },
  });
}

export function useAnalysisHistory() {
  const enabled = useAuthStore((s) => !!s.accessToken);
  return useQuery({
    queryKey: ["analysis-history"],
    enabled,
    queryFn: async () => (await analysisApi.list()).map(adaptHistoryEntry),
  });
}

export function useAlerts() {
  const enabled = useAuthStore((s) => !!s.accessToken);
  return useQuery({
    queryKey: ["alerts"],
    enabled,
    queryFn: async () => (await alertsApi.list()).map(adaptAlert),
  });
}

export function useMarkAlertRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => alertsApi.markRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alerts"] }),
  });
}

export function useMarkAllAlertsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => alertsApi.markAllRead(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alerts"] }),
  });
}

export function useDeleteAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => alertsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alerts"] }),
  });
}

export function useReports() {
  const enabled = useAuthStore((s) => !!s.accessToken);
  return useQuery({
    queryKey: ["reports"],
    enabled,
    queryFn: async () => (await reportsApi.list()).map(adaptReport),
  });
}
