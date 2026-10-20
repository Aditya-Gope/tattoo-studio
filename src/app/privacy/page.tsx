import type { Metadata } from "next";
import Link from "next/link";
import { studio } from "@/lib/content";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: `Privacy Policy | ${studio.name}`,
  description: `Privacy policy for ${studio.name}. Learn how we collect, use and protect your personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="pt-24 pb-24 lg:pt-32 bg-ink-black min-h-screen">
      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex gap-2 font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey">
            <li><Link href="/" className="hover:text-warm-bone transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-warm-bone">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="font-editorial headline-md text-warm-bone italic mb-4">Privacy Policy</h1>
        <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-10">
          LAST UPDATED: [DATE] — PLACEHOLDER, REPLACE WITH VERIFIED LEGAL CONTENT
        </p>

        <div className="prose prose-sm max-w-none space-y-8 text-smoke-grey">
          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Information We Collect</h2>
            <p className="text-sm leading-relaxed">
              When you submit a booking consultation request, we collect the information you provide: your name, WhatsApp number, email address, tattoo preferences and any reference images you upload. We do not collect medical information.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">How We Use Your Information</h2>
            <p className="text-sm leading-relaxed">
              We use the information you provide solely to respond to your consultation request and to manage your appointment. We do not sell, rent or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Reference Images</h2>
            <p className="text-sm leading-relaxed">
              Reference images you upload are stored securely and used only to understand your tattoo vision. They are not shared publicly and are deleted after your appointment or upon request.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Cookies and Analytics</h2>
            <p className="text-sm leading-relaxed">
              This website may use anonymised analytics to understand how visitors interact with the site. No personal tracking or advertising cookies are used. [Add full cookie policy once reviewed by a legal professional.]
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Your Rights</h2>
            <p className="text-sm leading-relaxed">
              You may request access to, correction or deletion of your personal information at any time by contacting us at{" "}
              <a href={`mailto:${studio.email}`} className="text-warm-bone hover:underline">{studio.email}</a>.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Contact</h2>
            <p className="text-sm leading-relaxed">
              {studio.name || "[Studio Name]"}<br />
              {studio.address || "[Studio Address]"}<br />
              <a href={`mailto:${studio.email}`} className="text-warm-bone hover:underline">{studio.email}</a>
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 border border-oxblood/20 bg-oxblood/5 rounded">
          <p className="text-smoke-grey text-xs leading-relaxed">
            <strong className="text-warm-bone">Important:</strong> This is a placeholder privacy policy. Replace this content with a verified privacy policy reviewed by a qualified legal professional before the site goes live.
          </p>
        </div>
      </Container>
    </main>
  );
}
