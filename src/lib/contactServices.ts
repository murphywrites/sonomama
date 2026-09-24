export const CONTACT_SERVICES = [
  { value: "unsure", label: "Not sure yet — help me decide" },
  { value: "pregnancy", label: "Pregnancy Plans" },
  { value: "postpartum", label: "Postpartum Plans" },
  { value: "moms-any-phase", label: "Moms in any phase of life" },
  { value: "pregnancy-prep", label: "Strong Mom Pregnancy Prep" },
  { value: "one-on-one", label: "1:1 Training" },
  { value: "fall-challenge", label: "Fall Strong Mom Challenge" },
  { value: "free-resources", label: "Free resources" },
  { value: "general", label: "General question" },
] as const;

export type ContactServiceValue = (typeof CONTACT_SERVICES)[number]["value"];

export function getContactServiceLabel(value: string): string {
  return (
    CONTACT_SERVICES.find((service) => service.value === value)?.label ??
    value
  );
}
