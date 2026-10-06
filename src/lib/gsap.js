// One place to register GSAP plugins so every component shares the same instance.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP);
  gsap.defaults({ ease: 'expo.out' });
}

// Motion-preference conditions used with gsap.matchMedia() across the site.
export const MOTION = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
};

export { gsap, ScrollTrigger, SplitText, Flip, useGSAP };
