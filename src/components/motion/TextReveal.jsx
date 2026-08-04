import { useEffect, useRef } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  threshold = 0.12,
  rootMargin = "0px 0px -60px 0px",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }

    let timeoutId = null;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timeoutId = setTimeout(() => el.classList.add("in"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay, threshold, rootMargin]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}