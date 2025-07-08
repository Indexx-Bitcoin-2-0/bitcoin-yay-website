import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: {
    default: "Bitcoin Yay - Mobile Mining App for Bitcoin Micro Tokens",
    template: "%s | Bitcoin Yay",
  },
  description:
    "Bitcoin Yay (BTCY) is the micro token and petty cash of Bitcoin. Download our mobile mining app to earn Bitcoin Yay tokens through AI-powered mining on your phone. Free to start, easy to use.",
  keywords:
    "Bitcoin Yay, BTCY, mobile mining, Bitcoin micro tokens, cryptocurrency app, free crypto mining, Bitcoin alternative, AI mining",
  authors: [{ name: "Bitcoin Yay Team" }],
  creator: "Bitcoin Yay",
  publisher: "Bitcoin Yay",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bitcoin Yay",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
