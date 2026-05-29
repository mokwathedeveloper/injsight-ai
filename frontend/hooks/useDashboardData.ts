"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { walletsApi, alertsApi, reportsApi, analysisApi } from "@/lib/api/endpoints";
import {
  adaptWallet,
  adaptAlert,
  adaptReport,
  adaptHistoryEntry,
  adaptRecentAnalysis,
  adaptDashboardAlert,
} from "@/lib/api/adapters";
import { useAuthStore } from "@/store/auth";
import type { UserDashboardData } from "@/types/user-dashboard";

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

/**
 * Composes the Overview dashboard payload from live wallets, alerts, and
 * analysis history. Returns null when not authenticated so the page can fall
 * back to mock data.
 */
export function useUserDashboard(): UserDashboardData | null {
  const authed = useAuthStore((s) => !!s.accessToken);
  const wallets = useWallets();
  const alerts = useAlerts();
  const history = useAnalysisHistory();

  return React.useMemo(() => {
    if (!authed || !wallets.data || !alerts.data || !history.data) return null;
    const w = wallets.data;
    const analyzed = w.filter((x) => x.riskScore > 0);
    const avgRisk = analyzed.length
      ? Math.round(analyzed.reduce((s, x) => s + x.riskScore, 0) / analyzed.length)
      : 0;
    return {
      stats: {
        totalWallets: w.length,
        totalValueUsd: w.reduce((s, x) => s + (x.totalValueUsd || 0), 0),
        activeAlerts: alerts.data.filter((a) => !a.isRead).length,
        riskScoreAvg: avgRisk,
      },
      recentAnalyses: history.data.slice(0, 5).map(adaptRecentAnalysis),
      alerts: alerts.data.slice(0, 5).map(adaptDashboardAlert),
    };
  }, [authed, wallets.data, alerts.data, history.data]);
}
