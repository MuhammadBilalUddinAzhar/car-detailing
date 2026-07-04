'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { gallery } from '@/lib/data';

const filters = ['All', 'Ceramic', 'Correction', 'Interior', 'PPF'] as const;

export default function GalleryClient() {
  const [active, setActive] = useState<(typeof filters)[number]>('All');

  const items =
    active === 'All' ? gallery : gallery.filter((g) => g.category === active);

  return (
    <div className="pt-28 pb-24 bg-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <p className="text-ember text-xs font-bold uppercase tracking-[0.25em] mb-3">
            Gallery
          </p>
          <h1 className="font-display uppercase tracking-tightest text-4xl md:text-6xl mb-10">
            Recent work.
          </h1>
        </Reveal>

        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors border ${
                active === f
                  ? 'bg-ember border-ember text-white'
                  : 'bg-transparent border-white/10 text-mist hover:text-chrome hover:border-white/25'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <figure
              key={g.id}
              className="group rounded-2xl overflow-hidden bg-carbon border border-white/5"
            >
              {/* Replace with next/image + your real photo (see README) */}
              <div
                className="img-placeholder aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03]"
                role="img"
                aria-label={g.title}
              />
              <figcaption className="p-5 flex items-center justify-between">
                <p className="text-chrome text-sm font-semibold">{g.title}</p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ember bg-ember/10 border border-ember/20 rounded-full px-3 py-1">
                  {g.category}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
