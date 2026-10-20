"use client";

import { useState, useCallback } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { AnimatedButton } from "@/components/ui/animations/AnimatedButton";
import { featuredPortfolio, tattooStyles } from "@/lib/content";
import { cn } from "@/lib/utils";
import Lightbox from "@/components/ui/Lightbox";
import type { PortfolioItem } from "@/lib/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", ...tattooStyles];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered =
    activeFilter === "All"
      ? featuredPortfolio
      : featuredPortfolio.filter((item) => item.style === activeFilter);

  const visible = filtered.slice(0, visibleCount);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleFilterChange = (f: string) => {
    setActiveFilter(f);
    setVisibleCount(6); // reset pagination when filter changes
  };

  return (
    <section className="py-24 lg:py-32 bg-ink-black" aria-label="Selected portfolio">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="Our Work"
            heading="Selected Portfolio"
            subheading="A selection of original tattoos created in our studio. Every piece is custom — designed for one person."
          />
          <AnimatedButton delay={0.4}>
            <Button href="/portfolio" variant="secondary" size="sm" className="shrink-0">
              View All Work
            </Button>
          </AnimatedButton>
        </div>

        {/* Filter tabs */}
        <div
          role="group"
          aria-label="Filter portfolio by style"
          className="flex flex-wrap gap-2 mb-10 -mx-1"
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => handleFilterChange(f)}
              aria-pressed={activeFilter === f}
              className={cn(
                "px-4 py-2 font-mono-brand text-[0.65rem] tracking-widest border transition-colors duration-200 min-h-[44px]",
                activeFilter === f
                  ? "border-warm-bone text-warm-bone bg-warm-bone/5"
                  : "border-border-subtle text-smoke-grey hover:border-smoke-grey hover:text-warm-bone"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Portfolio grid — asymmetric masonry-style */}
        {visible.length === 0 ? (
          <EmptyState filter={activeFilter} />
        ) : (
          <PortfolioGrid items={visible} onOpen={openLightbox} />
        )}

        {/* Load more */}
        {visibleCount < filtered.length && (
          <div className="mt-12 text-center">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setVisibleCount((n) => n + 6)}
            >
              Load More
            </Button>
          </div>
        )}

        {/* Placeholder state */}
        {featuredPortfolio.length === 0 && (
          <PlaceholderGrid />
        )}
      </Container>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={visible}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}

/* ── Sub-components ───────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import Image from "next/image";

function PortfolioGrid({
  items,
  onOpen,
}: {
  items: PortfolioItem[];
  onOpen: (i: number) => void;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered entrance
      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card");
      gsap.fromTo(cards,
        { y: 30, opacity: 0, clipPath: "inset(10% 0 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          }
        }
      );

      // Inner parallax for images
      cards.forEach((card) => {
        const img = card.querySelector(".portfolio-img");
        if (img) {
          gsap.fromTo(img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {items.map((item, i) => (
        <div key={item.slug} className="portfolio-card break-inside-avoid relative overflow-hidden rounded group">
          <button
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`View ${item.title} — ${item.style} by ${item.artist}`}
            className="block w-full text-left relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone"
          >
            <div
              className={cn(
                "relative overflow-hidden bg-charcoal",
                i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
              )}
            >
              <div className="absolute inset-[-10%] w-[120%] h-[120%]">
                <Image
                  src={item.image || "/images/placeholder-tattoo.svg"}
                  alt={item.alt || item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="portfolio-img object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
            {/* Dark gradient base always visible */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-black/80 to-transparent pointer-events-none" />
            
            {/* Hover overlay text */}
            <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div>
                <h3 className="font-editorial text-warm-bone text-lg mb-1">{item.title}</h3>
                <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest uppercase">
                  {item.style}
                </p>
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}

function PlaceholderGrid() {
  const placeholders = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {placeholders.map((i) => (
        <div key={i} className="break-inside-avoid">
          <div
            className={cn(
              "bg-charcoal rounded flex items-center justify-center border border-border-subtle",
              i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
            )}
          >
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest text-center px-4">
              TATTOO PHOTO<br />PLACEHOLDER
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ filter }: { filter: string }) {
  return (
    <div className="py-20 text-center border border-border-subtle rounded">
      <p className="text-smoke-grey text-sm">
        No portfolio items for &ldquo;{filter}&rdquo; yet.
      </p>
    </div>
  );
}
