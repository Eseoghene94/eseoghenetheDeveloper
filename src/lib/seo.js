// Shared schema.org structured data. Pages reference the same Person by @id so
// search engines merge them into one entity.
import { SITE_URL, profile } from '@/data/profile';
import { certifications } from '@/data/experience';

export const PERSON_ID = `${SITE_URL}/#person`;

export const personSchema = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: profile.name,
  alternateName: [profile.shortName, profile.handle],
  jobTitle: profile.title,
  description: profile.summary,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  address: { '@type': 'PostalAddress', addressCountry: 'NG' },
  sameAs: [profile.links.github, profile.links.linkedin, profile.links.twitter],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Benin' },
  knowsAbout: [
    'Software Architecture',
    'Full-Stack Development',
    'Secure Software Development Lifecycle',
    'Next.js',
    'NestJS',
    'Django',
    'React Native',
    'TypeScript',
    'Microsoft Azure',
    'DevOps',
  ],
  hasCredential: certifications.map(({ name, issuer }) => ({
    '@type': 'EducationalOccupationalCredential',
    name,
    credentialCategory: 'certification',
    ...(issuer && { recognizedBy: { '@type': 'Organization', name: issuer } }),
  })),
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: profile.shortName,
  publisher: { '@id': PERSON_ID },
});

export const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(({ name, path }, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${SITE_URL}${path}`,
  })),
});

// Wraps nodes in a single JSON-LD document.
export const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes });
