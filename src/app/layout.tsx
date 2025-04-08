import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  icons: {
    icon: [{ url: "/apple-icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  title: "Bitcoin Yay",
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
