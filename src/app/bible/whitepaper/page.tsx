"use client";

import Image from "next/image";

import CustomButton2 from "@/components/CustomButton2";
import {
  CustomHeading,
  CustomHeading2,
  CustomListItem2,
  CustomPWithTitle2,
  CustomUnorderedList,
} from "@/components/CustomTypography";
import { SectionDiv } from "@/components/utils";

import ButtonImage1 from "@/assets/images/bible/whitepaper/button-1.webp";
import ButtonImage2 from "@/assets/images/bible/whitepaper/button-2.webp";
import ButtonImage3 from "@/assets/images/bible/whitepaper/button-3.webp";
import ButtonImage4 from "@/assets/images/bible/whitepaper/button-4.webp";
import ButtonImage5 from "@/assets/images/bible/whitepaper/button-5.webp";
import ButtonImage6 from "@/assets/images/bible/whitepaper/button-6.webp";
import ButtonImage7 from "@/assets/images/bible/whitepaper/button-7.webp";
import ButtonImage8 from "@/assets/images/bible/whitepaper/button-8.webp";
import ButtonImage9 from "@/assets/images/bible/whitepaper/button-9.webp";
import ButtonImage10 from "@/assets/images/bible/whitepaper/button-10.webp";
import ButtonImage11 from "@/assets/images/bible/whitepaper/button-11.webp";

import ArtImage1 from "@/assets/images/bible/whitepaper/art-1.webp";
import ArtImage2 from "@/assets/images/bible/whitepaper/art-2.webp";
import ArtImage3 from "@/assets/images/bible/whitepaper/art-3.webp";
import ArtImage4 from "@/assets/images/bible/whitepaper/art-4.webp";
import ArtImage5 from "@/assets/images/bible/whitepaper/art-5.webp";
import ArtImage6 from "@/assets/images/bible/whitepaper/art-6.webp";
import ArtImage7 from "@/assets/images/bible/whitepaper/art-7.webp";
import ArtImage8 from "@/assets/images/bible/whitepaper/art-8.webp";
import ArtImage9 from "@/assets/images/bible/whitepaper/art-9.webp";

export default function Whitepaper() {
  const Buttons = [
    {
      image: ButtonImage1,
      text: "Introduction",
      link: "#introduction",
    },
    {
      image: ButtonImage2,
      text: "Vision & Mission",
      link: "#vision-mission",
    },
    {
      image: ButtonImage3,
      text: "Technical Architecture",
      link: "#technical-architecture",
    },
    {
      image: ButtonImage4,
      text: "Tokenomics",
      link: "#tokenomics",
    },
    {
      image: ButtonImage5,
      text: "Mining & Participation Model",
      link: "#mining-participation-model",
    },
    {
      image: ButtonImage6,
      text: "Integration with Ecosystem",
      link: "#interaction-ecosystem",
    },
    {
      image: ButtonImage7,
      text: "Roadmap & Development",
      link: "#roadmap-development",
    },
    {
      image: ButtonImage8,
      text: "Withdrawal Rules & Vetting System",
      link: "#withdrawal-rules-vetting-system",
    },
    {
      image: ButtonImage9,
      text: "Legal & Compliance",
      link: "#legal-compliance",
    },
    {
      image: ButtonImage10,
      text: "Marketing & Adoption",
      link: "#marketing-adoption",
    },
    {
      image: ButtonImage11,
      text: "Conclusion",
      link: "#conclusion",
    },
  ];

  return (
    <div className="mx-auto">
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          Bitcoin-YAY
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">Whitepaper</h1>
      </div>

      {/* Part 2 */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-4 md:mx-20 xl:mx-40">
        {Buttons.map((button) => (
          <CustomButton2
            key={button.link}
            image={button.image}
            text={button.text}
            link={button.link}
          />
        ))}
      </div>

      <SectionDiv id="introduction">
        <CustomHeading content="1. Introduction" />
        <CustomPWithTitle2 content="Bitcoin Yay (BTCY) is a decentralized cryptocurrency designed as the foundation of a next-generation blockchain ecosystem. Bitcoin Yay is a new and smarter version of Bitcoin, tailored for everyday use, and serves as a “Micro Token of Bitcoin.” Built on a high-performance Stellar-based blockchain, Bitcoin Yay enables fast, low-cost transactions while incorporating features like AI-driven mobile mining, smart contracts, and decentralized governance. This whitepaper details the design, implementation, tokenomics, security, and governance of Bitcoin Yay, aiming to create a sustainable, community-driven financial network." />
        <CustomPWithTitle2 content="Inspired by the revolutionary vision of Bitcoin and the legacy of Satoshi Nakamoto, Bitcoin Yay is not merely a cryptocurrency — it is the continuation of an idea. While Bitcoin laid the foundation as digital gold, Bitcoin Yay evolves that foundation into a mobile-first, energy-efficient, and utility-rich ecosystem for real-world use. By lowering entry barriers and fostering inclusivity, Bitcoin Yay aspires to bring practical crypto usage to everyday people – from shopping and gaming to savings and micro-investments." />
      </SectionDiv>

      <SectionDiv id="vision-mission">
        <CustomHeading content="2. Vision & Mission" />
        <CustomPWithTitle2
          title="Vision:"
          content="To create a seamless, user-friendly, and sustainable Bitcoin alternative that integrates novel financial incentives and mining structures while fostering mass adoption. Bitcoin Yay envisions a world where participating in the crypto economy is as simple as using a mobile app, and where digital currency truly becomes a part of everyday life across the globe."
        />
        <CustomPWithTitle2
          title="Mission:"
          content="To build a hybrid blockchain system that maximizes user participation and enhances Bitcoin's legacy with more flexible mining and staking mechanisms. The project’s mission emphasizes financial inclusivity – empowering anyone, anywhere to earn and use cryptocurrency – and continuous innovation, blending AI, mobile technology, and blockchain to address Bitcoin’s shortcomings without losing its core principles."
        />
      </SectionDiv>

      <SectionDiv id="technical-architecture">
        <CustomHeading content="3. Technical Architecture" />
      </SectionDiv>
      <div className="overflow-hidden">
        <Image src={ArtImage1} alt="Art" className="w-full min-w-300" />
      </div>

      <SectionDiv id="technical-architecture">
        <CustomHeading2 content="3.1 Blockchain Framework" />
        <CustomPWithTitle2 content="BTCY operates on a high-performance blockchain (based on Stellar’s framework) designed for speed, security, and interoperability. The blockchain features:" />
        <CustomUnorderedList>
          <CustomListItem2
            title="Proof-of-Participation (PoP) Mechanism: "
            content="A novel consensus approach integrating elements of Proof-of-Stake and AI-optimized participation. Network participants earn rewards based on engagement and network support rather than brute-force hashing, making mining energy-efficient and accessible on everyday devices."
          />
          <CustomListItem2
            title="Smart Contract Layer:"
            content="Enabling decentralized applications (dApps) and trustless governance. Developers can create smart contracts for voting, DeFi (decentralized finance) applications, NFTs, and more, using BTCY as fuel for an ecosystem of programmable finance."
          />
          <CustomListItem2
            title="Cross-Chain Compatibility:"
            content="Planned bridges (initially centralized through Indexx) will allow BTC holders to swap into BTCY (1 BTC → 1,000,000 BTCY) and vice versa, leveraging Bitcoin’s liquidity and user base. Compatibility with Ethereum, BNB Chain, and other networks is targeted via wrapped BTCY tokens, positioning BTCY as an interoperable asset across multiple crypto ecosystems."
          />
        </CustomUnorderedList>
        <CustomHeading2 content="3.2 Security & Privacy" />
        <CustomPWithTitle2 content="ecurity is paramount in Bitcoin Yay’s design, especially given its novel elements. Multiple layers of security and privacy are implemented:" />
        <CustomUnorderedList>
          <CustomListItem2
            title="Multi-Layered Encryption:"
            content=" All transactions and communications use advanced cryptography (including quantum-resistant algorithms) to future-proof against next-gen threats. User wallets feature strong encryption (e.g., AES-256 for local storage) and biometric access in the mobile app. Zero-Knowledge Proofs (ZKPs) are explored so users can prove eligibility or ownership (for governance votes, etc.) without exposing private data."
          />
          <CustomListItem2
            title="AI-Powered Threat Detection:"
            content=" The same AI that optimizes participation also monitors network traffic to detect anomalies in real-time. Unusual patterns (like a surge of suspicious transactions or a malicious node’s behavior) trigger alerts or automated mitigation. The AI governance layer can flag misbehaving validators for removal, and machine learning models continuously improve security responses."
          />
          <CustomListItem2
            title="Byzantine Fault Tolerance:"
            content="Validator nodes operate under a BFT consensus protocol, tolerating a fraction of faulty or malicious nodes without compromising the network. Validators are required to stake BTCY or be elected by the community (once governance is decentralized), aligning their interests with network health. Slashing mechanisms penalize bad actors."
          />
          <CustomListItem2
            title="Light Nodes for Decentralization:"
            content=" To encourage broad participation, the network supports light nodes (e.g., within the mobile app) that can verify transactions without downloading the entire ledger. This allows even smartphones to contribute to network verification, improving decentralization and user trust (users don’t have to rely solely on a centralized server to confirm transactions)."
          />
          <CustomListItem2
            title="Regular Audits & Bounties:"
            content=" The team commits to regular third-party security audits of smart contracts, wallet code, and infrastructure. Findings are transparently published. A bug bounty program incentivizes independent security researchers to report vulnerabilities, adding an extra layer of defense."
          />
        </CustomUnorderedList>
        <CustomPWithTitle2 content="Through encryption, AI oversight, robust consensus, and a clear decentralization roadmap, Bitcoin Yay aims for high security and trust from day one while progressively handing control to the community." />
      </SectionDiv>

      <div className="mt-20 overflow-hidden">
        <Image
          src={ArtImage2}
          alt="Art"
          className="w-80 md:w-120 xl:w-220 -ml-20 lg:-ml-40"
        />
      </div>

      <SectionDiv id="tokenomics">
        <CustomHeading content="4. Tokenomics" />
        <CustomHeading2 content="4.1 Total Supply & Distribution" />
        <CustomPWithTitle2
          title="Fixed Total Supply:"
          content="Hard-capped at 21 trillion BTCY tokens, mirroring Bitcoin’s 21 million cap via micro-token conversion (1 BTC → 1,000,000 BTCY). This ensures BTCY remains scarce in the long run, creating incentive for holding and naturally limiting inflation."
        />
        <CustomUnorderedList>
          <CustomListItem2 content="Bitcoin Conversion Ratio: At launch, 1 BTC is set to equal 1,000,000 BTCY. Hypothetically, converting all 21 million BTC would yield 21 trillion BTCY. If you own 1 BTC, you can claim 1,000,000 BTCY; 0.01 BTC equates to 10,000 BTCY, and so forth. This ties Bitcoin Yay’s value conceptually to Bitcoin’s, and a reserve mechanism backs this by holding actual BTC." />
        </CustomUnorderedList>
        <CustomPWithTitle2
          title="Initial Distribution Breakdown:"
          content="The allocation of 21 trillion BTCY is strategically planned for ecosystem needs:"
        />
        <CustomUnorderedList>
          <CustomListItem2 content="40% (8.4 Trillion) – Mining Rewards & Ecosystem Incentives. Reserved for distribution via the mining programs (Snatch Gopher free mining, Nugget Gopher paid plans, etc.) and other user participation incentives. This large allocation ensures the community can earn a significant share of the supply over time, fueling user growth and engagement." />
          <CustomListItem2 content="10% (2.1 Trillion) – Satoshi Nakamoto Legacy Allocation. In tribute to Bitcoin’s creator, earmarked for Satoshi. Practically, these tokens could be locked or even burned to symbolize transfer to Satoshi’s inaccessible wallet. It serves as a narrative bridge between BTC and BTCY, a thoughtful nod to the origins of the project." />
          <CustomListItem2 content="20% (4.2 Trillion) – Developer & Infrastructure Fund. Held by the project team/Indexx and vested over ~4 years. Funds ongoing development, infrastructure (servers, support), and rewards for core contributors. A vesting schedule prevents the team from flooding the market and aligns their incentives with Bitcoin Yay’s long-term success." />
          <CustomListItem2 content="15% (3.15 Trillion) – Indexx Treasury (Liquidity & Stability). Managed by Indexx to provide liquidity on exchanges, perform market-making, and support token stability. This treasury will also help back the BTC reserve mechanism (swapping some BTCY for BTC over time to fill reserves). It acts as a buffer to stabilize price and ensure convertibility." />
          <CustomListItem2 content="10% (2.1 Trillion) – Community & Influencer Incentives. Dedicated to airdrops, rewards, community events, and influencer partnerships. This allocation seeds the initial user base and creates buzz (e.g., free BTCY drops to early adopters, bonuses for social media promotions, etc.). By distributing tokens through community engagement campaigns, Bitcoin Yay kickstarts network effects and public awareness." />
          <CustomListItem2 content="5% (1.05 Trillion) – Strategic Partnerships & Institutional Adoption. Reserved for key partners or institutional participants. These tokens incentivize collaborations with payment providers, merchants, fintech companies or even NGOs to integrate BTCY. Having a reserve for strategic outreach provides flexibility to foster adoption in larger contexts (for example, rewarding a popular app for accepting BTCY, or encouraging a financial institution to pilot BTCY-based services)." />
        </CustomUnorderedList>
        <CustomPWithTitle2 content="This distribution ensures that a majority of tokens (50% from mining + community programs) end up in the hands of the community. A substantial portion (35%) is initially held by the team/Indexx for development and liquidity but with clear purpose and vesting to mitigate centralization risk. The Satoshi tribute and partnership allocations further align BTCY with the broader crypto narrative and future expansion." />
        <CustomUnorderedList>
          <CustomListItem2 content="Circulating Supply Trajectory: Not all 21T will circulate immediately. Only a small fraction enters circulation at launch (e.g., via initial airdrops and exchange liquidity). Mining rewards (the 8.4T allocation) will be released gradually over many years. Other allocations like the Treasury and Dev Fund will also unlock strategically. This controlled release, similar to vesting in many projects, avoids oversupply in the market at launch and supports long-term price stability." />
        </CustomUnorderedList>
        <CustomHeading2 content="4.2 BTCY Price Strategy" />
        <CustomPWithTitle2
          title="Pegged Early Value:"
          content="During the early adoption phase, BTCY is effectively pegged to a notional value of $0.10 per BTCY via mechanisms on the Indexx platform. For example, on Indexx Exchange, 10 BTCY = 1 IUSD+ (Indexx USD stablecoin) by design, implying 1 BTCY ≈ $0.10. Users can swap BTCY for stablecoins at roughly this rate (less a conversion fee). This provides a value floor for BTCY and gives holders confidence that their BTCY can be converted to a stable value."
        />
        <CustomPWithTitle2
          title="Reserve-Backed Stability:"
          content="To support this peg, Indexx maintains a reserve of stablecoins and Bitcoin. Whenever users convert BTCY to a stablecoin (like IUSD+ or USDC), the converted BTCY is taken out of circulation and the reserve supplies the equivalent stablecoins to the user. Conversely, if users buy BTCY with stablecoins, BTCY from the treasury or reserve is released and stablecoins are added to the reserve. This acts similar to a central bank currency reserve, buffering BTCY’s price against volatility."
        />
        <CustomPWithTitle2
          title="Fee Mechanisms:"
          content="Conversion and transfer fees are used to control token velocity and fund the reserves:"
        />
        <CustomUnorderedList>
          <CustomListItem2 content="Converting BTCY to other tokens incurs a fee (e.g., 15% fee when swapping to internal tokens like IUSD+, and up to 20% fee for external stablecoins like USDC/USDT). These steep fees mean if someone dumps BTCY immediately for cash, they lose a significant portion, which deters mass liquidation and incentivizes holding or using BTCY within the ecosystem." />
          <CustomListItem2 content="Similarly, converting to Bitcoin (BTC) has a high fee, reflecting that directly acquiring BTC from BTCY is treated as a form of cashing out. (For example, converting BTCY to BTC might carry a 25% fee.) These percentages can be adjusted via governance, but initially they create friction that slows down speculative flipping of BTCY." />
          <CustomListItem2 content="Collected fees (in stablecoins or BTC) feed back into the system — for instance, a portion may be burned (reducing supply) and the rest added to the reserve. This deflationary aspect and reserve-funding further stabilize the token." />
        </CustomUnorderedList>

        <CustomPWithTitle2
          title="Bitcoin Reserve Model:"
          content="A portion of various fees and revenues is allocated to continuously purchase Bitcoin for a strategic reserve. This BTC reserve backs the BTCY ecosystem; for example, it enables a future feature where users can swap BTCY for actual BTC at market rates. As BTCY decentralizes over time, this reserve could be placed under community control via smart contracts. The existence of a Bitcoin reserve ties BTCY’s fate to Bitcoin’s success — if Bitcoin’s value rises, BTCY’s backing strengthens, providing holders additional confidence."
        />
        <CustomPWithTitle2
          title="Gradual Float:"
          content="Over time, as BTCY becomes widely held and its utility proven, the project may relax the $0.10 peg to allow BTCY’s market price to float upward. Any such changes would be decided via decentralized governance once the network matures. In the long run, BTCY’s value will be supported by its scarcity (controlled by halving and burns), its utility in the ecosystem, and the underlying reserves, rather than a fixed peg."
        />
      </SectionDiv>

      <div className="mt-40 overflow-hidden w-screen flex justify-end ">
        <Image
          src={ArtImage3}
          alt="Art"
          className="w-90 md:w-150 lg:w-200 xl:w-300"
        />
      </div>

      <SectionDiv id="mining-participation-model">
        <CustomHeading content="5. Mining & Participation Model" />
        <CustomPWithTitle2 content="BTCY introduces an innovative mining model inspired by gopher-themed tiers to encourage broad participation in the network." />
        <CustomHeading2 content="5.1 Bitcoin Yay Gopher Mining System" />
        <CustomPWithTitle2
          title="Snatch Gopher (Free Mining Program):"
          content="Entry-level free mining with minimal commitment, allowing anyone to start earning BTCY at no cost. Base speed is 1× (earning ~3 BTCY/hour initially). While free, users may need to perform small in-app tasks like viewing ads or providing feedback to maintain rewards. This onboards anyone at zero cost and ensures engagement."
        />
        <CustomPWithTitle2
          title="Pocket Gopher (Influencer & Network Program):"
          content="Rewards social engagement, referrals, and community growth. Users who refer others or create content about BTCY earn bonus BTCY. This isn’t a fixed mining rate tier but rather a way to boost earnings via milestones (for example, referring a friend might give both referrer and referee a one-time BTCY bonus). It incentivizes community builders to spread the word."
        />
        <CustomUnorderedList>
          <CustomListItem2
            title="Nugget Gopher (Paid Subscription Plans): "
            content="Paid mining tiers with enhanced earning potential and monthly fees, offering higher base speeds"
          />
          <CustomListItem2
            title="Electric Power (Basic Paid):"
            content="3× speed (~9 BTCY/hour) for $100/month. Perks include faster transaction processing on the network."
          />
          <CustomListItem2
            title="Turbo Power (Mid Paid):"
            content="6× speed (~18 BTCY/hour) for $300/month. Comes with “super-speed” mining and priority withdrawals – if there’s ever a queue or limit on withdrawals, Turbo users are first in line."
          />
        </CustomUnorderedList>
        <CustomPWithTitle2
          title="Nuclear Power (Top Paid):"
          content="9× speed (~27 BTCY/hour) for $600/month. Offers ultra-speed mining and VIP support (dedicated customer service, faster issue resolution, and exclusive community perks). Nuclear users are major financial supporters of the network and reap the highest base rewards (nine times the free rate)."
        />
        <CustomPWithTitle2
          title="Nerdy Gopher (Developer Program):"
          content="Aimed at developers and tech contributors. Instead of a fixed hourly rate, developers “mine” BTCY by completing bounties such as writing smart contracts, building dApps, or improving security. This program rewards technical contributions to the ecosystem with BTCY grants. It ensures developers have incentive to grow the platform."
        />
        <CustomPWithTitle2 content="These gopher-themed tiers cleverly segment the community: Those who can pay to subscribe support the project’s finances and in return receive more BTCY; those who cannot pay can still earn via the free plan or through contributions like referrals and development, ensuring inclusivity for all types of participants." />
        <CustomHeading2 content="Subscription-Based Mining Plans Overview:" />

        <div className="overflow-x-auto my-10">
          <table className="min-w-full bg-transparent border-2 border-bg2 text-sm lg:text-xl lg:table-fixed">
            <thead>
              <tr className="border-b border-2 border-bg2 [&>th]:border-2 [&>th]:border-bg2 [&>th]:py-10 [&>th]:px-2 [&>th]:md:py-3 [&>th]:md:px-4 [&>th]:text-center [&>th]:min-w-32 [&>th]:whitespace-nowrap [&>th]:lg:w-1/5 [&>th]:lg:whitespace-normal">
                <th>Plan (Gopher Tier)</th>
                <th>Speed Boost</th>
                <th>Mining Rate (per hour)</th>
                <th>Cost</th>
                <th>Benefits</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-2 [&>td]:px-2 [&>td]:md:py-3 [&>td]:md:px-4 [&>td]:text-left [&>td]:min-w-32 [&>td]:whitespace-nowrap [&>td]:lg:w-1/5 [&>td]:lg:whitespace-normal">
                <td>Free Plan (&ldquo;Scratch Gopher&rdquo;)</td>
                <td>1× (baseline)</td>
                <td>~3 (BTCY/hour)</td>
                <td>$0 (Free; ads/tasks)</td>
                <td>
                  Standard 24 hours/day mining availability. No cost entry for
                  all users. Requires simple engagement (e.g., watch ads) to
                  maintain mining.
                </td>
              </tr>
              <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-2 [&>td]:px-2 [&>td]:md:py-3 [&>td]:md:px-4 [&>td]:text-left [&>td]:min-w-32 [&>td]:whitespace-nowrap [&>td]:lg:w-1/5 [&>td]:lg:whitespace-normal">
                <td>Electric Power</td>
                <td>3×</td>
                <td>~9 (BTCY/hour)</td>
                <td>$100/moth</td>
                <td>
                  High-speed mining. Faster transaction processing on the
                  network.
                </td>
              </tr>
              <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-2 [&>td]:px-2 [&>td]:md:py-3 [&>td]:md:px-4 [&>td]:text-left [&>td]:min-w-32 [&>td]:whitespace-nowrap [&>td]:lg:w-1/5 [&>td]:lg:whitespace-normal">
                <td>Turbo Power</td>
                <td>5×</td>
                <td>~18 (BTCY/hour)</td>
                <td>$300/moth</td>
                <td>
                  Super-speed mining. Priority withdrawal processing
                  (withdrawals are prioritized for Turbo users).
                </td>
              </tr>
              <tr className="border-b border-2 border-bg2 [&>td]:border-2 [&>td]:border-bg2 [&>td]:py-2 [&>td]:px-2 [&>td]:md:py-3 [&>td]:md:px-4 [&>td]:text-left [&>td]:min-w-32 [&>td]:whitespace-nowrap [&>td]:lg:w-1/5 [&>td]:lg:whitespace-normal">
                <td>Nuclear Power</td>
                <td>9×</td>
                <td>~27 (BTCY/hour)</td>
                <td>$600/month</td>
                <td>
                  Ultra-speed mining. VIP support (dedicated customer
                  service,faster issue resolution, exclusive perks).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CustomPWithTitle2 content="(Note: The paid tiers are optional. All users can earn BTCY on the Free plan; paid plans simply accelerate earnings and provide additional benefits.)" />

        <CustomHeading2 content="5.2 Bitcoin Mining Incentives" />
        <CustomUnorderedList>
          <CustomListItem2
            title="Tiered Rewards:"
            content="Higher-tier subscriptions unlock significantly better base mining rates (as shown above), incentivizing those who find value in faster earnings to support the network financially."
          />
          <CustomListItem2
            title="Natural Progression:"
            content="Users can increase their mining capacity without paying by actively participating in the community. For example, consistently staking BTCY or being highly engaged can improve one’s AI Mining Score (discussed below) which multiplies earnings. Thus, even Free users can boost rewards by contributing to network growth."
          />
          <CustomListItem2
            title="AI Efficiency Boosts:"
            content="The AI-driven system will continually adjust and introduce efficiency bonuses for long-term and highly active miners. For instance, during special events or as a reward for sustained participation, the AI might grant temporary multipliers or bonus tasks that yield extra BTCY."
          />
        </CustomUnorderedList>
        <CustomHeading2 content="5.3 AI Mobile Mining Architecture" />

        <CustomPWithTitle2 content="Bitcoin Yay’s mining mechanism is powered by an AI-driven system that ensures mining is efficient, engaging, and fair. As mentioned, it follows a teacher-student model using knowledge distillation:" />

        <CustomHeading2 content="5.3.1 Knowledge Distillation Model" />

        <CustomPWithTitle2 content="A central “Master” AI (the Teacher) analyzes user activity patterns across the network – looking at engagement, task completion, referrals, transaction frequency, and other behaviors beneficial to the ecosystem. It learns which behaviors contribute most to Bitcoin Yay’s growth and security." />
        <CustomPWithTitle2 content="This knowledge is distilled into lightweight “mining tasks” sent to each user’s mobile app (the Student). Each user’s app gets tasks tailored to their device capabilities and past engagement level:" />

        <CustomUnorderedList>
          <CustomListItem2
            title="Minimal resource usage:"
            content="Tasks are designed to not drain battery or require significant computing power."
          />
          <CustomListItem2
            title="Personalized experience:"
            content="New or less active users receive simple tasks (e.g., backup your wallet, make a small transaction, watch a short tutorial video), while highly engaged users might get more involved tasks (e.g., refer a friend, host a meetup, write a post about BTCY)."
          />
          <CustomListItem2
            title="Mass participation:"
            content="By keeping tasks lightweight and relevant, anyone with a smartphone can participate in mining without specialized hardware."
          />
        </CustomUnorderedList>
        <CustomHeading2 content="5.3.2 Mining Task Distribution" />

        <CustomPWithTitle2 content="The backend AI system assigns a variety of mobile-optimized tasks, such as:" />
        <CustomUnorderedList>
          <CustomListItem2 content="Viewing rewarded ads or educational content (for a small boost in mining rate)." />
          <CustomListItem2 content="Solving gamified puzzles or quizzes about crypto (to encourage learning while mining)." />
          <CustomListItem2 content="Completing profile setups or identity verification (which increases trustworthiness and yields higher scores)." />
          <CustomListItem2 content="Sharing referral links or engaging in social media campaigns (to grow the network)." />
        </CustomUnorderedList>
        <CustomPWithTitle2 content="These tasks are delivered through secure APIs:" />
        <CustomUnorderedList>
          <CustomListItem2 content="A Distillation Engine API provides each app with its next set of tasks, distilled from the global AI’s learning." />
          <CustomListItem2 content="A Boost Engine API may introduce special time-based events (e.g., during a promotional week, all users get a puzzle that doubles their rate for an hour upon completion)." />
          <CustomListItem2 content="A Mining Reward API ensures that when tasks are completed, BTCY rewards are distributed fairly and transparently according to each user’s base rate and multipliers." />
        </CustomUnorderedList>
        <CustomHeading2 content="5.3.3 AI Mining Score (AMS)" />

        <CustomPWithTitle2 content="Every user has an AI Mining Score that dynamically adjusts their personal mining multiplier (on top of the base rates from their plan). This score is influenced by:" />
        <CustomUnorderedList>
          <CustomListItem2 content="Device and Activity Consistency: Regular app usage (opening the app daily, keeping the miner active) and maintaining a verified device." />
          <CustomListItem2 content="Task Completion: Successfully doing the AI-assigned tasks. Completing more tasks reliably increases the score." />
          <CustomListItem2 content="Referral Network Strength: Bringing new users and keeping them active raises the score (the network effect is rewarded)." />
          <CustomListItem2 content="Staking Participation: Users who stake BTCY or otherwise lock in their commitment to the network may receive a higher score." />
        </CustomUnorderedList>
        <CustomPWithTitle2 content="The AI Mining Score ranges through levels that correspond roughly to multipliers from 1× up to a maximum (e.g., 10× for extremely engaged users). For example, a Free Plan user (base 1×) who is very active might achieve a 2× or 3× AMS multiplier, effectively earning 2–3 times the base 3 BTCY/hour rate. By rewarding smarter and more helpful engagement rather than raw computing power, Bitcoin Yay turns mining into a participatory, gamified, and merit-based experience." />
      </SectionDiv>

      <div className="w-screen flex items-center justify-center mt-40">
        <Image src={ArtImage4} alt="Art" className="w-80 md:w-120 xl:w-220" />
      </div>

      <SectionDiv id="interaction-ecosystem">
        <CustomHeading content="6. Integration with the Indexx Ecosystem" />

        <CustomPWithTitle2 content="BTCY will be fully integrated within the Indexx ecosystem to drive adoption and provide immediate utility:" />
        <CustomUnorderedList>
          <CustomListItem2
            title="Indexx Exchange:"
            content="BTCY is listed on the Indexx Exchange from launch. Users can trade BTCY against other assets and even stake BTCY on the exchange for additional rewards. The exchange supports BTCY-to-stablecoin conversions at the pegged rate (subject to fees), providing liquidity and a clear use-case for mined tokens."
          />
          <CustomListItem2
            title="Indexx Shop:"
            content="An online marketplace where users can purchase crypto gift cards, greeting cards, and other digital goods using BTCY. Paying with BTCY may offer discounts or special deals, demonstrating BTCY’s power as a spending currency. For example, after mining for a few weeks, a user could redeem BTCY for an Amazon gift card via Indexx Shop."
          />
          <CustomListItem2
            title="Indexx Lotto:"
            content="BTCY holders gain exclusive access to crypto-based lottery games on the Indexx Lotto platform. Users can spend BTCY to enter drawings or special lottery pools (with thresholds to participate ensuring only engaged users join). This adds a fun gamification aspect to holding BTCY."
          />
          <CustomListItem2
            title="Indexx Hive:"
            content="A community membership and rewards hub tied to BTCY staking. Users who stake certain amounts of BTCY gain membership in the “Hive,” unlocking perks like higher referral bonuses, voting rights in project governance (as BTCY transitions to a DAO), and access to exclusive content or events. This fosters a loyal community and incentivizes holding and staking BTCY."
          />
        </CustomUnorderedList>
        <CustomPWithTitle2 content="From day one, Bitcoin Yay benefits from being born into Indexx’s ecosystem. Instead of having to create demand from scratch, BTCY plugs into existing platforms where it has immediate usefulness — trading, shopping, gaming, and more. This comprehensive integration means a user can earn BTCY by mining in the morning, trade some for stablecoin in the afternoon, stake some for interest by evening, and spend a little at night for entertainment, all within one connected crypto environment." />
      </SectionDiv>

      <div className="mt-20 overflow-hidden">
        <Image src={ArtImage5} alt="Art" className="w-80 md:w-120 xl:w-220" />
      </div>

      <SectionDiv id="roadmap-development">
        <CustomHeading content="7. Roadmap & Development Phases" />

        <CustomPWithTitle2 content="Bitcoin Yay’s development is planned in clear phases from 2025 onward, with each phase building on the last to gradually decentralize the project and expand its reach:" />
        <CustomUnorderedList>
          <CustomListItem2
            title="Phase 1:"
            content="Foundation & Launch (Q2 2025 – Q3 2025) – Core infrastructure set up, BTCY token generation event (launching BTCY on Indexx Exchange and initial DEXs). Launch of the Bitcoin Yay mobile wallet (alpha/beta) allowing wallet creation, basic BTC/BTCY swaps, and Free Plan mining (Snatch Gopher). Early adopter incentives like airdrops and referral bonuses kick in. Paid mining subscriptions (Electric, Turbo, Nuclear) roll out to initial users. Community channels (Telegram, Discord) are opened and the first marketing campaigns and influencer partnerships begin to create buzz."
          />
          <CustomListItem2
            title="Phase 2:"
            content="Expansion & Utility (Q4 2025 – Q2 2026) – Focus on expanding use-cases for BTCY. BTCY Staking & Governance features launch (users can stake BTCY for yield and preliminary voting rights). Full integration with Indexx Shop and Lotto is achieved (BTCY widely spendable for gift cards, lottery tickets). Smart contract functionality is deployed on Bitcoin Yay’s network, enabling third-party dApps. The Nerdy Gopher developer bounty program starts to encourage developers to build on BTCY (with hackathons and bug bounties). Listings on additional exchanges and liquidity pools on DeFi platforms (Ethereum/BSC) broaden BTCY’s availability. Strategic partnerships are pursued using the 5% allocation to bring in fintech or gaming platforms. By the end of Phase 2, hundreds of thousands of users are actively mining or using BTCY, and BTCY is transitioning from something people only earn to something they actively spend and utilize."
          />
          <CustomListItem2
            title="Phase 3:"
            content="Decentralization & Governance (Q3 2026 – Q4 2026) – Emphasis on handing control to the community. Bitcoin Yay DAO is established with governance smart contracts; BTCY stakers can now vote on proposals (e.g., adjusting fees or mining rates). The team begins transferring critical controls to the DAO (treasury management, protocol parameters). The validator set becomes more decentralized, possibly adding community-run nodes to reduce Indexx’s share. Cross-chain bridges to major networks (Ethereum, BNB Chain) go live, allowing wrapped BTCY to circulate and tap into external DeFi markets. This year also sees global expansion efforts: regional ambassadors, compliance in new jurisdictions, and outreach to institutions (presenting BTCY as a “Bitcoin for everyone” solution). By the end of 2026, the project aims to be operationally independent of the core team – running increasingly as a self-governed network."
          />
          <CustomListItem2
            title="Phase 4:"
            content="Global Adoption & Sustainability (2027 and beyond) – Bitcoin Yay is fully decentralized and aiming for mainstream recognition. The 21 trillion cap will be nearly reached by this time (due to the rapid halving schedule), meaning new issuance is very low and BTCY’s economy stabilizes on transaction fees and recycling of tokens. The community (via the DAO) controls all key aspects of the network. The project pushes for integration in mainstream finance – e.g., getting BTCY listed on major global exchanges, included in index funds or ETFs, and accepted by additional payment processors. Indexx Pay launches, allowing users to spend BTCY via crypto debit cards or merchant payment gateways, bridging into physical retail. The Bitcoin Gopher Phone (a teased dedicated device for BTCY mining) might be released, further simplifying user acquisition. Throughout, continuous innovations (like exploring quantum-resistant tech or enhanced privacy features) are adopted via governance proposals to keep Bitcoin Yay technologically relevant. By this stage, Bitcoin Yay strives to be a ubiquitous “everyday Bitcoin,” secure, self-sustaining, and used by millions worldwide."
          />
        </CustomUnorderedList>
      </SectionDiv>

      <div className="w-screen flex items-center justify-center mt-40">
        <Image src={ArtImage6} alt="Art" className="w-80 md:w-100 xl:w-140" />
      </div>

      <SectionDiv id="withdrawal-rules-vetting-system">
        <CustomHeading content="8. Withdrawal Rules & Vetting System" />

        <CustomPWithTitle2 content="To maintain network stability, prevent abuse, and ensure fair token distribution, Bitcoin Yay implements a structured withdrawal and usage vetting system. This system discourages immediate dumping of mined coins and aligns with the long-term vision:" />

        <CustomUnorderedList>
          <CustomListItem2 content="Minimum Usage/Withdrawal Threshold: Users must accumulate at least 100,000 BTCY before they can initiate external withdrawals or fully access certain conversion features (trading BTCY for other assets, making payments outside the ecosystem, etc.). This threshold ensures that users contribute meaningfully (e.g., roughly a few months of mining on Free plan) before extracting value, reducing the likelihood of users joining just to instantly sell and leave." />
          <CustomListItem2 content="Phased Withdrawal Schedule: Even after reaching 100,000 BTCY, users cannot withdraw the entire amount in one go. Withdrawals are vested over a period (for example, 6 months) to prevent sudden sell-offs. Users may withdraw a portion of their balance each month instead of a lump sum. This gradual release ensures a more stable market and rewards continued engagement." />

          <CustomListItem2 content="Vesting Example (for 100,000 BTCY):" />
          <CustomUnorderedList>
            <CustomListItem2 content="Month 1: 10,000 BTCY max withdrawable" />
            <CustomListItem2 content="Month 2: 15,000 BTCY" />
            <CustomListItem2 content="Month 3: 20,000 BTCY" />
            <CustomListItem2 content="Month 4: 20,000 BTCY" />
            <CustomListItem2 content="Month 5: 20,000 BTCY" />
            <CustomListItem2 content="Month 6: 15,000 BTCY" />
          </CustomUnorderedList>
          <CustomListItem2 content="(In this example schedule, the 100k BTCY is fully released by month 6. This encourages holders to stay engaged during the release period. Actual percentages can be tuned by governance, but the principle is a tapered release with heavier amounts in the middle months and a slowdown toward the end.)" />
          <CustomListItem2 content="Automated Fraud Vetting: Each withdrawal request undergoes automated checks. The system uses AI to detect suspicious behavior such as multiple accounts funneling funds to one user, bots attempting mass withdrawals, or any patterns indicative of fraud. Suspected cases may be flagged for manual review or slight delay. Legitimate users will generally not notice this vetting, but it adds a safeguard against exploitative practices." />
          <CustomListItem2 content="Withdrawal Fees: To further discourage impulsive withdrawals that could hurt the ecosystem:" />
          <CustomUnorderedList>
            <CustomListItem2 content="A 10% fee applies to immediate one-time withdrawals (if a user insists on bypassing the vesting schedule and taking out a large amount at once)." />
            <CustomListItem2 content="A much lower 3% fee (or similar small fee) applies to withdrawals that follow the recommended vesting schedule over 6 months." />
          </CustomUnorderedList>
          <CustomListItem2 content="This fee structure strongly incentivizes gradual withdrawals. For example, if someone reaches 100k BTCY and converts it all at once, they’d pay a 10% fee; by contrast, if they withdraw in stages over time, they’d pay only 3% on those withdrawals. Fees collected here either get burned (reducing supply) or added to reserves, benefiting the token economy." />
          <CustomListItem2 content="Overall, this vetting and withdrawal system ensures Bitcoin Yay’s early adopters cannot unfairly or destructively dump large amounts of BTCY, which protects the token’s value and the community. It aligns users with the project’s long-term success: those who stick around and withdraw gradually are rewarded with lower fees and potentially more token utility unlocked as they remain engaged." />
        </CustomUnorderedList>
        <CustomPWithTitle2 content="(Note: The updated Bitcoin Yay framework also introduces tiered utility thresholds for various features, as described in the Tokenomics and Utility sections. Rather than a single high withdrawal threshold, users unlock different features (trading, stable coin conversion, BTC conversion, etc.) at different BTCY levels, some of which are below 100k. The 100k figure mentioned here is a general benchmark for full token liquidity access. The key takeaway is that new users are guided into the ecosystem gradually, and large liquidations are discouraged by design.)" />
      </SectionDiv>

      <SectionDiv id="legal-compliance">
        <Image src={ArtImage7} alt="Art" className="w-80 md:w-100 xl:w-140" />
        <CustomHeading content="9. Legal & Compliance" />

        <CustomHeading2 content="9.1 Disclaimer & Regulatory Compliance" />

        <CustomPWithTitle2 content="Bitcoin Yay operates within global regulatory frameworks to the greatest extent possible:" />
        <CustomUnorderedList>
          <CustomListItem2
            title="Legal Disclaimer:"
            content="All official documentation and the app include clear disclaimers that participation is at the user’s own risk. Users are reminded that cryptocurrencies are volatile and that BTCY is a utility token intended for use within the ecosystem, not an investment contract with guaranteed profits. No communication is phrased as financial advice. By being transparent about risks (technology failures, market swings, regulatory changes), the project sets correct expectations and avoids misleading users."
          />
          <CustomListItem2
            title="KYC/AML Measures:"
            content="The platform adheres to Know-Your-Customer and Anti-Money-Laundering policies where applicable. For example, users who wish to convert BTCY to other assets or withdraw beyond certain limits will need to verify their identity (e.g., provide ID documents) through a third-party KYC provider integrated into the app. This ensures compliance with financial regulations (such as FinCEN guidelines in the US, FINMA in Switzerland, etc.) and prevents illicit use of the platform."
          />
          <CustomListItem2
            title="Data Privacy:"
            content="Compliance with data protection laws like GDPR is taken seriously. Minimal personal data is collected (generally only during KYC for those converting to fiat or external assets), and it’s handled securely and lawfully. Users’ personal data is never sold or misused; it’s only used to fulfill legal requirements and to secure the platform."
          />
        </CustomUnorderedList>
        <CustomHeading2 content="9.2 Token Legality and Governance" />

        <CustomUnorderedList>
          <CustomListItem2
            title="Utility Token Stance:"
            content="The Bitcoin Yay team has structured BTCY to avoid classification as a security. Since BTCY is earned via user actions (mining) and has immediate utility (it can be spent in the ecosystem, converted to stablecoins, used for services), it is presented as a consumer utility token, not a speculative investment. The whitepaper and marketing refrain from using language like “profits” or “investment,” focusing instead on usage and participation. This positioning is intended to follow guidelines (such as the Howey Test in the US) that differentiate utility tokens from securities. However, the team remains vigilant: if regulators provide new guidance or request information, Bitcoin Yay will cooperate and adjust its compliance approach as needed."
          />
          <CustomListItem2
            title="Intellectual Property:"
            content="The project acknowledges that the name “Bitcoin” is open-source and not trademarked, which is why “Bitcoin Yay” can be used. The team is taking steps to trademark “Bitcoin Yay,” the logo, and other ecosystem names like “Bitcoin YeeHaw” (the stablecoin) to prevent fraudulent imposters. All official materials include clear trademark and copyright notices. The core blockchain code will be open-sourced under a permissive license to build trust and encourage community contributions, but certain proprietary elements (for example, specific AI algorithms or branding assets) may be protected."
          />
          <CustomListItem2
            title="User Agreement & Policies:"
            content="Upon sign-up, users agree to Terms of Service that outline acceptable use (no illicit activities using BTCY, no exploiting the platform for fraud, etc.). The platform reserves the right to suspend or ban users engaged in illegal activities in accordance with these terms and applicable law. A Privacy Policy is provided, detailing what data is collected and how it is used or protected."
          />
          <CustomListItem2
            title="Compliance Infrastructure:"
            content="Indexx’s involvement means there is likely a compliance team or officer overseeing these aspects. Regular compliance audits are planned. Since part of Bitcoin Yay’s model involves holding reserves of BTC on behalf of users (to back conversions), the project may voluntarily publish periodic attestations of these reserves (similar to how stablecoin issuers do) to prove transparency and solvency."
          />
        </CustomUnorderedList>

        <CustomHeading2 content="9.3 Global Accessibility and Restrictions" />
        <CustomUnorderedList>
          <CustomListItem2
            title="Jurisdictional Considerations:"
            content="Bitcoin Yay aims to be globally accessible but will respect international sanctions and local regulations. For example, usage may be blocked in sanctioned countries (e.g., North Korea, Iran) and certain features (like paid mining subscriptions or token conversions) might be initially disabled in regions like the United States until there is clearer regulatory guidance, to avoid being misinterpreted as offering unregistered securities or investment products."
          />
          <CustomListItem2
            title="Adapting to Law Changes:"
            content="The compliance strategy is dynamic. As laws evolve, Bitcoin Yay will adapt (e.g., implementing new reporting requirements or registration if needed). By planning for compliance from the start, the project can adjust rather than be caught off-guard. In an extreme scenario, the DAO governance model provides flexibility: the community could vote on changes to tokenomics or operations to comply with new regulations if absolutely required."
          />
        </CustomUnorderedList>

        <CustomHeading2 content="9.4 Community-Centric Compliance" />
        <CustomUnorderedList>
          <CustomListItem2
            title="Risk Warnings:"
            content="The app and documents prominently warn about crypto risks (volatility, potential loss of value, technological uncertainties). Users are explicitly told that BTCY is not a government-backed legal tender. By educating users on risks up front, Bitcoin Yay avoids the pitfalls of users claiming they were unaware of dangers, thereby attracting a user base that is informed and consents to the risk of participation."
          />
          <CustomListItem2
            title="Transition to Decentralized Governance:"
            content="As Bitcoin Yay decentralizes, a unique aspect will be how the DAO interfaces with legal compliance. One possibility is the formation of a non-profit foundation that can represent the network’s interests legally, sign contracts, or hold assets (like reserve funds) on behalf of the community. This foundation could ensure ongoing compliance (filing reports, handling KYC infrastructure, etc.) even when the core team steps back, bridging the gap between a decentralized network and real-world legal systems."
          />
          <CustomListItem2
            title="Transparency:"
            content="All legal and compliance efforts (like the creation of a Regulatory & Compliance Report or a Disclaimer & Legal Notice document) are made transparent to the community. The project’s stance is that compliance is not an afterthought but a fundamental part of building trust. By openly sharing how it operates within the law, Bitcoin Yay aims to avoid legal interruptions and foster an image of a responsible, user-conscious crypto project. This proactive and transparent approach to compliance is expected to give Bitcoin Yay a competitive edge in longevity, as projects that take regulations seriously are more likely to survive and thrive as the crypto industry matures under the rule of law."
          />
        </CustomUnorderedList>
      </SectionDiv>

      <div className="w-screen flex items-center justify-center my-40">
        <Image src={ArtImage8} alt="Art" className="w-80 md:w-100 xl:w-140" />
      </div>

      <SectionDiv id="marketing-adoption">
        <CustomHeading content="10. Marketing & Adoption Strategy" />

        <CustomHeading2 content="10.1 Awareness & Community Engagement" />
        <CustomUnorderedList>
          <CustomListItem2
            title="Airdrops & Early Incentives:"
            content="Generous airdrops are planned to seed the initial user base. Early adopters who sign up during the launch window receive free BTCY in their wallets to jumpstart usage. Additionally, community-specific airdrops (e.g., to existing Indexx users or random Bitcoin holders as a “Bitcoin micro-dividend”) create buzz and spread tokens widely for decentralization."
          />
          <CustomListItem2
            title="Referral Programs:"
            content="A built-in referral system (the “Pocket Gopher” influencer program) rewards users for bringing in friends. Both referrer and referee get bonuses (for example, 1,000 BTCY each upon the new user reaching a certain milestone). This encourages viral growth; every user becomes an ambassador because inviting others boosts their own mining rate or yields additional BTCY."
          />
          <CustomListItem2
            title="Influencer Partnerships:"
            content="Bitcoin Yay actively partners with crypto influencers on YouTube, Twitter (X), TikTok, etc. Early in the launch, selected influencers are given beta access or exclusive content to share. By leveraging personalities who already have trust within the crypto community, Bitcoin Yay positions itself as the next big thing (“mobile mining is back, now tied to Bitcoin – don’t miss out!”). The community content rewards (section F of utility use cases) further mobilize micro-influencers to create tutorials, reviews, and memes in exchange for BTCY rewards."
          />
          <CustomListItem2
            title="Social Media Campaigns:"
            content="The project maintains a strong presence on platforms like Twitter, Instagram, Reddit, and Telegram:"
          />
          <CustomUnorderedList>
            <CustomListItem2 content="Official accounts post regular updates, milestones (e.g., “100k users in the first month!”), and educational content explaining BTCY features." />
            <CustomListItem2 content="Hashtag campaigns (e.g., #BitcoinYay and #BTCYay) are used to spread catchy slogans. The branding allows playful meme potential — for instance, phrases like “Yay or Nay? Always Yay!” or combining BTCY’s stablecoin (“YeeHaw”) with Yay in slogans to spark curiosity." />
            <CustomListItem2 content="Meme contests and community challenges are frequently held, where users create Bitcoin Yay memes or short videos. The best entries are amplified on official channels and rewarded with BTCY. This grassroots content creates a fun culture around the project." />
          </CustomUnorderedList>
          <CustomListItem2
            title="Educational Outreach:"
            content="The team publishes blog posts and hosts AMA (Ask Me Anything) sessions to educate and build credibility. Topics include “How is Bitcoin Yay different from Bitcoin?” and “Tutorial: Earning BTCY on your phone.” By addressing questions transparently and explaining the threshold/vesting model as a protective feature (not a deterrent), the team converts skeptics and fosters an informed community."
          />
          <CustomListItem2
            title="Campus & Local Ambassadors:"
            content="The project may recruit campus ambassadors at universities or local community leaders to host meetups and workshops about Bitcoin Yay. These ambassadors are compensated in BTCY and get branded merchandise (T-shirts, stickers with the gopher mascot, etc.). University students, for example, are a prime audience (as seen with Pi Network’s growth); Bitcoin Yay targets them by offering a tangible valued token and a clearer value proposition than previous mobile mining apps."
          />
        </CustomUnorderedList>
        <CustomHeading2 content="10.2 Onboarding & Accessibility" />
        <CustomUnorderedList>
          <CustomListItem2
            title="User-Friendly App:"
            content="The Bitcoin Yay mobile app (and web portal) is designed for simplicity. It features guided tutorials on how to claim your airdrop, start mining, and use BTCY in the ecosystem. The UI avoids jargon, using friendly language (leveraging the “Yay” positivity in branding)."
          />
          <CustomListItem2
            title="Multilingual Support:"
            content="To reach a global audience, the app and documentation are quickly rolled out in multiple languages (English, Chinese, Spanish, Hindi, Arabic, etc.). Community volunteers and ambassadors assist with translations to ensure non-English speakers can easily join."
          />
          <CustomListItem2
            title="24/7 Support & Chatbot:"
            content="Especially during initial growth, having responsive support is key. The app includes an AI-driven support chatbot that can answer common questions (e.g., “Why can’t I withdraw yet?” or “How do I increase my mining rate?”) and direct users to tutorials. Tickets that require human support are handled within a day. A smooth support experience builds trust for newcomers who may be unfamiliar with crypto."
          />
          <CustomListItem2
            title="Integration with Existing Platforms:"
            content="The barrier to entry is further lowered by integrating Bitcoin Yay with familiar platforms. For instance, if Indexx Wallet is already used by some, BTCY mining is built into it so existing Indexx users can start earning with one tap. Also, allowing sign-in via Google/Apple accounts (with non-custodial keys still generated behind the scenes) makes registration frictionless for mainstream users."
          />
          <CustomListItem2
            title="Security for New Users:"
            content="Recognizing many new adopters may be casual users, the app offers easy-yet-secure options like cloud backup for keys (encrypted with user’s password) to prevent loss of funds, and explains security in simple terms. This is important because a lost key could mean lost BTCY, so the app encourages backup during onboarding, perhaps even rewarding users with a small BTCY bonus for safely backing up their wallet."
          />
        </CustomUnorderedList>
        <CustomHeading2 content="10.3 Long-Term Adoption Strategy" />
        <CustomUnorderedList>
          <CustomListItem2
            title="Consistent Branding & Messaging:"
            content="“Bitcoin Yay” – the very name – gives a friendly, positive spin to Bitcoin. All marketing emphasizes positivity, inclusivity, and excitement (“Yay!”). The gopher mascot adds charm and memorability. This consistent branding helps Bitcoin Yay stand out in a crowded market and makes it approachable, countering Bitcoin’s sometimes intimidating image."
          />
          <CustomListItem2
            title="Press & Media Outreach:"
            content="The team reaches out to crypto media (CoinDesk, CoinTelegraph, etc.) and even mainstream tech media to cover Bitcoin Yay’s story – highlighting its alliance with Indexx, the innovative AI mining, and its rapid user growth. Getting featured in reputable outlets lends legitimacy and attracts a broader audience beyond the initial crypto enthusiasts."
          />
          <CustomListItem2
            title="Offline Events:"
            content="As the world reopens post-pandemic, Bitcoin Yay sponsors and attends crypto conferences, hackathons, and community gatherings. Seeing a booth or banner for “Bitcoin Yay – Redefining Bitcoin with AI & Mobile Mining” in the real world reinforces that it’s a serious project. Swag like t-shirts (“Yay or Nay? It’s Always Yay!”) and live demos of the mining app at events help capture interest from those who might not encounter the app online."
          />
          <CustomListItem2
            title="Adaptability:"
            content="The strategy remains flexible. If certain campaigns work exceptionally (e.g., a TikTok trend around Bitcoin Yay dances or memes), the team doubles down. If some regions show unexpected traction, marketing spend shifts to support those locales. The project’s community-driven nature means it listens to feedback – if the community suggests a particular outreach (like targeting a specific online community or game), the team considers it. By Phase 3, the community itself (via the DAO) might even allocate funds for marketing initiatives they vote on."
          />
        </CustomUnorderedList>
        <CustomPWithTitle2 content="In summary, Bitcoin Yay’s marketing and adoption plan is holistic: it combines viral growth tactics (airdrops, referrals), community engagement (rewards for content creation, strong social presence), influencer and media amplification, and a user-friendly experience. The goal is to rapidly build a large, engaged user base that not only mines BTCY but actively uses it, thereby creating a self-sustaining, growing economy around Bitcoin Yay." />
      </SectionDiv>

      <SectionDiv id="conclusion">
        <div className="flex flex-col xl:flex-row gap-10 items-center justify-center">
          <Image src={ArtImage9} alt="Art" className="w-80 md:w-100 xl:w-140" />
          <div>
            <CustomHeading content="11. Conclusion" />
            <CustomUnorderedList>
              <CustomListItem2 content="Bitcoin Yay represents the next evolution of Bitcoin’s vision — scalable, efficient, and accessible to all. By leveraging Indexx’s infrastructure and embracing innovations like AI-guided mobile mining, Bitcoin Yay seeks to honor Bitcoin’s legacy while overcoming its limitations. BTCY’s design ensures sustainability through a fast halving schedule and robust tokenomics, utility through deep ecosystem integration, and community empowerment through decentralization and rewards." />
              <CustomListItem2 content="As Bitcoin Yay gradually transitions into a decentralized, community-governed network, it stays true to the core principles of blockchain technology (decentralization, transparency, security) while adapting to modern needs. The end result is a cryptocurrency that is not just mined and held, but actively used in a vibrant crypto playground — for trading, shopping, gaming, saving, and even giving back to society." />
              <CustomListItem2 content="Join us in shaping the future of decentralized finance with Bitcoin Yay. Together, we say “Yay!” to a new era of Bitcoin for everyone." />
            </CustomUnorderedList>
          </div>
        </div>
      </SectionDiv>
    </div>
  );
}
