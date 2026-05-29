/**
 * Display formatters — pure functions, no side effects.
 * Import from here rather than inlining locale/format logic in components.
 */

/** Format a USD value with 2 decimal places and $ prefix. */
export function formatUsd(value: number, compact = false): string {
  if (compact) {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`;
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
}

/** Format a token balance with appropriate decimal places. */
export function formatTokenBalance(amount: number, symbol?: string): string {
  const formatted =
    amount >= 1_000_000
      ? `${(amount / 1_000_000).toFixed(2)}M`
      : amount >= 1_000
      ? `${(amount / 1_000).toFixed(2)}K`
      : amount.toLocaleString("en-US", { maximumFractionDigits: 4 });
  return symbol ? `${formatted} ${symbol}` : formatted;
}

/** Truncate a wallet address for display: `inj1abc…xyz`. */
export function truncateAddress(address: string, head = 10, tail = 6): string {
  if (address.length <= head + tail) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}

/** Format a percentage value with a + or − sign. */
export function formatPercent(value: number, showSign = false): string {
  const formatted = `${Math.abs(value).toFixed(1)}%`;
  if (!showSign) return formatted;
  return value >= 0 ? `+${formatted}` : `−${formatted}`;
}

/** Convert an ISO timestamp to a short relative time string. */
export function relativeTime(iso: string | null | undefined): string {
  if (!iso) return "Never";
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return "Unknown";
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

/** Format a Date or ISO string as a readable date: "May 29, 2026". */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(
    typeof date === "string" ? new Date(date) : date
  );
}

/** Render a risk level as a display label. */
export function riskLevelLabel(score: number): string {
  if (score < 35) return "Low";
  if (score < 60) return "Moderate";
  if (score < 80) return "High";
  return "Very High";
}
