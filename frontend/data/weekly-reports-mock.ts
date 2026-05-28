import { WeeklyReport, ReportSchedule } from "@/types/weekly-reports";

export const MOCK_WEEKLY_REPORTS: WeeklyReport[] = [
  {
    id: "wr-1",
    weekOf: "May 22 – May 29, 2026",
    walletCount: 4,
    valueChangePct: 3.2,
    riskDelta: -2,
    highlights: [
      "Combined portfolio value rose 3.2% to $1.36M, led by INJ appreciation.",
      "Whale Portfolio risk score dropped 2 points after reducing leverage exposure.",
      "One large outflow (~$52k USDC) flagged on the DAO Multisig wallet.",
    ],
  },
  {
    id: "wr-2",
    weekOf: "May 15 – May 22, 2026",
    walletCount: 4,
    valueChangePct: -1.4,
    riskDelta: 5,
    highlights: [
      "Portfolio value dipped 1.4% amid broader market volatility.",
      "Risk score rose 5 points due to increased concentration in TIA.",
      "New staking position opened on the Market Maker wallet.",
    ],
  },
];

export const MOCK_REPORT_SCHEDULE: ReportSchedule = {
  enabled: true,
  frequency: "weekly",
  dayOfWeek: "Monday",
  deliverEmail: true,
  deliverInApp: true,
};
