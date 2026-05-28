export type WebhookStatus = "active" | "paused";

export type WebhookEvent =
  | "risk.changed"
  | "wallet.large_movement"
  | "report.generated"
  | "alert.triggered";

export interface Webhook {
  id: string;
  url: string;
  events: WebhookEvent[];
  status: WebhookStatus;
  createdAt: string;
}

export interface WebhookDelivery {
  id: string;
  time: string;
  event: WebhookEvent;
  statusCode: number;
  success: boolean;
}

export const WEBHOOK_EVENT_LABELS: Record<WebhookEvent, string> = {
  "risk.changed": "Risk score changed",
  "wallet.large_movement": "Large wallet movement",
  "report.generated": "Report generated",
  "alert.triggered": "Alert triggered",
};
