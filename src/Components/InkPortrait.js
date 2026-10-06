import Image from 'next/image';
import React, { useId, useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

// The portrait "develops" like watercolour soaking into paper: an SVG
// turbulence + displacement filter starts heavily distorted and settles to a
// clean image. On fine pointers it then tilts gently with the cursor.
const InkPortrait = ({ src, alt, className = '', sizes, priority }) => {
  const root = useRef(null);
  const turbulence = useRef(null);
  const displacement = useRef(null);
  const filterId = `ink-${useId().replace(/:/g, '')}`;

  useGSAP(
    () => {
      const el = root.current;
      const img = el.querySelector('img');
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
          fine: '(pointer: fine)',
        },
        ({ conditions }) => {
          if (conditions.reduce) {
            gsap.set(el, { autoAlpha: 1 });
            return;
          }

          gsap.set(img, { filter: `url(#${filterId})` });
          gsap
            .timeline({ delay: 0.1, onComplete: () => gsap.set(img, { clearProps: 'filter' }) })
            .fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: 'power1.out' })
            .fromTo(displacement.current, { attr: { scale: 180 } }, { attr: { scale: 0 }, duration: 2.6 }, 0)
            .fromTo(
              turbulence.current,
              { attr: { baseFrequency: 0.04 } },
              { attr: { baseFrequency: 0.006 }, duration: 2.6, ease: 'power2.out' },
              0,
            )
            .fromTo(img, { scale: 1.08, rotate: -2 }, { scale: 1, rotate: 0, duration: 2.6 }, 0);

          if (!conditions.fine) return;
          gsap.set(el, { transformPerspective: 900 });
          const rotateY = gsap.quickTo(el, 'rotationY', { duration: 1.2, ease: 'power3.out' });
          const rotateX = gsap.quickTo(el, 'rotationX', { duration: 1.2, ease: 'power3.out' });
          const onMove = (e) => {
            rotateY((e.clientX / window.innerWidth - 0.5) * 10);
            rotateX((e.clientY / window.innerHeight - 0.5) * -8);
          };
          window.addEventListener('pointermove', onMove);
          return () => window.removeEventListener('pointermove', onMove);
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} data-hero className={className}>
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence ref={turbulence} type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap ref={displacement} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <Image src={src} alt={alt} className="w-full h-auto" sizes={sizes} priority={priority} />
    </div>
  );
};

export default InkPortrait;
