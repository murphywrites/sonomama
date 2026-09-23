import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FallChallengeDetails from "@/components/FallChallengeDetails";
import SectionFade from "@/components/SectionFade";

export const metadata: Metadata = {
  title: "Fall Strong Mom Challenge | Erin Murphy, DPT",
  description:
    "A 6-week virtual, self-paced challenge starting October 5. Build functional strength and connect to your core, hips, and pelvic floor.",
};

export default function ChallengePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <p className="font-inter text-terracotta font-medium text-sm tracking-wide uppercase mb-3">
            Current Challenge
          </p>
          <h1 className="font-cormorant text-hero-mobile md:text-5xl font-semibold text-olive mb-4">
            Fall Strong Mom Challenge
          </h1>
          <p className="mb-5 inline-block rounded-full bg-terracotta px-3 py-1 font-inter text-xs font-medium uppercase tracking-wide text-white">
            Starts October 5
          </p>
          <p className="font-inter text-lg text-olive/80">
            6 weeks focusing on building functional strength and connecting to
            the core, hips, and pelvic floor.
          </p>
        </div>
        <SectionFade to="white" />
      </section>

      <section className="relative overflow-hidden bg-white pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24">
          <FallChallengeDetails />
        </div>
        <SectionFade to="cream" />
      </section>

      <ContactForm
        title="Interested in joining?"
        description="Send Erin a message about the Fall Strong Mom Challenge and she’ll follow up with how to get started."
        defaultService="fall-challenge"
      />
    </>
  );
}
