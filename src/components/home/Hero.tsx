"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { hero } from "@/lib/content";
import { TypewriterText } from "@/components/ui/animations/TypewriterText";

gsap.registerPlugin(ScrollTrigger);

interface HeroSlide {
  id: string;
  desktopImage: string;
  mobileImage: string;
  alt: string;
  objectPosition?: string;
  label: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
}

interface HeroData {
  primaryCta: string;
  secondaryCta: string;
  slides?: HeroSlide[];
}

const heroData = hero as unknown as HeroData;
const heroSlides: HeroSlide[] = heroData.slides || [];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mediaWrapperRef = useRef<HTMLDivElement>(null);
  const transitionCoverRef = useRef<HTMLDivElement>(null);
  
  const slides = heroSlides;
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [startTyping, setStartTyping] = useState(true);
  
  const timerRef = useRef<number | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isTransitioningRef = useRef(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);
  
  // 1. Preload images
  useEffect(() => {
    slides.forEach((slide: HeroSlide) => {
      const img = new window.Image();
      img.src = window.innerWidth > 1024 ? slide.desktopImage : slide.mobileImage;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });
  }, [slides]);

  // 2. Parallax (Scroll-driven but ONLY visual)
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (mediaWrapperRef.current) {
        gsap.to(mediaWrapperRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const transitionToSlide = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndex || isTransitioningRef.current) return;
    
    isTransitioningRef.current = true;
    
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Reduced motion fallback
      tl.to("[data-hero-dynamic-text], [data-hero-side-label]", { opacity: 0, duration: 0.2 })
        .to("[data-hero-media]", { opacity: 0, duration: 0.2 }, 0)
        .call(() => setActiveIndex(nextIndex))
        .to("[data-hero-media]", { opacity: 1, duration: 0.2 })
        .to("[data-hero-dynamic-text], [data-hero-side-label]", { opacity: 1, duration: 0.2 })
        .call(() => {
          isTransitioningRef.current = false;
        });
      return;
    }

    // Step 2: Old text leaves
    tl.call(() => setStartTyping(false));
    tl.to("[data-hero-dynamic-text], [data-hero-side-label]", {
      opacity: 0,
      y: -10,
      duration: 0.35,
      ease: "power2.inOut"
    }, 0);

    // Step 3: Cover old image (Ink Curtain from left)
    gsap.set(transitionCoverRef.current, { transformOrigin: "left" });
    tl.fromTo(transitionCoverRef.current, 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, 
      0.1
    );

    // Step 4: Swap at midpoint
    tl.call(() => {
      setActiveIndex(nextIndex);
      // Ensure the text container is invisible but back in its original position for the reveal
      gsap.set("[data-hero-dynamic-text], [data-hero-side-label]", { y: 10, opacity: 0 });
    });

    // Step 5: Reveal new image (Ink Curtain to right)
    tl.call(() => {
      gsap.set(transitionCoverRef.current, { transformOrigin: "right" });
    });
    
    tl.to(transitionCoverRef.current, {
      scaleX: 0,
      duration: 0.55,
      ease: "power3.inOut"
    });

    // Step 6: New text enters
    tl.call(() => setStartTyping(true), [], "-=0.2");
    tl.to("[data-hero-dynamic-text], [data-hero-side-label]", {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2");

    tl.call(() => {
      isTransitioningRef.current = false;
    });

  }, [activeIndex]);

  // 3. Reliable Autoplay
  const startAutoplay = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (!isTransitioningRef.current) {
        transitionToSlide((activeIndexRef.current + 1) % slides.length);
      }
    }, 5500);
  }, [slides.length, transitionToSlide]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      return;
    }
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || slides.length < 2) return;

    startAutoplay();

    const handleVisibility = () => {
      if (document.hidden) {
        if (timerRef.current) window.clearInterval(timerRef.current);
      } else {
        if (isPlaying) startAutoplay();
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isPlaying, startAutoplay, slides.length]);

  const handleManualNavigation = (i: number) => {
    if (i === activeIndex || isTransitioningRef.current) return;
    transitionToSlide(i);
    if (isPlaying) {
      // Restart timer explicitly to avoid rapid changes
      if (timerRef.current) window.clearInterval(timerRef.current);
      startAutoplay();
    }
  };

  const activeSlide = slides[activeIndex];

  return (
    <section ref={containerRef} data-hero-root className="relative h-[100svh] w-full bg-ink-black overflow-hidden" aria-label="Hero Carousel">
      
      {/* Background Media Wrapper */}
      <div ref={mediaWrapperRef} className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none">
        
        {/* Single Image Layer */}
        <div data-hero-media className="absolute inset-0 w-full h-full z-[1]">
          <Image
            src={activeSlide.desktopImage}
            alt={activeSlide.alt}
            fill
            priority
            className="hidden lg:block object-cover"
            style={{ objectPosition: activeSlide.objectPosition || "center" }}
            sizes="100vw"
          />
          <Image
            src={activeSlide.mobileImage}
            alt={activeSlide.alt}
            fill
            priority
            className="block lg:hidden object-cover"
            style={{ objectPosition: activeSlide.objectPosition || "center" }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-black/95 via-ink-black/60 to-transparent lg:bg-gradient-to-r lg:from-ink-black lg:via-ink-black/80 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-ink-black/40 to-transparent lg:hidden" />
        </div>

        {/* Ink Curtain Transition Cover */}
        <div 
          ref={transitionCoverRef} 
          data-hero-transition-cover 
          className="absolute inset-0 w-full h-full bg-[#0a0a0a] z-[3]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Slide-specific label */}
      <div className="absolute right-5 sm:right-8 lg:right-16 xl:right-20 top-1/2 -translate-y-1/2 z-[4] hidden md:flex items-center justify-center pointer-events-none" style={{ writingMode: 'vertical-rl' }}>
        <p data-hero-side-label className="font-mono-brand text-oxblood text-[0.65rem] tracking-[0.2em] uppercase rotate-180">
          {activeSlide.label}
        </p>
      </div>
      <div className="absolute top-24 left-5 sm:left-8 z-[4] md:hidden pointer-events-none">
        <p data-hero-side-label className="font-mono-brand text-oxblood text-[0.65rem] tracking-[0.2em] uppercase">
          {activeSlide.label}
        </p>
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 w-full h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-20 flex flex-col justify-end lg:justify-center pb-[180px] lg:pb-0 pointer-events-none z-[4]">
        <div className="max-w-3xl relative pointer-events-auto">
          
          {/* Dynamic Text Group */}
          <div data-hero-dynamic-text className="pointer-events-none">
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.25em] mb-6">
              {activeSlide.eyebrow}
            </p>

            <div className="grid w-full">
              {/* Invisible measurement container to reserve space using CSS grid */}
              <h1 className="col-start-1 row-start-1 font-editorial headline-xl text-warm-bone mb-8 opacity-0 select-none pointer-events-none" aria-hidden="true">
                <span className="block italic pr-4">{activeSlide.titleLine1}</span>
                <span className="block italic pr-4">{activeSlide.titleLine2}</span>
              </h1>

              {/* Actual Animated Headline */}
              <h1 className="col-start-1 row-start-1 font-editorial headline-xl text-warm-bone mb-8">
                <span className="block italic pr-4">
                  <TypewriterText text={activeSlide.titleLine1} start={startTyping} speed={30} />
                </span>
                <span className="block italic pr-4">
                  <TypewriterText text={activeSlide.titleLine2} start={startTyping} speed={30} />
                </span>
              </h1>
            </div>

            <p className="text-smoke-grey text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              {activeSlide.description}
            </p>
          </div>

          {/* Persistent Hero Actions */}
          <div data-hero-actions className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0 z-[5]">
            <Button href="/book" variant="primary" size="lg">{heroData.primaryCta}</Button>
            <Button href="/portfolio" variant="secondary" size="lg">{heroData.secondaryCta}</Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div 
        data-hero-indicators
        className="absolute bottom-8 right-5 sm:right-8 lg:right-16 xl:right-20 z-[6] flex items-center gap-3 pointer-events-auto"
      >
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 flex items-center justify-center text-smoke-grey hover:text-warm-bone focus-visible transition-colors"
          aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="2" width="3" height="8" />
              <rect x="7" y="2" width="3" height="8" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <polygon points="3,2 10,6 3,10" />
            </svg>
          )}
        </button>
        {slides.map((slide, i) => (
          <button
            key={`control-${slide.id || i}`}
            onClick={() => handleManualNavigation(i)}
            className="h-8 flex items-center group focus-visible px-1"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === activeIndex ? "true" : "false"}
          >
            <div className={`relative h-[2px] transition-all duration-300 ${i === activeIndex ? "w-8 bg-smoke-grey/30" : "w-4 bg-smoke-grey/30 group-hover:bg-smoke-grey/50 group-hover:w-6"}`}>
              {i === activeIndex && (
                <div 
                  key={`progress-${i}-${isPlaying ? 'playing' : 'paused'}`}
                  className="absolute top-0 left-0 h-full bg-oxblood"
                  style={{ 
                    animation: isPlaying ? 'fillProgress 5.5s linear forwards' : 'none' 
                  }}
                />
              )}
            </div>
          </button>
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-[6] pointer-events-none hidden lg:flex" aria-hidden="true">
        <div className="w-px h-12 bg-gradient-to-b from-warm-bone to-transparent animate-pulse" />
        <span className="font-mono-brand text-warm-bone text-[0.6rem] tracking-widest">SCROLL</span>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fillProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}} />
    </section>
  );
}
