"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, User, ChevronDown, Moon, Sun, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-surface/90 backdrop-blur-sm px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <input
          type="text"
          placeholder="Search wallets, teams, reports..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="input-field pl-9 py-2 text-xs h-9"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* New Analysis */}
        <Button variant="accent" size="sm" asChild>
          <Link href="/analyze">
            <ExternalLink className="h-3.5 w-3.5" />
            New Analysis
          </Link>
        </Button>

        {/* Alerts */}
        <button className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
        </button>

        {/* User menu */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-surface-2 transition-colors">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-medium text-text-primary hidden sm:block">John Doe</span>
          <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
        </button>
      </div>
    </header>
  );
}
