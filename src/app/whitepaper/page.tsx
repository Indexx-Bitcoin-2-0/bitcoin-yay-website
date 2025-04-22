import CustomStyledConatiner from "@/components/CustomStyledContainer";
import { InfoSection, CustomListItem } from "@/components/CustomTypography";
import Image from "next/image";

import Whitepaper01 from "@/assets/images/whitepaper/whitepaper-01.svg";
import Whitepaper02 from "@/assets/images/whitepaper/whitepaper-02.svg";
import Whitepaper03 from "@/assets/images/whitepaper/whitepaper-03.svg";
import Whitepaper04 from "@/assets/images/whitepaper/whitepaper-04.svg";
import Whitepaper05 from "@/assets/images/whitepaper/whitepaper-05.svg";
import Whitepaper06 from "@/assets/images/whitepaper/whitepaper-06.svg";
import Whitepaper07 from "@/assets/images/whitepaper/whitepaper-066.svg";
import Whitepaper08 from "@/assets/images/whitepaper/whitepaper-07.svg";
import Whitepaper09 from "@/assets/images/whitepaper/whitepaper-08.svg";
import Whitepaper10 from "@/assets/images/whitepaper/whitepaper-09.svg";
import Whitepaper11 from "@/assets/images/whitepaper/whitepaper-10.svg";

export default function whitepaper() {
  return (
    <div className=" mx-auto max-w-[90vw] lg:px-10 py-8">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300  md:leading-16">
          Whitepaper Chapter
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Last Updated: March 10, 2025
        </p>
      </CustomStyledConatiner>
      <div className="md:p-10 lg:p-18">
        {/* Part 03 */}
        <InfoSection
          title="Bitcoin-Yay: A Decentralized Ecosystem Coin"
          desc="Abstract"
          endingLine="Bitcoin-Yay (BTCY) is a decentralized cryptocurrency designed as the foundation of a next-generation blockchain ecosystem. Built on the Stellar blockchain, Bitcoin-Yay enables fast, low-cost transactions while incorporating features like AI-driven mining, smart contracts, and decentralized governance. This white paper details the design, implementation, tokenomics, security, and governance of Bitcoin-Yay, aiming to create a sustainable, community-driven financial network."
        />
        {/* Image Center container */}
        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper01} alt="Whitepaper-01" />
        </div>
        <InfoSection
          title="1. Introduction"
          endingLine='Bitcoin Yay (BTCY) is a decentralized cryptocurrency designed as the foundation of a next-generation blockchain ecosystem. Bitcoin Yay is a new and smarter version of Bitcoin, tailored for everyday use, and serves as a "Micro Token of Bitcoin." Built on a high-performance Stellar-based blockchain, Bitcoin Yay enables fast, low-cost transactions while incorporating features like AI-driven mobile mining, smart contracts, and decentralized governance. This whitepaper details the design, implementation, tokenomics, security, and governance of Bitcoin Yay, aiming to create a sustainable, community-driven financial network.Inspired by the revolutionary vision of Bitcoin and the legacy of Satoshi Nakamoto, Bitcoin Yay is not merely a cryptocurrency — it is the continuation of an idea. While Bitcoin laid the foundation as digital gold, Bitcoin Yay evolves that foundation into a mobile-first, energy-efficient, and utility-rich ecosystem for real-world use. By lowering entry barriers and fostering inclusivity, Bitcoin Yay aspires to bring practical crypto usage to everyday people – from shopping and gaming to savings and micro-investments.'
        />
        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper02} alt="Whitepaper-02" />
        </div>

        <InfoSection
          title="2. Vision & Mission"
          desc="Vision:"
          endingLine="To create a seamless, user-friendly, and sustainable Bitcoin alternative that integrates novel financial incentives and mining structures while fostering mass adoption. Bitcoin Yay envisions a world where participating in the crypto economy is as simple as using a mobile app, and where digital currency truly becomes a part of everyday life across the globe."
        />

        <InfoSection
          desc="Mission:"
          endingLine="To build a hybrid blockchain system that maximizes user participation and enhances Bitcoin's legacy with more flexible mining and staking mechanisms. The project's mission emphasizes financial inclusivity – empowering anyone, anywhere to earn and use cryptocurrency – and continuous innovation, blending AI, mobile technology, and blockchain to address Bitcoin's shortcomings without losing its core principles."
        />

        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper03} alt="Whitepaper-03" />
        </div>
        <InfoSection
          title="3. Technical Architecture"
          desc="3.1 Blockchain Framework"
          endingLine="BTCY operates on a high-performance blockchain (based on Stellar's framework) designed for speed, security, and interoperability. The blockchain features:"
          content={
            <>
              <CustomListItem
                title="Proof-of-Participation (PoP) Mechanism: "
                content="A novel consensus approach integrating elements of Proof-of-Stake and AI-optimized participation. Network participants earn rewards based on engagement and network support rather than brute-force hashing, making mining energy-efficient and accessible on everyday devices."
              />
              <CustomListItem
                title="Smart Contract Layer: "
                content="Enabling decentralized applications (dApps) and trustless governance. Developers can create smart contracts for voting, DeFi (decentralized finance) applications, NFTs, and more, using BTCY as fuel for an ecosystem of programmable finance."
              />
              <CustomListItem
                title="Cross-Chain Compatibility: "
                content="Planned bridges (initially centralized through Index) will allow BTC holders to swap into BTCY (1 BTC → 1,000,000 BTCY) and vice versa, leveraging Bitcoin's liquidity and user base. Compatibility with Ethereum, BNB Chain, and other networks is targeted via wrapped BTCY tokens, positioning BTCY as an interoperable asset across multiple crypto ecosystems."
              />
            </>
          }
        />

        <InfoSection
          desc="3.2 Security & Privacy"
          endingLine="Security is paramount in Bitcoin Yay's design, especially given its novel elements. Multiple layers of security and privacy are implemented:"
          content={
            <>
              <CustomListItem
                title="Multi-Layered Encryption: "
                content="All transactions and communications use advanced cryptography (including quantum-resistant algorithms) to future-proof against next-gen threats. User wallets feature strong encryption (e.g., AES-256 for local storage) and biometric access in the mobile app. Zero-Knowledge Proofs (ZKPs) are explored so users can prove eligibility or ownership (for governance votes, etc.) without exposing private data."
              />
              <CustomListItem
                title="AI-Powered Threat Detection: "
                content="The same AI that optimizes participation also monitors network traffic to detect anomalies in real-time. Unusual patterns (like a surge of suspicious transactions or a malicious node's behavior) trigger alerts or automated mitigation. The AI governance layer can flag misbehaving validators for removal, and machine learning models continuously improve security responses."
              />
              <CustomListItem
                title="Byzantine Fault Tolerance: "
                content="Validator nodes operate under a BFT consensus protocol, tolerating a fraction of faulty or malicious nodes without compromising the network. Validators are required to stake BTCY or be elected by the community (once governance is decentralized), aligning their interests with network health. Slashing mechanisms penalize bad actors."
              />
              <CustomListItem
                title="Light Nodes for Decentralization: "
                content="To encourage broad participation, the network supports light nodes (e.g., within the mobile app) that can verify transactions without downloading the entire ledger. This allows even smartphones to contribute to network verification, improving decentralization and user trust (users don't have to rely solely on a centralized server to confirm transactions)."
              />
              <CustomListItem
                title="Regular Audits & Bounties: "
                content="The team commits to regular third-party security audits of smart contracts, wallet code, and infrastructure. Findings are transparently published. A bug bounty program incentivizes independent security researchers to report vulnerabilities, adding an extra layer of defense."
              />
            </>
          }
        />

        <InfoSection endingLine="Through encryption, AI oversight, robust consensus, and a clear decentralization roadmap, Bitcoin Yay aims for high security and trust from day one while progressively handing control to the community." />

        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper04} alt="Whitepaper-04" />
        </div>
        <InfoSection
          title="4. Tokenomics"
          desc="4.1 Total Supply & Distribution"
          endingLine="Fixed Total Supply: Hard-capped at 21 billion BTCY tokens, mirroring Bitcoin's 21 million cap via micro-token conversion (1 BTC → 1,000,000 BTCY). This ensures BTCY remains scarce in the long run, creating incentive for holding and naturally limiting inflation."
        />

        <InfoSection
          desc="Bitcoin Conversion Ratio:"
          endingLine="At launch, 1 BTC is set to equal 1,000,000 BTCY. Hypothetically, converting all 21 million BTC would yield 21 trillion BTCY. If you own 1 BTC, you can claim 1,000,000 BTCY; 0.1 BTC equates to 100,000 BTCY, and so forth. This ties Bitcoin Yay's value conceptually to Bitcoin, and a reserve mechanism backs this by holding actual BTC."
        />

        <InfoSection
          desc="Initial Distribution Breakdown:"
          endingLine="The allocation of 21 trillion BTCY is strategically planned for ecosystem needs:"
          content={
            <>
              <CustomListItem
                title="40% (8.4 Trillion) – "
                content="Mining Rewards & Ecosystem Incentives: Reserved for distribution via the mining programs (Scratch Gopher free mining, Nugget Gopher paid plans, etc.) and other user participation incentives. This large allocation ensures the community can earn a significant share of the supply over time through user growth and engagement."
              />
              <CustomListItem
                title="10% (2.1 Trillion) – "
                content="Satoshi Nakamoto Legacy Allocation: In tribute to Bitcoin's creator, earmarked for Bitcoin. Practically, these tokens could be locked or even burned to symbolize transfer to Satoshi's inaccessible wallet. It serves as a narrative bridge between BTC and BTCY, a thoughtful nod to the origins of the project."
              />
              <CustomListItem
                title="20% (4.2 Trillion) – "
                content="Developer & Infrastructure Fund: Held by the project team/index over an initial 2-4 year period. Funds ongoing development, infrastructure (servers, support), and rewards for core contributors. A vesting schedule prevents the team from flooding the market and aligns their incentives with Bitcoin Yay's long-term success."
              />
              <CustomListItem
                title="15% (3.15 Trillion) – "
                content="Index Treasury (Liquidity & Stability): Allocated to Index to manage liquidity on exchanges, perform market making, and support token stability. The treasury will also help back the BTC reserve mechanism (swapping some BTCY for BTC over time to fill reserves). It acts as a buffer to stabilize price and ensure convertibility."
              />
              <CustomListItem
                title="10% (2.1 Trillion) – "
                content="Community & Influence Incentives: Dedicated to airdrops, rewards, community events, and influencer partnerships. This allocation seeds the initial user base and drives buzz (e.g., free BTCY gives to early adopters, bounties for social media promotions, etc.). By distributing tokens through community engagement campaigns, Bitcoin Yay kickstarts network effects and public awareness."
              />
              <CustomListItem
                title="5% (1.05 Trillion) – "
                content="Strategic Partnerships & Institutional Adoption: Reserved for key partners or institutional participants. These tokens incentivize collaborations with payment providers, merchants, fintech companies or even NGOs to integrate BTCY. Having a reserve for strategic outreach provides flexibility to foster adoption in larger contexts (for example, rewarding a partner app for accepting BTCY, or encouraging a financial institution to pilot BTCY-based services)."
              />
            </>
          }
        />

        <InfoSection endingLine="This distribution ensures that a majority of tokens (50%, from mining + community programs) are up in the hands of the community. A substantial portion (35%) is vitally held by the team/index for development and liquidity but with clear purpose and vesting to mitigate centralization risk. The Satoshi tribute and partnership allocations further align BTCY with the broader crypto narrative and future expansion." />

        <InfoSection
          desc="Circulating Supply Trajectory:"
          endingLine="Not all 21T will circulate immediately. Only a small fraction enters circulation at launch (e.g., via initial partners and exchange liquidity). Mining rewards (the 8.4T allocation) will be released gradually over many years. Other allocations like the Treasury and Dev Fund will also unlock strategically. This controlled release, similar to vesting in many projects, avoids oversupply in the market at launch and supports long-term price stability."
        />

        <InfoSection
          desc="4.2 BTCY Price Strategy"
          content={
            <>
              <CustomListItem
                title="Pegged Early Value: "
                content="During the early adoption phase, BTCY is effectively pegged to a notional value of $0.10 per BTCY via mechanisms on the Index's platform. For example, on Index's Exchange, '10 BTCY = 1 USDC' (Index's USD stablecoin) by market making. 1 BTC = $60k. Users can swap BTCY for stablecoins at roughly 1/10 rate (less a conversion fee). This provides a value floor for BTCY and gives holders confidence that their BTCY can be converted to a stable value."
              />
              <CustomListItem
                title="Reserve-Backed Stability: "
                content="To support this peg, Index maintains a reserve of stablecoins and Bitcoin. Whenever users convert BTCY to a stablecoin (like USDC+ or USDC), the converted BTCY is taken out of circulation and the reserve supplies the equivalent stablecoins to the user. Otherwise, if users buy BTCY with stablecoins, BTCY from the treasury or reserve is released and stablecoins are added to the reserve. This acts similar to a crypto bank currency market, buffering BTCY's price against volatility."
              />
              <CustomListItem
                title="Fee Mechanisms: "
                content="Conversion and transfer fees are used to control token velocity and fuel the reserve:"
              />
              <CustomListItem content="Converting BTCY to other tokens incurs a fee (e.g., 15% fee when swapping to internal tokens like USDC+, and up to 20% fee for external stablecoins like USDCUSDT). These steep fees aim to minimize dumping BTCY immediately for cash. They have a significant purpose, where tokens mass transition and centralize holding of using BTCY within the ecosystem." />
              <CustomListItem content="Similarly, converting to Bitcoin (BTC) has a high fee, reflecting that directly acquiring BTC from BTCY is treated as a form of cashing out. (For example, converting BTCY to BTC might carry a 25% fee.) These percentages can be adjusted via governance, but initially they create friction that slows down speculative flipping of BTCY." />
              <CustomListItem content="Collected fees (in stablecoins or BTC) feed back into the system — for instance, a portion may be burned (reducing supply) and the rest added to the reserve. This deflationary aspect and reserve-funding further stabilize the token." />
              <CustomListItem
                title="Bitcoin Reserve Model: "
                content="A portion of mining fees and revenues is allocated to continuously purchase Bitcoin for a strategic reserve. This BTC reserve backs the BTCY ecosystem; for example, it enables a future feature where users can swap BTCY for actual BTC at market rates. As BTCY decentralizes over time, this reserve could be placed under community control via smart contracts. The existence of a Bitcoin reserve ties BTCY to Bitcoin's success — if Bitcoin's value rises, BTCY's backing strengthens, providing holders additional confidence."
              />
              <CustomListItem
                title="Gradual Float: "
                content="Over time, as BTCY becomes widely held and its utility proven, the project may move the $0.10 peg to allow BTCY's market price to float upward. Any such change would be decided via decentralized governance once the network matures. In the long run, BTCY's value will be supported by its scarcity (controlled by halving and burns), its utility in the ecosystem, and the underlying reserves, rather than a fixed peg."
              />
            </>
          }
        />

        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper05} alt="Whitepaper-05" />
        </div>
        <InfoSection
          title="5. Mining & Participation Model"
          endingLine="BTCY introduces an innovative mining model inspired by gopher-themed tiers to encourage broad participation in the network."
        />

        <InfoSection
          desc="5.1 Bitcoin Yay Gopher Mining System"
          content={[
            <CustomListItem
              key="scratch"
              title="Scratch Gopher (Free Mining Program): "
              content="BTCY level free mining with minimal commitment, allowing anyone to start earning BTCY at no cost. Base speed is 1x (earning ~3 BTCY/hour total). While free, users may need to perform small in-app tasks like viewing ads or providing feedback to maintain rewards. This onboards anyone at zero cost and ensures engagement."
            />,
            <CustomListItem
              key="pocket"
              title="Pocket Gopher (Influencer & Network Program): "
              content="Rewards social engagement, referrals, and community growth. Users who refer others or create content about BTCY earn bonus BTCY. This isn't a fixed mining rate but but rather a way to boost earnings via milestones (for example, referring a friend might give both referrer and referee a one-time BTCY bonus). Incentivizes community builders to spread the word."
            />,
            <CustomListItem
              key="nugget"
              title="Nugget Gopher (Paid Subscription): "
              content="Premium mining tiers with enhanced earning potential and priority help, offering higher base speeds:"
            />,
            <CustomListItem
              key="electric"
              title="Electric Power (Base Paid): "
              content="3× speed (~9 BTCY/hour) for $100/month. Perks include faster transaction processing on the network."
            />,
            <CustomListItem
              key="turbo"
              title="Turbo Power (Mid Paid): "
              content="6× speed (~18 BTCY/hour) for $200/month. Comes with 'super-speed' mining and priority withdrawals – if there's ever a queue or limit on withdrawals, Turbo users are first in line."
            />,
            <CustomListItem
              key="nuclear"
              title="Nuclear Power (Top Paid): "
              content="9× speed (~27 BTCY/hour) for $500/month. Offers ultra-speed mining and VIP support (dedicated customer service, faster issue resolution, and exclusive community perks). Nuclear users are major financial supporters of the network and reap the highest base rewards (nine times the free rate)."
            />,
            <CustomListItem
              key="nerdy"
              title="Nerdy Gopher (Developer Program): "
              content="Aimed at developers and tech contributors. Instead of a fixed hourly rate, developers 'mine' BTCY by completing bounties such as writing smart contracts, building dApps, or improving security. This program rewards technical contributions to the ecosystem with BTCY grants. It ensures developers have incentive to grow the platform."
            />,
          ]}
        />

        <InfoSection endingLine="These gopher-themed tiers cleverly segment the community: Those who can pay to subscribe support the project's finances and in return receive more BTCY; those who cannot pay can still earn via the free plan or through contributions like referrals and development, ensuring inclusivity for all types of participants." />

        <InfoSection
          desc="Subscription-Based Mining Plans Overview:"
          content={
            <div className="overflow-x-auto">
              <table className="min-w-full bg-transparent border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-left">Plan (Gopher Tier)</th>
                    <th className="py-3 px-4 text-left">Speed Boost</th>
                    <th className="py-3 px-4 text-left">
                      Mining Rate (per hour)
                    </th>
                    <th className="py-3 px-4 text-left">Cost</th>
                    <th className="py-3 px-4 text-left">Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">
                      Free Plan (&ldquo;Scratch Gopher&rdquo;)
                    </td>
                    <td className="py-3 px-4">1× (baseline)</td>
                    <td className="py-3 px-4">~3 BTCY/hour</td>
                    <td className="py-3 px-4">$0</td>
                    <td className="py-3 px-4">
                      Standard 24 hours/day mining availability. No cost entry
                      for all users. Requires simple engagement (e.g., watch
                      ads) to maintain mining.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">Electric Power</td>
                    <td className="py-3 px-4">3×</td>
                    <td className="py-3 px-4">~9 BTCY/hour</td>
                    <td className="py-3 px-4">$50/m</td>
                    <td className="py-3 px-4">
                      High-speed mining. Faster transaction processing on the
                      network.
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">Turbo Power</td>
                    <td className="py-3 px-4">6×</td>
                    <td className="py-3 px-4">~18 BTCY/hour</td>
                    <td className="py-3 px-4">$100/m</td>
                    <td className="py-3 px-4">
                      Super-speed mining. Priority withdrawal processing
                      (withdrawals are prioritized for Turbo users).
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4">Nuclear Power</td>
                    <td className="py-3 px-4">9×</td>
                    <td className="py-3 px-4">~27 BTCY/hour</td>
                    <td className="py-3 px-4">$250/m</td>
                    <td className="py-3 px-4">
                      Ultra-speed mining. VIP support (dedicated customer
                      service, faster issue resolution, exclusive perks).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        />

        <InfoSection endingLine="(Note: The paid tiers are optional. All users can earn BTCY on the Free plan; paid plans simply accelerate earnings and provide additional benefits.)" />

        <InfoSection
          desc="5.2 Mining Incentives"
          content={[
            <CustomListItem
              key="tiered"
              title="Tiered Rewards: "
              content="Higher-tier subscriptions unlock significantly better base mining rates (as shown above), incentivizing those who find value in faster earnings to support the network financially."
            />,
            <CustomListItem
              key="natural"
              title="Natural Progression: "
              content="Users can increase their mining capacity without paying by actively participating in the community. For example, consistently staking BTCY or being highly engaged can improve one's AI Mining Score (discussed below) which multiplies earnings. Thus, even Free users can boost rewards by contributing to network growth."
            />,
            <CustomListItem
              key="ai-boosts"
              title="AI Efficiency Boosts: "
              content="The AI-driven system will continually adjust and introduce efficiency bonuses for long-term and highly active miners. For instance, during special events or as a reward for sustained participation, the AI might grant temporary multipliers or bonus tasks that yield extra BTCY."
            />,
          ]}
        />

        <InfoSection
          desc="5.3 AI Mobile Mining Architecture"
          endingLine="Bitcoin Yay's mining mechanism is powered by an AI-driven system that ensures mining is efficient, engaging, and fair. As mentioned, it follows a teacher-student model using knowledge distillation:"
        />

        <InfoSection
          desc="5.3.1 Knowledge Distillation Model"
          endingLine="A central 'Master' AI (the Teacher) analyzes user activity patterns across the network – looking at engagement, task completion, referrals, transaction frequency, and other behaviors beneficial to the ecosystem. It learns which behaviors contribute most to Bitcoin Yay's growth and security."
        />

        <InfoSection
          endingLine="This knowledge is distilled into lightweight 'mining tasks' sent to each user's mobile app (the Student). Each user's app gets tasks tailored to their device capabilities and past engagement level:"
          content={[
            <CustomListItem
              key="minimal"
              title="Minimal resource usage: "
              content="Tasks are designed to not drain battery or require significant computing power."
            />,
            <CustomListItem
              key="personalized"
              title="Personalized experience: "
              content="New or less active users receive simple tasks (e.g., backup your wallet, make a small transaction, watch a short tutorial video), while highly engaged users might get more involved tasks (e.g., refer a friend, host a meetup, write a post about BTCY)."
            />,
            <CustomListItem
              key="mass"
              title="Mass participation: "
              content="By keeping tasks lightweight and relevant, anyone with a smartphone can participate in mining without specialized hardware."
            />,
          ]}
        />

        <InfoSection
          desc="5.3.2 Mining Task Distribution"
          endingLine="The backend AI system assigns a variety of mobile-optimized tasks, such as:"
          content={[
            <CustomListItem
              key="viewing"
              content="Viewing rewarded ads or educational content (for a small boost in mining rate)."
            />,
            <CustomListItem
              key="solving"
              content="Solving gamified puzzles or quizzes about crypto (to encourage learning while mining)."
            />,
            <CustomListItem
              key="completing"
              content="Completing profile setups or identity verification (which increases trustworthiness and yields higher scores)."
            />,
            <CustomListItem
              key="sharing"
              content="Sharing referral links or engaging in social media campaigns (to grow the network)."
            />,
          ]}
        />

        <InfoSection
          endingLine="These tasks are delivered through secure APIs:"
          content={[
            <CustomListItem
              key="distillation"
              title="A Distillation Engine API "
              content="provides each app with its next set of tasks, distilled from the global AI's learning."
            />,
            <CustomListItem
              key="boost"
              title="A Boost Engine API "
              content="may introduce special time-based events (e.g., during a promotional week, all users get a puzzle that doubles their rate for an hour upon completion)."
            />,
            <CustomListItem
              key="mining"
              title="A Mining Reward API "
              content="ensures that when tasks are completed, BTCY rewards are distributed fairly and transparently according to each user's base rate and multipliers."
            />,
          ]}
        />

        <InfoSection
          desc="5.3.3 AI Mining Score (AMS)"
          endingLine="Every user has an AI Mining Score that dynamically adjusts their personal mining multiplier (on top of the base rates from their plan). This score is influenced by:"
          content={[
            <CustomListItem
              key="device"
              title="Device and Activity Consistency: "
              content="Regular app usage (opening the app daily, keeping the miner active) and maintaining a verified device."
            />,
            <CustomListItem
              key="task"
              title="Task Completion: "
              content="Successfully doing the AI-assigned tasks. Completing more tasks reliably increases the score."
            />,
            <CustomListItem
              key="referral"
              title="Referral Network Strength: "
              content="Bringing new users and keeping them active raises the score (the network effect is rewarded)."
            />,
            <CustomListItem
              key="staking"
              title="Staking Participation: "
              content="Users who stake BTCY or otherwise lock in their commitment to the network may receive a higher score."
            />,
          ]}
        />

        <InfoSection endingLine="The AI Mining Score ranges through levels that correspond roughly to multipliers from 1× up to a maximum (e.g., 10× for extremely engaged users). For example, a Free Plan user (base 1×) who is very active might achieve a 2× or 3× AMS multiplier, effectively earning 2-3 times the base 3 BTCY/hour rate. By rewarding smarter and more helpful engagement rather than raw computing power, Bitcoin Yay turns mining into a participatory, gamified, and merit-based experience." />

        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper06} alt="Whitepaper-06" />
        </div>
        <InfoSection
          title="6. Integration with the Indexx Ecosystem"
          endingLine="BTCY will be fully integrated within the Indexx ecosystem to drive adoption and provide immediate utility:"
          content={[
            <CustomListItem
              key="exchange"
              title="Indexx Exchange: "
              content="BTCY is listed on the Indexx Exchange from launch. Users can trade BTCY against other assets and even stake BTCY on the exchange for additional rewards. The exchange supports BTCY-to-stablecoin conversion at the pegged rate (subject to fees), providing liquidity and a clear use-case for mined tokens."
            />,
            <CustomListItem
              key="shop"
              title="Indexx Shop: "
              content="An online marketplace where users can purchase crypto gift cards, greeting cards, and other digital goods using BTCY. Paying with BTCY may offer discounts or special deals, demonstrating BTCY's power as a spending currency. For example, after mining for a few weeks, a user could redeem BTCY for an Amazon gift card via Indexx Shop."
            />,
            <CustomListItem
              key="lotto"
              title="Indexx Lotto: "
              content="BTCY holders gain exclusive access to crypto-based lottery games on the Indexx Lotto platform. Users can spend BTCY to enter drawings or special lottery pools (with thresholds to participate ensuring only engaged users join). This adds a fun gamification aspect to holding BTCY."
            />,
            <CustomListItem
              key="hive"
              title="Indexx Hive: "
              content="A community membership and rewards hub tied to BTCY staking. Users who stake certain amounts of BTCY gain membership in the 'Hive,' unlocking perks like higher referral bonuses, voting rights in project governance (as BTCY transitions to a DAO), and access to exclusive content or events. This fosters a loyal community and incentivizes holding and staking BTCY."
            />,
          ]}
        />

        <InfoSection endingLine="From day one, Bitcoin Yay benefits from being born into Indexx's ecosystem. Instead of having to create demand from scratch, BTCY plugs into existing platforms where it has immediate usefulness — trading, shopping, gaming, and more. This comprehensive integration means a user can earn BTCY by mining in the morning, trade some for stablecoin in the afternoon, stake some for interest by evening, and spend a little at night for entertainment, all within one connected crypto environment." />

        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper07} alt="Whitepaper-07" />
        </div>

        <InfoSection
          title="7. Roadmap & Development Phases"
          endingLine="Bitcoin Yay's development is planned in clear phases from 2025 onward, with each phase building on the last to gradually decentralize the project and expand its reach:"
          content={[
            <CustomListItem
              key="phase1"
              title="Phase 1: Foundation & Launch (Q2 2025 – Q3 2025) – "
              content="Core infrastructure set up, BTCY token generation event (launching BTCY on Indexx Exchange and initial DEXs). Launch of the Bitcoin Yay mobile wallet (alpha/beta) allowing wallet creation, basic BTC/BTCY swaps, and Free Plan mining (Snatch Gopher). Early adopter incentives like airdrops and referral bonuses kick in. Paid mining subscriptions (Electric, Turbo, Nuclear) roll out to initial users. Community channels (Telegram, Discord) are opened and the first marketing campaigns and influencer partnerships begin to create buzz."
            />,
            <CustomListItem
              key="phase2"
              title="Phase 2: Expansion & Utility (Q4 2025 – Q2 2026) – "
              content="Focus on expanding use-cases for BTCY. BTCY Staking & Governance features launch (users can stake BTCY for yield and preliminary voting rights). Full integration with Indexx Shop and Lotto is achieved (BTCY widely spendable for gift cards, lottery tickets). Smart contract functionality is deployed on Bitcoin Yay's network, enabling third-party dApps. The Nerdy Gopher developer bounty program starts to encourage developers to build on BTCY (with hackathons and bug bounties). Listings on additional exchanges and liquidity pools on DeFi platforms (Ethereum/BSC) broaden BTCY's availability. Strategic partnerships are pursued using the 5% allocation to bring in fintech or gaming platforms. By the end of Phase 2, hundreds of thousands of users are actively mining or using BTCY, and BTCY is transitioning from something people only earn to something they actively spend and utilize."
            />,
            <CustomListItem
              key="phase3"
              title="Phase 3: Decentralization & Governance (Q3 2026 – Q4 2026) – "
              content="Emphasis on handing control to the community. Bitcoin Yay DAO is established with governance smart contracts; BTCY stakers can now vote on proposals (e.g., adjusting fees or mining rates). The team begins transferring critical controls to the DAO (treasury management, protocol parameters). The validator set becomes more decentralized, possibly adding community-run nodes to reduce Indexx's share. Cross-chain bridges to major networks (Ethereum, BNB Chain) go live, allowing wrapped BTCY to circulate and tap into external DeFi markets. This year also sees global expansion efforts: regional ambassadors, compliance in new jurisdictions, and outreach to institutions (presenting BTCY as a 'Bitcoin for everyone' solution). By the end of 2026, the project aims to be operationally independent of the core team – running increasingly as a self-governed network."
            />,
            <CustomListItem
              key="phase4"
              title="Phase 4: Global Adoption & Sustainability (2027 and beyond) – "
              content="Bitcoin Yay is fully decentralized and aiming for mainstream recognition. The 21 trillion cap will be nearly reached by this time (due to the rapid halving schedule), meaning new issuance is very low and BTCY's economy stabilizes on transaction fees and recycling of tokens. The community (via the DAO) controls all key aspects of the network. The project pushes for integration in mainstream finance – e.g., getting BTCY listed on major global exchanges, included in index funds or ETFs, and accepted by additional payment processors. Indexx Pay launches, allowing users to spend BTCY via crypto debit cards or merchant payment gateways, bridging into physical retail. The Bitcoin Gopher Phone (a leased dedicated device for BTCY mining) might be released, further simplifying user acquisition. Throughout, continuous innovations (like exploring quantum-resistant tech or enhanced privacy features) are adopted via governance proposals to keep Bitcoin Yay technologically relevant. By this stage, Bitcoin Yay strives to be a ubiquitous 'everyday Bitcoin,' secure, self-sustaining, and used by millions worldwide."
            />,
          ]}
        />

        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper08} alt="Whitepaper-08" />
        </div>

        <InfoSection
          title="8. Withdrawal Rules & Vetting System"
          endingLine="To maintain network stability, prevent abuse, and ensure fair token distribution, Bitcoin Yay implements a structured withdrawal and usage vetting system. This system discourages immediate dumping of mined coins and aligns with the long-term vision:"
          content={[
            <CustomListItem
              key="minimum"
              title="Minimum Usage/Withdrawal Threshold: "
              content="Users must accumulate at least 100,000 BTCY before they can initiate external withdrawals or fully access certain conversion features (trading BTCY for other assets, making payments outside the ecosystem, etc.). This threshold ensures that users contribute meaningfully (e.g., roughly a few months of mining on Free plan) before extracting value, reducing the likelihood of users joining just to instantly sell and leave."
            />,
            <CustomListItem
              key="phased"
              title="Phased Withdrawal Schedule: "
              content="Even after reaching 100,000 BTCY, users cannot withdraw the entire amount in one go. Withdrawals are vested over a period (for example, 6 months) to prevent sudden sell-offs. Users may withdraw a portion of their balance each month instead of a lump sum. This gradual release ensures a more stable market and rewards continued engagement."
            />,
          ]}
        />

        <InfoSection
          desc="Vesting Example (for 100,000 BTCY):"
          content={[
            <CustomListItem
              key="month1"
              content="Month 1: 10,000 BTCY max withdrawable"
            />,
            <CustomListItem key="month2" content="Month 2: 15,000 BTCY" />,
            <CustomListItem key="month3" content="Month 3: 20,000 BTCY" />,
            <CustomListItem key="month4" content="Month 4: 20,000 BTCY" />,
            <CustomListItem key="month5" content="Month 5: 20,000 BTCY" />,
            <CustomListItem key="month6" content="Month 6: 15,000 BTCY" />,
          ]}
        />

        <InfoSection endingLine="(In this example schedule, the 100k BTCY is fully released by month 6. This encourages holders to stay engaged during the release period. Actual percentages can be tuned by governance, but the principle is a tapered release with heavier amounts in the middle months and a slowdown towards the end.)" />

        <InfoSection
          content={[
            <CustomListItem
              key="automated"
              title="Automated Fraud Vetting: "
              content="Each withdrawal request undergoes automated checks. The system uses AI to detect suspicious behavior such as multiple accounts funneling funds to one user, bots attempting mass withdrawals, or any patterns indicative of fraud. Suspected cases may be flagged for manual review or slight delay. Legitimate users will generally not notice this vetting, but it adds a safeguard against exploitative practices."
            />,
            <CustomListItem
              key="fees"
              title="Withdrawal Fees: "
              content="To further discourage impulsive withdrawals that could hurt the ecosystem:"
            />,
          ]}
        />

        <InfoSection
          content={[
            <CustomListItem
              key="fee10"
              content="- A 10% fee applies to immediate one-time withdrawals (if a user insists on bypassing the vesting schedule and taking out a large amount at once)."
            />,
            <CustomListItem
              key="fee3"
              content="- A much lower 3% fee (or similar small fee) applies to withdrawals that follow the recommended vesting schedule over 6 months."
            />,
          ]}
        />

        <InfoSection endingLine="This fee structure strongly incentivizes gradual withdrawals. For example, if someone reaches 100k BTCY and converts it all at once, they'd pay a 10% fee; by contrast, if they withdraw in stages over time, they'd pay only 3% on those withdrawals. Fees collected here either get burned (reducing supply) or added to reserves, benefiting the token economy." />

        <InfoSection endingLine="Overall, this vetting and withdrawal system ensures Bitcoin Yay's early adopters cannot unfairly or destructively dump large amounts of BTCY, which protects the token's value and the community. It aligns users with the project's long-term success: those who stick around and withdraw gradually are rewarded with lower fees and potentially more token utility unlocked as they remain engaged." />

        <InfoSection endingLine="(Note: The updated Bitcoin Yay framework also introduces tiered utility thresholds for various features, as described in the Tokenomics and Utility sections. Rather than a single high withdrawal threshold, users unlock different features (trading, stablecoin conversion, BTC conversion, etc.) at different BTCY levels, some of which are below 100k. The 100k figure mentioned here is a general benchmark for full token liquidity access. The key takeaway is that new users are guided into the ecosystem gradually, and large liquidations are discouraged by design.)" />

        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper09} alt="Whitepaper-09" />
        </div>

        <InfoSection
          title="9. Legal & Compliance"
          desc="9.1 Disclaimer & Regulatory Compliance"
          content={[
            <CustomListItem
              key="operates"
              content="Bitcoin Yay operates within global regulatory frameworks to the greatest extent possible:"
            />,
            <CustomListItem
              key="legal"
              title="Legal Disclaimer: "
              content="All official documentation and the app include clear disclaimers that participation is at the user's own risk. Users are reminded that cryptocurrencies are volatile and that BTCY is a utility token intended for use within the ecosystem, not an investment contract with guaranteed profits. No communication is presented as financial advice. By being transparent about risks (technology failures, market swings, regulatory changes), the project sets correct expectations and avoids misleading users."
            />,
            <CustomListItem
              key="kyc"
              title="KYC/AML Measures: "
              content="The platform adheres to Know-Your-Customer and Anti-Money-Laundering policies where applicable. For example, users who wish to convert BTCY to other assets or withdraw beyond certain limits will need to verify their identity (e.g., provide ID documents) through an integrated KYC provider integrated into the app. This ensures compliance with financial regulations (such as FinCEN guidelines in the US, FINMA in Switzerland, etc.) and prevents illicit use of the platform."
            />,
          ]}
        />

        <InfoSection
          desc="9.2 Token Legality and Governance"
          content={[
            <CustomListItem
              key="utility"
              title="Utility Token Stance: "
              content="The Bitcoin Yay team has structured BTCY to avoid classification as a security. Since BTCY is earned via user actions (mining) and has immediate utility (it can be spent in the ecosystem, converted to stablecoins, used for services), it is presented as a consumer utility token, not a speculative investment. The whitepaper and marketing refrain from using language like 'invest' or 'investment,' focusing instead on usage and participation. This positioning is intended to follow guidance (such as the Howey Test in the US) that differentiate utility tokens from securities. However, the team remains vigilant: if regulators provide new guidance or request information, Bitcoin Yay will cooperate and adjust its compliance approach as needed."
            />,
            <CustomListItem
              key="ip"
              title="Intellectual Property: "
              content="The project acknowledges that the name 'Bitcoin' is open-source and not trademarked, which is why 'Bitcoin Yay' can be used. The team is taking steps to trademark 'Bitcoin Yay,' the logo, and other ecosystem names like 'Bitcoin YesIndex' (the stablecoin) to prevent fraudulent imposters. All official materials include clear trademark and copyright notices. The core blockchain code will be open-sourced under a permissive license to build trust and encourage community contributions, but certain proprietary elements (for example, specific AI algorithms or branding assets) may be protected."
            />,
            <CustomListItem
              key="agreement"
              title="User Agreement & Policies: "
              content="Upon sign-up, users agree to Terms of Service that outline acceptable use (no illicit activities using BTCY, no exploiting the platform for fraud, etc.). The platform reserves the right to suspend or ban users engaged in illegal activities in accordance with these terms and applicable law. A Privacy Policy is provided, detailing what data is collected and how it is used or protected."
            />,
            <CustomListItem
              key="compliance"
              title="Compliance Infrastructure: "
              content="Indexx's involvement means there is likely a compliance team in office overseeing these aspects. Despite similarities such as assigned, fixed-cap (if Bitcoin Yay's model involves holding reserves of BTC on behalf of users to back conversions), the project may voluntarily publish periodic attestations of these reserves (similar to how stablecoin issuers do to prove transparency and solvency)."
            />,
          ]}
        />

        <InfoSection
          desc="9.3 Global Accessibility and Restriction"
          content={[
            <CustomListItem
              key="jurisdictional"
              title="Jurisdictional Considerations: "
              content="Bitcoin Yay aims to be globally accessible but will respect international sanctions and local regulations. For example, usage may be blocked in sanctioned countries (e.g., North Korea, Iran) and certain features (like paid mining subscriptions or token conversions) might be initially disabled in regions like the United States until there is clearer regulatory guidance. To avoid being misinterpreted as offering unregistered securities or investment products."
            />,
            <CustomListItem
              key="adapting"
              title="Adapting to Law Changes: "
              content="The compliance strategy is dynamic: As laws evolve, Bitcoin Yay will adapt (e.g., implementing new reporting requirements or registration if needed). By planning for compliance from the start, the project can adjust rather than be caught off-guard. In an extreme scenario, the DAO governance model provides flexibility: the community could vote on changes to tokenomics or operations to comply with new regulations if absolutely required."
            />,
          ]}
        />

        <InfoSection
          desc="9.4 Community-Centric Compliance"
          content={[
            <CustomListItem
              key="risk"
              title="Risk Warnings: "
              content="The app and documents prominently warn about crypto risks (volatility, potential loss of value, technological uncertainties). Users are explicitly told that BTCY is not a government-backed legal tender. By educating users on risks up front, Bitcoin Yay upholds the ethical of ensuring they were unaware of dangers, thereby attracting a user base that is informed and consents to the risk of participation."
            />,
            <CustomListItem
              key="transition"
              title="Transition to Decentralized Governance: "
              content="As Bitcoin Yay decentralizes, a unique aspect will be how the DAO interfaces with legal compliance. One possibility is the formation of a non-profit foundation that can represent the network's interests legally, sign contracts, or hold assets (like reserve funds) on behalf of the community. This foundation could ensure ongoing compliance (filing reports, handling KYC infrastructure, etc.) even when the core team steps back, bridging the gap between a decentralized network and real-world legal systems."
            />,
            <CustomListItem
              key="transparency"
              title="Transparency: "
              content="All legal and compliance efforts (like the creation of a Regulatory & Compliance Report or a Disclaimer & Legal Notice document) are made transparent to the community. The project's stance is that compliance is not an afterthought but a fundamental part of building trust. By openly sharing how it operates within the law, Bitcoin Yay aims to avoid legal interruptions and foster an image of a responsible, user-conscious crypto project. This proactive and transparent approach to compliance is expected to give Bitcoin Yay a competitive edge in longevity, as projects that take regulations seriously are more likely to survive and thrive as the crypto industry matures under the rule of law."
            />,
          ]}
        />

        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper10} alt="Whitepaper-10" />
        </div>

        <InfoSection
          title="10. Marketing & Adoption Strategy"
          desc="10.1 Awareness & Community Engagem"
          content={[
            <CustomListItem
              key="airdrops"
              title="Airdrops & Early Incentives: "
              content="Generous airdrops are planned to seed the initial user base. Early adopters who sign up during the launch window receive free BTCY in their wallets to jumpstart usage. Additionally, community-specific airdrops (e.g., to existing Indexx users or random Bitcoin holders as a 'Bitcoin micro-dividend') create buzz and spread tokens widely for decentralization"
            />,
            <CustomListItem
              key="referral"
              title="Referral Programs: "
              content="A built-in referral system (the 'Pocket Gopher' influencer program) rewards users for bringing in friends. Both referrer and referee get bonuses (for example, 1,000 BTCY each upon the new user reaching a certain milestone). This encourages viral growth; every user becomes an ambassador because inviting others boosts their own mining rate or yields additional BTCY."
            />,
            <CustomListItem
              key="influencer1"
              title="Influencer Partnerships: "
              content="Bitcoin Yay actively partners with crypto influencers on YouTube, Twitter (X), TikTok, etc. Early in the launch, selected influencers are given beta access or exclusive content to share. By leveraging personalities who already have trust within the crypto community, Bitcoin Yay positions itself as the next big thing ('mobile mining is back, now tied to Bitcoin – don't miss out!'). The community content rewards (section F of utility use cases) further mobilize micro-influencers to create tutorials, reviews, and memes in exchange for BTCY rewards."
            />,
            <CustomListItem
              key="social"
              title="Social Media Campaigns: "
              content="The project maintains a strong presence on platforms like Twitter, Instagram, Reddit, and Telegram:"
            />,
          ]}
        />

        <InfoSection
          content={[
            <CustomListItem
              key="official"
              content="Official accounts post regular updates, milestones (e.g., '100k users in the first month!'), and educational content explaining BTCY features."
            />,
            <CustomListItem
              key="hashtag"
              content="Hashtag campaigns (e.g., #BitcoinYay and #BTCYay) are used to spread catchy slogans. The branding allows playful meme potential — for instance, phrases like 'Yay or Nay? Always Yay!' or combining BTCY's stablecoin ('YesIndex') with Yay in slogans to spark curiosity."
            />,
            <CustomListItem
              key="meme"
              content="Meme contests and community challenges are frequently held, where users create Bitcoin Yay memes or short videos. The best entries are amplified on official channels and rewarded with BTCY. This grassroots content creates a fun culture around the project."
            />,
          ]}
        />

        <InfoSection
          content={[
            <CustomListItem
              key="educational"
              title="Educational Outreach: "
              content="The team publishes blog posts and hosts AMA (Ask Me Anything) sessions to educate and build credibility. Topics include 'How is Bitcoin Yay different from Bitcoin?' and 'Tutorial: Earning BTCY on your phone.' By addressing questions transparently and explaining the threshold/vesting model as a protective feature (not a deterrent), the team converts skeptics and fosters an informed community."
            />,
            <CustomListItem
              key="campus"
              title="Campus & Local Ambassadors: "
              content="The project may recruit campus ambassadors at universities or local community leaders to host meetups and workshops about Bitcoin Yay. These ambassadors are compensated in BTCY and get branded merchandise (T-shirts, stickers with the gopher mascot, etc.). University students, for example, are a prime audience (as seen with Pi Network's growth); Bitcoin Yay targets them by offering a tangible valued token and a clearer value proposition than previous mobile mining apps."
            />,
          ]}
        />

        <InfoSection
          desc="10.2 Onboarding & Accessibility"
          content={[
            <CustomListItem
              key="app"
              title="User-Friendly App: "
              content="The Bitcoin Yay mobile app (and web portal) is designed for simplicity. It features guided tutorials on how to claim your airdrop, start mining, and use BTCY in the ecosystem. The UI avoids jargon, using friendly language (leveraging the 'Yay' positivity in branding)."
            />,
            <CustomListItem
              key="multilingual"
              title="Multilingual Support: "
              content="To reach a global audience, the app and documentation are quickly rolled out in multiple languages (English, Chinese, Spanish, Hindi, Arabic, etc.). Community volunteers and ambassadors assist with translations to ensure non-English speakers can easily join."
            />,
            <CustomListItem
              key="support"
              title="24/7 Support & Chatbot: "
              content="Especially during initial growth, having responsive support is key. The app includes an AI-driven support chatbot that can answer common questions (e.g., 'Why can't I withdraw yet?' or 'How do I increase my mining rate?') and direct users to tutorials. Tickets that require human support are handled within a day. A smooth support experience builds trust for newcomers who may be unfamiliar with crypto."
            />,
            <CustomListItem
              key="integration"
              title="Integration with Existing Platforms: "
              content="The barrier to entry is further lowered by integrating Bitcoin Yay with familiar platforms. For instance, if Indexx Wallet is already used by some, BTCY mining is built into it so existing Indexx users can start earning with one tap. Also, allowing sign-in via Google/Apple accounts (with non-custodial keys still generated behind the scenes) makes registration frictionless for mainstream users."
            />,
            <CustomListItem
              key="security"
              title="Security for New Users: "
              content="Recognizing many new adopters may be casual users, the app offers easy-yet-secure options like cloud backup for keys (encrypted with user's password) to prevent loss of funds, and explains security in simple terms. This is important because a lost key could mean lost BTCY, so the app encourages backup during onboarding, perhaps even rewarding users with a small BTCY bonus for safely backing up their wallet."
            />,
          ]}
        />

        <InfoSection
          desc="10.3 Long-Term Adoption Strategy"
          content={[
            <CustomListItem
              key="branding"
              title="Consistent Branding & Messaging: "
              content="'Bitcoin Yay' – the very name – gives a friendly, positive spin to Bitcoin. All marketing emphasizes positivity, inclusivity, and excitement ('Yay!'). The gopher mascot adds charm and memorability. This consistent branding helps Bitcoin Yay stand out in a crowded market and makes it approachable, countering Bitcoin's sometimes intimidating image."
            />,
            <CustomListItem
              key="press"
              title="Press & Media Outreach: "
              content="The team reaches out to crypto media (CoinDesk, CoinTelegraph, etc.) and even mainstream tech media to cover Bitcoin Yay's story – highlighting its alliance with Indexx, the innovative AI mining, and its rapid user growth. Getting featured in reputable outlets lends legitimacy and attracts a broader audience beyond the initial crypto enthusiasts."
            />,
            <CustomListItem
              key="events"
              title="Offline Events: "
              content="As the world reopens post-pandemic, Bitcoin Yay sponsors and attends crypto conferences, hackathons, and community gatherings. Seeing a booth or banner for 'Bitcoin Yay – Redefining Bitcoin with AI & Mobile Mining' in the real world reinforces that it's a serious project. Swag like t-shirts ('Yay or Nay? It's Always Yay!') and live demos of the mining app at events help capture interest from those who might not encounter the app online."
            />,
            <CustomListItem
              key="adaptability"
              title="Adaptability: "
              content="The strategy remains flexible. If certain campaigns work exceptionally (e.g., a TikTok trend around Bitcoin Yay dances or memes), the team doubles down. If some regions show unexpected traction, marketing spend shifts to support those locales. The project's community-driven nature means it listens to feedback – if the community suggests a particular outreach (like targeting a specific online community or game), the team considers it. By Phase 3, the community itself (via the DAO) might even allocate funds for marketing initiatives they vote on."
            />,
          ]}
        />

        <InfoSection endingLine="In summary, Bitcoin Yay's marketing and adoption plan is holistic: it combines viral growth tactics (airdrops, referrals), community engagement (rewards for content creation, strong social presence), influencer and media amplification, and a user-friendly experience. The goal is to rapidly build a large, engaged user base that not only mines BTCY but actively uses it, thereby creating a self-sustaining, growing economy around Bitcoin Yay." />

        <div className="flex justify-center items-center my-12">
          <Image src={Whitepaper11} alt="Whitepaper-11" />
        </div>

        <InfoSection
          title="11. Conclusion"
          endingLine="Bitcoin Yay represents the next evolution of Bitcoin's vision — scalable, efficient, and accessible to all. By leveraging Indexx's infrastructure and embracing innovations like AI-guided mobile mining, Bitcoin Yay seeks to honor Bitcoin's legacy while overcoming its limitations. BTCY's design ensures sustainability through a fair halving schedule and robust tokenomics, unity through deep ecosystem integration, and community empowerment through decentralization and onwards."
        />

        <InfoSection endingLine="As Bitcoin Yay gradually transitions into a decentralized community-owned network, it stays true to the core principles of blockchain technology (decentralization, transparency, security) while adapting to modern needs. The end result is a cryptocurrency that is not just mined and held, but actively used in a vibrant crypto playground — for trading, shopping, gaming, saving, and even giving back to society." />

        <InfoSection endingLine="Join us in shaping the future of decentralized finance with Bitcoin Yay. Together, we say 'Yay!' to a new era of Bitcoin for everyone." />
      </div>
    </div>
  );
}
