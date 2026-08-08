import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import annaImg from "../assets/client-anna.webp";
import jakubImg from "../assets/client-jakub.webp";
import davidImg from "../assets/client-david.webp";
import emmaImg from "../assets/client-emma.webp";
import avatar1 from "../assets/avatar-1.webp";
import avatar2 from "../assets/avatar-2.webp";
import avatar3 from "../assets/avatar-3.webp";
import avatarCta from "../assets/avatar-cta.webp";

/**
 * mark values are pulled 1:1 from ClientStrip's `clients` array so the
 * same LogoMark renders identically here. Leapyear, Kintsugi, and
 * Goodwell all exist in that list, so those map directly. "Galileo"
 * does NOT appear in ClientStrip's client list (Leapyear, Kintsugi,
 * Interlock, Ikigai Labs, Goodwell, Layers) — there's no canonical
 * mark to borrow, so it's left on the "rings" placeholder (same
 * placeholder used for it in Portfolio). Swap once you tell me which
 * ClientStrip entry it should correspond to.
 */
const testimonials = [
  {
    name: "Anna Marek",
    role: "Founder at Goodwell",
    brand: "Goodwell",
    mark: "g",
    quote:
      "Saffronix understood our vision immediately and turned it into a website that feels sharp, simple, and easy to use. The whole process was clear from start to finish.",
    image: annaImg,
  },
  {
    name: "Jakub Horák",
    role: "CEO at Leapyear",
    brand: "Leapyear",
    mark: "arrow",
    quote:
      "Fast, precise, and highly reliable. The final website gave our brand a much stronger online presence and made our message much easier to understand.",
    image: jakubImg,
  },
  {
    name: "David Klein",
    role: "CEO at Kintsugi",
    brand: "Kintsugi",
    mark: "star",
    quote:
      "The design direction was exactly what we needed. Clean layouts, smooth interactions, and a build we can actually manage ourselves.",
    image: davidImg,
  },
  {
    name: "Emma Novak",
    role: "Marketing at Galileo",
    brand: "Galileo", // TODO: not in ClientStrip's list — confirm mark
    mark: "rings",
    quote:
      "Working with Saffronix felt effortless. He brought structure to our ideas and delivered a polished website that looks premium on every screen.",
    image: emmaImg,
  },
];

/**
 * Rewritten to the same grid-cols-4 + px-8 lg:px-12 implementation used
 * by Hero/About/Portfolio's GuideLines (rather than the old flex
 * justify-between + px-6 lg:px-10 version). flex-basis rounding and
 * grid-track rounding land on different subpixels at odd viewport
 * widths, and the old px-6/lg:px-10 values didn't match the other
 * sections' px-8/lg:px-12 at all — both were pushing Testimonials' lines
 * out of alignment with every section above and below it. Sharing the
 * literal grid-cols-4 track definition and padding guarantees
 * pixel-identical lines across the whole page.
 */
function GuideLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 px-8 lg:px-12">
      <div className="relative h-full">
        {/* Left edge — always visible. Pinned directly to the padded
            box's left edge, independent of the grid below. scale-x-50
            renders it as a thinner sub-pixel line — a plain width below
            1px (e.g. w-[0.5px]) often just rounds back up to a full
            pixel in most browsers, so scaling the 1px box down is the
            reliable way to get a hairline. */}
        <span className="absolute inset-y-0 left-0 block w-px origin-left scale-x-50 bg-paper-line" />

        {/* Interior lines only (no edges here) — grid gives them even
            1/4-width spacing. gridTemplateRows: 100% forces the implicit
            row to fill this absolutely-positioned parent instead of
            collapsing to an auto-sized row. */}
        <div
          className="grid h-full grid-cols-4"
          style={{ gridTemplateRows: "100%" }}
        >
          <span
            className="hidden h-full w-px origin-left scale-x-50 bg-paper-line lg:block"
            style={{ gridColumnStart: 2, justifySelf: "start" }}
          />
          <span
            className="hidden h-full w-px origin-left scale-x-50 bg-paper-line md:block"
            style={{ gridColumnStart: 3, justifySelf: "start" }}
          />
          <span
            className="hidden h-full w-px origin-left scale-x-50 bg-paper-line lg:block"
            style={{ gridColumnStart: 4, justifySelf: "start" }}
          />
        </div>

        {/* Right edge — always visible. Pinned to the box's own right-0,
            same fix as the left edge above. */}
        <span className="absolute inset-y-0 right-0 block w-px origin-right scale-x-50 bg-paper-line" />
      </div>
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

function Stars({ filled = 5, total = 5 }) {
  return (
    <span className="flex items-center gap-[3px]">
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          className={`h-[13px] w-[13px] ${i < filled ? "text-accent" : "text-paper-foreground/12"}`}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

/**
 * LogoMark — copied as-is from ClientStrip so the icon set (and any
 * future additions there) stays identical between both components.
 */
function LogoMark({ mark }) {
  const common = "h-[15px] w-[15px] shrink-0";
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

/** Reveal-on-scroll: fires once an element crosses 40% into view. Same
    pattern used by Portfolio's RevealText / About's scroll reveals. */
function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function RatingCluster() {
  const faces = [avatar1, avatar2, avatar3];
  const { ref: dotsRef, seen } = useInView();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        {faces.map((f, i) => (
          <img
            key={i}
            src={f}
            alt=""
            width={120}
            height={120}
            loading="lazy"
            className={`block h-9 w-9 shrink-0 rounded-full border-[1.5px] border-paper object-cover ${
              i > 0 ? "-ml-3" : ""
            }`}
          />
        ))}
        <span className="label -ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-paper bg-accent text-primary">
          +32
        </span>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <p className="font-heading-sans text-[15px] font-medium tracking-tight text-paper-foreground">
            4.92<span className="text-paper-muted">/5</span>
          </p>
          {/* Dots reveal one-by-one on scroll into view, staggered via
              transitionDelay per index, instead of all appearing at
              once. */}
          <span ref={dotsRef} className="flex gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-[6px] w-[6px] transition-[transform,opacity] duration-400 ease-out ${
                  i < 4 ? "bg-accent" : "bg-paper-foreground/12"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  opacity: seen ? 1 : 0,
                  transform: seen ? "scale(1)" : "scale(0)",
                }}
              />
            ))}
          </span>
        </div>
        {/* whitespace-nowrap: keeps "Trusted by 122+ Founders" on one
            line instead of wrapping at narrow sidebar widths. */}
        <p className="label mt-2 text-xsm whitespace-nowrap text-paper-muted">
          Trusted by{" "}
          <span className="text-paper-foreground">122+ Founders</span>
        </p>
      </div>
    </div>
  );
}

/** Shared with Hero's StartProjectCta — same h-11 height, sliding
    accent arrow boxes, and small avatar treatment. */
function ArrowBox({ className = "" }) {
  return (
    <span
      className={`relative flex h-11 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out ${className}`}
    >
      <ArrowRight className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
    </span>
  );
}

/**
 * Rebuilt to match Hero's StartProjectCta exactly: h-11 (was h-14),
 * a small ml-1 h-9 w-9 avatar (was a full-height h-full w-14 image
 * strip), the same ArrowBox slide-in/out arrows, and the same
 * "label" text treatment with the sliding two-line hover swap.
 */
function StartProject() {
  return (
    <a
      href="#contact"
      className="group flex h-11 w-full items-center overflow-hidden bg-ink text-primary"
    >
      <ArrowBox className="w-0 group-hover:w-11" />
      <span className="ml-1 h-9 w-9 shrink-0 overflow-hidden sm:block">
        <img
          src={avatarCta}
          alt="Portrait of the Saffronix founder"
          width={512}
          height={512}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </span>
      <span className="label relative block min-w-0 flex-1 overflow-hidden px-2 text-[clamp(11px,1vw,15px)] whitespace-nowrap md:px-4">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Start Project{" "}
          <span className="label text-primary/40">/Saffronix</span>
        </span>
        <span className="absolute inset-x-2 top-0 block translate-y-full transition-transform duration-400 ease-out group-hover:translate-y-0 md:inset-x-4">
          Start Project <span className="label text-accent">/Saffronix</span>
        </span>
      </span>
      <ArrowBox className="w-11 group-hover:w-0" />
    </a>
  );
}

/**
 * name/role: added whitespace-nowrap so they always render on one
 * line — the brand block on the right (shrink-0) was squeezing this
 * left block's available width, so at narrower card widths the name
 * and role were wrapping onto a second line.
 * Brand marker: swapped the plain rounded-square dot for the actual
 * ClientStrip LogoMark (matched per-brand via t.mark), same icon set
 * as ClientStrip/Portfolio instead of a generic placeholder shape.
 */
function Card({ t, first }) {
  return (
    <article
      className={`border-b border-paper-border bg-paper ${first ? "border-t-[3px] border-t-accent" : ""}`}
    >
      <div className="flex items-start justify-between gap-6 px-10 pt-7">
        <div className="min-w-0">
          <img
            src={t.image}
            alt={`Portrait of ${t.name}`}
            width={600}
            height={800}
            loading="lazy"
            className="block aspect-[3/4] w-[65px] object-cover"
          />
          <p className="mt-5 uppercase font-heading-sans text-[17px] leading-none font-medium tracking-tight text-paper-foreground whitespace-nowrap">
            {t.name}
          </p>
          <p className="label mt-2 whitespace-nowrap text-paper-muted">{t.role}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-paper-foreground">
          <LogoMark mark={t.mark} />
          <span className="font-heading-sans text-[17px] font-semibold tracking-tight text-paper-foreground">
            {t.brand}
          </span>
        </div>
      </div>
      <div className="px-10 pt-20 pb-8">
        <Stars />
        <p className="mt-8 font-heading-sans text-[15px] leading-[1.45] text-paper-foreground md:text-[20px]">
          {t.quote}
        </p>
      </div>
    </article>
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

function useIsTabletUp() {
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

export function Testimonials() {
  const { ref: gridRef, progress } = useScrollProgress();
  const parallax = useIsTabletUp();

  return (
    <section
      id="testimonials"
      className="relative bg-paper px-8 py-16 text-paper-foreground md:py-24 lg:px-12"
    >
      <GuideLines />

      <div className="relative z-10 grid gap-12 lg:grid-cols-4 lg:gap-0">
        {/* LEFT — lines 1→2, sticky on desktop. top-15 matches the
            sticky offset used by About/Services/Process's own left
            columns, so all the sticky rails stop at the same scroll
            position instead of drifting relative to each other. */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-15">
            <SectionLabel index="05" title="Testimonials" />
            <h2 className="uppercase mt-10 md:mt-16 font-heading-sans text-[9vw] leading-[0.95] font-medium tracking-[-0.04em] md:text-[6vw] lg:text-[5vw]">
              <span className="text-paper-muted">Client</span>
              <br />
              Stories.
            </h2>
            <p className="uppercase mt-6 md:mt-10 max-w-[34ch] font-heading-sans text-[15px] leading-[1.5] md:text-[15px] text-paper-muted">
              A few words from{" "}
              <span className="text-paper-foreground">
                founders, studios, and brands
              </span>{" "}
              I've helped.
            </p>
            <div className="mt-10 md:-mt-30 lg:mt-12 md:ml-[50%] md:w-1/2 lg:ml-0 lg:w-auto">
              <RatingCluster />
            </div>
            <div className="mt-10 max-w-[420px] md:ml-[50%] md:w-1/2 lg:ml-0 lg:w-auto lg:max-w-none">
              <StartProject />
            </div>
          </div>
        </div>

        {/* RIGHT — lines 3→5, two offset columns. md:mt-[9.6875rem]
            matches Process's own tablet-breakpoint second-column offset
            (COLUMN_OFFSET_REM.tablet[1] = 9.6875rem / 155px), replacing
            the previous unrelated md:mt-24 (6rem) value so the two
            sections' staggered-column rhythm reads the same. */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:col-span-2 lg:col-start-3 md:mt-20 lg:mt-20"
        >
          <div
            className="md:border-r md:border-paper-border"
            style={
              parallax
                ? { transform: `translateY(${(1 - progress) * -30}px)` }
                : undefined
            }
          >
            <Card t={testimonials[0]} first />
            <Card t={testimonials[1]} />
          </div>
          <div
            className="md:mt-[9.6875rem]"
            style={
              parallax
                ? { transform: `translateY(${(1 - progress) * -110}px)` }
                : undefined
            }
          >
            <Card t={testimonials[2]} first={parallax} />
            <Card t={testimonials[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;