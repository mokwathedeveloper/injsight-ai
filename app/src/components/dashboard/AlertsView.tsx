"use client";

import { useState } from "react";
import { AlertTriangle, Info, CheckCircle, X, Trash2, Check, Filter, Search, Eye, Gauge, FileText } from "lucide-react";
import { Button, LoadingState, EmptyState, ErrorState } from "@/components/ui";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAlerts, useMarkAlertRead } from "@/hooks/useAlerts";

const ALERT_TYPES = ["All Alerts", "Risk Alerts", "Injective Alerts", "Watchlist", "Movement Alerts", "Report Alerts"];

const NOTIF_SETTINGS_DEFAULT = [
  { label: "In-App Notifications",  enabled: true  },
  { label: "Email Notifications",   enabled: true  },
  { label: "Risk Score Alerts",     enabled: true  },
  { label: "Movement Alerts",       enabled: false },
  { label: "Weekly Digest",         enabled: true  },
];

const QUICK_ACTIONS = [
  { label: "Mark all as read",           icon: Check,    action: "read"   },
  { label: "Clear all low alerts",       icon: Trash2,   action: "clear"  },
  { label: "Configure alert thresholds", icon: Gauge,    action: "config" },
  { label: "Export alert log",           icon: FileText, action: "export" },
];

const severityConfig: Record<string, { dot: string; badge: string; Icon: React.ElementType; text: string }> = {
  high:   { dot: "bg-danger",  badge: "badge-danger",  Icon: AlertTriangle, text: "High"   },
  medium: { dot: "bg-warning", badge: "badge-warning", Icon: AlertTriangle, text: "Medium" },
  low:    { dot: "bg-success", badge: "badge-success", Icon: CheckCircle,   text: "Low"    },
  info:   { dot: "bg-accent",  badge: "badge-accent",  Icon: Info,          text: "Info"   },
};

const SUMMARY_COLORS: Record<string, string> = {
  high:   "#EF4444",
  medium: "#F5C542",
  low:    "#22C55E",
  info:   "#58A6FF",
};

export function AlertsView() {
  const [activeTab, setActiveTab] = useState("All Alerts");
  const [searchQ, setSearchQ]     = useState("");
  const [settings, setSettings]   = useState(NOTIF_SETTINGS_DEFAULT.map(n => ({ ...n })));
  const [dismissed, setDismissed] = useState(false);

  const { data: alerts, isLoading, isError, refetch } = useAlerts();
  const markReadMutation = useMarkAlertRead();

  // ── loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Alerts</h1>
          <p className="text-sm text-text-secondary">Stay informed about risk changes and wallet activity.</p>
        </div>
        <LoadingState message="Loading alerts..." />
      </div>
    );
  }

  // ── error ─────────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Alerts</h1>
        </div>
        <div className="glass-card p-4">
          <ErrorState onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  const allAlerts = alerts ?? [];

  // Unread count — support both `status === "unread"` and `read === false`
  const unread = allAlerts.filter(a => a.status === "unread" || a.read === false).length;

  const filtered = allAlerts.filter(a => {
    if (searchQ &&
        !a.title.toLowerCase().includes(searchQ.toLowerCase()) &&
        !(a.wallet_label ?? "").toLowerCase().includes(searchQ.toLowerCase())) return false;
    if (activeTab === "Risk Alerts"     && a.type !== "risk")      return false;
    if (activeTab === "Movement Alerts" && a.type !== "movement")  return false;
    if (activeTab === "Watchlist"       && a.type !== "watchlist") return false;
    if (activeTab === "Report Alerts"   && a.type !== "report")    return false;
    return true;
  });

  // Build summary donut data from real alerts
  const severityCounts = allAlerts.reduce<Record<string, number>>((acc, a) => {
    const sev = (a.severity ?? "info").toLowerCase();
    acc[sev] = (acc[sev] ?? 0) + 1;
    return acc;
  }, {});

  const summaryData = Object.entries(severityCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1) + " Risk",
    value,
    color: SUMMARY_COLORS[name] ?? "#8B949E",
  }));

  const totalSummary = summaryData.reduce((s, d) => s + d.value, 0);

  // High-risk alert for banner
  const highRiskAlert = allAlerts.find(
    a => (a.severity === "high" || a.severity === "critical") && (a.status === "unread" || a.read === false)
  );

  return (
    <div className="space-y-5">
      {/* Top alert banner */}
      {!dismissed && highRiskAlert && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-danger-muted border border-danger/30 animate-slide-down">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-4 w-4 text-danger shrink-0" />
            <div>
              <span className="text-sm font-semibold text-danger">{highRiskAlert.title} — </span>
              <span className="text-sm text-text-secondary">{highRiskAlert.message}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="danger" size="sm">View Details</Button>
            <button onClick={() => setDismissed(true)} className="text-text-muted hover:text-text-primary p-1">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Alerts</h1>
          <p className="text-sm text-text-secondary">Stay informed about risk changes and wallet activity across all portfolios.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <Check className="h-3.5 w-3.5" /> Mark All Read
          </Button>
          <Button variant="secondary" size="sm" className="text-danger hover:text-danger">
            <Trash2 className="h-3.5 w-3.5" /> Clear All
          </Button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide border-b border-border pb-0">
        {ALERT_TYPES.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-4 py-2.5 text-xs font-semibold border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 pb-2">
          {unread > 0 && <span className="badge-danger text-xs">{unread} unread</span>}
          <span className="badge bg-surface-2 text-text-secondary border border-border">{filtered.length} alerts</span>
        </div>
      </div>

      {/* Empty state */}
      {allAlerts.length === 0 ? (
        <div className="glass-card p-4">
          <EmptyState
            title="No alerts yet"
            description="Alerts are generated automatically when your wallets change risk levels."
          />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left — alerts table */}
          <div className="lg:col-span-2 space-y-3">
            {/* Search + filter row */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
                <input
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  placeholder="Search alerts..."
                  className="input-field pl-9 py-2 text-xs h-9"
                />
              </div>
              <Button variant="secondary" size="sm">
                <Filter className="h-3.5 w-3.5" /> Filters
              </Button>
            </div>

            {/* Alert list */}
            <div className="glass-card overflow-hidden">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-text-muted">No alerts match your filters.</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-surface-2/50">
                      {["#", "Alert", "Type", "Severity", "Wallet", "Time", "Status", "Action"].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-text-muted uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((alert, i) => {
                      const sev = (alert.severity ?? "info").toLowerCase();
                      const sc = severityConfig[sev] ?? severityConfig.info;
                      const isUnread = alert.status === "unread" || alert.read === false;
                      return (
                        <tr
                          key={alert.id}
                          className={`border-b border-border/40 hover:bg-surface-2/50 transition-colors ${isUnread ? "bg-primary/5" : ""}`}
                        >
                          <td className="px-4 py-3 text-xs text-text-muted">{i + 1}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {isUnread && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                              <div>
                                <p className="text-xs font-semibold text-text-primary">{alert.title}</p>
                                <p className="text-[11px] text-text-muted truncate max-w-[180px]">{alert.message}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="badge bg-surface-2 text-text-secondary border border-border text-[10px] capitalize">
                              {alert.type ?? "general"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`${sc.badge} text-[10px]`}>{sc.text}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-xs text-text-primary font-medium">{alert.wallet_label ?? "—"}</p>
                              <p className="text-[10px] font-mono text-text-muted">{alert.wallet_address ?? ""}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[11px] text-text-muted whitespace-nowrap">
                            {alert.created_at
                              ? new Date(alert.created_at).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })
                              : (alert.time ?? "—")}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-semibold capitalize ${isUnread ? "text-accent" : "text-text-muted"}`}>
                              {isUnread ? "unread" : "read"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markReadMutation.mutate(alert.id)}
                                disabled={!isUnread || markReadMutation.isPending}
                                title="Mark as read"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-danger">
                                <X className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-surface-2/30">
                <p className="text-xs text-text-muted">Showing 1–{filtered.length} of {filtered.length} alerts</p>
                <div className="flex items-center gap-1">
                  <Button variant="secondary" size="sm" className="text-xs">Previous</Button>
                  <Button variant="secondary" size="sm" className="text-xs">Next</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar panels */}
          <div className="space-y-4">
            {/* Alert summary chart */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-1">Alerts Summary</h3>
              <p className="text-xs text-text-muted mb-3">Current alert distribution</p>
              {summaryData.length > 0 ? (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ResponsiveContainer width={90} height={90}>
                      <PieChart>
                        <Pie data={summaryData} cx="50%" cy="50%" innerRadius={28} outerRadius={42} dataKey="value" paddingAngle={2}>
                          {summaryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) =>
                            active && payload?.length ? (
                              <div className="glass-card px-2 py-1 text-[11px]">
                                <p className="text-text-primary font-semibold">{payload[0].payload.name}</p>
                                <p className="text-accent">{payload[0].value}</p>
                              </div>
                            ) : null
                          }
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base font-bold text-text-primary">{totalSummary}</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {summaryData.map(d => (
                      <div key={d.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                          <span className="text-[11px] text-text-muted">{d.name}</span>
                        </div>
                        <span className="text-xs font-bold text-text-primary">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-text-muted">No alert data to chart.</p>
              )}
            </div>

            {/* Notification settings — local UI state only */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Notification Settings</h3>
              <div className="space-y-3">
                {settings.map((setting, i) => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">{setting.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.enabled}
                        onChange={() => {
                          const next = [...settings];
                          next[i] = { ...next[i], enabled: !next[i].enabled };
                          setSettings(next);
                        }}
                      />
                      <div className="w-8 h-4 bg-surface-3 peer-checked:bg-primary rounded-full transition-colors" />
                      <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {QUICK_ACTIONS.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors text-left"
                  >
                    <Icon className="h-3.5 w-3.5 text-accent shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
