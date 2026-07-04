'use client';

import { useState } from 'react';
import { services, site } from '@/lib/data';

export default function ContactClient() {
  const [name, setName] = useState('');
  const [car, setCar] = useState('');
  const [service, setService] = useState(services[0].title);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Opens a pre-filled WhatsApp chat — no backend needed.
  // Swap this for an API route / Formspree / Resend if you prefer email.
  const submit = () => {
    if (!name.trim() || !car.trim()) {
      setError('Add your name and your car so we know who and what we’re booking.');
      return;
    }
    setError(null);
    const text = [
      `Hi ${site.name} — I'd like to book a detail.`,
      `Name: ${name.trim()}`,
      `Car: ${car.trim()}`,
      `Service: ${service}`,
      message.trim() ? `Notes: ${message.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const inputCls =
    'focus-ring w-full rounded-xl border border-graphite bg-carbon px-4 py-3 text-sm text-chrome placeholder:text-mist/60';

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <p className="eyebrow">Contact & booking</p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tightest sm:text-5xl">
        Two minutes to book. <span className="text-ember">A day to transform.</span>
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* Form */}
        <div className="rounded-3xl border border-graphite bg-carbon p-7 sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-chrome">Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Driver"
                className={inputCls}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-chrome">Your car</span>
              <input
                value={car}
                onChange={(e) => setCar(e.target.value)}
                placeholder="2022 Golf GTI, black"
                className={inputCls}
              />
            </label>
          </div>

          <label className="mt-5 block text-sm">
            <span className="mb-1.5 block font-medium text-chrome">Service</span>
            <select value={service} onChange={(e) => setService(e.target.value)} className={inputCls}>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title} · {s.price}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-5 block text-sm">
            <span className="mb-1.5 block font-medium text-chrome">Anything we should know?</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Swirl marks on the hood, dog hair in the boot…"
              className={inputCls}
            />
          </label>

          {error && (
            <p role="alert" className="mt-4 text-sm text-ember">
              {error}
            </p>
          )}

          <button
            onClick={submit}
            className="focus-ring mt-7 w-full rounded-full bg-ember px-8 py-4 font-semibold text-ink transition-transform hover:scale-[1.02] sm:w-auto"
          >
            Send via WhatsApp
          </button>
          <p className="mt-3 text-xs text-mist">
            Opens WhatsApp with your booking pre-filled — nothing is sent until you hit send there.
          </p>
        </div>

        {/* Studio info */}
        <div className="space-y-8">
          <div>
            <p className="eyebrow">Visit the studio</p>
            <p className="mt-3 leading-relaxed text-mist">
              {site.address}
              <br />
              {site.hours}
            </p>
          </div>
          <div>
            <p className="eyebrow">Prefer to talk?</p>
            <ul className="mt-3 space-y-2 text-mist">
              <li>
                <a
                  href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
                  className="focus-ring hover:text-chrome"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="focus-ring hover:text-chrome">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-graphite bg-carbon p-7">
            <p className="font-display text-lg tracking-tightest">Good to know</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-mist">
              <li>Drop-off details include a courtesy exterior inspection with paint readings.</li>
              <li>Ceramic and PPF bookings need a 50% deposit to hold the bay.</li>
              <li>We&apos;ll send progress photos while your car is with us.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
