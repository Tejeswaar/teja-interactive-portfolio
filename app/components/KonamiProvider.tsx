"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useIdentity } from "./AuthProvider";

export default function KonamiProvider({ children }: { children: React.ReactNode }) {
  const { getIdentityPayload } = useIdentity();
  // Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  
  const buffer = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if they're typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      buffer.current.push(e.key === "b" || e.key === "B" ? "b" : e.key === "a" || e.key === "A" ? "a" : e.key);
      
      // Keep buffer size manageable
      if (buffer.current.length > konamiCode.length) {
        buffer.current.shift();
      }

      // Check if sequence matches
      if (buffer.current.join(",") === konamiCode.join(",")) {
        buffer.current = []; // Reset buffer

        // 1. Massive confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#89b4fa", "#f5c2e7", "#a6e3a1"]
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#89b4fa", "#f5c2e7", "#a6e3a1"]
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();

        // 2. Unlock achievement if not already unlocked
        if (!localStorage.getItem("konamiUnlocked")) {
          localStorage.setItem("konamiUnlocked", "true");
          window.dispatchEvent(
            new CustomEvent("achievement-unlocked", { detail: { id: "konamiCode" } })
          );

          // Give a massive score boost
          const identity = getIdentityPayload();
          if (identity.visitor_id || identity.user_id) {
            fetch("/api/leaderboard", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...identity,
                achievement_score: 1000,
                clicks: 0,
                active_seconds: 0,
                achievement: "konamiCode",
              }),
            }).catch(() => {});
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [getIdentityPayload]);

  return <>{children}</>;
}
