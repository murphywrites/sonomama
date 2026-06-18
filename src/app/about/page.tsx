import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Erin Murphy, DPT",
  description:
    "Meet Erin Murphy — physical therapist, mother, and founder of The Murphy Method — supporting moms through pregnancy, postpartum, and beyond.",
};

const credentials = [
  "Doctor of Physical Therapy",
  "Perinatal & Postpartum Corrective Exercise Specialist",
  "Certified Strength & Conditioning Coach",
  "Based in Sonoma County, CA",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-sage/20 rounded-2xl transform rotate-3" />
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-blush">
                <Image
                  src="/assets/erin-placeholder.svg"
                  alt="Erin Murphy - Doctor of Physical Therapy"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h1 className="font-cormorant text-hero-mobile md:text-5xl font-semibold text-olive mb-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="bg-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-10">
            Credentials & Training
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {credentials.map((credential, index) => (
              <div
                key={index}
                className="bg-cream p-6 rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200"
              >
                <p className="font-inter text-olive/90">{credential}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-sage/15 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-6">
            The Murphy Method
          </h2>
          <p className="font-inter text-lg text-olive/80 leading-relaxed">
            Evidence-based, realistic, and built for real mom life. The Murphy
            Method exists because you deserve guidance that actually honors
            where you are&mdash;not outdated advice, not generic plans, and not
            a 6-week clearance that treats birth recovery as a checkbox. Just
            expert support that meets you exactly as you are.
          </p>
        </div>
      </section>
    </>
  );
}
