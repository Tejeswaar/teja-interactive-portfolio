// ============================================================
// content.ts — Single source of truth for all portfolio data.
// Update your info here; components pull from this file only.
// ============================================================

export const tagColors: Record<string, string> = {
  // Programming Languages
  "unreal engine 5": "bg-ctp-blue/15 text-ctp-blue border-ctp-blue/30",
  "gas": "bg-ctp-peach/15 text-ctp-peach border-ctp-peach/30",
  "c++": "bg-ctp-sapphire/15 text-ctp-sapphire border-ctp-sapphire/30",
  "c": "bg-ctp-sapphire/15 text-ctp-sapphire border-ctp-sapphire/30",
  "c#": "bg-ctp-green/15 text-ctp-green border-ctp-green/30",
  "typescript": "bg-ctp-blue/15 text-ctp-blue border-ctp-blue/30",
  "python": "bg-ctp-yellow/15 text-ctp-yellow border-ctp-yellow/30",
  "java": "bg-ctp-red/15 text-ctp-red border-ctp-red/30",
  "glsl/hlsl": "bg-ctp-teal/15 text-ctp-teal border-ctp-teal/30",
  
  // Frameworks & Engines
  "unity": "bg-ctp-sky/15 text-ctp-sky border-ctp-sky/30",
  "cocos creator": "bg-ctp-sapphire/15 text-ctp-sapphire border-ctp-sapphire/30",
  "sdl2": "bg-ctp-green/15 text-ctp-green border-ctp-green/30",
  "next.js": "bg-ctp-surface2/50 text-ctp-text border-ctp-surface2",
  "react": "bg-ctp-sky/15 text-ctp-sky border-ctp-sky/30",
  "node.js": "bg-ctp-green/15 text-ctp-green border-ctp-green/30",
  
  // Multimedia
  "maya": "bg-ctp-teal/15 text-ctp-teal border-ctp-teal/30",
  "blender": "bg-ctp-peach/15 text-ctp-peach border-ctp-peach/30",
  "renderman": "bg-ctp-blue/15 text-ctp-blue border-ctp-blue/30",
  "photoshop": "bg-ctp-blue/15 text-ctp-blue border-ctp-blue/30",
  "after effects": "bg-ctp-mauve/15 text-ctp-mauve border-ctp-mauve/30",
  "substance painter": "bg-ctp-red/15 text-ctp-red border-ctp-red/30",
  
  // Project specifics
  "dark fantasy": "bg-ctp-mauve/15 text-ctp-mauve border-ctp-mauve/30",
  "dear imgui": "bg-ctp-maroon/15 text-ctp-maroon border-ctp-maroon/30",
  "ecs": "bg-ctp-teal/15 text-ctp-teal border-ctp-teal/30",
  "firebase": "bg-ctp-yellow/15 text-ctp-yellow border-ctp-yellow/30",
  "gemini ai": "bg-ctp-lavender/15 text-ctp-lavender border-ctp-lavender/30",
  "fullstack": "bg-ctp-rosewater/15 text-ctp-rosewater border-ctp-rosewater/30",
  "game dev tools": "bg-ctp-pink/15 text-ctp-pink border-ctp-pink/30",
  "mobile": "bg-ctp-flamingo/15 text-ctp-flamingo border-ctp-flamingo/30",
  "google play": "bg-ctp-red/15 text-ctp-red border-ctp-red/30",
};

export const identity = {
  name: "Tejeswaar Reddy",
  greeting: "Hey! I'm Tejeswaar",
  roles: [
    "Game Systems Programmer",
    "Engine Developer",
    "Technical Artist",
  ],
  tagline:
    "I build the systems that make worlds feel real — from low-level C++ engines to modular combat in Unreal Engine 5.",
  location: "Hyderabad, Telangana, India",
  timezone: "IST (UTC+5:30)",
  email: "tejeswaarreddy@gmail.com",
  phone: "+91-7330666605",
  bio: "Game developer with a strong foundation in C++ and systems programming, working across Unity, Unreal Engine 5 (GAS, Blueprints), and Cocos Creator. Shipped MixMash to Google Play — 10K+ downloads — engineering the core gameplay loop, economy, and audio systems end-to-end. Focused on gameplay systems, ECS architecture, and engine-level programming. Currently building Retina Engine, a custom 2D engine in C++ and SDL2.",
};

export const links = {
  github: "https://github.com/tejeswaar",
  artstation: "https://artstation.com/tejeswaar",
  rookies: "https://therookies.co/tejeswaar",
  youtube: "https://youtube.com/@tejeswaar",
  resume: "https://drive.google.com/file/d/11wzT0wru3nvntGwH6sIHSW3CZezROEjo/view?usp=sharing",
};

export const statusTags = [
  { label: "Retina Engine — In Dev", color: "blue" as const },
  { label: "Land of Souls — In Dev", color: "mauve" as const },
  { label: "Open to Work ✓", color: "green" as const },
];

export const currently = {
  building: "Retina Engine (C++ / SDL2)",
  playing: "Elden Ring: Nightreign",
  reading: "ECS Architecture & Data-Oriented Design",
};

export const groupedSkills = [
  {
    category: "Programming Languages",
    items: ["C++", "C#", "C", "TypeScript", "Python", "Java", "GLSL/HLSL"],
  },
  {
    category: "Frameworks & Engines",
    items: ["Unreal Engine 5", "Unity", "Cocos Creator", "SDL2", "Next.js", "React", "Node.js"],
  },
  {
    category: "Multimedia",
    items: ["Maya", "Blender", "RenderMan", "Photoshop", "After Effects", "Substance Painter"],
  },
];

export type ProjectStatus = "IN DEV" | "LIVE" | "SHIPPED";

export interface Project {
  name: string;
  slug: string;
  description: string;
  fullDescription?: string;
  features?: { title: string; desc: string }[];
  date?: string;
  tags: string[];
  status: ProjectStatus;
  statusDetail?: string;
  github?: string;
  live?: string;
  demo?: string;
  playStore?: string;
}

export const projects: Project[] = [
  {
    name: "Land of Souls",
    slug: "land-of-souls",
    date: "April 2026",
    description:
      "Dark-fantasy action game built in UE5 using Gameplay Ability System — modular combat, stamina mechanics, combo logic, and attribute management.",
    fullDescription: "Land of Souls is a gritty, dark-fantasy action RPG developed in Unreal Engine 5. It heavily leverages the Gameplay Ability System (GAS) to deliver a robust, modular combat experience. The game features intricate stamina management, fluid combo logic, and a deep attribute system that dictates combat pacing.",
    features: [
      { title: "Gameplay Ability System", desc: "Utilizes Unreal's GAS for highly scalable and data-driven abilities and combat calculations." },
      { title: "Modular Combat", desc: "Designed with hit-stun, poise damage, i-frames, and intricate animation montages." },
      { title: "Stamina & Attributes", desc: "Core gameplay loop is heavily tied to stamina management, ensuring methodical and punishing combat." }
    ],
    tags: ["Unreal Engine 5", "GAS", "C++", "Dark Fantasy"],
    status: "IN DEV",
    github: "https://github.com/Tejeswaar/Land-of-Souls",
  },
  {
    name: "Retina Engine",
    slug: "retina-engine",
    date: "March 2026",
    description:
      "Custom 2D game engine from scratch. Rendering pipeline, entity-component system, and input systems focused on low-level graphics programming.",
    fullDescription: "Retina Engine is a custom, from-scratch 2D game engine designed to explore low-level engine architecture and graphics programming. Built using C++ and SDL2, it features a custom rendering pipeline, a fully functional Entity-Component System (ECS), and a robust input abstraction layer.",
    features: [
      { title: "Custom Rendering", desc: "Implements a custom 2D rendering pipeline utilizing SDL2 for efficient sprite management and drawing." },
      { title: "Entity Component System", desc: "Data-oriented ECS architecture ensuring cache coherency and decoupled game logic." },
      { title: "Editor UI", desc: "Integrates Dear ImGui for live debugging, profiling, and scene manipulation." }
    ],
    tags: ["C++", "SDL2", "Dear ImGui", "ECS"],
    status: "IN DEV",
    github: "https://github.com/Tejeswaar/RetinaEngine",
  },
  {
    name: "QuestBoard",
    slug: "questboard",
    date: "January 2026",
    description:
      "AI-assisted game design tool for managing GDDs, questlines, and 3D asset pipelines. Built as the tool I wished existed.",
    fullDescription: "QuestBoard is a comprehensive, full-stack application designed specifically for indie game developers. It acts as an intelligent repository for Game Design Documents (GDDs), allowing designers to track questlines, lore, and 3D asset requirements. Integrated with Gemini AI, it acts as a co-designer, providing suggestions and structural improvements.",
    features: [
      { title: "AI Integration", desc: "Leverages Gemini AI to generate quest ideas, flesh out lore, and organize asset pipelines." },
      { title: "Fullstack Architecture", desc: "Built with Next.js, Firebase, and a reactive UI ensuring real-time data synchronization." },
      { title: "Asset Pipeline Tracking", desc: "Dedicated kanban and list views for tracking the lifecycle of 3D models and concept art." }
    ],
    tags: ["Firebase", "Gemini AI", "Fullstack", "Game Dev Tools"],
    status: "LIVE",
    statusDetail: "questboard.app",
    live: "https://studio--questboard-89q6g.us-central1.hosted.app/",
  },
  {
    name: "Mix Mash",
    slug: "mix-mash",
    date: "October 2025",
    description:
      "Engineered core merge-mechanic gameplay loop, in-game economy, shop system, monetization systems, and event-driven audio. Launched on Google Play",
    fullDescription: "Mix Mash is a highly successful mobile merge-puzzle game published on Google Play. I was responsible for engineering the core gameplay loop, including the drag-and-drop merge mechanics, the in-game currency economy, and the dynamic shop system. It features robust monetization integration and a highly polished event-driven audio system.",
    features: [
      { title: "Core Loop Engineering", desc: "Developed the robust merge-mechanic backend, ensuring stable state management and edge-case handling." },
      { title: "Economy & Monetization", desc: "Designed and implemented the in-game shop, currency balancing, and ad-network integrations." },
      { title: "Event-Driven Audio", desc: "Implemented a decoupled audio manager responding to gameplay events for maximum immersion." }
    ],
    tags: ["Unity", "C#", "Mobile", "Google Play"],
    status: "SHIPPED",
    statusDetail: "10,000+ downloads",
    playStore: "https://play.google.com/store/apps/details?id=com.setkeygames.mixmash&pcampaignid=web_share",
  },
];

export interface ExperienceEntry {
  period: string;
  company: string;
  role: string;
  description: string;
  logo?: string;
  logoBg?: string;
}

export const experience: ExperienceEntry[] = [
  {
    period: "2026 – NOW",
    company: "IACG multimedia",
    role: "Jr Game Developer",
    description:
      "-> Developed a cognitive math puzzle game in Unity with a procedural generation system that dynamically constructs formulas, number sequences, and adaptive puzzle patterns for replayable gameplay experiences.\n-> Prototyped an auto-battler in Cocos — designed sprite assets, grid spawner, and attack logic while tuning unit balance for core combat feel.",
  },
  {
    period: "2025 – 2026",
    company: "Tharros Game Studio (Volunteer)",
    role: "Game Systems Programmer",
    description:
      "-> Shipped a merge-puzzle mobile game to Google Play — engineered the gameplay loop, economy, shop, UI, and audio systems end-to-end. 10K+ downloads.",
  },
];

export const buildingStatus = [
  {
    name: "Retina Engine",
    progress: 35,
    sprint: "Sprint 4 — ECS Refactor",
    color: "#89b4fa",
  },
  {
    name: "Land of Souls",
    progress: 22,
    sprint: "Sprint 2 — Combat Polish",
    color: "#cba6f7",
  },
];

export const footer = {
  builtBy: "Tejeswaar",
  poweredBy: "Next.js",
  hostedOn: "Vercel",
};

// GitHub username for API fetches
export const githubUsername = "tejeswaar";

export interface EducationEntry {
  period: string;
  school: string;
  degree: string;
  description: string;
  logo?: string;
  logoBg?: string;
}

export const education: EducationEntry[] = [
  {
    school: "IACG Multimedia College",
    degree: "BA (Hons) Multimedia – Gaming",
    period: "2022–2026",
    logo: "/IACG_Logo.webp",
    logoBg: "#1d1b38", // Matching the logo's dark blue background
    description: `->Built on a CS foundation started since intermediate, choosing this program to add the complete CG and multimedia layer — rigorously studying both tracks in parallel throughout.
->Final two years specialized in game development, bringing programming and visual production together into a single, unified technical skillset.
->The outcome: a developer who thinks like an engineer, communicates like an artist, and understands the full pipeline from asset creation to engine implementation.`
  },
  {
    school: "ANU Vocational College",
    degree: "Intermediate – CSE + Bridge MPC",
    period: "2020–2022",
    description: `->Where it all started — learned core OOP through Java, C, and C++, fell in love with C++, and started building small text-based games just for the fun of it. That's when coding and game development clicked as the path forward.`
  },
  {
    school: "SVCHS",
    degree: "High School · 9.8/10",
    period: "2018–2020",
    description: ``
  }
];
