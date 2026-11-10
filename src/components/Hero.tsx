import { designs, profile } from "../data";
import { useParallax } from "../hooks/useParallax";
import Reveal from "./Reveal";
import Words from "./Words";

const stack = [designs[0], designs[1], designs[2]];

export default function Hero() {
  const art = useParallax<HTMLDivElement>();
  const [first] = profile.name.split(" ");

  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <Words
          as="h1"
          className="hero-title"
          text={`${first} designs brands people remember.`}
          em={["designs"]}
          delay={120}
          leaveOnly
        />
        <Reveal as="p" className="lede" delay={500}>
          {profile.tagline}
        </Reveal>
        <Reveal className="hero-cta" delay={650}>
          <a className="btn btn-solid" href="#work">
            View my work <span className="arrow" aria-hidden="true">↓</span>
          </a>
          <a className="btn btn-ghost" href={profile.cv} download="Diana_Nunez_CV.pdf">
            Download CV
          </a>
        </Reveal>
      </div>

      <div className="hero-art" ref={art} aria-hidden="true">
        {stack.map((d, i) => (
          <div key={d.src} className={`layer layer-${i + 1}`}>
            <figure className="card">
              <img src={d.src} alt="" width={d.width} height={d.height} decoding="async" fetchPriority="high" />
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
