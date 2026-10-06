import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import Layout from '@/Components/Layout';
import AnimatedText from '@/Components/AnimatedText';
import RevealText from '@/Components/RevealText';
import ProjectCover from '@/Components/ProjectCover';
import ContactCTA from '@/Components/ContactCTA';
import Seo from '@/Components/Seo';
import { LinkArrow } from '@/Components/icons';
import { gsap, useGSAP } from '@/lib/gsap';
import { getProject, projects } from '@/data/projects';

export const getStaticPaths = () => ({
  paths: projects.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

// Only the slug crosses the props boundary; the project (with its imported
// images) is read from the data module on both server and client.
export const getStaticProps = ({ params }) => ({ props: { slug: params.slug } });

const MetaItem = ({ label, children }) => (
  <div className="meta-item">
    <dt className="text-sm font-bold uppercase tracking-wider text-dark/60">{label}</dt>
    <dd className="mt-1 font-semibold">{children}</dd>
  </div>
);

const CaseStudy = ({ slug }) => {
  const root = useRef(null);
  const index = projects.findIndex((p) => p.slug === slug);
  const project = getProject(slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(q('.cs-kicker, .meta-item'), { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.06, delay: 0.5 });
        gsap.fromTo(
          q('.cs-hero'),
          { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.4, ease: 'expo.inOut', delay: 0.3, clearProps: 'clipPath' },
        );
        gsap.fromTo(
          q('.cs-hero .cover-media'),
          { yPercent: -6 },
          { yPercent: 6, ease: 'none', scrollTrigger: { trigger: q('.cs-hero')[0], start: 'top top', end: 'bottom top', scrub: true } },
        );
        gsap.from(q('.cs-step'), {
          x: -30,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.1,
          scrollTrigger: { trigger: q('.cs-steps')[0], start: 'top 80%', once: true },
        });
        q('.cs-shot').forEach((shot) =>
          gsap.from(shot, { y: 80, autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: shot, start: 'top 88%', once: true } }),
        );
      });
    },
    { scope: root, dependencies: [slug], revertOnUpdate: true },
  );

  return (
    <>
      <Seo title={`${project.title} — Case Study`} description={project.summary} />
      <main ref={root} className="w-full mb-16" key={slug}>
        <Layout className="pt-12 sm:pt-16">
          <Link href="/projects" className="cs-kicker inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">
            <span aria-hidden="true">&larr;</span> All projects
          </Link>

          <p className="cs-kicker mt-8 text-primary font-medium text-lg">
            Case Study · {project.domain}
          </p>
          <AnimatedText text={project.title} className="!text-left !text-5xl sm:!text-6xl md:!text-7xl lg:!text-8xl" delay={0.2} />
          <RevealText hero className="max-w-3xl text-lg sm:text-xl font-medium text-dark/80" delay={0.5}>
            {project.summary}
          </RevealText>

          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-y-2 border-solid border-dark py-6">
            <MetaItem label="Domain">{project.domain}</MetaItem>
            <MetaItem label="Type">{project.tagline}</MetaItem>
            <MetaItem label="Stack">{project.stack.join(' · ')}</MetaItem>
            <MetaItem label="Live">
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Visit site
                </a>
              ) : (
                'Available on request'
              )}
            </MetaItem>
          </dl>

          <div className="cs-hero relative mt-12 overflow-hidden rounded-3xl border-2 border-solid border-dark">
            <ProjectCover project={project} index={index} sizes="(min-width: 1280px) 1100px, 95vw" priority className="aspect-[16/9]" />
          </div>

          <div className="mt-20 md:mt-28 grid gap-12 lg:grid-cols-12">
            <section className="lg:col-span-5" aria-labelledby="challenge-heading">
              <h2 id="challenge-heading" className="font-bold text-3xl sm:text-4xl">The challenge</h2>
              <RevealText className="mt-4 text-lg font-medium text-dark/85">{project.problem}</RevealText>
            </section>
            <section className="lg:col-span-7" aria-labelledby="work-heading">
              <h2 id="work-heading" className="font-bold text-3xl sm:text-4xl">What I did</h2>
              <ol className="cs-steps mt-6 space-y-4">
                {project.contribution.map((item, i) => (
                  <li key={item} className="cs-step flex gap-4 rounded-2xl border-2 border-solid border-dark bg-light p-4 sm:p-5">
                    <span className="font-bold text-2xl leading-none text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {project.images.length > 1 && (
            <section aria-label="Screenshots" className="mt-20 md:mt-28 grid gap-8 md:grid-cols-2">
              {project.images.slice(1).map((img, i) => (
                <div key={i} className="cs-shot relative overflow-hidden rounded-2xl border-2 border-solid border-dark bg-dark">
                  <Image src={img} alt={`${project.title} screenshot ${i + 2}`} sizes="(min-width: 768px) 45vw, 95vw" className="w-full h-auto" />
                </div>
              ))}
            </section>
          )}

          <nav aria-label="More projects" className="mt-24 md:mt-32 grid grid-cols-2 gap-4 border-t-2 border-solid border-dark pt-8">
            <Link href={`/projects/${prev.slug}`} className="group">
              <span className="text-sm font-bold uppercase tracking-wider text-dark/60">&larr; Previous</span>
              <span className="mt-1 block text-xl sm:text-3xl font-bold group-hover:text-primary transition-colors">{prev.title}</span>
            </Link>
            <Link href={`/projects/${next.slug}`} className="group text-right">
              <span className="text-sm font-bold uppercase tracking-wider text-dark/60">Next &rarr;</span>
              <span className="mt-1 flex items-center justify-end gap-1 text-xl sm:text-3xl font-bold group-hover:text-primary transition-colors">
                {next.title} <LinkArrow className="w-6 sm:w-8" />
              </span>
            </Link>
          </nav>

          <ContactCTA />
        </Layout>
      </main>
    </>
  );
};

export default CaseStudy;
