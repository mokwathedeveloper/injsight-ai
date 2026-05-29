"use client";

import { Bell, AlertTriangle, Info, CheckCircle, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui";

const MOCK_ALERTS = [
  { id: "1", type: "risk_change",    severity: "high",    title: "High Concentration Detected", message: "INJ token exceeds 80% allocation in wallet inj1qg5...kkxh. This increases single-asset risk significantly.", wallet: "inj1qg5...kkxh", time: "2 hours ago", read: false },
  { id: "2", type: "risk_change",    severity: "warning", title: "Risk Score Increase",          message: "Wallet inj1abc...def moved from Medium Risk to High Risk tier.", wallet: "inj1abc...def", time: "5 hours ago", read: false },
  { id: "3", type: "large_transfer", severity: "info",    title: "New Wallet Added",             message: "Wallet inj1xyz...ghi has been added to your Watchlist A.", wallet: "inj1xyz...ghi", time: "1 day ago", read: true },
  { id: "4", type: "price_alert",    severity: "info",    title: "INJ Price Alert",              message: "INJ price crossed $45.00 threshold. Portfolio value updated to $248,450.", wallet: "inj1qg5...kkxh", time: "2 days ago", read: true },
];

const iconMap = {
  high:    { Icon: AlertTriangle, color: "text-danger",  bg: "bg-danger-muted" },
  warning: { Icon: AlertTriangle, color: "text-warning", bg: "bg-warning-muted" },
  info:    { Icon: Info,          color: "text-accent",  bg: "bg-accent-muted" },
  success: { Icon: CheckCircle,   color: "text-success", bg: "bg-success-muted" },
};

export function AlertsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Alerts</h1>
          <p className="text-sm text-text-secondary">Stay informed about risk changes and wallet activity.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Check className="h-3.5 w-3.5" /> Mark All Read
          </Button>
          <Button variant="secondary" size="sm" className="text-danger">
            <Trash2 className="h-3.5 w-3.5" /> Clear All
          </Button>
        </div>
      </div>

      {/* Unread count */}
      <div className="flex items-center gap-2">
        <span className="badge-danger">2 unread</span>
        <span className="text-xs text-text-muted">·</span>
        <span className="text-xs text-text-muted">{MOCK_ALERTS.length} total alerts</span>
      </div>

      <div className="space-y-3">
        {MOCK_ALERTS.map((alert) => {
          const { Icon, color, bg } = iconMap[alert.severity as keyof typeof iconMap] ?? iconMap.info;
          return (
            <div key={alert.id} className={`glass-card p-4 flex gap-4 ${!alert.read ? "border-l-2 border-l-accent" : ""}`}>
              <div className={`p-2 rounded-lg ${bg} h-fit shrink-0`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold text-text-primary">{alert.title}</p>
                      {!alert.read && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{alert.message}</p>
                    <p className="text-[10px] text-text-muted mt-1">Wallet: {alert.wallet} · {alert.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
