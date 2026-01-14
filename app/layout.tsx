import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import FloatingPlayer from "./components/FloatingPlayer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Otto Music | The Glass Box Economy",
  description: "The Final Operating System for the Music Industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased bg-black text-white selection:bg-white selection:text-black`}
      >
        <div className="noise-overlay" />
        <SmoothScroll>
          {children}
          <FloatingPlayer />
        </SmoothScroll>
      </body>
    </html>
  );
}
