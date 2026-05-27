export type AlertType = "risk" | "yield" | "security" | "system";
export type AlertSeverity = "low" | "medium" | "high" | "critical";

export interface DashboardAlertEntry {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  walletAddress?: string;
  walletLabel?: string;
}

export interface AlertFilters {
  search: string;
  type: AlertType | "all";
  severity: AlertSeverity | "all";
  isRead: boolean | "all";
}
