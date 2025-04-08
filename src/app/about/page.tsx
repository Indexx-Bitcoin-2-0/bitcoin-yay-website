import Image, { StaticImageData } from "next/image";

import BitCoinYayLogo from "../../assets/images/logo.png";
import bgArtImage1 from "../../assets/images/bitcoin-art-2.png";
import StatsIcon1 from "../../assets/images/about/icon-1.png";
import StatsIcon2 from "../../assets/images/about/icon-2.png";
import StatsIcon3 from "../../assets/images/about/icon-3.png";
import StatsIcon4 from "../../assets/images/about/icon-4.png";

import UserReviewCards from "@/components/UserReviewCards";

const statsData = [
  {
    image: StatsIcon1,
    title: "Join 60+ Million Engaged Crypto Enthusiasts",
    desc: "Connect with a global community of traders, investors, and blockchain innovators. Stay informed with real-time insights, market trends, and expert analysis. Experience the future of crypto with Bitcoin Yay – where knowledge meets opportunity!",
  },
  {
    image: StatsIcon2,
    title: "Free to Mine - Start Earning with Zero Costs!",
    desc: "Mine crypto effortlessly without expensive hardware or high energy costs. Join a decentralized network and earn rewards by securing the blockchain. Experience the future of mining with accessibility for everyone!",
  },
  {
    image: StatsIcon3,
    title: "35+ Core Team Members Driving Innovation Globally",
    desc: "A dedicated team of blockchain experts, developers, and visionaries. Working across continents to build the future of cryptocurrency. Committed to making Bitcoin Yay the ultimate crypto hub!",
  },
  {
    image: StatsIcon4,
    title: "Revolutionary Tech – Powering the Future of Crypto",
    desc: "Built on cutting-edge innovation to enhance security, speed, and efficiency. Designed to redefine how users interact with digital assets. Experience next-level crypto technology with Bitcoin Yay!",
  },
];

const CustomStatsCard = ({
  image,
  title,
  desc,
}: {
  image: StaticImageData;
  title: string;
  desc: string;
}) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center w-full md:w-[300px] text-center">
      <Image src={image} alt={title} className="w-18 object-cover" />
      <h3 className="text-lg font-semibold my-2 text-secondary md:mt-6">
        {title}
      </h3>
      <p className=" text-sm font-normal text-tertiary leading-6">{desc}</p>
    </div>
  );
};

export default function About() {
  return (
    <div className=" mx-auto max-w-[90vw] lg:px-10 py-8">
      <div className=" lg:h-100 overflow-hidden border border-bg2 rounded-lg p-5 lg:p-15 w-full mt-6 lg:mt-10 mx-auto relative ">
        <Image
          src={bgArtImage1}
          alt="Background Art"
          className="absolute -z-10 -top-5 md:top-0 right-0 w-50 lg:w-100"
        />
        <h1 className="text-2xl md:text-5xl font-bold mt-6 max-w-300  md:leading-16">
          Bitcoin Yay: Shaping the Future of Social Cryptocurrency in Web3
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Connecting communities, enabling seamless transactions, and
          revolutionizing digital finance.
        </p>
      </div>

      {/* Part 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
        {statsData.map((item, index) => (
          <CustomStatsCard
            key={index}
            image={item.image}
            title={item.title}
            desc={item.desc}
          />
        ))}
      </div>

      {/* Part 3 */}
      <div className="flex flex-col-reverse lg:flex-row mt-50">
        <div className="flex-1 mt-52 md:mt-20 lg:mt-0">
          <h2 className="text-2xl md:text-5xl font-bold text-secondary">
            Who We Are
          </h2>
          <div className="text-tertiary mt-8">
            <h3 className="text-xl md:text-2xl font-medium my-4">
              Empowering the Future of Crypto
            </h3>
            <p className="text-sm font-normal leading-6">
              At Bitcoin Yay, we are a team of blockchain enthusiasts,
              innovators, and tech pioneers dedicated to making cryptocurrency
              accessible to everyone. Our mission is to simplify the crypto
              experience, providing real-time insights, expert guidance, and
              cutting-edge tools to help users navigate the evolving world of
              digital assets.
            </p>
          </div>
          <div className="text-tertiary mt-8">
            <h3 className="text-xl md:text-2xl font-medium my-4">
              What We Stand For:
            </h3>
            <p className="text-sm font-normal leading-6">
              Innovation: Leveraging proprietary & revolutionary tech to enhance
              the crypto ecosystem.Accessibility: Making Bitcoin Yay and crypto
              insights available to everyone, from beginners to experts.Trust &
              Transparency: Providing accurate market data and unbiased
              analysis.Community-Driven Growth: Uniting 60+ million engaged
              members worldwide.
            </p>
          </div>
          <p className="text-sm font-normal mt-8 leading-6">
            Whether you’re here to track prices, diversify your portfolio, or
            stay updated with the latest trends,{" "}
            <span className="text-primary font-medium">Bitcoin Yay</span> is
            your ultimate gateway to the future of cryptocurrency.
          </p>
        </div>
        <div className="flex-1 items-center justify-center relative">
          <Image
            src={BitCoinYayLogo}
            alt="Bitcoin Yay Logo"
            className=" w-70 lg:w-164 h-70 lg:h-164 absolute -top-30 right-0"
          />
        </div>
      </div>

      {/* Part 4 */}
      <div className="flex flex-col lg:flex-row mt-40 lg:mt-80 gap-10 lg:gap-20">
        <div className="flex-1">
          <h2 className="text-2xl md:text-5xl font-bold text-secondary my-6">
            Our Vision
          </h2>
          <p className="text-sm font-normal text-tertiary leading-6">
            To revolutionize the crypto space by making Bitcoin and digital
            assets accessible, transparent, and beneficial for everyone. We aim
            to empower individuals with knowledge, tools, and a thriving
            community to shape the future of decentralized finance.
          </p>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-5xl font-bold text-secondary my-6">
            Our Mission
          </h2>
          <p className="text-sm font-normal text-tertiary leading-6">
            At Bitcoin Yay, we are dedicated to simplifying crypto for everyone
            by providing easy-to-understand insights, real-time data, and expert
            analysis. Our commitment to innovation drives us to develop
            cutting-edge technology, delivering proprietary tools and smart
            solutions that enhance the crypto experience.
          </p>
        </div>
      </div>

      {/* Part 07 */}
      <div className="mt-40 flex flex-col items-center justify-center text-center">
        <div>
          <h2 className="text-5xl font-bold">What Our Users Say?</h2>
        </div>
        <UserReviewCards />
      </div>
    </div>
  );
}
