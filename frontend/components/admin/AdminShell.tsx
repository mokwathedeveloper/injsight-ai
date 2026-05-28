"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, AlertTriangle, BarChart3, ShieldCheck, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/admin/errors", icon: AlertTriangle, label: "Errors" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-page text-text-primary flex">
      <aside className="hidden lg:flex flex-col w-60 border-r border-border bg-card/50 backdrop-blur-xl sticky top-0 h-screen p-6">
        <div className="mb-8 px-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo/websiteLogo.png" alt="InjSight AI" width={28} height={28} />
            <span className="text-lg font-bold tracking-tight">InjSight</span>
          </Link>
          <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-error bg-error/10 border border-error/30 px-2 py-0.5 rounded">
            <ShieldCheck size={10} /> Admin
          </span>
        </div>

        <nav className="flex-1 space-y-1.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-secondary hover:text-text-primary hover:bg-hover"
                )}
              >
                <Icon size={18} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-disabled hover:text-text-primary hover:bg-hover transition-all mt-6 border-t border-border/50 pt-6">
          <ArrowLeft size={18} />
          <span className="text-sm font-bold tracking-tight">Exit Admin</span>
        </Link>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-page/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 sm:px-8">
          <p className="text-sm font-bold text-text-primary">Operations Console</p>
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-success">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> Systems nominal
          </span>
        </header>
        <main className="p-4 sm:p-8 max-w-7xl mx-auto w-full">{children}</main>
      </div>
    </div>
  );
}
