# SONOMAMA — Site Redesign Implementation Plan

**Email service decision:** Resend (transactional delivery) + Kit/ConvertKit (marketing sequences)

---

## Overview

Five implementation phases building on each other:

1. Navigation + Page Split + Types
2. Supabase Database Schema
3. Email Integration (Resend + Kit)
4. Waiver Page + Program Access Flow
5. Testimonials Carousel Enhancement

---

## Phase 1: Navigation + Page Split + Types

No external dependencies. Establishes new routing structure.

### 1.1 `src/lib/types.ts` — Add interfaces

Add `Program`, `Testimonial` (with `photo?`), `WaiverRecord`, and `EmailLead` interfaces to the existing types file.

```typescript
export interface Program {
  id: string
  title: string
  description: string
  price: string
  priceNote?: string
  buttonText: string
  stripeLink: string
  thumbnail?: string
  features: string[]
  badge?: string
}

export interface Testimonial {
  quote: string
  author: string
  context: string
  photo?: string
}

export interface WaiverRecord {
  userId: string
  email: string
  name: string
  signedAt: string
  ipAddress?: string
  documentVersion: string
  agreedToTerms: boolean
}

export interface EmailLead {
  email: string
  name: string
  resourceId?: string
  source: 'modal' | 'signup_bar' | 'footer'
}
```

### 1.2 `src/components/Navigation.tsx` — Add Programs link

Insert "Programs" → `/programs` between About and Resources in the `navLinks` array.

### 1.3 `src/components/Footer.tsx` — Add Programs link

Add a Programs link to the footer nav between About and Resources.

### 1.4 `src/app/resources/page.tsx` — Strip to free resources only

- Remove all `paidResources` array and tab state
- Remove `ResourceTabs` import and usage
- Keep `freeResources` array and `EmailCaptureModal` integration
- Add a lightweight "Programs Teaser" strip above the free resources section showing the 3 programs with title, price, and "View Programs" CTA pointing to `/programs`

### 1.5 `src/app/programs/page.tsx` — NEW

New page with:
1. Hero section (using existing `Hero` component, `fullHeight: false`)
2. Programs grid — 3 `ProgramCard` components using the new `Program` interface
3. "Is this right for me?" section with consultation CTA

### 1.6 `src/components/ProgramCard.tsx` — NEW

A new card component (not re-using `ResourceCard`) because programs have a `features[]` bullet list. For Phase 1, CTA links directly to the Stripe placeholder.

```typescript
interface ProgramCardProps {
  program: Program
  onAccessProgram?: (program: Program) => void // wired in Phase 4
}
```

### 1.7 `src/components/MeetYourCoach.tsx` — Update link

Change "View Programs" button `href` from `/resources` to `/programs`.

### 1.8 `src/app/page.tsx` — Split home CTA

Replace single "View All Resources" CTA with two buttons:
- Primary: "View Programs" → `/programs`
- Secondary: "Free Resources" → `/resources`

### 1.9 Delete `src/components/ResourceTabs.tsx`

Verify no other file imports it, then delete.

---

## Phase 2: Supabase Database Schema

### 2.1 Install dependency

```bash
npm install @supabase/supabase-js
```

Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
```

### 2.2 `src/lib/supabase.ts` — NEW

Two clients: browser (anon key) and server (service role key, server-only files).

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```

### 2.3 `supabase/migrations/001_initial_schema.sql` — NEW

Tables:
- `users` — id, email, name, user_type, waiver_signed_at
- `email_leads` — id, email, name, resource_id, source, kit_subscriber_id; UNIQUE(email, resource_id)
- `waiver_signatures` — append-only audit log, confirmations stored as JSONB
- `programs` — seeded with 3 paid programs
- `program_videos` — future video content
- `exercises` — sets/reps as TEXT to support ranges like "3-4"
- `handouts` — free and paid PDFs
- `user_program_access` — junction table after Stripe payment confirmed

All tables have RLS enabled. Public read policies for `programs` (active only), `program_videos` (is_preview only), and `handouts` (free only). All writes via service role key in Route Handlers.

---

## Phase 3: Email Integration (Resend + Kit)

### 3.1 Install dependencies

```bash
npm install resend server-only
```

Add to `.env.local`:
```
RESEND_API_KEY=re_[your-key]
KIT_API_KEY=[your-kit-api-key]
KIT_API_SECRET=[your-kit-api-secret]
KIT_FORM_ID=[your-kit-form-id]
FROM_EMAIL=erin@[domain].com
```

### 3.2 `src/app/api/email-capture/route.ts` — NEW

`POST /api/email-capture` — Body: `{ name, email, resourceId }`

Runs in parallel via `Promise.allSettled`:
1. Upserts into `email_leads` (Supabase) — ON CONFLICT DO UPDATE
2. Adds subscriber to Kit with resource tag via Kit v4 REST API
3. Sends delivery email via Resend

Returns `{ success: true }` if Resend succeeds. Logs Kit/Supabase failures but does not block the response.

### 3.3 `src/app/api/newsletter-signup/route.ts` — NEW

`POST /api/newsletter-signup` — Body: `{ name, email }`

Same flow as email-capture but with `source: 'signup_bar'`, `resource_id: null`, and "newsletter" Kit tag.

### 3.4 `src/components/EmailCaptureModal.tsx` — Replace stub

Replace the `setTimeout` simulation with:
```typescript
const response = await fetch('/api/email-capture', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, resourceId: resource?.id }),
})
```

Handle real error states (network error, server error messages).

### 3.5 `src/components/EmailSignup.tsx` — Replace stub

Same update — call `POST /api/newsletter-signup` with `{ name, email }`.

### 3.6 `src/lib/emails/deliveryEmail.ts` — NEW

Inline-styled HTML email template for resource delivery. Simple, readable, brand-colored. No external stylesheet (email client compatibility).

---

## Phase 4: Waiver Page + Program Access Flow

Depends on Phase 2 (Supabase).

### 4.1 `src/app/waiver/page.tsx` — NEW

Server component wrapper with metadata. Renders `<WaiverForm />`.

### 4.2 `src/components/WaiverForm.tsx` — NEW

Client component with:
- Name + email fields
- Scrollable waiver text (max-h-[400px] overflow-y-auto)
- 4 required checkboxes (all must be checked to enable submit):
  - [ ] I have disclosed any relevant health conditions
  - [ ] I understand this is not a substitute for medical advice
  - [ ] I participate at my own risk
  - [ ] I confirm I am 18 years of age or older
- "I Agree & Sign" submit button (disabled until all filled)
- Success state linking to `/programs`
- Document version `v1.0` sent to API

### 4.3 `src/app/api/sign-waiver/route.ts` — NEW

`POST /api/sign-waiver` — Body: `{ name, email, confirmations, documentVersion }`

1. Validates all 4 confirmations are `true`
2. Upserts `users` row (`user_type: 'program'`, `waiver_signed_at: now`)
3. Inserts row in `waiver_signatures` (never update — append-only)
4. Returns `{ success: true, userId }`

### 4.4 `src/app/programs/page.tsx` — Update for access flow

Client-side `useEffect` checks localStorage for `userId`. When not signed in:
- CTA shows "Access Program" → opens modal with email/name fields → redirects to `/waiver?program=[id]`

When signed in with waiver:
- CTA shows "Enter Program" → links to Stripe placeholder

---

## Phase 5: Testimonials Carousel Enhancement

UI-only, no external dependencies. Can be done any time.

### 5.1 `src/components/TestimonialsCarousel.tsx` — Rewrite

Enhancements:
1. Import `Testimonial` interface from `src/lib/types.ts` (add `photo?` field)
2. Add circular avatar photo (with initial-based fallback when no photo)
3. Add crossfade transition (150ms opacity fade when advancing slides)
4. Refined layout: `[← arrow] [content] [→ arrow]` flex row, no absolute-positioned arrows clipping on mobile
5. Progress bar: thin terracotta bar filling over 6s, reset on manual navigation (CSS `@keyframes`, reset via `key` prop)

---

## File Summary

### CREATE
- `src/app/programs/page.tsx`
- `src/app/waiver/page.tsx`
- `src/app/api/email-capture/route.ts`
- `src/app/api/newsletter-signup/route.ts`
- `src/app/api/sign-waiver/route.ts`
- `src/components/ProgramCard.tsx`
- `src/components/WaiverForm.tsx`
- `src/lib/supabase.ts`
- `src/lib/emails/deliveryEmail.ts`
- `supabase/migrations/001_initial_schema.sql`

### MODIFY
- `src/lib/types.ts` — 4 new interfaces
- `src/components/Navigation.tsx` — add Programs link
- `src/components/Footer.tsx` — add Programs link
- `src/components/EmailCaptureModal.tsx` — real API call
- `src/components/EmailSignup.tsx` — real API call
- `src/components/TestimonialsCarousel.tsx` — photo + crossfade + layout
- `src/components/MeetYourCoach.tsx` — update href
- `src/app/resources/page.tsx` — strip paid, add teasers
- `src/app/page.tsx` — split home CTA
- `package.json` — add `resend`, `@supabase/supabase-js`, `server-only`

### DELETE
- `src/components/ResourceTabs.tsx`

---

## Execution Order

```
Phase 1  Navigation + Page Split + Types    (no external deps, ship first)
Phase 2  Supabase Schema                    (requires Supabase project setup)
Phase 5  Testimonials Enhancement           (no deps, can slot in any time)
Phase 3  Email Integration                  (requires Resend + Kit accounts)
Phase 4  Waiver + Program Access            (requires Phase 2)
```
