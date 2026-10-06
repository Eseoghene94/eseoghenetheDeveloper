import React from 'react';
import Timeline from './Timeline';
import { education } from '@/data/experience';

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
  </section>
);

export default Education;
