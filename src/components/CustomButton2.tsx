import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function CustomButton2({
  image,
  text,
  link,
  imageStyling = "w-36 mt-8",
  _blank = false,
}: {
  image: StaticImageData;
  text: string;
  link: string;
  imageStyling?: string;
  _blank?: boolean;
}) {
  return (
    <Link
      href={link}
      target={_blank ? "_blank" : undefined}
      className="cursor-pointer text-tertiary group flex flex-col items-center justify-center w-fit"
    >
      <Image
        src={image}
        alt="Logo"
        className={`group-hover:scale-110 transition-transform duration-300 ${imageStyling}`}
      />
      <div className="flex justify-center mt-4 text-center">
        <p className="text-lg group-hover:text-primary">{text}</p>
      </div>
    </Link>
  );
}
