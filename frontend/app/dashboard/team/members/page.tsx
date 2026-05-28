"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/dashboard/AppShell";
import { MembersTable } from "@/components/team/MembersTable";
import { InviteMemberModal } from "@/components/team/InviteMemberModal";
import { PermissionBadge } from "@/components/team/PermissionBadge";
import { MOCK_TEAM_MEMBERS } from "@/data/team-mock";
import { ROLE_PERMISSIONS, TeamRole } from "@/types/team";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, UserPlus } from "lucide-react";

const ROLES: TeamRole[] = ["owner", "admin", "analyst", "viewer"];

export default function TeamMembersPage() {
  const [members, setMembers] = React.useState(MOCK_TEAM_MEMBERS);
  const [isInviteOpen, setInviteOpen] = React.useState(false);

  const handleRoleChange = (id: string, role: TeamRole) =>
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  const handleRemove = (id: string) => setMembers((prev) => prev.filter((m) => m.id !== id));
  const handleInvite = (email: string, role: TeamRole) =>
    setMembers((prev) => [...prev, { id: `m-${Date.now()}`, name: email, email, role, status: "invited", initials: "?", lastActive: "Invite sent" }]);

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <Link href="/dashboard/team" className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-2 group w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Workspace</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Members & <span className="text-primary">Roles</span>
            </h1>
            <p className="text-text-secondary text-sm">Control who can access and act on your team&apos;s intelligence.</p>
          </div>
          <Button className="h-12 px-6 gap-2 font-bold text-xs uppercase tracking-widest" onClick={() => setInviteOpen(true)}>
            <UserPlus size={16} /> Invite member
          </Button>
        </div>

        <MembersTable members={members} onRoleChange={handleRoleChange} onRemove={handleRemove} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES.map((role) => (
            <div key={role} className="p-4 rounded-2xl border border-border bg-card space-y-2">
              <PermissionBadge role={role} />
              <p className="text-[11px] text-text-secondary leading-relaxed">{ROLE_PERMISSIONS[role]}</p>
            </div>
          ))}
        </div>
      </div>

      <InviteMemberModal isOpen={isInviteOpen} onClose={() => setInviteOpen(false)} onInvite={handleInvite} />
    </AppShell>
  );
}
