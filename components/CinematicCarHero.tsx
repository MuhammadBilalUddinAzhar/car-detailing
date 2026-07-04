// components/CinematicCarHero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------------------------
   AUTO EXTREME — Cinematic Scroll Hero
   Scroll story: headline → carbon card rises & goes fullscreen →
   car flies in with 3D perspective → badges + counter → texts →
   card pulls back → CTA revealed → card exits upward.
   Requires: npm install gsap
   Car image: public/images/hero/car.png (PNG cutout, transparent bg)
---------------------------------------------------------------- */

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain-hero {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-ink {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, rgba(232,234,237,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(232,234,237,0.05) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* OUTSIDE THE CARD: chrome matte headline treatments */
  .text-3d-chrome-matte {
      color: #E8EAED;
      text-shadow:
          0 10px 30px rgba(232,234,237,0.18),
          0 2px 4px rgba(232,234,237,0.08);
  }

  .text-chrome-gradient {
      background: linear-gradient(180deg, #FFFFFF 0%, #9AA0A8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0); /* prevents WebKit clipping bug */
      filter:
          drop-shadow(0px 10px 20px rgba(0,0,0,0.6))
          drop-shadow(0px 2px 4px rgba(0,0,0,0.4));
  }

  .text-ember-gradient {
      background: linear-gradient(180deg, #FF7A5C 0%, #FF4D2E 55%, #B8331C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 12px 24px rgba(255,77,46,0.25))
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep physical carbon card with dynamic mouse lighting */
  .carbon-depth-card {
      background: linear-gradient(145deg, #1C1F24 0%, #0A0B0D 100%);
      box-shadow:
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.14),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,90,50,0.07) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Ember showroom floor beneath the car */
  .ember-floor {
      background: radial-gradient(ellipse at center, rgba(255,77,46,0.35) 0%, rgba(255,77,46,0.08) 45%, transparent 70%);
      filter: blur(12px);
  }
  .ember-floor-line {
      background: linear-gradient(90deg, transparent 0%, rgba(255,77,46,0.8) 50%, transparent 100%);
      box-shadow: 0 0 24px 4px rgba(255,77,46,0.5);
  }

  /* Car image + mirror reflection */
  .car-shot {
      filter: drop-shadow(0 45px 60px rgba(0,0,0,0.85)) drop-shadow(0 12px 24px rgba(255,77,46,0.12));
  }
  .car-reflection {
      transform: scaleY(-1);
      opacity: 0.22;
      mask-image: linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.9) 100%);
      -webkit-mask-image: linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.9) 100%);
      filter: blur(3px) saturate(0.8);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .gauge-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow:
          0 18px 36px rgba(0,0,0,0.6),
          inset 0 1px 1px rgba(255,255,255,0.08),
          inset 0 -1px 1px rgba(0,0,0,0.6);
      border: 1px solid rgba(255,255,255,0.05);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
  }

  /* Physical tactile buttons — ember + dark */
  .btn-ember, .btn-dark-tactile {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-ember {
      background: linear-gradient(180deg, #FF6A4C 0%, #FF4D2E 55%, #D63B20 100%);
      color: #FFF6F4;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.2), 0 2px 4px rgba(255,77,46,0.3), 0 12px 24px -4px rgba(255,77,46,0.45), inset 0 1px 1px rgba(255,255,255,0.45), inset 0 -3px 6px rgba(0,0,0,0.35);
  }
  .btn-ember:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.2), 0 6px 12px -2px rgba(255,77,46,0.4), 0 22px 36px -6px rgba(255,77,46,0.55), inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.35);
  }
  .btn-ember:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #E24425 0%, #B8331C 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.3), inset 0 3px 8px rgba(0,0,0,0.45);
  }
  .btn-dark-tactile {
      background: linear-gradient(180deg, #24272C 0%, #121418 100%);
      color: #E8EAED;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-dark-tactile:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #2E3238 0%, #1C1F24 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.18), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-dark-tactile:active {
      transform: translateY(1px);
      background: #121418;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 264;
      stroke-dashoffset: 264;
      stroke-linecap: round;
  }

  @media (prefers-reduced-motion: reduce) {
      .film-grain-hero { display: none; }
  }
`;

export interface CinematicCarHeroProps
  extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  carImageSrc?: string;
  carImageAlt?: string;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export default function CinematicCarHero({
  brandName = "Auto Extreme",
  tagline1 = "Obsessed with the finish,",
  tagline2 = "not just the shine.",
  cardHeading = "Detailing, redefined.",
  cardDescription = (
    <>
      <span className="text-chrome font-semibold">Auto Extreme</span> brings
      showroom-grade paint correction, 9H ceramic protection and
      concours-level interior care to every car that rolls through our
      studio doors.
    </>
  ),
  carImageSrc = "/images/hero/car.png",
  carImageAlt = "Freshly detailed car with ceramic coating",
  metricValue = 500,
  metricLabel = "Cars Perfected",
  ctaHeading = "Your car deserves extreme.",
  ctaDescription = "Book a slot at the studio and watch your paintwork go from daily-driven to concours-ready.",
  primaryCtaLabel = "Book your detail",
  primaryCtaHref = "/contact",
  secondaryCtaLabel = "View services",
  secondaryCtaHref = "/services",
  className,
  ...props
}: CinematicCarHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  /* 1. Mouse parallax — tilts the car, moves the card sheen (rAF-throttled) */
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && carRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty(
            "--mouse-x",
            `${e.clientX - rect.left}px`
          );
          mainCardRef.current.style.setProperty(
            "--mouse-y",
            `${e.clientY - rect.top}px`
          );

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(carRef.current, {
            rotationY: xVal * 10,
            rotationX: -yVal * 6,
            y: yVal * -8,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  /* 2. Cinematic pinned scroll timeline */
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        // Show everything statically, no pinning
        gsap.set(
          [
            ".text-track",
            ".text-days",
            ".main-card",
            ".card-left-text",
            ".card-right-text",
            ".car-scroll-wrapper",
            ".floating-badge",
            ".cta-wrapper",
          ],
          { autoAlpha: 1, clearProps: "transform,filter,clipPath" }
        );
        gsap.set(".progress-ring", { strokeDashoffset: 40 });
        const counter = document.querySelector(".counter-val");
        if (counter) counter.innerHTML = String(metricValue);
        return;
      }

      gsap.set(".text-track", {
        autoAlpha: 0,
        y: 60,
        scale: 0.85,
        filter: "blur(20px)",
        rotationX: -20,
      });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set(
        [
          ".card-left-text",
          ".card-right-text",
          ".car-scroll-wrapper",
          ".floating-badge",
        ],
        { autoAlpha: 0 }
      );
      gsap.set(".cta-wrapper", {
        autoAlpha: 0,
        scale: 0.8,
        filter: "blur(30px)",
      });

      // Intro: headline reveal
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", {
          duration: 1.8,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          ease: "expo.out",
        })
        .to(
          ".text-days",
          { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" },
          "-=1.0"
        );

      // Scroll story
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to(
          [".hero-text-wrapper", ".bg-grid-ink"],
          {
            scale: 1.15,
            filter: "blur(20px)",
            opacity: 0.2,
            ease: "power2.inOut",
            duration: 2,
          },
          0
        )
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power3.inOut",
          duration: 1.5,
        })
        // Car flies in from below with 3D perspective
        .fromTo(
          ".car-scroll-wrapper",
          {
            y: 320,
            z: -600,
            rotationX: 35,
            rotationY: -25,
            autoAlpha: 0,
            scale: 0.55,
          },
          {
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "expo.out",
            duration: 2.5,
          },
          "-=0.8"
        )
        // Ember floor ignites
        .fromTo(
          [".ember-floor", ".ember-floor-line"],
          { autoAlpha: 0, scaleX: 0.4 },
          {
            autoAlpha: 1,
            scaleX: 1,
            ease: "power3.out",
            duration: 1.6,
            stagger: 0.1,
          },
          "-=1.8"
        )
        // Gauge fills + counter counts up
        .to(
          ".progress-ring",
          { strokeDashoffset: 40, duration: 2, ease: "power3.inOut" },
          "-=1.2"
        )
        .to(
          ".counter-val",
          {
            innerHTML: metricValue,
            snap: { innerHTML: 1 },
            duration: 2,
            ease: "expo.out",
          },
          "-=2.0"
        )
        // Floating badges pop in
        .fromTo(
          ".floating-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotationZ: 0,
            ease: "back.out(1.5)",
            duration: 1.5,
            stagger: 0.2,
          },
          "-=2.0"
        )
        .fromTo(
          ".card-left-text",
          { x: -50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 },
          "-=1.5"
        )
        .fromTo(
          ".card-right-text",
          { x: 50, autoAlpha: 0, scale: 0.8 },
          { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 },
          "<"
        )
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        // Card contents exit
        .to(
          [
            ".car-scroll-wrapper",
            ".floating-badge",
            ".card-left-text",
            ".card-right-text",
          ],
          {
            scale: 0.9,
            y: -40,
            z: -200,
            autoAlpha: 0,
            ease: "power3.in",
            duration: 1.2,
            stagger: 0.05,
          }
        )
        // Card pulls back to reveal CTA
        .to(
          ".main-card",
          {
            width: isMobile ? "92vw" : "85vw",
            height: isMobile ? "92vh" : "85vh",
            borderRadius: isMobile ? "32px" : "40px",
            ease: "expo.inOut",
            duration: 1.8,
          },
          "pullback"
        )
        .to(
          ".cta-wrapper",
          { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 },
          "pullback"
        )
        .to(".main-card", {
          y: -window.innerHeight - 300,
          ease: "power3.in",
          duration: 1.5,
        });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={[
        "relative w-screen h-screen overflow-hidden flex items-center justify-center bg-ink text-chrome font-body antialiased",
        className ?? "",
      ].join(" ")}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain-hero" aria-hidden="true" />
      <div
        className="bg-grid-ink absolute inset-0 z-0 pointer-events-none opacity-50"
        aria-hidden="true"
      />

      {/* BACKGROUND LAYER: Hero headline */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="text-track gsap-reveal text-3d-chrome-matte font-display text-4xl md:text-6xl lg:text-[5.5rem] tracking-tightest mb-2 uppercase">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-ember-gradient font-display text-4xl md:text-6xl lg:text-[5.5rem] tracking-tightest uppercase">
          {tagline2}
        </h1>
      </div>

      {/* BACKGROUND LAYER 2: CTA revealed at the end */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl mb-6 tracking-tightest uppercase text-chrome-gradient">
          {ctaHeading}
        </h2>
        <p className="text-mist text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href={primaryCtaHref}
            className="btn-ember flex items-center justify-center gap-3 px-10 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-ink"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-lg font-bold tracking-tight">
              {primaryCtaLabel}
            </span>
          </a>
          <a
            href={secondaryCtaHref}
            className="btn-dark-tactile flex items-center justify-center gap-3 px-10 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-chrome focus:ring-offset-2 focus:ring-offset-ink"
          >
            <span className="text-lg font-bold tracking-tight">
              {secondaryCtaLabel}
            </span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* FOREGROUND LAYER: The carbon depth card */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={mainCardRef}
          className="main-card carbon-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            {/* 1. TOP (mobile) / RIGHT (desktop): brand name */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="font-display text-5xl md:text-[5rem] lg:text-[6rem] uppercase tracking-tightest text-chrome-gradient leading-[0.9] text-center lg:text-right">
                {brandName}
              </h2>
            </div>

            {/* 2. MIDDLE (mobile) / CENTER (desktop): the car stage */}
            <div
              className="car-scroll-wrapper order-2 lg:order-2 relative w-full h-[320px] lg:h-[560px] flex items-center justify-center z-10"
              style={{ perspective: "1200px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.8] md:scale-90 lg:scale-100">
                {/* Tiltable car group */}
                <div
                  ref={carRef}
                  className="relative w-[520px] max-w-[92vw] will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={carImageSrc}
                    alt={carImageAlt}
                    className="car-shot relative z-10 w-full h-auto select-none pointer-events-none"
                    draggable={false}
                  />
                  {/* Mirror reflection */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={carImageSrc}
                    alt=""
                    aria-hidden="true"
                    className="car-reflection absolute top-full left-0 w-full h-auto -mt-2 select-none pointer-events-none"
                    draggable={false}
                  />
                </div>

                {/* Ember showroom floor */}
                <div
                  className="ember-floor absolute bottom-[8%] lg:bottom-[6%] left-1/2 -translate-x-1/2 w-[130%] h-24 lg:h-32 pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="ember-floor-line absolute bottom-[16%] lg:bottom-[14%] left-1/2 -translate-x-1/2 w-[70%] h-[2px] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Floating glass badge: ceramic */}
                <div className="floating-badge absolute flex top-2 lg:top-8 left-[-8px] lg:left-[-60px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-ember/25 to-emberdim/10 flex items-center justify-center border border-ember/30 shadow-inner">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-ember drop-shadow-md"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-chrome text-xs lg:text-sm font-bold tracking-tight">
                      9H Ceramic Shield
                    </p>
                    <p className="text-mist text-[10px] lg:text-xs font-medium">
                      5-year protection
                    </p>
                  </div>
                </div>

                {/* Floating glass badge: paint correction */}
                <div className="floating-badge absolute flex bottom-6 lg:bottom-14 right-[-8px] lg:right-[-60px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-chrome/20 to-chrome/5 flex items-center justify-center border border-chrome/30 shadow-inner">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-chrome drop-shadow-md"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-chrome text-xs lg:text-sm font-bold tracking-tight">
                      Paint Corrected
                    </p>
                    <p className="text-mist text-[10px] lg:text-xs font-medium">
                      Swirl-free finish
                    </p>
                  </div>
                </div>

                {/* Floating gauge: counter ring */}
                <div className="floating-badge absolute top-[38%] lg:top-[42%] left-[-4px] lg:left-[-90px] gauge-depth rounded-2xl p-3 lg:p-4 flex items-center gap-3 z-30">
                  <div className="relative w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center">
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 96 96"
                      aria-hidden="true"
                    >
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="8"
                      />
                      <circle
                        className="progress-ring"
                        cx="48"
                        cy="48"
                        r="42"
                        fill="none"
                        stroke="#FF4D2E"
                        strokeWidth="8"
                      />
                    </svg>
                    <span className="counter-val text-base lg:text-lg font-extrabold tracking-tighter text-chrome">
                      0
                    </span>
                  </div>
                  <div className="pr-1">
                    <p className="text-chrome text-xs lg:text-sm font-bold tracking-tight leading-tight">
                      {metricLabel}
                    </p>
                    <p className="text-ember text-[10px] lg:text-xs font-semibold">
                      and counting
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. BOTTOM (mobile) / LEFT (desktop): description */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0">
              <h3 className="text-chrome text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-mist text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
