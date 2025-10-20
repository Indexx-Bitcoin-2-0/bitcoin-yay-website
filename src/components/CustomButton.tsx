import Image from "next/image";
import { useState } from "react";

import ButtonBorder from "../assets/images/button-border.svg";
import ButtonBorderActive from "../assets/images/button-border-active.svg";

interface CustomButtonProps {
  index: number;
  text: string;
  handleButtonClick: (key: number) => void;
  isActive?: boolean;
}

const CustomButton = ({
  index,
  text,
  handleButtonClick,
  isActive,
}: CustomButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={
        "relative text-sm md:text-lg font-normal md:p-0 bg-transparent flex items-center justify-center text-center cursor-pointer hover:text-primary"
      }
      onClick={() => handleButtonClick(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isActive ? (
        <Image
          src={ButtonBorderActive}
          alt="Button Border"
          className="w-26 md:w-36 lg:w-40"
        />
      ) : (
        <Image
          src={isHovered ? ButtonBorderActive : ButtonBorder}
          alt="Button Border"
          className="w-26 md:w-36 lg:w-40"
        />
      )}
      <p
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs md:text-lg w-fit md:w-36 ${
          isActive || isHovered ? "text-primary" : "text-tertiary"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default CustomButton;
