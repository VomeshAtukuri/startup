import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react"
import { Dialogtologin } from "@/components/Dialogtologin";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pitch Startup",
  description: "Pitch, Vote & Grow Startup",
  keywords: ["startup", "pitch", "vote", "entrepreneurship", "investors"],
  authors: [{ name: "Pitch Startup Team", url: "https://pitchstartupav.vercel.app" }],
  metadataBase: new URL("https://pitchstartupav.vercel.app"),

  openGraph: {
    title: "Pitch Startup",
    description: "Pitch, Vote & Grow Startup",
    url: "https://pitchstartupav.vercel.app",
    siteName: "Pitch Startup",
    images: [
      {
        url: "/og-image.jpg", // Place this image in your /public folder
        width: 1200,
        height: 630,
        alt: "Pitch Startup Open Graph Preview",
      },
    ],
    locale: "en_US",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <Dialogtologin />
            {children}
            <Analytics />
          </ThemeProvider>
        </SessionProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
