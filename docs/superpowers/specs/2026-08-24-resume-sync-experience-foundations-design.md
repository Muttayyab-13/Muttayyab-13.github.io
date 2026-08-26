# Résumé sync — experience, foundations & case studies — design spec

**Date:** 2026-08-24
**Status:** Approved design.
**Source of truth:** `Muttayyab_Abdurrehman_Resume.pdf` (repo root, gitignored).

## Goal

Bring the portfolio in line with the current résumé and broaden the story from
"AI Engineer" to "AI Engineer with a real software-engineering foundation".

Four outcomes:

1. **Experience is visible.** The site currently shows zero work history. Add a
   timeline for Merchaint, Revelo (for Anthropic), Kaisaro and eMumba.
2. **The SE degree means something.** Add an Engineering Foundations section that
   renders core coursework as *capabilities*, plus the MERN builds and certifications.
3. **The strongest projects have case studies.** Four new case-study pages, three
   of them backed by real screenshots.
4. **Screenshots ship.** Convert supplied PNGs to WebP, review each for client or
   personal identifiers, commit to `public/work/`.

## Positioning decision

**AI-first, SE as foundation.** The hero headline and Capabilities stay AI-led.
Software engineering and web development appear as the discipline *underneath*
the AI work — not as a co-equal second track. This keeps a sharp specialist
signal while answering the "can he actually build software?" question.

Consequence: the three MERN builds (Real Estate, Budget Tracker, Library
Management) live as a compact strip inside Foundations, **not** as cards in the
Work grid. The Work grid stays AI-focused.

---

## Part 1 — Data model (`src/data/site.ts`)

`site.ts` remains the single source of truth. New exports:

```ts
export type Accent = "primary" | "secondary" | "tertiary";

export type Role = {
  company: string;
  location: string;
  title: string;
  type: "Full-time" | "Contract" | "Project" | "Internship";
  start: string;          // "Feb 2025"
  end: string;            // "Present"
  current?: boolean;
  bullets: string[];      // 3 max — trimmed from the résumé's longer lists
  stack: string[];
  accent: Accent;
};
export const experience: Role[];

export type Course = { title: string; body: string };
export const education: {
  degree: string; institution: string; campus: string;
  start: string; end: string; cgpa: string;
  coursework: Course[];      // rendered as capabilities, not course titles
  supporting: string[];      // chip row: DSA, AI, Information Security
};

export type Build = { title: string; body: string; stack: string[] };
export const webBuilds: Build[];

export type Cert = { title: string; issuer: string; period: string; body: string };
export const certifications: Cert[];
```

Modified existing exports:

- `projects` — two new entries: **RomaSub.AI** and **Research Desk**; existing
  Multi-Source and RAG-Bot entries gain `slug` + `caseStudy`.
- `stats` — "10+ AI Projects Shipped" → "12+ Projects Shipped".
- `about.bio` — mention the SE degree and construction/architecture discipline.
- `site.role` / `hero.subline` — reference the SE foundation.
- `navLinks` — becomes exactly five: **Work · Experience · Foundations · About ·
  Contact**. Capabilities is dropped from the nav (the section stays on the page,
  directly below the hero, so it needs no jump link) to keep the mobile nav from
  wrapping.

### `CaseStudy` type additions

```ts
type CaseStudy = {
  ...existing,
  links?: { label: string; href: string; icon: string }[];  // repo / demo
  diagram?: "romasub-pipeline";   // named diagram registry key
  cta: { accentWord: string; lead: string; tail: string; body: string };
};
```

`cta` replaces the hardcoded "Interested in document-AI work?" block.
`diagram` is a **named key**, not markup in data — `[slug].astro` maps the key to
a real Astro component. Keeps SVG out of the data file and keeps the type closed.

---

## Part 2 — Page structure

```
Hero → Capabilities → Work → Experience → Foundations → About → Footer
                              ▲ new        ▲ new
```

Rationale for the order: Work first (projects are the visual hook), then
Experience for credibility, then Foundations for the degree. About stays last as
the human close.

### New: `src/components/Experience.astro`

Vertical timeline. A 1px accent rail on the left with a node per role; the
current role's node pulses (reuse the availability-dot animation already in
`global.css`). Each entry renders company · location · title · type badge ·
date range · up to 3 bullets · stack chips.

Mobile: rail collapses to the left edge, cards go full-width.

### New: `src/components/Foundations.astro`

One glass card, three stacked blocks:

1. **Education** — BS Software Engineering, COMSATS University Islamabad
   (Abbottabad Campus), Sep 2022 – Jul 2026, CGPA 3.50 / 4.0.
2. **Core coursework as capabilities** — responsive grid. Each item is the
   course reframed as a thing he can do:

   | Course | Rendered as |
   |---|---|
   | Software Design & Architecture | Design patterns, layered architecture, and reasoning about trade-offs before writing code. |
   | Software Construction & Development | Clean, testable construction — version-control discipline and code built to be maintained. |
   | Requirements Engineering | Elicitation, specification and traceability — building the right thing, not just building it right. |
   | Business Process Engineering | Modeling and redesigning a process before automating it. |
   | Software Re-engineering | Reading, refactoring and modernizing systems you didn't write. |
   | Software Concepts & SE Fundamentals | SDLC, process models and quality attributes as first-class design inputs. |

   Supporting chips: Data Structures & Algorithms · Artificial Intelligence ·
   Information Security.

3. **Web & Full-Stack builds** — compact strip: Real Estate Listing Platform
   (MERN), Budget Tracker (MERN, built during the eMumba internship), Library
   Management System (React · Express · MS SQL).

4. **Certifications** — NUST × Atom Camp AI Cohort 03; Udemy Complete Web
   Development Bootcamp.

### Modified: `src/components/About.astro`

Keeps the bio. Its two skill columns partially duplicate Foundations — retitle
them to stay distinct ("AI & Data" / "Engineering") and let Foundations own
education and coursework. No structural change.

---

## Part 3 — Case studies

Five total; four new.

| Slug | Assets | Angle |
|---|---|---|
| `ai-document-extraction` | none (private) | unchanged, except new `cta` field |
| `research-desk` | 7 real screenshots | 4-agent LangGraph workflow, validator loop-back, human-in-the-loop interrupt |
| `romasub-ai` | **SVG diagram only** | 7-layer transliteration pipeline, SSE streaming, graceful degradation |
| `multi-source-search` | 6 screenshots | concurrent multi-API fetch, FAISS over 50K+ embeddings, sentiment + auto-citations |
| `rag-automation` | RAG-Bot ×2 + n8n canvas | combined "Local AI & Automation" — offline RAG plus production n8n workflows |

**RomaSub.AI has no screenshots.** The supplied `DemoVideo.mp4` is a Research
Desk recording containing a webcam overlay, personal browser tabs and Gmail — it
is **excluded entirely**. RomaSub's case study is carried by a purpose-built
diagram instead.

### New: `src/components/diagrams/RomaSubPipeline.astro`

Inline SVG of the 7-layer pipeline, using existing CSS custom properties
(`--color-primary`, `--color-secondary`) so it themes correctly in both light and
dark. Horizontal flow on desktop, vertical stack on mobile.

Stages: Whisper ASR → loanword/name bypass (1,041 words · 189 names) →
normalization → fine-tuned M2M100 → reconstruction → fuzzy correction →
optional Claude Haiku refinement.

---

## Part 4 — Fixes to `src/pages/work/[slug].astro`

Three changes required by the new content:

1. **Screenshot rendering is wrong for UI captures.** Current markup is
   `aspect-video` + `object-cover`, which crops text out of screenshots. Change to
   `object-contain` on a padded, bordered surface so full UI is visible. Keep
   `loading="lazy"`; add explicit `width`/`height` to prevent layout shift.
2. **Bottom CTA is hardcoded** to "Interested in document-AI work?". Drive it
   from `cs.cta`.
3. **Optional links row** — render `cs.links` (repo / demo) in the header when
   present; private studies simply omit the field.

---

## Part 5 — Image pipeline

No `cwebp` and no ImageMagick on this machine. **ffmpeg has `libwebp`**, so:

```sh
ffmpeg -i <src> -vf "scale='min(1600,iw)':-2" -c:v libwebp -quality 82 \
       -map_metadata -1 <out>.webp
```

Output layout:

```
public/work/research-desk/*.webp
public/work/multi-source/*.webp
public/work/rag-automation/*.webp
```

Expected: ~2.4 MB of PNG → ~350 KB of WebP.

### Privacy review — mandatory before commit

The repo is **public**. Every image is reviewed before conversion:

- `n8nMain.png` — shows a **"Strongcore"** workspace/account name. **Excluded**;
  `n8nfull.png` (anonymous workflow canvas) is used instead.
- `DemoVideo.mp4` — webcam overlay, personal tabs, Gmail. **Excluded.**
- `sign.jpg`, `WhatsApp Image *.jpg` — personal. **Excluded.**
- `Upwork hiring.pdf`, `Label Studio.pdf` — not images, out of scope. **Excluded.**
- Research Desk shots — reviewed clean (localhost, no credentials).
- `m*.png` Multi-Source shots — reviewed clean.
- Brain-tumour notebook shots (`b*`, `c*`) — clean, but the project has no case
  study; **not committed** in this pass.

The résumé PDF at the repo root stays gitignored per `CLAUDE.md` (contains a
phone number).

---

## Non-goals

- No redesign. The Deep Space aesthetic, tokens and glass treatment are unchanged.
- No new dependencies. `playwright-core` may be added temporarily for visual
  verification and removed before commit, per `CLAUDE.md`.
- Brain Tumour Classification stays a résumé line; no card, no case study.
- The résumé PDF itself is not edited — recommendations are delivered as advice
  (see below), not applied.

## Verification

1. `pnpm build` succeeds; 6 static pages emitted (index + 5 case studies).
2. Playwright screenshots at 1280px and 390px, in both light and dark themes,
   confirm no horizontal overflow and correct theming of the new sections.
3. Every committed image inspected for identifiers before `git add`.
4. `git status` clean of résumé PDF, `.local/`, and `playwright-core`.

---

## Appendix — Résumé recommendations (advice only, not applied)

Delivered to the user separately; recorded here so the site copy and the résumé
stay reconcilable.

**Fix first**

1. Add the portfolio URL (`muttayyab-13.github.io`) to the contact line — it is
   currently absent.
2. Cut to 2 pages; it currently reads as 3.
3. Label Revelo as **Contract** — it sits inside the Merchaint date range and
   currently reads as overlapping full-time employment.
4. Delete the **AI SPECIALIZATIONS** block; every term duplicates Skills or the
   summary.
5. Add the missing SE courses: Requirements Engineering, Software Re-engineering,
   Software Concepts.

**Tighten**

6. Merchaint has 7 bullets vs eMumba's 2 — trim to the 5 strongest. Move the
   n8n/TikTok/Google-Maps bullet out of the financial-platform role into Projects.
7. Replace the eMumba filler bullet ("participated in professional development
   workshops") with the Budget Tracker MERN app, which is currently orphaned
   under Web Development.
8. Kaisaro has no metrics while every other role does — add one.
9. Compress Skills from 9 lines to ~6; "Vector Embeddings / Semantic Search /
   Hybrid Search / Vector Retrieval" are four names for one skill.
10. Drop "Seeking an AI Engineer role…" — the summary already says it.

**Judgment calls**

11. Brain Tumour Classification is a single line with no result — add the
    accuracy figure or cut it.
12. RomaSub is the strongest project but sits below three jobs; trim 5 bullets to
    3 and consider naming it in the summary.
13. Graduating July 2026 — make the grad date scannable even if Education stays
    at the bottom.
14. Keep "National Squash Player." It is the most memorable line on the page.
