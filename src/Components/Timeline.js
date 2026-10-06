import React, { useRef } from 'react';
import { gsap, useGSAP, MOTION } from '@/lib/gsap';

// Vertical timeline: the line draws itself as you scroll, each marker pops in
// as its entry arrives, and the entry's content settles into place.
const Timeline = ({ items, renderItem, getKey }) => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, ({ conditions }) => {
        if (conditions.reduce) return;
        const el = root.current;

        gsap.fromTo(
          el.querySelector('.tl-line'),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 75%', scrub: 0.6 },
          },
        );

        el.querySelectorAll('.tl-item').forEach((item) => {
          gsap
            .timeline({ scrollTrigger: { trigger: item, start: 'top 80%', once: true } })
            .from(item.querySelector('.tl-marker'), { scale: 0, duration: 0.6, ease: 'back.out(2.2)' })
            .from(item.querySelector('.tl-core'), { scale: 0, duration: 0.5, ease: 'back.out(3)' }, 0.2)
            .from(item.querySelector('.tl-body').children, { y: 36, autoAlpha: 0, duration: 0.9, stagger: 0.07 }, 0.1);
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative w-full md:w-[85%] lg:w-[75%] mx-auto">
      <div aria-hidden="true" className="tl-line absolute left-[18px] sm:left-[26px] top-0 w-[4px] h-full bg-dark origin-top" />
      <ol className="flex flex-col gap-12 sm:gap-16">
        {items.map((item) => (
          <li key={getKey(item)} className="tl-item relative pl-14 sm:pl-24">
            <span
              aria-hidden="true"
              className="tl-marker absolute left-0 top-0 flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full border-[4px] sm:border-[5px] border-solid border-dark bg-light ring-1 ring-primary ring-offset-2 ring-offset-light"
            >
              <span className="tl-core block w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-red-500" />
            </span>
            <div className="tl-body">{renderItem(item)}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
