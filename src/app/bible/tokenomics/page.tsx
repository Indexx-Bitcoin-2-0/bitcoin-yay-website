import Image from "next/image";

import ArtImage1 from "@/assets/images/bible/tokenomics/art-1.webp";
import ArtImage2 from "@/assets/images/bible/tokenomics/art-2.webp";
import ArtImage3 from "@/assets/images/bible/tokenomics/art-3.webp";
import ArtImage4 from "@/assets/images/bible/tokenomics/art-4.webp";
import ArtImage5 from "@/assets/images/bible/tokenomics/art-5.webp";
import ArtImage6 from "@/assets/images/bible/tokenomics/art-6.webp";

import {
  CustomPWithTitle2,
  CustomHeading,
  CustomUnorderedList,
  CustomListItem2,
} from "@/components/CustomTypography";
import { SectionDiv } from "@/components/utils";

export const metadata = {
  title:
    "Bitcoin-Yay Tokenomics - BTCY Supply, Distribution & Mining Economics",
  description:
    "Comprehensive Bitcoin-Yay (BTCY) tokenomics guide. Learn about the 21 trillion token supply, distribution model, semi-annual halving mechanism, mining tiers, and economic design that mirrors Bitcoin's scarcity model.",
  openGraph: {
    title:
      "Bitcoin-Yay Tokenomics - BTCY Supply, Distribution & Mining Economics",
    description:
      "Comprehensive Bitcoin-Yay (BTCY) tokenomics guide. Learn about the 21 trillion token supply, distribution model, semi-annual halving mechanism, mining tiers, and economic design that mirrors Bitcoin's scarcity model.",
  },
};

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
        <p className="text-lg mt-10 max-w-4xl mx-auto">
          Tokenomics refers to the economic design of the Bitcoin-Yay (BTCY)
          ecosystem – how the token is created, distributed, used, and managed
          over time. Bitcoin-Yay&apos;s tokenomics balance scarcity and growth,
          mirroring Bitcoin&apos;s fundamental cap and halving model but on an
          accelerated timeline and with additional mechanisms for utility and
          stability.
        </p>
      </div>
      <SectionDiv id="total-supply-distribution">
        <CustomHeading content="Total Supply & Distribution" />

        <CustomUnorderedList>
          <CustomListItem2
            title="Fixed Total Supply: "
            content=" 21 Trillion BTCY (hard cap). This figure mirrors Bitcoin's 21 million supply, using a conversion of 1 BTC → 1,000,000 BTCY to create 21 trillion micro-units. By maintaining a fixed supply, Bitcoin-Yay ensures long-term scarcity similar to Bitcoin, which underpins value by preventing unlimited inflation."
          />
          <CustomListItem2
            title="Bitcoin Conversion Ratio: "
            content="At launch, 1 BTC = 1,000,000 BTCY. This means conceptually, if all 21 million BTC were converted, it would yield 21 trillion BTCY (the full BTCY supply). In practical terms, if you hold Bitcoin, you could claim BTCY at this ratio (e.g., 0.01 BTC = 10,000 BTCY). This ties BTCY's value to Bitcoin's legacy and is backed by a reserve mechanism holding actual BTC. It gives BTCY holders confidence that their tokens have a reference value relative to Bitcoin."
          />
          <CustomListItem2
            title="Initial Allocation Strategy: "
            content="The 21T BTCY is allocated as follows:"
          />
          <CustomUnorderedList>
            <CustomListItem2 content="40% (8.4T BTCY) – Mining Rewards & Ecosystem Incentives: Reserved for distribution to users through mining programs (free mining, paid tiers, referral bonuses, etc.) and other participation rewards. This large share ensures the community can earn a significant portion of BTCY over time, driving user growth and engagement." />
            <CustomListItem2 content="10% (2.1T BTCY) – Satoshi Nakamoto Legacy: Earmarked in honor of Bitcoin's creator, Satoshi. These tokens are set aside (potentially locked or even burned) as a symbolic link between Bitcoin and Bitcoin-Yay. It's a gesture acknowledging Bitcoin's origins and keeping BTCY's supply analogous (21 million vs 21 trillion)." />
            <CustomListItem2 content="20% (4.2T BTCY) – Development & Infrastructure Fund: Controlled by the Bitcoin-Yay team (in alliance with Indexx) with a vesting period (~4 years). This funds ongoing development, server infrastructure, customer support, and core contributors. Vesting prevents immediate dumping and aligns the team's incentives with the project's long-term success." />
            <CustomListItem2 content="15% (3.15T BTCY) – Indexx Treasury (Liquidity & Stability): Managed by Indexx to provide liquidity on exchanges, conduct market-making, and stabilize BTCY's price. This treasury also backs the BTCY-BTC reserve mechanism (some of these tokens can be exchanged for BTC over time to build a reserve). Essentially, this allocation acts as a buffer to ensure convertibility and reduce volatility." />
            <CustomListItem2 content="10% (2.1T BTCY) – Community & Influencer Incentives: Dedicated to marketing and community growth. This includes airdrops to early adopters, referral program rewards, community event giveaways, and influencer partnerships. For example, a portion of this might be used to give new users a starter bonus, or to reward content creators who promote BTCY. By distributing tokens to those who help grow the user base, the project kickstarts network effects." />
            <CustomListItem2 content="5% (1.05T BTCY) – Strategic Partnerships & Institutional Adoption: Set aside for strategic deals, such as integrating BTCY with other platforms or bringing large partners on board. For instance, some tokens could incentivize a payment app to adopt BTCY, or be granted to a fintech institution that supports BTCY. This fund enables flexibility in expanding Bitcoin-Yay's reach through partnerships." />
            <CustomPWithTitle2 content="Summary: 50% of BTCY is aimed directly at the community (40% mining rewards + 10% community incentives), ensuring broad distribution. 35% is retained with the project team/Indexx (development + treasury) but under conditions (vesting, specific use) to avoid centralization risks. The remaining 15% (Satoshi tribute + partnerships) ties BTCY to the wider narrative and future growth opportunities." />
          </CustomUnorderedList>

          <CustomListItem2
            title="Circulating Supply Management: "
            content="At launch, only a small portion of BTCY will circulate (from airdrops and initial exchange liquidity). The majority (especially the 40% mining allocation) will enter circulation gradually as users mine over years. Other allocations like the treasury and dev fund will also be introduced slowly (treasury used as needed for liquidity, dev fund vested). This staged release prevents a sudden oversupply and helps maintain price stability in early phases. It's akin to how many projects unlock tokens over time rather than all at once."
          />
        </CustomUnorderedList>
      </SectionDiv>

      <div className="mt-40 flex items-center justify-center px-4">
        <Image src={ArtImage2} alt="Art Image 2" className="w-80 md:w-100" />
      </div>

      <SectionDiv id="mining-rewards">
        <CustomPWithTitle2 content="Bitcoin-Yay adopts a Bitcoin-like emission schedule but accelerates to reach its supply cap faster and engage users early:" />

        <CustomUnorderedList>
          <CustomListItem2
            title="Initial Daily Emission: "
            content="Upon launch, the network defines an initial daily issuance of BTCY distributed across all miners. For example, suppose initially X BTCY per day is released network-wide (across free and paid miners). This X is calibrated so that even if it stayed constant, it would take many years to distribute the full 8.4T mining reserve. In reality, it will not remain constant due to halving."
          />
          <CustomListItem2
            title="Halving Every 6 Months: "
            content="BTCY implements a semi-annual halving of mining rewards. Every 6 months, the base amount of BTCY that miners can earn per hour (and hence per day) is cut in half. This is a much faster halving cycle than Bitcoin's 4-year cycle, designed to quickly control inflation."
          />
          <CustomPWithTitle2 content=" For instance: If in the first 6 months the network distributes 100 billion BTCY, in the next 6 months only ~50 billion BTCY will be distributed, and ~25 billion in the 6 months after that, and so on. This rapid reduction means within just a few years the inflation rate drops to very low levels, reinforcing the scarcity narrative." />
          <CustomListItem2
            title="Rationale for Accelerated Halving: "
            content='Bitcoin-Yay anticipates a high initial emission to attract users (lots of rewards early on to entice sign-ups and participation). The semi-annual halving quickly "clamps down" inflation after these initial growth spurts. Early adopters benefit from higher rewards, but inflation is sharply reduced within a short number of years (as opposed to decades for Bitcoin). This ensures that, not far into the future, BTCY becomes significantly scarcer to mine, protecting long-term holders from prolonged high inflation.'
          />
          <CustomListItem2
            title="Emission Milestones: "
            content="Another way to frame the emission is via milestones of total BTCY mined."
          />

          <CustomUnorderedList>
            <CustomListItem2 content="When 1 Trillion BTCY is mined, it might coincide with certain events (for example, an Early Adopter Airdrop reward could be given out at this point to celebrate)." />
            <CustomListItem2 content="At 2 Trillion mined, perhaps staking features are introduced to give utility to accumulated BTCY." />
            <CustomListItem2 content="At 5 Trillion mined, BTCY's inflation is slowing; around this time, major utility integrations (like full Indexx Lotto and Shop acceptance) are in place, reinforcing demand." />
            <CustomListItem2 content="At 10 Trillion mined (half the cap), one could expect roughly 60% of that to have been via mining, 30% might remain in reserves, 10% used for community incentives (hypothetical distribution at that point). Cross-chain bridges and broader adoption efforts are likely fully underway by then." />
            <CustomListItem2 content='At 15 Trillion mined, perhaps 70% from mining, 20% reserve, 10% community – by now, the majority of BTCY is in users&apos; hands. This might trigger advanced features like algorithmic stablecoin integration (Bitcoin "YeeHaw" stablecoin and other exchange programs to bolster value stability).' />
            <CustomListItem2 content="By 21 Trillion (cap reached), theoretically ~80% will have been distributed via mining, ~10% in reserves, ~10% in community funds. This final stage would be many years out (the tail end of the emission), at which point Bitcoin-Yay is fully decentralized and governed by the community (the original team's role minimal beyond perhaps running services like exchanges). Hitting the cap means no new BTCY is mined (similar to Bitcoin post-2140); the network at that point relies on transaction fees and recycling of tokens for rewards." />
          </CustomUnorderedList>

          <CustomPWithTitle2 content="These illustrative milestones emphasize that early in the project a larger portion of tokens is not yet circulating (held in reserve or unmined), which grants the project flexibility and stability, whereas later on the vast majority will be circulating and the project should be self-sustaining and community-run." />

          <CustomListItem2
            title="Tail Emissions & End-State: "
            content='Even after many halvings, mining never truly "stops" until the 21T cap is reached, but the rewards become extremely small. Bitcoin-Yay&apos;s design anticipates that by the time rewards are negligible, transaction fees and other incentives (like staking yields or DeFi interest) will take over to reward participants (much like Bitcoin expects fees to sustain miners eventually). The project may also consider introducing a minimal continuous reward or a "tail emission" if needed to ensure participation incentives never drop to zero, but if so it would be very tiny. Any such decision would be governed by the community in the later stages.'
          />
        </CustomUnorderedList>
      </SectionDiv>

      <div className="mt-40 flex items-center justify-center px-4">
        <Image src={ArtImage3} alt="Art Image 3" className="w-80 md:w-100" />
      </div>

      <SectionDiv id="mining-distribution-tiers">
        <CustomPWithTitle2 content="Mining distribution is closely tied to user participation tiers (free and paid plans). The economics of these plans affect how BTCY enters circulation and who receives it:" />

        <CustomUnorderedList>
          <CustomListItem2
            title="Base Mining Rates: "
            content="At launch (Month 1), the base mining rate for the Free Plan is approximately 1.5 BTCY/hour (this equates to ~36 BTCY/day for a free user mining continuously). Higher tiers are multiples of this base rate:"
          />
          <CustomUnorderedList>
            <CustomListItem2
              title="Electric Plan"
              content="~3× base &rArr; ~4.5 BTCY/hour."
            />
            <CustomListItem2
              title="Turbo Plan"
              content="~6× base &rArr; ~9 BTCY/hour."
            />
            <CustomListItem2
              title="Nuclear Plan"
              content="~9× base &rArr; ~13.5 BTCY/hour."
            />
          </CustomUnorderedList>
          <CustomListItem2 content='These initial rates mean, for example, if 100,000 users were mining on the Free plan alone, about 3.6 million BTCY would be distributed to free users per day (100k * 36/day each) initially. Adding paid plan users (with higher rates) increases the daily emission accordingly. This is the "significant initial emission" mentioned, which is needed to entice broad participation early on. However, recall that in 6 months, these rates will halve network-wide (to ~0.75 BTCY/hour for Free, ~2.25 for Electric, ~4.5 for Turbo, ~6.75 for Nuclear, if all else remains equal).' />

          <CustomListItem2
            title="Halving Impact Example: "
            content="After the first 6-month halving, a Free user's base rate drops to ~0.75 BTCY/hour; after one year (two halvings), ~0.375 BTCY/hour, and so forth (assuming no change in user behavior or plan). So, a year into the project, new Free users would be earning only a quarter of what the first Free users earned per hour, highlighting the advantage of being early and the natural scarcity increase over time."
          />

          <CustomListItem2
            title="Monthly Earnings Illustration: "
            content="In the early phase (pre-halving), we can illustrate monthly yields:"
          />
          <CustomUnorderedList>
            <CustomListItem2 content="A Free user earns roughly ~2,160 BTCY per month (72/day * 30 days)." />
            <CustomListItem2 content="An Electric user (3×) earns ~6,480 per month." />
            <CustomListItem2 content="Turbo (6×) ~12,960 per month." />
            <CustomListItem2 content="Nuclear (9×) ~19,440 per month." />
          </CustomUnorderedList>
          <CustomPWithTitle2 content="In other words, one month of mining on Nuclear (~19.4k BTCY) equals about nine months of mining on Free (~2.16k * 9 ≈ 19.4k). This 9:1 ratio holds by design (since tiers are multiples of the base rate). It demonstrates the value proposition of paid plans: a user paying for Nuclear can achieve in 1 month what a free user would in about 9 months. This also concentrates some portion of token distribution into the hands of committed, paying users (who likely will also use and stake more BTCY), while still allowing free users to accumulate over time." />

          <CustomListItem2
            title="Mining Time to Thresholds: "
            content="Because of differing rates, the time required to reach certain BTCY amounts varies greatly by tier. For example:"
          />
          <CustomUnorderedList>
            <CustomListItem2 content="100,000 BTCY (a common threshold to unlock certain utilities in the ecosystem) would take a Free Plan user roughly 1,389 days (~46 months, or ~3.8 years) of continuous mining at initial rates. In contrast, a Nuclear Plan user could achieve 100k in about 154 days (~5.1 months). Turbo and Electric users fall in between – on the order of ~7.7 months for Turbo and ~15.4 months for Electric to reach 100k. (These are pre-halving estimates; in practice, halving will slow everyone down over time.) This shows that paid tiers dramatically shorten the time to reach key milestones in the ecosystem, like the 100k mark." />
            <CustomListItem2 content="1,000,000 BTCY (which in early plans was considered an initial withdrawal threshold) would, under initial rates, theoretically require about 46 * 10 = ~460 months (~38.3 years) for a Free user, versus 5.1 * 10 = ~51 months (~4.3 years) for a Nuclear user (simply scaling the 100k example by 10). However, due to halvings, in reality it would take longer than that linear projection since earning rates drop every six months. These comparisons are mainly valid in the early, pre-halving period to illustrate differences." />
          </CustomUnorderedList>
          <CustomPWithTitle2 content="(The project has since moved to a more nuanced system of multiple smaller thresholds for various features instead of one large 1,000,000 BTCY requirement, but these figures give a sense of the mining speed vs. time trade-off.)" />
        </CustomUnorderedList>
      </SectionDiv>

      <div className="mt-40 flex items-center justify-center px-4">
        <Image src={ArtImage4} alt="Art Image 4" className="w-80 md:w-100" />
      </div>

      <SectionDiv id="economic-rationale-paid-plans">
        <CustomHeading content="Economic Rationale of Paid Plans" />

        <CustomUnorderedList>
          <CustomListItem2
            title="Revenue Model: "
            content="The subscription fees ($100, $300, $600 per month for Electric, Turbo, Nuclear) provide a steady revenue stream to the project (similar to cloud mining services or freemium games with subscription tiers). This revenue can fund operations and, importantly, can be used to buy Bitcoin for the reserve, supporting the BTCY peg and ecosystem."
          />
          <CustomListItem2
            title="Distribution Control: "
            content='By gating higher output behind a paywall, the project can modulate how much BTCY enters circulation. If only free mining existed, the base rate would have to be kept quite low to control inflation. With paid tiers, those who are most invested in the ecosystem (literally) receive more tokens. This concentrates a portion of supply into the hands of committed members with "skin in the game," presumably those more likely to use BTCY and stick around, while ensuring casual free users get a smaller, controlled share.'
          />
          <CustomListItem2
            title="User Segmentation: "
            content="Different tiers encourage different engagement levels. Free users might be millions of casual users (providing broad network reach and watching ads for revenue), whereas paid users might be thousands of enthusiasts and promoters who drive community growth (they have incentive to evangelize BTCY because they've invested in it). This segmentation also allows targeted marketing and perks—e.g., exclusive events or chats for paid users, while the mass of free users generates viral growth and a base network effect."
          />
          <CustomListItem2
            title="Anti-Abuse Mechanism: "
            content="If someone tried to game the system by making many fake free accounts, the fact that free mining is relatively slow and requires human tasks (ads, etc.) makes it inefficient. The paid plans also deter abuse because doing the same with paid accounts would cost money. In short, large-scale Sybil attacks are economically disincentivized."
          />
          <CustomListItem2
            title="Halving Effect on Plans: "
            content="Importantly, when a halving occurs every plan's output halves (since it's proportional). After the first halving, for example, the Free plan might drop to ~0.75 BTCY/hour, Electric to ~2.25, Turbo to ~4.5, Nuclear to ~6.75. The ratios (1:3:6:9) remain the same, so paid tiers always maintain their relative advantage, but the absolute difference in earnings between tiers narrows over time in terms of BTCY/hour. However, if BTCY's value increases over time (due to increasing scarcity and adoption), even the reduced rates can be worthwhile. The subscription prices themselves could potentially be adjusted via governance in the future (for instance, they might introduce an option to pay for plans in BTCY or tweak pricing if $600 becomes too high or too low relative to BTCY's value)."
          />
          <CustomListItem2
            title="Referral and Community Mining Boosts: "
            content="In addition to these base rates, recall that Bitcoin-Yay provides avenues to boost one's mining without upgrading a plan:"
          />
          <CustomUnorderedList>
            <CustomListItem2 content="Referral bonuses (Pocket Gopher program) can give one-time BTCY rewards that effectively increase a user's total earnings." />
            <CustomListItem2 content="Social and content creation rewards can supplement miners' income (users might earn thousands of BTCY for making popular content, on top of their hourly mining)." />
            <CustomListItem2 content='An active free user who maximizes referrals and tasks could potentially rival the earnings of a paying user, which is by design: contributing to network growth is another way to "earn" mining rewards. For example, a savvy Free user who refers to many others and creates content could accumulate a lot of BTCY even at 1× base speed, embodying the principle that those who help the project grow get rewarded.' />
          </CustomUnorderedList>

          <CustomListItem2
            title="Anti-Dump Vesting & Fees: "
            content="(As detailed in the withdrawal rules) Even once users mine significant amounts, the system's thresholds and vesting ensure they don't all hit the market at once. Large withdrawals face higher fees and time delays, encouraging miners (especially paid miners who accumulate faster) to either reinvest in the ecosystem or cash out gradually."
          />
        </CustomUnorderedList>

        <CustomPWithTitle2 content="In summary, Bitcoin-Yay's mining and subscription plan economics are crafted to rapidly distribute tokens to an active user base while preventing oversupply and rewarding the most engaged or invested users. Early on, the token issuance is high to fuel growth, but the built-in halving schedule and fees steadily curb inflation. Paid plans serve not only to generate revenue and reward committed users, but also as a mechanism to control distribution speed and channel value back into the project (through fees and reserve backing). Together, these ensure a fair launch where anyone can participate (for free) but those who contribute more (time, effort, or funds) can earn more, all within an inflation-control framework." />
      </SectionDiv>

      <div className="mt-40 flex items-center justify-start px-4 md:px-20 lg:px-40">
        <Image src={ArtImage5} alt="Art Image 5" className="w-80 md:w-100" />
      </div>

      <SectionDiv id="value-stability-mechanisms">
        <CustomHeading content="Mining Rewards & Subscription Plans" />

        <CustomPWithTitle2 content="Maintaining a stable and growing value for BTCY is crucial for user confidence and long-term viability. Bitcoin-Yay employs several mechanisms to dampen volatility and provide price support, especially in its early phases:" />

        <CustomUnorderedList>
          <CustomListItem2
            title="Initial Peg and Conversion Rate: "
            content="Bitcoin-Yay effectively begins with a target price of $0.10 per BTCY. On the Indexx platform, conversion features allow, for example, 10 BTCY to be swapped for 1 IUSD+ (Indexx's USD stablecoin) by design (minus fees). Similarly, BTCY can be converted to other stablecoins at roughly that rate. This doesn't mean BTCY can't trade above or below $0.10 on the open market, but the Indexx conversion provides a floor price: as long as reserves last, users know they can trade BTCY for about 10¢ worth of stablecoins each (with some fees applied). This floor gives newcomers assurance that the token isn't likely to go to zero because it's backed by real assets at a known rate."
          />
          <CustomListItem2
            title="Reserve of Stablecoins and BTC: "
            content="To support this peg, Indexx maintains a reserve pool of stablecoins and Bitcoin specifically for BTCY. Whenever a user converts BTCY to, say, IUSD+, those BTCY tokens are removed from circulation (sent to a reserve wallet or burned), and an equivalent amount of stablecoin from the reserve is given to the user. Essentially, the system is &quot;buying back&quot; BTCY at $0.10 using its reserve. Conversely, if users convert stablecoin into BTCY, they're effectively selling stablecoin to the reserve in exchange for BTCY (which could either come from the treasury or newly release from what's held in reserve). This mechanism is analogous to how a currency board or a collateralized stablecoin works, defending a price level using reserves."
          />
          <CustomListItem2
            title="Fee Structure to Control Velocity: "
            content="Conversions and certain transactions carry fees that serve two purposes – to discourage quick speculative trading (thus reducing volatility) and to fund the ecosystem's reserves."
          />
          <CustomUnorderedList>
            <CustomListItem2 content="As mentioned, converting BTCY to other tokens incurs a sizable fee (for example, 15% when converting to internal tokens like the Indexx stablecoin IUSD+, and 20% when converting to external stablecoins like USDC/USDT). This means if a user exchanges 100,000 BTCY at the pegged rate, they pay a 15–20% fee, significantly cutting into any immediate profit. These fees make attempting to instantly arbitrage or cash out large amounts less attractive." />
            <CustomListItem2 content="The rationale: if someone can mine or obtain BTCY and instantly flip it to a stablecoin with no penalty, they might do so en masse, causing selling pressure. A high fee tempers this behavior. Users are encouraged instead to hold BTCY or use it within the ecosystem, because taking it out to external assets incurs cost." />
            <CustomListItem2 content="The revenue from these fees is split in a beneficial way – for instance, a portion may be burned (reducing the total supply permanently, which is deflationary) and another portion goes into the reserve pool (increasing the backing for remaining BTCY). A hypothetical split could be 5% burn, 10% to reserves on a 15% fee. This means every conversion actually strengthens the value of BTCY for holders by both decreasing supply and increasing backing." />
          </CustomUnorderedList>

          <CustomListItem2
            title="Bitcoin Reserve Model: "
            content="A percentage of various system incomes (subscription revenues, conversion fees, maybe even a fraction of mining rewards) is allocated to continuously accumulate Bitcoin for a Strategic BTC Reserve. Over time, this reserve grows and provides fundamental value backing to BTCY:"
          />
          <CustomUnorderedList>
            <CustomListItem2 content="Users will eventually have the ability to directly swap BTCY for BTC through the Indexx platform (once certain thresholds are met), using this reserve. For example, a user who has accumulated a large amount of BTCY could convert some of it into actual Bitcoin. The reserve's BTC provides the liquidity for such conversions." />
            <CustomListItem2 content="Tying BTCY to Bitcoin via a reserve links BTCY's fate to Bitcoin's: if BTC's price rises, the BTC held in reserve grows in value, which means the system can support the $0.10 peg more easily (or even raise it over time). It provides confidence that BTCY is not just a token in isolation, but one supported by the most established cryptocurrency." />
            <CustomListItem2 content="In the long run, the project envisions possibly locking this reserve in a transparent, perhaps decentralized way (like a multi-sig or smart contract controlled by the DAO) to ensure it's only used for its intended purpose (supporting BTCY's value)." />
          </CustomUnorderedList>
        </CustomUnorderedList>
      </SectionDiv>

      <div className="mt-40 flex items-center justify-center px-4">
        <Image src={ArtImage6} alt="Art Image 6" className="w-80" />
      </div>

      <SectionDiv id="market-control-deflationary-mechanisms">
        <CustomUnorderedList>
          <CustomListItem2
            title="Controlled Market Listings: "
            content="Initially, BTCY is mainly traded on Indexx Exchange (and perhaps select partner exchanges). By controlling the primary markets and liquidity, the team can mitigate extreme volatility. On Indexx Exchange, the team (using the treasury allocation) will ensure there's liquidity around the ~$0.10 price (with buy orders supported by the reserve or treasury funds). They will likely avoid or delay listing BTCY on very volatile open markets (or major exchanges) until the token has a stable user base and sufficient reserves to handle speculation. This phased approach to market exposure protects the price early on."
          />
          <CustomListItem2
            title="Deflationary Mechanisms: "
            content="Aside from halving, Bitcoin-Yay has additional deflationary tactics to support the token's value:"
          />
          <CustomUnorderedList>
            <CustomListItem2
              title="Token Burns: "
              content="The project may periodically burn tokens under certain conditions. For example, any unclaimed airdrop tokens might be burned. Or, if a special event is held (maybe a celebratory burn when a milestone is hit, like 10 million users), a small portion of reserve tokens could be destroyed. Burning reduces supply, which can bolster price if demand stays the same."
            />
            <CustomListItem2
              title="Buy-back and Burn: "
              content="If BTCY's market price ever dips significantly below the expected value (say the peg, or in general due to market downturns), the project can use treasury funds or reserves to buy BTCY off the market at the low price and then burn those tokens. This both props up the price (through buying pressure) and permanently cuts supply, acting to push the price upward over time. This is similar to stock buy-backs or how some stablecoins maintain a floor."
            />
            <CustomListItem2
              title="Adaptive Halving: "
              content="Although the halving schedule is set, in an extreme case the community governance could vote to accelerate an upcoming halving if inflation needs to be curbed faster (or conversely, slow it if adoption is so good that inflation being slightly higher wouldn't hurt). This would only be considered if data strongly suggested it, but the option exists in a decentralized governance scenario."
            />
          </CustomUnorderedList>

          <CustomListItem2
            title="Peg Adjustments Over Time: "
            content="The starting peg is $0.10, but if the project is very successful, the market might value BTCY higher. The team (and later, the DAO) could consider raising the official conversion rate or allowing the price to float more freely. For instance, if Bitcoin's price doubles in a couple of years and BTCY is in high demand, the community might decide that 1 BTC could convert to fewer than 1,000,000 BTCY (effectively targeting $0.20 per BTCY, for example). However, any peg change would be approached cautiously and likely only after the ecosystem is mature and governance is decentralized, to ensure it's a community-driven decision. In essence, the peg is a bootstrapping tool — eventually, BTCY could become a freely traded asset whose value is determined by its utility and scarcity, with the reserve acting only as a stabilizer rather than a strict peg enforcer."
          />
        </CustomUnorderedList>

        <CustomPWithTitle2 content="In summary, Bitcoin-Yay's tokenomics include robust price stability measures to complement its issuance strategy. By pegging BTCY's early value to fiat via reserves, heavily taxing opportunistic conversions, and building up a Bitcoin reserve, the project creates a safety net for the token's value. Simultaneously, by planning token burns and buybacks funded by its own economic activity, it introduces deflationary pressure that combats inflation and supports the price as the supply grows. These strategies are designed to encourage users to hold and use BTCY rather than speculate on short-term price swings, fostering a healthier economic ecosystem. Over time, as adoption solidifies, these mechanisms can be relaxed to allow BTCY to appreciate organically, but in the critical early stages they form a vital backbone of trust in Bitcoin-Yay's economy." />
      </SectionDiv>
    </div>
  );
}
