export type Service = {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    title: "Website Development",
    icon: "Globe",
    summary: "Fast, responsive, conversion-focused websites.",
    description:
      "From marketing sites to complex web platforms — we design and build websites that load instantly, rank well, and turn visitors into clients.",
    features: [
      "Custom UI/UX design",
      "Next.js / React engineering",
      "Headless CMS integration",
      "E-commerce & booking systems",
      "Core Web Vitals optimization",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    icon: "Smartphone",
    summary: "Native-feel apps for iOS & Android.",
    description:
      "Cross-platform and native mobile apps built for smooth performance, offline reliability, and a polished user experience your customers keep coming back to.",
    features: [
      "iOS & Android (cross-platform)",
      "API & backend integration",
      "Push notifications & analytics",
      "App Store / Play Store launch",
      "Ongoing version support",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation & Products",
    icon: "BrainCircuit",
    summary: "AI agents, automation, and ready-to-launch AI products.",
    description:
      "We design and ship AI-powered features — chatbots, workflow automation, intelligent dashboards — plus reusable AI product templates you can launch fast.",
    features: [
      "Custom AI agents & chatbots",
      "Workflow & business automation",
      "LLM integration (RAG, tool-use)",
      "AI SaaS product templates",
      "Model evaluation & fine-tuning",
    ],
  },
  {
    slug: "devops-cloud",
    title: "DevOps & Cloud Infrastructure",
    icon: "Cloud",
    summary: "Scalable infrastructure, automated from day one.",
    description:
      "We architect cloud infrastructure and CI/CD pipelines that scale with your product — so shipping stays fast and downtime stays rare.",
    features: [
      "CI/CD pipeline automation",
      "Cloud architecture (AWS/GCP/Azure)",
      "Containerization & orchestration",
      "Monitoring, logging & alerting",
      "Zero-downtime deployments",
    ],
  },
  {
    slug: "seo-growth",
    title: "SEO & Digital Growth",
    icon: "TrendingUp",
    summary: "Get found, get ranked, get chosen.",
    description:
      "Technical SEO baked into the build, plus ongoing optimization strategy — so your product doesn't just launch, it gets discovered.",
    features: [
      "Technical & on-page SEO",
      "Structured data / schema markup",
      "Site speed & Core Web Vitals",
      "Content & keyword strategy",
      "Analytics & search console setup",
    ],
  },
  {
    slug: "security-maintenance",
    title: "Security & Maintenance",
    icon: "ShieldCheck",
    summary: "Continuous protection, testing, and upkeep.",
    description:
      "Every project we ship stays cared for — dedicated QA testing, security hardening, and proactive maintenance so you never have to worry.",
    features: [
      "Manual & automated QA testing",
      "Security audits & hardening",
      "Dependency & patch management",
      "Backup & disaster recovery",
      "Uptime & performance monitoring",
    ],
  },
];
