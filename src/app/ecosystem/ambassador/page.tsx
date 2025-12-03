"use client";

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

import CustomButton2 from "@/components/CustomButton2";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ArtImage1 from "@/assets/images/eco/ambassador/art-1.webp";
import ArtImage2 from "@/assets/images/eco/ambassador/art-2.webp";
import ArtImage3 from "@/assets/images/eco/ambassador/art-3.webp";
import ArtImage4 from "@/assets/images/eco/ambassador/art-4.webp";
import ArtImage5 from "@/assets/images/eco/ambassador/art-5.webp";
import ArtImage6 from "@/assets/images/eco/ambassador/art-6.webp";
import ArtImage7 from "@/assets/images/eco/ambassador/art-7.webp";
import ArtImage8 from "@/assets/images/eco/ambassador/art-8.webp";
import ArtImage9 from "@/assets/images/eco/ambassador/art-9.webp";

import BgImage1 from "@/assets/images/airdrop/bg-art-1.webp";
import BgImage2 from "@/assets/images/airdrop/bg-art-2.webp";
import SubmitButtomImage from "@/assets/images/buttons/register-button.webp";
import RegisterButton from "@/assets/images/buttons/arrow-up-button.webp";
import ReferralMatrixButton from "@/assets/images/buttons/eye-button.webp";

export default function Ambassador() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [socialChannels, setSocialChannels] = useState([
    { platform: "", followers: "" },
  ]);
  const [shortBio, setShortBio] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    socialChannels?: string;
    shortBio?: string;
  }>({});

  const toNumber = (v: string | number) =>
    typeof v === "number" ? v : Number(String(v).replace(/[,+]/g, "")) || 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    const newErrors: typeof errors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email address is required";
    if (!shortBio.trim()) newErrors.shortBio = "Short bio is required";

    setErrors(newErrors);
    setFormSubmitted(true);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Prepare data for API call
        const socialProfiles = socialChannels
          .filter((channel) => channel.platform && channel.followers)
          .map((channel) => ({
            platform: channel.platform,
            followers: toNumber(channel.followers), // ,
          }));

        const requestData = {
          fullName: fullName.trim(),
          email: email.trim(),
          bio: shortBio.trim(),
          socialProfiles,
        };

        // Make API call
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/inex/user/ambassadors`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          // Reset form
          setFullName("");
          setEmail("");
          setSocialChannels([{ platform: "", followers: "" }]);
          setShortBio("");
          setFormSubmitted(false);
          console.log(
            "Ambassador application submitted successfully",
            response.data
          );
        }
      } catch (error) {
        console.error("Error submitting ambassador application:", error);
        setErrors({
          ...newErrors,
          shortBio: "Failed to submit application. Please try again.",
        });
      }
    }
  };

  const addSocialChannel = () => {
    setSocialChannels([...socialChannels, { platform: "", followers: "" }]);
  };

  const updateSocialChannel = (
    index: number,
    field: "platform" | "followers",
    value: string
  ) => {
    const updated = socialChannels.map((channel, i) =>
      i === index ? { ...channel, [field]: value } : channel
    );
    setSocialChannels(updated);
  };

  return (
    <div className="mx-auto overflow-hidden mt-40">
      <div className="flex flex-col lg:flex-row items-center justify-center px-4">
        <div className="w-full lg:w-[40%] flex justify-center">
          <Image
            src={ArtImage1}
            alt="Ambassador"
            className="w-80 md:w-120 lg:w-180"
          />
        </div>
        <div className="mt-20 lg:mt-0 w-full lg:w-[60%] relative">
          <div className="absolute inset-0 bg-cover bg-center -z-10">
            <Image
              src={BgImage2}
              alt="Background Image 2"
              className="w-60 md:w-100 xl:w-100 absolute -top-24 right-0"
            />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Become a
          </h2>
          <h1 className="mt-2 text-6xl md:text-8xl lg:text-[140px] font-bold lg:leading-36">
            Bitcoin-Yay <br />
            Ambassador
          </h1>
          <p className="mt-16 text-xl md:text-2xl lg:text-4xl max-w-4xl">
            Earn Free subscriptions, unlock Pro mining power, and compete for
            our exclusive Top Ambassador Prize.
          </p>
          <p className="mt-10 text-lg text-primary">
            First, sign up on the app and then you can register below.
          </p>
          <div className="mt-20 flex justify-center">
            <CustomButton2
              image={SubmitButtomImage}
              text="Sign Up here"
              link="#apply-and-register"
            />
          </div>
        </div>
      </div>

      {/* Part 2 */}
      <div className="mt-80 relative" id="apply-and-register">
        <div className="absolute inset-0 bg-cover bg-center mt-40 -z-10">
          <Image
            src={BgImage1}
            alt="Background Image 1"
            className="hidden md:block w-80 md:w-60 xl:w-80 absolute top-0 left-0"
          />
          <Image
            src={BgImage2}
            alt="Background Image 2"
            className="hidden md:block md:w-60 xl:w-80 absolute top-0 right-0"
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-10">
          <h2 className="text-3xl md:text-5xl lg:text-8xl font-bold">
            Apply and Register
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-20 w-full p-8 flex flex-col justify-center max-w-3xl"
          >
            <div className="mb-6">
              <label htmlFor="fullName" className="block text-bg3 text-xl mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className={
                  "w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none  hover:border-primary"
                }
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {formSubmitted && errors.fullName && (
                <p className="text-red-700 text-base mt-2">{errors.fullName}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-bg3 text-xl mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={
                  "w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none  hover:border-primary"
                }
                placeholder="Use Bitcoin-Yay email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formSubmitted && errors.email && (
                <p className="text-red-700 text-base mt-2">{errors.email}</p>
              )}
            </div>

            {/* Social Channels Section */}
            <div className="mb-6">
              <div className="hidden md:flex items-center mb-2">
                <div className="flex-1">
                  <label className="block text-bg3 text-xl">
                    Social Channel(s)
                  </label>
                </div>
                <div className="w-px"></div>
                <div className="flex-1">
                  <label className="block text-bg3 text-xl">
                    Follower counts
                  </label>
                </div>
              </div>
              <div className="md:hidden mb-2">
                <label className="block text-bg3 text-xl">
                  Social Channel(s)
                </label>
              </div>

              {socialChannels.map((channel, index) => (
                <div key={index} className="mb-4">
                  {/* Desktop Layout - Combined */}
                  <div className="hidden md:flex group">
                    <div className="flex-1">
                      <select
                        className="[&>option:hover]:shadow-[0_0_10px_100px_#1882A8_inset] w-full text-lg p-3 pr-10 text-tertiary border border-bg3 rounded-l-md border-r-0 focus:border-primary focus:outline-none group-hover:border-primary group-focus-within:border-primary bg-transparent appearance-none cursor-pointer"
                        value={channel.platform}
                        onChange={(e) =>
                          updateSocialChannel(index, "platform", e.target.value)
                        }
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'/%3e%3c/svg%3e")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "16px 16px",
                        }}
                      >
                        <option value="" disabled className="bg-bg">
                          Select platform
                        </option>
                        <option value="twitter" className="bg-bg">
                          Twitter
                        </option>
                        <option value="instagram" className="bg-bg">
                          Instagram
                        </option>
                        <option value="youtube" className="bg-bg">
                          YouTube
                        </option>
                        <option value="tiktok" className="bg-bg">
                          TikTok
                        </option>
                        <option value="linkedin" className="bg-bg">
                          LinkedIn
                        </option>
                        <option value="facebook" className="bg-bg">
                          Facebook
                        </option>
                        <option value="other" className="bg-bg">
                          Other
                        </option>
                      </select>
                    </div>

                    {/* Vertical Separator */}
                    <div className="border-l border-bg3 my-1 group-hover:border-primary group-focus-within:border-primary"></div>

                    <div className="flex-1">
                      <select
                        className="[&>option:hover]:shadow-[0_0_10px_100px_#1882A8_inset] w-full text-lg p-3 pr-10 text-tertiary border border-bg3 rounded-r-md border-l-0 focus:border-primary focus:outline-none group-hover:border-primary group-focus-within:border-primary bg-transparent appearance-none cursor-pointer"
                        value={channel.followers}
                        onChange={(e) =>
                          updateSocialChannel(
                            index,
                            "followers",
                            e.target.value
                          )
                        }
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'/%3e%3c/svg%3e")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "16px 16px",
                        }}
                      >
                        <option value="" disabled className="bg-bg">
                          0
                        </option>
                        <option value="1000" className="bg-bg">
                          1,000+
                        </option>
                        <option value="5000" className="bg-bg">
                          5,000+
                        </option>
                        <option value="10000" className="bg-bg">
                          10,000+
                        </option>
                        <option value="50000" className="bg-bg">
                          50,000+
                        </option>
                        <option value="100000" className="bg-bg">
                          100,000+
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Mobile Layout - Separate Rows */}
                  <div className="md:hidden space-y-4">
                    <div>
                      <label className="block text-bg3 text-base mb-2">
                        Social Platform
                      </label>
                      <select
                        className="w-full text-lg p-3 pr-10 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent appearance-none cursor-pointer"
                        value={channel.platform}
                        onChange={(e) =>
                          updateSocialChannel(index, "platform", e.target.value)
                        }
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'/%3e%3c/svg%3e")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "16px 16px",
                        }}
                      >
                        <option value="" disabled className="bg-bg">
                          Select platform
                        </option>
                        <option value="twitter" className="bg-bg">
                          Twitter
                        </option>
                        <option value="instagram" className="bg-bg">
                          Instagram
                        </option>
                        <option value="youtube" className="bg-bg">
                          YouTube
                        </option>
                        <option value="tiktok" className="bg-bg">
                          TikTok
                        </option>
                        <option value="linkedin" className="bg-bg">
                          LinkedIn
                        </option>
                        <option value="facebook" className="bg-bg">
                          Facebook
                        </option>
                        <option value="other" className="bg-bg">
                          Other
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-bg3 text-base mb-2">
                        Follower Count
                      </label>
                      <select
                        className=" w-full text-lg p-3 pr-10 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent appearance-none cursor-pointer"
                        value={channel.followers}
                        onChange={(e) =>
                          updateSocialChannel(
                            index,
                            "followers",
                            e.target.value
                          )
                        }
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'/%3e%3c/svg%3e")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "16px 16px",
                        }}
                      >
                        <option value="" disabled className="bg-bg">
                          Select follower count
                        </option>
                        <option value="0-1000" className="bg-bg">
                          0 - 1,000
                        </option>
                        <option value="1000-5000" className="bg-bg">
                          1,000 - 5,000
                        </option>
                        <option value="5000-10000" className="bg-bg">
                          5,000 - 10,000
                        </option>
                        <option value="10000-50000" className="bg-bg">
                          10,000 - 50,000
                        </option>
                        <option value="50000-100000" className="bg-bg">
                          50,000 - 100,000
                        </option>
                        <option value="100000" className="bg-bg">
                          100,000+
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={addSocialChannel}
                  className=" text-tertiary cursor-pointer hover:text-primary"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="shortBio" className="block text-bg3 text-xl mb-2">
                Short Bio / Why You&apos;d Make a Great Ambassador
              </label>
              <input
                id="shortBio"
                className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary resize-vertical"
                placeholder="Tell us about yourself"
                value={shortBio}
                onChange={(e) => setShortBio(e.target.value)}
              />
              {formSubmitted && errors.shortBio && (
                <p className="text-red-700 text-base mt-2">{errors.shortBio}</p>
              )}
            </div>

            <div className="flex justify-center mt-20">
              <button
                type="submit"
                className="cursor-pointer text-tertiary group flex flex-col items-center justify-center w-fit"
              >
                <Image
                  src={RegisterButton}
                  alt="Logo"
                  className={`group-hover:scale-110 transition-transform duration-300 w-36 mt-8`}
                />
                <div className="flex justify-center mt-4">
                  <p className="text-lg group-hover:text-primary">
                    Submit Application
                  </p>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Part 03 */}
      <div className="mx-auto mt-80 flex flex-col items-center justify-center px-4 md:px-20 lg:px-40">
        <h2 className="text-3xl md:text-5xl lg:text-8xl font-bold">
          Program Highlights
        </h2>
        <div className="">
          <div className="flex flex-col md:flex-row items-start md:items-center mt-20">
            <div className="w-full md:w-1/2 flex flex-col md:flex-row items-start md:items-center gap-2">
              <div className="w-40 flex items-center justify-center">
                <Image
                  src={ArtImage2}
                  alt="Art Image 2"
                  className="w-40 md:w-30 xl:w-40"
                />
              </div>
              <p className="text-xl lg:text-3xl font-bold mt-2 md:mt-0">
                2 Months Free Turbo Gopher
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="mt-6 md:mt-0 text-xl font-light md:font-normal text-tertiary leading-10">
                6× mining speed (≈9 BTCY/hr) to kickstart your earnings.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center mt-20">
            <div className="w-full md:w-1/2 flex flex-col md:flex-row items-start md:items-center gap-2">
              <div className="w-40 flex items-center justify-center">
                <Image src={ArtImage3} alt="Art Image 2" className="w-30" />
              </div>
              <p className="text-xl lg:text-3xl font-bold mt-2 md:mt-0">
                Tiered Referral Bonuses
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="mt-6 md:mt-0 text-xl font-light md:font-normal text-tertiary leading-10">
                Earn extra Turbo or Nuclear days as you hit 100, 300, 500
                sign-ups.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center mt-20">
            <div className="w-full md:w-1/2 flex flex-col md:flex-row items-start md:items-center gap-2">
              <div className="w-40 flex items-center justify-center">
                <Image src={ArtImage4} alt="Art Image 2" className="w-16" />
              </div>
              <p className="text-xl lg:text-3xl font-bold mt-2 md:mt-0">
                Early Feature Access
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="mt-6 md:mt-0 text-xl font-light md:font-normal text-tertiary leading-10">
                Beta-test upcoming mining tools before anyone else.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center mt-20">
            <div className="w-full md:w-1/2 flex flex-col md:flex-row items-start md:items-center gap-2">
              <div className="w-40 flex items-center justify-center">
                <Image src={ArtImage5} alt="Art Image 2" className="w-20" />
              </div>
              <p className="text-xl lg:text-3xl font-bold mt-2 md:mt-0">
                Top Ambassador Prize
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="mt-6 md:mt-0 text-xl font-light md:font-normal text-tertiary leading-10">
                Every quarter, our highest-performer wins a special prize
                bundle. Details coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 04 */}
      <div className="flex flex-col lg:flex-row items-center justify-end gap-20 mt-80">
        <div className="w-full flex flex-col justify-center max-w-[800px] px-4">
          <h3 className="text-3xl md:text-5xl xl:text-8xl font-bold">
            How it works
          </h3>
          <ul className="list-decimal mt-16 text-2xl md:text-3xl font-bold pl-4 md:pl-10 flex flex-col gap-16">
            <li>
              <h5>Sign Up & Verify</h5>
              <p className="text-base font-normal mt-6">
                Click &quot;Apply now&quot;, register on Bitcoin-Yay app, and
                complete a quick profile
              </p>
            </li>
            <li>
              <h5>Share Your Code</h5>
              <p className="text-base font-normal mt-6">
                We’ll give you a unique referral link & code. Post it in your
                videos, social bios, or messages.
              </p>
            </li>
            <li>
              <h5>Earn Subscriptions & Rewards</h5>
              <p className="text-base font-normal mt-6">
                As users sign up and tap daily, you unlock extra Turbo/Nuclear
                subscription days—and climb the leaderboard.
              </p>
            </li>
          </ul>
        </div>
        <Image
          src={ArtImage6}
          alt="Art Image 3"
          className="w-80 md:w-120 lg:w-120 xl:w-180"
        />
      </div>

      <div className="mt-40 flex items-center justify-center">
        <CustomButton2
          image={ReferralMatrixButton}
          text="Referral Matrix"
          link="#referral-matrix"
        />
      </div>

      {/* Part 05 */}
      <div
        className="mt-80 flex flex-col items-center justify-center px-4"
        id="referral-matrix"
      >
        <div className="flex flex-col items-center justify-center">
          <Image src={ArtImage7} alt="Art Image 7" className="w-100" />
          <h2 className="text-3xl md:text-5xl lg:text-8xl font-bold mt-10">
            Referral Incentive Matrix
          </h2>
        </div>

        {/* Referral Matrix Table */}
        <div className="mt-20 w-full max-w-4xl">
          <table className="w-full border-collapse border border-tertiary">
            <thead>
              <tr className="font-bold text-center text-[14px] md:text-xl [&>th]:border [&>th]:border-bg3 text-bg3 [&>th]:py-4 [&>th]:px-8">
                <th>Validated Referrals</th>
                <th>Bonus Reward</th>
              </tr>
            </thead>
            <tbody>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-2xl text-center">100</td>
                <td className="text-[14px] md:text-xl">
                  + 14 days Turbo Gopher 6x
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3  [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-2xl text-center">300</td>
                <td className="text-[14px] md:text-xl">
                  + 14 days Nuclear Gopher 9x
                </td>
              </tr>
              <tr className="[&>td]:border [&>td]:border-bg3 [&>td]:text-bg3 [&>td]:py-4 [&>td]:px-2 [&>td]:md:px-8">
                <td className="font-bold text-2xl text-center">500</td>
                <td className="text-[14px] md:text-xl">
                  + 1 month Nuclear Gopher 9x
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 06 */}
      <div className="flex flex-col lg:flex-row items-center justify-start gap-20 mt-80">
        <Image
          src={ArtImage8}
          alt="Art Image 3"
          className="w-80 md:w-120 lg:w-120 xl:w-180 -ml-20"
        />
        <div className="w-full flex flex-col justify-center max-w-[800px] px-4">
          <h3 className="text-[40px]">Additional Benefits</h3>
          <h3 className="text-3xl md:text-5xl xl:text-8xl font-bold">
            & Gamification
          </h3>
          <ul className="list-decimal mt-16 text-2xl md:text-3xl font-bold pl-4 md:pl-10 flex flex-col gap-16">
            <li>
              <h5> Instant “Speed Drops”</h5>
              <p className="text-base font-normal mt-6">
                – Hit 100 referrals in a single week → immediate +30 days of
                Turbo.
              </p>
            </li>
            <li>
              <h5>Exclusive Ambassador Badge</h5>
              <p className="text-base font-normal mt-6">
                – On-chain NFT you can display on your channel and social
                profiles.
              </p>
            </li>
            <li>
              <h5> Quarterly Top Ambassador Prize</h5>
              <p className="text-base font-normal mt-6">
                – The ambassador with the most referrals each quarter earns a
                special prize pack (details announced soon).
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Part 07 */}
      <div className="my-80 flex flex-col items-center justify-center px-4 max-w-[1000px] mx-auto">
        <div className="w-full flex justify-between md:justify-start">
          <h2 className="text-3xl md:text-5xl lg:text-8xl font-bold mt-10">
            FAQs
          </h2>
          <Image src={ArtImage9} alt="Art Image 9" className="w-54" />
        </div>

        {/* FAQ Accordions */}
        <div className="w-full mt-16">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                Who can join?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                Anyone with a social presence or community who can drive
                referrals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                How do you track referrals?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                Unique links & on-chain validation ensure accuracy.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-bg3 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                When do I get my subscription bonus?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                Bonuses are applied to your account within 48 hours after
                milestone is verified.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-bg3 last:border-b-1 rounded-lg px-6 bg-transparent"
            >
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-tertiary hover:no-underline flex items-center justify-between">
                What is the Top Ambassador Prize?
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-tertiary my-4">
                A quarterly reward for our highest-performing ambassadors—think
                exclusive NFTs, merch, and more. (Stay tuned!)
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
