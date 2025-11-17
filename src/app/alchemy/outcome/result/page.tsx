import Image from "next/image";
import Link from "next/link";

import AlchemyLogo from "@/assets/images/alchemy/alchemy-logo.webp";
import ArtImage1 from "@/assets/images/alchemy/home/alchemyResult.png";
import PointingButtonImage from "@/assets/images/buttons/point-button.webp";
import CustomButton2 from "@/components/CustomButton2";
import WalletIcon from '@/assets/images/alchemy/home/walletIcon.png'
import ConvertIcon from '@/assets/images/alchemy/home/tryagain.png'
const conversionSummary = {
    nuggets: "50,000",
    tokens: "+61",
    multiplier: "x0.23",
};

export default function AlchemyOutcomeResultPage() {
    return (
        <div className="min-h-screen bg-bg0 text-white flex flex-col items-center px-6 py-20 text-center mt-20">
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
                        text="Review Your wallet"
                        image={WalletIcon}
                        imageStyling="w-20 md:w-30"
                        link="#"
                    />
                    <CustomButton2
                        text="Convert Again"
                        image={ConvertIcon}
                        imageStyling="w-20 md:w-30"
                        link="/alchemy"
                    />
                </div>

                {/* <div className="flex flex-col md:flex-row gap-4 text-sm md:text-base text-tertiary">
                    <Link href="/alchemy/outcome/result/details" className="hover:text-primary">
                        👁️ View Details
                    </Link>
                    <Link href="/alchemy/outcome/result/receipt" className="hover:text-primary">
                        🧾 Download Receipt
                    </Link>
                </div> */}
            </div>
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

