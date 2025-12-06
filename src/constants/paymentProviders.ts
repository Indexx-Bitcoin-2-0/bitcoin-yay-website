import type { StaticImageData } from "next/image";
import { PaymentProvider } from "@/lib/subscriptions";
import PayPalIcon from "@/assets/images/quantum-mining/paypal.webp";
import StripeIcon from "@/assets/images/stripe-logo.svg";

export type PaymentProviderConfig = {
  key: PaymentProvider;
  label: string;
  description: string;
  icon: StaticImageData;
};

export const PAYMENT_PROVIDERS: PaymentProviderConfig[] = [
  {
    key: "stripe",
    label: "Stripe",
    description: "Cards, wallets, Apple Pay, Google Pay",
    icon: StripeIcon,
  },
  {
    key: "paypal",
    label: "PayPal",
    description: "PayPal account, credit, or debit cards",
    icon: PayPalIcon,
  },
];

export const PROVIDER_LABELS: Record<PaymentProvider, string> = {
  stripe: "Stripe",
  paypal: "PayPal",
};
