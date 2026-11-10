import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { canTransition } from "../lib/transition";

type Theme = "light" | "dark";
const KEY = "theme";

function initial(): Theme {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#14110f" : "#f5efe6");
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  /** Toggles the theme; with a click position it reveals the new theme as a circle growing from that point. */
  const toggle = useCallback(
    (origin?: { clientX: number; clientY: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const apply = () => {
        document.documentElement.dataset.theme = next;
        setTheme(next);
      };
      if (!origin || !canTransition()) {
        apply();
        return;
      }
      const root = document.documentElement;
      const { clientX: x, clientY: y } = origin;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      root.classList.add("theme-vt");
      const t = document.startViewTransition(() => flushSync(apply));
      t.ready
        .then(() =>
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 650, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
          ),
        )
        .catch(() => {});
      t.finished.catch(() => {}).finally(() => root.classList.remove("theme-vt"));
    },
    [theme],
  );

  return { theme, toggle };
}
