type SectionFadeTarget =
  | "white"
  | "cream"
  | "blush"
  | "sage"
  | "olive";

/** Exact next-section background colors used by SectionFade */
const fadeColors: Record<SectionFadeTarget, string> = {
  white: "#ffffff",
  cream: "#FFF8F5",
  blush: "#FFB4D2",
  sage: "color-mix(in srgb, #00E5FF 20%, #FFF8F5)",
  olive: "#0b719e",
};

interface SectionFadeProps {
  to: SectionFadeTarget;
}

export default function SectionFade({ to }: SectionFadeProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[5]"
      style={{
        background: `linear-gradient(to bottom, transparent 40%, ${fadeColors[to]} 100%)`,
      }}
      aria-hidden="true"
    />
  );
}
