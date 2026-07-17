import type { Metadata } from "next";
import Link from "next/link";
import SectionFade from "@/components/SectionFade";

export const metadata: Metadata = {
  title: "Disclaimer | The Murphy Method",
  description:
    "Educational disclaimer for The Murphy Method website and digital products.",
};

const CONTACT_EMAIL = "erin@themurphymethod.co";

export default function DisclaimerPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h1 className="font-cormorant text-hero-mobile md:text-5xl font-semibold text-olive mb-4">
            Disclaimer
          </h1>
          <p className="font-inter text-lg text-olive/80">
            Disclaimer for The Murphy Method
          </p>
          <p className="font-inter text-sm text-olive/60 mt-3">
            Effective Date: 07/17/2026
          </p>
        </div>
        <SectionFade to="white" />
      </section>

      <section className="relative overflow-hidden bg-white section-padding pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <article className="font-inter text-olive/85 leading-relaxed space-y-10">
            <p>
              The information provided on this website is for educational and
              informational purposes only and is not intended as a substitute for
              professional medical advice, diagnosis, or treatment. Always seek
              the advice of your physician or other qualified health provider
              with any questions you may have regarding a medical condition or
              treatment.
            </p>

            <DisclaimerSection number="1" title="No Medical Advice">
              <p>
                The content on this website, including but not limited to text,
                graphics, videos, and other materials, is intended solely for
                informational purposes. It should not be construed as medical
                advice or as a substitute for professional healthcare. We do not
                provide medical services or therapies, and reliance on any
                information provided by this website is solely at your own risk.
              </p>
            </DisclaimerSection>

            <DisclaimerSection number="2" title="Personal Responsibility">
              <p>
                You are responsible for your own health and well-being. It is
                essential to consult with a qualified healthcare professional
                before starting any new therapy or exercise program, especially
                if you have any pre-existing conditions or concerns.
              </p>
            </DisclaimerSection>

            <DisclaimerSection number="3" title="No Guarantees">
              <p>
                While we strive to provide accurate and up-to-date information,
                we make no representations or warranties about the effectiveness
                or results of any programs sold or shared on this website.
                Individual results may vary, and past performance is not
                indicative of future results.
              </p>
            </DisclaimerSection>

            <DisclaimerSection number="4" title="Third-Party Links">
              <p>
                This website may contain links to third-party websites. We do
                not endorse or assume any responsibility for the content,
                products, or services offered by these external sites. Your use
                of such sites is at your own risk.
              </p>
            </DisclaimerSection>

            <DisclaimerSection number="5" title="Changes to Content">
              <p>
                We reserve the right to modify or discontinue any content,
                programs, or services offered on this website without prior
                notice. We are not liable for any damages resulting from such
                changes.
              </p>
            </DisclaimerSection>

            <DisclaimerSection number="6" title="Acceptance of Terms">
              <p>
                By using this website, you acknowledge that you have read,
                understood, and agreed to this disclaimer. If you do not agree
                to these terms, please do not use our website.
              </p>
            </DisclaimerSection>

            <DisclaimerSection number="7" title="Contact Us">
              <p>
                If you have any questions about this disclaimer, please contact
                us at:
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-terracotta hover:text-terracotta-dark underline underline-offset-2"
                  >
                    This website
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-terracotta hover:text-terracotta-dark underline underline-offset-2"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
              </ul>
            </DisclaimerSection>

            <p className="border-t border-blush/40 pt-8 font-medium text-olive">
              The Murphy Method
            </p>
          </article>
        </div>
        <SectionFade to="olive" />
      </section>
    </>
  );
}

function DisclaimerSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-cormorant text-xl md:text-2xl font-semibold text-olive mb-3">
        {number}. {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
