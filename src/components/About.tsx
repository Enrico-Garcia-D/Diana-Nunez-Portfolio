import { profile } from "../data";
import { useReveal } from "../hooks/useReveal";

export default function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="about reveal" ref={ref}>
        <div>
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="h2">
            Detail-obsessed, <em>color-curious.</em>
          </h2>
        </div>
        <div className="about-body">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <ul className="tags" aria-label="Services">
            {profile.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <a className="btn btn-ghost" href={profile.cv} download="Diana_Nunez_CV.pdf">
            Download CV <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
