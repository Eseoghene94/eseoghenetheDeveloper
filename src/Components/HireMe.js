import React, { useRef } from 'react';
import Link from 'next/link';
import { CircularText } from './icons';
import { gsap, useGSAP } from '@/lib/gsap';
import { profile } from '@/data/profile';

const HireMe = () => {
  const root = useRef(null);
  const button = useRef(null);

  // Magnetic button: on fine pointers it leans toward the cursor.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const area = root.current;
        const xTo = gsap.quickTo(button.current, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        const yTo = gsap.quickTo(button.current, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        const onMove = (e) => {
          const r = area.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        area.addEventListener('pointermove', onMove);
        area.addEventListener('pointerleave', onLeave);
        return () => {
          area.removeEventListener('pointermove', onMove);
          area.removeEventListener('pointerleave', onLeave);
        };
      });
    },
    { scope: root },
  );

  return (
    <div className="fixed left-4 bottom-4 hidden sm:flex items-center justify-center overflow-hidden sm:left-8 sm:bottom-8 md:left-12 md:bottom-12 z-10">
      <div ref={root} className="flex items-center justify-center w-32 h-auto relative sm:w-40">
        <CircularText className="fill-dark animate-spin-slow" aria-hidden="true" />
        {/* Centred with negative margins (not translate) so GSAP owns the transform. */}
        <Link
          ref={button}
          href={`mailto:${profile.email}`}
          className="flex items-center justify-center absolute left-1/2 top-1/2 -mt-6 -ml-6 sm:-mt-8 sm:-ml-8 md:-mt-10 md:-ml-10
          bg-dark text-light shadow-md border border-solid border-dark w-12 h-12 rounded-full
          text-sm font-semibold hover:bg-light hover:text-dark sm:w-16 sm:h-16 sm:text-base md:w-20 md:h-20"
        >
          Hire Me
        </Link>
      </div>
    </div>
  );
};

export default HireMe;
