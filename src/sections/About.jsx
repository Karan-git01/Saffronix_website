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
    " "
  );

/** Five vertical guides: 1–2 hold the left column, 3–5 hold the right column. */
function GuideLines() {
  const visibility = [
    "block",
    "hidden lg:block",
    "hidden lg:block",
    "hidden lg:block",
    "block",
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex justify-between px-6 lg:px-10">
      {visibility.map((v, i) => (
        <span key={i} className={`w-px bg-paper-line ${v}`} />
      ))}
    </div>
  );
}

function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
      <span className="label text-paper-muted">{index}</span>
      <span className="label text-paper-foreground">{title}</span>
    </div>
  );
}

function GetInTouch() {
  return (
    <a
      href="#contact"
      className="group flex h-12 w-full items-center overflow-hidden bg-ink text-primary"
    >
      <span className="flex h-12 w-0 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out group-hover:w-12">
        <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
      </span>
      <span className="label relative block flex-1 overflow-hidden px-4 whitespace-nowrap">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Get in Touch <span className="opacity-60">/Saffronix</span>
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

      <div className="border-x border-b border-paper-border bg-paper">
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
            <span className="truncate font-heading-sans text-[15px] font-medium tracking-tight text-paper-foreground">
              Saffronix Studio
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-paper-muted">
            {["Fr", "X", "Db", "Ig"].map((s) => (
              <span key={s} className="label transition-colors hover:text-accent">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-paper-border px-4 py-3">
          <span className="label text-paper-muted">Profession</span>
          <span className="font-heading-sans text-[13px] tracking-tight text-paper-foreground uppercase">
            Designer &amp; Developer
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 px-4 pb-4">
          <span className="label text-paper-muted">Location</span>
          <span className="font-heading-sans text-[13px] tracking-tight text-paper-foreground uppercase">
            Prague, Czechia
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * `isLast` (only true for stats[3]) drops the bottom border on mobile,
 * where the grid is a single column — that border was drawing a
 * full-width line at the very bottom of the About section, which
 * reads as a line at the top of the Portfolio section right after it
 * (Portfolio has no top padding, so it sits flush against it). From
 * md: up the 2-column grid still closes with this border as before —
 * only the mobile single-column case is affected.
 */
function StatCard({ s, first, isLast = false }) {
  return (
    <div
      className={`border-paper-border bg-paper md:border-r md:border-b ${
        isLast ? "border-b-0" : "border-b"
      } ${first ? "border-t-[3px] border-t-accent" : ""}`}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="label text-paper-muted">{s.k}</span>
          <span className="font-heading-sans text-[13px] tracking-tight text-paper-foreground uppercase">
            {s.label}
          </span>
        </div>
        <span className="flex gap-[3px]">
          <span className="h-[5px] w-[5px] bg-paper-foreground/12" />
          <span className="h-[5px] w-[5px] bg-paper-foreground/12" />
          <span className="h-[5px] w-[5px] bg-accent" />
        </span>
      </div>
      <div className="px-5 pt-8 pb-10">
        <p className="font-heading-sans text-[44px] leading-none font-medium tracking-[-0.03em] text-paper-foreground md:text-[64px]">
          {s.value}
        </p>
        <p className="mt-5 max-w-[30ch] font-heading-sans text-[14px] leading-[1.45] text-paper-muted">
          {s.d}
        </p>
      </div>
    </div>
  );
}

/** Scroll progress across an element, 0 → 1. */
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

function useIsDesktopUp() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return ok;
}

export function About() {
  const { ref: textRef, progress } = useScrollProgress();
  const { ref: gridRef, progress: gridProgress } = useScrollProgress();
  const parallax = useIsDesktopUp();

  const revealed = Math.round(progress * missionWords.length * 1.15);

  return (
    <section
      id="about"
      className="relative bg-paper px-6 py-16 text-paper-foreground md:py-24 lg:px-10"
    >
      <GuideLines />

      <div className="relative z-10 grid gap-12 lg:grid-cols-4 lg:gap-0">
        {/* LEFT container — lines 1→2. Hidden on tablet and mobile. */}
        <div className="hidden lg:col-span-1 lg:block">
          <div className="lg:sticky lg:top-15">
            <ProfileCard />
          </div>
        </div>

        {/* RIGHT container — lines 3→5 */}
        <div className="lg:col-span-2 lg:col-start-3">
          {/* 1 — mission */}
          <div>
            <div className="flex items-center justify-between gap-6">
              <SectionLabel index="01" title="My Mission" />
              <span className="label text-paper-muted">©2019—2026</span>
            </div>

            <p
              ref={textRef}
              className="mt-10 font-heading-sans text-[8.4vw] leading-[1.06] font-medium tracking-[-0.02em] md:text-[4vw]"
            >
              {missionWords.map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  className="transition-opacity duration-300 ease-out"
                  style={{ opacity: i < revealed ? 1 : 0.22 }}
                >
                  {w}{" "}
                </span>
              ))}
            </p>
          </div>

          {/* 2 — stat columns: right column starts lower and moves faster */}
          <div
            ref={gridRef}
            className="relative mt-20 grid grid-cols-1 md:mt-32 md:grid-cols-2"
          >
            <span className="pointer-events-none absolute inset-y-0 left-0 z-10 block w-px bg-paper-line" />
            <span className="pointer-events-none absolute inset-y-0 right-0 z-10 block w-px bg-paper-line" />
            <div
              className="will-change-transform"
              style={
                parallax
                  ? { transform: `translateY(${(1 - gridProgress) * -30}px)` }
                  : undefined
              }
            >
              <StatCard s={stats[0]} first />
              <StatCard s={stats[1]} isLast={!parallax} />
            </div>
            <div
              className="will-change-transform md:mt-28"
              style={
                parallax
                  ? { transform: `translateY(${(1 - gridProgress) * -110}px)` }
                  : undefined
              }
            >
              <StatCard s={stats[2]} first={parallax} />
              <StatCard s={stats[3]} isLast />
            </div>
          </div>

          {/* 3 — portfolio */}
          <div className="relative mt-14 md:mt-16">
            <div className="md:w-1/2 md:pr-8">
              <SectionLabel index="02" title="Portfolio" />
              <h2 className="mt-8 font-heading-sans text-[17vw] leading-[0.92] font-medium tracking-[-0.04em] md:text-[7.4vw]">
                <span className="text-paper-muted">Case</span>
                <br />
                Studies.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;