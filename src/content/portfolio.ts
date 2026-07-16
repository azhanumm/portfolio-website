// ═══════════════════════════════════════════════════════════════════════════
// PORTFOLIO CONTENT — Edit this file to update the site.
// ───────────────────────────────────────────────────────────────────────────
// • Text     → change strings directly
// • Links    → replace the URLs in CONTACT below
// • Images   → put files in `public/images/` and set the path, e.g.
//              image: "/images/my-photo.jpg"
//              Leave `image` empty ("") to keep the colored placeholder.
// ═══════════════════════════════════════════════════════════════════════════

export type Accent = "blue" | "orange" | "green" | "purple";

// ── Contact / social links ────────────────────────────────────────────────
export const CONTACT = {
  email: "hello@hanum.design",
  linkedin: "https://linkedin.com/",
  github: "https://github.com/",
  resume: "#", // replace with a link to your résumé PDF
};

// ── Hero section ──────────────────────────────────────────────────────────
export const HERO = {
  greeting: "Hi, I'm Hanum",
  // Uses <br /> — the word inside {{gradient}} will be highlighted.
  headline: "Building digital<br />products with a {{gradient}}systems mindset.{{/gradient}}",
  subhead:
    "I enjoy turning complex problems into simple, intuitive experiences that create real impact.",
  primaryCta: { label: "View my work", href: "#work" },
  secondaryCta: { label: "Download résumé", href: "#" }, // uses CONTACT.resume if left as "#"
  image: "", // e.g. "/images/hero.jpg"  — leave empty for placeholder
  imageLabel: "Workspace photo",
  imageHint: "Replace with a personal photo",
  status: {
    current: "iOS Developer at Apple Developer Academy Bali",
    currentNote: "Building, learning, and collaborating on products that make a difference.",
    location: "Bali, Indonesia",
    locationNote: "Open to exciting opportunities and meaningful collaborations.",
  },
};

// ── Intro / about ─────────────────────────────────────────────────────────
export const INTRO = {
  image: "", // e.g. "/images/portrait.jpg"
  imageLabel: "Portrait or moodboard",
  since: "2022",
};

// ── How I think ───────────────────────────────────────────────────────────
export const PRINCIPLES: {
  title: string;
  body: string;
  accent: Accent;
  emoji: string;
}[] = [
  {
    title: "Understanding before building",
    body: "Every project starts with questions instead of solutions. Understanding the workflow, identifying constraints, and observing user behavior come before deciding what to build.",
    accent: "blue",
    emoji: "🔍",
  },
  {
    title: "Connecting perspectives",
    body: "Good products rarely come from one discipline alone. Business goals, technical feasibility, and user experience are considered together — resulting in solutions that are practical, intuitive, and grounded in real needs.",
    accent: "orange",
    emoji: "🧩",
  },
  {
    title: "Iteration over perfection",
    body: "The first version is rarely the final one. Testing assumptions, learning from feedback, and refining ideas are treated as essential parts of the process — not the last step after it's finished.",
    accent: "green",
    emoji: "🔁",
  },
];

// ── Projects ──────────────────────────────────────────────────────────────
// To add an image: image: "/images/odoo-cover.jpg"
export type Project = {
  id: string;
  title: string;
  year: string;
  role: string;
  category: string;
  stack: string;
  oneLine: string;
  problem: string;
  process: string[];
  solution: string;
  contribution: string;
  result: string;
  accent: Accent;
  emoji: string;
  image?: string; // optional cover image path
  link?: string;  // optional external link (case study, repo, live demo)
};

export const PROJECTS: Project[] = [
  {
    id: "odoo-erp",
    title: "Odoo ERP Simulation & Usability Analysis",
    year: "2025",
    role: "Industrial Engineering — Research & Simulation",
    category: "ERP · Usability Research",
    stack: "Odoo, Usability Testing, Process Analysis",
    oneLine:
      "An ERP learning simulation that turns supply chain theory into a hands-on, usability-tested experience.",
    problem:
      "Supply chain students often learn ERP concepts in theory but rarely experience how the modules connect in practice. The gap between classroom material and real workflows made it hard to build intuition for how decisions ripple through a system.",
    process: [
      "Mapped end-to-end procurement, inventory, manufacturing, and sales flows.",
      "Configured Odoo modules to reflect a realistic supply chain lab.",
      "Ran usability testing sessions with students and observed friction points.",
      "Analyzed results and translated them into improvement opportunities.",
    ],
    solution:
      "An ERP learning simulation covering Sales, Purchase, Inventory, Manufacturing, and Shop Floor modules — designed so students could feel the cause and effect between operational decisions.",
    contribution:
      "Led the simulation design, facilitated usability sessions, and synthesized findings into actionable UX recommendations.",
    result:
      "The final usability score reached 84.04%, indicating strong user acceptance. The project reinforced that successful digital transformation depends as much on usability as on system functionality.",
    accent: "blue",
    emoji: "📊",
    image: "",
    link: "",
  },
  {
    id: "peers",
    title: "Peers — Shared Accountability App",
    year: "2026",
    role: "Product Designer (concept)",
    category: "App idea development",
    stack: "Sketch, Design Thinking, User Interviews",
    oneLine:
      "A habit-building app that encourages consistency through shared accountability and social motivation.",
    problem:
      "Building habits alone is hard — motivation fades once novelty wears off. People stay consistent longer when someone else notices, but existing habit apps treat accountability as a solo checklist.",
    process: [
      "Interviewed people who had tried and abandoned habit apps.",
      "Framed the problem around social motivation, not tracking.",
      "Sketched flows for pairing, check-ins, and gentle nudges.",
      "Tested the concept with target users to validate the core loop.",
    ],
    solution:
      "A pairing-based habit app where two people commit to the same habit and see each other's progress — turning consistency into a shared, low-pressure ritual.",
    contribution:
      "Owned the problem framing, user research, and concept design end-to-end.",
    result:
      "Validated that lightweight social visibility can outperform elaborate tracking features — the smallest amount of shared context created the biggest motivational shift.",
    accent: "orange",
    emoji: "🤝",
    image: "",
    link: "",
  },
  {
    id: "meal-planner",
    title: "Meal Planner — Recipes & Grocery in One Flow",
    year: "2026",
    role: "UI/UX Designer · iOS Developer",
    category: "iOS App",
    stack: "Figma, SwiftUI",
    oneLine:
      "A single, streamlined workflow that combines meal planning, recipes, and grocery lists.",
    problem:
      "Planning meals and managing grocery lists often happen across different apps or notes, creating unnecessary friction during everyday routines.",
    process: [
      "Defined the user flow and information architecture.",
      "Created low- and high-fidelity prototypes.",
      "Implemented the interface in SwiftUI.",
      "Refined layouts through multiple design iterations.",
    ],
    solution:
      "An interface that combines meal planning, recipe management, and grocery lists into one streamlined workflow — so a weekly plan becomes a shopping list without extra work.",
    contribution:
      "Designed the full experience and implemented the SwiftUI interface.",
    result:
      "Building the interface emphasized that visual hierarchy plays a significant role in reducing cognitive load during routine tasks.",
    accent: "green",
    emoji: "🥗",
    image: "",
    link: "",
  },
  {
    id: "workflow-tool",
    title: "Small-Team Workflow Redesign",
    year: "2026",
    role: "Product Designer",
    category: "Workflow · UX",
    stack: "Figma, Interviews",
    oneLine:
      "A workflow refinement that improves organization without asking users to change their habits.",
    problem:
      "Teams often adopt new tools that promise clarity but demand a full behavior change. Adoption stalls when the cost of switching outweighs the benefit.",
    process: [
      "Observed current habits and rituals before proposing changes.",
      "Identified the smallest structural change that unlocked the biggest gain.",
      "Prototyped adjustments that layered onto existing behavior.",
      "Iterated based on real usage, not hypothetical scenarios.",
    ],
    solution:
      "A workflow change small enough to sit inside existing habits, but structured enough to bring visible order to shared work.",
    contribution:
      "Framed the problem, designed the intervention, and led adoption.",
    result:
      "A small change in workflow can significantly improve organization without requiring users to change their habits completely.",
    accent: "purple",
    emoji: "🗂️",
    image: "",
    link: "",
  },
  {
    id: "zony",
    title: "Zony — Asthma-Aware Activity Companion",
    year: "2026",
    role: "UI/UX Designer · Front-end iOS Developer (Team)",
    category: "iOS App Development",
    stack: "Figma, SwiftUI, Apple Watch",
    oneLine:
      "An interactive iOS experience that combines Apple Watch activity data with child-friendly reflections to help kids with asthma stay active with confidence.",
    problem:
      "Children with asthma are often told what they can't do. There are few tools that help them understand their own bodies in a way that feels encouraging rather than restrictive.",
    process: [
      "Researched pediatric asthma routines with caregivers.",
      "Designed child-friendly reflection prompts tied to activity data.",
      "Prototyped the paired iPhone + Apple Watch experience in Figma.",
      "Built the front-end in SwiftUI with the team.",
    ],
    solution:
      "A paired iPhone and Apple Watch app that translates activity data into gentle, age-appropriate reflections — so kids build body awareness through curiosity, not restriction.",
    contribution:
      "Led interaction design and contributed to the SwiftUI front-end implementation.",
    result:
      "Confirmed that framing matters as much as data — the same activity summary can feel limiting or empowering depending on how it's presented.",
    accent: "blue",
    emoji: "🫁",
    image: "",
    link: "",
  },
  {
    id: "finding-tuki",
    title: "Finding Tuki — 2D Arcade Game",
    year: "2026",
    role: "Gameplay Developer",
    category: "iOS Game Development",
    stack: "Swift, SpriteKit, GameKit, Core Haptics, AVFoundation",
    oneLine:
      "An educational endless-runner where players guide a baby sea turtle through polluted oceans while learning about marine conservation.",
    problem:
      "Environmental education often struggles to keep younger audiences engaged. The challenge was to translate marine conservation messages into an interactive gameplay experience.",
    process: [
      "Prototyped core mechanics: obstacles, collectibles, difficulty ramp.",
      "Integrated haptics and audio to reinforce the ocean setting.",
      "Balanced educational messaging with gameplay pacing.",
      "Playtested to tune difficulty and message clarity.",
    ],
    solution:
      "A complete gameplay experience where players avoid hazards, collect food, and survive increasingly challenging environments while absorbing the reality of ocean pollution.",
    contribution:
      "Built the gameplay systems in Swift and SpriteKit, wired up haptics and audio feedback.",
    result:
      "Reinforced that game mechanics can communicate ideas as effectively as written content when they're designed with intention.",
    accent: "green",
    emoji: "🐢",
    image: "",
    link: "",
  },
];
