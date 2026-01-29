# CLAUDE.md - SONOMAMA Codebase Guide

This document provides essential context for AI assistants working with the SONOMAMA codebase.

## Project Overview

**SONOMAMA** is a Next.js 14 landing page for a perinatal strength & movement coaching practice. The design blends Sonoma County's natural beauty with Japanese minimalism, reflecting the brand philosophy of "そのまま" (sonomama) - "as you are."

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment Target:** Vercel
- **Future Integrations:** Stripe (payment links), Email service provider

## Project Structure

```
sonomama/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (fonts, nav, footer)
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── about/
│   │   │   └── page.tsx        # About Erin page
│   │   └── resources/
│   │       └── page.tsx        # Resources page (paid/free)
│   ├── components/             # Reusable React components
│   │   ├── Navigation.tsx      # Sticky header with mobile menu
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Hero.tsx            # Full-width hero section
│   │   ├── Button.tsx          # Primary/secondary button variants
│   │   ├── ResourceCard.tsx    # Card for resources
│   │   ├── ResourceTabs.tsx    # Paid/free toggle tabs
│   │   └── EmailCaptureModal.tsx # Modal for free resource downloads
│   └── lib/
│       └── types.ts            # TypeScript interfaces
├── public/
│   └── assets/                 # Static images (SVG placeholders)
│       ├── hero-placeholder.svg
│       ├── erin-placeholder.svg
│       └── resource-thumbnails/
├── tailwind.config.ts          # Tailwind configuration with brand colors
├── tsconfig.json
└── package.json
```

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Brand Identity

### Color Palette

| Name       | Hex       | Tailwind Class | Usage                    |
|------------|-----------|----------------|--------------------------|
| Terracotta | `#C17A5C` | `terracotta`   | CTAs, accents, links     |
| Sage       | `#8B9E7D` | `sage`         | Section backgrounds      |
| Cream      | `#F5EFE7` | `cream`        | Base background          |
| Olive      | `#3D4B3A` | `olive`        | Text, headings           |
| Blush      | `#E8D5C4` | `blush`        | Subtle accents, hovers   |

### Typography

- **Headings:** Cormorant Garamond (serif) - `font-cormorant`
- **Body:** Inter (sans-serif) - `font-inter`
- **Japanese text:** Noto Serif JP - `font-noto`

Fonts are loaded via Google Fonts in `src/app/layout.tsx`.

## Key Components

### Button (`src/components/Button.tsx`)
- Variants: `primary` (terracotta fill) and `secondary` (outline)
- Accepts `href` for link behavior or `onClick` for button behavior
- Supports `disabled` state

### Hero (`src/components/Hero.tsx`)
- Full-viewport hero section
- Props: `title`, `japaneseText`, `subtitle`, `description`, `primaryCta`, `secondaryCta`, `backgroundImage`, `fullHeight`

### EmailCaptureModal (`src/components/EmailCaptureModal.tsx`)
- Opens when clicking free resource cards
- Form validation for name and email
- Success state with auto-close after 2 seconds
- **Note:** Backend integration needed - currently simulates API call

### ResourceCard & ResourceTabs
- ResourceTabs: Toggle between "Programs" (paid) and "Free Resources"
- ResourceCard: Displays resource with thumbnail, title, description, price, and CTA
- Free resources trigger email modal; paid resources link to Stripe

## Page Details

### Home (`/`)
- Hero with SONOMAMA branding and Japanese text
- Value propositions section (3 columns)
- CTA section linking to resources

### About (`/about`)
- Hero with Erin's photo placeholder
- Bio content with proper typography
- Credentials grid
- Philosophy section

### Resources (`/resources`)
- Tab toggle for paid/free resources
- 3 paid programs (Foundations, Strong Mama, 1:1 PT)
- 3 free resources (guides)
- CTA for consultation booking

## Styling Conventions

### Spacing
- Section padding: `section-padding` class (defined in globals.css)
- Desktop sections: 80px vertical padding
- Mobile sections: 40px vertical padding

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Animation Classes
- `animate-fade-in`: Fade in with upward movement
- `animate-slide-up`: Slide up animation
- `animate-fade-overlay`: Simple opacity fade

## Important Notes for AI Assistants

### Placeholder Content
- **Images:** All images are SVG placeholders in `/public/assets/`
- **Stripe Links:** Currently use `#stripe-link-placeholder`
- **Consultation Link:** Uses `#consultation-link-placeholder`
- **Email Backend:** Modal simulates success - no actual email sending

### Before Making Changes
1. Run `npm run build` to verify TypeScript and build
2. Test responsive design on mobile breakpoints
3. Maintain accessibility (semantic HTML, ARIA labels, focus states)
4. Follow existing naming conventions

### Adding New Pages
1. Create folder in `src/app/[page-name]/`
2. Add `page.tsx` with proper metadata export
3. Update Navigation component if needed

### Adding New Components
1. Create in `src/components/`
2. Use TypeScript interfaces for props
3. Add `"use client"` directive if using React hooks
4. Follow existing naming patterns (PascalCase)

### Modifying Styles
1. Brand colors are in `tailwind.config.ts`
2. CSS variables are in `globals.css` `:root`
3. Prefer Tailwind classes over custom CSS
4. Use existing spacing/color tokens

## Future Integration Points

### Stripe Payments
Replace placeholder URLs in `src/app/resources/page.tsx`:
```typescript
const paidResources: Resource[] = [
  {
    // ...
    link: "#stripe-link-placeholder", // Replace with actual Stripe link
  },
];
```

### Email Service
Update `src/components/EmailCaptureModal.tsx` `handleSubmit` function to:
1. Send form data to email service API
2. Handle actual error states
3. Trigger real email delivery

### Professional Images
Replace SVG placeholders in `/public/assets/` with actual images:
- `hero-placeholder.svg` → Hero landscape (1920x1080)
- `erin-placeholder.svg` → Erin headshot (800x800)
- Resource thumbnails (400x300)

## Accessibility Checklist
- [x] Semantic HTML structure
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] Alt text for images
- [x] Keyboard navigation support
- [x] ARIA labels on interactive elements
- [x] Focus states for buttons and links
- [x] Color contrast compliance with brand palette
