/** Auth store: persists tokens + user to localStorage (client-only UI state). */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ApiUser } from "@/lib/api/types";

interface AuthState {
  user: ApiUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (user: ApiUser, accessToken: string, refreshToken: string) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (user, accessToken, refreshToken) => set({ user, accessToken, refreshToken }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      clear: () => set({ user: null, accessToken: null, refreshToken: null }),
      isAuthenticated: () => !!get().accessToken,
    }),
    { name: "injsight-auth" }
  )
);
