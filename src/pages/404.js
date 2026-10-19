import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import Seo from '@/Components/Seo';
import { LinkArrow } from '@/Components/icons';
import { gsap, useGSAP } from '@/lib/gsap';
// Freepik illustration, accent recoloured to the brand magenta (#B63E96).
import notFoundArt from '../../public/images/illustrations/not-found.svg';

// "Clocked out": the page you wanted has nodded off at its desk.
const NotFound = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root.current);
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(q('[data-hero]'), { autoAlpha: 1 });
        gsap
          .timeline({ delay: 0.15 })
          .from(q('.nf-art'), { y: 40, autoAlpha: 0, scale: 0.96, duration: 1, ease: 'power3.out' })
          .from(q('.nf-copy > *'), { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, '<0.25')
          // A slow "breathing" bob while it sleeps.
          .to(q('.nf-art'), { y: -8, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-hero]'), { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <>
      <Seo title="Page not found" description="This page could not be found." noindex />
      <main ref={root} className="w-full bg-light text-dark">
        <section
          data-hero
          className="grid min-h-[calc(100svh-8rem)] grid-cols-1 items-center gap-6 px-5 pt-4 pb-32 sm:px-8 md:grid-cols-2 md:gap-12 md:px-16 md:pb-12 lg:gap-20 lg:px-24 xl:px-32"
        >
          <div className="nf-art mx-auto w-full max-w-sm md:max-w-none">
            <Image
              src={notFoundArt}
              alt="Illustration: a developer asleep at their desk under a large 404"
              className="h-auto w-full"
              sizes="(min-width: 768px) 45vw, 90vw"
              unoptimized
              priority
            />
          </div>

          <div className="nf-copy max-w-xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary sm:text-sm">Error 404 · Page not found</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">This page has clocked out.</h1>
            <p className="mt-5 text-base font-medium text-dark/75 sm:text-lg">
              The link may be broken, the page may have moved, or it never existed. Even well-built systems hit a dead
              end now and then. Let&apos;s get you back to something that works.
            </p>
            <div className="mt-8 hidden flex-wrap items-center gap-6 md:flex">
              <Link
                href="/"
                className="flex items-center whitespace-nowrap rounded-lg border-2 border-solid border-transparent bg-dark px-6 py-2.5 text-lg font-semibold text-light hover:border-dark hover:bg-light hover:text-dark"
              >
                Wake up, go home <LinkArrow className="ml-1 w-6" />
              </Link>
              <Link href="/projects" className="text-lg font-medium text-dark underline underline-offset-2">
                See my projects
              </Link>
            </div>
          </div>

          {/* Phones: thumb-reachable actions pinned to the bottom of the screen */}
          <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t-2 border-solid border-dark bg-light px-5 py-4 md:hidden">
            <Link href="/" className="flex flex-1 items-center justify-center rounded-lg bg-dark py-3 font-semibold text-light">
              Go home
            </Link>
            <Link href="/projects" className="flex flex-1 items-center justify-center rounded-lg border-2 border-solid border-dark py-3 font-semibold">
              Projects
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFound;
