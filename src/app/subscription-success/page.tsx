"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PaymentSuccessPopup from "@/components/PaymentSuccessPopup";
import { PaymentModalDetail } from "@/components/paymentModalTypes";
import {
  SUBSCRIPTION_RESPONSE_FIELDS,
  derivePlanName,
} from "@/constants/subscriptionResponseMeta";

const SubscriptionSuccessPage = () => {
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

  const handleClose = () => {
    router.replace("/subscription");
  };

  return (
    <>
      <PaymentSuccessPopup
        isOpen
        onClose={handleClose}
        planName={planName}
        details={details}
      />
      <div className="sr-only" aria-live="polite">
        Subscription success. You can close this dialog when ready.
      </div>
    </>
  );
};

export default SubscriptionSuccessPage;
