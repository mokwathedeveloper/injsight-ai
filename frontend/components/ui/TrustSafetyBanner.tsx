"use client";

import * as React from "react";
import { ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrustSafetyBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-[#161B22]/90 backdrop-blur-xl border border-primary/30 rounded-2xl p-4 shadow-[0_0_40px_rgba(0,102,255,0.15)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <ShieldCheck size={20} className="text-primary" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-text-primary tracking-tight">
              100% Non-Custodial & Read-Only
            </p>
            <p className="text-[10px] text-text-secondary leading-normal">
              InjSight AI only reads public Injective data. We never ask for private keys or seed phrases.
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-hover rounded-lg text-text-disabled hover:text-text-primary transition-colors"
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
