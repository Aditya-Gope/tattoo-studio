import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { artists, studio, featuredPortfolio } from "@/lib/content";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { slugify } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return artists.map((a) => ({ slug: slugify(a.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = artists.find((a) => slugify(a.name) === slug);
  if (!artist) return {};
  return {
    title: `${artist.name} | Artists | ${studio.name}`,
    description: `${artist.name} is a ${artist.role} specialising in ${artist.specialities.join(" and ")} at ${studio.name}.`,
    alternates: { canonical: `/artists/${slug}` },
  };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = artists.find((a) => slugify(a.name) === slug);
  if (!artist) notFound();

  const artistWork = featuredPortfolio.filter((p) => p.artist === artist.name);

  return (
    <main className="pt-24 pb-24 lg:pt-32 bg-ink-black min-h-screen">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex gap-2 font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey flex-wrap">
            <li><Link href="/" className="hover:text-warm-bone transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/artists" className="hover:text-warm-bone transition-colors">Artists</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-warm-bone">{artist.name}</li>
          </ol>
        </nav>

        {/* Artist header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-start">
          <div className="aspect-[3/4] rounded overflow-hidden bg-charcoal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={artist.image || "/images/placeholder-artist.svg"}
              alt={`${artist.name}, ${artist.role}`}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
          </div>

          <div className="space-y-6">
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em]">{artist.role}</p>
            <h1 className="font-editorial headline-lg text-warm-bone italic">{artist.name}</h1>

            <div className="flex flex-wrap gap-2">
              {artist.specialities.map((s) => (
                <span key={s} className="font-mono-brand text-smoke-grey text-[0.6rem] tracking-widest border border-border-subtle px-3 py-1.5">
                  {s}
                </span>
              ))}
            </div>

            {artist.experience && (
              <p className="text-smoke-grey text-sm">{artist.experience} of experience</p>
            )}

            {artist.bio && (
              <p className="text-smoke-grey text-sm leading-relaxed max-w-lg">{artist.bio}</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button href="/book" variant="primary" size="md">
                Book a Consultation
              </Button>
              {artist.instagramUrl && (
                <Button href={artist.instagramUrl} variant="secondary" size="md" external>
                  Instagram ↗
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Artist work */}
        {artistWork.length > 0 && (
          <div>
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] mb-8">
              SELECTED WORK
            </p>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {artistWork.map((item) => (
                <div key={item.slug} className="break-inside-avoid">
                  <Link href={`/portfolio/${item.slug}`} className="group block overflow-hidden rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone">
                    <div className="aspect-[3/4] overflow-hidden bg-charcoal">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image || "/images/placeholder-tattoo.svg"}
                        alt={item.alt || item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
