import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import EngagementTracker from "./components/EngagementTracker";
import TopNav from "./components/TopNav";
import { AuthProvider } from "./components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tejeswaar.vercel.app"),
  title: {
    default: "Tejeswaar Reddy — Game Systems Programmer & Technical Artist",
    template: "%s — Tejeswaar Reddy",
  },
  description:
    "Systems-focused game developer skilled in Unreal Engine (GAS/C++), Unity, and SDL2. Shipped MixMash (5K+ downloads). Building Retina Engine & Land of Souls.",
  keywords: [
    "game programmer",
    "game developer",
    "Unreal Engine",
    "C++",
    "technical artist",
    "game engine",
    "portfolio",
    "Tejeswaar Reddy",
    "Unity",
    "SDL2",
    "GAS",
    "Retina Engine",
    "Land of Souls",
    "MixMash",
  ],
  authors: [{ name: "Tejeswaar Reddy" }],
  creator: "Tejeswaar Reddy",
  openGraph: {
    title: "Tejeswaar Reddy — Game Systems Programmer & Technical Artist",
    description:
      "Systems-focused game developer skilled in Unreal Engine (GAS/C++), Unity, and SDL2. Shipped MixMash (5K+ downloads). Building Retina Engine & Land of Souls.",
    type: "website",
    locale: "en_US",
    url: "https://tejeswaar.vercel.app",
    siteName: "Tejeswaar Reddy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tejeswaar Reddy — Game Systems Programmer & Technical Artist",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejeswaar Reddy — Game Systems Programmer & Technical Artist",
    description:
      "Systems-focused game developer skilled in Unreal Engine (GAS/C++), Unity, and SDL2. Shipped MixMash (5K+ downloads). Building Retina Engine & Land of Souls.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-ctp-base text-ctp-text`}
      >
        <AuthProvider>
          <TopNav />

          <main>{children}</main>

          {/* Engagement tracker (popups + time tracking) */}
          <EngagementTracker />
        </AuthProvider>
      </body>
    </html>
  );
}
