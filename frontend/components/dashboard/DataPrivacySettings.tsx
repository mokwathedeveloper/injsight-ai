"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ExportDataButton } from "./ExportDataButton";
import { DeleteDataModal } from "./DeleteDataModal";
import { Wallet, History, FileText, UserX, Trash2, ShieldCheck } from "lucide-react";

interface DataCategory {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  confirmWord: string;
  destructive?: boolean;
}

const CATEGORIES: DataCategory[] = [
  { id: "wallets", icon: Wallet, title: "Saved wallets", description: "Remove all wallets you've saved for monitoring. Analyses already generated are not affected.", confirmWord: "DELETE" },
  { id: "history", icon: History, title: "Analysis history", description: "Permanently clear your full analysis audit log across all wallets.", confirmWord: "DELETE" },
  { id: "reports", icon: FileText, title: "AI reports", description: "Delete all generated AI reports and their shareable links.", confirmWord: "DELETE" },
  { id: "account", icon: UserX, title: "Delete account", description: "Permanently delete your account and all associated data. This cannot be undone.", confirmWord: "DELETE", destructive: true },
];

export function DataPrivacySettings() {
  const [modal, setModal] = React.useState<DataCategory | null>(null);

  return (
    <div className="space-y-8">
      <Card className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-primary/20 bg-primary/5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-xl text-primary shrink-0"><ShieldCheck size={18} /></div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-text-primary">Export your data</p>
            <p className="text-xs text-text-secondary leading-relaxed">Download a copy of your saved wallets, reports, and account data as JSON.</p>
          </div>
        </div>
        <ExportDataButton />
      </Card>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-text-disabled uppercase tracking-widest px-1">Delete data</h3>
        {CATEGORIES.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.id} className={c.destructive ? "p-5 border-error/30" : "p-5"}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${c.destructive ? "bg-error/10 text-error" : "bg-hover text-text-secondary"}`}>
                    <Icon size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-text-primary">{c.title}</p>
                    <p className="text-xs text-text-secondary leading-relaxed max-w-lg">{c.description}</p>
                  </div>
                </div>
                <Button variant={c.destructive ? "error" : "secondary"} className="gap-2 shrink-0 border-border-strong" onClick={() => setModal(c)}>
                  <Trash2 size={14} /> {c.destructive ? "Delete account" : "Delete"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <DeleteDataModal
        isOpen={!!modal}
        title={modal?.title ?? ""}
        description={modal?.description ?? ""}
        confirmWord={modal?.confirmWord}
        onConfirm={() => { /* demo: would call API */ }}
        onClose={() => setModal(null)}
      />
    </div>
  );
}
