'use client';

import { useMemo, useState } from 'react';
import { gallery, galleryCategories } from '@/lib/data';

type Category = (typeof galleryCategories)[number];

export default function GalleryClient() {
  const [filter, setFilter] = useState<Category>('all');

  const items = useMemo(
    () => (filter === 'all' ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <p className="eyebrow">Gallery</p>
      <h1 className="mt-4 font-display text-4xl leading-tight tracking-tightest sm:text-5xl">
        Fresh out of the <span className="text-ember">studio</span>
      </h1>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label="Filter gallery by category">
        {galleryCategories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`focus-ring rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors ${
              filter === c
                ? 'bg-ember text-ink'
                : 'border border-graphite text-mist hover:border-ember hover:text-chrome'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <figure key={g.id} className="group">
            {/* Replace with next/image once real photos are in /public/images/gallery */}
            <div className="img-placeholder aspect-[4/3] transition-transform duration-300 group-hover:scale-[1.02]">
              <span className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.25em] text-mist">
                {g.category}
              </span>
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-sm">
              <span className="text-chrome">{g.title}</span>
              <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-ember">
                {g.category}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-16 text-center text-mist">
          Nothing in this category yet — check back after the next batch of details.
        </p>
      )}
    </div>
  );
}
