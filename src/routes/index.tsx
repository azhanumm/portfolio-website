import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  CONTACT,
  HERO,
  INTRO,
  PRINCIPLES,
  PROJECTS,
  type Accent,
  type Project,
} from "@/content/portfolio";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
});

// ─── Reveal on scroll ──────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("reveal-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Accent maps ───────────────────────────────────────────────────────────
const accentText: Record<Accent, string> = {
  blue: "text-accent-blue",
  orange: "text-accent-orange",
  green: "text-accent-green",
  purple: "text-accent-purple",
};
const accentDot: Record<Accent, string> = {
  blue: "bg-accent-blue",
  orange: "bg-accent-orange",
  green: "bg-accent-green",
  purple: "bg-accent-purple",
};
const accentSoft: Record<Accent, string> = {
  blue: "from-accent-blue/25 via-accent-blue/10 to-transparent",
  orange: "from-accent-orange/25 via-accent-orange/10 to-transparent",
  green: "from-accent-green/25 via-accent-green/10 to-transparent",
  purple: "from-accent-purple/30 via-accent-purple/10 to-transparent",
};
const accentImage: Record<Accent, string> = {
  blue: "from-accent-blue/45 via-accent-purple/20 to-accent-blue/10",
  orange: "from-accent-orange/45 via-accent-orange/20 to-accent-purple/15",
  green: "from-accent-green/45 via-accent-blue/20 to-accent-green/10",
  purple: "from-accent-purple/50 via-accent-blue/25 to-accent-purple/15",
};
const accentBorder: Record<Accent, string> = {
  blue: "hover:border-accent-blue/50",
  orange: "hover:border-accent-orange/50",
  green: "hover:border-accent-green/50",
  purple: "hover:border-accent-purple/50",
};
const accentVar: Record<Accent, string> = {
  blue: "var(--accent-blue)",
  orange: "var(--accent-orange)",
  green: "var(--accent-green)",
  purple: "var(--accent-purple)",
};

// Render headline that may contain {{gradient}}...{{/gradient}} + <br />
function renderHeadline(text: string) {
  const parts = text.split(/(\{\{gradient\}\}.*?\{\{\/gradient\}\}|<br \/>|<br\/>)/g);
  return parts.map((p, i) => {
    if (p === "<br />" || p === "<br/>") return <br key={i} />;
    const m = p.match(/^\{\{gradient\}\}(.*)\{\{\/gradient\}\}$/);
    if (m) return <span key={i} className="text-gradient-brand">{m[1]}</span>;
    return <span key={i}>{p}</span>;
  });
}

// ─── Page ──────────────────────────────────────────────────────────────────
function PortfolioPage() {
  useReveal();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-accent-blue/12 blur-3xl" />
        <div className="absolute top-40 -right-40 h-[480px] w-[480px] rounded-full bg-accent-purple/12 blur-3xl" />
        <div className="absolute top-[900px] left-1/3 h-[400px] w-[400px] rounded-full bg-accent-orange/10 blur-3xl" />
      </div>

      <Nav />
      <main className="pt-16">
        <SectionShell tint="blue" first>
          <Hero />
        </SectionShell>

        <WaveDivider flip />

        <SectionShell tint="orange">
          <Intro />
        </SectionShell>

        <Marquee />

        <SectionShell tint="green">
          <HowIThink />
        </SectionShell>

        <WaveDivider />

        <SectionShell tint="purple">
          <SelectedWork />
        </SectionShell>

        <SectionShell tint="blue">
          <Connect />
        </SectionShell>
      </main>
      <Footer />
    </div>
  );
}

// ─── Section wrapper with slight tint ──────────────────────────────────────
function SectionShell({
  children,
  tint,
  first,
}: {
  children: React.ReactNode;
  tint: Accent;
  first?: boolean;
}) {
  const tintClass = `section-tint-${tint}`;
  return (
    <div className={`${tintClass} ${first ? "pt-10" : "pt-20"} pb-24`}>
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">{children}</div>
    </div>
  );
}

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className={`divider-wave ${flip ? "rotate-180" : ""}`} />
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <a href="#top" className="flex items-center gap-2 font-mono text-xs tracking-wide text-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue" />
          Hanum Azizah
        </a>
        <nav className="hidden items-center gap-7 font-mono text-xs text-muted-foreground sm:flex">
          <a href="#work" className="story-link transition-colors hover:text-foreground">Work</a>
          <a href="#thinking" className="story-link transition-colors hover:text-foreground">About</a>
          <a href="#connect" className="story-link transition-colors hover:text-foreground">Contact</a>
        </nav>
        <a
          href={`mailto:${CONTACT.email}`}
          className="press inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 font-mono text-[11px] text-foreground transition-colors hover:border-foreground/40"
        >
          Let's connect <span aria-hidden>↗</span>
        </a>
      </div>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  const resumeHref = HERO.secondaryCta.href === "#" ? CONTACT.resume : HERO.secondaryCta.href;
  return (
    <section id="top" className="animate-fade-up grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <div className="flex flex-col justify-center">
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
          </span>
          <span>👋 {HERO.greeting}</span>
        </p>

        <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-[4.2rem]">
          {renderHeadline(HERO.headline)}
        </h1>

        <p className="mt-6 max-w-[46ch] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {HERO.subhead}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={HERO.primaryCta.href}
            className="press group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-mono text-xs text-background transition-transform hover:-translate-y-0.5"
          >
            {HERO.primaryCta.label}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href={resumeHref}
            className="press inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 font-mono text-xs text-foreground transition-colors hover:border-foreground/40"
          >
            {HERO.secondaryCta.label} <span aria-hidden>↓</span>
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" /> Currently
            </div>
            <p className="mt-2 text-sm font-medium text-foreground">{HERO.status.current}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{HERO.status.currentNote}</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface/60 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-purple" /> Based in
            </div>
            <p className="mt-2 text-sm font-medium text-foreground">{HERO.status.location}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{HERO.status.locationNote}</p>
          </div>
        </div>
      </div>

      <TiltImage>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]">
          <SmartImage
            src={HERO.image}
            label={HERO.imageLabel}
            hint={HERO.imageHint}
            gradient="from-accent-orange/40 via-accent-purple/25 to-accent-blue/30"
            emoji="🖼️"
          />
        </div>

        <FloatBadge className="absolute -left-2 top-6 sm:-left-6" icon="</>" iconBg="bg-accent-blue/15 text-accent-blue" title="Developer" lines={["iOS · SwiftUI", "Xcode · Swift"]} />
        <FloatBadge className="absolute right-0 top-1/3 sm:-right-4" icon="◆" iconBg="bg-accent-green/15 text-accent-green" title="Systems Thinker" lines={["Process Mapping ·", "Problem Solving ·", "Optimization"]} />
        <FloatBadge className="absolute -bottom-4 left-4 sm:left-10" icon="✦" iconBg="bg-accent-orange/20 text-accent-orange" title="Product Builder" lines={["Research · Design ·", "Iteration · Impact"]} />

        <p className="pointer-events-none absolute -bottom-10 right-2 font-mono text-[11px] italic text-accent-purple/80 sm:right-6">
          ↖ Curious by nature, driven by impact
        </p>
      </TiltImage>
    </section>
  );
}

// Tilt-on-mouse image container
function TiltImage({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-[440px] transition-transform duration-200 ease-out will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

function FloatBadge({
  className = "", icon, iconBg, title, lines,
}: { className?: string; icon: string; iconBg: string; title: string; lines: string[] }) {
  return (
    <div className={`animate-float rounded-2xl border border-border bg-background/95 p-3.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md ${className}`}>
      <div className={`grid h-9 w-9 place-items-center rounded-xl font-mono text-sm ${iconBg}`}>{icon}</div>
      <p className="mt-2 text-sm font-semibold text-foreground">{title}</p>
      <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
        {lines.map((l) => <div key={l}>{l}</div>)}
      </div>
    </div>
  );
}

// ─── Smart image (real image OR gradient placeholder) ─────────────────────
function SmartImage({
  src, label, hint, gradient, emoji,
}: { src?: string; label: string; hint?: string; gradient: string; emoji: string }) {
  if (src && src.length > 0) {
    return <img src={src} alt={label} className="h-full w-full object-cover" loading="lazy" />;
  }
  return (
    <div className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}>
      <div aria-hidden className="absolute inset-0 bg-dots opacity-40" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
      <span className="relative text-5xl drop-shadow-sm">{emoji}</span>
      <span className="relative mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">{label}</span>
      {hint && <span className="relative mt-1 font-mono text-[10px] text-foreground/45">{hint}</span>}
    </div>
  );
}

// ─── Intro ────────────────────────────────────────────────────────────────
function Intro() {
  return (
    <section className="reveal" data-reveal>
      <SectionLabel>01 · Introduction</SectionLabel>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-surface">
            <SmartImage
              src={INTRO.image}
              label={INTRO.imageLabel}
              gradient="from-accent-blue/30 via-accent-purple/20 to-accent-green/25"
              emoji="🌱"
            />
          </div>
          <div className="absolute -right-3 -bottom-3 rounded-2xl border border-border bg-background px-3 py-2 font-mono text-[11px] shadow-sm">
            <span className="text-muted-foreground">since</span>{" "}
            <span className="text-foreground">{INTRO.since}</span>
          </div>
        </div>

        <div className="space-y-5 text-pretty text-base leading-relaxed text-foreground/90 sm:text-[17px]">
          <p>
            I started in <span className="rounded-md bg-accent-blue/10 px-1.5 py-0.5 text-accent-blue">Industrial Engineering</span>,
            where I learned to break down complex systems, understand how people interact with them, and find practical ways to improve them. Today, I apply the same way of thinking through{" "}
            <span className="rounded-md bg-accent-orange/10 px-1.5 py-0.5 text-accent-orange">iOS development</span>{" "}
            — turning real problems into products that are functional, intuitive, and grounded in user needs.
          </p>
          <p>
            I don't build products because I want to make apps. I build them because I'm naturally curious about how people make decisions, how systems shape behavior, and why some experiences feel effortless while others don't.
          </p>
          <p>
            My work spans ERP implementation, usability research, mobile applications, and game development. While the projects vary, they all begin with the same approach:{" "}
            <span className="font-medium text-foreground">understanding the problem before deciding what to build.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ───────────────────────────────────────────────────────────────
function Marquee() {
  const items = ["Systems Thinking", "iOS Development", "SwiftUI", "Usability Research", "Product Design", "Curiosity", "Iteration", "Impact"];
  const row = [...items, ...items];
  return (
    <div aria-hidden className="relative overflow-hidden border-y border-border/60 bg-surface/60 py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item}
            <span className="inline-block h-1 w-1 rounded-full bg-accent-purple/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── How I think ──────────────────────────────────────────────────────────
function HowIThink() {
  return (
    <section id="thinking" className="reveal" data-reveal>
      <SectionLabel>02 · How I think</SectionLabel>
      <h2 className="mt-6 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        Three principles that shape every project I take on.
      </h2>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <div
            key={p.title}
            className="card-spotlight group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.2)]"
            style={{ ["--spot" as any]: accentVar[p.accent] }}
          >
            <div aria-hidden className={`absolute inset-0 -z-10 bg-gradient-to-br ${accentSoft[p.accent]} opacity-70`} />
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-background text-xl shadow-sm ring-1 ring-border transition-transform group-hover:rotate-6 group-hover:scale-110">
                {p.emoji}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">0{i + 1}</span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 text-pretty text-[14px] leading-relaxed text-muted-foreground">{p.body}</p>
            <span className={`mt-5 block h-0.5 w-8 rounded-full ${accentDot[p.accent]} transition-all group-hover:w-16`} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Selected work ────────────────────────────────────────────────────────
function SelectedWork() {
  return (
    <section id="work" className="reveal" data-reveal>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>03 · Selected work</SectionLabel>
          <h2 className="mt-6 max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            A selection of things I've worked on.
          </h2>
          <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground">
            Each entry highlights not only the final outcome, but also the decisions, trade-offs, and iterations behind it — the{" "}
            <span className="font-mono text-xs uppercase tracking-wide text-foreground">behind the work</span>.
          </p>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {PROJECTS.length.toString().padStart(2, "0")} projects
        </span>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i + 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={onMove}
      className={`card-spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all ${accentBorder[project.accent]} hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]`}
      style={{ ["--spot" as any]: accentVar[project.accent] }}
    >
      <div className="aspect-[16/10] overflow-hidden">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <SmartImage
            src={project.image}
            label={`${project.title.split(" — ")[0]} preview`}
            hint="Add project screenshot"
            gradient={accentImage[project.accent]}
            emoji={project.emoji}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${accentDot[project.accent]}`} />
            {project.category}
          </span>
          <span>{String(index).padStart(2, "0")} / {project.year}</span>
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-snug text-foreground">{project.title}</h3>
        <p className="mt-2 text-[13px] font-mono text-subtle">{project.role}</p>
        <p className="mt-3 flex-1 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{project.oneLine}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="press inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-mono text-[11px] uppercase tracking-wide text-foreground transition-colors hover:border-foreground/40"
          >
            {open ? "Hide the story" : "Behind the work"}
            <span aria-hidden className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
          </button>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 font-mono text-[11px] uppercase tracking-wide text-foreground transition-colors hover:border-foreground/40"
            >
              Visit <span aria-hidden>↗</span>
            </a>
          )}
        </div>

        <div
          ref={contentRef}
          style={{ maxHeight: open ? `${contentRef.current?.scrollHeight ?? 3000}px` : "0px" }}
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        >
          <div className="mt-6 rounded-2xl border border-border bg-background/60 p-5">
            <p className={`font-mono text-[11px] uppercase tracking-[0.15em] ${accentText[project.accent]}`}>Behind the work</p>
            <CaseBlock label="Stack" mono>{project.stack}</CaseBlock>
            <CaseBlock label="Problem">{project.problem}</CaseBlock>
            <CaseBlock label="Process">
              <ul className="space-y-2">
                {project.process.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${accentDot[project.accent]}`} />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </CaseBlock>
            <CaseBlock label="Solution">{project.solution}</CaseBlock>
            <CaseBlock label="Contribution">{project.contribution}</CaseBlock>
            <CaseBlock label="Reflection">{project.result}</CaseBlock>
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseBlock({ label, children, mono }: { label: string; children: React.ReactNode; mono?: boolean }) {
  return (
    <div className="mt-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <div className={`mt-1.5 text-pretty text-[14px] leading-relaxed text-foreground/90 ${mono ? "font-mono text-[12.5px] text-muted-foreground" : ""}`}>
        {children}
      </div>
    </div>
  );
}

// ─── Connect ──────────────────────────────────────────────────────────────
function Connect() {
  return (
    <section id="connect" className="reveal" data-reveal>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12">
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-40 mask-fade-b" />
        <div aria-hidden className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-accent-purple/30 via-accent-blue/20 to-transparent blur-3xl" />

        <SectionLabel>04 · Let's connect</SectionLabel>
        <h2 className="mt-6 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Interested in working together, or trading thoughts on{" "}
          <span className="text-gradient-brand">systems and product?</span>
        </h2>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
          I'd love to hear from you. The best way to reach me is by email — I reply to every message.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <ContactCard label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} accent="orange" />
          <ContactCard label="LinkedIn" value="/in/hanum" href={CONTACT.linkedin} accent="blue" external />
          <ContactCard label="GitHub" value="@hanum" href={CONTACT.github} accent="purple" external />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  label, value, href, accent, external,
}: { label: string; value: string; href: string; accent: Accent; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`card-spotlight press group flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/70 p-5 backdrop-blur-sm transition-all ${accentBorder[accent]} hover:-translate-y-0.5`}
      style={{ ["--spot" as any]: accentVar[accent] }}
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
      </div>
      <span aria-hidden className={`grid h-9 w-9 place-items-center rounded-full bg-background ring-1 ring-border transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${accentText[accent]}`}>
        ↗
      </span>
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-px w-6 bg-border" />
      {children}
    </p>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-6 py-8 font-mono text-[11px] uppercase tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:px-8">
        <span>© {new Date().getFullYear()} Az Zahra Azizah Hanum</span>
        <span>Designed & built with care · v1.0</span>
      </div>
    </footer>
  );
}
