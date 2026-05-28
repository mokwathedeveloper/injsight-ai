"use client";

import * as React from "react";
import { SeverityBadge } from "./SeverityBadge";
import { ErrorLogEntry } from "@/types/admin";
import { X } from "lucide-react";

interface ErrorDetailDrawerProps {
  error: ErrorLogEntry | null;
  onClose: () => void;
}

export function ErrorDetailDrawer({ error, onClose }: ErrorDetailDrawerProps) {
  if (!error) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-card border-l border-border p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <SeverityBadge severity={error.severity} />
            <h3 className="text-lg font-bold text-text-primary">{error.type}</h3>
          </div>
          <button onClick={onClose} className="text-text-disabled hover:text-text-primary" aria-label="Close"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <Field label="Message" value={error.message} />
          <Field label="Endpoint" value={error.endpoint} mono />
          <Field label="First seen" value={error.time} mono />
          <Field label="Occurrences" value={`${error.count}`} mono />
        </div>

        <div className="rounded-xl border border-border bg-hover/20 p-4">
          <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest mb-2">Stack (truncated)</p>
          <pre className="text-[11px] font-mono text-text-secondary leading-relaxed overflow-x-auto">
{`at ${error.type} (services/${error.endpoint.split("/")[1]}.ts:142)
  at handleRequest (lib/router.ts:88)
  at async dispatch (lib/server.ts:41)`}
          </pre>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest">{label}</p>
      <p className={mono ? "text-xs font-mono text-text-primary break-all" : "text-sm text-text-secondary leading-relaxed"}>{value}</p>
    </div>
  );
}
