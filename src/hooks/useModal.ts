import { useEffect, useRef } from "react";

/**
 * Shared dialog behaviour: Escape closes, focus moves into the dialog on open
 * and returns to the previously focused element on close, Tab stays inside,
 * and (optionally) page scroll is locked.
 */
export function useModal<T extends HTMLElement>(
  onClose: () => void,
  { lockScroll = false }: { lockScroll?: boolean } = {},
) {
  const ref = useRef<T>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusable = () =>
      Array.from(el.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])"));

    (focusable()[0] ?? el).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
      } else if (e.key === "Tab") {
        const items = focusable();
        if (items.length === 0) {
          e.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    el.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    if (lockScroll) document.body.style.overflow = "hidden";

    return () => {
      el.removeEventListener("keydown", onKey);
      if (lockScroll) document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, [lockScroll]);

  return ref;
}
