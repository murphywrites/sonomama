import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Erin Murphy, DPT | Perinatal Strength & Movement",
  description:
    "Evidence-based strength coaching for moms. Perinatal specialist supporting your journey with compassion and expertise.",
  keywords:
    "perinatal physical therapy, postpartum fitness, mom strength training, pelvic floor, diastasis recti",
  icons: {
    icon: "/assets/logos/murphymethodlogo.png",
    apple: "/assets/logos/murphymethodlogo.png",
  },
  openGraph: {
    title: "Erin Murphy, DPT | Perinatal Strength & Movement",
    description:
      "Evidence-based strength coaching for moms. Perinatal specialist supporting your journey with compassion and expertise.",
    images: [
      {
        url: "/assets/logos/murphymethodlogo.png",
        width: 1551,
        height: 1548,
        alt: "Murphy Method logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erin Murphy, DPT | Perinatal Strength & Movement",
    description:
      "Evidence-based strength coaching for moms. Perinatal specialist supporting your journey with compassion and expertise.",
    images: ["/assets/logos/murphymethodlogo.png"],
  },
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
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
