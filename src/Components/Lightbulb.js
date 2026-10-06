import Image from 'next/image';
import React, { useRef } from 'react';
import { gsap, useGSAP, MOTION } from '@/lib/gsap';
import lightbulb from '../../public/images/svgs/miscellaneous_icons_1.svg';

// The idea lightbulb flickers on like a real bulb, then drifts gently.
const Lightbulb = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      const img = el.querySelector('img');
      const mm = gsap.matchMedia();
      mm.add(MOTION, ({ conditions }) => {
        if (conditions.reduce) return;
        gsap
          .timeline({ delay: 1.4 })
          .from(el, { autoAlpha: 0, y: 24, duration: 0.8 })
          .fromTo(
            img,
            { filter: 'brightness(0.55) saturate(0.4)' },
            { filter: 'brightness(1.35) saturate(1.1)', duration: 0.06, repeat: 5, yoyo: true, ease: 'steps(1)' },
          )
          .to(img, { filter: 'brightness(1) saturate(1)', duration: 0.5, clearProps: 'filter' })
          .to(el, { y: -10, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="absolute right-4 top-28 w-12 sm:top-auto sm:right-8 sm:bottom-8 inline-block sm:w-24" aria-hidden="true">
      <Image src={lightbulb} alt="" className="w-full h-auto" />
    </div>
  );
};

export default Lightbulb;
