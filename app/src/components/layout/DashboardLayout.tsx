"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { useAuthStore } from "@/store/authStore";
import { useRealtimeAlerts } from "@/hooks/useRealtimeAlerts";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  useRealtimeAlerts(user?.id);

  return (
    <div className="flex h-screen bg-background overflow-hidden">

      {/* Desktop sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-y-0 left-0 z-50 lg:hidden shadow-2xl">
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex lg:hidden items-center h-12 px-4 border-b border-border bg-surface/95 backdrop-blur-sm shrink-0 gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg text-text-secondary hover:bg-surface-2 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="text-sm font-bold text-text-primary">
            InjSight <span className="text-accent">AI</span>
          </span>
        </div>

        {/* Desktop header */}
        <div className="hidden lg:block shrink-0">
          <DashboardHeader />
        </div>

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
