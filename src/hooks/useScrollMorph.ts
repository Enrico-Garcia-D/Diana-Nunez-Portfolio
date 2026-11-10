import { useEffect } from "react";
import { FONT_COUNT, FONT_STEP } from "../lib/fonts";
import { prefersReducedMotion } from "../lib/transition";

/**
 * Scroll-driven typeface cycling. Every element with `data-morph` gets CSS variables
 * `--o0 .. --o{n-1}` (layer opacities that always sum to 1). The further a heading is from the
 * middle of the viewport, the further along the typeface sequence it is, and neighbouring
 * typefaces crossfade, so the letterforms keep changing as you scroll and run backwards when you
 * scroll back. Values ease towards their target so the change is smooth rather than stepped.
 */
export function useScrollMorph() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-morph]")).map((el) => ({
      el,
      current: 0,
    }));
    if (items.length === 0) return;

    let raf = 0;
    const smoothstep = (t: number) => t * t * (3 - 2 * t);

    /** Position along the typeface sequence, 0 (resting face) .. FONT_COUNT-1. */
    const target = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const offset = r.top + el.offsetHeight / 2 - window.innerHeight / 2; // < 0 once above the centre
      // `data-leave-only` headings (the hero) stay in the resting face until scrolled up past the centre.
      if (el.dataset.leaveOnly !== undefined && offset > 0) return 0;
      return Math.min(FONT_COUNT - 1, Math.abs(offset) / FONT_STEP);
    };

    const apply = (el: HTMLElement, pos: number) => {
      // Hold each typeface steady for a moment, then crossfade quickly into the next.
      const base = Math.floor(pos);
      const shaped = base + smoothstep(Math.min(1, Math.max(0, (pos - base - 0.2) / 0.6)));
      for (let k = 0; k < FONT_COUNT; k++) {
        el.style.setProperty(`--o${k}`, Math.max(0, 1 - Math.abs(shaped - k)).toFixed(3));
      }
    };

    const tick = () => {
      let moving = false;
      for (const it of items) {
        const diff = target(it.el) - it.current;
        if (Math.abs(diff) > 0.004) {
          it.current += diff * 0.2;
          moving = true;
        }
        apply(it.el, it.current);
      }
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    items.forEach((it) => (it.current = target(it.el)));
    tick();

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
      items.forEach((it) => {
        for (let k = 0; k < FONT_COUNT; k++) it.el.style.removeProperty(`--o${k}`);
      });
    };
  }, []);
}
