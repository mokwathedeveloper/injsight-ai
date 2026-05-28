import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { TeamRole } from "@/types/team";
import { Crown, Shield, LineChart, Eye } from "lucide-react";

const ROLE_CONFIG: Record<TeamRole, { label: string; variant: "default" | "secondary" | "success" | "warning"; icon: React.ElementType }> = {
  owner: { label: "Owner", variant: "default", icon: Crown },
  admin: { label: "Admin", variant: "warning", icon: Shield },
  analyst: { label: "Analyst", variant: "success", icon: LineChart },
  viewer: { label: "Viewer", variant: "secondary", icon: Eye },
};

export function PermissionBadge({ role }: { role: TeamRole }) {
  const cfg = ROLE_CONFIG[role];
  const Icon = cfg.icon;
  return (
    <Badge variant={cfg.variant} className="gap-1.5">
      <Icon size={11} />
      {cfg.label}
    </Badge>
  );
}
