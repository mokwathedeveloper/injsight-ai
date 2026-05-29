"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Search,
  Wallet,
  FileText,
  Bell,
  Star,
  TrendingUp,
  Settings,
  History,
  Zap,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard",          label: "Dashboard",      icon: LayoutDashboard },
  { href: "/analyze",            label: "Analyze Wallet", icon: Search },
  { href: "/dashboard/wallets",  label: "Saved Wallets",  icon: Wallet },
  { href: "/dashboard/reports",  label: "Reports",        icon: FileText },
  { href: "/dashboard/alerts",   label: "Alerts",         icon: Bell,   badge: 3 },
  { href: "/dashboard/watchlist",label: "Watchlist",      icon: Star },
  { href: "/dashboard/insights", label: "Insights",       icon: TrendingUp },
  { href: "/dashboard/history",  label: "History",        icon: History },
  { href: "/dashboard/settings", label: "Settings",       icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r border-border bg-surface overflow-y-auto">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Logo size="sm" />
        <p className="text-[10px] text-text-muted mt-1">AI Wallet Intelligence for Injective DeFi</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                active
                  ? "bg-primary-muted text-accent"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="text-[10px] font-bold bg-danger text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade CTA */}
      <div className="p-3">
        <div className="rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-text-primary">Unlock More Insights</span>
          </div>
          <p className="text-[11px] text-text-muted mb-2">
            Get unlimited analyses, team features &amp; API access.
          </p>
          <Button variant="accent" size="sm" className="w-full" asChild>
            <Link href="/pricing">
              Upgrade Plan <ChevronRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
