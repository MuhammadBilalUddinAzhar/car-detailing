import Link from 'next/link';
import CinematicCarHero from '@/components/CinematicCarHero';
import { services, stats, testimonials, site } from '@/lib/data';

export default function HomePage() {
  return (
    <>
      {/* Hero MUST stay the first section — it pins to the viewport top. */}
      <CinematicCarHero />

      {/* Services preview */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <p className="eyebrow">What we do</p>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="max-w-md font-display text-3xl tracking-tightest sm:text-4xl">
            Six ways to make it look brand new
          </h2>
          <Link href="/services" className="focus-ring text-sm font-semibold text-ember hover:underline">
            All services →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              className="focus-ring group rounded-2xl border border-graphite bg-carbon p-6 transition-colors hover:border-ember"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg tracking-tightest">{s.title}</h3>
                <span className="text-sm font-semibold text-ember">{s.price}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mist">{s.blurb}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-mist">
                {s.duration} · <span className="text-chrome group-hover:text-ember">Details →</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-graphite bg-carbon">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-16 lg:grid-cols-4">
          {stats.map((st) => (
            <div key={st.label} className="text-center">
              <p className="font-display text-4xl tracking-tightest text-ember">
                {st.value.toLocaleString()}
                {st.suffix}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-mist">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <p className="eyebrow">Word on the street</p>
        <h2 className="mt-4 font-display text-3xl tracking-tightest sm:text-4xl">
          Owners who stared a little too long
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.author} className="rounded-2xl border border-graphite bg-carbon p-7">
              <blockquote className="text-sm leading-relaxed text-chrome">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold">{t.author}</span>
                <span className="text-mist"> · {t.car}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-28">
        <div
          className="rounded-3xl border border-graphite p-10 text-center sm:p-16"
          style={{
            background:
              'radial-gradient(ellipse 80% 100% at 50% 120%, rgba(255,77,46,0.18), #121418 70%)',
          }}
        >
          <h2 className="font-display text-3xl tracking-tightest sm:text-5xl">
            Your car. <span className="text-ember">Day-one condition.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-mist">
            Message us on WhatsApp with your car and the finish you want — we reply within the hour
            during studio time.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="focus-ring rounded-full bg-ember px-8 py-4 font-semibold text-ink transition-transform hover:scale-105"
            >
              Book your detail
            </Link>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-full border border-graphite px-8 py-4 font-semibold text-chrome transition-colors hover:border-ember"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
