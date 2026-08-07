import { Check, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    n: "01",
    tag: "Plan",
    title: "Project Direction",
    body: "I start by understanding your goals, audience, content, and the role your website needs to play. This gives the project a clear direction before any design work begins.",
  },
  {
    n: "02",
    tag: "Structure",
    title: "Website Blueprint",
    body: "I define the page structure, user flow, and key sections so the website feels easy to navigate. Every part is planned around clarity, hierarchy, and purpose.",
  },
  {
    n: "03",
    tag: "Design",
    title: "Visual System",
    body: "I create a clean visual direction with strong typography, spacing, layout, and interaction ideas. The goal is to make your website feel polished, modern, and aligned with your brand.",
  },
  {
    n: "04",
    tag: "Build",
    title: "Development",
    body: "I turn the design into a responsive Framer website with smooth interactions, clean components, and an easy-to-edit structure. Everything is built to work across desktop, tablet, and mobile.",
  },
  {
    n: "05",
    tag: "Launch",
    title: "Final Polish",
    body: "Before launch, I test the website, refine the details, set up basic SEO, and make sure everything feels ready. After that, your site is prepared to go live with confidence.",
  },
];

/**
 * Pinned edges (left-0 / right-0) + grid-cols-4 interior lines, same
 * pattern as Hero/About/Portfolio. Hairlines use rem instead of the
 * `w-px` utility so they scale with root font size like everything else.
 */
function GuideLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 px-8 lg:px-12">
      <div className="relative h-full">
        <span className="absolute inset-y-0 left-0 block w-[0.0625rem] origin-left scale-x-50 bg-primary/[0.07]" />

        <div className="grid h-full grid-cols-4" style={{ gridTemplateRows: "100%" }}>
          <span
            className="hidden h-full w-[0.0625rem] origin-left scale-x-50 bg-primary/[0.07] lg:block"
            style={{ gridColumnStart: 2, justifySelf: "start" }}
          />
          <span
            className="hidden h-full w-[0.0625rem] origin-left scale-x-50 bg-primary/[0.07] md:block"
            style={{ gridColumnStart: 3, justifySelf: "start" }}
          />
          <span
            className="hidden h-full w-[0.0625rem] origin-left scale-x-50 bg-primary/[0.07] lg:block"
            style={{ gridColumnStart: 4, justifySelf: "start" }}
          />
        </div>

        <span className="absolute inset-y-0 right-0 block w-[0.0625rem] origin-right scale-x-50 bg-primary/[0.07]" />
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[0.4375rem] w-[0.4375rem] shrink-0 bg-accent" />
      <span className="label text-primary">{children}</span>
    </div>
  );
}

function Dots({ active }) {
  return (
    <span className="flex gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`h-[0.375rem] w-[0.375rem] ${i < active ? "bg-accent" : "bg-primary/20"}`}
        />
      ))}
    </span>
  );
}

/** Card bg matches the flat #191919 used across dark sections. Accent top-border marks the first card in each column. */
function StepCard({ step, i, accent }) {
  return (
    <article
      className={`process-card flex flex-col items-start gap-[6rem] border-b border-primary/[0.05] bg-[#191919] p-10 lg:gap-[8.75rem] lg:p-12 ${
        accent ? "border-t-2 border-t-accent" : ""
      }`}
    >
      <div className="flex w-full items-start justify-between gap-4">
        <h3 className="font-heading-sans text-[34px] leading-none font-medium tracking-[-0.03em] text-primary sm:text-[40px]">
          {step.n}
        </h3>
        <span className="pt-3">
          <Dots active={i + 1} />
        </span>
      </div>
      <div className="w-full">
        <Tag>{step.tag}</Tag>
        <h4 className="mt-5 font-heading-sans text-[26px] leading-[1.12] font-medium tracking-[-0.02em] text-primary sm:text-[32px]">
          {step.title}
        </h4>
        <p className="mt-4 font-heading-sans text-[14px] leading-[1.45] text-primary/60">
          {step.body}
        </p>
      </div>
    </article>
  );
}

/** Same #191919-family card language; accent lives only in the top-border and small touches (no filled orange). */
function CtaCard({ accent }) {
  return (
    <div
      className={`process-card process-cta flex flex-col bg-accent ${
        accent ? "border-t-2 border-t-accent" : ""
      }`}
    >
      <div className="flex flex-1 flex-col p-10 lg:p-12">
        <h3 className="font-heading-sans text-[30px] leading-[1.08] font-medium uppercase tracking-[-0.02em] text-primary sm:text-[34px]">
          <span className="text-primary/50">Ready</span>
          <br />
          To Start?
        </h3>
        <p className="mt-4 max-w-[24ch] font-heading-sans text-[14px] leading-[1.45] text-primary/70">
          Tell me about your project, your goals, and where you want the website to go.
        </p>

        <p className="label mt-8 text-primary/70">What you get</p>
        <ul className="mt-4 space-y-3">
          {["Free intro call", "Project fit check", "Clear next steps"].map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span className="grid h-[1.125rem] w-[1.125rem] shrink-0 place-items-center rounded-[0.1875rem] bg-primary/20">
                <Check className="h-3 w-3 text-primary" strokeWidth={2.5} />
              </span>
              <span className="font-heading-sans text-[15px] font-medium text-primary">{t}</span>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group mt-8 flex h-12 w-full items-center overflow-hidden bg-[#161616] text-primary"
        >
          <span className="flex h-12 w-0 shrink-0 items-center justify-center overflow-hidden bg-primary transition-[width] duration-500 ease-out group-hover:w-12">
            <ChevronRight className="h-4 w-4 shrink-0 text-[#161616]" strokeWidth={2} />
          </span>
          <span className="label flex-1 px-5 text-left tracking-[0.14em] whitespace-nowrap">
            Book a call
          </span>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden bg-primary transition-[width] duration-500 ease-out group-hover:w-0">
            <ChevronRight className="h-4 w-4 shrink-0 text-[#161616]" strokeWidth={2} />
          </span>
        </a>
      </div>
    </div>
  );
}

const CTA = { cta: true };
const items = [...steps, CTA];

/** Column distribution per breakpoint (top-to-bottom within each column). */
const COLUMNS = {
  desktop: [
    [0, 3],
    [1, 4],
    [2, 5],
  ],
  tablet: [
    [0, 2, 4],
    [1, 3, 5],
  ],
  mobile: [[0, 1, 2, 3, 4, 5]],
};

/**
 * Static starting offset per column, in rem so it scales with root
 * font size instead of being locked to a pixel count. Column 0 stays
 * at 0; each column to the right starts progressively lower.
 */
const COLUMN_OFFSET_REM = {
  desktop: [0, 9.0625, 18.125], // 0px, 145px, 290px at 16px root
  tablet: [0, 9.6875], // 0px, 155px
  mobile: [0],
};

/** Max parallax travel distance per breakpoint, in rem. */
const PARALLAX_MAX_REM = {
  desktop: 16.25, // 260px
  tablet: 10, // 160px
};

function useBreakpoint() {
  const [bp, setBp] = useState("desktop");
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setBp(w >= 1024 ? "desktop" : w >= 768 ? "tablet" : "mobile");
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return bp;
}

/** N-1 vertical hairlines drawn on top of the cards (z-10) at each column seam. */
function ColumnDividers({ count }) {
  if (count < 2) return null;
  const positions = Array.from({ length: count - 1 }, (_, i) => ((i + 1) / count) * 100);
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {positions.map((pct) => (
        <span
          key={pct}
          className="absolute inset-y-0 w-[0.0625rem] origin-left scale-x-50 bg-primary/[0.07]"
          style={{ left: `${pct}%` }}
        />
      ))}
    </div>
  );
}

export function Process() {
  const bp = useBreakpoint();
  const gridRef = useRef(null);
  const colRefs = useRef([]);
  const cols = COLUMNS[bp];
  const offsets = COLUMN_OFFSET_REM[bp];

  // Parallax: right-hand columns scroll faster than the left one.
  useEffect(() => {
    if (bp === "mobile") {
      colRefs.current.forEach((el) => el && (el.style.transform = ""));
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const grid = gridRef.current;
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      const maxRem = PARALLAX_MAX_REM[bp] ?? PARALLAX_MAX_REM.desktop;
      colRefs.current.forEach((el, i) => {
        if (!el) return;
        const speed = i / Math.max(1, cols.length - 1);
        el.style.transform = `translate3d(0, ${(-p * maxRem * speed).toFixed(3)}rem, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [bp, cols.length]);

  return (
    <section id="home-process" className="relative bg-[#161616] px-8 pt-10 lg:px-12">
      {/* overflow-hidden lives here (not on the section) so it only clips GuideLines,
          leaving the sticky "Process" label below free to use position:sticky. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GuideLines />
      </div>

      {/* lg:gap-0 — must match GuideLines' own grid exactly (also grid-cols-4,
          no gap). Any nonzero gap here shifts these column boundaries away
          from GuideLines' fixed 25/50/75% line positions, which pulls the
          cards out of alignment with the guide lines. */}
      <div className="relative z-10 grid gap-8 lg:grid-cols-4 lg:gap-0">
        {/* Sticky section label — spans both the title/para row and the cards row below. */}
        <div className="lg:col-span-1 lg:row-span-2 lg:sticky lg:top-15 lg:self-start">
          <div className="flex items-center gap-3 lg:mt-3">
            <span className="h-[0.4375rem] w-[0.4375rem] shrink-0 bg-accent" />
            <span className="label text-primary/60">04</span>
            <span className="label text-primary">Process</span>
          </div>
        </div>

        <div className="lg:col-span-3 lg:col-start-2 lg:mb-25">
          <div className="grid gap-2 md:grid-cols-4 md:gap-0 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-2">
              <h2 className="font-heading-sans text-[12vw] leading-[0.95] font-medium uppercase whitespace-nowrap tracking-[-0.04em] md:text-[6vw] lg:text-[5vw] xl:text-[68px]">
                <span className="text-primary/60">5 Steps</span>
                <br />
                <span className="text-primary">to Launch.</span>
              </h2>
            </div>
            <div className="md:col-span-2 md:col-start-3 lg:col-span-1 lg:col-start-3">
              <p className="font-heading-sans text-[14px] mt-8 md:text-[16px] lg:text-[14px] lg:mt-15 leading-[1.5] font-medium tracking-[0.01em] uppercase max-w-[30ch]">
                <span className="text-primary/60">
                  From the first conversation to the final handoff,{" "}
                </span>
                <span className="text-primary">I keep the process simple and clear.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-8 md:mt-24 lg:col-span-3 lg:col-start-2 lg:mt-10">
          <div
            ref={gridRef}
            className="process-grid grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3"
          >
            {cols.map((col, ci) => (
              <div
                key={`${bp}-${ci}`}
                ref={(el) => {
                  colRefs.current[ci] = el;
                }}
                className="process-col flex flex-col gap-4 will-change-transform md:gap-0"
                style={{ marginTop: offsets[ci] ? `${offsets[ci]}rem` : undefined }}
              >
                {col.map((idx, ri) => {
                  const accent = ri === 0;
                  return items[idx].cta ? (
                    <CtaCard key="cta" accent={accent} />
                  ) : (
                    <StepCard key={items[idx].n} step={items[idx]} i={idx} accent={accent} />
                  );
                })}
              </div>
            ))}
          </div>
          <ColumnDividers count={cols.length} />
        </div>
      </div>
    </section>
  );
}

export default Process;