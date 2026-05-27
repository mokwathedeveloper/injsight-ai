"use client";

import * as React from "react";
import { DashboardAlertEntry } from "@/types/alerts";
import { AlertRow } from "./AlertRow";
import { Card } from "@/components/ui/Card";
import { Bell, Filter, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertListProps {
  alerts: DashboardAlertEntry[];
  onDelete?: (id: string) => void;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  className?: string;
}

export function AlertList({ 
  alerts, 
  onDelete, 
  onMarkAsRead, 
  onMarkAllAsRead,
  className 
}: AlertListProps) {
  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <Card className={cn("p-0 border-border bg-card overflow-hidden h-full flex flex-col", className)}>
      <div className="p-6 border-b border-border bg-hover/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Bell size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">Notification Log</h3>
            <p className="text-[10px] text-text-disabled font-bold uppercase tracking-widest mt-0.5">
              {unreadCount} Unread Notifications
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button 
            onClick={onMarkAllAsRead}
            className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase hover:underline transition-all"
          >
            <CheckCircle2 size={14} />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border/30">
          {alerts.map((alert) => (
            <AlertRow 
              key={alert.id} 
              alert={alert} 
              onDelete={onDelete}
              onMarkAsRead={onMarkAsRead}
            />
          ))}

          {alerts.length === 0 && (
            <div className="py-32 text-center space-y-4">
               <div className="w-16 h-16 bg-hover rounded-full flex items-center justify-center mx-auto border border-border">
                  <Filter size={24} className="text-text-disabled" />
               </div>
               <div className="space-y-1">
                  <p className="text-text-primary font-bold">All clear!</p>
                  <p className="text-text-secondary text-sm px-8">No alerts found matching your current filters.</p>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-hover/10 border-t border-border/50 text-center">
        <p className="text-[9px] text-text-disabled font-bold uppercase tracking-[0.2em]">
          End of history
        </p>
      </div>
    </Card>
  );
}
