import CustomStyledConatiner from "@/components/CustomStyledContainer";

export const metadata = {
  title: "bitcoin-yay Safety Center - Security Guidelines & Official Channels",
  description:
    "Stay safe with bitcoin-yay. Learn about official communication channels, authorized apps, and protect yourself from scams. Only trust verified bitcoin-yay sources and URLs.",
  openGraph: {
    title:
      "bitcoin-yay Safety Center - Security Guidelines & Official Channels",
    description:
      "Stay safe with bitcoin-yay. Learn about official communication channels, authorized apps, and protect yourself from scams. Only trust verified bitcoin-yay sources and URLs.",
  },
};

const SafetySection = ({ title, description }) => {
  return (
    <div className="  flex flex-col flex-1 min-w-[300px]">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default function SafetyCenter() {
  return (
    <div className="mx-auto max-w-[90vw] lg:px-10 py-8 mt-40">
      <CustomStyledConatiner>
        <h1 className="text-2xl md:text-5xl font-bold mt-8 max-w-300 md:leading-16">
          bitcoin-yay Safety Center
        </h1>
      </CustomStyledConatiner>

      <div className="mt-8 space-y-8">
        {/* Official Communications Section */}
        <div className="">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Official Communications Channels
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Please always rely on information provided by bitcoin-yay's official
            channels. Refer to the following for a complete list of official
            bitcoin-yay information sources online.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            We will always maintain a complete list of all official bitcoin-yay
            channels here. If a source is not listed, it is not official, even
            if it claims to be. Stay vigilant against scams.
          </p>
        </div>

        {/* Official URL Links Section */}
        <div className="">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Official URL Links to bitcoin-yay Apps and Products
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            When using official bitcoin-yay apps and products on the bitcoin-yay
            Browser or BitcoinNet, ensure that the URL addresses match exactly
            as listed below—DO NOT use any variations or sites that imitate
            official sources. Beware of scams.
          </p>
        </div>

        {/* Bottom Sections in Flex Row */}
        <div className="flex flex-col md:flex-row gap-6">
          <SafetySection
            title="Local Unaffiliated & Unauthorized Activities"
            description="Any local events, groups, or initiatives that are not explicitly endorsed by bitcoin-yay should be approached with caution. If an activity is not officially listed in our verified channels, it is unauthorized and may not represent our mission or values. Always verify legitimacy through our official sources to avoid potential scams or misinformation."
          />
          <SafetySection
            title="Unauthorized Token Listings"
            description="bitcoin-yay has not authorized any external token listings on exchanges. Any claims of bitcoin-yay tokens being available for trade on third-party platforms should be treated as false and potentially fraudulent. Always rely on our official channels for updates on token listings and avoid engaging with unauthorized platforms to protect your assets."
          />
        </div>
      </div>
    </div>
  );
}
