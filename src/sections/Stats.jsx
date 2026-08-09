import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: "128k",
    label: "Visitors",
    d: "Websites designed to create clear journeys, stronger engagement, and better first impressions.",
  },
  {
    value: "4.2M",
    label: "Impressions",
    d: "Digital experiences seen across launches, campaigns, and brand touchpoints.",
  },
  {
    value: "55+",
    label: "Projects",
    d: "Websites, landing pages, and studio builds created for founders, studios, and modern brands.",
  },
  {
    value: "435k",
    label: "Interactions",
    d: "User moments shaped through clean layouts, smooth motion, and thoughtful interface design.",
  },
];

/**
 * Pinned-edge + grid-cols-4 interior hairline implementation, same as
 * Hero/About/Portfolio/Testimonials' GuideLines. Sharing the literal
 * grid-cols-4 track + px-8 lg:px-12 padding guarantees pixel-identical
 * lines across the whole page. scale-x-50 renders each line as a
 * thinner sub-pixel hairline — a plain width below 1px (e.g.
 * w-[0.5px]) often just rounds back up to a full pixel in most
 * browsers, so scaling the 1px box down is the reliable way to get one.
 */
function GuideLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 px-8 lg:px-12">
      <div className="relative h-full">
        {/* Left edge — always visible. Pinned directly to the padded
            box's left edge, independent of the grid below. */}
        <span className="absolute inset-y-0 left-0 block w-px origin-left scale-x-50 bg-paper-line" />

        {/* Interior lines only (no edges here) — grid gives them even
            1/4-width spacing. gridTemplateRows: 100% forces the implicit
            row to fill this absolutely-positioned parent instead of
            collapsing to an auto-sized row. */}
        <div className="grid h-full grid-cols-4" style={{ gridTemplateRows: "100%" }}>
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

        {/* Right edge — always visible. Pinned to the box's own
            right-0, same fix as the left edge above. */}
        <span className="absolute inset-y-0 right-0 block w-px origin-right scale-x-50 bg-paper-line" />
      </div>
    </div>
  );
}

/** Counts up to the numeric part of a value once the element enters the viewport. */
function useCountUp(value) {
  const ref = useRef(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) return;

    const target = parseFloat(match[1]);
    const suffix = match[2] ?? "";
    const decimals = match[1].includes(".") ? 1 : 0;

    setText(`${(0).toFixed(decimals)}${suffix}`);

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        setText(`${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return { ref, text };
}

/** pr-5 (not px-5): content now starts flush at the guide line on the
    left, with padding only on the right for breathing room before the
    next column's content. */
function StatCell({ s, i }) {
  const { ref, text } = useCountUp(s.value);
  return (
    <div
      className={`pr-20 md:pl-10 py-8 md:py-8 lg:py-20 ${
        i > 0 ? "border-t border-paper-border md:border-t-0" : ""
      }`}
    >
      <p
        ref={ref}
        className="font-heading-sans text-[52px] leading-none font-medium tracking-[-0.03em] text-paper-foreground md:text-[64px]"
      >
        {text}
      </p>
      <div className="mt-5 flex items-center gap-3">
        <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
        <span className="label text-paper-foreground">{s.label}</span>
      </div>
      <p className="mt-5 max-w-[34ch] font-heading-sans text-[15px] leading-[1.55] text-paper-foreground">
        {s.d}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section
      id="stats"
      className="relative border-y border-paper-border bg-paper px-8 py-12 md:py-16 lg:py-0 text-paper-foreground lg:px-12"
    >
      <GuideLines />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatCell key={s.label} s={s} i={i} />
        ))}
      </div>
    </section>
  );
}

export default Stats;