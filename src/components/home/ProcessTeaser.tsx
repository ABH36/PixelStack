import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { OutlineLink } from "@/components/shared/OutlineLink";
import { ProcessPath } from "./ProcessPath";

export function ProcessTeaser() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-custom">
        <SectionHeading
          eyebrow="How We Work"
          title="A clear path from idea to launch"
          description="Six focused stages. No guesswork, no black boxes — you always know what's next."
        />

        <div className="mt-16 lg:mt-20">
          <ProcessPath />
        </div>

        <Reveal delay={0.2} className="mt-10 flex justify-center lg:mt-16">
          <OutlineLink href="/process">See the full process</OutlineLink>
        </Reveal>
      </div>
    </section>
  );
}
