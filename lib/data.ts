// ─────────────────────────────────────────────────────────────
// ALL site content lives here. Replace placeholder copy, prices,
// phone numbers and image paths with your real business content.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Auto Extreme',
  tagline: 'Cinematic-grade car detailing',
  phone: '+91 98765 43210',
  // Digits only, country code first — powers the WhatsApp booking form.
  whatsapp: '919876543210',
  email: 'book@autoextreme.in',
  address: 'Unit 7, Chrome Park Industrial Estate, Bengaluru 560001',
  hours: 'Mon–Sat · 9:00 AM – 8:00 PM',
  instagram: 'https://instagram.com/autoextreme',
  youtube: 'https://youtube.com/@autoextreme',
};

export const heroContent = {
  taglineTop: 'OBSESSED WITH',
  taglineBottom: 'THE FINISH',
  cardKicker: 'AUTO EXTREME STUDIO',
  cardTitle: 'Where paint becomes glass.',
  metricValue: 1287,
  metricLabel: 'Cars Perfected',
  badges: ['9H Ceramic', 'Paint Correction', 'PPF Certified', 'Showroom Interior'],
  ctaPrimary: { label: 'Book a slot', href: '/contact' },
  ctaSecondary: { label: 'See the work', href: '/gallery' },
  carImageSrc: '/images/hero/car.png',
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: 'ceramic-coating',
    title: 'Ceramic Coating',
    tagline: 'A 9H glass shield with years of gloss.',
    description:
      'Multi-layer SiO₂ ceramic coating bonded to fully corrected paint. Hydrophobic, chemical-resistant and deeper than any wax could ever look.',
    price: 'from ₹24,999',
    duration: '2–3 days',
    features: [
      'Full decontamination + single-stage correction included',
      '2–4 layers of 9H SiO₂ coating',
      'Wheels, glass and trim coated',
      '5-year maintenance-backed warranty',
    ],
    image: '/images/services/ceramic-coating.jpg',
  },
  {
    slug: 'paint-correction',
    title: 'Paint Correction',
    tagline: 'Swirls, holograms and scratches — machined away.',
    description:
      'Measured, multi-stage machine polishing that removes defects instead of hiding them. Finished under color-corrected inspection lighting.',
    price: 'from ₹12,999',
    duration: '1–2 days',
    features: [
      'Paint depth measured panel by panel',
      '1, 2 or 3-stage correction options',
      'Swirl, scratch and hologram removal',
      'Finished with gloss-enhancing sealant',
    ],
    image: '/images/services/paint-correction.jpg',
  },
  {
    slug: 'ppf',
    title: 'Paint Protection Film',
    tagline: 'Self-healing armor for stone chips and scuffs.',
    description:
      'Precision plotter-cut TPU film with self-healing top coat. Full-body wraps or high-impact zones — invisible once installed.',
    price: 'from ₹49,999',
    duration: '3–5 days',
    features: [
      'Plotter-cut patterns, no blades near your paint',
      'Self-healing gloss or stealth matte finishes',
      'Full body, front kit or track pack coverage',
      '10-year film manufacturer warranty',
    ],
    image: '/images/services/ppf.jpg',
  },
  {
    slug: 'interior-detailing',
    title: 'Interior Detailing',
    tagline: 'Factory-fresh cabins, down to the stitching.',
    description:
      'Deep extraction of carpets and seats, steam sanitation, leather feeding and UV protection on every surface you touch.',
    price: 'from ₹6,999',
    duration: '4–6 hours',
    features: [
      'Hot-water extraction of fabric and carpets',
      'Leather cleaned, fed and UV-protected',
      'Steam sanitation of vents and touchpoints',
      'Odour neutralisation, not masking',
    ],
    image: '/images/services/interior.jpg',
  },
  {
    slug: 'full-detail',
    title: 'Signature Full Detail',
    tagline: 'The complete Auto Extreme treatment, inside-out.',
    description:
      'Our flagship package: exterior decontamination and enhancement polish, full interior deep clean, engine bay dressing and glass polishing.',
    price: 'from ₹15,999',
    duration: '1 day',
    features: [
      'Foam wash, clay bar and iron decontamination',
      'Single-stage enhancement machine polish',
      'Complete interior deep clean',
      'Engine bay cleaned and dressed',
    ],
    image: '/images/services/full-detail.jpg',
  },
  {
    slug: 'maintenance-wash',
    title: 'Maintenance Wash',
    tagline: 'Coating-safe washes that keep the shine alive.',
    description:
      'Two-bucket, pH-neutral maintenance washes designed for coated and filmed cars. Keeps your warranty valid and your gloss deep.',
    price: 'from ₹1,499',
    duration: '90 minutes',
    features: [
      'pH-neutral foam and two-bucket method',
      'Coating topper applied every visit',
      'Wheels and barrels detailed',
      'Interior wipe-down and vacuum',
    ],
    image: '/images/services/maintenance.jpg',
  },
];

export type GalleryItem = {
  id: number;
  title: string;
  category: 'Ceramic' | 'Correction' | 'PPF' | 'Interior';
  car: string;
  image: string;
};

export const gallery: GalleryItem[] = [
  { id: 1, title: 'Midnight gloss, 3 layers deep', category: 'Ceramic', car: 'BMW M4 Competition', image: '/images/gallery/m4.jpg' },
  { id: 2, title: 'Ten years of swirls, gone', category: 'Correction', car: 'Porsche 911 Carrera', image: '/images/gallery/911.jpg' },
  { id: 3, title: 'Full-body stealth PPF', category: 'PPF', car: 'Lamborghini Huracán', image: '/images/gallery/huracan.jpg' },
  { id: 4, title: 'Nappa leather revival', category: 'Interior', car: 'Mercedes S-Class', image: '/images/gallery/sclass.jpg' },
  { id: 5, title: 'Track pack + ceramic topper', category: 'PPF', car: 'Toyota GR Supra', image: '/images/gallery/supra.jpg' },
  { id: 6, title: 'Daily driver, showroom deep', category: 'Ceramic', car: 'Hyundai Creta', image: '/images/gallery/creta.jpg' },
  { id: 7, title: 'Two-stage mirror finish', category: 'Correction', car: 'Audi RS5', image: '/images/gallery/rs5.jpg' },
  { id: 8, title: 'Family SUV, factory-fresh cabin', category: 'Interior', car: 'Toyota Fortuner', image: '/images/gallery/fortuner.jpg' },
  { id: 9, title: 'High-impact front kit', category: 'PPF', car: 'Kia Seltos', image: '/images/gallery/seltos.jpg' },
];

export const stats = [
  { value: '1,287+', label: 'Cars perfected' },
  { value: '9H', label: 'Ceramic hardness' },
  { value: '5 yr', label: 'Coating warranty' },
  { value: '4.9★', label: 'Google rating' },
];

export const process = [
  { step: '01', title: 'Inspect', text: 'Paint depth readings and defect mapping under studio lighting before we quote anything.' },
  { step: '02', title: 'Decontaminate', text: 'Foam, clay and iron removal strip everything the road has bonded to your paint.' },
  { step: '03', title: 'Correct', text: 'Machine polishing removes defects permanently — we never fill or hide them.' },
  { step: '04', title: 'Protect', text: 'Ceramic or film locks in the finish. You leave with aftercare, not just an invoice.' },
];

export const testimonials = [
  {
    quote: 'The M4 looks deeper in color than the day it left the showroom. Rain just slides off.',
    name: 'Arjun R.',
    car: 'BMW M4 · Ceramic Coating',
  },
  {
    quote: 'They showed me the paint gauge readings before touching a panel. That level of care is rare.',
    name: 'Priya S.',
    car: 'Porsche 911 · Paint Correction',
  },
  {
    quote: 'Stealth PPF turned my Huracán matte and bulletproof. Flawless edges, invisible seams.',
    name: 'Karan M.',
    car: 'Lamborghini Huracán · Full PPF',
  },
];
