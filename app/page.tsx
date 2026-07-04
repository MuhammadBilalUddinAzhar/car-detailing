import Link from 'next/link';
import CinematicCarHero from '@/components/CinematicCarHero';
import Reveal from '@/components/Reveal';
import { services, stats, process, testimonials } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      {/* Cinematic pinned scroll hero */}
      <CinematicCarHero />

      {/* Stats strip */}
      <section className="relative z-10 bg-ink border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="text-center">
                <p className="font-display text-3xl md:text-4xl text-ember tracking-tightest mb-1">
                  {s.value}
                </p>
                <p className="text-mist text-xs md:text-sm uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-ink py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <p className="text-ember text-xs font-bold uppercase tracking-[0.25em] mb-3">
              What we do
            </p>
            <h2 className="font-display uppercase tracking-tightest text-3xl md:text-5xl mb-14 max-w-2xl">
              Six ways to make your paint <span className="text-ember">unreasonable</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group block h-full rounded-2xl bg-carbon border border-white/5 p-7 transition-all duration-300 hover:border-ember/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(255,77,46,0.25)]"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="text-chrome font-bold text-lg tracking-tight group-hover:text-ember transition-colors">
                      {s.title}
                    </h3>
                    <span className="text-ember text-sm font-semibold whitespace-nowrap ml-3">
                      {s.price}
                    </span>
                  </div>
                  <p className="text-mist text-sm leading-relaxed mb-6">
                    {s.blurb}
                  </p>
                  <span className="text-xs font-bold uppercase tracking-wider text-mist group-hover:text-chrome transition-colors">
                    View details →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-carbon border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <p className="text-ember text-xs font-bold uppercase tracking-[0.25em] mb-3">
              The process
            </p>
            <h2 className="font-display uppercase tracking-tightest text-3xl md:text-5xl mb-14">
              No shortcuts. Ever.
            </h2>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ink py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <Reveal>
            <p className="text-ember text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Word of mouth
            </p>
            <h2 className="font-display uppercase tracking-tightest text-3xl md:text-5xl mb-14">
              Owners talk.
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="h-full rounded-2xl bg-carbon border border-white/5 p-7 flex flex-col">
                  <blockquote className="text-chrome/90 text-sm leading-relaxed flex-1">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-white/5">
                    <p className="text-chrome font-bold text-sm">{t.name}</p>
                    <p className="text-mist text-xs">{t.car}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-carbon border-t border-white/5 py-24">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <Reveal>
            <h2 className="font-display uppercase tracking-tightest text-3xl md:text-5xl mb-6">
              Ready when <span className="text-ember">you</span> are.
            </h2>
            <p className="text-mist text-lg mb-10 max-w-xl mx-auto">
              Slots fill about two weeks out. Tell us about your car and we’ll
              confirm your booking the same day.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-ember hover:bg-emberdim text-white font-bold rounded-full px-10 py-4 transition-colors"
            >
              Book your detail
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
