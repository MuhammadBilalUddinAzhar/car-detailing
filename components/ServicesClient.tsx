'use client';

import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { services } from '@/lib/data';

export default function ServicesClient() {
  return (
    <div className="pt-28 pb-24 bg-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <p className="text-ember text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Services
          </p>
          <h1 className="font-display uppercase tracking-tightest text-4xl md:text-6xl mb-4">
            Pick your finish.
          </h1>
          <p className="text-mist text-lg max-w-2xl mb-16">
            Every package starts with an inspection and paint depth readings —
            prices below are honest starting points, confirmed before we begin.
          </p>
        </Reveal>

        <div className="space-y-16">
          {services.map((s, i) => (
            <Reveal key={s.slug}>
              <article
                id={s.slug}
                className="scroll-mt-24 grid gap-8 lg:grid-cols-2 items-center rounded-3xl bg-carbon border border-white/5 p-7 lg:p-10"
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  {/* Replace with next/image + your real photo (see README) */}
                  <div
                    className="img-placeholder rounded-2xl aspect-[4/3] flex items-end p-5"
                    role="img"
                    aria-label={s.title}
                  >
                    <span className="relative z-10 text-mist/70 text-xs uppercase tracking-wider">
                      {s.image}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                    <h2 className="text-chrome font-bold text-2xl md:text-3xl tracking-tight">
                      {s.title}
                    </h2>
                    <span className="text-ember font-bold">{s.price}</span>
                    <span className="text-mist text-sm">· {s.duration}</span>
                  </div>
                  <p className="text-mist leading-relaxed mb-6">{s.blurb}</p>
                  <ul className="space-y-2.5 mb-8">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-chrome/85">
                        <svg
                          className="w-4 h-4 text-ember mt-0.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?service=${s.slug}`}
                    className="inline-block bg-ember hover:bg-emberdim text-white font-bold rounded-full px-8 py-3 transition-colors text-sm"
                  >
                    Book {s.title}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
