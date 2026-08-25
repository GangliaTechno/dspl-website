import { COMPANY_FACTS } from '../content/companyFacts';
import { SITE_CONFIG } from '../content/siteConfig';
import { blogsEnabled, getBlogPostSummary } from '../content/publication';
import { createBlogPostMetadata, normalizeBlogSlug } from '../pages/blogPostModel';

const SITE_URL = SITE_CONFIG.siteUrl;
const DEFAULT_IMAGE = SITE_CONFIG.defaultOgImage;
const DEFAULT_IMAGE_METADATA = {
  image: DEFAULT_IMAGE,
  imageAlt: SITE_CONFIG.defaultOgImageAlt,
  imageWidth: SITE_CONFIG.defaultOgImageWidth,
  imageHeight: SITE_CONFIG.defaultOgImageHeight,
};

export const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/brands',
  '/brands/raw-radicles',
  '/marketing',
  '/branding',
  '/ecommerce',
  '/contact',
  '/start',
  '/privacy',
  '/terms',
];

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: COMPANY_FACTS.legalName,
  url: SITE_URL,
  logo: SITE_CONFIG.defaultLogo,
  email: COMPANY_FACTS.contacts.directorEmail,
  telephone: COMPANY_FACTS.contacts.primaryPhone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${COMPANY_FACTS.registeredOffice.line1}, ${COMPANY_FACTS.registeredOffice.line2}`,
    addressLocality: COMPANY_FACTS.registeredOffice.locality,
    addressRegion: COMPANY_FACTS.registeredOffice.region,
    postalCode: COMPANY_FACTS.registeredOffice.postalCode,
    addressCountry: COMPANY_FACTS.registeredOffice.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.3528,
    longitude: 74.7934,
  },
  sameAs: [
    COMPANY_FACTS.socials.linkedin,
  ],
  brand: {
    '@type': 'Brand',
    name: COMPANY_FACTS.brands.flagship,
    url: `${SITE_CONFIG.siteUrl}${COMPANY_FACTS.brands.flagshipPath}`,
  },
};

const routeMetadata = {
  '/': {
    title: 'Branding, Marketing & E-commerce Company in Manipal, Karnataka',
    description:
      'We build our own consumer brands and help Indian businesses build theirs. Branding, marketing, e-commerce and FSSAI compliance support from Manipal.',
  },
  '/about': {
    title: 'Dashapatmaja Solutions Pvt Ltd | About Us',
    description:
      'Meet the Manipal-based team developing consumer brands and delivering coordinated branding, marketing, and e-commerce services.',
  },
  '/brands': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Our Brands',
    description:
      'Explore the consumer brands built by Dashapatmaja Solutions Pvt Ltd, beginning with Raw Radicles and its Ayurveda-inspired premium chocolate range.',
  },
  '/brands/raw-radicles': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Raw Radicles Brand',
    description:
      'See how Dashapatmaja Solutions Pvt Ltd is developing Raw Radicles across formulation, packaging, compliance coordination, and routes to market.',
  },
  '/marketing': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Marketing & SEO',
    description:
      'Build demand with coordinated SEO, paid media, analytics, content, and campaign execution from the team behind the Raw Radicles consumer brand.',
  },
  '/branding': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Brand Identity & Strategy',
    description:
      'Develop a clear brand system through positioning, identity, voice, guidelines, and reusable assets designed for consistent application.',
  },
  '/ecommerce': {
    title: 'Dashapatmaja Solutions Pvt Ltd | E-commerce Services',
    description:
      'Build and improve online stores, checkout journeys, marketplace operations, payments, and delivery systems with an operator-led e-commerce team.',
  },
  '/contact': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Contact',
    description:
      'Talk with Dashapatmaja Solutions Pvt Ltd in Manipal about branding, marketing, e-commerce, or a new consumer brand and share your project context.',
  },
  '/start': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Start a Project',
    description:
      'Share your brand, marketing, e-commerce, website, or compliance-support requirements with the Dashapatmaja Solutions Pvt Ltd project team.',
  },
  '/privacy': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Privacy Policy',
    description:
      'Read how Dashapatmaja Solutions Pvt Ltd handles information submitted through website enquiries, project-planning forms, and analytics.',
  },
  '/terms': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Terms of Use',
    description:
      'Read the terms that apply when using the Dashapatmaja Solutions Pvt Ltd website and contacting the company about a potential engagement.',
  },
  '/blogs': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Insights',
    description:
      'Insights from building consumer brands and supporting branding, marketing, e-commerce, and compliance-coordination work.',
  },
};

for (const path of PUBLIC_ROUTES) {
  routeMetadata[path] = Object.freeze({
    ...routeMetadata[path],
    canonical: path,
    ...DEFAULT_IMAGE_METADATA,
    type: 'website',
    robots: 'index, follow',
    structuredData: organizationStructuredData,
  });
}

routeMetadata['/blogs'] = Object.freeze({
  ...routeMetadata['/blogs'],
  canonical: '/blogs',
  ...DEFAULT_IMAGE_METADATA,
  type: 'website',
  robots: blogsEnabled ? 'index, follow' : 'noindex, follow',
  structuredData: organizationStructuredData,
});

export const NOT_FOUND_METADATA = Object.freeze({
  title: 'Dashapatmaja Solutions Pvt Ltd | Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  canonical: '/404.html',
  ...DEFAULT_IMAGE_METADATA,
  type: 'website',
  robots: 'noindex, follow',
  structuredData: organizationStructuredData,
});

export function getRouteMetadata(pathname) {
  const metadata = routeMetadata[pathname];

  if (!metadata) {
    throw new Error(`No metadata is defined for route: ${pathname}`);
  }

  return metadata;
}

/**
 * Resolves metadata for any pathname during static prerendering or dynamic routing.
 *
 * @param {string} pathname
 * @returns {object}
 */
export function resolveMetadataForPath(pathname) {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  if (normalized === '/404.html' || normalized === '/404') {
    return NOT_FOUND_METADATA;
  }

  if (routeMetadata[normalized]) {
    return getRouteMetadata(normalized);
  }

  if (normalized.startsWith('/blogs/')) {
    const slug = normalizeBlogSlug(normalized.replace('/blogs/', ''));
    const post = getBlogPostSummary(slug);
    if (post) {
      return createBlogPostMetadata(post, blogsEnabled);
    }
  }

  return NOT_FOUND_METADATA;
}
