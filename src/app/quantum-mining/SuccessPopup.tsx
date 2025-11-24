import Image from "next/image";

import PopupComponent from "@/components/PopupComponent";
import CustomButton2 from "@/components/CustomButton2";

import EyeButtonImage from "@/assets/images/buttons/eye-button.webp";
import CheckMarkButtonImage from "@/assets/images/buttons/check-mark-button.webp";
import TickIcon from "@/assets/images/icons/tick-icon.webp";

type OrderSummary = {
  orderId?: string;
  status?: string;
  amount?: number;
  currency?: string;
  paymentType?: string;
  orderType?: string;
};

const formatAmount = (amount?: number) => {
  if (typeof amount !== "number" || Number.isNaN(amount)) return undefined;
  const absAmount = Math.abs(amount);
  const maximumFractionDigits = absAmount >= 1 ? 2 : 6;
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });
};

export default function SuccessPopup({
  isOpen,
  onClose,
  orderSummary,
}: {
  isOpen: boolean;
  onClose: () => void;
  orderSummary?: OrderSummary;
}) {
  const details = (() => {
    if (!orderSummary) return [];
    const entries: { label: string; value: string }[] = [];

    if (orderSummary.orderId) {
      entries.push({
        label: "Order ID",
        value: orderSummary.orderId,
      });
    }

    if (orderSummary.status) {
      entries.push({
        label: "Status",
        value: orderSummary.status,
      });
    }

    const amountDisplay = formatAmount(orderSummary.amount);
    if (amountDisplay) {
      entries.push({
        label: "Amount",
        value: `${amountDisplay}${
          orderSummary.currency ? ` ${orderSummary.currency}` : ""
        }`,
      });
    }

    if (orderSummary.paymentType) {
      entries.push({
        label: "Payment Type",
        value: orderSummary.paymentType,
      });
    }

    if (orderSummary.orderType) {
      entries.push({
        label: "Order Type",
        value: orderSummary.orderType,
      });
    }

    return entries;
  })();

  const headline =
    orderSummary?.orderType &&
    orderSummary.orderType.toLowerCase().includes("quantum")
      ? "Quantum Order Confirmed"
      : "Payment Successful!";

  const description = orderSummary
    ? "Your payment cleared and the order is now confirmed. You will receive a confirmation message shortly."
    : "Your payment has been completed successfully. You will receive a confirmation message shortly.";

  return (
    <div>
      <PopupComponent isOpen={isOpen} onClose={onClose}>
        <div className="w-90 md:w-120 lg:w-140 p-4 md:p-6 xl:p-10 text-center">
          <div className="flex flex-col items-center justify-center">
            <Image src={TickIcon} alt="Close" className="w-24 h-26" />
            <h1 className="mt-2 text-2xl md:text-3xl font-bold">
              {headline}
            </h1>
            <p className="md:text-xl text-tertiary mt-2">
              {description}
            </p>
          </div>
          {details.length > 0 && (
            <div className="mt-6 bg-bg2 border border-bg3 rounded-xl p-4 text-left">
              <ul className="space-y-3">
                {details.map((detail) => (
                  <li key={detail.label}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
                      {detail.label}
                    </p>
                    <p className="text-base md:text-lg font-semibold break-words">
                      {detail.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-10 flex items-center justify-center gap-10">
            <CustomButton2
              image={CheckMarkButtonImage}
              text="OK"
              onClick={() => {
                onClose();
              }}
              imageStyling="w-30"
            />
            <CustomButton2
              image={EyeButtonImage}
              text="View wallet"
              onClick={() => {}}
              imageStyling="w-30"
            />
          </div>
        </div>
      </PopupComponent>
    </div>
  );
}
