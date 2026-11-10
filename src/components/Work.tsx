import { useCallback, useRef, useState } from "react";
import { categories, designs, type Category } from "../data";
import { nameElement, viewTransition } from "../lib/transition";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";
import Words from "./Words";

type Filter = "All" | Category;

export default function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);
  // Once the visitor has filtered, tiles that appear should not replay their scroll-in animation.
  const [filtered, setFiltered] = useState(false);
  const grid = useRef<HTMLUListElement>(null);
  const openRef = useRef<number | null>(null);
  openRef.current = open;

  const visible = designs.filter((d) => filter === "All" || d.category === filter);

  const tiles = () => Array.from(grid.current?.querySelectorAll<HTMLElement>(".tile") ?? []);
  const nameTiles = () => tiles().forEach((el) => nameElement(el, `tile-${el.dataset.id}`));
  const clearTiles = () => tiles().forEach((el) => nameElement(el, null));

  // Filtering animates tiles to their new positions (View Transitions API, where supported).
  const changeFilter = (next: Filter) => {
    if (next === filter) return;
    viewTransition(
      () => {
        setFiltered(true);
        setFilter(next);
      },
      { before: nameTiles, after: nameTiles, cleanup: clearTiles },
    );
  };

  // Opening morphs the clicked image into the lightbox; closing morphs it back.
  const openLightbox = (i: number, img: Element | null) =>
    viewTransition(() => setOpen(i), {
      before: () => nameElement(img, "design"),
      after: () => nameElement(img, null),
      cleanup: () => nameElement(img, null),
    });

  const closeLightbox = useCallback(() => {
    const i = openRef.current;
    const img = i === null ? null : grid.current?.querySelector(`[data-i="${i}"] img`);
    viewTransition(() => setOpen(null), {
      after: () => nameElement(img, "design"),
      cleanup: () => nameElement(img, null),
    });
  }, []);

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="section-head">
        <div>
          <Words as="h2" id="work-title" className="h2" text="Things I've made" em={["made"]} />
        </div>
        <Reveal className="chips" delay={200}>
          <div role="group" aria-label="Filter projects" className="chips-inner">
            {(["All", ...categories] as Filter[]).map((c) => (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={filter === c}
                onClick={() => changeFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <ul className="masonry" ref={grid}>
        {visible.map((d, i) => (
          <Reveal
            as="li"
            key={d.src}
            className="tile"
            delay={filtered ? 0 : (i % 3) * 90}
            instant={filtered}
            dataId={designs.indexOf(d)}
          >
            <button
              type="button"
              data-i={i}
              onClick={(e) => openLightbox(i, e.currentTarget.querySelector("img"))}
              aria-label={`Open ${d.title}`}
            >
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
          </Reveal>
        ))}
      </ul>

      {open !== null && <Lightbox items={visible} index={open} onIndex={setOpen} onClose={closeLightbox} />}
    </section>
  );
}
