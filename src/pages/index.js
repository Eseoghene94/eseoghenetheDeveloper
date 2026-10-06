import Link from 'next/link';
import { useRef } from 'react';
import { gsap, useGSAP, MOTION } from '@/lib/gsap';
import profilePic from '../../public/images/profile/developer-pic-1.png';
import AnimatedText from '@/Components/AnimatedText';
import HireMe from '@/Components/HireMe';
import InkPortrait from '@/Components/InkPortrait';
import Lightbulb from '@/Components/Lightbulb';
import Seo from '@/Components/Seo';
import { LinkArrow } from '@/Components/icons';
import { SITE_URL, profile } from '@/data/profile';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.handle,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  address: { '@type': 'PostalAddress', addressCountry: 'NG' },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.twitter],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Benin' },
  knowsAbout: ['Software Architecture', 'Next.js', 'NestJS', 'Django', 'React Native', 'TypeScript', 'DevOps'],
};

export default function Home() {
  const root = useRef(null);

  // Supporting copy follows the headline in, after the portrait starts to develop.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, ({ conditions }) => {
        const items = gsap.utils.toArray('.hero-copy, .hero-actions > *', root.current);
        if (conditions.reduce) {
          gsap.set(['.hero-copy', '.hero-actions'], { autoAlpha: 1 });
          return;
        }
        gsap.set(['.hero-copy', '.hero-actions'], { autoAlpha: 1 });
        gsap.from(items, { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.12, delay: 1.1 });
      });
    },
    { scope: root },
  );

  return (
    <>
      <Seo jsonLd={personJsonLd} />
      <main ref={root} className="flex items-center text-dark w-full min-h-screen">
        <div className="pt-0">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            {/* Profile Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <InkPortrait
                src={profilePic}
                alt={`Illustrated portrait of ${profile.shortName}`}
                className="w-3/4 lg:w-full"
                sizes="(min-width: 1024px) 50vw, 75vw"
                priority
              />
            </div>

            {/* Text and Links Section */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start px-4 sm:px-8 md:px-16 lg:px-32 self-center mt-8 lg:mt-0">
              <AnimatedText
                text="Turning Vision Into Reality With Code And Design."
                className="!text-4xl md:!text-5xl lg:!text-6xl text-center lg:!text-left !text-blue-800"
              />
              <p data-hero className="hero-copy my-4 text-sm sm:text-base md:text-lg font-medium text-center lg:text-left">
                I&apos;m David, a lead full-stack software engineer with 6+ years of turning ideas into
                production systems, from multi-vendor marketplaces to healthcare and IoT platforms. Explore my
                work across Next.js, NestJS, Django and React Native.
              </p>
              <div data-hero className="hero-actions flex flex-col sm:flex-row items-center self-center lg:self-start mt-2">
                <Link
                  href={profile.resume}
                  target="_blank"
                  className="flex items-center bg-dark text-light px-6 py-2.5 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark"
                  download
                >
                  Resume <LinkArrow className="w-6 ml-1" />
                </Link>
                <Link
                  href={`mailto:${profile.email}`}
                  className="mt-4 sm:mt-0 sm:ml-4 text-lg font-medium capitalize text-dark underline underline-offset-2"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
        <HireMe />
        <Lightbulb />
      </main>
    </>
  );
}
