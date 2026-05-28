"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { RoleSelect } from "./RoleSelect";
import { TeamRole, ROLE_PERMISSIONS } from "@/types/team";
import { X, UserPlus, Mail } from "lucide-react";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: TeamRole) => void;
}

export function InviteMemberModal({ isOpen, onClose, onInvite }: InviteMemberModalProps) {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<TeamRole>("viewer");
  const [error, setError] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    onInvite(email, role);
    setEmail("");
    setRole("viewer");
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <UserPlus size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-text-primary">Invite team member</h3>
              <p className="text-xs text-text-secondary">They&apos;ll receive an email invitation.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-text-disabled hover:text-text-primary" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="invite-email" className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">Email address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled" />
              <Input
                id="invite-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                placeholder="teammate@company.com"
                className="h-11 pl-10"
                aria-invalid={!!error}
              />
            </div>
            {error && <p className="text-[10px] text-error font-medium px-1 uppercase tracking-tight">{error}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="invite-role" className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">Role</label>
            <div className="flex flex-col gap-2">
              <RoleSelect id="invite-role" value={role} onChange={setRole} />
              <p className="text-[10px] text-text-secondary px-1 leading-relaxed">{ROLE_PERMISSIONS[role]}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="secondary" className="flex-1 h-11" onClick={onClose}>Cancel</Button>
          <Button className="flex-1 h-11 font-bold" onClick={handleSubmit}>Send Invite</Button>
        </div>
      </div>
    </div>
  );
}
