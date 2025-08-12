import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";

type CustomButton2Props = {
  image: StaticImageData;
  text?: string;
  imageStyling?: string;
  _blank?: boolean;
} & (
  | {
      link: string;
      onClick?: never; 
    }
  | {
      link?: never; 
      onClick: MouseEventHandler<HTMLDivElement>;
    }
);

export default function CustomButton2({
  image,
  text,
  link,
  onClick,
  imageStyling = "w-36 mt-8",
  _blank = false,
}: CustomButton2Props) {
  const commonClasses =
    "cursor-pointer text-tertiary group flex flex-col items-center justify-center w-fit";

  const content = (
    <>
      <Image
        src={image}
        alt="Logo"
        className={`group-hover:scale-110 transition-transform duration-300 ${imageStyling}`}
      />
      {text && (
        <div className="flex justify-center mt-4 text-center">
          <p className="text-lg group-hover:text-primary">{text}</p>
        </div>
      )}
    </>
  );

  if (link) {
    return (
      <Link
        href={link}
        target={_blank ? "_blank" : undefined}
        className={commonClasses}
      >
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div onClick={onClick} className={commonClasses}>
        {content}
      </div>
    );
  }
  return null;
}
