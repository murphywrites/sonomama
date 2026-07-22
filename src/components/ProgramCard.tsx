"use client";

import { useState } from "react";
import Button from "./Button";
import ProgramCheckoutModal from "./ProgramCheckoutModal";
import type { Program, ProgramFeature } from "@/lib/types";

interface ProgramCardProps {
  program: Program;
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-terracotta mt-0.5 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function FeatureItem({ feature }: { feature: ProgramFeature }) {
  if (typeof feature === "string") {
    return (
      <li className="flex items-start gap-2 font-inter text-sm text-olive/80">
        <CheckIcon />
        {feature}
      </li>
    );
  }

  return (
    <li className="font-inter text-sm text-olive/80">
      <div className="flex items-start gap-2">
        <CheckIcon />
        {feature.label}
      </div>
      <ul className="mt-2 ml-6 space-y-2">
        {feature.children.map((child, i) => (
          <li key={i} className="flex items-start gap-2 pl-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-terracotta/70 mt-2 shrink-0"
              aria-hidden="true"
            />
            {child}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <article className="bg-white flex flex-col h-full overflow-hidden max-lg:py-8 lg:rounded-2xl lg:shadow-card lg:border lg:border-blush/40">
        {program.badge && (
          <div className="bg-terracotta text-white font-inter text-xs font-medium tracking-wide uppercase text-center py-2 px-4">
            {program.badge}
          </div>
        )}

        <div className="flex flex-col flex-1 h-full lg:p-8">
          <h3 className="font-cormorant text-2xl font-semibold text-olive mb-6">
            {program.title}
          </h3>

          <div className="flex flex-col flex-1 min-h-0">
            <ul className="space-y-3">
              {program.features.map((feature, i) => (
                <FeatureItem key={i} feature={feature} />
              ))}
            </ul>
          </div>

          <div className="border-t border-blush/40 pt-6 mt-auto">
            {program.price && (
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-cormorant text-3xl font-semibold text-olive">
                  {program.price}
                </span>
                {program.priceNote && (
                  <span className="font-inter text-sm text-olive/50">
                    {program.priceNote}
                  </span>
                )}
              </div>
            )}
            {program.description && (
              <p className="font-inter text-sm text-olive/75 leading-relaxed mb-4">
                {program.description}
              </p>
            )}
            <Button
              variant="primary"
              onClick={() => setCheckoutOpen(true)}
              className="w-full justify-center"
            >
              {program.buttonText}
            </Button>
          </div>
        </div>
      </article>
      {checkoutOpen && (
        <ProgramCheckoutModal
          programId={program.id}
          programTitle={program.title}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </>
  );
}
