import type { Metadata } from 'next';
import Link from 'next/link';
import { aboutTimeline, site, stats } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About — Auto Extreme',
  description: 'The studio, the standard and the story behind Auto Extreme.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-28">
      <p className="eyebrow">About the studio</p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tightest sm:text-5xl">
        Built by people who <span className="text-ember">notice everything</span>
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 leading-relaxed text-mist">
          <p>
            {site.name} started in 2017 with one polisher, one pressure washer and a stubborn belief
            that a car wash should never leave a car worse than it arrived. Nine years later the
            studio runs four dedicated bays — wash, correction, coating and interior — under
            colour-accurate lighting, because you can&apos;t fix what you can&apos;t see.
          </p>
          <p>
            Every vehicle follows the same discipline: safe decontamination first, measured
            correction second, protection last. Paint depth is logged before a machine ever touches
            a panel. Coatings cure under infrared lamps, not hope. And nothing leaves the building
            until it passes the final walk-around under 6500K light.
          </p>
          <p>
            We work on daily drivers, weekend toys and full concours builds alike. The standard
            doesn&apos;t change with the badge on the hood.
          </p>
          <Link
            href="/contact"
            className="focus-ring inline-block rounded-full bg-ember px-7 py-3.5 font-semibold text-ink transition-transform hover:scale-105"
          >
            Book a visit
          </Link>
        </div>

        {/* Timeline */}
        <ol className="relative space-y-8 border-l border-graphite pl-8">
          {aboutTimeline.map((t) => (
            <li key={t.year} className="relative">
              <span
                aria-hidden
                className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-ember"
              />
              <p className="font-display text-lg tracking-tightest text-ember">{t.year}</p>
              <p className="mt-1 text-sm leading-relaxed text-mist">{t.event}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-2 gap-6 rounded-3xl border border-graphite bg-carbon p-10 lg:grid-cols-4">
        {stats.map((st) => (
          <div key={st.label} className="text-center">
            <p className="font-display text-3xl tracking-tightest text-ember sm:text-4xl">
              {st.value.toLocaleString()}
              {st.suffix}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-mist">{st.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
