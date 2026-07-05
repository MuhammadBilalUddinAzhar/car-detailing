# Auto Extreme — Cinematic Scroll Detailing Website

Next.js 14 (App Router) website for a car detailing studio with a
GSAP-powered cinematic scroll hero: headline reveal → carbon card
rises fullscreen → car flies in with 3D perspective → badges and a
"Cars Perfected" counter → card pulls back to reveal booking CTAs.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

Production build:

```bash
npm run build
npm start
```

## Pages

| Route | File |
|---|---|
| Home (cinematic scroll hero + sections) | `app/page.tsx` |
| Services (all 6, deep-linkable via `#slug`) | `app/services/page.tsx` |
| Gallery (filterable) | `app/gallery/page.tsx` |
| About | `app/about/page.tsx` |
| Contact / Booking (WhatsApp) | `app/contact/page.tsx` |

## The hero (`components/CinematicCarHero.tsx`)

- **Shader intro on load:** the page opens with a WebGL ember/carbon
  shader (`components/EmberShader.tsx`), the brand name letter-reveal,
  and the car streaking across the screen — then the headline reveals
  automatically. The first paint is never blank; scrolling takes over
  only after the intro settles. (If the browser restores a mid-page
  scroll position, the intro is skipped.)
- Pinned scroll section (~7000px of scrub) built with GSAP ScrollTrigger.
- The car image tilts with the mouse and has a mirror reflection over
  an ember "showroom floor".
- Everything is a prop: taglines, brand name, card copy, metric value
  and label, CTA copy and links, and the car image path.
- Respects `prefers-reduced-motion` (renders statically, no pinning).

### The hero image

`public/images/hero/car.png` is an AI-generated illustration of a car
receiving ceramic coating (glossy obsidian coupe, cyan coating sweep,
hydrophobic droplets, 9H shield badge) on a transparent background —
so the 3D fly-in, mouse tilt and mirror reflection all work out of the
box. The editable vector source is at
`public/images/hero/car-source.svg`.

To swap in a real photo of a detailed car instead:

- **Side profile**, PNG with a **transparent background** (cut it out
  with remove.bg or Photoshop) — that's what makes the reflection and
  ember floor look right.
- Roughly 1400×560 or similar wide aspect ratio.

You can also point the hero at a different file:

```tsx
<CinematicCarHero carImageSrc="/images/hero/porsche.png" />
```

## Put in YOUR content

All text, prices, phone numbers and image paths live in **one file**:
`lib/data.ts`. Replace the placeholder copy with your real business
content. The WhatsApp number in `site.whatsapp` (digits only, country
code first) powers the contact form.

**Photos:** drop real images into `public/images/` using the filenames
referenced in `lib/data.ts`, then in `components/ServicesClient.tsx`
and `components/GalleryClient.tsx` replace the `.img-placeholder` divs
with `next/image`:

```tsx
import Image from 'next/image';
<Image src={s.image} alt={s.title} fill className="object-cover rounded-2xl" />
```

## Design system

- Colors in `tailwind.config.ts`: `ink` (background), `ember` (accent
  red-orange), `chrome`, `mist`, `carbon`, `graphite`.
- Fonts: Archivo Black (display) + Inter (body) via a Google Fonts
  `<link>` in `app/layout.tsx` (swap for `next/font` if you prefer
  self-hosted).
- Reduced-motion support and custom scrollbar in `app/globals.css`.

## Notes

- The navbar is `z-[100]` so it stays above the pinned hero layers.
- The hero must be the **first** section on the page (it pins to the
  top of the viewport).
- Contact form opens a pre-filled WhatsApp chat (no backend). Swap the
  `submit()` function in `components/ContactClient.tsx` for an API
  route or Formspree/Resend if you prefer email.

## Deploy

Push to GitHub and import on Vercel — zero config needed.
