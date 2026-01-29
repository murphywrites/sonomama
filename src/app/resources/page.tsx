"use client";

import { useState } from "react";
import ResourceCard from "@/components/ResourceCard";
import ResourceTabs from "@/components/ResourceTabs";
import EmailCaptureModal from "@/components/EmailCaptureModal";
import type { Resource } from "@/lib/types";

const paidResources: Resource[] = [
  {
    id: "foundations",
    title: "Foundations: 6-Week Postpartum Recovery Program",
    description:
      "Return to strength safely with expert-guided progressions for your core and pelvic floor.",
    price: "$147",
    buttonText: "Get Started",
    link: "#stripe-link-placeholder",
    isFree: false,
    thumbnail: "/assets/resource-thumbnails/resource-1.svg",
  },
  {
    id: "strong-mama",
    title: "Strong Mama: 12-Week Strength Training",
    description:
      "Build full-body strength with programs designed for real mom life—safe, effective, sustainable.",
    price: "$297",
    buttonText: "Get Started",
    link: "#stripe-link-placeholder",
    isFree: false,
    thumbnail: "/assets/resource-thumbnails/resource-2.svg",
  },
  {
    id: "virtual-pt",
    title: "1:1 Virtual PT Sessions",
    description:
      "Personalized assessment and treatment plans for your specific needs.",
    price: "$175/session",
    buttonText: "Book Session",
    link: "#stripe-link-placeholder",
    isFree: false,
    thumbnail: "/assets/resource-thumbnails/resource-3.svg",
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
  const [activeTab, setActiveTab] = useState<"paid" | "free">("paid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  const handleFreeResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const currentResources = activeTab === "paid" ? paidResources : freeResources;

  return (
    <>
      {/* Header Section */}
      <section className="bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h1 className="font-cormorant text-hero-mobile md:text-5xl font-semibold text-olive mb-4">
            Resources to Support Your Journey
          </h1>
          <p className="font-inter text-lg text-olive/80 max-w-2xl mx-auto">
            From free guides to comprehensive programs, find the support that
            meets you where you are.
          </p>
        </div>
      </section>

      {/* Resources Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <ResourceTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentResources.map((resource) => (
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
        onClose={handleCloseModal}
        resource={selectedResource}
      />
    </>
  );
}
