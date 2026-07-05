import type { Metadata } from 'next';
import Link from 'next/link';
import { stats, process, site } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About — Auto Extreme',
  description: 'The studio, the people and the obsession behind Auto Extreme.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
      <p className="eyebrow">About</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tightest text-chrome md:text-6xl">
        A studio, not a car wash.
      </h1>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="space-y-5 leading-relaxed text-mist">
          <p>
            {site.name} started in a single garage bay with one polisher, one paint gauge and a rule we still keep: never hand back a car we would not park in our own driveway.
          </p>
          <p>
            Today we run a climate-controlled studio with color-corrected inspection lighting, dedicated coating rooms and a plotter for blade-free PPF cutting. Every technician is trained in-house and every car is photographed before, during and after.
          </p>
          <p>
            We work on daily drivers as seriously as we work on supercars — because the owner who saved for their first car cares just as much as the one collecting their fifth.
          </p>
        </div>
        <div className="img-placeholder aspect-[4/3]" aria-hidden />
      </div>

      <div className="mt-20 grid grid-cols-2 gap-8 rounded-3xl border border-white/5 bg-carbon p-10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl tracking-tightest text-chrome">{s.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-mist">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <p className="eyebrow">How we work</p>
        <h2 className="mt-3 font-display text-3xl tracking-tightest text-chrome md:text-4xl">The four-stage method.</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-4">
          {process.map((p) => (
            <div key={p.step}>
              <p className="font-display text-4xl text-ember/80">{p.step}</p>
              <h3 className="mt-4 font-display text-lg text-chrome">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <Link
          href="/contact"
          className="inline-block rounded-full bg-ember px-9 py-4 font-semibold text-ink transition-colors hover:bg-emberdim hover:text-chrome"
        >
          Visit the studio
        </Link>
      </div>
    </main>
  );
}
