import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LocatorInit from "@/components/LocatorInit";

export const metadata: Metadata = {
  title: "SONOMAMA | Perinatal Strength & Movement Coaching",
  description:
    "Evidence-based physical therapy and strength coaching for moms. Perinatal specialists supporting your journey with compassion and expertise.",
  keywords:
    "perinatal physical therapy, postpartum fitness, mom strength training, pelvic floor, diastasis recti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Noto+Serif+JP:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter antialiased">
        <LocatorInit />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
