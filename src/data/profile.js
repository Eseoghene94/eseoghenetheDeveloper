// Single source of truth for personal details. Everything here comes from the
// CV in /public/EseogheneDavid.pdf — update both together.

import { projects } from './projects';

export const SITE_URL = 'https://eseoghenethedeveloper.vercel.app';

export const profile = {
  name: 'David Eseoghene Ojiyovwi',
  shortName: 'David Ojiyovwi',
  handle: 'CODEwithESE',
  title: 'Senior / Lead Full-Stack Software Engineer',
  location: 'Nigeria',
  email: 'eseoghenedavid1@gmail.com',
  resume: '/EseogheneDavid.pdf',
  links: {
    github: 'https://github.com/Eseoghene94',
    linkedin: 'https://www.linkedin.com/in/david-ojiyovwi-9553b6422',
    twitter: 'https://twitter.com/iLoveBRESS',
  },
  summary:
    'Full-stack software engineer with 6+ years designing and shipping scalable enterprise web and mobile applications, backend APIs and AI-integrated platforms across Education, Healthcare, E-commerce, Energy, Aviation and Logistics.',
  // About-page biography, one string per paragraph.
  bio: [
    "I am David Eseoghene Ojiyovwi, a Lead Full-Stack Software Engineer based in Nigeria with more than six years of experience designing, building and scaling production software. My work spans multi-vendor marketplaces, healthcare platforms, learning management systems and food-technology products, together with the APIs, data layers and cloud infrastructure that support them.",
    'My career began in petroleum engineering. After graduating from the University of Benin, I worked in offshore production operations, an environment where process discipline and safety are non-negotiable. Between 2020 and 2023 I transitioned into software engineering through structured programmes with Axia Africa, Coursera and Udemy, reinforced by hands-on delivery of real projects. That foundation still shapes how I work: respect for process, a habit of anticipating failure, and a firm preference for systems that are reliable by design.',
    'I currently serve as Lead Software Developer at Eastwind Tech Base, having progressed from the role of Digitalization Lead. I own technical direction from discovery through to production: architecting backends in NestJS and Django, building web applications in Next.js and mobile applications in React Native, and running the containerised CI/CD pipelines that deliver them. Across my career I have led distributed engineering teams and shipped products in education, healthcare, e-commerce, energy and food technology.',
    'I do my best work where business objectives meet engineering execution: translating goals into clear architecture, giving honest estimates, mentoring engineers through constructive code review, and delivering software that is secure, performant and maintainable. Security is central to that approach, grounded in secure-SDLC practice and my ISC2 CSSLP certification. I welcome conversations about technical leadership roles and ambitious products built to perform in the real world.',
  ],
  stats: [
    { value: 6, suffix: '+', label: 'Years of Experience' },
    { value: projects.filter((p) => p.featured).length, suffix: '', label: 'Flagship Platforms' },
    { value: 6, suffix: '', label: 'Industries Served' },
  ],
  industries: ['Education', 'Healthcare', 'E-commerce', 'Energy', 'Aviation', 'Logistics'],
};
