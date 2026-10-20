"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./Hero"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-[100svh] bg-ink-black flex items-end lg:items-center"
      aria-hidden="true"
    />
  ),
});

export default function HeroLoader() {
  return <Hero />;
}
