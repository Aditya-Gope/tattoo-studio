"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { reviews, videoReviews } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function ReviewsSection() {
  const [tab, setTab] = useState<"text" | "video">("text");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<(typeof videoReviews)[0] | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  const hasTextReviews = reviews.length > 0;
  const hasVideoReviews = videoReviews.length > 0;

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [modalOpen]);

  const scrollPrev = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  
  const scrollNext = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const openVideoModal = (review: (typeof videoReviews)[0]) => {
    setActiveVideo(review);
    setModalOpen(true);
  };

  const closeVideoModal = () => {
    setModalOpen(false);
    setActiveVideo(null);
  };

  return (
    <section className="py-24 lg:py-32 bg-charcoal relative" aria-label="Customer reviews">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <SectionHeading
            eyebrow="Reviews"
            heading="What Clients Say"
            subheading="Genuine feedback from real customers. All reviews are sourced directly from Instagram or Google."
          />
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Review type"
          className="flex gap-1 mb-10 border-b border-border-subtle"
        >
          <TabButton active={tab === "text"} onClick={() => setTab("text")} id="tab-text">
            Written Reviews
          </TabButton>
          <TabButton active={tab === "video"} onClick={() => setTab("video")} id="tab-video">
            Video Reviews
          </TabButton>
        </div>

        {/* Text Reviews Carousel */}
        <div
          role="tabpanel"
          id="panel-text"
          aria-labelledby="tab-text"
          hidden={tab !== "text"}
        >
          {hasTextReviews ? (
            <div className="relative group">
              <div 
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {reviews.map((review, i) => (
                  <div key={i} className="snap-start shrink-0 w-[280px] sm:w-[320px]">
                    <TextReviewCard review={review} />
                  </div>
                ))}
              </div>
              
              <button 
                onClick={scrollPrev}
                className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-ink-black/90 border border-border-subtle rounded-full flex items-center justify-center text-warm-bone opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 disabled:opacity-0 hidden sm:flex"
                aria-label="Previous review"
              >
                ←
              </button>
              <button 
                onClick={scrollNext}
                className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-ink-black/90 border border-border-subtle rounded-full flex items-center justify-center text-warm-bone opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 hidden sm:flex"
                aria-label="Next review"
              >
                →
              </button>
            </div>
          ) : (
            <ReviewPlaceholder type="text" />
          )}
        </div>

        {/* Video Reviews Grid */}
        <div
          role="tabpanel"
          id="panel-video"
          aria-labelledby="tab-video"
          hidden={tab !== "video"}
        >
          {hasVideoReviews ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoReviews.slice(0, 3).map((review, i) => (
                <VideoReviewCard key={i} review={review} onClick={() => openVideoModal(review)} />
              ))}
            </div>
          ) : (
            <ReviewPlaceholder type="video" />
          )}
        </div>
      </Container>

      {/* Video Modal */}
      {modalOpen && activeVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-black/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative w-full max-w-lg bg-charcoal border border-border-subtle rounded shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <button
              type="button"
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-ink-black/80 rounded-full text-warm-bone hover:text-oxblood transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone"
              aria-label="Close modal"
            >
              ✕
            </button>
            
            <div className="aspect-[9/16] sm:aspect-video w-full bg-ink-black relative flex items-center justify-center">
              {/* Concept Demo Visual */}
              <Image 
                src={activeVideo.poster || "/images/placeholder-tattoo.svg"}
                alt={activeVideo.caption}
                fill
                className="object-cover opacity-40"
              />
              <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
                <div className="w-12 h-12 border border-warm-bone/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-warm-bone" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono-brand text-warm-bone text-[0.65rem] tracking-widest mb-2" id="modal-title">CONCEPT DEMO</p>
                  <p className="text-smoke-grey text-sm">Real Instagram Reels will load natively here.</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 shrink-0 overflow-y-auto">
              <p className="text-warm-bone text-base font-medium mb-1">{activeVideo.name}</p>
              <p className="text-smoke-grey text-sm">{activeVideo.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Sub-components ───────────────────────────────────────────────── */

function TabButton({
  children,
  active,
  onClick,
  id,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  id: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "font-mono-brand text-[0.65rem] tracking-widest px-5 py-3 border-b-2 -mb-px transition-colors duration-200 min-h-[44px]",
        active
          ? "border-warm-bone text-warm-bone"
          : "border-transparent text-smoke-grey hover:text-warm-bone"
      )}
    >
      {children}
    </button>
  );
}

function TextReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="border border-border-subtle rounded p-6 flex flex-col gap-4 bg-ink-black/40 h-full">
      <div className="flex gap-0.5" aria-label="5 star review" role="img">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-3 h-3 text-warm-bone/60" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
      <blockquote className="text-smoke-grey text-sm leading-relaxed italic flex-1">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <footer>
        <p className="text-warm-bone text-sm font-medium">{review.name}</p>
        <p className="font-mono-brand text-smoke-grey text-[0.6rem] tracking-widest mt-1">
          {review.source}
        </p>
      </footer>
    </div>
  );
}

function VideoReviewCard({ review, onClick }: { review: (typeof videoReviews)[0]; onClick: () => void }) {
  return (
    <div className="border border-border-subtle rounded overflow-hidden bg-ink-black/40 group">
      <button
        type="button"
        onClick={onClick}
        className="block w-full aspect-[4/5] bg-charcoal relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone"
        aria-label={`Play video review by ${review.name} — ${review.caption}`}
      >
        <Image
          src={review.poster || "/images/placeholder-tattoo.svg"}
          alt={`Video review by ${review.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-ink-black/40 group-hover:bg-ink-black/20 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-warm-bone/10 border border-warm-bone/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-warm-bone ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
          </div>
        </div>
      </button>
      <div className="p-4">
        <p className="text-warm-bone text-sm font-medium">{review.name}</p>
        <p className="text-smoke-grey text-xs mt-1 truncate">{review.caption}</p>
      </div>
    </div>
  );
}

function ReviewPlaceholder({ type }: { type: "text" | "video" }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: type === "text" ? 3 : 3 }).map((_, i) => (
        <div key={i} className="border border-border-subtle rounded p-6 bg-ink-black/40">
          <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-4">
            {type === "text" ? "WRITTEN REVIEW" : "VIDEO REVIEW"}
          </p>
          <p className="text-smoke-grey text-xs leading-relaxed">
            {type === "text"
              ? "[Real customer review will appear here once provided with consent.]"
              : "[Video review will appear here once permission is confirmed.]"}
          </p>
        </div>
      ))}
    </div>
  );
}
