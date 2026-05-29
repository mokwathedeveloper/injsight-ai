"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { WebhookTable } from "@/components/webhooks/WebhookTable";
import { WebhookForm } from "@/components/webhooks/WebhookForm";
import { DeliveryLog } from "@/components/webhooks/DeliveryLog";
import { MOCK_WEBHOOKS, MOCK_WEBHOOK_DELIVERIES } from "@/data/webhooks-mock";
import { Webhook, WebhookEvent } from "@/types/webhooks";
import { Webhook as WebhookIcon } from "lucide-react";
import { developerApi } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth";

export default function WebhooksPage() {
  const authed = useAuthStore((s) => !!s.accessToken);
  const [webhooks, setWebhooks] = React.useState<Webhook[]>(MOCK_WEBHOOKS);
  const [deliveries, setDeliveries] = React.useState(MOCK_WEBHOOK_DELIVERIES);

  React.useEffect(() => {
    if (!authed) return;
    developerApi.listWebhooks().then((wh: any[]) => { if (wh.length >= 0) setWebhooks(wh); }).catch(() => {});
    developerApi.deliveries().then((d: any[]) => { if (d?.length) setDeliveries(d); }).catch(() => {});
  }, [authed]);

  const handleAdd = (url: string, events: WebhookEvent[]) => {
    if (authed) {
      developerApi.createWebhook(url, events)
        .then((wh: any) => setWebhooks((prev) => [wh, ...prev]))
        .catch(() => {});
    } else {
      setWebhooks((prev) => [
        { id: `wh-${Date.now()}`, url, events, status: "active", createdAt: "Just now" },
        ...prev,
      ]);
    }
  };
  const handleDelete = (id: string) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
    if (authed) developerApi.deleteWebhook(id).catch(() => {});
  };

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <WebhookIcon size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Webhook <span className="text-primary">Alerts</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">Receive real-time events at your own endpoints — for teams and integrations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <WebhookTable webhooks={webhooks} onDelete={handleDelete} />
            <DeliveryLog deliveries={deliveries} />
          </div>
          <div className="lg:col-span-1">
            <WebhookForm onAdd={handleAdd} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
