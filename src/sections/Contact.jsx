import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Menu from "../components/Menu";
import portrait from "../assets/about-portrait.webp";

/**
 * GuideLines — the paper-surface variant of the site-wide hairline grid
 * (same rem-based hairlines, same px-8 lg:px-12 gutters and grid-cols-4
 * columns as Process/Footer, but drawn in the light paper-line token so
 * the columns land on exactly the same pixel positions site-wide).
 */
function GuideLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 px-8 lg:px-12">
      <div className="relative h-full">
        <span className="absolute inset-y-0 left-0 block w-[0.0625rem] origin-left scale-x-50 bg-paper-foreground/10" />

        <div className="grid h-full grid-cols-4" style={{ gridTemplateRows: "100%" }}>
          <span
            className="hidden h-full w-[0.0625rem] origin-left scale-x-50 bg-paper-foreground/10 lg:block"
            style={{ gridColumnStart: 2, justifySelf: "start" }}
          />
          <span
            className="hidden h-full w-[0.0625rem] origin-left scale-x-50 bg-paper-foreground/10 md:block"
            style={{ gridColumnStart: 3, justifySelf: "start" }}
          />
          <span
            className="hidden h-full w-[0.0625rem] origin-left scale-x-50 bg-paper-foreground/10 lg:block"
            style={{ gridColumnStart: 4, justifySelf: "start" }}
          />
        </div>

        <span className="absolute inset-y-0 right-0 block w-[0.0625rem] origin-right scale-x-50 bg-paper-foreground/10" />
      </div>
    </div>
  );
}

function Marker() {
  return <span className="h-[7px] w-[7px] shrink-0 bg-accent" />;
}

function SectionLabel({ title }) {
  return (
    <div className="flex items-center gap-2.5">
      <Marker />
      <span className="label text-paper-foreground">{title}</span>
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <div className="flex items-center gap-2.5 py-3">
      <Marker />
      <span className="label text-paper-muted">{children}</span>
    </div>
  );
}

/**
 * Wordmark — 1:1 port of PortfolioPage's Wordmark: same `active` prop
 * (driven by the same menuOpen state as Menu), same "label" typography
 * class, same z-[80], same paper-foreground / bold-white toggle, and
 * the same "SAFFRONIX" text instead of the old static "Hanza®" mark.
 */
function Wordmark({ active = false, className = "" }) {
  return (
    <a href="/" className={className}>
      <span
        className={`label relative z-[80] text-[16px] leading-none font-medium tracking-tight transition-colors duration-300 ${
          active ? "text-white! font-bold!" : "text-paper-foreground"
        }`}
      >
        SAFFRONIX
      </span>
    </a>
  );
}

const SOCIAL_GLYPHS = [
  { label: "Framer", path: "M4 2h16v6h-8l8 8H4V8h8L4 2Zm0 14h8v6l-8-6Z" },
  {
    label: "X",
    path: "M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6-5.4 6H2.6l7-8L2.4 3h6.2l4.2 5.6L17.5 3Zm-1 16h1.7L7.6 4.8H5.8L16.5 19Z",
  },
  {
    label: "Dribbble",
    path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.6 4.6a8 8 0 0 1 1.8 4.8c-2.3-.4-4.4-.4-6.4-.1a37 37 0 0 0-1-2.2c2.3-1 4.1-1.9 5.6-2.5ZM12 4a8 8 0 0 1 5.3 2c-1.4.6-3 1.4-5.2 2.3A34 34 0 0 0 8.6 4.6 8 8 0 0 1 12 4ZM6.7 5.7a37 37 0 0 1 3.5 3.7c-2.6.8-5.3 1.1-7.7 1.1A8 8 0 0 1 6.7 5.7ZM4 12v-.3c2.7 0 5.8-.4 8.8-1.4l.7 1.5c-3.4 1.1-6.1 3.3-7.8 5.8A8 8 0 0 1 4 12Zm8 8a8 8 0 0 1-4.8-1.6c1.5-2.3 4-4.3 7.1-5.3.9 2.4 1.5 4.7 1.8 6.2A8 8 0 0 1 12 20Zm5.8-1.9c-.3-1.4-.8-3.4-1.6-5.7 1.8-.2 3.6-.1 5.6.3a8 8 0 0 1-4 5.4Z",
  },
  {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 3.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2Zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm6.9-11.2a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
  },
];

/**
 * ProfileCard — paper variant of the card used in About/Footer: same
 * border-t-[3px] border-accent + aspect-[3/4] object-top portrait, same
 * name/profession/location rows, drawn on the light surface.
 */
function ProfileCard() {
  return (
    <div className="border-t-[3px] border-accent">
      <img
        src={portrait}
        alt="Portrait of Hanza Novák"
        width={1024}
        height={1344}
        className="block aspect-[15/16] w-full object-cover object-top"
      />

      <div className="flex flex-col border-x border-b border-paper-border bg-paper pb-4">
        <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3.5">
          <div className="flex min-w-0 items-center gap-3 pt-2">
            <Marker />
            <span className="truncate font-heading-sans text-[13px] font-medium tracking-[0.02em] text-paper-foreground uppercase">
              Hanza Novák
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {SOCIAL_GLYPHS.map((s) => (
              <a
                key={s.label}
                href="#contact-form"
                aria-label={s.label}
                className="text-black/70 transition-colors hover:text-accent"
              >
                <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-current">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-start justify-between gap-4 px-5 py-2">
          <span className="label text-paper-muted">Profession</span>
          <span className="max-w-[9rem] text-right font-heading-sans text-[11px] leading-[1.35] font-semibold tracking-[0.04em] text-black uppercase">
            Designer &amp; Framer Expert
          </span>
        </div>

        <div className="flex flex-1 items-center justify-between gap-4 px-5 py-2">
          <span className="label text-paper-muted">Location</span>
          <span className="font-heading-sans text-[11px] font-semibold tracking-[0.04em] text-paper-foreground uppercase">
            Prague, Czechia
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Contact — the "Let's Build Your Website" contact-form section. Lives on
 * its own so it can be composed into ContactPage.jsx (and reused
 * elsewhere) the same way AboutMission/Stats/Services etc. are composed
 * into AboutPage.jsx.
 *
 * Fixes vs. the previous version:
 *  - Wordmark + Menu now share the exact same controlled `menuOpen`
 *    state/pattern as PortfolioPage and AboutHero (Menu gets
 *    open/onOpenChange, Wordmark gets active={menuOpen}), and the
 *    wordmark text is "SAFFRONIX" instead of the old static "Hanza®" mark.
 *  - Tablet bottom-whitespace bug fixed: the section had a flat
 *    `min-h-screen`, which forces it to be at least 100vh tall on every
 *    breakpoint. On tablet the actual content is shorter than 100vh, so
 *    no amount of pb/mt tweaking could remove the leftover gap at the
 *    bottom — the section was simply being stretched to fill the
 *    viewport regardless. Added `md:min-h-0 lg:min-h-screen` so the
 *    height is only forced on mobile and desktop; tablet now sizes to
 *    its actual content. Nothing else touched.
 */
export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section
      id="contact-form"
      className="relative min-h-screen md:min-h-0 lg:min-h-screen bg-paper px-8 pt-10 pb-16 md:pt-13 md:pb-14 lg:px-12 lg:pt-14 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GuideLines />
      </div>

      {/* Header — desktop: dots+MENU then wordmark on guide col 1, and the
          "Contact" eyebrow flush on guide line 3. Mobile: wordmark left,
          MENU (reversed order) right. */}
      <header className="relative z-30 grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between gap-10 md:justify-start">
          <span className="order-2 md:order-1">
            <Menu
              tone="dark"
              className="hidden md:flex"
              open={menuOpen}
              onOpenChange={setMenuOpen}
            />
            <Menu
              tone="dark"
              reverse
              className="flex md:hidden"
              open={menuOpen}
              onOpenChange={setMenuOpen}
            />
          </span>
          <span className="order-1 md:order-2">
            <Wordmark active={menuOpen} />
          </span>
        </div>

        <div className="hidden md:col-start-2 md:block lg:col-start-3">
          <SectionLabel title="Contact" />
        </div>
      </header>

      <div className="relative z-10 mt-14 grid gap-14 md:mt-23 md:grid-cols-2 md:gap-0 lg:mt-25 lg:grid-cols-4">
        {/* LEFT rail — desktop only, sticky like About/Footer */}
        <div className="hidden lg:col-span-1 lg:col-start-1 lg:block">
          <div className="lg:sticky lg:top-15">
            <ProfileCard />
          </div>
        </div>

        {/* RIGHT content */}
        <div className="md:col-span-2 md:col-start-1 lg:col-span-2 lg:col-start-3">
          <h1 className="font-heading-sans text-[11vw] leading-[0.95] font-medium tracking-[-0.04em] uppercase md:text-[6vw] lg:text-[6vw] xl:text-[4.2rem]">
            <span className="text-paper-foreground/60">Let&apos;s Build</span>
            <br />
            <span className="text-black">Your Website.</span>
          </h1>

          <div className="mt-12 grid sm:grid-cols-2 lg:mt-14">
            <p className="font-heading-sans text-[14px] leading-[1.2] font-medium tracking-[0.01em] uppercase max-w-[30ch] md:max-w-[30ch] lg:max-w-[24ch] md:text-[17px] lg:text-[16px]">
              <span className="text-black">Share a few details about your project </span>
              <span className="text-paper-foreground/50">
                and I&apos;ll help you figure out the right structure, scope, and timeline.
              </span>
            </p>
            <div className="mt-8 flex flex-col justify-end lg:mt-0">
              <span className="flex gap-[3px]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-[6px] w-[6px] ${i < 3 ? "bg-accent" : "bg-paper-foreground/15"}`}
                  />
                ))}
              </span>
              <p className="label mt-3 text-black">2 Slots Available</p>
              <p className="label mt-2 text-paper-muted">June 2026</p>
            </div>
          </div>

          <form className="mt-8 flex flex-col gap-6 md:mt-10 lg:mt-14" onSubmit={(e) => e.preventDefault()}>
            <div>
              <FieldLabel>Your Name</FieldLabel>
              <input
                type="text"
                placeholder="Jane Smith"
                className="h-13 w-full border border-paper-border bg-[#fcfcfc] px-4 font-heading-sans text-[14px] text-paper-foreground placeholder:text-paper-foreground/70 focus:outline-none md:text-[16px] lg:text-[14px]"
              />
            </div>

            <div>
              <FieldLabel>Email Address</FieldLabel>
              <input
                type="email"
                placeholder="jane@framer.com"
                className="h-13 w-full border border-paper-border bg-[#fcfcfc] px-4 font-heading-sans text-[14px] text-paper-foreground placeholder:text-paper-foreground/70 focus:outline-none md:text-[16px] lg:text-[14px]"
              />
            </div>

            <div>
              <FieldLabel>How can I help?</FieldLabel>
              <textarea
                rows={5}
                placeholder="I need a website ..."
                className="w-full resize-none border border-paper-border bg-[#fcfcfc] px-4 py-3.5 font-heading-sans text-[14px] text-paper-foreground placeholder:text-paper-foreground/70 focus:outline-none md:text-[16px] lg:text-[14px]"
              />
            </div>

            <div className="mt-0 grid sm:grid-cols-2 sm:items-center md:mt-2">
              <button
                type="submit"
                className="mb-2 flex h-13 w-full items-center overflow-hidden bg-ink"
              >
                <span className="label flex-1 px-5 text-left tracking-[0.14em] text-primary/70">
                  Form incomplete
                </span>
                <span className="flex h-13 w-12 shrink-0 items-center justify-center bg-accent">
                  <ChevronRight className="h-4 w-4 text-primary" strokeWidth={2} />
                </span>
              </button>
              {/* Force-broken to two lines to match the reference exactly,
                  rather than letting it reflow at different widths. */}
              <p className="font-heading-sans text-[12px] leading-[1.5] text-accent-foreground/70 sm:pl-6 sm:text-right">
                By submitting, you agree to our
                <br />
                <a href="#contact-form" className="text-black underline underline-offset-2">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#contact-form" className="text-black underline underline-offset-2">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}