import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/transition";

/**
 * Writes --mx/--my (pointer, -1..1, eased) and --sy (scroll progress through the element, 0..1)
 * as CSS variables. Pure CSS then turns them into transforms, so React never re-renders.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let tx = 0, ty = 0, mx = 0, my = 0, raf = 0;

    const tick = () => {
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      raf = Math.abs(tx - mx) > 0.002 || Math.abs(ty - my) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      kick();
    };
    const onLeave = () => {
      tx = ty = 0;
      kick();
    };

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / (r.height + 200)));
        el.style.setProperty("--sy", p.toFixed(3));
      });
    };

    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return ref;
}
