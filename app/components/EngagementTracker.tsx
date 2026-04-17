"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useIdentity } from "./AuthProvider";

interface PopupConfig {
  id: string;
  triggerSeconds: number;
  title: string;
  message: string;
  cta: string;
  ctaHref: string;
  emoji: string;
}

const POPUPS: PopupConfig[] = [
  {
    id: "popup-connect",
    triggerSeconds: 35,
    title: "Seems like you're really into this",
    message: "Want to connect and build something together?",
    cta: "Let's Connect",
    ctaHref: "mailto:tejeswaarreddy@gmail.com",
    emoji: "👋",
  },
  {
    id: "popup-explore",
    triggerSeconds: 55,
    title: "There's a lot hidden here...",
    message: "See what you can explore in this portfolio.",
    cta: "Let's See",
    ctaHref: "#explore",
    emoji: "🔍",
  },
  {
    id: "popup-terminal",
    triggerSeconds: 120,
    title: "Hey, looks like you're still here!",
    message: "Want to play a classic game? Try Hamurabi in the terminal!",
    cta: "Open Terminal",
    ctaHref: "/terminal",
    emoji: "👀",
  },
  {
    id: "popup-achievements",
    triggerSeconds: 210,
    title: "Wow, you're really exploring!",
    message: "Did you know you earn points for discovering hidden interactions?",
    cta: "Check Achievements",
    ctaHref: "/achievements",
    emoji: "🏆",
  },
  {
    id: "popup-connect-reminder",
    triggerSeconds: 300,
    title: "Taking your time, huh?",
    message: "If you like what you see, hit me up! I'm always open to new ideas.",
    cta: "Let's Connect",
    ctaHref: "mailto:tejeswaarreddy@gmail.com",
    emoji: "🤝",
  },
  {
    id: "popup-clicks",
    triggerSeconds: 390,
    title: "Farming clicks?",
    message: "Just a reminder: clicks and active time boost your leaderboard rank!",
    cta: "View Leaderboard",
    ctaHref: "/leaderboard",
    emoji: "🖱️",
  },
  {
    id: "popup-github",
    triggerSeconds: 480,
    title: "A true deep dive!",
    message: "You've been here a while. Consider checking out my other projects on GitHub.",
    cta: "View GitHub",
    ctaHref: "https://github.com/tejeswaar",
    emoji: "💻",
  },
  {
    id: "popup-patience",
    triggerSeconds: 570,
    title: "Okay, you win.",
    message: "You officially have the high score for patience. Thanks for hanging out!",
    cta: "Back to top",
    ctaHref: "#",
    emoji: "👑",
  },
];

export default function EngagementTracker() {
  const [activeSeconds, setActiveSeconds] = useState(0);
  const [activePopup, setActivePopup] = useState<PopupConfig | null>(null);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const shownPopups = useRef(new Set<string>());
  const isActive = useRef(true);
  const lastUpdate = useRef(Date.now());
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const pendingSeconds = useRef(0);
  const pathname = usePathname();

  const { getIdentityPayload, loading } = useIdentity();

  // Load shown popups from session
  useEffect(() => {
    const shown = sessionStorage.getItem("shown-popups");
    if (shown) {
      JSON.parse(shown).forEach((id: string) => shownPopups.current.add(id));
    }
  }, []);

  // Reset idle timer on activity
  const resetIdle = useCallback(() => {
    if (!isActive.current) {
      isActive.current = true;
      lastUpdate.current = Date.now();
    }
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      isActive.current = false;
    }, 60000); // 60 seconds idle = pause
  }, []);

  // Track visibility
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        isActive.current = false;
      } else {
        isActive.current = true;
        lastUpdate.current = Date.now();
        resetIdle();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("keydown", resetIdle);
    window.addEventListener("scroll", resetIdle);
    window.addEventListener("click", resetIdle);

    resetIdle();

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("keydown", resetIdle);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("click", resetIdle);
    };
  }, [resetIdle]);

  // Active time ticker
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive.current) {
        setActiveSeconds((s) => s + 1);
        pendingSeconds.current += 1;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Send batched updates every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      const secondsToSend = pendingSeconds.current;
      if (secondsToSend > 0 && !loading) {
        pendingSeconds.current = 0;
        const identity = getIdentityPayload();
        fetch("/api/leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...identity,
            active_seconds: secondsToSend,
            clicks: 0,
          }),
        }).catch(() => {}); // silent fail
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [getIdentityPayload, loading]);

  // Check popup triggers
  useEffect(() => {
    for (const popup of POPUPS) {
      if (
        activeSeconds >= popup.triggerSeconds &&
        !shownPopups.current.has(popup.id) &&
        !activePopup &&
        pathname !== "/terminal"
      ) {
        setActivePopup(popup);
        shownPopups.current.add(popup.id);
        const shown = Array.from(shownPopups.current);
        sessionStorage.setItem("shown-popups", JSON.stringify(shown));
        break;
      }
    }
  }, [activeSeconds, activePopup]);

  const dismissPopup = () => setActivePopup(null);

  // Auto-dismiss popup after 15 seconds
  useEffect(() => {
    if (activePopup) {
      const timer = setTimeout(() => {
        setActivePopup(null);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [activePopup]);

  return (
    <AnimatePresence>
      {activePopup && (
        <motion.div
          key={activePopup.id}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm"
        >
          <div className="rounded-xl border border-ctp-surface1/60 bg-ctp-mantle/95 backdrop-blur-xl p-5 shadow-2xl">
            {/* Close button */}
            <button
              onClick={dismissPopup}
              className="absolute top-3 right-3 text-ctp-overlay0 hover:text-ctp-text transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <p className="text-2xl mb-2">{activePopup.emoji}</p>
            <h3 className="font-mono text-sm font-bold text-ctp-text mb-1">
              {activePopup.title}
            </h3>
            <p className="text-xs text-ctp-subtext0 mb-4">
              {activePopup.message}
            </p>
            <div className="flex gap-2">
              <a
                href={activePopup.ctaHref}
                onClick={(e) => {
                  if (activePopup.ctaHref === "#explore") {
                    e.preventDefault();
                    setShowExploreModal(true);
                    dismissPopup();
                  }
                }}
                className="px-4 py-2 rounded-lg bg-ctp-blue/20 border border-ctp-blue/40 text-ctp-blue font-mono text-xs hover:bg-ctp-blue/30 transition-all"
              >
                {activePopup.cta}
              </a>
              <button
                onClick={dismissPopup}
                className="px-4 py-2 rounded-lg border border-ctp-surface1/50 text-ctp-overlay1 font-mono text-xs hover:text-ctp-text transition-all"
              >
                Maybe later
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Explore Meta Layer Modal */}
      {showExploreModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ctp-crust/80 backdrop-blur-md p-4"
          onClick={() => setShowExploreModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-ctp-base border border-ctp-surface1 rounded-2xl p-6 md:p-8 shadow-2xl relative"
          >
            <button
              onClick={() => setShowExploreModal(false)}
              className="absolute top-4 right-4 text-ctp-overlay0 hover:text-ctp-text transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2 className="font-mono text-xl text-ctp-blue font-bold mb-4 flex items-center gap-2">
              <span>🔍</span> Beyond A Digital Resume
            </h2>
            <p className="text-sm text-ctp-subtext0 mb-6 font-mono leading-relaxed">
              Most portfolios are digital resumes — you scroll, you read, you leave. This space was built with a hidden meta layer:
            </p>

            <ul className="space-y-4 font-mono text-xs md:text-sm text-ctp-text">
              <li className="flex gap-3">
                <span className="text-ctp-yellow mt-0.5">🏆</span>
                <div>
                  <strong className="text-ctp-yellow block mb-0.5">Global Leaderboard</strong>
                  <span className="text-ctp-subtext0">Visitors compete with each other just by interacting with the site. That's not a portfolio feature, that's a game mechanic.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-ctp-green mt-0.5">🎯</span>
                <div>
                  <strong className="text-ctp-green block mb-0.5">Achievements System</strong>
                  <span className="text-ctp-subtext0">You can unlock hidden things across the portfolio. Almost unheard of for a developer site.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-ctp-red mt-0.5">⌨️</span>
                <div>
                  <strong className="text-ctp-red block mb-0.5">A Playable Terminal</strong>
                  <span className="text-ctp-subtext0">There are fully playable games like Hamurabi and Snake hidden right inside the contact page.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-ctp-peach mt-0.5">🟢</span>
                <div>
                  <strong className="text-ctp-peach block mb-0.5">The Green Dot</strong>
                  <span className="text-ctp-subtext0">A mysterious entity living deep inside the terminal. It's afraid of you—silently waiting in the dark for a friend who truly understands it.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-ctp-mauve mt-0.5">📡</span>
                <div>
                  <strong className="text-ctp-mauve block mb-0.5">Live GitHub Commits</strong>
                  <span className="text-ctp-subtext0">The portfolio breathes. It updates in real time, proving the builder is actively shipping.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-ctp-blue mt-0.5">🖱️</span>
                <div>
                  <strong className="text-ctp-blue block mb-0.5">Persistent Click Control</strong>
                  <span className="text-ctp-subtext0">Even a silly clicker becomes a hook. Your clicks are synced to the database forever.</span>
                </div>
              </li>
            </ul>

            <div className="mt-8 text-center pt-6 border-t border-ctp-surface0">
              <button
                onClick={() => setShowExploreModal(false)}
                className="px-6 py-2 rounded-lg bg-ctp-blue text-ctp-base font-bold font-mono text-sm hover:opacity-90 transition-opacity"
              >
                Continue Exploring
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
