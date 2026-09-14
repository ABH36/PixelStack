import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/data/nav";
import { SITE } from "@/lib/utils";

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.56V9H3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.35-3.87-1.35-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.09 0 4.41-2.7 5.39-5.27 5.67.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-surface-2 text-surface">
      <span className="giant-text absolute -bottom-4 left-1/2 -translate-x-1/2 text-[16vw] opacity-[0.07]" style={{ WebkitTextStroke: "1.5px #f8f7f4" }}>
        PIXELSTACK
      </span>
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full glow-orb opacity-30" />

      <div className="container-custom relative py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="https://res.cloudinary.com/zxmmvaju/image/upload/v1789219497/pixelstack/brand/pixelstack-mark-transparent.png"
                alt="PixelStack Technologies"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-lg font-black uppercase tracking-tight text-surface">
                PixelStack
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-surface/70">
              {SITE.description}
            </p>
            <p className="mt-4 text-center font-script text-2xl text-primary-light lg:text-left">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-surface">Navigate</h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface/70 transition-colors hover:text-primary-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-surface">Focus Areas</h3>
            <ul className="mt-4 space-y-3">
              {["Performance", "SEO", "Security", "Maintenance"].map((item) => (
                <li key={item} className="text-sm text-surface/70">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm font-bold uppercase tracking-wide text-surface">Get in Touch</h3>
            <div className="mt-4 flex items-start justify-between gap-6 lg:contents">
              <ul className="space-y-3 lg:mt-4">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-2 text-sm text-surface/70 transition-colors hover:text-primary-light"
                  >
                    <Mail className="h-4 w-4" />
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-surface/70 transition-colors hover:text-primary-light"
                  >
                    <Phone className="h-4 w-4" />
                    {SITE.phone}
                  </a>
                </li>
              </ul>
              <div className="flex items-center gap-3 lg:mt-5">
                {[
                  { icon: LinkedInIcon, href: SITE.social.linkedin, label: "LinkedIn" },
                  { icon: InstagramIcon, href: SITE.social.instagram, label: "Instagram" },
                  { icon: GitHubIcon, href: SITE.social.github, label: "GitHub" },
                ].map(({ icon: IconCmp, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-surface/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-light"
                  >
                    <IconCmp className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-surface/15 pt-8 sm:flex-row">
          <p className="text-xs text-surface/50">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-light hover:underline"
          >
            Let&apos;s build something extraordinary
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
