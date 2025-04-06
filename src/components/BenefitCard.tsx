const BenefitCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="flex flex-col  p-4 md:w-[450px]">
      <div className="flex items-center justify-start">
        <img src={image} alt={title} className="w-16 md:w-[100px] object-cover" />
        <h3 className="text-lg md:text-2xl font-semibold my-2 text-secondary">{title}</h3>
      </div>
      <p className="text-base font-normal text-tertiary leading-6">
        {description}
      </p>
    </div>
  );
};
export default BenefitCard;
