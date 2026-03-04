"use client";

import { useState } from "react";
import Button from "./Button";

const DOCUMENT_VERSION = "v1.0";

const checkboxItems = [
  {
    id: "healthDisclosure",
    label:
      "I have disclosed, or will disclose to Erin Murphy, DPT any known health conditions, injuries, or medical concerns that may affect my participation.",
  },
  {
    id: "noMedicalAdvice",
    label:
      "I understand that this program is not a substitute for professional medical advice, diagnosis, or treatment. I will consult my physician before beginning any exercise program.",
  },
  {
    id: "ownRisk",
    label:
      "I voluntarily participate in this program at my own risk and release Erin Murphy, DPT from liability for any injury, loss, or damage arising from my participation.",
  },
  {
    id: "ageConfirm",
    label: "I confirm that I am 18 years of age or older.",
  },
] as const;

type ConfirmationKey = (typeof checkboxItems)[number]["id"];

export default function WaiverForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmations, setConfirmations] = useState<
    Record<ConfirmationKey, boolean>
  >({
    healthDisclosure: false,
    noMedicalAdvice: false,
    ownRisk: false,
    ageConfirm: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const allChecked = Object.values(confirmations).every(Boolean);
  const canSubmit = name.trim() && email.trim() && allChecked && !isSubmitting;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email";
    if (!allChecked) newErrors.confirmations = "All confirmations are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/sign-waiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          confirmations,
          documentVersion: DOCUMENT_VERSION,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ form: data.error || "Something went wrong. Please try again." });
        return;
      }

      // Store userId for access gating (pre-auth placeholder)
      if (data.userId) {
        localStorage.setItem("sonomama_user_id", data.userId);
        localStorage.setItem("sonomama_waiver_signed", "true");
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
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-sage"
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
        <h2 className="font-cormorant text-3xl font-semibold text-olive mb-3">
          Thank You!
        </h2>
        <p className="font-inter text-olive/80 mb-8 max-w-md mx-auto">
          Your waiver is on file. You can now access your programs.
        </p>
        <Button variant="primary" href="/programs">
          View Programs
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Waiver Text */}
      <div>
        <h2 className="font-cormorant text-2xl font-semibold text-olive mb-4">
          Program Participation Agreement
        </h2>
        <div className="bg-cream rounded-xl p-6 max-h-72 overflow-y-auto border border-blush font-inter text-sm text-olive/80 leading-relaxed space-y-3">
          <p>
            This Program Participation Agreement (&ldquo;Agreement&rdquo;) is entered into
            between the participant (&ldquo;you&rdquo;) and Erin Murphy, PT, DPT
            (&ldquo;Coach&rdquo;).
          </p>
          <p>
            <strong>1. Assumption of Risk.</strong> You acknowledge that
            participation in physical exercise and movement programs involves
            inherent risks, including but not limited to musculoskeletal injury,
            pain, fatigue, and cardiovascular events. You voluntarily assume all
            such risks.
          </p>
          <p>
            <strong>2. Medical Clearance.</strong> You represent that you have
            consulted with a physician or qualified healthcare provider and have
            received clearance to participate in physical exercise. You agree to
            disclose any relevant medical conditions, including pregnancy,
            postpartum status, pelvic floor dysfunction, diastasis recti, or
            any other condition that may affect safe participation.
          </p>
          <p>
            <strong>3. Not Medical Treatment.</strong> You understand that the
            programs and content provided are for educational and fitness
            purposes only. They do not constitute medical advice, diagnosis, or
            treatment. If you experience pain, discomfort, or unusual symptoms,
            you agree to stop immediately and consult a healthcare provider.
          </p>
          <p>
            <strong>4. Release of Liability.</strong> To the fullest extent
            permitted by law, you release, waive, and discharge Erin Murphy,
            PT, DPT, her agents, and affiliates from any and all claims,
            demands, or causes of action arising out of or related to your
            participation in the programs, including claims of negligence.
          </p>
          <p>
            <strong>5. Governing Law.</strong> This Agreement shall be governed
            by and construed in accordance with the laws of the State of
            California.
          </p>
          <p className="text-xs text-olive/50">
            Document version: {DOCUMENT_VERSION}
          </p>
        </div>
      </div>

      {/* Personal Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="waiver-name"
            className="block font-inter text-sm font-medium text-olive mb-1"
          >
            Full Name
          </label>
          <input
            id="waiver-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            placeholder="Your full name"
            className={`w-full px-4 py-3 rounded-lg border bg-white font-inter text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors ${
              errors.name
                ? "border-red-400"
                : "border-blush hover:border-terracotta/50"
            }`}
          />
          {errors.name && (
            <p className="mt-1 font-inter text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="waiver-email"
            className="block font-inter text-sm font-medium text-olive mb-1"
          >
            Email Address
          </label>
          <input
            id="waiver-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 rounded-lg border bg-white font-inter text-olive placeholder:text-olive/40 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-colors ${
              errors.email
                ? "border-red-400"
                : "border-blush hover:border-terracotta/50"
            }`}
          />
          {errors.email && (
            <p className="mt-1 font-inter text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Confirmations */}
      <div className="space-y-4">
        <p className="font-inter text-sm font-medium text-olive">
          Please confirm each of the following:
        </p>
        {checkboxItems.map((item) => (
          <label
            key={item.id}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={confirmations[item.id]}
              onChange={(e) =>
                setConfirmations((prev) => ({
                  ...prev,
                  [item.id]: e.target.checked,
                }))
              }
              disabled={isSubmitting}
              className="mt-0.5 w-5 h-5 rounded border-blush text-terracotta focus:ring-terracotta shrink-0"
            />
            <span className="font-inter text-sm text-olive/80 leading-relaxed group-hover:text-olive transition-colors">
              {item.label}
            </span>
          </label>
        ))}
        {errors.confirmations && (
          <p className="font-inter text-sm text-red-500">
            {errors.confirmations}
          </p>
        )}
      </div>

      {errors.form && (
        <p className="font-inter text-sm text-red-500 text-center">
          {errors.form}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={!canSubmit}
        className="w-full justify-center"
      >
        {isSubmitting ? "Saving..." : "I Agree & Sign"}
      </Button>

      <p className="font-inter text-xs text-olive/50 text-center">
        By clicking &ldquo;I Agree &amp; Sign&rdquo; you are providing your electronic
        signature and agreement to the terms above.
      </p>
    </form>
  );
}
