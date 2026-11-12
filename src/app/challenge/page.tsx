import type { Metadata } from "next";
import SectionFade from "@/components/SectionFade";

export const metadata: Metadata = {
  title: "New Year Kickoff Challenge | Erin Murphy, DPT",
  description:
    "Coming soon: the New Year Kickoff Challenge. Details and signup will be posted when the challenge opens.",
};

export default function ChallengePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <p className="font-inter text-terracotta font-medium text-sm tracking-wide uppercase mb-3">
            Upcoming Challenge
          </p>
          <h1 className="font-cormorant text-hero-mobile md:text-5xl font-semibold text-olive mb-4">
            Coming Soon: New Year Kickoff Challenge
          </h1>
          <p className="font-inter text-lg text-olive/80">
            Details and signup will be posted here when the challenge opens.
          </p>
        </div>
        <SectionFade to="olive" />
      </section>
    </>
  );
}
