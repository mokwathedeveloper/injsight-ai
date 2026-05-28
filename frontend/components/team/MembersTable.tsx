"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PermissionBadge } from "./PermissionBadge";
import { RoleSelect } from "./RoleSelect";
import { TeamMember, TeamRole } from "@/types/team";
import { MoreVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MembersTableProps {
  members: TeamMember[];
  onRoleChange: (id: string, role: TeamRole) => void;
  onRemove: (id: string) => void;
}

export function MembersTable({ members, onRoleChange, onRemove }: MembersTableProps) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-text-disabled border-b border-border">
              <th className="px-6 py-3 font-bold">Member</th>
              <th className="px-6 py-3 font-bold">Status</th>
              <th className="px-6 py-3 font-bold">Role</th>
              <th className="px-6 py-3 font-bold">Last active</th>
              <th className="px-6 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={m.id} className={cn("hover:bg-hover/40 transition-colors", i !== members.length - 1 && "border-b border-border/50")}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                      {m.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary leading-none">{m.status === "invited" ? "Pending invite" : m.name}</p>
                      <p className="text-[11px] text-text-disabled mt-1">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={m.status === "active" ? "success" : "warning"}>{m.status}</Badge>
                </td>
                <td className="px-6 py-4">
                  {m.role === "owner" ? (
                    <PermissionBadge role="owner" />
                  ) : (
                    <RoleSelect value={m.role} onChange={(r) => onRoleChange(m.id, r)} />
                  )}
                </td>
                <td className="px-6 py-4 text-xs text-text-secondary">{m.lastActive}</td>
                <td className="px-6 py-4 text-right">
                  {m.role === "owner" ? (
                    <span className="text-text-disabled"><MoreVertical size={16} className="inline opacity-40" /></span>
                  ) : (
                    <button
                      onClick={() => onRemove(m.id)}
                      className="p-2 rounded-lg text-text-disabled hover:text-error hover:bg-error/10 transition-colors"
                      aria-label={`Remove ${m.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
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
