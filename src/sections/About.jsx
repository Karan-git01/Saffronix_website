import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import portrait from "../assets/about-portrait.webp";

const stats = [
  {
    k: "01",
    label: "Projects",
    value: "122+",
    d: "Digital projects shaped from early concept to polished website.",
  },
  {
    k: "02",
    label: "Websites",
    value: "84+",
    d: "Websites developed with clean structure and smooth motion.",
  },
  {
    k: "03",
    label: "Years",
    value: "12+",
    d: "Years of experience across digital design, web development, and visual systems.",
  },
  {
    k: "04",
    label: "Clients",
    value: "48+",
    d: "Brands, founders, and studios supported from early idea to final launch.",
  },
];

const missionWords =
  "Ahoj, I'm Saffronix. I help founders, studios, and growing brands turn their ideas into refined websites. I design clear visual systems and build them with fast code, smooth motion, and a focus on usability.".split(
    " ",
  );

function GuideLines() {
  const visibility = ["block", "hidden lg:block", "hidden md:block", "hidden lg:block", "block"];
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex justify-between px-6 lg:px-10">
      {visibility.map((v, i) => (
        <span key={i} className={`w-px bg-foreground/[0.07] ${v}`} />
      ))}
    </div>
  );
}

function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
      <span className="label text-foreground/45">{index}</span>
      <span className="label text-foreground">{title}</span>
    </div>
  );
}

function GetInTouch() {
  return (
    <a
      href="#contact"
      className="group flex h-12 w-full items-center overflow-hidden bg-ink text-foreground"
    >
      <span className="flex h-12 w-0 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out group-hover:w-12">
        <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
      </span>
      <span className="label relative block flex-1 overflow-hidden px-4 whitespace-nowrap">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Get in Touch <span className="text-foreground/40">/Saffronix</span>
        </span>
        <span className="absolute inset-x-4 top-0 block translate-y-full transition-transform duration-400 ease-out group-hover:translate-y-0">
          Get in Touch <span className="text-accent">/Saffronix</span>
        </span>
      </span>
      <span className="flex h-12 w-12 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out group-hover:w-0">
        <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
      </span>
    </a>
  );
}

function ProfileCard() {
  return (
    <div className="border-t-[3px] border-accent">
      <div className="relative">
        <img
          src={portrait}
          alt="Portrait of the Saffronix founder"
          width={1024}
          height={1344}
          loading="lazy"
          className="block aspect-[3/4] w-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0">
          <GetInTouch />
        </div>
      </div>

      <div className="border-x border-b border-border bg-card">
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
            <span className="truncate font-display text-[15px] font-medium tracking-tight uppercase text-foreground">
              Saffronix Studio
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-foreground/60">
            {["X", "Db", "Ig"].map((s) => (
              <span key={s} className="label transition-colors hover:text-accent">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <span className="label text-foreground/45">Profession</span>
          <span className="font-display text-[13px] tracking-tight uppercase text-foreground">
            Designer &amp; Developer
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 px-4 pb-4">
          <span className="label text-foreground/45">Location</span>
          <span className="font-display text-[13px] tracking-tight uppercase text-foreground">
            Prague, Czechia
          </span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ s, first }) {
  return (
    <div className={`border-b border-r border-border bg-card ${first ? "border-t-[3px] border-t-accent" : ""}`}>
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="label text-foreground/45">{s.k}</span>
          <span className="font-display text-[13px] tracking-tight uppercase text-foreground">
            {s.label}
          </span>
        </div>
        <span className="flex gap-[3px]">
          <span className="h-[5px] w-[5px] bg-foreground/20" />
          <span className="h-[5px] w-[5px] bg-foreground/20" />
          <span className="h-[5px] w-[5px] bg-accent" />
        </span>
      </div>
      <div className="px-5 pt-8 pb-10">
        <p className="font-display text-[44px] leading-none font-medium tracking-[-0.03em] text-foreground md:text-[56px]">
          {s.value}
        </p>
        <p className="mt-5 max-w-[30ch] font-display text-[14px] leading-[1.45] text-foreground/55">
          {s.d}
        </p>
      </div>
    </div>
  );
}

/** Word-by-word reveal driven by scroll progress across the paragraph. */
function useScrollProgress() {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.8 - r.top) / (r.height + vh * 0.3);
      setP(Math.min(1, Math.max(0, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress: p };
}

export default function About() {
  const { ref: textRef, progress } = useScrollProgress();
  const { ref: gridRef, progress: gridProgress } = useScrollProgress();

  const revealed = Math.round(progress * missionWords.length * 1.15);

  return (
    <section id="about" className="relative bg-background px-6 py-16 md:py-24 lg:px-10">
      <GuideLines />

      <div className="relative z-10 grid gap-12 lg:grid-cols-4 lg:gap-0">
        {/* Left column — sticky while the right column scrolls */}
        <div className="lg:col-span-1 lg:pr-8">
          <div className="lg:sticky lg:top-10">
            <ProfileCard />
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between gap-6">
            <SectionLabel index="01" title="My Mission" />
            <span className="label text-foreground/45">©2019—2026</span>
          </div>

          <div className="mt-8 h-px w-full bg-accent/70" />

          <p
            ref={textRef}
            className="mt-10 font-display text-[7.2vw] leading-[1.06] tracking-[-0.02em] text-foreground md:text-[3.4vw]"
          >
            {missionWords.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="transition-opacity duration-300 ease-out"
                style={{ opacity: i < revealed ? 1 : 0.2 }}
              >
                {w}{" "}
              </span>
            ))}
          </p>

          {/* Stat grid — right sub-column sits lower and moves faster */}
          <div ref={gridRef} className="mt-16 grid gap-0 sm:grid-cols-2">
            <div
              className="will-change-transform"
              style={{ transform: `translateY(${(1 - gridProgress) * -30}px)` }}
            >
              <StatCard s={stats[0]} first />
              <StatCard s={stats[1]} />
            </div>
            <div
              className="mt-0 will-change-transform sm:mt-24"
              style={{ transform: `translateY(${(1 - gridProgress) * -90}px)` }}
            >
              <StatCard s={stats[2]} first />
              <StatCard s={stats[3]} />
            </div>
          </div>

          <div className="mt-24">
            <SectionLabel index="02" title="Portfolio" />
            <h2 className="mt-8 font-display text-[13vw] leading-[0.92] font-medium tracking-[-0.04em] text-foreground md:text-[6.4vw]">
              <span className="text-foreground/45">Case</span>
              <br />
              Studies.
            </h2>
            <p className="mt-8 max-w-[46ch] font-display text-[15px] leading-[1.4] tracking-tight uppercase text-foreground/50">
              <span className="text-foreground">Each project shows how I approach</span> design,
              structure, and development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}