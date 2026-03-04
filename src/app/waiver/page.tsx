import type { Metadata } from "next";
import WaiverForm from "@/components/WaiverForm";

export const metadata: Metadata = {
  title: "Program Waiver | Erin Murphy, DPT",
  description:
    "Please review and sign the program participation agreement before accessing your program.",
};

export default function WaiverPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h1 className="font-cormorant text-hero-mobile md:text-5xl font-semibold text-olive mb-4">
            Program Participation Agreement
          </h1>
          <p className="font-inter text-lg text-olive/80">
            Please read carefully and complete the form below before accessing
            your program.
          </p>
        </div>
      </section>

      {/* Waiver Form */}
      <section className="bg-white section-padding">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <WaiverForm />
        </div>
      </section>
    </>
  );
}
