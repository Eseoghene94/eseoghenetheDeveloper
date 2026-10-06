import Image from 'next/image';
import Link from 'next/link';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Layout from '@/Components/Layout';
import AnimatedText from '@/Components/AnimatedText';
import ProjectCover from '@/Components/ProjectCover';
import ContactCTA from '@/Components/ContactCTA';
import Seo from '@/Components/Seo';
import { GithubIcon, LinkArrow } from '@/Components/icons';
import { gsap, Flip, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { domains, earlierWork, projects } from '@/data/projects';
import { profile } from '@/data/profile';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => {};

const FeaturedProject = ({ project, index, wide }) => (
  <article className="relative h-full">
    <div className="absolute top-0 -right-2 sm:-right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] sm:rounded-[2.5rem] bg-dark" aria-hidden="true" />
    <div
      className={`h-full rounded-3xl border-2 border-solid border-dark bg-light p-4 sm:p-6 flex flex-col gap-6 ${
        wide ? 'lg:flex-row lg:items-center lg:p-8' : ''
      }`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={`group block overflow-hidden rounded-2xl ${wide ? 'lg:w-1/2' : ''}`}
        aria-label={`${project.title} case study`}
      >
        <ProjectCover
          project={project}
          index={index}
          sizes={wide ? '(min-width: 1024px) 45vw, 90vw' : '(min-width: 1024px) 40vw, 90vw'}
          priority={index === 0}
          className="aspect-[16/10] rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className={`flex flex-col items-start flex-1 ${wide ? 'lg:w-1/2 lg:pl-4' : ''}`}>
        <span className="text-primary font-medium text-base sm:text-lg">Featured Project · {project.domain}</span>
        <Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4">
          <h2 className="my-2 text-2xl sm:text-3xl lg:text-4xl font-bold">{project.title}</h2>
        </Link>
        <p className="font-medium text-dark/90">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-full bg-dark text-light px-3 py-1 text-sm font-semibold">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6 flex items-center gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center whitespace-nowrap rounded-lg bg-dark text-light px-5 py-2 text-base sm:text-lg font-semibold border-2 border-solid border-transparent hover:bg-light hover:text-dark hover:border-dark"
          >
            Case study <LinkArrow className="w-5 ml-1" />
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-medium underline underline-offset-2">
              Visit site
            </a>
          )}
        </div>
      </div>
    </div>
  </article>
);

const EarlierProject = ({ title, summary, img, link }) => (
  <article className="earlier-card relative h-full">
    <div className="absolute top-0 -right-2 -z-10 w-[101%] h-[102%] rounded-[1.75rem] bg-dark" aria-hidden="true" />
    <div className="h-full rounded-2xl border-2 border-solid border-dark bg-light p-4 flex flex-col">
      <a href={link} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl" aria-label={`Visit ${title}`}>
        <div className="relative aspect-[16/10] bg-dark">
          <Image
            src={img}
            alt={`${title} screenshot`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </a>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-1 font-medium text-dark/80 flex-1">{summary}</p>
      <div className="mt-4 flex items-center justify-between">
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold underline underline-offset-2">
          Visit
        </a>
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="w-7" aria-label="GitHub">
          <GithubIcon />
        </a>
      </div>
    </div>
  </article>
);

const Projects = () => {
  const root = useRef(null);
  const grid = useRef(null);
  const flipState = useRef(null);
  const revealTriggers = useRef([]);
  const [filter, setFilter] = useState('All');

  const visible = (p) => filter === 'All' || p.domain === filter;
  const firstVisible = projects.find(visible)?.slug;

  // Filtering keeps every card mounted and toggles `hidden`, so GSAP Flip can
  // animate cards leaving, entering and re-flowing into their new positions.
  const changeFilter = (next) => {
    if (next === filter) return;
    // Once the visitor starts filtering, Flip owns the cards: finish any pending
    // scroll reveals so no card is left invisible.
    revealTriggers.current.forEach((t) => t.kill());
    revealTriggers.current = [];
    gsap.set(grid.current.querySelectorAll('.project-card'), { autoAlpha: 1, y: 0, clearProps: 'clipPath' });
    flipState.current = Flip.getState(grid.current.querySelectorAll('.project-card'));
    setFilter(next);
  };

  useIsoLayoutEffect(() => {
    if (!flipState.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = flipState.current;
    flipState.current = null;
    if (reduce) return;
    Flip.from(state, {
      duration: 0.8,
      ease: 'expo.inOut',
      absolute: true,
      nested: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.2 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.4 }),
    });
  }, [filter]);

  // Scroll choreography: cards wipe up into view; covers drift with parallax.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root);
        gsap.from(q('.filter-chip'), { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.05, delay: 0.6 });

        // Cards wipe up from the bottom edge. The clip box overhangs the card so
        // the offset ink "shadow" is not cut off.
        const reveal = (cards) => {
          gsap.set(cards, { autoAlpha: 0 });
          return ScrollTrigger.batch(cards, {
            start: 'top 88%',
            once: true,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { autoAlpha: 0, y: 70, clipPath: 'inset(100% -6% -6% -6%)' },
                { autoAlpha: 1, y: 0, clipPath: 'inset(-6% -6% -6% -6%)', duration: 1.2, stagger: 0.12, clearProps: 'clipPath' },
              ),
          });
        };
        revealTriggers.current = reveal(q('.project-card'));
        reveal(q('.earlier-card'));

        q('.cover-media').forEach((media) => {
          gsap.fromTo(
            media,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: { trigger: media.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <>
      <Seo
        title="Projects"
        description={`Case studies from ${profile.shortName}: SchoolBooks, Homefoodly, TheOtherWife, VoltSense, MedMeet, PsalmsWings LMS and Complete Market.`}
      />
      <main ref={root} className="w-full mb-16 flex flex-col items-center justify-center">
        <Layout className="pt-16">
          <AnimatedText text="Imagination Trumps Knowledge!" className="mb-10 sm:mb-14" />

          <div role="group" aria-label="Filter projects by industry" className="mb-12 sm:mb-16 flex flex-wrap justify-center gap-2.5">
            {domains.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => changeFilter(d)}
                aria-pressed={filter === d}
                className={`filter-chip rounded-full border-2 border-solid border-dark px-4 py-1.5 text-sm sm:text-base font-semibold transition-colors ${
                  filter === d ? 'bg-dark text-light' : 'bg-light text-dark hover:bg-dark/10'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div ref={grid} className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-14 sm:gap-y-16">
            {projects.map((project, i) => (
              <div
                key={project.slug}
                className={`project-card ${visible(project) ? '' : 'hidden'} ${project.slug === firstVisible ? 'lg:col-span-2' : ''}`}
                data-flip-id={project.slug}
              >
                <FeaturedProject project={project} index={i} wide={project.slug === firstVisible} />
              </div>
            ))}
          </div>

          <section aria-labelledby="earlier-heading" className="mt-32 md:mt-40">
            <h2 id="earlier-heading" className="font-bold text-4xl sm:text-5xl md:text-6xl mb-4 text-center">
              Earlier Work
            </h2>
            <p className="mb-12 md:mb-16 text-center font-medium text-dark/75">Client websites from my frontend years.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {earlierWork.map((p) => (
                <EarlierProject key={p.title} {...p} />
              ))}
            </div>
          </section>

          <ContactCTA />
        </Layout>
      </main>
    </>
  );
};

export default Projects;
