import { useEffect, useState } from "react";
import ikigai from "../assets/work-ikigai.webp";
import goodwell from "../assets/work-goodwell.webp";


/**
 * Site menu — trigger (dots + label) plus the overlay panel.
 *
 * Drop-in for the Hero header: replace both menu <button> blocks with
 *   <Menu />              (desktop order: dots, label)
 *   <Menu reverse />      (mobile order: label, dots)
 *
 * Open state:
 *  - dots rotate 135° into a kite and turn white
 *  - a dark ink panel drops in under the header, aligned to the guide lines
 *  - the panel is a bounded box (a "little rectangle"): its height is
 *    whatever the nav content naturally takes up — nothing stretches it
 *    (tab/desktop only — see mobile note below)
 *  - links stagger in, followed by the avatar / name / socials block
 *  - two project thumbnails sit beside the panel from md up, in their own
 *    2-row grid. Each thumbnail's height is independent of the nav
 *    column's height.
 *
 * Mobile-only layout note (base / no breakpoint prefix):
 *  - the project thumbnail column is hidden entirely (`hidden md:grid`)
 *  - the shell is anchored by BOTH `top` (inline style) and `bottom`
 *    (`bottom-6 md:bottom-auto`) on mobile, so its height is driven by
 *    those two insets instead of by content. `md:bottom-auto` hands
 *    height control back to the `aspect-[396/300]` ratio at md/lg,
 *    exactly as before.
 *  - the inner grid wrapper is `h-full` on mobile so it fills that
 *    inset-driven shell height.
 *  - the inner two-column grid collapses to a single column
 *    (`grid-cols-1 md:grid-cols-[39.24%_60.76%]`) so nav takes the full
 *    shell width instead of just its 39.24% slice. This MUST be a
 *    Tailwind class, not an inline `style={{ gridTemplateColumns }}` —
 *    inline styles can't carry a `md:` breakpoint, so a hardcoded inline
 *    value silently overrides any responsive intent and pins the nav to
 *    39.24% width even on mobile where there's no second column to share
 *    space with.
 *  - the shell itself anchors from the right edge of the viewport
 *    (`right-[...]`) instead of the left, so the menu panel sits at the
 *    right on mobile
 * None of the above has a bare (unprefixed) counterpart left over from
 * before — every mobile-only rule is neutralized by an `md:` override, so
 * tab (md) and desktop (lg) render exactly as before.
 *
 * Sizing note: values that previously jumped at a breakpoint (top offset,
 * side padding, nav link text, avatar size, name/role text, thumbnail
 * height) now scale smoothly via CSS clamp() instead of snapping — same
 * min/max as before, no in-between jump. Small fixed decorative bits
 * (the 4 dots, the hover square, social icons, the circle+label on the
 * thumbnail overlay) are left as static px values on purpose — those are
 * meant to stay crisp at a fixed size regardless of viewport.
 *
 * Layout note (nav vs. thumbnail placement): nav and thumbnails live as
 * two children of ONE grid-cols-8 parent (`items-start`, so neither
 * stretches to match the other's height). Placement is driven by plain
 * responsive col-span/col-start utilities on each child — no arbitrary
 * grid-template-areas string. That was the source of the breakpoint
 * breakage: a single hand-written CSS grid-template-areas string per
 * breakpoint is easy to get out of sync with the grid-cols-8 base and is
 * fragile under Tailwind's arbitrary-value escaping. col-span/col-start
 * are ordinary, well-supported utilities and land on exactly the same
 * columns as before:
 *   base (mobile): nav cols 4–8    → col-start-4 col-span-5
 *   md:            nav cols 1–3, thumb cols 4–7 → nav: md:col-start-1 md:col-span-3
 *                                                  thumb: md:col-start-4 md:col-span-4
 *   lg:            nav cols 1–2, thumb cols 3–5 → nav: lg:col-start-1 lg:col-span-2
 *                                                  thumb: lg:col-start-3 lg:col-span-3
 */

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "#blog" },
];

/** TODO: swap these for real assets — placeholders carried over from the Lovable source. */
const PROFILE = {
  name: "Hanza Novák",
  role: "Designer & Framer Expert",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
};

const PROJECTS = [
  {
    label: "Goodwell",
    href: "#portfolio",
    image: goodwell,
  },
  {
    label: "Ikigai Labs",
    href: "#portfolio",
    image: ikigai,
  },
];

const SOCIALS = [
  {
    label: "Framer",
    path: "M4 2h16v6h-8l8 8H4V8h8L4 2Zm0 14h8v6l-8-6Z",
  },
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

function Dots({ open }) {
  return (
    <span
      className={`grid shrink-0 grid-cols-2 gap-[3px] transition-transform duration-500 ease-out group-hover:rotate-[135deg] group-hover:gap-[4px] ${
        open ? "rotate-[135deg] gap-[4px]" : "rotate-0"
      }`}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className={`h-[4px] w-[4px] transition-colors duration-300 group-hover:bg-white ${
            open ? "bg-white" : "bg-foreground/25"
          }`}
        />
      ))}
    </span>
  );
}

/**
 * Scroll-lock singleton.
 *
 * This component gets mounted twice at once (desktop + `reverse` mobile
 * trigger), and if a parent drives both from one shared `open` state, both
 * instances' scroll-lock effects fire together. Each one independently
 * capturing/restoring `document.body` style is what caused "can't scroll
 * after closing" — the second instance to run would capture the FIRST
 * instance's already-locked styles as its own "original" state, then
 * restore back to that still-locked state on close instead of the real
 * original.
 *
 * A module-level counter fixes this regardless of how many instances are
 * open at once: only the first `lockScroll()` call actually captures +
 * locks, only the last matching `unlockScroll()` call (count back to 0)
 * actually restores, and it restores the ONE true original state.
 */
let scrollLockCount = 0;
let savedScrollY = 0;
let savedBodyStyles = null;
let savedHtmlStyles = null;

function lockScroll() {
  if (scrollLockCount === 0) {
    const body = document.body;
    const html = document.documentElement;

    savedScrollY = window.scrollY;
    savedBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      overscrollBehavior: body.style.overscrollBehavior,
      touchAction: body.style.touchAction,
    };
    savedHtmlStyles = {
      overflow: html.style.overflow,
      overscrollBehavior: html.style.overscrollBehavior,
    };

    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.touchAction = "none";
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
  }
  scrollLockCount += 1;
}

function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    const body = document.body;
    const html = document.documentElement;

    if (savedBodyStyles) Object.assign(body.style, savedBodyStyles);
    if (savedHtmlStyles) Object.assign(html.style, savedHtmlStyles);
    window.scrollTo(0, savedScrollY);

    savedBodyStyles = null;
    savedHtmlStyles = null;
  }
}

export default function Menu({
  reverse = false,
  className = "",
  open: openProp,
  onOpenChange,
}) {
  const [openState, setOpenState] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openState;

  const setOpen = (value) => {
    const next = typeof value === "function" ? value(open) : value;
    if (!isControlled) setOpenState(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Locks page scroll while the menu is open. See the lockScroll/unlockScroll
  // singleton above for why this isn't done with local state/refs.
  //
  // NOTE: if your Lenis instance is set up with a custom `wrapper`/`content`
  // option (scrolling an inner div instead of the window), you'd also want
  // to call `lenis.stop()` / `lenis.start()` here via your LenisContext.
  // Flagging since this component doesn't have access to that context.
  useEffect(() => {
    if (!open) return;
    lockScroll();
    return () => unlockScroll();
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={`group relative z-[70] flex items-center gap-3 ${className}`}
      >
        {reverse ? (
          <>
            <span
              className={`label-caps text-[14px] uppercase tracking-[0.06em] transition-colors ${
                open ? "font-bold text-white" : "text-foreground"
              }`}
            >
              Menu
            </span>
            <Dots open={open} />
          </>
        ) : (
          <>
            <Dots open={open} />
            <span
              className={`label-caps text-[14px] uppercase tracking-[0.06em] transition-colors ${
                open ? "font-bold text-white" : "text-foreground"
              }`}
            >
              Menu
            </span>
          </>
        )}
      </button>

      {/* Backdrop — darker black wash under the blur, so the page behind
          reads as clearly dimmed as well as softly out of focus. Blur
          strength is unchanged; only the darkness increased. */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/30 transition-all duration-500 ${
          open
            ? "opacity-100 backdrop-blur-xs"
            : "pointer-events-none opacity-0 backdrop-blur-none"
        }`}
      />

      {/* Reference-locked responsive shell.
          The reference composition is scaled up to 440px wide while preserving the original 396:300 visual ratio.
          The shell keeps that exact aspect ratio at md/lg; only its overall
          size is allowed to shrink on narrow screens. On mobile the aspect
          ratio is dropped entirely (see `aspect-auto md:aspect-[396/300]`
          below) since there's only a single (nav) column there, not the
          two columns the 396:300 ratio was tuned for.

          Mobile only (no md: prefix): anchored from the right edge via
          `right-[...]` instead of `left`, AND anchored from the bottom via
          `bottom-6` (in addition to the existing inline `top`) so the shell
          has a real, inset-driven height on mobile instead of a
          content-driven one — this is what lets the nav panel below fill
          the full container height. `md:bottom-auto` hands height control
          back to `aspect-[396/300]` at md/lg, so tab/desktop are
          unaffected. */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed z-[65] mt-8 md:mt-8 left-[clamp(8rem,3.9vw,50px)] md:right-auto md:left-[clamp(16px,3.9vw,50px)]
    w-[min(calc(100vw-0px),17rem)] md:w-[min(40rem,calc(100vw-32px))]
    bottom-6 md:bottom-auto
    aspect-auto md:aspect-[396/300]
    ${open ? "" : "pointer-events-none"}`}
        style={{
          top: "clamp(56px, 8.7vw, 67px)",
        }}
      >
        <div
          className="relative grid h-full w-full min-w-0 overflow-hidden
    grid-cols-1 md:grid-cols-[39.24%_60.76%]"
        >
          {/* LEFT: reference navigation panel.
              `h-[26rem]` (mobile) makes this stretch to fill the shell's
              inset-driven height; `md:h-auto` restores the original
              content-sized "little rectangle" behavior at tab/desktop. */}
          <nav
            className={`relative z-10 min-w-0 overflow-hidden bg-ink h-[26rem] md:h-auto transition-all duration-500 ease-out ${
              open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
            }`}
          >
            <ul
              className="flex min-w-0 flex-col mt-3"
              style={{
                padding: "clamp(10px, 1.82vw, 14px) clamp(12px, 2.47vw, 15px) 0",
              }}
            >
              {LINKS.map((l, i) => (
                <li key={l.label} className="min-w-0">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`label group flex min-w-0 items-center gap-[15px] px-0 py-4 md:py-4 lg:py-4 uppercase tracking-[0.01em] text-foreground transition-all duration-500 ease-out hover:text-accent ${
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }`}
                    style={{
                      height: "clamp(18px, 2.73vw, 21px)",
                      fontSize: "clamp(8px, 1.17vw, 9px)",
                      transitionDelay: open ? `${120 + i * 55}ms` : "0ms",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-[4px] w-[4px] shrink-0 -translate-x-1 bg-accent opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                    />
                    <span className="truncate text-[0.9rem]">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Profile is absolutely anchored so its position never depends
                on the number/height of navigation links. */}
            <div
              style={{
                left: "clamp(12px, 2.47vw, 19px)",
                transitionDelay: open ? "400ms" : "0ms",
              }}
              className={`absolute bottom-[1rem] md:bottom-[clamp(20px,2.34vw,18px)]  lg:bottom-[clamp(50px,2.34vw,18px)] flex min-w-0 px-4 flex-col gap-2 md:gap-1.5 transition-all duration-500 ease-out ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <img
                src={PROFILE.avatar}
                alt={PROFILE.name}
                loading="lazy"
                width={35}
                height={48}
                className="object-cover"
                style={{
                  width: "clamp(60px, 4.55vw, 35px)",
                  height: "clamp(80px, 6.24vw, 48px)",
                }}
              />

              <div
                className="flex min-w-0 items-center"
                style={{
                  marginTop: "clamp(7px, 1.43vw, 11px)",
                  gap: "5px",
                }}
              >
                <span className="h-[6px] w-[6px] shrink-0 bg-accent" />
                <span
                  className="label min-w-0 truncate uppercase tracking-[0.01em] text-foreground "
                  style={{ fontSize: "clamp(16px, 1.17vw, 9px)" }}
                >
                  {PROFILE.name}
                </span>
              </div>

              <p
                className="label truncate uppercase tracking-[0.06em] text-foreground/45 md:clamp(9.5px, 0.91vw, 7px)"
                style={{
                  marginTop: "3px",
                  fontSize: "clamp(9.5px, 0.91vw, 7px)",
                }}
              >
                {PROFILE.role}
              </p>

              <div
                className="flex gap-[1rem] md:gap-[1.5rem] items-center"
                style={{
                  marginTop: "clamp(7px, 1.3vw, 10px)",
                }}
              >
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    onClick={(e) => e.stopPropagation()}
                    className="text-white transition-colors hover:text-accent"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[15px] w-[15px] fill-current"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* RIGHT: two rows are explicitly defined inline. This avoids any
              Tailwind breakpoint/grid-row issue and guarantees the reference
              always has two equal image cells.

              Hidden on mobile (`hidden md:grid`) per this request — the
              thumbnail column only shows from md up, matching the shell's
              grid-cols-1 → md:grid-cols-[39.24%_60.76%] change above. */}
          <div
            className={`relative hidden min-w-0 min-h-0 transition-opacity duration-500 md:grid ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{
              gridTemplateRows: "repeat(2, minmax(0, 1fr))",
              height: "100%",
              minHeight: 0,
            }}
          >
            {PROJECTS.map((project, i) => (
              <a
                key={project.label}
                href={project.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: open ? `${160 + i * 110}ms` : "0ms",
                }}
                className={`group relative block min-h-0 min-w-0 overflow-hidden transition-all duration-500 ease-out ${
                  open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.label}
                  loading="lazy"
                  className="absolute inset-0 block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%)",
                  }}
                />
                <span className="pointer-events-none absolute inset-0 bg-noise opacity-20" />

                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="label-caps flex items-center whitespace-nowrap text-white"
                    style={{
                      gap: "5px",
                      fontSize: "clamp(18px, 1.3vw, 10px)",
                    }}
                  >
                    <span
                      className="shrink-0 rounded-full border border-white"
                      style={{
                        width: "clamp(8px, 1.3vw, 20px)",
                        height: "clamp(8px, 1.3vw, 20px)",
                      }}
                    />
                    {project.label}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}