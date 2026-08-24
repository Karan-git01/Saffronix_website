import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import anna from "../assets/client-anna.webp";
import david from "../assets/client-david.webp";
import emma from "../assets/client-emma.webp";
import jakub from "../assets/client-jakub.webp";
// TODO: these two files don't exist in /src/assets yet — add them or the
// build will fail on these two imports. Screenshot only shows 4 real
// client photos (anna, david, emma, jakub); Eva and Nora need portraits.
import eva from "../assets/client-emma.webp";
import leap from "../assets/client-jakub.webp";

const ITEMS = [
  {
    name: "Anna Marek",
    role: "Founder at Goodwell",
    brand: "goodwell",
    brandLabel: "Goodwell",
    avatar: anna,
    quote:
      "Hanza understood our vision immediately and turned it into a website that feels sharp, simple, and easy to use. The whole process was clear from start to finish.",
  },
  {
    name: "David Klein",
    role: "CEO at Kintsugi",
    brand: "kintsugi",
    brandLabel: "Kintsugi",
    avatar: david,
    quote:
      "The design direction was exactly what we needed. Clean layouts, smooth interactions, and a Framer build we can actually manage ourselves.",
  },
  {
    name: "Emma Novak",
    role: "Marketing at Galileo",
    brand: "galileo",
    brandLabel: "Galileo",
    avatar: emma,
    quote:
      "Working with Hanza felt effortless. He brought structure to our ideas and delivered a polished website that looks premium on every screen.",
  },
  {
    name: "Jakub Král",
    role: "Founder at Layers",
    brand: "layers",
    brandLabel: "Layers",
    avatar: jakub,
    quote:
      "Hanza brought a clear structure to our ideas and turned them into a website that feels focused, modern, and easy to navigate. The whole process was calm, precise, and very well organized.",
  },
  {
    name: "Eva Bock",
    role: "Founder at Interlock",
    brand: "interlock",
    brandLabel: "Interlock",
    avatar: eva,
    quote:
      "Working with Hanza made the project feel simple from the beginning. He understood what we needed, shaped a strong visual direction, and delivered a Framer website that feels polished on every screen.",
  },
  {
    name: "Nora Lind",
    role: "Founder at Leapyear",
    brand: "leapyear",
    brandLabel: "Leapyear",
    avatar: leap,
    quote:
      "Fast, precise, and highly reliable. The final website gave our brand a much stronger online presence and made our message much easier to understand.",
  },
];

/** Icon color comes from the wrapping div's text-paper-foreground
    (currentColor), same as Testimonials' LogoMark + its parent div. */
function BrandMark({ brand, label }) {
  const svg = "h-[15px] w-[15px] shrink-0";
  const marks = {
    goodwell: (
      <svg viewBox="0 0 24 24" className={svg} aria-hidden="true">
        <circle cx="12" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M16.5 9v9a4.5 4.5 0 0 1-7.6 3.2" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
    galileo: (
      <svg viewBox="0 0 24 24" className={svg} aria-hidden="true">
        <ellipse cx="10" cy="12" rx="5" ry="9" fill="currentColor" />
        <ellipse cx="15" cy="12" rx="5" ry="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    kintsugi: (
      <svg viewBox="0 0 24 24" className={svg} aria-hidden="true">
        <path
          d="M12 1l2.3 6.1L20.5 4l-3.1 6.2 6.1 2.3-6.1 2.3 3.1 6.2-6.2-3.1L12 24l-2.3-6.1L3.5 21l3.1-6.2L.5 12.5l6.1-2.3L3.5 4l6.2 3.1z"
          fill="currentColor"
        />
      </svg>
    ),
    layers: (
      <svg viewBox="0 0 24 24" className={svg} aria-hidden="true">
        <path d="M12 2 2 8l10 6 10-6-10-6Z" fill="currentColor" />
        <path d="M2 14l10 6 10-6" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    interlock: (
      <svg viewBox="0 0 24 24" className={svg} aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M7 15 17 7" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    leapyear: (
      <svg viewBox="0 0 24 24" className={svg} aria-hidden="true">
        <path d="M2 18c6-1 10-5 12-12l2 6 6-3c-4 8-11 12-20 9Z" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <div className="flex shrink-0 items-center gap-2 text-paper-foreground">
      {marks[brand]}
      <span className="font-heading-sans text-[17px] font-semibold tracking-tight text-paper-foreground">
        {label}
      </span>
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

/** Reveal-on-scroll: fires once an element crosses 40% into view. */
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

/**
 * Scroll-linked column parallax. Deliberately does NOT use React state
 * for the per-tick value — Testimonials' original useScrollProgress
 * pattern called setState on every 'scroll' event, which forces a full
 * React re-render each tick. Scroll fires far more often than React can
 * commit, so the transform visibly lags and snaps between renders
 * instead of gliding — that's the "stepping" feel.
 *
 * Instead: one scroll listener, throttled to one update per animation
 * frame via requestAnimationFrame, writes `transform` straight to each
 * column's DOM node through a ref. No setState, no re-render, so the
 * paint happens as often as the browser can manage — smooth regardless
 * of how fast scroll events fire. A continuous rAF loop also lerps the
 * visible progress toward the scroll-derived target instead of snapping
 * straight to it, so the motion glides instead of feeling rigidly
 * welded to the scrollbar.
 *
 * `offsets` is an array of pixel magnitudes, one per column, matching
 * Testimonials' own -30 (flush column) / -110 (offset columns) values.
 * Reused for both the desktop 3-column layout and the tablet 2-column
 * layout — each gets its own instance of this hook with its own
 * container/columns/offsets, gated to its own breakpoint.
 */
function useParallaxColumns(offsets, enabled) {
  const containerRef = useRef(null);
  const colRefs = useRef([]);
  const colRefCallbacks = useRef({});
  const rafRef = useRef(null);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    let running = true;

    // Recompute where the scroll SHOULD be (the target). Cheap — just a
    // bounding-rect read, no writes — so it's safe to call straight from
    // the scroll/resize listeners without its own rAF gate.
    const computeTarget = () => {
      const r = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.8 - r.top) / (r.height + vh * 0.3);
      targetProgressRef.current = Math.min(1, Math.max(0, raw));
    };

    // Runs every animation frame regardless of scroll events firing.
    // Eases the visible progress toward the target instead of snapping
    // straight to it — same idea as Lenis/GSAP ScrollTrigger's "scrub"
    // smoothing. This is what makes the motion glide instead of feeling
    // rigidly welded to the scrollbar.
    const SMOOTHING = 0.12; // 0–1: lower = smoother/laggier, higher = snappier
    const tick = () => {
      if (!running) return;
      smoothProgressRef.current +=
        (targetProgressRef.current - smoothProgressRef.current) * SMOOTHING;
      const progress = smoothProgressRef.current;
      colRefs.current.forEach((el, i) => {
        if (!el) return;
        const offset = offsets[i] ?? 0;
        el.style.transform = `translateY(${(1 - progress) * offset}px)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    computeTarget();
    smoothProgressRef.current = targetProgressRef.current; // no snap-in on load
    window.addEventListener("scroll", computeTarget, { passive: true });
    window.addEventListener("resize", computeTarget);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener("scroll", computeTarget);
      window.removeEventListener("resize", computeTarget);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, offsets]);

  const setColRef = (i) => {
    // Cache one stable callback per column index. Returning a fresh
    // arrow function on every render (the old version) gives ref={...}
    // a new function identity each time ClientStories re-renders, which
    // makes React null out and reattach that column's ref. A cached
    // callback per index has a stable identity, so React attaches it
    // once and leaves it alone.
    if (!colRefCallbacks.current[i]) {
      colRefCallbacks.current[i] = (el) => {
        colRefs.current[i] = el;
      };
    }
    return colRefCallbacks.current[i];
  };

  return { containerRef, setColRef };
}

/** Gated to the lg breakpoint, where the 3-column parallax layout
    kicks in — same role as Testimonials' useIsTabletUp. */
function useIsDesktop() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return ok;
}

/** Gated to exactly the tablet range — matches the "hidden md:block
    lg:hidden" wrapper below, so this hook's parallax and the desktop
    hook's parallax are never both enabled at once. */
function useIsTablet() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (max-width: 1023.98px)");
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return ok;
}

/** Pixel magnitudes for the three desktop columns, in order: flush
    column first, then the two staggered/offset columns. Defined once
    outside the component so the array reference is stable across
    renders (useParallaxColumns' effect depends on it). */
const PARALLAX_OFFSETS = [-30, -110, -170];

/** Two-column version for the tablet layout — same magnitudes as
    desktop's flush/first-offset columns. */
const TABLET_PARALLAX_OFFSETS = [-30, -110];

/**
 * Card: unchanged shape from Testimonials' own card — px-10 pt-7 around
 * the avatar/brand/name/role, px-10 pt-20 pb-8 around Stars/quote.
 * border-b border-paper-border always; border-t-[3px] border-t-accent
 * only on the first card of each column (`first` prop). No horizontal
 * padding lives outside this component — the column wrappers below add
 * none, so this card's own edges (including the accent top border) sit
 * exactly on the grid boundary / guideline instead of being inset by a
 * wrapper padding.
 */
function Card({ item, first }) {
  return (
    <article
      className={`border-b border-paper-border bg-paper ${first ? "border-t-[3px] border-t-accent" : ""}`}
    >
      <div className="px-10 pt-7">
        <div className="flex items-start justify-between gap-4">
          <img
            src={item.avatar}
            alt={item.name}
            width={512}
            height={512}
            loading="lazy"
            className="h-[52px] w-[52px] shrink-0 object-cover"
          />
          <BrandMark brand={item.brand} label={item.brandLabel} />
        </div>

        <p className="mt-5 uppercase font-heading-sans text-[17px] leading-none font-medium tracking-tight text-paper-foreground whitespace-nowrap">
          {item.name}
        </p>
        <p className="label mt-2 whitespace-nowrap text-paper-muted">{item.role}</p>
      </div>

      <div className="px-10 pt-20 pb-8">
        <Stars />
        <p className="mt-8 font-heading-sans text-[15px] leading-[1.45] text-paper-foreground md:text-[20px]">
          {item.quote}
        </p>
      </div>
    </article>
  );
}

/**
 * Header now renders as its own full-width block ABOVE the card grid at
 * every breakpoint (mobile already worked this way) instead of being
 * nested inside one specific card column on tablet/desktop. That's what
 * put every card — including column 1's — into one shared grid below a
 * single header, matching the reference screenshots, instead of column
 * 2 being a mixed header+cards column while columns 1/3 were "pure"
 * card columns.
 */
function Header() {
  return (
    <div className="px-2 pt-2 pb-10 text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
        <span className="label text-paper-muted">03</span>
        <span className="label text-paper-foreground">Testimonials</span>
      </div>

      <h2 className="uppercase mt-10 md:mt-16 font-heading-sans text-[9vw] leading-[0.95] font-medium tracking-[-0.04em] md:text-[6vw] lg:text-[5vw]">
        <span className="text-paper-muted">Client</span>
        <br />
        Stories.
      </h2>

      <p className="mx-auto uppercase mt-6 md:mt-10 max-w-[34ch] font-heading-sans text-[15px] leading-[1.5] md:text-[1.1rem] text-black">
        A few words from{" "}
        <span className="text-paper-foreground">founders, studios, and brands</span>{" "}
        I've helped.
      </p>
    </div>
  );
}

/** Matches Testimonials' RatingCluster: the animated dot cluster (5
    small squares that scale/fade in on scroll, staggered via
    transitionDelay), avatar sizing/attrs, and the text-xsm "Trusted by"
    line. Right-aligned (text-right, faces on the right) is this file's
    own arrangement for its column placement. */
function TrustBadge() {
  const faces = [anna, emma, eva];
  const { ref: dotsRef, seen } = useInView();

  return (
    <div className="flex items-center justify-end gap-4 pt-6 pb-1">
      <div className="text-right">
        <div className="flex items-center justify-end gap-3">
          <p className="font-heading-sans text-[15px] font-medium tracking-tight text-paper-foreground">
            4.92<span className="text-paper-muted">/5</span>
          </p>
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
        <p className="label mt-2 text-xsm whitespace-nowrap text-paper-muted">
          Trusted by{" "}
          <span className="text-paper-foreground">122+ Founders</span>
        </p>
      </div>

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
    </div>
  );
}

/** Edges always visible; interior dividers match the column count at
    each breakpoint — none on mobile, one at the midpoint on tablet, two
    at the thirds on desktop. The grids below render at gap-0 so their
    column boundaries land exactly on these lines — a non-zero gap, or
    horizontal padding on a column wrapper, is what was pulling card
    edges (and the accent border) away from the guideline before. */
function GuideLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 px-8 lg:px-12">
      <div className="relative h-full">
        <span className="absolute inset-y-0 left-0 block w-px origin-left scale-x-50 bg-paper-line" />
        <span className="absolute inset-y-0 left-1/2 hidden w-px origin-left scale-x-50 bg-paper-line md:block lg:hidden" />
        <span className="absolute inset-y-0 left-1/3 hidden w-px origin-left scale-x-50 bg-paper-line lg:block" />
        <span className="absolute inset-y-0 left-2/3 hidden w-px origin-left scale-x-50 bg-paper-line lg:block" />
        <span className="absolute inset-y-0 right-0 block w-px origin-right scale-x-50 bg-paper-line" />
      </div>
    </div>
  );
}

export default function ClientStories() {
  const [a, b, c, d, e, f] = ITEMS;
  const parallax = useIsDesktop();
  const { containerRef, setColRef } = useParallaxColumns(PARALLAX_OFFSETS, parallax);
  const tabletParallax = useIsTablet();
  const { containerRef: tabletContainerRef, setColRef: setTabletColRef } =
    useParallaxColumns(TABLET_PARALLAX_OFFSETS, tabletParallax);

  return (
    <section
      className="relative isolate overflow-hidden bg-paper text-paper-foreground"
      aria-labelledby="client-stories"
    >
      <GuideLines />
      <div className="relative z-10 px-8 py-16 md:py-24 lg:px-12">
        {/* ---------- Mobile: header full-width, then a single stacked
            column — all cards already share this one column. ---------- */}
        <div className="md:hidden">
          <Header />
          <div className="space-y-10 pt-2">
            {ITEMS.map((it, i) => (
              <Card key={it.name} item={it} first={i === 0} />
            ))}
          </div>
        </div>

        {/* ---------- Tablet: header full-width above BOTH columns (moved
            out of column 2, matching the reference), then one grid
            holding all 6 cards. gap-0 so the shared boundary lands
            exactly on the left-1/2 guideline; md:border-r reinforces it.
            Column 1 is flush/unoffset right under the header (as in the
            reference); column 2 is staggered down by md:mt-[7rem].
            tabletContainerRef/setTabletColRef drive the same rAF-eased
            scroll parallax as desktop, scoped to its own breakpoint via
            useIsTablet so it never runs at the same time as the desktop
            instance. ---------- */}
        <div className="hidden md:block lg:hidden">
          <Header />
          <div ref={tabletContainerRef} className="grid grid-cols-2 gap-0 pt-14">
            <div
              ref={setTabletColRef(0)}
              className="space-y-10 md:border-r md:border-paper-border"
            >
              <Card item={a} first />
              <Card item={c} />
              <Card item={e} />
            </div>
            <div ref={setTabletColRef(1)} className="space-y-10 md:mt-[10rem]">
              <Card item={b} first />
              <Card item={d} />
              <Card item={f} />
            </div>
          </div>
        </div>

        {/* ---------- Desktop: header full-width above ALL THREE columns
            (moved out of column 2), then one grid holding all 6 cards —
            this is the "one container" fix: every card now shares a
            single grid instead of column 2 mixing header content in with
            cards. gap-0 so all three column boundaries sit exactly on
            the left-1/3 / left-2/3 guidelines; border-r on columns 1–2
            reinforces those boundaries. Column 1 is flush/unoffset
            (matches the reference and matches tablet's column 1);
            columns 2 and 3 are staggered DOWN by increasing amounts
            (staircase). containerRef/setColRef come from
            useParallaxColumns, which writes each column's transform
            straight to the DOM on scroll (rAF-eased) instead of driving
            it through React state — no re-render per scroll tick, so
            the parallax stays smooth. Column offsets are
            PARALLAX_OFFSETS: -30 / -110 / -170, each column moving at
            its own distinct speed. TrustBadge sits right above column
            3's own cards purely from that shared offset. ---------- */}
        <div className="hidden lg:block">
          <Header />
          <div ref={containerRef} className="grid grid-cols-3 gap-0 pt-16">
            <div
              ref={setColRef(0)}
              className="space-y-12 border-r border-paper-border"
            >
              <Card item={a} first />
              <Card item={c} />
            </div>
            <div
              ref={setColRef(1)}
              className="space-y-12 border-r border-paper-border lg:mt-[12rem]"
            >
              <Card item={b} first />
              <Card item={d} />
            </div>
            <div
              ref={setColRef(2)}
              className="space-y-12 lg:mt-[16rem]"
            >
              <TrustBadge />
              <Card item={f} first />
              <Card item={e} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}