import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Erin | SONOMAMA",
  description:
    "Meet Erin, a Doctor of Physical Therapy and perinatal specialist supporting moms through pregnancy, postpartum, and beyond.",
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
                  alt="Erin - Physical Therapist and founder of SONOMAMA"
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
                  things—especially when you meet it where it is.
                </p>

                <p>
                  After navigating my own perinatal journey, I saw how few
                  resources truly honored the complexity of this transition.
                  Motherhood changes us, and movement should change with us.
                </p>

                <p>
                  SONOMAMA was born from that realization. The name captures
                  everything I believe about this work: you don&apos;t need to
                  be fixed. You need to be supported, strengthened, and seen—as
                  you are.
                </p>

                <p>
                  Whether you&apos;re managing pelvic floor challenges,
                  rebuilding core strength, or simply wanting to feel strong in
                  your changing body, I&apos;m here to guide you with expertise,
                  empathy, and evidence.
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
            The SONOMAMA Philosophy
          </h2>
          <p className="font-inter text-lg text-olive/80 leading-relaxed">
            At SONOMAMA, we embrace things as they naturally are—without force,
            without judgment. In perinatal care, this means honoring your
            body&apos;s wisdom, respecting your timeline, and building strength
            from a place of acceptance rather than pressure to &ldquo;bounce
            back.&rdquo;
          </p>
        </div>
      </section>
    </>
  );
}
