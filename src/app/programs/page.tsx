import type { Metadata } from "next";
import ProgramCard from "@/components/ProgramCard";
import type { Program } from "@/lib/types";

export const metadata: Metadata = {
  title: "Programs | Erin Murphy, DPT",
  description:
    "Structured perinatal strength and movement programs designed by a Doctor of Physical Therapy.",
};

// Programs:
// Pregnancy Workout Plans synced to where you are in your pregnancy
// -2nd Trimester
// 	-3x/week full body strength 
// -3rd Trimester 
// 	-3x/week full body strength 
// 	-Birth prep circuit, daily as desired
// -Late 3rd Trimester & Birth Prep
// 	-3x/week full body strength workouts, shortened
// 	-Mid-pelvis and pelvic outlet targeted routines
// 	-Labor prep cardio and relaxation 
// 	-Birth prep circuit

// Postpartum
// -Early Postpartum Gentle Mobility and Reconnection Guide
// 	-Daily gentle mobility, core connection, breathing (most of which can be done in bed!), 
// education, general activity progression recommendations for the early postpartum days
// -Postpartum Strength Weeks 6-14 Vaginal Delivery
// 	-FOUNDATIONS PP Daily-ish Mobility, Breathing and Core Connection
// -3x/week strength workouts; Push, Pull, & Full Body Focus
// -Postpartum Strength Weeks 6-14 Cesarean Delivery
// -FOUNDATIONS PP Daily-ish Mobility, Massage, Breathing and Core Connection
// -3x/week strength workouts; Push, Pull, & Full Body Focus

// Moms in any phase of life
// -Start with Strength, 3x/week full body strength workouts with a new block every 8 weeks




const programs: Program[] = [
  {
    id: "pregnancy-synced",
    title: "Pregnancy",
    description:
      "Pregnancy Workout Plans synced to where you are in your pregnancy",
      price: "$147",
    buttonText: "Get Started",
    stripeLink: "#stripe-link-placeholder",
    thumbnail: "/assets/resource-thumbnails/resource-1.svg",
    features: [
      {
        label: "2nd Trimester",
        children: ["3x/week full body strength"],
      },
      {
        label: "3rd Trimester",
        children: [
          "3x/week full body strength",
          "Birth prep circuit, daily as desired",
        ],
      },
      {
        label: "Late 3rd Trimester & Birth Prep",
        children: [
          "3x/week full body strength workouts, shortened",
          "Mid-pelvis and pelvic outlet targeted routines",
          "Labor prep cardio and relaxation",
          "Birth prep circuit",
        ],
      },
    ],
  },
  {
    id: "postpartum",
    title: "Postpartum",
    description: "",
    price: "$297",
    buttonText: "Get Started",
    stripeLink: "#stripe-link-placeholder",
    thumbnail: "/assets/resource-thumbnails/resource-2.svg",
    features: [
      {
        label: "Early Postpartum Gentle Mobility and Reconnection Guide",
        children: [
          "Daily gentle mobility, core connection, breathing (most of which can be done in bed!), education, general activity progression recommendations for the early postpartum days",
        ],
      },
      {
        label: "Postpartum Strength Weeks 6-14 Vaginal Delivery",
        children: [
          "FOUNDATIONS PP Daily-ish Mobility, Breathing and Core Connection",
          "3x/week strength workouts; Push, Pull, & Full Body Focus",
        ],
      },
      {
        label: "Postpartum Strength Weeks 6-14 Cesarean Delivery",
        children: [
          "FOUNDATIONS PP Daily-ish Mobility, Massage, Breathing and Core Connection",
          "3x/week strength workouts; Push, Pull, & Full Body Focus",
        ],
      },
    ],
  },
  {
    id: "moms-any-phase",
    title: "Moms in any phase of life",
    description: "",
    price: "$147",
    buttonText: "Get Started",
    stripeLink: "#stripe-link-placeholder",
    thumbnail: "/assets/resource-thumbnails/resource-3.svg",
    features: [
      {
        label: "Start with Strength",
        children: [
          "3x/week full body strength workouts with a new block every 8 weeks",
        ],
      },
    ],
  },
//   {
//     id: "virtual-pt",
//     title: "1:1 Virtual PT",
//     description:
//       "Personalized assessment and treatment plan tailored specifically to your body, history, and goals.",
//     price: "$175",
//     priceNote: "/ session",
//     buttonText: "Book a Session",
//     stripeLink: "#stripe-link-placeholder",
//     thumbnail: "/assets/resource-thumbnails/resource-3.svg",
//     features: [
//       "60-minute one-on-one video session",
//       "Comprehensive movement assessment",
//       "Custom exercise prescription",
//       "Session notes & follow-up plan",
//       "Direct messaging support",
//     ],
//   },
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
