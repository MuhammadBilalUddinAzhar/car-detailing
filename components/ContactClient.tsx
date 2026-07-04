'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { services, site } from '@/lib/data';

export default function ContactClient() {
  const params = useSearchParams();
  const preselected = params.get('service') ?? '';

  const [name, setName] = useState('');
  const [car, setCar] = useState('');
  const [service, setService] = useState(preselected);
  const [message, setMessage] = useState('');

  // Opens a pre-filled WhatsApp chat — no backend needed.
  // Swap this for an API route / Formspree / Resend if you prefer email.
  function submit() {
    const chosen = services.find((s) => s.slug === service)?.title ?? 'General enquiry';
    const text = encodeURIComponent(
      `Hi Auto Extreme! I'd like to book.\n\nName: ${name}\nCar: ${car}\nService: ${chosen}\nNotes: ${message}`
    );
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, '_blank');
  }

  const inputCls =
    'w-full rounded-xl bg-carbon border border-white/10 px-4 py-3 text-sm text-chrome placeholder:text-mist/50 focus:outline-none focus:border-ember/60 focus:ring-2 focus:ring-ember/20 transition-colors';

  return (
    <div className="pt-28 pb-24 bg-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="text-ember text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Contact & booking
          </p>
          <h1 className="font-display uppercase tracking-tightest text-4xl md:text-6xl mb-6">
            Let’s talk paint.
          </h1>
          <p className="text-mist text-lg leading-relaxed mb-10 max-w-md">
            Send the form and it opens a pre-filled WhatsApp message — we
            usually reply within the hour during studio time.
          </p>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 text-chrome/85">
              <span className="text-ember font-bold w-20 shrink-0">Studio</span>
              {site.address}
            </li>
            <li className="flex gap-3 text-chrome/85">
              <span className="text-ember font-bold w-20 shrink-0">Hours</span>
              {site.hours}
            </li>
            <li className="flex gap-3 text-chrome/85">
              <span className="text-ember font-bold w-20 shrink-0">Phone</span>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="hover:text-ember transition-colors">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3 text-chrome/85">
              <span className="text-ember font-bold w-20 shrink-0">Email</span>
              <a href={`mailto:${site.email}`} className="hover:text-ember transition-colors">
                {site.email}
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl bg-carbon border border-white/5 p-7 lg:p-10 space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-mist mb-2">
                Your name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jamie Ortiz"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="car" className="block text-xs font-bold uppercase tracking-wider text-mist mb-2">
                Your car
              </label>
              <input
                id="car"
                value={car}
                onChange={(e) => setCar(e.target.value)}
                placeholder="2022 BMW M4, Isle of Man Green"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-mist mb-2">
                Service
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={inputCls}
              >
                <option value="">Not sure yet — advise me</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title} ({s.price})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-mist mb-2">
                Anything we should know?
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Swirls on the bonnet, dog hair in the boot…"
                className={inputCls}
              />
            </div>
            <button
              onClick={submit}
              className="w-full bg-ember hover:bg-emberdim text-white font-bold rounded-xl py-4 transition-colors"
            >
              Send via WhatsApp
            </button>
            <p className="text-mist/60 text-xs text-center">
              No account needed — opens WhatsApp with your details pre-filled.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
