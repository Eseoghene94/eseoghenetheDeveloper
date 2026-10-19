import React from 'react';
import Timeline from './Timeline';
import { education, certifications } from '@/data/experience';

const Education = () => (
  <section aria-labelledby="education-heading" className="my-32 md:my-48">
    <h2 id="education-heading" className="font-bold text-5xl sm:text-6xl md:text-8xl mb-16 md:mb-32 w-full text-center">
      Education
    </h2>
    <Timeline
      items={education}
      getKey={(e) => e.title}
      renderItem={({ title, place, time, info }) => (
        <>
          <h3 className="font-bold text-xl sm:text-2xl">{title}</h3>
          <p className="font-medium text-dark/75 mt-1">
            {time ? `${time} | ` : ''}
            {place}
          </p>
          <p className="font-medium mt-3 text-dark/90">{info}</p>
        </>
      )}
    />

    {/* Certifications: a compact card grid rather than more timeline entries */}
    <div className="mx-auto mt-24 w-full md:w-[75%]">
      <h3 className="mb-8 border-b-2 border-dark pb-2 text-lg font-bold uppercase tracking-[0.2em] text-dark/75">
        Certifications
      </h3>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {certifications.map(({ name, issuer }) => (
          <li
            key={name}
            className="rounded-2xl border-2 border-solid border-dark bg-light p-5 shadow-[4px_4px_0_0_#1b1b1b]"
          >
            <p className="font-bold leading-snug">{name}</p>
            {issuer && <p className="mt-1 text-sm font-medium text-primary">{issuer}</p>}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Education;
