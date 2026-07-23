import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

/* eslint-disable @next/next/no-page-custom-font */

// Self-hosted + preloaded via next/font. This is the ONLY Cormorant source —
// the editorial/emerald templates reference it through `--font-serif` too, so
// it is no longer also pulled from the Google Fonts <link> below (which would
// download the same typeface a second time). Italic is synthesized by the
// browser for the rare `font-editorial-serif italic` usages.
export const metadata: Metadata = {
  title: "Srolanh Wedding Invitation",
  description: "You are invited — view the invitation and RSVP online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Moul&family=Kantumruy+Pro:wght@300;400;500;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Cinzel:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Pinyon+Script&family=Playball&family=Montserrat:wght@300;400;600&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf7f2]">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
