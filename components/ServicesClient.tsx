'use client';

import { useEffect, useState } from 'react';
import { services, site } from '@/lib/data';

export default function ServicesClient() {
  const [active, setActive] = useState<string | null>(null);

  // Deep-link support: /services#ceramic-coating scrolls to & highlights the card.
  useEffect(() => {
    const applyHash = () => {
      const slug = window.location.hash.replace('#', '');
      if (!slug) return;
      setActive(slug);
      // Wait a frame so layout is settled before scrolling.
      requestAnimationFrame(() => {
        document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <p className="eyebrow">Services</p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tightest sm:text-5xl">
        Pick the finish. <span className="text-ember">We handle the obsession.</span>
      </h1>
      <p className="mt-5 max-w-xl text-mist">
        Every package starts with a safe decontamination wash and ends with a walk-around under
        studio lighting. Prices are starting points — final quote depends on size and condition.
      </p>

      <div className="mt-14 space-y-8">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className={`grid scroll-mt-24 gap-8 rounded-3xl border p-7 transition-colors sm:p-10 lg:grid-cols-2 ${
              active === s.slug ? 'border-ember bg-carbon' : 'border-graphite bg-carbon/60'
            }`}
          >
            <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
              {/* Replace with next/image once real photos are in /public/images/services */}
              <div className="img-placeholder aspect-[4/3]">
                <span className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.25em] text-mist">
                  {s.title}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="font-display text-2xl tracking-tightest">{s.title}</h2>
                <span className="font-semibold text-ember">{s.price}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-mist">{s.duration}</span>
              </div>
              <p className="mt-4 leading-relaxed text-mist">{s.blurb}</p>
              <ul className="mt-6 space-y-2">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex gap-3 text-sm text-chrome">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                    {inc}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                  `Hi Auto Extreme — I'd like to book the ${s.title}.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-8 inline-block w-fit rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
              >
                Book {s.title}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
