import { Webhook, WebhookDelivery } from "@/types/webhooks";

export const MOCK_WEBHOOKS: Webhook[] = [
  {
    id: "wh-1",
    url: "https://api.ninjacap.io/hooks/injsight",
    events: ["risk.changed", "wallet.large_movement"],
    status: "active",
    createdAt: "Apr 18, 2026",
  },
  {
    id: "wh-2",
    url: "https://hooks.slack.com/services/T0/B0/xyz",
    events: ["alert.triggered", "report.generated"],
    status: "paused",
    createdAt: "Mar 02, 2026",
  },
];

export const MOCK_WEBHOOK_DELIVERIES: WebhookDelivery[] = [
  { id: "d-1", time: "23:54:10", event: "risk.changed", statusCode: 200, success: true },
  { id: "d-2", time: "23:40:02", event: "wallet.large_movement", statusCode: 200, success: true },
  { id: "d-3", time: "22:18:44", event: "risk.changed", statusCode: 500, success: false },
  { id: "d-4", time: "21:05:31", event: "alert.triggered", statusCode: 200, success: true },
  { id: "d-5", time: "20:12:09", event: "report.generated", statusCode: 408, success: false },
];
