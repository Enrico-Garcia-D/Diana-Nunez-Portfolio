import { profile } from "../data";

interface Props {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Nav({ theme, onToggleTheme }: Props) {
  return (
    <header className="nav">
      <a className="nav-logo" href="#top" aria-label="Diana Nuñez, back to top">
        DN<span>.</span>
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
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
