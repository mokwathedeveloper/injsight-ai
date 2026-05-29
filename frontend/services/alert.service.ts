/**
 * Alert service — abstract layer for dashboard notification alerts.
 */
import { alertsApi } from "@/lib/api/endpoints";
import { adaptAlert } from "@/lib/api/adapters";
import type { DashboardAlertEntry } from "@/types/alerts";
import { MOCK_ALERTS_LOG } from "@/data/alerts-mock";

export const alertService = {
  /** List all alerts for the authenticated user. */
  async getAlerts(): Promise<DashboardAlertEntry[]> {
    try {
      const data = await alertsApi.list();
      return data.map(adaptAlert);
    } catch {
      return MOCK_ALERTS_LOG;
    }
  },

  /** Mark a single alert as read. */
  async markRead(id: string): Promise<void> {
    await alertsApi.markRead(id);
  },

  /** Mark all alerts as read. */
  async markAllRead(): Promise<void> {
    await alertsApi.markAllRead();
  },

  /** Delete an alert. */
  async deleteAlert(id: string): Promise<void> {
    await alertsApi.remove(id);
  },

  /** Return the count of unread alerts (from an already-fetched list). */
  unreadCount(alerts: DashboardAlertEntry[]): number {
    return alerts.filter((a) => !a.isRead).length;
  },
};
