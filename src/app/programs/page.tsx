import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import ProgramCard from "@/components/ProgramCard";
import SectionFade from "@/components/SectionFade";
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
      "for specialized programming, direct access to a Doctor of Physical Therapy for questions and feedback on form, accountability and support through the ups and downs of pregnancy.",
    price: "$95",
    priceNote: "/month",
    buttonText: "Get Started",
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
    description:
      "for specialized programming, direct access to a Doctor of Physical Therapy for questions and feedback on form, accountability and support through your postpartum journey.",
    price: "$95",
    priceNote: "/month",
    buttonText: "Get Started",
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
    description:
      "for programming rooted in evidence to get you strong, direct access to a Doctor of Physical Therapy for questions and feedback on form, accountability and support through the ups and downs of motherhood.",
    price: "$75",
    priceNote: "/month",
    buttonText: "Get Started",
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
];

export default function ProgramsPage({
  searchParams,
}: {
  searchParams?: { checkout?: string };
}) {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-cream pt-32 pb-12 md:pt-40 md:pb-12">
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
        <SectionFade to="white" />
      </section>

      {searchParams?.checkout === "success" && (
        <div
          role="status"
          className="bg-sage/20 px-6 py-4 text-center font-inter text-sm text-olive"
        >
          Thank you! Your payment was submitted successfully. Erin will follow
          up by email.
        </div>
      )}

      {/* Programs Grid */}
      <section className="relative overflow-hidden bg-white pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col divide-y divide-blush/40 border-y border-blush/40 lg:border-y-0 lg:divide-y-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-stretch">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>

{/* App Access
All programs are accessed via the easy-to-use Train Heroic app.
Direct access to ask Erin questions and get feedback on form
Detailed exercise video demos with instructions, tips, and cues
Recommended reps, sets, and load
Help from Erin with modifications and progressions based on your individual needs
Easily track your progress session to session


Recommended Equipment
Dumbbells 
Long resistance bands
Short looped resistance bands
Workout bench (can usually sub an ottoman, couch, box step, etc)
Large exercise ball (especially for 3rd trimester program)
Small pilates ball (can be subbed for a rolled up towel or pillow) */}

        {/* Train Heroic access note */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-12 md:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="font-cormorant text-section-mobile md:text-2xl font-semibold text-olive mb-4">
                App Access
              </h2>
              <p className="font-inter text-olive/80 mb-4 leading-relaxed">
                All programs are accessed via the easy-to-use Train Heroic app.
              </p>
              <ul className="font-inter text-olive/80 space-y-2 list-disc list-inside md:list-outside md:pl-5 text-left">
                <li>Direct access to ask Erin questions and get personalized feedback on your form</li>
                <li>Detailed exercise video demos with instructions, tips, and cues</li>
                <li>Recommended reps, sets, and load for every session</li>
                <li>Help from Erin with modifications and progressions based on your individual needs</li>
                <li>Easily track your progress session to session in the app</li>
                <li>Accountability to stay consistent</li>
              </ul>
            </div>
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto md:max-w-none">
              <Image
                src="/assets/photos/trainheroic.png"
                alt="Train Heroic app"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>

        <SectionFade to="blush" />
      </section>
      {/* Recommended Equipment
Dumbbells 
Long resistance bands
Short looped resistance bands
Workout bench (can usually sub an ottoman, couch, box step, etc)
Large exercise ball (especially for 3rd trimester program)
Small pilates ball (can be subbed for a rolled up towel or pillow) */}

      <section className="relative overflow-hidden bg-blush pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="font-cormorant text-section-mobile md:text-2xl font-semibold text-olive mb-4">
                Recommended Equipment
              </h2>
              <ul className="font-inter text-olive/80 space-y-2 list-disc list-inside md:list-outside md:pl-5 text-left">
                <li>Dumbbells</li>
                <li>Long resistance bands</li>
                <li>Short looped resistance bands</li>
                <li>Workout bench (can usually sub an ottoman, couch, box step, etc)</li>
                <li>Large exercise ball (especially for 3rd trimester program)</li>
                <li>Small pilates ball (can be subbed for a rolled up towel or pillow)</li>
              </ul>
            </div>
          </div>
        </div>
        <SectionFade to="cream" />
      </section>

      <ContactForm
        title="Not Sure Which Program Is Right for You?"
        description="Tell us a bit about where you are and what you're looking for. Erin will reply by email to help you find the best fit."
      />
    </>
  );
}
