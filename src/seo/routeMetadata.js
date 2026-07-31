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
  name: 'Dashapatmaja Solutions Pvt Ltd',
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
      'Dashapatmaja Solutions Pvt Ltd | Branding, Marketing & E-commerce',
    description:
      'Dashapatmaja Solutions Pvt Ltd helps Indian consumer businesses connect brand strategy, go-to-market execution, and e-commerce.',
  },
  '/about': {
    title: 'Dashapatmaja Solutions Pvt Ltd | About Us',
    description:
      'Manipal-based team building consumer brands and delivering coordinated branding, marketing, and e-commerce services for Indian businesses.',
  },
  '/brands': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Our Brands',
    description:
      'Explore the consumer brands built by Dashapatmaja Solutions Pvt Ltd, beginning with Raw Radicles and its Ayurveda-inspired premium chocolate range.',
  },
  '/marketing': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Marketing & SEO',
    description:
      'Build demand with coordinated SEO, paid media, analytics, content, and campaign execution from the team behind the Raw Radicles consumer brand.',
  },
  '/branding': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Brand Identity & Strategy',
    description:
      'Create a memorable brand with positioning, identity, visual systems, story, and reusable assets designed for growing Indian consumer businesses.',
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
  '/privacy': {
    title: 'Dashapatmaja Solutions Pvt Ltd | Privacy & Terms',
    description:
      'Read how Dashapatmaja Solutions Pvt Ltd collects, uses, protects, and handles data submitted through website visits, enquiries, and communications.',
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
