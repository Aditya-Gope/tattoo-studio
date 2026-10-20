import type { Metadata } from "next";
import Link from "next/link";
import { studio } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: `The Studio | ${studio.name}`,
  description: `Explore our tattoo studio — a calm, clean space designed for precision work and a great experience in ${studio.city}.`,
  alternates: { canonical: "/studio" },
};

const studioImages = [
  { alt: "Studio exterior", src: "/images/location/location-exterior.webp" },
  { alt: "Reception area", src: "/images/hygiene/clean-workstation.webp" },
  { alt: "Tattoo workstation", src: "/images/story/story-artist-working.webp" },
  { alt: "Equipment preparation", src: "/images/hygiene/glove-preparation.webp" },
  { alt: "Clean work surfaces", src: "/images/hygiene/sealed-supplies.webp" },
  { alt: "Aftercare kit", src: "/images/story/story-tattoo-closeup.webp" },
];

export default function StudioPage() {
  return (
    <main className="pt-24 pb-24 lg:pt-32 bg-ink-black min-h-screen">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex gap-2 font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey">
            <li><Link href="/" className="hover:text-warm-bone transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-warm-bone">Studio</li>
          </ol>
        </nav>

        <SectionHeading
          eyebrow="Our Space"
          heading="The Studio"
          subheading="A calm, professional environment designed around your comfort and safety."
          className="mb-14"
        />

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {studioImages.map((img, i) => (
            <div
              key={i}
              className={`rounded overflow-hidden bg-charcoal ${i === 0 ? "sm:col-span-2 lg:col-span-1 aspect-video lg:aspect-square" : "aspect-square"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* About the space */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <div>
            <h2 className="font-editorial text-warm-bone text-3xl italic mb-6">A Space Built for Great Work</h2>
            <p className="text-smoke-grey text-sm leading-relaxed mb-4">
              Our studio is designed to put you at ease from the moment you arrive. Clean, calm and properly equipped — every aspect of the environment is set up to produce the best possible results.
            </p>
            <p className="text-smoke-grey text-sm leading-relaxed">
              Every workstation is prepared fresh before each client. Equipment is sterile. The entire space is maintained to a professional standard that we are proud to show.
            </p>
          </div>
          <div>
            <h2 className="font-editorial text-warm-bone text-3xl italic mb-6">What to Expect</h2>
            <ul className="space-y-3 text-smoke-grey text-sm">
              {[
                "Private consultation before every appointment",
                "Clean, well-lit workstation prepared for you",
                "Friendly, professional team throughout",
                "No rush — we work at the right pace for quality",
                "Written aftercare instructions at the end of every session",
              ].map((point) => (
                <li key={point} className="flex gap-3 items-start">
                  <span className="text-oxblood mt-1" aria-hidden="true">—</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/book" variant="primary" size="md">Book a Consultation</Button>
          <Button href="/aftercare" variant="secondary" size="md">Aftercare Guide</Button>
        </div>
      </Container>
    </main>
  );
}
