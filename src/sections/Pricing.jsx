import { useEffect, useRef, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import consultImg from "../assets/about-portrait.webp";

/**
 * Pricing — light "paper" section (07).
 *
 * Unchanged from the original: the card grid below is only ever 1 or
 * 3 columns (grid-cols-1 lg:grid-cols-3), so GuideLines still only
 * draws its interior lines at lg (left/right edges + the 1/3 and 2/3
 * marks) - the same breakpoint the card grid itself switches to 3
 * columns. Card 1 sits between guide line 1-2, card 2 between 2-3,
 * card 3 between 3-4. Still uses the same px-8/lg:px-12 padding as
 * every other section's GuideLines so the two edge lines land on the
 * same pixel columns as the rest of the page.
 *
 * There is NO tablet-only line added here anymore: an earlier version
 * added one, but since GuideLines spans the full section height, that
 * line ran straight down through the plan cards and ConsultBanner too.
 * The tablet center line the header now uses lives locally inside the
 * header block instead (see the header markup below), so it's
 * confined to that block's own height and never touches the cards or
 * banner beneath it.
 *
 * z-40 (not the z-20 other sections use): each PlanCard below paints
 * its own opaque bg-paper background, which otherwise sits on top of
 * (and completely hides) the hairline running along its shared edge -
 * the same issue Process.jsx solves by layering its ColumnDividers
 * above the cards instead of below them. Sitting above the z-30
 * content wrapper here does the same thing; it's pointer-events-none
 * so it never blocks clicks on the cards/CTAs underneath.
 */
function GuideLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 px-8 lg:px-12">
      <div className="relative h-full">
        <span className="absolute inset-y-0 left-0 block w-px origin-left scale-x-50 bg-paper-line" />

        <div className="hidden h-full grid-cols-3 lg:grid" style={{ gridTemplateRows: "100%" }}>
          <span
            className="h-full w-px origin-left scale-x-50 bg-paper-line"
            style={{ gridColumnStart: 2, justifySelf: "start" }}
          />
          <span
            className="h-full w-px origin-left scale-x-50 bg-paper-line"
            style={{ gridColumnStart: 3, justifySelf: "start" }}
          />
        </div>

        <span className="absolute inset-y-0 right-0 block w-px origin-right scale-x-50 bg-paper-line" />
      </div>
    </div>
  );
}

function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center justify-center gap-3 md:justify-start lg:justify-center">
      <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
      <span className="label text-paper-muted">{index}</span>
      <span className="label text-paper-foreground">{title}</span>
    </div>
  );
}

function Feature({ label, tone }) {
  return (
    <li className="flex items-center gap-3">
      {tone === "plain" ? (
        <Check className="h-[15px] w-[15px] shrink-0 text-paper-foreground" strokeWidth={1.75} />
      ) : (
        <span
          className={`flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[3px] ${
            tone === "accent" ? "bg-accent" : "bg-paper-foreground"
          }`}
        >
          <Check className="h-[11px] w-[11px] text-primary" strokeWidth={3} />
        </span>
      )}
      <span className="text-[15px] leading-none text-paper-foreground md:text-[15px]">{label}</span>
    </li>
  );
}

/** Reveal-on-scroll, same pattern as CaseStudy/Testimonials/Portfolio's
    useInView - this was missing entirely before, which is why the
    staircase cards never actually animated in on scroll. */
function useInView(threshold = 0.3) {
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

const plans = [
  {
    price: "$3,500",
    suffix: "/Project",
    blurb: "For founders who need a strong foundation, clean design, and a professional website.",
    included: [
      "Landing page or small website",
      "Custom visual design",
      "Website development",
      "Basic interactions",
      "Email support",
    ],
    cta: "Get Started",
    ctaSuffix: "/Custom",
    timeline: "1-2 Weeks",
  },
  {
    price: "$7,500",
    suffix: "/Project",
    blurb: "For brands that need a complete website with stronger storytelling and more pages.",
    included: ["Multi-page website", "Creative direction", "UX/UI design", "CMS setup"],
    extras: ["Basic SEO setup", "Performance check"],
    cta: "Get Started",
    ctaSuffix: "/Premium",
    timeline: "3-4 Weeks",
    featured: true,
  },
  {
    price: "$12,500",
    suffix: "/Project",
    blurb: "For larger websites, digital products, or brands that need a fully custom design system.",
    included: [
      "Full website strategy",
      "Custom design system",
      "Advanced UX/UI design",
      "Website  development",
      "Complex interactions",
      "Launch support",
    ],
    extras: ["10x SEO optimized blog posts", "Design documentation", "Ongoing support option"],
    cta: "Get Started",
    ctaSuffix: "/Custom",
    timeline: "4-6 Weeks",
  },
];

/**
 * order-first pulls the featured (Premium) card to the top of the
 * stack on mobile/tablet, where the grid is a single column;
 * lg:order-none resets it back to plain source order at lg.
 *
 * The vertical offset at lg is a left-to-right staircase driven by
 * the card's position (i) rather than by which plan is "featured":
 * card 1 sits at the top (lg:mt-0), card 2 a little below it
 * (lg:mt-9 = 36px), card 3 a little below that again (lg:mt-[72px]).
 * The featured plan still gets its own visual treatment (the orange
 * top border + "Popular" badge below) - that's independent of where
 * it sits in the staircase.
 *
 * That staircase is a static position; useInView layered on top adds
 * the actual scroll-triggered animation (fade + slide up), staggered
 * by index so card 1 animates in first, card 2 a beat later, card 3
 * later still - same delayMs-per-index pattern Testimonials/Portfolio
 * use for their own reveals.
 */
const STAIRCASE_OFFSET_LG = ["lg:mt-0", "lg:mt-9", "lg:mt-[72px]"];

function PlanCard({ plan, index }) {
  const featured = !!plan.featured;
  const { ref, seen } = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col bg-paper transition-all duration-700 ease-out ${
        featured ? "order-first lg:order-none" : ""
      } ${featured ? "border-t-2 border-accent" : "border-t border-paper-border"} ${
        STAIRCASE_OFFSET_LG[index] ?? "lg:mt-0"
      }`}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Head */}
      <div className="px-7 pt-8 pb-9 sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
            <span className="label text-paper-foreground md:text-[12px]">Premium</span>
          </div>
          {featured && (
            <span className="label bg-paper-foreground px-2.5 py-[7px] text-primary md:text-[12px]">
              Popular
            </span>
          )}
        </div>

        <div className="mt-7 flex items-end gap-2">
          <p className="font-heading-sans text-[40px] leading-none font-medium tracking-[-0.03em] text-paper-foreground lg:text-[41px]">
            {plan.price}
          </p>
          <span className="label pb-[5px] text-paper-muted lg:text-[12px]">{plan.suffix}</span>
        </div>

        <p className="mt-5 max-w-[35ch] lg:max-w-[30ch] md:max-w-[35ch] text-[15px] leading-[1.6] text-paper-foreground md:text-[16px]">
          {plan.blurb}
        </p>
      </div>

      {/* Lists */}
      <div className="border-t border-paper-border px-7 pt-8 pb-9 sm:px-8">
        <p className="label text-paper-foreground text-[14px] md:text-[12px]">What's Included</p>
        <ul className="mt-6 space-y-4">
          {plan.included.map((f) => (
            <Feature key={f} label={f} tone={featured ? "accent" : "plain"} />
          ))}
        </ul>

        {plan.extras && (
          <>
            <p className="label mt-9 text-paper-foreground text-[14px] md:text-[12px]">Extras</p>
            <ul className="mt-6 space-y-4">
              {plan.extras.map((f) => (
                <Feature key={f} label={f} tone={featured ? "dark" : "plain"} />
              ))}
            </ul>
          </>
        )}

        {/* CTA - same h-11 pill + sliding ArrowBox treatment as
            Testimonials/Hero's StartProject (just no avatar slot -
            there's no per-plan photo here), plus the same vertical
            text-swap label used there. */}
        <div className="mt-10">
          <a
            href="#contact"
            className={`group flex h-11 w-full items-center overflow-hidden ${
              featured ? "bg-paper-foreground text-primary" : "bg-paper-border/60 text-paper-foreground"
            }`}
          >
            <span
              className={`relative flex h-11 w-0 shrink-0 items-center justify-center overflow-hidden transition-[width] duration-500 ease-out group-hover:w-11 ${
                featured ? "bg-accent" : "bg-paper-foreground"
              }`}
            >
              <ChevronRight className="h-[15px] w-[15px] shrink-0 text-primary" strokeWidth={1.5} />
            </span>
            <span className="label relative block min-w-0 flex-1 overflow-hidden px-5 text-[clamp(11px,1vw,15px)] whitespace-nowrap lg:text-[clamp(12px,1vw,16px)]">
              <span className="flex items-center gap-2 transition-transform duration-400 ease-out group-hover:-translate-y-full">
                <span className="label lg:text-[12px]">{plan.cta}</span>
                <span className={`label lg:text-[12px] ${featured ? "text-primary/60" : "text-paper-muted"}`}>
                  {plan.ctaSuffix}
                </span>
              </span>
              <span className="absolute inset-x-5 top-0 flex translate-y-full items-center gap-2 transition-transform duration-400 ease-out group-hover:translate-y-0">
                <span className="label lg:text-[12px]">{plan.cta}</span>
                <span className={`label lg:text-[12px] ${featured ? "text-primary/60" : "text-paper-muted"}`}>
                  {plan.ctaSuffix}
                </span>
              </span>
            </span>
            <span
              className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden transition-[width] duration-500 ease-out group-hover:w-0 ${
                featured ? "bg-accent" : "bg-paper-foreground"
              }`}
            >
              <ChevronRight className="h-[15px] w-[15px] shrink-0 text-primary" strokeWidth={1.5} />
            </span>
          </a>

          <p className="label mt-5 text-center text-paper-muted lg:text-[12px]">
            Project Timeline: <span className="text-paper-foreground">{plan.timeline}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Consult banner. No fixed pixel height anywhere in this row: the
 * grid's default stretch alignment sizes the row to the taller
 * item's natural content height (the copy panel), and the image
 * wrapper's sm:h-full simply fills whatever that ends up being - so
 * the two columns always match regardless of how much text is in the
 * panel. Below sm (stacked layout), that same wrapper instead uses a
 * fixed, short h-[150px] - a mobile-only tight head-to-neck crop
 * rather than the fuller 3:4 portrait ratio - with object-top on the
 * img so the crop anchors from the top of the photo down. The wrapper
 * is also what clips the image: the img itself is scale-125'd (a
 * permanent, non-hover zoom so only part of the photo shows, not the
 * whole frame) and would spill outside its box without the wrapper's
 * overflow-hidden.
 *
 * Height reduced ONLY at lg (desktop): py-6->lg:py-4, mt-5->lg:mt-3,
 * mt-7->lg:mt-4, by trimming the panel's own padding/spacing rather
 * than reintroducing a fixed row height - the row still auto-sizes to
 * this content, it's just less of it at lg, so the shorter height
 * carries through to the image via the same stretch/h-full mechanism
 * as before.
 *
 * md:max-w-none/md:mx-0 added so the whole card goes edge-to-edge at
 * tablet - starting at guide line 1 (left) and ending at the right
 * edge - instead of staying capped at the mobile 520px/centered
 * treatment. This card sits below the header, in its own row, so it
 * doesn't intersect the header's local center divider at all.
 * lg keeps its own existing mx-0/max-w-none (unchanged; it already
 * spans the col-start-2 grid cell it's placed in at that breakpoint) -
 * desktop is untouched.
 */
function ConsultBanner() {
  return (
    <div className="mx-auto grid w-full max-w-[520px] grid-cols-1 md:mx-0 md:h-[200px] md:max-w-none lg:grid-cols-[0.9fr_1.3fr] md:grid-cols-[0.4fr_1.3fr] lg:mx-0 lg:h-[200px] lg:max-w-none">
      <div className="relative h-[300px] w-full overflow-hidden md:aspect-auto md:h-full">
        <img
          src={consultImg}
          alt="Founder available for a website planning call"
          width={1024}
          height={1024}
          loading="lazy"
          className="h-full w-full scale-125 object-cover object-top md:object-center"
        />
      </div>
      <div className="relative isolate flex flex-col justify-center overflow-hidden bg-[#161616] px-8 py-6 md:h-full lg:py-2">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.18]" />
        {/* grid + gap replaces the old flex-col + per-child mt-* spacing -
            adjust the single gap value below (gap-6 lg:gap-4) to control
            the space between the badge, heading, and CTA all at once. */}
        <div className="relative z-10 grid gap-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
            <span className="label text-primary/60">Need some clarity?</span>
          </div>
          <p className="font-heading-sans text-[22px] leading-[1.2] font-medium tracking-[-0.02em] text-foreground uppercase">
            Plan your
            <br />
            website with me.
          </p>

          {/* Same compact CTA as CaseStudy's SeeProjectCta: a fixed
              h-[11px] overflow-hidden window holding two stacked
              copies of the label, both sliding up on hover so the
              duplicate (positioned via top-full) arrives from below
              as the original exits the top - plus the small square
              accent icon chip, same as there. */}
          <a href="#contact" className="group inline-flex items-center gap-0 text-foreground mt-1">
            <span className="label relative block h-[11px] overflow-hidden pr-3">
              <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
                Book a call
              </span>
              <span className="absolute inset-x-0 top-full block pr-3 transition-transform duration-400 ease-out group-hover:-translate-y-full">
                Book a call
              </span>
            </span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-accent">
              <ChevronRight className="h-[14px] w-[14px] text-primary" strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative isolate overflow-hidden bg-paper">
      <GuideLines />

      <div className="relative z-30 px-8 lg:px-12">
        {/* Header. Mobile and desktop (lg) are completely untouched -
            still the original single centered block (mx-auto/
            max-w-[640px]/text-center/lg:block cancels the md:grid
            below so lg falls back to plain stacked flow exactly as
            before).
            Tablet (md) is the only breakpoint that changes: the
            heading (label + "Website Packages.") and the paragraph
            become two side-by-side grid columns (md:grid
            md:grid-cols-2) instead of one hack-y ml-[50%] offset - a
            real 2-column layout, which is what actually needs to line
            up with a guide line. A local divider line lives right
            here, sized only to this header block's own height
            (absolute inset-y-0 on this same relative wrapper) - so
            unlike a section-wide guide line it stops exactly where the
            header ends and never runs down through the plan cards or
            ConsultBanner below. */}
        <div className="relative mx-auto max-w-[640px] px-2 pt-20 pb-12 text-center md:mx-0 md:grid md:max-w-none md:grid-cols-2 md:items-start md:gap-x-10 md:px-0 md:pt-16 md:pb-16 md:text-left lg:mx-auto lg:block lg:max-w-[640px] lg:px-2 lg:pt-28 lg:pb-32 lg:text-center">
          <div>
            <SectionLabel index="07" title="Pricing" />
            <h2 className="font-heading-sans mt-8 text-[clamp(2.4rem,6vw,4.1rem)] leading-[1.05] font-medium uppercase tracking-[-0.04em]">
              <span className="text-paper-muted">Website</span>
              <br />
              <span className="text-paper-foreground">Packages.</span>
            </h2>
          </div>

          <p className="label mx-auto mt-7 max-w-[34ch] text-[14px] md:!text-[16px] !leading-[1.5] tracking-[-0.01em] md:mx-0 md:mt-24 md:max-w-none lg:mx-auto lg:mt-7 lg:max-w-[42ch]">
            <span className="text-paper-foreground">Clear website packages for a</span>
            <br />
            <span className="text-paper-muted">smooth path from idea to launch.</span>
          </p>

          <span className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-paper-line md:block lg:hidden" />
        </div>

        {/* Cards - lg:divide-x removed: the two interior GuideLines
            above now sit exactly on these same column seams (both use
            the same px-8/lg:px-12 math), so a separate divide-x border
            would just double up as a second, slightly offset line. */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard key={plan.price} plan={plan} index={index} />
          ))}
        </div>

        {/* Consult banner - placed in the middle of the same
            grid-cols-3 the cards use, so at lg it sits exactly
            between guide line 2 and guide line 3 (the same column
            the middle/featured plan card occupies) - unchanged.
            Below lg it's a single column, so it just centers normally
            via the mx-auto/max-w-[520px] on ConsultBanner itself -
            except at md specifically, ConsultBanner's own
            md:mx-0/md:max-w-none override that centering so the card
            goes edge-to-edge instead. */}
        <div className="border-t border-paper-border py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-start-2">
              <ConsultBanner />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}