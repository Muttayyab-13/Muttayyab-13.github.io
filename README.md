# Muttayyab Abdurrehman — Portfolio

Personal portfolio site for an AI Engineer (LLMs · RAG · Computer Vision · OCR · Full-Stack).

🌐 **Live:** https://muttayyab-13.github.io

## Tech stack

- **[Astro](https://astro.build)** — static-first, ships almost zero JS
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility styling via `@tailwindcss/vite`
- **[Geist](https://vercel.com/font)** — self-hosted variable font
- Vanilla scroll-reveal animations (IntersectionObserver, respects `prefers-reduced-motion`)

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

| Command         | Action                            |
| --------------- | --------------------------------- |
| `pnpm dev`      | Start the local dev server        |
| `pnpm build`    | Build the production site to `dist/` |
| `pnpm preview`  | Preview the production build       |

## Edit content

All site content (bio, projects, capabilities, stats, links) lives in a single file:

```
src/data/site.ts
```

## Deploy

Pushing to `main` automatically builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. No manual steps required.
