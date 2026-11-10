import { useEffect, useRef } from "react";
import type { Design } from "../data";
import { useModal } from "../hooks/useModal";

interface Props {
  items: Design[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}

export default function Lightbox({ items, index, onIndex, onClose }: Props) {
  const ref = useModal<HTMLDivElement>(onClose, { lockScroll: true });
  const d = items[index];
  const n = items.length;
  const go = (delta: number) => onIndex((index + delta + n) % n);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div
      className="lightbox"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${d.title}, ${index + 1} of ${n}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button className="lb-btn lb-close" type="button" aria-label="Close" onClick={onClose}>
        ✕
      </button>
      {n > 1 && (
        <>
          <button className="lb-btn lb-prev" type="button" aria-label="Previous design" onClick={() => go(-1)}>
            ←
          </button>
          <button className="lb-btn lb-next" type="button" aria-label="Next design" onClick={() => go(1)}>
            →
          </button>
        </>
      )}
      <figure className="lb-fig" key={d.src}>
        <img src={d.src} alt={`${d.title} design`} />
        <figcaption>
          <b>{d.title}</b>
          <span>
            {d.category} · {index + 1}/{n}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
