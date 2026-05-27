"use client";

import * as React from "react";
import { WalletDetail } from "@/types/wallet-detail";
import { 
  ArrowLeft, 
  Copy, 
  RefreshCw, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface WalletDetailHeaderProps {
  wallet: WalletDetail;
}

export function WalletDetailHeader({ wallet }: WalletDetailHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link 
        href="/dashboard/wallets" 
        className="text-xs font-bold text-text-disabled hover:text-primary transition-colors flex items-center gap-2 group uppercase tracking-widest"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to My Wallets</span>
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        {/* Wallet Identity */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              {wallet.label}
            </h1>
            {wallet.isPro && (
              <Badge variant="default" className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                PRO TRACKED
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <code className="text-sm font-mono text-text-secondary bg-hover/50 px-3 py-1.5 rounded-lg border border-border/50">
              {wallet.address}
            </code>
            <button className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-text-primary transition-colors border border-transparent hover:border-border">
              <Copy size={16} />
            </button>
            <a 
              href={`https://explorer.injective.network/account/${wallet.address}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:bg-hover rounded-lg text-text-disabled hover:text-primary transition-colors border border-transparent hover:border-border"
              title="View on Explorer"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" className="h-11 px-5 gap-2 border-border-strong font-bold text-xs uppercase tracking-widest">
            <RefreshCw size={14} className="text-text-disabled" />
            <span>Refresh Data</span>
          </Button>
          <Button variant="secondary" className="h-11 px-5 gap-2 border-border-strong font-bold text-xs uppercase tracking-widest">
            <Edit3 size={14} className="text-text-disabled" />
            <span>Rename</span>
          </Button>
          <Button variant="secondary" className="h-11 px-5 gap-2 border-border-strong font-bold text-xs uppercase tracking-widest hover:text-error hover:bg-error/10 hover:border-error/20 group">
            <Trash2 size={14} className="text-text-disabled group-hover:text-error" />
            <span>Remove</span>
          </Button>
        </div>
      </div>

      {/* Sync Status */}
      <div className="flex items-center gap-2 text-[10px] font-bold text-text-disabled uppercase tracking-widest px-1">
        <ShieldCheck size={14} className="text-success" />
        <span>Real-time monitoring active • Last intelligence sync: {wallet.lastAnalyzed}</span>
      </div>
    </div>
  );
}
