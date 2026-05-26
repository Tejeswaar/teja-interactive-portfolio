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
    default: "Tejeswaar Reddy — Game Developer & Unreal Engine Programmer",
    template: "%s — Tejeswaar Reddy",
  },
  description:
    "Game developer portfolio of Tejeswaar Reddy. Systems-focused game programmer skilled in Unreal Engine (GAS/C++), Unity, and SDL2. Shipped MixMash (10K+ downloads). Building Retina Engine & Land of Souls. Interactive portfolio with games, achievements, and leaderboard.",
  keywords: [
    // Name variations (people search by name)
    "tejeswaar",
    "tejeswar",
    "tejeswaar reddy",
    "tejeswar reddy",
    "Tejeswaar Reddy",
    "Tejeswar Reddy",
    // Role keywords
    "game developer",
    "game dev",
    "game programmer",
    "game systems programmer",
    "game designer",
    "game engine developer",
    "indie game developer",
    // Engine-specific
    "unreal engine developer",
    "unreal developer",
    "unity developer",
    "C++ game developer",
    "SDL2 developer",
    // Portfolio/career keywords
    "game developer portfolio",
    "game dev portfolio",
    "interactive portfolio",
    "developer portfolio",
    "technical artist",
    "technical artist portfolio",
    // Project keywords
    "MixMash",
    "Mix Mash game",
    "Retina Engine",
    "Land of Souls",
    "QuestBoard",
    // Technology keywords
    "GAS",
    "Gameplay Ability System",
    "Unreal Engine 5",
    "UE5",
    "C++",
    "Next.js",
  ],
  authors: [{ name: "Tejeswaar Reddy", url: "https://tejeswaar.me" }],
  creator: "Tejeswaar Reddy",
  publisher: "Tejeswaar Reddy",
  category: "technology",
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
    title: "Tejeswaar Reddy — Game Developer & Unreal Engine Programmer",
    description:
      "Game developer portfolio with interactive games, achievements, and leaderboard. Skilled in Unreal Engine, Unity, C++, and SDL2. Shipped MixMash (10K+ downloads).",
    type: "website",
    locale: "en_US",
    siteName: "Tejeswaar Reddy — Game Developer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tejeswaar Reddy — Game Developer & Unreal Engine Programmer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejeswaar Reddy — Game Developer & Unreal Engine Programmer",
    description:
      "Game developer portfolio with interactive games, achievements, and leaderboard. Skilled in Unreal Engine, Unity, C++, and SDL2.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://tejeswaar.me",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tejeswaar Reddy",
              alternateName: ["Tejeswar Reddy", "Tejeswaar", "Tejeswar"],
              url: "https://tejeswaar.me",
              image: "https://tejeswaar.me/og-image.png",
              jobTitle: "Game Developer",
              description:
                "Systems-focused game developer skilled in Unreal Engine, Unity, C++, and SDL2. Shipped MixMash (10K+ downloads).",
              knowsAbout: [
                "Game Development",
                "Unreal Engine",
                "Unity",
                "C++",
                "SDL2",
                "Game Systems Programming",
                "Technical Art",
              ],
              sameAs: [
                "https://github.com/Tejeswaar",
              ],
            }),
          }}
        />
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
