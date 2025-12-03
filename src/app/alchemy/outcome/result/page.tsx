"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, Share2, Flag, X } from "lucide-react";
import jsPDF from "jspdf";

import AlchemyLogo from "@/assets/images/alchemy/alchemy-logo.webp";
import ArtImage1 from "@/assets/images/alchemy/home/alchemyResult.png";
import PointingButtonImage from "@/assets/images/buttons/point-button.webp";
import CustomButton2 from "@/components/CustomButton2";
import WalletIcon from '@/assets/images/alchemy/home/walletIcon.png'
import ConvertIcon from '@/assets/images/alchemy/home/tryagain.png'
import { useAuth } from "@/contexts/AuthContext";
import LoginPopup from "@/components/LoginPopup";

const conversionSummary = {
    nuggets: "50,000",
    tokens: "+61",
    multiplier: "x0.23",
};

const transactionDetails = {
    transactionId: "TX-Z9MPC5925",
    stage: "Fortune Funnel",
    initialNuggets: "50,000",
    finalTokens: "61,234 BTCY",
    multiplierApplied: "x1.23",
    algorithmFactors: {
        stage: "Fortune Funnel",
        miningType: "Power Mining",
        referralImpact: "+2%"
    },
    completed: "Nov 14, 2025, 02:52 AM GMT+5",
    status: "Completed"
};

export default function AlchemyOutcomeResultPage() {
    const { user, isLoading } = useAuth();
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            setIsLoginPopupOpen(true);
        }
    }, [isLoading, user]);

    const handleLoginSuccess = () => setIsLoginPopupOpen(false);
    const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);
    const handleRegisterClick = () => setIsLoginPopupOpen(false);

    if (isLoading) {
        return <div className="mt-40 text-center text-3xl">Loading...</div>;
    }

    if (!user) {
        return (
            <>
                <div className="min-h-screen bg-bg0 text-white flex flex-col items-center justify-center px-6 py-20">
                    <div className="max-w-xl text-center space-y-4">
                        <h1 className="text-3xl md:text-4xl font-semibold">
                            Alchemy Result
                        </h1>
                        <p className="text-sm md:text-base text-tertiary">
                            Please log in to view your Alchemy result and related rewards.
                        </p>
                        <CustomButton2
                            text="Log in to continue"
                            image={WalletIcon}
                            imageStyling="w-20 md:w-30"
                            onClick={() => setIsLoginPopupOpen(true)}
                        />
                    </div>
                </div>
                <LoginPopup
                    isOpen={isLoginPopupOpen}
                    onClose={handleCloseLoginPopup}
                    onLoginSuccess={handleLoginSuccess}
                    onRegisterClick={handleRegisterClick}
                />
            </>
        );
    }

    const copyTransactionId = () => {
        navigator.clipboard.writeText(transactionDetails.transactionId);
    };

    const getShareText = () => {
        return `🎉 Alchemy Complete! I just converted ${conversionSummary.nuggets} Nuggets into ${conversionSummary.tokens} BTCY Tokens with a ${conversionSummary.multiplier} multiplier on Bitcoin-Yay! 🚀 #BitcoinYay #BTCY #Alchemy`;
    };

    const getShareUrl = () => {
        if (typeof window !== 'undefined') {
            return window.location.href;
        }
        return 'https://bitcoinyay.com';
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Bitcoin-Yay - Alchemy Result',
            text: getShareText(),
            url: getShareUrl(),
        };

        // Try Web Share API first (works on mobile and some desktop browsers)
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
                return;
            } catch (error) {
                // User cancelled or error occurred, fall through to share menu
                if ((error as Error).name !== 'AbortError') {
                    console.error('Error sharing:', error);
                }
            }
        }

        // Fallback: Show share menu
        setShowShareMenu(true);
    };

    const shareToSocial = (platform: string) => {
        const text = encodeURIComponent(getShareText());
        const url = encodeURIComponent(getShareUrl());

        let shareUrl = '';

        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${text} ${url}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
                break;
            case 'reddit':
                shareUrl = `https://reddit.com/submit?url=${url}&title=${text}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(`${getShareText()} ${getShareUrl()}`);
                setShowShareMenu(false);
                // You could add a toast notification here
                return;
            default:
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            setShowShareMenu(false);
        }
    };

    const downloadReceipt = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        let yPosition = margin;

        // Helper function to add text with word wrap
        const addText = (text: string, fontSize: number, isBold: boolean = false, color: [number, number, number] = [0, 0, 0]) => {
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", isBold ? "bold" : "normal");
            doc.setTextColor(color[0], color[1], color[2]);

            const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
            lines.forEach((line: string) => {
                if (yPosition > pageHeight - margin) {
                    doc.addPage();
                    yPosition = margin;
                }
                doc.text(line, margin, yPosition);
                yPosition += fontSize * 0.5;
            });
            yPosition += 5;
        };

        // Title
        addText("Bitcoin-Yay - Alchemy Receipt", 20, true, [255, 135, 40]);
        yPosition += 10;

        // Conversion Summary Section
        addText("Conversion Summary", 16, true);
        addText(`Nuggets: ${conversionSummary.nuggets}`, 12);
        addText(`BTCY Tokens: ${conversionSummary.tokens}`, 12);
        addText(`Multiplier: ${conversionSummary.multiplier}`, 12);
        yPosition += 10;

        // Transaction Details Section
        addText("Transaction Details", 16, true);
        addText(`Transaction ID: ${transactionDetails.transactionId}`, 12);
        addText(`Stage: ${transactionDetails.stage}`, 12);
        addText(`Initial Nuggets: ${transactionDetails.initialNuggets}`, 12);
        addText(`Final Tokens: ${transactionDetails.finalTokens}`, 12);
        addText(`Multiplier Applied: ${transactionDetails.multiplierApplied}`, 12, false, [255, 135, 40]);
        yPosition += 10;

        // Algorithm Factors
        addText("Algorithm Factors", 14, true);
        addText(transactionDetails.algorithmFactors.stage, 12);
        addText(`Mining Type: ${transactionDetails.algorithmFactors.miningType}`, 12);
        addText(`Referral Impact: ${transactionDetails.algorithmFactors.referralImpact}`, 12);
        yPosition += 10;

        // Status and Date
        addText(`Status: ${transactionDetails.status}`, 12, true);
        addText(`Completed: ${transactionDetails.completed}`, 12);
        yPosition += 10;

        // Footer
        yPosition = pageHeight - 40;
        addText("This is an automated receipt generated by Bitcoin-Yay.", 10, false, [150, 150, 150]);
        addText("For support, contact: support@bitcoinyay.com", 10, false, [150, 150, 150]);

        // Generate filename with transaction ID
        const filename = `Alchemy_Receipt_${transactionDetails.transactionId}.pdf`;
        doc.save(filename);
    };

    return (
        <div className="min-h-screen bg-bg0 text-white relative">
            {/* Main Content */}
            <div className="min-h-screen flex flex-col items-center px-6 py-20 text-center mt-20">
                <div className="max-w-4xl w-full flex flex-col items-center gap-10">
                    <div className="flex items-center gap-4">
                        <Image src={AlchemyLogo} alt="Alchemy Logo" className="w-16 h-16" />
                        <p className="text-3xl md:text-6xl font-semibold">Alchemy</p>
                    </div>

                    <div className="w-full flex justify-center">
                        <Image
                            src={ArtImage1}
                            alt="Alchemy Celebration"
                            className="w-64 md:w-96 object-contain"
                        />
                    </div>

                    <div>
                        <p className="text-xl md:text-2xl text-tertiary">
                            Alchemy Complete — <span className="text-white font-semibold">Congratulations!</span>
                        </p>
                    </div>

                    <div className="w-full grid gap-8 text-left md:text-center">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xl max-w-lg mx-auto w-full">
                            <div>
                                <p className="text-tertiary text-base">Nuggets</p>
                                <p className="text-4xl font-semibold">{conversionSummary.nuggets}</p>
                            </div>
                            <div className="text-4xl font-light">→</div>
                            <div>
                                <p className="text-tertiary text-base">BTCY Tokens</p>
                                <p className="text-4xl font-semibold text-green-400">
                                    {conversionSummary.tokens}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-primary font-semibold">
                            Multiplier: <span className="text-white">{conversionSummary.multiplier}</span>
                        </p>
                    </div>

                    <p className="text-base md:text-lg text-tertiary max-w-3xl">
                        Your Nuggets converted successfully through the Alchemy algorithm.
                        Congratulations — tokens have been credited to your Asset Wallet.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-30 w-full mt-20 max-w-lg">
                        <CustomButton2
                            text="Claim Token"
                            image={WalletIcon}
                            imageStyling="w-20 md:w-30"
                            link="/alchemy/claim"
                        />
                        <CustomButton2
                            text="Convert Again"
                            image={ConvertIcon}
                            imageStyling="w-20 md:w-30"
                            link="/alchemy"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 text-sm md:text-base text-tertiary">
                        <button
                            onClick={() => setShowSidebar(!showSidebar)}
                            className="hover:text-primary transition-colors"
                        >
                            View Details
                        </button>
                        <button
                            onClick={downloadReceipt}
                            className="hover:text-primary transition-colors"
                        >
                            Download Receipt
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            {showSidebar && (
                <>
                    {/* Overlay for mobile */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setShowSidebar(false)}
                    />

                    {/* Sidebar */}
                    <div className="fixed top-0 right-0 h-full w-full md:w-80 bg-bg1 border-l border-bg2 z-50 overflow-y-auto">
                        <div className="p-6">
                            {/* Close button */}
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold">Transaction Details</h3>
                                <button
                                    onClick={() => setShowSidebar(false)}
                                    className="p-2 hover:bg-bg2 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Transaction ID */}
                            <div className="mb-6">
                                <p className="text-sm text-tertiary mb-2">Transaction ID</p>
                                <div className="flex items-center gap-2 bg-bg2 border border-bg3 rounded-md p-3">
                                    <code className="text-sm flex-1">{transactionDetails.transactionId}</code>
                                    <button
                                        onClick={copyTransactionId}
                                        className="p-1.5 hover:bg-bg3 rounded transition-colors"
                                        title="Copy"
                                    >
                                        <Copy className="w-4 h-4 text-tertiary" />
                                    </button>
                                </div>
                            </div>

                            {/* Stage */}
                            <div className="mb-6">
                                <p className="text-sm text-tertiary mb-2">Stage</p>
                                <p className="text-base text-white">{transactionDetails.stage}</p>
                            </div>

                            {/* Initial Nuggets */}
                            <div className="mb-6">
                                <p className="text-sm text-tertiary mb-2">Initial Nuggets</p>
                                <p className="text-base text-white">{transactionDetails.initialNuggets}</p>
                            </div>

                            {/* Final Tokens */}
                            <div className="mb-6">
                                <p className="text-sm text-tertiary mb-2">Final Tokens</p>
                                <p className="text-base text-white">{transactionDetails.finalTokens}</p>
                            </div>

                            {/* Multiplier Applied */}
                            <div className="mb-6">
                                <p className="text-sm text-tertiary mb-2">Multiplier Applied</p>
                                <p className="text-lg font-semibold text-primary">{transactionDetails.multiplierApplied}</p>
                            </div>

                            {/* Algorithm Factors */}
                            <div className="mb-6">
                                <p className="text-sm text-tertiary mb-2">Algorithm Factors</p>
                                <div className="space-y-1">
                                    <p className="text-sm text-white">{transactionDetails.algorithmFactors.stage}</p>
                                    <p className="text-sm text-white">mining type: {transactionDetails.algorithmFactors.miningType}</p>
                                    <p className="text-sm text-white">referral impact: <span className="text-green-400">{transactionDetails.algorithmFactors.referralImpact}</span></p>
                                </div>
                            </div>

                            {/* Completed */}
                            <div className="mb-6">
                                <p className="text-sm text-tertiary mb-2">Completed</p>
                                <p className="text-sm text-white">{transactionDetails.completed}</p>
                            </div>

                            {/* Status */}
                            <div className="mb-8">
                                <p className="text-sm text-tertiary mb-2">Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    <p className="text-sm text-white">{transactionDetails.status}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleShare}
                                    className="w-full flex items-center justify-center gap-2 bg-bg2 hover:bg-bg3 border border-bg3 rounded-lg px-4 py-3 transition-colors"
                                >
                                    <Share2 className="w-4 h-4" />
                                    <span className="text-sm text-white">Share Result</span>
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 bg-bg2 hover:bg-bg3 border border-bg3 rounded-lg px-4 py-3 transition-colors">
                                    <Flag className="w-4 h-4" />
                                    <span className="text-sm text-white">Raise Dispute</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Share Menu Popup */}
            {showShareMenu && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => setShowShareMenu(false)}
                    />

                    {/* Share Menu */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-bg1 border border-bg2 rounded-lg p-6 max-w-md w-full">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold">Share Result</h3>
                                <button
                                    onClick={() => setShowShareMenu(false)}
                                    className="p-2 hover:bg-bg2 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => shareToSocial('twitter')}
                                    className="flex flex-col items-center gap-2 p-4 bg-bg2 hover:bg-bg3 border border-bg3 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    <span className="text-sm text-white">Twitter</span>
                                </button>

                                <button
                                    onClick={() => shareToSocial('facebook')}
                                    className="flex flex-col items-center gap-2 p-4 bg-bg2 hover:bg-bg3 border border-bg3 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    <span className="text-sm text-white">Facebook</span>
                                </button>

                                <button
                                    onClick={() => shareToSocial('linkedin')}
                                    className="flex flex-col items-center gap-2 p-4 bg-bg2 hover:bg-bg3 border border-bg3 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    <span className="text-sm text-white">LinkedIn</span>
                                </button>

                                <button
                                    onClick={() => shareToSocial('whatsapp')}
                                    className="flex flex-col items-center gap-2 p-4 bg-bg2 hover:bg-bg3 border border-bg3 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span className="text-sm text-white">WhatsApp</span>
                                </button>

                                <button
                                    onClick={() => shareToSocial('telegram')}
                                    className="flex flex-col items-center gap-2 p-4 bg-bg2 hover:bg-bg3 border border-bg3 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                    </svg>
                                    <span className="text-sm text-white">Telegram</span>
                                </button>

                                <button
                                    onClick={() => shareToSocial('copy')}
                                    className="flex flex-col items-center gap-2 p-4 bg-bg2 hover:bg-bg3 border border-bg3 rounded-lg transition-colors"
                                >
                                    <Copy className="w-6 h-6" />
                                    <span className="text-sm text-white">Copy Link</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function CTAButton({ href, text }: { href: string; text: string }) {
    return (
        <Link
            href={href}
            className="w-full md:w-auto flex flex-col items-center gap-4 text-white rounded-full px-8 py-5"
        >
            <Image
                src={PointingButtonImage}
                alt={text}
                className="w-14 h-14 object-contain"
            />
            <span className="text-lg font-semibold">{text}</span>
        </Link>
    );
}

