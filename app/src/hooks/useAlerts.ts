import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { unwrapData } from "@/lib/apiClient";

export interface AlertAPI {
  id: string;
  type?: string;
  severity?: string;
  title: string;
  message: string;
  wallet_address?: string;
  wallet_label?: string;
  created_at?: string;
  time?: string;
  status?: string;
  read?: boolean;
  source?: string;
}

export function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: async (): Promise<AlertAPI[]> => {
      const res = await apiClient.get("/alerts"); const data = (unwrapData(res) as AlertAPI[]) ?? [];
      return data;
    },
  });
}

export function useMarkAlertRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await apiClient.patch(`/alerts/${id}/read`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alerts"] }),
  });
}
