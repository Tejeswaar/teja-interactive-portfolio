"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { projects, tagColors, type ProjectStatus } from "../lib/content";

const statusStyles: Record<ProjectStatus, string> = {
  "IN DEV": "bg-ctp-yellow/15 text-ctp-yellow border-ctp-yellow/30",
  LIVE: "bg-ctp-green/15 text-ctp-green border-ctp-green/30",
  SHIPPED: "bg-ctp-blue/15 text-ctp-blue border-ctp-blue/30",
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${index * 120}ms`;
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      onClick={() => router.push(`/projects/${project.slug}`)}
      ref={ref}
      className="reveal project-card rounded-xl border border-ctp-surface1/50 bg-ctp-base overflow-hidden flex flex-col group hover:border-ctp-surface2/80 transition-colors duration-300 cursor-pointer"
    >
      {/* Top Section (Mock Window) */}
      <div className="bg-gradient-to-br from-ctp-surface1/60 to-ctp-surface0/60 p-5 sm:p-6 relative flex items-center justify-center min-h-[200px] border-b border-ctp-surface1/30">
        <div className="rounded-lg bg-[#11111b] border border-ctp-surface1/40 shadow-2xl w-full max-w-sm p-4 flex flex-col transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-ctp-surface0/50 transition-all duration-300 relative z-10">
          
          {/* Window Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#f9e2af]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
            </div>
            {project.github && (
              <div className="flex items-center gap-1 text-[10px] text-[#a6adc8] font-mono">
                <span className="tabular-nums">{((project.name.length * 42) % 500 + 50).toFixed(0)}</span>
                <svg className="w-3 h-3 text-[#f9e2af]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            )}
          </div>

          {/* Repo Title */}
          <div className="font-mono text-xs mb-3 truncate">
            <span className="text-[#f5c2e7]">Tejeswaar</span>
            <span className="text-[#6c7086] mx-2">/</span>
            <span className="text-[#a6e3a1] font-bold">{project.name.replace(/\s+/g, '-').toLowerCase()}</span>
          </div>

          {/* Terminal Description */}
          <p className="font-mono text-[11px] text-[#bac2de] leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Bottom Avatars */}
          <div className="flex justify-between items-end mt-auto pt-2 border-t border-white/5">
            <div className="flex -space-x-1.5">
              <img src="https://github.com/Tejeswaar.png" alt="Tejeswaar" className="w-6 h-6 rounded-full border border-[#11111b] relative z-20" />
            </div>
            <span className="text-[9px] text-[#6c7086] font-mono">Tejeswaar</span>
          </div>
        </div>
      </div>

      {/* Bottom Section (Card Info) */}
      <div className="bg-ctp-surface0/30 p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-mono text-lg font-bold text-ctp-text">
            {project.name}
          </h3>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border shrink-0 ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        {project.statusDetail && (
          <p className="text-xs font-mono text-ctp-overlay1 mb-2">
            ↳ {project.statusDetail}
          </p>
        )}

        <p className="text-sm text-ctp-subtext0 leading-relaxed mb-5 flex-1 line-clamp-3">
          {project.collab && (
            <>
              Developed in collaboration with{" "}
              <a href={project.collab.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-ctp-text font-medium hover:text-ctp-blue border-b border-ctp-surface2 hover:border-ctp-blue transition-all pb-[1px]">{project.collab.name}</a>.{" "}
            </>
          )}
          {project.fullDescription || project.description}
        </p>

        {/* Tags matching the reference design */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <svg className="w-4 h-4 text-ctp-overlay0 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {project.tags.map((tag) => {
            const tagKey = tag.toLowerCase();
            const colorClass = tagColors[tagKey] || "bg-ctp-surface1/60 text-ctp-text border-ctp-surface1/40";
            return (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded text-[10px] font-mono border shrink-0 transition-colors hover:brightness-110 ${colorClass}`}
              >
                {tagKey}
              </span>
            );
          })}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t border-ctp-surface1/30 items-center flex-wrap">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-mono text-ctp-blue hover:text-ctp-lavender transition-colors flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-mono text-ctp-green hover:text-ctp-teal transition-colors flex items-center gap-1.5"
            >
              <span>↗</span> Live
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-ctp-mauve hover:text-ctp-pink transition-colors flex items-center gap-1.5"
            >
              <span>▶</span> Demo
            </a>
          )}
          {project.playStore && (
            <a
              href={project.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-ctp-teal hover:text-ctp-green transition-colors flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 512 512" fill="currentColor" className="shrink-0">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
              Play Store
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="reveal py-24 px-6 max-w-5xl mx-auto">
      <h2 className="font-sans text-3xl md:text-4xl font-black tracking-tighter text-ctp-text mb-4 uppercase">
        PROJECTS<span className="text-ctp-mauve">.</span>
      </h2>
      <div className="section-divider mb-10" />

      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
