"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Search, Wallet, FileText, Bell, Star,
  Sparkles, Settings, History, Zap, ChevronRight, Landmark,
  Webhook, CreditCard, Users, Code2, Shield, MessageSquare,
  CalendarDays, BarChart3, FlaskConical, Globe,
} from "lucide-react";

const mainNav = [
  { href: "/dashboard",                label: "Dashboard",       icon: LayoutDashboard },
  { href: "/analyze",                  label: "Analyze Wallet",  icon: Search },
  { href: "/analyze?demo=true",        label: "Demo Wallet",     icon: FlaskConical },
  { href: "/dashboard/wallets",        label: "Saved Wallets",   icon: Wallet },
  { href: "/dashboard/reports",        label: "Reports",         icon: FileText },
  { href: "/dashboard/alerts",         label: "Alerts",          icon: Bell,  badge: 3 },
  { href: "/dashboard/watchlist",      label: "Watchlist",       icon: Star },
  { href: "/dashboard/insights",       label: "Insights",        icon: Sparkles },
  { href: "/dashboard/chat",           label: "Ask Your Wallet", icon: MessageSquare },
  { href: "/dashboard/weekly-reports", label: "Weekly Reports",  icon: CalendarDays },
  { href: "/dashboard/history",        label: "History",         icon: History },
  { href: "/dashboard/settings",       label: "Settings",        icon: Settings },
];

const injectiveNav = [
  { href: "/dashboard/injective",  label: "Injective Hub", icon: Globe },
];

const powerNav = [
  { href: "/dashboard/treasury",   label: "Treasury",    icon: Landmark },
  { href: "/dashboard/webhooks",   label: "Webhooks",    icon: Webhook },
  { href: "/billing",              label: "Billing",     icon: CreditCard },
  { href: "/team",                 label: "Team",        icon: Users },
  { href: "/api-access",           label: "API Access",  icon: Code2 },
  { href: "/security",             label: "Security",    icon: Shield },
  { href: "/admin",                label: "Admin",       icon: BarChart3 },
];

function NavItem({ href, label, icon: Icon, badge, pathname }: {
  href: string; label: string; icon: React.ElementType; badge?: number; pathname: string;
}) {
  const active = pathname === href || (
    !href.includes("?") && href !== "/dashboard" && pathname.startsWith(href)
  );
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-[13px] font-medium transition-colors duration-150",
        active
          ? "bg-primary/15 text-accent border border-primary/20"
          : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
      )}
    >
      <Icon className="h-[15px] w-[15px] shrink-0" />
      <span className="flex-1 truncate">{label}</span>
      {badge && (
        <span className="text-[10px] font-bold bg-danger text-white rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r border-border bg-surface overflow-y-auto scrollbar-hide">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Logo size="sm" />
        <p className="text-[10px] text-text-muted mt-0.5 leading-tight">
          AI Wallet Intelligence for Injective DeFi
        </p>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {mainNav.map((item) => (
          <NavItem key={item.href} {...item} pathname={pathname} />
        ))}

        <div className="pt-3 pb-1">
          <p className="section-label px-3 mb-1.5">🔗 Injective Chain</p>
        </div>
        {injectiveNav.map((item) => (
          <NavItem key={item.href} {...item} pathname={pathname} />
        ))}

        <div className="pt-3 pb-1">
          <p className="section-label px-3 mb-1.5">Advanced</p>
        </div>

        {powerNav.map((item) => (
          <NavItem key={item.href} {...item} pathname={pathname} />
        ))}
      </nav>

      {/* Upgrade CTA */}
      <div className="p-3 border-t border-border">
        <div className="rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/25 p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-semibold text-text-primary">Unlock More Insights</span>
          </div>
          <p className="text-[11px] text-text-muted mb-2.5 leading-relaxed">
            Unlimited analyses, team workspace &amp; API access.
          </p>
          <Button variant="accent" size="sm" className="w-full text-xs" asChild>
            <Link href="/pricing">
              Upgrade Plan <ChevronRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>

        {/* User pill */}
        <div className="flex items-center gap-2 mt-3 px-1">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white shrink-0">
            J
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate">John Doe</p>
            <p className="text-[10px] text-text-muted truncate">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
