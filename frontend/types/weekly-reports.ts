export interface WeeklyReport {
  id: string;
  weekOf: string;
  walletCount: number;
  valueChangePct: number;
  riskDelta: number;
  highlights: string[];
}

export type ReportFrequency = "weekly" | "biweekly" | "monthly";

export interface ReportSchedule {
  enabled: boolean;
  frequency: ReportFrequency;
  dayOfWeek: string;
  deliverEmail: boolean;
  deliverInApp: boolean;
}
