export interface CompositionData {
  name: string;
  value: number;
  color: string;
}

export interface PortfolioComposition {
  categories: CompositionData[];
  riskDistribution: CompositionData[];
}
