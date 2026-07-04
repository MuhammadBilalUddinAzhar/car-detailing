import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { process, stats } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About — Auto Extreme',
  description: 'The studio, the standards and the people behind Auto Extreme.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <p className="text-ember text-xs font-bold uppercase tracking-[0.25em] mb-3">
            About
          </p>
          <h1 className="font-display uppercase tracking-tightest text-4xl md:text-6xl mb-6 max-w-3xl">
            Built by people who wash their own wheels twice.
          </h1>
          <p className="text-mist text-lg leading-relaxed max-w-2xl mb-16">
            Auto Extreme started in a single garage bay with a paint depth
            gauge, a rotary polisher and an unhealthy relationship with
            cross-hatch lighting. Today it’s a dedicated studio — same
            standards, better lighting.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="rounded-2xl bg-carbon border border-white/5 p-6 text-center">
                <p className="font-display text-3xl text-ember tracking-tightest mb-1">
                  {s.value}
                </p>
                <p className="text-mist text-xs uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 className="font-display uppercase tracking-tightest text-2xl md:text-4xl mb-10">
            How every car is handled
          </h2>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 100}>
              <div className="relative pl-5 border-l border-ember/30">
                <span className="font-display text-ember/60 text-sm tracking-tightest">
                  {p.step}
                </span>
                <h3 className="text-chrome font-bold text-lg mt-2 mb-3 tracking-tight">
                  {p.title}
                </h3>
                <p className="text-mist text-sm leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="rounded-3xl bg-carbon border border-white/5 p-10 text-center">
            <h2 className="font-display uppercase tracking-tightest text-2xl md:text-3xl mb-4">
              Come see the studio
            </h2>
            <p className="text-mist mb-8 max-w-xl mx-auto">
              Drop by for a coffee and a walk-around quote — no booking needed
              for inspections.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-ember hover:bg-emberdim text-white font-bold rounded-full px-10 py-4 transition-colors"
            >
              Get directions & book
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
