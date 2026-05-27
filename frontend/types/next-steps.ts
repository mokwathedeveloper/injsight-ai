export type ActionCategory = "yield" | "risk" | "portfolio" | "security";

export interface SuggestedAction {
  id: string;
  category: ActionCategory;
  title: string;
  description: string;
  actionLabel: string;
  actionUrl: string;
  isExternal: boolean;
}

export interface SuggestedNextStepsData {
  actions: SuggestedAction[];
}
