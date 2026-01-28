"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CustomButton2 from "@/components/CustomButton2";
import PaymentPopup from "./PaymentPopup";
import LoginPopup from "@/components/LoginPopup";
import { useAuth } from "@/contexts/AuthContext";

import ArtImage1 from "@/assets/images/quantum-mining/quantum-mining-icon.webp";
import ArtImage2 from "@/assets/images/quantum-mining/bitcoin-art-3.svg";
import ArtImage3 from "@/assets/images/quantum-mining/art-1.webp";
import ArtImage4 from "@/assets/images/quantum-mining/art-4.webp";
import ArtImage5 from "@/assets/images/quantum-mining/art-5.webp";

import USDTIcon from "@/assets/images/quantum-mining/tether.webp";
import USDCIcon from "@/assets/images/quantum-mining/usdc.webp";
import PaypalIcon from "@/assets/images/quantum-mining/paypal.webp";
import USDIcon from "@/assets/images/quantum-mining/usd.webp";
import BTCYIcon from "@/assets/images/quantum-mining/btcy-icon.webp";

import FlagIcon from "@/assets/images/quantum-mining/american-flag.webp";
import GlobeIcon from "@/assets/images/quantum-mining/globe-icon.webp";

import NoteButtonImage from "@/assets/images/buttons/note-button.webp";
import CartButtonImage from "@/assets/images/buttons/cart-button.webp";
import ButtonBorder from "@/assets/images/button-border.webp";
import ButtonBorderActive from "@/assets/images/button-border-active.webp";
import SuccessPopup from "./SuccessPopup";
import UnsuccessPopup from "./UnsuccessPopup";

import CardImage1 from "@/assets/images/home/card-1.webp";
import CardImage2 from "@/assets/images/home/card-2.webp";
import CardImage3 from "@/assets/images/home/card-3.webp";


import {
  PaymentOption,
  CryptoOrderData,
  createQuantumOrder,
  getUserOrder,
  fetchPrices,
  createQuantumSocket,
  processPayPalReturn,
  storePayPalOrderData,
  clearPayPalOrderData,
  isCryptoPayment,
  optionToCurrencyIn,
  calculateBTCYAmount,
  MIN_PURCHASE_AMOUNT_USD,
  validateOrderData,
  SocketEventHandlers,
  QuantumOrderSocketPayload,
} from "@/lib/quantum-mining";


interface Errors {
  payAmount?: string;
  selectedNetwork?: string;
}

const ComingSoonBadge = ({ label = "Coming soon" }: { label?: string }) => (
  <span
    className="ml-2 inline-block rounded-full border px-2 py-0.5 text-xs md:text-sm animate-pulse"
    style={{
      borderColor: "#FD923A",
      color: "#FD923A",
      backgroundColor: "rgba(253,146,58,0.12)",
      lineHeight: "1",
      verticalAlign: "middle",
      transform: "translateY(-1px)",
    }}
  >
    {label}
  </span>
);

const ORDER_ID_KEYS = ["orderId", "order_id", "orderID", "id"] as const;

type OrderSignal = QuantumOrderSocketPayload & { raw?: unknown };

const toNumeric = (value: unknown): number | undefined => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
};

const buildOrderSignal = (
  source: Record<string, unknown>,
  orderId: string,
  raw: unknown
): OrderSignal => {
  const statusCandidates = [
    source.status,
    source.state,
    source.currentStatus,
    source.paymentStatus,
  ];
  const amountCandidates = [
    source.amount,
    source.orderAmount,
    source.total,
    source.value,
  ];
  const currencyCandidates = [
    source.currency,
    source.currencyCode,
    source.currency_code,
    source.currencyIso,
  ];
  const paymentTypeCandidates = [
    source.paymentType,
    source.payment_type,
    source.paymentMethod,
    source.payment_method,
    source.method,
  ];
  const orderTypeCandidates = [
    source.orderType,
    source.order_type,
    source.type,
    source.category,
  ];

  let amount = undefined;
  for (const candidate of amountCandidates) {
    const parsed = toNumeric(candidate);
    if (parsed !== undefined) {
      amount = parsed;
      break;
    }
  }

  let currency: string | undefined;
  for (const candidate of currencyCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      currency = candidate;
      break;
    }
  }

  const nestedAmount = source.amount;
  if (typeof nestedAmount === "object" && nestedAmount !== null) {
    const nested = nestedAmount as Record<string, unknown>;
    if (amount === undefined) {
      const nestedValue = toNumeric(nested.value ?? nested.total ?? nested.amount);
      if (nestedValue !== undefined) {
        amount = nestedValue;
      }
    }
    if (!currency) {
      const nestedCurrency =
        nested.currency ??
        nested.currencyCode ??
        nested.currency_code ??
        nested.currencyIso;
      if (typeof nestedCurrency === "string" && nestedCurrency.trim()) {
        currency = nestedCurrency;
      }
    }
  }

  let paymentType: string | undefined;
  for (const candidate of paymentTypeCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      paymentType = candidate;
      break;
    }
  }

  let orderType: string | undefined;
  for (const candidate of orderTypeCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      orderType = candidate;
      break;
    }
  }

  let status: string | undefined;
  for (const candidate of statusCandidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      status = candidate;
      break;
    }
  }

  return {
    orderId,
    status,
    amount,
    currency,
    paymentType,
    orderType,
    raw,
  };
};

const findOrderSignal = (
  payload: unknown,
  orderIds: string[],
  visited = new WeakSet<object>()
): OrderSignal | null => {
  if (!payload || !orderIds.length) return null;
  if (Array.isArray(payload)) {
    if (visited.has(payload as unknown as object)) return null;
    visited.add(payload as unknown as object);
    for (const item of payload) {
      const match = findOrderSignal(item, orderIds, visited);
      if (match) return match;
    }
    return null;
  }

  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  if (visited.has(payload as object)) return null;
  visited.add(payload as object);

  const record = payload as Record<string, unknown>;

  for (const key of ORDER_ID_KEYS) {
    const value = record[key];
    if (typeof value === "string" || typeof value === "number") {
      const id = String(value);
      if (orderIds.includes(id)) {
        return buildOrderSignal(record, id, payload);
      }
    }
  }

  for (const value of Object.values(record)) {
    const match = findOrderSignal(value, orderIds, visited);
    if (match) return match;
  }

  return null;
};

const COMPLETED_STATUS_KEYWORDS = [
  "completed",
  "complete",
  "approved",
  "captured",
  "success",
  "succeeded",
  "done",
  "paid",
  "confirmed",
] as const;

const isCompletedStatus = (status?: string) => {
  if (!status) return false;
  const normalized = status.toLowerCase();
  return COMPLETED_STATUS_KEYWORDS.some((keyword) =>
    normalized.includes(keyword)
  );
};

const QuantumMiningPage = () => {
  const { user } = useAuth();

  const [payAmount, setPayAmount] = useState("");
  const [getAmount, setGetAmount] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentOption>("USDT");
  const [selectedNetwork, setSelectedNetwork] = useState<"Ethereum" | "Solana">(
    "Ethereum"
  );
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [btcyPrice, setBtcyPrice] = useState(0);
  // Active order (crypto only)
  const [activeOrder, setActiveOrder] = useState<CryptoOrderData | null>(null);
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
  const [latestOrderSignal, setLatestOrderSignal] = useState<OrderSignal | null>(
    null
  );

  // Popups
  const [successOpen, setSuccessOpen] = useState(false);
  const [failOpen, setFailOpen] = useState(false);

  // Socket
  const socketRef = useRef<unknown>(null);
  const activeOrderRef = useRef<CryptoOrderData | null>(null);
  const pendingOrderIdRef = useRef<string | null>(null);

  const handledReturnRef = useRef(false);

  useEffect(() => {
    activeOrderRef.current = activeOrder;
  }, [activeOrder]);

  useEffect(() => {
    pendingOrderIdRef.current = pendingOrderId;
  }, [pendingOrderId]);

  const upsertLatestSignal = useCallback((signal: OrderSignal) => {
    setLatestOrderSignal((prev) => {
      if (!prev || prev.orderId !== signal.orderId) {
        return signal;
      }
      return {
        ...prev,
        ...signal,
      };
    });
  }, []);

  const getTrackedOrderIds = useCallback(() => {
    const ids = new Set<string>();
    if (pendingOrderIdRef.current) {
      ids.add(pendingOrderIdRef.current);
    }
    if (activeOrderRef.current?.orderId) {
      ids.add(activeOrderRef.current.orderId);
    }
    return Array.from(ids);
  }, []);

  const finalizeOrder = useCallback(
    (signal?: OrderSignal) => {
      if (signal) {
        upsertLatestSignal(signal);
      }
      setIsPaymentPopupOpen(false);
      setFailOpen(false);
      setSuccessOpen(true);
      setActiveOrder(null);
      setPendingOrderId(null);
      activeOrderRef.current = null;
      pendingOrderIdRef.current = null;
      clearPayPalOrderData();
    },
    [upsertLatestSignal, clearPayPalOrderData]
  );

  useEffect(() => {
    if (handledReturnRef.current) return;
    handledReturnRef.current = true;

    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const result = processPayPalReturn(url, user?.email);

    if (result.status === "none") return;

    // Clean URL immediately (no query params lingering)
    window.history.replaceState({}, "", url.origin + url.pathname);

    // Close any crypto modal just in case
    setIsPaymentPopupOpen(false);

    // Fast-fail on cancel
    if (result.status === "cancel") {
      setFailOpen(true);
      // optional: clear stash
      clearPayPalOrderData();
      return;
    }

    // Success path -> fetch order details from backend (capture is already done server-side)
    if (result.status === "success") {
      if (!result.email || !result.orderId) {
        setFailOpen(true);
        clearPayPalOrderData();
        return;
      }

      setPendingOrderId(result.orderId);

      (async () => {
        try {
          const res = await getUserOrder({
            email: result.email!,
            orderId: result.orderId!,
          });

          const body = res.data as unknown;
          const bodyRecord =
            typeof body === "object" && body !== null
              ? (body as Record<string, unknown>)
              : {};

          const signal = buildOrderSignal(
            bodyRecord,
            result.orderId!,
            bodyRecord
          );

          const fallbackStatus = (() => {
            if (signal.status) return signal.status;

            const directStatus = bodyRecord?.status;
            if (typeof directStatus === "string" && directStatus) {
              return directStatus;
            }

            const data = bodyRecord?.data as Record<string, unknown>;
            if (data?.status && typeof data.status === "string") {
              return data.status;
            }

            const order = bodyRecord?.order as Record<string, unknown>;
            if (order?.status && typeof order.status === "string") {
              return order.status;
            }

            const purchaseUnits = bodyRecord?.purchase_units as unknown[];
            if (purchaseUnits?.[0]) {
              const firstUnit = purchaseUnits[0] as Record<string, unknown>;
              const payments = firstUnit?.payments as Record<string, unknown>;
              const captures = payments?.captures as unknown[];
              if (captures?.[0]) {
                const firstCapture = captures[0] as Record<string, unknown>;
                const captureStatus = firstCapture?.status;
                if (typeof captureStatus === "string") {
                  return captureStatus;
                }
              }
            }

            return "";
          })();

          const normalizedStatus = signal.status || fallbackStatus;
          const withStatus: OrderSignal = {
            ...signal,
            status: normalizedStatus,
          };

          upsertLatestSignal(withStatus);

          if (isCompletedStatus(normalizedStatus)) {
            finalizeOrder(withStatus);
          } else {
            setFailOpen(true);
            setPendingOrderId(null);
            pendingOrderIdRef.current = null;
            clearPayPalOrderData();
          }
        } catch (e) {
          console.error("getUserOrder failed:", e);
          setFailOpen(true);
          setPendingOrderId(null);
          pendingOrderIdRef.current = null;
          clearPayPalOrderData();
        }
      })();
    }
  }, [finalizeOrder, upsertLatestSignal, user?.email]);

  const handlePayAmountChange = (value: string) => {
    setPayAmount(value);

    const trimmed = value.trim();
    const numericValue = Number(value);

    setErrors((prev) => {
      const next: Errors = { ...prev };

      if (!trimmed) {
        delete next.payAmount;
      } else if (Number.isNaN(numericValue)) {
        next.payAmount = "Please enter a valid amount";
      } else if (numericValue < MIN_PURCHASE_AMOUNT_USD) {
        next.payAmount = `Minimum purchase is $${MIN_PURCHASE_AMOUNT_USD}`;
      } else {
        delete next.payAmount;
      }

      return next;
    });

    if (trimmed && !Number.isNaN(numericValue)) {
      const btcyAmount = calculateBTCYAmount(numericValue, btcyPrice);
      setGetAmount(btcyAmount.toFixed(2));
    } else {
      setGetAmount("");
    }
  };

  useEffect(() => {
    const fetchPricesData = async () => {
      try {
        const { btcyPrice } = await fetchPrices();
        setBtcyPrice(btcyPrice);
      } catch (error) {
        console.error("Failed to fetch BTC price:", error);
      }
    };
    fetchPricesData();
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    const socketHandlers: SocketEventHandlers = {
      onConnect: (socketId) => console.log("ws connected", socketId),
      onDisconnect: () => console.log("ws disconnected"),
      onOrderCreated: (data) => console.log("order:created", data),
      onPaymentWatching: (data) => console.log("payment:watching", data),
      onPaymentPending: (data) => {
        console.log("payment:pending", data);
        const tracked = getTrackedOrderIds();
        if (!tracked.length) return;
        const signal = findOrderSignal(data, tracked);
        if (signal) {
          upsertLatestSignal({
            ...signal,
            status: signal.status || "PENDING",
          });
        }
      },
      onOrderConfirmed: (data) => {
        console.log("order:confirmed", data);
        const tracked = getTrackedOrderIds();
        if (!tracked.length) return;
        let signal = findOrderSignal(data, tracked);
        if (
          !signal &&
          data &&
          typeof data === "object" &&
          "orderId" in data &&
          data.orderId
        ) {
          const orderId = String(data.orderId);
          if (tracked.includes(orderId)) {
            signal = buildOrderSignal(
              data as Record<string, unknown>,
              orderId,
              data
            );
          }
        }
        if (signal) {
          finalizeOrder({
            ...signal,
            status: signal.status || "COMPLETED",
          });
        }
      },
      onOrderExpired: (data) => {
        console.log("order:expired", data);
        const tracked = getTrackedOrderIds();
        if (!tracked.length) return;
        const signal = findOrderSignal(data, tracked);
        if (signal) {
          upsertLatestSignal({
            ...signal,
            status: signal.status || "EXPIRED",
          });
          setIsPaymentPopupOpen(false);
          setActiveOrder(null);
          activeOrderRef.current = null;
          setPendingOrderId(null);
          pendingOrderIdRef.current = null;
          setFailOpen(true);
          clearPayPalOrderData();
        }
      },
      onOrdersUpdate: (data) => {
        console.log("orders:update", data);
        const tracked = getTrackedOrderIds();
        if (!tracked.length) return;
        const signal = findOrderSignal(data, tracked);
        if (signal) {
          upsertLatestSignal(signal);
          if (isCompletedStatus(signal.status)) {
            finalizeOrder(signal);
          }
        }
      },
    };

    const socket = createQuantumSocket(user.email, socketHandlers);
    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [finalizeOrder, getTrackedOrderIds, upsertLatestSignal, user?.email]);

  const trimmedPayAmount = payAmount.trim();
  const numericPayAmount = Number(trimmedPayAmount);
  const hasNumericPayAmount =
    trimmedPayAmount.length > 0 && !Number.isNaN(numericPayAmount);
  const isBelowMinimumAmount =
    hasNumericPayAmount && numericPayAmount < MIN_PURCHASE_AMOUNT_USD;
  const isBuyDisabled =
    !hasNumericPayAmount || isBelowMinimumAmount || !!errors.payAmount;

  // MAIN BUY HANDLER: calls API first, then either redirect (paypal/usd) or open popup (crypto)
  const handleBuyNow = async () => {
    const validation = validateOrderData(
      payAmount,
      selectedPaymentOption,
      selectedNetwork
    );
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    if (!user?.email) {
      setIsLoginPopupOpen(true);
      setIsPaymentPopupOpen(false);
      return;
    }

    setFailOpen(false);
    setSuccessOpen(false);
    setLatestOrderSignal(null);

    try {
      // Build payload "based on the above data"
      const payload = {
        email: user.email,
        currencyIn: optionToCurrencyIn(selectedPaymentOption), // "USDT"|"USDC"|"PayPal"|"USD"
        currencyOut: "BTCY" as const,
        amount: Number(payAmount), // user-entered USD
        outAmount: Number(getAmount) || 0, // BTCY amount (UI computed)
        ...(isCryptoPayment(selectedPaymentOption) && {
          blockchain: selectedNetwork,
        }),
      };

      const res = await createQuantumOrder(payload);
      const data = res.data as Record<string, unknown>;

      // If USD or PayPal => redirect to external link
      if (
        selectedPaymentOption === "USD" ||
        selectedPaymentOption === "PayPal"
      ) {
        const approve =
          (data?.links as Array<{ rel: string; href: string }>)?.find(
            (l) => l?.rel === "approve"
          )?.href || "";
        if (!approve) throw new Error("Missing PayPal approval link.");

        // Persist for return page
        const tokenFromLink = (() => {
          try {
            const u = new URL(approve);
            return u.searchParams.get("token") || undefined;
          } catch {
            return undefined;
          }
        })();

        const stash = {
          email: user.email,
          // PayPal order id can be one of: token, data.id, data.paypalId
          orderId:
            tokenFromLink ||
            (data?.id as string) ||
            (data?.paypalId as string) ||
            (data?.orderId as string) ||
            "",
        };
        storePayPalOrderData(stash);

        if (stash.orderId) {
          setPendingOrderId(stash.orderId);
          pendingOrderIdRef.current = stash.orderId;
          const amountNumeric = toNumeric(
            data?.orderAmount ?? data?.amount ?? payload.amount
          );
          const currency =
            typeof data?.orderCurrency === "string" && data.orderCurrency
              ? (data.orderCurrency as string)
              : selectedPaymentOption === "USD"
                ? "USD"
                : undefined;
          const orderTypeValue =
            (typeof data?.orderType === "string" && data.orderType) || "Quantum";
          const paymentTypeValue =
            (typeof data?.paymentType === "string" && data.paymentType) ||
            selectedPaymentOption;

          upsertLatestSignal({
            orderId: stash.orderId,
            status: "PENDING",
            amount: amountNumeric,
            currency,
            paymentType: paymentTypeValue,
            orderType: orderTypeValue,
            raw: data,
          });
        }

        window.location.href = approve;
        return;
      }

      // Else crypto: open popup with address + qr
      const order: CryptoOrderData = {
        orderId: data.orderId as string,
        paymentMethod: data.paymentMethod as "usdt" | "usdc",
        amount: data.amount as number,
        receiverAddress: data.receiverAddress as string,
        expiresAt: data.expiresAt as string,
        message: data.message as string,
        blockchain: data.blockchain as "Ethereum" | "Solana",
      };

      setPendingOrderId(order.orderId);
      pendingOrderIdRef.current = order.orderId;
      upsertLatestSignal({
        orderId: order.orderId,
        status: "PENDING",
        amount: order.amount,
        currency: selectedPaymentOption,
        paymentType: selectedPaymentOption,
        orderType: "Quantum",
        raw: order,
      });
      setActiveOrder(order);
      setErrors({});
      setIsPaymentPopupOpen(true);
    } catch (err: unknown) {
      console.error("Order create failed", err);
      setFailOpen(true);
      setPendingOrderId(null);
      pendingOrderIdRef.current = null;
    }
  };

  const handleCloseSuccess = () => {
    setSuccessOpen(false);
    setLatestOrderSignal(null);
  };

  return (
    <div className="mx-auto mt-40 max-w-[1800px] px-4 md:px-10 xl:px-20">
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="mt-10 md:mt-20 w-full lg:w-[90%] flex flex-col justify-items-center">
          <h1 className="text-[40px] md:text-7xl  font-bold  lg:leading-28">
            Own BTCY — Before It <br />Gets Listed

          </h1>

          <p className="mt-10 text-2xl md:text-3xl max-w-3xl">
            No mining required. Buy BTCY directly at an early-stage price.
            <br />
            BTCY is a pre-listed digital asset connected with Indexx.ai

          </p>
        </div>

        <div className="xl:mt-26 flex justify-center items-center relative">
          <Image
            src={ArtImage1}
            alt="Quantum Mining Icon"
            className="w-90 md:w-140 xl:w-140 2xl:w-200"
          />
          <Image
            src={ArtImage2}
            alt="Bitcoin Art 3"
            className="w-90 md:w-140 xl:w-140 2xl:w-200 absolute top-0 left-1/2 xl:left-auto xl:right-0 transform xl:transform-none -translate-x-1/2 xl:translate-x-0 "
          />
        </div>
      </div>

      <div
        id="buy-btcy"
        className="mt-40 border-2 border-bg3 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl xl:text-8xl font-bold text-center mb-8">
          Buy BTCY
        </h2>

        {/* Funding Progress */}
        {/* <div className="mb-8 mt-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg md:text-2xl xl:text-3xl">USD Raised</span>
            <span className="text-lg md:text-2xl xl:text-3xl">
              556,435.925 / 750,000
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-6 relative">
            <div
              className="bg-orange-500 h-6 rounded-full"
              style={{ width: "79.3%" }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
              79.3%
            </span>
          </div>
        </div> */}

        {/* Exchange Rate */}
        <div className="mb-8">
          <p className="text-xl md:text-[40px] font-semibold text-center my-10">
            1 BTCY = ${btcyPrice.toFixed(4)}
          </p>
        </div>

        {/* Payment Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2 mb-8 justify-items-center">
          {[
            { name: "USDT", icon: USDTIcon },
            { name: "USDC", icon: USDCIcon },
            { name: "PayPal", icon: PaypalIcon },
            { name: "USD", icon: USDIcon },
          ].map((option) => {
            const name = option.name as PaymentOption;
            const isSelected = name === selectedPaymentOption;
            return (
              <div
                key={name}
                className="relative cursor-pointer transition-all duration-200"
                onClick={() => setSelectedPaymentOption(name)}
              >
                <Image
                  src={isSelected ? ButtonBorderActive : ButtonBorder}
                  alt={isSelected ? "Button Border Active" : "Button Border"}
                  className="w-32 md:w-38 lg:w-44"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <span className="mb-2">
                    <Image src={option.icon} alt={name} className="w-10 h-10" />
                  </span>
                  <span className="text-lg">{name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Network for crypto */}
        {isCryptoPayment(selectedPaymentOption) && (
          <div className="mb-8">
            <label className="block text-xl mb-2">Network</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
                className="flex items-center gap-3 p-3 hover:bg-bg2 rounded-md cursor-pointer text-tertiary border border-bg3 w-full text-lg focus:border-primary hover:border-primary"
              >
                <span className="flex-1 text-left">{selectedNetwork}</span>
                <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
              </button>

              {isNetworkDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-full bg-bg2 rounded-md shadow-lg z-10 border border-bg">
                  <div className="py-1">
                    {["Ethereum", "Solana"].map((network) => (
                      <button
                        key={network}
                        type="button"
                        onClick={() => {
                          setSelectedNetwork(network as "Ethereum" | "Solana");
                          setIsNetworkDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-tertiary hover:bg-primary hover:text-bg transition-colors text-lg cursor-pointer flex items-center gap-3"
                      >
                        <span className="flex-1">{network}</span>
                        {selectedNetwork === network && (
                          <Check
                            className="w-5 h-5 ml-auto"
                            strokeWidth={2.5}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-xl mb-2">
              Pay with {selectedPaymentOption}
            </label>
            <div className="relative">
              <input
                type="number"
                className="w-full px-4 py-3 border border-bg3 rounded-lg text-lg focus:outline-none focus:border-primary hover:border-primary "
                placeholder="0"
                value={payAmount}
                onChange={(e) => handlePayAmountChange(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span>
                  {selectedPaymentOption === "USDT" ? (
                    <Image src={USDTIcon} alt="USDT" className="w-10 h-10" />
                  ) : selectedPaymentOption === "USDC" ? (
                    <Image src={USDCIcon} alt="USDC" className="w-10 h-10" />
                  ) : selectedPaymentOption === "PayPal" ? (
                    <Image
                      src={PaypalIcon}
                      alt="PayPal"
                      className="w-10 h-10"
                    />
                  ) : (
                    <Image src={USDIcon} alt="USD" className="w-14 h-10" />
                  )}
                </span>
              </div>
            </div>
            {errors.payAmount && (
              <p className="text-red-500 text-sm mt-2">{errors.payAmount}</p>
            )}
          </div>

          <div>
            <label className="block text-xl mb-2">You Get</label>
            <div className="relative">
              <input
                type="number"
                className="w-full px-4 py-3 border border-bg3 rounded-lg text-lg focus:outline-none focus:border-primary hover:border-primary "
                placeholder="0"
                value={getAmount}
                onChange={(e) => setGetAmount(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-primary text-xl">
                  <Image src={BTCYIcon} alt="BTCY" className="w-10 h-10" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buy Now Button */}
        <div
          className={`flex justify-center mt-20 ${isBuyDisabled ? "pointer-events-none opacity-60" : ""
            }`}
          aria-disabled={isBuyDisabled}
        >
          <CustomButton2
            image={CartButtonImage}
            text="With Quantum Power"
            onClick={() => {
              if (isBuyDisabled) return;
              handleBuyNow();
            }}
            imageStyling="w-40"
          />
        </div>
      </div>


      {/* Benefits Section - Three Cards */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* No Mining Required */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={CardImage1}
              alt="No Mining Required"
              className="w-full max-w-xs h-auto object-contain mb-6"
            />
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
              No Mining Required
            </h3>
            <p className="text-base md:text-lg text-gray-300">
              Quantum system auto-generates BTCY — no manual mining needed.
            </p>
          </div>

          {/* Indexx.ai Asset Wallet */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={CardImage2}
              alt="Indexx.ai Asset Wallet"
              className="w-full max-w-xs h-auto object-contain mb-6"
            />
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
              Indexx.ai Asset Wallet
            </h3>
            <p className="text-base md:text-lg text-gray-300">
              BTCY Tokens go direct to indexx.ai Asset Wallet
            </p>
          </div>

          {/* Buy at Low Price */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={CardImage3}
              alt="Buy at Low Price"
              className="w-full max-w-xs h-auto object-contain mb-6"
            />
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
              Buy at Low Price
            </h3>
            <p className="text-base md:text-lg text-gray-300">
              BTCY is in early low-price phase — perfect time to enter.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Quantum Mining Section */}
      <div className="mx-auto mt-40 md:mt-60 px-4 md:px-8 lg:px-20 xl:px-40 relative max-w-[2000px]">
        <div className="flex flex-col items-center justify-center">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary text-center mb-12 md:mb-16">
            Why Choose Quantum Mining?
          </h2>

          {/* Benefits List */}
          <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 max-w-4xl">
            {/* Benefit 1 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                1. Skip Daily Mining – Get BTCY Instantly
              </h3>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                Quantum Mining is for people who don&apos;t want to tap and mine every day. Instead of slowly collecting nuggets, you can buy BTCY tokens directly in the pre-sale and lock in your position immediately.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                2.Buy While the Price Is Low (Christmas Discount)
              </h3>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                With the Christmas Discount, you get 10% off your BTCY token purchase for a limited time. You’re entering at an early stage, before launch and before potential future price movements once BTCY is live and tradable (if and when it gets listed). </p>
            </div>

            {/* Benefit 3 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                3. Aligned with Bitcoin – Pegged Ratio
              </h3>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                BTCY is designed with a target peg of 1,000,000 BTCY = 1 BTC, connecting the ecosystem to Bitcoin&apos;s price. Quantum Mining lets you participate in that vision early—while understanding that the peg, listing, and future market price are not guaranteed and can change.
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col lg:flex-row items-center justify-center gap-20 mt-80">
        <Image
          src={ArtImage4}
          alt="Art Image 3"
          className="w-80 md:w-120 lg:w-120 xl:w-140 -ml-20"
        />
        <div className="w-full flex flex-col justify-center max-w-[800px] px-4">
          <h3 className="text-3xl md:text-5xl xl:text-7xl 2xl:text-8xl font-bold">
            Onboarding Flow Steps
          </h3>
          <ul className="list-disc mt-16 text-2xl md:text-3xl font-medium pl-4 md:pl-10 flex flex-col gap-16">
            <li>Register as Buyer (Individual or Institutional)</li>

            <li>Minimum Purchase: 10 USD</li>

            <li>KYC Requirements:</li>

            <li>Not Required for purchases up to $1,000 USD</li>

            <li>
              Required for purchases above $1,000 USD or for large/institutional
              investors
            </li>

            <li>Submit Buy Request (e.g., $10 – $50,000 USDT or more)</li>

            <li>Receive Invoice & Pay</li>

            <li>BTCY Tokens Delivered</li>
          </ul>
        </div>
      </div>
      <div className="mt-40 flex flex-col justify-center items-center">
        <Image src={ArtImage3} alt="Art 1" className="w-80 md:w-100" />
        <h2 className="mt-10 text-4xl md:text-6xl xl:text-8xl font-bold">
          Compliance
        </h2>

        <div className="mt-10 w-full max-w-6xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse border-b border-tertiary rounded-lg text-tertiary">
            <thead>
              <tr className="border-b ">
                <th className="text-left p-4 md:p-6 text-sm md:text-lg xl:text-xl font-semibold"></th>
                <th className="text-left p-4 md:p-6 text-sm md:text-lg xl:text-xl font-semibold">
                  US Version
                </th>
                <th className="text-left p-4 md:p-6 text-sm md:text-lg xl:text-xl font-semibold">
                  Global Version
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-tertiary">
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  KYC / AML
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl ">
                  Strict (OFAC-compliant)
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  Aligned to local laws
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl ">
                  Institutional Onboarding
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl ">
                  Required
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  Aligned to local laws
                </td>
              </tr>
              <tr>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  Licensing
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  Registered MSB required
                </td>
                <td className="p-4 md:p-6 text-sm md:text-lg xl:text-xl">
                  May need local licenses
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>



      <div className="mt-40">
        <h2 className="text-4xl md:text-6xl xl:text-8xl font-bold text-center">
          Register and Purchase BTCY
        </h2>
        <div className="flex flex-col lg:flex-row justify-center mt-20 gap-30 p-4 md:p-10 xl:p-20">
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4">
              <Image src={FlagIcon} alt="Flag" className="w-10" />
              <h4 className="text-3xl md:text-4xl font-bold">For US Users</h4>
            </div>
            <ul className="list-disc text-2xl md:text-3xl mt-10 text-tertiary pl-6">
              <li>USDT / USDC</li>
              <li>Paypal</li>
              <li>USD credit/debit card</li>
              <li>
                USD bank wire <ComingSoonBadge />
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-4">
              <Image src={GlobeIcon} alt="Globe" className="w-10" />
              <h4 className="text-3xl md:text-4xl font-bold">
                For Global Users
              </h4>
            </div>
            <ul className="list-disc text-2xl md:text-3xl mt-10 text-tertiary pl-6">
              <li>USDT / USDC</li>
              <li>Paypal</li>
              <li>
                Local currencies: EUR, GBP, JPY, AED, INR <ComingSoonBadge />
              </li>
              <li>
                Bank wires (SWIFT/SEPA) <ComingSoonBadge />
              </li>
              <li>
                Local methods: Alipay, UPI, M-Pesa <ComingSoonBadge />
              </li>
            </ul>
          </div>
        </div>
      </div>


      {/* FAQs section */}
      <div className="my-80 flex flex-col items-center justify-center px-4 max-w-[1000px] mx-auto">
        <div className="w-full flex justify-between md:justify-center">
          <h2 className="text-5xl md:text-5xl lg:text-8xl font-bold mt-10">
            FAQs
          </h2>
          <Image src={ArtImage5} alt="Art Image 5" className="w-54" />
        </div>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary text-center mb-12 md:mb-16">
          Quantum Mining, BTCY &  Christmas Discount
        </h3>

        {/* FAQ Accordions */}
        <div className="w-full mt-16">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                What is Quantum Mining?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                Quantum Mining is our pre-sale route for BTCY. Instead of mining nuggets inside the app and converting later, you buy BTCY tokens directly before launch. It’s designed for users who want to secure tokens upfront rather than tap and mine daily.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                How is Quantum Mining different from Power Mining?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Power Mining:</strong> You mine nuggets in the app faster and with longer sessions, then later convert those nuggets into BTCY via Alchemy when the feature is live.</li>
                  <li><strong>Quantum Mining:</strong> You skip nuggets entirely and purchase BTCY tokens directly as a pre-sale. It’s about getting tokens now rather than grinding daily mining sessions.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                What exactly am I buying with Quantum Mining?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                You are purchasing an allocation of BTCY tokens in advance, under our pre-sale terms. These tokens are not yet listed or tradable on public exchanges. They will be delivered/activated according to the project’s launch and token release schedule, subject to the platform’s terms and any applicable regulations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                What does the 1,000,000 BTCY = 1 BTC ratio mean?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                This ratio is a target peg used inside the Bitcoin Yay ecosystem to conceptually link BTCY to Bitcoin (1,000,000 BTCY representing the value of 1 BTC in the design). It is not a guaranteed exchange rate and does not mean you can always swap 1,000,000 BTCY for 1 BTC. Actual market prices, if and when BTCY lists, will depend on supply, demand, and market conditions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Is BTCY listed on any exchange right now?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                No. BTCY is not currently listed on any exchange. Quantum Mining is a pre-launch token purchase. Future listings, if they happen, will be announced separately and are not guaranteed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Does Quantum Mining guarantee that BTCY will go up in value?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                No. There is no guarantee that BTCY will increase in value, be listed on exchanges, or be tradeable in your region. Crypto tokens are highly volatile, and you should assume you can lose some or all of the funds you commit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-7"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Who is Quantum Mining best suited for?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                Quantum Mining is aimed at users who:
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Don't want to tap and mine every day</li>
                  <li>Prefer buying tokens directly instead of grinding nuggets</li>
                  <li>Want to take advantage of early pricing and limited-time discounts (like the 12:12 10% off sale) while understanding the high risk and speculative nature of pre-launch tokens.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-8"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Can I still mine for free or use Power Mining if I choose Quantum Mining?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                Yes. Quantum Mining is optional. You can still:
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Mine for free inside the app</li>
                  <li>Upgrade to Power Mining for faster nugget earning</li>
                  <li>Or combine all three: free mining, Power Mining, and Quantum Mining depending on your strategy and risk appetite.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-9"
              className="border border-bg3 last:border-b-1 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Where do my purchased BTCY tokens and withdrawn nuggets go?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                Your BTCY app account is directly linked to your Indexx.ai asset wallet. When you buy BTCY through Quantum Mining or withdraw mined nuggets via Alchemy, the resulting BTCY tokens are sent to your Indexx.ai asset wallet automatically. You can log into Indexx.ai using your Bitcoin Yay (BTCY) account, view your BTCY balance there, and use any supported features on the exchange once BTCY is live and available.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <PaymentPopup
        isOpen={isPaymentPopupOpen}
        onClose={() => setIsPaymentPopupOpen(false)}
        cryptoType={selectedPaymentOption}
        order={activeOrder}
        closeOnOutsideClick={false}
        closeOnEsc={false}
      />

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onRegisterClick={() => setIsLoginPopupOpen(false)}
        onClose={() => setIsLoginPopupOpen(false)}
        onLoginSuccess={() => setIsLoginPopupOpen(false)}
      />

      <SuccessPopup
        isOpen={successOpen}
        onClose={handleCloseSuccess}
        orderSummary={latestOrderSignal || undefined}
      />
      <UnsuccessPopup isOpen={failOpen} onClose={() => setFailOpen(false)} />
    </div>
  );
};

export default QuantumMiningPage;
