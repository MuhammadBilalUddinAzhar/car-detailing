'use client';

import { useState } from 'react';
import { gallery } from '@/lib/data';

const filters = ['All', 'Ceramic', 'Correction', 'PPF', 'Interior'] as const;

export default function GalleryClient() {
  const [active, setActive] = useState<(typeof filters)[number]>('All');
  const items = active === 'All' ? gallery : gallery.filter((g) => g.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              active === f
                ? 'bg-ember text-ink'
                : 'border border-white/10 text-mist hover:border-ember/50 hover:text-chrome'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <figure key={g.id} className="group overflow-hidden rounded-2xl border border-white/5 bg-carbon">
            {/* Swap this placeholder for next/image once you add real photos:
                <Image src={g.image} alt={g.title} fill className="object-cover rounded-2xl" /> */}
            <div className="img-placeholder aspect-[4/3] rounded-none transition-transform duration-500 group-hover:scale-105" aria-hidden />
            <figcaption className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">{g.category}</p>
              <h3 className="mt-2 font-display text-base text-chrome">{g.title}</h3>
              <p className="mt-1 text-sm text-mist">{g.car}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
