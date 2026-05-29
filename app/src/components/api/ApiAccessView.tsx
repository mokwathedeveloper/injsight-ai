"use client";

import { Key, Copy, Plus, Trash2, Eye, EyeOff, Code, Webhook } from "lucide-react";
import { Button } from "@/components/ui";
import { useState } from "react";

const MOCK_KEYS = [
  { id: "k1", name: "Production API Key",   key: "inj_live_sk_1234567890abcdef", lastUsed: "May 29, 2025", permissions: ["read:wallets", "read:reports"] },
  { id: "k2", name: "Development API Key",  key: "inj_test_sk_abcdef1234567890", lastUsed: "May 27, 2025", permissions: ["read:wallets"] },
];

const ENDPOINTS = [
  { method: "GET",  path: "/api/v1/wallet/{address}",          desc: "Get wallet analysis" },
  { method: "GET",  path: "/api/v1/wallet/{address}/risk",     desc: "Get risk score" },
  { method: "GET",  path: "/api/v1/wallet/{address}/report",   desc: "Get AI report" },
  { method: "POST", path: "/api/v1/analyze",                   desc: "Trigger new analysis" },
];

export function ApiAccessView() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">API Access</h1>
          <p className="text-sm text-text-secondary">Integrate InjSight AI into your own applications.</p>
        </div>
        <Button variant="accent" size="sm">
          <Plus className="h-3.5 w-3.5" /> Create API Key
        </Button>
      </div>

      {/* API Keys */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <Key className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold text-text-primary">API Keys</h2>
        </div>
        <div className="divide-y divide-border">
          {MOCK_KEYS.map((apiKey) => (
            <div key={apiKey.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-text-primary">{apiKey.name}</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-text-muted bg-surface-2 px-2 py-1 rounded">
                      {showKeys[apiKey.id] ? apiKey.key : `${apiKey.key.slice(0, 20)}${"•".repeat(16)}`}
                    </code>
                    <button onClick={() => setShowKeys(s => ({ ...s, [apiKey.id]: !s[apiKey.id] }))} className="text-text-muted hover:text-text-primary">
                      {showKeys[apiKey.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                    <button className="text-text-muted hover:text-text-primary">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-text-muted">
                    <span>Last used: {apiKey.lastUsed}</span>
                    <span>·</span>
                    <span>{apiKey.permissions.join(", ")}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-danger shrink-0">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Endpoints reference */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <Code className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold text-text-primary">API Reference</h2>
          <span className="ml-auto badge-primary">v1</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Method", "Endpoint", "Description"].map((h) => (
                <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ENDPOINTS.map((ep) => (
              <tr key={ep.path} className="border-b border-border/50 hover:bg-surface-2/50">
                <td className="px-5 py-3">
                  <span className={`badge text-xs font-bold font-mono ${ep.method === "GET" ? "bg-success-muted text-success" : "bg-primary-muted text-accent"}`}>
                    {ep.method}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <code className="text-xs text-accent font-mono">{ep.path}</code>
                </td>
                <td className="px-5 py-3 text-xs text-text-secondary">{ep.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Webhook section */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Webhook className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold text-text-primary">Webhooks</h2>
        </div>
        <p className="text-xs text-text-secondary mb-4">
          Receive real-time notifications for risk changes and analysis completions.
        </p>
        <div className="flex gap-3">
          <input placeholder="https://yourapp.com/webhook" className="input-field flex-1 text-sm" />
          <Button variant="primary">Add Webhook</Button>
        </div>
      </div>
    </div>
  );
}
