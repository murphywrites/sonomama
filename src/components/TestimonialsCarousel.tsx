"use client";

import { useState, useEffect, useCallback } from "react";
import type { Testimonial } from "@/lib/types";
import SectionFade from "./SectionFade";

const testimonials: Testimonial[] = [
  {
    quote:
      "I started Erin's program in my first trimester, and I can honestly say that it was a tremendous aid throughout my pregnancy and postpartum journey. Erin was always encouraging, created workouts that were tailored to each stage of my journey, and I knew that I could trust her expertise. My delivery and postpartum recovery experience were incredibly positive, and I truly believe that the work I did through Erin's program made this possible! I have bragged about this program to all of my friends— with all of the misinformation and conflicting opinions on what to do/what not to do during your pregnancy, it's SO comforting to have a trusted coach like Erin in your corner!!",
    author: "Abbie",
    context: "",
  },
  {
    quote:
      "This pregnancy workout program really helped me stay strong while also preparing me for birth and postpartum recovery. I love that the exercises are tailored for each trimester and there are options to modify based on your individual needs. It allowed me to keep moving and feel pretty comfortable even at the end of my pregnancy. I really relied on the core strength I built and the stretching I had done through the program once I was in my first few weeks postpartum and I'm sure it had a positive impact on my C-section recovery!",
    author: "Cassie",
    context: "",
  },
  {
    quote:
      "Erin helped me build back my strength and get back to the things I love to do, like running, postpartum. It's not a quick fix (if only that existed!), but it was an effective approach to building back to my strongest self. This program helped me keep focused and committed during the first year of my baby's life and it gave me one less thing to have to think about amidst the million decisions a moms in a day. Plus, Erin offered good support and motivation with reminding me that it took 9 months to build my child and to offer myself that same patience with re-building my strength and endurance.",
    author: "Meg",
    context: "",
  },
  {
    quote:
      "As a first time mom, everything about pregnancy was new to me and a little overwhelming. I wanted to keep up my habit of regular strength training and be as prepared as possible for birth. There are SO many different pregnancy workout programs to choose from and I'm so happy to have found The Murphy Method. This plan is very well informed and I felt confident trusting the information. Erin is a Doctor of Physical Therapist and has additional training and education in prenatal and postpartum exercise. I knew working with Erin would support me in my goal of being as physically prepared as possible for birth. It's simple to follow: Erin makes it so easy to understand having correct form with exercises and the purpose behind the movements. I would highly recommend this program to friends and family",
    author: "Emma",
    context: "",
  },
  {
    quote:
      "This postpartum movement program supported my C-section recovery really well. My favorite part is the flexibility - I could do the exercises almost anywhere, anytime, as a set or individually - which is so important when you have a new baby to take care of. Plus the exercises just feel good! After major abdominal surgery and lots of picking baby up and down during the day (once I was cleared to do so), I kept coming back to this program because it helped a ton with relieving back soreness and rebuilding core strength.",
    author: "Cassie",
    context: "",
  },
  {
    quote:
      "I definitely attribute feeling good and being able to stay active through the end of 3rd trimester to this program! It adapted to my needs throughout pregnancy and helped me feel confident that I was doing the most effective things for both baby and me to prep for birth",
    author: "Kate",
    context: "",
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
    <section className="relative overflow-hidden bg-blush section-padding pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-12 text-center">
          {"What Moms Are Saying"}
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
            {t.context && (
              <p className="font-inter text-sm text-olive/60">{t.context}</p>
            )}

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
      <SectionFade to="cream" />
    </section>
  );
}
