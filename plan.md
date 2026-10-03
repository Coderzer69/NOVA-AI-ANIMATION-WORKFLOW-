# NovaAI Landing Page — Implementation Plan

## Product and visual direction
Recreate the confirmed NovaAI reference as a dark cinematic AI-marketing landing page. Preserve the supplied copy, media URLs, layout, colors, type, spacing, and interactions instead of proposing alternate art direction. The page should feel editorial and restrained: abstract moving sculpture in a blue-grey mist, white shadowed typography, translucent glass surfaces, and minimal navigation. Its tone is precise, confident, and quiet.

## Design decisions
- **Design movement:** Cinematic digital editorial / contemporary minimalism.
- **Core principles:** motion follows scroll; typography remains readable over imagery; glass is translucent rather than opaque; sections use sparse, asymmetrical editorial placement.
- **Color philosophy:** near-black `#0a0a0a` grounds the scene; white typography and glass pick out content while the provided video supplies its own mist and warm highlights. No added gradients or new palette.
- **Layout paradigm:** fixed full-bleed video behind two viewport-height editorial sections separated by the required `80vh` scrub spacer; content moves from stacked on small screens to side-by-side where specified.
- **Signature elements:** scroll-scrubbed abstract film; left-accent glass badges; frosted portrait/capability surfaces.
- **Interaction and animation:** smoothed scroll-to-timeline mapping; 700ms intersection-triggered fade-up blocks; 500ms poster/video/canvas crossfade; subtle CTA and chevron hover transitions; no autoplay loop.
- **Typography:** Google Inter 400/500/600/700 for both sans and mono utility classes; exact sizes/leading/tracking from the brief.
- **Brand essence:** automation for teams that need clearer, more precise operations; precise, cinematic, composed.
- **Brand voice:** preserve the supplied editorial copy verbatim, including “Clear. Precise. Automated.” and “Learn to see brilliantly.”
- **Wordmark and mark:** lowercase Inter `novaai` wordmark paired with a thin-stroked Lucide Hexagon.
- **Signature brand color:** no additional accent is introduced; white glass/typography against near-black is the identifying material.

## Implementation structure
- `src/App.tsx`: fixed navbar and the two responsive content sections.
- `src/components/ScrollVideo.tsx`: fixed video/poster/canvas stack, frame cache, scroll mapping and object-cover rendering.
- `src/components/Reveal.tsx`: shared IntersectionObserver reveal behavior and delay handling.
- `src/index.css`, `tailwind.config.ts`, `postcss.config.js`: Inter, Tailwind theme tokens, antialiasing and motion/accessibility styles.
- `src/main.tsx`, `index.html`, `vite.config.ts`, `tsconfig.json`: React/Vite entry and build configuration.
- `public/hero-poster.jpg`: first frame extracted from the exact supplied video URL; used only as a loading poster.
- `public/manus-routes.json`: static declaration of the single page route.
