/**
 * Typefaces a morphing heading cycles through as it moves across the viewport.
 * Index 0 is the resting face (heading centred on screen); the CSS classes `.f0`..`.f4`
 * in styles.css give each index its font-family, so keep the two lists in step.
 */
export const FONT_COUNT = 5;

/** Scroll distance (px from the viewport centre) over which a heading moves to the next typeface. */
export const FONT_STEP = 150;
