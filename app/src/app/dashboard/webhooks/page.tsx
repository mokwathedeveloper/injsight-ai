"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui";
import {
  Plus,
  Webhook,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit,
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";

// ── data ───────────────────────────────────────────────────────────────────────

interface WebhookEntry {
  id: string;
  url: string;
  status: "Active" | "Inactive";
  events: string[];
  lastTriggered: string;
  successRate: number;
}

const WEBHOOKS: WebhookEntry[] = [
  {
    id: "wh1",
    url: "https://api.myapp.io/hooks/injsight",
    status: "Active",
    events: ["risk_change", "large_transfer", "analysis_complete"],
    lastTriggered: "May 29, 2025 · 10:42 AM",
    successRate: 98,
  },
  {
    id: "wh2",
    url: "https://n8n.myserver.io/webhook/injsight-alerts",
    status: "Inactive",
    events: ["weekly_report", "new_token"],
    lastTriggered: "May 21, 2025 · 06:00 AM",
    successRate: 84,
  },
];

const EVENT_TYPES = [
  { key: "risk_change",        label: "risk_change",        desc: "Triggered when wallet risk score changes by ≥5 points"  },
  { key: "large_transfer",     label: "large_transfer",     desc: "Triggered when a transfer > $10,000 USD is detected"    },
  { key: "new_token",          label: "new_token",          desc: "Triggered when a new token appears in a wallet"         },
  { key: "analysis_complete",  label: "analysis_complete",  desc: "Triggered when an AI wallet analysis finishes"          },
  { key: "weekly_report",      label: "weekly_report",      desc: "Triggered when a scheduled weekly report is generated"  },
];

const RECENT_DELIVERIES = [
  { id: "d1", webhookUrl: "api.myapp.io/...",       event: "analysis_complete",  statusCode: 200, time: "10:42 AM · May 29" },
  { id: "d2", webhookUrl: "api.myapp.io/...",       event: "risk_change",        statusCode: 200, time: "08:14 AM · May 29" },
  { id: "d3", webhookUrl: "api.myapp.io/...",       event: "large_transfer",     statusCode: 500, time: "11:55 PM · May 28" },
  { id: "d4", webhookUrl: "n8n.myserver.io/...",    event: "weekly_report",      statusCode: 200, time: "06:00 AM · May 21" },
  { id: "d5", webhookUrl: "api.myapp.io/...",       event: "risk_change",        statusCode: 200, time: "02:31 PM · May 20" },
];

const EVENT_KEYS = EVENT_TYPES.map((e) => e.key);

// ── view ───────────────────────────────────────────────────────────────────────

function WebhooksView() {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>(["risk_change", "analysis_complete"]);
  const [secretVisible, setSecretVisible] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const [secretValue, setSecretValue] = useState("whsec_xxxxxxxxxxxxxxxxxxxxxxxx");

  function toggleEvent(key: string) {
    setSelectedEvents((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Webhook Alerts</h1>
          <p className="text-sm text-text-secondary">
            Send real-time event notifications to your applications
          </p>
        </div>
        <Button variant="accent" size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-3.5 w-3.5" /> Add Webhook
        </Button>
      </div>

      {/* Existing webhooks */}
      <div className="space-y-3">
        {WEBHOOKS.map((wh) => (
          <div key={wh.id} className="glass-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${wh.status === "Active" ? "bg-success/10" : "bg-surface-3"}`}>
                  <Webhook className={`h-4 w-4 ${wh.status === "Active" ? "text-success" : "text-text-muted"}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-sm font-mono font-medium text-text-primary">{wh.url}</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(wh.url)}
                      className="text-text-muted hover:text-accent transition-colors"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {wh.status === "Active" ? (
                      <span className="badge-success flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Active
                      </span>
                    ) : (
                      <span className="badge bg-surface-3 text-text-muted flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> Inactive
                      </span>
                    )}
                    <span className="text-xs text-text-muted">Last triggered: {wh.lastTriggered}</span>
                    <span className="text-xs text-text-muted">Success rate: {wh.successRate}%</span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {wh.events.map((ev) => (
                      <span key={ev} className="badge-primary text-[10px]">{ev}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="sm"><Edit className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="sm"><RefreshCw className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="sm" className="text-danger hover:text-danger"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Webhook form */}
      {showForm && (
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-5">
            <Zap className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-text-primary">Add New Webhook</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* URL */}
              <div>
                <label className="section-label block mb-2">Endpoint URL</label>
                <input
                  type="url"
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  placeholder="https://your-server.com/webhook"
                  className="input-field text-xs"
                />
                <p className="text-[11px] text-text-muted mt-1">Must be a publicly accessible HTTPS endpoint.</p>
              </div>

              {/* Secret */}
              <div>
                <label className="section-label block mb-2">Signing Secret</label>
                <div className="relative">
                  <input
                    type={secretVisible ? "text" : "password"}
                    value={secretValue}
                    onChange={(e) => setSecretValue(e.target.value)}
                    className="input-field text-xs pr-9 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setSecretVisible(!secretVisible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    {secretVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-text-muted mt-1">Used to verify webhook payloads with HMAC-SHA256.</p>
              </div>
            </div>

            {/* Event types */}
            <div>
              <label className="section-label block mb-2">Event Types</label>
              <div className="space-y-2">
                {EVENT_TYPES.map((ev) => (
                  <label
                    key={ev.key}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedEvents.includes(ev.key)
                        ? "bg-primary/10 border-primary/40"
                        : "bg-surface-2 border-border hover:border-border/80"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(ev.key)}
                      onChange={() => toggleEvent(ev.key)}
                      className="mt-0.5 accent-primary shrink-0"
                    />
                    <div>
                      <p className="text-xs font-mono font-semibold text-text-primary">{ev.label}</p>
                      <p className="text-[11px] text-text-secondary">{ev.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-5 pt-5 border-t border-border">
            <Button variant="accent" size="sm">Save Webhook</Button>
            <Button variant="secondary" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Two-column: Event reference + Recent deliveries */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Event reference table */}
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Event Types Reference</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Event", "Description"].map((h) => (
                  <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EVENT_TYPES.map((ev) => (
                <tr key={ev.key} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                  <td className="px-5 py-3">
                    <span className="badge-primary text-[10px] font-mono">{ev.label}</span>
                  </td>
                  <td className="px-5 py-3 text-xs text-text-secondary">{ev.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent deliveries */}
        <div className="glass-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="text-sm font-semibold text-text-primary">Recent Deliveries</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Endpoint", "Event", "Status", "Time"].map((h) => (
                  <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_DELIVERIES.map((d) => (
                <tr key={d.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                  <td className="px-5 py-3 text-xs font-mono text-text-muted whitespace-nowrap">{d.webhookUrl}</td>
                  <td className="px-5 py-3">
                    <span className="badge-primary text-[10px] font-mono whitespace-nowrap">{d.event}</span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <span className={d.statusCode === 200 ? "badge-success" : "badge-danger"}>
                      {d.statusCode === 200 ? (
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {d.statusCode}</span>
                      ) : (
                        <span className="flex items-center gap-1"><XCircle className="h-3 w-3" /> {d.statusCode}</span>
                      )}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-text-muted whitespace-nowrap">{d.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function WebhooksPage() {
  return (
    <DashboardLayout>
      <WebhooksView />
    </DashboardLayout>
  );
}
