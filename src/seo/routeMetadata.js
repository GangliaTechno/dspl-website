import { SITE_CONFIG } from '../content/siteConfig';
import { BRANDING_FAQS, ECOMMERCE_FAQS, MARKETING_FAQS } from '../content/serviceFaqs';
import { blogsEnabled, getBlogPostSummary } from '../content/publication';
import { createBlogPostMetadata, normalizeBlogSlug } from '../pages/blogPostModel';
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createOrganizationSchema,
  createPersonSchemas,
  createStructuredDataGraph,
} from './structuredData';

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

export const organizationStructuredData = Object.freeze(createOrganizationSchema());

export function generateBreadcrumbSchema(pathname, title) {
  return createBreadcrumbSchema(pathname, title);
}

export function generateTeamPersonSchema() {
  return createPersonSchemas();
}

export function generateServiceFaqSchema(pathname) {
  let faqs = null;
  if (pathname === '/branding') faqs = BRANDING_FAQS;
  else if (pathname === '/marketing') faqs = MARKETING_FAQS;
  else if (pathname === '/ecommerce') faqs = ECOMMERCE_FAQS;

  return createFaqSchema(faqs);
}

export function buildRouteStructuredData(pathname) {
  const breadcrumbs = createBreadcrumbSchema(pathname);
  const serviceFaq = generateServiceFaqSchema(pathname);
  const teamNodes = pathname === '/about' ? createPersonSchemas() : null;

  return createStructuredDataGraph(
    organizationStructuredData,
    breadcrumbs,
    teamNodes,
    serviceFaq,
  );
}

const routeMetadata = {
  '/': {
    title: 'Branding, Marketing & E-commerce Company in Manipal, Karnataka',
    description:
      'We build our own consumer brands and help Indian businesses build theirs. Branding, marketing, e-commerce and FSSAI compliance support from Manipal.',
  },
  '/about': {
    title: 'About Dashapatmaja Solutions Pvt Ltd: Brand Builders in Manipal',
    description:
      'Dashapatmaja Solutions Pvt Ltd was incorporated in 2022 and is incubated at MUTBI, MAHE. Meet the Manipal team building consumer brands and client brand systems.',
  },
  '/brands': {
    title: 'Our Consumer Brands: Raw Radicles Ayurvedic Chocolate',
    description:
      'Raw Radicles is the first consumer brand from Dashapatmaja Solutions Pvt Ltd: six 60 g Ayurvedic chocolate bars across three collections, built end to end in India.',
  },
  '/brands/raw-radicles': {
    title: 'Raw Radicles: Ayurvedic Chocolate Built from Scratch in India',
    description:
      'Six 60 g Ayurvedic chocolate bars built from formulation brief to print-ready pack: Holy Sin, Wrath Relief and Smart Sin, by Dashapatmaja Solutions Pvt Ltd in Manipal.',
  },
  '/marketing': {
    title: 'Digital Marketing & SEO Agency in Manipal, Udupi',
    description:
      'SEO, Google and Meta campaigns, content and reporting for Indian businesses. Run by the Manipal team behind Raw Radicles. Monthly targets agreed before we start.',
  },
  '/branding': {
    title: 'Branding & Brand Identity Agency in Manipal, Karnataka',
    description:
      'Brand positioning, identity, packaging and voice for Indian businesses. Built by a Manipal team that designed and shipped its own consumer brand.',
  },
  '/ecommerce': {
    title: 'E-commerce Development for D2C Brands in India',
    description:
      'Shopify, WooCommerce and custom storefronts, plus Amazon and Flipkart listings, payments and delivery setup, from the Manipal team that sells its own product online.',
  },
  '/contact': {
    title: 'Contact Dashapatmaja Solutions Pvt Ltd, Manipal, Karnataka',
    description:
      'Talk to Dashapatmaja Solutions Pvt Ltd in Manipal about branding, marketing, e-commerce or a new consumer brand. We reply within one working day.',
  },
  '/start': {
    title: 'Start a Project with Dashapatmaja Solutions Pvt Ltd',
    description:
      'Share your brand, marketing, e-commerce or compliance requirements. We review, identify the right team and reply within one working day.',
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
    title: 'Insights on Branding, D2C Launches & FSSAI Compliance',
    description:
      'Practical writing on brand building, D2C launches, FSSAI labelling and marketplace operations, from a team that runs its own consumer brand in India.',
  },
};

for (const path of PUBLIC_ROUTES) {
  routeMetadata[path] = Object.freeze({
    ...routeMetadata[path],
    canonical: path,
    ...DEFAULT_IMAGE_METADATA,
    type: 'website',
    robots: 'index, follow',
    structuredData: buildRouteStructuredData(path),
  });
}

routeMetadata['/blogs'] = Object.freeze({
  ...routeMetadata['/blogs'],
  canonical: '/blogs',
  ...DEFAULT_IMAGE_METADATA,
  type: 'website',
  robots: blogsEnabled ? 'index, follow' : 'noindex, follow',
  structuredData: buildRouteStructuredData('/blogs'),
});

export const NOT_FOUND_METADATA = Object.freeze({
  title: 'Dashapatmaja Solutions Pvt Ltd | Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  canonical: '/404.html',
  ...DEFAULT_IMAGE_METADATA,
  type: 'website',
  robots: 'noindex, follow',
  structuredData: createStructuredDataGraph(organizationStructuredData),
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
