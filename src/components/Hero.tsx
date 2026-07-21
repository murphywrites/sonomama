import Image from "next/image";
import Button from "./Button";

interface HeroProps {
  title: string;
  decorativeText?: string;
  subtitle?: string;
  description: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  fullHeight?: boolean;
}

export default function Hero({
  title,
  decorativeText,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  fullHeight = true,
}: HeroProps) {
  return (
    <section
      className={`relative flex items-center justify-center ${
        fullHeight ? "min-h-screen" : "min-h-[60vh]"
      } bg-cream overflow-hidden`}
    >
      {/* Landscape + mother & child (composed in SVG) */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      {/* Transparent figure overlay — left side (ensures visibility even if SVG cache is stale) */}
      <img
        src="/assets/artwork/motherandchild-cropped.png"
        alt=""
        aria-hidden="true"
        className="absolute z-[1] pointer-events-none left-0 bottom-[8%] md:bottom-[6%] h-[58%] md:h-[68%] w-auto max-w-[44%] md:max-w-[30%] object-contain object-left-bottom"
      />

      {/* Soft right-side wash so glass content stays readable */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-transparent from-35% via-cream/10 to-cream/50"
        aria-hidden="true"
      />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-sage/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none z-[2]" />
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-blush/20 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none z-[2]" />

      {/* Fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none z-[5]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 40%, #ffffff 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content — centered glass floats above figure */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 md:px-12 text-center pt-20 pb-20 md:pb-28">
        <div className="relative p-6 md:p-8 rounded-3xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none" />
          <div className="absolute -inset-1 bg-gradient-to-r from-terracotta/20 via-sage/20 to-terracotta/20 blur-2xl opacity-30 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="relative w-[min(70vw,220px)] h-[min(70vw,220px)] md:w-[260px] md:h-[260px] flex items-center justify-center">
                <Image
                  src="/assets/logos/murphymethodlogo.png"
                  alt="The Murphy Method"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>

            <h1 className="font-cormorant text-hero-mobile md:text-hero font-semibold text-olive mb-4 tracking-wide">
              {title}
            </h1>

            {decorativeText && (
              <p className="font-noto text-2xl md:text-3xl text-terracotta mb-6">
                {decorativeText}
              </p>
            )}

            {subtitle && (
              <h2 className="font-cormorant text-xl md:text-2xl text-olive/90 mb-4">
                {subtitle}
              </h2>
            )}

            {description && (
              <p className="font-inter text-md md:text-xl text-olive/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                {description}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {primaryCta && (
                  <Button variant="primary" href={primaryCta.href}>
                    {primaryCta.text}
                  </Button>
                )}
                {secondaryCta && (
                  <Button variant="cream" href={secondaryCta.href}>
                    {secondaryCta.text}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
