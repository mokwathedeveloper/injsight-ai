"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Wallet, 
  History, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X,
  Search,
  Zap,
  FileText,
  Monitor,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface NavItemProps {
  href: string;
  icon: any;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

function NavItem({ href, icon: Icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
        isActive 
          ? "bg-primary text-white shadow-lg shadow-primary/20" 
          : "text-text-secondary hover:text-text-primary hover:bg-hover"
      )}
    >
      <Icon size={20} className={cn(isActive ? "text-white" : "text-text-disabled group-hover:text-text-primary")} />
      <span className="text-sm font-bold tracking-tight">{label}</span>
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navigation = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/wallets", icon: Wallet, label: "My Wallets" },
    { href: "/dashboard/watchlist", icon: Monitor, label: "Watchlist" },
    { href: "/dashboard/reports", icon: FileText, label: "Intelligence Reports" },
    { href: "/dashboard/history", icon: History, label: "Analysis History" },
    { href: "/dashboard/alerts", icon: Bell, label: "Alerts" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-page text-text-primary flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-xl sticky top-0 h-screen p-6">
        <div className="mb-10 px-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo/websiteLogo.png" alt="InjSight AI" width={32} height={32} />
            <span className="text-xl font-bold tracking-tight">InjSight AI</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar pr-2">
          {navigation.map((item) => (
            <NavItem 
              key={item.href}
              {...item}
              isActive={pathname === item.href}
            />
          ))}
        </nav>

        {/* Plan Usage Widget */}
        <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-2xl space-y-3 group/usage">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-text-disabled uppercase tracking-widest group-hover/usage:text-primary transition-colors">Usage</span>
              <span className="text-[9px] font-bold text-primary px-1.5 py-0.5 bg-primary/10 rounded">FREE</span>
           </div>
           <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                 <span className="text-text-secondary">Wallets</span>
                 <span className="font-bold">4 / 5</span>
              </div>
              <div className="w-full h-1 bg-hover rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-[80%]" />
              </div>
           </div>
           <Link href="/pricing" className="block pt-1">
              <button className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-1.5 group/up">
                 <TrendingUp size={10} />
                 <span>Upgrade now</span>
              </button>
           </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-border/50">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-text-disabled hover:text-error hover:bg-error/10 transition-all group">
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold tracking-tight">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-page/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-text-secondary hover:text-text-primary"
            >
              <Menu size={24} />
            </button>
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo/websiteLogo.png" alt="InjSight AI" width={28} height={28} />
            </Link>
          </div>

          <div className="hidden sm:flex items-center bg-hover/50 border border-border px-3 py-1.5 rounded-lg w-full max-w-sm">
            <Search size={16} className="text-text-disabled" />
            <input 
              type="text" 
              placeholder="Quick search wallets..." 
              className="bg-transparent border-none focus:ring-0 text-xs text-text-primary placeholder:text-text-disabled w-full ml-2"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-page" />
            </button>
            <div className="h-8 w-px bg-border mx-1" />
            <div className="flex items-center gap-3 pl-1 group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                JD
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold leading-none">John Doe</p>
                <p className="text-[10px] text-text-disabled uppercase mt-1 font-bold">Pro Plan</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="absolute top-0 left-0 bottom-0 w-72 bg-card border-r border-border p-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-10 px-2">
              <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo/websiteLogo.png" alt="InjSight AI" width={32} height={32} />
                <span className="text-xl font-bold tracking-tight">InjSight AI</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-text-disabled">
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-1.5">
              {navigation.map((item) => (
                <NavItem 
                  key={item.href}
                  {...item}
                  isActive={pathname === item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </nav>

            <div className="mt-auto pt-6 absolute bottom-6 left-6 right-6">
              <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-text-disabled hover:text-error hover:bg-error/10 transition-all group border-t border-border/50">
                <LogOut size={20} />
                <span className="text-sm font-bold tracking-tight">Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
