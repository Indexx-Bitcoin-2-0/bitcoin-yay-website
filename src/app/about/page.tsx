import Image, { StaticImageData } from "next/image";

import bgArtImage2 from "../../assets/images/bitcoin-art-3.svg";
import ArtImage1 from "@/assets/images/about/art-1.webp";
import ArtImage2 from "@/assets/images/about/art-2.svg";

import FounderImage1 from "../../assets/images/about/founder-1.svg";
import FounderImage2 from "../../assets/images/about/founder-2.svg";

import StatsIcon1 from "../../assets/images/about/icon-1.svg";
import StatsIcon2 from "../../assets/images/about/icon-2.svg";
import StatsIcon3 from "../../assets/images/about/icon-3.svg";
import StatsIcon4 from "../../assets/images/about/icon-4.svg";

import UserReviewCards from "@/components/UserReviewCards";
import CustomStyledConatiner from "@/components/CustomStyledContainer";

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

export const metadata = {
  title: "About Bitcoin Yay - Shaping the Future of Social Cryptocurrency",
  description:
    "Learn about Bitcoin Yay's mission to revolutionize digital finance. Join 60+ million crypto enthusiasts, 35+ core team members, and experience revolutionary tech powering the future of cryptocurrency.",
  openGraph: {
    title: "About Bitcoin Yay - Shaping the Future of Social Cryptocurrency",
    description:
      "Learn about Bitcoin Yay's mission to revolutionize digital finance. Join 60+ million crypto enthusiasts, 35+ core team members, and experience revolutionary tech powering the future of cryptocurrency.",
  },
};

export default function About() {
  return (
    <div className=" mx-auto max-w-[90vw] lg:px-10 py-8 mt-40">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-6 max-w-300  md:leading-16">
          Bitcoin Yay: Shaping the Future of Social Cryptocurrency in Web3
        </h1>
        <p className="text-sm md:text-lg font-normal text-tertiary my-4">
          Connecting communities, enabling seamless transactions, and
          revolutionizing digital finance.
        </p>
      </CustomStyledConatiner>

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
        <div className="flex-1 mt-20 md:mt-20 lg:mt-0">
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
        <div className="flex-1 flex items-center justify-center -mt-30">
          <Image src={ArtImage1} alt="Bitcoin Yay Logo" className="" />
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

      {/* Part 05 */}
      <div
        className="flex flex-col lg:flex-row mt-30 pt-20 lg:pt-40 mx-auto relative bg-[center_-5px] md:bg-[center_-10px] bg-size-[400px_auto] md:bg-size-[700px_auto] bg-no-repeat"
        style={{
          backgroundImage: `url(${bgArtImage2.src})`,
        }}
      >
        <div className=" flex flex-col flex-1 lg:p-10 justify-center">
          <h2 className="text-2xl md:text-5xl font-bold text-secondary my-6">
            Built for Everyone, By Everyone
          </h2>
          <p className="text-sm font-normal text-tertiary leading-6 my-2">
            Bitcoin Yay is a dynamic community of crypto enthusiasts, investors,
            and innovators dedicated to making Bitcoin and digital assets
            accessible to all. Built on a foundation of decentralization and
            transparency, Bitcoin Yay empowers users with real-time insights,
            cutting-edge tools, and a collaborative ecosystem. By leveraging
            revolutionary technology and a strong global network, we are shaping
            the future of Web3, ensuring a secure, inclusive, and meritocratic
            crypto experience for everyone.
          </p>
          <p className="text-sm font-normal text-tertiary leading-6 my-2">
            In order to ensure fairness in Pi mining, secure the Pi blockchain,
            maintain integrity in the Pi ecosystem, and eventually create and
            safeguard the community-run governance, it is essential to empower
            real people around the world and disempower malicious actors, bots,
            or free riders. Pi relies on its community of Pioneers to
            meritocratically mine Pi tokens using their mobile phones, while Pi
            KYC serves as a core mechanism to ensure true humanity and build
            collaboration into the network, enabling the community to create a
            decentralized ecosystem with meaningful use cases for everyday
            people.  An accessible developer platform, combined with a large,
            identity-verified and crypto-enabled social network, positions Pi
            Network to become a pillar of the next wave of technological
            revolution.
          </p>
        </div>
        <div className=" flex flex-1 items-center justify-center mt-20 lg:mt-0">
          <Image src={ArtImage2} alt="Phone Image" />
        </div>
      </div>

      {/* Part 06  */}
      <div className="flex flex-col items-center justify-center mt-40">
        <h2 className="text-2xl md:text-5xl font-bold text-secondary my-6">
          The Founders – Visionaries Behind Bitcoin Yay
        </h2>
        <div className="flex flex-col lg:flex-row mt-10 md:mt-20 gap-10 lg:gap-20 ">
          <div className="flex-1 bg-bg2 rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-start mb-4">
              <Image
                src={FounderImage1}
                alt="Founder Image 1"
                className="w-30 md:w-52"
              />
              <div className="flex flex-col justify-center p-4">
                <h3 className="text-2xl md:text-4xl font-bold text-secondary py-2">
                  Corey Kleinsasser
                </h3>
                <p className="text-xl md:text-3xl font-base text-tertiary">
                  Head of Technology
                </p>
              </div>
            </div>
            <p className="text-sm font-normal text-tertiary leading-6 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing{" "}
            </p>
          </div>
          <div className="flex-1 bg-bg2 rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-start mb-4">
              <Image
                src={FounderImage2}
                alt="Founder Image 1"
                className="w-30 md:w-52"
              />
              <div className="flex flex-col justify-center p-4">
                <h3 className="text-2xl md:text-4xl font-bold text-secondary py-2">
                  Phil Hale
                </h3>
                <p className="text-xl md:text-3xl font-base text-tertiary">
                  Head of Product
                </p>
              </div>
            </div>
            <p className="text-sm font-normal text-tertiary leading-6 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing{" "}
            </p>
          </div>
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
