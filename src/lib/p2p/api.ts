// P2P Marketplace — real backend integration.
// Talks to indexx-exchange-backend's /api/v1/p2p routes. Functions return
// { success, data?, error? } rather than throwing, matching the convention
// used across src/lib/alchemy.ts and src/lib/nugget-transfer.ts.

import {
  P2P_SELL_OFFERS_ROUTE,
  P2P_USER_OFFERS_ROUTE,
  P2P_USER_OFFER_ROUTE,
  P2P_USER_OFFER_PAUSE_ROUTE,
  P2P_TRADES_ROUTE,
  P2P_TRADE_ROUTE,
  P2P_TRADE_PAY_ROUTE,
  P2P_TRADE_CONFIRM_ROUTE,
  P2P_TRADE_CANCEL_ROUTE,
  P2P_TRADE_PAYMENT_PROOF_ROUTE,
  P2P_DISPUTES_ROUTE,
} from "@/routes";
import { handleAuthFailure } from "@/lib/auth-session";
import { getUserWalletBalance } from "@/lib/alchemy";

const BTCY_SYMBOL = "BTCY";
const BTCY_NETWORK = "Ying Yang Chain";

// Structured payment details, shape depends on the chosen method.
export interface P2PBankPaymentDetails {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  routingNumber: string;
}
export interface P2PHandlePaymentDetails {
  // PayPal / Wise / Cash App — an email address or handle/cashtag.
  handle: string;
}
export interface P2PWalletPaymentDetails {
  // USDT — a receiving wallet address; network (TRC20/ERC20/BEP20/Polygon/Solana) is encoded in paymentMethod.
  walletAddress: string;
}
export type P2PPaymentDetailsInput =
  | P2PBankPaymentDetails
  | P2PHandlePaymentDetails
  | P2PWalletPaymentDetails;

export interface P2PPaymentInstructions {
  method?: string;
  bankName?: string;
  accountHolder?: string;
  accountNumber?: string;
  routingNumber?: string;
  handle?: string;
  walletAddress?: string;
}

export interface P2PApiOffer {
  offerId: string;
  creatorEmail: string;
  cryptoCurrency: string;
  cryptoNetwork?: string;
  pricePerUnit: number;
  minAmount: number;
  maxAmount: number;
  availableAmount: number;
  paymentMethods: string[];
  acceptedPaymentMethods: string[];
  paymentInstructions?: P2PPaymentInstructions;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface P2PApiTrade {
  tradeId: string;
  offerId: string;
  buyerEmail: string;
  sellerEmail: string;
  cryptoAmount: number;
  cryptoCurrency: string;
  cryptoNetwork?: string;
  fiatAmount: number;
  pricePerUnit: number;
  paymentMethod: string;
  paymentDetails?: Record<string, unknown> | string;
  // S3 key of the buyer's uploaded payment screenshot, if any — not a
  // viewable URL on its own; exchange it via getP2PTradePaymentProofUrl.
  paymentProof?: string;
  status: string;
  createdAt: string;
  paidAt?: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelReason?: string;
  disputeReason?: string;
}

type ApiResult<T> = { success: true; data: T } | { success: false; error: string };

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("bitcoinYayAuth") || "{}").access_token ?? null;
  } catch {
    return null;
  }
}

function authHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  const accessToken = getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
}

async function parseJsonSafe(response: Response) {
  try {
    const result = await response.json();
    handleAuthFailure(response, result);
    return result;
  } catch (error) {
    const fallback =
      (await response.text().catch(() => "")) || "Unable to parse response body";
    console.error("p2p parseJsonSafe fallback:", fallback, error);
    return { error: fallback };
  }
}

async function request<T>(
  url: string,
  init: RequestInit,
  extractData: (result: any) => T
): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      ...init,
      headers: { ...authHeaders(), ...(init.headers || {}) },
    });
    const result = await parseJsonSafe(response);

    if (!response.ok) {
      return {
        success: false,
        error: result?.message || result?.error || "Request failed",
      };
    }

    return { success: true, data: extractData(result) };
  } catch (error) {
    console.error(`p2p request error (${url}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Request failed",
    };
  }
}

// ---------------------------------------------------------------------------
// Wallet — purchased/earned BTCY split
// ---------------------------------------------------------------------------

export interface P2PWalletSummary {
  purchased: number;
  earned: number;
}

export async function getP2PWalletSummary(
  email: string
): Promise<ApiResult<P2PWalletSummary>> {
  const response = await getUserWalletBalance(email, BTCY_SYMBOL, BTCY_NETWORK);
  if (response.error) {
    return { success: false, error: response.error };
  }
  const data = response.data as any;
  return {
    success: true,
    data: {
      purchased: Number(data?.purchasedBalance || 0),
      earned: Number(data?.earnedBalance || 0),
    },
  };
}

// ---------------------------------------------------------------------------
// Offers
// ---------------------------------------------------------------------------

export async function listP2PSellOffers(): Promise<ApiResult<P2PApiOffer[]>> {
  return request(
    `${P2P_SELL_OFFERS_ROUTE}?cryptoCurrency=${BTCY_SYMBOL}`,
    { method: "GET" },
    (result) => (Array.isArray(result?.data) ? result.data : [])
  );
}

export async function listMyP2POffers(email: string): Promise<ApiResult<P2PApiOffer[]>> {
  return request(
    `${P2P_USER_OFFERS_ROUTE}?email=${encodeURIComponent(email)}`,
    { method: "GET" },
    (result) => (Array.isArray(result?.data) ? result.data : [])
  );
}

export interface CreateP2POfferInput {
  email: string;
  amount: number; // BTCY quantity
  price: number; // USD per BTCY
  paymentMethod: string;
  // The exact keys depend on paymentMethod (see P2PPaymentDetailsInput above
  // for the shape per method) — collected dynamically from a method-keyed
  // form, so the caller has a plain Record, not one specific union member.
  paymentDetails: Record<string, string>;
}

export async function createP2PSellOffer(
  input: CreateP2POfferInput
): Promise<ApiResult<P2PApiOffer>> {
  const totalUsd = input.amount * input.price;
  return request(
    P2P_USER_OFFERS_ROUTE,
    {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        type: "SELL",
        settlement: "OFF_PLATFORM_FIAT",
        baseToken: BTCY_SYMBOL,
        cryptoNetwork: BTCY_NETWORK,
        price: input.price,
        minAmount: totalUsd,
        maxAmount: totalUsd,
        availableAmount: totalUsd,
        paymentMethod: input.paymentMethod,
        paymentDetails: input.paymentDetails,
      }),
    },
    (result) => result?.data
  );
}

export async function cancelP2POffer(offerId: string): Promise<ApiResult<null>> {
  return request(
    P2P_USER_OFFER_ROUTE(offerId),
    { method: "DELETE" },
    () => null
  );
}

export async function pauseP2POffer(
  offerId: string,
  action: "pause" | "resume"
): Promise<ApiResult<P2PApiOffer>> {
  return request(
    P2P_USER_OFFER_PAUSE_ROUTE(offerId),
    { method: "POST", body: JSON.stringify({ action }) },
    (result) => result?.data
  );
}

// ---------------------------------------------------------------------------
// Trades
// ---------------------------------------------------------------------------

export async function listMyP2PTrades(email: string): Promise<ApiResult<P2PApiTrade[]>> {
  return request(
    `${P2P_TRADES_ROUTE}?email=${encodeURIComponent(email)}`,
    { method: "GET" },
    (result) => (Array.isArray(result?.data) ? result.data : [])
  );
}

export async function getP2PTrade(tradeId: string): Promise<ApiResult<P2PApiTrade>> {
  return request(P2P_TRADE_ROUTE(tradeId), { method: "GET" }, (result) => result?.data);
}

export interface CreateP2PTradeInput {
  email: string;
  offerId: string;
  fiatAmount: number;
  paymentMethod: string;
}

export async function createP2PTrade(
  input: CreateP2PTradeInput
): Promise<ApiResult<P2PApiTrade>> {
  return request(
    P2P_TRADES_ROUTE,
    {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        offerId: input.offerId,
        fiatAmount: input.fiatAmount,
        paymentMethod: input.paymentMethod,
      }),
    },
    (result) => result?.data
  );
}

export async function markP2PTradeAsPaid(
  tradeId: string,
  paymentProofImage: string
): Promise<ApiResult<null>> {
  return request(
    P2P_TRADE_PAY_ROUTE(tradeId),
    { method: "POST", body: JSON.stringify({ tradeId, paymentProofImage }) },
    () => null
  );
}

// Buyer only, and only while the trade is still waiting on the seller to
// confirm — swaps out a mistakenly-attached receipt for a new one.
export async function replaceP2PPaymentProof(
  tradeId: string,
  paymentProofImage: string
): Promise<ApiResult<null>> {
  return request(
    P2P_TRADE_PAYMENT_PROOF_ROUTE(tradeId),
    { method: "POST", body: JSON.stringify({ tradeId, paymentProofImage }) },
    () => null
  );
}

export async function confirmP2PTradePayment(tradeId: string): Promise<ApiResult<null>> {
  return request(
    P2P_TRADE_CONFIRM_ROUTE(tradeId),
    { method: "POST", body: JSON.stringify({ tradeId }) },
    () => null
  );
}

// A short-lived (1h) presigned URL to view the buyer's uploaded payment
// screenshot — only the trade's own buyer or seller can fetch this.
// Pass download: true to get a URL S3 itself marks as an attachment
// (Content-Disposition), which triggers a real save-to-disk on
// navigation — works even though the bucket has no CORS policy for this
// origin, since that only blocks JS reads (fetch/XHR), not navigation.
export async function getP2PTradePaymentProofUrl(
  tradeId: string,
  options?: { download?: boolean }
): Promise<ApiResult<{ url: string }>> {
  const route = options?.download
    ? `${P2P_TRADE_PAYMENT_PROOF_ROUTE(tradeId)}?download=1`
    : P2P_TRADE_PAYMENT_PROOF_ROUTE(tradeId);
  return request(route, { method: "GET" }, (result) => result?.data);
}

export async function cancelP2PTrade(
  tradeId: string,
  reason?: string
): Promise<ApiResult<null>> {
  return request(
    P2P_TRADE_CANCEL_ROUTE(tradeId),
    { method: "POST", body: JSON.stringify({ tradeId, reason }) },
    () => null
  );
}

export async function createP2PDispute(input: {
  email: string;
  tradeId: string;
  reason: string;
  description: string;
}): Promise<ApiResult<null>> {
  return request(
    P2P_DISPUTES_ROUTE,
    { method: "POST", body: JSON.stringify(input) },
    () => null
  );
}
