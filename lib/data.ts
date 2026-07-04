// ─────────────────────────────────────────────────────────────
// ALL site content lives here. Replace placeholders with your
// real business info, then drop matching photos into /public.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Auto Extreme',
  tagline: 'Cinematic-grade car detailing',
  phone: '+1 (555) 012-3456',
  // Digits only, country code first — powers the WhatsApp contact form.
  whatsapp: '15550123456',
  email: 'book@autoextreme.example',
  address: '42 Piston Lane, Unit 7, Detail City',
  hours: 'Mon–Sat · 9:00 — 19:00',
  instagram: 'https://instagram.com/autoextreme',
};

export type Service = {
  slug: string;
  title: string;
  price: string;
  duration: string;
  blurb: string;
  includes: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: 'signature-detail',
    title: 'Signature Detail',
    price: 'from $189',
    duration: '4–5 hrs',
    blurb:
      'Our flagship full-vehicle reset. Hand wash, decontamination, one-step machine polish and interior deep clean.',
    includes: [
      'Two-bucket hand wash & foam pre-soak',
      'Iron & tar decontamination + clay bar',
      'One-step machine polish',
      'Interior vacuum, steam & leather feed',
      '6-month sealant',
    ],
    image: '/images/services/signature.jpg',
  },
  {
    slug: 'paint-correction',
    title: 'Paint Correction',
    price: 'from $449',
    duration: '1–2 days',
    blurb:
      'Multi-stage machine polishing that removes swirl marks, holograms and light scratches to restore true gloss.',
    includes: [
      'Paint depth readings & inspection',
      '2–3 stage compound + polish',
      'Panel wipe & gloss verification',
      'Optional ceramic top-up',
    ],
    image: '/images/services/correction.jpg',
  },
  {
    slug: 'ceramic-coating',
    title: 'Ceramic Coating',
    price: 'from $699',
    duration: '2 days',
    blurb:
      '9H professional ceramic protection with hydrophobic self-cleaning behaviour and up to 5 years of durability.',
    includes: [
      'Full decontamination & single-stage polish',
      '2 layers 9H ceramic + 1 top coat',
      'Wheels-off faces coated',
      'IR-cured, 5-year warranty',
    ],
    image: '/images/services/ceramic.jpg',
  },
  {
    slug: 'interior-restoration',
    title: 'Interior Restoration',
    price: 'from $249',
    duration: '5–6 hrs',
    blurb:
      'Deep extraction of carpets and seats, steam sanitation, leather repair and trim re-dye. Showroom-fresh inside.',
    includes: [
      'Hot-water extraction (seats & carpets)',
      'Steam sanitation of all touchpoints',
      'Leather clean, condition & minor repair',
      'Odour neutralisation (ozone)',
    ],
    image: '/images/services/interior.jpg',
  },
  {
    slug: 'ppf-wrap',
    title: 'Paint Protection Film',
    price: 'from $999',
    duration: '2–4 days',
    blurb:
      'Self-healing urethane film on high-impact zones or the full body. Invisible armour against stone chips.',
    includes: [
      'Computer-cut, edge-wrapped panels',
      'Front-end, track pack or full body',
      'Self-healing top coat',
      '10-year film warranty',
    ],
    image: '/images/services/ppf.jpg',
  },
  {
    slug: 'maintenance-wash',
    title: 'Maintenance Wash',
    price: 'from $59',
    duration: '90 min',
    blurb:
      'The safe monthly wash for coated and corrected cars. Keeps protection alive and gloss dialled in.',
    includes: [
      'pH-neutral foam & two-bucket wash',
      'Wheels, arches & door jambs',
      'Coating-safe drying aid boost',
      'Interior wipe-down & glass',
    ],
    image: '/images/services/maintenance.jpg',
  },
];

export type GalleryItem = {
  id: number;
  title: string;
  category: 'exterior' | 'interior' | 'coating' | 'correction';
  image: string;
};

export const gallery: GalleryItem[] = [
  { id: 1, title: 'Midnight GT — full correction', category: 'correction', image: '/images/gallery/g1.jpg' },
  { id: 2, title: 'Alpine white — ceramic set', category: 'coating', image: '/images/gallery/g2.jpg' },
  { id: 3, title: 'Cognac leather revival', category: 'interior', image: '/images/gallery/g3.jpg' },
  { id: 4, title: 'Ember red — signature detail', category: 'exterior', image: '/images/gallery/g4.jpg' },
  { id: 5, title: 'Track pack PPF install', category: 'exterior', image: '/images/gallery/g5.jpg' },
  { id: 6, title: 'Swirl removal, 92% defect kill', category: 'correction', image: '/images/gallery/g6.jpg' },
  { id: 7, title: 'Suede headliner refresh', category: 'interior', image: '/images/gallery/g7.jpg' },
  { id: 8, title: 'Graphene top coat, 3yr', category: 'coating', image: '/images/gallery/g8.jpg' },
  { id: 9, title: 'Estate wagon glow-up', category: 'exterior', image: '/images/gallery/g9.jpg' },
];

export const galleryCategories = ['all', 'exterior', 'interior', 'coating', 'correction'] as const;

export const stats = [
  { value: 1200, suffix: '+', label: 'Cars perfected' },
  { value: 9, suffix: ' yrs', label: 'In the game' },
  { value: 5, suffix: '★', label: 'Average rating' },
  { value: 48, suffix: 'h', label: 'Ceramic cure time' },
];

export const testimonials = [
  {
    quote:
      'The paint looks deeper than the day it left the factory. I stood in the car park for ten minutes just staring at it.',
    author: 'Daniel R.',
    car: 'BMW M4 Competition',
  },
  {
    quote:
      'Booked the interior restoration after a dog-and-toddler road trip. It smells and looks like a brand new cabin.',
    author: 'Priya S.',
    car: 'Volvo XC90',
  },
  {
    quote:
      'Ceramic coating has made winter washes a five-minute job. Dirt just slides off. Worth every penny.',
    author: 'Marcus T.',
    car: 'Porsche 911 Carrera',
  },
];

export const aboutTimeline = [
  { year: '2017', event: 'Founded in a single rented bay with one polisher and a pressure washer.' },
  { year: '2019', event: 'Certified ceramic installer. First 100 coated cars on the road.' },
  { year: '2021', event: 'Moved to the current 4-bay studio with IR curing lamps.' },
  { year: '2023', event: 'Added computer-cut PPF and a dedicated interior lab.' },
  { year: '2026', event: '1,200+ cars perfected and counting.' },
];
