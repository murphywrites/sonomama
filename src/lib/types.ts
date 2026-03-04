export interface Resource {
  id: string;
  title: string;
  description: string;
  price?: string;
  buttonText: string;
  link: string;
  isFree: boolean;
  thumbnail?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ValueProp {
  title: string;
  description: string;
  japaneseText?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  buttonText: string;
  stripeLink: string;
  thumbnail?: string;
  features: string[];
  badge?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
  photo?: string;
}

export interface WaiverRecord {
  userId: string;
  email: string;
  name: string;
  signedAt: string;
  ipAddress?: string;
  documentVersion: string;
  agreedToTerms: boolean;
}

export interface EmailLead {
  email: string;
  name: string;
  resourceId?: string;
  source: "modal" | "signup_bar" | "footer";
}
