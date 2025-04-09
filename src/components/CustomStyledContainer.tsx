import Image from "next/image";

import bgArtImage1 from "../assets/images/bitcoin-art-2.png";

const CustomStyledConatiner = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:min-h-100 overflow-hidden border border-bg2 rounded-lg p-5 lg:p-15 w-full mt-6 lg:mt-10 mx-auto relative ">
      <Image
        src={bgArtImage1}
        alt="Background Art"
        className="absolute -z-10 -top-5 md:top-0 right-0 w-50 lg:w-100"
      />
      {children}
    </div>
  );
};

export default CustomStyledConatiner;
