import Button from "./Button";

interface HeroProps {
  title: string;
  japaneseText?: string;
  subtitle?: string;
  description?: string;
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
  japaneseText,
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
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-cream/70" />
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-sage/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-blush/20 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center pt-20">
        {/* Main Title */}
        <h1 className="font-cormorant text-hero-mobile md:text-hero font-semibold text-olive mb-4 tracking-wide">
          {title}
        </h1>

        {/* Japanese Text */}
        {japaneseText && (
          <p className="font-noto text-2xl md:text-3xl text-terracotta mb-6">
            {japaneseText}
          </p>
        )}

        {/* Subtitle */}
        {subtitle && (
          <h2 className="font-cormorant text-xl md:text-2xl text-olive/90 mb-4">
            {subtitle}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p className="font-inter text-lg md:text-xl text-olive/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>
        )}

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCta && (
              <Button variant="primary" href={primaryCta.href}>
                {primaryCta.text}
              </Button>
            )}
            {secondaryCta && (
              <Button variant="secondary" href={secondaryCta.href}>
                {secondaryCta.text}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
