import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: !prefersReducedMotion,
    });

    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis's virtual scroll, so any
    // scroll-triggered/pinned animations built with ScrollTrigger line up
    // with Lenis's smoothed scroll position instead of the native one.
    const handleScroll = () => ScrollTrigger.update();
    lenis.on("scroll", handleScroll);

    // GSAP's ticker becomes the single driver of Lenis's raf loop (instead
    // of a separate requestAnimationFrame call) so Lenis and GSAP always
    // advance on the same frame, in the same order. Using two independent
    // rAF/ticker loops here would call lenis.raf() twice per frame and
    // roughly double the effective scroll speed.
    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    rafIdRef.current = update;

    return () => {
      if (rafIdRef.current) gsap.ticker.remove(rafIdRef.current);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}

/**
 * Returns the raw ref object holding the Lenis instance (ref.current may be
 * null on the very first render tick, since Lenis is created in an effect).
 * Use this when you need direct access to Lenis instance methods not
 * covered by useScrollTo (e.g. lenis.stop(), lenis.start()).
 */
export function useLenisRef() {
  const ctx = useContext(LenisContext);
  if (!ctx) {
    throw new Error("useLenisRef must be used within a LenisProvider");
  }
  return ctx;
}

/**
 * Returns a stable scrollTo(target, options) function that uses Lenis when
 * available and falls back to native smooth scrolling otherwise. Prefer
 * this over useLenisRef in components that just need to trigger a scroll.
 */
export function useScrollTo() {
  const lenisRef = useLenisRef();

  return (target, options = {}) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, options);
      return;
    }
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };
}