"use client";

import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

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

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextTestimonial]);

  return (
    <section className="bg-blush/30 section-padding">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-12 text-center">
          What Moms Are Saying
        </h2>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonial Content */}
          <div className="text-center min-h-[200px] flex flex-col justify-center">
            <blockquote className="font-cormorant text-xl md:text-2xl text-olive leading-relaxed mb-6 italic">
              &ldquo;{testimonials[currentIndex].quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-inter font-medium text-olive">
                {testimonials[currentIndex].author}
              </p>
              <p className="font-inter text-sm text-olive/60">
                {testimonials[currentIndex].context}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-8 p-2 text-olive/40 hover:text-olive transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded-full"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-8 p-2 text-olive/40 hover:text-olive transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded-full"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 ${
                  index === currentIndex
                    ? "bg-terracotta w-6"
                    : "bg-olive/30 hover:bg-olive/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
