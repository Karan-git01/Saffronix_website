import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import goodwell from "../assets/work-goodwell.webp";
import galileo from "../assets/work-galileo.webp";
import ikigai from "../assets/work-ikigai.webp";

/**
 * client/mark values are pulled 1:1 from ClientStrip's `clients` array
 * so the same LogoMark + name renders identically here. Goodwell and
 * "Ikigai Labs" exist in that list, so those map directly. "Galileo"
 * does NOT appear in ClientStrip's client list (Leapyear, Kintsugi,
 * Interlock, Ikigai Labs, Goodwell, Layers) — there's no canonical
 * name/mark to borrow, so I kept "Galileo" as the display name and
 * assigned it the "rings" mark as a placeholder. Swap `mark` (and
 * `client` if the real name differs) once you tell me which
 * ClientStrip entry it should correspond to.
 */
export const projects = [
  {
    index: "01",
    client: "Goodwell",
    mark: "g",
    year: "2026",
    description: "A calm, editorial website for a wellness brand.",
    services: ["Design", "Development"],
    image: goodwell,
  },
  {
    index: "02",
    client: "Galileo", // TODO: not in ClientStrip's list — confirm name/mark
    mark: "rings",
    year: "2026",
    description:
      "A sharp digital presence for a creative studio, combining bold imagery & minimal layouts.",
    services: ["Design", "Development"],
    image: galileo,
  },
  {
    index: "03",
    client: "Ikigai Labs",
    mark: "pill",
    year: "2026",
    description:
      "A refined website for a modern technology brand, balancing clean storytelling.",
    services: ["Branding", "Development"],
    image: ikigai,
  },
];

const introMuted = "Each project shows how I approach";
const introSolid = "design, structure, and development.";

/**
 * LogoMark — copied as-is from ClientStrip so the icon set (and any
 * future additions there) stays identical between both components.
 */
function LogoMark({ mark }) {
  const common = "h-[22px] w-[22px] shrink-0";
  switch (mark) {
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M6 3h12v12h-5V8H6z" fill="currentColor" />
          <path d="M6 21 18 9v12z" fill="currentColor" opacity="0.9" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            d="M12 1l2.4 6.1L20.5 4l-3.1 6.1L23 12l-5.6 1.9L20.5 20l-6.1-3.1L12 23l-2.4-6.1L3.5 20l3.1-6.1L1 12l5.6-1.9L3.5 4l6.1 3.1z"
            fill="currentColor"
          />
        </svg>
      );
    case "rings":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <circle cx="9.5" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="14.5" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "pill":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <rect x="1.5" y="7.5" width="21" height="9" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        </svg>
      );
    case "g":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <circle cx="12" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M16.5 9v9a4.5 4.5 0 0 1-7.6 3.2" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case "layers":
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M14 2 4 9l1.5 5L16 6z" fill="currentColor" opacity="0.55" />
          <path d="M20 6 8 15l1 6 12-9z" fill="currentColor" />
        </svg>
      );
  }
}

/**
 * Matches ClientStrip's per-item markup: LogoMark + name, same font
 * (font-display), weight (font-bold), tracking (-0.02em) and gap-2
 * spacing. Only the text size/color are adapted to sit on the dark
 * ink panel instead of ClientStrip's white bar — 26px/30px to match
 * the panel's existing type scale, and text-primary since this sits
 * on `bg-ink` rather than `bg-white text-background`.
 */
function ClientMark({ client, mark }) {
  return (
    <div className="flex items-center gap-2 text-primary">
      <LogoMark mark={mark} />
      <span className="font-display text-[26px] font-bold tracking-[-0.02em] whitespace-nowrap md:text-[20px]">
        {client}
      </span>
    </div>
  );
}

/**
 * Rewritten to a real CSS grid (grid-cols-4) instead of flex
 * justify-between. Both use the same math (0/25/50/75/100%), but flex
 * basis rounding and grid track rounding can land on different
 * subpixels at odd viewport widths — that mismatch was what pushed
 * the desktop preview card out of alignment with guide line 1.
 * Sharing the literal grid-cols-4 track definition with the panel
 * content grid below guarantees pixel-identical lines.
 */
export function GuideLines({ tone }) {
  const color = tone === "paper" ? "bg-paper-line" : "bg-primary/[0.07]";
  return (
    <div className="pointer-events-none absolute inset-0 z-0 px-8 lg:px-12">
      <div className="relative h-full">
        {/* Left edge — always visible. Pinned directly to the padded
            box's left edge, independent of the grid below. Previously
            this and the right edge were placed via grid-column +
            justifySelf, which put the right line in an ambiguous shared
            column and made it prone to vanishing — same bug fixed in
            Hero's and About's GuideLines. Pinning both edges outside
            the grid removes that ambiguity entirely.
            scale-x-50 renders each line as a thinner sub-pixel hairline
            — a plain width below 1px (e.g. w-[0.5px]) often just rounds
            back up to a full pixel in most browsers, so scaling the 1px
            box down is the reliable way to get one. */}
        <span className={`absolute inset-y-0 left-0 block w-px origin-left scale-x-50 ${color}`} />

        {/* Interior lines only (no edges here) — grid gives them even
            1/4-width spacing. gridTemplateRows: 100% forces the implicit
            row to fill this absolutely-positioned parent instead of
            collapsing to an auto-sized row. */}
        <div
          className="grid h-full grid-cols-4"
          style={{ gridTemplateRows: "100%" }}
        >
          <span
            className={`hidden h-full w-px origin-left scale-x-50 ${color} lg:block`}
            style={{ gridColumnStart: 2, justifySelf: "start" }}
          />
          <span
            className={`hidden h-full w-px origin-left scale-x-50 ${color} md:block`}
            style={{ gridColumnStart: 3, justifySelf: "start" }}
          />
          <span
            className={`hidden h-full w-px origin-left scale-x-50 ${color} lg:block`}
            style={{ gridColumnStart: 4, justifySelf: "start" }}
          />
        </div>

        {/* Right edge — always visible. Pinned to the box's own right-0,
            same fix as the left edge above. */}
        <span className={`absolute inset-y-0 right-0 block w-px origin-right scale-x-50 ${color}`} />
      </div>
    </div>
  );
}

function SquareDot({ tone = "ink" }) {
  return (
    <span
      className={`block h-[5px] w-[5px] ${tone === "ink" ? "bg-paper-foreground/12" : "bg-primary/25"}`}
    />
  );
}

/* Client/Year label pair (top row): size reduced from
   text-[15px]/md:text-[17px] to text-[12px]/md:text-[14px] per
   request. */
function LabelPair({ k, v }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="label text-primary/60">{k}</span>
      <span className="font-heading-sans text-[12px] font-medium tracking-tight text-primary md:text-[14px]">
        {v}
      </span>
    </div>
  );
}

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function RevealText() {
  const { ref, seen } = useInView();
  let i = 0;
  const render = (text, muted) =>
    text.split(" ").map((word, w) => (
      <span key={`${word}-${w}`} className="mr-[0.28em] inline-block whitespace-nowrap">
        {word.split("").map((ch) => {
          const delay = i++ * 12;
          return (
            <span
              key={delay}
              className={`inline-block transition-[transform,opacity] duration-500 ease-out ${
                muted ? "font-medium text-paper-muted" : "font-semibold text-paper-foreground"
              }`}
              style={{
                transitionDelay: `${delay}ms`,
                opacity: seen ? 1 : 0,
                transform: seen ? "translateY(0)" : "translateY(0.5em)",
              }}
            >
              {ch}
            </span>
          );
        })}
      </span>
    ));

  return (
    <p
      ref={ref}
      className="font-heading-sans text-[3.4vw] leading-[1.24] uppercase tracking-[-0.01em] md:text-[2vw] lg:text-[1.35vw]"
    >
      {/* Each phrase is its own block-level line, so "design, structure,
          and development." always starts on a fresh line on every
          breakpoint instead of only wrapping when it runs out of
          horizontal room. */}
      <span className="block">{render(introMuted, true)}</span>
      <span className="block">{render(introSolid, false)}</span>
    </p>
  );
}

function AllProjectsLink() {
  return (
    <a href="#work" className="group inline-flex items-center gap-4">
      <span className="flex h-9 w-9 items-center justify-center border border-paper-border bg-paper transition-colors group-hover:border-accent">
        <ChevronLeft className="h-4 w-4 text-paper-foreground" strokeWidth={1.5} />
      </span>
      <span className="label relative block overflow-hidden text-paper-foreground">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          All Projects
        </span>
        <span className="absolute inset-x-0 top-0 block translate-y-full transition-transform duration-400 ease-out group-hover:translate-y-0">
          All Projects
        </span>
      </span>
    </a>
  );
}

/** Matches the reference: button sits at 70% of the preview card's width,
    not the full column. */
function ViewProjectButton() {
  return (
    <span className="ml-auto flex h-12 w-[70%] items-center overflow-hidden bg-ink text-primary">
      <span className="flex h-12 w-0 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out group-hover/photo:w-12">
        <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
      </span>
      <span className="label flex-1 px-4 whitespace-nowrap">View Project</span>
      <span className="flex h-12 w-12 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out group-hover/photo:w-0">
        <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
      </span>
    </span>
  );
}

function useParallax() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - r.top) / (r.height + vh);
      setOffset((Math.min(1, Math.max(0, p)) - 0.5) * 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { ref, offset };
}

export function ProjectPanel({ p }) {
  const { ref, offset } = useParallax();

  return (
    <a
      ref={ref}
      href="#work"
      className="group relative block h-[70svh] w-full shrink-0 overflow-hidden bg-ink
                 md:h-[50svh]
                 lg:h-svh"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={p.image}
          alt={`${p.client} project preview`}
          width={1920}
          height={1088}
          loading="lazy"
          className="absolute inset-[-9%_0] h-[118%] w-full object-cover will-change-transform"
          style={{ transform: `translate3d(0, ${offset * -6}%, 0)` }}
        />
      </div>
      <span className="pointer-events-none absolute inset-0 bg-ink/25" />
      <span className="pointer-events-none absolute inset-0 bg-grain opacity-[0.18]" />
      <GuideLines tone="ink" />

      {/* Desktop preview card — its own full-height layer (not nested
          inside the padded/justify-between content flow), so it isn't
          limited to the vertical space between the top and bottom
          rows. It shares GuideLines' exact grid-cols-4 + px-10 track
          and sits in col-start-1/col-end-2, so it now runs the full
          height of the panel with its left edge on guide line 1 and
          its right edge on guide line 2. */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:grid lg:grid-cols-4 lg:px-12 lg:py-14">
        <div className="pointer-events-auto flex h-full flex-col lg:col-start-1 lg:col-end-2">
          {/* h-[93%] + mt-auto: block is 93% of the panel's height,
              anchored to the bottom of the column. The button is no
              longer a separate stacked element below the image — it's
              absolutely positioned over the image itself, pinned to
              its bottom-right corner. */}
          <div className="mt-auto flex flex-col">
            {/* aspect-[3/4] (matches the image's 1050x1400 dimensions)
                replaces the old fixed h-[93%]. Before, height stayed
                pinned to 93% of the panel's fixed svh height while
                width shrank with the grid column as the viewport
                narrowed — so the box got taller and thinner (skewed)
                instead of just scaling down. Locking the aspect ratio
                means width and height now shrink together. */}
            <div className="group/photo relative w-full aspect-[3/4] overflow-hidden">
              <img
                src={p.image}
                alt=""
                width={1050}
                height={1400}
                loading="lazy"
                className="block h-full w-full scale-100 object-cover transition-transform duration-[900ms] ease-out group-hover/photo:scale-[1.05]"
              />
              {/* Full-width wrapper (not just right-0/bottom-0) so the
                  button's w-[70%] resolves against the photo's actual
                  width instead of an undefined auto-width box — that
                  circular sizing was collapsing the button (and its
                  orange bg-accent panels) to ~0 width. */}
              <div className="absolute inset-x-0 bottom-0">
                <ViewProjectButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-8 py-10 lg:px-12 lg:py-14">
        <div className="grid grid-cols-2 items-start gap-4 md:grid-cols-4 md:gap-0">
          <div className="pointer-events-auto flex items-center gap-3">
            <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
            <span className="label text-primary/60">{p.index}</span>
          </div>
          <div className="pointer-events-auto flex flex-col items-end gap-2 md:col-start-3 md:items-start">
            <LabelPair k="Client" v={p.client} />
            <div className="lg:hidden">
              <LabelPair k="Year" v={p.year} />
            </div>
          </div>
          <div className="pointer-events-auto hidden lg:col-start-4 lg:block">
            <LabelPair k="Year" v={p.year} />
          </div>
        </div>

        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-0 lg:grid-cols-4">
          <div className="pointer-events-auto md:col-start-1 md:pr-8 lg:col-start-3">
            <ClientMark client={p.client} mark={p.mark} />
            {/* Gap to description increased mt-6 -> mt-10 per request. */}
            <p className="mt-10 max-w-[34ch] font-heading-sans text-[15px] leading-[1.35] tracking-tight uppercase text-primary/60 md:text-[16px]">
              {p.description}
            </p>
            <div className="mt-6">
              <SquareDot tone="light" />
            </div>
          </div>

          <div className="pointer-events-auto hidden md:col-start-2 md:block lg:col-start-4">
            <div className="font-heading-sans text-[15px] leading-[1.35] tracking-tight uppercase text-primary/60 md:text-[16px]">
              <p>{p.services[0]}</p>
              <p>{p.services[1]}</p>
            </div>
            <div className="mt-6 hidden md:block">
              <SquareDot tone="light" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export function Portfolio() {
  return (
    <section id="work" className="relative bg-paper">
      <div className="relative">
        <div className="hidden lg:block">
          <GuideLines tone="paper" />
        </div>

        {/* Top padding removed (was py-10 / lg:py-12) so there's no
            colored margin band above the section on any breakpoint —
            it now sits flush against whatever precedes it. Bottom
            padding kept so the intro text isn't crammed against the
            panels. */}
        <div className="relative z-10 grid grid-cols-1 items-center gap-8 px-8 pt-0 pb-6 md:grid-cols-2 md:gap-0 lg:grid-cols-4 lg:px-12 lg:pt-0 lg:pb-8">
          <div className="md:col-start-1 lg:col-span-2 lg:col-start-3 lg:order-2">
            <RevealText />
          </div>
          <div className="hidden md:col-start-2 md:flex md:justify-end lg:order-1 lg:col-span-2 lg:col-start-1 lg:block lg:justify-start">
            <AllProjectsLink />
          </div>
        </div>
      </div>

      {projects.map((p) => (
        <ProjectPanel key={p.index} p={p} />
      ))}
    </section>
  );
}

export default Portfolio;