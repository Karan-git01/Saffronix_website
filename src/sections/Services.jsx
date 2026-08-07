import { useEffect, useRef, useState } from "react";
import { ChevronRight, X } from "lucide-react";
import avatarCta from "../assets/avatar-cta.webp";
import strategyImg from "../assets/service-strategy.webp";
import designImg from "../assets/service-design.webp";
import developmentImg from "../assets/service-development.webp";
import marketingImg from "../assets/service-marketing.webp";

const services = [
  {
    index: "01",
    title: "Strategy",
    heading: "Creative Direction",
    body: [
      "Before I start designing, I help define the structure, message, and visual direction of the website. This gives every page a clear purpose and makes sure the final result feels focused, consistent, and easy to understand.",
      "I look at your brand, audience, content, and goals, then turn everything into a simple creative direction that guides the whole project from the first sketch to the final launch.",
    ],
    milestones: ["Project Discovery", "Website Structure", "Creative Direction"],
    image: strategyImg,
  },
  {
    index: "02",
    title: "Design",
    heading: "Visual Systems",
    body: [
      "I design clean, editorial layouts built on a strict grid, with typography and spacing that hold up across every screen size. Each screen is drawn to feel calm, deliberate, and easy to scan.",
      "The result is a reusable visual system — type scale, colour, components, and motion rules — so the website can grow without losing its character.",
    ],
    milestones: ["Art Direction", "Layout & Typography", "Design System"],
    image: designImg,
  },
  {
    index: "03",
    title: "Development",
    heading: "Fast, Clean Builds",
    body: [
      "I build the website with lightweight, hand-written code and smooth motion, keeping load times low and interactions responsive on every device.",
      "Everything is structured so content stays easy to edit later, with accessible markup, sensible components, and no unnecessary weight.",
    ],
    milestones: ["Responsive Build", "Motion & Interaction", "Performance Pass"],
    image: developmentImg,
  },
  {
    index: "04",
    title: "Marketing & SEO",
    heading: "Built To Be Found",
    body: [
      "A refined website only works if people reach it. I set up clear metadata, semantic structure, and fast pages so search engines can read and rank the site properly.",
      "From there I help shape the launch: landing pages, copy structure, and simple tracking so you can see what actually brings people in.",
    ],
    milestones: ["Technical SEO", "Landing Pages", "Analytics Setup"],
    image: marketingImg,
  },
];

/**
 * Pinned edges (left-0 / right-0) + grid-cols-4 interior lines — same
 * pattern as Hero/About/Portfolio/Process. The previous flex
 * justify-between version placed all 5 lines by flex-basis, which
 * rounds to different subpixels than the content grid below at odd
 * viewport widths, so lines drifted or vanished out of sync with the
 * rest of the page. Sharing the literal grid-cols-4 track definition
 * guarantees pixel-identical lines. Hairlines use rem instead of the
 * `w-px` utility so they scale with root font size.
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

function SectionLabel({ index, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
      {index ? <span className="label uppercase text-primary/60">{index}</span> : null}
      <span className="label uppercase text-primary">{title}</span>
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
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

/** Character-level rise-in reveal. */
function Reveal({ parts, className, start = 0 }) {
  const { ref, seen } = useInView();
  let i = start;
  return (
    <span ref={ref} className={className}>
      {parts.map((part, p) =>
        part.text.split("\n").map((line, l, lines) => (
          <span key={`${p}-${l}`}>
            {line.split(" ").map((word, w) => (
              <span key={`${word}-${w}`} className="mr-[0.26em] inline-block whitespace-nowrap">
                {word.split("").map((ch, c) => {
                  const delay = i++ * 11;
                  return (
                    <span
                      key={`${ch}-${c}`}
                      className={`inline-block transition-[transform,opacity] duration-500 ease-out ${
                        part.muted ? "text-primary/60" : "text-primary"
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
            ))}
            {l < lines.length - 1 ? <br /> : null}
          </span>
        ))
      )}
    </span>
  );
}

function BookACall() {
  return (
    <a href="#contact" className="group inline-flex items-center gap-0">
      <span className="label relative block h-[11px] overflow-hidden pr-3 uppercase text-primary">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Book a Call
        </span>
        <span className="absolute inset-x-0 top-full block pr-3 transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Book a Call
        </span>
      </span>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-accent">
        <ChevronRight className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
      </span>
    </a>
  );
}

function ContactCard() {
  return (
    <div className="flex border border-primary/[0.08] bg-[#191919]">
      <img
        src={avatarCta}
        alt="Portrait of the Saffronix founder"
        width={1000}
        height={1200}
        loading="lazy"
        className="block aspect-[5/6] w-[110px] shrink-0 border-t-[2px] border-accent object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 px-5 py-4">
        <div>
          <p className="font-heading-sans text-[15px] font-medium tracking-tight uppercase text-primary">
            Saffronix Studio
          </p>
          <p className="label mt-2 uppercase text-primary/60">Designer &amp; Developer</p>
        </div>
        <BookACall />
      </div>
    </div>
  );
}

function PlusIcon({ open }) {
  return (
    <span className="relative block h-3 w-3 shrink-0 transition-transform duration-400 ease-out group-hover:rotate-180 lg:h-4 lg:w-4">
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-primary" />
      <span
        className={`absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-primary transition-transform duration-400 ease-out ${
          open ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}

function AccordionItem({ s, open, onToggle, first }) {
  const bodyRef = useRef(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => setH(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className={`relative border-x border-b border-primary/[0.06] bg-[#191919] ${
        first ? "border-t" : ""
      }`}
    >
      <span
        className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-accent transition-transform duration-500 ease-out ${
          open ? "scale-x-100" : "scale-x-0"
        }`}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8 md:py-10"
      >
        <span className="flex items-center gap-4">
          <span
            className={`h-[7px] w-[7px] shrink-0 bg-accent transition-transform duration-400 ease-out ${
              open ? "scale-100" : "scale-0"
            }`}
          />
          <span className="label relative block h-[16px] overflow-hidden text-[11px] text-primary/60 lg:text-[14px]">
            <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
              {s.index}
            </span>
            <span className="absolute inset-x-0 top-full block transition-transform duration-400 ease-out group-hover:-translate-y-full">
              {s.index}
            </span>
          </span>
          <span className="label text-[11px] text-primary lg:text-[14px]">{s.title}</span>
        </span>
        {open ? (
          <X className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
        ) : (
          <PlusIcon open={open} />
        )}
      </button>

      <div
        className="overflow-hidden transition-[height,opacity] duration-500 ease-out"
        style={{ height: open ? h : 0, opacity: open ? 1 : 0 }}
      >
        <div ref={bodyRef} className="px-6 pb-10 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[164px_minmax(0,1fr)_180px] lg:gap-10">
            <img
              src={s.image}
              alt={`${s.heading} reference`}
              width={1000}
              height={1000}
              loading="lazy"
              className="block aspect-square w-[164px] border-t-[2px] border-accent object-cover"
            />
            <div>
              <h3 className="font-heading-sans text-[28px] leading-[1.1] font-medium tracking-[-0.02em] text-primary md:text-[38px]">
                {s.heading}
              </h3>
              <p className="mt-6 max-w-[44ch] font-heading-sans text-[14px] leading-[1.45] text-primary/60 md:text-[15px]">
                {s.body[0]}
              </p>
              <p className="mt-5 max-w-[44ch] font-heading-sans text-[14px] leading-[1.45] text-primary/60 md:text-[15px]">
                {s.body[1]}
              </p>
            </div>
            <div className="border-t border-primary/[0.08] pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <p className="label text-primary/60">Milestones</p>
              <ul className="mt-5 space-y-3">
                {s.milestones.map((m) => (
                  <li key={m} className="flex items-center gap-3">
                    <span className="h-[6px] w-[6px] shrink-0 bg-accent" />
                    <span className="label whitespace-nowrap text-primary">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [openIndex, setOpenIndex] = useState("01");

  return (
    <section id="services" className="relative bg-[#161616] py-16 md:py-20 lg:py-24">
      {/* overflow-hidden moved here (off the section) so it only clips
          these decorative layers. Previously it sat on the section
          itself, which wraps the sticky "Services" label below —
          any ancestor with overflow other than visible becomes the
          containing block position:sticky measures against, and that
          was silently preventing the label from sticking. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GuideLines />
        <span className="absolute inset-0 bg-grain opacity-[0.14]" />
      </div>

      <div className="relative z-10 px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-x-0 gap-y-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {/* Services label — now spans both the header row and the
              accordion row below (lg:row-span-2) and sticks to the top
              of the viewport while that combined block scrolls, so it
              stays in place until the accordion (the right container)
              finishes scrolling past it. lg:self-start keeps the label
              itself sized to its content instead of stretching to fill
              the tall spanned cell. */}
          <div className="md:col-start-1 lg:col-span-1 lg:row-span-2 lg:sticky lg:top-15 lg:self-start">
            <SectionLabel index="03" title="Services" />
          </div>

          <div className="md:col-start-1 lg:col-span-1 lg:pr-8">
            <h2 className="font-heading-sans text-[12vw] leading-[0.95] font-medium uppercase tracking-[-0.04em] md:text-[6vw] lg:text-[5vw]">
              <Reveal parts={[{ text: "What I", muted: true }]} />
              <br />
              <Reveal parts={[{ text: "Create.", muted: false }]} start={7} />
            </h2>
            {/* Hidden at tablet only — the tablet layout gets its own
                copy of this paragraph in the right column below,
                aligned with the second guideline. Mobile (default,
                stacked) and desktop (lg:block) keep it right under
                the heading exactly as before. */}
            <p className="mt-6 max-w-[34ch] font-heading-sans text-[15px] leading-[1.35] font-medium tracking-tight uppercase md:hidden md:text-[17px] lg:mt-16 lg:block">
              <Reveal
                parts={[
                  { text: "From first concept to final build, I create websites with", muted: true },
                  { text: "clear structure & smooth interactions.", muted: false },
                ]}
                start={14}
              />
            </p>
          </div>

          <div className="hidden lg:col-start-4 lg:block">
            <SectionLabel title="Contact" />
            <h3 className="mt-7 font-heading-sans text-[2.2vw] leading-[1.1] font-medium uppercase tracking-[-0.03em]">
              <span className="text-primary/60">Plan Your</span>
              <br />
              <span className="text-primary">Next Website</span>
              <br />
              <span className="text-primary/60">with </span>
              <span className="text-primary">Me.</span>
            </h3>
            <div className="mt-7">
              <ContactCard />
            </div>
          </div>

          {/* Tablet-only right column: paragraph + Book a Call container,
              starting at the second guideline (md:col-start-2 of the
              2-col grid) with a generous top margin so its top lines up
              with "Create." rather than "What I". Hidden on mobile
              (stacks under the heading there via the paragraph above)
              and hidden again at lg, where the original 4-column
              contact block below takes over. */}
          <div className="hidden md:col-start-2 md:block lg:hidden">
            <p className="max-w-[34ch] font-heading-sans text-[17px] md:text-[15px] leading-[1.35] font-medium tracking-tight uppercase md:mt-8">
              <Reveal
                parts={[
                  { text: "From first concept to final build, I create websites with", muted: true },
                  { text: "clear structure & smooth interactions.", muted: false },
                ]}
                start={14}
              />
            </p>
            <div className="mt-10">
              <ContactCard />
            </div>
          </div>

          {/* accordion — merged into the same grid (was previously its
              own separate grid below), so it shares row tracks with the
              sticky Services label above. Gap above it tightened on
              mobile/tablet (mt-14 -> mt-8); lg:mt-16 unchanged. */}
          <div className="mt-4 md:col-span-2 lg:col-span-3 lg:col-start-2 lg:mt-16">
            {services.map((s, i) => (
              <AccordionItem
                key={s.index}
                s={s}
                first={i === 0}
                open={openIndex === s.index}
                onToggle={() => setOpenIndex(openIndex === s.index ? null : s.index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;