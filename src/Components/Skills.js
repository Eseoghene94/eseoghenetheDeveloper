import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { skills } from '@/data/skills';

// "Chaos to structure": on larger screens the skills start as a scattered cloud
// (a nod to the original bubble layout) and settle into their groups as you
// scroll. Phones get a simpler group-by-group reveal.
const Skills = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      const chips = el.querySelectorAll('.skill-chip');
      const labels = el.querySelectorAll('.skill-label');
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        // Offsets are measured from layout positions (offsetLeft/Top), which
        // ignore transforms, so they stay correct on refresh/resize.
        const offsetTo = (chip, axis) => {
          const size = axis === 'x' ? el.offsetWidth : el.offsetHeight;
          const pos = axis === 'x' ? chip.offsetLeft + chip.offsetWidth / 2 : chip.offsetTop + chip.offsetHeight / 2;
          const spread = axis === 'x' ? 0.4 : 0.3;
          return size / 2 - pos + gsap.utils.random(-size * spread, size * spread);
        };

        gsap.from(chips, {
          x: (i, chip) => offsetTo(chip, 'x'),
          y: (i, chip) => offsetTo(chip, 'y'),
          rotate: () => gsap.utils.random(-28, 28),
          scale: () => gsap.utils.random(0.75, 1.25),
          ease: 'none',
          stagger: { each: 0.004, from: 'random' },
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'center 55%',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        gsap.from(labels, {
          autoAlpha: 0,
          y: 16,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'center 70%', end: 'center 55%', scrub: 1 },
        });
      });

      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        el.querySelectorAll('.skill-group').forEach((group) => {
          gsap.from(group.querySelectorAll('.skill-label, .skill-chip'), {
            y: 20,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.03,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section aria-labelledby="skills-heading" className="mt-32 md:mt-48">
      <h2 id="skills-heading" className="font-bold text-5xl sm:text-6xl md:text-8xl mb-16 md:mb-24 w-full text-center">
        Skills
      </h2>
      <div ref={root} className="relative w-full md:w-[92%] lg:w-[85%] mx-auto grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ group, items }) => (
          <div key={group} className="skill-group">
            <h3 className="skill-label mb-4 text-sm font-bold uppercase tracking-wider text-dark/75">{group}</h3>
            <ul className="flex flex-wrap gap-2.5">
              {items.map((item) => (
                <li
                  key={item}
                  className="skill-chip rounded-full bg-dark text-light font-semibold py-2 px-4 text-sm sm:text-base cursor-default hover:bg-primary transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
