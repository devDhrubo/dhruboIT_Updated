export const siteConfig = {
  agencyName: "Dhrubo IT",
  shortName: "DHRUBO IT",
  badgeLetter: "D",
  tagline: "Building Digital Products That Drive Growth",
  description:
    "Dhrubo IT engineers high-performance SaaS, AI-native systems, and premium web & mobile products for ambitious founders and enterprises worldwide.",
  url: "https://www.dhruboit.tech",
  email: "hello.dhruboit@gmail.com",
  operations: "Remote — EU, US, APAC",
  calUrl: "https://calendly.com/hello-dhruboit/30min",
};

export const navLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const heroContent = {
  badge: "System Status: Operational // Dhrubo IT",
  initialHeadline: "Building Digital Products That Drive Growth",
  initialSubtext:
    "Dhrubo IT engineers high-performance SaaS, AI-native systems, and premium web & mobile products for ambitious founders and enterprises worldwide.",
  initialCta: "View Our Work",
  initialCtaHref: "/case-studies",
  scrollBadge: "Trusted by Industry Leaders & Enterprises",
  scrollHeadline: "Trusted by Clients Worldwide",
  scrollSubtext:
    "From seed-stage MVPs to enterprise platforms — trusted by Taj International, Unique Telecom, Safe Pharma, and Ace Honor Ltd.",
  scrollCta: "Explore Services",
  scrollCtaHref: "/#services",
};

export const trustedClients = [
  "TAJ INTERNATIONAL",
  "UNIQUE TELECOM",
  "SAFE PHARMA",
  "ACE HONOR LTD",
];

export const techPartners = [
  "Vercel",
  "AWS",
  "Stripe",
  "OpenAI",
  "Supabase",
  "Cloudflare",
];

export const agencyOverview = {
  eyebrow: "We Are Dhrubo IT",
  headline: "Your One-Stop Partner for Digital Products & AI Systems",
  description:
    "Dhrubo IT was founded on a simple belief: technology should make business stronger, not more complicated. We operate as one integrated senior studio — strategy, design, full-stack engineering, QA, and cloud operations working together from first discovery call through launch and SLA support.",
  ctaLabel: "Learn More About Us",
  ctaHref: "/about",
  stats: [
    { label: "Projects Deployed", value: 70, suffix: "+", decimals: 0 },
    { label: "Countries Served", value: 12, suffix: "+", decimals: 0 },
    { label: "Uptime Guaranteed", value: 99.9, suffix: "%", decimals: 1 },
    { label: "Years of Expertise", value: 5, suffix: "+", decimals: 0 },
    { label: "Client Satisfaction", value: 100, suffix: "%", decimals: 0 },
  ],
};

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  timeline: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
  stack: string[];
  outcomes: string[];
}

export const servicesList: ServiceItem[] = [
  {
    slug: "web-development",
    title: "Web & Full-Stack Development",
    shortTitle: "Web Development",
    tagline: "High-speed websites, portals, and web apps built to convert.",
    description:
      "We engineer edge-rendered marketing sites, custom enterprise portals, and complex SPAs using Next.js 15, React 19, and TypeScript — achieving 95+ Core Web Vitals and rock-solid SEO.",
    timeline: "3–8 weeks",
    image: "/images/services/web-dev.jpg",
    imageAlt: "Modern full-stack web engineering workspace",
    deliverables: [
      "Technical architecture & SEO blueprint",
      "Responsive design system in Figma & Tailwind",
      "Edge-rendered Next.js 15 / React 19 frontend",
      "Type-safe REST & GraphQL APIs with PostgreSQL",
      "Automated QA, CI/CD, and Lighthouse 95+ audit",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Vercel"],
    outcomes: [
      "Sub-second Largest Contentful Paint (LCP)",
      "100/100 technical SEO & structured schema",
      "Maintainable, type-safe codebase your team can scale",
    ],
  },
  {
    slug: "saas-development",
    title: "SaaS Platform Engineering",
    shortTitle: "SaaS Development",
    tagline: "Multi-tenant architectures built for horizontal scale and recurring revenue.",
    description:
      "From seed-stage MVPs to multi-tenant B2B platforms, we build complete SaaS products with role-based access control, Stripe billing, real-time analytics, and audit-ready security.",
    timeline: "6–12 weeks",
    image: "/images/services/saas.jpg",
    imageAlt: "Multi-tenant SaaS analytics dashboard on modern screen",
    deliverables: [
      "Multi-tenant database schema & RBAC authentication",
      "Stripe subscriptions, usage metering, and invoicing",
      "Interactive dashboards with real-time WebSockets",
      "Admin operations panel & tenant telemetry",
      "SOC-conscious security practices & load testing",
    ],
    stack: ["Next.js", "Node.js", "Supabase", "Stripe", "Prisma", "Redis"],
    outcomes: [
      "Weekly shipping cycles from MVP to paying customers",
      "Zero-downtime releases with automated rollback",
      "Built to scale cleanly from 100 to 100K+ users",
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions & Automation",
    shortTitle: "AI & Automation",
    tagline: "Production RAG agents, LLM copilots, and workflow automation.",
    description:
      "We embed practical AI directly into your operations — custom vector-search RAG assistants, document extraction pipelines, and automated n8n / agentic workflows that save teams dozens of hours weekly.",
    timeline: "3–6 weeks",
    image: "/images/services/ai.jpg",
    imageAlt: "Enterprise AI and neural RAG architecture visualization",
    deliverables: [
      "AI feasibility & data privacy architecture",
      "Pinecone / pgvector RAG ingestion & retrieval pipeline",
      "Custom Slack, web, or internal copilot UI",
      "n8n / event-driven workflow automation",
      "Evaluation benchmarks, guardrails, and cost monitoring",
    ],
    stack: ["OpenAI", "Claude", "Gemini", "Pinecone", "LangChain", "Cloudflare Workers"],
    outcomes: [
      "Up to 75% reduction in manual ops & search time",
      "Strict role-based access control over enterprise knowledge",
      "Production latency & token-cost optimization",
    ],
  },
  {
    slug: "mobile-apps",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    tagline: "Native-grade iOS & Android apps from a unified TypeScript codebase.",
    description:
      "We craft consumer and enterprise mobile experiences with React Native and Expo — complete with biometric WebAuthn security, offline sync, push notifications, and App Store / Play Store launch support.",
    timeline: "6–10 weeks",
    image: "/images/services/mobile.jpg",
    imageAlt: "Cross-platform mobile application interface design",
    deliverables: [
      "iOS & Android interactive prototypes",
      "React Native + Expo unified mobile app",
      "Biometric authentication & encrypted local storage",
      "Push notification pipelines & deep linking",
      "App Store & Google Play release management",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "AWS Lambda", "Stripe"],
    outcomes: [
      "Single codebase cutting maintenance cost by 40%+",
      "60fps animations and native gesture feel",
      "4.9★-caliber store readiness and crash monitoring",
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud, DevOps & Headless Commerce",
    shortTitle: "Cloud & DevOps",
    tagline: "Resilient infrastructure, headless Shopify/WordPress, and observability.",
    description:
      "We modernize legacy infrastructure onto AWS, Vercel, and Cloudflare with Terraform IaC, automated CI/CD, and sub-second headless storefronts engineered for peak traffic.",
    timeline: "2–6 weeks",
    image: "/images/services/cloud.jpg",
    imageAlt: "Global cloud infrastructure and edge network visualization",
    deliverables: [
      "Cloud architecture audit & cost optimization",
      "Terraform Infrastructure-as-Code & Docker pipelines",
      "Zero-downtime blue/green deployment setup",
      "Headless Shopify Plus / Sanity CMS integration",
      "24/7 uptime monitoring, alerts, and SLA support",
    ],
    stack: ["AWS", "Vercel", "Cloudflare", "Docker", "Terraform", "Shopify Plus"],
    outcomes: [
      "99.9%+ production uptime during flash traffic spikes",
      "30–50% faster global response via edge caching",
      "Automated backups and full observability dashboards",
    ],
  },
];

export interface IndustryItem {
  id: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  kpis: { label: string; value: string }[];
}

export const industries: IndustryItem[] = [
  {
    id: "fintech",
    name: "FinTech & Banking",
    headline: "Real-time financial platforms built for trust and compliance",
    description:
      "We engineer wealth management portals, biometric mobile banking apps, and automated treasury dashboards that handle high-value transactions with zero latency and full audit trails.",
    image: "/images/industries/fintech.jpg",
    imageAlt: "Real-time financial trading and banking analytics",
    kpis: [
      { label: "Assets Managed", value: "$65M+ AUM" },
      { label: "Security Standard", value: "WebAuthn & RBAC" },
      { label: "Core Capabilities", value: "Rebalancing, Plaid, Stripe" },
      { label: "Production SLA", value: "99.99% Uptime" },
    ],
  },
  {
    id: "ecommerce",
    name: "Retail & E-Commerce",
    headline: "Headless storefronts engineered for peak flash-sale conversion",
    description:
      "We replace sluggish legacy themes with edge-rendered Next.js 15 and Shopify Plus storefronts featuring instant cart state, diagnostic quizzes, and frictionless mobile checkout.",
    image: "/images/industries/ecommerce.jpg",
    imageAlt: "Modern retail and headless e-commerce checkout experience",
    kpis: [
      { label: "Conversion Lift", value: "+47% Mobile" },
      { label: "Page Speed", value: "0.38s LCP" },
      { label: "Annual GMV", value: "$18M+ Processed" },
      { label: "Stack Coverage", value: "Shopify, Sanity, Stripe" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Technology",
    headline: "Modernizing mission-critical ERP and operational pipelines",
    description:
      "We help established enterprises replace brittle legacy tools and spreadsheets with unified, multi-region cloud platforms, real-time executive telemetry, and automated reporting.",
    image: "/images/industries/enterprise.jpg",
    imageAlt: "Global enterprise corporate architecture and operations",
    kpis: [
      { label: "Enterprise Clients", value: "Taj Intl, Unique Telecom" },
      { label: "Deployment Style", value: "Zero-Downtime Migration" },
      { label: "Global Operations", value: "EU, US & APAC" },
      { label: "Reliability", value: "99.9% Uptime SLA" },
    ],
  },
  {
    id: "ai",
    name: "Artificial Intelligence",
    headline: "Cognitive workflows and RAG copilots that ship to production",
    description:
      "We move beyond AI demos to build secure vector-search knowledge agents, Slack copilots, and automated document pipelines grounded in your proprietary enterprise data.",
    image: "/images/industries/ai-industry.jpg",
    imageAlt: "Artificial intelligence and cognitive automation systems",
    kpis: [
      { label: "Ops Time Saved", value: "75% Faster Q&A" },
      { label: "Connected Sources", value: "14+ SaaS Integrations" },
      { label: "Model Ecosystem", value: "OpenAI, Claude, Gemini" },
      { label: "Team Adoption", value: "+64 Internal NPS" },
    ],
  },
  {
    id: "saas-mobile",
    name: "SaaS & Mobile Products",
    headline: "End-to-end product engineering for ambitious founders",
    description:
      "From interactive Figma prototypes to multi-tenant web SaaS and React Native mobile apps, we partner with founders to ship investor-ready products in weekly sprints.",
    image: "/images/industries/saas-mobile.jpg",
    imageAlt: "SaaS and mobile digital product engineering",
    kpis: [
      { label: "Store Rating", value: "4.9★ iOS & Android" },
      { label: "Release Cadence", value: "Weekly Sprints" },
      { label: "Billing & Auth", value: "Stripe & Multi-Tenant" },
      { label: "Global Reach", value: "12+ Countries" },
    ],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Workshops to align on business goals, target users, technical constraints, and success KPIs.",
  },
  {
    step: "02",
    title: "Strategy & Architecture",
    description:
      "Clear roadmap, data models, cloud topology, and fixed milestones documented before writing code.",
  },
  {
    step: "03",
    title: "UI/UX Design",
    description:
      "High-fidelity Figma design systems and clickable prototypes validated with stakeholders.",
  },
  {
    step: "04",
    title: "Agile Engineering",
    description:
      "Type-safe, peer-reviewed code shipped in weekly sprint demos with direct Slack access to engineers.",
  },
  {
    step: "05",
    title: "QA & Security",
    description:
      "Automated test suites, real-device testing, Lighthouse 95+ audits, and load/security checks.",
  },
  {
    step: "06",
    title: "Launch & SLA Support",
    description:
      "Zero-downtime deployment pipelines with observability, rollback safety, and ongoing growth iterations.",
  },
];

export const techStackItems = [
  {
    id: "frontend",
    name: "Frontend & Next.js 15",
    shortLabel: "Next",
    subtitle: "Frontend / React 19, Next.js 15 & TypeScript",
    description:
      "Marketing sites, SPAs, and edge-rendered dashboards built with React 19, Next.js 15, Angular, TanStack, and Tailwind CSS.",
    color: "#0B0B0F",
  },
  {
    id: "backend",
    name: "Backend & Databases",
    shortLabel: "Node",
    subtitle: "Backend / Node.js, PostgreSQL & Supabase",
    description:
      "Type-safe REST & GraphQL APIs powered by Node.js, Express, Supabase, PostgreSQL, Prisma, and Redis.",
    color: "#10B981",
  },
  {
    id: "ai",
    name: "AI & RAG Systems",
    shortLabel: "AI",
    subtitle: "AI / OpenAI, Claude, Gemini & Pinecone",
    description:
      "Custom LLM integrations, vector-search RAG agents, LangChain workflows, and n8n automation in production.",
    color: "#8B5CF6",
  },
  {
    id: "mobile",
    name: "Mobile Apps",
    shortLabel: "RN",
    subtitle: "Mobile / React Native & Expo for iOS & Android",
    description:
      "Native-grade cross-platform mobile banking and consumer apps with biometric WebAuthn, push pipelines, and real-time sync.",
    color: "#2563EB",
  },
  {
    id: "cloud",
    name: "Cloud & Edge Ops",
    shortLabel: "AWS",
    subtitle: "Cloud / Vercel, AWS, Cloudflare & Terraform",
    description:
      "Zero-downtime release pipelines on Vercel, AWS Lambda, Cloudflare Workers, Fly.io, and Docker with full observability.",
    color: "#F0523D",
  },
  {
    id: "ecommerce",
    name: "Headless Commerce",
    shortLabel: "Shop",
    subtitle: "Commerce / Stripe Edge, Sanity & Headless CMS",
    description:
      "Sub-second headless storefronts and multi-tenant SaaS billing built with Stripe Edge, Sanity CMS, and Shopify.",
    color: "#059669",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  projectTag: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Engr. Tariqul Islam",
    role: "Managing Director",
    company: "Taj International",
    rating: 5,
    quote:
      "Dhrubo IT modernized our core operational systems and enterprise software pipeline. Their technical precision, architectural depth, and execution speed are outstanding.",
    projectTag: "Enterprise Systems",
  },
];

export const trustBadges = [
  "70+ Projects Deployed",
  "100% Client Satisfaction",
  "99.9% Uptime Guaranteed",
  "Remote — EU, US, APAC",
];

export const ctaContent = {
  eyebrow: "Build Your Next Solution",
  headline: "Ready to build your next digital product?",
  subtext:
    "Tell us about your industry, your vision, and where you are in the journey. Our senior engineers will recommend the right architecture and roadmap.",
  primaryCta: "Book Free Consultation",
  secondaryCta: "Request a Quote",
};

export const consultationSteps = [
  {
    step: "1",
    title: "We'll contact you within 24 hours",
    detail: "A senior technical lead reviews your brief — never a generic sales script.",
  },
  {
    step: "2",
    title: "We'll understand your goals and requirements",
    detail: "A focused 30-minute discovery call to unpack users, constraints, and KPIs.",
  },
  {
    step: "3",
    title: "We'll align on scope, timeline, and budget",
    detail: "You receive a clear written proposal with milestones and transparent pricing.",
  },
  {
    step: "4",
    title: "We'll kick off your project",
    detail: "Dedicated Slack channel, weekly demos, and production-ready code from week one.",
  },
];

export const directContactPerson = {
  name: "Enterprise Solutions Desk",
  role: "Business Development & Technical Advisory",
  email: "hello.dhruboit@gmail.com",
  responseTime: "Response within 24 hours (EU, US, APAC)",
};

export const contactContent = {
  headline: "Tell us about your project",
  subtext:
    "Share your timeline, stack, or attach an RFP/spec document. We respond within one business day.",
  projectTypes: [
    "Website & Web App (Next.js 15 / React 19)",
    "SaaS Development (Multi-Tenant + Stripe)",
    "AI Solutions & Automation (RAG / Agents)",
    "Mobile App (React Native / Expo)",
    "Headless E-Commerce & Cloud Ops",
  ],
};

export const aboutPillars = [
  {
    label: "/mission",
    title: "Mission",
    body: "Engineer software that moves real business metrics — revenue, retention, and operational velocity — for founders and enterprises who refuse average.",
  },
  {
    label: "/vision",
    title: "Vision",
    body: "Be the senior product studio the best founders quietly recommend to each other, wherever they are building from.",
  },
  {
    label: "/values",
    title: "Values",
    body: "Taste. Rigor. Ownership. No hand-offs between disconnected vendors, no mediocrity, and zero fluff — in any time zone.",
  },
  {
    label: "/craft",
    title: "Craft",
    body: "A deep bench of senior engineers, designers, and AI architects invested fully in every system we ship.",
  },
  {
    label: "/coverage",
    title: "Global Coverage",
    body: "Remote-first across EU, US, and APAC with real daily overlap hours, async clarity, and SLA-backed support.",
  },
];

export const faqItems = [
  {
    question: "How quickly can Dhrubo IT start a new project?",
    answer:
      "After our 30-minute discovery call and scope alignment, we typically kick off within 3 to 5 business days with a dedicated engineering pod and shared Slack workspace.",
  },
  {
    question: "What engagement models do you offer?",
    answer:
      "We offer both Fixed-Scope Milestone builds (ideal for MVPs, redesigns, and well-defined integrations) and Dedicated Monthly Product Pods (ideal for scaling SaaS platforms and ongoing enterprise roadmaps).",
  },
  {
    question: "Do we own 100% of the source code and intellectual property?",
    answer:
      "Yes. Upon payment, 100% of the source code, Figma design systems, cloud configurations, and intellectual property belong exclusively to your organization. We are also happy to sign your mutual NDA before reviewing any specs.",
  },
  {
    question: "What is your typical timeline for an MVP or full web platform?",
    answer:
      "High-converting marketing sites and headless storefronts typically launch in 3–5 weeks. Full-stack SaaS MVPs, AI RAG systems, and React Native apps generally take 6–12 weeks with weekly playable demos.",
  },
  {
    question: "How do you communicate across EU, US, and APAC time zones?",
    answer:
      "We work async-first with structured weekly sprint demos, Linear/Jira visibility, and Loom walkthroughs — plus dedicated real-time overlap hours for US Eastern/Pacific and European teams.",
  },
  {
    question: "Can you integrate AI safely with our internal company data?",
    answer:
      "Yes. We build retrieval-augmented generation (RAG) pipelines with strict role-based access control (RBAC), zero-data-retention API endpoints, and isolated vector indexes so sensitive data never leaks or trains public models.",
  },
  {
    question: "Do you provide post-launch maintenance and SLA support?",
    answer:
      "Every launch includes a 30-day warranty period for bug fixes, and we offer optional ongoing SLA support plans covering uptime monitoring, security patches, dependency updates, and new feature sprints.",
  },
  {
    question: "Can you work with our existing internal engineering or design team?",
    answer:
      "Absolutely. We regularly embed alongside in-house CTOs, product managers, and agencies — following your Git workflows, code review standards, and CI/CD pipelines seamlessly.",
  },
];

export const footerContent = {
  blurb:
    "A senior product, design, and engineering studio working globally with founders, scale-ups, and enterprise teams across EU, US, and APAC.",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Web Development", href: "/services/web-development" },
        { label: "SaaS Platforms", href: "/services/saas-development" },
        { label: "AI & Automation", href: "/services/ai-solutions" },
        { label: "Mobile Apps", href: "/services/mobile-apps" },
        { label: "Cloud & DevOps", href: "/services/cloud-devops" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Case Studies", href: "/case-studies" },
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
        { label: "Request Estimation", href: "/request-estimation" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Book 30-Min Call", href: "https://calendly.com/hello-dhruboit/30min" },
        { label: "hello.dhruboit@gmail.com", href: "mailto:hello.dhruboit@gmail.com" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    },
  ],
};
