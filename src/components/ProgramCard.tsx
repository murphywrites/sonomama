import Button from "./Button";
import type { Program } from "@/lib/types";

interface ProgramCardProps {
  program: Program;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-blush/40 flex flex-col overflow-hidden">
      {program.badge && (
        <div className="bg-terracotta text-white font-inter text-xs font-medium tracking-wide uppercase text-center py-2 px-4">
          {program.badge}
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-cormorant text-2xl font-semibold text-olive mb-2">
          {program.title}
        </h3>

        <p className="font-inter text-olive/75 leading-relaxed mb-6">
          {program.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-8 flex-1">
          {program.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 font-inter text-sm text-olive/80">
              <svg
                className="w-4 h-4 text-terracotta mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="border-t border-blush/40 pt-6">
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
          <Button variant="primary" href={program.stripeLink} className="w-full justify-center">
            {program.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
