import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { unwrapData } from "@/lib/apiClient";

export interface ReportAPI {
  id: string;
  wallet_address?: string;
  label?: string;
  created_at?: string;
  status?: string;
  risk_score?: number | { score: number; risk_level: string };
  summary?: string;
}

export function useReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: async (): Promise<ReportAPI[]> => {
      const res = await apiClient.get("/reports"); const data = (unwrapData(res) as ReportAPI[]) ?? [];
      return data;
    },
  });
}

export function useReportById(id: string | null) {
  return useQuery({
    queryKey: ["report", id],
    queryFn: async (): Promise<ReportAPI> => {
      const { data } = await apiClient.get(`/reports/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
