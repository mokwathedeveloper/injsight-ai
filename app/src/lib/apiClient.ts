import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

/** Read the JWT token from localStorage.
 *  Checks both the direct key AND the Zustand persist envelope,
 *  so the token survives page reloads. */
function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;

  // Primary: direct key set during login
  const direct = localStorage.getItem("injsight_token");
  if (direct) return direct;

  // Fallback: Zustand persisted state { state: { token, user }, version: 0 }
  try {
    const raw = localStorage.getItem("injsight-auth");
    if (raw) {
      const parsed = JSON.parse(raw) as { state?: { token?: string } };
      const t = parsed?.state?.token;
      if (t) {
        // Sync back to primary key so future reads are fast
        localStorage.setItem("injsight_token", t);
        return t;
      }
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

// Attach JWT to every request
apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401 → clear state and redirect to login (only from protected pages)
const PUBLIC_PATHS = ["/login", "/signup", "/", "/pricing", "/security", "/analyze"];

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const path = window.location.pathname;
      const isPublic = PUBLIC_PATHS.some((p) =>
        p === "/" ? path === "/" : path.startsWith(p)
      );

      if (!isPublic) {
        // Clear all stored tokens
        localStorage.removeItem("injsight_token");
        localStorage.removeItem("injsight-auth");
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

/** Unwrap the backend's { data: payload, message: "..." } envelope. */
export function unwrapData<T>(res: { data: { data: T } }): T {
  return res.data.data;
}
