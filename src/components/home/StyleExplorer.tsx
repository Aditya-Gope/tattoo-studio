"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { tattooStyles } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const styleDescriptions: Record<string, string> = {
  "Fine Line":
    "Delicate, precise linework that creates intricate detail without heavy shading. Perfect for botanical motifs, script and minimalist imagery.",
  "Blackwork":
    "Bold, graphic compositions using pure black ink. Creates striking contrast and stands out beautifully on every skin tone.",
  "Realism":
    "Photorealistic portraits, animals and scenes rendered with exceptional detail and tonal depth.",
  "Minimal":
    "Clean, restrained designs using the fewest possible elements. The art of saying more with less.",
  "Geometric":
    "Precise shapes, patterns and symmetry combined to create modern, architectural compositions.",
  "Lettering":
    "Hand-drawn typography — from elegant script to bold block letters — with attention to spacing and legibility.",
  "Traditional":
    "Classic bold outlines and saturated colours drawing on the rich heritage of traditional tattooing.",
  "Custom Design":
    "One-of-a-kind artwork built entirely around your vision, story and body. No reference copies.",
};

export default function StyleExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".style-card");
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, clipPath: "inset(10% 0 0 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-charcoal" aria-label="Tattoo styles">
      <Container>
        <SectionHeading
          eyebrow="Explore Styles"
          heading="Find Your Style"
          subheading="Not sure which style is right for you? Browse our specialities — each with its own character and technique."
          className="mb-14"
        />

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tattooStyles.map((style) => (
            <StyleCard key={style} style={style} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StyleCard({ style }: { style: string }) {
  const description = styleDescriptions[style] ?? "A distinct tattooing style available at our studio.";
  const styleSlug = style.toLowerCase().replace(/\s+/g, '-');
  const imgSrc = `/images/styles/${styleSlug}.webp`;
  
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    
    if (prefersReduced || isTouch || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xMid = rect.width / 2;
    const yMid = rect.height / 2;
    
    // Tilt calculations
    const rotX = ((y - yMid) / yMid) * -5;
    const rotY = ((x - xMid) / xMid) * 5;
    
    gsap.to(cardRef.current, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };
  
  const handleMouseLeave = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <Link
      ref={cardRef}
      href={`/portfolio?style=${encodeURIComponent(style)}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="style-card group block border border-border-subtle rounded p-6 hover:border-warm-bone/30 hover:bg-ink-black/40 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="aspect-[4/5] rounded overflow-hidden bg-ink-black mb-5 relative" style={{ transform: "translateZ(20px)" }}>
        <div className="absolute inset-[-5%] w-[110%] h-[110%]">
          <Image
            ref={imageRef}
            src={imgSrc}
            alt={`${style} tattoo example`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:translate-x-1"
          />
        </div>
        <div className="absolute inset-0 bg-ink-black/20 group-hover:bg-ink-black/10 transition-colors duration-300 pointer-events-none" />
      </div>

      <div style={{ transform: "translateZ(10px)" }}>
        <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] mb-2">
          STYLE
        </p>
        <h3 className="font-editorial text-warm-bone text-xl italic mb-3">
          {style}
        </h3>
        <p className="text-smoke-grey text-xs leading-relaxed mb-4">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 font-mono-brand text-[0.65rem] tracking-widest text-warm-bone/60 group-hover:text-warm-bone transition-colors duration-200">
          EXPLORE 
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
