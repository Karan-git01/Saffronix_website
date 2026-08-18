import { ChevronRight } from "lucide-react";

/**
 * GuideLines — same implementation used by About/Process/Pricing
 * (px-8 lg:px-12 + grid-cols-4 hairlines), light "paper" variant so
 * the vertical rules land on the exact same pixel columns as every
 * other section on the page.
 *
 * z-0 (not z-40 like Pricing's): each PostCard below paints its own
 * opaque bg-paper background, so the interior lines are only visible
 * in the gaps above/around the card grid (e.g. the header row) - same
 * as Hero's GuideLines sitting behind its own opaque content. That's
 * intentional here and matches the reference: unlike Pricing, these
 * lines aren't meant to visually run through the cards themselves.
 *
 * Line visibility by breakpoint (this is what the header grid below
 * has to match):
 *  < md:  only the outer edges show (2 lines total)
 *  md-lg: outer edges + the columnStart:3 line (3 lines total) - that
 *         middle line sits at the exact 50% mark, since it's the
 *         midpoint of an even 4-column division. This is "the second
 *         guide line" on tablet.
 *  >= lg: all five lines show (outer edges + columnStart 2, 3, 4)
 */
function GuideLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 px-8 lg:px-12">
      <div className="relative h-full">
        <span className="absolute inset-y-0 left-0 block w-px origin-left scale-x-50 bg-paper-line" />

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

/** Sliding two-copy label + square chevron chip, same CTA used in
    CaseStudy/Pricing. `tone` switches the chip background between the
    header link (white) and the in-card links (faint grey). */
function ArrowCta({ label, href, tone = "muted" }) {
  return (
    <a href={href} className="group inline-flex items-center gap-0 text-paper-foreground">
      <span className="label relative block h-[11px] overflow-hidden pr-3">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute inset-x-0 top-full block pr-3 transition-transform duration-400 ease-out group-hover:-translate-y-full">
          {label}
        </span>
      </span>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center border border-paper-border ${
          tone === "plain" ? "bg-paper" : "bg-paper-subtle"
        }`}
      >
        <ChevronRight className="h-[14px] w-[14px] text-paper-foreground" strokeWidth={1.5} />
      </span>
    </a>
  );
}

function Dots() {
  return (
    <div className="flex items-center gap-[3px]">
      <span className="h-[3px] w-[3px] bg-paper-dot" />
      <span className="h-[3px] w-[3px] bg-paper-dot" />
      <span className="h-[3px] w-[3px] bg-paper-dot" />
    </div>
  );
}

/**
 * Placeholder post data. Swap this for a fetch from your MERN API
 * (e.g. GET /api/posts) once the blog backend is wired up - the
 * PostCard/Blog markup below doesn't need to change, just replace
 * `posts` with state populated from that request.
 */
const posts = [
  {
    date: "Jun 24, 2026",
    tag: "Design",
    title: "What Makes A Website Project Run Smoothly",
    excerpt: "A simple look at how clear structure, focused feedback, and the right process.",
    slug: "what-makes-a-website-project-run-smoothly",
    ratio: "1 / 1",
    image:
      "https://framerusercontent.com/images/lwpit2bNgoGUzyqkdPw3jyiPI.webp?width=1800&height=1800",
  },
  {
    date: "May 30, 2026",
    tag: "Design",
    title: "How Visual Direction Shapes A Stronger Website",
    excerpt: "Why typography, imagery, spacing, and color direction matter.",
    slug: "how-visual-direction-shapes-a-stronger-website",
    ratio: "0.75 / 1",
    image:
      "https://framerusercontent.com/images/0UkNZE7S4qruVsivS70eDa2fsHk.webp?width=1800&height=2400",
  },
  {
    date: "Apr 7, 2026",
    tag: "Development",
    title: "Building Better Websites In Framer",
    excerpt: "A practical look at responsive layouts, clean components & the CMS structure.",
    slug: "building-better-websites-in-framer",
    ratio: "1 / 1",
    image:
      "https://framerusercontent.com/images/XKNn5wdz0oZLzNZE43UWd43s3x0.webp?width=1800&height=1800",
  },
  {
    date: "Mar 23, 2026",
    tag: "Branding",
    title: "Creating A Digital Presence That Feels Clear",
    excerpt: "How strong messaging, consistent visuals, and a focused website experience.",
    slug: "creating-a-digital-presence-that-feels-clear",
    ratio: "0.75 / 1",
    image:
      "https://framerusercontent.com/images/P6MzQfBdpMKaZclGPIFk31ogUus.webp?width=1800&height=2400",
  },
];

function PostCard({ post }) {
  return (
    <article className="flex h-full flex-col bg-paper">
      {/* Date bar — top + left hairline, exactly like the Framer card.
          md:pr-5 md:pl-5 is a small horizontal padding bump for the
          tablet grid only (was pr-4/pl-4, same as mobile, at every
          breakpoint before). lg:pr-4 lg:pl-6 explicitly restores your
          original desktop values — without that, the md rule would
          otherwise keep applying at lg too, since both breakpoints'
          media queries match at desktop widths and Tailwind's lg
          output comes after md. */}
      <div className="flex items-center justify-between gap-4 border-t border-l border-paper-border py-3 pr-4 pl-4 md:pr-5 md:pl-5 lg:pr-4 lg:pl-6">
        <span className="label text-paper-muted">{post.date}</span>
        <Dots />
      </div>

      <a href={`/blog/${post.slug}`} className="relative block overflow-hidden">
        <div className="bg-noise pointer-events-none absolute inset-0 z-10 opacity-[0.15]" />
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="block w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          style={{ aspectRatio: post.ratio }}
        />
      </a>

      {/* Same md-only bump + lg revert as the date bar above, so the
          left/right edges of both rows still line up with each other
          at every breakpoint. */}
      <div className="flex flex-1 flex-col border-b border-l border-paper-border pt-6 pr-6 pb-8 pl-6 md:pr-7 md:pl-7 lg:pr-4 lg:pl-6">
        <div className="flex items-center gap-2.5">
          <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
          <span className="label text-paper-foreground">{post.tag}</span>
        </div>

        <h3 className="font-heading-sans mt-5 max-w-[20ch] text-[19px] leading-[1.25] font-medium tracking-[-0.02em] text-paper-foreground">
          {post.title}
        </h3>
        <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.55] tracking-[-0.01em] text-paper-muted">
          {post.excerpt}
        </p>

        <div className="mt-7">
          <ArrowCta label="Read Article" href={`/blog/${post.slug}`} />
        </div>
      </div>
    </article>
  );
}

/**
 * Tablet (md) render order for a real 2-col × 2-row CSS grid with
 * grid-auto-flow:column. Filling column-first means this order
 * ([0,3,1,2]) lands as column A = [0,3], column B = [1,2] — same
 * pairing as the old MD_COLUMNS — but because it's one shared grid
 * now (not two independent flex stacks), row 1 and row 2 each
 * auto-size to the taller of their two cards, so card 3 (col A,
 * row 2) and card 2 (col B, row 2) get forced to the same height and
 * their bottom edges align. PostCard's `h-full` + its inner block's
 * `flex-1` absorb that stretch automatically.
 */
const MD_ORDER = [0, 3, 1, 2];

export default function Blog() {
  return (
    <section id="blog" className="relative isolate overflow-hidden bg-paper py-16 md:py-20 lg:py-28">
      <GuideLines />

      <div className="relative z-30 px-8 lg:px-12">
        {/* Header — 4 tracks at lg (label / heading / paragraph / link),
            2 tracks at md (label+heading | paragraph+button), single
            stacked column below md.

            DESKTOP (lg:) IS UNCHANGED — every lg: class below is
            copied verbatim from your version.

            TABLET (md:) is new: md:grid-cols-2 with md:gap-x-0 splits
            the row exactly at the 50% mark, which is precisely where
            GuideLines' md:block interior line sits (see comment on
            GuideLines above) - so column 2's left edge lands flush on
            that line with zero extra gap needed. */}
        <div className="grid gap-7 pt-16 pb-10 sm:pt-20 md:grid-cols-2 md:gap-x-0 md:gap-y-10 lg:grid-cols-4 lg:items-stretch lg:gap-0 lg:pt-0 lg:pb-12">
          {/* Column 1, row 1 at md (label). Column-start-1 at lg too -
              same track, so no lg-specific col-start needed beyond what
              was already there. */}
          <div className="md:col-start-1 md:row-start-1 md:self-start lg:col-start-1 lg:row-start-1 lg:self-start lg:justify-self-start lg:py-6 lg:m-0">
            <SectionLabel index="09" title="Blog" />
          </div>

          {/* Column 1, row 2 at md (heading, directly below label) -
              its left edge stays flush on the outer-left edge at both
              md and lg (column 1 starts there in both grids), so no
              horizontal position change was needed on tablet — only
              the row placement is new, to keep it under the label
              instead of stacking after the paragraph/button. */}
          <h2 className="font-heading-sans text-[clamp(2.6rem,2rem+3.6vw,5rem)] leading-[0.95] font-medium tracking-[-0.04em] uppercase md:col-start-1 md:row-start-2 md:self-start lg:col-start-2 lg:row-start-1 lg:-ml-[0.075em] lg:self-start lg:py-4 lg:m-0">
            <span className="text-paper-muted">Design</span>
            <br />
            <span className="text-paper-foreground">Notes.</span>
          </h2>

          {/* Column 2, row 2 at md — a SINGLE wrapper (not two separate
              grid items) holds paragraph + button together, so both
              inherit the exact same left edge with nothing in between
              that could nudge either one off the guideline.

              lg:contents makes this wrapper disappear from the grid at
              lg — its children (paragraph, button row) become
              independent grid items again there, picking up their own
              lg:col-start-3 / lg:col-start-4 exactly as before. Your
              desktop layout is untouched. */}
          <div className="md:col-start-2 md:row-start-2 md:w-full md:self-start md:justify-self-start lg:contents">
            {/* Text stays left-aligned on tablet (no md:text-right) -
                only lg:text-right (unchanged) flips it at desktop.

                The md:pt value below is a calculated offset, not a
                guessed one. The heading's line-height is literally
                font-size × 0.95 (that's what leading-[0.95] means),
                and its font-size is the same clamp used on the h2
                above — so `calc(clamp(2.6rem,2rem+3.6vw,5rem)*0.95)`
                IS the exact rendered height of the "Design" line,
                i.e. exactly how far down "Notes." (the second line)
                starts. */}
            <p className="label mt-6 max-w-[32ch] md:max-w-[32ch] lg:max-w-[24ch] md:mt-4.5 md:pt-[calc(clamp(2.6rem,2rem+3.6vw,5rem)*0.95)] !text-[clamp(0.875rem,0.8rem+0.34vw,1.1rem)] !leading-[1.2] tracking-[-0.01em] lg:col-start-3 lg:row-start-1 lg:mt-0 lg:pt-[clamp(3rem,3rem+4vw,8rem)] lg:text-right lg:self-start lg:justify-self-end lg:m-0">
              <span className="text-paper-muted">I share ideas, lessons, and </span>
              <span className="text-paper-foreground">practical insights from my work.</span>
            </p>

            {/* Hidden on mobile now (base class is `hidden`) — the
                bottom centered "All Articles" CTA further down already
                covers mobile, so this header-row one was a duplicate
                there. Still hidden through md (tablet), where the
                bottom CTA covers it too. lg:flex brings it back at
                desktop, where it's the ONLY "All Articles" link (the
                bottom one is lg:hidden). */}
            <div className="hidden items-center gap-4 lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:mt-0 lg:flex lg:justify-end lg:self-end lg:justify-self-end lg:pb-4 lg:m-0">
              <ArrowCta label="All Articles" href="/blog" tone="plain" />
            </div>
          </div>
        </div>

        {/* Cards — desktop is a straight 4-up row, tablet is a real
            2×2 grid (see MD_ORDER comment above — this is what makes
            the two bottom cards align, unlike the old two-independent-
            flex-stacks version), mobile is a single column. */}
        <div className="hidden lg:grid lg:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 md:grid-flow-col lg:hidden">
          {MD_ORDER.map((index) => (
            <PostCard key={posts[index].slug} post={posts[index]} />
          ))}
        </div>

        {/* Mobile stack — gap-8 is the only change here, and only
            shows up here: this whole div is md:hidden, so the gap
            never reaches the tablet or desktop layouts above, which
            keep their original zero-gap, hairline-touching cards. */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* The single "All Articles" link for mobile and tablet —
            header-row copy is hidden at both sizes now, so this is
            the only one that shows there. Hidden at lg, where the
            header-row link takes over instead. */}
        <div className="flex justify-center border-t border-paper-border py-10 lg:hidden">
          <ArrowCta label="All Articles" href="/blog" tone="plain" />
        </div>
      </div>
    </section>
  );
}