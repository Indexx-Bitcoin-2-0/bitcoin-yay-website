import Image from "next/image";

import bgArtImage1 from "../assets/images/bitcoin-art.png";

const CustomStyledConatiner = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:min-h-100 overflow-hidden border border-bg2 rounded-lg p-5 w-full mt-6 lg:mt-10 mx-auto flex justify-center items-center relative">
      <div className="w-auto max-w-200">{children}</div>
      <Image
        src={bgArtImage1}
        alt="Background Art"
        className="w-54 md:w-72 lg:w-84 absolute lg:relative -z-10 -top-16 lg:top-0 -right-16 lg:right-0"
      />
    </div>
  );
};

export default CustomStyledConatiner;
