import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';
import { site } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Book a slot — Auto Extreme',
  description: 'Book ceramic coating, PPF, paint correction or detailing at Auto Extreme via WhatsApp.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Booking</p>
          <h1 className="mt-3 font-display text-4xl tracking-tightest text-chrome md:text-6xl">Lock in your slot.</h1>
          <p className="mt-5 max-w-md leading-relaxed text-mist">
            Tell us about your car and the finish you want. We reply on WhatsApp within the hour with availability and a quote.
          </p>
          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="eyebrow">Studio</dt>
              <dd className="mt-1 text-chrome">{site.address}</dd>
            </div>
            <div>
              <dt className="eyebrow">Hours</dt>
              <dd className="mt-1 text-chrome">{site.hours}</dd>
            </div>
            <div>
              <dt className="eyebrow">Call or WhatsApp</dt>
              <dd className="mt-1">
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="text-chrome hover:text-ember">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="text-chrome hover:text-ember">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <ContactClient />
      </div>
    </main>
  );
}
