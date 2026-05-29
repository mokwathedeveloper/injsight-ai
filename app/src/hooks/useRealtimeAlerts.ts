"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSupabaseClient } from "@/lib/supabase";

/**
 * Subscribe to real-time alert notifications via Supabase Realtime.
 *
 * When the backend broadcasts an alert event for the current user,
 * this hook invalidates the alerts query so the UI refreshes instantly.
 *
 * Falls back gracefully if Supabase is not configured.
 */
export function useRealtimeAlerts(userId: string | undefined) {
  const qc          = useQueryClient();
  const channelRef  = useRef<ReturnType<typeof getSupabaseClient> extends null ? null : any>(null);

  useEffect(() => {
    if (!userId) return;

    const sb = getSupabaseClient();
    if (!sb) return;

    const channel = sb.channel(`user:${userId}:alerts`);

    channel
      .on("broadcast", { event: "alert" }, () => {
        // New alert received — refresh the alerts list
        qc.invalidateQueries({ queryKey: ["alerts"] });
        qc.invalidateQueries({ queryKey: ["dashboard-summary"] });
      })
      .on("broadcast", { event: "analysis_complete" }, (payload: any) => {
        // Analysis finished — refresh relevant queries
        qc.invalidateQueries({ queryKey: ["analysis-history"] });
        qc.invalidateQueries({ queryKey: ["dashboard-summary"] });
        if (payload?.payload?.analysis_id) {
          qc.invalidateQueries({ queryKey: ["analysis", payload.payload.analysis_id] });
        }
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        sb.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [userId, qc]);
}
