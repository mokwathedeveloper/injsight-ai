import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "@/lib/apiClient";

interface AuthUser {
  id: string;
  email: string;
  name?: string;
  plan: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}

// Backend wraps all responses in { data: ..., message: ... }
function unwrap<T>(response: { data: { data: T } }): T {
  return response.data.data;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await apiClient.post("/auth/login", { email, password });
          // Response: { data: { user, tokens: { accessToken, refreshToken } } }
          const { user, tokens } = res.data.data as { user: AuthUser; tokens: { accessToken: string } };
          const token = tokens.accessToken;
          localStorage.setItem("injsight_token", token);
          set({ token, user, isLoading: false });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      register: async (email, password, name) => {
        set({ isLoading: true });
        try {
          const res = await apiClient.post("/auth/signup", { email, password, name });
          const { user, tokens } = res.data.data as { user: AuthUser; tokens: { accessToken: string } };
          const token = tokens.accessToken;
          localStorage.setItem("injsight_token", token);
          set({ token, user, isLoading: false });
        } catch (err) {
          set({ isLoading: false });
          throw err;
        }
      },

      logout: () => {
        localStorage.removeItem("injsight_token");
        set({ user: null, token: null });
      },

      isAuthenticated: () => !!get().token && !!get().user,
    }),
    { name: "injsight-auth", partialize: (s) => ({ token: s.token, user: s.user }) }
  )
);
