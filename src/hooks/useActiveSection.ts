import { useEffect, useState } from "react";

/** Returns the id of the section crossing the middle of the viewport (or null above/between sections). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const live = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) live.add(e.target.id);
          else live.delete(e.target.id);
        }
        setActive([...live].pop() ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    key.split("|").forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [key]);

  return active;
}
