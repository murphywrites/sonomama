"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type { ProgramId } from "@/lib/types";
import Button from "./Button";

interface ProgramCheckoutModalProps {
  programId: ProgramId;
  programTitle: string;
  onClose: () => void;
}

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;
const fieldClasses =
  "w-full rounded-lg border border-blush/70 bg-white px-4 py-3 font-inter text-olive outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";

export default function ProgramCheckoutModal({
  programId,
  programTitle,
  onClose,
}: ProgramCheckoutModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [deliveryDates, setDeliveryDates] = useState([""]);
  const [kidAges, setKidAges] = useState([""]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    closeButtonRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function updateList(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) {
    setter((items) =>
      items.map((item, itemIndex) => (itemIndex === index ? value : item))
    );
  }

  function removeListItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) {
    setter((items) => items.filter((_, itemIndex) => itemIndex !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    if (!stripePromise) {
      setError("Checkout is not configured yet.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId,
          name,
          email,
          dueDate: programId === "pregnancy-synced" ? dueDate : undefined,
          deliveryDates:
            programId === "postpartum" ? deliveryDates : undefined,
          kidAges: programId === "moms-any-phase" ? kidAges : undefined,
        }),
      });
      const result = (await response.json()) as {
        clientSecret?: string;
        error?: string;
      };

      if (!response.ok || !result.clientSecret) {
        throw new Error(result.error ?? "Unable to start checkout");
      }

      setClientSecret(result.clientSecret);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-olive/60 p-4 animate-fade-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="program-checkout-title"
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-cream shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-blush/50 bg-cream px-6 py-5 md:px-8">
          <div>
            <p className="font-inter text-xs font-medium uppercase tracking-wide text-terracotta">
              {clientSecret ? "Secure payment" : "Program signup"}
            </p>
            <h2
              id="program-checkout-title"
              className="mt-1 font-cormorant text-2xl font-semibold text-olive"
            >
              {programTitle}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close signup"
            className="rounded-md p-2 text-olive/60 transition hover:bg-blush/40 hover:text-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {clientSecret ? (
          <div className="bg-white px-2 py-6 sm:px-6">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 px-6 py-7 md:px-8">
            <p className="font-inter text-sm leading-relaxed text-olive/70">
              Tell Erin a little about where you are now, then continue to
              secure monthly payment.
            </p>

            <div>
              <label
                htmlFor={`${programId}-name`}
                className="mb-2 block font-inter text-sm font-medium text-olive"
              >
                Name
              </label>
              <input
                id={`${programId}-name`}
                type="text"
                autoComplete="name"
                required
                maxLength={120}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={fieldClasses}
              />
            </div>

            <div>
              <label
                htmlFor={`${programId}-email`}
                className="mb-2 block font-inter text-sm font-medium text-olive"
              >
                Email
              </label>
              <input
                id={`${programId}-email`}
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClasses}
              />
            </div>

            {programId === "pregnancy-synced" && (
              <div>
                <label
                  htmlFor="pregnancy-due-date"
                  className="mb-2 block font-inter text-sm font-medium text-olive"
                >
                  Upcoming due date
                </label>
                <input
                  id="pregnancy-due-date"
                  type="date"
                  required
                  min={today}
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  className={fieldClasses}
                />
              </div>
            )}

            {programId === "postpartum" && (
              <fieldset>
                <legend className="mb-2 font-inter text-sm font-medium text-olive">
                  Delivery date(s)
                </legend>
                <div className="space-y-3">
                  {deliveryDates.map((date, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <label
                        htmlFor={`delivery-date-${index}`}
                        className="sr-only"
                      >
                        Delivery date {index + 1}
                      </label>
                      <input
                        id={`delivery-date-${index}`}
                        type="date"
                        required
                        max={today}
                        value={date}
                        onChange={(event) =>
                          updateList(
                            setDeliveryDates,
                            index,
                            event.target.value
                          )
                        }
                        className={fieldClasses}
                      />
                      {deliveryDates.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeListItem(setDeliveryDates, index)
                          }
                          className="rounded-md px-3 py-2 font-inter text-sm text-terracotta hover:bg-blush/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                          aria-label={`Remove delivery date ${index + 1}`}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDeliveryDates((dates) => [...dates, ""])
                  }
                  className="mt-3 font-inter text-sm font-medium text-terracotta hover:text-terracotta-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  + Add another delivery date
                </button>
              </fieldset>
            )}

            {programId === "moms-any-phase" && (
              <fieldset>
                <legend className="mb-2 font-inter text-sm font-medium text-olive">
                  Kid(s) ages
                </legend>
                <div className="space-y-3">
                  {kidAges.map((age, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <label htmlFor={`kid-age-${index}`} className="sr-only">
                        Child {index + 1} age
                      </label>
                      <input
                        id={`kid-age-${index}`}
                        type="text"
                        required
                        maxLength={40}
                        placeholder="e.g. 8 months or 4 years"
                        value={age}
                        onChange={(event) =>
                          updateList(setKidAges, index, event.target.value)
                        }
                        className={fieldClasses}
                      />
                      {kidAges.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeListItem(setKidAges, index)}
                          className="rounded-md px-3 py-2 font-inter text-sm text-terracotta hover:bg-blush/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                          aria-label={`Remove child ${index + 1}`}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setKidAges((ages) => [...ages, ""])}
                  className="mt-3 font-inter text-sm font-medium text-terracotta hover:text-terracotta-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                >
                  + Add another child
                </button>
              </fieldset>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 font-inter text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full justify-center"
            >
              {submitting ? "Preparing secure checkout…" : "Continue to payment"}
            </Button>
            <p className="text-center font-inter text-xs text-olive/55">
              Payment is securely processed by Stripe.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
