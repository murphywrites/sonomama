"use client";

import { useState } from "react";
import ResourceCard from "@/components/ResourceCard";
import ContactForm from "@/components/ContactForm";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import Button from "@/components/Button";
import SectionFade from "@/components/SectionFade";
import type { Resource } from "@/lib/types";

const programTeasers = [
  {
    id: "pregnancy-sync-workout-plans",
    title: "Pregnancy Synced Workout Plans",
    subtitle: "Synced to where you are in your pregnancy",
    price: "$147",
  },
  {
    id: "postpartum-workout-plans",
    title: "Postpartum Workout Plans",
    subtitle: "Gentle mobility, reconnection, and progressive strength for early postpartum through weeks 6–14.",
    price: "$297",
  },
  {
    id: "moms-any-phase-of-life",
    title: "Moms in any phase of life",
    subtitle: "Start with Strength, 3x/week full body strength workouts with a new block every 8 weeks",
    price: "$147",
  },
];

const freeResources: Resource[] = [
  {
    id: "pelvic-floor-101",
    title: "Pelvic Floor 101: What Every Mom Should Know",
    description:
      "A practical guide to understanding and caring for your pelvic floor through pregnancy and postpartum.",
    buttonText: "Download Free",
    link: "",
    isFree: true,
    thumbnail: "/assets/resource-thumbnails/resource-4.svg",
  },
  {
    id: "daily-movement",
    title: "5-Minute Daily Movement Practice",
    description:
      "Gentle movements to reconnect with your body, even on the hardest days.",
    buttonText: "Download Free",
    link: "",
    isFree: true,
    thumbnail: "/assets/resource-thumbnails/resource-5.svg",
  },
  {
    id: "diastasis-recti",
    title: "Diastasis Recti: Myths vs. Evidence",
    description:
      "Separating fact from fear when it comes to abdominal separation.",
    buttonText: "Download Free",
    link: "",
    isFree: true,
    thumbnail: "/assets/resource-thumbnails/resource-6.svg",
  },
];

export default function ResourcesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  const handleFreeResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Header Section */}
      <section className="relative overflow-hidden bg-cream pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h1 className="font-cormorant text-hero-mobile md:text-5xl font-semibold text-olive mb-4">
            Free Resources
          </h1>
          <p className="font-inter text-lg text-olive/80 max-w-2xl mx-auto">
            Evidence-based guides to support your perinatal journey—yours at no
            cost.
          </p>
        </div>
        <SectionFade to="white" />
      </section>

      <section className="relative overflow-hidden bg-white pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freeResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onFreeResourceClick={handleFreeResourceClick}
              />
            ))}
          </div>
        </div>
        <SectionFade to="sage-light" />
      </section>

      {/* Programs Teaser Strip */}
      <section className="relative overflow-hidden bg-sage/15 py-10 md:py-12 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <p className="font-inter text-sm text-olive/60 uppercase tracking-wide text-center mb-6">
            {"Looking for structured programs?"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {programTeasers.map((p) => (
              <div
                key={p.id}
                className="bg-cream rounded-xl p-5 text-center shadow-sm"
              >
                <h3 className="font-cormorant text-xl font-semibold text-olive mb-1">
                  {p.title}
                </h3>
                <p className="font-inter text-sm text-olive/60 mb-2">
                  {p.subtitle}
                </p>
                <p className="font-inter text-lg font-medium text-terracotta">
                  {p.price}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="primary" href="/programs">
              View All Programs
            </Button>
          </div>
        </div>
        <SectionFade to="sage-light" />
      </section>


      <ContactForm
        title="Not Sure Where to Start?"
        description="Send a message about your goals and Erin will help point you in the right direction."
      />

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resource={selectedResource}
      />
    </>
  );
}
