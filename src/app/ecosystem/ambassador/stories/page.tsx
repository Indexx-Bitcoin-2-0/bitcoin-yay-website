import Link from "next/link";
import Image from "next/image";

import AmbassadorFaq from "../AmbasadorFaq";
import CustomButton2 from "@/components/CustomButton2";

import VideoImage from "@/assets/images/eco/ambassador/video-thumbnail.webp";
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
  {
    id: 4,
    title: "Video 4",
    url: "https://www.youtube.com",
  },
  {
    id: 5,
    title: "Video 5",
    url: "https://www.youtube.com",
  },
  {
    id: 6,
    title: "Video 6",
    url: "https://www.youtube.com",
  },
];

export default function Stories() {
  return (
    <div>
      <div className="mt-60 text-center" id="stories">
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
      </div>

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
            link="/ecosystem/ambassador/#apply-and-register"
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
            link="/ecosystem/ambassador/stories/#stories"
          />
        </div>
      </div>
    </div>
  );
}
