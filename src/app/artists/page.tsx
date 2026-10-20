import type { Metadata } from "next";
import Link from "next/link";
import { artists, studio } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Artists | ${studio.name}`,
  description: `Meet the talented tattoo artists at ${studio.name}. Each artist brings a unique style and philosophy to their work.`,
  alternates: { canonical: "/artists" },
};

export default function ArtistsPage() {
  const hasArtists = artists.length > 0 && artists[0].name !== "[ARTIST NAME]";

  return (
    <main className="pt-24 pb-24 lg:pt-32 bg-ink-black min-h-screen">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex gap-2 font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey">
            <li><Link href="/" className="hover:text-warm-bone transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-warm-bone">Artists</li>
          </ol>
        </nav>

        <SectionHeading
          eyebrow="The Team"
          heading="Our Artists"
          subheading="Each artist has a distinct style and deep expertise. Explore their work and find the right match for your vision."
          className="mb-14"
        />

        {hasArtists ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {artists.map((artist) => (
              <Link
                key={artist.name}
                href={`/artists/${slugify(artist.name)}`}
                className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone rounded"
              >
                <div className="aspect-[3/4] rounded overflow-hidden bg-charcoal mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={artist.image || "/images/placeholder-artist.svg"}
                    alt={`${artist.name}, ${artist.role}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-1">{artist.role}</p>
                <h2 className="font-editorial text-warm-bone text-2xl italic mb-2 group-hover:text-white transition-colors">{artist.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {artist.specialities.map((s) => (
                    <span key={s} className="font-mono-brand text-smoke-grey text-[0.6rem] tracking-widest border border-border-subtle px-2 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div>
              <div className="aspect-[3/4] rounded bg-charcoal border border-border-subtle flex items-center justify-center mb-5">
                <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest text-center px-6">
                  ARTIST PORTRAIT<br />PLACEHOLDER
                </p>
              </div>
              <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-1">TATTOO ARTIST</p>
              <p className="font-editorial text-warm-bone text-2xl italic">[Artist Name]</p>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
