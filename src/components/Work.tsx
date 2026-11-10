import { useState } from "react";
import { categories, designs, type Category } from "../data";
import { useReveal } from "../hooks/useReveal";
import Lightbox from "./Lightbox";

type Filter = "All" | Category;

export default function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const head = useReveal<HTMLDivElement>();

  const visible = designs.filter((d) => filter === "All" || d.category === filter);

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="section-head reveal" ref={head}>
        <div>
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title" className="h2">
            Things I've <em>made</em>
          </h2>
        </div>
        <div className="chips" role="group" aria-label="Filter projects">
          {(["All", ...categories] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="masonry">
        {visible.map((d, i) => (
          <li key={d.src} className="tile" style={{ animationDelay: `${i * 60}ms` }}>
            <button type="button" onClick={() => setOpen(i)} aria-label={`Open ${d.title}`}>
              <img
                src={d.src}
                alt={`${d.title} design`}
                width={d.width}
                height={d.height}
                loading="lazy"
                decoding="async"
              />
              <span className="tile-meta">
                <span>
                  <b>{d.title}</b>
                  <small>{d.category}</small>
                </span>
                <span className="tile-arrow" aria-hidden="true">
                  ↗
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}
