"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, staleTime: 30_000, refetchOnWindowFocus: false },
        },
      })
  );

  // Ensure the persisted auth state is restored on the client after mount,
  // so returning users (token in localStorage) load live data immediately.
  React.useEffect(() => {
    void useAuthStore.persist?.rehydrate?.();
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
