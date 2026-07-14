"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IconicHeader from "@/components/IconicHeader";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/sales" || pathname === "/quantum-sale" || pathname === "/power-mining-funnel";

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      {!hideHeaderFooter && <IconicHeader />}
      {/* pt matches the IconicHeader height (responsive) so content clears it. */}
      <main className={!hideHeaderFooter ? "pt-[84px] md:pt-[104px]" : ""}>
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

