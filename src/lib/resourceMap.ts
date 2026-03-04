// Maps free resource IDs to their metadata.
// fileUrl points to the actual PDF once uploaded to Supabase Storage or a CDN.
export const RESOURCE_MAP: Record<string, { title: string; fileUrl: string }> = {
  "pelvic-floor-101": {
    title: "Pelvic Floor 101: What Every Mom Should Know",
    fileUrl: "#resource-file-placeholder",
  },
  "daily-movement": {
    title: "5-Minute Daily Movement Practice",
    fileUrl: "#resource-file-placeholder",
  },
  "diastasis-recti": {
    title: "Diastasis Recti: Myths vs. Evidence",
    fileUrl: "#resource-file-placeholder",
  },
};
