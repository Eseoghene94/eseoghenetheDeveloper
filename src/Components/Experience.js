import React from 'react';
import Timeline from './Timeline';
import { experience } from '@/data/experience';

const Role = ({ position, company, companyLink, time, address, note, work }) => (
  <>
    <h3 className="font-bold text-xl sm:text-2xl">
      {position}&nbsp;
      {companyLink ? (
        <a href={companyLink} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline underline-offset-2">
          @{company}
        </a>
      ) : (
        <span className="text-red-600">@{company}</span>
      )}
    </h3>
    <p className="font-medium text-dark/75 mt-1">
      {time} | {address}
    </p>
    {note && <p className="font-medium mt-3">{note}</p>}
    <ul className="mt-3 space-y-2">
      {work.map((line) => (
        <li key={line} className="relative pl-5 text-sm sm:text-base text-dark/90 before:absolute before:left-0 before:top-[0.6em] before:h-[2px] before:w-2.5 before:bg-dark">
          {line}
        </li>
      ))}
    </ul>
  </>
);

const Experience = () => (
  <section aria-labelledby="experience-heading" className="my-32 md:my-48">
    <h2 id="experience-heading" className="font-bold text-5xl sm:text-6xl md:text-8xl mb-16 md:mb-32 w-full text-center">
      Experience
    </h2>
    <Timeline items={experience} getKey={(r) => `${r.company}-${r.time}`} renderItem={(role) => <Role {...role} />} />
  </section>
);

export default Experience;
