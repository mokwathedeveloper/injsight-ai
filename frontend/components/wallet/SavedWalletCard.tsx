"use client";

import * as React from "react";
import { SavedWallet } from "@/types/saved-wallets";
import { Card } from "@/components/ui/Card";
import { RiskLevelBadge } from "./RiskLevelBadge";
import { 
  MoreVertical, 
  RefreshCw, 
  ExternalLink, 
  Trash2, 
  Edit3,
  Wallet as WalletIcon,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SavedWalletCardProps {
  wallet: SavedWallet;
  onRefresh?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function SavedWalletCard({ wallet, onRefresh, onDelete, onEdit }: SavedWalletCardProps) {
  const [showOptions, setShowOptions] = React.useState(false);

  return (
    <Card className="p-0 border-border bg-card overflow-hidden group hover:border-primary/40 transition-all duration-300 relative">
      {/* Decorative Pro Glow */}
      {wallet.isPro && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
      )}

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-3 rounded-2xl border transition-colors",
              wallet.isPro ? "bg-primary/10 border-primary/20 text-primary" : "bg-hover border-border text-text-secondary"
            )}>
              <WalletIcon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-text-primary tracking-tight group-hover:text-primary transition-colors">
                {wallet.label}
              </h3>
              <p className="text-[10px] font-mono text-text-disabled uppercase mt-0.5 tracking-tighter">
                {wallet.address}
              </p>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="p-1 hover:bg-hover rounded-lg text-text-disabled hover:text-text-primary transition-colors"
            >
              <MoreVertical size={18} />
            </button>
            
            {showOptions && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowOptions(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-[#161B22] border border-border-strong rounded-xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <button onClick={() => onEdit?.(wallet.id)} className="w-full flex items-center gap-3 px-4 py-3 text-xs text-text-secondary hover:text-text-primary hover:bg-hover transition-colors">
                    <Edit3 size={14} />
                    <span>Rename Wallet</span>
                  </button>
                  <button onClick={() => onRefresh?.(wallet.id)} className="w-full flex items-center gap-3 px-4 py-3 text-xs text-text-secondary hover:text-text-primary hover:bg-hover transition-colors">
                    <RefreshCw size={14} />
                    <span>Refresh Data</span>
                  </button>
                  <div className="border-t border-border/50" />
                  <button onClick={() => onDelete?.(wallet.id)} className="w-full flex items-center gap-3 px-4 py-3 text-xs text-error hover:bg-error/10 transition-colors">
                    <Trash2 size={14} />
                    <span>Remove Wallet</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-0.5">Value</p>
            <div className="text-lg font-extrabold text-text-primary">
              ${(wallet.totalValueUsd / 1000).toFixed(1)}k
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-text-disabled uppercase tracking-widest px-0.5">Risk</p>
            <div className="flex items-center">
               <RiskLevelBadge level={wallet.riskLevel} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-hover/20 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[9px] text-text-disabled font-bold uppercase tracking-tighter">
          <ShieldCheck size={12} className="text-success" />
          <span>Synced {wallet.lastAnalyzed}</span>
        </div>
        
        <Link href={`/analyze?address=${wallet.address}`}>
          <button className="flex items-center gap-1.5 text-[10px] font-extrabold text-primary hover:text-primary-hover uppercase tracking-widest group/link">
            <span>Details</span>
            <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </button>
        </Link>
      </div>
    </Card>
  );
}
