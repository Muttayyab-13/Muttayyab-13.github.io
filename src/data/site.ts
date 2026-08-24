// ---------------------------------------------------------------------------
// Single source of truth for site content.
// Populated from Muttayyab_Abdurrehman_Resume.pdf — edit freely.
// ---------------------------------------------------------------------------

/** Accent colour role, shared by capabilities, projects, experience and about. */
export type Accent = "primary" | "secondary" | "tertiary";

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
  role: "AI Engineer · Software Engineering Graduate",
  title: "Muttayyab Abdurrehman — AI Engineer",
  description:
    "AI Engineer specializing in LLMs, RAG, multi-agent systems, computer vision and OCR — with a software engineering degree underneath. I build intelligent document pipelines, agent workflows and automation, and ship full-stack products with the MERN stack.",
  email: EMAIL,
  phone: "+92 305 5549222",
  phoneHref: "tel:+923055549222",
  resumeUrl: RESUME_URL,
  hero: {
    headlineLead: "Architecting",
    headlineAccent: "Intelligent",
    headlineTail: "Systems.",
    subline:
      "I build intelligent document pipelines, RAG systems and multi-agent workflows — turning unstructured data into reliable, production-ready products. A software engineering degree underneath it, so what I ship is built to be maintained. Currently engineering AI systems at Merchaint (Singapore).",
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
  { value: "12+", label: "Projects Shipped" },
  { value: "4", label: "Companies Worked With" },
] as const;

export type Capability = {
  icon: string; // Material Symbols name
  title: string;
  body: string;
  accent: Accent;
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
    body: "End-to-end delivery from scalable FastAPI / Node backends to responsive, accessible React interfaces. A software engineering degree behind it — requirements pinned down first, architecture that absorbs change, and code the next person can actually maintain.",
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
  links?: { label: string; href: string; icon: string }[];
  // Named key → a real component in src/components/diagrams/, resolved in
  // [slug].astro. Keeps SVG markup out of the data file.
  diagram?: "romasub-pipeline";
  problem: string;
  role: string;
  architecture: { intro: string; steps: { title: string; body: string }[] };
  techStack: { group: string; items: string[] }[];
  features: { icon: string; title: string; body: string }[];
  results: { value: string; label: string }[];
  challenges: { title: string; body: string }[];
  // src may be "" → render a framed placeholder until an image is dropped in.
  // Empty array → the Screenshots section is skipped entirely.
  screenshots: { src: string; caption: string }[];
  // Drives the closing call-to-action; accentWord renders in the gradient.
  cta: { lead: string; accentWord: string; tail: string; body: string };
};

export type Project = {
  icon: string;
  title: string;
  body: string;
  tags: string[];
  href: string;
  featured?: boolean;
  size: "featured" | "tall" | "small";
  accent: Accent;
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
      cta: {
        lead: "Interested in",
        accentWord: "document-AI",
        tail: "work?",
        body: "I build pipelines like this end to end. Let's talk about yours.",
      },
    },
  },
  {
    icon: "graphic_eq",
    title: "RomaSub.AI — Roman Urdu Captions",
    body: "Cross-platform Flutter client over a layered FastAPI backend that transcribes Urdu speech and generates time-aligned Roman Urdu subtitles through a 7-layer transliteration pipeline built to always return a usable result.",
    tags: ["Flutter", "FastAPI", "Whisper", "M2M100"],
    href: "/work/romasub-ai",
    size: "tall",
    accent: "secondary",
    slug: "romasub-ai",
    caseStudy: {
      tagline:
        "Turning spoken Urdu into time-aligned Roman Urdu subtitles — through a pipeline engineered to degrade gracefully and always return something usable.",
      diagram: "romasub-pipeline",
      problem:
        "Urdu speech has no reliable path to Roman Urdu subtitles. Off-the-shelf ASR handles the transcription reasonably, but transliteration is where everything breaks: loanwords and proper nouns get mangled, spelling is unstandardised, and a single failed model call takes the whole caption with it. Creators were left hand-typing subtitles line by line. The system needed to produce readable captions for real audio — and never hand back an empty result because one stage had a bad day.",
      role: "Final Year Project, built in a team of three. I designed the 7-layer transliteration pipeline and its fallback behaviour, built the layered FastAPI backend, implemented the SSE streaming mode with seek reprioritization, and wired the authentication stack.",
      architecture: {
        intro:
          "Seven layers, each one narrowing the error left by the last. Every stage has a defined fallback, so a failure downgrades output quality instead of failing the request.",
        steps: [
          {
            title: "Whisper ASR",
            body: "Transcribe Urdu audio to Urdu script, producing the segment timings the subtitles are eventually aligned to.",
          },
          {
            title: "Loanword & name bypass",
            body: "Route known terms around the model entirely using curated dictionaries of 1,041 loanwords and 189 proper nouns — the words a general translation model reliably gets wrong.",
          },
          {
            title: "Normalization",
            body: "Standardise the remaining Urdu text so the transliteration model sees consistent input rather than orthographic noise.",
          },
          {
            title: "Fine-tuned M2M100",
            body: "Transliterate the normalized text with an M2M100 model fine-tuned for the Urdu → Roman Urdu direction.",
          },
          {
            title: "Reconstruction",
            body: "Splice the bypassed terms back into the model output in their original positions, preserving both timing and word order.",
          },
          {
            title: "Fuzzy correction",
            body: "Catch near-miss spellings against the known vocabulary and repair them before anything reaches the screen.",
          },
          {
            title: "Claude Haiku refinement",
            body: "An optional final pass that smooths phrasing and fixes residual awkwardness. Skipped entirely when unavailable — the pipeline still returns complete captions.",
          },
        ],
      },
      techStack: [
        { group: "Client", items: ["Flutter", "Dart", "Riverpod"] },
        { group: "Backend", items: ["FastAPI", "PostgreSQL", "SSE"] },
        { group: "AI / Speech", items: ["Whisper", "Fine-tuned M2M100", "Claude Haiku 4.5"] },
        { group: "Media", items: ["FFmpeg"] },
      ],
      features: [
        {
          icon: "stream",
          title: "Real-time streaming captions",
          body: "Captions arrive live over SSE from 30-second overlapping audio chunks, with seek reprioritization so playback can jump ahead of what has already been processed.",
        },
        {
          icon: "edit_note",
          title: "Full subtitle editor",
          body: "Segment-level timing and text edits, automatic overlap repair, 50-level undo/redo and a 30-second auto-save.",
        },
        {
          icon: "movie",
          title: "Export anywhere",
          body: "SRT, VTT and TXT, plus captioned MP4 with either hardsubs or softsubs burned through FFmpeg.",
        },
        {
          icon: "shield_person",
          title: "Real auth, not a demo login",
          body: "JWT sessions with Google OAuth and email OTP verification, backed by PostgreSQL for users, media metadata and feedback.",
        },
      ],
      results: [
        { value: "7 layers", label: "Each with a defined fallback" },
        { value: "1,230", label: "Curated loanwords & names" },
        { value: "4 platforms", label: "Windows, Linux, macOS, web" },
      ],
      challenges: [
        {
          title: "Transliteration has no single correct answer",
          body: "Roman Urdu spelling is unstandardised, so a pure model approach produced confident nonsense on names and loanwords. The dictionary bypass takes those words out of the model's hands before it ever sees them.",
        },
        {
          title: "One bad stage shouldn't lose the caption",
          body: "Every layer defines what happens when it fails. The Claude refinement pass is fully optional, and the pipeline returns complete captions without it.",
        },
        {
          title: "Streaming against a seekable player",
          body: "Overlapping 30-second chunks keep word boundaries intact across cuts, and seek reprioritization reorders the queue so jumping ahead doesn't mean waiting for everything in between.",
        },
      ],
      screenshots: [],
      cta: {
        lead: "Building something with",
        accentWord: "speech and language",
        tail: "?",
        body: "Multilingual ASR, transliteration and caption tooling — I've shipped the whole chain.",
      },
    },
  },
  {
    icon: "hub",
    title: "Research Desk — Multi-Agent Research",
    body: "LangGraph workflow of four specialized agents with conditional routing, shared state and human-in-the-loop interrupts — it asks you a clarifying question before it starts researching, and validates its own findings before answering.",
    tags: ["LangGraph", "Multi-Agent", "Tavily MCP", "Python"],
    href: "/work/research-desk",
    size: "tall",
    accent: "primary",
    slug: "research-desk",
    caseStudy: {
      tagline:
        "A four-agent LangGraph workflow that asks a clarifying question before it researches — and refuses to answer until its own validator is satisfied.",
      problem:
        "Single-shot research agents fail in two predictable ways: they answer vague questions confidently instead of asking what you meant, and they stop at the first result set regardless of whether it actually covers the question. Ask one about \"Service Shoes\" and it will happily research the wrong company. The workflow needed a way to pause and ask, and a way to judge its own output before committing to it.",
      role: "I designed the graph topology and built all four agents, the shared state schema that sustains multi-turn context, the conditional routing between nodes, and the human-in-the-loop interrupt that pauses execution mid-graph to collect clarification.",
      architecture: {
        intro:
          "Four specialized agents on a LangGraph state graph. Routing is conditional, not linear — the validator can send execution backwards, and the clarity agent can suspend it entirely to wait for a human.",
        steps: [
          {
            title: "Clarity Agent",
            body: "Evaluates how specific the query actually is. If something essential is missing — a company name, a comparison target — it fires a human-in-the-loop interrupt and pauses the graph until the answer arrives.",
          },
          {
            title: "Research Agent",
            body: "Retrieves company news, financials and recent developments through the Tavily MCP search tool, then scores what it found with a 0–10 confidence rating.",
          },
          {
            title: "Validator Agent",
            body: "Judges whether the research is sufficient. When confidence is low it routes back to the Research Agent for another attempt, up to three times, before allowing the graph to move on.",
          },
          {
            title: "Synthesis Agent",
            body: "Consolidates findings and conversation history into a structured, cited answer.",
          },
          {
            title: "Shared state",
            body: "A single state schema carries context across the whole graph, so follow-ups like \"what about their competitors?\" resolve against what was already established.",
          },
        ],
      },
      techStack: [
        { group: "Orchestration", items: ["LangGraph", "LangGraph Studio"] },
        { group: "Retrieval", items: ["Tavily MCP", "Model Context Protocol"] },
        { group: "Backend", items: ["Python"] },
      ],
      features: [
        {
          icon: "pan_tool",
          title: "Human-in-the-loop interrupts",
          body: "The graph suspends mid-execution to ask for the detail it's missing, then resumes from exactly where it stopped — no restart, no lost context.",
        },
        {
          icon: "loop",
          title: "Self-validating research loop",
          body: "The validator sends weak findings back for another pass, capped at three attempts so a hard query degrades instead of looping forever.",
        },
        {
          icon: "readiness_score",
          title: "Confidence scoring",
          body: "Every research pass is scored 0–10, giving the validator something concrete to route on rather than a vibe check.",
        },
        {
          icon: "forum",
          title: "Multi-turn context",
          body: "Shared state means follow-up questions build on the prior answer instead of starting from nothing.",
        },
      ],
      results: [
        { value: "4 agents", label: "Clarity, Research, Validator, Synthesis" },
        { value: "≤3 loops", label: "Bounded retry before synthesis" },
        { value: "Cited", label: "Every answer traceable to sources" },
      ],
      challenges: [
        {
          title: "Agents that answer the wrong question",
          body: "The Clarity Agent gates the entire workflow — nothing runs until the query is specific enough to research, and it interrupts to ask rather than guessing.",
        },
        {
          title: "Knowing when research is 'enough'",
          body: "Confidence scoring gave the validator a concrete signal to route on, turning a subjective judgement into a loop condition with a hard cap.",
        },
        {
          title: "Debugging a non-linear graph",
          body: "Built against LangGraph Studio with per-node interrupts, so any node can be paused before or after execution to inspect state as it flows.",
        },
      ],
      screenshots: [
        { src: "/work/research-desk/landing.webp", caption: "Entry point with suggested research queries" },
        { src: "/work/research-desk/agent-graph.webp", caption: "The state graph — clarity → research ⇄ validator → synthesis" },
        { src: "/work/research-desk/studio.webp", caption: "Running the deployed graph in LangGraph Studio" },
        { src: "/work/research-desk/interrupts.webp", caption: "Per-node interrupt configuration for debugging" },
        { src: "/work/research-desk/trace.webp", caption: "Step-by-step agent trace above the composed answer" },
        { src: "/work/research-desk/sources.webp", caption: "Synthesized findings with cited sources" },
      ],
      cta: {
        lead: "Need a",
        accentWord: "multi-agent",
        tail: "workflow?",
        body: "Conditional routing, human-in-the-loop and agents that check their own work — I build these end to end.",
      },
    },
  },
  {
    icon: "manage_search",
    title: "Multi-Source AI Search & Analysis",
    body: "Flask platform aggregating YouTube, News and Twitter APIs with concurrent fetching — FAISS vector search over 50K+ embeddings powering a GPT-3.5 RAG Q&A interface with sentiment analysis and auto-citations.",
    tags: ["Flask", "FAISS", "GPT-3.5", "RAG"],
    href: "/work/multi-source-search",
    size: "small",
    accent: "secondary",
    slug: "multi-source-search",
    caseStudy: {
      tagline:
        "One query, three live sources, and a cited answer synthesized over 50K+ embeddings.",
      links: [{ label: "View on GitHub", href: GITHUB, icon: "code" }],
      problem:
        "Researching a topic across YouTube, news and social media means running the same query three times, reading three unrelated result sets, and reconciling them by hand. Each source has its own API, its own latency and its own idea of what a result looks like. The tool needed to fetch all three at once, unify them into something searchable, and answer questions against the whole corpus rather than a single feed.",
      role: "Built the full application — the concurrent multi-API fetch layer, the embedding and FAISS retrieval stack, the RAG question-answering interface, and the sentiment and citation layers on top.",
      architecture: {
        intro:
          "Fetch three sources in parallel, embed everything into one searchable index, then answer questions against that index instead of against any single feed.",
        steps: [
          {
            title: "Concurrent multi-source fetch",
            body: "YouTube, NewsAPI and Twitter queried in parallel so total latency tracks the slowest source rather than their sum.",
          },
          {
            title: "Embedding",
            body: "Results normalized into a common shape and embedded with Sentence Transformers.",
          },
          {
            title: "FAISS vector index",
            body: "A FAISS index over 50K+ embeddings provides low-latency semantic retrieval across everything fetched.",
          },
          {
            title: "RAG synthesis",
            body: "GPT-3.5 answers questions grounded in retrieved context, with citations attached automatically.",
          },
          {
            title: "Sentiment analysis",
            body: "VADER scores tone per source and in aggregate, surfacing how coverage actually skews.",
          },
        ],
      },
      techStack: [
        { group: "Backend", items: ["Python", "Flask"] },
        { group: "Retrieval", items: ["FAISS", "Sentence Transformers"] },
        { group: "AI / NLP", items: ["OpenAI GPT-3.5", "VADER"] },
        { group: "Sources", items: ["YouTube API", "NewsAPI", "Twitter API"] },
      ],
      features: [
        {
          icon: "bolt",
          title: "Concurrent fetching",
          body: "Three APIs hit in parallel, so adding a source costs almost no additional wall-clock time.",
        },
        {
          icon: "search",
          title: "Semantic search at 50K+ scale",
          body: "FAISS retrieval finds relevant content by meaning across the full multi-source corpus.",
        },
        {
          icon: "format_quote",
          title: "Auto-cited answers",
          body: "Every synthesized response carries the sources it drew from, so claims stay checkable.",
        },
        {
          icon: "sentiment_satisfied",
          title: "Sentiment breakdown",
          body: "Per-source and overall tone distribution, surfacing skew that a raw result list hides.",
        },
      ],
      results: [
        { value: "50K+", label: "Embeddings searched" },
        { value: "3 sources", label: "Unified into one index" },
        { value: "Auto-cited", label: "Every synthesized answer" },
      ],
      challenges: [
        {
          title: "Three APIs, three shapes, three latencies",
          body: "Concurrent fetching with a normalization layer meant the slowest source set the pace instead of the total.",
        },
        {
          title: "Keeping answers honest",
          body: "Grounding synthesis in retrieved context and attaching citations kept the model tied to what was actually fetched.",
        },
        {
          title: "Search that survives vocabulary mismatch",
          body: "Embedding-based retrieval finds relevant results even when the query wording never appears in the source text.",
        },
      ],
      screenshots: [
        { src: "/work/multi-source/search.webp", caption: "Query entry across all three sources" },
        { src: "/work/multi-source/insights.webp", caption: "AI key insights with per-source sentiment and themes" },
        { src: "/work/multi-source/sentiment.webp", caption: "Overall sentiment distribution" },
        { src: "/work/multi-source/followup.webp", caption: "RAG follow-up Q&A with suggested questions" },
      ],
      cta: {
        lead: "Need",
        accentWord: "search over your own data",
        tail: "?",
        body: "Embeddings, vector retrieval and grounded answers — built to your corpus.",
      },
    },
  },
  {
    icon: "chat_bubble",
    title: "RAG-Bot & Automation Pipelines",
    body: "Private, fully offline document Q&A on Mistral 7B via LlamaCpp and ChromaDB — plus the production n8n pipelines that scrape, transcribe and structure content without a human touching it.",
    tags: ["Mistral 7B", "ChromaDB", "n8n", "Whisper"],
    href: "/work/rag-automation",
    size: "small",
    accent: "tertiary",
    slug: "rag-automation",
    caseStudy: {
      tagline:
        "Document Q&A that never leaves the machine — and the n8n pipelines that run the busywork while nobody watches.",
      links: [{ label: "View on GitHub", href: GITHUB, icon: "code" }],
      problem:
        "Two problems that share a shape. Some documents can't go to a hosted API at all — legal, medical, internal — which rules out the entire managed-LLM path. And a lot of recurring work (scraping, transcribing, filtering, filing) is mechanical but too irregular for a cron job. Both needed systems that run unattended: one entirely offline, the other entirely hands-off.",
      role: "Built both. RAG-Bot is a fully local retrieval stack with a quantized model and no network dependency; the automation side is a set of production n8n workflows chaining scraping, transcription, LLM filtering and structured storage.",
      architecture: {
        intro:
          "Two independent tracks. The RAG track runs entirely on local hardware; the automation track orchestrates external services through n8n without manual intervention.",
        steps: [
          {
            title: "RAG · Document ingest",
            body: "PDF and TXT files chunked and embedded locally with HuggingFace sentence transformers — nothing leaves the machine.",
          },
          {
            title: "RAG · ChromaDB retrieval",
            body: "Embeddings persisted to ChromaDB for semantic retrieval over the private corpus.",
          },
          {
            title: "RAG · Local inference",
            body: "Mistral 7B quantized to Q4 and served through LlamaCpp, answering strictly from retrieved content rather than from memory.",
          },
          {
            title: "RAG · Streamlit UI",
            body: "A responsive interface for real-time questioning against private documents.",
          },
          {
            title: "Automation · Scrape & transcribe",
            body: "n8n workflows pull viral TikTok and Instagram content and push it through Whisper transcription.",
          },
          {
            title: "Automation · Filter & file",
            body: "GPT-powered filtering scores and classifies each item, then writes structured metadata to Google Sheets and databases for live reporting.",
          },
        ],
      },
      techStack: [
        { group: "Local AI", items: ["Mistral 7B (Q4)", "LlamaCpp", "ChromaDB", "HuggingFace"] },
        { group: "Interface", items: ["Streamlit"] },
        { group: "Automation", items: ["n8n", "Whisper API", "OpenAI API"] },
        { group: "Storage", items: ["Google Sheets", "Databases"] },
      ],
      features: [
        {
          icon: "lock",
          title: "Fully offline inference",
          body: "Quantized local model plus local embeddings means private documents never touch a third-party API.",
        },
        {
          icon: "savings",
          title: "Zero per-query cost",
          body: "Once the model is on disk, questions cost compute and nothing else.",
        },
        {
          icon: "graphic_eq",
          title: "Transcription in the loop",
          body: "Whisper turns scraped video into searchable text before the filtering stage ever sees it.",
        },
        {
          icon: "table_chart",
          title: "Structured output, not notifications",
          body: "Pipelines land clean rows in Sheets and databases, so the result is queryable rather than just an alert.",
        },
      ],
      results: [
        { value: "100% local", label: "RAG inference, no API calls" },
        { value: "Zero cost", label: "Per query on the local path" },
        { value: "Unattended", label: "Automation runs end to end" },
      ],
      challenges: [
        {
          title: "Running a 7B model on ordinary hardware",
          body: "Q4 quantization through LlamaCpp brought Mistral 7B into a usable memory and latency envelope without a GPU.",
        },
        {
          title: "Keeping a small model grounded",
          body: "Tight retrieval and prompt constraints kept answers anchored to the retrieved document instead of the model's own priors.",
        },
        {
          title: "Pipelines that fail quietly",
          body: "Multi-branch n8n workflows with explicit filter and error paths, so a bad scrape drops one item rather than stalling the run.",
        },
      ],
      screenshots: [
        { src: "/work/rag-automation/ragbot.webp", caption: "RAG-Bot answering from a private document, fully offline" },
        { src: "/work/rag-automation/ragbot-repo.webp", caption: "Project README and setup" },
        { src: "/work/rag-automation/n8n-workflow.webp", caption: "Content pipeline — scrape, transcribe, filter, store" },
        { src: "/work/rag-automation/n8n-canvas.webp", caption: "Full multi-branch production workflow" },
      ],
      cta: {
        lead: "Want to",
        accentWord: "automate the busywork",
        tail: "?",
        body: "Local AI where privacy demands it, n8n pipelines where repetition does.",
      },
    },
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
  bio: "I'm Muttayyab — an AI Engineer with a Software Engineering degree, which is most of the reason my AI work survives contact with production. The degree drilled the unglamorous half: eliciting what a system actually needs to do, designing an architecture that can absorb change, and constructing code someone else can still read next year. I point that at LLMs, RAG, multi-agent systems and OCR — intelligent document pipelines, agent workflows and automation — and I still ship full-stack products with the MERN stack when a project needs a front door. I've reviewed model-generated code for Anthropic through Revelo, and I currently engineer AI systems at Merchaint in Singapore. Off the keyboard, I've competed as a national-level squash player.",
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
// Capabilities is deliberately absent: it sits directly under the hero, so it
// needs no jump link, and five items is the most the mobile nav fits cleanly.
export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Foundations", href: "/#foundations" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

// ---------------------------------------------------------------------------
// Work history. Roles that overlap the Merchaint range are typed so the
// timeline can label them (Contract / Project) rather than reading as
// concurrent full-time employment.
// ---------------------------------------------------------------------------
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
      "Made extraction schema-driven so new document types onboard by defining a field schema instead of writing a custom parser for every vendor layout.",
      "Built semantic product matching on vector embeddings to reconcile supplier names against a central catalog, replacing brittle exact-match logic.",
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
      "Ran structured, PR-style code reviews on responses from competing Claude model variants, judging logic correctness, modularity and maintainability.",
      "Analyzed architectural trade-offs across up to six model iterations — interface design, error handling, naming and documentation quality.",
      "Authored evaluation reports grounded in engineering principles to guide supervised fine-tuning toward production-ready code generation.",
      "Assessed real failure modes — context exhaustion, truncated output, partial implementations — and folded them into the evaluation criteria.",
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
      "Trained LSTM/GRU time-series models and ensemble classifiers (XGBoost, Random Forest) for trend detection and buy/sell signal classification.",
      "Deployed real-time data pipelines behind a FastAPI backend for scalable live market predictions.",
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
      "Built responsive, component-based web interfaces with React.js, Material UI and Ant Design.",
      "Shipped a full MERN budget-tracking application end to end over the course of the internship.",
    ],
    stack: ["React", "Node.js", "MongoDB", "Material UI"],
    accent: "secondary",
  },
];

// ---------------------------------------------------------------------------
// Engineering foundations: the degree, the coursework rendered as capabilities
// rather than course titles, the full-stack builds, and certifications.
// ---------------------------------------------------------------------------
export type Course = { title: string; body: string };

export const education = {
  degree: "BS in Software Engineering",
  institution: "COMSATS University Islamabad",
  campus: "Abbottabad Campus",
  start: "Sep 2022",
  end: "Jul 2026",
  cgpa: "3.50 / 4.0",
  intro:
    "A software engineering degree, not a computer science one. The distinction matters: the curriculum is built around how real systems get specified, designed, constructed and kept alive — the part that decides whether an AI prototype ever becomes something a business can run on.",
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
      body: "Modeling and redesigning a process before automating it, so automation doesn't cement a bad workflow.",
    },
    {
      title: "Software Re-engineering",
      body: "Reading, refactoring and modernizing systems you didn't write.",
    },
    {
      title: "Software Concepts & SE Fundamentals",
      body: "SDLC, process models and quality attributes treated as first-class design inputs.",
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
    body: "Hands-on projects across ML, deep learning, NLP, LLMs, MLOps, computer vision, OCR and model deployment.",
  },
  {
    title: "The Complete Web Development Bootcamp",
    issuer: "Udemy",
    period: "Completed Oct 2023",
    body: "Full-stack development across the MERN stack and RESTful API design.",
  },
];
