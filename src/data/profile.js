// Single source of truth for personal details. Everything here comes from the
// CV in /public/EseogheneDavid.pdf — update both together.

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
    "I'm David Eseoghene Ojiyovwi, a lead full-stack software engineer based in Nigeria. For the past six years I've built the kind of software businesses actually run on: multi-vendor marketplaces, healthcare platforms, learning systems, food-tech products, and the APIs and infrastructure underneath them.",
    "I didn't start in software. I trained as a petroleum engineer at the University of Benin and worked in offshore production operations, where a missed reading or a skipped safety check has real consequences. Between 2020 and 2023 I rebuilt my career around code through Axia Africa, Coursera and Udemy, and by shipping real projects. The oil field habits came with me: respect for process, an eye for how things fail, and a strong preference for systems that are quietly reliable.",
    "Today I'm the Lead Software Developer at Eastwind Tech Base, a role I grew into from Digitalization Lead. I own technical decisions from discovery to production. I design backends in NestJS and Django, build web products in Next.js and mobile apps in React Native, and run the Docker and CI/CD pipelines that ship them. Before and alongside that, I led engineering teams at Tiva Creatives and NodeTent, delivering products such as Homefoodly, TheOtherWife, SchoolBooks and VoltSense.",
    "The part of the job I care about most is turning a business goal into a system that holds up under real use. That means clear architecture, honest estimates, code reviews that teach rather than gatekeep, and software that is secure and fast by default. If you're building something that has to work in the real world, I'd like to hear about it.",
  ],
  stats: [
    { value: 6, suffix: '+', label: 'Years of Experience' },
    { value: 7, suffix: '', label: 'Flagship Platforms' },
    { value: 6, suffix: '', label: 'Industries Served' },
  ],
  industries: ['Education', 'Healthcare', 'E-commerce', 'Energy', 'Aviation', 'Logistics'],
};
