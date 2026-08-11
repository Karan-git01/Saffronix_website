import { useEffect, useRef, useState } from "react";

/**
 * FAQ — light "paper" section (08).
 *
 * Same GuideLines implementation (px-8 lg:px-12 + grid-cols-4 hairlines) and
 * SectionLabel as Pricing/Stats so the hairlines land on the same pixel
 * columns as every other section.
 *
 * col2 (25%) is back at lg - it was removed in an earlier pass because
 * it seemed to serve no purpose, but the header paragraph on desktop
 * now deliberately spans from guide line 1 to guide line 2 (see the
 * header markup below), so this line is meaningful again. col4 (75%)
 * stays removed - that one genuinely cut through the accordion cards
 * and doesn't correspond to anything in this section's 2-column
 * layout.
 *
 * The col3 interior line (the 50% mark) is lg:block only, not
 * md:block - it used to render from md upward, but since the main
 * content grid below stays single-column until lg (header block then
 * accordion block, stacked), a full-height line at md ran straight
 * through the accordion rows, cutting each one in half. At lg the
 * layout actually splits into two real columns (lg:grid-cols-2) so
 * the line correctly marks that seam there. The equivalent tablet
 * divider lives locally inside the header block instead (see below),
 * confined to just that block's own height, the same fix used for
 * Pricing's header.
 */
function GuideLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 px-8 lg:px-12">
      <div className="relative h-full">
        <span className="absolute inset-y-0 left-0 block w-px origin-left scale-x-50 bg-paper-line" />

        <div className="grid h-full grid-cols-4" style={{ gridTemplateRows: "100%" }}>
          <span
            className="hidden h-full w-px origin-left scale-x-50 bg-paper-line lg:block"
            style={{ gridColumnStart: 2, justifySelf: "start" }}
          />
          <span
            className="hidden h-full w-px origin-left scale-x-50 bg-paper-line lg:block"
            style={{ gridColumnStart: 3, justifySelf: "start" }}
          />
        </div>

        <span className="absolute inset-y-0 right-0 block w-px origin-right scale-x-50 bg-paper-line" />
      </div>
    </div>
  );
}

/** Same index/title shape as Pricing's SectionLabel - index is optional so
    plain-title callers (if any) still work, but FAQ now passes "08" to
    match every other numbered section's header treatment. */
function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
      {index ? <span className="label text-paper-muted">{index}</span> : null}
      <span className="label text-paper-foreground">{title}</span>
    </div>
  );
}

/** Reveal-on-scroll, same pattern as Pricing's useInView - used below to
    fade/slide each accordion row in on scroll, the same way Pricing's
    PlanCard animates in. */
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

const items = [
  {
    n: "01",
    q: "What do you offer?",
    a: [
      "I design and build custom websites in Framer for founders, studios, and modern brands. My work usually includes strategy, creative direction, UX/UI design, responsive Framer development, basic SEO setup, and launch support.",
      "The goal is to create a website that looks sharp, feels easy to use, and can be managed without needing a developer for every small update.",
    ],
  },
  {
    n: "02",
    q: "Do you only work with Framer?",
    a: [
      "Yes, most of my website projects are built in Framer. It allows me to move from design to development quickly while still creating a polished, responsive, and easy-to-edit website.",
      "Framer is a great fit for landing pages, portfolios, marketing websites, SaaS pages, and brand websites that need strong design, smooth interactions, and simple content management.",
    ],
  },
  {
    n: "03",
    q: "How long does a project take?",
    a: [
      "Most projects take between 2 and 6 weeks, depending on the size and complexity of the website. A focused landing page can usually be completed faster, while larger websites with more pages, CMS content, or custom interactions need more time.",
      "Before we start, I'll define the scope, timeline, and next steps clearly so you know exactly what to expect.",
    ],
  },
  {
    n: "04",
    q: "Can you redesign my existing website?",
    a: [
      "Yes. I can redesign an existing website and rebuild it in Framer with a cleaner structure, stronger visuals, better responsiveness, and easier editing.",
      "This usually starts with reviewing your current website, understanding what works and what doesn't, then creating a new direction that feels more aligned with your brand and goals.",
    ],
  },
  {
    n: "05",
    q: "Will I be able to edit the website myself?",
    a: [
      "Yes. I build Framer websites with a clean structure so you can update text, images, links, and CMS content yourself after launch.",
      "I also make sure the website is organized in a way that feels manageable, so you don't have to rely on me for every small change.",
    ],
  },
  {
    n: "06",
    q: "How do we start a project?",
    a: [
      "The best way to start is with a short intro call. We'll talk about your goals, the type of website you need, your timeline, and which package makes the most sense.",
      "After that, I'll send a clear proposal with the scope, pricing, timeline, and next steps.",
    ],
  },
];

/** Plus icon that rotates 225deg into an X when the row is open, and now
    also rotates 180deg on hover (group-hover) even while closed - same
    hover behaviour as Services' AccordionItem PlusIcon. */
function PlusIcon({ open }) {
  return (
    <span
      className={`relative block h-[14px] w-[14px] shrink-0 transition-transform duration-500 ${
        open ? "rotate-[225deg]" : "rotate-0 group-hover:rotate-180"
      }`}
      aria-hidden="true"
    >
      <span className="absolute top-1/2 left-0 block h-px w-full -translate-y-1/2 bg-paper-foreground" />
      <span className="absolute top-0 left-1/2 block h-full w-px -translate-x-1/2 bg-paper-foreground" />
    </span>
  );
}

/** index (i) drives the same fade + translateY-on-scroll reveal, staggered
    150ms per row, that Pricing's PlanCard uses for its three cards -
    row 1 animates in first, row 2 a beat later, and so on. */
function Row({ item, open, onToggle, i, first }) {
  const { ref, seen } = useInView(0.3);

  return (
    <div
      ref={ref}
      className={`relative border-x border-b border-paper-border bg-paper transition-all duration-700 ease-out ${
        first ? "border-t border-paper-border" : ""
      }`}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${i * 150}ms`,
      }}
    >
      {/* Top accent border — only visible while the row is open */}
      <span
        className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-accent transition-transform duration-500 ease-out ${
          open ? "scale-x-100" : "scale-x-0"
        }`}
      />

      {/* cursor-pointer added - a <button> should show the pointer cursor
          by default, but a global reset in this project was overriding it
          to the default arrow, so it's set explicitly here.
          Padding trimmed down from px-6 py-6 md:px-8 md:py-10 to
          px-5 py-5 md:px-6 md:py-7 - same proportions, just tighter. */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-center justify-between gap-6 -pl-1 pr-5 py-5 text-left md:px-7 md:py-8"
      >
        {/* items-start on mobile: when the question wraps to a second
            line, centering (the old items-center) pulled the number/dot
            down to the vertical middle of the two-line block instead of
            aligning it with the top of the first line. items-start fixes
            that on mobile; md:items-center restores the original
            centered look at md+ where the question stays on one line. */}
        <span className="flex items-start gap-3 md:items-center">
          <span className="relative flex items-center gap-3">
            <span
              className={`h-[7px] w-[7px] shrink-0 bg-accent transition-transform duration-400 ease-out ${
                open ? "scale-100" : "scale-0"
              }`}
            />
            <span className="label relative block h-[16px] overflow-hidden text-[14px] text-paper-muted lg:text-[14px]">
              <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
                {item.n}
              </span>
              <span className="absolute inset-x-0 top-full block transition-transform duration-400 ease-out group-hover:-translate-y-full">
                {item.n}
              </span>
            </span>
          </span>
          {/* tracking-normal added - the shared "label" class sets a wide
              letter-spacing meant for short uppercase labels, but it read
              as too spaced-out on these full question sentences, so it's
              reset back to normal tracking here.
              leading-[1.45] added for mobile - the "label" class's default
              line-height was tight enough that a wrapped two-line question
              had its lines almost touching. md:leading-normal resets this
              back to the original spacing at md+ where questions fit on
              one line and the tighter default looked fine. */}
          <span className="label text-[12px] leading-[1.45] md:text-[13px] md:leading-normal lg:text-[14px] tracking-normal text-paper-foreground">
            {item.q}
          </span>
        </span>
        <PlusIcon open={open} />
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          {/* Padding trimmed down from px-6 pb-10 md:px-8 to
              px-5 pb-7 md:px-6, matching the tighter button padding above. */}
          <div className="space-y-4 px-5 pb-7 md:px-6">
            {item.a.map((p) => (
              <p key={p} className=" text-[15px] leading-[1.65] md:px-6 text-black max-w-full">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative border-t border-paper-border bg-paper py-16 md:py-20 lg:py-28"
    >
      <GuideLines />

      <div className="relative px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-0">
          {/* Header column. Desktop (lg) is untouched apart from the new
              sticky behaviour below - lg:block cancels the md:grid
              below and the heading/paragraph fall back to plain
              stacked flow inside this same lg:pr-12 column, exactly as
              before.
              lg:sticky lg:top-15 lg:self-start: at lg only, this
              column now sticks in place (top-15 matches the offset
              About/Process/Testimonials already use for their own
              sticky left columns) while the accordion column beside it
              scrolls - it stays pinned until the accordion column's
              own bottom catches up (the natural end of position:sticky
              inside this grid row), then both continue scrolling
              together. lg:self-start is required for sticky to have
              room to move - without it, the default grid stretch
              alignment would make this column match the accordion
              column's full height, leaving nothing for "top" to stick
              against.
              Tablet (md) is the only breakpoint that changes: the
              heading ("Quick Answers.") and the paragraph become two
              real grid columns (md:grid md:grid-cols-2 md:gap-x-10)
              instead of the old md:flex/items-end pairing, so the
              paragraph starts precisely at the center guide line
              instead of an arbitrary flex gap. A local divider line
              lives right here (absolute inset-y-0 on this same
              relative wrapper), sized only to this header block's own
              height - unlike GuideLines' col3 line, it never runs down
              into the FAQ accordion below.
              Heading/paragraph typography matches Pricing's header:
              same clamp() size, leading, tracking on the h2, and the
              paragraph reuses Pricing's "label" class + the same
              mobile/md text-size and leading overrides.
              lg:max-w-[50%] added to the paragraph so on desktop it
              spans from guide line 1 (the left edge of this column) to
              guide line 2 (the 25% mark, i.e. half this column's own
              width) instead of running the column's full width. */}
          {/* Outer wrapper: intentionally NO self-start here - same
              pattern as Testimonials' own left column. Leaving this
              at the default grid stretch alignment makes it match the
              accordion column's full height, which is exactly what
              the inner sticky div needs: sticky only stays pinned for
              as long as its containing block still has room below it,
              so a short (self-start-sized) parent gives it nowhere to
              scroll within - it'd start and immediately run out of
              room. Making this outer box tall, then putting
              lg:sticky/lg:top-15 on the INNER div, is what actually
              lets it stay fixed until the accordion column's bottom
              catches up. */}
          <div className="lg:pr-12">
            <div className="lg:sticky lg:top-15 lg:z-50">
              <SectionLabel index="08" title="FAQ" />

              <div className="relative mt-10 md:grid md:grid-cols-2 md:items-start md:gap-x-10 lg:block lg:mt-16">
                {/* relative z-50: guide line 2 (the 25% mark) runs right
                    through the middle of this column, and at lg it was
                    cutting straight through the "S" in "ANSWERS." since
                    GuideLines paints at z-40. Fixing this took two
                    steps, both stacking-context gotchas: first, the
                    content wrapper above no longer sets z-30 - a
                    positioned ancestor with an explicit z-index creates
                    a new stacking context that traps descendants' own
                    z-index inside it. Second (and less obvious), the
                    lg:sticky column wrapper around this heading forms
                    its OWN stacking context unconditionally, regardless
                    of z-index - position:sticky does this even at the
                    default z-index:auto, unlike relative/absolute which
                    only do it once given an explicit z-index. That
                    wrapper needed its own lg:z-50 so its whole subtree
                    (including this h2's z-50) compares against
                    GuideLines' z-40 directly instead of being trapped
                    below it again. With both fixed, the glyph renders
                    on top of the hairline instead of the hairline
                    slicing over it - the line still shows everywhere
                    else it isn't covered by ink. The accordion rows
                    still render below GuideLines as before, since they
                    have no z-index of their own. */}
                <h2 className="relative z-50 font-heading-sans text-[clamp(2.4rem,6vw,4.1rem)] leading-[1.05] font-medium uppercase tracking-[-0.04em]">
                  <span className="text-paper-muted">Quick</span>
                  <br />
                  <span className="text-paper-foreground">Answers.</span>
                </h2>

                <p className="uppercase mt-6 md:mt-13 lg:mt-10 max-w-[34ch] font-heading-sans text-[15px] leading-[1.5] md:text-[15px] text-paper-muted lg:max-w-[50%]">
                  <span className="font-medium text-paper-foreground">
                    Everything you should know
                  </span>{" "}
                  <span className="text-paper-muted">before we start designing and building.</span>
                </p>

                <span className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-paper-line md:block lg:hidden" />
              </div>
            </div>
          </div>

          {/* Accordion column */}
          <div>
            {items.map((item, i) => (
              <Row
                key={item.n}
                item={item}
                i={i}
                first={i === 0}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}