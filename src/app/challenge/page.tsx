import type { Metadata } from "next";
import FallChallengeDetails from "@/components/FallChallengeDetails";
import ProgramCheckoutButton from "@/components/ProgramCheckoutButton";
import SectionFade from "@/components/SectionFade";

export const metadata: Metadata = {
  title: "Fall Strong Mom Challenge | Erin Murphy, DPT",
  description:
    "A 6-week virtual, self-paced challenge starting October 5. Build functional strength and connect to your core, hips, and pelvic floor.",
};

export default function ChallengePage({
  searchParams,
}: {
  searchParams?: { checkout?: string };
}) {
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

      {searchParams?.checkout === "success" && (
        <div
          role="status"
          className="bg-sage/20 px-6 py-4 text-center font-inter text-sm text-olive"
        >
          Thank you! Your payment was submitted successfully. Erin will follow
          up by email.
        </div>
      )}

      <section className="relative overflow-hidden bg-white pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24">
          <FallChallengeDetails />

          <div className="mt-10 rounded-2xl border border-blush/60 bg-cream px-6 py-8 md:px-10">
            <div className="flex items-baseline gap-1">
              <span className="font-cormorant text-3xl font-semibold text-olive">
                $210
              </span>
              <span className="font-inter text-sm text-olive/50">
                one-time
              </span>
            </div>
            <p className="mt-2 font-inter text-sm text-olive/70">
              Full access to all 6 weeks of the challenge.
            </p>
            <ProgramCheckoutButton
              programId="fall-challenge"
              programTitle="Fall Strong Mom Challenge"
              className="mt-6 w-full justify-center sm:w-auto"
            >
              Join the Challenge
            </ProgramCheckoutButton>
          </div>
        </div>
        <SectionFade to="olive" />
      </section>
    </>
  );
}
