import { StaticImageData } from "next/image";

interface InfoCardProps {
  image: StaticImageData;
  title: string;
  desc: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ image, title, desc }) => {
  return (
    <div className="md:w-[450px] p-4">
      <img
        src={image.src}
        alt={title}
        className="w-[100px] object-cover"
      />
      <h3 className="text-lg font-semibold my-2 text-secondary">{title}</h3>
      <p className=" text-sm font-normal text-tertiary leading-6">{desc}</p>
    </div>
  );
};

export default InfoCard;
