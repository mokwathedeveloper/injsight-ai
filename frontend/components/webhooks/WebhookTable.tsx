import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TestWebhookButton } from "./TestWebhookButton";
import { Webhook, WEBHOOK_EVENT_LABELS } from "@/types/webhooks";
import { Trash2, Webhook as WebhookIcon } from "lucide-react";

interface WebhookTableProps {
  webhooks: Webhook[];
  onDelete: (id: string) => void;
}

export function WebhookTable({ webhooks, onDelete }: WebhookTableProps) {
  if (webhooks.length === 0) {
    return (
      <Card className="p-12 text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-hover border border-border flex items-center justify-center mx-auto text-text-disabled">
          <WebhookIcon size={22} />
        </div>
        <p className="text-text-primary font-bold">No webhooks configured</p>
        <p className="text-text-secondary text-sm">Add an endpoint to start receiving real-time events.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {webhooks.map((wh) => (
        <Card key={wh.id} className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono text-text-primary truncate">{wh.url}</code>
                <Badge variant={wh.status === "active" ? "success" : "warning"}>{wh.status}</Badge>
              </div>
              <p className="text-[11px] text-text-disabled">Created {wh.createdAt}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <TestWebhookButton disabled={wh.status === "paused"} />
              <button onClick={() => onDelete(wh.id)} className="p-2 rounded-lg text-text-disabled hover:text-error hover:bg-error/10 transition-colors" aria-label="Delete webhook">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
            {wh.events.map((e) => (
              <Badge key={e} variant="secondary">{WEBHOOK_EVENT_LABELS[e]}</Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
