import { io, Socket } from "socket.io-client";
import axios from "axios";
import {
  QUANTUM_BUY_ORDER_API_ROUTE,
  QUANTUM_CRYPTO_CHECK_PAYMENT_API_ROUTE,
  QUANTUM_CRYPTO_CHECK_PAYMENT_BY_TX_API_ROUTE,
  QUANTUM_CANCEL_ORDER_API_ROUTE,
  QUANTUM_USER_ORDER_API_ROUTE,
  COINGECKO_PRICE_API_ROUTE,
} from "@/routes";

// Types
export type PaymentOption =
  | "USDT"
  | "USDC"
  | "PayPal"
  | "USD"
  | "Wire Transfer"
  | "Stripe";

export type QuantumCurrencyIn =
  | "USDT"
  | "USDC"
  | "USD"
  | "PayPal"
  | "WireTransfer"
  | "Stripe";

export type CryptoOrderData = {
  orderId: string;
  paymentMethod: "usdt" | "usdc";
  amount: number; // crypto amount to transfer
  receiverAddress: string;
  expiresAt: string; // ISO date
  message?: string;
  blockchain: "Ethereum" | "Solana";
};

export type PaypalOrderData = {
  _id: string;
  paypalId: string;
  orderId: string;
  status: "CREATED" | string;
  links: { href: string; rel: string; method: string; _id: string }[];
  orderAmount: string;
  orderCurrency: string;
  created: string;
  modified: string;
};

export type StripeOrderData = {
  sessionId: string;
  url: string;
};

export type CreateOrderResponse = {
  status: number;
  data: CryptoOrderData | PaypalOrderData | StripeOrderData | Record<string, unknown>;
};

export type CreateOrderData = {
  email: string;
  currencyIn: QuantumCurrencyIn;
  currencyOut: "BTCY";
  amount: number;
  outAmount: number;
  blockchain?: "Ethereum" | "Solana";
  env?: "test";
  paymentMethod?: "crypto" | "paypal" | "card" | "WireTransfer" | "Stripe";
};

export type GetUserOrderData = {
  email: string;
  orderId: string;
};

export type GetUserOrderResponse = {
  status: number;
  data?: unknown;
  error?: string;
};

export type PriceData = {
  btcPrice: number;
  btcyPrice: number;
};

export type QuantumOrderSocketPayload = {
  orderId: string;
  status?: string;
  amount?: number;
  currency?: string;
  paymentType?: string;
  orderType?: string;
  [key: string]: unknown;
};

export type QuantumOrdersUpdatePayload =
  | QuantumOrderSocketPayload
  | QuantumOrderSocketPayload[]
  | Record<string, unknown>
  | Array<Record<string, unknown>>;

export type CheckQuantumCryptoPaymentData = {
  orderId: string;
  paymentType: "USDT" | "USDC";
  amount: number;
  addressPaidTo: string;
};

export type CheckQuantumCryptoPaymentByTxData = {
  orderId: string;
  txHash: string;
};

export type CancelQuantumOrderData = {
  orderId: string;
};

export type QuantumCryptoPaymentCheckResult = {
  orderId: string;
  paymentReceived: boolean;
  status?: string;
  attempts?: number;
  message?: string;
  txHash?: string;
  existingOrderId?: string;
  [key: string]: unknown;
};

export type QuantumCancelOrderResult = {
  orderId: string;
  status?: string;
  message?: string;
  [key: string]: unknown;
};

export type QuantumCryptoPaymentCheckResponse = {
  status: number;
  data: QuantumCryptoPaymentCheckResult;
};

export type QuantumCancelOrderResponse = {
  status: number;
  data: QuantumCancelOrderResult;
};

// Socket event types
export type SocketEventHandlers = {
  onConnect?: (socketId: string) => void;
  onDisconnect?: () => void;
  onOrderCreated?: (data: unknown) => void;
  onPaymentWatching?: (data: unknown) => void;
  onPaymentPending?: (data: unknown) => void;
  onOrderConfirmed?: (data: QuantumOrderSocketPayload) => void;
  onOrderExpired?: (data: QuantumOrderSocketPayload) => void;
  onOrdersUpdate?: (data: QuantumOrdersUpdatePayload) => void;
};


/**
 * Creates a quantum mining order
 */
export async function createQuantumOrder(
  data: CreateOrderData
): Promise<CreateOrderResponse> {
  try {
    const env =
      data.env ??
      (typeof window !== "undefined" &&
        window.location.hostname === "test.bitcoinyay.com"
        ? "test"
        : "main");
    const payload = env ? { ...data, env } : data;

    const response = await axios.post<CreateOrderResponse>(
      QUANTUM_BUY_ORDER_API_ROUTE,
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Create quantum order error:", error);
    throw error;
  }
}

/**
 * Triggers a blockchain payment check for a pending crypto quantum order
 */
export async function checkQuantumCryptoPayment(
  data: CheckQuantumCryptoPaymentData
): Promise<QuantumCryptoPaymentCheckResponse> {
  try {
    const response = await axios.post<QuantumCryptoPaymentCheckResponse>(
      QUANTUM_CRYPTO_CHECK_PAYMENT_API_ROUTE,
      data,
      {
        validateStatus: () => true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Check quantum crypto payment error:", error);
    throw error;
  }
}

/**
 * Checks a crypto quantum order against a provided transaction hash
 */
export async function checkQuantumCryptoPaymentByTx(
  data: CheckQuantumCryptoPaymentByTxData
): Promise<QuantumCryptoPaymentCheckResponse> {
  try {
    const response = await axios.post<QuantumCryptoPaymentCheckResponse>(
      QUANTUM_CRYPTO_CHECK_PAYMENT_BY_TX_API_ROUTE,
      data,
      {
        validateStatus: () => true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Check quantum crypto payment by tx error:", error);
    throw error;
  }
}

/**
 * Cancels a pending crypto quantum order
 */
export async function cancelQuantumOrder(
  data: CancelQuantumOrderData
): Promise<QuantumCancelOrderResponse> {
  try {
    const response = await axios.post<QuantumCancelOrderResponse>(
      QUANTUM_CANCEL_ORDER_API_ROUTE,
      data,
      {
        validateStatus: () => true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Cancel quantum order error:", error);
    throw error;
  }
}

/**
 * Gets user order details
 */
export async function getUserOrder(
  data: GetUserOrderData
): Promise<GetUserOrderResponse> {
  try {
    const response = await axios.get(
      `${QUANTUM_USER_ORDER_API_ROUTE}/${encodeURIComponent(data.email)}/${encodeURIComponent(data.orderId)}`
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: unknown) {
    console.error("Get user order error:", error);
    return {
      status: (error as { response?: { status?: number } }).response?.status || 500,
      error: error instanceof Error ? error.message : "Failed to fetch user order",
    };
  }
}

/**
 * Fetches BTC and BTCY prices
 */
export async function fetchPrices(): Promise<PriceData> {
  try {
    const response = await axios.get(COINGECKO_PRICE_API_ROUTE, {
      params: {
        ids: "bitcoin",
        vs_currencies: "usd",
      },
    });

    const btcPrice = response.data.bitcoin.usd;
    const btcyPrice = btcPrice / 1_000_000;

    return {
      btcPrice,
      btcyPrice,
    };
  } catch (error) {
    console.error("Failed to fetch BTC price:", error);
    throw error;
  }
}

/**
 * Creates and manages socket connection for quantum mining
 */
export function createQuantumSocket(
  email: string,
  handlers: SocketEventHandlers = {}
): Socket {
  const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
    path: "/socket.io/",
    transports: ["websocket"],
    auth: { email },
  });

  // Set up event handlers
  socket.on("connect", () => {
    console.log("ws connected", socket.id);
    handlers.onConnect?.(socket.id || "");
  });

  socket.on("disconnect", () => {
    console.log("ws disconnected");
    handlers.onDisconnect?.();
  });

  socket.on("order:created", (data: unknown) => {
    console.log("order:created", data);
    handlers.onOrderCreated?.(data);
  });

  socket.on("payment:watching", (data: unknown) => {
    console.log("payment:watching", data);
    handlers.onPaymentWatching?.(data);
  });

  socket.on("payment:pending", (data: unknown) => {
    console.log("payment:pending", data);
    handlers.onPaymentPending?.(data);
  });

  socket.on("order:confirmed", (data: QuantumOrderSocketPayload) => {
    console.log("order:confirmed", data);
    handlers.onOrderConfirmed?.(data);
  });

  socket.on("order:expired", (data: QuantumOrderSocketPayload) => {
    console.log("order:expired", data);
    handlers.onOrderExpired?.(data);
  });

  socket.on("orders:update", (data: QuantumOrdersUpdatePayload) => {
    console.log("orders:update", data);
    handlers.onOrdersUpdate?.(data);
  });

  return socket;
}

/**
 * Handles PayPal return URL processing
 */
export function processPayPalReturn(
  url: URL,
  userEmail?: string
): {
  status: "success" | "cancel" | "none";
  token?: string;
  email?: string;
  orderId?: string;
} {
  const status = url.searchParams.get("status");
  const token = url.searchParams.get("token");
  const orderIdFromQuery =
    url.searchParams.get("orderId") ||
    url.searchParams.get("order_id") ||
    url.searchParams.get("orderID");

  if (!status) {
    return { status: "none" };
  }

  // Clean URL immediately
  if (typeof window !== "undefined") {
    window.history.replaceState({}, "", url.origin + url.pathname);
  }

  const stash = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("qm_paypal_order") || "{}");
    } catch {
      return {};
    }
  })();

  const resolvedOrderId = orderIdFromQuery || token || stash?.orderId || "";

  if (status === "cancel") {
    return {
      status: "cancel",
      orderId: resolvedOrderId || undefined,
      token: token || undefined,
      email: userEmail || stash?.email || undefined,
    };
  }

  if (status === "success") {
    const emailForLookup = userEmail || stash?.email || "";
    const orderIdForLookup = resolvedOrderId;

    return {
      status: "success",
      token: token || undefined,
      email: emailForLookup,
      orderId: orderIdForLookup,
    };
  }

  return { status: "none" };
}

/**
 * Stores PayPal order data in session storage
 */
export function storePayPalOrderData(data: {
  email: string;
  orderId: string;
}): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("qm_paypal_order", JSON.stringify(data));
  }
}

/**
 * Removes PayPal order data from session storage
 */
export function clearPayPalOrderData(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("qm_paypal_order");
  }
}

/**
 * Determines if a payment option is crypto
 */
export function isCryptoPayment(option: PaymentOption): boolean {
  return option === "USDT" || option === "USDC";
}

/**
 * Converts payment option to currency format expected by API
 */
export function optionToCurrencyIn(opt: PaymentOption): QuantumCurrencyIn {
  if (opt === "Wire Transfer") {
    return "WireTransfer";
  }
  return opt;
}

/**
 * Minimum USD amount allowed for a purchase
 */
export const MIN_PURCHASE_AMOUNT_USD = 10;

/**
 * Calculates BTCY amount from USD amount
 */
export function calculateBTCYAmount(
  usdAmount: number,
  btcyPrice: number
): number {
  return usdAmount / btcyPrice;
}

/**
 * Validates order submission data
 */
export function validateOrderData(
  payAmount: string,
  selectedPaymentOption: PaymentOption,
  selectedNetwork?: "Ethereum" | "Solana"
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const numericAmount = Number(payAmount);

  if (!payAmount || Number.isNaN(numericAmount)) {
    errors.payAmount = "Please enter a valid amount";
  } else if (numericAmount < MIN_PURCHASE_AMOUNT_USD) {
    errors.payAmount = `Minimum purchase is $${MIN_PURCHASE_AMOUNT_USD}`;
  }

  if (isCryptoPayment(selectedPaymentOption) && !selectedNetwork) {
    errors.selectedNetwork = "Please select a network";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
