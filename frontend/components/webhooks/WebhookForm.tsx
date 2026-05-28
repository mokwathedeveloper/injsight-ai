"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { WebhookEvent, WEBHOOK_EVENT_LABELS } from "@/types/webhooks";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface WebhookFormProps {
  onAdd: (url: string, events: WebhookEvent[]) => void;
}

const ALL_EVENTS = Object.keys(WEBHOOK_EVENT_LABELS) as WebhookEvent[];

export function WebhookForm({ onAdd }: WebhookFormProps) {
  const [url, setUrl] = React.useState("");
  const [events, setEvents] = React.useState<WebhookEvent[]>(["risk.changed"]);
  const [error, setError] = React.useState<string | null>(null);

  const toggleEvent = (e: WebhookEvent) =>
    setEvents((prev) => (prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]));

  const handleSubmit = () => {
    if (!/^https:\/\/.+/.test(url)) {
      setError("Enter a valid HTTPS endpoint URL.");
      return;
    }
    if (events.length === 0) {
      setError("Select at least one event to subscribe to.");
      return;
    }
    onAdd(url, events);
    setUrl("");
    setEvents(["risk.changed"]);
    setError(null);
  };

  return (
    <Card className="p-6 space-y-5">
      <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Add Endpoint</h3>

      <div className="space-y-2">
        <label htmlFor="wh-url" className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">Endpoint URL</label>
        <Input id="wh-url" value={url} onChange={(e) => { setUrl(e.target.value); setError(null); }} placeholder="https://api.yourapp.com/webhooks" className="h-11 font-mono" aria-invalid={!!error} />
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">Subscribe to events</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ALL_EVENTS.map((e) => {
            const checked = events.includes(e);
            return (
              <button
                key={e}
                type="button"
                onClick={() => toggleEvent(e)}
                aria-pressed={checked}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all",
                  checked ? "border-primary bg-primary/5" : "border-border bg-hover/20 hover:border-border-strong"
                )}
              >
                <span className={cn("w-4 h-4 rounded border flex items-center justify-center shrink-0", checked ? "bg-primary border-primary" : "border-border")}>
                  {checked && <span className="w-1.5 h-1.5 bg-white rounded-sm" />}
                </span>
                <span className="text-xs text-text-secondary">{WEBHOOK_EVENT_LABELS[e]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {error && <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">{error}</p>}

      <Button className="w-full h-11 gap-2 font-bold text-xs uppercase tracking-widest" onClick={handleSubmit}>
        <Plus size={16} /> Add webhook
      </Button>
    </Card>
  );
}
