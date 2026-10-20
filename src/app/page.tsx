import type { Metadata } from "next";
import { seo } from "@/lib/content";
import HeroLoader from "@/components/home/HeroLoader";
import BrandStatement from "@/components/home/BrandStatement";
import PortfolioSection from "@/components/home/PortfolioSection";
import StyleExplorer from "@/components/home/StyleExplorer";
import ArtistIntro from "@/components/home/ArtistIntro";
import HygieneTrust from "@/components/home/HygieneTrust";
import CustomerJourney from "@/components/home/CustomerJourney";
import ReviewsSection from "@/components/home/ReviewsSection";
import BookingCta from "@/components/home/BookingCta";
import LocationSection from "@/components/home/LocationSection";
import InstagramStrip from "@/components/home/InstagramStrip";
import FinalCta from "@/components/home/FinalCta";
import JsonLd from "@/components/seo/JsonLd";


export const metadata: Metadata = {
  title: seo.defaultTitle,
  description: seo.defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd type="home" />
      {/* 1. Animated hero (client-only GSAP, loaded dynamically) */}
      <HeroLoader />


      {/* 2. Brand statement */}
      <BrandStatement />

      {/* 3. Selected portfolio */}
      <PortfolioSection />

      {/* 4. Style explorer */}
      <StyleExplorer />

      {/* 5. Artist introduction */}
      <ArtistIntro />

      {/* 6. Hygiene & trust */}
      <HygieneTrust />

      {/* 7. Customer journey */}
      <CustomerJourney />

      {/* 8. Reviews */}
      <ReviewsSection />

      {/* 9. Booking CTA strip */}
      <BookingCta />

      {/* 10. Location & hours */}
      <LocationSection />

      {/* 11. Instagram strip */}
      <InstagramStrip />

      {/* 12. Final CTA */}
      <FinalCta />
    </>
  );
}
