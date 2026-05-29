/** Typed endpoint functions mapping to the documented API contract. */
import { apiRequest } from "./client";
import type {
  ApiAlert,
  ApiAnalysis,
  ApiAuthResult,
  ApiReport,
  ApiUsage,
  ApiUser,
  ApiWallet,
} from "./types";

export const authApi = {
  signup: (name: string, email: string, password: string) =>
    apiRequest<ApiAuthResult>("/api/auth/signup", { method: "POST", body: { name, email, password } }),
  login: (email: string, password: string) =>
    apiRequest<ApiAuthResult>("/api/auth/login", { method: "POST", body: { email, password } }),
  me: () => apiRequest<ApiUser>("/api/auth/me", { auth: true }),
};

export const analysisApi = {
  publicAnalyze: (walletAddress: string, signal?: AbortSignal) =>
    apiRequest<ApiAnalysis>("/api/public/analyze-wallet", {
      method: "POST",
      body: { walletAddress },
      signal,
    }),
  demoWallet: () => apiRequest<ApiAnalysis>("/api/public/demo-wallet"),
  create: (walletAddress: string, saveResult = false) =>
    apiRequest<ApiAnalysis>("/api/analysis", {
      method: "POST",
      body: { walletAddress, saveResult },
      auth: true,
    }),
  list: () => apiRequest<ApiAnalysis[]>("/api/analysis", { auth: true }),
  get: (id: string) => apiRequest<ApiAnalysis>(`/api/analysis/${id}`, { auth: true }),
};

export const walletsApi = {
  list: () => apiRequest<ApiWallet[]>("/api/wallets", { auth: true }),
  save: (walletAddress: string, label?: string) =>
    apiRequest<ApiWallet>("/api/wallets", { method: "POST", body: { walletAddress, label }, auth: true }),
  remove: (id: string) => apiRequest<null>(`/api/wallets/${id}`, { method: "DELETE", auth: true }),
  analyze: (id: string) => apiRequest<ApiAnalysis>(`/api/wallets/${id}/analyze`, { method: "POST", auth: true }),
};

export const alertsApi = {
  list: () => apiRequest<ApiAlert[]>("/api/alerts", { auth: true }),
  markRead: (id: string) => apiRequest<ApiAlert>(`/api/alerts/${id}/read`, { method: "PUT", auth: true }),
  markAllRead: () => apiRequest<null>("/api/alerts/read-all", { method: "PUT", auth: true }),
  remove: (id: string) => apiRequest<null>(`/api/alerts/${id}`, { method: "DELETE", auth: true }),
};

export const reportsApi = {
  list: () => apiRequest<ApiReport[]>("/api/reports", { auth: true }),
  get: (id: string) => apiRequest<ApiReport>(`/api/reports/${id}`, { auth: true }),
  remove: (id: string) => apiRequest<null>(`/api/reports/${id}`, { method: "DELETE", auth: true }),
};

export const usersApi = {
  usage: () => apiRequest<ApiUsage>("/api/users/usage", { auth: true }),
};

export const billingApi = {
  summary: () => apiRequest<any>("/api/billing/summary", { auth: true }),
};

export const teamsApi = {
  workspaces: () => apiRequest<any[]>("/api/teams/workspaces", { auth: true }),
  members: () => apiRequest<any[]>("/api/teams/members", { auth: true }),
  invite: (email: string, role: string) =>
    apiRequest<any>("/api/teams/members", { method: "POST", body: { email, role }, auth: true }),
  updateRole: (id: string, role: string) =>
    apiRequest<any>(`/api/teams/members/${id}/role`, { method: "PUT", body: { role }, auth: true }),
  remove: (id: string) =>
    apiRequest<null>(`/api/teams/members/${id}`, { method: "DELETE", auth: true }),
};

export const treasuryApi = {
  summary: () => apiRequest<any>("/api/treasury/summary", { auth: true }),
};

export const adminApi = {
  stats: () => apiRequest<any>("/api/admin/stats", { auth: true }),
  users: () => apiRequest<any[]>("/api/admin/users", { auth: true }),
};

export const developerApi = {
  listKeys: () => apiRequest<any[]>("/api/developer/keys", { auth: true }),
  createKey: (name: string) =>
    apiRequest<any>("/api/developer/keys", { method: "POST", body: { name }, auth: true }),
  revokeKey: (id: string) =>
    apiRequest<null>(`/api/developer/keys/${id}`, { method: "DELETE", auth: true }),
  keyUsage: () => apiRequest<any>("/api/developer/keys/usage", { auth: true }),
  listWebhooks: () => apiRequest<any[]>("/api/developer/webhooks", { auth: true }),
  createWebhook: (url: string, events: string[]) =>
    apiRequest<any>("/api/developer/webhooks", { method: "POST", body: { url, events }, auth: true }),
  deleteWebhook: (id: string) =>
    apiRequest<null>(`/api/developer/webhooks/${id}`, { method: "DELETE", auth: true }),
  deliveries: () => apiRequest<any[]>("/api/developer/webhooks/deliveries", { auth: true }),
};
