/**
 * Auth service — abstract layer for authentication.
 *
 * The store and router integration lives in the form components;
 * this service handles the raw API calls so they can be tested/swapped
 * independently.
 */
import { authApi } from "@/lib/api/endpoints";
import type { ApiAuthResult, ApiUser } from "@/lib/api/types";

export const authService = {
  /** Register a new account. */
  async signup(email: string, password: string, name?: string): Promise<ApiAuthResult> {
    return authApi.signup(name || email.split("@")[0], email, password);
  },

  /** Sign in with email + password. */
  async login(email: string, password: string): Promise<ApiAuthResult> {
    return authApi.login(email, password);
  },

  /** Fetch the currently authenticated user's profile. */
  async getProfile(): Promise<ApiUser> {
    return authApi.me();
  },

  /** Validate that a string looks like a JWT access token (client-side only). */
  isTokenValid(token: string | null | undefined): boolean {
    if (!token) return false;
    try {
      const [, payload] = token.split(".");
      const { exp } = JSON.parse(atob(payload));
      return Date.now() / 1000 < exp;
    } catch {
      return false;
    }
  },
};
