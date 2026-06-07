// ---------------------------------------------------------------------------
// Single source of truth for site content.
// Populated from Muttayyab_Resume_Updated_cld.pdf — edit freely.
// ---------------------------------------------------------------------------

const GITHUB = "https://github.com/Muttayyab-13";
const LINKEDIN = "https://www.linkedin.com/in/muttayyab";
const EMAIL = "muttayyab13@gmail.com";

export const site = {
  brand: "MUTTAYYAB.AI",
  name: "Muttayyab Abdurrehman",
  role: "AI Engineer · Full-Stack & Generative AI",
  title: "Muttayyab Abdurrehman — AI Engineer",
  description:
    "AI Engineer specializing in LLMs, RAG, computer vision and OCR. I build intelligent document pipelines, RAG systems, and n8n automation, and ship scalable full-stack products with the MERN stack.",
  email: EMAIL,
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

export type Project = {
  icon: string;
  title: string;
  body: string;
  tags: string[];
  href: string;
  featured?: boolean;
  size: "featured" | "tall" | "small";
  accent: "primary" | "secondary" | "tertiary";
};

export const projects: Project[] = [
  {
    icon: "account_tree",
    title: "AI Document Extraction Pipeline",
    body: "Enterprise document-processing pipeline combining OCR (PaddleOCR, AWS Textract) with LLM APIs and multi-stage routing to extract structured data from invoices and forms — cutting manual workload by 70%.",
    tags: ["Python", "AWS Textract", "PaddleOCR", "LLMs"],
    href: GITHUB,
    featured: true,
    size: "featured",
    accent: "primary",
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

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
