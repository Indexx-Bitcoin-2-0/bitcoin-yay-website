"use client";

import { useState } from "react";
import { Search, ArrowDownUp, ChevronDown } from "lucide-react";
import { CustomHeading } from "@/components/CustomTypography";

const mockOrders = [
  {
    id: "3287479",
    date: "26 February, 2026",
    type: "Buy",
    btcyAmount: "700 BTCY",
    usdtAmount: "$8,354.83",
    walletAddress: "0x8F3...92Kd",
    status: "Completed",
  },
  {
    id: "2356375",
    date: "23 January, 2026",
    type: "Sell",
    btcyAmount: "100 BTCY",
    usdtAmount: "$6,893.82",
    walletAddress: "0x6Aa...71Pc",
    status: "Completed",
  },
  {
    id: "1787678",
    date: "10 December, 2025",
    type: "Sell",
    btcyAmount: "1,000 BTCY",
    usdtAmount: "$10,556.51",
    walletAddress: "0x4Ce...18Lm",
    status: "Processing",
  },
  {
    id: "0567889",
    date: "7 November, 2025",
    type: "Buy",
    btcyAmount: "2500 BTCY",
    usdtAmount: "$9,555.38",
    walletAddress: "0x6Aa...71Pc",
    status: "Completed",
  },
  {
    id: "2345678",
    date: "18 October, 2025",
    type: "Buy",
    btcyAmount: "300 BTCY",
    usdtAmount: "$7,798.26",
    walletAddress: "0x4A7...92Kd",
    status: "Processing",
  },
];

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesTab =
      activeTab === "All Orders" ||
      (activeTab === "Buy BTCY" && order.type === "Buy") ||
      (activeTab === "Sell BTCY" && order.type === "Sell");
    const matchesSearch =
      order.id.includes(searchQuery) ||
      order.walletAddress.toLowerCase().includes(searchQuery.toLowerCase());
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
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/[0.015] transition-colors group">
                      <td className="py-6 px-8 text-sm md:text-base font-semibold text-white/80">{order.id}</td>
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
