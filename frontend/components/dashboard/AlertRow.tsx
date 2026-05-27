"use client";

import * as React from "react";
import { DashboardAlertEntry, AlertType, AlertSeverity } from "@/types/alerts";
import { 
  AlertTriangle, 
  TrendingUp, 
  Lock, 
  Bell, 
  MoreHorizontal, 
  CheckCircle2, 
  ExternalLink,
  Trash2,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

const TYPE_CONFIG: Record<AlertType, { icon: any; label: string }> = {
  risk: { icon: AlertTriangle, label: "Risk" },
  yield: { icon: TrendingUp, label: "Yield" },
  security: { icon: Lock, label: "Security" },
  system: { icon: Bell, label: "System" },
};

const SEVERITY_CONFIG: Record<AlertSeverity, { color: string; bgColor: string; border: string }> = {
  low: { color: "text-accent", bgColor: "bg-accent/10", border: "border-accent/20" },
  medium: { color: "text-warning", bgColor: "bg-warning/10", border: "border-warning/20" },
  high: { color: "text-error", bgColor: "bg-error/10", border: "border-error/20" },
  critical: { color: "text-error", bgColor: "bg-error/20", border: "border-error/40" },
};

interface AlertRowProps {
  alert: DashboardAlertEntry;
  onDelete?: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
}

export function AlertRow({ alert, onDelete, onMarkAsRead }: AlertRowProps) {
  const [showMenu, setShowMenu] = React.useState(false);
  const typeConfig = TYPE_CONFIG[alert.type];
  const severityConfig = SEVERITY_CONFIG[alert.severity];
  const Icon = typeConfig.icon;
  const date = new Date(alert.timestamp);

  return (
    <div className={cn(
      "group flex items-start gap-4 p-5 hover:bg-hover transition-colors border-b border-border/50 last:border-0 relative",
      !alert.isRead && "bg-primary/[0.02]"
    )}>
      {/* Unread Indicator */}
      {!alert.isRead && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(0,102,255,0.5)]" />
      )}

      {/* Icon */}
      <div className={cn(
        "p-3 rounded-2xl border shrink-0 transition-transform group-hover:scale-110",
        severityConfig.bgColor,
        severityConfig.border,
        severityConfig.color
      )}>
        <Icon size={20} />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1.5 pt-0.5 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors truncate">
              {alert.title}
            </h4>
            <Badge variant="secondary" className="text-[8px] py-0 px-1 font-mono uppercase shrink-0">
              {alert.type}
            </Badge>
          </div>
          <span className="text-[10px] text-text-disabled font-medium whitespace-nowrap">
            {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <p className="text-xs text-text-secondary leading-relaxed max-w-2xl">
          {alert.message}
        </p>

        {alert.walletAddress && (
          <div className="flex items-center gap-3 pt-1">
             <div className="flex items-center gap-1.5 text-[10px] text-text-disabled font-bold uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                <span>{alert.walletLabel || "Tracked Wallet"}</span>
             </div>
             <code className="text-[9px] font-mono text-text-disabled/60 truncate max-w-[120px] bg-hover/50 px-2 py-0.5 rounded">
                {alert.walletAddress}
             </code>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button 
          onClick={() => onMarkAsRead?.(alert.id)}
          className={cn(
            "p-2 hover:bg-hover rounded-lg transition-colors",
            alert.isRead ? "text-text-disabled opacity-30" : "text-primary hover:text-primary-hover"
          )}
          title={alert.isRead ? "Already read" : "Mark as read"}
          disabled={alert.isRead}
        >
          <CheckCircle2 size={18} />
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-text-primary transition-colors"
          >
            <MoreHorizontal size={18} />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-[#161B22] border border-border-strong rounded-xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {alert.walletAddress && (
                  <Link 
                    href={`/dashboard/wallets/${alert.walletAddress}`}
                    className="w-full flex items-center gap-3 px-4 py-3 text-xs text-text-secondary hover:text-text-primary hover:bg-hover transition-colors"
                  >
                    <Eye size={14} />
                    <span>View Wallet</span>
                  </Link>
                )}
                <div className="border-t border-border/50" />
                <button 
                  onClick={() => {
                    onDelete?.(alert.id);
                    setShowMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs text-error hover:bg-error/10 transition-colors"
                >
                  <Trash2 size={14} />
                  <span>Dismiss Alert</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
