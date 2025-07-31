"use client";

import { useState } from "react";

interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

interface Trade {
  price: number;
  size: number;
  time: string;
  side: "buy" | "sell";
}

// Dummy data for order book
const sellOrders: OrderBookEntry[] = [
  { price: 43.591, size: 73.99, total: 354.92 },
  { price: 43.59, size: 17.91, total: 280.93 },
  { price: 43.589, size: 19.66, total: 263.02 },
  { price: 43.588, size: 22.42, total: 243.36 },
  { price: 43.587, size: 93.86, total: 220.94 },
  { price: 43.586, size: 7.19, total: 127.08 },
  { price: 43.584, size: 22.42, total: 119.89 },
  { price: 43.583, size: 30.0, total: 97.47 },
  { price: 43.579, size: 22.42, total: 67.47 },
  { price: 43.578, size: 11.99, total: 45.05 },
  { price: 43.574, size: 33.06, total: 33.06 },
];

const buyOrders: OrderBookEntry[] = [
  { price: 43.572, size: 10.12, total: 10.12 },
  { price: 43.567, size: 30.0, total: 40.12 },
  { price: 43.566, size: 41.48, total: 81.6 },
  { price: 43.565, size: 117.81, total: 199.41 },
  { price: 43.561, size: 69.36, total: 268.77 },
  { price: 43.56, size: 7.92, total: 276.69 },
  { price: 43.559, size: 397.26, total: 673.95 },
  { price: 43.557, size: 67.81, total: 741.76 },
];

// Dummy data for trades
const recentTrades: Trade[] = [
  { price: 43.572, size: 15.5, time: "12:34:56", side: "buy" },
  { price: 43.574, size: 8.2, time: "12:34:55", side: "sell" },
  { price: 43.571, size: 25.0, time: "12:34:54", side: "buy" },
  { price: 43.573, size: 12.75, time: "12:34:53", side: "sell" },
  { price: 43.57, size: 30.0, time: "12:34:52", side: "buy" },
  { price: 43.575, size: 18.25, time: "12:34:51", side: "sell" },
  { price: 43.569, size: 22.5, time: "12:34:50", side: "buy" },
  { price: 43.576, size: 5.75, time: "12:34:49", side: "sell" },
];

export default function OrderBook() {
  const [activeTab, setActiveTab] = useState<"orderbook" | "trades">(
    "orderbook"
  );

  const spread = 0.002;
  const spreadPercentage = 0.005;
  const maxTotal = Math.max(
    ...sellOrders.map((o) => o.total),
    ...buyOrders.map((o) => o.total)
  );

  const formatNumber = (num: number, decimals: number = 3) => {
    return num.toFixed(decimals);
  };

  const OrderBookRow = ({
    order,
    type,
  }: {
    order: OrderBookEntry;
    type: "sell" | "buy";
  }) => {
    const barWidth = (order.total / maxTotal) * 100;

    return (
      <div className="relative flex items-center justify-between my-1 py-1 px-2 text-xs transition-colors">
        {/* Background bar */}
        <div
          className={`absolute left-0 top-0 h-full ${
            type === "sell" ? "bg-red-900/20" : "bg-green-900/20"
          }`}
          style={{ width: `${barWidth}%` }}
        />

        {/* Content */}
        <div className="relative z-10 flex w-full justify-between">
          <span
            className={` ${
              type === "sell" ? "text-red-400" : "text-green-400"
            }`}
          >
            {formatNumber(order.price)}
          </span>
          <span className="text-tertiary">{formatNumber(order.size, 2)}</span>
          <span className="text-tertiary">{formatNumber(order.total, 2)}</span>
        </div>
      </div>
    );
  };

  const TradeRow = ({ trade }: { trade: Trade }) => (
    <div className="flex items-center justify-between py-1 px-2 text-xs hover:bg-bg transition-colors">
      <span
        className={`font-mono ${
          trade.side === "sell" ? "text-red-400" : "text-green-400"
        }`}
      >
        {formatNumber(trade.price)}
      </span>
      <span className="text-tertiary">{formatNumber(trade.size, 2)}</span>
      <span className="text-xs text-tertiary">{trade.time}</span>
    </div>
  );

  return (
    <div className="bg-bg2 h-124 flex flex-col">
      {/* Tabs */}
      <div className="flex">
        <button
          onClick={() => setActiveTab("orderbook")}
          className={`flex-1 pt-3 pb-1 px-4 text-sm font-medium transition-colors relative cursor-pointer ${
            activeTab === "orderbook"
              ? "text-primary"
              : " hover:text-primary"
          }`}
        >
          Order Book
          {/* {activeTab === "orderbook" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-primary"></div>
          )} */}
        </button>
        <button
          onClick={() => setActiveTab("trades")}
          className={`flex-1 pt-3 pb-1 px-4 text-sm font-medium transition-colors relative cursor-pointer ${
            activeTab === "trades"
              ? "text-primary"
              : " hover:text-primary"
          }`}
        >
          Trades
          {/* {activeTab === "trades" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-primary"></div>
          )} */}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden border-">
        {activeTab === "orderbook" ? (
          <div className="h-full flex flex-col">
            {/* Headers */}
            <div className="flex justify-between py-2 px-2 text-xs text-tertiary border-b">
              <span>Price</span>
              <span>Size (HYPE)</span>
              <span>Total (HYPE)</span>
            </div>

            {/* Sell Orders */}
            <div className="flex-1 overflow-hidden">
              {sellOrders.map((order, index) => (
                <OrderBookRow key={`sell-${index}`} order={order} type="sell" />
              ))}
            </div>

            {/* Spread */}
            <div className="py-2 px-2 bg-bg/50">
              <div className="flex justify-center gap-20 items-center text-xs">
                <span className="text-tertiary">Spread</span>
                <span className="text-secondary">{formatNumber(spread)}</span>
                <span className="text-secondary">
                  {spreadPercentage.toFixed(3)}%
                </span>
              </div>
            </div>

            {/* Buy Orders */}
            <div className="flex-1 overflow-hidden">
              {buyOrders.map((order, index) => (
                <OrderBookRow key={`buy-${index}`} order={order} type="buy" />
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Headers */}
            <div className="flex justify-between py-2 px-2 text-xs text-tertiary">
              <span>Price</span>
              <span>Size</span>
              <span>Time</span>
            </div>

            {/* Trades */}
            <div className="flex-1 overflow-y-auto">
              {recentTrades.map((trade, index) => (
                <TradeRow key={index} trade={trade} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
