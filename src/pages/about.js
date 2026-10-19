import Image from 'next/image';
import React from 'react';
import Layout from '@/Components/Layout';
import AnimatedText from '@/Components/AnimatedText';
import RevealText from '@/Components/RevealText';
import Counter from '@/Components/Counter';
import Skills from '@/Components/Skills';
import Experience from '@/Components/Experience';
import Education from '@/Components/Education';
import ContactCTA from '@/Components/ContactCTA';
import Seo from '@/Components/Seo';
import { SITE_URL, profile } from '@/data/profile';
import { breadcrumbSchema, graph, personSchema } from '@/lib/seo';
// portrait-lead.jpg is A.jpeg with its baked-in black letterbox bars cropped off.
import leadPhoto from '../../public/about/portrait-lead.jpg';
import insetPhotoLeft from '../../public/about/B.jpeg';
import insetPhotoRight from '../../public/about/C.jpeg';

// Secondary photos, shown as an "In pictures" strip under the biography.
// Deliberately NOT floated into the text: RevealText splits each paragraph into
// measured line blocks, and a second float landing mid-paragraph makes those lines
// lay out at the wrong width (broken justification). One float, at the top, is safe.
const GALLERY = [
  { src: insetPhotoLeft, caption: 'Off the clock, between builds.' },
  { src: insetPhotoRight, caption: 'Always up for the next problem.' },
];

// Framed photo used throughout the article: bordered card with the site's offset shadow.
const FramedPhoto = ({ src, alt, sizes, priority = false, cropped = false }) => (
  <div className="relative rounded-2xl border-2 border-solid border-dark bg-light p-2 md:p-3">
    <div className="absolute top-0 -right-2 -z-10 w-[102%] h-[103%] rounded-[1.5rem] bg-dark" aria-hidden="true" />
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      // Tall phone selfies are trimmed to a face-centred frame so they don't tower over the text.
      className={`w-full h-auto rounded-xl ${cropped ? 'aspect-[4/5] sm:aspect-[4/3] object-cover object-[center_30%]' : ''}`}
    />
  </div>
);

const Caption = ({ children }) => (
  <figcaption className="mt-3 border-l-2 border-primary pl-3 text-xs italic leading-snug text-dark/70">{children}</figcaption>
);

const aboutJsonLd = graph(
  { '@type': 'ProfilePage', '@id': `${SITE_URL}/about#page`, url: `${SITE_URL}/about`, mainEntity: personSchema() },
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]),
);

const About = () => {
  return (
    <>
      <Seo
        title="About"
        description={`About ${profile.shortName}: lead full-stack software engineer, from offshore petroleum engineering to leading software teams. Experience, skills, education and certifications.`}
        type="profile"
        jsonLd={aboutJsonLd}
      />
      <main className="flex w-full flex-col items-center justify-center">
        <Layout className="pt-16">
          <AnimatedText text="Passion Fuels Purpose!" className="mb-12 md:mb-16" />

          <div className="grid w-full grid-cols-1 lg:grid-cols-8 gap-12 lg:gap-16">
            {/* Biography: newspaper-style article; photos float and the text wraps around them */}
            <article className="lg:col-span-6 flow-root">
              <h2 className="mb-6 border-b-2 border-dark pb-2 text-lg font-bold uppercase tracking-[0.2em] text-dark/75">
                Biography
              </h2>

              {/* Lead portrait: floated right from sm up, stacked above the text on phones */}
              <figure className="mx-auto mb-10 w-full max-w-xs sm:float-right sm:mb-6 sm:ml-8 sm:mt-1 sm:w-[42%] sm:max-w-none lg:w-[40%]">
                <FramedPhoto
                  src={leadPhoto}
                  alt={`Portrait of ${profile.shortName}`}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 40vw, 90vw"
                  priority
                />
                <Caption>{profile.shortName}, Lead Software Developer at Eastwind Tech Base.</Caption>
              </figure>

              {profile.bio.map((paragraph, i) => (
                <React.Fragment key={i}>
                  {i === 0 && (
                    // Drop cap. The real letter stays in the paragraph (sr-only) for screen readers.
                    <span
                      className="float-left mr-3 mt-1 font-serif text-[4.75rem] font-bold leading-[0.8] text-primary"
                      aria-hidden="true"
                    >
                      {paragraph.charAt(0)}
                    </span>
                  )}
                  <RevealText
                    hero={i < 2}
                    delay={i < 2 ? 0.4 + i * 0.15 : 0}
                    // RevealText splits each line into its own block, so every line but the
                    // paragraph's last is force-justified to keep the newspaper column edge.
                    className="mb-5 last:mb-0 font-medium leading-relaxed text-justify hyphens-auto [&>div:not(:last-child)]:[text-align-last:justify]"
                  >
                    {i === 0 ? (
                      <>
                        <span className="sr-only">{paragraph.charAt(0)}</span>
                        {paragraph.slice(1)}
                      </>
                    ) : (
                      paragraph
                    )}
                  </RevealText>
                </React.Fragment>
              ))}

              {/* In pictures: clears the lead float so it always starts on a clean row */}
              <div className="clear-both pt-12">
                <p className="mb-5 border-b border-dark/30 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-dark/60">
                  In pictures
                </p>
                <div className="grid grid-cols-2 gap-5 sm:gap-8">
                  {GALLERY.map(({ src, caption }) => (
                    <figure key={caption}>
                      <FramedPhoto src={src} alt={profile.shortName} sizes="(min-width: 1024px) 30vw, 45vw" cropped />
                      <Caption>{caption}</Caption>
                    </figure>
                  ))}
                </div>
              </div>
            </article>

            {/* Stats */}
            <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-6 lg:gap-12 lg:pt-14">
              {profile.stats.map(({ value, suffix, label }) => (
                <div key={label} className="flex flex-col items-center lg:items-end justify-center text-center lg:text-right">
                  <span className="inline-block text-4xl sm:text-5xl md:text-6xl font-bold">
                    <Counter value={value} suffix={suffix} />
                  </span>
                  <h2 className="text-sm sm:text-lg md:text-xl font-medium capitalize text-dark/75">{label}</h2>
                </div>
              ))}
            </div>
          </div>

          <Skills />
          <Experience />
          <Education />
          <ContactCTA />
        </Layout>
      </main>
    </>
  );
};

export default About;
