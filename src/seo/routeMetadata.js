const SITE_URL = 'https://dashapatmaja.in';
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.jpg`; /* 1200×630 landscape for social sharing */

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
  brand: {
    '@type': 'Brand',
    name: 'Raw Radicles',
    url: `${SITE_URL}/brands/raw-radicles`,
  },
};

const routeMetadata = {
  '/': {
    title:
      'Dashapatmaja Solutions Pvt Ltd | Branding, Marketing & E-commerce',
    description:
      'Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services.',
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
    image: DEFAULT_IMAGE,
    type: 'website',
    robots: 'index, follow',
    structuredData: organizationStructuredData,
  });
}

routeMetadata['/blogs'] = Object.freeze({
  ...routeMetadata['/blogs'],
  canonical: '/blogs',
  image: DEFAULT_IMAGE,
  type: 'website',
  robots: 'noindex, follow',
  structuredData: organizationStructuredData,
});

export const NOT_FOUND_METADATA = Object.freeze({
  title: 'Dashapatmaja Solutions Pvt Ltd | Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  canonical: '/404.html',
  image: DEFAULT_IMAGE,
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
