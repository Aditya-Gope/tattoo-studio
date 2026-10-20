"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { AnimatedList } from "@/components/ui/animations/AnimatedList";

gsap.registerPlugin(ScrollTrigger);

const hygienePoints = [
  {
    label: "Single-Use Equipment",
    description: "All needles, cartridges and ink caps are used once and disposed of safely after every session.",
  },
  {
    label: "Sterile Surfaces",
    description: "Work surfaces are cleaned and covered with fresh barriers before each client.",
  },
  {
    label: "Skin Preparation",
    description: "The skin is thoroughly cleaned and prepared before any tattooing begins.",
  },
  {
    label: "Quality Inks",
    description: "We use professional-grade, skin-safe inks selected for vibrancy and longevity.",
  },
  {
    label: "Protective Barriers",
    description: "Fresh gloves, covers and barriers are applied at each station for every appointment.",
  },
  {
    label: "Aftercare Support",
    description: "Every client receives personal aftercare guidance and ongoing support throughout the healing process.",
  },
];

export default function HygieneTrust() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Staggered Mask Reveal
      gsap.fromTo(
        ".hygiene-img-wrapper",
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".hygiene-img-grid",
            start: "top 80%",
          }
        }
      );

      // Light parallax at different speeds (desktop only)
      if (!isMobile) {
        gsap.to(".hygiene-img-inner-1", {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true }
        });
        gsap.to(".hygiene-img-inner-2", {
          y: 30,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true }
        });
        gsap.to(".hygiene-img-inner-3", {
          y: -20,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: true }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-charcoal overflow-hidden" aria-label="Hygiene and trust">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: images */}
          <div className="hygiene-img-grid grid grid-cols-2 gap-4 pointer-events-none relative z-10">
            <div className="hygiene-img-wrapper aspect-[3/4] rounded overflow-hidden bg-ink-black relative">
              <Image
                src="/images/hygiene/clean-workstation.webp"
                alt="Clean tattoo workstation setup"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="hygiene-img-inner-1 object-cover scale-110"
              />
              <div className="absolute inset-0 bg-ink-black/20" />
            </div>
            <div className="space-y-4 pt-8">
              <div className="hygiene-img-wrapper aspect-square rounded overflow-hidden bg-ink-black relative">
                <Image
                  src="/images/hygiene/sealed-supplies.webp"
                  alt="Sealed single-use supplies"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="hygiene-img-inner-2 object-cover scale-110"
                />
                <div className="absolute inset-0 bg-ink-black/20" />
              </div>
              <div className="hygiene-img-wrapper aspect-square rounded overflow-hidden bg-ink-black relative">
                <Image
                  src="/images/hygiene/glove-preparation.webp"
                  alt="Artist preparing equipment"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="hygiene-img-inner-3 object-cover scale-110"
                />
                <div className="absolute inset-0 bg-ink-black/20" />
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="relative z-20">
            <SectionHeading
              eyebrow="Your Safety"
              heading="A Clean Studio You Can Trust"
              subheading="Your wellbeing is taken seriously from the moment you walk in. Every procedure shown here is a genuine part of how we work."
              className="mb-10"
            />

            <AnimatedList className="space-y-6" aria-label="Hygiene practices" delay={0.4}>
              {hygienePoints.map((point) => (
                <li key={point.label} className="flex gap-4 hygiene-list-item">
                  <div
                    className="mt-1 w-1 h-1 rounded-full bg-oxblood shrink-0 self-start mt-[6px]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-warm-bone font-medium text-sm mb-1">
                      {point.label}
                    </p>
                    <p className="text-smoke-grey text-xs leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </AnimatedList>

            <p className="mt-8 text-smoke-grey text-xs border-t border-border-subtle pt-6">
              Only verified studio procedures are described here. We do not make unverified
              medical, licensing or safety claims.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
