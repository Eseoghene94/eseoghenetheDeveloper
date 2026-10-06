import React, { useRef } from 'react';
import { gsap, useGSAP, MOTION } from '@/lib/gsap';

// Counts up from 0 when scrolled into view. Server-renders the final value.
const Counter = ({ value, suffix = '' }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, ({ conditions }) => {
        if (conditions.reduce) return;
        const el = ref.current;
        const state = { v: 0 };
        el.textContent = '0';
        gsap.to(state, {
          v: value,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.v));
          },
        });
        return () => {
          el.textContent = String(value);
        };
      });
    },
    { scope: ref },
  );

  return (
    <>
      <span ref={ref}>{value}</span>
      {suffix}
    </>
  );
};

export default Counter;
