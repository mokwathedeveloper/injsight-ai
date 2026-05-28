import { ApiKey, ApiEndpoint, RequestLogEntry, RateLimitInfo } from "@/types/api-platform";

export const MOCK_API_KEYS: ApiKey[] = [
  { id: "k-1", name: "Production server", prefix: "injsk_live_7f2a…", created: "Apr 12, 2026", lastUsed: "2 minutes ago", status: "active" },
  { id: "k-2", name: "Staging", prefix: "injsk_test_9b4c…", created: "Mar 03, 2026", lastUsed: "Yesterday", status: "active" },
  { id: "k-3", name: "Old integration", prefix: "injsk_live_1d8e…", created: "Jan 22, 2026", lastUsed: "30 days ago", status: "revoked" },
];

export const MOCK_API_ENDPOINTS: ApiEndpoint[] = [
  { method: "GET", path: "/v1/wallets/{address}", description: "Fetch normalized balances and metadata" },
  { method: "GET", path: "/v1/wallets/{address}/risk", description: "Risk score and factor breakdown" },
  { method: "POST", path: "/v1/wallets/{address}/report", description: "Generate an AI wallet report" },
  { method: "GET", path: "/v1/wallets/{address}/activity", description: "Recent transactions and movements" },
];

export const MOCK_REQUEST_LOG: RequestLogEntry[] = [
  { id: "r-1", time: "23:54:01", method: "GET", endpoint: "/v1/wallets/inj1q…/risk", statusCode: 200, statusClass: "success", latencyMs: 142 },
  { id: "r-2", time: "23:53:47", method: "POST", endpoint: "/v1/wallets/inj1q…/report", statusCode: 200, statusClass: "success", latencyMs: 2380 },
  { id: "r-3", time: "23:52:10", method: "GET", endpoint: "/v1/wallets/badaddr", statusCode: 422, statusClass: "client_error", latencyMs: 38 },
  { id: "r-4", time: "23:50:55", method: "GET", endpoint: "/v1/wallets/inj1z…/activity", statusCode: 200, statusClass: "success", latencyMs: 201 },
  { id: "r-5", time: "23:49:02", method: "GET", endpoint: "/v1/wallets/inj1z…/risk", statusCode: 429, statusClass: "client_error", latencyMs: 12 },
];

export const MOCK_RATE_LIMIT: RateLimitInfo = {
  limit: 1000,
  used: 642,
  window: "per hour",
  resetsIn: "18 min",
};

export const MOCK_RESPONSE_PREVIEW = `{
  "address": "inj1q...z6a",
  "chain": "injective",
  "risk_score": 72,
  "risk_level": "High",
  "total_value_usd": 248450.75,
  "top_holding": { "symbol": "INJ", "percent": 35.2 },
  "generated_at": "2026-05-29T23:54:01Z"
}`;
