"use client";

import * as React from "react";
import Link from "next/link";
import { AppShell } from "@/components/dashboard/AppShell";
import { WalletChatPanel } from "@/components/chat/WalletChatPanel";
import { AIReportDisclaimer } from "@/components/report/AIReportDisclaimer";
import { ArrowLeft, MessageSquare } from "lucide-react";

export default function AskWalletPage({ params }: { params: { id: string } }) {
  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700 max-w-3xl">
        <Link href={`/dashboard/wallets/${params.id}`} className="text-sm text-text-secondary hover:text-primary transition-colors flex items-center gap-2 group w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Wallet</span>
        </Link>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <MessageSquare size={20} />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Ask Your <span className="text-primary">Wallet</span>
            </h1>
          </div>
          <p className="text-text-secondary text-sm">Ask plain-English questions about this wallet&apos;s on-chain data and AI report.</p>
        </div>

        <WalletChatPanel />
        <AIReportDisclaimer />
      </div>
    </AppShell>
  );
}
