import { flushSync } from "react-dom";

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** View Transitions are a progressive enhancement: without support we just apply the update. */
export const canTransition = () => "startViewTransition" in document && !prefersReducedMotion();

interface Options {
  /** Runs against the OLD DOM (e.g. name the elements that should morph). */
  before?: () => void;
  /** Runs against the NEW DOM, before it is captured. */
  after?: () => void;
  /** Runs when the transition has finished or was skipped. */
  cleanup?: () => void;
}

export function viewTransition(update: () => void, { before, after, cleanup }: Options = {}) {
  if (!canTransition()) {
    update();
    return;
  }
  before?.();
  const t = document.startViewTransition(() => {
    flushSync(update);
    after?.();
  });
  t.finished.catch(() => {}).finally(() => cleanup?.());
}

export function nameElement(el: Element | null | undefined, name: string | null) {
  const style = (el as HTMLElement | null)?.style;
  if (!style) return;
  if (name) style.setProperty("view-transition-name", name);
  else style.removeProperty("view-transition-name");
}
