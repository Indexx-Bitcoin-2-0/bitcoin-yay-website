import Image from "next/image";

import ArtImage1 from "@/assets/images/bible/tokenomics/art-1.webp";
import ArtImage2 from "@/assets/images/bible/tokenomics/art-2.webp";

import {
  CustomPWithTitle2,
  CustomHeading,
  CustomUnorderedList,
  CustomListItem2,
} from "@/components/CustomTypography";
import { SectionDiv } from "@/components/utils";

export default function Tokenomics() {
  return (
    <div className="mx-auto overflow-hidden mt-40">
      <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          Bitcoin-YAY
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">Tokenomics</h1>
        <Image
          src={ArtImage1}
          alt="Art Image 1"
          className="w-100 md:w-150 lg:w-200 2xl:w-320"
        />
      </div>
      <SectionDiv id="total-supply-distribution">
        <CustomHeading content="Total Supply & Distribution" />
        <CustomPWithTitle2
          title="Fixed Total Supply:"
          content=" Hard-capped at 21 trillion BTCY tokens, mirroring Bitcoin’s 21 million cap via micro-token conversion (1 BTC → 1,000,000 BTCY). This ensures BTCY remains scarce in the long run, creating incentive for holding and naturally limiting inflation."
        />
        <CustomUnorderedList>
          <CustomListItem2 content="Bitcoin Conversion Ratio: At launch, 1 BTC is set to equal 1,000,000 BTCY. Hypothetically, converting all 21 million BTC would yield 21 trillion BTCY. If you own 1 BTC, you can claim 1,000,000 BTCY; 0.01 BTC equates to 10,000 BTCY, and so forth. This ties Bitcoin Yay’s value conceptually to Bitcoin’s, and a reserve mechanism backs this by holding actual BTC." />
        </CustomUnorderedList>

        <CustomPWithTitle2
          title="Initial Distribution Breakdown:"
          content="The allocation of 21 trillion BTCY is strategically planned for ecosystem needs:"
        />
        <CustomUnorderedList>
          <CustomListItem2
            content=" 40% (8.4 Trillion) – Mining Rewards & Ecosystem Incentives. Reserved
            for distribution via the mining programs (Snatch Gopher free mining,
            Nugget Gopher paid plans, etc.) and other user participation
            incentives. This large allocation ensures the community can earn a
            significant share of the supply over time, fueling user growth and
            engagement."
          />
          <CustomListItem2
            content="  10% (2.1 Trillion) – Satoshi Nakamoto Legacy Allocation. In tribute
            to Bitcoin’s creator, earmarked for Satoshi. Practically, these
            tokens could be locked or even burned to symbolize transfer to
            Satoshi’s inaccessible wallet. It serves as a narrative bridge
            between BTC and BTCY, a thoughtful nod to the origins of the
            project."
          />
          <CustomListItem2
            content="20% (4.2 Trillion) – Developer & Infrastructure Fund. Held by the
            project team/Indexx and vested over ~4 years. Funds ongoing
            development, infrastructure (servers, support), and rewards for core
            contributors. A vesting schedule prevents the team from flooding the
            market and aligns their incentives with Bitcoin Yay’s long-term
            success."
          />
          <CustomListItem2
            content=" 15% (3.15 Trillion) – Indexx Treasury (Liquidity & Stability).
            Managed by Indexx to provide liquidity on exchanges, perform
            market-making, and support token stability. This treasury will also
            help back the BTC reserve mechanism (swapping some BTCY for BTC over
            time to fill reserves). It acts as a buffer to stabilize price and
            ensure convertibility."
          />
          <CustomListItem2
            content="10% (2.1 Trillion) – Community & Influencer Incentives. Dedicated to
            airdrops, rewards, community events, and influencer
            partnerships.This allocation seeds the initial user base and creates
            buzz (e.g., free BTCY drops to early adopters, bonuses for social
            media promotions, etc.). By distributing tokens through community
            engagement campaigns, Bitcoin Yay kickstarts network effects and
            public awareness."
          />
          <CustomListItem2
            content="5% (1.05 Trillion) – Strategic Partnerships & Institutional
            Adoption. Reserved for key partners or institutional participants.
            These tokens incentivize collaborations with payment providers,
            merchants, fintech companies or even NGOs to integrate BTCY. Having
            a reserve for strategic outreach provides flexibility to foster
            adoption in larger contexts (for example, rewarding a popular app
            for accepting BTCY, or encouraging a financial institution to pilot
            BTCY-based services)."
          />
        </CustomUnorderedList>

        <CustomPWithTitle2 content="This distribution ensures that a majority of tokens (50% from mining + community programs) end up in the hands of the community. A substantial portion (35%) is initially held by the team/Indexx for development and liquidity but with clear purpose and vesting to mitigate centralization risk. The Satoshi tribute and partnership allocations further align BTCY with the broader crypto narrative and future expansion." />

        <CustomUnorderedList>
          <CustomListItem2
            content="Circulating Supply Trajectory: Not all 21T will circulate
            immediately. Only a small fraction enters circulation at launch
            (e.g., via initial airdrops and exchange liquidity). Mining rewards
            (the 8.4T allocation) will be released gradually over many years.
            Other allocations like the Treasury and Dev Fund will also unlock
            strategically. This controlled release, similar to vesting in many
            projects, avoids oversupply in the market at launch and supports
            long-term price stability."
          />
        </CustomUnorderedList>
      </SectionDiv>

      <div className="flex items-center justify-end my-60 md:my-100 relative ">
        <Image
          src={ArtImage2}
          alt="Art Image 2"
          className="w-100 md:w-150 lg:w-220 absolute -right-20 md:-right-40"
        />
      </div>

      <SectionDiv id="btcy-price-strategy">
        <CustomHeading content="BTCY Price Strategy" />

        <CustomPWithTitle2
          title="Pegged Early Value:"
          content="During the early adoption phase, BTCY is effectively pegged to a notional value of $0.10 per BTCY via mechanisms on the Indexx platform. For example, on Indexx Exchange, 10 BTCY = 1 IUSD+ (Indexx USD stablecoin) by design, implying 1 BTCY ≈ $0.10. Users can swap BTCY for stablecoins at roughly this rate (less a conversion fee). This provides a value floor for BTCY and gives holders confidence that their BTCY can be converted to a stable value."
        />

        <CustomPWithTitle2
          title="Reserve-Backed Stability:"
          content="To support this peg, Indexx maintains a reserve of stablecoins and Bitcoin. Whenever users convert BTCY to a stablecoin (like IUSD+ or USDC), the converted BTCY is taken out of circulation and the reserve supplies the equivalent stablecoins to the user. Conversely, if users buy BTCY with stablecoins, BTCY from the treasury or reserve is released and stablecoins are added to the reserve. This acts similar to a central bank currency reserve, buffering BTCY’s price against volatility."
        />
        <CustomPWithTitle2
          title="Fee Mechanisms: "
          content="Conversion and transfer fees are used to control token velocity and fund the reserves:"
        />
        <CustomUnorderedList>
          <CustomListItem2
            content="Converting BTCY to other tokens incurs a fee (e.g., 15% fee when
            swapping to internal tokens like IUSD+, and up to 20% fee for
            external stablecoins like USDC/USDT). These steep fees mean if
            someone dumps BTCY immediately for cash, they lose a significant
            portion, which deters mass liquidation and incentivizes holding or
            using BTCY within the ecosystem."
          />
          <CustomListItem2
            content="Similarly, converting to Bitcoin (BTC) has a high fee, reflecting
            that directly acquiring BTC from BTCY is treated as a form of
            cashing out. (For example, converting BTCY to BTC might carry a 25%
            fee.) These percentages can be adjusted via governance, but
            initially they create friction that slows down speculative flipping
            of BTCY."
          />
          <CustomListItem2
            content="Collected fees (in stablecoins or BTC) feed back into the system —
            for instance, a portion may be burned (reducing supply) and the rest
            added to the reserve. This deflationary aspect and reserve-funding
            further stabilize the token."
          />
        </CustomUnorderedList>
        <CustomPWithTitle2
          title="Bitcoin Reserve Model: "
          content="A portion of various fees and revenues is allocated to continuously purchase Bitcoin for a strategic reserve. This BTC reserve backs the BTCY ecosystem; for example, it enables a future feature where users can swap BTCY for actual BTC at market rates. As BTCY decentralizes over time, this reserve could be placed under community control via smart contracts. The existence of a Bitcoin reserve ties BTCY’s fate to Bitcoin’s success — if Bitcoin’s value rises, BTCY’s backing strengthens, providing holders additional confidence."
        />
        <CustomPWithTitle2
          title="Gradual Float:"
          content="Over time, as BTCY becomes widely held and its utility proven, the project may relax the $0.10 peg to allow BTCY’s market price to float upward. Any such changes would be decided via decentralized governance once the network matures. In the long run, BTCY’s value will be supported by its scarcity (controlled by halving and burns), its utility in the ecosystem, and the underlying reserves, rather than a fixed peg."
        />
      </SectionDiv>
    </div>
  );
}
