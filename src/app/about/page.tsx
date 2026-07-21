import Image from "next/image";
import type { Metadata } from "next";
import Button from "@/components/Button";
import SectionFade from "@/components/SectionFade";

export const metadata: Metadata = {
  title: "About | Erin Murphy, PT, DPT",
  description:
    "Meet Erin Murphy — physical therapist, mother, and founder of The Murphy Method — supporting moms through pregnancy, postpartum, and beyond.",
};

const credentials = [
  "Doctor of Physical Therapy, Northwestern University",
  "Perinatal & Postpartum Corrective Exercise Specialist",
  "Certified #BoyMom",
];

const methodContrasts = [
  {
    not: "Quick fixes and promises to help you \u201Cbounce back\u201D (whatever that means\u2026)",
    instead:
      "Building a foundation of mobility, strength, and confidence over time so you can live an active, healthy, pain-free life for years to come",
  },
  {
    not: "Trendy workouts not based in science",
    instead:
      "Tried and true, evidence-based workouts, mobility routines, core connection, and birth prep",
  },
  {
    not: "Programs created by someone whose only credentials are that they had a baby themselves and enjoy working out",
    instead:
      "Programs created by someone who does have firsthand experience with carrying, delivering, and raising a baby, but ALSO someone who has more than 7 years of experience as a Doctor of Physical Therapy, 5 years creating strength plans for all demographics, 3 years creating workout plans and education for women specifically in the perinatal time frame, lots of self-directed study on the best ways to support moms during pregnancy and postpartum, and more formally completed coursework to become certified as a Pregnancy and Postpartum Corrective Exercise Specialist.",
  },
  {
    not: "Accepting that pain, incontinence, and other dysfunction are just what happen during pregnancy and postpartum",
    instead:
      "Knowing that these things may be common, but we do not need to be resigned to accept them. Focused work can address these issues and leave you feeling strong and confident in your body",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Bio Section — sticky full-height photo on desktop */}
      <section className="relative bg-cream">
        <div className="lg:grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative px-6 pt-24 md:px-10 lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-5rem)] lg:py-6 lg:pl-12 lg:pr-4">
            <h1 className="mb-6 font-cormorant text-hero-mobile font-semibold text-olive lg:hidden">
              Hi, I&apos;m Erin
            </h1>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-auto lg:h-full">
              <Image
                src="/assets/photos/lookandsquat.jpeg"
                alt="Erin Murphy - Doctor of Physical Therapy"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-bottom lg:object-center"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-6 md:px-12 lg:px-16 xl:px-24 py-12 md:py-16 lg:py-20">
            <h1 className="mb-6 hidden font-cormorant text-hero-mobile font-semibold text-olive lg:block lg:text-5xl">
              Hi, I&apos;m Erin
            </h1>

            <div className="space-y-6 font-inter text-olive/85 leading-relaxed">
                <p>
                  I&apos;m a physical therapist, a mother, and someone who
                  believes deeply that your body is capable of incredible
                  things. I mean&hellip;if you&apos;re reading this you likely
                  are building or have built a baby!
                </p>

                <p>
                  What has now become The Murphy Method was conceived before I
                  was even pregnant myself, as I saw a huge need among my
                  friends and family who were entering motherhood. I have been
                  shocked by how little women are educated and empowered to move
                  their bodies effectively and appropriately during this time
                  period&mdash;whether it be women who were scared to exercise
                  at all while pregnant or those who went immediately for a
                  5-mile run after their 6-week appointment that
                  &ldquo;cleared&rdquo; them for exercise.
                </p>

                <p>
                  Lots of well-intentioned advice others may offer you is
                  outdated, many online workout plans or recommendations really
                  miss the mark, and our medical system often does not allow for
                  sufficient time with providers for education and dialogue.
                </p>

                <p>
                  After navigating my own perinatal journey, I saw even more
                  clearly how few resources truly honored the complexity of this
                  transition, were based in up-to-date evidence, and were
                  actually realistic and approachable. That made me commit anew
                  to pursuing more expertise in the perinatal time frame and
                  building out even more my offerings for moms.
                </p>

                <p>
                  I am proud of what I have created with The Murphy Method and I
                  hope it helps you feel seen, supported, and strong as hell.
                </p>

                <p>
                  Whether you&apos;re managing pelvic floor challenges,
                  preparing for birth, rebuilding core strength, progressing
                  back toward running, or simply wanting to feel strong in your
                  changing body, I&apos;m here to guide you with expertise,
                  encouragement, and empathy.
                </p>

                <p className="font-medium text-olive">
                  Your body is home. Let&apos;s make it feel like one.
                </p>

                <p className="font-cormorant text-xl text-terracotta">– Erin</p>
            </div>
            <div className="mt-8 flex justify-center">
              <Button href="/programs">Explore Programs</Button>
            </div>
          </div>
        </div>
        <SectionFade to="blush" />
      </section>

      {/* Credentials Section */}
      <section className="relative overflow-hidden bg-blush section-padding pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-10">
            Credentials & Training
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {credentials.map((credential, index) => (
              <div
                key={index}
                className="bg-cream p-6 rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200 flex items-center justify-center text-center"
              >
                <p className="font-inter text-olive/90">{credential}</p>
              </div>
            ))}
          </div>
        </div>
        <SectionFade to="sage" />
      </section>

      {/* Philosophy Section */}
      <section className="relative overflow-hidden bg-sage/15 section-padding pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-10 text-center">
            The Murphy Method
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
            <div className="space-y-4">
              <h3 className="font-inter text-xs font-medium uppercase tracking-wider text-olive/45">
                What we don&apos;t offer
              </h3>
              {methodContrasts.map((pair, index) => (
                <div
                  key={index}
                  className="bg-white/40 rounded-card p-6 md:p-7 border border-olive/10"
                >
                  <p className="font-inter text-olive/70 leading-relaxed">
                    {pair.not}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="font-inter text-xs font-medium uppercase tracking-wider text-terracotta">
                Instead
              </h3>
              {methodContrasts.map((pair, index) => (
                <div
                  key={index}
                  className="bg-white rounded-card p-6 md:p-7 border border-terracotta/25 shadow-card"
                >
                  <p className="font-inter text-olive/85 leading-relaxed">
                    {pair.instead}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <SectionFade to="olive" />
      </section>
    </>
  );
}
