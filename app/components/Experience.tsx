"use client";

import { useEffect, useRef, useState } from "react";
import { experience, education } from "../lib/content";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"work" | "education">("work");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const currentData = activeTab === "work" ? experience : education;

  return (
    <section id="experience" ref={sectionRef} className="reveal py-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-10 gap-6">
        <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tighter text-ctp-text m-0 uppercase w-full text-left">
          BACKGROUND<span className="text-ctp-mauve">.</span>
        </h2>
        
        {/* Toggle Switch */}
        <div className="flex bg-ctp-surface0/40 p-1 rounded-lg border border-ctp-surface1/50 w-full md:w-auto">
          <button
            onClick={() => setActiveTab("work")}
            className={`flex-1 md:px-8 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
              activeTab === "work" 
                ? "bg-ctp-surface1 text-ctp-text shadow-sm border-ctp-surface2/50" 
                : "text-ctp-overlay0 hover:text-ctp-subtext1"
            }`}
          >
            Work
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex-1 md:px-8 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
              activeTab === "education" 
                ? "bg-ctp-surface1 text-ctp-text shadow-sm border-ctp-surface2/50" 
                : "text-ctp-overlay0 hover:text-ctp-subtext1"
            }`}
          >
            Education
          </button>
        </div>
      </div>

      <div className="space-y-0">
        {currentData.map((entry, i) => {
          const title = "company" in entry ? entry.company : entry.school;
          const subtitle = "role" in entry ? entry.role : entry.degree;
          const logo = entry.logo;

          return (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8 py-8 border-l-2 border-ctp-surface1/50 pl-8 md:pl-10 relative"
            >
              {/* Timeline dot or Logo */}
              {logo ? (
                <div 
                  className="absolute left-[-1px] top-8 -translate-x-1/2 w-10 h-10 rounded-full border border-ctp-surface2 overflow-hidden flex items-center justify-center p-[2px] z-10 shadow-lg shadow-ctp-crust"
                  style={{ backgroundColor: entry.logoBg || 'var(--ctp-base)' }}
                >
                  <img src={logo} alt={title} className="w-full h-full object-contain rounded-full" />
                </div>
              ) : (
                <div className="absolute left-[-1px] top-[40px] -translate-x-1/2 w-3 h-3 rounded-full bg-ctp-blue border-2 border-ctp-base z-10" />
              )}

              {/* Timestamp */}
              <div className="font-mono text-sm text-ctp-overlay1 md:pt-1 shrink-0 mb-2 md:mb-0">
                {entry.period}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-mono text-lg font-bold text-ctp-text mb-1">
                  {title}
                </h3>
                <p className="font-mono text-sm text-ctp-blue mb-4">{subtitle}</p>
                <div className="mt-4 flex flex-col gap-4">
                  {entry.description.split("\n").map((line, j) => {
                    if (line.trim().startsWith("->")) {
                      const text = line.replace("->", "").trim();
                      // Basic bolding of keywords to make it pop
                      const highlighted = text.replace(
                        /(?:\b|\s)(Unity|Cocos|Google Play|10K\+ downloads|UE5|Quixel Megascans|auto-battler|procedural generation|merge-puzzle|Java|C\+\+|OOP|CG|multimedia|game development|pipeline)(?:\b|\s|,|\.|-)/gi,
                        (match, p1) => match.replace(p1, `<span class="text-ctp-mauve font-bold">${p1}</span>`)
                      ).replace(/\bC\b/g, '<span class="text-ctp-mauve font-bold">C</span>');

                      return (
                        <div key={j} className="flex gap-3 items-start group">
                          <span className="text-ctp-blue mt-[3px] opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all shrink-0">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                          </span>
                          <p 
                            className="text-sm text-ctp-subtext0 leading-relaxed group-hover:text-ctp-text transition-colors"
                            dangerouslySetInnerHTML={{ __html: highlighted }}
                          />
                        </div>
                      );
                    }
                    if (!line.trim()) return null;
                    return (
                      <p key={j} className="text-sm text-ctp-subtext0 leading-relaxed">
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
