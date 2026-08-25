import { COMPANY_FACTS } from '../content/companyFacts';
import { SITE_CONFIG } from '../content/siteConfig';
import { CONFIRMED_TEAM_MEMBERS } from '../content/teamMembers';

const SITE_URL = SITE_CONFIG.siteUrl;

/**
 * Creates the enriched DSPL Organization and LocalBusiness schema node.
 *
 * @returns {object}
 */
export function createOrganizationSchema() {
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_FACTS.legalName,
    alternateName: 'DSPL',
    url: SITE_URL,
    logo: SITE_CONFIG.defaultLogo,
    foundingDate: '2022-07-28',
    identifier: COMPANY_FACTS.cin,
    description:
      'Dashapatmaja Solutions Pvt Ltd builds consumer brands and provides branding, marketing, e-commerce and product compliance support from Manipal, Karnataka.',
    email: COMPANY_FACTS.contacts.directorEmail,
    telephone: COMPANY_FACTS.contacts.primaryPhone,
    openingHours: 'Mo-Sa 09:00-18:00',
    areaServed: ['Manipal', 'Udupi', 'Mangalore', 'Karnataka', 'India'],
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
      url: `${SITE_URL}${COMPANY_FACTS.brands.flagshipPath}`,
    },
  };
}

/**
 * Creates a BreadcrumbList schema node with absolute item URLs.
 * Returns null for the homepage and 404 routes.
 *
 * @param {string} pathname
 * @param {string} [title]
 * @returns {object|null}
 */
export function createBreadcrumbSchema(pathname, title) {
  if (!pathname || pathname === '/' || pathname === '/404.html' || pathname === '/404') {
    return null;
  }

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ];

  if (pathname === '/about') {
    items.push({ '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` });
  } else if (pathname === '/brands') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Brands', item: `${SITE_URL}/brands` });
  } else if (pathname === '/brands/raw-radicles') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Brands', item: `${SITE_URL}/brands` });
    items.push({ '@type': 'ListItem', position: 3, name: 'Raw Radicles', item: `${SITE_URL}/brands/raw-radicles` });
  } else if (pathname === '/branding') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Branding', item: `${SITE_URL}/branding` });
  } else if (pathname === '/marketing') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Marketing', item: `${SITE_URL}/marketing` });
  } else if (pathname === '/ecommerce') {
    items.push({ '@type': 'ListItem', position: 2, name: 'E-commerce', item: `${SITE_URL}/ecommerce` });
  } else if (pathname === '/blogs') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/blogs` });
  } else if (pathname.startsWith('/blogs/')) {
    items.push({ '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_URL}/blogs` });
    items.push({ '@type': 'ListItem', position: 3, name: title || 'Article', item: `${SITE_URL}${pathname}` });
  } else if (pathname === '/contact') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` });
  } else if (pathname === '/start') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Start a Project', item: `${SITE_URL}/start` });
  } else if (pathname === '/privacy') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${SITE_URL}/privacy` });
  } else if (pathname === '/terms') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Terms of Use', item: `${SITE_URL}/terms` });
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/**
 * Generates Person schema nodes for all confirmed team members,
 * linking each person to the organization via worksFor @id.
 *
 * @returns {Array<object>}
 */
export function createPersonSchemas() {
  return CONFIRMED_TEAM_MEMBERS.map((member) => ({
    '@type': 'Person',
    '@id': `${SITE_URL}/about#${member.id}`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    worksFor: {
      '@id': `${SITE_URL}/#organization`,
    },
    sameAs: member.linkedin ? [member.linkedin] : [],
  }));
}

/**
 * Creates an FAQPage schema node from visible FAQs.
 *
 * @param {Array<{ q?: string, question?: string, a?: string, answer?: string }>} faqs
 * @returns {object|null}
 */
export function createFaqSchema(faqs) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question || faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer || faq.a,
      },
    })),
  };
}

/**
 * Combines multiple schema nodes into a single Schema.org @graph container.
 *
 * @param {Array<object|null|undefined>} nodes
 * @returns {object}
 */
export function createStructuredDataGraph(...nodes) {
  const flattened = nodes
    .flat(Infinity)
    .filter((node) => node && typeof node === 'object');

  return {
    '@context': 'https://schema.org',
    '@graph': flattened,
  };
}
