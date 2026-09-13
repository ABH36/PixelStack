import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const SITE_URL = "https://pixelstacktechnologies.com";

export const SITE = {
  name: "PixelStack Technologies",
  shortName: "PixelStack",
  tagline: "Ideas • Design • Build • Grow",
  description:
    "PixelStack Technologies is a modern software studio building high-performance websites, mobile apps, and AI-powered products — engineered for speed, SEO, and security.",
  email: "aabhishekjain53@gmail.com",
  phone: "+91 6232024681",
  whatsappUrl: "https://wa.me/916232024681",
  social: {
    linkedin: "https://linkedin.com/company/pixelstack-technologies",
    instagram: "https://instagram.com/pixelstack.tech",
    github: "https://github.com/pixelstack-technologies",
  },
};
