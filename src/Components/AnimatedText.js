import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP, MOTION } from '@/lib/gsap';

// Headline that assembles letter by letter from beneath a mask. The text is
// server-rendered as plain text (good for SEO) and split on the client.
const AnimatedText = ({ text, className = '', as: Tag = 'h1', delay = 0.15 }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      const mm = gsap.matchMedia();
      mm.add(MOTION, ({ conditions }) => {
        if (conditions.reduce) {
          gsap.set(el, { autoAlpha: 1 });
          return;
        }
        const split = SplitText.create(el, { type: 'words,chars', mask: 'words' });
        // Give the masks room for descenders (g, y, p) without shifting layout.
        gsap.set(split.masks, { paddingBottom: '0.18em', marginBottom: '-0.18em' });
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(split.chars, {
          yPercent: 120,
          rotate: 8,
          duration: 1.2,
          stagger: 0.02,
          delay,
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <div className="w-full mx-auto py-2 flex items-center justify-center text-center overflow-hidden">
      <Tag
        ref={ref}
        data-hero
        className={`inline-block w-full text-dark font-bold ${className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl`}
      >
        {text}
      </Tag>
    </div>
  );
};

export default AnimatedText;
