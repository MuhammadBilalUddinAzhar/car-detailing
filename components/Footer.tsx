import Link from 'next/link';
import { site } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-carbon">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display uppercase tracking-tightest text-xl mb-3">
            Auto<span className="text-ember">Extreme</span>
          </p>
          <p className="text-mist text-sm leading-relaxed max-w-xs">
            Paint correction, ceramic coating, PPF and interior detailing —
            done once, done properly.
          </p>
        </div>
        <div>
          <p className="text-chrome font-bold text-sm uppercase tracking-wider mb-4">
            Visit the studio
          </p>
          <ul className="text-mist text-sm space-y-2">
            <li>{site.address}</li>
            <li>{site.hours}</li>
            <li>
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
                className="hover:text-ember transition-colors"
              >
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-ember transition-colors"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-chrome font-bold text-sm uppercase tracking-wider mb-4">
            Explore
          </p>
          <ul className="text-mist text-sm space-y-2">
            <li><Link href="/services" className="hover:text-ember transition-colors">Services</Link></li>
            <li><Link href="/gallery" className="hover:text-ember transition-colors">Gallery</Link></li>
            <li><Link href="/about" className="hover:text-ember transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-ember transition-colors">Contact & booking</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-mist/60 text-xs">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-mist/60">
            <a href={site.instagram} className="hover:text-ember transition-colors">Instagram</a>
            <a href={site.facebook} className="hover:text-ember transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
