"use client";

import { useState } from "react";
import Button from "./Button";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !name.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="bg-sage/15 section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-sage/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-olive"
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
          </div>
          <h3 className="font-cormorant text-2xl md:text-3xl font-semibold text-olive mb-2">
            Welcome to the Community!
          </h3>
          <p className="font-inter text-olive/80">
            Check your inbox for a welcome message.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sage/15 section-padding">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-4">
          Stay Connected
        </h2>
        <p className="font-inter text-olive/80 mb-8 max-w-lg mx-auto">
          Join our community for evidence-based tips, movement inspiration, and
          updates on new resources for your perinatal journey.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-lg border border-blush bg-white font-inter text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors hover:border-terracotta/50"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-lg border border-blush bg-white font-inter text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors hover:border-terracotta/50"
          />
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "..." : "Join"}
          </Button>
        </form>

        {error && (
          <p className="mt-3 font-inter text-sm text-red-500">{error}</p>
        )}

        <p className="font-inter text-xs text-olive/50 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
