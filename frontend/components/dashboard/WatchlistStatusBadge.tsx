import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";

interface WatchlistStatusBadgeProps {
  status: "syncing" | "up-to-date" | "alert";
  className?: string;
}

export function WatchlistStatusBadge({ status, className }: WatchlistStatusBadgeProps) {
  const config = {
    syncing: { label: "Syncing", variant: "default" as const, icon: RefreshCw, iconClass: "animate-spin text-primary" },
    "up-to-date": { label: "Live", variant: "success" as const, icon: CheckCircle2, iconClass: "text-success" },
    alert: { label: "Alert", variant: "error" as const, icon: AlertTriangle, iconClass: "text-error animate-pulse" },
  };

  const { label, variant, icon: Icon, iconClass } = config[status];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon size={12} className={iconClass} />
      <Badge variant={variant} className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
        {label}
      </Badge>
    </div>
  );
}
