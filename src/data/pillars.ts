export type Pillar = {
  key: string;
  title: string;
  icon: string;
  description: string;
  stat: string;
  image?: string;
};

export const PILLARS: Pillar[] = [
  {
    key: "performance",
    title: "Performance",
    icon: "Gauge",
    description:
      "Sub-second load times and buttery-smooth interactions. We obsess over Core Web Vitals so every product feels instant.",
    stat: "90+ Lighthouse",
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219506/pixelstack/pillars/pillar-performance.png",
  },
  {
    key: "seo",
    title: "SEO",
    icon: "TrendingUp",
    description:
      "Search-first architecture from day one — semantic markup, structured data, and content strategy built in, not bolted on.",
    stat: "Search-Ready",
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219507/pixelstack/pillars/pillar-seo.png",
  },
  {
    key: "security",
    title: "Security",
    icon: "ShieldCheck",
    description:
      "Hardened infrastructure, secure auth, and continuous monitoring baked into every layer of the stack from day one.",
    stat: "24/7 Monitoring",
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219508/pixelstack/pillars/pillar-security.png",
  },
  {
    key: "maintenance",
    title: "Maintenance",
    icon: "Wrench",
    description:
      "Launch day isn't the finish line. We patch, update, and optimize every product long after it ships, so it keeps running flawlessly.",
    stat: "Post-Launch Care",
    image: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219509/pixelstack/pillars/pillar-maintenance.png",
  },
];
