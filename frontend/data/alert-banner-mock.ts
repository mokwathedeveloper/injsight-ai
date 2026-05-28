import { GlobalAlertBannerData } from "../types/alert-banner";

export const MOCK_ACTIVE_BANNER: GlobalAlertBannerData | null = {
  id: "ban-critical-vol",
  type: "risk",
  severity: "critical",
  title: "Ecosystem Volatility Alert",
  message: "High volatility detected across Injective L1 assets. Review your portfolio risk scores now.",
  actionLabel: "View Risk Report",
  actionUrl: "/dashboard/alerts",
  isPersistent: true,
};
