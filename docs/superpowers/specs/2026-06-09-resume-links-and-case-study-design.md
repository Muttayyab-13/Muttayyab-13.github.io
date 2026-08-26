# Resume links + AI Document Extraction case study — design spec

**Date:** 2026-06-09
**Status:** Approved design; case-study copy pending user review.

## Goal

Two portfolio improvements requested by the user:

1. **Resume** — make a résumé clearly available from three places (navbar, hero, footer)
   via an **external link** (Google Drive / Dropbox), opened in a new tab. Nothing
   committed to the repo.
2. **Case study** — give the *AI Document Extraction Pipeline* a full case-study page,
   built on a **data-driven dynamic route** so future projects can get one by adding
   data only. Private project: **no GitHub/demo links**, **screenshot placeholders**
   the user fills in later.

## Decisions (from brainstorming)

- Résumé delivery: **external host link**, not a committed PDF. Placeholder URL until
  the user provides the real one.
- Case-study routing: **A — dynamic route + `site.ts` data** (`src/pages/work/[slug].astro`
  + `getStaticPaths()`).
- Hero CTAs: replace "View Capabilities" with **"Download Resume"** (two clean CTAs).
- Case study is **private**: a "Private project" badge, no external links, screenshots
  are framed placeholders wired to `public/case-studies/ai-doc-extraction/`.

---

## Part 1 — Resume links

### Data (`src/data/site.ts`)

```ts
// Top, near other consts. PLACEHOLDER — user to replace with real Drive/Dropbox link.
const RESUME_URL = "https://drive.google.com/REPLACE_ME"; // TODO: user provides
```
Add `resumeUrl: RESUME_URL` to the `site` object.

### Placements

| Location | Element |
|---|---|
| **Nav** (desktop) | Ghost "Resume" pill in the right-controls cluster, **before** "Hire Me". Icon `download`. |
| **Nav** (mobile) | "Resume" link added to the mobile menu, above/with "Hire Me". |
| **Hero** | Secondary CTA text → **"Download Resume"** (`btn-ghost`, icon `download`). Replaces "View Capabilities". |
| **Footer** | "Resume" link appended to the footer links row (rendered alongside the socials map). |

All résumé links: `href={site.resumeUrl}` `target="_blank"` `rel="noopener noreferrer"`.

---

## Part 2 — Case-study architecture

### Data model (`src/data/site.ts`)

Extend `Project` with an optional `slug` and `caseStudy`:

```ts
export type CaseStudy = {
  tagline: string;
  isPrivate?: boolean;
  problem: string;
  role: string;
  architecture: { intro: string; steps: { title: string; body: string }[] };
  techStack: { group: string; items: string[] }[];
  features: { icon: string; title: string; body: string }[];
  results: { value: string; label: string }[];
  challenges: { title: string; body: string }[];
  screenshots: { src: string; caption: string }[]; // src may be "" → render placeholder
};

export type Project = {
  // ...existing fields...
  slug?: string;
  caseStudy?: CaseStudy;
};
```

Attach `slug: "ai-document-extraction"` + a `caseStudy` to the AI Document Extraction
Pipeline project. Helper export:

```ts
export const caseStudies = projects.filter(p => p.slug && p.caseStudy);
```

### Route (`src/pages/work/[slug].astro`)

- `getStaticPaths()` maps `caseStudies` → one page each (`params.slug`, `props.project`).
- Renders `Base` (with per-page `title`/`description`) + `Nav` + `main pt-[96px]` +
  case-study sections + `Footer`, mirroring `index.astro`.

### Work card link (`src/components/Work.astro`)

- The featured card: if the project has a `slug`, link to `/work/${slug}` (root-relative;
  user site, no base path) and change the CTA affordance to **"Read case study →"**.
- Other three cards unchanged (keep their existing `href`).

### Nav links work from sub-pages (`src/data/site.ts`)

Change `navLinks` hrefs from `#work` → `/#work` (etc.) and Nav "Hire Me" `#contact` →
`/#contact`, so the nav returns to the homepage sections from `/work/...`. On the
homepage these still scroll correctly.

---

## Part 3 — Case-study page sections

Order: Header → Problem → My Role → Architecture → Tech Stack → Key Features →
Results → Challenges → Screenshots → bottom CTA. Deep Space aesthetic, glass cards,
theme-aware tokens, `.reveal` scroll animation.

---

## DRAFTED COPY — *please review/refine* (kept high-level; project is private)

> Items marked **(verify)** are my best inference from your résumé — confirm or correct.

### Header
- **Title:** AI Document Extraction Pipeline
- **Tagline:** *Turning messy invoices and forms into clean, structured JSON — and cutting manual data entry by 70%.*
- **Role chip:** AI Engineer · **Private project** badge
- **Tags:** Python · AWS Textract · PaddleOCR · LLMs

### Problem
Back-office teams were keying data out of thousands of invoices, receipts and forms
by hand — slow, expensive and error-prone. The documents arrived in wildly
inconsistent layouts (scans, photos, native PDFs), so naïve template-based OCR broke
constantly. The business needed a pipeline that could read *any* document and return
reliable, structured fields with minimal human review.

### My Role
I designed and built the end-to-end extraction pipeline as the AI engineer on the
project (verify: solo / lead): document ingestion, the OCR + LLM extraction stages,
the multi-stage routing logic, the structured-output schema, and the validation /
confidence-scoring layer that decides when a human needs to check a result.

### Architecture
**Intro:** A multi-stage pipeline that routes each document down the cheapest path
that still hits the accuracy bar — fast OCR for clean documents, heavier
vision-language extraction for hard ones — then validates and emits structured JSON.

Steps:
1. **Ingest & classify** — accept PDF/image uploads, detect document type and quality.
2. **OCR layer** — PaddleOCR for general text; AWS Textract for tables/forms and key-value pairs.
3. **Multi-stage routing** — route by document type / OCR confidence to the right extractor; escalate low-confidence pages to an LLM/vision-language pass.
4. **LLM extraction** — prompt LLM APIs to map raw OCR into a strict field schema (structured JSON output).
5. **Validation & confidence scoring** — sanity-check fields (totals, dates, required keys); flag low-confidence results for human review.
6. **Structured output** — emit normalized JSON to the downstream system/database.

### Tech Stack (grouped)
- **AI / OCR:** PaddleOCR, AWS Textract, LLM APIs, vision-language models
- **Backend:** Python (verify: FastAPI)
- **Infra:** AWS (verify), Docker (verify)

### Key Features
- **Layout-agnostic extraction** — handles inconsistent invoices/receipts/forms without per-vendor templates.
- **Confidence-based human-in-the-loop** — only low-confidence results get routed to a person.
- **Strict structured output** — every document maps to a validated JSON schema.
- **Cost-aware routing** — cheap OCR path for easy docs, LLM/vision only when needed.

### Results
- **70%** less manual data entry
- **(verify)** documents processed / throughput
- **(verify)** accuracy / straight-through-processing rate

### Challenges
- **Inconsistent layouts** — solved with routing + LLM fallback instead of brittle templates.
- **Hallucination / wrong fields** — constrained the LLM to a strict schema and added validation + confidence scoring.
- **(verify) cost & latency** — balanced OCR vs LLM passes so easy documents stay cheap and fast.

### Screenshots
Four framed **placeholders** with editable captions, wired to:
`public/case-studies/ai-doc-extraction/01.png … 04.png`. Suggested captions:
1. Upload / ingestion view
2. Extraction results — structured JSON
3. Confidence flags / review queue
4. Pipeline / architecture diagram

### Bottom CTA
"Interested in document-AI work?" → Contact (`/#contact`) + "← Back to all work" (`/#work`). No repo/demo (private).

---

## Files touched
- `src/data/site.ts` — `resumeUrl`, `CaseStudy` type, `slug`+`caseStudy` on project, `caseStudies` export, `navLinks` `/#` hrefs.
- `src/components/Nav.astro` — Resume pill (desktop + mobile), `/#` Hire Me link.
- `src/components/Hero.astro` — secondary CTA → Download Resume.
- `src/components/Footer.astro` — Resume link.
- `src/components/Work.astro` — featured card links to `/work/<slug>`, "Read case study →".
- `src/pages/work/[slug].astro` — **new** dynamic case-study page.
- `.gitignore` — `docs/superpowers/` (done).

## Open items (need user)
- **Résumé URL** — placeholder committed until provided.
- **Screenshots** — user drops images into `public/case-studies/ai-doc-extraction/`.
- **(verify)** copy items above.

## Verification
- `pnpm build` succeeds; `/work/ai-document-extraction/` generated.
- Playwright visual check (desktop + mobile, both themes): resume buttons present &
  open new tab; case-study page renders, placeholders show, nav returns home.
- Then auto-deploy per CLAUDE.md.
