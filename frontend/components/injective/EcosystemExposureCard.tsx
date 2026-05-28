import * as React from "react";
import { Card } from "@/components/ui/Card";
import { ExposureBreakdown } from "./ExposureBreakdown";
import { NativeAssetBadge } from "./NativeAssetBadge";
import { ExposureCategory } from "@/types/injective";
import { Network } from "lucide-react";

export function EcosystemExposureCard({ categories }: { categories: ExposureCategory[] }) {
  const native = categories.find((c) => c.category === "Native");
  const unknown = categories.find((c) => c.category === "Unknown");

  return (
    <Card className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network size={16} className="text-primary" />
          <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Ecosystem Exposure</h3>
        </div>
        <NativeAssetBadge />
      </div>

      <ExposureBreakdown categories={categories} />

      <div className="pt-4 border-t border-border/50 space-y-2">
        <p className="text-xs text-text-secondary leading-relaxed">
          This wallet holds <span className="font-bold text-text-primary">{native?.percent ?? 0}%</span> in native INJ and{" "}
          <span className="font-bold text-warning">{unknown?.percent ?? 0}%</span> in unknown or unverified tokens.
        </p>
        {unknown && unknown.percent > 5 && (
          <p className="text-[11px] text-warning leading-relaxed">
            Elevated exposure to unverified tokens may increase risk. Review unknown assets before relying on valuations.
          </p>
        )}
      </div>
    </Card>
  );
}
