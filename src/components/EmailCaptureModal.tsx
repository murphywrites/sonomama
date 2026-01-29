"use client";

import { useState, useEffect } from "react";
import Button from "./Button";
import type { Resource } from "@/lib/types";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource | null;
}

export default function EmailCaptureModal({
  isOpen,
  onClose,
  resource,
}: EmailCaptureModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName("");
        setEmail("");
        setErrors({});
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 200);
    }
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Close modal after showing success message
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-olive/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-cream rounded-2xl shadow-xl max-w-md w-full p-8 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-olive/60 hover:text-olive transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded-lg p-1"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {isSuccess ? (
          /* Success State */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-sage"
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
            <h3 className="font-cormorant text-2xl font-semibold text-olive mb-2">
              Check Your Email!
            </h3>
            <p className="font-inter text-olive/80">
              Your guide is on its way.
            </p>
          </div>
        ) : (
          /* Form State */
          <>
            <h2
              id="modal-title"
              className="font-cormorant text-2xl md:text-3xl font-semibold text-olive mb-2 pr-8"
            >
              Get Your Free Resource
            </h2>

            {resource && (
              <p className="font-inter text-olive/80 mb-6">
                {resource.title}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-inter text-sm font-medium text-olive mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border bg-white font-inter text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors ${
                    errors.name
                      ? "border-red-400"
                      : "border-blush hover:border-terracotta/50"
                  }`}
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="mt-1 font-inter text-sm text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-inter text-sm font-medium text-olive mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border bg-white font-inter text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors ${
                    errors.email
                      ? "border-red-400"
                      : "border-blush hover:border-terracotta/50"
                  }`}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 font-inter text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full mt-6"
              >
                {isSubmitting ? "Sending..." : "Send Me the Guide"}
              </Button>

              <p className="font-inter text-xs text-olive/60 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
