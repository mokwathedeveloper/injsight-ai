"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, unwrapData } from "@/lib/apiClient";
import { Key, Copy, Plus, Trash2, Eye, EyeOff, Code, Webhook, CheckCircle } from "lucide-react";
import { Button, EmptyState, CardSkeleton, ErrorState } from "@/components/ui";

const ENDPOINTS = [
  { method:"GET",  path:"/api/public/analyze-wallet",     desc:"Analyze any Injective wallet (no auth)" },
  { method:"GET",  path:"/api/wallets",                    desc:"Get saved wallets" },
  { method:"POST", path:"/api/wallets",                    desc:"Save a wallet" },
  { method:"GET",  path:"/api/analysis",                   desc:"Get analysis history" },
  { method:"GET",  path:"/api/reports",                    desc:"Get AI reports" },
  { method:"GET",  path:"/api/alerts",                     desc:"Get alerts" },
  { method:"GET",  path:"/api/insights",                   desc:"Get wallet insights" },
  { method:"POST", path:"/api/v1/ai/chat",                 desc:"Ask Your Wallet (AI chat)" },
];

export function ApiAccessView() {
  const qc = useQueryClient();
  const [showKeys,   setShowKeys]   = useState<Record<string,boolean>>({});
  const [newKeyName, setNewKeyName] = useState("");
  const [copied,     setCopied]     = useState<string|null>(null);
  const [newHook,    setNewHook]    = useState("");

  const keysQuery = useQuery({
    queryKey:["api-keys"],
    queryFn: async ()=>{
      const res = await apiClient.get("/developer/keys");
      return (unwrapData(res) as any[]) ?? [];
    },
  });
  const hooksQuery = useQuery({
    queryKey:["webhooks"],
    queryFn: async ()=>{
      const res = await apiClient.get("/developer/webhooks");
      return (unwrapData(res) as any[]) ?? [];
    },
  });

  const createKey = useMutation({
    mutationFn: async (name:string)=>{
      const res = await apiClient.post("/developer/keys",{name});
      return unwrapData(res);
    },
    onSuccess:()=>{ qc.invalidateQueries({queryKey:["api-keys"]}); setNewKeyName(""); },
  });
  const deleteKey = useMutation({
    mutationFn: async (id:string)=>{ await apiClient.delete(`/developer/keys/${id}`); },
    onSuccess:()=>qc.invalidateQueries({queryKey:["api-keys"]}),
  });
  const createHook = useMutation({
    mutationFn: async (url:string)=>{
      const res = await apiClient.post("/developer/webhooks",{url,events:["analysis_complete","risk_change"]});
      return unwrapData(res);
    },
    onSuccess:()=>{ qc.invalidateQueries({queryKey:["webhooks"]}); setNewHook(""); },
  });
  const deleteHook = useMutation({
    mutationFn: async (id:string)=>{ await apiClient.delete(`/developer/webhooks/${id}`); },
    onSuccess:()=>qc.invalidateQueries({queryKey:["webhooks"]}),
  });

  const copyKey = (k:string,id:string)=>{
    navigator.clipboard.writeText(k).catch(()=>{});
    setCopied(id);
    setTimeout(()=>setCopied(null),2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">API Access</h1>
        <p className="text-sm text-text-secondary">Integrate InjSight AI into your own applications.</p>
      </div>

      {/* API Keys */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2"><Key className="h-4 w-4 text-accent"/><h2 className="text-sm font-semibold text-text-primary">API Keys</h2></div>
          <div className="flex gap-2">
            <input value={newKeyName} onChange={e=>setNewKeyName(e.target.value)} placeholder="Key name" className="input-field text-xs py-1.5 h-8 w-36"/>
            <Button variant="accent" size="sm" onClick={()=>newKeyName.trim()&&createKey.mutate(newKeyName.trim())} loading={createKey.isPending} disabled={!newKeyName.trim()}>
              <Plus className="h-3.5 w-3.5"/> Create
            </Button>
          </div>
        </div>

        {keysQuery.isLoading ? <div className="p-5"><CardSkeleton/></div>
        : keysQuery.isError  ? <ErrorState onRetry={()=>keysQuery.refetch()} className="py-6"/>
        : !keysQuery.data?.length ? (
          <EmptyState icon={<Key className="h-8 w-8"/>} title="No API keys yet" description="Create your first API key to start integrating." className="py-8"/>
        ) : (
          <div className="divide-y divide-border">
            {keysQuery.data.map((k:any)=>(
              <div key={k.id} className="p-5 flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary">{k.name}</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-text-muted bg-surface-2 px-2 py-1 rounded max-w-xs truncate">
                      {showKeys[k.id] ? (k.key || k.keyPrefix || "sk-inj-****") : `${(k.keyPrefix||"sk-inj").slice(0,18)}${"•".repeat(16)}`}
                    </code>
                    <button onClick={()=>setShowKeys(s=>({...s,[k.id]:!s[k.id]}))} className="text-text-muted hover:text-text-primary">
                      {showKeys[k.id]?<EyeOff className="h-3.5 w-3.5"/>:<Eye className="h-3.5 w-3.5"/>}
                    </button>
                    <button onClick={()=>copyKey(k.key||k.keyPrefix||"",k.id)} className="text-text-muted hover:text-text-primary">
                      {copied===k.id?<CheckCircle className="h-3.5 w-3.5 text-success"/>:<Copy className="h-3.5 w-3.5"/>}
                    </button>
                  </div>
                  <p className="text-[11px] text-text-muted">
                    Created: {k.createdAt ? new Date(k.createdAt).toLocaleDateString() : "—"}
                    {k.lastUsedAt && ` · Last used: ${new Date(k.lastUsedAt).toLocaleDateString()}`}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-danger shrink-0" onClick={()=>deleteKey.mutate(k.id)} loading={deleteKey.isPending}>
                  <Trash2 className="h-3.5 w-3.5"/>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Endpoints reference */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2"><Code className="h-4 w-4 text-accent"/><h2 className="text-sm font-semibold text-text-primary">API Reference</h2></div>
          <span className="badge-primary">v1</span>
        </div>
        <table className="w-full">
          <thead><tr className="border-b border-border">
            {["Method","Endpoint","Description"].map(h=>(
              <th key={h} className="text-left px-5 py-2.5 text-[11px] font-semibold text-text-muted uppercase">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {ENDPOINTS.map((ep, i)=>(
              <tr key={`${ep.method}-${ep.path}-${i}`} className="border-b border-border/40 hover:bg-surface-2/50">
                <td className="px-5 py-3"><span className={`badge text-xs font-bold font-mono ${ep.method==="GET"?"bg-success-muted text-success":"bg-primary-muted text-accent"}`}>{ep.method}</span></td>
                <td className="px-5 py-3"><code className="text-xs text-accent font-mono">{ep.path}</code></td>
                <td className="px-5 py-3 text-xs text-text-secondary">{ep.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Webhooks */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4"><Webhook className="h-4 w-4 text-accent"/><h2 className="text-sm font-semibold text-text-primary">Webhooks</h2></div>
        <p className="text-xs text-text-secondary mb-4">Receive real-time notifications for analysis completions and risk changes.</p>
        <div className="flex gap-3 mb-4">
          <input value={newHook} onChange={e=>setNewHook(e.target.value)} placeholder="https://your-server.com/webhook" className="input-field flex-1 text-sm"/>
          <Button variant="primary" onClick={()=>newHook.trim()&&createHook.mutate(newHook.trim())} loading={createHook.isPending} disabled={!newHook.trim()}>
            Add Webhook
          </Button>
        </div>
        {hooksQuery.data?.map((h:any)=>(
          <div key={h.id} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
            <div>
              <p className="text-xs font-mono text-text-primary">{h.url}</p>
              <p className="text-[10px] text-text-muted mt-0.5">Events: {(h.events||[]).join(", ") || "all"}</p>
            </div>
            <Button variant="ghost" size="icon" className="text-danger" onClick={()=>deleteHook.mutate(h.id)}>
              <Trash2 className="h-3.5 w-3.5"/>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
