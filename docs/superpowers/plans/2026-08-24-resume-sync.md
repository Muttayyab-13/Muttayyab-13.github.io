# Résumé Sync — Experience, Foundations & Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the portfolio in line with the current résumé — add a work-experience timeline, an Engineering Foundations section carrying the SE degree and web-dev work, and four new case studies backed by real screenshots.

**Architecture:** All content stays in `src/data/site.ts` as typed consts; components read from it. Two new page sections (`Experience.astro`, `Foundations.astro`) and one diagram component (`diagrams/RomaSubPipeline.astro`). The existing `[slug].astro` dynamic route absorbs four new case studies with no routing changes — only template fixes for screenshot rendering and a data-driven CTA.

**Tech Stack:** Astro 6, Tailwind CSS v4, pnpm, ffmpeg (`libwebp`) for image conversion, Playwright + system Chrome for visual verification.

**Note on testing:** This repo has no test framework and no tests. Adding one is out of scope. Each task gates on `pnpm build` succeeding plus a targeted `grep` assertion on the emitted HTML; the final task gates on Playwright screenshots in both themes at two viewports.

**Spec:** `docs/superpowers/specs/2026-08-24-resume-sync-experience-foundations-design.md`

---

## File Structure

| Path | Responsibility | Action |
|---|---|---|
| `src/data/site.ts` | All site content + types | Modify (major) |
| `src/components/Experience.astro` | Work-history timeline | Create |
| `src/components/Foundations.astro` | Education, coursework, web builds, certs | Create |
| `src/components/diagrams/RomaSubPipeline.astro` | Inline SVG 7-layer pipeline | Create |
| `src/pages/index.astro` | Section order | Modify |
| `src/components/Nav.astro` | 5 nav links | Modify |
| `src/pages/work/[slug].astro` | Screenshot fix, CTA, links, diagram slot | Modify |
| `public/work/**/*.webp` | Optimized screenshots | Create |

---

## Task 1: Image pipeline — convert screenshots to WebP

**Files:**
- Create: `public/work/research-desk/*.webp` (6)
- Create: `public/work/multi-source/*.webp` (4)
- Create: `public/work/rag-automation/*.webp` (4)

**Privacy rules — enforce before converting:**
- EXCLUDE `n8nMain.png`, `n8n2.png` (client name "strongcore" + personal taskbar)
- EXCLUDE `DemoVideo.mp4` (webcam, personal tabs, Gmail)
- EXCLUDE `sign.jpg`, `WhatsApp Image *.jpg`, `m1.png` (VS Code tree), `m3.png` (loading state)
- CROP `n8nfull.png` top 72px to remove the "Personal / strongcore" breadcrumb

- [ ] **Step 1: Create output directories**

```bash
cd /home/muttayyab/Desktop/Portfolio
mkdir -p public/work/{research-desk,multi-source,rag-automation}
```

- [ ] **Step 2: Convert Research Desk screenshots**

```bash
SRC="/home/muttayyab/Pictures/Screenshots/Multi Source"
OUT=public/work/research-desk
conv() { ffmpeg -hide_banner -loglevel error -i "$1" \
  -vf "scale='min(1600,iw)':-2" -c:v libwebp -quality 82 -map_metadata -1 "$2" -y; }

conv "$SRC/Screenshot from 2026-06-10 12-51-461b.png" $OUT/landing.webp
conv "$SRC/Screenshot from 2026-06-10 12-53-471b.png" $OUT/agent-graph.webp
conv "$SRC/Screenshot from 2026-06-10 12-53-141b.png" $OUT/studio.webp
conv "$SRC/Screenshot from 2026-06-10 12-53-351b.png" $OUT/interrupts.webp
conv "$SRC/Screenshot from 2026-06-10 12-55-291b.png" $OUT/trace.webp
conv "$SRC/Screenshot from 2026-06-10 12-55-381b.png" $OUT/sources.webp
```

- [ ] **Step 3: Convert Multi-Source screenshots**

```bash
SRC=/home/muttayyab/Desktop/Upwork
OUT=public/work/multi-source
conv "$SRC/m2.png" $OUT/search.webp
conv "$SRC/m4.png" $OUT/insights.webp
conv "$SRC/m6.png" $OUT/sentiment.webp
conv "$SRC/m5.png" $OUT/followup.webp
```

- [ ] **Step 4: Convert RAG + automation screenshots, cropping the n8n breadcrumb**

```bash
SRC=/home/muttayyab/Desktop/Upwork
OUT=public/work/rag-automation
conv "$SRC/Rag1.png"       $OUT/ragbot.webp
conv "$SRC/rag2.png"       $OUT/ragbot-repo.webp
conv "$SRC/n8nfulll3.png"  $OUT/n8n-workflow.webp

# crop top 72px to strip the "Personal / strongcore" breadcrumb
ffmpeg -hide_banner -loglevel error -i "$SRC/n8nfull.png" \
  -vf "crop=iw:ih-72:0:72,scale='min(1600,iw)':-2" \
  -c:v libwebp -quality 82 -map_metadata -1 $OUT/n8n-canvas.webp -y
```

- [ ] **Step 5: Verify sizes and that no excluded file leaked in**

```bash
du -sh public/work; find public/work -name '*.webp' | sort; ls public/work/*/ | wc -l
```
Expected: total well under 1 MB, exactly 14 `.webp` files, no `.png`.

- [ ] **Step 6: Visually confirm the cropped n8n canvas has no client name**

Read `public/work/rag-automation/n8n-canvas.webp` and confirm the top breadcrumb is gone. If "strongcore" is still visible, increase the crop offset and re-run Step 4.

- [ ] **Step 7: Commit**

```bash
git add public/work && git commit -m "feat: add optimized case-study screenshots"
```

---

## Task 2: Extend `site.ts` types and add experience data

**Files:**
- Modify: `src/data/site.ts`

- [ ] **Step 1: Add the shared `Accent` type and export it**

Near the top of the type declarations, replace the repeated inline union with:

```ts
export type Accent = "primary" | "secondary" | "tertiary";
```

Update `Capability.accent`, `Project.accent`, and `about.columns[].accent` to use `Accent`.

- [ ] **Step 2: Add the `Role` type and `experience` const**

```ts
export type Role = {
  company: string;
  location: string;
  title: string;
  type: "Full-time" | "Contract" | "Project" | "Internship";
  start: string;
  end: string;
  current?: boolean;
  bullets: string[];
  stack: string[];
  accent: Accent;
};

export const experience: Role[] = [
  {
    company: "Merchaint",
    location: "Singapore · Remote",
    title: "Artificial Intelligence Engineer",
    type: "Full-time",
    start: "Feb 2025",
    end: "Present",
    current: true,
    bullets: [
      "Built an OCR + LLM extraction pipeline pairing layout-aware OCR with schema-driven field parsing, cutting manual data entry by 70% across invoices, receipts and statements.",
      "Made extraction schema-driven so new document types onboard by defining a field schema instead of writing a custom parser per vendor layout.",
      "Built semantic product matching on vector embeddings to reconcile supplier names against a central catalog, replacing brittle string-match logic.",
      "Added confidence scoring that auto-accepts high-confidence fields and routes only the uncertain ones to human review.",
      "Fine-tuned CNN and LSTM models on synthetic and real data to close accuracy gaps where off-the-shelf OCR failed on noisy scans.",
    ],
    stack: ["Python", "PaddleOCR", "AWS Textract", "FastAPI", "Docker"],
    accent: "primary",
  },
  {
    company: "Revelo",
    location: "for Anthropic · Remote",
    title: "AI Data Annotator / Code Reviewer",
    type: "Contract",
    start: "Jan 2026",
    end: "Feb 2026",
    bullets: [
      "Ran structured, PR-style code reviews on competing Claude model variants, judging logic correctness, modularity and maintainability.",
      "Analyzed architectural trade-offs across up to six model iterations — interface design, error handling, naming and documentation quality.",
      "Authored evaluation reports grounded in engineering principles to guide supervised fine-tuning for production-ready code generation.",
    ],
    stack: ["Code Review", "Model Evaluation", "SFT"],
    accent: "secondary",
  },
  {
    company: "Kaisaro",
    location: "United States · Remote",
    title: "Machine Learning Engineer",
    type: "Project",
    start: "Sep 2025",
    end: "Nov 2025",
    bullets: [
      "Built an ML trading system for stocks and crypto, engineering features from technical indicators (RSI, MACD, Bollinger Bands).",
      "Trained LSTM/GRU time-series models and ensemble classifiers (XGBoost, Random Forest) for trend detection and buy/sell signals.",
      "Deployed real-time data pipelines behind a FastAPI backend for live market predictions.",
    ],
    stack: ["Python", "LSTM", "XGBoost", "FastAPI"],
    accent: "tertiary",
  },
  {
    company: "eMumba",
    location: "On-site",
    title: "Full Stack Developer",
    type: "Internship",
    start: "Jul 2024",
    end: "Aug 2024",
    bullets: [
      "Built responsive, component-based interfaces with React.js, Material UI and Ant Design.",
      "Shipped a full MERN budget-tracking application end to end during the internship.",
    ],
    stack: ["React", "Node.js", "MongoDB", "Material UI"],
    accent: "secondary",
  },
];
```

- [ ] **Step 3: Verify it compiles**

Run: `pnpm build`
Expected: succeeds, 2 pages (nothing consumes `experience` yet).

- [ ] **Step 4: Commit**

```bash
git add src/data/site.ts && git commit -m "feat(data): add Role type and experience history"
```

---

## Task 3: Add education, web builds and certifications data

**Files:**
- Modify: `src/data/site.ts`

- [ ] **Step 1: Append the three new exports**

```ts
export type Course = { title: string; body: string };

export const education = {
  degree: "BS in Software Engineering",
  institution: "COMSATS University Islamabad",
  campus: "Abbottabad Campus",
  start: "Sep 2022",
  end: "Jul 2026",
  cgpa: "3.50 / 4.0",
  intro:
    "A software engineering degree, not a CS one — the curriculum is built around how real systems get specified, designed, built and kept alive.",
  coursework: [
    {
      title: "Software Design & Architecture",
      body: "Design patterns, layered architecture, and reasoning about trade-offs before writing code.",
    },
    {
      title: "Software Construction & Development",
      body: "Clean, testable construction — version-control discipline and code built to be maintained.",
    },
    {
      title: "Requirements Engineering",
      body: "Elicitation, specification and traceability — building the right thing, not just building it right.",
    },
    {
      title: "Business Process Engineering",
      body: "Modeling and redesigning a process before automating it.",
    },
    {
      title: "Software Re-engineering",
      body: "Reading, refactoring and modernizing systems you didn't write.",
    },
    {
      title: "Software Concepts & SE Fundamentals",
      body: "SDLC, process models and quality attributes as first-class design inputs.",
    },
  ] satisfies Course[],
  supporting: [
    "Data Structures & Algorithms",
    "Artificial Intelligence",
    "Information Security",
  ],
};

export type Build = { title: string; body: string; stack: string[] };

export const webBuilds: Build[] = [
  {
    title: "Real Estate Listing Platform",
    body: "Full-stack MERN application for browsing, listing and managing properties.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    title: "Budget Tracker",
    body: "MERN budget-tracking app with category breakdowns, built during the eMumba internship.",
    stack: ["MERN", "REST API"],
  },
  {
    title: "Library Management System",
    body: "Full-stack catalogue and lending system over a relational backend.",
    stack: ["React", "Express", "MS SQL"],
  },
];

export type Cert = { title: string; issuer: string; period: string; body: string };

export const certifications: Cert[] = [
  {
    title: "Artificial Intelligence — Cohort 03",
    issuer: "NUST × Atom Camp",
    period: "Nov 2024 – Feb 2025",
    body: "Hands-on ML, deep learning, NLP, LLMs, MLOps, computer vision, OCR and model deployment.",
  },
  {
    title: "The Complete Web Development Bootcamp",
    issuer: "Udemy",
    period: "Completed Oct 2023",
    body: "Full-stack development across the MERN stack and RESTful API design.",
  },
];
```

- [ ] **Step 2: Verify it compiles**

Run: `pnpm build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/data/site.ts && git commit -m "feat(data): add education, web builds and certifications"
```

---

## Task 4: Build the Experience timeline component

**Files:**
- Create: `src/components/Experience.astro`

- [ ] **Step 1: Create the component**

Structure — follow the section shell used by `Work.astro` (same `max-w-(--container-screen)`, `px-4 md:px-16`, `py-24`, a blurred ambient glow div, a `reveal` heading):

```astro
---
import { experience } from "../data/site";
import { accentText } from "../lib/accents";

const accentBorder = {
  primary: "border-primary/30",
  secondary: "border-secondary/30",
  tertiary: "border-tertiary/30",
};
const accentDot = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
};
---
```

Markup requirements:
- `<section id="experience">` so the nav anchor resolves.
- Heading: `Experience` in the same `text-4xl font-black … md:text-5xl text-heading` treatment as `Work.astro`.
- One `<ol>` with a `relative` wrapper; a vertical rail via `before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-overlay/15` on the list.
- Each `<li class="relative pl-8 pb-12 last:pb-0">` with an absolutely-positioned node at `left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2` using `accentBorder[role.accent]` + `bg-background`. For `role.current`, add an inner `animate-ping`-style dot using `accentDot`.
- Header row: `<h3>` company (text-heading, font-bold, text-xl) · `<span>` location (text-on-surface-variant, text-sm). Title on its own line in `accentText[role.accent]`, `font-semibold`.
- Right-aligned on desktop (`md:absolute md:right-0` or a flex row with `justify-between`): the date range `{role.start} – {role.end}` plus a type badge — reuse the `tech-chip` class for the badge.
- Bullets: `<ul>` of `<li>` with `text-on-surface-variant font-light leading-relaxed`, small accent dash marker.
- Stack chips: `<span class="tech-chip bg-background/50 text-[11px]">`.
- Stagger the reveal: `style={`--reveal-delay:${i * 80}ms`}` and `class="reveal"` on each `<li>`, matching the pattern in `Work.astro`.

- [ ] **Step 2: Verify it compiles standalone**

Run: `pnpm build`
Expected: succeeds (component not yet imported — Astro won't build unused components, so this only proves no syntax break; real check is Task 6).

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.astro && git commit -m "feat: add Experience timeline component"
```

---

## Task 5: Build the Foundations component

**Files:**
- Create: `src/components/Foundations.astro`

- [ ] **Step 1: Create the component**

```astro
---
import { education, webBuilds, certifications } from "../data/site";
---
```

Markup requirements — one `glass-card` wrapper (mirroring `About.astro`'s `rounded-[40px] p-10 md:p-16`), `<section id="foundations">`, containing four blocks separated by `border-t border-overlay/10 pt-12 mt-12`:

1. **Education header** — degree as `<h3>`, institution + campus, and a right-aligned meta cluster with the date range and `CGPA {education.cgpa}`. Render `education.intro` as a lead paragraph in `text-on-surface-variant`.
2. **Coursework grid** — `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`. Each `Course` is a small bordered panel: `<h4>` title in `text-heading font-semibold text-base`, `<p>` body in `text-sm font-light text-on-surface-variant`. Add a subtle numeric or icon marker for rhythm. Below the grid, render `education.supporting` as a `tech-chip` row.
3. **Web & Full-Stack builds** — `grid gap-6 md:grid-cols-3`. Title, body, stack chips.
4. **Certifications** — `grid gap-6 md:grid-cols-2`. Title, issuer + period as a meta line, body.

Each block gets an eyebrow label in the established style: `text-sm font-bold uppercase tracking-[0.2em]` with `accentText`-style coloring (`text-primary` / `text-secondary` / `text-tertiary` cycling).

Use `reveal` on the card and stagger inner grids with `--reveal-delay`.

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Foundations.astro && git commit -m "feat: add Engineering Foundations component"
```

---

## Task 6: Wire the new sections into the page and nav

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/data/site.ts` (navLinks)

- [ ] **Step 1: Update `navLinks` in `src/data/site.ts`**

Replace the existing array with exactly five links (Capabilities is dropped — the section stays on the page directly under the hero and needs no jump link):

```ts
export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Foundations", href: "/#foundations" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
```

- [ ] **Step 2: Update `src/pages/index.astro`**

```astro
---
import Base from "../layouts/Base.astro";
import Nav from "../components/Nav.astro";
import Hero from "../components/Hero.astro";
import Capabilities from "../components/Capabilities.astro";
import Work from "../components/Work.astro";
import Experience from "../components/Experience.astro";
import Foundations from "../components/Foundations.astro";
import About from "../components/About.astro";
import Footer from "../components/Footer.astro";
---

<Base>
  <Nav />
  <main class="relative z-10 pt-[96px]">
    <Hero />
    <Capabilities />
    <Work />
    <Experience />
    <Foundations />
    <About />
    <Footer />
  </main>
</Base>
```

- [ ] **Step 3: Build and assert both sections render**

```bash
pnpm build
grep -c 'id="experience"' dist/index.html
grep -c 'id="foundations"' dist/index.html
grep -o 'Requirements Engineering' dist/index.html | head -1
grep -o 'Revelo' dist/index.html | head -1
```
Expected: `1`, `1`, `Requirements Engineering`, `Revelo`.

- [ ] **Step 4: Confirm the mobile nav does not overflow with 5 links**

Inspect `src/components/Nav.astro`. If the desktop link row is a fixed flex with no wrap and 5 links overflow below `lg`, reduce horizontal gap or hide the row one breakpoint earlier. Do not add a new nav pattern.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/data/site.ts src/components/Nav.astro
git commit -m "feat: wire Experience and Foundations into the page and nav"
```

---

## Task 7: Extend the CaseStudy type and fix `[slug].astro`

**Files:**
- Modify: `src/data/site.ts` (CaseStudy type)
- Modify: `src/pages/work/[slug].astro`

- [ ] **Step 1: Extend the `CaseStudy` type**

Add three optional/required fields to the existing type:

```ts
export type CaseStudy = {
  tagline: string;
  isPrivate?: boolean;
  links?: { label: string; href: string; icon: string }[];
  diagram?: "romasub-pipeline";
  problem: string;
  role: string;
  architecture: { intro: string; steps: { title: string; body: string }[] };
  techStack: { group: string; items: string[] }[];
  features: { icon: string; title: string; body: string }[];
  results: { value: string; label: string }[];
  challenges: { title: string; body: string }[];
  screenshots: { src: string; caption: string }[];
  cta: { lead: string; accentWord: string; tail: string; body: string };
};
```

- [ ] **Step 2: Add the required `cta` to the existing `ai-document-extraction` case study**

```ts
cta: {
  lead: "Interested in",
  accentWord: "document-AI",
  tail: "work?",
  body: "I build pipelines like this end to end. Let's talk about yours.",
},
```

- [ ] **Step 3: Fix screenshot rendering in `src/pages/work/[slug].astro`**

The current `<img>` uses `aspect-video … object-cover`, which crops text out of UI screenshots. Replace the populated-screenshot branch with:

```astro
<figure class="glass-card overflow-hidden rounded-2xl">
  <div class="flex items-center justify-center bg-overlay/5 p-3">
    <img
      src={shot.src}
      alt={shot.caption}
      loading="lazy"
      decoding="async"
      class="max-h-[420px] w-full rounded-lg object-contain"
    />
  </div>
  <figcaption class="border-t border-overlay/10 px-5 py-3 text-sm text-on-surface-variant">
    {shot.caption}
  </figcaption>
</figure>
```

Leave the empty-`src` placeholder branch as-is.

- [ ] **Step 4: Make the bottom CTA data-driven**

Replace the hardcoded heading:

```astro
<h2 class="relative z-10 text-3xl font-black tracking-tight text-heading md:text-4xl">
  {cs.cta.lead} <span class="text-gradient">{cs.cta.accentWord}</span> {cs.cta.tail}
</h2>
<p class="mx-auto mt-4 max-w-xl text-base font-light text-on-surface-variant">
  {cs.cta.body}
</p>
```

- [ ] **Step 5: Render the optional links row in the header**

After the tags row in `<header>`:

```astro
{cs.links && (
  <div class="mt-8 flex flex-wrap gap-3">
    {cs.links.map((l) => (
      <a href={l.href} target="_blank" rel="noopener noreferrer" class="btn-ghost">
        <span class="material-symbols-outlined">{l.icon}</span>
        {l.label}
      </a>
    ))}
  </div>
)}
```

- [ ] **Step 6: Add the diagram slot**

Import the diagram component and render it immediately after the architecture section:

```astro
import RomaSubPipeline from "../../components/diagrams/RomaSubPipeline.astro";
```
```astro
{cs.diagram === "romasub-pipeline" && (
  <section class="reveal mt-20 md:mt-28">
    <h2 class="text-3xl font-black tracking-tight text-heading md:text-4xl">Pipeline</h2>
    <div class="glass-card mt-8 overflow-x-auto rounded-2xl p-6 md:p-10">
      <RomaSubPipeline />
    </div>
  </section>
)}
```

- [ ] **Step 7: Build and verify the existing case study still renders**

```bash
pnpm build
grep -o 'document-AI' dist/work/ai-document-extraction/index.html | head -1
```
Expected: `document-AI`.

- [ ] **Step 8: Commit**

```bash
git add src/data/site.ts src/pages/work/\[slug\].astro
git commit -m "refactor(case-study): data-driven CTA, links row, diagram slot, contain-fit screenshots"
```

---

## Task 8: Build the RomaSub pipeline diagram

**Files:**
- Create: `src/components/diagrams/RomaSubPipeline.astro`

- [ ] **Step 1: Create the component**

Inline SVG, no external assets. Requirements:

- Seven labeled stages: `Whisper ASR` → `Loanword & Name Bypass` → `Normalization` → `Fine-tuned M2M100` → `Reconstruction` → `Fuzzy Correction` → `Claude Haiku Refinement (optional)`.
- Annotate stage 2 with `1,041 words · 189 names` and stage 7 with `optional`.
- Use `currentColor` and the existing CSS custom properties (`var(--color-primary)`, `var(--color-secondary)`) for strokes and fills so it themes in light and dark. **Do not hardcode hex values** — `CLAUDE.md` requires tokenized brand colors.
- Give the `<svg>` a `viewBox` and `class="h-auto w-full min-w-[720px]"`; the parent in `[slug].astro` supplies `overflow-x-auto` so it scrolls on mobile rather than squashing.
- Include `role="img"` and a `<title>` element describing the pipeline for accessibility.

- [ ] **Step 2: Commit**

```bash
git add src/components/diagrams/RomaSubPipeline.astro
git commit -m "feat: add RomaSub transliteration pipeline diagram"
```

---

## Task 9: Add the Research Desk and RomaSub.AI case studies

**Files:**
- Modify: `src/data/site.ts`

- [ ] **Step 1: Add the Research Desk project + case study**

New entry in `projects` with `size: "tall"` (it replaces Multi-Source in that slot; Multi-Source moves to `"small"`), `slug: "research-desk"`, `accent: "secondary"`, icon `hub`.

Case study content, drawn from the résumé:
- **tagline:** a LangGraph multi-agent workflow that asks a clarifying question before it researches.
- **architecture steps:** Clarity Agent (specificity check → human-in-the-loop interrupt) → Research Agent (Tavily MCP retrieval, 0–10 confidence scoring) → Validator Agent (sufficiency check, loops back up to 3 attempts) → Synthesis Agent (consolidates into structured response over shared state).
- **techStack:** `Python`, `LangGraph`, `Tavily MCP`, `LangGraph Studio`.
- **results:** `4 agents`, `≤3 retry loops`, `Human-in-the-loop`.
- **screenshots:** the six `/work/research-desk/*.webp` paths with captions matching what each actually shows — `landing` (entry point with suggested queries), `agent-graph` (LangGraph state graph), `studio` (LangGraph Studio with the graph deployed), `interrupts` (per-node interrupt configuration), `trace` (step-by-step agent trace with the composed answer), `sources` (cited sources on the synthesized response).
- **cta:** lead "Need a", accentWord "multi-agent", tail "workflow?".

- [ ] **Step 2: Add the RomaSub.AI project + case study**

New entry with `size: "featured"`? **No** — `ai-document-extraction` keeps the featured slot. Add RomaSub as `size: "tall"` and demote Multi-Source and RAG-Bot appropriately so the grid still has exactly one `featured`, and the counts fit `Work.astro`'s layout (it renders one featured, one tall, and N smalls). Since `Work.astro` uses `.find()` for featured and tall, **it must be updated to render multiple talls** — see Step 3.

Case study content:
- **tagline:** transcribing Urdu speech into time-aligned Roman Urdu subtitles, with a pipeline built to always return something usable.
- **diagram:** `"romasub-pipeline"`.
- **architecture steps:** the 7 layers, matching the diagram exactly.
- **features:** real-time SSE streaming from 30-second overlapping chunks with seek reprioritization; full subtitle editor (segment timing/text, auto-fix overlaps, 50-level undo/redo, 30s auto-save); export to SRT/VTT/TXT and captioned MP4 via FFmpeg; JWT auth with Google OAuth and email OTP.
- **techStack:** Flutter (Dart, Riverpod) · FastAPI · PostgreSQL · Whisper · fine-tuned M2M100 · Claude Haiku 4.5 · FFmpeg.
- **results:** `7-layer pipeline`, `4 platforms` (Windows/Linux/macOS/web), `1,230 curated terms`.
- **screenshots:** `[]` — the diagram carries this study. Confirm `[slug].astro` skips the Screenshots section entirely when the array is empty (add `{cs.screenshots.length > 0 && (...)}` around it).
- **cta:** lead "Building something with", accentWord "speech and language", tail "?".

- [ ] **Step 3: Update `Work.astro` to render multiple tall cards**

Change `const tall = projects.find(...)` to `const talls = projects.filter((p) => p.size === "tall")` and map over it, preserving the existing tall-card markup. Keep `featured` as a `.find()`.

- [ ] **Step 4: Build and verify the new pages exist**

```bash
pnpm build
ls dist/work/
grep -o 'Tavily' dist/work/research-desk/index.html | head -1
grep -o 'M2M100' dist/work/romasub-ai/index.html | head -1
```
Expected: directories for all five slugs; `Tavily`; `M2M100`.

- [ ] **Step 5: Commit**

```bash
git add src/data/site.ts src/components/Work.astro
git commit -m "feat: add Research Desk and RomaSub.AI case studies"
```

---

## Task 10: Add the Multi-Source and RAG/Automation case studies

**Files:**
- Modify: `src/data/site.ts`

- [ ] **Step 1: Promote the existing Multi-Source project to a case study**

Add `slug: "multi-source-search"` and a `caseStudy`:
- **tagline:** one query, three sources, and a cited answer over 50K+ embeddings.
- **architecture steps:** concurrent fetch across YouTube / NewsAPI / Twitter → Sentence-Transformers embedding → FAISS index over 50K+ vectors → GPT-3.5 RAG synthesis → VADER sentiment + auto-citation.
- **techStack:** Python, Flask, OpenAI GPT-3.5, FAISS, Sentence Transformers, VADER.
- **results:** `50K+` embeddings searched, `3 sources` unified, `Auto-cited` answers.
- **screenshots:** the four `/work/multi-source/*.webp` with captions — `search` (query entry across three sources), `insights` (AI key-insights panel with per-source sentiment), `sentiment` (overall sentiment distribution), `followup` (RAG follow-up Q&A with suggested questions).
- **links:** GitHub repo.
- **cta:** lead "Need", accentWord "search over your own data", tail "?".

- [ ] **Step 2: Merge RAG-Bot and Viral Content Automation into one case study**

Keep both cards in the grid, but point the RAG-Bot card at `slug: "rag-automation"` and retitle it `RAG-Bot & Automation Pipelines`. Content:
- **tagline:** private, offline document Q&A — and the n8n pipelines that run the busywork.
- **architecture steps:** two tracks. RAG-Bot: document ingest → HuggingFace embeddings → ChromaDB → Mistral 7B (Q4) via LlamaCpp → Streamlit UI. Automation: n8n triggers → TikTok/Instagram scrape → Whisper transcription → GPT filtering → structured write to Google Sheets/DB.
- **techStack:** Mistral 7B, LlamaCpp, ChromaDB, HuggingFace, Streamlit, n8n, Whisper, OpenAI API.
- **results:** `100% local` inference, `Zero API cost` on the RAG path, `End-to-end` automation.
- **screenshots:** the four `/work/rag-automation/*.webp` with captions — `ragbot` (Streamlit Q&A answering from a private document), `ragbot-repo` (project README), `n8n-workflow` (content pipeline: scrape → transcribe → filter → store), `n8n-canvas` (full multi-branch production workflow).
- **links:** GitHub repo.
- **cta:** lead "Want to", accentWord "automate the busywork", tail "?".

- [ ] **Step 3: Build and verify**

```bash
pnpm build
ls dist/work/
grep -o 'FAISS' dist/work/multi-source-search/index.html | head -1
grep -o 'ChromaDB' dist/work/rag-automation/index.html | head -1
grep -c 'work/multi-source/insights.webp' dist/work/multi-source-search/index.html
```
Expected: five slug directories; `FAISS`; `ChromaDB`; `1`.

- [ ] **Step 4: Commit**

```bash
git add src/data/site.ts
git commit -m "feat: add Multi-Source search and RAG/automation case studies"
```

---

## Task 11: Update hero, about, stats and capabilities copy

**Files:**
- Modify: `src/data/site.ts`

- [ ] **Step 1: Update `site.role` and `hero.subline`**

```ts
role: "AI Engineer · Software Engineering Graduate",
```
```ts
subline:
  "I build intelligent document pipelines, RAG systems and multi-agent workflows — turning unstructured data into reliable, production-ready products. Software engineering degree underneath it, so the systems are built to be maintained. Currently engineering AI systems at Merchaint (Singapore).",
```

- [ ] **Step 2: Update `stats`**

Change `"10+" / "AI Projects Shipped"` to `"12+" / "Projects Shipped"`. Leave the other three.

- [ ] **Step 3: Update `about.bio`**

Rewrite to name the SE degree explicitly and connect it to the AI work — mention design & architecture and requirements discipline, Merchaint, the Anthropic code-review contract via Revelo, and keep the national-squash line.

- [ ] **Step 4: Update the `Full-Stack Products` capability body**

Reference the SE foundation (architecture, construction, requirements) rather than only naming frameworks, and keep the existing `chips`.

- [ ] **Step 5: Build and verify**

```bash
pnpm build
grep -o 'Software Engineering Graduate' dist/index.html | head -1
grep -o '12+' dist/index.html | head -1
```
Expected: both strings present.

- [ ] **Step 6: Commit**

```bash
git add src/data/site.ts && git commit -m "content: reposition copy as AI-first with SE foundation"
```

---

## Task 12: Visual verification and ship

**Files:**
- Temporary: `.local/shot.mjs` (not committed)

- [ ] **Step 1: Add Playwright temporarily**

```bash
pnpm add -D playwright-core
pnpm build && pnpm preview --port 4321 &
```

- [ ] **Step 2: Write and run the screenshot script**

Write `.local/shot.mjs` launching system Chrome at `/usr/bin/google-chrome`. Per `CLAUDE.md`, headless Chrome defaults to LIGHT — you **must** pass `colorScheme: "dark"` explicitly for dark-theme shots. Capture, for both `colorScheme` values:
- `/` at 1280×900 (full page)
- `/` at 390×844 @2x (full page)
- `/work/research-desk` at 1280×900 (full page) — verifies the new screenshot rendering
- `/work/romasub-ai` at 1280×900 (full page) — verifies the SVG diagram themes correctly

- [ ] **Step 3: Review every screenshot**

Read each image. Confirm:
- No horizontal overflow at 390px.
- The Experience rail and nodes align; the current-role dot is visible.
- The Foundations coursework grid reflows to one column on mobile.
- Case-study screenshots are fully visible (not cropped) and readable.
- The RomaSub SVG is legible in **both** themes — light-theme text must not be white-on-white.
- Nav's five links do not wrap.

Fix anything that fails, rebuild, re-shoot.

- [ ] **Step 4: Clean up**

```bash
pnpm remove playwright-core
rm -f .local/shot.mjs .local/*.png
git status --porcelain
```
Expected: no `playwright-core` in `package.json`, no stray artifacts, no `.pdf` staged.

- [ ] **Step 5: Final build and ship**

```bash
pnpm build && git add -A && git status --short
git commit -m "feat: sync portfolio with résumé — experience, foundations, four case studies"
git push origin main
```

- [ ] **Step 6: Confirm the Pages deploy succeeded**

```bash
gh run list --limit 3
```
Wait for the deploy run to report success, then confirm the live site serves the new sections.

---

## Self-Review

**Spec coverage:**

| Spec section | Task |
|---|---|
| Data model — `Role`, `experience` | 2 |
| Data model — education, webBuilds, certifications | 3 |
| Data model — `Accent` shared type | 2 |
| `CaseStudy` type additions (links, diagram, cta) | 7 |
| Page structure — Experience component | 4 |
| Page structure — Foundations component | 5 |
| Page structure — order + nav (5 links) | 6 |
| Case studies — research-desk, romasub-ai | 9 |
| Case studies — multi-source-search, rag-automation | 10 |
| `RomaSubPipeline.astro` diagram | 8 |
| `[slug].astro` fixes ×3 | 7 |
| Image pipeline + privacy review | 1 |
| Copy repositioning (hero/about/stats/capabilities) | 11 |
| Verification (build, Playwright, clean status) | 12 |

No gaps.

**Known interactions caught during review:**
- Adding a second `tall` project breaks `Work.astro`'s `.find()` for talls → handled in Task 9 Step 3.
- RomaSub has zero screenshots → `[slug].astro` must guard the Screenshots section on a non-empty array → handled in Task 9 Step 2.
- `cta` is a **required** field on `CaseStudy`, so the pre-existing `ai-document-extraction` study must gain one or the build breaks → handled in Task 7 Step 2.
- Five nav links may overflow the mobile/tablet nav → explicitly checked in Task 6 Step 4 and Task 12 Step 3.
