import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { featuredPortfolio, studio } from "@/lib/content";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return featuredPortfolio.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = featuredPortfolio.find((p) => p.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | Portfolio | ${studio.name}`,
    description: item.alt || `${item.style} tattoo by ${item.artist} at ${studio.name}.`,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      title: item.title,
      description: item.alt || `${item.style} by ${item.artist}`,
      url: `/portfolio/${slug}`,
    },
  };
}

export default async function PortfolioItemPage({ params }: Props) {
  const { slug } = await params;
  const item = featuredPortfolio.find((p) => p.slug === slug);
  if (!item) notFound();

  const currentIndex = featuredPortfolio.indexOf(item);
  const prev = featuredPortfolio[currentIndex - 1];
  const next = featuredPortfolio[currentIndex + 1];

  return (
    <main className="pt-24 pb-24 lg:pt-32 bg-ink-black min-h-screen">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex gap-2 font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey flex-wrap">
            <li><Link href="/" className="hover:text-warm-bone transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/portfolio" className="hover:text-warm-bone transition-colors">Portfolio</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-warm-bone">{item.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <div className="aspect-[3/4] rounded overflow-hidden bg-charcoal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image || "/images/placeholder-tattoo.svg"}
              alt={item.alt || item.title}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] mb-3">
                {item.style}
              </p>
              <h1 className="font-editorial headline-md text-warm-bone italic mb-4">
                {item.title}
              </h1>
              {item.description && (
                <p className="text-smoke-grey text-sm leading-relaxed">{item.description}</p>
              )}
            </div>

            <dl className="space-y-3 border-t border-border-subtle pt-6">
              <div className="flex gap-4">
                <dt className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest w-28 shrink-0">ARTIST</dt>
                <dd className="text-warm-bone text-sm">{item.artist}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest w-28 shrink-0">STYLE</dt>
                <dd className="text-warm-bone text-sm">{item.style}</dd>
              </div>
              {item.placement && (
                <div className="flex gap-4">
                  <dt className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest w-28 shrink-0">PLACEMENT</dt>
                  <dd className="text-warm-bone text-sm">{item.placement}</dd>
                </div>
              )}
            </dl>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/book" variant="primary" size="md">
                Book a Consultation
              </Button>
              <Button href="/portfolio" variant="secondary" size="md">
                ← Back to Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mt-20 pt-10 border-t border-border-subtle grid grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/portfolio/${prev.slug}`} className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone rounded p-1">
                <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-1">← PREVIOUS</p>
                <p className="font-editorial text-warm-bone italic group-hover:text-white transition-colors">{prev.title}</p>
              </Link>
            ) : <div />}
            {next && (
              <Link href={`/portfolio/${next.slug}`} className="group text-right focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone rounded p-1 ml-auto">
                <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-1">NEXT →</p>
                <p className="font-editorial text-warm-bone italic group-hover:text-white transition-colors">{next.title}</p>
              </Link>
            )}
          </div>
        )}
      </Container>
    </main>
  );
}
