"use client";

import { motion } from "framer-motion";
import { useTheme, THEMES, type ThemeId } from "./ThemeProvider";
import { useIdentity } from "./AuthProvider";

const THEME_DESCRIPTIONS: Record<ThemeId, string> = {
  catppuccin: "Inspired by the warm, pastel-heavy Catppuccin Mocha palette. Soft on the eyes, highly readable, and aesthetically pleasing.",
  vim: "A high-contrast, classic Vim color scheme. Inspired by retro terminals and hacker aesthetics.",
  vscode: "The ubiquitous VS Code Dark+ theme. Familiar, professional, and balanced with cool blue accents.",
  light: "A clean, modern light mode with crisp contrast. Perfect for reading in bright environments.",
};

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const { getIdentityPayload } = useIdentity();

  const handleThemeChange = (id: ThemeId) => {
    setTheme(id);
    const payload = getIdentityPayload();
    if (payload.user_id || payload.visitor_id) {
      fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          theme: id,
        }),
      }).catch(() => {});
    }
  };

  return (
    <div className="sm:col-span-2 rounded-xl border border-ctp-surface1/40 bg-ctp-surface0/20 p-5 flex flex-col h-full">
      <h3 className="font-mono text-sm text-ctp-overlay1 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span>🎨</span>
        <span>Theme</span>
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-5 flex-1">
        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          {THEMES.map((t) => {
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className="relative group rounded-lg p-2.5 text-left transition-all duration-200 border flex flex-col justify-between"
                style={{
                  borderColor: isActive ? t.preview.accent : "transparent",
                  background: isActive
                    ? `${t.preview.accent}15`
                    : "transparent",
                }}
              >
                {/* Color preview strip */}
                <div className="flex gap-1 mb-2 w-full">
                  <div
                    className="w-full h-5 rounded-md border border-white/10 flex overflow-hidden"
                  >
                    <div
                      style={{ backgroundColor: t.preview.bg }}
                      className="flex-1"
                    />
                    <div
                      style={{ backgroundColor: t.preview.surface }}
                      className="flex-1"
                    />
                    <div
                      style={{ backgroundColor: t.preview.accent }}
                      className="flex-1"
                    />
                    <div
                      style={{ backgroundColor: t.preview.text }}
                      className="flex-[0.5]"
                    />
                  </div>
                </div>

                {/* Label */}
                <p
                  className="font-mono text-[11px] font-medium transition-colors truncate"
                  style={{ color: isActive ? t.preview.accent : undefined }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="theme-check"
                      className="inline-block mr-1"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      ✓
                    </motion.span>
                  )}
                  {t.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Description Box */}
        <div className="flex-1 rounded-lg border border-ctp-surface1 bg-ctp-crust/50 p-4 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <svg className="w-24 h-24 text-ctp-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h4 className="font-mono text-sm text-ctp-text font-bold mb-1">
            {THEMES.find(t => t.id === theme)?.name}
          </h4>
          <p className="text-xs text-ctp-subtext0 leading-relaxed font-mono relative z-10">
            {THEME_DESCRIPTIONS[theme]}
          </p>
        </div>
      </div>
    </div>
  );
}
