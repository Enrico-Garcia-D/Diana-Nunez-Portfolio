import { Fragment, type CSSProperties } from "react";
import { useReveal } from "../hooks/useReveal";
import { FONT_COUNT } from "../lib/fonts";

interface Props {
  as: "h1" | "h2";
  id?: string;
  text: string;
  /** Words to render in the accent colour. */
  em?: string[];
  className?: string;
  /** Extra delay before the first word, in ms. */
  delay?: number;
  /** Only change typeface once the heading has scrolled up past the viewport centre (for the first heading on the page). */
  leaveOnly?: boolean;
}

const layers = Array.from({ length: FONT_COUNT }, (_, k) => k);

/**
 * Heading whose words rise out of a mask when scrolled into view. Every word holds all the
 * typefaces stacked in one grid cell, so line breaks never change; `--o0..--o4` (set on scroll by
 * useScrollMorph) decide which typeface(s) are visible.
 */
export default function Words({ as: Tag, id, text, em = [], className, delay = 0, leaveOnly }: Props) {
  const ref = useReveal<HTMLSpanElement>(0.3);
  return (
    <Tag id={id} className={className} data-morph="" data-leave-only={leaveOnly ? "" : undefined}>
      <span className="sr-only">{text}</span>
      <span className="words" ref={ref} aria-hidden="true">
        {text.split(" ").map((word, i) => {
          const content = em.includes(word) ? <em>{word}</em> : word;
          return (
            <Fragment key={i}>
              {i > 0 && " "}
              <span className="w">
                <span className="wi stack" style={{ "--i": i, "--base": `${delay}ms` } as CSSProperties}>
                  {layers.map((k) => (
                    <span key={k} className={`f f${k}`}>
                      {content}
                    </span>
                  ))}
                </span>
              </span>
            </Fragment>
          );
        })}
      </span>
    </Tag>
  );
}
