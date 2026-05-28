import { TeamMember, Workspace, SharedWallet, SharedAlertRule } from "@/types/team";

export const MOCK_WORKSPACES: Workspace[] = [
  { id: "ws-1", name: "Ninja Capital", plan: "Team", memberCount: 6 },
  { id: "ws-2", name: "Personal", plan: "Team", memberCount: 1 },
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  { id: "m-1", name: "John Doe", email: "john@ninjacap.io", role: "owner", status: "active", initials: "JD", lastActive: "Online now" },
  { id: "m-2", name: "Aria Tan", email: "aria@ninjacap.io", role: "admin", status: "active", initials: "AT", lastActive: "2 hours ago" },
  { id: "m-3", name: "Marco Reyes", email: "marco@ninjacap.io", role: "analyst", status: "active", initials: "MR", lastActive: "Yesterday" },
  { id: "m-4", name: "Lena Park", email: "lena@ninjacap.io", role: "analyst", status: "active", initials: "LP", lastActive: "3 days ago" },
  { id: "m-5", name: "Sam Quill", email: "sam@ninjacap.io", role: "viewer", status: "active", initials: "SQ", lastActive: "1 week ago" },
  { id: "m-6", name: "pending@ninjacap.io", email: "pending@ninjacap.io", role: "viewer", status: "invited", initials: "?", lastActive: "Invite sent" },
];

export const MOCK_SHARED_WALLETS: SharedWallet[] = [
  { id: "sw-1", label: "Protocol Treasury", address: "inj1treasury0x9f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f", addedBy: "John Doe", riskScore: 28, riskLevel: "Low", valueUsd: 4820000 },
  { id: "sw-2", label: "DAO Multisig", address: "inj1dao0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a", addedBy: "Aria Tan", riskScore: 41, riskLevel: "Moderate", valueUsd: 1240500 },
  { id: "sw-3", label: "Market Maker", address: "inj1mm0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e", addedBy: "Marco Reyes", riskScore: 67, riskLevel: "High", valueUsd: 905200 },
];

export const MOCK_SHARED_ALERT_RULES: SharedAlertRule[] = [
  { id: "ar-1", name: "Treasury large outflow", condition: "Transfer out > $250k", channel: "Slack", enabled: true, scope: "Protocol Treasury" },
  { id: "ar-2", name: "Risk score increase", condition: "Risk score rises by 15+", channel: "Email", enabled: true, scope: "All shared wallets" },
  { id: "ar-3", name: "New token concentration", condition: "Single asset > 60% of portfolio", channel: "Webhook", enabled: false, scope: "DAO Multisig" },
];
