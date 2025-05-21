import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function CustomButton2({
  image,
  text,
  link,
}: {
  image: StaticImageData;
  text: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="cursor-pointer text-tertiary group flex flex-col items-center justify-center mt-10"
    >
      <Image
        src={image}
        alt="Logo"
        className="w-40 mt-8 group-hover:scale-110 transition-transform duration-300"
      />
      <div className="flex justify-center mt-4">
        <p className="text-lg group-hover:text-primary">{text}</p>
      </div>
    </Link>
  );
}
