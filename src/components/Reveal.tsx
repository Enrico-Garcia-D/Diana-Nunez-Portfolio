import { createElement, type CSSProperties, type ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface Props {
  as?: "div" | "li" | "p" | "section";
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  /** Skip the entrance animation (already-revealed content). */
  instant?: boolean;
  dataId?: number;
  children: ReactNode;
}

/** Fades/slides its children in once they scroll into view. */
export default function Reveal({ as = "div", className = "", delay = 0, instant = false, dataId, children }: Props) {
  const ref = useReveal<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      "data-id": dataId,
      className: `reveal${instant ? " in" : ""} ${className}`.trim(),
      style: { "--d": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
