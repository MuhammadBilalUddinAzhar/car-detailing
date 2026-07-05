import Link from 'next/link';
import CinematicCarHero from '@/components/CinematicCarHero';
import { heroContent, services, stats, process, testimonials } from '@/lib/data';

export default function HomePage() {
  return (
    <main>
      {/* The hero MUST be the first section — it pins to the top of the viewport. */}
      <CinematicCarHero {...heroContent} />

      {/* Stats band */}
      <section className="border-y border-white/5 bg-carbon">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4 md:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl tracking-tightest text-chrome md:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-mist">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 font-display text-3xl tracking-tightest text-chrome md:text-5xl">
              Six ways to protect
              <br />
              what you drive.
            </h2>
          </div>
          <Link href="/services" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-chrome transition-colors hover:border-ember hover:text-ember">
            All services →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              className="group rounded-2xl border border-white/5 bg-carbon p-7 transition-all hover:-translate-y-1 hover:border-ember/40"
            >
              <div className="img-placeholder mb-6 aspect-[16/10]" aria-hidden />
              <h3 className="font-display text-xl tracking-tightest text-chrome group-hover:text-ember">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.tagline}</p>
              <p className="mt-4 text-sm font-semibold text-ember">{s.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-white/5 bg-carbon">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <p className="eyebrow">The method</p>
          <h2 className="mt-3 font-display text-3xl tracking-tightest text-chrome md:text-5xl">Every car, four stages.</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {process.map((p) => (
              <div key={p.step}>
                <p className="font-display text-4xl text-ember/80">{p.step}</p>
                <h3 className="mt-4 font-display text-lg text-chrome">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <p className="eyebrow">Owners talking</p>
        <h2 className="mt-3 font-display text-3xl tracking-tightest text-chrome md:text-5xl">Trusted with the good stuff.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-white/5 bg-carbon p-7">
              <blockquote className="text-sm leading-relaxed text-chrome">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-chrome">{t.name}</span>
                <span className="block text-mist">{t.car}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden border-t border-white/5 bg-carbon">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 120%, rgba(255,77,46,0.18), transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:px-8">
          <h2 className="font-display text-3xl tracking-tightest text-chrome md:text-5xl">Your paint deserves the studio treatment.</h2>
          <p className="mx-auto mt-4 max-w-xl text-mist">Send us your car and the finish you want — we reply on WhatsApp within the hour with a slot and a quote.</p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-ember px-9 py-4 font-semibold text-ink transition-colors hover:bg-emberdim hover:text-chrome"
          >
            Book your slot
          </Link>
        </div>
      </section>
    </main>
  );
}
