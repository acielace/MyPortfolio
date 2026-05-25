import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import InteractiveBackground from "@/components/InteractiveBackground";

// 1. Load the Heading Font (Outfit)
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// 2. Load the Body Font (Inter)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ace Casera | Developer Portfolio",
  description: "Full-Stack and Creative Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // 3. Inject the font variables globally
      className={`${outfit.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-black text-white antialiased">
        <InteractiveBackground />
        {children}
      </body>
    </html>
  );
}