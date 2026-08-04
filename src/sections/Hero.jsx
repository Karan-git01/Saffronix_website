import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import heroVideo from "../assets/hero-saffron.mp4";
import heroBloom from "../assets/hero-bloom.webp";
import avatar1 from "../assets/avatar-1.webp";
import avatar2 from "../assets/avatar-2.webp";
import avatar3 from "../assets/avatar-3.webp";
import avatar4 from "../assets/avatar-4.webp";
import avatarCta from "../assets/avatar-cta.webp";

const services = [
  { index: "/01", label: "Web Design" },
  { index: "/02", label: "Website Development" },
  { index: "/03", label: "Motion" },
];

const trustedAvatars = [
  { src: avatar1, alt: "Portrait of a founder Saffronix works with" },
  { src: avatar2, alt: "Portrait of a studio client" },
  { src: avatar3, alt: "Portrait of a brand owner" },
  { src: avatar4, alt: "Portrait of a returning client" },
];

function DotsGrid() {
  return (
    <span className="grid shrink-0 grid-cols-2 gap-[3px]">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="h-[3.5px] w-[3.5px] bg-foreground/25" />
      ))}
    </span>
  );
}

/** The small square markers that sit under the copy and the service list. */
function SquareDot() {
  return <span className="mt-6 block h-[5px] w-[5px] bg-foreground/45" />;
}

function LocalTime({ className = "" }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="label text-foreground">{time ?? "--:-- --"}</span>
      <span className="label text-foreground/45">Local Time</span>
    </div>
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

function StartProjectCta() {
  return (
    <a
      href="#contact"
      className="group flex h-11 w-fit items-center overflow-hidden bg-ink text-foreground"
    >
      {/* Slides out on the left when hovered */}
      <ArrowBox className="w-0 group-hover:w-11" />
      <span className="ml-1 hidden h-9 w-9 shrink-0 overflow-hidden sm:block">
        <img
          src={avatarCta}
          alt="Studio founder"
          width={512}
          height={512}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </span>
      <span className="label relative block overflow-hidden px-4 whitespace-nowrap">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Start Project{" "}
          {/* Borel — used specifically on this saffron/accent-colored word */}
          <span className="font-script text-foreground/40">/Studio</span>
        </span>
        <span className="absolute inset-x-4 top-0 block translate-y-full transition-transform duration-400 ease-out group-hover:translate-y-0">
          Start Project{" "}
          <span className="font-script text-accent">/Studio</span>
        </span>
      </span>
      {/* Retracts into the button on hover */}
      <ArrowBox className="w-11 group-hover:w-0" />
    </a>
  );
}

function TrustedCluster() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex shrink-0 -space-x-3">
        {trustedAvatars.map((a) => (
          <img
            key={a.src}
            src={a.src}
            alt={a.alt}
            width={512}
            height={512}
            loading="lazy"
            className="h-9 w-9 rounded-full border border-foreground/25 object-cover"
          />
        ))}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-display text-[13px] font-medium tracking-tight text-foreground">
            4.92<span className="text-foreground/45">/5</span>
          </span>
          <span className="flex gap-[3px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-[5px] w-[5px] ${i < 4 ? "bg-accent" : "bg-foreground/25"}`}
              />
            ))}
          </span>
        </div>
        <p className="label mt-1 truncate text-foreground/55">
          Trusted by <span className="text-foreground">122+</span> Founders
        </p>
      </div>
    </div>
  );
}

/** 2 guide lines on mobile, 3 on tablet, 5 on desktop. */
function GuideLines() {
  const visibility = [
    "block",
    "hidden lg:block",
    "hidden md:block",
    "hidden lg:block",
    "block",
  ];
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex justify-between px-6 lg:px-10">
      {visibility.map((v, i) => (
        <span key={i} className={`w-px bg-foreground/[0.07] ${v}`} />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-hero-base lg:min-h-svh">
      <video
        src={heroVideo}
        poster={heroBloom}
        autoPlay
        muted
        loop
        playsInline
        aria-label="Macro footage of a backlit saffron petal slowly rotating"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-veil" />
      <GuideLines />

      {/* Top bar — mirrors the reference: mobile shows logo + menu at the
          edges; desktop shows the menu/logo group, local time, and CTA
          spread across the row via justify-between. */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-6 lg:grid lg:grid-cols-4 lg:px-10">
        {/* mobile: logo left */}
        <span className="truncate font-display text-[15px] font-medium tracking-tight text-foreground md:hidden">
          SAFFRONIX
        </span>

        {/* mobile: local time — sits between logo and menu button in the
            flex row. Normal flow (not fixed), so it can never overlap
            other content on small screens. justify-between spaces it
            evenly between the two edge items. Hidden from md up, where
            the desktop version below takes over. */}
        <LocalTime className="md:hidden " />

        {/* desktop: dots + menu + divider + logo — sits between line 1 and line 2 */}
        <div className="hidden items-center gap-4 md:flex lg:col-start-1">
          <button type="button" className="group flex items-center gap-2">
            <DotsGrid />
            <span className="label text-[13px] tracking-[0.06em] text-foreground">
              Menu
            </span>
          </button>
          <span className="h-px w-6 bg-foreground/30" />
          <span className="truncate font-display text-[15px] font-medium tracking-tight text-foreground">
            SAFFRONIX
          </span>
        </div>

        {/* desktop: local time — sits in normal flow between the menu
            group and the CTA, so it's aligned with both instead of
            floating independently over the page. */}
        <div className="hidden md:block lg:col-start-2">
          <LocalTime />
        </div>

        {/* mobile: menu right */}
        <button type="button" className="group flex items-center gap-2 md:hidden">
          <span className="label text-[13px] tracking-[0.06em] text-foreground">
            Menu
          </span>
          <DotsGrid />
        </button>

        {/* desktop: CTA — starts at line 4 and ends at line 5 */}
        <div className="hidden md:block lg:col-start-4">
          <StartProjectCta />
        </div>
      </header>

      {/* Bottom content — mirrors the reference: copy row pushed to the
          right, then the wordmark with the trusted-avatar cluster
          overlapping it at the bottom-left, instead of living in its own
          column. */}
      <div className="relative z-10 mt-auto flex flex-col px-6 pb-4 lg:px-10 lg:pb-8">
        {/*
          sm: the wrapper below is pinned to sm:col-start-2 (the second of
          the two sm:grid-cols-2 columns) as soon as the grid becomes
          2-column at 640px, so it starts at the center column line at
          every width from sm up. It's a flex row from sm on (sm:flex), so
          the paragraph and the services list sit side by side within that
          column instead of stacking — services visually come "after" the
          paragraph, at every width down to 640px, not just from 768px up.
          lg: lg:contents removes the wrapper's own box, so its two children
          become independent grid items again, placed at lg:col-start-3 /
          lg:col-start-4 side by side across separate columns, as before.
        */}
        <div className="grid ml-0 mr-2 sm:grid-cols-2 lg:grid-cols-4 lg:justify-items-start">
          <div className="sm:col-start-2 sm:flex sm:items-start sm:gap-10 lg:contents">
            <div className="lg:col-start-3">
              <p className="max-w-[26ch] font-display text-sm leading-[1.35] tracking-tight text-foreground/55 uppercase md:text-base">
                <span className="text-foreground">
                  I help founders and growing brands
                </span>{" "}
                turn their ideas into refined websites.
              </p>
              <SquareDot />
            </div>
            <div className="hidden sm:block lg:col-start-4">
              <ul>
                {services.map((s) => (
                  <li key={s.index} className="flex items-baseline gap-3">
                    <span className="font-display text-sm leading-[1.35] tracking-tight text-foreground/40 md:text-base">
                      {s.index}
                    </span>
                    <span className="font-display text-sm leading-[1.35] tracking-tight text-foreground uppercase md:text-base">
                      {s.label}
                    </span>
                  </li>
                ))}
              </ul>
              <SquareDot />
            </div>
          </div>
        </div>

        <div className="relative">
          <h1 className="mt-6 md:text-right">
            {/* Mobile only: SVG stretches the glyphs so the wordmark starts
                and ends exactly on the guide lines (one line to the other),
                centered, regardless of natural glyph width. */}
            <svg
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
              className="block h-[17.4vw] w-full -mb-3 md:hidden"
              aria-hidden="true"
            >
              <text
                x="0"
                y="169"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                fontSize="200"
                letterSpacing="-9"
                className="font-wordmark fill-foreground font-medium"
              >
                SAFFRONIX
              </text>
            </svg>
            {/* Tab/desktop: size scales continuously with viewport width
                via vw units — untouched from your existing value. */}
            <span className="font-wordmark hidden w-full leading-[0.78] font-medium tracking-[-0.045em] whitespace-nowrap text-foreground md:block md:text-[10.5vw] lg:text-[10.6vw]">
              SAFFRONIX
            </span>
          </h1>

          {/* Trusted cluster overlaps the wordmark at the bottom-left,
              hidden on mobile, same as the reference layout. */}
          <div className="absolute bottom-0 left-0 hidden md:block">
            <TrustedCluster />
          </div>
        </div>
      </div>
    </section>
  );
}