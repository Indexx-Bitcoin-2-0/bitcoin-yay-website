import Image, { StaticImageData } from "next/image";

import ArtImage1 from "@/assets/images/bible/art-1.svg";
import ArtImage2 from "@/assets/images/bible/art-2.svg";

import CardImage1 from "@/assets/images/bible/card-1.svg";
import CardImage2 from "@/assets/images/bible/card-2.svg";
import CardImage3 from "@/assets/images/bible/card-3.svg";
import CardImage4 from "@/assets/images/bible/card-4.svg";
import CardImage5 from "@/assets/images/bible/card-5.svg";

const CustomCard = ({
  image,
  title,
  description,
  buttonText,
}: {
  image: StaticImageData;
  title: string;
  description: string;
  buttonText: string;
}) => {
  return (
    <div className="flex w-full md:w-[48%] h-144 px-2 flex-col items-center justify-center text-center bg-[#181818]">
      <Image src={image} alt={title} className="w-54" />
      <h3 className="text-4xl font-bold mt-10">{title}</h3>
      <p className="text-lg mt-4">{description}</p>
      <button className="bg-primary text-bg mt-4 text-sm px-4 py-2 rounded-md cursor-pointer">
        {buttonText}
      </button>
    </div>
  );
};

export default function Bible() {
  return (
    <div className="mx-auto px-4 ">
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-lg md:text-2xl mb-4 font-bold text-primary">
          Bitcoin-YAY
        </h2>
        <h1 className="text-5xl md:text-7xl mb-4 font-semibold">Bible</h1>
        <Image src={ArtImage1} alt="Art Image 1" />
        <p className="text-lg font-light max-w-140">
          BTCY Bible Is the essential documentation—whitepaper, tokenomics,
          governance, and ecosystem design—for understanding and building within
          the BTCY network.
        </p>
      </div>
      <div className="mt-40 max-w-screen overflow-hidden">
        <Image src={ArtImage2} alt="Art Image 2" className="min-w-200" />
      </div>

      <div className="mt-80 px-4 md:px-20 xl:px-40">
        <h2 className="text-5xl md:text-7xl font-bold">
          What’s inside BTCY Bible
        </h2>
        <p className="text-xl mt-4">
          Core docs—whitepaper, tokenomics, and governance for BTCY.
        </p>
      </div>

      <div className="mt-20 mx-auto flex flex-wrap gap-4">
        <CustomCard
          image={CardImage1}
          title="Story"
          description="A Crypto based lottery where you can earn big rewards"
          buttonText="Read Story"
        />
        <CustomCard
          image={CardImage2}
          title="Whitepaper"
          description="Project guide"
          buttonText="Read Whitepaper"
        />
        <CustomCard
          image={CardImage3}
          title="Tokenomics"
          description="Crypto Exchange where you Buy/Sell and Convert Crypto Currencies"
          buttonText="Explore Tokenomics"
        />
        <CustomCard
          image={CardImage4}
          title="YingYang Blockchain"
          description="Dynamic, AI-optimized ecosystem. "
          buttonText="Explore Blockchain"
        />
        <CustomCard
          image={CardImage5}
          title="Ying Yang Wallet"
          description="A Crypto based lottery where you can earn big rewards"
          buttonText="Learn Ying Yang Wallet"
        />
      </div>
    </div>
  );
}
