"use client";

import React, { useMemo, useState } from "react";
import BuybackRuleNote from "@/components/p2p/BuybackRuleNote";
import CustomButton from "@/components/CustomButton";
import CustomButton2 from "@/components/CustomButton2";
import Dropdown from "@/components/p2p/Dropdown";
import PopupComponent from "@/components/PopupComponent";
import CartButtonImage from "@/assets/images/buttons/cart-button.webp";
import SellButtonImage from "@/assets/images/buttons/price-tag-button.webp";
import CheckMarkButtonImage from "@/assets/images/buttons/check-mark-button.webp";
import CancelOrderImage from "@/assets/images/buttons/cancelOrder.svg";
import SendButtonImage from "@/assets/images/buttons/send-button.webp";
import DollarButtonImage from "@/assets/images/buttons/dollar-button.webp";
import DisputeButtonImage from "@/assets/images/buttons/customer_support.svg";
import RetryButtonImage from "@/assets/images/buttons/retry-button.webp";
import {
  CURRENT_USER,
  INITIAL_MARKET_ORDERS,
  INITIAL_MY_ORDERS,
  INITIAL_WALLET,
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
  nextStatus,
  orderTotal,
  p2pAvailable,
  roleOf,
  walletTotal,
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
            {formatBtcy(Math.max(0, walletTotal(wallet) - locked))} BTCY
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
  onBuy,
}: {
  orders: P2POrder[];
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
          {visible.length} offer{visible.length === 1 ? "" : "s"}
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
                <td className="px-4 py-3 text-white">{o.sellerName}</td>
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
            {visible.length === 0 && (
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

function SellTab({
  wallet,
  available,
  onCreate,
}: {
  wallet: Wallet;
  available: number;
  onCreate: (o: {
    amount: number;
    price: number;
    paymentMethods: string[];
    expiresInHours: number;
  }) => void;
}) {
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("0.063");
  const [methods, setMethods] = useState<string[]>([]);
  const [expiry, setExpiry] = useState("24");
  const [error, setError] = useState<string | null>(null);

  const amountNum = parseFloat(amount) || 0;
  const priceNum = parseFloat(price) || 0;
  const total = amountNum * priceNum;

  const toggleMethod = (m: string) =>
    setMethods((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    );

  const submit = () => {
    if (amountNum <= 0) return setError("Enter a BTCY amount.");
    if (amountNum > available)
      return setError(
        `You can list at most ${formatBtcy(available)} BTCY (rest is locked).`,
      );
    if (priceNum <= 0) return setError("Enter a price per BTCY.");
    if (methods.length === 0)
      return setError("Select at least one payment method.");
    setError(null);
    onCreate({
      amount: amountNum,
      price: priceNum,
      paymentMethods: methods,
      expiresInHours: parseInt(expiry, 10) || 24,
    });
    setAmount("");
    setMethods([]);
  };

  // Earned is spent first (buyback-eligible purchased BTCY is preserved).
  const fromEarned = Math.min(wallet.earned, amountNum);
  const fromPurchased = Math.max(0, amountNum - fromEarned);

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
            Payment methods
          </label>
          <div className="flex flex-wrap gap-2">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m}
                onClick={() => toggleMethod(m)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${methods.includes(m)
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-white/15 text-tertiary hover:border-primary/60"
                  }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-tertiary">
            Order expiry
          </label>
          <Dropdown
            value={expiry}
            onChange={setExpiry}
            options={[
              { label: "6 hours", value: "6" },
              { label: "12 hours", value: "12" },
              { label: "24 hours", value: "24" },
              { label: "48 hours", value: "48" },
            ]}
          />
        </div>

        <div className="rounded-xl bg-black/30 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-tertiary">Total</span>
            <span className="font-semibold text-primary">
              {formatUsd(total)}
            </span>
          </div>
          {amountNum > 0 && (
            <div className="mt-2 text-xs text-tertiary/70">
              Deducted from: {formatBtcy(fromEarned)} Earned
              {fromPurchased > 0
                ? ` + ${formatBtcy(fromPurchased)} Purchased`
                : ""}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex justify-center">
          <CustomButton2
            image={SellButtonImage}
            text="Create Order"
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
  onOpen,
}: {
  orders: P2POrder[];
  onOpen: (o: P2POrder) => void;
}) {
  const asSeller = orders.filter((o) => o.sellerId === CURRENT_USER.id);
  const asBuyer = orders.filter((o) => o.buyerId === CURRENT_USER.id);

  const list = (title: string, items: P2POrder[]) => (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-tertiary/70">
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-tertiary/60">
          Nothing here yet.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((o) => (
            <button
              key={o.id}
              onClick={() => onOpen(o)}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-primary/50"
            >
              <div>
                <p className="text-white">
                  {formatBtcy(o.amount)} BTCY · {formatUsd(orderTotal(o))}
                </p>
                <p className="text-xs text-tertiary/70">
                  {formatPrice(o.price)}/BTCY ·{" "}
                  {o.sellerId === CURRENT_USER.id
                    ? `Buyer: ${o.buyerName ?? "—"}`
                    : `Seller: ${o.sellerName}`}
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
  onClose,
  onAction,
}: {
  order: P2POrder;
  onClose: () => void;
  onAction: (action: TradeAction) => void;
}) {
  const role = roleOf(order);
  const s = order.status;

  // Trade-room actions render as CustomButton2 ovals: orange for primary,
  // grey (tertiary) for secondary/destructive.
  const Btn = ({
    label,
    action,
    image,
  }: {
    label: string;
    action: TradeAction;
    image: typeof CheckMarkButtonImage;
  }) => (
    <CustomButton2
      image={image}
      text={label}
      onClick={() => onAction(action)}
      imageStyling="w-24 md:w-28"
      ariaLabel={label}
    />
  );

  // Actions available to the CURRENT user, given role + status.
  const myActions: React.ReactNode[] = [];
  const waitingMsg: string[] = [];

  if (role === "seller") {
    if (s === "open") {
      myActions.push(
        <Btn key="c" label="Cancel" action="cancel" image={CancelOrderImage} />,
      );
      waitingMsg.push("Waiting for a buyer to accept your offer.");
    } else if (s === "payment_pending") {
      waitingMsg.push("Waiting for the buyer to send payment.");
    } else if (s === "payment_submitted") {
      myActions.push(
        <Btn key="cf" label="Confirm" action="confirm" image={CheckMarkButtonImage} />,
        <Btn key="d" label="Dispute" action="dispute" image={DisputeButtonImage} />,
      );
    } else if (s === "payment_confirmed") {
      myActions.push(
        <Btn key="r" label="Release" action="release" image={SendButtonImage} />,
      );
    }
  } else if (role === "buyer") {
    if (s === "payment_pending") {
      myActions.push(
        <Btn key="p" label="I've Paid" action="pay" image={CheckMarkButtonImage} />,
        <Btn key="c" label="Cancel" action="cancel" image={CancelOrderImage} />,
      );
    } else if (s === "payment_submitted") {
      myActions.push(
        <Btn key="d" label="Dispute" action="dispute" image={DisputeButtonImage} />,
      );
      waitingMsg.push("Waiting for the seller to confirm your payment.");
    } else if (s === "payment_confirmed") {
      waitingMsg.push("Payment confirmed. Awaiting BTCY release.");
    }
  }

  // Demo helper: advance the counterparty's step so the whole lifecycle is
  // walkable by a single person (removed once the backend drives both sides).
  const sim: { label: string; action: TradeAction } | null = (() => {
    if (role === "seller") {
      if (s === "open") return { label: "Sim: accept", action: "accept" };
      if (s === "payment_pending") return { label: "Sim: pay", action: "pay" };
    }
    if (role === "buyer") {
      if (s === "payment_submitted")
        return { label: "Sim: confirm", action: "confirm" };
      if (s === "payment_confirmed")
        return { label: "Sim: release", action: "release" };
    }
    return null;
  })();

  return (
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
          <div>
            <p className="text-tertiary/60">
              {role === "seller" ? "Buyer" : "Seller"}
            </p>
            <p className="text-white">
              {role === "seller"
                ? order.buyerName ?? "—"
                : order.sellerName}
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

        {waitingMsg.map((m, i) => (
          <p key={i} className="mt-4 text-sm text-primary">
            ⏳ {m}
          </p>
        ))}

        {order.status === "admin_review" && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
            <p className="text-sm text-red-400">
              This trade is under admin review. An admin will verify the
              evidence and resolve it.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-8">
              <Btn label="Release" action="resolve_release" image={SendButtonImage} />
              <Btn label="Refund" action="resolve_refund" image={DollarButtonImage} />
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-8">
          {myActions}
        </div>

        {sim && (
          <div className="mt-4 flex flex-col items-center border-t border-white/10 pt-4">
            <p className="mb-2 text-[11px] uppercase tracking-wide text-tertiary/50">
              Demo controls
            </p>
            <Btn label={sim.label} action={sim.action} image={RetryButtonImage} />
          </div>
        )}
      </div>
    </PopupComponent>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function P2PMarketplacePage() {
  const [wallet, setWallet] = useState<Wallet>(INITIAL_WALLET);
  const [marketOrders, setMarketOrders] =
    useState<P2POrder[]>(INITIAL_MARKET_ORDERS);
  const [myOrders, setMyOrders] = useState<P2POrder[]>(INITIAL_MY_ORDERS);
  const [tab, setTab] = useState<Tab>("market");
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
  const [orderCounter, setOrderCounter] = useState(1);

  const lockedBtcy = useMemo(
    () =>
      myOrders
        .filter(
          (o) =>
            o.sellerId === CURRENT_USER.id && LOCKED_STATES.includes(o.status),
        )
        .reduce((sum, o) => sum + o.amount, 0),
    [myOrders],
  );
  const available = Math.max(0, p2pAvailable(wallet) - lockedBtcy);

  const openOrder = useMemo(
    () => myOrders.find((o) => o.id === openOrderId) ?? null,
    [myOrders, openOrderId],
  );

  // Buy an open market offer → become the buyer, move it into My Orders.
  const handleBuy = (o: P2POrder) => {
    const matched: P2POrder = {
      ...o,
      buyerId: CURRENT_USER.id,
      buyerName: CURRENT_USER.name,
      status: "payment_pending",
    };
    setMarketOrders((prev) => prev.filter((x) => x.id !== o.id));
    setMyOrders((prev) => [matched, ...prev]);
    setTab("orders");
    setOpenOrderId(matched.id);
  };

  // Create a sell order → lock BTCY (earned first, purchased preserved).
  const handleCreate = (data: {
    amount: number;
    price: number;
    paymentMethods: string[];
    expiresInHours: number;
  }) => {
    const fromEarned = Math.min(wallet.earned, data.amount);
    const fromPurchased = Math.max(0, data.amount - fromEarned);
    const newOrder: P2POrder = {
      id: `ord_new_${orderCounter}`,
      sellerId: CURRENT_USER.id,
      sellerName: CURRENT_USER.name,
      amount: data.amount,
      price: data.price,
      paymentMethods: data.paymentMethods,
      status: "open",
      createdAt: new Date().toISOString(),
      expiresInHours: data.expiresInHours,
      source: { purchased: fromPurchased, earned: fromEarned },
    };
    setOrderCounter((c) => c + 1);
    setMyOrders((prev) => [newOrder, ...prev]);
    setTab("orders");
  };

  // Apply a trade action to the open order and mutate wallet on settlement.
  const handleAction = (action: TradeAction) => {
    if (!openOrder) return;
    const from = openOrder.status;
    const to = nextStatus(from, action);

    setMyOrders((prev) =>
      prev.map((o) => {
        if (o.id !== openOrder.id) return o;
        const updated: P2POrder = { ...o, status: to };
        // When a buyer accepts a seller's open order in the demo, attach a buyer.
        if (action === "accept" && !o.buyerId) {
          updated.buyerId = "u_demo_buyer";
          updated.buyerName = "Demo Buyer";
        }
        return updated;
      }),
    );

    // Settlement: seller's BTCY leaves the wallet once released/completed.
    const iAmSeller = openOrder.sellerId === CURRENT_USER.id;
    if (iAmSeller && (to === "completed" || to === "btcy_released")) {
      const src = openOrder.source ?? {
        earned: Math.min(wallet.earned, openOrder.amount),
        purchased: Math.max(0, openOrder.amount - wallet.earned),
      };
      setWallet((w) => ({
        purchased: Math.max(0, w.purchased - src.purchased),
        earned: Math.max(0, w.earned - src.earned),
      }));
    }

    if (action === "cancel" || to === "completed") {
      // keep the modal open so the user sees the final state; they can close it.
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
          <MarketTab orders={marketOrders} onBuy={handleBuy} />
        )}
        {tab === "sell" && (
          <SellTab wallet={wallet} available={available} onCreate={handleCreate} />
        )}
        {tab === "orders" && (
          <MyOrdersTab orders={myOrders} onOpen={(o) => setOpenOrderId(o.id)} />
        )}
      </div>

      {openOrder && (
        <TradeRoom
          order={openOrder}
          onClose={() => setOpenOrderId(null)}
          onAction={handleAction}
        />
      )}
    </main>
  );
}
