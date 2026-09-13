import type { Metadata } from "next";
import { Inter, Outfit, Caveat } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE, SITE_URL } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — Websites, Mobile Apps & AI Products`,
    template: `%s — ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [
    "PixelStack Technologies",
    "web development agency",
    "mobile app development",
    "AI automation",
    "AI products",
    "SEO services",
    "software security",
    "Next.js development",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE.name} — Websites, Mobile Apps & AI Products`,
    description: SITE.description,
    siteName: SITE.name,
    images: ["https://res.cloudinary.com/zxmmvaju/image/upload/v1789219498/pixelstack/brand/pixelstack-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Websites, Mobile Apps & AI Products`,
    description: SITE.description,
    images: ["https://res.cloudinary.com/zxmmvaju/image/upload/v1789219498/pixelstack/brand/pixelstack-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${outfit.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE.name,
              url: SITE_URL,
              logo: "https://res.cloudinary.com/zxmmvaju/image/upload/v1789219498/pixelstack/brand/pixelstack-logo.png",
              description: SITE.description,
              email: SITE.email,
              telephone: SITE.phone,
              sameAs: Object.values(SITE.social),
            }),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
