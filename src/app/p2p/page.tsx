"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TronWeb from "tronweb";
import { isAddress as isValidEvmAddress } from "viem";
import { PublicKey } from "@solana/web3.js";
import BuybackRuleNote from "@/components/p2p/BuybackRuleNote";
import CustomButton from "@/components/CustomButton";
import CustomButton2 from "@/components/CustomButton2";
import Dropdown from "@/components/p2p/Dropdown";
import PopupComponent from "@/components/PopupComponent";
import LoginPopup from "@/components/LoginPopup";
import { useAuth } from "@/contexts/AuthContext";
import CartButtonImage from "@/assets/images/buttons/cart-button.webp";
import SellButtonImage from "@/assets/images/buttons/price-tag-button.webp";
import CheckMarkButtonImage from "@/assets/images/buttons/check-mark-button.webp";
import CancelOrderImage from "@/assets/images/buttons/cancelOrder.svg";
import DisputeButtonImage from "@/assets/images/buttons/customer_support.svg";
import {
  PAYMENT_METHODS,
  P2POrder,
  OrderStatus,
  STATUS_CHIP,
  STATUS_FLOW,
  STATUS_LABEL,
  TradeAction,
  Wallet,
  buybackAvailable,
  formatBtcy,
  formatPrice,
  formatUsd,
  mapBackendOfferStatus,
  mapBackendTradeStatus,
  formatPaymentDetails,
  nameFromEmail,
  orderTotal,
  roleOf,
  walletTotal,
  P2PApiOffer,
  P2PApiTrade,
  getP2PWalletSummary,
  listP2PSellOffers,
  listMyP2POffers,
  listMyP2PTrades,
  createP2PSellOffer,
  createP2PTrade,
  cancelP2POffer,
  markP2PTradeAsPaid,
  confirmP2PTradePayment,
  cancelP2PTrade,
  createP2PDispute,
  getP2PTradePaymentProofUrl,
  replaceP2PPaymentProof,
} from "@/lib/p2p";

// BTCY is considered "locked" while an order sits in any of these states.
const LOCKED_STATES: OrderStatus[] = [
  "open",
  "buyer_matched",
  "payment_pending",
  "payment_submitted",
  "payment_confirmed",
  "btcy_released",
];

type Tab = "market" | "sell" | "orders";

// ---------------------------------------------------------------------------
// Conversion: backend offers/trades -> display P2POrder
// ---------------------------------------------------------------------------

function offerToOpenOrder(offer: P2PApiOffer): P2POrder {
  const amount = offer.availableAmount / offer.pricePerUnit;
  return {
    id: offer.offerId,
    sellerId: offer.creatorEmail,
    sellerName: nameFromEmail(offer.creatorEmail),
    amount,
    price: offer.pricePerUnit,
    paymentMethods: offer.paymentMethods?.length
      ? offer.paymentMethods
      : offer.acceptedPaymentMethods,
    paymentDetails: formatPaymentDetails(offer.paymentInstructions) || undefined,
    status: mapBackendOfferStatus(offer.status),
    createdAt: offer.createdAt,
  };
}

function tradeToOrder(trade: P2PApiTrade, offer?: P2PApiOffer): P2POrder {
  return {
    id: trade.tradeId,
    tradeId: trade.tradeId,
    sellerId: trade.sellerEmail,
    sellerName: nameFromEmail(trade.sellerEmail),
    buyerId: trade.buyerEmail,
    buyerName: nameFromEmail(trade.buyerEmail),
    amount: trade.cryptoAmount,
    price: trade.pricePerUnit,
    paymentMethods: [trade.paymentMethod],
    paymentDetails: formatPaymentDetails(offer?.paymentInstructions) || undefined,
    status: mapBackendTradeStatus(trade.status),
    createdAt: trade.createdAt,
    hasPaymentProof: Boolean(trade.paymentProof),
  };
}

// ---------------------------------------------------------------------------
// Small presentational pieces
// ---------------------------------------------------------------------------

function StatusChip({ status }: { status: OrderStatus }) {
  return (
    <span className={`text-xs font-semibold ${STATUS_CHIP[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

function StatusTimeline({ status }: { status: OrderStatus }) {
  const terminalBad = status === "cancelled";
  const disputed = status === "disputed" || status === "admin_review";
  const currentIndex = STATUS_FLOW.indexOf(status);
  const step = currentIndex + 1;

  const barColor = (i: number) => {
    if (terminalBad) return "bg-white/10";
    if (disputed) return "bg-red-500/50";
    return currentIndex >= 0 && i <= currentIndex ? "bg-primary" : "bg-white/10";
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`text-sm font-semibold ${disputed ? "text-red-400" : "text-white"}`}
        >
          {disputed
            ? "Under Admin Review"
            : terminalBad
              ? "Cancelled"
              : STATUS_LABEL[status]}
        </span>
        {!disputed && !terminalBad && currentIndex >= 0 && (
          <span className="text-xs text-tertiary/70">
            Step {step} of {STATUS_FLOW.length}
          </span>
        )}
      </div>
      <div className="flex gap-1.5">
        {STATUS_FLOW.map((s, i) => (
          <span
            key={s}
            className={`h-1.5 flex-1 rounded-full ${barColor(i)}`}
          />
        ))}
      </div>
    </div>
  );
}

function BalanceCard({ wallet, locked }: { wallet: Wallet; locked: number }) {
  const cell = (label: string, value: string, hint?: string) => (
    <div className="flex-1 rounded-xl bg-black/30 p-4">
      <p className="text-xs uppercase tracking-wide text-tertiary/70">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
      {hint && <p className="mt-0.5 text-[11px] text-tertiary/60">{hint}</p>}
    </div>
  );
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">My BTCY Wallet</h2>
        <span className="text-sm text-tertiary">
          Available to trade:{" "}
          <span className="font-semibold text-primary">
            {formatBtcy(walletTotal(wallet))} BTCY
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        {cell(
          "Purchased",
          `${formatBtcy(wallet.purchased)} BTCY`,
          `Buyback eligible: ${formatBtcy(buybackAvailable(wallet))}`,
        )}
        {cell(
          "Earned",
          `${formatBtcy(wallet.earned)} BTCY`,
          "P2P only",
        )}
        {cell("Total", `${formatBtcy(walletTotal(wallet))} BTCY`)}
        {cell("Locked in orders", `${formatBtcy(locked)} BTCY`)}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Market (browse & buy)
// ---------------------------------------------------------------------------

function MarketTab({
  orders,
  loading,
  onBuy,
}: {
  orders: P2POrder[];
  loading: boolean;
  onBuy: (o: P2POrder) => void;
}) {
  const [sort, setSort] = useState<"price_asc" | "price_desc" | "amount_desc">(
    "price_asc",
  );
  const [method, setMethod] = useState<string>("all");

  const visible = useMemo(() => {
    let list = orders.filter((o) => o.status === "open");
    if (method !== "all")
      list = list.filter((o) => o.paymentMethods.includes(method));
    list = [...list].sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return b.amount - a.amount;
    });
    return list;
  }, [orders, sort, method]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Dropdown
          className="w-full sm:w-52"
          value={sort}
          onChange={(v) => setSort(v as typeof sort)}
          options={[
            { label: "Price: Low → High", value: "price_asc" },
            { label: "Price: High → Low", value: "price_desc" },
            { label: "Amount: High → Low", value: "amount_desc" },
          ]}
        />
        <Dropdown
          className="w-full sm:w-56"
          value={method}
          onChange={setMethod}
          options={[
            { label: "All payment methods", value: "all" },
            ...PAYMENT_METHODS.map((m) => ({ label: m, value: m })),
          ]}
        />
        <span className="ml-auto text-sm text-tertiary/70">
          {loading ? "Loading…" : `${visible.length} offer${visible.length === 1 ? "" : "s"}`}
        </span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-tertiary/70">
            <tr>
              <th className="px-4 py-3">Seller</th>
              <th className="px-4 py-3">BTCY</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((o) => (
              <tr key={o.id} className="border-t border-white/10">
                <td className="px-4 py-3 text-white">{o.sellerId}</td>
                <td className="px-4 py-3 text-white">{formatBtcy(o.amount)}</td>
                <td className="px-4 py-3 text-tertiary">
                  {formatPrice(o.price)}
                </td>
                <td className="px-4 py-3 font-semibold text-primary">
                  {formatUsd(orderTotal(o))}
                </td>
                <td className="px-4 py-3 text-tertiary">
                  {o.paymentMethods.join(", ")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <CustomButton2
                      image={CartButtonImage}
                      text="Buy"
                      onClick={() => onBuy(o)}
                      imageStyling="w-16 md:w-20"
                      ariaLabel="Buy"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {!loading && visible.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-tertiary/60"
                >
                  No open offers match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Sell (create order)
// ---------------------------------------------------------------------------

// Which structured fields a payment method needs, and how to label them.
type PaymentFieldKey =
  | "bankName"
  | "accountHolder"
  | "accountNumber"
  | "routingNumber"
  | "handle"
  | "walletAddress";

const PAYMENT_METHOD_FIELDS: Record<
  string,
  { key: PaymentFieldKey; label: string; placeholder: string }[]
> = {
  "Bank Transfer": [
    { key: "bankName", label: "Bank name", placeholder: "Chase" },
    { key: "accountHolder", label: "Account holder name", placeholder: "Jane Doe" },
    { key: "accountNumber", label: "Account number", placeholder: "000123456789" },
    { key: "routingNumber", label: "Routing number", placeholder: "021000021" },
  ],
  PayPal: [{ key: "handle", label: "PayPal email", placeholder: "you@example.com" }],
  Wise: [{ key: "handle", label: "Wise email", placeholder: "you@example.com" }],
  "Cash App": [{ key: "handle", label: "Cash App $Cashtag", placeholder: "$yourcashtag" }],
  // USDT's wallet-address field is built dynamically below, once a network
  // is picked — see USDT_NETWORKS and usdtFieldsFor().
};

// USDT networks offered once "USDT" is picked as the payment method. `tag`
// is composed into the payment-method string sent to the backend (e.g.
// "USDT (TRC20)") — kept as the exact strings the backend's
// createOffPlatformFiatSellOffer already parses, so no backend change was
// needed when this list grows.
const USDT_NETWORKS: { tag: string; label: string; placeholder: string }[] = [
  { tag: "TRC20", label: "Tron (TRC20)", placeholder: "T…" },
  { tag: "ERC20", label: "Ethereum (ERC20)", placeholder: "0x…" },
  { tag: "BEP20", label: "BNB Chain (BEP20)", placeholder: "0x…" },
  { tag: "Polygon", label: "Polygon", placeholder: "0x…" },
  { tag: "Solana", label: "Solana", placeholder: "Base58 address…" },
];

const usdtFieldsFor = (networkTag: string) => {
  const network = USDT_NETWORKS.find((n) => n.tag === networkTag) ?? USDT_NETWORKS[0];
  return [
    {
      key: "walletAddress" as const,
      label: `USDT (${network.tag}) wallet address`,
      placeholder: network.placeholder,
    },
  ];
};

// Which chain a USDT payment method's wallet address belongs to — every
// chain has a visually-similar-but-incompatible address format, so a
// wrong pick here would send funds to an address the buyer can't access.
// Kept in sync with the network detection in the backend's
// createOffPlatformFiatSellOffer (indexx-exchange-backend/platform/p2p.operations.ts).
type UsdtNetwork = "tron" | "evm" | "solana";

function detectUsdtNetwork(paymentMethod: string): UsdtNetwork | null {
  const m = paymentMethod.toUpperCase();
  if (m.includes("TRC20") || m.includes("TRON")) return "tron";
  if (m.includes("ERC20") || m.includes("BEP20") || m.includes("POLYGON") || m.includes("BSC")) return "evm";
  if (m.includes("SOLANA") || m.includes("SPL")) return "solana";
  return null;
}

function isValidSolanaAddress(address: string) {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

/** Validates a wallet address against the chain implied by the payment method. Returns true for non-wallet methods (nothing to check). */
function isValidUsdtWalletAddress(paymentMethod: string, address: string) {
  const network = detectUsdtNetwork(paymentMethod);
  if (!network) return true;
  const trimmed = address.trim();
  if (!trimmed) return false;
  switch (network) {
    case "tron":
      return TronWeb.utils.address.isAddress(trimmed);
    case "evm":
      return isValidEvmAddress(trimmed);
    case "solana":
      return isValidSolanaAddress(trimmed);
  }
}

function SellTab({
  available,
  submitting,
  onCreate,
}: {
  available: number;
  submitting: boolean;
  onCreate: (o: {
    amount: number;
    price: number;
    paymentMethod: string;
    paymentDetails: Record<string, string>;
  }) => void;
}) {
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("0.063");
  const [method, setMethod] = useState<string>("");
  const [usdtNetwork, setUsdtNetwork] = useState<string>(USDT_NETWORKS[0].tag);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const amountNum = parseFloat(amount) || 0;
  const priceNum = parseFloat(price) || 0;
  const total = amountNum * priceNum;
  const methodFields =
    method === "USDT" ? usdtFieldsFor(usdtNetwork) : method ? PAYMENT_METHOD_FIELDS[method] ?? [] : [];
  // The actual label sent to (and parsed by) the backend — USDT composes
  // in the chosen network, e.g. "USDT (TRC20)"; other methods pass through.
  const finalPaymentMethod = method === "USDT" ? `USDT (${usdtNetwork})` : method;

  const selectMethod = (m: string) => {
    setMethod(m);
    setUsdtNetwork(USDT_NETWORKS[0].tag);
    setFields({});
  };

  const selectUsdtNetwork = (tag: string) => {
    setUsdtNetwork(tag);
    setFields({});
  };

  const setField = (key: string, value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    if (amountNum <= 0) return setError("Enter a BTCY amount.");
    if (amountNum > available)
      return setError(
        `You can list at most ${formatBtcy(available)} BTCY.`,
      );
    if (priceNum <= 0) return setError("Enter a price per BTCY.");
    if (total < 10)
      return setError(
        `Minimum order value is $10 — increase the amount or price (currently ${formatUsd(total)}).`,
      );
    if (!method) return setError("Select a payment method.");
    if (methodFields.some((f) => !fields[f.key]?.trim()))
      return setError("Fill in all payment details for the buyer.");
    if (fields.walletAddress && !isValidUsdtWalletAddress(finalPaymentMethod, fields.walletAddress))
      return setError(
        `That doesn't look like a valid ${finalPaymentMethod} address. Double-check it — sending to the wrong chain can permanently lose funds.`,
      );
    setError(null);
    onCreate({
      amount: amountNum,
      price: priceNum,
      paymentMethod: finalPaymentMethod,
      paymentDetails: fields,
    });
    setAmount("");
    setMethod("");
    setUsdtNetwork(USDT_NETWORKS[0].tag);
    setFields({});
  };

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
        <div>
          <label className="mb-1 block text-sm text-tertiary">BTCY amount</label>
          <div className="flex items-center gap-2">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              placeholder="0"
              className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary"
            />
            <button
              onClick={() => setAmount(String(available))}
              className="rounded-xl border border-white/15 px-3 py-3 text-sm text-primary hover:border-primary"
            >
              Max
            </button>
          </div>
          <p className="mt-1 text-xs text-tertiary/60">
            Available to sell: {formatBtcy(available)} BTCY
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm text-tertiary">
            Price per BTCY (USD)
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
            inputMode="decimal"
            className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-tertiary">
            Payment method
          </label>
          <div className="flex flex-wrap gap-2">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m}
                onClick={() => selectMethod(m)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${method === m
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-white/15 text-tertiary hover:border-primary/60"
                  }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {method === "USDT" && (
          <div>
            <label className="mb-2 block text-sm text-tertiary">Network</label>
            <div className="flex flex-wrap gap-2">
              {USDT_NETWORKS.map((n) => (
                <button
                  key={n.tag}
                  onClick={() => selectUsdtNetwork(n.tag)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition ${usdtNetwork === n.tag
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-white/15 text-tertiary hover:border-primary/60"
                    }`}
                >
                  {n.label}
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-tertiary/60">
              Double-check the network — sending to the wrong chain can permanently lose funds.
            </p>
          </div>
        )}

        {methodFields.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-tertiary">Payment details for buyer</p>
            {methodFields.map((f) => (
              <div key={f.key}>
                <label className="mb-1 block text-xs text-tertiary/70">{f.label}</label>
                <input
                  value={fields[f.key] ?? ""}
                  onChange={(e) => setField(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-primary"
                />
              </div>
            ))}
            <p className="text-xs text-tertiary/60">
              Shown to the buyer once they take your order.
            </p>
          </div>
        )}

        <div className="rounded-xl bg-black/30 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-tertiary">Total</span>
            <span className="font-semibold text-primary">
              {formatUsd(total)}
            </span>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex justify-center">
          <CustomButton2
            image={SellButtonImage}
            text={submitting ? "Creating…" : "Create Order"}
            onClick={submit}
            imageStyling="w-28 md:w-32"
            ariaLabel="Create Order"
          />
        </div>
        <p className="text-center text-xs text-tertiary/60">
          Your BTCY is locked while the order is active and released to the buyer
          only after payment is confirmed.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: My Orders
// ---------------------------------------------------------------------------

function MyOrdersTab({
  orders,
  currentEmail,
  loading,
  onOpen,
}: {
  orders: P2POrder[];
  currentEmail: string;
  loading: boolean;
  onOpen: (o: P2POrder) => void;
}) {
  const email = currentEmail.toLowerCase();
  const asSeller = orders.filter((o) => o.sellerId.toLowerCase() === email);
  const asBuyer = orders.filter((o) => o.buyerId?.toLowerCase() === email);

  const list = (title: string, items: P2POrder[]) => (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tertiary/70">
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-tertiary/60">
          {loading ? "Loading…" : "Nothing here yet."}
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((o) => (
            <button
              key={o.id}
              onClick={() => onOpen(o)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-primary/50"
            >
              <div className="min-w-0">
                <p className="text-white">
                  {formatBtcy(o.amount)} BTCY · {formatUsd(orderTotal(o))}
                </p>
                <p className="text-xs text-tertiary/70">
                  {formatPrice(o.price)}/BTCY ·{" "}
                  {o.sellerId.toLowerCase() === email
                    ? `Buyer: ${o.buyerId ?? "—"}`
                    : `Seller: ${o.sellerId}`}
                </p>
                <p
                  className="mt-1 truncate font-mono text-[11px] text-tertiary/50"
                  title={o.id}
                >
                  {o.id}
                </p>
              </div>
              <StatusChip status={o.status} />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {list("Selling", asSeller)}
      {list("Buying", asBuyer)}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Trade Room modal (escrow lifecycle)
// ---------------------------------------------------------------------------

function TradeRoom({
  order,
  currentEmail,
  pendingAction,
  onClose,
  onAction,
}: {
  order: P2POrder;
  currentEmail: string;
  // Which action is currently in flight, if any — lets the specific
  // button that was clicked show its own loading label, instead of every
  // button in the popup just going dim with no feedback about which one
  // is actually doing something.
  pendingAction: TradeAction | null;
  onClose: () => void;
  onAction: (action: TradeAction, payload?: { paymentProofImage?: string }) => void;
}) {
  const actionLoading = pendingAction !== null;
  const role = roleOf(order, currentEmail);
  const s = order.status;

  // "I've Paid" requires a screenshot of the off-platform payment attached
  // first — the seller (and an admin, if this ends up disputed) needs
  // something to check against besides the buyer's word.
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [proofFileName, setProofFileName] = useState("");
  const [proofError, setProofError] = useState<string | null>(null);

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setProofError("Please attach an image (screenshot or photo).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setProofError("Image is too large — please attach a file under 8MB.");
      return;
    }
    setProofError(null);
    setProofFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setProofImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Lets either side of the trade view the payment receipt — the seller
  // needs to check it before confirming or disputing, the buyer can
  // confirm what they submitted. Opens in its own larger popup rather
  // than inline, so the receipt is actually legible. The presigned URL
  // expires in 1h, so it's fetched on demand rather than eagerly on open.
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [receiptLoading, setReceiptLoading] = useState(false);
  const [receiptError, setReceiptError] = useState<string | null>(null);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);
  // Tracks the <img> itself finishing rendering, not just the API call —
  // the skeleton should stay up until the browser has actually painted
  // the image, not just until we have a URL for it.
  const [receiptImageLoaded, setReceiptImageLoaded] = useState(false);

  const loadReceipt = async () => {
    if (!order.tradeId) return;
    setReceiptOpen(true);
    if (receiptUrl) return; // already fetched (and likely already rendered) this session
    setReceiptLoading(true);
    setReceiptError(null);
    setReceiptImageLoaded(false);
    const res = await getP2PTradePaymentProofUrl(order.tradeId);
    if (res.success) {
      setReceiptUrl(res.data.url);
    } else {
      setReceiptError(res.error || "Could not load the payment receipt.");
    }
    setReceiptLoading(false);
  };

  // Once a "replace_proof" submission finishes (success or failure —
  // either way the parent's handleAction has resolved by the time
  // pendingAction clears), drop the cached receipt URL and the file
  // picker's selection so the next "View Payment Receipt" click fetches
  // the new image instead of showing the stale cached one.
  const prevPendingActionRef = useRef<TradeAction | null>(null);
  useEffect(() => {
    if (prevPendingActionRef.current === "replace_proof" && pendingAction === null) {
      setReceiptUrl(null);
      setReceiptImageLoaded(false);
      setProofImage(null);
      setProofFileName("");
    }
    prevPendingActionRef.current = pendingAction;
  }, [pendingAction]);

  const downloadReceipt = async () => {
    if (!order.tradeId) return;
    setDownloadingReceipt(true);
    try {
      // Ask for a separate presigned URL with Content-Disposition:
      // attachment set server-side — S3 then forces a real download on
      // navigation regardless of the bucket's CORS policy, since CORS
      // only gates JS reads (fetch/XHR), not the browser just following
      // a link. No blob/fetch dance needed on this end.
      const res = await getP2PTradePaymentProofUrl(order.tradeId, { download: true });
      if (!res.success) throw new Error(res.error);
      const link = document.createElement("a");
      link.href = res.data.url;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setReceiptError("Could not start the download — try again in a moment.");
    } finally {
      setDownloadingReceipt(false);
    }
  };

  const Btn = ({
    label,
    loadingLabel,
    action,
    image,
    disabled,
  }: {
    label: string;
    loadingLabel?: string;
    action: TradeAction;
    image: typeof CheckMarkButtonImage;
    disabled?: boolean;
  }) => {
    const isThisPending = pendingAction === action;
    return (
      <CustomButton2
        image={image}
        text={isThisPending ? loadingLabel ?? "Submitting…" : label}
        disabled={disabled || actionLoading}
        onClick={() => {
          if (actionLoading || disabled) return;
          onAction(action, action === "pay" ? { paymentProofImage: proofImage ?? undefined } : undefined);
        }}
        imageStyling="w-24 md:w-28"
        ariaLabel={isThisPending ? loadingLabel ?? "Submitting…" : label}
      />
    );
  };

  // Actions available to the CURRENT user, given role + status.
  const myActions: React.ReactNode[] = [];
  const waitingMsg: string[] = [];
  let showProofUpload = false;
  let showReplaceProof = false;

  if (role === "seller") {
    if (s === "open") {
      myActions.push(
        <Btn key="c" label="Cancel" loadingLabel="Cancelling…" action="cancel" image={CancelOrderImage} />,
      );
      waitingMsg.push("Waiting for a buyer to accept your offer.");
    } else if (s === "payment_pending") {
      waitingMsg.push("Waiting for the buyer to send payment.");
    } else if (s === "payment_submitted") {
      myActions.push(
        <Btn key="cf" label="Confirm" loadingLabel="Confirming…" action="confirm" image={CheckMarkButtonImage} />,
        <Btn key="d" label="Dispute" loadingLabel="Submitting…" action="dispute" image={DisputeButtonImage} />,
      );
    } else if (s === "payment_confirmed") {
      waitingMsg.push("Finalizing BTCY release…");
    }
  } else if (role === "buyer") {
    if (s === "payment_pending") {
      showProofUpload = true;
      myActions.push(
        <Btn key="p" label="I've Paid" loadingLabel="Submitting…" action="pay" image={CheckMarkButtonImage} disabled={!proofImage} />,
        <Btn key="c" label="Cancel" loadingLabel="Cancelling…" action="cancel" image={CancelOrderImage} />,
      );
    } else if (s === "payment_submitted") {
      showReplaceProof = order.hasPaymentProof === true;
      myActions.push(
        <Btn key="d" label="Dispute" loadingLabel="Submitting…" action="dispute" image={DisputeButtonImage} />,
      );
      waitingMsg.push("Waiting for the seller to confirm your payment.");
    } else if (s === "payment_confirmed") {
      waitingMsg.push("Payment confirmed. Awaiting BTCY release.");
    }
  }

  return (
    <>
    <PopupComponent isOpen onClose={onClose}>
      <div className="w-[92vw] max-w-lg max-h-[80vh] overflow-y-auto p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">Trade Room</h2>
          <p className="text-xs text-tertiary/70">Order {order.id}</p>
        </div>

        <StatusTimeline status={order.status} />

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-black/30 p-4 text-sm">
          <div>
            <p className="text-tertiary/60">Amount</p>
            <p className="text-white">{formatBtcy(order.amount)} BTCY</p>
          </div>
          <div>
            <p className="text-tertiary/60">Price</p>
            <p className="text-white">{formatPrice(order.price)}/BTCY</p>
          </div>
          <div>
            <p className="text-tertiary/60">Total</p>
            <p className="font-semibold text-primary">
              {formatUsd(orderTotal(order))}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-tertiary/60">
              {role === "seller" ? "Buyer" : "Seller"}
            </p>
            <p className="break-all text-white">
              {role === "seller"
                ? order.buyerId ?? "—"
                : order.sellerId}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-tertiary/60">Payment method</p>
            <p className="text-white">{order.paymentMethods.join(", ")}</p>
          </div>
          {role === "buyer" && order.paymentDetails && (
            <div className="col-span-2 rounded-lg border border-primary/30 bg-primary/5 p-3">
              <p className="text-tertiary/60">Send payment to</p>
              <p className="font-medium text-primary">{order.paymentDetails}</p>
            </div>
          )}
        </div>

        {showProofUpload && (
          <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm text-white">Attach proof of payment</p>
            <p className="mt-1 text-xs text-tertiary/70">
              A screenshot or receipt of the payment you sent — required before you can mark this trade as paid.
            </p>
            <label className="mt-3 flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-primary/40 px-4 py-3 text-sm text-primary hover:bg-primary/10">
              {proofFileName || "Choose an image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProofChange}
              />
            </label>
            {proofError && <p className="mt-2 text-xs text-red-400">{proofError}</p>}
          </div>
        )}

        {order.hasPaymentProof && (
          <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
            <p className="text-sm text-white">
              {role === "seller" ? "Payment receipt from the buyer" : "Your payment receipt"}
            </p>
            <p className="mt-1 text-xs text-tertiary/70">
              {role === "seller"
                ? "Review the buyer’s screenshot before confirming or disputing."
                : "The screenshot you attached when you marked this trade as paid."}
            </p>
            <button
              type="button"
              onClick={loadReceipt}
              disabled={receiptLoading}
              className="mt-3 w-full rounded-lg border border-dashed border-primary/40 px-4 py-3 text-sm text-primary hover:bg-primary/10 disabled:opacity-60"
            >
              {receiptLoading ? "Loading receipt…" : "View Payment Receipt"}
            </button>
            {receiptError && !receiptOpen && <p className="mt-2 text-xs text-red-400">{receiptError}</p>}

            {showReplaceProof && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-xs text-tertiary/70">
                  Attached the wrong screenshot? Choose a new one to replace it.
                </p>
                <label className="mt-2 flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-primary/40 px-4 py-3 text-sm text-primary hover:bg-primary/10">
                  {proofFileName || "Choose a new image"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleProofChange} />
                </label>
                {proofError && <p className="mt-2 text-xs text-red-400">{proofError}</p>}
                <button
                  type="button"
                  disabled={!proofImage || pendingAction !== null}
                  onClick={() => {
                    if (!proofImage || pendingAction !== null) return;
                    onAction("replace_proof", { paymentProofImage: proofImage });
                  }}
                  className="mt-2 w-full rounded-lg bg-primary/20 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/30 disabled:opacity-40"
                >
                  {pendingAction === "replace_proof" ? "Replacing…" : "Replace Receipt"}
                </button>
              </div>
            )}
          </div>
        )}

        {waitingMsg.map((m, i) => (
          <p key={i} className="mt-4 text-sm text-primary">
            ⏳ {m}
          </p>
        ))}

        {(order.status === "admin_review" || order.status === "disputed") && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
            <p className="text-sm text-red-400">
              This trade is under admin review. Our support team will verify
              the evidence and resolve it — no action needed from you here.
            </p>
          </div>
        )}

        {myActions.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-8">
            {myActions}
          </div>
        )}
      </div>
    </PopupComponent>

    {receiptOpen && (
      <PopupComponent isOpen onClose={() => setReceiptOpen(false)}>
        <div className="w-[92vw] max-w-4xl max-h-[90vh] overflow-y-auto p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white">Payment Receipt</h2>
            <p className="text-xs text-tertiary/70">Order {order.id}</p>
          </div>

          {!receiptLoading && receiptError && !receiptUrl && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400">
              {receiptError}
            </div>
          )}

          {(receiptLoading || (receiptUrl && !receiptImageLoaded)) && (
            <div className="mx-auto h-[70vh] w-full animate-pulse rounded-xl bg-white/10" />
          )}

          {receiptUrl && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={receiptUrl}
                alt="Payment receipt"
                onLoad={() => setReceiptImageLoaded(true)}
                className={`mx-auto max-h-[70vh] w-full rounded-xl border border-white/10 object-contain ${
                  receiptImageLoaded ? "block" : "hidden"
                }`}
              />
              {receiptImageLoaded && (
                <div className="mt-5 flex flex-col items-center gap-2">
                  <CustomButton2
                    image={CheckMarkButtonImage}
                    text={downloadingReceipt ? "Downloading…" : "Download"}
                    disabled={downloadingReceipt}
                    onClick={downloadReceipt}
                    imageStyling="w-24 md:w-28"
                    ariaLabel="Download receipt"
                  />
                  {receiptError && (
                    <p className="max-w-sm text-center text-xs text-tertiary/70">{receiptError}</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </PopupComponent>
    )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function P2PMarketplacePage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const email = user?.email ?? "";

  const [wallet, setWallet] = useState<Wallet>({ purchased: 0, earned: 0 });
  const [walletLoading, setWalletLoading] = useState(false);

  const [marketOffers, setMarketOffers] = useState<P2PApiOffer[]>([]);
  const [marketLoading, setMarketLoading] = useState(false);

  const [myOffers, setMyOffers] = useState<P2PApiOffer[]>([]);
  const [myTrades, setMyTrades] = useState<P2PApiTrade[]>([]);
  const [myOrdersLoading, setMyOrdersLoading] = useState(false);

  const [tab, setTab] = useState<Tab>("market");
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
  const [sellSubmitting, setSellSubmitting] = useState(false);
  const [pendingAction, setPendingAction] = useState<TradeAction | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  // Require login as soon as the P2P page loads, matching the pattern used
  // on other login-gated pages (e.g. mining/nuclear-mining).
  useEffect(() => {
    if (!isAuthLoading && !user) {
      setIsLoginPopupOpen(true);
    }
  }, [isAuthLoading, user]);

  const refreshWallet = useCallback(async () => {
    if (!email) {
      setWallet({ purchased: 0, earned: 0 });
      return;
    }
    setWalletLoading(true);
    try {
      const res = await getP2PWalletSummary(email);
      if (res.success) setWallet(res.data);
    } finally {
      setWalletLoading(false);
    }
  }, [email]);

  const refreshMarket = useCallback(async () => {
    setMarketLoading(true);
    try {
      const res = await listP2PSellOffers();
      if (res.success) setMarketOffers(res.data);
    } finally {
      setMarketLoading(false);
    }
  }, []);

  const refreshMyOrders = useCallback(async () => {
    if (!email) {
      setMyOffers([]);
      setMyTrades([]);
      return;
    }
    setMyOrdersLoading(true);
    try {
      const [offersRes, tradesRes] = await Promise.all([
        listMyP2POffers(email),
        listMyP2PTrades(email),
      ]);
      if (offersRes.success) setMyOffers(offersRes.data);
      if (tradesRes.success) setMyTrades(tradesRes.data);
    } finally {
      setMyOrdersLoading(false);
    }
  }, [email]);

  useEffect(() => {
    if (isAuthLoading) return;
    refreshWallet();
    refreshMyOrders();
  }, [isAuthLoading, refreshWallet, refreshMyOrders]);

  useEffect(() => {
    refreshMarket();
  }, [refreshMarket]);

  const marketOrders = useMemo(
    () => marketOffers.map(offerToOpenOrder),
    [marketOffers],
  );

  // My orders = my trades (source of truth once a buyer has taken an offer)
  // plus my own offers that no trade exists for yet (still open, or cancelled
  // before anyone took them).
  const myOrders = useMemo(() => {
    const offerById = new Map(myOffers.map((o) => [o.offerId, o]));
    const tradeOrders = myTrades.map((t) => tradeToOrder(t, offerById.get(t.offerId)));
    const offerIdsWithTrades = new Set(myTrades.map((t) => t.offerId));
    const untakenOfferOrders = myOffers
      .filter((o) => !offerIdsWithTrades.has(o.offerId))
      .map(offerToOpenOrder);
    return [...tradeOrders, ...untakenOfferOrders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [myOffers, myTrades]);

  const lockedBtcy = useMemo(
    () =>
      myOrders
        .filter(
          (o) =>
            o.sellerId.toLowerCase() === email.toLowerCase() &&
            LOCKED_STATES.includes(o.status),
        )
        .reduce((sum, o) => sum + o.amount, 0),
    [myOrders, email],
  );
  // Purchased/earned already exclude BTCY locked in active offers/trades —
  // the backend debits the wallet at offer-creation time.
  const available = walletTotal(wallet);

  const openOrder = useMemo(
    () => myOrders.find((o) => o.id === openOrderId) ?? null,
    [myOrders, openOrderId],
  );

  const requireAuth = () => {
    if (!email) {
      setIsLoginPopupOpen(true);
      return false;
    }
    return true;
  };

  // Buy an open market offer -> creates a real trade on the backend.
  const handleBuy = async (o: P2POrder) => {
    if (!requireAuth()) return;
    setErrorMessage(null);
    const res = await createP2PTrade({
      email,
      offerId: o.id,
      fiatAmount: orderTotal(o),
      paymentMethod: o.paymentMethods[0],
    });
    if (!res.success) {
      setErrorMessage(res.error);
      return;
    }
    await Promise.all([refreshMarket(), refreshMyOrders()]);
    setTab("orders");
    setOpenOrderId(res.data.tradeId);
  };

  // Create a sell order -> escrow-locks BTCY on the backend (earned first).
  const handleCreate = async (data: {
    amount: number;
    price: number;
    paymentMethod: string;
    paymentDetails: Record<string, string>;
  }) => {
    if (!requireAuth()) return;
    setErrorMessage(null);
    setSellSubmitting(true);
    try {
      const res = await createP2PSellOffer({ email, ...data });
      if (!res.success) {
        setErrorMessage(res.error);
        return;
      }
      await Promise.all([refreshWallet(), refreshMyOrders(), refreshMarket()]);
      setTab("orders");
    } finally {
      setSellSubmitting(false);
    }
  };

  // Apply a trade-room action against the real backend, then refetch.
  const handleAction = async (
    action: TradeAction,
    payload?: { paymentProofImage?: string }
  ) => {
    if (!openOrder || !requireAuth()) return;
    if (action === "release" || action === "resolve_release" || action === "resolve_refund") {
      // "release" is folded into "confirm" on the backend; admin resolution
      // is handled from the admin dashboard, not this trade room.
      return;
    }
    setErrorMessage(null);
    setPendingAction(action);
    try {
      let res: { success: boolean; error?: string };
      if (action === "cancel") {
        res = openOrder.tradeId
          ? await cancelP2PTrade(openOrder.tradeId)
          : await cancelP2POffer(openOrder.id);
      } else if (action === "pay" && openOrder.tradeId) {
        if (!payload?.paymentProofImage) {
          setErrorMessage("Please attach proof of payment first.");
          return;
        }
        res = await markP2PTradeAsPaid(openOrder.tradeId, payload.paymentProofImage);
      } else if (action === "replace_proof" && openOrder.tradeId) {
        if (!payload?.paymentProofImage) {
          setErrorMessage("Please choose a new receipt image first.");
          return;
        }
        res = await replaceP2PPaymentProof(openOrder.tradeId, payload.paymentProofImage);
      } else if (action === "confirm" && openOrder.tradeId) {
        res = await confirmP2PTradePayment(openOrder.tradeId);
      } else if (action === "dispute" && openOrder.tradeId) {
        res = await createP2PDispute({
          email,
          tradeId: openOrder.tradeId,
          reason: "P2P trade dispute",
          description: "Raised by a participant from the P2P trade room.",
        });
      } else {
        return;
      }

      if (!res.success) {
        setErrorMessage(res.error ?? "Action failed");
      }

      // Only refetch what this specific action could actually have
      // changed. Marking paid, confirming, and disputing never touch the
      // current user's own wallet balance or the market listing (the
      // offer's already off the market by the time a trade exists) — the
      // status change alone is visible via myOrders. Only cancelling can
      // move BTCY back to a wallet, and only cancelling an untaken offer
      // (no tradeId yet) removes anything from the market.
      const refetches: Promise<unknown>[] = [refreshMyOrders()];
      if (action === "cancel") {
        refetches.push(refreshWallet());
        if (!openOrder.tradeId) refetches.push(refreshMarket());
      }
      await Promise.all(refetches);
    } finally {
      setPendingAction(null);
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "market", label: "Market" },
    { key: "sell", label: "Sell" },
    { key: "orders", label: "My Orders" },
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-tertiary mt-40">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">P2P Marketplace</h1>
        <p className="mt-1 text-tertiary/80">
          Trade BTCY directly with other users. Open to everyone — no referral or
          Mining Station requirement.
        </p>
      </header>

      <div className="space-y-5">
        <BalanceCard wallet={wallet} locked={lockedBtcy} />
        <BuybackRuleNote />

        {errorMessage && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-400">
            {errorMessage}
          </div>
        )}

        {/* Tabs — hand-drawn ovals, matching the Support page */}
        <div className="flex flex-wrap items-center justify-center md:gap-4">
          {tabs.map((t, index) => (
            <CustomButton
              key={t.key}
              index={index}
              text={t.label}
              handleButtonClick={() => setTab(t.key)}
              isActive={tab === t.key}
            />
          ))}
        </div>

        {tab === "market" && (
          <MarketTab orders={marketOrders} loading={marketLoading} onBuy={handleBuy} />
        )}
        {tab === "sell" && (
          <SellTab
            available={available}
            submitting={sellSubmitting}
            onCreate={handleCreate}
          />
        )}
        {tab === "orders" && (
          <MyOrdersTab
            orders={myOrders}
            currentEmail={email}
            loading={myOrdersLoading}
            onOpen={(o) => setOpenOrderId(o.id)}
          />
        )}
      </div>

      {openOrder && (
        <TradeRoom
          order={openOrder}
          currentEmail={email}
          pendingAction={pendingAction}
          onClose={() => setOpenOrderId(null)}
          onAction={handleAction}
        />
      )}

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onRegisterClick={() => setIsLoginPopupOpen(false)}
        onClose={() => setIsLoginPopupOpen(false)}
        onLoginSuccess={() => setIsLoginPopupOpen(false)}
      />
    </main>
  );
}
