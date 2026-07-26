const SITE_URL = 'https://dashapatmaja.in';
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.jpg`; /* 1200×630 landscape for social sharing */

export const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/brands',
  '/marketing',
  '/branding',
  '/ecommerce',
  '/contact',
  '/privacy',
];

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Dasha Patmaja Services Pvt. Ltd.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: 'director@dashapatmaja.in',
  telephone: '+91-88619-42440',
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'Room No. 12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar',
    addressLocality: 'Manipal',
    addressRegion: 'Karnataka',
    postalCode: '576104',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.3528,
    longitude: 74.7934,
  },
  sameAs: [
    'https://www.linkedin.com/company/dashapatmaja-solutions-private-limited/',
  ],
};

const routeMetadata = {
  '/': {
    title:
      'Dasha Patmaja Services | Branding, Marketing & E-commerce',
    description:
      'Dasha Patmaja Services helps Indian consumer businesses connect brand strategy, go-to-market execution, and e-commerce under one accountable team.',
  },
  '/about': {
    title: 'About Dasha Patmaja Services Pvt. Ltd. | Manipal',
    description:
      'Manipal-based team building consumer brands and delivering coordinated branding, marketing, and e-commerce services for Indian businesses.',
  },
  '/brands': {
    title: 'Our Brands | Dasha Patmaja Services Pvt. Ltd.',
    description:
      'Explore the consumer brands built by Dasha Patmaja Services Pvt. Ltd., beginning with Raw Radicles and its Ayurveda-inspired premium chocolate range.',
  },
  '/marketing': {
    title: 'Marketing & SEO Services | Dasha Patmaja Services',
    description:
      'Build demand with coordinated SEO, paid media, analytics, content, and campaign execution from the team behind the Raw Radicles consumer brand.',
  },
  '/branding': {
    title: 'Brand Identity & Strategy | Dasha Patmaja Services',
    description:
      'Create a memorable brand with positioning, identity, visual systems, story, and reusable assets designed for growing Indian consumer businesses.',
  },
  '/ecommerce': {
    title: 'E-commerce Services & Store Growth | Dasha Patmaja Services',
    description:
      'Build and improve online stores, checkout journeys, marketplace operations, payments, and delivery systems with an operator-led e-commerce team.',
  },
  '/contact': {
    title: 'Contact Dasha Patmaja Services Pvt. Ltd. | Manipal',
    description:
      'Talk with Dasha Patmaja Services Pvt. Ltd. in Manipal about branding, marketing, e-commerce, or a new consumer brand and share your project context.',
  },
  '/privacy': {
    title: 'Privacy Policy & Terms | Dasha Patmaja Services',
    description:
      'Read how Dasha Patmaja Services Pvt. Ltd. collects, uses, protects, and handles data submitted through website visits, enquiries, and communications.',
  },
};

for (const path of PUBLIC_ROUTES) {
  routeMetadata[path] = Object.freeze({
    ...routeMetadata[path],
    canonical: path,
    image: DEFAULT_IMAGE,
    type: 'website',
    structuredData: organizationStructuredData,
  });
}

export function getRouteMetadata(pathname) {
  const metadata = routeMetadata[pathname];

  if (!metadata) {
    throw new Error(`No metadata is defined for route: ${pathname}`);
  }

  return metadata;
}
