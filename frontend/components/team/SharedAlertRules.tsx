"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SharedAlertRule } from "@/types/team";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function SharedAlertRules({ rules: initialRules }: { rules: SharedAlertRule[] }) {
  const [rules, setRules] = React.useState(initialRules);

  const toggle = (id: string) =>
    setRules((rs) => rs.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border flex items-center gap-2">
        <Bell size={16} className="text-primary" />
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Shared Alert Rules</h3>
      </div>
      <div className="divide-y divide-border/50">
        {rules.map((rule) => (
          <div key={rule.id} className="flex items-center justify-between p-5 hover:bg-hover/30 transition-colors gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-bold text-text-primary">{rule.name}</p>
                <Badge variant="secondary">{rule.channel}</Badge>
              </div>
              <p className="text-xs text-text-secondary">{rule.condition} · <span className="text-text-disabled">{rule.scope}</span></p>
            </div>
            <button
              role="switch"
              aria-checked={rule.enabled}
              aria-label={`Toggle ${rule.name}`}
              onClick={() => toggle(rule.id)}
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors shrink-0",
                rule.enabled ? "bg-primary" : "bg-hover border border-border"
              )}
            >
              <span className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
                rule.enabled && "translate-x-5"
              )} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
