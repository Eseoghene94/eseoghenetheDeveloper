import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_URL, profile } from '@/data/profile';

const DEFAULT_DESCRIPTION = `${profile.shortName} — ${profile.title}. ${profile.summary}`;

const Seo = ({ title, description = DEFAULT_DESCRIPTION, image = '/og.png', jsonLd }) => {
  const { asPath } = useRouter();
  const path = asPath.split(/[?#]/)[0];
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const fullTitle = title ? `${title} | ${profile.shortName}` : `${profile.shortName} — ${profile.title}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={profile.shortName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </Head>
  );
};

export default Seo;
