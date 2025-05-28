import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function CustomButton2({
  image,
  text,
  link,
  imageStyling = "w-36 mt-8",
}: {
  image: StaticImageData;
  text: string;
  link: string;
  imageStyling?: string;
}) {
  return (
    <Link
      href={link}
      className="cursor-pointer text-tertiary group flex flex-col items-center justify-center w-fit"
    >
      <Image
        src={image}
        alt="Logo"
        className={`group-hover:scale-110 transition-transform duration-300 ${imageStyling}`}
      />
      <div className="flex justify-center mt-4">
        <p className="text-lg group-hover:text-primary">{text}</p>
      </div>
    </Link>
  );
}
