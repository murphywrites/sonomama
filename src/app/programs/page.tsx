import type { Metadata } from "next";
import ProgramCard from "@/components/ProgramCard";
import type { Program } from "@/lib/types";

export const metadata: Metadata = {
  title: "Programs | Erin Murphy, DPT",
  description:
    "Structured perinatal strength and movement programs designed by a Doctor of Physical Therapy.",
};

const programs: Program[] = [
  {
    id: "foundations",
    title: "Foundations",
    description:
      "Return to strength safely with expert-guided progressions for your core and pelvic floor. Designed for the early postpartum period.",
    price: "$147",
    buttonText: "Get Started",
    stripeLink: "#stripe-link-placeholder",
    thumbnail: "/assets/resource-thumbnails/resource-1.svg",
    features: [
      "6-week structured program",
      "Core & pelvic floor progressions",
      "Video demonstrations for every exercise",
      "PDF guide included",
      "Lifetime access",
    ],
  },
  {
    id: "strong-mama",
    title: "Strong Mama",
    description:
      "Build full-body strength with a program designed for real mom life—safe, effective, and sustainable for the long haul.",
    price: "$297",
    buttonText: "Get Started",
    stripeLink: "#stripe-link-placeholder",
    thumbnail: "/assets/resource-thumbnails/resource-2.svg",
    badge: "Most Popular",
    features: [
      "12-week strength training program",
      "Progressive overload built in",
      "Modifications for every fitness level",
      "Nutrition guidance PDF",
      "Community access",
      "Lifetime access",
    ],
  },
  {
    id: "virtual-pt",
    title: "1:1 Virtual PT",
    description:
      "Personalized assessment and treatment plan tailored specifically to your body, history, and goals.",
    price: "$175",
    priceNote: "/ session",
    buttonText: "Book a Session",
    stripeLink: "#stripe-link-placeholder",
    thumbnail: "/assets/resource-thumbnails/resource-3.svg",
    features: [
      "60-minute one-on-one video session",
      "Comprehensive movement assessment",
      "Custom exercise prescription",
      "Session notes & follow-up plan",
      "Direct messaging support",
    ],
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <p className="font-inter text-terracotta font-medium text-sm tracking-wide uppercase mb-3">
            Programs
          </p>
          <h1 className="font-cormorant text-hero-mobile md:text-5xl font-semibold text-olive mb-4">
            Structured Support for Your Journey
          </h1>
          <p className="font-inter text-lg text-olive/80 max-w-2xl mx-auto">
            Evidence-based programs built by a Doctor of Physical Therapy—
            designed to meet you exactly where you are.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Is this right for me? */}
      <section className="bg-sage/15 section-padding">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-4">
            Not Sure Which Program Is Right for You?
          </h2>
          <p className="font-inter text-lg text-olive/80 mb-6">
            Book a free 15-minute consultation and we&rsquo;ll find the best fit
            for your body, your history, and your goals.
          </p>
          <a
            href="#consultation-link-placeholder"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-inter font-medium text-base transition-all duration-200 bg-terracotta text-white hover:bg-terracotta-dark"
          >
            Schedule a Free Call
          </a>
        </div>
      </section>
    </>
  );
}
