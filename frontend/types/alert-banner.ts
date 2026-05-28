import { AlertType, AlertSeverity } from "./alerts";

export interface GlobalAlertBannerData {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  actionLabel?: string;
  actionUrl?: string;
  isPersistent: boolean;
}
