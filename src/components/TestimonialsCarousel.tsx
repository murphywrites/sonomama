"use client";

import { useState, useEffect, useCallback } from "react";
import type { Testimonial } from "@/lib/types";

const testimonials: Testimonial[] = [
  {
    quote:
      "Erin's approach completely changed how I view my postpartum body. Instead of pushing to 'get back' to where I was, she helped me build something even stronger.",
    author: "Sarah M.",
    context: "4 months postpartum",
  },
  {
    quote:
      "I finally understand my pelvic floor and core. The education combined with practical exercises gave me confidence I didn't know I was missing.",
    author: "Jessica T.",
    context: "2nd pregnancy",
  },
  {
    quote:
      "After two C-sections, I felt disconnected from my body. Working with Erin helped me rebuild not just strength, but trust in myself.",
    author: "Amanda R.",
    context: "Mom of two",
  },
  {
    quote:
      "The evidence-based approach was exactly what I needed. No gimmicks, no pressure—just real support for where I was in my journey.",
    author: "Michelle K.",
    context: "1 year postpartum",
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
  }, []);

  const next = useCallback(() => {
    goToSlide((currentIndex + 1) % testimonials.length);
  }, [currentIndex, goToSlide]);

  const prev = useCallback(() => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
  }, [currentIndex, goToSlide]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const t = testimonials[currentIndex];

  return (
    <section className="bg-blush/30 section-padding">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-12 text-center">
          What Moms Are Saying
        </h2>

        <div
          className="flex items-center gap-4 md:gap-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev Arrow */}
          <button
            onClick={prev}
            className="shrink-0 p-2 text-olive/40 hover:text-olive transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded-full"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slide content */}
          <div
            className={`flex-1 text-center transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Avatar */}
            <div className="flex justify-center mb-5">
              {t.photo ? (
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blush shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.photo} alt={t.author} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-sage/30 border-2 border-blush flex items-center justify-center">
                  <span className="font-cormorant text-xl font-semibold text-olive">
                    {t.author.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <blockquote className="font-cormorant text-xl md:text-2xl text-olive leading-relaxed mb-5 italic min-h-[80px]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <p className="font-inter font-medium text-olive">{t.author}</p>
            <p className="font-inter text-sm text-olive/60">{t.context}</p>

            {/* Progress bar */}
            <div className="mt-6 h-0.5 bg-olive/10 rounded-full overflow-hidden max-w-xs mx-auto">
              {!isPaused && (
                <div
                  key={currentIndex}
                  className="h-full bg-terracotta/60 rounded-full"
                  style={{ animation: "progressFill 6s linear forwards" }}
                />
              )}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 ${
                    i === currentIndex
                      ? "bg-terracotta w-6"
                      : "bg-olive/30 hover:bg-olive/50 w-2"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={next}
            className="shrink-0 p-2 text-olive/40 hover:text-olive transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded-full"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
