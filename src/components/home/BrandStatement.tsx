"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/animations/AnimatedHeading";
import { AnimatedParagraph } from "@/components/ui/animations/AnimatedParagraph";
import { AnimatedLabel } from "@/components/ui/animations/AnimatedLabel";
import { AnimatedButton } from "@/components/ui/animations/AnimatedButton";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStatement() {
  const containerRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Opposite-direction mask reveal
      gsap.fromTo(
        img1Ref.current,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }, // top to bottom
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: img1Ref.current,
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(
        img2Ref.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }, // bottom to top
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: img2Ref.current,
            start: "top 85%",
          }
        }
      );

      // Subtle inner-image parallax (desktop only)
      if (!isMobile) {
        gsap.fromTo(
          ".brand-img-inner",
          { y: -30, scale: 1.05 },
          {
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-32 bg-charcoal overflow-hidden"
      aria-label="Brand statement"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <AnimatedLabel className="text-smoke-grey tracking-[0.2em] mb-6">
              OUR PHILOSOPHY
            </AnimatedLabel>
            <h2 className="font-editorial headline-lg text-warm-bone italic mb-8">
              <AnimatedHeading as="span" className="block" delay={0.1}>We don&apos;t just make tattoos.</AnimatedHeading>
              <AnimatedHeading as="span" className="block" delay={0.2}>
                <span className="text-smoke-grey">
                  We turn meaning into permanent art.
                </span>
              </AnimatedHeading>
            </h2>
            <AnimatedParagraph className="text-smoke-grey text-sm sm:text-base leading-relaxed mb-6 max-w-lg" delay={0.2}>
              Every tattoo begins with a conversation. We listen to your story,
              your ideas and your vision — then design something made only for
              you. No flash sheets, no copies. Only original work created with
              precision and care.
            </AnimatedParagraph>
            <AnimatedParagraph className="text-smoke-grey text-sm leading-relaxed max-w-lg mb-10" delay={0.3}>
              Our studio is a calm, clean space where great art happens. You
              will be guided through every step — from the first sketch to
              aftercare — so that your experience is as memorable as the result.
            </AnimatedParagraph>
            
            <AnimatedButton delay={0.4}>
              <Button href="/portfolio" variant="secondary" size="lg">
                View Studio Work
              </Button>
            </AnimatedButton>
          </div>

          {/* Images */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 sm:gap-4 pointer-events-none">
            <div ref={img1Ref} className="aspect-[4/5] rounded overflow-hidden bg-ink-black relative isolate">
              <Image
                src="/images/story/story-tattoo-closeup.webp"
                alt="Close-up of fine line tattoo detail"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover brand-img-inner scale-105"
              />
            </div>
            <div ref={img2Ref} className="aspect-[4/5] rounded overflow-hidden bg-ink-black mt-8 relative isolate">
              <Image
                src="/images/story/story-artist-working.webp"
                alt="Artist working at the tattoo station"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover brand-img-inner scale-105"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
