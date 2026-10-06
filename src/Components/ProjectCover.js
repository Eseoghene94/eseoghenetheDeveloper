import Image from 'next/image';
import React from 'react';

// Card/hero cover. Uses the first screenshot when there is one; otherwise a
// flat typographic cover in the site's ink-and-paper style (no stock imagery).
const ProjectCover = ({ project, index, sizes, priority, className = '' }) => {
  const image = project.images?.[0];

  if (image) {
    return (
      <div className={`relative overflow-hidden bg-dark ${className}`}>
        <Image
          src={image}
          alt={`${project.title} screenshot`}
          fill
          sizes={sizes}
          priority={priority}
          className="cover-media object-cover object-left-top scale-110"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-dark text-light ${className}`} aria-hidden="true">
      <div className="cover-media absolute inset-0 scale-110 flex flex-col justify-between p-[8%]">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-primaryDark">{project.domain}</span>
          <span className="font-bold text-5xl sm:text-6xl leading-none text-light/10 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div>
          <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">{project.title}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full border border-solid border-light/40 px-3 py-1 text-xs sm:text-sm font-semibold">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectCover;
