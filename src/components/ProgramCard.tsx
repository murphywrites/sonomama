"use client";

import { useId, useState } from "react";
import Button from "./Button";
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

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
        expanded ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const previewFeatures = program.features.slice(0, 1);
  const extraFeatures = program.features.slice(1);
  const hasMore = extraFeatures.length > 0;

  return (
    <article className="bg-white flex flex-col h-full overflow-hidden max-lg:py-8 lg:rounded-2xl lg:shadow-card lg:border lg:border-blush/40">
      {program.badge && (
        <div className="bg-terracotta text-white font-inter text-xs font-medium tracking-wide uppercase text-center py-2 px-4">
          {program.badge}
        </div>
      )}

      <div className="flex flex-col flex-1 h-full lg:p-8">
        <h3 className="font-cormorant text-2xl font-semibold text-olive mb-2">
          {program.title}
        </h3>

        {program.description && (
          <p className="font-inter text-olive/75 leading-relaxed mb-6">
            {program.description}
          </p>
        )}

        <div className="flex flex-col flex-1 min-h-0">
          <ul className="space-y-3">
            {previewFeatures.map((feature, i) => (
              <FeatureItem key={i} feature={feature} />
            ))}
          </ul>

          {hasMore && (
            <>
              <div
                id={panelId}
                role="region"
                aria-labelledby={`${panelId}-toggle`}
                aria-hidden={!expanded}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                  expanded
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul
                    className={`space-y-3 pt-3 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                      expanded ? "translate-y-0" : "-translate-y-2"
                    }`}
                  >
                    {extraFeatures.map((feature, i) => (
                      <FeatureItem key={i} feature={feature} />
                    ))}
                  </ul>
                </div>
              </div>

              <button
                id={`${panelId}-toggle`}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setExpanded((open) => !open)}
                className="mt-4 inline-flex items-center gap-1.5 font-inter text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 rounded-sm self-start"
              >
                {expanded ? "See less" : "See more"}
                <ChevronIcon expanded={expanded} />
              </button>
            </>
          )}
        </div>

        <div className="border-t border-blush/40 pt-6 mt-auto">
          <div className="flex items-baseline gap-1 mb-4">
            <span className="font-cormorant text-3xl font-semibold text-olive">
              {program.price}
            </span>
            {program.priceNote && (
              <span className="font-inter text-sm text-olive/50">
                {program.priceNote}
              </span>
            )}
          </div>
          <Button
            variant="primary"
            href={program.stripeLink}
            className="w-full justify-center"
          >
            {program.buttonText}
          </Button>
        </div>
      </div>
    </article>
  );
}
