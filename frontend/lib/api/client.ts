/**
 * Typed fetch client for the InjSight AI backend.
 *
 * Handles the standard success envelope `{ data, message }` and the error
 * envelope `{ error, message, statusCode }`. Reads the base URL from
 * NEXT_PUBLIC_API_URL and injects the bearer token from the auth store.
 */
import { useAuthStore } from "@/store/auth";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export interface ApiSuccess<T> {
  data: T;
  message: string;
}

export class ApiError extends Error {
  code: string;
  statusCode: number;
  constructor(code: string, message: string, statusCode: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
  signal?: AbortSignal;
}

export async function apiRequest<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = false, signal } = opts;
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (auth) {
    const token = useAuthStore.getState().accessToken;
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch {
    throw new ApiError("NETWORK_ERROR", "Could not reach the InjSight AI API.", 0);
  }

  let payload: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!res.ok) {
    const p = (payload ?? {}) as { error?: string; message?: string; statusCode?: number };
    throw new ApiError(
      p.error || "REQUEST_FAILED",
      p.message || `Request failed (${res.status}).`,
      p.statusCode || res.status
    );
  }

  // Standard envelope unwraps to `.data`; raw payloads pass through.
  if (payload && typeof payload === "object" && "data" in (payload as object)) {
    return (payload as ApiSuccess<T>).data;
  }
  return payload as T;
}

export const apiHealthy = async (): Promise<boolean> => {
  try {
    const r = await fetch(`${API_BASE_URL}/api/health`);
    return r.ok;
  } catch {
    return false;
  }
};
