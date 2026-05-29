"use client";

/**
 * useAlerts — convenience hook that wraps the underlying alert queries
 * and mutations with ergonomic loading / error / data states.
 *
 * Used in the Alerts page and the dashboard alerts panel.
 */
import {
  useAlerts as _useAlerts,
  useMarkAlertRead,
  useMarkAllAlertsRead,
  useDeleteAlert,
} from "./useDashboardData";
import { alertService } from "@/services/alert.service";

export function useAlerts() {
  const query       = _useAlerts();
  const markRead    = useMarkAlertRead();
  const markAll     = useMarkAllAlertsRead();
  const remove      = useDeleteAlert();

  const alerts       = query.data ?? [];
  const unreadCount  = alertService.unreadCount(alerts);

  return {
    alerts,
    unreadCount,
    isLoading: query.isLoading,
    isError:   query.isError,
    markRead:     (id: string) => markRead.mutateAsync(id),
    markAllRead:  ()            => markAll.mutateAsync(),
    deleteAlert:  (id: string) => remove.mutateAsync(id),
    isMarkingRead: markRead.isPending,
  };
}
