# NovaAI — AI Animation Workflow

<div align="center">

### Clear. Precise. Automated.

A cinematic, scroll-driven AI automation landing page built with React, TypeScript, Vite, and Tailwind CSS.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-11-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

</div>
-----
---

## Overview

**NovaAI** is a dark, cinematic marketing experience designed around AI-powered automation for modern teams.

Rather than using a conventional static hero, the page uses a full-screen visual layer that responds to document scroll. Typography, translucent glass surfaces, and carefully staged reveals create a restrained editorial experience.

The current implementation is a focused single-page frontend with:

- Fixed glassmorphism navigation
- Scroll-controlled cinematic hero animation
- Progressive video-to-canvas rendering
- Responsive editorial layouts
- IntersectionObserver reveal animations
- Glass badges, capability panels, and CTA surfaces
- Mobile-first responsive behavior

---

## Experience

### 01 — Cinematic Hero

The opening section combines the NovaAI wordmark, service categories, supporting copy, consultation CTA, and a full-bleed visual background.

Primary message:

> **Clear. Precise. Automated.**

### 02 — Scroll-Driven Animation

The hero background is synchronized with page scroll instead of playing as a conventional looping video.

The renderer progressively moves through three states:

```text
Poster
  ↓
Loaded video
  ↓
Cached ImageBitmap frames
  ↓
Canvas-based scroll scrubbing
```

The frame cache targets approximately **24–90 frames**, depending on the source video's duration.

### 03 — AI Capabilities

The second section introduces three core capabilities:

- **Real-time vision** — reads context as work happens.
- **Layered insight** — sharpens rough intent into useful output.
- **Adaptive speed** — improves its cadence as you work.

### 04 — Reveal Motion

Content blocks use a reusable `Reveal` component powered by **IntersectionObserver**. Elements animate upward with opacity transitions and configurable delays.

---

## Features

| Feature | Description |
|---|---|
| Scroll-scrubbed hero | Visual progress follows document scroll |
| Frame extraction | Generates a client-side frame cache from the hero video |
| Canvas rendering | Renders cached frames efficiently across the viewport |
| Video fallback | Direct video seeking remains available while caching |
| Poster fallback | Immediate visual feedback while media loads |
| Smooth interpolation | Reduces harsh frame jumps while scrolling |
| Responsive layout | Tailwind breakpoints adapt the composition |
| Glass UI | Translucent surfaces with backdrop blur |
| Reveal animation | One-time IntersectionObserver-based transitions |
| Accessible structure | Semantic sections and hidden decorative media |

---

## Tech Stack

### Frontend

- **React 19**
- **TypeScript 5.8**
- **Vite 6**
- **Tailwind CSS 3.4**
- **Lucide React**

### Browser APIs

- HTMLVideoElement
- HTMLCanvasElement
- ImageBitmap API
- IntersectionObserver
- requestAnimationFrame
- ResizeObserver

### Package Manager

- **pnpm 11**

---

## Architecture

```text
NovaAI Landing Page
│
├── App.tsx
│   ├── Navbar
│   ├── HeroSection
│   ├── CapabilitySection
│   └── CapabilityPanel
│
├── components/
│   ├── ScrollVideo.tsx
│   │   ├── Poster fallback
│   │   ├── Video fallback
│   │   ├── Frame extraction
│   │   ├── ImageBitmap cache
│   │   └── Canvas renderer
│   │
│   └── Reveal.tsx
│       └── IntersectionObserver transitions
│
├── public/
│   ├── hero.mp4
│   ├── hero-poster.jpg
│   ├── novaai-mark.svg
│   └── manus-routes.json
│
└── Vite / TypeScript / Tailwind configuration
```

---

## Project Structure

```text
NOVA-AI-ANIMATION-WORKFLOW-/
├── public/
│   ├── hero.mp4
│   ├── hero-poster.jpg
│   ├── manus-routes.json
│   └── novaai-mark.svg
│
├── src/
│   ├── components/
│   │   ├── Reveal.tsx
│   │   └── ScrollVideo.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── app.config.ts
├── index.html
├── package.json
├── plan.md
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

Install:

- **Node.js**
- **pnpm 11** or a compatible pnpm release

### 1. Clone

```bash
git clone https://github.com/Coderzer69/NOVA-AI-ANIMATION-WORKFLOW-.git
cd NOVA-AI-ANIMATION-WORKFLOW-
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start development

```bash
pnpm dev
```

The project is configured to run at:

```text
http://localhost:3000
```

### 4. Production build

```bash
pnpm build
```

### 5. Type checking

```bash
pnpm typecheck
```

---

## How the Scroll Animation Works

### Scroll progress

The application maps the current document scroll position to a normalized range:

```text
progress = scrollY / totalScrollableDistance
```

The result is clamped between `0` and `1`.

### Smooth progress

The renderer interpolates toward the target value:

```text
current += (target - current) × 0.12
```

This creates a smoother cinematic response.

### Frame selection

When the frame cache is ready:

```text
frameIndex = round(progress × (frameCount - 1))
```

The selected `ImageBitmap` is drawn to the canvas using object-cover-style scaling so the visual fills the viewport.

### Progressive fallback

If frame extraction is not available, the visible video remains usable and is seeked according to the smoothed scroll position.

---

## Performance

The animation system intentionally limits cache size and render resolution.

| Optimization | Current behavior |
|---|---|
| Cache size | 24–90 frames |
| Extraction density | ~12 frames/second |
| Cached width | Up to 960px |
| Canvas DPR | Capped at 2× |
| Rendering loop | requestAnimationFrame |
| Cleanup | Cached bitmaps, timers, observers, and video source are released |

These choices help balance visual fidelity against browser memory and rendering cost.

---

## Design System

NovaAI uses a restrained dark editorial language.

| Token | Value |
|---|---|
| Base background | `#0a0a0a` |
| Primary text | White |
| Secondary text | Reduced-opacity white |
| Surfaces | Translucent white |
| Borders | Low-opacity white |
| Typography | Inter |
| Style | Cinematic / editorial / minimal |
| Material | Frosted glass |

The design avoids heavy gradients and unnecessary decoration so the media and typography stay dominant.

---

## Accessibility

The current implementation includes:

- Semantic `header`, `nav`, `main`, and `section` elements
- Navigation and descriptive labels
- Decorative media hidden from assistive technology
- Descriptive image alt text
- IntersectionObserver fallback when unsupported
- Content that remains accessible while animation initializes

---

## Customization

### Change the hero video

Update the video source in:

```text
src/components/ScrollVideo.tsx
```

Current asset:

```text
/public/hero.mp4
```

Also replace:

```text
/public/hero-poster.jpg
```

with a suitable poster frame.

### Change services

Edit the `services` array in `src/App.tsx`:

```ts
const services = [
  'AI AUTOMATION',
  'AI INTEGRATION',
  'AI AGENT DEVELOPMENT',
];
```

### Change capabilities

Update the `capabilities` array in `src/App.tsx`.

### Adjust reveal timing

Pass a different delay to `Reveal`:

```tsx
<Reveal delay={300}>
  ...
</Reveal>
```

The transition itself is defined in `src/components/Reveal.tsx`.

---

## Deployment

This is a standard Vite frontend and can be deployed to common static/frontend hosting platforms.

Build:

```bash
pnpm build
```

Output:

```text
dist/
```

For static deployments, configure the host to serve the Vite build and enable SPA fallback when the hosting provider requires it.

---

## Important Notes

### Hero media

The visual experience depends on `public/hero.mp4`. Keep replacement media web-optimized to reduce initial loading and seeking costs.

### Browser APIs

The highest-quality path uses `createImageBitmap` and canvas/media APIs. A video-seeking fallback is retained when frame extraction is unavailable.

### Frontend-only project

The current repository does **not** contain a backend, database, authentication layer, or server API. It is focused on the landing-page experience.

---

## Roadmap

- [ ] Add a real consultation/contact form
- [ ] Connect CTAs to a scheduling or lead-management service
- [ ] Add project/case-study pages
- [ ] Add blog/content routing
- [ ] Add analytics and conversion tracking
- [ ] Add explicit reduced-motion handling
- [ ] Add automated Lighthouse/accessibility checks
- [ ] Add production deployment configuration
- [ ] Further optimize hero media for mobile devices

---

## Credits

Built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Native browser media, canvas, and animation APIs

---

## License

No explicit open-source license is currently included in this repository.

Unless a license is added, standard copyright protections apply.

---

## Author

**Urvish Bhardwaj**

GitHub: [@Coderzer69](https://github.com/Coderzer69/NOVA-AI-ANIMATION-WORKFLOW-)

---

<div align="center">

### NovaAI

**Clear. Precise. Automated.**

</div>
