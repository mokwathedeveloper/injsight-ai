"use client";

import * as React from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { APIKeyTable } from "./APIKeyTable";
import { CreateAPIKeyModal } from "./CreateAPIKeyModal";
import { EndpointCard } from "./EndpointCard";
import { RequestLog } from "./RequestLog";
import { ResponsePreview } from "./ResponsePreview";
import { RateLimitCard } from "./RateLimitCard";
import { Button } from "@/components/ui/Button";
import { ApiKey } from "@/types/api-platform";
import {
  MOCK_API_KEYS,
  MOCK_API_ENDPOINTS,
  MOCK_REQUEST_LOG,
  MOCK_RATE_LIMIT,
  MOCK_RESPONSE_PREVIEW,
} from "@/data/api-platform-mock";
import { developerApi } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth";
import { Plus, Activity, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "keys" | "endpoints" | "logs";

const TABS: { id: Tab; label: string }[] = [
  { id: "keys", label: "API Keys" },
  { id: "endpoints", label: "Endpoints" },
  { id: "logs", label: "Logs & Usage" },
];

export function APIIntegrationDashboard() {
  const authed = useAuthStore((s) => !!s.accessToken);
  const [tab, setTab] = React.useState<Tab>("keys");
  const [keys, setKeys] = React.useState<ApiKey[]>(MOCK_API_KEYS);
  const [log, setLog] = React.useState(MOCK_REQUEST_LOG);
  const [rateLimit, setRateLimit] = React.useState(MOCK_RATE_LIMIT);
  const [isCreateOpen, setCreateOpen] = React.useState(false);

  React.useEffect(() => {
    if (!authed) return;
    developerApi.listKeys().then((ks: any[]) => setKeys(ks)).catch(() => {});
    developerApi.keyUsage().then((u: any) => {
      if (u?.log) setLog(u.log);
      if (u?.limit) setRateLimit({ limit: u.limit, used: u.used, window: u.window, resetsIn: u.resetsIn });
    }).catch(() => {});
  }, [authed]);

  const activeKeys = keys.filter((k) => k.status === "active").length;
  const successRate = Math.round(
    (log.filter((r: any) => r.statusClass === "success").length / Math.max(log.length, 1)) * 100
  );

  const handleCreate = (name: string) => {
    if (authed) {
      developerApi.createKey(name).then((k: any) => setKeys((prev) => [k, ...prev])).catch(() => {});
    } else {
      setKeys((prev) => [
        { id: `k-${Date.now()}`, name, prefix: "injsk_live_•••••", created: "Just now", lastUsed: "Never", status: "active" },
        ...prev,
      ]);
    }
  };
  const handleRevoke = (id: string) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)));
    if (authed) developerApi.revokeKey(id).catch(() => {});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Keys" value={activeKeys} icon={CheckCircle2} subValue="Live credentials" />
        <StatCard label="Requests Today" value="6,428" icon={Activity} trend={{ value: 8, isPositive: true }} subValue="Across all keys" />
        <StatCard label="Success Rate" value={`${successRate}%`} icon={CheckCircle2} subValue="2xx responses" />
        <StatCard label="Avg Latency" value="186ms" icon={Clock} subValue="p50 response time" />
      </div>

      <div className="flex items-center gap-1 p-1 bg-hover/40 border border-border rounded-xl w-fit">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "px-5 h-9 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
              tab === t.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-secondary hover:text-text-primary"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "keys" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex justify-end">
            <Button className="h-10 px-5 gap-2 font-bold text-xs uppercase tracking-widest" onClick={() => setCreateOpen(true)}>
              <Plus size={16} /> Create key
            </Button>
          </div>
          <APIKeyTable keys={keys} onRevoke={handleRevoke} />
        </div>
      )}

      {tab === "endpoints" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <div className="space-y-3">
            {MOCK_API_ENDPOINTS.map((e) => (
              <EndpointCard key={e.path} endpoint={e} />
            ))}
          </div>
          <ResponsePreview json={MOCK_RESPONSE_PREVIEW} endpoint="GET /v1/wallets/{address}/risk" />
        </div>
      )}

      {tab === "logs" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          <div className="lg:col-span-2">
            <RequestLog entries={log} />
          </div>
          <RateLimitCard rateLimit={rateLimit} />
        </div>
      )}

      <CreateAPIKeyModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} onCreate={handleCreate} />
    </div>
  );
}
