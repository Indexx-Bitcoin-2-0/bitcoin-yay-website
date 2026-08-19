// P2P Marketplace — display/formatting logic + backend<->UI status mapping.
// Network calls live in ./api. This module is pure (no fetch) so it can be
// unit-tested and reused across components without side effects.

export type BalanceSource = "purchased" | "earned";

export interface Wallet {
  /** BTCY bought directly from the company — eligible for Company Buyback. */
  purchased: number;
  /** BTCY earned via Mining → Nuggets → Alchemy, or received on P2P — P2P only. */
  earned: number;
}

export const walletTotal = (w: Wallet) => w.purchased + w.earned;
/** Only purchased BTCY may be sold back to the company. */
export const buybackAvailable = (w: Wallet) => w.purchased;
/** Both buckets can be traded on P2P. */
export const p2pAvailable = (w: Wallet) => walletTotal(w);

export type OrderStatus =
  | "open"
  | "buyer_matched"
  | "payment_pending"
  | "payment_submitted"
  | "payment_confirmed"
  | "btcy_released"
  | "completed"
  | "cancelled"
  | "disputed"
  | "admin_review";

/** The happy-path lifecycle, in order (used to render the status timeline). */
export const STATUS_FLOW: OrderStatus[] = [
  "open",
  "buyer_matched",
  "payment_pending",
  "payment_submitted",
  "payment_confirmed",
  "btcy_released",
  "completed",
];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  open: "Open",
  buyer_matched: "Buyer Matched",
  payment_pending: "Payment Pending",
  payment_submitted: "Payment Submitted",
  payment_confirmed: "Payment Confirmed",
  btcy_released: "BTCY Released",
  completed: "Completed",
  cancelled: "Cancelled",
  disputed: "Disputed",
  admin_review: "Admin Review",
};

/** Tailwind text colours per status (no background — text only). */
export const STATUS_CHIP: Record<OrderStatus, string> = {
  open: "text-primary",
  buyer_matched: "text-blue-400",
  payment_pending: "text-amber-400",
  payment_submitted: "text-amber-400",
  payment_confirmed: "text-emerald-400",
  btcy_released: "text-emerald-400",
  completed: "text-emerald-400",
  cancelled: "text-tertiary",
  disputed: "text-red-400",
  admin_review: "text-red-400",
};

export interface P2POrder {
  id: string;
  sellerId: string;
  sellerName: string;
  buyerId?: string;
  buyerName?: string;
  amount: number; // BTCY being sold
  price: number; // USD per BTCY
  paymentMethods: string[];
  paymentDetails?: string; // shown to the buyer once matched
  status: OrderStatus;
  createdAt: string; // ISO
  expiresInHours?: number;
  /** How the seller's locked BTCY splits across buckets (display only). */
  source?: { purchased: number; earned: number };
  /** Present once a buyer has taken the offer — drives which API call "cancel" makes. */
  tradeId?: string;
  /** Whether the buyer has attached a payment screenshot — fetch it via getP2PTradePaymentProofUrl. */
  hasPaymentProof?: boolean;
}

export const orderTotal = (o: Pick<P2POrder, "amount" | "price">) =>
  o.amount * o.price;

export const PAYMENT_METHODS = [
  "Bank Transfer",
  "PayPal",
  "USDT",
  "Wise",
  "Cash App",
] as const;

export const formatBtcy = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 5 });

export const formatUsd = (n: number) =>
  `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const formatPrice = (n: number) =>
  `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 6,
  })}`;

/** "alex.morgan@example.com" -> "alex.morgan" for a lightweight display name. */
export const nameFromEmail = (email: string) => email.split("@")[0] || email;

/** Renders structured payment instructions into a single display string for the buyer. */
export function formatPaymentDetails(
  instructions: import("./api").P2PPaymentInstructions | undefined,
): string {
  if (!instructions) return "";
  const { method, bankName, accountHolder, accountNumber, routingNumber, handle, walletAddress } =
    instructions;

  if (bankName || accountHolder || accountNumber || routingNumber) {
    return [
      bankName && `Bank: ${bankName}`,
      accountHolder && `Account Holder: ${accountHolder}`,
      accountNumber && `Account #: ${accountNumber}`,
      routingNumber && `Routing #: ${routingNumber}`,
    ]
      .filter(Boolean)
      .join(" · ");
  }
  if (walletAddress) {
    return `${method ? `${method}: ` : ""}${walletAddress}`;
  }
  if (handle) {
    return `${method ? `${method}: ` : ""}${handle}`;
  }
  return "";
}

// ---------------------------------------------------------------------------
// Backend <-> UI status mapping
// ---------------------------------------------------------------------------

/**
 * Backend P2PTradeStatus is coarser than the UI's OrderStatus: it has no
 * distinct "matched, awaiting payment prompt" or "BTCY released" states —
 * those are collapsed into payment_pending and completed respectively.
 */
export function mapBackendTradeStatus(status: string): OrderStatus {
  switch (status) {
    case "Pending":
      return "payment_pending";
    case "Paid":
      return "payment_submitted";
    case "Confirmed":
      return "payment_confirmed";
    case "Completed":
      return "completed";
    case "Disputed":
      return "admin_review";
    case "Cancelled":
    case "Expired":
      return "cancelled";
    default:
      return "payment_pending";
  }
}

export function mapBackendOfferStatus(status: string): OrderStatus {
  switch (status) {
    case "Active":
    case "Paused":
      return "open";
    case "Cancelled":
    case "Expired":
      return "cancelled";
    default:
      // Completed offers always have a corresponding trade, which is used
      // as the source of truth instead — this branch shouldn't normally render.
      return "completed";
  }
}

export type TradeAction =
  | "accept" // buyer accepts an open order
  | "pay" // buyer marks payment sent
  | "confirm" // seller confirms payment received (also releases BTCY)
  | "release" // folded into "confirm" on the real backend
  | "dispute"
  | "resolve_release" // admin resolves in buyer's favour (not wired yet)
  | "resolve_refund" // admin resolves in seller's favour (not wired yet)
  | "cancel"
  | "replace_proof"; // buyer swaps out a mistakenly-attached receipt

export const isActive = (s: OrderStatus) =>
  s !== "completed" && s !== "cancelled";

export const roleOf = (
  o: P2POrder,
  currentUserEmail: string,
): "seller" | "buyer" | null => {
  const email = currentUserEmail.toLowerCase();
  if (o.sellerId.toLowerCase() === email) return "seller";
  if (o.buyerId?.toLowerCase() === email) return "buyer";
  return null;
};

export * from "./api";
