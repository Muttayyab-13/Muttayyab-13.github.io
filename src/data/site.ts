// ---------------------------------------------------------------------------
// Single source of truth for site content.
// Populated from Muttayyab_Resume_Updated_cld.pdf — edit freely.
// ---------------------------------------------------------------------------

const GITHUB = "https://github.com/Muttayyab-13";
const LINKEDIN = "https://www.linkedin.com/in/muttayyab";
const EMAIL = "muttayyab13@gmail.com";
// Résumé is hosted externally (not committed) — buttons open it in a new tab.
// Google Drive preview link (sharing: "Anyone with the link"). To swap the file,
// upload a new one, share it, and paste its /view link here.
const RESUME_URL =
  "https://drive.google.com/file/d/1ErXTChoqvMNcfro-bhmI9qDEx5JwQFrb/view?usp=sharing";

export const site = {
  brand: "MUTTAYYAB.AI",
  name: "Muttayyab Abdurrehman",
  initials: "MA",
  navTagline: "AI Engineer · Open to work",
  available: true,
  role: "AI Engineer · Full-Stack & Generative AI",
  title: "Muttayyab Abdurrehman — AI Engineer",
  description:
    "AI Engineer specializing in LLMs, RAG, computer vision and OCR. I build intelligent document pipelines, RAG systems, and n8n automation, and ship scalable full-stack products with the MERN stack.",
  email: EMAIL,
  phone: "+92 305 5549222",
  phoneHref: "tel:+923055549222",
  resumeUrl: RESUME_URL,
  hero: {
    headlineLead: "Architecting",
    headlineAccent: "Intelligent",
    headlineTail: "Systems.",
    subline:
      "I build intelligent document pipelines, RAG systems, and automation workflows — turning unstructured data into reliable, production-ready products. Currently engineering AI systems at Merchaint (Singapore).",
  },
  socials: [
    { label: "GitHub", href: GITHUB },
    { label: "LinkedIn", href: LINKEDIN },
    { label: "Email", href: `mailto:${EMAIL}` },
  ],
} as const;

export const stats = [
  { value: "70%", label: "Manual Work Automated" },
  { value: "50K+", label: "Embeddings Searched" },
  { value: "10+", label: "AI Projects Shipped" },
  { value: "4", label: "Companies Worked With" },
] as const;

export type Capability = {
  icon: string; // Material Symbols name
  title: string;
  body: string;
  accent: "primary" | "secondary" | "tertiary";
  span?: string; // tailwind col-span classes for the bento layout
  chips?: string[];
};

export const capabilities: Capability[] = [
  {
    icon: "document_scanner",
    title: "Document Intelligence",
    body: "Automated extraction from invoices, receipts and forms using OCR (PaddleOCR, AWS Textract) and vision-language models — structured JSON, 70% less manual entry.",
    accent: "primary",
  },
  {
    icon: "forum",
    title: "RAG & LLM Apps",
    body: "Context-aware assistants on custom Retrieval-Augmented Generation — GPT, Mistral and LangChain, grounded in your own documents with cited sources.",
    accent: "secondary",
  },
  {
    icon: "database",
    title: "Vector Search",
    body: "Low-latency semantic search with FAISS and ChromaDB over tens of thousands of embeddings, plus fine-tuned matching across messy, inconsistent data.",
    accent: "tertiary",
  },
  {
    icon: "smart_toy",
    title: "Workflow Automation",
    body: "End-to-end n8n + OpenAI pipelines: scraping, transcription (Whisper), CSV analysis agents and structured storage to Sheets and databases for live insight.",
    accent: "primary",
    span: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: "code_blocks",
    title: "Full-Stack Products",
    body: "End-to-end delivery from scalable FastAPI / Node backends to responsive, accessible React interfaces — shipped, deployed and maintainable.",
    accent: "secondary",
    span: "md:col-span-2",
    chips: ["React", "Node.js", "MongoDB", "FastAPI", "Docker"],
  },
];

// Full case-study content for a project. Optional — only projects with this get
// their own /work/<slug> page. Source of truth for src/pages/work/[slug].astro.
export type CaseStudy = {
  tagline: string;
  isPrivate?: boolean; // true → "Private project" badge, no repo/demo links
  problem: string;
  role: string;
  architecture: { intro: string; steps: { title: string; body: string }[] };
  techStack: { group: string; items: string[] }[];
  features: { icon: string; title: string; body: string }[];
  results: { value: string; label: string }[];
  challenges: { title: string; body: string }[];
  // src may be "" → render a framed placeholder until an image is dropped in.
  screenshots: { src: string; caption: string }[];
};

export type Project = {
  icon: string;
  title: string;
  body: string;
  tags: string[];
  href: string;
  featured?: boolean;
  size: "featured" | "tall" | "small";
  accent: "primary" | "secondary" | "tertiary";
  slug?: string; // when set (with caseStudy), card links to /work/<slug>
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    icon: "account_tree",
    title: "AI Document Extraction Pipeline",
    body: "Enterprise document-processing pipeline combining OCR (PaddleOCR, AWS Textract) with LLM APIs and multi-stage routing to extract structured data from invoices and forms — cutting manual workload by 70%.",
    tags: ["Python", "AWS Textract", "PaddleOCR", "LLMs"],
    href: "/work/ai-document-extraction",
    featured: true,
    size: "featured",
    accent: "primary",
    slug: "ai-document-extraction",
    caseStudy: {
      tagline:
        "Turning messy invoices and forms into clean, structured JSON — and cutting manual data entry by 70%.",
      isPrivate: true,
      problem:
        "Back-office teams were keying data out of thousands of invoices, receipts and forms by hand — slow, expensive and error-prone. Documents arrived in wildly inconsistent layouts (scans, phone photos, native PDFs), so naïve template-based OCR broke constantly. The business needed a pipeline that could read almost any document and return reliable, structured fields with minimal human review.",
      role: "I designed and built the end-to-end extraction pipeline: document ingestion, the OCR and LLM extraction stages, the multi-stage routing logic, a strict structured-output schema, and the validation and confidence-scoring layer that decides when a result needs a human's eyes.",
      architecture: {
        intro:
          "A multi-stage pipeline that routes each document down the cheapest path that still hits the accuracy bar — fast OCR for clean documents, heavier vision-language extraction for the hard ones — then validates and emits structured JSON.",
        steps: [
          {
            title: "Ingest & classify",
            body: "Accept PDF and image uploads, then detect document type and scan quality to pick a processing path.",
          },
          {
            title: "OCR layer",
            body: "PaddleOCR for general text; AWS Textract for tables, forms and key-value pairs.",
          },
          {
            title: "Multi-stage routing",
            body: "Route by document type and OCR confidence to the right extractor, escalating low-confidence pages to a heavier LLM / vision-language pass.",
          },
          {
            title: "LLM extraction",
            body: "Prompt LLM APIs to map raw OCR text into a strict field schema, returning structured JSON.",
          },
          {
            title: "Validation & confidence scoring",
            body: "Sanity-check fields (totals, dates, required keys) and flag low-confidence results for human review.",
          },
          {
            title: "Structured output",
            body: "Emit normalized, validated JSON to the downstream system and database.",
          },
        ],
      },
      techStack: [
        { group: "AI / OCR", items: ["PaddleOCR", "AWS Textract", "LLM APIs", "Vision-Language Models"] },
        { group: "Backend", items: ["Python", "FastAPI"] },
        { group: "Infra", items: ["AWS", "Docker"] },
      ],
      features: [
        {
          icon: "dashboard_customize",
          title: "Layout-agnostic extraction",
          body: "Handles inconsistent invoices, receipts and forms without maintaining a template per vendor.",
        },
        {
          icon: "fact_check",
          title: "Confidence-based human-in-the-loop",
          body: "Only low-confidence results are routed to a person, so reviewers spend time where it matters.",
        },
        {
          icon: "data_object",
          title: "Strict structured output",
          body: "Every document maps to a validated JSON schema instead of free-form text.",
        },
        {
          icon: "route",
          title: "Cost-aware routing",
          body: "A cheap OCR path for easy documents; LLM and vision passes only when they're actually needed.",
        },
      ],
      results: [
        { value: "70%", label: "Manual data entry eliminated" },
        { value: "Structured JSON", label: "Every document, one schema" },
        { value: "Human-in-loop", label: "Only low-confidence docs reviewed" },
      ],
      challenges: [
        {
          title: "Wildly inconsistent layouts",
          body: "Solved with type/confidence routing plus an LLM fallback instead of brittle per-vendor templates.",
        },
        {
          title: "LLM hallucination & wrong fields",
          body: "Constrained the model to a strict schema and added validation plus confidence scoring on top.",
        },
        {
          title: "Cost & latency",
          body: "Balanced OCR against LLM passes so easy documents stay cheap and fast, reserving heavy models for hard pages.",
        },
      ],
      screenshots: [
        { src: "", caption: "Upload & ingestion view" },
        { src: "", caption: "Extraction results — structured JSON" },
        { src: "", caption: "Confidence flags & review queue" },
        { src: "", caption: "Pipeline architecture diagram" },
      ],
    },
  },
  {
    icon: "manage_search",
    title: "Multi-Source AI Search & Analysis",
    body: "Flask platform aggregating YouTube, News and Twitter APIs with concurrent fetching — FAISS vector search over 50K+ embeddings powering a GPT-3.5 RAG Q&A interface with sentiment analysis and auto-citations.",
    tags: ["Flask", "FAISS", "GPT-3.5", "RAG"],
    href: GITHUB,
    size: "tall",
    accent: "secondary",
  },
  {
    icon: "chat_bubble",
    title: "RAG-Bot · Local Doc Q&A",
    body: "Private, offline document Q&A running Mistral 7B (Q4) via LlamaCpp with ChromaDB and HuggingFace embeddings, served through a responsive Streamlit UI.",
    tags: ["Mistral 7B", "ChromaDB", "Streamlit"],
    href: GITHUB,
    size: "small",
    accent: "tertiary",
  },
  {
    icon: "route",
    title: "Viral Content Automation",
    body: "End-to-end n8n pipeline that scrapes and transcribes viral TikTok/Instagram content (Whisper), filters it, and stores structured insight to Google Sheets.",
    tags: ["n8n", "Whisper", "OpenAI"],
    href: GITHUB,
    size: "small",
    accent: "primary",
  },
];

// Projects that have a full case-study page. Drives getStaticPaths in
// src/pages/work/[slug].astro — add a caseStudy to a project and it appears here.
export const caseStudies = projects.filter(
  (p): p is Project & { slug: string; caseStudy: NonNullable<Project["caseStudy"]> } =>
    Boolean(p.slug && p.caseStudy),
);

export const about = {
  heading: "The Engineer",
  bio: "I'm Muttayyab — a Software Engineering graduate and AI Engineer specializing in LLMs, the Model Context Protocol, computer vision and OCR. I build intelligent document pipelines, RAG systems and n8n automation workflows, and ship scalable full-stack products with the MERN stack. I've reviewed model-generated code for Anthropic (via Revelo) and currently engineer AI systems at Merchaint, Singapore. Off the keyboard, I've competed as a national-level squash player.",
  columns: [
    {
      heading: "AI & Data",
      accent: "primary" as const,
      items: [
        "LLM Orchestration & RAG",
        "MCP & CrewAI Agents",
        "Vector Search · FAISS / ChromaDB",
        "Computer Vision · YOLO / OCR",
      ],
    },
    {
      heading: "Engineering",
      accent: "secondary" as const,
      items: [
        "Python · FastAPI",
        "MERN · React / Node",
        "n8n Automation",
        "Docker · AWS · GCP",
      ],
    },
  ],
};

// Root-relative anchors so the nav also works from sub-pages (e.g. /work/<slug>).
export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
