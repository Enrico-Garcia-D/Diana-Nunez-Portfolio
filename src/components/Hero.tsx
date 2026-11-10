import { designs, profile } from "../data";

const stack = [designs[0], designs[1], designs[2]];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="dot" aria-hidden="true" /> Available for new projects
        </p>
        <h1 className="hero-title">
          {profile.name.split(" ")[0]} <em>designs</em> brands people remember.
        </h1>
        <p className="lede">{profile.tagline}</p>
        <div className="hero-cta">
          <a className="btn btn-solid" href="#work">
            View my work <span aria-hidden="true">↓</span>
          </a>
          <a className="btn btn-ghost" href={profile.cv} download="Diana_Nunez_CV.pdf">
            Download CV
          </a>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        {stack.map((d, i) => (
          <figure key={d.src} className={`card card-${i + 1}`}>
            <img src={d.src} alt="" width={d.width} height={d.height} decoding="async" />
          </figure>
        ))}
      </div>
    </section>
  );
}
