import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import Menu from "../components/Menu";
import avatarCta from "../assets/avatar-cta.webp";
import Footer from "../sections/Footer";

const FILTERS = ["All", "Branding", "Design", "Development"];

/**
 * Placeholder post data. Swap this for a fetch from your MERN API
 * (e.g. GET /api/posts) once the blog backend is wired up - the
 * PostCard/Blog markup below doesn't need to change, just replace
 * `posts` with state populated from that request.
 *
 * Only 4 real posts exist right now, so the set is duplicated once
 * to fill out the 8-card grid below - slugs on the duplicates get a
 * "-2" suffix so React keys (and /blog/:slug links) stay unique.
 */
const basePosts = [
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

const posts = [
  ...basePosts,
  ...basePosts.map((p) => ({ ...p, slug: `${p.slug}-2` })),
];

/**
 * GuideLines — same paper-surface hairline grid used on Contact/Portfolio
 * (rem-based hairlines, px-8 lg:px-12 gutters, grid-cols-4 columns) so the
 * columns land on the same pixel positions site-wide.
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

/** 1:1 port of PortfolioPage's Wordmark — same active-state pattern
    driven by menuOpen, same SAFFRONIX text. */
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

/** 1:1 port of PortfolioPage's ArrowBox — slides open/shut on hover. */
function ArrowBox({ className = "" }) {
  return (
    <span
      className={`relative flex h-11 items-center justify-center overflow-hidden bg-accent transition-[width] duration-500 ease-out ${className}`}
    >
      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} />
    </span>
  );
}

/** 1:1 port of PortfolioPage's StartProject — same markup, sizing, hover
    animation, avatar, and /Saffronix label. */
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
          Start Project{" "}
          <span className="label text-primary/40">/Saffronix</span>
        </span>
        <span className="absolute inset-x-2 top-0 block translate-y-full transition-transform duration-400 ease-out group-hover:translate-y-0 md:inset-x-4">
          Start Project{" "}
          <span className="label text-accent">/Saffronix</span>
        </span>
      </span>
      <ArrowBox className="w-14 h-13 group-hover:w-0" />
    </a>
  );
}

/** Sliding two-copy label + square chevron chip, same CTA as the Blog cards. */
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
        <p
          className={`mt-3 max-w-[30ch] text-[14px] leading-[1.55] tracking-[-0.01em] ${
            post.accentExcerpt ? "text-accent" : "text-paper-muted"
          }`}
        >
          {post.excerpt}
        </p>

        <div className="mt-7">
          <ArrowCta label="Read Article" href={`/blog/${post.slug}`} />
        </div>
      </div>
    </article>
  );
}

function BlogHeader({ active, onChange }) {
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
      <span className="text-paper-foreground/45">Insights about designing, </span>
      <span className="font-medium text-paper-foreground">
        building, and launching modern websites.
      </span>
    </div>
  );

  const scrollToPosts = (e) => {
    e.preventDefault();
    document.getElementById("posts")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`relative isolate overflow-hidden pt-3 md:pt-5 lg:pt-0 bg-paper ${
        menuOpen ? "z-[1000]" : "z-10"
      }`}
    >
      <GuideLines />

      <div className="relative px-8 lg:px-12">
        {/* ---------- Top bar (mobile/tablet) ---------- */}
        <div className="flex items-center justify-between pt-7 lg:hidden">
          <Wordmark active={menuOpen} className="md:hidden" />

          <div className="hidden items-center gap-4 md:flex">
            <Menu tone="dark" open={menuOpen} onOpenChange={setMenuOpen} />
            <span className="block h-px w-6 bg-paper-foreground/30" />
            <Wordmark active={menuOpen} />
          </div>

          <Menu
            reverse
            tone="dark"
            className="md:hidden"
            open={menuOpen}
            onOpenChange={setMenuOpen}
          />

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
            <span className="label text-[11px] tracking-[0.06em] text-paper-foreground">Blog</span>
          </div>
          <div className="col-start-4 flex justify-end">
            <StartProject />
          </div>
        </div>

        {/* ---------- Mobile body (<md) ---------- */}
        <div className="pt-10 pb-9 md:hidden">
          <h1 className="font-heading-sans text-[12vw] leading-[0.95] font-medium tracking-[-0.04em] uppercase">
            <span className="block text-paper-foreground/60">Design</span>
            <span className="block text-paper-foreground">Stories.</span>
          </h1>
          <div className="mt-6 max-w-[35ch]">{intro}</div>
          <div className="mt-7">{filters}</div>
        </div>

        {/* ---------- Tablet body (md to lg) ---------- */}
        <div className="hidden md:grid md:grid-cols-4 md:pt-10 md:pb-9 lg:hidden">
          <div className="flex flex-col justify-end md:col-span-2">{filters}</div>
          <div className="md:col-span-2 md:col-start-3">
            <h1 className="font-heading-sans mt-15 mb-10 text-[7vw] leading-[0.95] font-medium tracking-[-0.04em] uppercase">
              <span className="block text-paper-foreground/60">Design</span>
              <span className="block text-paper-foreground">Stories.</span>
            </h1>
            <div className="mt-6 max-w-[35ch]">{intro}</div>
          </div>
        </div>

        {/* ---------- Desktop body ---------- */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:pt-[110px] lg:pb-[62px]">
          <div className="col-start-3 col-end-5">
            <h1 className="font-heading-sans text-[7vw] leading-[0.95] font-medium tracking-[-0.04em] uppercase lg:-ml-1">
              <span className="block text-paper-foreground/60">Design</span>
              <span className="block text-paper-foreground">Stories.</span>
            </h1>
          </div>
        </div>

        {/* ---------- Desktop bottom row ---------- */}
        <div className="hidden pb-[52px] lg:grid lg:grid-cols-4 lg:items-end">
          <div>{filters}</div>
          <div className="col-start-3">{intro}</div>
          <div className="col-start-4 flex justify-end">
            <a
              href="#posts"
              onClick={scrollToPosts}
              className="group inline-flex items-center gap-3 text-paper-foreground"
            >
              <span className="label text-[11px] tracking-[0.06em]">Explore</span>
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

export default function BlogPage() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? posts : posts.filter((p) => p.tag === filter);

  return (
    <main className="bg-paper">
      <BlogHeader active={filter} onChange={setFilter} />

      <section
        id="posts"
        className="relative isolate overflow-hidden bg-paper pb-16 md:pb-20 lg:pb-28"
      >
        <GuideLines />

        <div className="relative z-30 px-8 lg:px-12">
          {shown.length > 0 ? (
            <>
              {/* Desktop — 4-up rows */}
              <div className="hidden lg:grid lg:grid-cols-4">
                {shown.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Tablet — real 2-col grid so paired rows align */}
              <div className="hidden md:grid md:grid-cols-2 lg:hidden">
                {shown.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Mobile stack */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {shown.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="py-24 text-center">
              <p className="label text-paper-muted">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </main>
  );
}