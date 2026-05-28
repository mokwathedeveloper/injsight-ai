import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ApiKey } from "@/types/api-platform";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface APIKeyTableProps {
  keys: ApiKey[];
  onRevoke: (id: string) => void;
}

export function APIKeyTable({ keys, onRevoke }: APIKeyTableProps) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-text-disabled border-b border-border">
              <th className="px-6 py-3 font-bold">Name</th>
              <th className="px-6 py-3 font-bold">Key</th>
              <th className="px-6 py-3 font-bold">Created</th>
              <th className="px-6 py-3 font-bold">Last used</th>
              <th className="px-6 py-3 font-bold">Status</th>
              <th className="px-6 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k, i) => (
              <tr key={k.id} className={cn("hover:bg-hover/40 transition-colors", i !== keys.length - 1 && "border-b border-border/50")}>
                <td className="px-6 py-4 text-sm font-bold text-text-primary">{k.name}</td>
                <td className="px-6 py-4 text-xs font-mono text-text-secondary">{k.prefix}</td>
                <td className="px-6 py-4 text-xs text-text-secondary">{k.created}</td>
                <td className="px-6 py-4 text-xs text-text-secondary">{k.lastUsed}</td>
                <td className="px-6 py-4">
                  <Badge variant={k.status === "active" ? "success" : "secondary"}>{k.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  {k.status === "active" ? (
                    <button onClick={() => onRevoke(k.id)} className="p-2 rounded-lg text-text-disabled hover:text-error hover:bg-error/10 transition-colors" aria-label={`Revoke ${k.name}`}>
                      <Trash2 size={16} />
                    </button>
                  ) : (
                    <span className="text-[10px] text-text-disabled uppercase font-bold">Revoked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
