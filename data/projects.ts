export type ProjectFilterCategory =
  | "All"
  | "E-Commerce"
  | "FinTech"
  | "AI"
  | "Mobile"
  | "Enterprise";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  filterCategory: Exclude<ProjectFilterCategory, "All">;
  timeline: string;
  servicesProvided: string[];
  metric: string;
  metricsGrid: { value: string; label: string }[];
  summary: string;
  image: string;
  imageAlt: string;
  tags: string[];
  problem: string;
  solution: string;
  stack: string[];
  outcome: string[];
  liveUrl?: string;
}

export const projectCategories: ProjectFilterCategory[] = [
  "All",
  "E-Commerce",
  "FinTech",
  "AI",
  "Mobile",
  "Enterprise",
];

export const projects: Project[] = [
  {
    id: "apex-commerce",
    title: "Apex Commerce — Headless Edge Storefront",
    client: "Apex Commerce",
    category: "E-Commerce / Headless",
    filterCategory: "E-Commerce",
    timeline: "8 Weeks — Ongoing Support",
    servicesProvided: ["UI/UX Design", "Next.js 15 Development", "Headless CMS", "Cloud Edge"],
    metric: "+47% conversion",
    metricsGrid: [
      { value: "+47%", label: "Mobile Conversion" },
      { value: "0.38s", label: "LCP Performance" },
      { value: "$18M+", label: "Annual GMV Processed" },
    ],
    summary:
      "Headless Next.js 15 edge-rendered storefront with instant cart state, Sanity CMS, and Stripe Edge checkout.",
    image: "/images/projects/apex-commerce.jpg",
    imageAlt: "Apex Commerce headless Next.js 15 e-commerce storefront",
    tags: ["Next.js 15", "Supabase", "Stripe Edge", "Vercel Edge"],
    problem:
      "Legacy Shopify storefront infrastructure struggled during high-traffic flash sales with unacceptable mobile checkout latency and high bounce rates.",
    solution:
      "Architected a custom headless Next.js 15 storefront deployed on Vercel Edge nodes with Supabase real-time inventory, Sanity CMS, and Stripe Edge checkout.",
    stack: ["Next.js 15", "Supabase", "Stripe Edge", "Vercel Edge", "Sanity CMS"],
    outcome: [
      "+47% lift in mobile conversion rate during peak flash sales",
      "0.38s Largest Contentful Paint (LCP) across global edge nodes",
      "$18M+ annual GMV processed with zero checkout downtime",
    ],
  },
  {
    id: "stride-financial",
    title: "Stride Financial — Real-Time Wealth & Asset Portal",
    client: "Stride Financial",
    category: "FinTech / Asset Management",
    filterCategory: "FinTech",
    timeline: "12 Weeks",
    servicesProvided: ["Product Architecture", "Full-Stack Web App", "Biometric Security", "AWS Cloud"],
    metric: "$65M AUM",
    metricsGrid: [
      { value: "10x", label: "Accounts Per Advisor" },
      { value: "$65M", label: "AUM on Platform" },
      { value: "99.99%", label: "Production Uptime" },
    ],
    summary:
      "Event-driven portfolio rebalancing engine and WebAuthn biometric client portal built on PostgreSQL and AWS Lambda.",
    image: "/images/projects/stride-financial.jpg",
    imageAlt: "Stride Financial wealth advisory and asset management dashboard",
    tags: ["React", "Node.js", "PostgreSQL", "AWS Lambda"],
    problem:
      "Stride's wealth advisory team was bottlenecked by manual spreadsheet calculations, capping advisor account capacity and slowing trade executions.",
    solution:
      "Designed and deployed a real-time event-driven rebalancing engine with PostgreSQL & TimescaleDB ledgers and WebAuthn biometric client security.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS Lambda", "TimescaleDB", "WebAuthn"],
    outcome: [
      "10x more client accounts managed per wealth advisor",
      "$65M+ Assets Under Management (AUM) running on the platform",
      "99.99% production uptime with full audit logging",
    ],
  },
  {
    id: "synapse-ai",
    title: "Synapse AI — Enterprise Vector RAG Copilot",
    client: "Synapse AI",
    category: "AI Productivity / Enterprise",
    filterCategory: "AI",
    timeline: "6 Weeks",
    servicesProvided: ["AI Architecture", "Vector RAG Pipeline", "Slack Integration", "RBAC Security"],
    metric: "75% time saved",
    metricsGrid: [
      { value: "75%", label: "Automated Ops Q&A" },
      { value: "14", label: "Integrated SaaS Sources" },
      { value: "+64", label: "Internal Team NPS" },
    ],
    summary:
      "Vector-search RAG agent integrated natively into Slack across 14 SaaS tools with strict enterprise RBAC.",
    image: "/images/projects/synapse-ai.jpg",
    imageAlt: "Synapse AI enterprise RAG search and Slack workflow interface",
    tags: ["OpenAI API", "Pinecone", "TypeScript", "Cloudflare Workers"],
    problem:
      "Internal enterprise knowledge was fragmented across 14 tools including Notion, Google Workspace, Linear, and Confluence, costing teams hundreds of hours.",
    solution:
      "Engineered a custom Pinecone vector RAG pipeline on Cloudflare Workers with native Slack integration and strict role-based access permissions.",
    stack: ["OpenAI API", "Pinecone", "TypeScript", "Cloudflare Workers", "Slack API"],
    outcome: [
      "75% reduction in internal operations search and Q&A time",
      "14 enterprise SaaS sources indexed in real time",
      "+64 internal team NPS after company-wide rollout",
    ],
  },
  {
    id: "flowstate-mobile",
    title: "FlowState SaaS — Biometric Mobile Banking App",
    client: "FlowState",
    category: "Mobile / Mobile Banking",
    filterCategory: "Mobile",
    timeline: "10 Weeks",
    servicesProvided: ["UI/UX Design", "React Native App", "Plaid & Stripe Issuing", "QA & Release"],
    metric: "4.9★ store rating",
    metricsGrid: [
      { value: "4.9★", label: "App Store Rating" },
      { value: "<1s", label: "Biometric Login" },
      { value: "2x", label: "Faster Release Velocity" },
    ],
    summary:
      "Unified React Native mobile banking experience with biometric auth, instant P2P transfers, and card telemetry.",
    image: "/images/projects/flowstate-mobile.jpg",
    imageAlt: "FlowState mobile banking and real-time card telemetry app",
    tags: ["React Native", "Firebase", "Plaid API", "Stripe Issuing"],
    problem:
      "FlowState needed a consumer-grade iOS and Android banking app with instant P2P transfers and real-time card controls without maintaining two native codebases.",
    solution:
      "Built a unified React Native & Expo application backed by AWS Lambda, Firebase real-time sync, Plaid account linking, and Stripe Issuing.",
    stack: ["React Native", "Firebase", "AWS Lambda", "Plaid API", "Stripe Issuing"],
    outcome: [
      "4.9★ average rating across App Store and Google Play",
      "Sub-second biometric login and instant P2P settlement",
      "Single TypeScript codebase serving both iOS and Android",
    ],
  },
  {
    id: "taj-enterprise",
    title: "Taj International — Core Operations & ERP Pipeline",
    client: "Taj International",
    category: "Enterprise Web App",
    filterCategory: "Enterprise",
    timeline: "14 Weeks",
    servicesProvided: ["System Modernization", "Full-Stack ERP", "Cloud Migration", "SLA Support"],
    metric: "99.9% uptime",
    metricsGrid: [
      { value: "99.9%", label: "Guaranteed Uptime" },
      { value: "100%", label: "Zero-Downtime Cutover" },
      { value: "4x", label: "Faster Reporting" },
    ],
    summary:
      "Modernized core operational workflows and multi-region logistics tracking into a unified cloud platform.",
    image: "/images/projects/taj-enterprise.jpg",
    imageAlt: "Taj International enterprise operations and logistics pipeline",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    problem:
      "Legacy on-premise tools slowed cross-border operational reporting and lacked real-time visibility for executive leadership.",
    solution:
      "Re-architected the operational pipeline onto a type-safe Next.js & Node.js cloud platform with automated reporting and role-based dashboards.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis", "AWS"],
    outcome: [
      "99.9% guaranteed uptime across regional operations",
      "Real-time executive telemetry replacing manual daily exports",
      "Zero-downtime migration from legacy systems",
    ],
  },
  {
    id: "unique-telecom-hub",
    title: "Unique Telecom — High-Speed Digital Platform",
    client: "Unique Telecom",
    category: "Web Platform & Cloud",
    filterCategory: "Enterprise",
    timeline: "5 Weeks",
    servicesProvided: ["Web Development", "Technical SEO", "n8n Automation", "Cloudflare Edge"],
    metric: "100 Lighthouse SEO",
    metricsGrid: [
      { value: "100", label: "Lighthouse SEO" },
      { value: "3x", label: "Faster Navigation" },
      { value: "24/7", label: "Automated CRM Sync" },
    ],
    summary:
      "Edge-cached web platform and automated customer onboarding workflows engineered for scale and SEO.",
    image: "/images/projects/unique-telecom.jpg",
    imageAlt: "Unique Telecom edge-cached web platform and customer portal",
    tags: ["Next.js 15", "Tailwind", "Cloudflare", "n8n Automation"],
    problem:
      "Slow page loads and manual lead routing caused missed customer inquiries and poor organic search rankings.",
    solution:
      "Delivered an edge-rendered Next.js 15 web platform paired with automated n8n CRM pipelines and technical SEO optimization.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Cloudflare", "n8n"],
    outcome: [
      "100/100 Google Lighthouse SEO and Core Web Vitals",
      "Automated lead qualification and instant CRM sync",
      "3x faster page navigation across desktop and mobile",
    ],
  },
];
