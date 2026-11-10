import { profile, socials } from "../data";
import { useReveal } from "../hooks/useReveal";

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-card reveal" ref={ref}>
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title" className="contact-title">
          Have a brand that needs <em>a face?</em>
        </h2>
        <a className="mail" href={`mailto:${profile.email}`}>
          {profile.email} <span aria-hidden="true">↗</span>
        </a>
        <ul className="socials">
          {socials
            .filter((s) => s.href)
            .map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <span>{s.label}</span>
                  <small>{s.handle}</small>
                </a>
              </li>
            ))}
        </ul>
      </div>
      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}
