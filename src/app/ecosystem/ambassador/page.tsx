"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import CustomButton2 from "@/components/CustomButton2";
import AmbassadorFaq from "./AmbasadorFaq"; 

import { registerAmbassador } from "@/lib/ambassador";

import ArtImage1 from "@/assets/images/eco/ambassador/art-1.webp";
import ArtImage6 from "@/assets/images/eco/ambassador/art-6.webp";
import ArtImage8 from "@/assets/images/eco/ambassador/art-8.webp";
import ArtImage10 from "@/assets/images/eco/ambassador/art-10.webp";

import VideoImage from "@/assets/images/eco/ambassador/video-thumbnail.webp";

import BgImage1 from "@/assets/images/airdrop/bg-art-1.webp";
import BgImage2 from "@/assets/images/airdrop/bg-art-2.webp";
import RegisterButton from "@/assets/images/buttons/arrow-up-button.webp";
import ReferralMatrixButton from "@/assets/images/buttons/eye-button.webp";
import NotesButton from "@/assets/images/buttons/notes-button.webp";
import PointerButton from "@/assets/images/buttons/point-button.webp";

const videos = [
  {
    id: 1,
    title: "Video 1",
    url: "https://www.youtube.com",
  },
  {
    id: 2,
    title: "Video 2",
    url: "https://www.youtube.com",
  },
  {
    id: 3,
    title: "Video 3",
    url: "https://www.youtube.com",
  },
];

export default function Ambassador() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [telegramHandle, setTelegramHandle] = useState("");
  const [primaryChannels, setPrimaryChannels] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [regions, setRegions] = useState("");
  const [contentNiche, setContentNiche] = useState("");
  const [topPostsLinks, setTopPostsLinks] = useState("");
  const [shortPitch, setShortPitch] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    telegramHandle?: string;
    primaryChannels?: string;
    audienceSize?: string;
    regions?: string;
    contentNiche?: string;
    topPostsLinks?: string;
    shortPitch?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    const newErrors: typeof errors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email address is required";
    if (!telegramHandle.trim())
      newErrors.telegramHandle = "Telegram handle is required";
    if (!primaryChannels.trim())
      newErrors.primaryChannels = "Primary channel is required";
    if (!audienceSize.trim())
      newErrors.audienceSize = "Audience size is required";
    if (!regions.trim()) newErrors.regions = "Region is required";
    if (!contentNiche.trim())
      newErrors.contentNiche = "Content niche is required";
    if (!topPostsLinks.trim())
      newErrors.topPostsLinks = "Links to top posts/videos is required";
    if (!shortPitch.trim()) newErrors.shortPitch = "Short pitch is required";

    setErrors(newErrors);
    setFormSubmitted(true);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Prepare data for API call
        const requestData = {
          fullName: fullName.trim(),
          email: email.trim(),
          telegramHandle: telegramHandle.trim(),
          primaryChannels: primaryChannels.trim(),
          audienceSize: audienceSize.trim(),
          regions: regions.trim(),
          contentNiche: contentNiche.trim(),
          topPostsLinks: topPostsLinks.trim(),
          shortPitch: shortPitch.trim(),
        };

        // Make API call
        const response = await registerAmbassador(requestData);

        if (response.success) {
          // Reset form
          setFullName("");
          setEmail("");
          setTelegramHandle("");
          setPrimaryChannels("");
          setAudienceSize("");
          setRegions("");
          setContentNiche("");
          setTopPostsLinks("");
          setShortPitch("");
          setFormSubmitted(false);
          console.log(
            "Ambassador application submitted successfully",
            response
          );
        } else {
          setErrors({
            ...newErrors,
            shortPitch: response.error,
          });
        }
      } catch (error) {
        console.error("Error submitting ambassador application:", error);
        setErrors({
          ...newErrors,
          shortPitch: "Failed to submit application. Please try again.",
        });
      } finally {
        setFormSubmitted(false);
      }
    } else {
      setFormSubmitted(false);
    }
  };

  return (
    <div className="mx-auto overflow-hidden mt-40 max-w-[2000px]">
      <div className="flex flex-col lg:flex-row items-center justify-center px-4">
        <div className="absolute inset-0 bg-cover bg-center -z-10">
          <Image
            src={BgImage2}
            alt="Background Image 2"
            className="w-60 md:w-100 xl:w-100 absolute top-20 right-0"
          />
        </div>
        <div className="mt-10 lg:mt-0 w-full lg:w-[60%] pl-4 md:pl-20 xl:pl-30 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Become a
          </h2>
          <h1 className="mt-2 text-6xl md:text-8xl 2xl:text-[140px] font-bold 2xl:leading-36">
            Bitcoin Yay <br />
            Ambassador
          </h1>
          <p className="mt-10 text-xl md:text-2xl lg:text-4xl max-w-4xl">
            Partner with a fast-growing crypto app to create real impact.
            Ambassadors get co-marketing support, milestone bonuses, and early
            access to launches—without the usual red tape.
          </p>
          {/* <p className="mt-10 text-lg text-primary">
            First, sign up on the app and then you can register below.
          </p> */}
          <div className="mt-10 flex justify-center md:justify-start">
            <CustomButton2
              image={NotesButton}
              text="Apply Now"
              link="#apply-and-register"
            />
          </div>
        </div>
        <div className="w-full lg:w-[40%] flex justify-center mt-10 lg:mt-0">
          <Image
            src={ArtImage1}
            alt="Ambassador"
            className="w-80 md:w-120 lg:w-180"
          />
        </div>
      </div>

      {/* Part 02 */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-20 mt-60">
        <Image
          src={ArtImage6}
          alt="Art Image 3"
          className="w-80 md:w-120 lg:w-120 xl:w-180"
        />
        <div className="w-full flex flex-col justify-center max-w-[800px] px-4">
          <h3 className="text-3xl md:text-5xl xl:text-7xl font-bold">
            Program Highlights
          </h3>
          <ul className="list-disc mt-16 text-xl md:text-2xl pl-4 md:pl-10 flex flex-col gap-10">
            <li>
              <span className="font-bold">Milestone Bonuses:</span> Rewards
              unlock as your community engages and grows.
            </li>
            <li>
              <span className="font-bold">Co-Marketing & Exposure:</span> Appear
              across our app, socials, and community channels.
            </li>
            <li>
              <span className="font-bold">Early Access:</span> Test features,
              get alpha, and shape product improvements.
            </li>
            <li>
              <span className="font-bold">Custom Campaigns:</span> We’ll
              co-design content and promos that fit your audience.
            </li>
            <li>
              <span className="font-bold">Dedicated Support:</span> A direct
              line to our team for quick turnarounds.
            </li>
          </ul>
        </div>
      </div>

      {/* Part 03 */}
      <div className="mt-60 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-[80px] font-bold">
          Who It’s For
        </h2>
        <p className="mt-6 md:mt-10 text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto px-4">
          Creators, YouTubers, Twitter/X voices, Telegram community leaders,
          newsletter writers, and niche community admins who care about
          transparent crypto products and real adoption.
        </p>
      </div>

      {/* Part 04 */}
      <div className="flex flex-col lg:flex-row items-center justify-start gap-20 mt-60">
        <div className="w-full flex flex-col justify-center pl-4 md:pl-20 xl:pl-30">
          <h3 className="text-3xl md:text-5xl xl:text-[80px] font-bold">
            How It Works <br />
            (simple 3 steps)
          </h3>
          <ul className="list-disc mt-16 text-xl md:text-2xl xl:text-3xl pl-4 md:pl-10 flex flex-col gap-10">
            <li>
              <span className="font-bold">Apply</span> with your channels and
              audience details.
            </li>
            <li>
              <span className="font-bold">Align</span> on a content plan and
              milestones.
            </li>
            <li>
              <span className="font-bold">Activate</span> your unique referral
              and start earning milestone bonuses + perks.
            </li>
          </ul>
        </div>
        <Image
          src={ArtImage8}
          alt="Art Image 3"
          className="w-80 md:w-120 lg:w-100 xl:w-140"
        />
      </div>

      {/* Part 05 */}

      <div className="mt-60 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-[80px] font-bold">
          Meet Our Ambassadors
        </h2>
        <p className="mt-6 text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto px-4">
          Hear from creators who’ve worked with us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-20 xl:px-30 mt-20">
          {videos.map((video) => (
            <div
              className="hover:scale-102 transition-transform duration-300"
              key={video.id}
            >
              <Link href={video.url} target="_blank">
                <Image src={VideoImage} alt={video.title} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <CustomButton2
            image={ReferralMatrixButton}
            text="See more Stories"
            link="/ecosystem/ambassador/stories"
          />
        </div>
      </div>

      {/* Part 06 */}

      <div className="flex flex-col lg:flex-row items-center justify-center gap-20 mt-60">
        <Image
          src={ArtImage10}
          alt="Art Image 3"
          className="w-80 md:w-120 lg:w-120 xl:w-180"
        />
        <div className="w-full flex flex-col justify-center max-w-[800px] px-4">
          <h3 className="text-3xl md:text-5xl xl:text-7xl 2xl:text-[80px] font-bold">
            Program Guidelines (short + creator-friendly)
          </h3>
          <ul className="list-disc mt-16 text-xl md:text-2xl pl-4 md:pl-10 flex flex-col gap-10">
            <li>Keep it real: honest reviews &gt; hype.</li>
            <li>Follow platform rules and local advertising laws.</li>
            <li>Disclose partnerships where required.</li>
            <li>
              No financial advice; share personal experience and education.
            </li>
          </ul>
        </div>
      </div>

      {/* Part 07 */}
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
            className="mt-10 md:mt-20 w-full p-8 flex flex-col justify-center max-w-3xl"
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
                placeholder="Use Bitcoin Yay email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formSubmitted && errors.email && (
                <p className="text-red-700 text-base mt-2">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="telegramHandle"
                className="block text-bg3 text-xl mb-2"
              >
                Telegram @handle
              </label>
              <input
                type="text"
                id="telegramHandle"
                className={
                  "w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none  hover:border-primary"
                }
                placeholder="Telegram"
                value={telegramHandle}
                onChange={(e) => setTelegramHandle(e.target.value)}
              />
              {errors.telegramHandle && (
                <p className="text-red-700 text-base mt-2">
                  {errors.telegramHandle}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="primaryChannels"
                className="block text-bg3 text-xl mb-2"
              >
                Primary Channel(s) (YouTube, X/Twitter, Telegram, Instagram,
                TikTok, Other)
              </label>
              <select
                id="primaryChannels"
                className="w-full text-lg p-3 pr-10 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent appearance-none cursor-pointer"
                value={primaryChannels}
                onChange={(e) => setPrimaryChannels(e.target.value)}
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'/%3e%3c/svg%3e")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  backgroundSize: "16px 16px",
                }}
              >
                <option value="" disabled className="bg-bg">
                  Channels
                </option>
                <option value="youtube" className="bg-bg">
                  YouTube
                </option>
                <option value="twitter" className="bg-bg">
                  X/Twitter
                </option>
                <option value="telegram" className="bg-bg">
                  Telegram
                </option>
                <option value="instagram" className="bg-bg">
                  Instagram
                </option>
                <option value="tiktok" className="bg-bg">
                  TikTok
                </option>
                <option value="other" className="bg-bg">
                  Other
                </option>
              </select>
              {errors.primaryChannels && (
                <p className="text-red-700 text-base mt-2">
                  {errors.primaryChannels}
                </p>
              )}
            </div>

            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label
                  htmlFor="audienceSize"
                  className="block text-bg3 text-xl mb-2"
                >
                  Audience Size
                </label>
                <select
                  id="audienceSize"
                  className="w-full text-lg p-3 pr-10 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent appearance-none cursor-pointer"
                  value={audienceSize}
                  onChange={(e) => setAudienceSize(e.target.value)}
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'/%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    backgroundSize: "16px 16px",
                  }}
                >
                  <option value="" disabled className="bg-bg">
                    Choose Audience Size
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
                  <option value="100000+" className="bg-bg">
                    100,000+
                  </option>
                </select>
                {errors.audienceSize && (
                  <p className="text-red-700 text-base mt-2">
                    {errors.audienceSize}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="regions"
                  className="block text-bg3 text-xl mb-2"
                >
                  Regions
                </label>
                <select
                  id="regions"
                  className="w-full text-lg p-3 pr-10 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary bg-transparent appearance-none cursor-pointer"
                  value={regions}
                  onChange={(e) => setRegions(e.target.value)}
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'/%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    backgroundSize: "16px 16px",
                  }}
                >
                  <option value="" disabled className="bg-bg">
                    Select Region
                  </option>
                  <option value="north-america" className="bg-bg">
                    North America
                  </option>
                  <option value="europe" className="bg-bg">
                    Europe
                  </option>
                  <option value="asia" className="bg-bg">
                    Asia
                  </option>
                  <option value="south-america" className="bg-bg">
                    South America
                  </option>
                  <option value="africa" className="bg-bg">
                    Africa
                  </option>
                  <option value="oceania" className="bg-bg">
                    Oceania
                  </option>
                  <option value="middle-east" className="bg-bg">
                    Middle East
                  </option>
                </select>
                {errors.regions && (
                  <p className="text-red-700 text-base mt-2">
                    {errors.regions}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="contentNiche"
                className="block text-bg3 text-xl mb-2"
              >
                Content Niche(s)
              </label>
              <input
                type="text"
                id="contentNiche"
                className={
                  "w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none  hover:border-primary"
                }
                placeholder="Content Niche(s)"
                value={contentNiche}
                onChange={(e) => setContentNiche(e.target.value)}
              />
              {errors.contentNiche && (
                <p className="text-red-700 text-base mt-2">
                  {errors.contentNiche}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="topPostsLinks"
                className="block text-bg3 text-xl mb-2"
              >
                Links to Top 3 Posts/Videos
              </label>
              <input
                type="text"
                id="topPostsLinks"
                className={
                  "w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none  hover:border-primary"
                }
                placeholder="Links"
                value={topPostsLinks}
                onChange={(e) => setTopPostsLinks(e.target.value)}
              />
              {errors.topPostsLinks && (
                <p className="text-red-700 text-base mt-2">
                  {errors.topPostsLinks}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="shortPitch"
                className="block text-bg3 text-xl mb-2"
              >
                Short Pitch: &quot;Why do you want to be a BTCY
                Ambassador?&quot;
              </label>
              <textarea
                id="shortPitch"
                className="w-full text-lg p-3 text-tertiary border border-bg3 rounded-md focus:border-primary focus:outline-none hover:border-primary resize-vertical min-h-[120px]"
                placeholder="Write here..."
                value={shortPitch}
                onChange={(e) => setShortPitch(e.target.value)}
              />
              {errors.shortPitch && (
                <p className="text-red-700 text-base mt-2">
                  {errors.shortPitch}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-20">
              <button
                disabled={formSubmitted}
                type="submit"
                className="cursor-pointer text-tertiary group flex flex-col items-center justify-center w-fit disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Part 09 */}
      <div className="mt-60 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-[80px] font-bold">
          Questions?
        </h2>
        <p className="mt-6 md:mt-10 text-xl md:text-2xl lg:text-3xl mx-auto px-4 font-bold">
          Email: issa@azooca.com
        </p>
        <p className="mt-6 md:mt-10 text-xl md:text-2xl lg:text-3xl mx-auto px-4 font-bold">
          Telegram: @issaboppp
        </p>
        <p className="mt-6 md:mt-10 text-xl md:text-2xl lg:text-3xl max-w-5xl mx-auto px-4">
          Replace with your real email + Telegram. Add both as buttons: “Email
          Us” (mailto) and “Message on Telegram.”
        </p>
      </div>

      {/* Part 10 */}
      <AmbassadorFaq />

      {/* Part 11 */}
      <div className="mt-60 mb-80 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-[80px] font-bold">
          Compliance Note
        </h2>

        <p className="mt-6 md:mt-10 text-xl md:text-2xl lg:text-3xl max-w-6xl mx-auto px-4">
          Nothing on this page is financial advice. All collaborations must
          follow local laws and platform policies. Terms may change as the
          program evolves.
        </p>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-20 px-4">
          <CustomButton2
            image={NotesButton}
            text="Apply Now"
            link="#apply-and-register"
          />
          <CustomButton2
            image={PointerButton}
            text="Contact us (Email)"
            link="mailto:issa@azooca.com"
          />{" "}
          <CustomButton2
            image={PointerButton}
            text="Contact us (Telegram)"
            link="https://t.me/issaboppp"
          />{" "}
          <CustomButton2
            image={ReferralMatrixButton}
            text="See more Stories"
            link="/ecosystem/ambassador/stories"
          />
        </div>
      </div>
    </div>
  );
}
