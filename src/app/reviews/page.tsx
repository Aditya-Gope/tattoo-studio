import type { Metadata } from "next";
import Link from "next/link";
import { studio, reviews, videoReviews } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: `Reviews | ${studio.name}`,
  description: `Read genuine reviews from clients of ${studio.name}. Real feedback from real people — sourced directly from Instagram and Google.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const hasText = reviews.length > 0;
  const hasVideo = videoReviews.length > 0;

  return (
    <main className="pt-24 pb-24 lg:pt-32 bg-ink-black min-h-screen">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex gap-2 font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey">
            <li><Link href="/" className="hover:text-warm-bone transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-warm-bone">Reviews</li>
          </ol>
        </nav>

        <SectionHeading
          eyebrow="Client Feedback"
          heading="What People Say"
          subheading="All reviews are from genuine clients and are sourced directly from Instagram or Google. We do not fabricate or alter feedback."
          className="mb-14"
        />

        {/* Text reviews */}
        {hasText ? (
          <section aria-label="Written reviews" className="mb-20">
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] mb-8">
              WRITTEN REVIEWS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <div key={i} className="border border-border-subtle rounded p-6 bg-charcoal/30 flex flex-col gap-4">
                  <blockquote className="text-smoke-grey text-sm leading-relaxed italic flex-1">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <footer>
                    <p className="text-warm-bone text-sm font-medium">{review.name}</p>
                    <a
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-brand text-smoke-grey text-[0.6rem] tracking-widest hover:text-warm-bone transition-colors"
                    >
                      {review.source} ↗
                    </a>
                  </footer>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="mb-20 border border-border-subtle rounded p-10 text-center">
            <p className="text-smoke-grey text-sm">
              Written reviews will appear here once provided with customer consent.
            </p>
          </div>
        )}

        {/* Video reviews */}
        {hasVideo ? (
          <section aria-label="Video reviews">
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] mb-8">
              VIDEO REVIEWS
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoReviews.map((review, i) => (
                <div key={i} className="border border-border-subtle rounded overflow-hidden bg-charcoal/30">
                  <div className="aspect-video bg-charcoal flex items-center justify-center">
                    {review.hasPermission ? (
                      <a
                        href={review.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full flex items-center justify-center text-smoke-grey hover:text-warm-bone transition-colors"
                        aria-label={`View video review by ${review.name} on Instagram`}
                      >
                        <div className="text-center">
                          <p className="font-mono-brand text-[0.65rem] tracking-widest mb-2">VIDEO REVIEW</p>
                          <p className="text-xs">View on Instagram ↗</p>
                        </div>
                      </a>
                    ) : (
                      <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest text-center px-4">
                        PERMISSION PENDING
                      </p>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-warm-bone text-sm font-medium">{review.name}</p>
                    <p className="text-smoke-grey text-xs mt-1">{review.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="border border-border-subtle rounded p-10 text-center">
            <p className="text-smoke-grey text-sm">
              Video reviews will appear here once customer permission has been confirmed.
            </p>
          </div>
        )}

        <p className="mt-10 text-smoke-grey/50 text-xs text-center font-mono-brand tracking-widest">
          NO FAKE REVIEW MARKUP OR FABRICATED RATINGS ARE USED ON THIS SITE
        </p>
      </Container>
    </main>
  );
}
