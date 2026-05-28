"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface RateLimitBannerProps {
  resetsIn?: string;
  dismissible?: boolean;
  className?: string;
}

export function RateLimitBanner({ resetsIn = "a few minutes", dismissible = true, className }: RateLimitBannerProps) {
  const [visible, setVisible] = React.useState(true);
  if (!visible) return null;

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 p-4 rounded-2xl border border-warning/30 bg-warning/5 animate-in fade-in slide-in-from-top-2",
        className
      )}
    >
      <AlertTriangle size={18} className="text-warning shrink-0 mt-0.5" />
      <div className="flex-1 space-y-0.5">
        <p className="text-sm font-bold text-text-primary">You&apos;ve hit your rate limit</p>
        <p className="text-xs text-text-secondary leading-relaxed">
          You&apos;re analyzing wallets faster than your plan allows. Access resets in {resetsIn}, or{" "}
          <Link href="/pricing" className="text-primary font-bold hover:underline">upgrade for higher limits</Link>.
        </p>
      </div>
      {dismissible && (
        <button onClick={() => setVisible(false)} className="text-text-disabled hover:text-text-primary shrink-0" aria-label="Dismiss">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
