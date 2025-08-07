"use client";

import { useState } from "react";
import { StaticImageData } from "next/image";
import CustomButton2 from "@/components/CustomButton2";

interface EmailSectionProps {
  colorVariant: string;
  buttonImage: StaticImageData;
}

export default function EmailSection({
  colorVariant,
  buttonImage,
}: EmailSectionProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Email submitted:", email);
  };

  return (
    <div className="mt-60 mb-20">
      <div
        className={`bg-${colorVariant} rounded-2xl px-6 py-8 md:px-12 md:py-10 lg:px-16 lg:py-8`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">
              To Get Exclusive Benefits
            </h3>
            <p className="text-secondary font-light text-lg md:text-xl lg:text-2xl opacity-90">
              Please drop in your email
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-10 items-center w-full max-w-140">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="w-full sm:flex-1 px-4 py-3 md:px-6 md:py-4 pr-24 md:pr-28 rounded-full border border-secondary text-secondary placeholder-secondary focus:outline-none text-base md:text-lg bg-secondary/20"
            />

            <div className="flex items-center justify-center">
              <CustomButton2
                text=""
                onClick={handleSubmit}
                image={buttonImage}
                imageStyling="w-24 mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
