'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EmberShader from '@/components/EmberShader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type CTA = { label: string; href: string };

type Props = {
  brandName?: string;
  taglineTop?: string;
  taglineBottom?: string;
  cardKicker?: string;
  cardTitle?: string;
  metricValue?: number;
  metricLabel?: string;
  badges?: string[];
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
  carImageSrc?: string;
};

export default function CinematicCarHero({
  brandName = 'AUTO EXTREME',
  taglineTop = 'OBSESSED WITH',
  taglineBottom = 'THE FINISH',
  cardKicker = 'AUTO EXTREME STUDIO',
  cardTitle = 'Where paint becomes glass.',
  metricValue = 1287,
  metricLabel = 'Cars Perfected',
  badges = ['9H Ceramic', 'Paint Correction', 'PPF Certified', 'Showroom Interior'],
  ctaPrimary = { label: 'Book a slot', href: '/contact' },
  ctaSecondary = { label: 'See the work', href: '/gallery' },
  carImageSrc = '/images/hero/car.png',
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  // Intro layer
  const shaderWrapRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introBrandRef = useRef<HTMLParagraphElement>(null);
  const introCarRef = useRef<HTMLDivElement>(null);
  const introLineRef = useRef<HTMLDivElement>(null);
  const introLabelRef = useRef<HTMLParagraphElement>(null);

  // Scroll-story layers
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const carScrollRef = useRef<HTMLDivElement>(null); // scroll-driven transforms
  const carTiltRef = useRef<HTMLDivElement>(null); // mouse-driven tilt (nested, so they don't fight)
  const floorRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const metricBlockRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion !== false) return; // wait for detection; skip entirely if reduced

    const ctx = gsap.context(() => {
      const headlineLines = headlineRef.current!.querySelectorAll('[data-line]');
      const brandChars = introBrandRef.current!.querySelectorAll('[data-char]');
      const badgeEls = badgesRef.current!.querySelectorAll('[data-badge]');

      // ── Initial states ──────────────────────────────────────
      gsap.set(headlineLines, { yPercent: 110 });
      gsap.set(hintRef.current, { opacity: 0 });
      gsap.set(brandChars, { yPercent: 120, opacity: 0 });
      gsap.set(introCarRef.current, { xPercent: -160, opacity: 0 });
      gsap.set(introLineRef.current, { scaleX: 0 });
      gsap.set(cardRef.current, { yPercent: 115, scale: 0.92, borderRadius: 40 });
      gsap.set(carScrollRef.current, {
        xPercent: 90,
        z: -650,
        rotateY: -48,
        rotateX: 14,
        scale: 0.55,
        opacity: 0,
      });
      gsap.set(floorRef.current, { opacity: 0 });
      gsap.set(badgeEls, { opacity: 0, y: 30, scale: 0.8 });
      gsap.set(metricBlockRef.current, { opacity: 0, y: 30 });
      gsap.set(copyRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 40 });

      // ═══════════════════════════════════════════════════════
      // INTRO — plays automatically on page load (NOT scrubbed),
      // so the first paint is a shader + car animation, never blank.
      // ═══════════════════════════════════════════════════════
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

      intro
        // brand name letters rise
        .to(brandChars, { yPercent: 0, opacity: 1, stagger: 0.045, duration: 0.7 }, 0.15)
        // ignition line charges under the brand
        .to(introLineRef.current, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.3)
        // the car streaks across the screen over the shader
        .fromTo(
          introCarRef.current,
          { xPercent: -160, opacity: 0, skewX: -6, filter: 'blur(6px)' },
          { xPercent: 0, opacity: 1, skewX: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power4.out' },
          0.4
        )
        .to(introCarRef.current, { xPercent: 160, opacity: 0, skewX: 6, filter: 'blur(6px)', duration: 0.9, ease: 'power4.in' }, 1.7)
        // intro elements exit
        .to([introBrandRef.current, introLineRef.current, introLabelRef.current], {
          yPercent: -60,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.in',
        }, 2.3)
        .set(introRef.current, { pointerEvents: 'none' })
        // shader dims from intro backdrop to ambient hero atmosphere
        .to(shaderWrapRef.current, { opacity: 0.45, duration: 0.9, ease: 'power1.inOut' }, 2.5)
        // headline reveal — the resting state of the page
        .to(headlineLines, { yPercent: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out' }, 2.65)
        .to(hintRef.current, { opacity: 1, duration: 0.5 }, 3.2);

      // If the browser restored a mid-page scroll position, skip straight
      // past the intro so it never plays on top of the scroll story.
      if (window.scrollY > 10) intro.progress(1);

      // ═══════════════════════════════════════════════════════
      // SCROLL STORY — scrubbed over ~7000px. Starts from the
      // post-intro resting state (headline visible).
      // ═══════════════════════════════════════════════════════
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=7000',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1 · Headline scales away
      tl.to(headlineRef.current, { scale: 1.6, opacity: 0, filter: 'blur(8px)', duration: 1 })
        .to(hintRef.current, { opacity: 0, duration: 0.3 }, '<')
        .to(shaderWrapRef.current, { opacity: 0.15, duration: 1 }, '<');

      // 2 · Carbon card rises fullscreen
      tl.to(cardRef.current, { yPercent: 0, scale: 1, borderRadius: 0, duration: 1.6, ease: 'power1.inOut' }, '-=0.5');
      tl.to(copyRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4');

      // 3 · Car flies in with 3D perspective
      tl.to(floorRef.current, { opacity: 1, duration: 0.8 }, '-=0.2');
      tl.to(
        carScrollRef.current,
        { xPercent: 0, z: 0, rotateY: 0, rotateX: 0, scale: 1, opacity: 1, duration: 2, ease: 'power2.out' },
        '-=0.6'
      );

      // 4 · Badges + counter
      tl.to(badgeEls, { opacity: 1, y: 0, scale: 1, stagger: 0.18, duration: 0.6 });
      tl.to(metricBlockRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4');
      const counted = { v: 0 };
      tl.to(
        counted,
        {
          v: metricValue,
          duration: 1.4,
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(counted.v).toLocaleString();
            }
          },
        },
        '<'
      );
      tl.to({}, { duration: 0.6 }); // hold the money shot

      // 5 · Card pulls back to reveal booking CTAs
      tl.to(cardRef.current, {
        scale: 0.88,
        yPercent: -6,
        borderRadius: 32,
        boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
        duration: 1.4,
        ease: 'power1.inOut',
      });
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.8');

      // ── Mouse tilt on the car (nested wrapper, ±deg) ───────
      const tiltY = gsap.quickTo(carTiltRef.current, 'rotationY', { duration: 0.6, ease: 'power3.out' });
      const tiltX = gsap.quickTo(carTiltRef.current, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        tiltY(nx * 14);
        tiltX(-ny * 8);
      };
      window.addEventListener('mousemove', onMove);

      return () => window.removeEventListener('mousemove', onMove);
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, metricValue]);

  // ── Static fallback: prefers-reduced-motion (no shader, no pin, no scrub) ──
  if (reducedMotion) {
    return (
      <section className="relative flex min-h-screen flex-col items-center justify-center gap-10 bg-ink px-5 pt-24 text-center">
        <h1 className="font-display text-4xl leading-tight tracking-tightest text-chrome md:text-6xl">
          {taglineTop}
          <br />
          <span className="text-ember">{taglineBottom}</span>
        </h1>
        <div className="w-full max-w-4xl rounded-3xl bg-carbon p-8 shadow-2xl">
          <p className="eyebrow">{cardKicker}</p>
          <h2 className="mt-2 font-display text-2xl text-chrome md:text-3xl">{cardTitle}</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={carImageSrc} alt={`${brandName} — ceramic coated car`} className="mx-auto mt-8 w-full max-w-2xl" />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {badges.map((b) => (
              <span key={b} className="rounded-full border border-white/10 bg-graphite px-4 py-1.5 text-xs font-semibold text-mist">
                {b}
              </span>
            ))}
          </div>
          <p className="mt-8 font-display text-4xl text-ember">{metricValue.toLocaleString()}</p>
          <p className="text-sm uppercase tracking-[0.25em] text-mist">{metricLabel}</p>
        </div>
        <div className="flex gap-4">
          <Link href={ctaPrimary.href} className="rounded-full bg-ember px-7 py-3 font-semibold text-ink">
            {ctaPrimary.label}
          </Link>
          <Link href={ctaSecondary.href} className="rounded-full border border-white/15 px-7 py-3 font-semibold text-chrome">
            {ctaSecondary.label}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-ink">
      {/* ── Layer 0a · WebGL ember shader (intro backdrop → ambient atmosphere) ── */}
      <div ref={shaderWrapRef} className="absolute inset-0 z-0">
        <EmberShader />
      </div>

      {/* ── Layer 3 · Intro overlay (plays on load — the first thing visitors see) ── */}
      <div ref={introRef} className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center px-5">
        {/* car streaking across over the shader */}
        <div ref={introCarRef} className="pointer-events-none absolute w-[min(70vw,640px)] will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={carImageSrc} alt="" aria-hidden draggable={false} className="w-full select-none" />
          <div className="absolute right-full top-1/2 h-px w-[40vw] bg-gradient-to-l from-ember/70 to-transparent" />
        </div>

        <p ref={introBrandRef} className="relative z-10 flex overflow-hidden font-display text-[9vw] tracking-tightest text-chrome md:text-[5.5vw]">
          {brandName.split('').map((c, i) => (
            <span key={i} data-char className="inline-block will-change-transform">
              {c === ' ' ? '\u00A0' : c}
            </span>
          ))}
        </p>
        <div ref={introLineRef} className="relative z-10 mt-5 h-0.5 w-48 origin-left bg-gradient-to-r from-ember via-ember to-transparent md:w-64" />
        <p ref={introLabelRef} className="relative z-10 mt-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-mist">
          Loading the shine
        </p>
      </div>

      {/* ── Layer 1 · Headline (revealed by the intro, consumed by scroll) ── */}
      <div ref={headlineRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5">
        <h1 className="text-center font-display tracking-tightest text-chrome">
          <span className="block overflow-hidden">
            <span data-line className="block text-[11vw] leading-[0.95] md:text-[8vw]">
              {taglineTop}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-line className="block text-[11vw] leading-[0.95] text-ember md:text-[8vw]">
              {taglineBottom}
            </span>
          </span>
        </h1>
      </div>

      {/* Scroll hint */}
      <div ref={hintRef} className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-mist">
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">Scroll</span>
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-ember to-transparent" />
      </div>

      {/* ── Layer 0b · Booking CTAs (revealed when the card pulls back) ── */}
      <div ref={ctaRef} className="absolute inset-x-0 bottom-0 z-[5] flex flex-col items-center gap-4 pb-10">
        <p className="text-sm text-mist">Slots fill a week ahead — lock yours in.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={ctaPrimary.href}
            className="rounded-full bg-ember px-8 py-3.5 font-semibold text-ink transition-colors hover:bg-emberdim hover:text-chrome"
          >
            {ctaPrimary.label}
          </Link>
          <Link
            href={ctaSecondary.href}
            className="rounded-full border border-white/15 px-8 py-3.5 font-semibold text-chrome transition-colors hover:border-ember hover:text-ember"
          >
            {ctaSecondary.label}
          </Link>
        </div>
      </div>

      {/* ── Layer 2 · Carbon card ── */}
      <div
        ref={cardRef}
        className="absolute inset-0 z-20 overflow-hidden bg-carbon will-change-transform"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 90% 50% at 50% 110%, rgba(255,77,46,0.10), transparent 65%), repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0 2px, transparent 2px 6px)',
        }}
      >
        {/* Card copy */}
        <div ref={copyRef} className="absolute inset-x-0 top-[12vh] z-10 px-5 text-center">
          <p className="eyebrow">{cardKicker}</p>
          <h2 className="mt-3 font-display text-3xl tracking-tightest text-chrome md:text-5xl">{cardTitle}</h2>
        </div>

        {/* Ember showroom floor */}
        <div
          ref={floorRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh]"
          style={{
            background:
              'radial-gradient(ellipse 70% 90% at 50% 100%, rgba(255,77,46,0.35), rgba(184,51,28,0.12) 45%, transparent 70%)',
          }}
        />
        <div className="pointer-events-none absolute inset-x-[15%] bottom-[16vh] h-px bg-gradient-to-r from-transparent via-ember/60 to-transparent" />

        {/* Car stage with 3D perspective */}
        <div className="absolute inset-x-0 bottom-[8vh] flex justify-center" style={{ perspective: '1200px' }}>
          <div ref={carScrollRef} className="w-[88vw] max-w-[980px] will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
            <div ref={carTiltRef} style={{ transformStyle: 'preserve-3d' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={carImageSrc}
                alt={`${brandName} — car receiving ceramic coating`}
                className="w-full select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                draggable={false}
              />
              {/* Mirror reflection over the ember floor */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={carImageSrc}
                alt=""
                aria-hidden
                draggable={false}
                className="w-full -scale-y-100 select-none opacity-25"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent 55%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.65), transparent 55%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Badges */}
        <div ref={badgesRef} className="absolute inset-x-0 bottom-[30vh] z-10 flex flex-wrap justify-center gap-3 px-5 md:bottom-[34vh]">
          {badges.map((b) => (
            <span
              key={b}
              data-badge
              className="rounded-full border border-ember/30 bg-ink/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-chrome backdrop-blur-sm"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Counter */}
        <div ref={metricBlockRef} className="absolute bottom-[6vh] left-1/2 z-10 -translate-x-1/2 text-center">
          <p className="font-display text-4xl tracking-tightest text-ember md:text-5xl">
            <span ref={counterRef}>0</span>+
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-mist">{metricLabel}</p>
        </div>
      </div>
    </section>
  );
}
