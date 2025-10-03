"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  validateOrderData,
  SocketEventHandlers,
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

  // Popups
  const [successOpen, setSuccessOpen] = useState(false);
  const [failOpen, setFailOpen] = useState(false);

  // Socket
  const socketRef = useRef<unknown>(null);

  const handledReturnRef = useRef(false);

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

      (async () => {
        try {
          const res = await getUserOrder({
            email: result.email!,
            orderId: result.orderId!,
          });

          const body = (res.data as Record<string, unknown>) || {};
          // Be flexible about shape
          const statusUpper = (() => {
            const status = body?.status as string;
            if (status) return status.toUpperCase();

            const data = body?.data as Record<string, unknown>;
            if (data?.status) return (data.status as string).toUpperCase();

            const order = body?.order as Record<string, unknown>;
            if (order?.status) return (order.status as string).toUpperCase();

            const purchaseUnits = body?.purchase_units as unknown[];
            if (purchaseUnits?.[0]) {
              const firstUnit = purchaseUnits[0] as Record<string, unknown>;
              const payments = firstUnit?.payments as Record<string, unknown>;
              const captures = payments?.captures as unknown[];
              if (captures?.[0]) {
                const firstCapture = captures[0] as Record<string, unknown>;
                if (firstCapture?.status)
                  return (firstCapture.status as string).toUpperCase();
              }
            }

            return "";
          })();

          if (
            statusUpper === "COMPLETED" ||
            statusUpper === "APPROVED" ||
            statusUpper === "CAPTURED"
          ) {
            setSuccessOpen(true);
          } else {
            setFailOpen(true);
          }
        } catch (e) {
          console.error("getUserOrder failed:", e);
          setFailOpen(true);
        } finally {
          clearPayPalOrderData();
        }
      })();
    }
  }, [user?.email]);

  const handlePayAmountChange = (value: string) => {
    setPayAmount(value);
    if (value && !isNaN(Number(value))) {
      const usdValue = Number(value);
      const btcyAmount = calculateBTCYAmount(usdValue, btcyPrice);
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
      onPaymentPending: (data) => console.log("payment:pending", data),
      onOrderConfirmed: (data) => {
        console.log("order:confirmed", data);
        setIsPaymentPopupOpen(false);
        setSuccessOpen(true);
        setActiveOrder(null);
      },
      onOrderExpired: (data) => {
        console.log("order:expired", data);
        setIsPaymentPopupOpen(false);
        setFailOpen(true);
        setActiveOrder(null);
      },
      onOrdersUpdate: (data) => console.log("orders:update", data),
    };

    const socket = createQuantumSocket(user.email, socketHandlers);
    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user?.email]);

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

      setActiveOrder(order);
      setErrors({});
      setIsPaymentPopupOpen(true);
    } catch (err: unknown) {
      console.error("Order create failed", err);
      setFailOpen(true);
    }
  };

  return (
    <div className="mx-auto mt-40 max-w-[1800px] px-4 md:px-10 xl:px-20">
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="mt-10 md:mt-20 w-full lg:w-[90%] flex flex-col justify-items-center">
          <h2 className="text-[40px] md:text-7xl xl:text-[100px] font-bold  lg:leading-28">
            Quantum Mining: <br /> Larger Scale Grade <br />
            BTCY Access
          </h2>

          <p className="mt-10 text-2xl md:text-3xl max-w-3xl">
            Secure large-scale BTCY purchases{" "}
            <span className="font-bold">($5K – $100K+)</span> via bank wires,
            stable coins, and global OTC solutions.
          </p>

          <div className="font-bold mt-10 flex flex-col justify-center items-center md:items-start">
            <CustomButton2
              image={NoteButtonImage}
              text="Register"
              link="#buy-btcy"
              imageStyling="w-30"
            />
          </div>
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
      <div className="mt-40">
        <h1 className="text-4xl md:text-6xl xl:text-8xl font-bold text-center">
          Register and Purchase BTCY
        </h1>
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

      <div
        id="buy-btcy"
        className="mt-40 border-2 border-bg3 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl xl:text-8xl font-bold text-center mb-8">
          Buy BTCY
        </h2>

        {/* Funding Progress */}
        <div className="mb-8 mt-10">
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
        </div>

        {/* Exchange Rate */}
        <div className="mb-8">
          <p className="text-xl md:text-[40px] font-semibold">
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
        <div className="flex justify-center mt-20">
          <CustomButton2
            image={CartButtonImage}
            text="With Quantum Power"
            onClick={() => handleBuyNow()}
            imageStyling="w-40"
          />
        </div>
      </div>

      <div className="mt-40 flex flex-col justify-center items-center">
        <Image src={ArtImage3} alt="Art 1" className="w-80 md:w-100" />
        <h1 className="mt-10 text-4xl md:text-6xl xl:text-8xl font-bold">
          Compliance
        </h1>

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

      <div className="flex flex-col lg:flex-row items-center justify-start gap-20 mt-80">
        <Image
          src={ArtImage4}
          alt="Art Image 3"
          className="w-80 md:w-120 lg:w-120 xl:w-140 -ml-20"
        />
        <div className="w-full flex flex-col justify-center max-w-[800px] px-4">
          <h3 className="text-3xl md:text-5xl xl:text-7xl font-bold">
            Onboarding Flow Steps
          </h3>
          <ul className="list-disc mt-16 text-2xl md:text-3xl font-medium pl-4 md:pl-10 flex flex-col gap-16">
            <li>Register as Institutional Buyer</li>
            <li>Submit KYC Documents</li>
            <li>Get Verified</li>
            <li>Submit Buy Request (e.g., 50,000 USDT)</li>
            <li>Receive Invoice & Pay</li>
            <li>BTCY Tokens Delivered</li>
          </ul>
        </div>
      </div>

      {/* FAQs section */}
      <div className="my-80 flex flex-col items-center justify-center px-4 max-w-[1000px] mx-auto">
        <div className="w-full flex justify-between md:justify-start">
          <h2 className="text-5xl md:text-5xl lg:text-8xl font-bold mt-10">
            FAQs
          </h2>
          <Image src={ArtImage5} alt="Art Image 5" className="w-54" />
        </div>

        {/* FAQ Accordions */}
        <div className="w-full mt-16">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                What documents are required for KYC?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                To complete KYC for Quantum Mining, individuals must provide a
                government-issued photo ID, a recent proof of address (like a
                utility bill or bank statement), and a selfie holding their ID.
                For institutions, documents include a certificate of
                incorporation, company proof of address, ID of the authorized
                representative, and ownership structure details. In some cases,
                a source of funds declaration or AML questionnaire may also be
                required to comply with regulatory standards.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Can I use a company account?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                temp
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Is there a minimum holding period?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                temp
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-bg3 last:border-b-1 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Do you offer escrow for large trades?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                temp
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
        onClose={() => setSuccessOpen(false)}
      />
      <UnsuccessPopup isOpen={failOpen} onClose={() => setFailOpen(false)} />
    </div>
  );
};

export default QuantumMiningPage;
