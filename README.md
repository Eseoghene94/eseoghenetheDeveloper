# David Ojiyovwi — Portfolio

Personal site of David Eseoghene Ojiyovwi (CODEwithESE), Senior / Lead Full-Stack Software Engineer.
Live at https://eseoghenethedeveloper.vercel.app

Built with Next.js 14 (Pages Router), Tailwind CSS and GSAP (ScrollTrigger, SplitText, Flip).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also runs lint)
```

## Where things live

| What | Where |
| --- | --- |
| Name, links, stats, biography | `src/data/profile.js` |
| Experience and education | `src/data/experience.js` |
| Skills | `src/data/skills.js` |
| Case studies and earlier work | `src/data/projects.js` |
| Resume download | `public/EseogheneDavid.pdf` |

Pages read everything from `src/data`, so updating the CV means editing those files, not components.

**Adding a case-study screenshot.** Put the image in `public/images/projects/`, import it at the top of `src/data/projects.js`, and add it to that project's `images` array. The first image becomes the card cover. Set `liveUrl` to show a "Visit site" link.

When a project is added or renamed, update `public/sitemap.xml` to match.

## Motion

All animation lives in components that use `useGSAP` with `gsap.matchMedia()`. Every effect is skipped for visitors who set "reduce motion" in their OS. Plugins are registered once in `src/lib/gsap.js`.

- **Home:** the portrait "develops" through an SVG turbulence filter, the headline assembles letter by letter, the lightbulb flickers on, and the Hire Me button is magnetic.
- **About:** the biography reveals line by line and the stats count up. The skills scatter and then settle into their groups on scroll, and the experience timeline draws itself.
- **Projects:** cards wipe in, covers move with parallax, and the industry filter re-flows with GSAP Flip.
- **Between pages:** an ink-curtain transition (`src/Components/PageTransition.js`).
- **404:** a "dry well". Desktop drills through rock strata to 404 m; phones get a depth gauge and core sample.

## Icons and share image

`npm run assets` regenerates `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` and the Open Graph card `og.png` from `scripts/generate-assets.mjs`. Run it after changing the name, title or logo.
