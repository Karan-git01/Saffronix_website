import { ChevronRight } from "lucide-react";
import { GuideLines3 } from "./AboutHero";

/**
 * "My Mission" — light paper surface, same three-guide structure as the
 * about hero (left edge, middle, right edge). The middle guide splits the
 * section into two equal containers on desktop AND tablet (md+). Only on
 * mobile does it stack into a single column.
 *
 * Styling now matches Testimonials.jsx (the actual current testimonials
 * section) rather than the old ClientStories.jsx draft:
 * - Section padding: `px-8 py-16 md:py-24 lg:px-12`, same as
 *   Testimonials' section wrapper.
 * - SectionLabel/MissionLabel: 7px accent dot + plain `label` utility
 *   classes (12px, tracking-[0.08em], uppercase — from index.css), same
 *   as Testimonials' SectionLabel — no manual text-[10px] override.
 * - H2: `uppercase font-heading-sans text-[9vw] leading-[0.95]
 *   font-medium tracking-[-0.04em] md:text-[6vw] lg:text-[5vw]`, muted
 *   first line (`text-paper-muted`) + foreground second line, same as
 *   Testimonials' H2 (previously this used a clamp()-based size and
 *   font-bold, which didn't match).
 * - Lead paragraph in `right` matches Testimonials' Card quote exactly:
 *   `font-heading-sans text-[15px] leading-[1.45] text-paper-foreground
 *   md:text-[20px]`.
 * - Muted body copy uses the `text-paper-muted` token instead of opacity
 *   modifiers (`/45`, `/55`), matching how Testimonials handles muted
 *   text throughout.
 * - `left` column is sticky (md:sticky md:self-start) so it stays pinned
 *   near the top while the taller `right` column scrolls past it, then
 *   scrolls away normally with the rest of the page once `right` runs
 *   out. `top-15` is the sticky offset shared across About/Services/
 *   Process's left columns (per Testimonials' own comment on this), so
 *   this uses the same single value instead of a separate md/lg split.
 * - CTA button ("BookACall") now uses the vertical text-slide animation:
 *   a fixed-height label with two stacked copies of the text that both
 *   translate up on hover (revealing the duplicate underneath), plus a
 *   small accent square with a ChevronRight icon — not the two-box
 *   width-slide animation used previously.
 */
function MissionLabel() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
      <span className="label text-paper-muted">01</span>
      <span className="label text-paper-foreground">My Mission</span>
    </div>
  );
}

function BookACall() {
  return (
    <a href="/#contact" className="group inline-flex items-center gap-0">
      <span className="label relative block h-[11px] overflow-hidden pr-3 uppercase text-paper-foreground">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Book a Free Call
        </span>
        <span className="absolute inset-x-0 top-full block pr-3 transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Book a Free Call
        </span>
      </span>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-accent">
        <ChevronRight className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
      </span>
    </a>
  );
}

const left = (
  <div>
    <h2 className="uppercase font-heading-sans text-[10vw] leading-[0.95] font-medium tracking-[-0.04em] md:text-[6vw] lg:text-[5vw]">
      <span className="text-paper-muted">A Clear</span>
      <br />
      <span className="text-paper-foreground">Direction.</span>
    </h2>
    <p className="uppercase mt-8 md:mt-10 max-w-[34ch] font-heading-sans text-[16px] leading-[1.5] text-paper-muted">
      <span className="text-paper-foreground">
        I turn ideas, content, and brand direction into websites{" "}
      </span>
      that feel focused, polished, and easy to use.
    </p>
    <div className="mt-10">
      <BookACall />
    </div>
  </div>
);

const right = (
  <div>
    <MissionLabel />
    <p className="mt-8 md:mt-12 font-heading-sans font-semibold text-[1.3rem] md:leading-[1.3] lg:leading-[1.1] text-paper-foreground md:text-[1.6rem] lg:text-[2rem]">
      I help founders, studios, and modern brands turn ideas into websites that feel clear,
      polished, and easy to use. My work combines design thinking, visual direction, and Framer
      development to create digital experiences that are both refined and practical.
    </p>
    <div className="mt-6 md:mt-9 space-y-4  md:space-y-6 text-[0.9rem] md:text-[1rem] leading-[1.75] text-paper-muted">
      <p>
        Every project starts with understanding what the website needs to achieve. Before I design,
        I look at the brand, the audience, the message, and the content behind it. This gives the
        project a clear direction and helps every page feel intentional.
      </p>
      <p>
        I like websites that feel simple, but not empty. Clean layouts, strong typography, smooth
        interactions, and a clear structure should work together quietly in the background. The
        result should feel refined, easy to use, and natural from the first scroll to the final
        click.
      </p>
      <p>
        For me, good design is not only about how a website looks. It is about how clearly it
        communicates, how smoothly it works, and how easy it is to manage after launch. That is why
        I connect design and Framer development from the beginning of every project.
      </p>
    </div>
  </div>
);

export default function AboutMission() {
  return (
    <section className="relative isolate bg-paper" aria-labelledby="my-mission">
      {/* overflow-hidden lives here (not on the section) so it only clips
          GuideLines3, leaving the sticky left column below free to use
          position:sticky — same fix as Process.jsx's GuideLines wrapper. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GuideLines3 tone="paper" />
      </div>
      <div className="relative z-30 px-8 py-16 md:py-24 lg:px-12">
        {/* Two equal containers split by the middle guide — desktop AND tablet (md+) */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0">
          <div className="md:pr-10 lg:pr-16 md:sticky md:top-15 md:self-start">{left}</div>
          <div className="md:pt-2 lg:pt-2">{right}</div>
        </div>
      </div>
    </section>
  );
}