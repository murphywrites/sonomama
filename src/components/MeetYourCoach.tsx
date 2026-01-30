import Image from "next/image";
import Button from "./Button";

export default function MeetYourCoach() {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative max-w-sm mx-auto lg:max-w-md order-1 lg:order-1">
            <div className="absolute inset-0 bg-terracotta/20 rounded-2xl transform -rotate-3" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-blush shadow-lg">
              <Image
                src="/assets/erin-placeholder.svg"
                alt="Erin Murphy, PT, DPT - Perinatal Physical Therapist"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            <p className="font-inter text-terracotta font-medium text-sm tracking-wide uppercase mb-2">
              Meet Your Coach
            </p>
            <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-4">
              Erin Murphy, PT, DPT
            </h2>
            <p className="font-inter text-sm text-olive/60 mb-6">
              Doctor of Physical Therapy | Perinatal & Postpartum Specialist
            </p>

            <div className="space-y-4 font-inter text-olive/85 leading-relaxed mb-8">
              <p>
                As a physical therapist and mother, I understand the profound
                transformation your body goes through during pregnancy and
                postpartum.
              </p>
              <p>
                My approach combines evidence-based physical therapy with
                compassionate coaching—meeting you exactly where you are, without
                pressure to &ldquo;bounce back.&rdquo;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="primary" href="/about">
                Learn More About Erin
              </Button>
              <Button variant="secondary" href="/resources">
                View Programs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
