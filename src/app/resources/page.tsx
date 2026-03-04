"use client";

import { useState } from "react";
import ResourceCard from "@/components/ResourceCard";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import Button from "@/components/Button";
import type { Resource } from "@/lib/types";

const programTeasers = [
  {
    id: "foundations",
    title: "Foundations",
    subtitle: "6-Week Postpartum Recovery",
    price: "$147",
  },
  {
    id: "strong-mama",
    title: "Strong Mama",
    subtitle: "12-Week Strength Training",
    price: "$297",
  },
  {
    id: "virtual-pt",
    title: "1:1 Virtual PT",
    subtitle: "Personalized Sessions",
    price: "$175/session",
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
      <section className="bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h1 className="font-cormorant text-hero-mobile md:text-5xl font-semibold text-olive mb-4">
            Free Resources
          </h1>
          <p className="font-inter text-lg text-olive/80 max-w-2xl mx-auto">
            Evidence-based guides to support your perinatal journey—yours at no
            cost.
          </p>
        </div>
      </section>

      {/* Programs Teaser Strip */}
      <section className="bg-sage/15 py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <p className="font-inter text-sm text-olive/60 uppercase tracking-wide text-center mb-6">
            Looking for structured programs?
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
      </section>

      {/* Divider */}
      <div className="flex items-center max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-8">
        <div className="flex-1 border-t border-blush" />
        <p className="font-inter text-sm text-olive/50 mx-6">
          Or explore our free resources below
        </p>
        <div className="flex-1 border-t border-blush" />
      </div>

      {/* Free Resources Grid */}
      <section className="bg-white pb-16 md:pb-24">
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
      </section>

      {/* CTA Section */}
      <section className="bg-sage/15 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="font-inter text-lg text-olive/80 mb-6">
            Book a free 15-minute consultation call to discuss your goals and
            find the right path forward.
          </p>
          <a
            href="#consultation-link-placeholder"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-inter font-medium text-base transition-all duration-200 bg-terracotta text-white hover:bg-terracotta-dark"
          >
            Schedule a Call
          </a>
        </div>
      </section>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resource={selectedResource}
      />
    </>
  );
}
