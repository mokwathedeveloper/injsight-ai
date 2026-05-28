export type ApiKeyStatus = "active" | "revoked";

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
  status: ApiKeyStatus;
}

export interface ApiEndpoint {
  method: "GET" | "POST";
  path: string;
  description: string;
}

export type RequestStatusClass = "success" | "client_error" | "server_error";

export interface RequestLogEntry {
  id: string;
  time: string;
  method: "GET" | "POST";
  endpoint: string;
  statusCode: number;
  statusClass: RequestStatusClass;
  latencyMs: number;
}

export interface RateLimitInfo {
  limit: number;
  used: number;
  window: string;
  resetsIn: string;
}
