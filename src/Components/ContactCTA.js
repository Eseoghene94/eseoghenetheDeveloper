import Link from 'next/link';
import React from 'react';
import RevealText from './RevealText';
import { LinkArrow } from './icons';
import { profile } from '@/data/profile';

const ContactCTA = ({ title = "Let's build something that holds up." }) => (
  <section aria-labelledby="contact-heading" className="relative mt-24 md:mt-40 w-full">
    <div className="absolute top-0 -right-2 sm:-right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] sm:rounded-[2.5rem] bg-dark" aria-hidden="true" />
    <div className="rounded-3xl border-2 border-solid border-dark bg-light p-6 sm:p-10 md:p-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
      <div className="max-w-2xl">
        <p className="text-primary font-medium text-lg">Open to leadership roles & ambitious products</p>
        <RevealText as="h2" className="mt-2 font-bold text-3xl sm:text-4xl md:text-5xl">
          <span id="contact-heading">{title}</span>
        </RevealText>
        <p className="mt-4 font-medium text-dark/75">
          Tell me what you&apos;re building. I&apos;ll reply within two working days.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
        <Link
          href={`mailto:${profile.email}`}
          className="flex items-center bg-dark text-light px-6 py-2.5 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark"
        >
          Email me <LinkArrow className="w-6 ml-1" />
        </Link>
        <Link href={profile.resume} target="_blank" download className="text-lg font-medium text-dark underline underline-offset-2">
          Download resume
        </Link>
      </div>
    </div>
  </section>
);

export default ContactCTA;
