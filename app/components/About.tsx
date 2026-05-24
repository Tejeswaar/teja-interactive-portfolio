"use client";

import { useEffect, useRef } from "react";
import { identity, currently, groupedSkills, tagColors } from "../lib/content";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section id="about" ref={sectionRef} className="reveal py-24 px-6 max-w-5xl mx-auto">
      <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tighter text-ctp-text mb-4 uppercase">
        ABOUT<span className="text-ctp-mauve">.</span>
      </h2>
      <div className="section-divider mb-10" />

      <div className="grid md:grid-cols-[1fr_300px] gap-10">
        {/* Bio + Skills */}
        <div>
          {/* Engaging Bio Section */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-ctp-text leading-snug mb-6">
              Game developer with a strong foundation in <span className="text-ctp-sapphire">C++</span> and <span className="text-ctp-mauve">systems programming</span>.
            </h3>
            <p className="text-ctp-subtext0 text-lg leading-relaxed mb-6 font-mono">
              Working across <span className="text-ctp-sky">Unity</span>, <span className="text-ctp-blue font-semibold">Unreal Engine 5</span> (GAS, Blueprints), and <span className="text-ctp-sapphire">Cocos Creator</span>. 
              Shipped <span className="text-ctp-green font-bold">MixMash</span> to Google Play — <span className="text-ctp-peach font-bold bg-ctp-surface1/50 px-1.5 py-0.5 rounded">10K+ downloads</span> — engineering the core gameplay loop, economy, and audio systems end-to-end.
            </p>
            <div className="border-l-4 border-ctp-surface2 pl-5 py-1">
              <p className="text-ctp-subtext1 text-base leading-relaxed font-mono">
                Focused on <span className="text-ctp-rosewater">gameplay systems</span>, <span className="text-ctp-teal">ECS architecture</span>, and engine-level programming. 
                Currently building <strong className="text-ctp-blue">Retina Engine</strong>, a custom 2D engine in C++ and SDL2.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-8">
            {groupedSkills.map((group) => (
              <div key={group.category}>
                <h3 className="font-mono text-sm text-ctp-overlay1 uppercase tracking-wider mb-4">
                  {`// ${group.category.toLowerCase().replace(/ /g, "_")}`}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((skill) => {
                    const tagKey = skill.toLowerCase();
                    const colorClass = tagColors[tagKey] || "bg-ctp-surface1/40 text-ctp-text border-ctp-surface2/50";
                    return (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono border transition-all hover:scale-105 cursor-default flex items-center gap-2 shadow-sm ${colorClass}`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Currently sidebar */}
        <aside className="rounded-xl border border-ctp-surface1/50 bg-ctp-surface0/20 p-5 h-fit">
          <h3 className="font-mono text-sm text-ctp-overlay1 uppercase tracking-wider mb-4">
            {"// currently"}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-mono text-ctp-green mb-1">🔨 Building</p>
              <p className="text-sm text-ctp-text">{currently.building}</p>
            </div>
            <div>
              <p className="text-xs font-mono text-ctp-blue mb-1">🎮 Playing</p>
              <p className="text-sm text-ctp-text">{currently.playing}</p>
            </div>
            <div>
              <p className="text-xs font-mono text-ctp-mauve mb-1">📖 Reading about</p>
              <p className="text-sm text-ctp-text">{currently.reading}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
