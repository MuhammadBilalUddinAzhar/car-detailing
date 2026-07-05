'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { services } from '@/lib/data';

export default function ServicesClient() {
  // Deep-link support: /services#ceramic-coating scrolls to that card.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, []);

  return (
    <div className="space-y-16">
      {services.map((s, i) => (
        <article
          key={s.slug}
          id={s.slug}
          className="grid scroll-mt-24 items-center gap-10 rounded-3xl border border-white/5 bg-carbon p-7 md:grid-cols-2 md:p-10"
        >
          {/* Swap this placeholder for next/image once you add real photos:
              <Image src={s.image} alt={s.title} fill className="object-cover rounded-2xl" /> */}
          <div className={`img-placeholder aspect-[4/3] ${i % 2 === 1 ? 'md:order-2' : ''}`} aria-hidden />

          <div>
            <p className="eyebrow">
              {s.duration} · {s.price}
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tightest text-chrome md:text-4xl">{s.title}</h2>
            <p className="mt-2 font-semibold text-ember">{s.tagline}</p>
            <p className="mt-4 leading-relaxed text-mist">{s.description}</p>
            <ul className="mt-6 space-y-3">
              {s.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-chrome">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={`/contact?service=${s.slug}`}
              className="mt-8 inline-block rounded-full bg-ember px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-emberdim hover:text-chrome"
            >
              Book {s.title}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
