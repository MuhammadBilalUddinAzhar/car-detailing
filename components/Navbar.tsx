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

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
        scrolled || open
          ? 'bg-ink/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display uppercase tracking-tightest text-lg text-chrome"
        >
          Auto<span className="text-ember">Extreme</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === l.href
                    ? 'text-ember'
                    : 'text-mist hover:text-chrome'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
              className="text-sm font-bold text-ink bg-chrome hover:bg-white rounded-full px-5 py-2 transition-colors"
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
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
        >
          <span
            className={`block w-6 h-[2px] bg-chrome transition-transform ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-chrome transition-opacity ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-chrome transition-transform ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden px-5 pb-6 pt-2 space-y-1 bg-ink/95 backdrop-blur-xl">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`block py-3 text-base font-semibold border-b border-white/5 ${
                  pathname === l.href ? 'text-ember' : 'text-chrome'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
              className="block text-center font-bold text-ink bg-chrome rounded-full px-5 py-3"
            >
              Book now
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
