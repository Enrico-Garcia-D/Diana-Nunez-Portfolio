# Diana Nuñez — Portfolio

Single-page design portfolio built with React, TypeScript and Vite. Self-hosted fonts (Fraunces + Inter), light/dark theme, no runtime dependencies beyond React.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Edit content

Everything editable lives in [src/data.ts](src/data.ts): bio, services, email, social links
(an empty `href` hides a link, e.g. LinkedIn) and the list of designs with title and category.
To add a design, drop an image in `src/assets/designs/` and add an entry (with its pixel size) to `designs`.
The downloadable CV is `public/Diana-Nunez-CV.pdf`.

## Structure

```
src/
  App.tsx             page composition
  data.ts             profile, socials, designs
  components/         Nav, Hero, Marquee, Work, Lightbox, About, Contact
  hooks/              useModal (focus trap, Esc, scroll lock), useReveal, useTheme
  styles.css          design tokens + styles
```

The build uses relative asset paths (`base: "./"`), so `dist/` can be hosted anywhere, including GitHub Pages.
