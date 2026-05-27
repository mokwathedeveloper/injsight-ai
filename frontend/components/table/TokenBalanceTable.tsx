"use client";

import * as React from "react";
import { TokenBalanceRowData, SortField, SortOrder } from "@/types/token-balance";
import { TokenBalanceRow } from "./TokenBalanceRow";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Search, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenBalanceTableProps {
  tokens: TokenBalanceRowData[];
  className?: string;
}

export function TokenBalanceTable({ tokens, className }: TokenBalanceTableProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortField, setSortField] = React.useState<SortField>("valueUsd");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const filteredTokens = React.useMemo(() => {
    let result = [...tokens];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.symbol.toLowerCase().includes(query) ||
          t.name.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === "symbol") {
        comparison = a.symbol.localeCompare(b.symbol);
      } else {
        comparison = (a[sortField] as number) - (b[sortField] as number);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [tokens, searchQuery, sortField, sortOrder]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={12} className="opacity-30" />;
    return sortOrder === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  return (
    <Card className={cn("border-border bg-card overflow-hidden", className)}>
      {/* Table Header / Toolbar */}
      <div className="p-6 border-b border-border bg-hover/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-text-primary tracking-tight">Token Holdings</h3>
          <p className="text-[10px] text-text-disabled uppercase font-bold tracking-widest mt-1">
            {filteredTokens.length} Assets Found
          </p>
        </div>

        <div className="relative max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled" />
          <Input
            placeholder="Search tokens..."
            className="pl-10 h-10 bg-hover/50 border-border-strong text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table Column Labels */}
      <div className="flex items-center px-4 py-3 bg-hover/20 border-b border-border/50">
        <button 
          className="flex-[2] flex items-center space-x-2 text-[10px] font-bold text-text-disabled uppercase tracking-widest hover:text-text-primary transition-colors min-w-[180px]"
          onClick={() => handleSort("symbol")}
        >
          <span>Token</span>
          <SortIcon field="symbol" />
        </button>
        <button 
          className="flex-1 flex items-center space-x-2 text-[10px] font-bold text-text-disabled uppercase tracking-widest hover:text-text-primary transition-colors min-w-[120px]"
          onClick={() => handleSort("balance")}
        >
          <span>Balance</span>
          <SortIcon field="balance" />
        </button>
        <button 
          className="flex-1 flex items-center space-x-2 text-[10px] font-bold text-text-disabled uppercase tracking-widest hover:text-text-primary transition-colors min-w-[120px]"
          onClick={() => handleSort("valueUsd")}
        >
          <span>Value (USD)</span>
          <SortIcon field="valueUsd" />
        </button>
        <button 
          className="flex-1 flex items-center space-x-2 text-[10px] font-bold text-text-disabled uppercase tracking-widest hover:text-text-primary transition-colors min-w-[150px] hidden md:flex"
          onClick={() => handleSort("percentOfPortfolio")}
        >
          <span>Allocation</span>
          <SortIcon field="percentOfPortfolio" />
        </button>
        <div className="flex-1 text-[10px] font-bold text-text-disabled uppercase tracking-widest text-right min-w-[100px] hidden lg:block">
          Category
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border/30 overflow-x-auto">
        {filteredTokens.length > 0 ? (
          filteredTokens.map((token) => (
            <TokenBalanceRow key={token.id} token={token} />
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-text-disabled text-sm">No tokens found matching your search.</p>
          </div>
        )}
      </div>

      {/* Table Footer */}
      <div className="p-4 bg-hover/10 border-t border-border/50 text-center">
        <p className="text-[10px] text-text-disabled font-medium">
          Showing all visible assets on the Injective network.
        </p>
      </div>
    </Card>
  );
}
