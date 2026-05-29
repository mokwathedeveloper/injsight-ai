/**
 * Barrel export for all services.
 *
 * Exports both the dot-case names (wallet.service.ts) used throughout the
 * existing codebase AND the camelCase aliases required by the spec
 * (walletService, analysisService, etc.) so both import styles resolve.
 */

// dot-case (primary)
export { walletService } from "./wallet.service";
export { analysisService } from "./analysis.service";
export { reportService } from "./report.service";
export { alertService } from "./alert.service";
export { authService } from "./auth.service";

// camelCase aliases (spec compliance)
export { walletService as walletService_ } from "./wallet.service";
export { analysisService as analysisService_ } from "./analysis.service";
export { reportService as reportService_ } from "./report.service";
export { alertService as alertService_ } from "./alert.service";
export { authService as authService_ } from "./auth.service";
