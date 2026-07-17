import Image from "next/image";
import Button from "./Button";
import SectionFade from "./SectionFade";

export default function MeetYourCoach() {
  return (
    <section className="relative overflow-hidden bg-cream section-padding pb-24 md:pb-32">
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
{/* 
          Erin Murphy, PT, DPT
Doctor of Physical Therapy | Pregnancy and Postpartum Corrective Exercise Specialist
As a lifelong athlete, physical therapist, and mother, I understand firsthand the profound transformation your body goes through during pregnancy and postpartum. It is incredible! But it can also be humbling.


I also have the knowledge and expertise to create something better than your run-of-the-mill influencer workout plan for moms. My approach combines evidence-based exercise with compassionate and supportive coaching to help you reach your goals in any season of life. */}


          {/* Content */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            <p className="font-inter text-terracotta font-medium text-sm tracking-wide uppercase mb-2">
              Meet Your Coach
            </p>
            <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-4">
              Erin Murphy, PT, DPT
            </h2>
            <p className="font-inter text-sm text-olive/60 mb-6">
              Doctor of Physical Therapy | Pregnancy and Postpartum Corrective Exercise Specialist
            </p>

            <div className="space-y-4 font-inter text-olive/85 leading-relaxed mb-8">
              <p>
              As a lifelong athlete, physical therapist, and mother, I understand firsthand the profound transformation your body goes through during pregnancy and postpartum. It is incredible! But it can also be humbling.
              </p>
              <p>
              I also have the knowledge and expertise to create something better than your run-of-the-mill influencer workout plan for moms. My approach combines evidence-based exercise with compassionate and supportive coaching to help you reach your goals in any season of life.
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
      <SectionFade to="blush" />
    </section>
  );
}
