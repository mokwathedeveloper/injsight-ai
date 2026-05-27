export type ObservationLevel = "info" | "success" | "warning" | "error";

export interface AIObservation {
  id: string;
  level: ObservationLevel;
  text: string;
}

export interface AIReportSectionData {
  title: string;
  content: string;
  observations: AIObservation[];
}

export interface AIWalletReportData {
  summary: AIReportSectionData;
  risk: AIReportSectionData;
  concentration: AIReportSectionData;
  nextSteps: string[];
}
