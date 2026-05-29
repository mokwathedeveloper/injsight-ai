/**
 * UI store — transient visual state that doesn't belong in server state
 * or in individual component state (e.g. global modals, sidebar toggle,
 * toast queue).
 */
import { create } from "zustand";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  message?: string;
}

interface UIState {
  isSidebarOpen: boolean;
  toasts: Toast[];

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  addToast: (toast: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
}

let _toastSeq = 0;

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  toasts: [],

  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

  addToast: (toast) =>
    set((s) => ({
      toasts: [
        ...s.toasts.slice(-4), // cap at 5 visible at once
        { ...toast, id: String(++_toastSeq) },
      ],
    })),
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  clearToasts: () => set({ toasts: [] }),
}));
