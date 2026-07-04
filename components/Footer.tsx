import Link from 'next/link';
import { site } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-graphite bg-carbon">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg tracking-tightest">
            AUTO<span className="text-ember">EXTREME</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mist">{site.tagline}. Every panel, every stitch, perfected.</p>
        </div>

        <div>
          <p className="eyebrow">Visit</p>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            {site.address}
            <br />
            {site.hours}
          </p>
        </div>

        <div>
          <p className="eyebrow">Talk</p>
          <ul className="mt-3 space-y-2 text-sm text-mist">
            <li>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="focus-ring hover:text-chrome">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="focus-ring hover:text-chrome">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="focus-ring hover:text-chrome">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-mist">
            <li><Link href="/services" className="focus-ring hover:text-chrome">Services</Link></li>
            <li><Link href="/gallery" className="focus-ring hover:text-chrome">Gallery</Link></li>
            <li><Link href="/about" className="focus-ring hover:text-chrome">About</Link></li>
            <li><Link href="/contact" className="focus-ring hover:text-chrome">Book a detail</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-graphite py-5 text-center text-xs text-mist">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
