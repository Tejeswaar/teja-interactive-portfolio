import Link from "next/link";
import ClientAchievements from "./ClientAchievements";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements | Tejeswaar Reddy",
  description: "Unlocked achievements and hidden secrets from the portfolio.",
};

export default function AchievementsPage() {
  return (
    <div style={{ backgroundColor: "#1e1e2e", minHeight: "100vh", color: "#cdd6f4" }}>
      {/* Decorative background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(137,180,250,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(137,180,250,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "900px",
          margin: "0 auto",
          padding: "100px 24px 64px",
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-jetbrains), JetBrains Mono, monospace",
            fontSize: "13px",
            color: "#89b4fa",
            textDecoration: "none",
            marginBottom: "40px",
            opacity: 0.8,
            transition: "opacity 0.2s",
          }}
        >
          ← cd ~
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-jetbrains), JetBrains Mono, monospace",
              fontSize: "11px",
              color: "#a6e3a1",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "12px",
              padding: "4px 10px",
              border: "1px solid rgba(166,227,161,0.3)",
              borderRadius: "4px",
              backgroundColor: "rgba(166,227,161,0.05)",
            }}
          >
            <span style={{ fontSize: "8px", lineHeight: 1 }}>●</span>
            Unlockable Content
          </div>
          <h1
            style={{
              fontFamily: "var(--font-jetbrains), JetBrains Mono, monospace",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 700,
              color: "#cba6f7",
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
            }}
          >
            Achievements
          </h1>
          <p
            style={{
              color: "#a6adc8",
              fontSize: "14px",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            A collection of hidden interactions and secrets scattered across the portfolio.
            Explore every corner — some things only reveal themselves when you&apos;re not looking.
          </p>
        </div>

        {/* Client achievements grid */}
        <ClientAchievements />
      </div>
    </div>
  );
}
