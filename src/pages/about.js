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
import { profile } from '@/data/profile';
import profilePic from '../../public/images/profile/codewithese-1.jpg';

const About = () => {
  return (
    <>
      <Seo
        title="About"
        description={`About ${profile.shortName}: lead full-stack software engineer, from offshore petroleum engineering to leading software teams. Experience, skills and education.`}
      />
      <main className="flex w-full flex-col items-center justify-center">
        <Layout className="pt-16">
          <AnimatedText text="Passion Fuels Purpose!" className="mb-12 md:mb-16" />

          <div className="grid w-full grid-cols-1 md:grid-cols-8 gap-12 md:gap-16">
            {/* Biography */}
            <div className="md:col-span-8 lg:col-span-4 xl:col-span-3 flex flex-col items-start justify-start order-2 lg:order-1">
              <h2 className="mb-4 text-lg font-bold uppercase text-dark/75">Biography</h2>
              {profile.bio.map((paragraph, i) => (
                <RevealText key={i} hero={i < 2} delay={i < 2 ? 0.4 + i * 0.15 : 0} className="font-medium mb-4 last:mb-0">
                  {paragraph}
                </RevealText>
              ))}
            </div>

            {/* Portrait */}
            <div className="md:col-span-5 lg:col-span-4 xl:col-span-3 order-1 lg:order-2 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-4 md:p-8 mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark" aria-hidden="true" />
              <Image
                src={profilePic}
                alt={profile.shortName}
                className="w-full h-auto rounded-2xl"
                sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 45vw, 90vw"
                priority
              />
            </div>

            {/* Stats */}
            <div className="md:col-span-3 lg:col-span-8 xl:col-span-2 order-3 flex flex-row md:flex-col lg:flex-row xl:flex-col items-center md:items-end lg:items-center xl:items-end justify-between gap-6">
              {profile.stats.map(({ value, suffix, label }) => (
                <div key={label} className="flex flex-col items-center md:items-end lg:items-center xl:items-end justify-center text-center md:text-right">
                  <span className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
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
