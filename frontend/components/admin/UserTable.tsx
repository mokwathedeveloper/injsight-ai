import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AdminUser } from "@/types/admin";
import { cn } from "@/lib/utils";

export function UserTable({ users }: { users: AdminUser[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Recent Users</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-text-disabled border-b border-border">
              <th className="px-6 py-3 font-bold">Email</th>
              <th className="px-6 py-3 font-bold">Plan</th>
              <th className="px-6 py-3 font-bold">Status</th>
              <th className="px-6 py-3 font-bold text-right">Analyses</th>
              <th className="px-6 py-3 font-bold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} className={cn("hover:bg-hover/40 transition-colors", i !== users.length - 1 && "border-b border-border/50")}>
                <td className="px-6 py-4 text-sm font-mono text-text-primary">{u.email}</td>
                <td className="px-6 py-4"><Badge variant="secondary">{u.plan}</Badge></td>
                <td className="px-6 py-4"><Badge variant={u.status === "active" ? "success" : "error"}>{u.status}</Badge></td>
                <td className="px-6 py-4 text-sm font-mono text-text-primary text-right">{u.analyses.toLocaleString()}</td>
                <td className="px-6 py-4 text-xs text-text-secondary">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
