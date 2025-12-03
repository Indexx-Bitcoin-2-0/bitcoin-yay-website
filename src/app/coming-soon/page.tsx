import Image from "next/image";

import ArtImage1 from "@/assets/images/coming-soon/art-1.webp";

export const metadata = {
  title: "Coming Soon - Bitcoin-Yay Features & Updates",
  description:
    "Exciting new Bitcoin-Yay features and updates are coming soon. Stay tuned for the latest developments in mobile mining, BTCY tokens, and cryptocurrency innovations.",
  openGraph: {
    title: "Coming Soon - Bitcoin-Yay Features & Updates",
    description:
      "Exciting new Bitcoin-Yay features and updates are coming soon. Stay tuned for the latest developments in mobile mining, BTCY tokens, and cryptocurrency innovations.",
  },
};

export default function ComingSoon() {
  return (
    <div className="container mx-auto my-40">
      <h1 className="text-5xl md:text-6xl font-bold text-center mt-20">
        Coming Soon
      </h1>
      <Image
        src={ArtImage1}
        alt="Coming Soon"
        className="mt-20 w-80 md:w-120 xl:w-200 mx-auto"
      />
    </div>
  );
}
