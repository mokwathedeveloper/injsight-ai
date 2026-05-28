"use client";

import * as React from "react";
import { Workspace } from "@/types/team";
import { Building2, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  activeId: string;
  onSwitch: (id: string) => void;
}

export function WorkspaceSwitcher({ workspaces, activeId, onSwitch }: WorkspaceSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const active = workspaces.find((w) => w.id === activeId) ?? workspaces[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 px-4 h-12 rounded-xl border border-border bg-card hover:border-border-strong transition-colors min-w-[220px]"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Building2 size={16} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-bold text-text-primary leading-none">{active.name}</p>
          <p className="text-[10px] text-text-disabled uppercase font-bold mt-1">{active.plan} · {active.memberCount} members</p>
        </div>
        <ChevronDown size={16} className={cn("text-text-disabled transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-2 left-0 w-full bg-card border border-border rounded-xl p-1.5 z-20 shadow-xl animate-in fade-in slide-in-from-top-1" role="listbox">
            {workspaces.map((w) => (
              <button
                key={w.id}
                onClick={() => { onSwitch(w.id); setOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-hover transition-colors text-left"
                role="option"
                aria-selected={w.id === activeId}
              >
                <div>
                  <p className="text-sm font-bold text-text-primary leading-none">{w.name}</p>
                  <p className="text-[10px] text-text-disabled uppercase font-bold mt-1">{w.plan}</p>
                </div>
                {w.id === activeId && <Check size={16} className="text-primary" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
