import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import Menu from "../components/Menu";
import portrait from "../assets/about-portrait.webp";
import avatarCta from "../assets/avatar-cta.webp";
import { posts } from "../data/posts";

/**
 * GuideLines — same hairline grid used across Contact/Portfolio/Blog,
 * with a `tone` switch so the Hero (dark, over an image) and the paper
 * sections below can share one component. No z-index baked in on
 * purpose — callers set it via className so it never fights with the
 * layered image/gradient/noise stack in Hero.
 */
function GuideLines({ tone = "paper", className = "" }) {
  const color = tone === "dark" ? "bg-primary/15" : "bg-paper-foreground/10";
  return (
    <div className={`pointer-events-none absolute inset-0 px-8 lg:px-12 ${className}`}>
      <div className="relative h-full">
        <span className={`absolute inset-y-0 left-0 block w-[0.0625rem] origin-left scale-x-50 ${color}`} />
        <div className="grid h-full grid-cols-4" style={{ gridTemplateRows: "100%" }}>
          <span
            className={`hidden h-full w-[0.0625rem] origin-left scale-x-50 lg:block ${color}`}
            style={{ gridColumnStart: 2, justifySelf: "start" }}
          />
          <span
            className={`hidden h-full w-[0.0625rem] origin-left scale-x-50 md:block ${color}`}
            style={{ gridColumnStart: 3, justifySelf: "start" }}
          />
          <span
            className={`hidden h-full w-[0.0625rem] origin-left scale-x-50 lg:block ${color}`}
            style={{ gridColumnStart: 4, justifySelf: "start" }}
          />
        </div>
        <span className={`absolute inset-y-0 right-0 block w-[0.0625rem] origin-right scale-x-50 ${color}`} />
      </div>
    </div>
  );
}

/** Same active-state pattern as Portfolio/Blog's Wordmark, plus a
    `tone` switch so it can sit white-on-dark in Hero. */
function Wordmark({ tone = "dark", active = false, className = "" }) {
  const base = tone === "light" ? "text-white" : "text-paper-foreground";
  return (
    <a href="/" className={className}>
      <span
        className={`label relative z-[80] text-[16px] leading-none font-medium tracking-tight transition-colors duration-300 ${
          active ? "text-white! font-bold!" : base
        }`}
      >
        SAFFRONIX
      </span>
    </a>
  );
}

/** 1:1 port of Portfolio/Blog's ArrowBox — slides open/shut on hover. */
function ArrowBox({ className = "" }) {
  return (
    <span
      className={`relative flex h-11 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out ${className}`}
    >
      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
    </span>
  );
}

/** 1:1 port of Portfolio/Blog's StartProject. */
function StartProject() {
  return (
    <a
      href="/#contact"
      className="group flex h-13 w-full items-center overflow-hidden bg-ink text-primary"
    >
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
          Start Project <span className="label text-primary/40">/Saffronix</span>
        </span>
        <span className="absolute inset-x-2 top-0 block translate-y-full transition-transform duration-400 ease-out group-hover:translate-y-0 md:inset-x-4">
          Start Project <span className="label text-accent">/Saffronix</span>
        </span>
      </span>
      <ArrowBox className="w-14 h-13 group-hover:w-0" />
    </a>
  );
}

/** Sliding two-copy label + square chevron chip, same CTA as Blog's cards. */
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

/** Same card as Blog.jsx's PostCard — kept local here too, matching how
    Contact/Portfolio/Blog each keep their own copies of shared pieces
    rather than a shared components module. */
function PostCard({ post }) {
  return (
    <article className="flex h-full flex-col bg-paper">
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

/** Small "back" chip in the Hero top bar. */
function AllArticles() {
  return (
    <a href="/blog" className="group inline-flex items-center gap-3 text-primary">
      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center bg-white/20 transition-transform duration-300 group-hover:-translate-x-[2px]">
        <ChevronLeft className="h-[13px] w-[13px]" strokeWidth={1.5} />
      </span>
      <span className="label text-[11px] tracking-[0.06em]">All Articles</span>
    </a>
  );
}

function MetaRow({ label, value }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="label text-[12px] tracking-[0.1em] text-primary/60">
        {label}
      </span>
      <span className="label text-[12px] tracking-[0.06em] text-primary">{value}</span>
    </div>
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

/** Sidebar author bio — portrait, name, role, socials, short bio. Used
    both in the sticky desktop sidebar and, a second time, inline below
    the article on mobile/tablet where the sidebar is hidden. */
function AuthorCard() {
  return (
    <div className="max-w-[250px]">
      <img
        src={portrait}
        alt="Hanza Novák"
        width={128}
        height={128}
    className="w-[99px] aspect-[5/6] rounded-none object-cover object-top"
      />

      <div className="mt-6 flex items-center gap-2.5">
        <span className="h-[6px] w-[6px] shrink-0 bg-accent" />
        <span className="label text-[1rem] tracking-[0.06em] text-paper-foreground">
          SAFFRONIX
        </span>
      </div>
      <p className="label mt-2 text-[0.7rem] tracking-[0.06em] text-paper-muted">
        Designer &amp; Framer Expert
      </p>

      <div className="mt-6 flex items-center gap-3">
        {SOCIAL_GLYPHS.map((s) => (
          <a
            key={s.label}
            href="/#contact-form"
            aria-label={s.label}
            className="text-paper-foreground/70 transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-current">
              <path d={s.path} />
            </svg>
          </a>
        ))}
      </div>

      <p className="mt-4 max-w-[30ch] text-[0.9rem] leading-[1.6] text-paper-muted">
        I&apos;m a designer and Framer developer based in Prague, creating clean websites
        with strong structure.
      </p>
    </div>
  );
}

/** Inline newsletter panel dropped into the article body. */
function NewsletterPanel() {
  return (
    <div className="border-t-[3px] border-accent bg-paper-subtle/60 px-6 py-8 md:px-8 md:py-9">
      <div className="flex items-center gap-2.5">
        <span className="h-[7px] w-[7px] shrink-0 bg-accent" />
        <span className="label text-paper-foreground">Newsletter</span>
      </div>

      <h3 className="font-heading-sans mt-10 text-[26px] leading-[1.05] font-medium tracking-[-0.02em] uppercase md:text-[30px]">
        <span className="block text-paper-foreground/45">Weekly</span>
        <span className="block text-paper-foreground">Design Notes.</span>
      </h3>

      <p className="mt-3 max-w-[47ch] text-[0.9rem] leading-[1.5] text-paper-muted">
        Get short thoughts on design, Framer, process, and building websites that feel
        clear, polished, and easy to use.
      </p>

      <form className="mt-10 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
        <div className="flex h-13 flex-1 items-center overflow-hidden border border-paper-border bg-paper">
          <span className="flex h-13 w-13 shrink-0 items-center justify-center bg-accent">
            <Mail className="h-4 w-4 text-primary" strokeWidth={1.75} />
          </span>
          <input
            type="email"
            placeholder="Email Address"
            className="h-full w-full bg-transparent px-4 font-heading-sans text-[13px] text-paper-foreground placeholder:text-paper-foreground/50 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="label h-13 shrink-0 bg-ink px-6 text-[11px] tracking-[0.12em] text-primary"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-[0.9rem] leading-[1.6] text-paper-muted">
        By subscribing, you agree to the{" "}
        <a href="#" className="text-black">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="text-black ">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}

function Hero({ post }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToBody = (e) => {
    e.preventDefault();
    document.getElementById("article")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // Height now mirrors the home Hero exactly: svh-based min-height that
    // grows across breakpoints (80svh -> 60svh -> full svh) instead of a
    // fixed px floor + lg:h-screen. `flex flex-col` on the section itself
    // (rather than only on the inner content wrapper) matches how the
    // home Hero stretches its header/content rows to fill that height.
    <header
      className={`relative isolate flex min-h-[80svh] flex-col overflow-hidden bg-ink md:min-h-[60svh] lg:min-h-svh ${
        menuOpen ? "z-[1000]" : "z-10"
      }`}
    >
      <img
        src={post.hero}
        alt={post.title}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-ink/80 via-ink/25 to-ink/45" />
      <div className="bg-noise pointer-events-none absolute inset-0 z-[2] opacity-[0.13]" />
      <GuideLines tone="dark" className="z-[3]" />

      {/* flex-1 (was h-full) — now that the header itself is the flex
          column with the svh min-height, this stretches to fill it the
          same way the home Hero's own content sits directly in its
          flex-col section. */}
      <div className="relative z-10 flex flex-1 flex-col px-8 pt-7 pb-9 lg:px-12 lg:pt-[52px] lg:pb-[52px]">
        {/* Top bar (mobile / tablet) */}
        <div className="flex items-center justify-between lg:hidden">
          <Wordmark tone="light" active={menuOpen} className="md:hidden" />
          <div className="hidden items-center gap-4 md:flex">
            <Menu tone="light" open={menuOpen} onOpenChange={setMenuOpen} />
            <span className="block h-px w-6 bg-primary/30" />
            <Wordmark tone="light" active={menuOpen} />
          </div>
          <Menu
            reverse
            tone="light"
            className="md:hidden"
            open={menuOpen}
            onOpenChange={setMenuOpen}
          />
          <div className="hidden w-[260px] md:block">
            <StartProject />
          </div>
        </div>

        {/* Top bar (desktop) */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:items-center">
          <div className="flex items-center gap-5">
            <Menu tone="light" open={menuOpen} onOpenChange={setMenuOpen} />
            <span className="block h-px w-5 bg-primary/35" />
            <Wordmark tone="light" active={menuOpen} />
          </div>
          <div className="col-start-3">
            <AllArticles />
          </div>
          <div className="col-start-4 flex justify-end">
            <StartProject />
          </div>
        </div>

        {/* Bottom block — meta, title/excerpt, and Read Article share one
            lg:grid-cols-4 row with items-end, so all three sit on the
            same bottom baseline. The title/excerpt column now spans
            columns 3–4 (two tracks) so max-w-[25ch] actually has room to
            take effect — as a single-column item it was capped at ~1/4
            of the container width no matter what max-w said. Read
            Article is pulled out of grid flow (absolute) and pinned to
            this row's own right/bottom edge, which lines up with the
            last guideline, so it no longer eats into the title's
            column. */}
        <div className="relative mt-16 lg:mt-auto lg:grid lg:grid-cols-4 lg:items-end">
          <div className="flex flex-col gap-[14px] lg:pb-1">
            <MetaRow label="Read" value={post.readTime} />
            <MetaRow label="Date" value={post.date} />
            <MetaRow label="Category" value={post.tag} />
            <span className="mt-2 h-[6px] w-[6px] bg-accent" />
          </div>

          <div className="mt-10 lg:col-start-3 lg:col-end-5 lg:mt-0 gap-3 flex flex-col">
            <h1 className="font-heading-sans max-w-[18ch] text-[9vw] leading-[1.02] font-medium tracking-[-0.03em] text-primary uppercase md:text-[6vw] lg:text-[3.6vw]">
              {post.title}
            </h1>
            <p className="label mt-6 max-w-[36ch] text-[16px] leading-[1.5] tracking-[0.05em] text-primary/50">
              {post.excerpt}
            </p>
          </div>

          {/* Desktop only — absolutely positioned against this row's own
              box (relative above), so it stays pinned to the last
              guideline and the meta column's baseline without claiming
              a grid column of its own. Hidden below lg, where the
              mobile/tablet copy underneath takes over instead. */}
          <div className="hidden lg:absolute lg:right-0 lg:bottom-1 lg:flex">
            <a
              href="#article"
              onClick={scrollToBody}
              className="group inline-flex items-center gap-3 text-primary"
            >
              <span className="label text-[12px] tracking-[0.06em]">Read Article</span>
              <span className="flex h-[22px] w-[22px] items-center justify-center border border-primary/30 transition-transform duration-300 group-hover:translate-y-[2px]">
                <ChevronDown className="h-[13px] w-[13px]" strokeWidth={1.5} />
              </span>
            </a>
          </div>
        </div>

        {/* Mobile/tablet only — stacked below the grid, since Read
            Article is absolutely positioned (desktop-only) inside it. */}
        <div className="mt-10 flex lg:hidden">
          <a
            href="#article"
            onClick={scrollToBody}
            className="group inline-flex items-center gap-3 text-primary"
          >
            <span className="label text-[12px] tracking-[0.06em]">Read Article</span>
            <span className="flex h-[22px] w-[22px] items-center justify-center border border-primary/30 transition-transform duration-300 group-hover:translate-y-[2px]">
              <ChevronDown className="h-[13px] w-[13px]" strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

/** Keeps `stickyRef`'s content pinned to the viewport at `offset` while
    `wrapRef` (the column it lives in) scrolls past, then releases it to
    sit at the bottom of that column so it scrolls away together with
    the rest of the page — the same behavior as CSS `sticky`, but driven
    by JS so it isn't affected by an `overflow-hidden` ancestor (the
    Body section uses `overflow-hidden` for the noise texture / guide
    lines, which can silently break native `position: sticky`). */
function useStickyUntilEnd(wrapRef, stickyRef, offset = 70) {
  const [style, setStyle] = useState({ position: "static" });

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    let ticking = false;

    const update = () => {
      ticking = false;
      const wrap = wrapRef.current;
      const sticky = stickyRef.current;
      if (!mql.matches || !wrap || !sticky) {
        setStyle({ position: "static" });
        return;
      }

      const wrapRect = wrap.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight;
      const maxTranslate = Math.max(0, wrapRect.height - stickyHeight);

      if (wrapRect.top > offset) {
        // Haven't scrolled to the sidebar's start yet — sits at its
        // natural position at the top of the column.
        setStyle({ position: "static" });
      } else if (wrapRect.top < offset - maxTranslate) {
        // Article column has run out — pin to the bottom of the row so
        // it scrolls away together with the rest of the page instead of
        // floating past the end of the article.
        setStyle({ position: "absolute", top: `${maxTranslate}px`, left: 0, right: 0 });
      } else {
        // Hold in place against the viewport while the article column
        // scrolls underneath/past it.
        setStyle({
          position: "fixed",
          top: `${offset}px`,
          left: `${wrapRect.left}px`,
          width: `${wrapRect.width}px`,
        });
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mql.addEventListener?.("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mql.removeEventListener?.("change", onScroll);
    };
  }, [wrapRef, stickyRef, offset]);

  return style;
}

function Body({ post }) {
  // Drives the "left column fixed while right column scrolls, then
  // scrolls away together once the article runs out" behavior on the
  // sidebar AuthorCard below.
  const wrapRef = useRef(null);
  const stickyRef = useRef(null);
  const stickyStyle = useStickyUntilEnd(wrapRef, stickyRef, 70);

  return (
    <section id="article" className="relative isolate overflow-hidden bg-paper">
      <GuideLines className="z-0" />

      <div className="relative z-10 px-8 pt-14 pb-20 lg:grid lg:grid-cols-4 lg:px-12 lg:pt-[70px] lg:pb-28">
        {/* Sidebar — desktop only. `wrapRef` spans the full height of the
            article row (grid stretch), and `stickyRef` is the element
            actually pinned/released by useStickyUntilEnd above. */}
        <div ref={wrapRef} className="hidden lg:relative lg:block lg:pr-6">
          <div ref={stickyRef} style={stickyStyle}>
            <AuthorCard />
          </div>
        </div>

        {/* Article column — dropped the old lg:pl-8 so the text starts
            flush against the border-l guideline instead of leaving a
            gap between the visible line and the copy. */}
        <div className="mt-12 lg:col-start-3 lg:col-end-5 lg:mt-0 lg:border-l lg:border-paper-border lg:pl-0">
          {post.body.map((block, i) => {
            if (block.type === "lead")
              return (
                <p
                  key={i}
                  className="font-heading-sans max-w-[38ch] text-[26px] leading-[1.22] font-medium tracking-[-0.025em] text-paper-foreground md:text-[32px]"
                >
                  {block.text}
                </p>
              );
            if (block.type === "h2")
              return (
                <h2
                  key={i}
                  className="font-heading-sans mt-12 text-[22px] leading-[1.25] font-medium tracking-[-0.02em] text-paper-foreground md:text-[1.5rem]"
                >
                  {block.text}
                </h2>
              );
            if (block.type === "image")
              return (
                <div key={i} className="relative mt-12 overflow-hidden">
                  <div className="bg-noise pointer-events-none absolute inset-0 z-10 opacity-[0.12]" />
                  <img
                    src={block.src}
                    alt={block.alt}
                    loading="lazy"
                    className="block w-full object-cover"
                    style={{ aspectRatio: "16 / 9" }}
                  />
                </div>
              );
            if (block.type === "newsletter")
              return (
                <div key={i} className="mt-14">
                  <NewsletterPanel />
                </div>
              );
            return (
              <p
                key={i}
                className="mt-6 max-w-[55ch] text-[1.1rem] leading-[1.75] tracking-[-0.01em] text-paper-muted"
              >
                {block.text}
              </p>
            );
          })}

          {/* Author bio repeats here on mobile/tablet since the sticky
              sidebar above is desktop-only. */}
          <div className="mt-14 lg:hidden">
            <AuthorCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function Related({ current }) {
  const related = posts.filter((p) => p.slug !== current.slug).slice(0, 4);

  const intro = (
    <div className="font-heading-sans text-[14px] leading-[1.55] tracking-[0.01em] uppercase">
      <span className="text-paper-foreground/45">I share ideas, lessons, and </span>
      <span className="font-medium text-paper-foreground">practical insights from my work.</span>
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden bg-paper pb-16 md:pb-20 lg:pb-28">
      <GuideLines className="z-0" />

      <div className="relative z-10 px-8 lg:px-12">
        {/* Heading row */}
        <div className="pb-9 lg:grid lg:grid-cols-4 lg:items-end lg:pb-[52px]">
          <div className="hidden lg:col-start-1 lg:block">{intro}</div>

          <div className="lg:col-start-3 lg:col-end-4">
            <h2 className="font-heading-sans text-[12vw] leading-[0.95] font-medium tracking-[-0.04em] uppercase md:text-[7vw] lg:-ml-1 lg:text-[3.6vw]">
              <span className="block text-paper-foreground/45">Related</span>
              <span className="block text-paper-foreground">Articles.</span>
            </h2>
          </div>

          <div className="mt-6 lg:col-start-4 lg:mt-0 lg:flex lg:justify-end">
            <div className="lg:hidden">{intro}</div>
            <a
              href="/blog"
              className="group mt-6 inline-flex items-center gap-3 text-paper-foreground lg:mt-0"
            >
              <span className="label text-[11px] tracking-[0.06em]">All Articles</span>
              <span className="flex h-[22px] w-[22px] items-center justify-center border border-paper-border transition-transform duration-300 group-hover:translate-x-[2px]">
                <ChevronRight className="h-[13px] w-[13px]" strokeWidth={1.5} />
              </span>
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className="hidden lg:grid lg:grid-cols-4">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        <div className="hidden md:grid md:grid-cols-2 lg:hidden">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * BlogPost — the single-article template. Accepts `post` as a prop so
 * whatever routing you use (React Router, etc.) can resolve the slug
 * and pass the matching entry in; defaults to the first post so the
 * component still renders something if used without a router yet.
 *
 * Example wiring with react-router-dom:
 *   const { slug } = useParams();
 *   const post = posts.find((p) => p.slug === slug);
 *   return <BlogPost post={post} />;
 */
export default function BlogPost({ post = posts[0] }) {
  return (
    <main className="bg-paper">
      <Hero post={post} />
      <Body post={post} />
      <Related current={post} />
    </main>
  );
}