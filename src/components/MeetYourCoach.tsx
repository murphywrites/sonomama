import Image from "next/image";
import Button from "./Button";

export default function MeetYourCoach() {
  return (
    <section className="bg-cream section-padding">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative w-full max-w-sm mx-auto lg:max-w-md aspect-[4/5] order-1 lg:order-1">
            <div className="absolute inset-0 bg-terracotta/20 rounded-2xl transform -rotate-3" />
            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-blush shadow-lg">
              <Image
                src="/assets/photos/boxer.jpeg"
                alt="Erin Murphy - Perinatal Physical Therapist"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
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
                I&apos;m a physical therapist, a mother, and someone who
                believes deeply that your body is capable of incredible
                things&mdash;especially during the perinatal journey.
              </p>
              <p>
                The Murphy Method was born from seeing how little women are
                truly educated and empowered to move during this time. My
                approach is evidence-based, realistic, and built for real mom
                life&mdash;no pressure to &ldquo;bounce back,&rdquo; just
                expert support to help you feel strong and seen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="primary" href="/about">
                Learn More About Erin
              </Button>
              <Button variant="secondary" href="/programs">
                View Programs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
