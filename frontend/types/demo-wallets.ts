import { WalletAnalysisResult } from "./wallet-analyzer";

export interface DemoWallet {
  id: string;
  name: string;
  address: string;
  description: string;
  data: WalletAnalysisResult;
}
