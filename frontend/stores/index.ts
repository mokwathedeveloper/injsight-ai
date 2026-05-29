/**
 * Barrel export for all Zustand stores.
 * Import from here for IDE discoverability.
 */
export { useAuthStore } from "@/store/auth";
export { useWalletStore } from "@/store/wallet";
export { useUserStore } from "@/store/user";
export { useUIStore } from "@/store/ui";
export type { Toast, ToastVariant } from "@/store/ui";
