/**
 * Typed access to site-content.json
 * ─────────────────────────────────
 * All business content lives in ../../content/site-content.json.txt
 * The `.txt` extension is how the file was saved in this workspace.
 * When the client provides the real JSON, rename the file to
 * `site-content.json` and update the import path below.
 */

export interface OpeningHour {
  days: string;
  hours: string;
}

export interface Artist {
  name: string;
  role: string;
  experience: string;
  specialities: string[];
  bio: string;
  image: string;
  instagramUrl: string;
}

export interface PortfolioItem {
  slug: string;
  title: string;
  style: string;
  placement: string;
  artist: string;
  image: string;
  alt: string;
  description?: string;
}

export interface TextReview {
  name: string;
  quote: string;
  source: string;
  sourceUrl: string;
  type: "text";
}

export interface VideoReview {
  name: string;
  caption: string;
  instagramUrl: string;
  poster: string;
  hasPermission: boolean;
}

export interface SiteContent {
  studio: {
    name: string;
    shortName: string;
    tagline: string;
    city: string;
    region: string;
    country: string;
    address: string;
    landmark: string;
    phoneDisplay: string;
    whatsappNumber: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    mapsUrl: string;
    directionsUrl: string;
  };
  openingHours: OpeningHour[];
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  styles: string[];
  artists: Artist[];
  featuredPortfolio: PortfolioItem[];
  reviews: TextReview[];
  videoReviews: VideoReview[];
  booking: {
    notice: string;
    maximumUploads: number;
    maximumFileSizeMb: number;
    minimumAge: number;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    localKeyword: string;
  };
}

// The site content JSON (copy of content/site-content.json.txt)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const raw = require("../data/site-content.json") as SiteContent;

export const siteContent: SiteContent = raw;

/** Convenience re-exports */
export const studio = siteContent.studio;
export const openingHours = siteContent.openingHours;
export const hero = siteContent.hero;
export const tattooStyles = siteContent.styles;
export const artists = siteContent.artists;
export const featuredPortfolio = siteContent.featuredPortfolio;
export const reviews = siteContent.reviews;
export const videoReviews = siteContent.videoReviews;
export const booking = siteContent.booking;
export const seo = siteContent.seo;

/** Build the WhatsApp link with a prefilled message */
export function whatsappLink(message?: string): string {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? studio.whatsappNumber;
  const msg = encodeURIComponent(
    message ?? `Hi! I'd like to book a tattoo consultation at ${studio.name}.`
  );
  return `https://wa.me/${number}?text=${msg}`;
}
