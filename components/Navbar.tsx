'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/lib/data';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        scrolled || open ? 'bg-ink/90 backdrop-blur-md border-b border-graphite' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="focus-ring font-display text-lg tracking-tightest">
          AUTO<span className="text-ember">EXTREME</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`focus-ring text-sm font-medium transition-colors hover:text-chrome ${
                  pathname === l.href ? 'text-ember' : 'text-mist'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-full bg-ember px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105"
            >
              Book now
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="focus-ring flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-chrome transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-6 bg-chrome transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-6 bg-chrome transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="border-t border-graphite bg-ink/95 px-5 py-4 backdrop-blur-md md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`focus-ring block py-3 text-base font-medium ${
                  pathname === l.href ? 'text-ember' : 'text-chrome'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring block rounded-full bg-ember px-4 py-3 text-center font-semibold text-ink"
            >
              Book now
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
