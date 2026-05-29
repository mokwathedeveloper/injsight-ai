"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, ChevronDown, ExternalLink, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";

export function DashboardHeader() {
  const router    = useRouter();
  const { user, logout } = useAuthStore();
  const [search,    setSearch]    = useState("");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const displayName  = user?.name ?? user?.email?.split("@")[0] ?? "Account";
  const initials     = displayName.slice(0, 2).toUpperCase();
  const planBadge    = user?.plan ?? "free";

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-surface/90 backdrop-blur-sm px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <input
          type="text"
          placeholder="Search wallets, reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-9 py-2 text-xs h-9"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* New Analysis CTA */}
        <Button variant="accent" size="sm" asChild>
          <Link href="/analyze">
            <ExternalLink className="h-3.5 w-3.5" />
            New Analysis
          </Link>
        </Button>

        {/* Alerts bell */}
        <Link
          href="/dashboard/alerts"
          className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
        </Link>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-surface-2 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-text-primary leading-tight">{displayName}</p>
              <p className="text-[10px] text-text-muted capitalize">{planBadge} plan</p>
            </div>
            <ChevronDown className={`h-3.5 w-3.5 text-text-muted transition-transform ${menuOpen ? "rotate-180" : ""}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-48 glass-card shadow-card-hover py-1 animate-slide-down z-50">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-xs font-semibold text-text-primary truncate">{user?.email}</p>
                <p className="text-[10px] text-text-muted capitalize mt-0.5">{planBadge} plan</p>
              </div>
              <Link
                href="/dashboard/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
              >
                <Settings className="h-3.5 w-3.5" />
                Settings
              </Link>
              <Link
                href="/billing"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                Billing
              </Link>
              <div className="divider my-1" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-danger hover:bg-danger-muted transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
