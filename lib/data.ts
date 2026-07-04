// lib/data.ts
// ---------------------------------------------------------------
// ALL site content lives here. Replace the placeholder copy,
// prices, phone numbers and image paths with your real content.
// ---------------------------------------------------------------

export const site = {
  name: 'Auto Extreme',
  tagline: 'Detailing studio',
  phone: '+1 (555) 012-3456',
  whatsapp: '15550123456', // digits only, country code first
  email: 'bookings@autoextreme.example',
  address: '42 Piston Lane, Motor City',
  hours: 'Mon–Sat · 9:00–18:00',
  instagram: 'https://instagram.com/autoextreme',
  facebook: 'https://facebook.com/autoextreme',
};

export type Service = {
  slug: string;
  title: string;
  price: string;
  duration: string;
  blurb: string;
  bullets: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: 'ceramic-coating',
    title: '9H Ceramic Coating',
    price: 'from $699',
    duration: '2–3 days',
    blurb:
      'A measured, multi-layer 9H ceramic shield bonded to fully corrected paint. Years of gloss, chemical resistance and effortless washing.',
    bullets: [
      'Full decontamination & clay bar',
      'Single-stage paint correction included',
      '2 layers of 9H coating + top coat',
      '5-year protection warranty',
    ],
    image: '/images/ceramic.jpg',
  },
  {
    slug: 'paint-correction',
    title: 'Paint Correction',
    price: 'from $449',
    duration: '1–2 days',
    blurb:
      'Machine polishing in up to three stages to remove swirls, holograms and light scratches — measured with a gloss meter before and after.',
    bullets: [
      'Paint depth reading on every panel',
      '1–3 stage machine polish',
      'Swirl & hologram removal',
      'Finished with carnauba or sealant',
    ],
    image: '/images/correction.jpg',
  },
  {
    slug: 'interior-detail',
    title: 'Interior Deep Detail',
    price: 'from $249',
    duration: '4–6 hours',
    blurb:
      'Every surface inside the cabin — steam-cleaned, extracted, conditioned and protected. Leather, fabric, trim and glass.',
    bullets: [
      'Hot-water extraction of seats & carpet',
      'Leather clean + conditioner',
      'Steam sanitation of touchpoints',
      'Interior glass & trim dressing',
    ],
    image: '/images/interior.jpg',
  },
  {
    slug: 'full-detail',
    title: 'Signature Full Detail',
    price: 'from $549',
    duration: '1 day',
    blurb:
      'Our most-booked package: the complete exterior and interior treatment that brings a daily driver back to delivery-day condition.',
    bullets: [
      'Foam wash & full decontamination',
      'One-step gloss enhancement polish',
      'Complete interior deep detail',
      'Wheels, arches & engine bay',
    ],
    image: '/images/full.jpg',
  },
  {
    slug: 'ppf',
    title: 'Paint Protection Film',
    price: 'from $1,499',
    duration: '3–5 days',
    blurb:
      'Self-healing urethane film, precision cut for your exact model. Invisible armour for high-impact zones or the whole car.',
    bullets: [
      'Computer-cut, model-specific patterns',
      'Self-healing top coat',
      'Front-end, track pack or full body',
      '10-year film warranty',
    ],
    image: '/images/ppf.jpg',
  },
  {
    slug: 'maintenance-wash',
    title: 'Maintenance Wash',
    price: 'from $89',
    duration: '90 min',
    blurb:
      'The safe, two-bucket, coating-friendly wash that keeps protected cars perfect between details. Members save 20%.',
    bullets: [
      'pH-neutral foam pre-wash',
      'Two-bucket contact wash',
      'Coating top-up spray sealant',
      'Wheels, glass & tyre dressing',
    ],
    image: '/images/wash.jpg',
  },
];

export type GalleryItem = {
  id: number;
  title: string;
  category: 'Ceramic' | 'Correction' | 'Interior' | 'PPF';
  image: string;
};

export const gallery: GalleryItem[] = [
  { id: 1, title: 'GT3 — full front PPF', category: 'PPF', image: '/images/gallery-1.jpg' },
  { id: 2, title: 'M4 — 2-stage correction', category: 'Correction', image: '/images/gallery-2.jpg' },
  { id: 3, title: 'Range Rover — interior revival', category: 'Interior', image: '/images/gallery-3.jpg' },
  { id: 4, title: 'Model S — 9H ceramic', category: 'Ceramic', image: '/images/gallery-4.jpg' },
  { id: 5, title: '911 Turbo — show prep', category: 'Correction', image: '/images/gallery-5.jpg' },
  { id: 6, title: 'Defender — ceramic + PPF', category: 'Ceramic', image: '/images/gallery-6.jpg' },
  { id: 7, title: 'RS6 — track pack film', category: 'PPF', image: '/images/gallery-7.jpg' },
  { id: 8, title: 'S-Class — leather restoration', category: 'Interior', image: '/images/gallery-8.jpg' },
];

export const stats = [
  { value: '500+', label: 'Cars perfected' },
  { value: '9H', label: 'Ceramic hardness' },
  { value: '5 yr', label: 'Coating warranty' },
  { value: '4.9★', label: 'Average rating' },
];

export const process = [
  {
    step: '01',
    title: 'Inspect & measure',
    text: 'Paint depth readings and defect mapping on every panel before a single pad touches the car.',
  },
  {
    step: '02',
    title: 'Decontaminate',
    text: 'Foam, iron fallout remover and clay leave the surface chemically and physically clean.',
  },
  {
    step: '03',
    title: 'Correct',
    text: 'Machine polishing in controlled stages, checked under cross-hatch lighting as we go.',
  },
  {
    step: '04',
    title: 'Protect & hand over',
    text: 'Ceramic, film or sealant is applied and cured — then you get a full aftercare walkthrough.',
  },
];

export const testimonials = [
  {
    quote:
      'The paint on my five-year-old M3 looks deeper than the day I collected it. Obsessive is the right word.',
    name: 'Daniel R.',
    car: 'BMW M3 Competition',
  },
  {
    quote:
      'Booked a maintenance wash, got a masterclass in how a car should be handled. Nobody else touches it now.',
    name: 'Priya S.',
    car: 'Porsche Macan GTS',
  },
  {
    quote:
      'Ceramic coating done two years ago and it still beads like day one. Worth every cent.',
    name: 'Marcus T.',
    car: 'Tesla Model 3 Performance',
  },
];
