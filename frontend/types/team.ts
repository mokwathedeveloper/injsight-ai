export type TeamRole = "owner" | "admin" | "analyst" | "viewer";

export type MemberStatus = "active" | "invited";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
  initials: string;
  lastActive: string;
}

export interface Workspace {
  id: string;
  name: string;
  plan: "Team" | "Enterprise";
  memberCount: number;
}

export interface SharedWallet {
  id: string;
  label: string;
  address: string;
  addedBy: string;
  riskScore: number;
  riskLevel: "Low" | "Moderate" | "High" | "Very High";
  valueUsd: number;
}

export interface SharedAlertRule {
  id: string;
  name: string;
  condition: string;
  channel: "Email" | "Slack" | "Webhook";
  enabled: boolean;
  scope: string;
}

export const ROLE_PERMISSIONS: Record<TeamRole, string> = {
  owner: "Full access — billing, members, and all data",
  admin: "Manage wallets, reports, alerts, and members",
  analyst: "Create analyses, reports, and alerts",
  viewer: "Read-only access to shared intelligence",
};
