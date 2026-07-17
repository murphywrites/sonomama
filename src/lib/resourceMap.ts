export interface ResourceEmailContent {
  intros: string[];
  bullets: string[];
  videoUrl: string;
  attachedNote?: string;
}

export interface ResourceMeta {
  title: string;
  fileUrl: string;
  filePath: string;
  attachmentFilename: string;
  email: ResourceEmailContent;
}

// Maps free resource IDs to their metadata.
// filePath is relative to process.cwd() and used for Resend PDF attachments.
// fileUrl is the public download fallback URL (under /public).
export const RESOURCE_MAP: Record<string, ResourceMeta> = {
  "breathing-foundations": {
    title: "Breathing Foundations: Where Every Mom Can Start",
    fileUrl:
      "/assets/pdfs/Breathing Guide --The Murphy Method Free Resources.pdf",
    filePath:
      "public/assets/pdfs/Breathing Guide --The Murphy Method Free Resources.pdf",
    attachmentFilename: "Breathing-Guide-The-Murphy-Method.pdf",
    email: {
      intros: [
        "If you’re overwhelmed by the countless different things you see recommended to you during your current life stage—pregnancy, newly postpartum, or further into your motherhood journey—you’re not alone. I think the best, most foundational, and, for many, the most impactful place to start is with our breathing!",
        "My hope is that this guide gives you a glimpse into the importance of breathing especially in the perinatal time frame, its systemic impact, and simple ways you can start giving a little more focus to your breath today.",
      ],
      bullets: [
        "An overview on breathing",
        "The role of the diaphragm",
        "Changes that happen during pregnancy and postpartum",
        "How breathing affects our nervous system",
        "Breathing during exercise",
        "Breathing after exercise",
      ],
      videoUrl: "https://youtu.be/fuE8eu6558U",
      attachedNote: "Find your free guide attached.",
    },
  },
  "early-postpartum-movement": {
    title: "Early Postpartum Movement: A Place to Start",
    fileUrl:
      "/assets/pdfs/Early Postpartum Guide--The Murphy Method Free Resources.pdf",
    filePath:
      "public/assets/pdfs/Early Postpartum Guide--The Murphy Method Free Resources.pdf",
    attachmentFilename: "Early-Postpartum-Movement-Guide.pdf",
    email: {
      intros: [
        "Postpartum can be an extremely overwhelming time and I don’t want uncertainty about how to best ease back into physical activity be an additional stressor for you. There is such varied advice online about movement and exercise postpartum (much of which is misinformed!). I hope this guide gives you a little peace of mind, a place to start, and a reminder that no two pregnancies, births, babies, postpartum periods, and motherhood journeys are the same. So please be kind to yourself.",
      ],
      bullets: [
        "An invitation to meet yourself where you are",
        "An overview of what to prioritize the first few weeks",
        "A few simple movements to try as tolerated",
        "Recommendations for initiating a walking program",
      ],
      videoUrl: "https://youtu.be/xvKu2-i8CJE",
      attachedNote: "Find your free guide attached.",
    },
  },
};
