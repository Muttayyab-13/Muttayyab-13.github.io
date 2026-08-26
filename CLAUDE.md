# Portfolio — project notes for Claude

Personal portfolio for **Muttayyab Abdurrehman** (AI Engineer).

## Stack
- **Astro 6** + **Tailwind CSS v4** (`@tailwindcss/vite`), self-hosted **Geist** font.
- Static output. Package manager: **pnpm**. Node ≥ 22.
- All site content (bio, projects, capabilities, stats, links, phone) lives in
  **`src/data/site.ts`** — edit there, components read from it.

## Hosting / deploy
- Public GitHub user-site repo: **Muttayyab-13/Muttayyab-13.github.io**
- Live at **https://muttayyab-13.github.io/**
- Pushing to `main` triggers `.github/workflows/deploy.yml` (GitHub Pages via
  Actions). The CI build requires **Node 22+** (Astro 6).

## ⚙️ AUTO-DEPLOY IS ENABLED
The user has authorized automatic deployment. After completing any change the
user asks for:

1. Run `pnpm build` and confirm it succeeds (never push a broken build).
2. `git add -A && git commit -m "<concise message>"` then `git push origin main`.
3. Do **not** ask for confirmation before committing/pushing routine changes —
   just do it and report what shipped.

Only pause to ask when a change is risky, ambiguous, destructive, or would
publish something private. `Bash(git *)` is already allowed.

## Conventions
- Keep the dark "Deep Space" aesthetic: bg `#050507`, violet `#7c5cff` → cyan
  `#22d3ee` accents, glassmorphism, generous spacing.
- Verify visually when feasible (Playwright + system Chrome at
  `/usr/bin/google-chrome`); `playwright-core` is intentionally NOT a committed
  dependency — add it temporarily for screenshots, then remove before committing.
- Never commit: the résumé PDF (personal phone), Stitch export artifacts, or
  `.claude/` (all gitignored).
