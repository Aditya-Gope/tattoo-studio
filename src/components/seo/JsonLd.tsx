import { studio, seo } from "@/lib/content";

interface JsonLdProps {
  type: "home" | "page";
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? seo.siteUrl ?? "http://localhost:3000";

export default function JsonLd({ type, breadcrumbs }: JsonLdProps) {
  const tattooParlor = {
    "@context": "https://schema.org",
    "@type": "TattooParlor",
    name: studio.name || "[Studio Name]",
    description: seo.defaultDescription,
    url: baseUrl,
    telephone: studio.phoneDisplay,
    email: studio.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: studio.address || "[Address]",
      addressLocality: studio.city || "[City]",
      addressRegion: studio.region || "[State]",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "21:00",
      },
    ],
    sameAs: studio.instagramUrl ? [studio.instagramUrl] : [],
    // No fake aggregate rating — omitted intentionally
  };

  const breadcrumbList = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          ...breadcrumbs.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: crumb.name,
            item: `${baseUrl}${crumb.url}`,
          })),
        ],
      }
    : null;

  return (
    <>
      {type === "home" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tattooParlor) }}
        />
      )}
      {breadcrumbList && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
        />
      )}
    </>
  );
}
