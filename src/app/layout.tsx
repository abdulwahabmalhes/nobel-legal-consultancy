import type { Metadata } from "next";

import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "./globals.css";
import { SiteFrame } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://nobellegal.ae"),
  title: "NOBEL Legal Consultancy | Professional Legal Consultants in UAE",
  description:
    "Professional legal consultancy services in the UAE. Strategic legal guidance for businesses and individuals. Trusted expertise from NOBEL Legal Consultancy.",
  keywords: [
    "Legal Consultancy UAE",
    "Corporate Legal Consultant UAE",
    "Business Legal Services UAE",
    "Commercial Law UAE",
    "Legal Advisor UAE",
    "Sharjah Legal Consultancy",
  ],
  openGraph: {
    title: "NOBEL Legal Consultancy",
    description: "Excellence Defined by Law",
    type: "website",
    locale: "en_AE",
    images: ["/images/boardroom.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><SiteFrame>{children}</SiteFrame></body>
    </html>
  );
}
