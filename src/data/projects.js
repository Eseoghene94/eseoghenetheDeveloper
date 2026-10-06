// Case studies for the platforms listed in the CV, plus earlier client work.
// To add a screenshot to a case study, import it below and put it in `images`
// (the first image becomes the card cover). To link a live product, set `liveUrl`.

import schoolbooksHome from '../../public/images/projects/schoolbooks-home.png';
import schoolbooksB from '../../public/images/projects/schoolbooks-b.png';
import schoolbooksC from '../../public/images/projects/schoolbooks-c.png';
import sella from '../../public/images/projects/sella.png';
import citiView from '../../public/images/projects/citi-view-hotel.png';
import realEstate from '../../public/images/projects/real-estate.jpeg';
import ifeoluwa from '../../public/images/projects/ifeoluwa.png';
import influencer from '../../public/images/projects/influencer-website.png';

export const domains = ['All', 'Education', 'Food-tech', 'Healthcare', 'Energy & IoT', 'Marketplace'];

export const projects = [
  {
    slug: 'schoolbooks',
    title: 'SchoolBooks',
    domain: 'Education',
    tagline: 'Multi-vendor educational marketplace',
    summary:
      'A multi-vendor educational marketplace bringing bookstores, eBooks, AI-assisted discovery, map-based delivery and integrated payments into one platform.',
    problem:
      'Students and parents buy books across many independent bookstores with no single place to discover titles, compare vendors and get them delivered.',
    contribution: [
      'Architected the multi-vendor marketplace: vendor storefronts, catalogue and order flows.',
      'Built eBook delivery alongside physical stock.',
      'Added AI-assisted book discovery.',
      'Implemented map-based delivery and integrated payments.',
    ],
    stack: ['Next.js', 'NestJS', 'MongoDB'],
    images: [schoolbooksHome, schoolbooksB, schoolbooksC],
    featured: true,
  },
  {
    slug: 'homefoodly',
    title: 'Homefoodly',
    domain: 'Food-tech',
    tagline: 'Food-tech ecosystem across multiple brands',
    summary:
      'A food-tech ecosystem spanning multiple brands, including EpeCatch, Royal Eja Osan, Saadu Hub, Seafoodie and Food Export Academy.',
    problem:
      'Several food brands needed to run on shared technology without losing their individual identities and offerings.',
    contribution: [
      'Led full-stack development as Senior Full-Stack Developer / Team Lead at Tiva Creatives.',
      'Built the shared backend APIs and services behind the brands.',
      'Delivered web interfaces for each brand on a common platform.',
      'Coordinated a distributed team through sprints, code reviews and releases.',
    ],
    stack: ['Next.js', 'NestJS', 'MongoDB'],
    images: [],
    featured: true,
  },
  {
    slug: 'theotherwife',
    title: 'TheOtherWife',
    domain: 'Food-tech',
    tagline: 'Cross-platform home-cooked food app',
    summary:
      'A cross-platform consumer mobile application connecting customers with home chefs, with payments, vendor onboarding and a partner integration API.',
    problem:
      'Home chefs needed a trusted way to reach customers, and the business needed onboarding, payments and partner growth built to production standards.',
    contribution: [
      'Led full-stack and mobile development from scoping through deployment.',
      'Built the cross-platform consumer app with React Native and Expo.',
      'Designed the backend: vendor onboarding, ordering and Paystack payments.',
      'Delivered a referral and partner attribution API with signed requests and webhooks.',
    ],
    stack: ['React Native', 'Expo', 'NestJS'],
    images: [],
    featured: true,
  },
  {
    slug: 'voltsense',
    title: 'VoltSense',
    domain: 'Energy & IoT',
    tagline: 'IoT energy monitoring platform',
    summary: 'An IoT energy monitoring platform with smart metering, MQTT connectivity and analytics dashboards.',
    problem: 'Energy consumers had no real-time visibility into usage from their meters, and no history to act on.',
    contribution: [
      'Built the backend services ingesting smart-meter data over MQTT.',
      'Delivered analytics dashboards that turn raw readings into usable insight.',
    ],
    stack: ['React', 'Node.js', 'MQTT'],
    images: [],
    featured: true,
  },
  {
    slug: 'medmeet',
    title: 'MedMeet',
    domain: 'Healthcare',
    tagline: 'Healthcare & appointment platform',
    summary: 'A healthcare platform supporting patient management, NIN verification and appointment booking.',
    problem: 'Clinics needed verified patient identities and a reliable booking flow in one system.',
    contribution: [
      'Built patient management and appointment booking.',
      'Integrated National Identification Number (NIN) verification into onboarding.',
    ],
    stack: ['Next.js', 'NestJS'],
    images: [],
    featured: true,
  },
  {
    slug: 'psalmswings-lms',
    title: 'PsalmsWings LMS',
    domain: 'Education',
    tagline: 'Enterprise learning management system',
    summary: 'An enterprise Learning Management System for institutional course delivery.',
    problem: 'An institution needed to deliver and manage courses at scale from a single platform.',
    contribution: [
      'Built the LMS platform for structured, institutional course delivery.',
    ],
    stack: ['Next.js', 'NestJS'],
    images: [],
    featured: true,
  },
  {
    slug: 'complete-market',
    title: 'Complete Market',
    domain: 'Marketplace',
    tagline: 'Marketplace on a Django backend',
    summary: 'A marketplace platform with a Django-based backend and PostgreSQL data layer.',
    problem: 'Buyers and sellers needed a dependable marketplace backed by a relational data model.',
    contribution: [
      'Built the Django backend and its PostgreSQL schema.',
      'Delivered the marketplace APIs behind the platform.',
    ],
    stack: ['Django', 'PostgreSQL'],
    images: [],
    featured: true,
  },
];

export const earlierWork = [
  {
    title: 'Sella',
    summary: 'A multi-vendor marketplace connecting clients and businesses directly.',
    img: sella,
    link: 'https://sales-sella.vercel.app/',
  },
  {
    title: 'Citi View Hotel',
    summary: 'A hotel website for bookings and reservations.',
    img: citiView,
    link: 'https://bookhotelng.vercel.app/',
  },
  {
    title: 'Real Estate',
    summary: 'A modern real-estate listings website.',
    img: realEstate,
    link: 'https://realestate-pied-gamma.vercel.app/',
  },
  {
    title: 'Ifeoluwa Portfolio',
    summary: 'A portfolio for a client showcasing her tailoring and baking work.',
    img: ifeoluwa,
    link: 'https://ifeoluwa-portfolio-khaki.vercel.app/',
  },
  {
    title: 'Influencer Booking',
    summary: 'A website for booking influencers.',
    img: influencer,
    link: 'https://idyllic-dusk-052ce1.netlify.app/',
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
