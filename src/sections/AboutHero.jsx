import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Menu from "../components/Menu";
import portrait from "../assets/about-portrait.webp";
import avatarCta from "../assets/avatar-cta.webp";

/**
 * About hero — dark surface.
 * Guides: three hairlines only (left edge, exact middle, right edge). The
 * middle line splits the section into two equal containers on desktop.
 */
export function GuideLines3({ tone = "dark" }) {
  const color = tone === "paper" ? "bg-paper-line" : "bg-border";
  return (
    <div className="pointer-events-none absolute inset-0 z-20 px-8 lg:px-12">
      <div className="relative h-full">
        <span className={`absolute inset-y-0 left-0 block w-px origin-left scale-x-50 ${color}`} />
        <span className={`absolute inset-y-0 left-1/2 hidden w-px origin-left scale-x-50 md:block ${color}`} />
        <span className={`absolute inset-y-0 right-0 block w-px origin-right scale-x-50 ${color}`} />
      </div>
    </div>
  );
}

function Wordmark({ active = false, className = "" }) {
  return (
    <a href="/" className={className}>
      <span
        className={`label relative z-[80] text-[16px] leading-none font-medium tracking-tight transition-colors duration-300 ${
          active ? "text-white! font-bold!" : "text-white"
        }`}
      >
        SAFFRONIX
      </span>
    </a>
  );
}

function ArrowBox({ className = "" }) {
  return (
    <span
      className={`relative flex h-11 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out ${className}`}
    >
      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
    </span>
  );
}

/**
 * Black bar: square avatar, label, saffron chevron square.
 *
 * `className` is an optional override appended after the base classes —
 * used by the tablet layout to kill the `mr-12` (via an `!` important
 * class) so the button's right edge actually reaches the container's
 * right edge instead of stopping short of it. Desktop's call site passes
 * nothing, so its rendered markup — and the "mr-12" spacing gap it
 * intentionally relies on inside the absolute-positioned wrapper — is
 * unchanged.
 */
function StartProject({ className = "" }) {
  return (
      <a
        href="#contact"
        className={`group flex h-13 w-full items-center overflow-hidden bg-ink text-foreground mr-12 ${className}`}
      >
        {/* Slides out on the left when hovered */}
        <ArrowBox className="h-13 w-0 group-hover:w-12" />
        <span className=" hidden h-14 w-13 shrink-0 items-center justify-center overflow-hidden sm:flex">
          <img
            src={avatarCta}
            alt="Studio founder"
            width={512}
            height={512}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </span>
        <span className="label relative block min-w-0 flex-1 overflow-hidden px-2 text-[clamp(11px,1vw,12px)] whitespace-nowrap md:px-4">
          <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
            Start Project{" "}
            {/* Borel — used specifically on this saffron/accent-colored word */}
            <span className="label text-foreground/40">/Studio</span>
          </span>
          <span className="absolute inset-x-2 top-0 block translate-y-full transition-transform duration-400 ease-out group-hover:translate-y-0 md:inset-x-4">
            Start Project{" "}
            <span className="label text-accent">/Studio</span>
          </span>
        </span>
        {/* Retracts into the button on hover */}
        <ArrowBox className="w-14 h-13 group-hover:w-0" />
      </a>
    );
}

/**
 * `size` controls the h1's own font-size class. It defaults to the
 * original "text-[6vw]" used everywhere before — so desktop and mobile
 * (which don't pass `size`) render byte-identical to before. Only the
 * tablet call site overrides it, because the h1 always set its own
 * explicit font-size directly, which is why resizing the *wrapping* div
 * around {heading} previously had zero visible effect.
 */
function Heading({ size = "text-[6vw]" }) {
  return (
    <h1 className={`font-heading-sans leading-[0.95] ${size} font-medium tracking-[-0.04em] uppercase`}>
      <span className="block text-[#a0a0a0]">Design,</span>
      <span className="block text-[#a0a0a0]">Build</span>
      <span className="block text-white">&amp; Launch.</span>
    </h1>
  );
}

const intro = (
  <p className="font-heading-sans text-[15px] leading-[1.5] font-medium tracking-[0.01em] uppercase">
    <span className="text-white">
      I help brands communicate clearly online with custom websites{" "}
    </span>
    <span className="text-foreground/50">with smooth user experiences.</span>
  </p>
);

/**
 * Same vertical text-slide animation as AboutMission's BookACall: a
 * fixed-height label holding two stacked copies of the text, both
 * translating up on hover so the duplicate slides into view underneath
 * as the first slides out. Square + chevron sizing kept as they were
 * (h-[22px]/w-[22px] box, h-[12px]/w-[12px] icon) — only the text
 * animation mechanic changed.
 */
function ViewPortfolio() {
  return (
    <a href="/portfolio" className="group inline-flex items-center gap-3 text-white">
      <span className="label relative block h-[12px] overflow-hidden text-[12px] tracking-[0.06em]">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          View Portfolio
        </span>
        <span className="absolute inset-x-0 top-full block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          View Portfolio
        </span>
      </span>
      <span className="flex h-[22px] w-[22px] items-center justify-center bg-accent transition-transform duration-300 group-hover:translate-x-1">
        <ChevronRight className="h-[12px] w-[12px] text-primary" strokeWidth={1.6} />
      </span>
    </a>
  );
}

function AboutMeLabel() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-[6px] w-[6px] shrink-0 bg-accent" />
      <span className="label text-[12px] tracking-[0.08em] text-white">ABOUT ME</span>
    </div>
  );
}

function Portrait({ className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={portrait}
        alt="Hanza Novák, designer and Framer expert"
        width={1200}
        height={1408}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.22]" />
      <span className="absolute bottom-0 left-0 lg:-left-1 md:left-12 right-0 px-0 pb-8 md:pb-20 lg:pb-12 text-center md:text-left font-heading-sans text-[clamp(4rem,16vw,5.5rem)] lg:text-[clamp(3.4rem,15vw,7.5rem)] md:text-[clamp(3.4rem,16vw,8.5rem)] leading-[0.8] font-medium tracking-[-0.03em] text-primary">
        SAFFRONIX
      </span>
    </div>
  );
}

export default function AboutHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden mt-3 md:mt-0 bg-[#111111]" aria-label="About hero">
      <div className="bg-noise pointer-events-none absolute inset-0 z-10 opacity-[0.12]" />
      <GuideLines3 />

      {/* ---------------- Desktop (lg+) — two equal halves ---------------- */}
      <div className="relative z-30 hidden lg:grid lg:min-h-screen lg:grid-cols-2">
        <div className="flex flex-col px-12 pt-[52px] pb-[52px]">
          <div className="flex items-center pt-2 gap-5">
            <Menu tone="light" open={menuOpen} onOpenChange={setMenuOpen} />
            <span className="block h-px w-5 bg-primary/35" />
            <Wordmark />
          </div>

          <div className="mt-auto">
            <AboutMeLabel />
            <div className="mt-6 text-[clamp(3.2rem,6.2vw,5.2rem)]"><Heading /></div>
          </div>

          <div className="mt-14 grid grid-cols-2 items-end gap-8">
            <div className="max-w-[26ch]">{intro}</div>
            <div className="flex justify-start">
              <ViewPortfolio />
            </div>
          </div>
        </div>

        <div className="relative">
          <Portrait className="h-full w-full" />
          <div className="absolute top-[38px] pt-2 right-0 z-40 flex justify-end pr-0">
            <StartProject />
          </div>
        </div>
      </div>

      {/* ---------------- Tablet (md–lg) — black bar split in two, image below ----------------
          Black nav/heading container: 34% viewport height.
          Portrait container: 60% viewport height.
          StartProject: spans exactly guide-line 2 (middle) to guide-line 3
          (right edge) — its own "mr-12" is killed via the className prop
          so the button's right edge actually lands on guide 3.
          Intro column: grid gap removed so column 2 starts exactly at the
          50% mark (guide 2) instead of 50% + half the old gap-8.
          Heading: bumped up via the Heading component's size prop. ---------------- */}
      <div className="relative z-30 hidden md:block lg:hidden">
        <div className="px-8 pt-8 pb-2 min-h-[34vh]">
          <div className="relative flex items-center">
            <div className="flex items-center pt-4 gap-5">
              <Menu tone="light" open={menuOpen} onOpenChange={setMenuOpen} />
              <span className="block h-px w-5 bg-primary/35" />
              <Wordmark />
            </div>
            <div className="absolute inset-y-0 left-1/2 pt-4 right-0 flex items-center">
              <StartProject className="mr-0!" />
            </div>
          </div>

          <div className="grid grid-cols-2 items-start pt-26 pb-12">
            <div className="pr-8">
              <Heading size="text-[clamp(2.6rem,7.5vw,4.4rem)]" />
            </div>
            <div className="max-w-[34ch] self-end pl-0">{intro}</div>
          </div>
        </div>

        <Portrait className="h-[60vh] w-full" />
      </div>

      {/* ---------------- Mobile ---------------- */}
      <div className="relative z-30 md:hidden">
        <div className="px-8 pt-7">
          <div className="flex items-center justify-between">
            <Wordmark />
            <Menu reverse tone="light" open={menuOpen} onOpenChange={setMenuOpen} />
          </div>

          <div className="pt-10 text-[clamp(2.2rem,11.5vw,3.2rem)]"><Heading size="text-[clamp(2.2rem,11.5vw,3.2rem)]" /></div>
          <div className="pt-6 pb-10 max-w-[34ch]">{intro}</div>
        </div>

        <Portrait className="h-[100vw] min-h-[320px] w-full" />
      </div>
    </section>
  );
}