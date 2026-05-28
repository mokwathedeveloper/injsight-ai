"use client";

import * as React from "react";
import { TeamRole, ROLE_PERMISSIONS } from "@/types/team";
import { cn } from "@/lib/utils";

interface RoleSelectProps {
  value: TeamRole;
  onChange: (role: TeamRole) => void;
  disabled?: boolean;
  id?: string;
}

const ROLES: TeamRole[] = ["owner", "admin", "analyst", "viewer"];

export function RoleSelect({ value, onChange, disabled, id }: RoleSelectProps) {
  return (
    <select
      id={id}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as TeamRole)}
      title={ROLE_PERMISSIONS[value]}
      className={cn(
        "h-9 rounded-md border border-border bg-card px-3 text-xs font-bold text-text-primary capitalize",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      )}
    >
      {ROLES.map((r) => (
        <option key={r} value={r} className="capitalize">
          {r}
        </option>
      ))}
    </select>
  );
}
