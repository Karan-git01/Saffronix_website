import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenisRef } from "../../context/LenisContext";

const HEADER_OFFSET = -100;
const MAX_WAIT_MS = 2000;

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenisRef = useLenisRef();

  useEffect(() => {
    const lenis = lenisRef.current;

    const scrollToElement = (el) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (lenis) {
        lenis.scrollTo(top, { offset: HEADER_OFFSET });
      } else {
        window.scrollTo({ top: top + HEADER_OFFSET, behavior: "smooth" });
      }
    };

    if (hash) {
      const id = hash.replace("#", "");
      const existing = document.getElementById(id);

      if (existing) {
        scrollToElement(existing);
        return;
      }

      // Element isn't in the DOM yet (e.g. lazy-loaded section on a route
      // that just mounted). Watch for it instead of blindly retrying on a
      // fixed timeout schedule, and give up after MAX_WAIT_MS.
      let settled = false;
      const observer = new MutationObserver(() => {
        const el = document.getElementById(id);
        if (el && !settled) {
          settled = true;
          observer.disconnect();
          scrollToElement(el);
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      const timeoutId = setTimeout(() => {
        if (!settled) observer.disconnect();
      }, MAX_WAIT_MS);

      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
      };
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, lenisRef]);

  return null;
}