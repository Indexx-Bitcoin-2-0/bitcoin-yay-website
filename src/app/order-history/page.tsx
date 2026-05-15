"use client";

import { useEffect, useState } from "react";
import { Search, ArrowDownUp } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { BTCY_ORDER_HISTORY_ROUTE } from "@/routes";

type BtcyOrder = {
  orderid: string;
  date: string;
  type: "Buy" | "Sell" | string;
  btcyAmount: string;
  usdtAmount: string;
  walletAddress: string;
  status: string;
  rate?: number;
};

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<BtcyOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const { user, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    let isActive = true;

    const fetchOrders = async () => {
      if (isAuthLoading) {
        return;
      }

      if (!user?.email) {
        setOrders([]);
        setOrdersError(null);
        setOrdersLoading(false);
        return;
      }

      setOrdersLoading(true);
      setOrdersError(null);

      try {
        const response = await fetch(
          `${BTCY_ORDER_HISTORY_ROUTE}/${encodeURIComponent(user.email)}`
        );
        const result: unknown = await response.json();

        if (!response.ok) {
          throw new Error("Unable to load BTCY order history.");
        }

        if (!Array.isArray(result)) {
          throw new Error("BTCY order history response was invalid.");
        }

        if (isActive) {
          setOrders(result as BtcyOrder[]);
        }
      } catch (error) {
        if (!isActive) return;
        console.error("Failed to fetch BTCY order history:", error);
        setOrders([]);
        setOrdersError(
          error instanceof Error
            ? error.message
            : "Unable to load BTCY order history."
        );
      } finally {
        if (isActive) {
          setOrdersLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      isActive = false;
    };
  }, [user?.email, isAuthLoading]);

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === "All Orders" ||
      (activeTab === "Buy BTCY" && order.type === "Buy") ||
      (activeTab === "Sell BTCY" && order.type === "Sell");
    const normalizedSearch = searchQuery.toLowerCase();
    const matchesSearch =
      order.orderid.toLowerCase().includes(normalizedSearch) ||
      order.walletAddress.toLowerCase().includes(normalizedSearch);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen text-white pt-32 pb-20 px-4 md:px-8 lg:px-16 flex flex-col items-center select-none mt-10">
      {/* Header */}
      <div className="text-center mb-16 max-w-4xl">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Order History
          </h1>
          <p className="text-tertiary text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
            Track your BTCY buy and sell requests, view status, and check transaction details anytime.
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-7xl">
        {/* Tabs and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 ">
          <div className="flex gap-8 md:gap-12 overflow-x-auto no-scrollbar w-full md:w-auto">
            {["All Orders", "Buy BTCY", "Sell BTCY"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xl md:text-2xl font-semibold pb-4 transition-all relative whitespace-nowrap ${activeTab === tab ? "text-primary" : "text-white hover:text-primary/80"
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>


        </div>

        {/* Table Glass Container */}
        <div className="bg-bg1 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          {/* Table Header Section */}
          <div className="p-5 md:p-6 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h3 className="text-lg md:text-xl font-bold text-white/90">Order History</h3>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bg2 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              <button className="p-2.5 transition-all text-primary flex items-center justify-center cursor-pointer hover:opacity-50">
                <ArrowDownUp size={18} />
              </button>
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[1000px]">
              <thead>
                <tr className="b text-white/40 text-[11px] md:text-xs font-bold uppercase tracking-[0.1em]">
                  <th className="py-5 px-8">#ID</th>
                  <th className="py-5 px-8">Date</th>
                  <th className="py-5 px-8">Type</th>
                  <th className="py-5 px-8">BTCY Amount</th>
                  <th className="py-5 px-8">USDT Amount</th>
                  <th className="py-5 px-8">Wallet Address</th>
                  <th className="py-5 px-8">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {ordersLoading || isAuthLoading ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <span className="text-white/30 font-medium">
                        Loading order history...
                      </span>
                    </td>
                  </tr>
                ) : ordersError ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <span className="text-red-400 font-medium">
                        {ordersError}
                      </span>
                    </td>
                  </tr>
                ) : !user?.email ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <span className="text-white/30 font-medium">
                        Log in to view your BTCY order history.
                      </span>
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.orderid} className="hover:bg-white/[0.015] transition-colors group">
                      <td className="py-6 px-8 text-sm md:text-base font-semibold text-white/80">{order.orderid}</td>
                      <td className="py-6 px-8 text-sm text-white/50">{order.date}</td>
                      <td className="py-6 px-8 text-sm text-white/70">{order.type}</td>
                      <td className="py-6 px-8 text-sm md:text-lg font-bold text-primary">{order.btcyAmount}</td>
                      <td className="py-6 px-8 text-sm md:text-base font-semibold text-white/90">{order.usdtAmount}</td>
                      <td className="py-6 px-8">
                        <span className="font-mono text-[13px] text-white/40 bg-white/[0.03] px-2 py-1 rounded truncate block max-w-[120px] group-hover:text-white/60 transition-colors">
                          {order.walletAddress}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold ring-1 ring-inset ${order.status === "Completed"
                          ? "bg-primary/10 text-primary ring-primary/20"
                          : "bg-white/5 text-white/40 ring-white/10"
                          }`}>
                          {order.status}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search size={40} className="text-white/5 mb-2" />
                        <span className="text-white/30 font-medium">No orders found matching your criteria.</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 135, 40, 0.2);
        }
      `}</style>
    </div>
  );
}
