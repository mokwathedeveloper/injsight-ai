"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { PaymentStatus } from "@/types/payments";
import { cn } from "@/lib/utils";

interface PaymentStatusBannerProps {
  status: PaymentStatus;
}

const CONFIG: Record<Exclude<PaymentStatus, "idle">, { icon: React.ElementType; title: string; message: string; classes: string; iconClass: string }> = {
  processing: {
    icon: Loader2,
    title: "Processing payment...",
    message: "Securely confirming your transaction. Do not close this window.",
    classes: "bg-primary/5 border-primary/30",
    iconClass: "text-primary animate-spin",
  },
  success: {
    icon: CheckCircle2,
    title: "Payment successful",
    message: "Your subscription is now active. A receipt has been sent to your email.",
    classes: "bg-success/5 border-success/30",
    iconClass: "text-success",
  },
  error: {
    icon: AlertCircle,
    title: "Payment could not be completed",
    message: "Your card was declined or the transaction failed. No charge was made — please try again.",
    classes: "bg-error/5 border-error/30",
    iconClass: "text-error",
  },
};

export function PaymentStatusBanner({ status }: PaymentStatusBannerProps) {
  if (status === "idle") return null;
  const cfg = CONFIG[status];
  const Icon = cfg.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-start gap-4 p-5 rounded-2xl border animate-in fade-in slide-in-from-top-2",
        cfg.classes
      )}
    >
      <Icon size={22} className={cn("shrink-0 mt-0.5", cfg.iconClass)} />
      <div className="space-y-1">
        <p className="text-sm font-bold text-text-primary">{cfg.title}</p>
        <p className="text-xs text-text-secondary leading-relaxed">{cfg.message}</p>
      </div>
    </div>
  );
}
