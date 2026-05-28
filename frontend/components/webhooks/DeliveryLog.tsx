import * as React from "react";
import { Card } from "@/components/ui/Card";
import { WebhookDelivery, WEBHOOK_EVENT_LABELS } from "@/types/webhooks";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeliveryLog({ deliveries }: { deliveries: WebhookDelivery[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Recent Deliveries</h3>
      </div>
      <div className="divide-y divide-border/50">
        {deliveries.map((d) => (
          <div key={d.id} className="flex items-center gap-4 px-6 py-3 hover:bg-hover/30 transition-colors">
            {d.success ? (
              <CheckCircle2 size={16} className="text-success shrink-0" />
            ) : (
              <XCircle size={16} className="text-error shrink-0" />
            )}
            <span className="text-xs font-mono text-text-disabled w-16 shrink-0">{d.time}</span>
            <span className="text-xs text-text-secondary flex-1 truncate">{WEBHOOK_EVENT_LABELS[d.event]}</span>
            <span className={cn("text-xs font-mono font-bold shrink-0", d.success ? "text-success" : "text-error")}>{d.statusCode}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
