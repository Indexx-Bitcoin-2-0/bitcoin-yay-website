"use client";

import { useState } from "react";
import { Copy, ExternalLink, ArrowRight } from "lucide-react";
import CustomStyledConatiner from "@/components/CustomStyledContainer";

const contractData = [
    {
        network: "Solana",
        standard: "SPL",
        contract: "7RUbRcqvQ7gXNmfuxsoUoputPXT85fGzoPSu6xXi6U9p",
        explorer: "https://explorer.solana.com/address/7RUbRcqvQ7gXNmfuxsoUoputPXT85fGzoPSu6xXi6U9p",
        explorerName: "View on Solana Explorer",
        isActive: true,
    },
    {
        network: "Tron",
        standard: "TRC-20",
        contract: "TJVh7pdziZHNaEwfmBcwZN5JjuEjnN1xzB",
        explorer: "https://tronscan.org/#/token20/TJVh7pdziZHNaEwfmBcwZN5JjuEjnN1xzB",
        explorerName: "View on TRONSCAN",
        isActive: true,
    },
    {
        network: "Stellar",
        standard: "Stellar Asset",
        contract: "Coming Soon",
        explorer: "#",
        explorerName: "Stellar Expert",
        isActive: false,
    },
    {
        network: "Ethereum",
        standard: "ERC-20",
        contract: "Coming Soon",
        explorer: "#",
        explorerName: "Etherscan",
        isActive: false,
    },
    {
        network: "BSC",
        standard: "BEP-20",
        contract: "Coming Soon",
        explorer: "#",
        explorerName: "BSCScan",
        isActive: false,
    },
];

const notes = [
    "Always verify contract addresses through official Bitcoin-Yay channels before integrating into your application.",
    "These are mainnet contract addresses. For testnet addresses, please contact developer support.",
    "When integrating BTCY, ensure your application supports the specific token standard for each network.",
    "Future chains (Stellar, Ethereum, BSC) are planned and will be available soon.",
];

export default function BTCTokenContractsPage() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="mx-auto max-w-[90vw] lg:px-10 py-8 mt-40">
            {/* Hero Header */}
            <CustomStyledConatiner>
                <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300 md:leading-16">
                    BTCY Token Contracts
                </h1>
                <p className="text-sm md:text-lg font-normal text-tertiary my-4">
                    Official BTCY token contract addresses across supported blockchain networks.
                </p>
            </CustomStyledConatiner>

            {/* Table Section */}
            <div className="mt-20 md:mt-30">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-transparent border-collapse">
                        <thead>
                            <tr className="border-b border-bg2">
                                <th className="py-4 px-4 md:py-6 md:px-6 text-left text-sm md:text-base font-semibold text-white whitespace-nowrap">
                                    NETWORK
                                </th>
                                <th className="py-4 px-4 md:py-6 md:px-6 text-left text-sm md:text-base font-semibold text-white whitespace-nowrap">
                                    STANDARD
                                </th>
                                <th className="py-4 px-4 md:py-6 md:px-6 text-left text-sm md:text-base font-semibold text-white whitespace-nowrap">
                                    CONTRACT
                                </th>
                                <th className="py-4 px-4 md:py-6 md:px-6 text-left text-sm md:text-base font-semibold text-white whitespace-nowrap">
                                    EXPLORER
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {contractData.map((item, index) => (
                                <tr key={index} className="border-b border-bg2">
                                    <td className="py-4 px-4 md:py-6 md:px-6 text-sm md:text-base text-white whitespace-nowrap">
                                        {item.network}
                                    </td>
                                    <td className="py-4 px-4 md:py-6 md:px-6">
                                        {item.isActive ? (
                                            <span className="inline-block px-3 py-1.5 rounded-sm text-xs md:text-sm text-tertiary font-medium border border-bg2">
                                                {item.standard}
                                            </span>
                                        ) : (
                                            <span className="text-sm md:text-base text-[#86868B] inline-block px-3 py-1.5  rounded-sm text-xs md:text-sm   font-medium border border-bg2">
                                                {item.standard}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 md:py-6 md:px-6">
                                        {item.isActive ? (
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-sm md:text-base text-primary font-mono break-all">
                                                    {item.contract}
                                                </span>
                                                <button
                                                    onClick={() => copyToClipboard(item.contract, index)}
                                                    className="p-1.5 hover:bg-bg2 rounded transition-colors flex-shrink-0"
                                                    title="Copy"
                                                >
                                                    <Copy
                                                        className={`w-4 h-4 ${copiedIndex === index ? "text-primary" : "text-tertiary"
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-sm md:text-base text-[#86868B] italic">
                                                {item.contract}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 md:py-6 md:px-6">
                                        {item.isActive ? (
                                            <a
                                                href={item.explorer}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors w-fit"
                                            >
                                                <span className="text-sm md:text-base whitespace-nowrap">{item.explorerName}</span>
                                                <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                            </a>
                                        ) : (
                                            <span className="text-sm md:text-base text-[#86868B] italic">
                                                {item.explorerName}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Notes Section */}
            <div className="mt-20 md:mt-30">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">Notes</h2>
                <ul className="space-y-4 md:space-y-5">
                    {notes.map((note, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="text-primary mt-1 text-lg md:text-xl">•</span>
                            <p className="text-sm md:text-base text-tertiary flex-1 leading-relaxed">{note}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer Sections */}
            <div className="mt-20 md:mt-30 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Integration Guide */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg md:text-xl font-semibold text-white ">
                            Integration Guide
                        </h3>
                        <span className="text-primary text-sm font-medium">COMING SOON</span>
                    </div>

                    <p className="text-sm md:text-base text-tertiary leading-relaxed">
                        Learn how to integrate BTCY into your application
                    </p>
                </div>

                {/* API Reference */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg md:text-xl font-semibold text-white">
                            API Reference
                        </h3>
                        <span className="text-primary text-sm font-medium ">COMING SOON</span>
                    </div>
                    <p className="text-sm md:text-base text-tertiary leading-relaxed">
                        Complete API documentation for developers
                    </p>
                </div>

                {/* Get Support */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <a
                            href="/support"
                            className="flex items-center gap-2 text-lg md:text-xl font-semibold text-white mb-2 hover:text-primary transition-colors w-fit"
                        >
                            Get Support
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                    <p className="text-sm md:text-base text-tertiary leading-relaxed">
                        Contact our developer support team
                    </p>
                </div>
            </div>
        </div>
    );
}

