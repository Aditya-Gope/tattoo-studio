import Container from "@/components/ui/Container";
import { studio } from "@/lib/content";

// Placeholder Instagram post data — replace with real posts
const placeholderPosts = [
  { id: "1", url: studio.instagramUrl || "https://instagram.com/yourhandle", image: "/images/portfolio/tattoo-01.webp", alt: "Instagram post 1" },
  { id: "2", url: studio.instagramUrl || "https://instagram.com/yourhandle", image: "/images/portfolio/tattoo-02.webp", alt: "Instagram post 2" },
  { id: "3", url: studio.instagramUrl || "https://instagram.com/yourhandle", image: "/images/portfolio/tattoo-03.webp", alt: "Instagram post 3" },
  { id: "4", url: studio.instagramUrl || "https://instagram.com/yourhandle", image: "/images/portfolio/tattoo-04.webp", alt: "Instagram post 4" },
  { id: "5", url: studio.instagramUrl || "https://instagram.com/yourhandle", image: "/images/portfolio/tattoo-05.webp", alt: "Instagram post 5" },
  { id: "6", url: studio.instagramUrl || "https://instagram.com/yourhandle", image: "/images/portfolio/tattoo-06.webp", alt: "Instagram post 6" },
];

export default function InstagramStrip() {
  const instagramUrl =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? studio.instagramUrl;

  return (
    <section
      className="py-16 bg-charcoal border-t border-border-subtle"
      aria-label="Instagram gallery"
    >
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] mb-1">
              INSTAGRAM
            </p>
            <p className="text-warm-bone font-editorial italic text-xl">
              {studio.instagramHandle || "@yourhandle"}
            </p>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey hover:text-warm-bone transition-colors duration-200"
            aria-label={`Follow ${studio.name || "the studio"} on Instagram`}
          >
            FOLLOW US ↗
          </a>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {placeholderPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={post.alt}
              className="block aspect-square overflow-hidden rounded bg-ink-black group focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </a>
          ))}
        </div>

        <p className="mt-4 text-smoke-grey/50 text-[0.65rem] text-center font-mono-brand tracking-widest">
          REPLACE PLACEHOLDERS WITH REAL INSTAGRAM POST LINKS
        </p>
      </Container>
    </section>
  );
}
