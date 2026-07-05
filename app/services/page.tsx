import type { Metadata } from 'next';
import ServicesClient from '@/components/ServicesClient';

export const metadata: Metadata = {
  title: 'Services — Auto Extreme',
  description: 'Ceramic coating, paint correction, PPF, interior detailing, full details and maintenance washes.',
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
      <p className="eyebrow">Services</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tightest text-chrome md:text-6xl">
        Pick your finish. We handle the obsession.
      </h1>
      <p className="mt-5 max-w-2xl text-mist">
        Every package starts with an inspection under studio lighting and a paint-depth reading — so the quote you get is for your car, not an average one.
      </p>
      <div className="mt-16">
        <ServicesClient />
      </div>
    </main>
  );
}
