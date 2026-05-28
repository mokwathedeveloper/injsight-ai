import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpgradeCTAProps {
  message?: string;
  className?: string;
}

export function UpgradeCTA({ message = "Upgrade to Pro for higher limits and unlimited analyses.", className }: UpgradeCTAProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-primary/20 bg-primary/5", className)}>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-xl text-primary shrink-0">
          <TrendingUp size={18} />
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">{message}</p>
      </div>
      <Link href="/pricing" className="shrink-0">
        <Button className="h-10 px-6 font-bold text-xs uppercase tracking-widest">Upgrade plan</Button>
      </Link>
    </div>
  );
}
