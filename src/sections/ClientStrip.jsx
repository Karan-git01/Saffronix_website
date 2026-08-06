const clients = [
  { name: "Leapyear", mark: "arrow" },
  { name: "Kintsugi", mark: "star" },
  { name: "Interlock", mark: "rings" },
  { name: "Ikigai Labs", mark: "pill" },
  { name: "Goodwell", mark: "g" },
  { name: "Layers", mark: "layers" },
];

function LogoMark({ mark }) {
  const common = "h-[22px] w-[22px] shrink-0";
  switch (mark) {
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M6 3h12v12h-5V8H6z" fill="currentColor" />
          <path d="M6 21 18 9v12z" fill="currentColor" opacity="0.9" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            d="M12 1l2.4 6.1L20.5 4l-3.1 6.1L23 12l-5.6 1.9L20.5 20l-6.1-3.1L12 23l-2.4-6.1L3.5 20l3.1-6.1L1 12l5.6-1.9L3.5 4l6.1 3.1z"
            fill="currentColor"
          />
        </svg>
      );
    case "rings":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <circle cx="9.5" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="14.5" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "pill":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <rect x="1.5" y="7.5" width="21" height="9" rx="4.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        </svg>
      );
    case "g":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <circle cx="12" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M16.5 9v9a4.5 4.5 0 0 1-7.6 3.2" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case "layers":
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M14 2 4 9l1.5 5L16 6z" fill="currentColor" opacity="0.55" />
          <path d="M20 6 8 15l1 6 12-9z" fill="currentColor" />
        </svg>
      );
  }
}

/** No more per-item dividers — logos just sit in a clean flex row now. */
function ClientRow({ hidden = false }) {
  return (
    <>
      {clients.map((c) => (
        <div
          key={c.name}
          aria-hidden={hidden || undefined}
          className="flex h-16 shrink-0 items-center justify-center gap-2 px-8 sm:px-12 lg:px-16"
        >
          <LogoMark mark={c.mark} />
          <span className="font-display text-[19px] font-bold tracking-[-0.02em] whitespace-nowrap">
            {c.name}
          </span>
        </div>
      ))}
    </>
  );
}

/**
 * Rewritten to the same grid-cols-4 + px-8 lg:px-12 track used by
 * Portfolio's and About's GuideLines (rather than the old flex
 * justify-between + px-6 lg:px-10 version). The old padding scale
 * (px-6/lg:px-10) didn't match the px-8/lg:px-12 used elsewhere, so
 * this strip's two edge lines landed on different pixel columns than
 * the guide lines in the sections above and below it. Only the outer
 * two lines (column 1 start, column 4 end) are shown — the two inner
 * tracks are left empty since this strip only ever needed edge
 * guides, not the full 4-line treatment.
 */
function EdgeGuides() {
  const visibility = ["block", "hidden", "hidden", "hidden", "block"];
  return (
    <div className="pointer-events-none absolute inset-0 z-0 grid grid-cols-4 px-8 lg:px-12">
      {visibility.map((v, i) => (
        <span
          key={i}
          className={`h-full w-px bg-background/[0.07] ${v}`}
          style={{
            gridColumnStart: Math.min(i + 1, 4),
            justifySelf: i === visibility.length - 1 ? "end" : "start",
          }}
        />
      ))}
    </div>
  );
}

export default function ClientStrip() {
  return (
    <section
      aria-label="Selected clients"
      className="relative border-y border-border bg-white text-background"
    >
      <EdgeGuides />
      <div className="mx-8 overflow-hidden lg:mx-12">
        <div className="flex w-max animate-marquee items-center">
          <ClientRow />
          <ClientRow hidden />
        </div>
      </div>
    </section>
  );
}