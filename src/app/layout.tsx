import type { Metadata } from "next";
import { Allerta_Stencil, Space_Mono } from "next/font/google";
import "./globals.css";

const stencil = Allerta_Stencil({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-stencil",
  display: "swap",
});

const mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Martín — Developer",
  description: "Full-Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${stencil.variable} ${mono.variable}`}>
        {/* SVG roughen filter — makes edges wobbly/organic, referenced via filter: url(#roughen) */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <filter id="roughen">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
          </filter>
        </svg>
        {children}
      </body>
    </html>
  );
}
