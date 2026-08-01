import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import favicon16 from "../opendata-fyi-original-dots-logo-pack/favicon-16.png";
import favicon32 from "../opendata-fyi-original-dots-logo-pack/favicon-32.png";
import appleTouchIcon from "../opendata-fyi-original-dots-logo-pack/apple-touch-icon.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.opendata.fyi"),
  title: "opendata.fyi — Explore open data",
  description: "Explore open data.",
  openGraph: {
    title: "opendata.fyi — Explore open data",
    description: "Explore open data.",
    type: "website",
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: [
      { url: favicon16.src, sizes: "16x16", type: "image/png" },
      { url: favicon32.src, sizes: "32x32", type: "image/png" },
    ],
    shortcut: favicon32.src,
    apple: [
      { url: appleTouchIcon.src, sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
