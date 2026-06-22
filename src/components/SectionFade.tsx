type SectionFadeTarget =
  | "white"
  | "cream"
  | "blush"
  | "sage-light"
  | "sage"
  | "olive";

const fadeColors: Record<SectionFadeTarget, string> = {
  white: "#ffffff",
  cream: "#FFF8F5",
  blush: "color-mix(in srgb, #FFB4D2 30%, #FFF8F5)",
  "sage-light": "color-mix(in srgb, #00E5FF 15%, #FFF8F5)",
  sage: "color-mix(in srgb, #00E5FF 20%, #FFF8F5)",
  olive: "#0D1B2A",
};

interface SectionFadeProps {
  to: SectionFadeTarget;
}

export default function SectionFade({ to }: SectionFadeProps) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[5]"
      style={{
        background: `linear-gradient(to bottom, transparent 60%, ${fadeColors[to]} 100%)`,
      }}
      aria-hidden="true"
    />
  );
}
