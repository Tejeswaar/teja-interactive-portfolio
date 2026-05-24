"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavClient from "./MobileNav";
import { useIdentity } from "./AuthProvider";

const navLinks = [
  { href: "/#about", label: "about" },
  { href: "/#projects", label: "projects" },
  { href: "/#experience", label: "experience" },
  { href: "/#dashboard", label: "dashboard" },
  { href: "/leaderboard", label: "leaderboard" },
  { href: "/blog", label: "blog" },
  { href: "/terminal", label: ">_" },
] as const;

export default function TopNav() {
  const pathname = usePathname();
  const { isLoggedIn, user, login, logout, loginWithAnotherAccount } = useIdentity();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Keep terminal immersive: no global nav overlay.
  if (pathname?.startsWith("/terminal")) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/#hero" className="font-mono text-sm font-bold text-ctp-blue hover:text-ctp-lavender transition-colors">
          ~/tejeswaar
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-ctp-overlay1 hover:text-ctp-text transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 font-mono text-xs text-ctp-overlay1 hover:text-ctp-text transition-colors p-1"
              >
                <img
                  src={user.user_metadata?.avatar_url || ""}
                  alt="avatar"
                  className="w-5 h-5 rounded-full"
                />
                <span className="hidden md:inline">{user.user_metadata?.user_name}</span>
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-ctp-crust border border-ctp-surface1 rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      loginWithAnotherAccount();
                    }}
                    className="w-full text-left px-4 py-2 font-mono text-xs text-ctp-text hover:bg-ctp-surface0 transition-colors"
                  >
                    Use another account
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 font-mono text-xs text-ctp-red hover:bg-ctp-surface0 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={login}
              className="font-mono text-xs text-ctp-mauve hover:text-ctp-pink transition-colors"
            >
              GitHub -&gt;
            </button>
          )}
        </div>
        <MobileNavClient />
      </div>
    </nav>
  );
}
