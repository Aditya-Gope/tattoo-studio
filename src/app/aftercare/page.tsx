import type { Metadata } from "next";
import Link from "next/link";
import { studio } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: `Aftercare Guide | ${studio.name}`,
  description: `Proper tattoo aftercare instructions from ${studio.name}. Follow these steps to ensure your tattoo heals beautifully.`,
  alternates: { canonical: "/aftercare" },
};

const stages = [
  {
    period: "Day 1–3",
    title: "Initial Healing",
    steps: [
      "Leave the initial covering on for the time advised by your artist (typically 2–4 hours).",
      "Gently wash the tattoo with unscented antibacterial soap and lukewarm water.",
      "Pat dry with a clean paper towel — do not rub.",
      "Apply a thin layer of the recommended aftercare product.",
      "Repeat washing and moisturising 2–3 times per day.",
    ],
  },
  {
    period: "Day 4–14",
    title: "Peeling Phase",
    steps: [
      "Continue washing and moisturising gently.",
      "Do not pick, scratch or peel the skin.",
      "Some flaking is completely normal — let it fall away naturally.",
      "Keep the tattoo out of direct sunlight.",
      "Avoid swimming, soaking in baths or hot tubs.",
    ],
  },
  {
    period: "Week 3–4",
    title: "Final Healing",
    steps: [
      "The skin will appear fully healed but deeper layers are still healing.",
      "Continue applying moisturiser when the skin feels dry.",
      "Begin using SPF 50+ sunscreen when the tattoo is exposed to sun.",
      "Avoid tanning beds for at least 4 weeks.",
    ],
  },
  {
    period: "Long Term",
    title: "Ongoing Care",
    steps: [
      "Use sunscreen on your tattoo whenever it is exposed to the sun.",
      "Keep the skin moisturised for vivid, lasting colour.",
      "Contact the studio if you have any concerns about healing.",
    ],
  },
];

export default function AftercarePage() {
  return (
    <main className="pt-24 pb-24 lg:pt-32 bg-ink-black min-h-screen">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex gap-2 font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey">
            <li><Link href="/" className="hover:text-warm-bone transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-warm-bone">Aftercare</li>
          </ol>
        </nav>

        <SectionHeading
          eyebrow="Aftercare"
          heading="Caring for Your Tattoo"
          subheading="Your tattoo is an investment. Proper aftercare determines how it heals and how it looks for years to come."
          className="mb-4"
        />

        <p className="text-smoke-grey/60 text-xs font-mono-brand tracking-widest mb-14">
          THESE ARE GENERAL GUIDELINES. YOUR ARTIST MAY PROVIDE ADDITIONAL SPECIFIC INSTRUCTIONS.
        </p>

        <div className="space-y-12 max-w-3xl">
          {stages.map((stage) => (
            <div key={stage.period} className="border-t border-border-subtle pt-10">
              <div className="flex gap-6 items-start mb-6">
                <span className="font-mono-brand text-oxblood text-[0.65rem] tracking-widest w-20 shrink-0 pt-1">{stage.period}</span>
                <h2 className="font-editorial text-warm-bone text-2xl italic">{stage.title}</h2>
              </div>
              <ul className="space-y-3 ml-26" style={{ marginLeft: "6.5rem" }}>
                {stage.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-smoke-grey text-sm leading-relaxed">
                    <span className="text-oxblood mt-1 shrink-0" aria-hidden="true">—</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 p-8 border border-border-subtle rounded bg-charcoal/30">
          <p className="text-smoke-grey text-sm leading-relaxed mb-4">
            <strong className="text-warm-bone">Have a question?</strong> If you are concerned about how your tattoo is healing, contact us directly. We are happy to advise — free of charge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={`mailto:${studio.email}`} variant="secondary" size="sm" external>
              Email the Studio
            </Button>
            <Button href={`https://wa.me/${studio.whatsappNumber}`} variant="ghost" size="sm" external>
              WhatsApp Us
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
