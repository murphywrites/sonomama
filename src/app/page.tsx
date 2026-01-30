import Hero from "@/components/Hero";
import MeetYourCoach from "@/components/MeetYourCoach";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import EmailSignup from "@/components/EmailSignup";
import type { ValueProp } from "@/lib/types";

const valueProps: ValueProp[] = [
  {
    title: "Evidence-Based Care",
    description:
      "Physical therapy expertise meets maternal wellness. Every program is grounded in biomechanics and your unique journey.",
  },
  {
    title: "Perinatal Specialization",
    description:
      "From pregnancy through postpartum and beyond—supporting your body through every phase of motherhood.",
  },
  {
    title: "As You Are",
    description:
      "Embrace your natural state. No pressure to bounce back. Just forward, at your pace.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="SONOMAMA"
        subtitle="Strength & Movement Coaching for Moms"
        description="Perinatal Physical Therapy rooted in evidence, guided by compassion, honoring you as you are."
        primaryCta={{ text: "Explore Resources", href: "/resources" }}
        secondaryCta={{ text: "Meet Erin", href: "/about" }}
        backgroundImage="/assets/hero-placeholder.svg"
        fullHeight
      />

      {/* Value Props Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="text-center p-6 md:p-8"
              >
                <h3 className="font-cormorant text-section-mobile md:text-2xl font-semibold text-olive mb-4">
                  {prop.title}
                </h3>
                {prop.japaneseText && (
                  <p className="font-noto text-terracotta text-sm mb-2">
                    {prop.japaneseText}
                  </p>
                )}
                <p className="font-inter text-olive/80 leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Coach Section */}
      <MeetYourCoach />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Email Signup Section */}
      <EmailSignup />

      {/* Call to Action Section */}
      <section className="bg-sage/20 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="font-inter text-lg text-olive/80 mb-8">
            Discover resources designed to support you through every phase of
            motherhood, from pregnancy to postpartum and beyond.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/resources"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-inter font-medium text-base transition-all duration-200 bg-terracotta text-white hover:bg-terracotta-dark"
            >
              View All Resources
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
