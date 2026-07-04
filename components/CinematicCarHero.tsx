'use client';

import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = {
  brand?: string;
  taglineTop?: string;
  taglineBottom?: string;
  cardTitle?: string;
  cardBody?: string;
  metricValue?: number;
  metricSuffix?: string;
  metricLabel?: string;
  badges?: string[];
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  carImageSrc?: string;
};

export default function CinematicCarHero({
  brand = 'AUTO EXTREME',
  taglineTop = 'Detailing is not a wash.',
  taglineBottom = "It's a resurrection.",
  cardTitle = 'The Signature Standard',
  cardBody = 'Every car that rolls into the studio leaves with corrected paint, sealed protection and a cabin that smells like day one.',
  metricValue = 1200,
  metricSuffix = '+',
  metricLabel = 'Cars perfected',
  badges = ['Ceramic certified', 'PPF specialists', 'IR-cured coatings', '5★ rated'],
  ctaPrimaryLabel = 'Book your detail',
  ctaPrimaryHref = '/contact',
  ctaSecondaryLabel = 'See the services',
  ctaSecondaryHref = '/services',
  carImageSrc = '/images/hero/car.png',
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const carWrapRef = useRef<HTMLDivElement>(null);
  const carTiltRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useLayoutEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) {
      setReduced(true);
      // Static render: everything visible, no pin, counter at final value.
      if (counterRef.current) {
        counterRef.current.textContent = metricValue.toLocaleString();
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const counterState = { v: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: '+=7000',
          scrub: 1,
          pin: stageRef.current,
          anticipatePin: 1,
        },
        defaults: { ease: 'none' },
      });

      // Phase 1 — headline lines reveal, then drift up & fade
      tl.fromTo(
        '.hero-line',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.12, duration: 1 },
      )
        .to({}, { duration: 0.5 }) // hold
        .to(headlineRef.current, { yPercent: -40, opacity: 0, duration: 1 }, '+=0.2');

      // Phase 2 — carbon card rises to fullscreen
      tl.fromTo(
        cardRef.current,
        { yPercent: 110, scale: 0.86, borderRadius: 32 },
        { yPercent: 0, scale: 1, borderRadius: 0, duration: 1.6 },
        '-=0.6',
      );

      // Phase 3 — car flies in with 3D perspective
      tl.fromTo(
        carWrapRef.current,
        { xPercent: 130, rotateY: -32, rotateZ: 3, opacity: 0 },
        { xPercent: 0, rotateY: 0, rotateZ: 0, opacity: 1, duration: 2 },
        '-=0.4',
      );

      // Phase 4 — badges stagger in + counter counts up
      tl.fromTo(
        '.hero-badge',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1 },
      ).to(
        counterState,
        {
          v: metricValue,
          duration: 1.6,
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(counterState.v).toLocaleString();
            }
          },
        },
        '<',
      );

      tl.to({}, { duration: 0.6 }); // hold the full scene

      // Phase 5 — card pulls back, CTAs revealed
      tl.to(cardRef.current, { yPercent: -8, scale: 0.9, borderRadius: 32, duration: 1.4 })
        .to(carWrapRef.current, { scale: 0.94, duration: 1.4 }, '<')
        .fromTo(
          ctaRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=0.6',
        );
    }, wrapRef);

    // Mouse tilt on the car
    const onMove = (e: MouseEvent) => {
      if (!carTiltRef.current) return;
      const { innerWidth, innerHeight } = window;
      const rx = (e.clientY / innerHeight - 0.5) * -6;
      const ry = (e.clientX / innerWidth - 0.5) * 10;
      gsap.to(carTiltRef.current, {
        rotateX: rx,
        rotateY: ry,
        duration: 0.6,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
      ctx.revert();
    };
  }, [metricValue]);

  return (
    <div ref={wrapRef} className={reduced ? 'reduced-hero' : ''}>
      <section
        ref={stageRef}
        className={`relative overflow-hidden bg-ink ${
          reduced ? 'min-h-screen py-28' : 'h-screen'
        }`}
        aria-label={`${brand} hero`}
      >
        {/* Ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 110%, rgba(255,77,46,0.18), transparent 70%)',
          }}
        />

        {/* Phase 1 — headline */}
        <div
          ref={headlineRef}
          className={`${
            reduced ? 'relative py-10' : 'absolute inset-0'
          } z-10 flex flex-col items-center justify-center px-5 text-center`}
        >
          <p className="eyebrow mb-5">{brand}</p>
          <h1 className="font-display text-4xl leading-[1.05] tracking-tightest sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className={`hero-line block ${reduced ? '' : 'opacity-0'}`}>{taglineTop}</span>
            </span>
            <span className="block overflow-hidden">
              <span className={`hero-line block text-ember ${reduced ? '' : 'opacity-0'}`}>
                {taglineBottom}
              </span>
            </span>
          </h1>
          {!reduced && (
            <p className="mt-10 animate-pulse text-xs uppercase tracking-[0.3em] text-mist">
              Scroll to enter the studio
            </p>
          )}
        </div>

        {/* Phase 2+ — carbon card */}
        <div
          ref={cardRef}
          className={`${
            reduced ? 'relative mx-5 rounded-3xl' : 'absolute inset-0 translate-y-[110%]'
          } z-20 flex flex-col items-center justify-center overflow-hidden bg-carbon px-5 py-16`}
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgba(232,234,237,0.02) 0 2px, transparent 2px 6px), repeating-linear-gradient(-45deg, rgba(232,234,237,0.02) 0 2px, transparent 2px 6px)',
          }}
        >
          <div className="max-w-2xl text-center">
            <p className="eyebrow mb-4">{cardTitle}</p>
            <p className="text-base leading-relaxed text-mist sm:text-lg">{cardBody}</p>
          </div>

          {/* Car with mouse tilt + reflection over ember floor */}
          <div
            ref={carWrapRef}
            className={`relative mt-8 w-full max-w-3xl ${reduced ? '' : 'opacity-0'}`}
            style={{ perspective: '1200px' }}
          >
            <div ref={carTiltRef} style={{ transformStyle: 'preserve-3d' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={carImageSrc}
                alt="Detailed car, side profile"
                className="relative z-10 mx-auto w-full max-w-2xl select-none"
                draggable={false}
              />
              {/* Mirror reflection */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={carImageSrc}
                alt=""
                aria-hidden
                draggable={false}
                className="mx-auto -mt-2 w-full max-w-2xl -scale-y-100 select-none opacity-25"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 45%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 45%, black 100%)',
                }}
              />
            </div>
            {/* Ember showroom floor */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-[58%] -z-0 h-40 blur-2xl"
              style={{
                background:
                  'radial-gradient(ellipse 60% 55% at 50% 40%, rgba(255,77,46,0.35), transparent 70%)',
              }}
            />
          </div>

          {/* Badges + counter */}
          <div ref={badgesRef} className="mt-10 flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {badges.map((b) => (
                <span
                  key={b}
                  className={`hero-badge rounded-full border border-graphite bg-ink/60 px-4 py-1.5 text-xs font-medium text-mist ${
                    reduced ? '' : 'opacity-0'
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="text-center">
              <p className="font-display text-5xl tracking-tightest text-ember sm:text-6xl">
                <span ref={counterRef}>0</span>
                {metricSuffix}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-mist">{metricLabel}</p>
            </div>
          </div>
        </div>

        {/* Phase 5 — CTAs revealed behind the card */}
        <div
          ref={ctaRef}
          className={`${
            reduced ? 'relative py-14' : 'absolute inset-x-0 bottom-10 opacity-0'
          } z-30 flex flex-col items-center justify-center gap-4 px-5 sm:flex-row`}
        >
          <Link
            href={ctaPrimaryHref}
            className="focus-ring w-full rounded-full bg-ember px-8 py-4 text-center font-semibold text-ink transition-transform hover:scale-105 sm:w-auto"
          >
            {ctaPrimaryLabel}
          </Link>
          <Link
            href={ctaSecondaryHref}
            className="focus-ring w-full rounded-full border border-graphite px-8 py-4 text-center font-semibold text-chrome transition-colors hover:border-ember sm:w-auto"
          >
            {ctaSecondaryLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
