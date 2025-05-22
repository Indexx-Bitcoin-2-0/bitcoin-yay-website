import Image from "next/image";
import Link from "next/link";

import ArtImage1 from "@/assets/images/coming-soon/art-1.webp";

export default function ComingSoon() {
  return (
    <div className="container mx-auto mb-40">
      <h2 className="text-5xl md:text-6xl font-bold text-center mt-20">Coming Soon</h2>
      <Image src={ArtImage1} alt="Coming Soon" className="mt-20 w-80 md:w-120 xl:w-200 mx-auto" />
    </div>
  );
}
