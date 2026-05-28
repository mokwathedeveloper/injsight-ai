import * as React from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TeamMember, SharedWallet } from "@/types/team";
import { Users, Wallet, ShieldAlert, Activity } from "lucide-react";

interface TeamDashboardProps {
  members: TeamMember[];
  wallets: SharedWallet[];
}

export function TeamDashboard({ members, wallets }: TeamDashboardProps) {
  const activeMembers = members.filter((m) => m.status === "active").length;
  const totalValue = wallets.reduce((sum, w) => sum + w.valueUsd, 0);
  const highRisk = wallets.filter((w) => w.riskLevel === "High" || w.riskLevel === "Very High").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Active Members" value={activeMembers} icon={Users} subValue={`${members.length - activeMembers} pending`} />
      <StatCard label="Shared Wallets" value={wallets.length} icon={Wallet} subValue="Monitored as a team" />
      <StatCard label="Combined Value" value={`$${(totalValue / 1_000_000).toFixed(2)}M`} icon={Activity} subValue="Aggregated balance" />
      <StatCard label="High Risk Wallets" value={highRisk} icon={ShieldAlert} subValue="Need review" />
    </div>
  );
}
