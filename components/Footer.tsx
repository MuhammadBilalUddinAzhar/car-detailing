import Link from 'next/link';
import { site, services } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-carbon">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-lg tracking-tightest">
            AUTO<span className="text-ember">EXTREME</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mist">{site.tagline}. Every panel inspected, corrected and protected under studio lighting.</p>
        </div>

        <div>
          <p className="eyebrow mb-4">Services</p>
          <ul className="space-y-2 text-sm text-mist">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-chrome">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Studio</p>
          <ul className="space-y-2 text-sm text-mist">
            <li><Link href="/about" className="hover:text-chrome">About us</Link></li>
            <li><Link href="/gallery" className="hover:text-chrome">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-chrome">Book a slot</Link></li>
            <li><a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-chrome">Instagram</a></li>
            <li><a href={site.youtube} target="_blank" rel="noreferrer" className="hover:text-chrome">YouTube</a></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Visit</p>
          <p className="text-sm leading-relaxed text-mist">
            {site.address}
            <br />
            {site.hours}
            <br />
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="mt-2 inline-block text-chrome hover:text-ember">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="text-chrome hover:text-ember">
              {site.email}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-mist/60">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
