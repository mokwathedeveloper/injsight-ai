"use client";

import * as React from "react";
import { Trash2, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DangerZone() {
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 border border-error/20 bg-error/5 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-error">
            <AlertTriangle size={16} />
            <h4 className="text-sm font-bold uppercase tracking-widest">Delete Account</h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed max-w-md">
            Permanently remove your account, saved wallets, and intelligence history. 
            This action cannot be undone.
          </p>
        </div>

        {!confirmDelete ? (
          <Button 
            variant="secondary" 
            onClick={() => setConfirmDelete(true)}
            className="h-11 px-8 font-bold text-xs uppercase tracking-widest text-error border-error/20 hover:bg-error/10 transition-all shrink-0"
          >
            Delete My Account
          </Button>
        ) : (
          <div className="flex items-center gap-3 animate-in zoom-in-95 duration-200">
            <Button 
              variant="secondary" 
              onClick={() => setConfirmDelete(false)}
              className="h-11 px-6 font-bold text-xs uppercase tracking-widest border-border-strong"
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              className="h-11 px-6 font-bold text-xs uppercase tracking-widest bg-error hover:bg-error/90 shadow-lg shadow-error/20"
            >
              Confirm Delete
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 p-4 bg-hover/10 border border-border rounded-xl">
        <ShieldAlert size={18} className="text-text-disabled shrink-0 mt-0.5" />
        <p className="text-[10px] text-text-disabled leading-relaxed italic">
          <strong>Security Note:</strong> Account deletion will purge all metadata associated with your 
          monitored addresses. However, public on-chain activity will remain visible on the Injective explorer.
        </p>
      </div>
    </div>
  );
}
