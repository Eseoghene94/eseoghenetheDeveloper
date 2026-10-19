// /sitemap.xml, generated from the same data the pages are built from, so a new
// project or page can never be missing from it. Replaces the hand-kept
// public/sitemap.xml, which had to be edited by hand on every change.
import { SITE_URL } from '@/data/profile';
import { projects } from '@/data/projects';

// Top-level pages, most important first. `priority` and `changefreq` are hints only.
const PAGES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'monthly' },
  { path: '/play', priority: '0.3', changefreq: 'yearly' },
];

const urlEntry = ({ path, priority, changefreq }) =>
  `  <url>\n    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

export const buildSitemap = () => {
  const entries = [
    ...PAGES,
    ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: '0.8', changefreq: 'yearly' })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(urlEntry)
    .join('\n')}\n</urlset>\n`;
};

export const getServerSideProps = ({ res }) => {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // Served from the CDN for a day; content only changes on deploy.
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.end(buildSitemap());
  return { props: {} };
};

// Never rendered: the response is written in getServerSideProps.
const Sitemap = () => null;
export default Sitemap;
