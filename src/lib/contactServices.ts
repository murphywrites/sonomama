export const CONTACT_SERVICES = [
  { value: "unsure", label: "Not sure yet — help me decide" },
  { value: "pregnancy", label: "Pregnancy program" },
  { value: "postpartum", label: "Postpartum program" },
  { value: "moms-any-phase", label: "Moms in any phase of life" },
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
