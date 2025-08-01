import React from "react";

import CustomButton from "./CustomButton";

type Props = {
  categoryIndexs: { [key: string]: string };
  chainType: { [key: string]: string };
  activeCategory: number;
  activeChainType: number;
  handleCategoryButtonClick: (index: number) => void;
  handleChainTypeButtonClick: (index: number) => void;
};

const BlockchainFilterButtons: React.FC<Props> = ({
  categoryIndexs,
  chainType,
  activeCategory,
  activeChainType,
  handleCategoryButtonClick,
  handleChainTypeButtonClick,
}) => {
  return (
    <div>
      <div className="w-full flex md:gap-6 items-center justify-center mt-8">
        {Object.entries(categoryIndexs).map(([key, category]) => (
          <CustomButton
            key={key}
            index={parseInt(key)}
            text={category}
            handleButtonClick={handleCategoryButtonClick}
            isActive={activeCategory === parseInt(key)}
          />
        ))}
      </div>
      <div className="w-full flex gap-2 items-center justify-center mt-8">
        {Object.entries(chainType).map(([key, category]) => (
          <CustomButton
            key={key}
            index={parseInt(key)}
            text={category}
            handleButtonClick={handleChainTypeButtonClick}
            isActive={activeChainType === parseInt(key)}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockchainFilterButtons;
