import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";

type CustomButton2Props = {
  image: StaticImageData;
  text?: string;
  imageStyling?: string;
  _blank?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
} & (
  | {
      link: string;
      onClick?: never;
    }
  | {
      link?: never;
      onClick?: MouseEventHandler<HTMLDivElement>;
    }
);

export default function CustomButton2({
  image,
  text,
  link,
  onClick,
  imageStyling = "w-36 mt-8",
  _blank = false,
  ariaLabel,
  disabled = false,
}: CustomButton2Props) {
  const commonClasses = disabled
    ? "cursor-not-allowed opacity-50 text-tertiary group flex flex-col items-center justify-center w-fit"
    : "cursor-pointer text-tertiary group flex flex-col items-center justify-center w-fit";

  const content = (
    <>
      <Image
        src={image}
        alt="Logo"
        className={`${disabled ? "" : "group-hover:scale-110"} transition-transform duration-300 ${imageStyling}`}
      />
      {text && (
        <div className="flex justify-center mt-4 text-center">
          <p className={`text-lg ${disabled ? "" : "group-hover:text-primary"}`}>{text}</p>
        </div>
      )}
    </>
  );

  if (disabled) {
    return (
      <div className={commonClasses} aria-label={ariaLabel} aria-disabled="true">
        {content}
      </div>
    );
  }

  if (link) {
    return (
      <Link
        href={link}
        target={_blank ? "_blank" : undefined}
        className={commonClasses}
        aria-label={ariaLabel}
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
