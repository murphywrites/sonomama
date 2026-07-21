"use client";

import { useEffect, useRef } from "react";
import SectionFade from "./SectionFade";

const KIT_FORM_UID = "bcb7c05c22";
const KIT_SCRIPT_SRC = `https://dr-erin-murphy-dpt.kit.com/${KIT_FORM_UID}/index.js`;

export default function KitSignupEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.querySelector(`script[data-uid="${KIT_FORM_UID}"]`)) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = KIT_SCRIPT_SRC;
    script.setAttribute("data-uid", KIT_FORM_UID);
    container.appendChild(script);

    return () => {
      container.querySelector(`form[data-uid="${KIT_FORM_UID}"]`)?.remove();
      script.remove();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream section-padding pb-24 md:pb-32">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-inter text-olive/80 mb-8 max-w-lg mx-auto">
          Join our community for evidence-based tips, movement inspiration, and
          updates on new resources for your perinatal journey.
        </p>

        <div
          ref={containerRef}
          className="kit-form-wrapper mx-auto w-full max-w-[700px] min-h-[120px]"
        />
      </div>
      <SectionFade to="cream" />
    </section>
  );
}
