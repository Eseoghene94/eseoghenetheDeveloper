import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP, MOTION } from '@/lib/gsap';

// Paragraph whose lines rise from beneath a mask as it scrolls into view.
// Re-splits automatically when the layout changes width.
const RevealText = ({ as: Tag = 'p', children, className = '', hero = false, delay = 0 }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      const mm = gsap.matchMedia();
      mm.add(MOTION, ({ conditions }) => {
        gsap.set(el, { autoAlpha: 1 });
        if (conditions.reduce) return;
        const split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(self.masks, { paddingBottom: '0.15em', marginBottom: '-0.15em' });
            return gsap.from(self.lines, {
              yPercent: 105,
              duration: 1.1,
              stagger: 0.07,
              delay,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
          },
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-hero={hero || undefined} className={className}>
      {children}
    </Tag>
  );
};

export default RevealText;
