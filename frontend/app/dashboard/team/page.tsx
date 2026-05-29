"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/dashboard/AppShell";
import { WorkspaceSwitcher } from "@/components/team/WorkspaceSwitcher";
import { TeamDashboard } from "@/components/team/TeamDashboard";
import { SharedWalletsTable } from "@/components/team/SharedWalletsTable";
import { InviteMemberModal } from "@/components/team/InviteMemberModal";
import { MOCK_WORKSPACES, MOCK_TEAM_MEMBERS, MOCK_SHARED_WALLETS } from "@/data/team-mock";
import { Button } from "@/components/ui/Button";
import { UserPlus, Users } from "lucide-react";
import { teamsApi } from "@/lib/api/endpoints";
import { useAuthStore } from "@/store/auth";
import { useWallets } from "@/hooks/useDashboardData";
import { adaptWatchlistWallet } from "@/lib/api/adapters";

export default function TeamPage() {
  const authed = useAuthStore((s) => !!s.accessToken);
  const [activeWs, setActiveWs] = React.useState(MOCK_WORKSPACES[0].id);
  const [workspaces, setWorkspaces] = React.useState(MOCK_WORKSPACES);
  const [isInviteOpen, setInviteOpen] = React.useState(false);
  const [members, setMembers] = React.useState(MOCK_TEAM_MEMBERS);

  // Use live saved wallets as the "shared wallets" source
  const { data: liveWallets } = useWallets();
  const sharedWallets = React.useMemo(
    () => liveWallets ? liveWallets.map(adaptWatchlistWallet).map((w) => ({
      id: w.id, label: w.label, address: w.address,
      addedBy: "You", riskScore: w.riskScore, riskLevel: w.riskLevel as any, valueUsd: w.totalValueUsd,
    })) : MOCK_SHARED_WALLETS,
    [liveWallets]
  );

  React.useEffect(() => {
    if (!authed) return;
    teamsApi.workspaces().then((ws: any[]) => setWorkspaces(ws)).catch(() => {});
    teamsApi.members().then((ms: any[]) => setMembers(ms)).catch(() => {});
  }, [authed]);

  const handleInvite = (email: string, role: any) => {
    if (authed) {
      teamsApi.invite(email, role)
        .then((m: any) => setMembers((prev) => [...prev, m]))
        .catch(() => {});
    } else {
      setMembers((prev) => [
        ...prev,
        { id: `m-${Date.now()}`, name: email, email, role, status: "invited", initials: "?", lastActive: "Invite sent" },
      ]);
    }
  };

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <Users size={20} />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                Team <span className="text-primary">Workspace</span>
              </h1>
            </div>
            <p className="text-text-secondary text-sm">Share wallets, reports, and alerts across your organization.</p>
          </div>
          <div className="flex items-center gap-3">
            <WorkspaceSwitcher workspaces={workspaces} activeId={activeWs} onSwitch={setActiveWs} />
            <Button className="h-12 px-6 gap-2 font-bold text-xs uppercase tracking-widest" onClick={() => setInviteOpen(true)}>
              <UserPlus size={16} /> Invite
            </Button>
          </div>
        </div>

        <TeamDashboard members={members} wallets={sharedWallets} />

        <SharedWalletsTable wallets={sharedWallets} />

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/dashboard/team/members" className="flex-1">
            <Button variant="secondary" className="w-full h-12 justify-between border-border-strong">
              <span className="font-bold text-xs uppercase tracking-widest">Manage members & roles</span>
              <span className="text-text-disabled">→</span>
            </Button>
          </Link>
          <Link href="/dashboard/team/watchlists" className="flex-1">
            <Button variant="secondary" className="w-full h-12 justify-between border-border-strong">
              <span className="font-bold text-xs uppercase tracking-widest">Shared watchlists & alerts</span>
              <span className="text-text-disabled">→</span>
            </Button>
          </Link>
        </div>
      </div>

      <InviteMemberModal isOpen={isInviteOpen} onClose={() => setInviteOpen(false)} onInvite={handleInvite} />
    </AppShell>
  );
}
