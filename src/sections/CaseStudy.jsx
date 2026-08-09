import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import caseImage from "../assets/work-ikigai.webp";
import emmaImg from "../assets/client-emma.webp";

/**
 * Case Study — dark inverse section.
 *
 * Same GuideLines implementation (px-8 lg:px-12 + grid-cols-4 hairlines)
 * as Hero/About/Portfolio/Process/Testimonials, using the shared
 * `--color-border` token (rgba(cream, 12%)) since this section sits on
 * the site's base dark surface (bg-background) rather than the paper
 * surface used by About/Stats.
 */
function GuideLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 px-8 lg:px-12">
      <div className="relative h-full">
        <span className="absolute inset-y-0 left-0 block w-px origin-left scale-x-50 bg-border" />

        <div
          className="grid h-full grid-cols-4"
          style={{ gridTemplateRows: "100%" }}
        >
          <span
            className="hidden h-full w-px origin-left scale-x-50 bg-border lg:block"
            style={{ gridColumnStart: 2, justifySelf: "start" }}
          />
          <span
            className="hidden h-full w-px origin-left scale-x-50 bg-border md:block"
            style={{ gridColumnStart: 3, justifySelf: "start" }}
          />
          <span
            className="hidden h-full w-px origin-left scale-x-50 bg-border lg:block"
            style={{ gridColumnStart: 4, justifySelf: "start" }}
          />
        </div>

        <span className="absolute inset-y-0 right-0 block w-px origin-right scale-x-50 bg-border" />
      </div>
    </div>
  );
}

/** Same eyebrow as the other sections, inverse colours. */
function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
      <span className="label text-muted-foreground">{index}</span>
      <span className="label text-foreground">{title}</span>
    </div>
  );
}

/** Reveal-on-scroll, identical pattern to Testimonials/Portfolio. */
function useInView(threshold = 0.4) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/**
 * Word-by-word quote reveal. Words up to `solidCount` stay white, the
 * rest render in the muted token — matching the Framer markup where the
 * tail of the quote is wrapped in the 60% white colour token.
 */
function QuoteReveal({ text, solidCount }) {
  const { ref, seen } = useInView(0.3);
  const words = text.split(" ");

  return (
    <h2
      ref={ref}
      className="font-heading-sans text-[28px] md:text-[34px] lg:text-[28px] max-w-[20ch] leading-[1.15] tracking-[-0.03em]"
    >
      {words.map((w, i) => (
        <span
          key={i}
          className={`inline-block transition-opacity duration-500 ease-out ${
            i < solidCount ? "text-white" : "text-white/70"
          }`}
          style={{ opacity: seen ? 1 : 0, transitionDelay: `${i * 35}ms` }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </h2>
  );
}

/**
 * Fade-up reveal wrapper, same easing/duration/translate distance used
 * by Testimonials/Portfolio for their card and button reveals. Wraps
 * the author row (avatar/name + See Project button) so it animates in
 * on scroll the same way those sections' CTAs do, instead of just
 * appearing statically.
 */
function FadeUp({ children, className = "", delayMs = 0 }) {
  const { ref, seen } = useInView(0.4);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Counts up to the stat value once the stat scrolls into view.
    Font bump (1.8rem) now applies from mobile up, matching tablet -
    lg: still resets to the original responsive clamp for desktop. */
function StatValue({ value }) {
  const { ref, seen } = useInView(0.6);
  const [n, setN] = useState(0);
  const target = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!seen) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / 900, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, target]);

  return (
    <p
      ref={ref}
      className="font-heading-sans text-[1.8rem] lg:text-[clamp(1.6rem,2.2vw,1.9rem)] leading-none font-medium tracking-[-0.03em] text-white"
    >
      {n}
      {suffix}
    </p>
  );
}

function Stat({ value, label, body }) {
  return (
    <div className="relative pt-2 pl-0 md:pt-2 lg:pt-2">
      <span className="mb-7 block h-[7px] w-[7px] bg-accent lg:mb-4" />
      <StatValue value={value} />
      <p className="label mt-4 text-muted-foreground text-[12px] md:text-[11px] lg:text-[10px]">{label}</p>
      <p className="font-heading-sans mt-5 max-w-[38ch] lg:max-w-[26ch] md:max-w-[38ch] text-[15px] leading-[1.7] text-white lg:text-[14px] lg:leading-[1.5]">
        {body}
      </p>
    </div>
  );
}

/** "Ikigai Labs" lockup — pill mark + wordmark, same mark set as ClientStrip. */
function IkigaiLockup() {
  return (
    <div className="flex items-center gap-3 text-foreground">
      <svg
        viewBox="0 0 24 24"
        className="h-[22px] w-[22px] shrink-0"
        aria-hidden="true"
      >
        <rect
          x="1.5"
          y="7.5"
          width="21"
          height="9"
          rx="4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
      </svg>
      <span className="font-heading-sans text-[26px] leading-none font-semibold tracking-[-0.02em]">
        Ikigai Labs
      </span>
    </div>
  );
}

/**
 * See Project CTA — same vertical text-swap reveal as Services'
 * BookACall: the label is a fixed-height overflow-hidden window with
 * two stacked copies of the text; on hover both slide up by their own
 * height in lockstep, so the current copy exits the top edge at the
 * exact moment the duplicate copy (sitting directly below, via
 * `top-full`) arrives to replace it — a seamless vertical swap rather
 * than a simple fade or the previous arrow-nudge-only treatment.
 */
function SeeProjectCta() {
  return (
    <a
      href="/portfolio/ikigai"
      className="group hidden items-center gap-0 self-center justify-self-start text-foreground md:inline-flex"
    >
      <span className="label relative block h-[11px] overflow-hidden pr-3">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          See Project
        </span>
        <span className="absolute inset-x-0 top-full block pr-3 transition-transform duration-400 ease-out group-hover:-translate-y-full">
          See Project
        </span>
      </span>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-accent">
        <ChevronRight className="h-[14px] w-[14px] text-primary" strokeWidth={1.5} />
      </span>
    </a>
  );
}

export default function CaseStudy() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#161616] py-5 md:py-20 md:pb-10 lg:pb-0 lg:py-5"
      aria-labelledby="case-study-quote"
    >
      <GuideLines />

      {/*
        Explicit 4-column grid carrying the SAME px-8/lg:px-12 padding as
        GuideLines. This is what guarantees exact alignment - with the
        padding applied here too, this grid's quarter-column boundaries
        are computed by the exact same math as GuideLines' interior
        lines, so column 1 starts on guide line 1, the col2/col3 seam
        sits on guide line 2, col-span-2/col-start-3 sits on guide line 3,
        and so on.
        The photo panel below cancels this padding on its own edges
        (-mx-8 / lg:mr-[-3rem]) so it still bleeds to the true page edge
        past guide line 5, exactly as before.
        No forced viewport-height sizing here anymore - the section just
        takes whatever height its content needs, with py-5/md:py-20/lg:py-5
        giving it margin above and below at each breakpoint (desktop
        padding is handled by the copy panel's own lg:py-16 instead).
      */}
      <div className="relative z-30 grid grid-cols-1 px-8 lg:grid-cols-4 lg:px-12">
        {/* Media panel - first on mobile/tablet, right column on desktop.
            order-first here so the photo actually renders above the
            copy panel below lg; lg:order-none returns both to source
            order for the desktop grid placement via col-start/row-start.
            -mx-8/lg:mr-[-3rem] cancel the grid's own padding on this
            item's edges so it still bleeds full-width on mobile and to
            the true right edge on desktop. lg:h-auto lg:min-h-0 lg:-my-5
            let it stretch to match the copy panel's row height and bleed
            past the section's own lg:py-5 padding on both edges, so the
            photo runs from the very top to the very bottom of the
            section on desktop.
            h-[45vh] min-h-0 gives every width below lg a fixed 45% of
            viewport height. The negative top margin that bleeds the
            photo up to the section's true top edge has to match the
            section's OWN padding at each breakpoint, not a single flat
            value - the section is py-5 (1.25rem) on mobile but md:py-20
            (5rem) on tablet, so the bleed is now split the same way:
            -mt-5 on mobile, md:-mt-20 on tablet. (Previously this was a
            single unprefixed -mt-20, which matched tablet's padding but
            way overshot mobile's smaller py-5, collapsing the space
            below the photo and swallowing the copy panel / CTA row on
            mobile only.) lg:mt-0 still resets it at desktop. */}
        <a
          href="/portfolio/ikigai"
          className="group relative order-first -mx-8 block h-[50vh] min-h-0 -mt-5 overflow-hidden md:h-[45vh] md:-mt-20 lg:order-none lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:ml-0 lg:mr-[-3rem] lg:h-auto lg:min-h-0 lg:-my-5 lg:mt-0"
        >
          <img
            src={caseImage}
            alt="Ikigai Labs case study portrait"
            width={1024}
            height={1280}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
          {/* Overlay over the media */}
          <div className="absolute inset-0 bg-background/25" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IkigaiLockup />
          </div>
        </a>

        {/* Copy panel - columns 1-2 (guide line 1 to guide line 3). No
            horizontal padding of its own - the outer grid's px-8/lg:px-12
            handles that, using the exact same math GuideLines uses, so
            this panel's content box starts precisely on guide line 1 and
            its own midpoint (where the stats grid splits below) lands
            precisely on guide line 2.
            Back to plain top/bottom padding (py-14/lg:py-16) and normal
            mt-* spacing between children - no forced full-height or
            centering, since the section is no longer pinned to the
            viewport. */}
        <div className="relative order-last flex flex-col py-14 lg:order-none lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:py-16">
          <div className="order-1">
            <SectionLabel index="06" title="Case Study" />
          </div>

          <div className="order-2 mt-10 lg:mt-10">
            <QuoteReveal
              text="“A clearer structure helped users understand the product faster and move through the site with more confidence.”"
              solidCount={9}
            />
            <svg
              viewBox="0 0 40 30"
              aria-hidden="true"
              className="mt-10 h-[26px] w-[26px] text-accent"
            >
              <path
                d="M0 30 6 0h10L12 30zM22 30 28 0h10l-4 30z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Author row - before stats on mobile, after stats on desktop.
              Wrapped in FadeUp so it animates in on scroll the same way
              Testimonials/Portfolio animate their CTAs, instead of just
              appearing statically once the section mounts.
              gap-0 (unprefixed) now closes the 2-col grid's gap at every
              width, not just from md up, so the second column (See
              Project) starts exactly at the grid's 50% seam - the same
              point where GuideLines' column-3 hairline renders from
              md up - at every breakpoint, including mobile where that
              hairline itself is hidden but the same 50% alignment still
              applies. */}
          <FadeUp className="order-3 lg:order-4 mt-12 lg:mt-10">
            <div className="grid grid-cols-2 items-center gap-0">
              <div className="flex min-w-0 items-center gap-4">
                <img
                  src={emmaImg}
                  alt="Emma Novak"
                  width={512}
                  height={512}
                  loading="lazy"
                  className="h-[45px] w-[45px] shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="label whitespace-nowrap  text-white text-[12px] md:text-[1rem]">Emma Novak</p>
                  <p className="label mt-[7px] whitespace-nowrap text-muted-foreground text-[10px] md:text-[0.875rem] lg:text-[0.75rem]">
                    Founder at Ikigai Labs
                  </p>
                </div>
              </div>

              <SeeProjectCta />
            </div>
          </FadeUp>

          <div className="order-4 mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:order-3 lg:mt-10 lg:gap-y-6 lg:gap-x-0">
            <Stat
              value="23k"
              label="Impressions"
              body="The website created a stronger first impression and brought more attention to the launch."
            />
            <Stat
              value="42%"
              label="More Inquiries"
              body="Sharper messaging and cleaner page structure helped turn more visitors into project leads."
            />
          </div>
        </div>
      </div>
    </section>
  );
}