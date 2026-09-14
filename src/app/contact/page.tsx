import type { Metadata } from "next";
import { Mail, Phone, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GiantText } from "@/components/shared/GiantText";
import { Reveal } from "@/components/shared/Reveal";
import { Accordion } from "@/components/shared/Accordion";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start your project with PixelStack Technologies — tell us about your website, mobile app, or AI product idea.",
};

const FAQS = [
  {
    title: "How do I get started?",
    content:
      "Fill out the form below or email/WhatsApp us directly with a short description of what you want to build. We'll schedule a free discovery call within a business day.",
  },
  {
    title: "How much does a project cost?",
    content:
      "It depends on scope — a marketing website, a full mobile app, and an AI automation product all cost differently. Share your budget range in the form and we'll tell you honestly what's realistic.",
  },
  {
    title: "How long does a typical project take?",
    content:
      "Most websites ship in 2–4 weeks, mobile apps in 6–10 weeks, and AI-powered products vary based on complexity. You'll get a clear timeline after the discovery call.",
  },
  {
    title: "Do you offer support after launch?",
    content:
      "Yes — every project includes an option for ongoing security, maintenance, and monitoring, since we built \"Security & Maintenance\" into our core services, not as an afterthought.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-24">
        <GiantText className="top-16 left-1/2 -translate-x-1/2">CONTACT</GiantText>
        <div className="container-custom relative">
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk about your project"
            description="Fill out the form, or reach us directly — we typically reply within a business day."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <Reveal>
              <div className="flex flex-col gap-5">
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-center gap-4 rounded-2xl card-surface p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta) transition-transform duration-300 group-hover:scale-105">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">Email</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{SITE.email}</p>
                  </div>
                </a>

                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl card-surface p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta) transition-transform duration-300 group-hover:scale-105">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">
                      Call / WhatsApp
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{SITE.phone}</p>
                  </div>
                </a>

                <div className="group flex items-center gap-4 rounded-2xl card-surface p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary-light to-primary-dark text-white shadow-(--shadow-cta) transition-transform duration-300 group-hover:scale-105">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">
                      Response time
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      Within 1 business day
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-custom max-w-3xl">
          <SectionHeading
            eyebrow="Questions & Answers"
            title="Before you reach out"
            className="mb-14"
          />
          <Accordion items={FAQS} defaultOpen={0} />
        </div>
      </section>
    </>
  );
}
