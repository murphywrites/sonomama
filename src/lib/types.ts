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
