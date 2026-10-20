"use client";

import { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { studio, openingHours } from "@/lib/content";

export default function LocationSection() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const mapsEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;
  const mapsUrl =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? studio.mapsUrl;

  return (
    <section className="py-24 lg:py-32 bg-ink-black" aria-label="Studio location">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Info */}
          <div>
            <SectionHeading
              eyebrow="Find Us"
              heading="Visit the Studio"
              className="mb-8"
            />

            <address className="not-italic space-y-3 text-smoke-grey text-sm leading-relaxed mb-8">
              <p className="text-warm-bone text-base">{studio.address || "[Complete Studio Address]"}</p>
              {studio.landmark && (
                <p className="text-xs text-smoke-grey">Near {studio.landmark}</p>
              )}
              <p>
                <a
                  href={`tel:${studio.phoneDisplay}`}
                  className="hover:text-warm-bone transition-colors"
                >
                  {studio.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${studio.email}`}
                  className="hover:text-warm-bone transition-colors"
                >
                  {studio.email}
                </a>
              </p>
            </address>

            {/* Opening hours */}
            <div className="mb-8">
              <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] mb-4">
                OPENING HOURS
              </p>
              <dl className="space-y-2">
                {openingHours.map((h) => (
                  <div key={h.days} className="flex gap-4 text-sm">
                    <dt className="text-smoke-grey w-40 shrink-0">{h.days}</dt>
                    <dd className="text-warm-bone">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Button
              href={studio.directionsUrl || mapsUrl}
              variant="primary"
              size="md"
              external
              aria-label="Get directions to the studio"
            >
              Get Directions
            </Button>
          </div>

          {/* Map */}
          <div ref={mapRef} className="aspect-square lg:aspect-auto lg:h-[480px] rounded overflow-hidden bg-charcoal border border-border-subtle relative">
            {mapsEmbedUrl && mapLoaded ? (
              <iframe
                src={mapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                title={`Map showing location of ${studio.name}`}
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <button
                type="button"
                onClick={() => setMapLoaded(true)}
                className="w-full h-full flex flex-col items-center justify-center gap-4 text-center px-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone"
                aria-label="Load studio location map"
              >
                <svg className="w-10 h-10 text-smoke-grey/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {mapsEmbedUrl ? (
                  <>
                    <p className="text-smoke-grey text-sm">Click to load map</p>
                    <p className="text-smoke-grey/60 text-xs">
                      Google Maps will load when you tap here
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-smoke-grey text-sm">{studio.address || "[Studio Address]"}</p>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-brand text-[0.65rem] tracking-widest text-warm-bone/60 hover:text-warm-bone transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      OPEN IN GOOGLE MAPS ↗
                    </a>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
