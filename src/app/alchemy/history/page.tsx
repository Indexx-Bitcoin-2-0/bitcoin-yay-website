"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

const transactions = [
    {
        id: "TX-Z9MPC59Z5",
        stage: "Fortune Funnel",
        initialNuggets: "50,000",
        finalTokens: "61,234 BTCY",
        multiplier: "x1.23",
        algorithmFactors: {
            stage: "Fortune Funnel",
            miningType: "Power Mining",
            referralImpact: "+2%",
        },
        completed: "Nov 14, 2025, 02:52 AM GMT+5",
        status: "Completed",
    },
    {
        id: "TX-A8KLM32X7",
        stage: "Mystic Matrix",
        initialNuggets: "75,000",
        finalTokens: "98,550 BTCY",
        multiplier: "x1.31",
        algorithmFactors: {
            stage: "Mystic Matrix",
            miningType: "Speed Mining",
            referralImpact: "+5%",
        },
        completed: "Nov 13, 2025, 11:23 PM GMT+5",
        status: "Completed",
    },
    {
        id: "TX-B7NPQ45W9",
        stage: "Fortune Funnel",
        initialNuggets: "30,000",
        finalTokens: "35,400 BTCY",
        multiplier: "x1.18",
        algorithmFactors: {
            stage: "Fortune Funnel",
            miningType: "Standard Mining",
            referralImpact: "+1%",
        },
        completed: "Nov 12, 2025, 06:15 PM GMT+5",
        status: "Completed",
    },
    {
        id: "TX-C6DRS89T2",
        stage: "Wealth Weaver",
        initialNuggets: "100,000",
        finalTokens: "145,000 BTCY",
        multiplier: "x1.45",
        algorithmFactors: {
            stage: "Wealth Weaver",
            miningType: "Power Mining",
            referralImpact: "+8%",
        },
        completed: "Nov 11, 2025, 01:42 PM GMT+5",
        status: "Completed",
    },
    {
        id: "TX-D5ETU12V3",
        stage: "Fortune Funnel",
        initialNuggets: "25,000",
        finalTokens: "28,750 BTCY",
        multiplier: "x1.15",
        algorithmFactors: {
            stage: "Fortune Funnel",
            miningType: "Standard Mining",
            referralImpact: "+0%",
        },
        completed: "Nov 10, 2025, 09:30 AM GMT+5",
        status: "Completed",
    },
    {
        id: "TX-E4FVW56Y8",
        stage: "Mystic Matrix",
        initialNuggets: "60,000",
        finalTokens: "81,600 BTCY",
        multiplier: "x1.36",
        algorithmFactors: {
            stage: "Mystic Matrix",
            miningType: "Power Mining",
            referralImpact: "+4%",
        },
        completed: "Nov 09, 2025, 04:18 PM GMT+5",
        status: "Completed",
    },
];

export default function AlchemyHistoryPage() {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-bg0 text-white">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 py-8 md:py-12 mt-40">
                {/* Header */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                        Alchemy History
                    </h1>
                    <p className="text-sm md:text-base text-tertiary">
                        View all your Nuggets to Tokens conversion transactions
                    </p>
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full bg-transparent border-collapse">
                        <thead>
                            <tr className="border-b border-bg2">
                                <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                                    Transaction ID
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                                    Stage
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                                    Initial Nuggets
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                                    Final Tokens
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                                    Multiplier
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                                    Algorithm Factors
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                                    Completed
                                </th>
                                <th className="py-4 px-4 text-left text-sm font-semibold text-white whitespace-nowrap">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index} className="border-b border-bg2">
                                    <td className="py-10 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-white font-mono">
                                                {transaction.id}
                                            </span>
                                            <button
                                                onClick={() => copyToClipboard(transaction.id, transaction.id)}
                                                className="p-1 hover:bg-bg2 rounded transition-colors"
                                                title="Copy"
                                            >
                                                <Copy
                                                    className={`w-4 h-4 ${copiedId === transaction.id ? "text-primary" : "text-tertiary"
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-white">
                                        {transaction.stage}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-white">
                                        {transaction.initialNuggets}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-white">
                                        {transaction.finalTokens}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-primary font-semibold">
                                        {transaction.multiplier}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-white">
                                        {transaction.algorithmFactors.stage} • mining type: {transaction.algorithmFactors.miningType} • referral impact:{" "}
                                        <span >{transaction.algorithmFactors.referralImpact}</span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-white">
                                        {transaction.completed}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                            <span className="text-sm text-white">{transaction.status}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {transactions.map((transaction, index) => (
                        <div
                            key={index}
                            className=" border border-bg2 rounded-lg p-5 space-y-4"
                        >
                            {/* Transaction ID and Status */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className="text-sm text-white font-mono">
                                        {transaction.id}
                                    </span>
                                    <button
                                        onClick={() => copyToClipboard(transaction.id, transaction.id)}
                                        className="p-1 hover:bg-bg2 rounded transition-colors flex-shrink-0"
                                        title="Copy"
                                    >
                                        <Copy
                                            className={`w-4 h-4 ${copiedId === transaction.id ? "text-primary" : "text-tertiary"
                                                }`}
                                        />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    <span className="text-sm text-white">{transaction.status}</span>
                                </div>
                            </div>

                            {/* Stage */}
                            <div>
                                <p className="text-xs text-tertiary mb-1">Stage</p>
                                <p className="text-sm text-white">{transaction.stage}</p>
                            </div>

                            {/* Multiplier */}
                            <div>
                                <p className="text-xs text-tertiary mb-1">Multiplier</p>
                                <p className="text-sm text-primary font-semibold">{transaction.multiplier}</p>
                            </div>

                            {/* Initial Nuggets */}
                            <div>
                                <p className="text-xs text-tertiary mb-1">Initial Nuggets</p>
                                <p className="text-sm text-white">{transaction.initialNuggets}</p>
                            </div>

                            {/* Final Tokens */}
                            <div>
                                <p className="text-xs text-tertiary mb-1">Final Tokens</p>
                                <p className="text-sm text-white">{transaction.finalTokens}</p>
                            </div>

                            {/* Algorithm Factors */}
                            <div>
                                <p className="text-xs text-tertiary mb-1">Algorithm Factors</p>
                                <p className="text-sm text-white">
                                    {transaction.algorithmFactors.stage} • mining type: {transaction.algorithmFactors.miningType} • referral impact:{" "}
                                    <span>{transaction.algorithmFactors.referralImpact}</span>
                                </p>
                            </div>

                            {/* Completed */}
                            <div>
                                <p className="text-xs text-tertiary mb-1">Completed</p>
                                <p className="text-sm text-white">{transaction.completed}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

