"use client";

import { useState, useEffect } from "react";
import { useIdentity } from "../components/AuthProvider";

const ALL_ACHIEVEMENTS = [
  {
    id: "greenDotFound",
    name: "Green Dot",
    desc: "You found the evasive green dot lurking in the terminal.",
    score: 200,
    icon: "🟢",
    color: "#a6e3a1",
  },
  {
    id: "greenDotFriends",
    name: "Me & Green Dot Friends",
    desc: "You showed compassion to the green dot. It will never run away from you again.",
    score: 1000,
    icon: "💚",
    color: "#94e2d5",
  },
  {
    id: "greenDotPissedOff",
    name: "Pissing off the Green Dot",
    desc: "You tormented the green dot until it vanished in vengeance.",
    score: 1000,
    icon: "👻",
    color: "#f38ba8",
  },
];

export default function ClientAchievements() {
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});
  const { isLoggedIn, login, visitor_id, user, loading: authLoading } = useIdentity();

  useEffect(() => {
    const list: Record<string, boolean> = {};
    ALL_ACHIEVEMENTS.forEach((a) => {
      if (localStorage.getItem(a.id)) list[a.id] = true;
    });
    setUnlocked(list);

    const handleUnlock = (e: CustomEvent) => {
      if (e.detail?.id) setUnlocked((prev) => ({ ...prev, [e.detail.id]: true }));
    };
    window.addEventListener("achievement-unlocked", handleUnlock as EventListener);
    return () => window.removeEventListener("achievement-unlocked", handleUnlock as EventListener);
  }, []);

  useEffect(() => {
    if (authLoading) return;
    const params = new URLSearchParams();
    if (user) params.set("user_id", user.id);
    else if (visitor_id) params.set("visitor_id", visitor_id);
    else return;

    fetch(`/api/user-stats?${params}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.stats?.achievements) {
          const parsed: Record<string, boolean> = {};
          d.stats.achievements.forEach((id: string) => {
            parsed[id] = true;
            localStorage.setItem(id, "true");
          });
          setUnlocked((prev) => ({ ...prev, ...parsed }));
        }
      })
      .catch(() => {});
  }, [user, visitor_id, authLoading]);

  const unlockedCount = Object.keys(unlocked).length;
  const total = ALL_ACHIEVEMENTS.length;
  const progressPct = (unlockedCount / total) * 100;

  return (
    <div>
      {/* Login banner */}
      {!isLoggedIn && (
        <div
          style={{
            marginBottom: "32px",
            padding: "20px 24px",
            borderRadius: "12px",
            border: "1px solid rgba(249,226,175,0.3)",
            backgroundColor: "rgba(249,226,175,0.06)",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "12px",
                fontWeight: 700,
                color: "#f9e2af",
                marginBottom: "4px",
                letterSpacing: "0.05em",
              }}
            >
              ⚠ GitHub Login Required
            </div>
            <div style={{ fontSize: "13px", color: "#a6adc8", lineHeight: 1.5 }}>
              Log in to unlock the Green Dot mission and permanently store your achievements in the cloud.
            </div>
          </div>
          <button
            onClick={login}
            style={{
              flexShrink: 0,
              padding: "8px 20px",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "12px",
              fontWeight: 700,
              color: "#1e1e2e",
              backgroundColor: "#f9e2af",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
          >
            Login with GitHub →
          </button>
        </div>
      )}

      {/* Progress section */}
      <div style={{ marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "11px",
              color: "#6c7086",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Quest Progress
          </span>
          <span
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "20px",
              fontWeight: 700,
              color: "#fab387",
            }}
          >
            {unlockedCount} / {total}
          </span>
        </div>
        {/* Progress bar */}
        <div
          style={{
            height: "4px",
            borderRadius: "2px",
            backgroundColor: "#313244",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPct}%`,
              borderRadius: "2px",
              background: "linear-gradient(90deg, #cba6f7, #fab387)",
              transition: "width 1s ease-out",
            }}
          />
        </div>
      </div>

      {/* Achievement cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {ALL_ACHIEVEMENTS.map((a, i) => {
          const isUnlocked = !!unlocked[a.id];
          return (
            <div
              key={a.id}
              style={{
                padding: "20px",
                borderRadius: "12px",
                border: `1px solid ${isUnlocked ? `${a.color}30` : "rgba(69,71,90,0.4)"}`,
                backgroundColor: isUnlocked ? `${a.color}08` : "rgba(17,17,27,0.6)",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
                opacity: isUnlocked ? 1 : 0.45,
                filter: isUnlocked ? "none" : "grayscale(0.6)",
                transition: "all 0.3s ease",
                animationDelay: `${i * 80}ms`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  flexShrink: 0,
                  borderRadius: "10px",
                  backgroundColor: "#11111b",
                  border: `1px solid ${isUnlocked ? `${a.color}40` : "#313244"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  lineHeight: 1,
                }}
              >
                {isUnlocked ? a.icon : "🔒"}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: isUnlocked ? "#cdd6f4" : "#585b70",
                    marginBottom: "6px",
                  }}
                >
                  {isUnlocked ? a.name : "Secret Achievement"}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#7f849c",
                    lineHeight: 1.6,
                    marginBottom: "10px",
                  }}
                >
                  {isUnlocked ? a.desc : "This achievement remains hidden until you unlock it."}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: isUnlocked ? a.color : "#45475a",
                    letterSpacing: "0.05em",
                  }}
                >
                  +{a.score} PTS
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Easter egg message when both endings unlocked */}
      {unlocked.greenDotFriends && unlocked.greenDotPissedOff && (
        <p
          style={{
            marginTop: "40px",
            textAlign: "center",
            fontSize: "12px",
            color: "#45475a",
            fontFamily: "var(--font-jetbrains), monospace",
            fontStyle: "italic",
          }}
        >
          You&apos;ve somehow traveled branching timelines to obtain all endings.
        </p>
      )}
    </div>
  );
}
