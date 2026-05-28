import { UserBillingData } from "../types/billing";

export const MOCK_BILLING_DATA: UserBillingData = {
  summary: {
    currentPlan: "pro",
    planName: "Power User",
    amount: 24.00,
    currency: "USD",
    cycle: "yearly",
    nextBillingDate: "2027-05-27T00:00:00Z",
    status: "active",
  },
  paymentMethod: {
    type: "card",
    brand: "Mastercard",
    last4: "8842",
    expiry: "12/28",
  },
  invoices: [
    {
      id: "inv-101",
      number: "INV-2026-001",
      amount: 288.00,
      date: "2026-05-27T10:00:00Z",
      status: "paid",
      url: "#",
    },
    {
      id: "inv-100",
      number: "INV-2025-012",
      amount: 29.00,
      date: "2026-04-27T10:00:00Z",
      status: "paid",
      url: "#",
    },
    {
      id: "inv-099",
      number: "INV-2025-011",
      amount: 29.00,
      date: "2026-03-27T10:00:00Z",
      status: "paid",
      url: "#",
    },
  ],
};
