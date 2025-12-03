import { PaymentProvider } from "@/lib/subscriptions";

export const PAYMENT_PROVIDERS: Array<{
  key: PaymentProvider;
  label: string;
  description: string;
}> = [
  {
    key: "stripe",
    label: "Stripe",
    description: "Cards, wallets, Apple Pay, Google Pay",
  },
  {
    key: "paypal",
    label: "PayPal",
    description: "PayPal account, credit, or debit cards",
  },
];

export const PROVIDER_LABELS: Record<PaymentProvider, string> = {
  stripe: "Stripe",
  paypal: "PayPal",
};
