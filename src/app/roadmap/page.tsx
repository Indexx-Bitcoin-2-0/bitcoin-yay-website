"use client";

import Image, { StaticImageData } from "next/image";
import { ReactNode, useRef } from "react";

import CustomStyledConatiner from "@/components/CustomStyledContainer";

import ArtImage from "@/assets/images/roadmap/art-1.svg";
import GopherArt1 from "@/assets/images/roadmap/gopher-01.svg";
import GopherArt2 from "@/assets/images/roadmap/gopher-02.svg";
import HelmetArt from "@/assets/images/roadmap/helmet01.svg";

import AppsButtonIcon from "@/assets/images/roadmap/apps-button-icon.svg";
import PlatformButtonIcon from "@/assets/images/roadmap/platforms-button-icon.svg";

import BitcoinYayLogo from "@/assets/images/roadmap/bitcoin-yay-logo.svg";
import ChatLogo from "@/assets/images/roadmap/chat-white.svg";
import BitcoinYayCartLogo from "@/assets/images/roadmap/bitcoin-yay-cart.svg";
import SupportGopherLogo from "@/assets/images/roadmap/gopher-call-art.svg";
import ExplorerLogo from "@/assets/images/roadmap/explore-oval.svg";
import BrowserLogo from "@/assets/images/roadmap/browser-oval.svg";
import ChatLogoOval from "@/assets/images/roadmap/chat-oval.svg";
import BrainStromLogo from "@/assets/images/roadmap/brainstorm-oval.svg";

const PhaseCard = ({
  image,
  title,
  subTitle,
  desc,
}: {
  image: StaticImageData;
  title: string;
  subTitle: string;
  desc: string;
}) => {
  return (
    <div className="flex flex-col items-center lg:items-start justify-center p-4 max-w-[500px]">
      <Image src={image} alt={title} className="w-80 h-80 mb-4" />
      <div className="flex flex-col items-start justify-center">
        <h2 className="text-4xl lg:text-6xl font-bold">{title}</h2>
        <h3 className="text-2xl lg:text-4xl font-bold py-2">{subTitle}</h3>
        <p className="text-base mt-2">{desc}</p>
      </div>
    </div>
  );
};

const CustomCard = ({
  title,
  desc,
  image,
}: {
  title: string;
  desc: ReactNode;
  image: StaticImageData;
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center mt-20 p-4 md:p-10 lg:p-16 bg-bg2 rounded-lg">
      <div className=" flex-4/5 flex flex-col items-start justify-start py-4 lg:py-10">
        <h2 className="text-4xl lg:text-6xl font-bold">{title}</h2>
        <div className="text-base mt-8">{desc}</div>
      </div>
      <div className="flex-1/5 w-full flex items-center justify-end">
        <Image
          src={image}
          alt={title}
          className="w-50 h-50 md:w-70 md:h-70 mb-4"
        />
      </div>
    </div>
  );
};

export default function Roadmap() {
  const appsRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className=" mx-auto max-w-[90vw] lg:px-10 py-8">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300  md:leading-16">
          Bitcoin Yay Roadmap
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Last Updated: March 10, 2025
        </p>
      </CustomStyledConatiner>

      {/* Part 02 */}
      <div className="flex justify-between flex-col lg:flex-row mt-40">
        <div>
          <PhaseCard
            image={GopherArt1}
            title="Phase 1:"
            subTitle="Development & Alpha Testing (2025-2026)"
            desc="Deploy AI-powered mining system.
                Launch Mining application on Android and IOS Device.
                    Establish smart contract functionality."
          />
          <PhaseCard
            image={GopherArt2}
            title="Phase 2:"
            subTitle="Expansion & Market Adoption (2026-2027)"
            desc="Integrate with different blockchain networks.
                Introducing Chat, Browser, and AI Wallet.
                Enable real-world transactions with Indexx Pay."
          />
          <PhaseCard
            image={HelmetArt}
            title="Phase 3:"
            subTitle="Mass Adoption & Governance (2027-2029)"
            desc="Expand decentralized governance framework.
                Reach $200 billion market valuation.
                Establish partnerships with financial institutions and merchants"
          />
        </div>
        <div className="flex items-center justify-center">
          <Image src={ArtImage} alt="Art" className="" />
        </div>
      </div>

      {/* Part 03 */}
      <div className="mt-40 flex flex-col items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-100 flex lg:flex-col justify-between items-center px-10 md:px-30 lg:px-0 lg:mr-40">
            <div className="flex flex-col items-center justify-center">
              <div
                onClick={() => scrollToSection(appsRef)}
                className="cursor-pointer text-tertiary group"
              >
                <Image
                  src={AppsButtonIcon}
                  alt="Download Logo"
                  className="mt-8 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="flex justify-center">
                  <p className="text-lg group-hover:text-primary">Apps</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <div
                onClick={() => scrollToSection(platformsRef)}
                className="cursor-pointer text-tertiary group"
              >
                <Image
                  src={PlatformButtonIcon}
                  alt="Download Logo"
                  className="mt-8 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="flex justify-center">
                  <p className="text-lg group-hover:text-primary">Platforms</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col items-center justify-center mt-10">
            <h2 className="text-3xl md:text-5xl font-bold">
              Product Roadmap Progress
            </h2>
            <p className="text-base mt-10">
              Bitcoin Yay is designed as a comprehensive ecosystem where apps
              and utilities cater to real-world needs, a powerful platform
              fosters decentralized innovation, a secure blockchain ensures
              seamless transactions and transparency, and an active community
              drives engagement and adoption. All of these elements work
              together to achieve Bitcoin Yay’s ultimate mission: to create the
              most inclusive peer-to-peer ecosystem and online experience,
              powered by Bitcoin Yay, a groundbreaking digital currency.
            </p>
            <p className="text-base mt-6">
              The milestones outlined in the roadmap reflect the ongoing
              progress toward Bitcoin Yay’s full-scale launch. Interested in the
              products and initiatives shaping the future of Bitcoin Yay? Scroll
              down or explore specific sections to discover over 20 active
              projects, each showcasing key developments and upcoming
              milestones.
            </p>
          </div>
        </div>
      </div>

      {/* Part 04 */}
      <div className="flex flex-col items-center justify-center mt-40">
        <h2 className="text-3xl md:text-5xl font-bold" id="apps" ref={appsRef}>
          Apps
        </h2>
        <div className="mt-20">
          <CustomCard
            title="Bitcoin Yay App"
            desc={
              <p>
                Bitcoin Yay is a next-generation cryptocurrency platform
                designed to simplify digital transactions, trading, and
                decentralized finance. It offers a secure blockchain network, a
                user-friendly wallet, seamless trading, staking rewards, and
                integration with decentralized applications (dApps). With fast,
                low-cost transactions and a strong community-driven ecosystem,
                Bitcoin Yay empowers users to participate in the digital economy
                efficiently. The app also provides educational resources and
                market insights to help users navigate the crypto space. With
                top-tier security and compliance, Bitcoin Yay is shaping the
                future of decentralized finance.
              </p>
            }
            image={BitcoinYayLogo}
          />
          <CustomCard
            title="Bitcoin Yay Browser"
            desc={
              <p>
                Bitcoin Yay Browser is a next-generation web browser designed
                for seamless integration with blockchain technology, providing a
                fast, secure, and decentralized browsing experience. Built for
                the future of Web3, it allows users to access decentralized
                applications (dApps), manage Bitcoin Yay transactions, and
                explore the internet with enhanced privacy and security. Unlike
                traditional browsers, Bitcoin Yay Browser prioritizes user
                control by eliminating third-party tracking, ensuring data
                privacy, and enabling smooth crypto interactions. With built-in
                wallet connectivity, lightning-fast performance, and optimized
                access to blockchain-powered services, Bitcoin Yay Browser
                redefines the way users engage with the digital world, making
                decentralized browsing more accessible and efficient than ever.
              </p>
            }
            image={BitcoinYayLogo}
          />
          <CustomCard
            title="Bitcoin Yay Chat connect"
            desc={
              <p>
                The Bitcoin Yay Chat feature is an integrated messaging system
                designed for secure and instant communication within the
                platform. Users can connect with traders, developers, and
                community members without leaving the app. The chat is
                end-to-end encrypted, ensuring privacy and security in every
                conversation. Key features include real-time messaging, group
                chats, media sharing, and smart notifications, allowing users to
                discuss market trends, share insights, and collaborate
                efficiently. Whether you&apos;re engaging in peer-to-peer
                transactions or networking with crypto enthusiasts, Bitcoin Yay
                Chat makes communication seamless and intuitive.
              </p>
            }
            image={ChatLogo}
          />
          <CustomCard
            title="Bitcoin Yay Mining"
            desc={
              <>
                <p>
                  The Bitcoin Yay Mining feature allows users to mine Bitcoin in
                  a simple and energy-efficient way, making crypto mining
                  accessible to everyone. Unlike traditional mining, which
                  requires expensive hardware and high electricity consumption,
                  Bitcoin Yay utilizes a lightweight, user-friendly mining
                  system that enables users to earn rewards with minimal effort.
                </p>
                <p>
                  By engaging with the platform daily, users can mine Bitcoin
                  through a fair and transparent process, ensuring widespread
                  participation. The system is designed to be secure,
                  decentralized, and scalable, allowing both beginners and
                  experienced miners to benefit from Bitcoin Yay’s mining
                  rewards.
                </p>
              </>
            }
            image={BitcoinYayCartLogo}
          />
          <CustomCard
            title="Bitcoin Yay Support"
            desc={
              <>
                <p>
                  The Bitcoin Yay Support feature ensures that users receive
                  quick and reliable assistance whenever they need help. Whether
                  it’s technical issues, account inquiries, or general questions
                  about mining and transactions, the support team is available
                  to provide guidance.
                </p>
                <p>
                  Users can access support through multiple channels, including
                  live chat, email, and a dedicated help center with FAQs and
                  troubleshooting guides. Bitcoin Yay prioritizes user
                  satisfaction and security, ensuring that every query is
                  resolved efficiently. With 24/7 assistance and a
                  community-driven support system, Bitcoin Yay ensures a
                  seamless experience for all users.
                </p>
              </>
            }
            image={SupportGopherLogo}
          />
        </div>

        {/* Part 05 */}
        <h2
          className="text-3xl md:text-5xl font-bold mt-40"
          id="platform"
          ref={platformsRef}
        >
          Platforms
        </h2>

        <div className="mt-20 w-full">
          <CustomCard
            title="Indexx Block Explorer AI"
            desc={
              <>
                <p>AI-powered fraud detection and smart contract auditing.</p>
                <p>User-friendly interface for blockchain analytics.</p>
              </>
            }
            image={ExplorerLogo}
          />
          <CustomCard
            title="Indexx AI Browser"
            desc={
              <>
                <p>Web3 search engine and decentralized app store.</p>
                <p>Built-in AI assistant for Web3 navigation.</p>
              </>
            }
            image={BrowserLogo}
          />
          <CustomCard
            title="Indexx Chat"
            desc={
              <>
                <p>Decentralized AI-driven social media platform.</p>
                <p>Spam-free, AI-curated content filtering.</p>
                <p>Smart advertising with AI-powered targetin</p>
              </>
            }
            image={ChatLogoOval}
          />
          <CustomCard
            title="Indexx Brainstorm AI"
            desc={
              <>
                <p>Community-driven DApp innovation platform.</p>
                <p>AI voting system for funding new projects.</p>
              </>
            }
            image={BrainStromLogo}
          />
        </div>
      </div>
    </div>
  );
}
