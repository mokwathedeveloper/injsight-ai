"use client";

import * as React from "react";
import Image from "next/image";
import { TokenBalanceRowData } from "@/types/token-balance";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Layers } from "lucide-react";

interface TokenBalanceRowProps {
  token: TokenBalanceRowData;
}

export function TokenBalanceRow({ token }: TokenBalanceRowProps) {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(token.balance);

  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(token.valueUsd);

  return (
    <div className="group flex items-center p-4 hover:bg-hover transition-colors border-b border-border/50 last:border-0">
      {/* Token Info */}
      <div className="flex-[2] flex items-center space-x-3 min-w-[180px]">
        <div className="w-10 h-10 rounded-xl bg-hover border border-border flex items-center justify-center text-xs font-bold text-text-primary group-hover:border-primary/50 transition-colors">
          {token.icon ? (
             <Image src={token.icon} alt={token.symbol} width={24} height={24} className="rounded-full" />
          ) : (
             token.symbol[0]
          )}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-text-primary">{token.symbol}</span>
            {token.isStaked && (
              <div className="text-primary" title="Staked">
                <Layers size={12} />
              </div>
            )}
          </div>
          <div className="text-[10px] text-text-disabled uppercase font-bold tracking-tighter">
            {token.name}
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="flex-1 min-w-[120px]">
        <div className="text-sm font-bold text-text-primary font-mono">{formattedBalance}</div>
        <div className={cn(
          "flex items-center space-x-1 text-[10px] font-bold mt-0.5",
          token.priceChange24h >= 0 ? "text-success" : "text-error"
        )}>
          {token.priceChange24h >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          <span>{Math.abs(token.priceChange24h)}%</span>
        </div>
      </div>

      {/* USD Value */}
      <div className="flex-1 min-w-[120px]">
        <div className="text-sm font-bold text-text-primary font-mono">{formattedValue}</div>
        <div className="text-[10px] text-text-disabled font-medium mt-0.5">
          ${token.priceUsd.toLocaleString()} / {token.symbol}
        </div>
      </div>

      {/* Portfolio % */}
      <div className="flex-1 min-w-[150px] hidden md:block">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-bold text-text-primary font-mono">{token.percentOfPortfolio}%</span>
        </div>
        <div className="w-full h-1.5 bg-hover rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-1000 ease-out" 
            style={{ width: `${token.percentOfPortfolio}%` }} 
          />
        </div>
      </div>

      {/* Category */}
      <div className="flex-1 min-w-[100px] text-right hidden lg:block">
        <Badge variant="secondary" className="text-[9px] py-0.5">
          {token.category || "Other"}
        </Badge>
      </div>
    </div>
  );
}
