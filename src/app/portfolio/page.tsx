import type { Metadata } from "next";
import { studio, featuredPortfolio, tattooStyles } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import { cn } from "@/lib/utils";


export const metadata: Metadata = {
  title: `Portfolio | ${studio.name}`,
  description: `Explore our tattoo portfolio — fine line, blackwork, realism, geometric and more. All work is original and created in our studio.`,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: `Portfolio | ${studio.name}`,
    description: `Explore original tattoo work from our studio in ${studio.city}.`,
    url: "/portfolio",
  },
};

const filters = ["All", ...tattooStyles];

export default function PortfolioPage() {
  return (
    <main className="pt-24 pb-24 lg:pt-32 lg:pb-32 bg-ink-black min-h-screen">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex gap-2 font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey">
            <li><Link href="/" className="hover:text-warm-bone transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-warm-bone">Portfolio</li>
          </ol>
        </nav>

        <SectionHeading
          eyebrow="Our Work"
          heading="The Portfolio"
          subheading={`Every tattoo created in our studio is original. Browse by style or view the full collection.`}
          className="mb-12"
        />

        {/* Style filters — client-side filtering would be added here */}
        <div role="group" aria-label="Filter by style" className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <a
              key={f}
              href={f === "All" ? "/portfolio" : `/portfolio?style=${encodeURIComponent(f)}`}
              className={cn(
                "px-4 py-2 font-mono-brand text-[0.65rem] tracking-widest border transition-colors duration-200 min-h-[44px] flex items-center",
                f === "All"
                  ? "border-warm-bone text-warm-bone bg-warm-bone/5"
                  : "border-border-subtle text-smoke-grey hover:border-smoke-grey"
              )}
            >
              {f}
            </a>
          ))}
        </div>

        {/* Grid */}
        {featuredPortfolio.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {featuredPortfolio.map((item, i) => (
              <div key={item.slug} className="break-inside-avoid">
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="group block relative overflow-hidden rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone"
                  aria-label={`View ${item.title} — ${item.style}`}
                >
                  <div className={cn(
                    "overflow-hidden bg-charcoal",
                    i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
                  )}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image || "/images/placeholder-tattoo.svg"}
                      alt={item.alt || item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-ink-black/0 group-hover:bg-ink-black/50 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <div>
                      <p className="font-mono-brand text-warm-bone text-[0.65rem] tracking-widest">{item.style}</p>
                      <p className="text-smoke-grey text-xs mt-1">{item.artist}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <PortfolioPlaceholder />
        )}
      </Container>
    </main>
  );
}

function PortfolioPlaceholder() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="break-inside-avoid">
          <div className={cn(
            "bg-charcoal rounded border border-border-subtle flex items-center justify-center",
            i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
          )}>
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest text-center px-4">
              TATTOO PHOTO<br />PLACEHOLDER
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
