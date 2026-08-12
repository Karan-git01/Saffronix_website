import { ChevronRight } from "lucide-react";
import portrait from "../assets/about-portrait.webp";

/**
 * GuideLines — copied verbatim from Process.jsx (rem-based hairlines,
 * bg-primary/[0.07], grid-cols-4, px-8 lg:px-12) instead of the
 * original Lovable version's bg-guide token + always-visible mobile
 * interior line. This is the same dark-section guide-line treatment
 * used everywhere else, so Footer's lines land on the same pixel
 * columns as About/Process/Stats/Testimonials above it.
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

/** Same eyebrow pattern used by About/Process/Testimonials/CaseStudy. */
function SectionLabel({ title }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
      <span className="label text-primary">{title}</span>
    </div>
  );
}

function Marker() {
  return <span className="h-[7px] w-[7px] shrink-0 bg-accent" />;
}

function FieldLabel({ children }) {
  return (
    <div className="flex items-center gap-2.5 py-3">
      <Marker />
      <span className="label text-primary/60">{children}</span>
    </div>
  );
}

const navLinks = ["Home", "Portfolio", "About", "Contact", "Blog", "404"];

/**
 * Copied verbatim from About.jsx's own GetInTouch component (same
 * bg-ink bar + sliding bg-accent ArrowBox on hover) — this is the
 * exact same CTA already used for the profile-card button elsewhere,
 * relabeled to /Saffronix to match the brand used everywhere else.
 */
function GetInTouch() {
  return (
    <a
      href="#contact"
      className="group flex h-12 w-full items-center overflow-hidden bg-ink text-primary"
    >
      <span className="flex h-12 w-0 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out group-hover:w-12">
        <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2} />
      </span>
      <span className="label relative block flex-1 overflow-hidden px-4 whitespace-nowrap">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Get in Touch <span className="opacity-60">/Saffronix</span>
        </span>
        <span className="absolute inset-x-4 top-0 block translate-y-full transition-transform duration-400 ease-out group-hover:translate-y-0">
          Get in Touch <span className="text-accent">/Saffronix</span>
        </span>
      </span>
      <span className="flex h-12 w-12 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out group-hover:w-0">
        <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2} />
      </span>
    </a>
  );
}

/**
 * ContactMeCta — same vertical text-swap hover treatment used
 * throughout the rest of the site (CaseStudy's SeeProjectCta,
 * Services' BookACall, Pricing's ConsultBanner CTA): a fixed-height
 * overflow-hidden window holding two stacked copies of "Contact Me",
 * both sliding up on hover so the duplicate (positioned via top-full)
 * arrives from below as the original exits the top - plus the same
 * small square accent icon chip used by those other CTAs.
 */
function ContactMeCta() {
  return (
    <a
      href="#contact"
      className="group mt-6 flex items-center justify-center gap-0 md:inline-flex md:justify-start"
    >
      <span className="label relative block h-[11px] overflow-hidden pr-3 text-primary">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Contact Me
        </span>
        <span className="absolute inset-x-0 top-full block pr-3 transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Contact Me
        </span>
      </span>
      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center bg-accent">
        <ChevronRight className="h-3 w-3 text-primary" strokeWidth={2.5} />
      </span>
    </a>
  );
}

/**
 * ProfileCard — same aspect-[3/4] object-top border-t-[3px]
 * border-accent image treatment as About.jsx's ProfileCard, and the
 * same text-abbreviation social row ("Fr", "X", "Db", "Ig") instead
 * of the original custom SVG icon set, for a 1:1 visual match with
 * the profile card already established there.
 */
function ProfileCard() {
  return (
    <div className="border-t-[3px] border-accent">
      <div className="relative">
        <img
          src={portrait}
          alt="Portrait of the Saffronix founder"
          width={1024}
          height={1344}
          loading="lazy"
          className="block aspect-[3/4] w-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0">
          <GetInTouch />
        </div>
      </div>

      <div className="flex flex-col border-x border-b pb-4 border-primary/[0.05] bg-[#191919]">
        <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
            <span className="truncate font-heading-sans text-[18px] font-medium tracking-tight text-primary">
              SAFFRONIX
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-primary/60">
            {["Fr", "X", "Db", "Ig"].map((s) => (
              <span key={s} className="label transition-colors hover:text-accent">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between gap-4 px-6 py-3">
          <span className="label text-primary/60">Profession</span>
          <span className="font-heading-sans text-[12px] tracking-tight text-primary uppercase">
            Designer & Developer
          </span>
        </div>
        <div className="flex flex-1 items-center justify-between gap-4 px-6 py-3">
          <span className="label text-primary/60">Location</span>
          <span className="font-heading-sans text-[12px] tracking-tight text-primary uppercase">
            Kolkata, India
          </span>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t-[3px] border-accent bg-[#141414] px-8 pt-16 pb-10 md:pt-30 lg:px-12"
    >
      {/* overflow-hidden lives here (not on the footer) so it only clips
          GuideLines, leaving the sticky ProfileCard below free to use
          position:sticky — an overflow-hidden ancestor of any kind
          disables sticky positioning entirely, which is exactly what
          was pinning the left rail from staying fixed. Same fix
          Process.jsx already uses for its own sticky label. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <GuideLines />
      </div>

      <div className="relative z-10 grid gap-14 lg:grid-cols-4 lg:gap-0">
        {/* LEFT rail — desktop only. Matches About.jsx exactly: no extra
            padding (the card now spans the full width of its column,
            edge-to-edge between guide line 1 and guide line 2 — the
            previous lg:pr-12 was pulling its right edge inward, short
            of line 2), and lg:sticky lg:top-15 so it stays fixed in
            place while the right column scrolls past it. */}
        <div className="hidden lg:col-span-1 lg:block">
          <div className="lg:sticky lg:top-15">
            <ProfileCard />
          </div>
        </div>

        {/* RIGHT content */}
        <div className="lg:col-span-2 lg:col-start-3">
          <SectionLabel title="Contact" />

          {/* Heading scale matched to Process.jsx's "5 Steps to
              Launch." heading exactly, instead of the original
              Lovable-specific sm/lg/xl breakpoints. */}
          <h2 className="mt-8 md:mt-12 lg:mt-15 font-heading-sans text-[11vw] leading-[0.95] font-medium uppercase tracking-[-0.04em] md:text-[8vw] lg:text-[6vw] xl:text-[82px]">
            <span className="text-primary/60">Create Your</span>
            <br />
            <span className="text-primary">Next Website</span>
            <br />
            <span className="text-primary">With </span>
            <span className="text-primary/60">Me.</span>
          </h2>

          {/* gap-6 removed from this 2-col grid - with a gap, the true
              visual midpoint of a 2-col 1fr/1fr grid sits in the middle
              of the gap, so the second column's own content started
              about half the gap's width to the right of that midpoint,
              not exactly on it. Since this whole block sits directly
              inside the lg:col-start-3/lg:col-span-2 column with no
              extra padding of its own, that column's exact width IS
              guide line 3 to guide line 5, so this inner grid's own 50%
              mark already equals guide line 4 precisely - removing the
              gap makes the second column's edge land exactly there. The
              "2 Slots Available" block also had its own pl-6, which was
              pushing its content 24px right of that edge - removed so
              it now sits flush against guide line 4 with no offset. */}
          <div className="mt-8 md:mt-8 lg:mt-15 grid sm:grid-cols-2">
            {/* Matches Process.jsx's intro paragraph classes and
                two-tone text-primary/60 / text-primary split exactly. */}
            <p className="font-heading-sans md:max-w-[30ch] text-[14px] md:text-[16px] leading-[1.5] font-medium tracking-[0.01em] uppercase">
              <span className="text-primary/60">From first concept to final build, I create websites with </span>
              <span className="text-primary">clear structure &amp; smooth interactions.</span>
            </p>
            <div className="mt-8 md:mt-10 lg:mt-10 ">
              <span className="flex gap-[3px]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className={`h-[7px] w-[7px] ${i < 3 ? "bg-accent" : "bg-primary/20"}`} />
                ))}
              </span>
              <p className="label mt-3 text-primary">2 Slots Available</p>
              <p className="label mt-2 text-primary/60">June 2026</p>
            </div>
          </div>

          <form className="mt-8 md:mt-14 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <FieldLabel>Your Name</FieldLabel>
              <input
                type="text"
                placeholder="Jane Smith"
                className="h-13 w-full bg-[#191919] px-4 font-heading-sans text-[14px] md:text-[16px] lg:text-[14px] border border-primary/10 text-primary/65 placeholder:text-primary/70 focus:outline-none"
              />
            </div>

            <div>
              <FieldLabel>Email Address</FieldLabel>
              <input
                type="email"
                placeholder="jane@framer.com"
                className="h-13 w-full bg-[#191919] px-4 font-heading-sans text-[14px] md:text-[16px] lg:text-[14px] border border-primary/10 text-primary/65 placeholder:text-primary/70 focus:outline-none"
              />
            </div>

            <div>
              <FieldLabel>How can I help?</FieldLabel>
              <textarea
                rows={5}
                placeholder="I need a website ..."
                className="w-full resize-none bg-[#191919] px-4 py-3.5 font-heading-sans text-[14px] md:text-[16px] lg:text-[14px] border border-primary/10 text-primary/65 placeholder:text-primary/70 focus:outline-none"
              />
            </div>

            <div className="mt-0 md:mt-10 grid sm:grid-cols-2 sm:items-center">
              <button type="submit" className="flex mb-2 h-13 w-full items-center overflow-hidden bg-accent">
                <span className="label flex-1 px-5 text-left tracking-[0.14em] text-primary/70">
                  Form incomplete
                </span>
                <span className="flex h-13 w-12 shrink-0 items-center justify-center bg-primary">
                  <ChevronRight className="h-4 w-4 text-ink" strokeWidth={2} />
                </span>
              </button>
              <p className="font-heading-sans text-xsm leading-[1.5] text-primary/60 sm:pl-6 sm:text-right">
                By submitting, you agree to our{" "}
                <a href="#contact" className="text-primary underline underline-offset-2">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#contact" className="text-primary underline underline-offset-2">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Nav + address */}
      <div className="relative z-10 mt-14 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-0 lg:grid-cols-4">
        {/* Saffronix wordmark — desktop only, lg:col-start-1 so its left
            edge sits flush on guide line 1, the same left edge the
            ProfileCard and page content use above. No explicit
            lg:row-start; auto-placement drops it into row 1 alongside
            the nav list (col 3) and address (col 4), which is the row
            this whole grid already renders as its only row at lg. */}
        <p className="hidden font-heading-sans text-[6.25rem] leading-[0.8] font-medium tracking-[-0.04em] text-primary uppercase lg:mt-25 lg:col-start-1 lg:block">
          Saffronix
        </p>

        <ul className="space-y-2 text-center md:col-start-2 md:row-start-1 md:text-left lg:col-start-3">
          {navLinks.map((l) => (
            <li key={l}>
              <a
                href="#contact"
                className="font-heading-sans text-[14px] font-medium tracking-[0.02em] text-primary uppercase hover:text-primary/60"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="border-t border-primary/[0.05] pt-10 text-center md:col-start-1 md:row-start-1 md:border-0 md:pt-0 md:text-left lg:col-start-4">
          <address className="text-center font-heading-sans text-[15px] leading-[1.6] text-primary/60 not-italic md:text-left">
            Vinohradská 102
            <br />
            120 00 Prague
            <br />
            Czech Republic
          </address>
          {/* Underline + white hover-sweep added: group/relative on the
              anchor itself, a permanent faint underline span, and a
              second white span that sits scale-x-0 (collapsed from the
              left) and grows to scale-x-100 on hover, so a white line
              visibly slides across the existing underline. Switched
              from "block" to "inline-block" so the underline spans sit
              exactly under the text's own width, not the full column
              width - text-center/md:text-left on this parent still
              centers/left-aligns it correctly either way. */}
          <a
            href="mailto:saffronix.cz"
            className="group relative mt-6 inline-block text-center font-heading-sans text-[32px] leading-none font-medium tracking-[-0.03em] text-primary uppercase sm:text-[36px] md:text-left"
          >
            saffronix.com
            <span className="absolute inset-x-0 -bottom-1 block h-px bg-primary/25" />
            <span className="absolute inset-x-0 -bottom-1 block h-px origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </a>
          <ContactMeCta />
        </div>
      </div>

      {/* Bottom bar. border-t/border-primary/[0.05] removed - that was
          the full-width hr sitting right above the "Saffronix"
          wordmark row; padding (pt-10/md:pt-6) kept as-is for spacing
          even without the visible line. */}
      <div className="relative z-10 mt-8 grid items-end gap-10 pt-10 md:mt-16 md:grid-cols-2 md:gap-0 md:pt-6 lg:grid-cols-4">
        {/* "Crafted by" — now shown at every breakpoint (Saffronix moved
            up into the nav+address grid), still col-start-1 and
            bottom-aligned with the copyright/Terms/Privacy columns via
            this row's items-end. */}
        <div className="flex items-center justify-center gap-3 md:col-start-1 md:justify-start">
          <img
            src={portrait}
            alt="Crafted by GOLA Templates"
            width={1024}
            height={1344}
            loading="lazy"
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
          <span>
            <span className="label block text-primary/40">Crafted by</span>
            <span className="label mt-1.5 block text-primary">GOLA Templates</span>
          </span>
        </div>

        <div className="flex flex-col gap-10 md:col-start-2 md:flex-row md:items-start md:justify-between md:gap-6 lg:contents">
          {/* leading-[1.7] -> leading-[1.3]: tightens the gap between
              "© 2026 Saffronix" and "All Right Reserved." */}
          <p className="order-2 border-t border-primary/[0.05] pt-8 text-center md:order-1 md:border-0 md:pt-0 md:text-left lg:col-start-3 lg:row-start-1">
            <span className="label leading-[1.1] text-primary/60">
              © 2026 Saffronix
              <br />
              All Right Reserved.
            </span>
          </p>
          <p className="order-1 border-t border-primary/[0.05] pt-8 text-center md:order-2 md:border-0 md:pt-0 md:text-right lg:col-start-4 lg:row-start-1 lg:text-left">
            <span className="label leading-[1.7] text-primary/60">
              <a href="#contact" className="hover:text-primary">
                Terms
              </a>
              <br />
              <a href="#contact" className="hover:text-primary">
                Privacy Policy
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;