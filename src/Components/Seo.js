import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_URL, profile } from '@/data/profile';

const DEFAULT_DESCRIPTION = `${profile.shortName} — ${profile.title}. ${profile.summary}`;
const TWITTER_HANDLE = `@${profile.links.twitter.split('/').pop()}`;

const Seo = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = '/og.png',
  imageAlt = `${profile.shortName} — ${profile.title}`,
  type = 'website',
  noindex = false,
  jsonLd,
}) => {
  const { asPath } = useRouter();
  const path = asPath.split(/[?#]/)[0];
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const fullTitle = title ? `${title} | ${profile.shortName}` : `${profile.shortName} — ${profile.title}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={profile.name} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {/* A canonical on a noindex page sends mixed signals, so it is left off. */}
      {!noindex && <link rel="canonical" href={url} />}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content={profile.shortName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </Head>
  );
};

export default Seo;
