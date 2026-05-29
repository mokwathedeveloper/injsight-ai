"use client";

import { Users, UserPlus, Mail, Trash2, Crown, ShieldCheck, Eye, User } from "lucide-react";
import { Button } from "@/components/ui";

const ROLES = {
  owner:   { label: "Owner",   color: "text-warning",  Icon: Crown },
  admin:   { label: "Admin",   color: "text-primary",  Icon: ShieldCheck },
  analyst: { label: "Analyst", color: "text-accent",   Icon: User },
  viewer:  { label: "Viewer",  color: "text-text-muted", Icon: Eye },
};

const MOCK_MEMBERS = [
  { id: "1", name: "John Doe",   email: "john@example.com",   role: "owner"   as const, joinedAt: "Jan 2025" },
  { id: "2", name: "Alice Wang", email: "alice@example.com",  role: "admin"   as const, joinedAt: "Feb 2025" },
  { id: "3", name: "Bob Smith",  email: "bob@example.com",    role: "analyst" as const, joinedAt: "Mar 2025" },
  { id: "4", name: "Carol Lee",  email: "carol@example.com",  role: "viewer"  as const, joinedAt: "Apr 2025" },
];

export function TeamView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Team Workspace</h1>
          <p className="text-sm text-text-secondary">Manage your team members and their access levels.</p>
        </div>
        <Button variant="accent" size="sm">
          <UserPlus className="h-3.5 w-3.5" /> Invite Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Members", value: "4", icon: Users },
          { label: "Admins",        value: "2", icon: ShieldCheck },
          { label: "Analysts",      value: "1", icon: User },
          { label: "Viewers",       value: "1", icon: Eye },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="stat-card">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-accent" />
              <p className="text-xs text-text-muted">{label}</p>
            </div>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
          </div>
        ))}
      </div>

      {/* Members list */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="text-sm font-semibold text-text-primary">Members</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Member", "Email", "Role", "Joined", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_MEMBERS.map((member) => {
              const { label, color, Icon } = ROLES[member.role];
              return (
                <tr key={member.id} className="border-b border-border/50 hover:bg-surface-2/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-xs font-bold text-accent">
                        {member.name[0]}
                      </div>
                      <span className="text-xs font-semibold text-text-primary">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-text-secondary">{member.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`flex items-center gap-1 text-xs font-semibold ${color}`}>
                      <Icon className="h-3 w-3" /> {label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-text-muted">{member.joinedAt}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="text-xs">Change Role</Button>
                      {member.role !== "owner" && (
                        <Button variant="ghost" size="icon" className="text-danger">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Invite form */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold text-text-primary mb-4">Invite New Member</h2>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input type="email" placeholder="colleague@example.com" className="input-field pl-9" />
          </div>
          <select className="input-field w-36">
            {Object.entries(ROLES).filter(([k]) => k !== "owner").map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <Button variant="accent">Send Invite</Button>
        </div>
      </div>
    </div>
  );
}
