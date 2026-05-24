import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import EngagementTracker from "./components/EngagementTracker";
import TopNav from "./components/TopNav";
import { AuthProvider } from "./components/AuthProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import KonamiProvider from "./components/KonamiProvider";

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
  metadataBase: new URL("https://tejeswaar.me"),
  title: {
    default: "Tejeswaar Reddy — Game Systems Programmer & Technical Artist",
    template: "%s — Tejeswaar Reddy",
  },
  description:
    "Systems-focused game developer skilled in Unreal Engine (GAS/C++), Unity, and SDL2. Shipped MixMash (10K+ downloads). Building Retina Engine & Land of Souls.",
  keywords: [
    "game developer",
    "game dev portfolio",
    "game programmer",
    "C++ game developer",
    "Unreal Engine developer",
    "Unity developer",
    "technical artist",
    "game systems programmer",
    "game engine developer",
    "portfolio",
    "Tejeswaar Reddy",
    "tejeswaar",
    "tejeswaar reddy",
    "SDL2",
    "GAS",
    "Retina Engine",
    "Land of Souls",
    "MixMash",
  ],
  authors: [{ name: "Tejeswaar Reddy", url: "https://tejeswaar.me" }],
  creator: "Tejeswaar Reddy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Tejeswaar Reddy — Game Systems Programmer & Technical Artist",
    description:
      "Systems-focused game developer skilled in Unreal Engine (GAS/C++), Unity, and SDL2. Shipped MixMash (10K+ downloads). Building Retina Engine & Land of Souls.",
    type: "website",
    locale: "en_US",
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
      "Systems-focused game developer skilled in Unreal Engine (GAS/C++), Unity, and SDL2. Shipped MixMash (10K+ downloads). Building Retina Engine & Land of Souls.",
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
          <ThemeProvider>
            <KonamiProvider>
              <TopNav />

              <main>{children}</main>

              {/* Engagement tracker (popups + time tracking) */}
              <EngagementTracker />
            </KonamiProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
