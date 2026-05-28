"use client";

import * as React from "react";
import { GlobalAlertBannerData } from "@/types/alert-banner";
import { MOCK_ACTIVE_BANNER } from "@/data/alert-banner-mock";
import { AlertTriangle, Info, Bell, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function AlertBanner() {
  const [activeBanner, setActiveBanner] = React.useState<GlobalAlertBannerData | null>(MOCK_ACTIVE_BANNER);

  if (!activeBanner) return null;

  const getIcon = () => {
    switch (activeBanner.type) {
      case "risk": return AlertTriangle;
      case "system": return Bell;
      default: return Info;
    }
  };

  const Icon = getIcon();

  return (
    <div className={cn(
      "w-full px-4 py-3 sm:px-6 lg:px-8 transition-all animate-in slide-in-from-top duration-500",
      activeBanner.severity === 'critical' ? "bg-error text-white" : "bg-primary text-white"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex p-1.5 bg-white/20 rounded-lg">
            <Icon size={18} />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">
              {activeBanner.type}
            </span>
            <p className="text-xs sm:text-sm font-medium leading-tight">
              <strong>{activeBanner.title}:</strong> {activeBanner.message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {activeBanner.actionLabel && activeBanner.actionUrl && (
            <Link href={activeBanner.actionUrl}>
              <button className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-white text-error rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-sm">
                <span>{activeBanner.actionLabel}</span>
                <ArrowRight size={12} />
              </button>
            </Link>
          )}
          
          {!activeBanner.isPersistent && (
            <button 
              onClick={() => setActiveBanner(null)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Dismiss banner"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
