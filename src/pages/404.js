import Link from 'next/link';
import React, { useRef } from 'react';
import Seo from '@/Components/Seo';
import { LinkArrow } from '@/Components/icons';
import { gsap, useGSAP, SplitText } from '@/lib/gsap';

// "Dry well" — a nod to the petroleum-engineering years. On larger screens a
// drill string bores down through the strata to 404 m and strikes nothing; on
// phones the same story is told as a depth gauge and a core sample.

// Flat, earthy strata taken from the homepage illustrations' palette.
const STRATA = [
  { color: '#fbe481', name: 'Sand' },
  { color: '#f8a547', name: 'Clay' },
  { color: '#94b5bf', name: 'Shale' },
  { color: '#d9e1e4', name: 'Limestone' },
  { color: '#B63E96', name: 'Sandstone' },
  { color: '#3e3126', name: 'Bedrock' },
];

// Wavy band paths for a 200 x 600 viewBox (rig occupies the top 90 units).
const BAND_TOP = 90;
const BAND_H = 85;
const wave = (y, phase) =>
  `M0 ${y} C 40 ${y - 8 + phase} 70 ${y + 10 - phase} 100 ${y} S 160 ${y - 9 + phase} 200 ${y}`;
const bandPath = (i) => {
  const top = BAND_TOP + i * BAND_H;
  const phase = (i % 2) * 6;
  return `${wave(top, phase)} L200 600 L0 600 Z`;
};

const DRILL_START = 70;
const DRILL_END = 560;
// Vertical position inside the 600-unit-tall strata column, as a CSS percentage.
const pct = (y) => `${(y / 600) * 100}%`;

const NotFound = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      const revealCopy = (tl, at) => {
        const split = SplitText.create(q('.nf-code'), { type: 'chars', mask: 'chars' });
        tl.from(split.chars, { yPercent: -120, duration: 0.9, ease: 'bounce.out', stagger: 0.12 }, at)
          .from(q('.nf-copy > *'), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, '<0.3');
        return split;
      };

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(q('[data-hero]'), { autoAlpha: 1 });
        const depth = { m: 0 };
        const gauge = q('.nf-depth-desktop')[0];
        const tl = gsap.timeline({ delay: 0.2 });

        tl.from(q('.nf-band'), { yPercent: 18, autoAlpha: 0, duration: 0.9, stagger: 0.08 })
          .from(q('.nf-rig'), { y: -40, autoAlpha: 0, duration: 0.8 }, '<0.2')
          // Drill while the rig shudders.
          .to(q('.nf-rig'), { x: 1.2, duration: 0.05, repeat: 41, yoyo: true, ease: 'none' }, 'drill')
          .fromTo(q('.nf-pipe'), { attr: { height: 0 } }, { attr: { height: DRILL_END - DRILL_START }, duration: 2.1, ease: 'power1.inOut' }, 'drill')
          .fromTo(q('.nf-bit'), { y: DRILL_START - DRILL_END }, { y: 0, duration: 2.1, ease: 'power1.inOut' }, 'drill')
          .fromTo(q('.nf-gauge'), { top: pct(DRILL_START) }, { top: pct(DRILL_END), duration: 2.1, ease: 'power1.inOut' }, 'drill')
          .to(depth, {
            m: 404,
            duration: 2.1,
            ease: 'power1.inOut',
            onUpdate: () => {
              gauge.textContent = `${Math.round(depth.m)} m`;
            },
          }, 'drill')
          // Dry: a puff of dust and nothing else.
          .fromTo(
            q('.nf-dust'),
            { scale: 0, autoAlpha: 1 },
            { scale: 1.6, autoAlpha: 0, duration: 0.9, stagger: 0.04, x: (i) => (i - 2) * 9, y: () => gsap.utils.random(-14, -4) },
          );
        const split = revealCopy(tl, '-=0.6');
        return () => split.revert();
      });

      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(q('[data-hero]'), { autoAlpha: 1 });
        const depth = { m: 0 };
        const gauge = q('.nf-depth-mobile')[0];
        const tl = gsap.timeline({ delay: 0.2 });
        tl.from(q('.nf-gauge-label'), { y: 16, autoAlpha: 0, duration: 0.6 })
          .to(depth, {
            m: 404,
            duration: 1.8,
            ease: 'power2.inOut',
            onUpdate: () => {
              gauge.textContent = String(Math.round(depth.m));
            },
          }, '<')
          .from(q('.nf-core > span'), { scaleX: 0, transformOrigin: 'left center', duration: 0.5, stagger: 0.25, ease: 'power2.out' }, '<');
        tl.from(q('.nf-copy > *'), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, '-=0.3');
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-hero]'), { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <>
      <Seo title="Page not found" description="This page could not be found." />
      <main ref={root} className="w-full bg-light text-dark">
        {/* ---------- Desktop / tablet: drill through the strata ---------- */}
        <section
          data-hero
          className="hidden md:grid grid-cols-[minmax(240px,38%)_1fr] items-center gap-12 lg:gap-20 min-h-[calc(100vh-8rem)] px-16 lg:px-24 xl:px-32 py-12"
        >
          <div className="relative h-[70vh] max-h-[640px] min-h-[460px]">
            <svg viewBox="0 0 200 600" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" role="img" aria-label="A drill bores through rock layers to 404 metres and finds nothing">
              {STRATA.map((s, i) => (
                <path key={s.name} className="nf-band" d={bandPath(i)} fill={s.color} />
              ))}
              {/* Drill pipe and bit */}
              <rect className="nf-pipe" x="97" y={DRILL_START} width="6" height={DRILL_END - DRILL_START} fill="#1b1b1b" />
              <g className="nf-bit">
                <path d={`M92 ${DRILL_END - 16} L108 ${DRILL_END - 16} L100 ${DRILL_END} Z`} fill="#1b1b1b" />
              </g>
              {/* Dust puff at the bottom of the hole */}
              {[0, 1, 2, 3, 4].map((i) => (
                <circle key={i} className="nf-dust" cx="100" cy={DRILL_END + 12} r="5" fill="#f5f5f5" stroke="#1b1b1b" strokeWidth="1.5" opacity="0" />
              ))}
            </svg>
            {/* Derrick (not stretched, so its proportions stay true) */}
            <svg viewBox="0 0 80 90" className="nf-rig absolute left-1/2 -translate-x-1/2 top-0 h-[15%] w-auto" aria-hidden="true">
              <g fill="none" stroke="#1b1b1b" strokeWidth="3" strokeLinejoin="round">
                <path d="M20 88 L40 6 L60 88" />
                <path d="M27 60 H53 M31 40 H49 M35 22 H45" />
                <path d="M27 60 L49 40 M31 40 L45 22" />
                <path d="M8 88 H72" strokeWidth="4" />
              </g>
            </svg>
            {/* Depth tag that follows the bit (rests at the bottom when motion is off) */}
            <div className="nf-gauge absolute right-0 translate-x-1/2 lg:translate-x-3/4" style={{ top: pct(DRILL_END), marginTop: '-0.9rem' }}>
              <span className="nf-depth-desktop inline-block rounded-full border-2 border-solid border-dark bg-light px-3 py-1 font-mono text-sm font-bold tabular-nums">
                404 m
              </span>
            </div>
          </div>

          <div className="nf-copy-wrap">
            <p className="nf-code font-bold leading-none text-[9rem] lg:text-[12rem] text-blue-800 tracking-tight" aria-hidden="true">
              404
            </p>
            <div className="nf-copy mt-4 max-w-xl">
              <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-primary">Dry well</p>
              <h1 className="mt-3 text-4xl lg:text-5xl font-bold">We drilled here. There&apos;s nothing at this depth.</h1>
              <p className="mt-5 text-lg font-medium text-dark/75">
                The page you&apos;re looking for doesn&apos;t exist, has moved, or never struck oil. Let&apos;s get you back to productive ground.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link href="/" className="flex items-center whitespace-nowrap bg-dark text-light px-6 py-2.5 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark">
                  Drill back home <LinkArrow className="w-6 ml-1" />
                </Link>
                <Link href="/projects" className="text-lg font-medium text-dark underline underline-offset-2">
                  See my projects
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Phones: depth gauge + core sample ---------- */}
        <section data-hero className="md:hidden flex min-h-[calc(100svh-5rem)] flex-col px-5 pt-6 pb-28">
          <div className="nf-gauge-label">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark/60">Depth · metres</p>
            <p className="font-bold leading-none text-[7.5rem] text-blue-800 tabular-nums" aria-hidden="true">
              <span className="nf-depth-mobile">404</span>
            </p>
          </div>

          {/* Core sample: the layers the drill passed through */}
          <div className="nf-core mt-4 flex h-6 w-full overflow-hidden rounded-full border-2 border-solid border-dark" aria-hidden="true">
            {STRATA.map((s) => (
              <span key={s.name} className="h-full flex-1" style={{ backgroundColor: s.color }} />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-dark/60" aria-hidden="true">
            <span>Surface</span>
            <span>No oil found</span>
          </div>

          <div className="nf-copy mt-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">Error 404 · Dry well</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight">We drilled here. There&apos;s nothing at this depth.</h1>
            <p className="mt-4 text-base font-medium text-dark/75">
              The page you&apos;re looking for doesn&apos;t exist, has moved, or never struck oil.
            </p>
          </div>

          {/* Thumb-reachable actions pinned to the bottom of the screen */}
          <div className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-solid border-dark bg-light px-5 py-4 flex items-center gap-3">
            <Link href="/" className="flex-1 flex items-center justify-center bg-dark text-light py-3 rounded-lg font-semibold">
              Drill back home
            </Link>
            <Link href="/projects" className="flex-1 flex items-center justify-center border-2 border-solid border-dark py-3 rounded-lg font-semibold">
              Projects
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFound;
