"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PaymentFailedPopup from "@/components/PaymentFailedPopup";
import { PaymentModalDetail } from "@/components/paymentModalTypes";
import {
  SUBSCRIPTION_RESPONSE_FIELDS,
  derivePlanName,
  derivePlanRoute,
} from "@/constants/subscriptionResponseMeta";

const SubscriptionCancelledContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsSnapshot = searchParams.toString();

  const details = useMemo<PaymentModalDetail[]>(
    () =>
      SUBSCRIPTION_RESPONSE_FIELDS.flatMap((field) => {
        const value = searchParams.get(field.param);
        return value ? [{ label: field.label, value }] : [];
      }),
    [paramsSnapshot]
  );

  const planName = useMemo(
    () =>
      derivePlanName(
        searchParams.get("planName") ??
          searchParams.get("plan") ??
          searchParams.get("plan_key")
      ),
    [paramsSnapshot]
  );

  const tryAgainRoute = useMemo(
    () =>
      derivePlanRoute(
        searchParams.get("planName") ??
          searchParams.get("plan") ??
          searchParams.get("plan_key")
      ),
    [paramsSnapshot]
  );

  const handleClose = () => router.replace("/subscription");
  const handleTryAgain = () => router.replace(tryAgainRoute);

  return (
    <>
      <PaymentFailedPopup
        isOpen
        onClose={handleClose}
        onTryAgain={handleTryAgain}
        planName={planName}
        details={details}
      />
      <div className="sr-only" aria-live="polite">
        Subscription failed. Please try again to continue.
      </div>
    </>
  );
};

const SubscriptionCancelledPage = () => (
  <Suspense fallback={<div className="sr-only" aria-live="polite">Processing...</div>}>
    <SubscriptionCancelledContent />
  </Suspense>
);

export default SubscriptionCancelledPage;
