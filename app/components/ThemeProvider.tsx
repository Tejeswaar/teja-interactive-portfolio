"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

/* ── Theme Definitions ─────────────────────── */

export type ThemeId = "catppuccin" | "vim" | "vscode" | "light";

interface ThemeColors {
  base: string;
  mantle: string;
  crust: string;
  surface0: string;
  surface1: string;
  surface2: string;
  overlay0: string;
  overlay1: string;
  overlay2: string;
  subtext0: string;
  subtext1: string;
  text: string;
  blue: string;
  lavender: string;
  sapphire: string;
  sky: string;
  teal: string;
  green: string;
  yellow: string;
  peach: string;
  maroon: string;
  red: string;
  mauve: string;
  pink: string;
  flamingo: string;
  rosewater: string;
}

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  label: string;
  preview: { bg: string; accent: string; text: string; surface: string };
  colors: ThemeColors;
}

export const THEMES: ThemeMeta[] = [
  {
    id: "catppuccin",
    name: "Catppuccin Mocha",
    label: "Default",
    preview: { bg: "#1e1e2e", accent: "#89b4fa", text: "#cdd6f4", surface: "#313244" },
    colors: {
      base: "#1e1e2e",
      mantle: "#181825",
      crust: "#11111b",
      surface0: "#313244",
      surface1: "#45475a",
      surface2: "#585b70",
      overlay0: "#6c7086",
      overlay1: "#7f849c",
      overlay2: "#9399b2",
      subtext0: "#a6adc8",
      subtext1: "#bac2de",
      text: "#cdd6f4",
      blue: "#89b4fa",
      lavender: "#b4befe",
      sapphire: "#74c7ec",
      sky: "#89dceb",
      teal: "#94e2d5",
      green: "#a6e3a1",
      yellow: "#f9e2af",
      peach: "#fab387",
      maroon: "#eba0ac",
      red: "#f38ba8",
      mauve: "#cba6f7",
      pink: "#f5c2e7",
      flamingo: "#f2cdcd",
      rosewater: "#f5e0dc",
    },
  },
  {
    id: "vim",
    name: "Vim",
    label: "Vim",
    preview: { bg: "#300a24", accent: "#5fd7ff", text: "#d3d7cf", surface: "#3c1f32" },
    colors: {
      base: "#300a24",
      mantle: "#250819",
      crust: "#1a0510",
      surface0: "#3c1f32",
      surface1: "#523045",
      surface2: "#674158",
      overlay0: "#7d5a6e",
      overlay1: "#937384",
      overlay2: "#a98c9a",
      subtext0: "#bfa5b0",
      subtext1: "#c9b4be",
      text: "#d3d7cf",
      blue: "#5fd7ff",
      lavender: "#ad7fa8",
      sapphire: "#34e2e2",
      sky: "#5fd7ff",
      teal: "#34e2e2",
      green: "#8ae234",
      yellow: "#fce94f",
      peach: "#fcaf3e",
      maroon: "#ef2929",
      red: "#cc0000",
      mauve: "#ad7fa8",
      pink: "#d7a0d7",
      flamingo: "#d7afaf",
      rosewater: "#eeeeec",
    },
  },
  {
    id: "vscode",
    name: "VS Code Dark",
    label: "VS Code",
    preview: { bg: "#1c1c1c", accent: "#87afd7", text: "#d0d0d0", surface: "#303030" },
    colors: {
      base: "#1c1c1c",
      mantle: "#121212",
      crust: "#080808",
      surface0: "#303030",
      surface1: "#3a3a3a",
      surface2: "#444444",
      overlay0: "#585858",
      overlay1: "#6c6c6c",
      overlay2: "#808080",
      subtext0: "#a8a8a8",
      subtext1: "#bcbcbc",
      text: "#d0d0d0",
      blue: "#87afd7",
      lavender: "#afafd7",
      sapphire: "#5fafaf",
      sky: "#87d7d7",
      teal: "#5fd7af",
      green: "#87d787",
      yellow: "#d7d75f",
      peach: "#d7af5f",
      maroon: "#d78787",
      red: "#d75f5f",
      mauve: "#af87d7",
      pink: "#d7afd7",
      flamingo: "#d7afaf",
      rosewater: "#d7d7af",
    },
  },
  {
    id: "light",
    name: "Light",
    label: "Light",
    preview: { bg: "#eff1f5", accent: "#1e66f5", text: "#4c4f69", surface: "#dce0e8" },
    colors: {
      base: "#eff1f5",
      mantle: "#e6e9ef",
      crust: "#dce0e8",
      surface0: "#ccd0da",
      surface1: "#bcc0cc",
      surface2: "#acb0be",
      overlay0: "#9ca0b0",
      overlay1: "#8c8fa1",
      overlay2: "#7c7f93",
      subtext0: "#6c6f85",
      subtext1: "#5c5f77",
      text: "#4c4f69",
      blue: "#1e66f5",
      lavender: "#7287fd",
      sapphire: "#209fb5",
      sky: "#04a5e5",
      teal: "#179299",
      green: "#40a02b",
      yellow: "#df8e1d",
      peach: "#fe640b",
      maroon: "#e64553",
      red: "#d20f39",
      mauve: "#8839ef",
      pink: "#ea76cb",
      flamingo: "#dd7878",
      rosewater: "#dc8a78",
    },
  },
];

/* ── Context ───────────────────────────────── */

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  themes: ThemeMeta[];
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "catppuccin",
  setTheme: () => {},
  themes: THEMES,
});

export const useTheme = () => useContext(ThemeContext);

/* ── Hex to RGB triplet ────────────────────── */

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/* ── Apply CSS variables ───────────────────── */

function applyTheme(id: ThemeId) {
  const meta = THEMES.find((t) => t.id === id) || THEMES[0];
  const root = document.documentElement;

  for (const [key, value] of Object.entries(meta.colors)) {
    // Set as RGB triplet for Tailwind opacity modifier support
    root.style.setProperty(`--ctp-${key}`, hexToRgb(value));
  }

  // Also update scrollbar & body for the non-Tailwind hardcoded CSS
  root.style.setProperty("--scrollbar-track", meta.colors.base);
  root.style.setProperty("--scrollbar-thumb", meta.colors.surface1);
  root.style.setProperty("--scrollbar-thumb-hover", meta.colors.surface2);
}

/* ── Provider ──────────────────────────────── */

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("catppuccin");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as ThemeId | null;
    if (saved && THEMES.some((t) => t.id === saved)) {
      setThemeState(saved);
      applyTheme(saved);
    }
    // Default theme is already set in :root CSS, no need to re-apply
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    applyTheme(id);
    localStorage.setItem("portfolio-theme", id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}
