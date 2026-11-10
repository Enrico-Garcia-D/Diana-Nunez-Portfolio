import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { profile } from "../data";
import { useActiveSection } from "../hooks/useActiveSection";

interface Props {
  theme: "light" | "dark";
  onToggleTheme: (e: MouseEvent) => void;
}

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ theme, onToggleTheme }: Props) {
  const active = useActiveSection(links.map((l) => l.id));
  const [hover, setHover] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  // The pill follows the hovered link, and rests on the active section's link.
  const target = hover ?? active;
  useLayoutEffect(() => {
    const measure = () => {
      const el = target ? wrap.current?.querySelector<HTMLElement>(`[data-id="${target}"]`) : null;
      setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [target]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <a className="nav-logo" href="#top" aria-label="Diana Nuñez, back to top">
        DN<span>.</span>
      </a>
      <nav className="nav-links" aria-label="Primary" ref={wrap} onMouseLeave={() => setHover(null)}>
        <span
          className="nav-pill"
          aria-hidden="true"
          style={pill ? { transform: `translateX(${pill.x}px)`, width: pill.w, opacity: 1 } : undefined}
        />
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            data-id={l.id}
            aria-current={active === l.id ? "true" : undefined}
            onMouseEnter={() => setHover(l.id)}
            onFocus={() => setHover(l.id)}
            onBlur={() => setHover(null)}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button
          className="icon-btn"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
        <a className="btn btn-solid nav-cta" href={`mailto:${profile.email}`}>
          Let's talk
        </a>
      </div>
    </header>
  );
}
