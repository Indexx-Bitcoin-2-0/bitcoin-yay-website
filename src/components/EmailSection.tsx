"use client";

import { useState } from "react";
import axios from "axios";
import { StaticImageData } from "next/image";
import CustomButton2 from "@/components/CustomButton2";

import { EMAIL_TO_ADMIN_API_ROUTE } from "@/routes";

interface EmailSectionProps {
  colorVariant: string;
  buttonImage: StaticImageData;
}

export default function EmailSection({
  colorVariant,
  buttonImage,
}: EmailSectionProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setMessage("");
    setMessageType("");

    setIsLoading(true);

    try {
      await axios.post(EMAIL_TO_ADMIN_API_ROUTE, {
        email: email.trim(),
        website: "Bitcoin Yay",
      });

      setMessage("Thank you! Your email has been successfully subscribed.");
      setMessageType("success");
      setEmail("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.data?.message) {
          setMessage(err.response.data.data.message);
        } else {
          setMessage("Something went wrong. Please try again.");
        }
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear message on typing
    if (message) {
      setMessage("");
      setMessageType("");
    }
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-6 items-center w-full max-w-140"
          >
            <div className="flex flex-col gap-2 w-full sm:flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                disabled={isLoading}
                className="w-full px-4 py-3 md:px-6 md:py-4 pr-24 md:pr-28 rounded-full border border-secondary text-secondary placeholder-secondary focus:outline-none text-base md:text-lg bg-secondary/20"
              />
              {message && (
                <p
                  className={`text-center text-sm md:text-base ${
                    messageType === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-transparent border-none p-0"
              >
                <CustomButton2
                  text=""
                  onClick={() => {}}
                  image={buttonImage}
                  imageStyling="w-30 mt-2"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
