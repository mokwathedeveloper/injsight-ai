import * as React from "react";
import { Card } from "@/components/ui/Card";
import { PriceChangeBadge } from "./PriceChangeBadge";
import { AssetCategoryBadge } from "./AssetCategoryBadge";
import { MarketAsset } from "@/types/injective";
import { cn } from "@/lib/utils";

const volColor = (v: MarketAsset["volatility"]) =>
  v === "Low" ? "text-success" : v === "Medium" ? "text-warning" : "text-error";

export function MarketContextCard({ assets }: { assets: MarketAsset[] }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest">Market Context</h3>
        <p className="text-[11px] text-text-secondary mt-1">Live pricing and volatility for held assets</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-text-disabled border-b border-border">
              <th className="px-6 py-3 font-bold">Asset</th>
              <th className="px-6 py-3 font-bold text-right">Price</th>
              <th className="px-6 py-3 font-bold text-right">24h</th>
              <th className="px-6 py-3 font-bold text-right">7d</th>
              <th className="px-6 py-3 font-bold">Volatility</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((a, i) => (
              <tr key={a.symbol} className={cn("hover:bg-hover/40 transition-colors", i !== assets.length - 1 && "border-b border-border/50")}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary">{a.symbol}</span>
                    <AssetCategoryBadge category={a.category} />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-text-primary text-right">${a.priceUsd.toLocaleString()}</td>
                <td className="px-6 py-4 text-right"><PriceChangeBadge change={a.change24h} /></td>
                <td className="px-6 py-4 text-right"><PriceChangeBadge change={a.change7d} /></td>
                <td className={cn("px-6 py-4 text-xs font-bold uppercase tracking-wider", volColor(a.volatility))}>{a.volatility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
