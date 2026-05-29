import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string, chars = 6): string {
  if (!address) return "";
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatCurrency(value: number, decimals = 2): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
  return `$${value.toFixed(decimals)}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number, decimals = 2): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

export function getRiskColor(level: string): string {
  switch (level?.toLowerCase()) {
    case "critical": return "text-danger";
    case "high":     return "text-warning";
    case "medium":   return "text-yellow-400";
    case "low":      return "text-success";
    default:         return "text-text-secondary";
  }
}

export function getRiskBadgeClass(level: string): string {
  switch (level?.toLowerCase()) {
    case "critical": return "badge-danger";
    case "high":     return "badge-warning";
    case "medium":   return "badge bg-yellow-400/10 text-yellow-400";
    case "low":      return "badge-success";
    default:         return "badge bg-surface-2 text-text-secondary";
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
