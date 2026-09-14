import { SERVICES, type Service } from "./services";

export type LiveServiceCard = Service & { status: "live" };

export type ComingSoonServiceCard = {
  status: "coming-soon";
  slug: string;
  title: string;
  icon: string;
  teaser: string;
};

export type ServiceCard = LiveServiceCard | ComingSoonServiceCard;

const COMING_SOON: ComingSoonServiceCard[] = [
  {
    status: "coming-soon",
    slug: "custom-software-development",
    title: "Custom Software Development",
    icon: "Layers",
    teaser:
      "Bespoke internal tools and platforms, built around how your business actually works — not the other way around.",
  },
  {
    status: "coming-soon",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "PenTool",
    teaser:
      "Dedicated product design — research, wireframes, and interfaces your users genuinely enjoy.",
  },
  {
    status: "coming-soon",
    slug: "ecommerce-development",
    title: "E-commerce Development",
    icon: "ShoppingCart",
    teaser:
      "Custom storefronts built to convert, from checkout flow to fulfillment integrations.",
  },
  {
    status: "coming-soon",
    slug: "api-integrations",
    title: "API & Integrations",
    icon: "Plug",
    teaser:
      "Connect your product to the payment gateways, CRMs, and tools your team already relies on.",
  },
  {
    status: "coming-soon",
    slug: "qa-test-automation",
    title: "QA & Test Automation",
    icon: "TestTube",
    teaser:
      "Automated test suites that catch regressions before your users ever do.",
  },
  {
    status: "coming-soon",
    slug: "web3-blockchain",
    title: "Web3 & Blockchain",
    icon: "Link2",
    teaser:
      "Smart contracts and decentralized apps, built with the same rigor as everything else we ship.",
  },
];

export const SERVICE_CARDS: ServiceCard[] = [
  ...SERVICES.map((service): LiveServiceCard => ({ status: "live", ...service })),
  ...COMING_SOON,
];
