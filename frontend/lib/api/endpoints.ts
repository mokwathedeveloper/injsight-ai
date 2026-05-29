/** Typed endpoint functions mapping to the documented API contract. */
import { apiRequest } from "./client";
import type {
  ApiAnalysis,
  ApiAuthResult,
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

export const usersApi = {
  usage: () => apiRequest<ApiUsage>("/api/users/usage", { auth: true }),
};
