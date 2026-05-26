import { notFound } from "next/navigation";
import { projects, tagColors } from "../../lib/content";
import Link from "next/link";
import { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} - Tejeswaar Reddy`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-24 bg-ctp-base">
      {/* Top Banner with Terminal Window */}
      <div className="bg-[#1e1e2e]/50 border-b border-ctp-surface1/30 pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto flex justify-center">
          <div className="rounded-lg bg-[#11111b] border border-ctp-surface1/40 shadow-2xl w-full max-w-lg p-5 flex flex-col relative">
            
            {/* Window Header */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
                <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
                <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
              </div>
              {project.github && (
                <div className="flex items-center gap-1.5 text-xs text-[#a6adc8] font-mono">
                  <span className="tabular-nums">{((project.name.length * 42) % 500 + 50).toFixed(0)}</span>
                  <svg className="w-3.5 h-3.5 text-[#f9e2af]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Repo Title */}
            <div className="font-mono text-sm mb-4 truncate">
              <span className="text-[#f5c2e7]">Tejeswaar</span>
              <span className="text-[#6c7086] mx-2">/</span>
              <span className="text-[#a6e3a1] font-bold">{project.slug}</span>
            </div>

            {/* Terminal Description */}
            <p className="font-mono text-xs text-[#bac2de] leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Bottom Avatars */}
            <div className="flex justify-between items-end mt-auto pt-3 border-t border-white/5">
              <div className="flex -space-x-1.5">
                <img src="https://github.com/Tejeswaar.png" alt="Tejeswaar" className="w-7 h-7 rounded-full border-2 border-[#11111b] relative z-20" />
              </div>
              <span className="text-[10px] text-[#6c7086] font-mono">Tejeswaar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-ctp-overlay1 hover:text-ctp-blue transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portfolio
        </Link>

        {/* Header section matches reference image */}
        <h1 className="font-mono text-4xl font-bold text-ctp-mauve mb-6">{project.name}</h1>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 text-sm font-mono text-ctp-overlay1 border-b border-ctp-surface1/30 pb-6">
          {project.date && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {project.date}
            </div>
          )}
          
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-ctp-blue transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}

          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-ctp-green transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 mb-10 flex-wrap">
          <svg className="w-4 h-4 text-ctp-overlay0 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {project.tags.map((tag) => {
            const tagKey = tag.toLowerCase();
            const colorClass = tagColors[tagKey] || "bg-ctp-surface1/40 text-ctp-text border-ctp-surface2/30 hover:bg-ctp-surface2/40";
            return (
              <span
                key={tag}
                className={`px-2.5 py-1 rounded text-xs font-mono border transition-colors hover:brightness-110 ${colorClass}`}
              >
                {tagKey}
              </span>
            );
          })}
        </div>

        {/* Intro description */}
        <div className="mb-12">
          <h2 className="font-mono text-2xl font-bold text-ctp-mauve mb-6">{project.name}</h2>
          <p className="text-base text-ctp-subtext0 leading-relaxed font-mono">
            {project.collab && (
              <>
                Developed in collaboration with{" "}
                <a href={project.collab.url} target="_blank" rel="noopener noreferrer" className="text-ctp-text font-medium hover:text-ctp-blue border-b border-ctp-surface2 hover:border-ctp-blue transition-all pb-[1px]">{project.collab.name}</a>.{" "}
              </>
            )}
            {project.fullDescription || project.description}
          </p>
        </div>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-12">
            <h2 className="font-mono text-xl font-bold text-ctp-mauve mb-6">Key Features</h2>
            <ul className="space-y-4">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-ctp-surface2 mt-2 shrink-0" />
                  <p className="font-mono text-sm leading-relaxed text-ctp-subtext0">
                    <strong className="text-ctp-text font-bold">{feature.title}:</strong> {feature.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
