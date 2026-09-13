export type Category = "Web" | "Mobile" | "AI Products";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  tagline: string;
  tags: string[];
  image: string;
  images?: [string, string, string];
  accent: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "zeroone",
    title: "ZeroOne",
    category: "Mobile",
    tagline: "A local-services super app for booking salon, beauty, and car-wash professionals in one place.",
    tags: ["React Native", "Booking Engine", "Local Services"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219510/pixelstack/projects/zeroone.png",
    accent: "#7C3AED",
  },
  {
    slug: "shree-mahadev-travels",
    title: "Shree Mahadev Travels",
    category: "Web",
    tagline: "A taxi & travel booking website for spiritual journeys across Ujjain, Omkareshwar, and Indore.",
    tags: ["Next.js", "Booking", "SEO"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219511/pixelstack/projects/shree-mahadev-travels.png",
    accent: "#D4A017",
  },
  {
    slug: "arihant-cables",
    title: "Arihant Cables",
    category: "Web",
    tagline: "A B2B distributor website for POLYCAB wires & cables with a clean, product-first design.",
    tags: ["Web Design", "B2B", "Product Catalog"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219512/pixelstack/projects/arihant-cables.png",
    accent: "#F97316",
  },
  {
    slug: "leadbroo",
    title: "Leadbroo",
    category: "AI Products",
    tagline: "An AI web-scraping product delivering high-accuracy data extraction across web, maps, and social.",
    tags: ["AI Product", "Automation", "SaaS"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219513/pixelstack/projects/leadbroo.png",
    images: [
      "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219514/pixelstack/projects/leadbroo-login.png",
      "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219515/pixelstack/projects/leadbroo-dashboard.png",
      "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219513/pixelstack/projects/leadbroo.png",
    ],
    accent: "#22D3EE",
  },
  {
    slug: "linen-mantra",
    title: "Linen Mantra",
    category: "Web",
    tagline: "A premium textile brand site showcasing linen fabric collections and 35+ years of craftsmanship.",
    tags: ["Web Design", "E-Commerce", "Branding"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219516/pixelstack/projects/linen-mantra.png",
    images: [
      "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219517/pixelstack/projects/linen-mantra-collections.png",
      "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219518/pixelstack/projects/linen-mantra-logo.png",
      "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219516/pixelstack/projects/linen-mantra.png",
    ],
    accent: "#7A6C2E",
  },
  {
    slug: "terra-shoppy",
    title: "Terra Shoppy",
    category: "Web",
    tagline: "A feature-rich online grocery marketplace with secure checkout and a seamless shopping flow.",
    tags: ["E-Commerce", "Next.js", "Payments"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219519/pixelstack/projects/terra-shoppy.png",
    images: [
      "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219520/pixelstack/projects/terra-shoppy-basket.png",
      "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219521/pixelstack/projects/terra-shoppy-store.png",
      "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219519/pixelstack/projects/terra-shoppy.png",
    ],
    accent: "#DC2626",
  },
  {
    slug: "govind-industries",
    title: "Govind Industries",
    category: "Web",
    tagline: "A manufacturer website for calibration gas equipment, built for global B2B credibility.",
    tags: ["Web Design", "B2B", "Manufacturing"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219521/pixelstack/projects/govind-industries.png",
    accent: "#2563EB",
  },
  {
    slug: "allied-industries",
    title: "Allied Industries",
    category: "Web",
    tagline: "A pharmaceutical process-equipment manufacturer site engineered for precision and trust.",
    tags: ["Web Design", "B2B", "Industrial"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219522/pixelstack/projects/allied-industries.png",
    accent: "#15803D",
  },
  {
    slug: "royal-steel-india",
    title: "Royal Steel India",
    category: "Web",
    tagline: "A global export site for a fasteners and pipe-fittings manufacturer with 25+ years in business.",
    tags: ["Web Design", "B2B", "Export"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219523/pixelstack/projects/royal-steel-india.png",
    accent: "#B91C1C",
  },
  {
    slug: "ramdas-power",
    title: "Ramdas Power Innovations",
    category: "Web",
    tagline: "An authorised Schneider Electric distributor site for low-voltage switchgear solutions.",
    tags: ["Web Design", "B2B", "Electrical"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219524/pixelstack/projects/ramdas-power.png",
    accent: "#EA580C",
  },
  {
    slug: "rankhelper",
    title: "RankHelper",
    category: "AI Products",
    tagline: "An AI-powered SEO suite covering keyword research, content generation, and technical audits.",
    tags: ["AI Product", "SEO", "SaaS"],
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219525/pixelstack/projects/rankhelper.png",
    accent: "#7C3AED",
  },
];

export const CATEGORIES: (Category | "All")[] = [
  "All",
  "Web",
  "Mobile",
  "AI Products",
];
