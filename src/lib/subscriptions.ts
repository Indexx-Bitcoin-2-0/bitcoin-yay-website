export type PaymentProvider = "stripe" | "paypal";

export interface SubscriptionPurchasePayload {
  email: string;
  provider: PaymentProvider;
  planKey: string;
  couponCode?: string;
  metadata?: Record<string, unknown>;
}

export interface SubscriptionPurchaseResponse {
  sessionId?: string;
  sessionUrl?: string;
  approvalUrl?: string;
  checkoutUrl?: string;
  redirectUrl?: string;
  [key: string]: unknown;
}

export interface SubscriptionEvent {
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface SubscriptionHistoryEntry {
  _id: string;
  email: string;
  planKey: string;
  planName: string;
  provider: PaymentProvider | string;
  amount: number;
  currency: string;
  miningSpeed?: number;
  status: string;
  couponCode?: string;
  couponDiscountPercent?: number;
  miningInterval?: string;
  metadata?: Record<string, unknown>;
  events?: SubscriptionEvent[];
  createdAt: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface SubscriptionHistoryResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  data: SubscriptionHistoryEntry[];
}

export interface SubscriptionHistoryFilters {
  email: string;
  provider?: PaymentProvider;
  page?: number;
  limit?: number;
}

const SUBSCRIPTIONS_HOST =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.v1.indexx.ai";

const SUBSCRIPTIONS_BASE_URL = `${SUBSCRIPTIONS_HOST}/api/v1/bitcoinyay/subscriptions`;
export const SUBSCRIPTIONS_PURCHASE_URL = `${SUBSCRIPTIONS_BASE_URL}/purchase`;
const COUPON_VALIDATION_URL = `${SUBSCRIPTIONS_BASE_URL}/coupons/validate`;
const SUBSCRIPTION_HISTORY_URL = SUBSCRIPTIONS_BASE_URL;

export interface CouponValidationResponse {
  provider: string;
  planKey: string;
  planName: string;
  currency: string;
  basePrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
  couponCode: string;
  couponDescription?: string;
  stripeCouponId?: string;
}

export async function purchaseSubscription(
  payload: SubscriptionPurchasePayload
): Promise<SubscriptionPurchaseResponse> {
  const response = await fetch(SUBSCRIPTIONS_PURCHASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok) {
    const errorMessage =
      result?.error ||
      result?.message ||
      "Unable to initiate subscription checkout.";
    throw new Error(errorMessage);
  }
  console.log("purchaseSubscription result:", result);
  return result.data;
}

export async function validateCoupon(
  planKey: string,
  couponCode: string
): Promise<CouponValidationResponse> {
  const response = await fetch(COUPON_VALIDATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ planKey, couponCode }),
  });

  const result = await response.json().catch(() => null);
  const success = result?.success === true;
  const payload = result?.data;

  if (!response.ok || !success || !payload) {
    const errorMessage =
      result?.error || result?.message || "Unable to validate the coupon code.";
    throw new Error(errorMessage);
  }

  return payload as CouponValidationResponse;
}

export async function fetchSubscriptionHistory(
  filters: SubscriptionHistoryFilters
): Promise<SubscriptionHistoryResponse> {
  const queryParams = new URLSearchParams({ email: filters.email });
  if (filters.provider) {
    queryParams.set("provider", filters.provider);
  }
  if (filters.page) {
    queryParams.set("page", filters.page.toString());
  }
  if (filters.limit) {
    queryParams.set("limit", filters.limit.toString());
  }

  const response = await fetch(
    `${SUBSCRIPTION_HISTORY_URL}?${queryParams.toString()}`,
    {
      method: "GET",
    }
  );

  const result = await response.json().catch(() => null);
  if (!response.ok || !result) {
    const errorMessage =
      result?.error || result?.message || "Unable to load subscription history.";
    throw new Error(errorMessage);
  }

  return result as SubscriptionHistoryResponse;
}
