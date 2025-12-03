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

const SUBSCRIPTIONS_HOST =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.v1.indexx.ai";

const SUBSCRIPTIONS_BASE_URL = `${SUBSCRIPTIONS_HOST}/api/v1/bitcoinyay/subscriptions`;
export const SUBSCRIPTIONS_PURCHASE_URL = `${SUBSCRIPTIONS_BASE_URL}/purchase`;

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

  return result;
}
