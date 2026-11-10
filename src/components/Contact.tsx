import { profile, socials } from "../data";
import Reveal from "./Reveal";
import Words from "./Words";

export default function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <Reveal className="contact-card">
        <Words
          as="h2"
          id="contact-title"
          className="contact-title"
          text="Have a brand that needs a face?"
          em={["a", "face?"]}
        />
        <Reveal delay={500}>
          <a className="mail" href={`mailto:${profile.email}`}>
            {profile.email} <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </Reveal>
        <ul className="socials">
          {socials
            .filter((s) => s.href)
            .map((s, i) => (
              <Reveal as="li" key={s.label} delay={650 + i * 90}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  <span>{s.label}</span>
                  <small>{s.handle}</small>
                </a>
              </Reveal>
            ))}
        </ul>
      </Reveal>
      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}
