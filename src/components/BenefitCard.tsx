import Image, { StaticImageData } from "next/image";

const BenefitCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: StaticImageData;
}) => {
  return (
    <div className="flex p-4 max-w-150">
      <div>
        <Image src={image} alt={title} className="max-w-24" />
      </div>
      <div className="flex flex-col justify-center items-start ml-6">
        <h3 className="text-lg md:text-2xl font-semibold text-secondary">
          {title}
        </h3>
        <p className="text-base font-normal text-tertiary leading-6 mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};
export default BenefitCard;
