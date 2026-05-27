"use client";

import * as React from "react";
import { AppShell } from "@/components/dashboard/AppShell";
import { AlertList } from "@/components/dashboard/AlertList";
import { AlertFilterBar } from "@/components/dashboard/AlertFilterBar";
import { MOCK_ALERTS_LOG } from "@/data/alerts-mock";
import { AlertFilters, DashboardAlertEntry } from "@/types/alerts";
import { Bell, Shield, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AlertsPage() {
  const [alerts, setAlerts] = React.useState<DashboardAlertEntry[]>(MOCK_ALERTS_LOG);
  const [filters, setFilters] = React.useState<AlertFilters>({
    search: "",
    type: "all",
    severity: "all",
    isRead: "all",
  });

  const filteredAlerts = React.useMemo(() => {
    return alerts.filter(alert => {
      const matchesSearch = !filters.search || 
        alert.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        alert.message.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesType = filters.type === "all" || alert.type === filters.type;
      const matchesRead = filters.isRead === "all" || alert.isRead === (filters.isRead as boolean);
      
      return matchesSearch && matchesType && matchesRead;
    });
  }, [alerts, filters]);

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, isRead: true })));
  };

  return (
    <AppShell>
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <Bell size={20} />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                Notification <span className="text-primary">Center</span>
              </h1>
            </div>
            <p className="text-text-secondary text-sm">
              Real-time security flags, volatility alerts, and intelligence updates.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="h-12 px-6 gap-2 border-border-strong font-bold text-xs uppercase tracking-widest">
              <Settings size={18} className="text-text-disabled" />
              <span>Configure Alerts</span>
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <AlertFilterBar 
          filters={filters} 
          onFilterChange={setFilters} 
        />

        {/* Alerts Feed */}
        <div className="space-y-6">
          <div className="h-[600px]">
            <AlertList 
              alerts={filteredAlerts} 
              onDelete={handleDeleteAlert}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
          
          {/* Trust Banner */}
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
               <Shield size={18} />
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-bold text-text-primary uppercase tracking-widest px-1">Alert Integrity</p>
               <p className="text-[10px] text-text-secondary leading-relaxed px-1">
                 Our alerts are powered by real-time Injective indexer data and AI sentiment analysis. 
                 InjSight AI does not have access to move your funds; alerts are purely informational.
               </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
