import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { getProject } from '@/data/projects';

const labelFor = (pathname) => {
  if (pathname === '/') return 'Home';
  const [section, slug] = pathname.split('/').filter(Boolean);
  if (section === 'projects' && slug) return getProject(slug)?.title ?? 'Projects';
  return section.charAt(0).toUpperCase() + section.slice(1);
};

// Ink-wipe between pages. Internal link clicks are intercepted (capture phase,
// before next/link handles them) so the curtain fully covers the old page
// before the route changes, then lifts once the new page has rendered.
const PageTransition = () => {
  const router = useRouter();
  const curtain = useRef(null);
  const label = useRef(null);
  const busy = useRef(false);

  useEffect(() => {
    const el = curtain.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onClick = (e) => {
      if (reduce.matches || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page or hash link
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return; // files such as the resume PDF

      e.preventDefault();
      if (busy.current) return;
      busy.current = true;
      label.current.textContent = labelFor(url.pathname);

      gsap
        .timeline()
        .set(el, { autoAlpha: 1, yPercent: 100 })
        .to(el, { yPercent: 0, duration: 0.55, ease: 'expo.inOut' })
        .fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: 0.5 }, 0.3)
        .add(() => {
          router.push(url.pathname + url.search + url.hash).catch(() => lift());
        });
    };

    const lift = () => {
      if (!busy.current) return;
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(el, { autoAlpha: 0 });
            busy.current = false;
            ScrollTrigger.refresh();
          },
        })
        .to(label.current, { yPercent: -110, duration: 0.4, ease: 'expo.in' }, 0.1)
        .to(el, { yPercent: -100, duration: 0.75, ease: 'expo.inOut' }, 0.25);
    };

    document.addEventListener('click', onClick, true);
    router.events.on('routeChangeComplete', lift);
    router.events.on('routeChangeError', lift);
    return () => {
      document.removeEventListener('click', onClick, true);
      router.events.off('routeChangeComplete', lift);
      router.events.off('routeChangeError', lift);
    };
  }, [router]);

  return (
    <div
      ref={curtain}
      aria-hidden="true"
      className="invisible pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-dark"
    >
      <span className="overflow-hidden px-4">
        <span ref={label} className="block text-light font-bold capitalize text-5xl sm:text-6xl md:text-8xl" />
      </span>
    </div>
  );
};

export default PageTransition;
