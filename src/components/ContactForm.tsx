"use client";

import { useState } from "react";
import Button from "./Button";
import SectionFade from "./SectionFade";
import {
  CONTACT_SERVICES,
  type ContactServiceValue,
} from "@/lib/contactServices";

interface ContactFormProps {
  title?: string;
  description?: string;
}

const inputStyles =
  "w-full px-4 py-3 rounded-lg border border-blush bg-white font-inter text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors hover:border-terracotta/50 disabled:opacity-50";

export default function ContactForm({
  title = "Get in Touch",
  description = "Have a question or not sure where to start? Send a message and Erin will get back to you.",
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<ContactServiceValue>("unsure");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ form: data.error || "Something went wrong. Please try again." });
        return;
      }

      setIsSuccess(true);
    } catch {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="relative overflow-hidden bg-sage/15 section-padding pb-24 md:pb-32">
        <div className="max-w-xl mx-auto px-6 md:px-12 text-center">
          <div className="w-16 h-16 bg-sage/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-olive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="font-cormorant text-section-mobile md:text-3xl font-semibold text-olive mb-3">
            Message Sent
          </h2>
          <p className="font-inter text-olive/80">
            Thanks for reaching out. Erin will reply to your email soon.
          </p>
        </div>
        <SectionFade to="olive" />
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-sage/15 section-padding pb-24 md:pb-32">
      <div className="max-w-xl mx-auto px-6 md:px-12">
        <div className="text-center mb-8">
          <h2 className="font-cormorant text-section-mobile md:text-section font-semibold text-olive mb-4">
            {title}
          </h2>
          <p className="font-inter text-lg text-olive/80">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="contact-name"
              className="block font-inter text-sm font-medium text-olive mb-1.5"
            >
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              autoComplete="name"
              className={inputStyles}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1 font-inter text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-inter text-sm font-medium text-olive mb-1.5"
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              autoComplete="email"
              className={inputStyles}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1 font-inter text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-service"
              className="block font-inter text-sm font-medium text-olive mb-1.5"
            >
              What are you interested in?{" "}
              <span className="font-normal text-olive/50">(optional)</span>
            </label>
            <select
              id="contact-service"
              value={service}
              onChange={(e) => setService(e.target.value as ContactServiceValue)}
              disabled={isSubmitting}
              className={`${inputStyles} cursor-pointer`}
            >
              {CONTACT_SERVICES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block font-inter text-sm font-medium text-olive mb-1.5"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
              rows={5}
              className={`${inputStyles} resize-y min-h-[120px]`}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1 font-inter text-sm text-red-500">
                {errors.message}
              </p>
            )}
          </div>

          {errors.form && (
            <p className="font-inter text-sm text-red-500 text-center" role="alert">
              {errors.form}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full justify-center"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
      <SectionFade to="olive" />
    </section>
  );
}
