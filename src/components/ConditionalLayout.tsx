"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/sales" || pathname === "/quantum-sale";

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
