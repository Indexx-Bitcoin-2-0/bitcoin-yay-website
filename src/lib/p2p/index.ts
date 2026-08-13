// P2P Marketplace — frontend-only mock layer.
// Everything here is client-side mock data + pure helpers. No backend/API.
// Swap these out for real API calls when the backend lands.

export type BalanceSource = "purchased" | "earned";

export interface Wallet {
  /** BTCY bought directly from the company — eligible for Company Buyback. */
  purchased: number;
  /** BTCY earned via Mining → Nuggets → Alchemy — P2P only. */
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
}

export const orderTotal = (o: Pick<P2POrder, "amount" | "price">) =>
  o.amount * o.price;

export const CURRENT_USER = { id: "me", name: "You" } as const;

export const PAYMENT_METHODS = [
  "Bank Transfer",
  "PayPal",
  "USDT (TRC20)",
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

// ---------------------------------------------------------------------------
// Mock seed data
// ---------------------------------------------------------------------------

/** The current user's wallet — split by source. */
export const INITIAL_WALLET: Wallet = { purchased: 1000, earned: 2000 };

/** Open sell orders from OTHER users (the public marketplace). */
export const INITIAL_MARKET_ORDERS: P2POrder[] = [
  {
    id: "ord_1001",
    sellerId: "u_alex",
    sellerName: "Alex M.",
    amount: 500,
    price: 0.063,
    paymentMethods: ["Bank Transfer", "PayPal"],
    paymentDetails: "PayPal: alex@example.com",
    status: "open",
    createdAt: "2026-08-04T09:00:00Z",
    expiresInHours: 24,
  },
  {
    id: "ord_1002",
    sellerId: "u_bella",
    sellerName: "Bella K.",
    amount: 1000,
    price: 0.064,
    paymentMethods: ["USDT (TRC20)"],
    paymentDetails: "USDT TRC20: TXxxxx…9f2",
    status: "open",
    createdAt: "2026-08-04T08:30:00Z",
    expiresInHours: 12,
  },
  {
    id: "ord_1003",
    sellerId: "u_chris",
    sellerName: "Chris P.",
    amount: 2500,
    price: 0.062,
    paymentMethods: ["Bank Transfer", "Wise"],
    paymentDetails: "Wise: chris.p",
    status: "open",
    createdAt: "2026-08-04T07:45:00Z",
    expiresInHours: 48,
  },
  {
    id: "ord_1004",
    sellerId: "u_dora",
    sellerName: "Dora N.",
    amount: 150,
    price: 0.065,
    paymentMethods: ["Cash App", "PayPal"],
    paymentDetails: "Cash App: $doraN",
    status: "open",
    createdAt: "2026-08-04T06:10:00Z",
    expiresInHours: 6,
  },
];

/** The current user's own orders (as seller and as buyer) to seed My Orders. */
export const INITIAL_MY_ORDERS: P2POrder[] = [
  {
    id: "ord_9001",
    sellerId: CURRENT_USER.id,
    sellerName: CURRENT_USER.name,
    amount: 300,
    price: 0.063,
    paymentMethods: ["Bank Transfer"],
    status: "open",
    createdAt: "2026-08-03T15:00:00Z",
    expiresInHours: 24,
    source: { purchased: 0, earned: 300 },
  },
  {
    id: "ord_9002",
    sellerId: "u_evan",
    sellerName: "Evan R.",
    buyerId: CURRENT_USER.id,
    buyerName: CURRENT_USER.name,
    amount: 400,
    price: 0.064,
    paymentMethods: ["PayPal"],
    paymentDetails: "PayPal: evan.r@example.com",
    status: "payment_submitted",
    createdAt: "2026-08-03T11:20:00Z",
  },
  {
    id: "ord_9003",
    sellerId: CURRENT_USER.id,
    sellerName: CURRENT_USER.name,
    buyerId: "u_fara",
    buyerName: "Fara Q.",
    amount: 800,
    price: 0.062,
    paymentMethods: ["USDT (TRC20)"],
    status: "completed",
    createdAt: "2026-08-01T10:00:00Z",
    source: { purchased: 500, earned: 300 },
  },
];

// ---------------------------------------------------------------------------
// Status machine (pure) — advances the mock lifecycle
// ---------------------------------------------------------------------------

export type TradeAction =
  | "accept" // buyer accepts an open order
  | "pay" // buyer marks payment sent
  | "confirm" // seller confirms payment received
  | "release" // seller releases the locked BTCY
  | "dispute"
  | "resolve_release" // admin resolves in buyer's favour
  | "resolve_refund" // admin resolves in seller's favour
  | "cancel";

export const nextStatus = (
  status: OrderStatus,
  action: TradeAction,
): OrderStatus => {
  switch (action) {
    case "accept":
      return "payment_pending"; // matched → immediately awaiting payment
    case "pay":
      return "payment_submitted";
    case "confirm":
      return "payment_confirmed";
    case "release":
      return "completed";
    case "dispute":
      return "admin_review";
    case "resolve_release":
      return "completed";
    case "resolve_refund":
      return "cancelled";
    case "cancel":
      return "cancelled";
    default:
      return status;
  }
};

export const isActive = (s: OrderStatus) =>
  s !== "completed" && s !== "cancelled";

export const roleOf = (o: P2POrder): "seller" | "buyer" | null => {
  if (o.sellerId === CURRENT_USER.id) return "seller";
  if (o.buyerId === CURRENT_USER.id) return "buyer";
  return null;
};
