import Hero from "@/components/Hero";
import KitSignupEmbed from "@/components/KitSignupEmbed";
import MeetYourCoach from "@/components/MeetYourCoach";
import SectionFade from "@/components/SectionFade";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import type { ValueProp } from "@/lib/types";


const valueProps: ValueProp[] = [
  {
    title: "Evidence-Based Programs",
    description:
      "Thoughtfully chosen movements, progressions, and modifications to account for the specific changes that occur throughout the perinatal time frame, while still aiming to build strength. I’ll handle the well thought out programming so you can just show up confidently and get straight to it.",
  },
  {
    title: "Perinatal Specialization",
    description:
      "With background as a Doctor of Physical Therapy and additional certification as a Pregnancy and Postpartum Exercise Specialist, I offer programs specifically designed to best support you through every phase of motherhood–pregnancy, postpartum, and beyond. It’s never too late to show up for yourself.",
  },
  {
    title: "As You Are",
    description:
      "Whether you're 8 months pregnant prepping for birth, showing up between feeding sessions with your 2 month old, or trying to fit in a lift while keeping your toddler out of trouble, I’ll meet you where you are and help guide you to where you want to be.",
  }
];



export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Erin Murphy, PT, DPT"
        description="Evidence-based exercise and education for women who want to feel seen, supported, and strong as hell."
        primaryCta={{ text: "Explore Programs", href: "/programs" }}
        secondaryCta={{ text: "About Your Coach", href: "/about" }}
        backgroundImage="/assets/hero-placeholder.svg"
        fullHeight
      />

      <section className="relative overflow-hidden bg-cream section-padding pt-0 md:pt-4 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text- mb-4">
            Why The Murphy Method?
          </h2>
          <p className="font-inter text-olive/80 leading-relaxed w-full md:w-1/2 mx-auto">
            The Murphy Method helps you feel confident diving into strength
            training during whatever phase of motherhood you find yourself —
            pregnancy, postpartum, or busy moms further into the wild ride of
            motherhood. This is far more than your typical influencer mom
            workout plan. As a physical therapist, long time coach, and mom
            myself, I have poured my passion and expertise into these programs
            that combine up-to-date evidence and approachable exercise. Plus,
            having direct access and support from me provides peace of mind
            through the ups and downs during this critical perinatal time frame.
          </p>
        </div>
        <SectionFade to="blush" />
      </section>

      {/* Value Props Section */}
      <section className="relative overflow-hidden bg-blush section-padding pt-0 md:pt-4 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-stretch">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="flex flex-col h-full p-6 md:p-8 text-center md:text-left"
              >
                <div className="mb-5">
                  <h3 className="font-cormorant text-section-mobile md:text-2xl font-semibold text-olive mb-3 min-h-[3.5rem] md:min-h-[4.5rem] flex items-center justify-center md:justify-start">
                    {prop.title}
                  </h3>
                  <div className="w-10 h-0.5 bg-terracotta/60 mx-auto md:mx-0" />
                </div>
                {prop.decorativeText && (
                  <p className="font-noto text-terracotta text-sm mb-2">
                    {prop.decorativeText}
                  </p>
                )}
                <p className="font-inter text-olive/80 leading-relaxed flex-1">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <SectionFade to="cream" />
      </section>

      <MeetYourCoach />
      <TestimonialsCarousel />
      <KitSignupEmbed />
      {/* Call to Action Section */}
      <section className="relative overflow-hidden bg-cream section-padding pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-6">
            Ready to Begin Your Journey?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/programs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-inter font-medium text-base transition-all duration-200 bg-terracotta text-white hover:bg-terracotta-dark"
            >
              View Programs
            </a>
            <a
              href="/resources"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-inter font-medium text-base transition-all duration-200 border border-terracotta text-terracotta hover:bg-terracotta/10"
            >
              Free Resources
            </a>
          </div>
        </div>
        <SectionFade to="olive" />
      </section>
    </>
  );
}
