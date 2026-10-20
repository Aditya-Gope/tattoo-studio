import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { artists } from "@/lib/content";

export default function ArtistIntro() {
  const hasArtists = artists.length > 0 && artists[0].name !== "[ARTIST NAME]";

  return (
    <section className="py-24 lg:py-32 bg-ink-black" aria-label="Meet the artists">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow="The Artists"
            heading="Meet the Team"
            subheading="Skilled tattoo artists with distinct styles and shared dedication to original, meaningful work."
          />
          <Button href="/artists" variant="secondary" size="sm" className="shrink-0">
            All Artists
          </Button>
        </div>

        {hasArtists ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <ArtistCard key={artist.name} artist={artist} />
            ))}
          </div>
        ) : (
          <ArtistPlaceholder />
        )}
      </Container>
    </section>
  );
}

function ArtistCard({ artist }: { artist: (typeof artists)[0] }) {
  const slug = artist.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");

  return (
    <Link
      href={`/artists/${slug}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone rounded"
    >
      {/* Portrait */}
      <div className="aspect-[3/4] rounded overflow-hidden bg-charcoal mb-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artist.image || "/images/placeholder-artist.svg"}
          alt={`${artist.name}, ${artist.role}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-1">
        {artist.role}
      </p>
      <h3 className="font-editorial text-warm-bone text-2xl italic mb-2 group-hover:text-white transition-colors duration-200">
        {artist.name}
      </h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {artist.specialities.map((s) => (
          <span
            key={s}
            className="font-mono-brand text-smoke-grey text-[0.6rem] tracking-widest border border-border-subtle px-2 py-1"
          >
            {s}
          </span>
        ))}
      </div>
      {artist.experience && (
        <p className="text-smoke-grey text-xs">{artist.experience} experience</p>
      )}
    </Link>
  );
}

function ArtistPlaceholder() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1].map((i) => (
        <div key={i}>
          <div className="aspect-[3/4] rounded bg-charcoal border border-border-subtle flex items-center justify-center mb-5">
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest text-center px-6">
              ARTIST PORTRAIT<br />PLACEHOLDER
            </p>
          </div>
          <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-1">
            TATTOO ARTIST
          </p>
          <p className="font-editorial text-warm-bone text-2xl italic mb-2">
            [Artist Name]
          </p>
          <p className="text-smoke-grey text-xs">
            Artist biography and specialities to be added.
          </p>
        </div>
      ))}
    </div>
  );
}
