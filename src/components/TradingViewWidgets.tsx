"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import TradingView widgets with SSR disabled
const TickerTape = dynamic(
  () => import("react-ts-tradingview-widgets").then((mod) => mod.TickerTape),
  {
    ssr: false,
    loading: () => <div className="h-8 bg-bg2 animate-pulse rounded" />,
  }
);

const AdvancedRealTimeChart = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then(
      (mod) => mod.AdvancedRealTimeChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-180 bg-bg2 animate-pulse rounded flex items-center justify-center">
        Loading Chart...
      </div>
    ),
  }
);

export default function TradingViewWidgets() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div>
        <div className="h-8 bg-bg2 animate-pulse rounded mb-4" />
        <div className="h-180 bg-bg2 animate-pulse rounded flex items-center justify-center">
          Loading Trading Interface...
        </div>
      </div>
    );
  }

  return (
    <div className="h-180 overflow-hidden">
      <TickerTape
        colorTheme="dark"
        symbols={[
          { proName: "BINANCE:BTCUSDT", title: "Bitcoin" },
          { proName: "BINANCE:ETHUSDT", title: "Ethereum" },
          { proName: "BINANCE:BNBUSDT", title: "Binance Coin" },
          { proName: "BINANCE:SOLUSDT", title: "Solana" },
          { proName: "BINANCE:LINKUSDT", title: "Chainlink" },
          { proName: "BINANCE:XRPUSDT", title: "XRP" },
          { proName: "BINANCE:ADAUSDT", title: "Cardano" },
          { proName: "BINANCE:DOGEUSDT", title: "Dogecoin" },
          { proName: "BINANCE:DOTUSDT", title: "Polkadot" },
          { proName: "NASDAQ:AMZN", title: "Amazon" },
          { proName: "NASDAQ:AAPL", title: "Apple" },
          { proName: "NASDAQ:GOOGL", title: "Google" },
          { proName: "NASDAQ:META", title: "Meta" },
          { proName: "NASDAQ:TSLA", title: "Tesla" },
        ]}
      />
      <AdvancedRealTimeChart
        toolbar_bg={"#f1f3f6"}
        symbol={"BTCUSDT"}
        width={"auto"}
        height={"640"}
        theme={"dark"}
        allow_symbol_change={false}
      />
    </div>
  );
}
