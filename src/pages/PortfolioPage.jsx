import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Menu from "../components/Menu";
import { GuideLines, ProjectPanel, projects } from "../sections/Portfolio";
import avatarCta from "../assets/avatar-cta.webp";
import Footer from "../sections/Footer";

const FILTERS = ["All", "Branding", "Design", "Development"];

/** Wordmark — mirrors Hero's: closed state is the section-appropriate
    foreground color, and when the menu is open it flips to bold white,
    matching the ink-colored menu overlay that sits above this header. */
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

/** 1:1 port of Hero's ArrowBox — slides open/shut on hover. */
function ArrowBox({ className = "" }) {
  return (
    <span
      className={`relative flex h-11 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out ${className}`}
    >
      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
    </span>
  );
}

/** 1:1 port of Hero's StartProjectCta — same markup, sizing, and
    hover animation; only the color token swaps from Hero's
    `text-foreground` (light-on-dark-hero) to this page's `text-primary`
    (light-on-ink-bar), and /Studio becomes /Saffronix. */
function StartProject() {
  return (
    <a
      href="/#contact"
      className="group flex h-13 w-full items-center overflow-hidden bg-ink text-primary"
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
      <span className="label relative block min-w-0 flex-1 overflow-hidden px-2 text-[0.6rem] whitespace-nowrap md:px-4">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          Start Project{" "}
          <span className="label text-primary/40">/Saffronix</span>
        </span>
        <span className="absolute inset-x-2 top-0 block translate-y-full transition-transform duration-400 ease-out group-hover:translate-y-0 md:inset-x-4">
          Start Project{" "}
          <span className="label text-accent">/Saffronix</span>
        </span>
      </span>
      {/* Retracts into the button on hover */}
      <ArrowBox className="w-14 h-13 group-hover:w-0" />
    </a>
  );
}

function PortfolioHeader({ active, onChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const filters = (
    <div className="flex flex-wrap items-center gap-[6px]">
      {FILTERS.map((f) => {
        const on = f === active;
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
            aria-pressed={on}
            className={`label px-[9px] py-[6px] text-[10px] leading-none tracking-[0.06em] transition-colors duration-300 ${
              on
                ? "bg-ink text-primary"
                : "border border-paper-border text-paper-foreground hover:bg-paper-line"
            }`}
          >
            {f.toUpperCase()}
          </button>
        );
      })}
    </div>
  );

  const intro = (
    <div className="font-heading-sans text-[14px] leading-[1.55] tracking-[0.01em] uppercase md:text-[14px]">
      <span className="text-paper-foreground/45">Each project shows how I approach </span>
      <span className="font-medium text-paper-foreground">
        Design, Structure, and&nbsp; Development.
      </span>
    </div>
  );

  // Smooth-scrolls to the project panels below instead of an instant
  // anchor jump. preventDefault + scrollIntoView so it works regardless
  // of whether global smooth-scroll CSS is set anywhere.
  const scrollToWork = (e) => {
    e.preventDefault();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`relative isolate overflow-hidden pt-3 md:pt-5 lg:pt-0 bg-paper ${
        menuOpen ? "z-[1000]" : "z-10"
      }`}
    >
      {/* ^ FIX: the menuOpen -> z-[1000] toggle now lives on <header>
          itself (same as Hero's <header>), not on an inner div. Header
          also carries `isolate`, which makes it its own stacking
          context — raising the z-index of something *inside* that
          context can't lift the header above elements outside it, like
          the Menu's portaled backdrop/panel (appended straight to
          document.body at z-[9998]/z-[9999]). That mismatch is why the
          Wordmark + Menu label never visually reached their
          open-menu white/bold state here, even though `menuOpen` was
          flipping correctly — the backdrop was painting over them.
          Escalating the header's own z-index (its position relative to
          its *parent* context) is what actually needs to happen, exactly
          as Hero already does it. */}
      <GuideLines tone="paper" />

      <div className="relative px-8 lg:px-12">
        {/* ---------- Top bar (mobile/tablet) ----------
            Mirrors Hero's header exactly: below md it's logo-left /
            menu-right; from md up (tablet) it swaps to the
            dots+"Menu"+divider+wordmark group on the left and the CTA
            on the right — the same grouping the desktop block below
            uses, which is what makes the open-menu highlight on the
            label + wordmark actually show (both driven off the same
            `menuOpen` state passed straight into Menu/Wordmark, same
            as desktop). The whole bar disappears at lg, where the
            desktop block below (untouched) takes over. */}
        <div className="flex items-center justify-between pt-7 lg:hidden">
          {/* mobile: logo left */}
          <Wordmark active={menuOpen} className="md:hidden" />

          {/* tablet: dots + menu label + divider + logo — sits on the left */}
          <div className="hidden items-center gap-4 md:flex">
            <Menu tone="dark" open={menuOpen} onOpenChange={setMenuOpen} />
            <span className="block h-px w-6 bg-paper-foreground/30" />
            <Wordmark active={menuOpen} />
          </div>

          {/* mobile: menu right */}
          <Menu
            reverse
            tone="dark"
            className="md:hidden"
            open={menuOpen}
            onOpenChange={setMenuOpen}
          />

          {/* tablet: CTA — right side */}
          <div className="hidden md:block">
            <StartProject />
          </div>
        </div>

        {/* ---------- Top bar (desktop) ---------- */}
        <div className="hidden pt-[52px] lg:grid lg:grid-cols-4 lg:items-center">
          <div className="flex items-center gap-5">
            <Menu tone="dark" open={menuOpen} onOpenChange={setMenuOpen} />
            <span className="block h-px w-5 bg-paper-foreground/35" />
            <Wordmark active={menuOpen} />
          </div>
          <div className="col-start-3 flex items-center gap-3">
            <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
            <span className="label text-[11px] tracking-[0.06em] text-paper-foreground">
              Portfolio
            </span>
          </div>
          <div className="col-start-4 flex justify-end">
            <StartProject />
          </div>
        </div>

        {/* ---------- Mobile body (<md) ---------- */}
        <div className="pt-10 pb-9 md:hidden">
          <h1 className="font-heading-sans text-[12vw] leading-[0.95] font-medium uppercase tracking-[-0.04em]">
            <span className="block text-paper-foreground/60">Case</span>
            <span className="block text-paper-foreground">Studies.</span>
          </h1>
          <div className="mt-6 max-w-[35ch]">{intro}</div>
          <div className="mt-7">{filters}</div>
        </div>

        {/* ---------- Tablet body (md to lg) ----------
            Two columns on the GuideLines' 0% / 50% / 100% tablet
            tracks (grid-cols-4, col 1-2 vs col 3-4 — the only guide
            line visible at this breakpoint sits at grid-col 3, i.e.
            the 50% mark). Filters sit alone in the left column,
            pinned to the bottom; the heading + paragraph share the
            right column, stacked, top-aligned — matching the
            reference layout. */}
        <div className="hidden md:grid md:grid-cols-4 md:pt-10 md:pb-9 lg:hidden">
          <div className="flex flex-col justify-end md:col-span-2">{filters}</div>
          <div className="md:col-start-3 md:col-span-2">
            <h1 className="font-heading-sans mt-15 mb-10 text-[7vw] leading-[0.95] font-medium uppercase tracking-[-0.04em]">
              <span className="block text-paper-foreground/60">Case</span>
              <span className="block text-paper-foreground">Studies.</span>
            </h1>
            <div className="mt-6 max-w-[35ch]">{intro}</div>
          </div>
        </div>

        {/* ---------- Desktop body ---------- */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:pt-[110px] lg:pb-[62px]">
          <div className="col-start-3 col-end-5">
            <h1 className="font-heading-sans text-[12vw] leading-[0.95] font-medium uppercase tracking-[-0.04em] md:text-[6vw] lg:text-[7vw] lg:-ml-1">
              <span className="block text-paper-foreground/60">Case</span>
              <span className="block text-paper-foreground">Studies.</span>
            </h1>
          </div>
        </div>

        {/* ---------- Desktop bottom row ---------- */}
        <div className="hidden pb-[52px] lg:grid lg:grid-cols-4 lg:items-end">
          <div>{filters}</div>
          <div className="col-start-3">{intro}</div>
          <div className="col-start-4 flex justify-end">
            <a
              href="#work"
              onClick={scrollToWork}
              className="group inline-flex items-center gap-3 text-paper-foreground"
            >
              <span className="label text-[11px] tracking-[0.06em]">Explore Work</span>
              <span className="flex h-[22px] w-[22px] items-center justify-center border border-paper-border transition-transform duration-300 group-hover:translate-y-[2px]">
                <ChevronDown className="h-[13px] w-[13px]" strokeWidth={1.5} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const shown =
    filter === "All"
      ? projects
      : projects.filter((p) => p.services.includes(filter));

  return (
    <main>
      <PortfolioHeader active={filter} onChange={setFilter} />
      {/* id="work" — target for the header's "Explore Work" smooth-scroll link */}
      <div id="work">
        {shown.map((p) => (
          <ProjectPanel key={p.index} p={p} />
        ))}
        {shown.length === 0 && (
          <div className="bg-paper px-8 py-24 text-center lg:px-12">
            <p className="label text-paper-muted">No projects in this category yet.</p>
          </div>
        )}
      </div>
      <Footer/>
    </main>
  );
}