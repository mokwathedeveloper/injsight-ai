export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface PortfolioStats {
  stakedPercent: number;
  liquidPercent: number;
  protocolCount: number;
  totalAssets: number;
  lastAnalyzed: string;
  dataSource: "Injective Indexer" | "Mock Data";
}

export interface PortfolioHistory {
  "7d": ChartDataPoint[];
  "30d": ChartDataPoint[];
}
