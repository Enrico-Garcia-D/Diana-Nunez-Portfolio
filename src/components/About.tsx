import { profile } from "../data";
import Reveal from "./Reveal";
import Words from "./Words";

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <Reveal className="about">
        <div>
          <Words as="h2" id="about-title" className="h2" text="Detail-obsessed, color-curious." em={["color-curious."]} />
        </div>
        <div className="about-body">
          {profile.about.map((p, i) => (
            <Reveal as="p" key={p} delay={150 + i * 120}>
              {p}
            </Reveal>
          ))}
          <ul className="tags" aria-label="Services">
            {profile.services.map((s, i) => (
              <Reveal as="li" key={s} delay={450 + i * 70}>
                {s}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={750}>
            <a className="btn btn-ghost" href={profile.cv} download="Diana_Nunez_CV.pdf">
              Download CV <span className="arrow" aria-hidden="true">↓</span>
            </a>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
