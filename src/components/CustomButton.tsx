import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  index: number;
  text: string;
  handleButtonClick: (key: number) => void;
  isActive: boolean;
}

const CustomButton = ({
  index,
  text,
  handleButtonClick,
  isActive,
}: CustomButtonProps) => {
  return (
    <Button
      className={`text-sm md:text-lg font-normal p-2 md:p-5 rounded-full border border-tertiary ${isActive ? "bg-primary border-primary" : "bg-transparent"}`}
      onClick={() => handleButtonClick(index)}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
