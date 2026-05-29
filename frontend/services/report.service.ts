/**
 * Report service — abstract layer for AI wallet reports.
 */
import { reportsApi } from "@/lib/api/endpoints";
import { adaptReport } from "@/lib/api/adapters";
import type { AIReportHubEntry } from "@/types/reports";
import { MOCK_REPORTS } from "@/data/reports-mock";

export const reportService = {
  /** List all AI reports for the authenticated user. */
  async getReports(): Promise<AIReportHubEntry[]> {
    try {
      const data = await reportsApi.list();
      return data.map(adaptReport);
    } catch {
      return MOCK_REPORTS;
    }
  },

  /** Delete a report. */
  async deleteReport(id: string): Promise<void> {
    await reportsApi.remove(id);
  },

  /**
   * Export a report in the requested format.
   * Returns the download URL or raw content string.
   */
  async exportReport(id: string, format: "json" | "markdown" | "pdf"): Promise<string> {
    // In a full implementation this would trigger a download via the API.
    // For now it returns the API URL so the frontend can open/download it.
    return `/api/reports/${id}/export?format=${format}`;
  },

  /** Generate a shareable public link for a report. */
  shareableLink(reportId: string): string {
    if (typeof window === "undefined") return `/p/${reportId}`;
    return `${window.location.origin}/p/${reportId}`;
  },
};
