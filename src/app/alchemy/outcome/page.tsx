"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AlchemyGatewayIcon1 from "@/assets/images/alchemy/alchemy-gateway-logo.webp";
import AlchemyLogo from "@/assets/images/alchemy/alchemy-logo.webp";
import { motion } from "framer-motion";
import ClickConvertIcon from "@/assets/images/alchemy/home/click&convert.svg";
export default function AlchemyOutcomePage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/alchemy/outcome/result");
        }, 60 * 60 * 1000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="bg-bg0 text-white flex flex-col items-center justify-center px-6 py-20 text-center mt-20">
            <div className="max-w-3xl w-full flex flex-col items-center gap-10">
                <div>
                    <div className="flex items-center gap-4 justify-center">
                        <Image
                            src={AlchemyLogo}
                            alt="Alchemy Logo"
                            className="w-16 md:w-16"
                        />
                        <p className="text-3xl md:text-6xl font-semibold"> Alchemy</p>


                    </div>
                    <p className="mt-4 text-base md:text-xl text-tertiary">
                        Analyzing your Nuggets using the BTCY Alchemy Algorithm…
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className=" inset-0 flex items-center justify-center">
                        <motion.div
                            className="relative w-36 h-36"
                            animate={{
                                scale: [1, 1.08, 1],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {/* Logo glow - orange + gold */}
                            <div
                                className="absolute inset-0 rounded-full blur-[50px]"
                                style={{
                                    background: "radial-gradient(circle, rgba(255,135,40,0.5) 0%, rgba(255,215,0,0.3) 100%)",
                                }}
                            />
                            {/* Logo image */}
                            <Image
                                src={ClickConvertIcon}
                                alt="BTCY Logo"
                                className="relative z-10 w-full h-full object-contain"
                                style={{
                                    filter: "drop-shadow(0 0 25px rgba(255,135,40,0.7))",
                                }}
                            />
                        </motion.div>
                    </div>
                    <p className="text-2xl md:text-3xl font-semibold mt-10">
                        Outcome Now Being Calculated
                    </p>
                    <p className="text-base md:text-base text-tertiary max-w-2xl">
                        We’re evaluating your mining history, stage level, activity strength,
                        and referral impact. Your final result may be a gain, neutral output,
                        or loss, depending on the preset algorithm.
                    </p>
                </div>

                <div className="w-full max-w-2xl mt-4">
                    <div className="h-1 bg-bg2 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary/70 animate-progress" />
                    </div>
                    <p className="mt-6 text-sm md:text-base text-tertiary">
                        Estimated Time
                    </p>
                    <p className="text-lg md:text-xl font-semibold">Up to 60 minutes</p>
                    <p className="mt-2 text-sm text-tertiary">
                        Nuggets are locked during active Alchemy.
                    </p>
                </div>
            </div>

            <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-progress {
          animation: progress 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}

