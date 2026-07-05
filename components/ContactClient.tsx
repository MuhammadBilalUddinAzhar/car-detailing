'use client';

import { useEffect, useState } from 'react';
import { services, site } from '@/lib/data';

export default function ContactClient() {
  const [name, setName] = useState('');
  const [car, setCar] = useState('');
  const [service, setService] = useState(services[0].slug);
  const [message, setMessage] = useState('');

  // Pre-select service from ?service=slug (linked from service cards).
  useEffect(() => {
    const pre = new URLSearchParams(window.location.search).get('service');
    if (pre && services.some((s) => s.slug === pre)) setService(pre);
  }, []);

  // Opens a pre-filled WhatsApp chat (no backend). Swap this function for an
  // API route or Formspree/Resend if you prefer email.
  function submit() {
    const chosen = services.find((s) => s.slug === service);
    const text = [
      `Hi ${site.name}! I'd like to book a slot.`,
      `Name: ${name || '—'}`,
      `Car: ${car || '—'}`,
      `Service: ${chosen?.title ?? service}`,
      message ? `Notes: ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  }

  const inputCls =
    'w-full rounded-xl border border-white/10 bg-graphite px-4 py-3 text-sm text-chrome placeholder:text-mist/60 outline-none transition-colors focus:border-ember';

  return (
    <div className="rounded-3xl border border-white/5 bg-carbon p-7 md:p-10">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Your name
          </label>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Arjun Rao" className={inputCls} />
        </div>
        <div>
          <label htmlFor="car" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist">
            Your car
          </label>
          <input id="car" value={car} onChange={(e) => setCar(e.target.value)} placeholder="2023 BMW M340i, black" className={inputCls} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="service" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist">
          Service
        </label>
        <select id="service" value={service} onChange={(e) => setService(e.target.value)} className={inputCls}>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title} · {s.price}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-mist">
          Anything we should know?
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Swirl marks on the bonnet, preferred weekend slot…"
          className={inputCls}
        />
      </div>

      <button
        onClick={submit}
        className="mt-7 w-full rounded-full bg-ember py-4 font-semibold text-ink transition-colors hover:bg-emberdim hover:text-chrome"
      >
        Send on WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-mist">Opens WhatsApp with your details pre-filled — nothing is stored on this site.</p>
    </div>
  );
}
