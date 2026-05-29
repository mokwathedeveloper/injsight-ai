/**
 * Supabase client for FRONTEND use only.
 *
 * The anon key is safe to expose in the browser — it enforces Row Level
 * Security (RLS) policies. All privileged operations go through our
 * FastAPI backend (/api/*) which uses the service_role key server-side.
 *
 * Frontend Supabase is used ONLY for:
 * - Realtime subscriptions (live alerts, analysis completion events)
 * - NOT for direct database queries (use useAlerts, useDashboard hooks instead)
 */
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL     = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON    = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let _client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON) return null;
  if (!_client) {
    _client = createClient(SUPABASE_URL, SUPABASE_ANON, {
      auth:     { persistSession: false },
      realtime: { params: { eventsPerSecond: 10 } },
    });
  }
  return _client;
}

export const supabase = getSupabaseClient();
