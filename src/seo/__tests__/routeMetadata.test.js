import { describe, expect, it } from 'vitest';
import { COMPANY_FACTS } from '../../content/companyFacts';
import { SITE_CONFIG } from '../../content/siteConfig';
import {
  generateBreadcrumbSchema,
  generateServiceFaqSchema,
  generateTeamPersonSchema,
  getRouteMetadata,
  NOT_FOUND_METADATA,
  organizationStructuredData,
  PUBLIC_ROUTES,
  resolveMetadataForPath,
} from '../routeMetadata';

describe('route metadata', () => {
  it('defines the core public route set and activates /blogs when enabled', () => {
    expect(PUBLIC_ROUTES).toEqual([
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
    ]);

    expect(getRouteMetadata('/blogs')).toMatchObject({
      canonical: '/blogs',
      robots: 'index, follow',
      title: 'Insights on Branding, D2C Launches & FSSAI Compliance',
    });
  });

  it('defines unique metadata for every public route', () => {
    const records = PUBLIC_ROUTES.map(getRouteMetadata);

    expect(new Set(records.map((item) => item.title)).size).toBe(records.length);
    expect(records.every((item) => item.description.length >= 80)).toBe(true);
    expect(records.every((item) => item.canonical.startsWith('/'))).toBe(true);
  });

  it('contains verified and enriched organization structured data with @id', () => {
    expect(organizationStructuredData['@type']).toEqual([
      'Organization',
      'LocalBusiness',
    ]);
    expect(organizationStructuredData['@id']).toBe('https://dashapatmaja.in/#organization');
    expect(organizationStructuredData.name).toBe(COMPANY_FACTS.legalName);
    expect(organizationStructuredData.alternateName).toBe('DSPL');
    expect(organizationStructuredData.url).toBe('https://dashapatmaja.in');
    expect(organizationStructuredData.foundingDate).toBe('2022-07-28');
    expect(organizationStructuredData.identifier).toBe(COMPANY_FACTS.cin);
    expect(organizationStructuredData.email).toBe('director@dashapatmaja.in');
    expect(organizationStructuredData.telephone).toBe('+91 88619 42440');
    expect(organizationStructuredData.openingHours).toBe('Mo-Sa 09:00-18:00');
    expect(organizationStructuredData.areaServed).toEqual(['Manipal', 'Udupi', 'Mangalore', 'Karnataka', 'India']);
    expect(organizationStructuredData.address.streetAddress).toContain('#12');
    expect(organizationStructuredData.brand).toEqual({
      '@type': 'Brand',
      name: 'Raw Radicles',
      url: 'https://dashapatmaja.in/brands/raw-radicles',
    });
    expect(organizationStructuredData.sameAs).toContain(
      'https://www.linkedin.com/company/dashapatmaja-solutions-private-limited/',
    );
  });

  it('generates breadcrumb structured data for nested and content routes', () => {
    expect(generateBreadcrumbSchema('/')).toBeNull();
    expect(generateBreadcrumbSchema('/404.html')).toBeNull();

    const aboutBreadcrumbs = generateBreadcrumbSchema('/about');
    expect(aboutBreadcrumbs['@type']).toBe('BreadcrumbList');
    expect(aboutBreadcrumbs.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dashapatmaja.in' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://dashapatmaja.in/about' },
    ]);

    const rawRadiclesBreadcrumbs = generateBreadcrumbSchema('/brands/raw-radicles');
    expect(rawRadiclesBreadcrumbs.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dashapatmaja.in' },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: 'https://dashapatmaja.in/brands' },
      { '@type': 'ListItem', position: 3, name: 'Raw Radicles', item: 'https://dashapatmaja.in/brands/raw-radicles' },
    ]);

    const articleBreadcrumbs = generateBreadcrumbSchema('/blogs/fssai-checklist', 'FSSAI Checklist');
    expect(articleBreadcrumbs.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dashapatmaja.in' },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://dashapatmaja.in/blogs' },
      { '@type': 'ListItem', position: 3, name: 'FSSAI Checklist', item: 'https://dashapatmaja.in/blogs/fssai-checklist' },
    ]);
  });

  it('generates Person schema for confirmed team members with worksFor reference', () => {
    const persons = generateTeamPersonSchema();
    expect(persons).toHaveLength(5);
    expect(persons.every((p) => p['@type'] === 'Person')).toBe(true);
    expect(persons.every((p) => p.worksFor['@id'] === 'https://dashapatmaja.in/#organization')).toBe(true);
    expect(persons.map((p) => p.name)).toEqual([
      'Dr. Manu Sudhi',
      'Dr. Dasharathraj K Shetty',
      'Dr. Shreepathy Rangabhatta B',
      'Dr. Anusha Pai',
      'Mr. Namesh Malarout',
    ]);
  });

  it('generates service FAQPage schema from confirmed service FAQs', () => {
    const brandingFaq = generateServiceFaqSchema('/branding');
    expect(brandingFaq['@type']).toBe('FAQPage');
    expect(brandingFaq.mainEntity.length).toBeGreaterThanOrEqual(4);

    const marketingFaq = generateServiceFaqSchema('/marketing');
    expect(marketingFaq['@type']).toBe('FAQPage');
    expect(marketingFaq.mainEntity.length).toBeGreaterThanOrEqual(4);

    const ecommerceFaq = generateServiceFaqSchema('/ecommerce');
    expect(ecommerceFaq['@type']).toBe('FAQPage');
    expect(ecommerceFaq.mainEntity.length).toBeGreaterThanOrEqual(4);

    expect(generateServiceFaqSchema('/contact')).toBeNull();
  });

  it('resolves dynamic article metadata and fallbacks seamlessly with unified @graph', () => {
    const articleMeta = resolveMetadataForPath('/blogs/fssai-labelling-requirements-checklist-2026');
    expect(articleMeta).toMatchObject({
      title: 'FSSAI Labelling Requirements 2026: A Practical Checklist | Dashapatmaja Solutions Pvt Ltd',
      canonical: '/blogs/fssai-labelling-requirements-checklist-2026',
      type: 'article',
      robots: 'index, follow',
    });
    expect(articleMeta.structuredData['@graph']).toBeDefined();
    const types = articleMeta.structuredData['@graph'].map((node) => node['@type']);
    expect(types).toContain('BlogPosting');
    expect(types).toContain('BreadcrumbList');

    const unknownMeta = resolveMetadataForPath('/blogs/nonexistent-slug');
    expect(unknownMeta).toEqual(NOT_FOUND_METADATA);

    const notFoundMeta = resolveMetadataForPath('/404.html');
    expect(notFoundMeta).toEqual(NOT_FOUND_METADATA);
  });

  it('defines the approved Copy Deck SEO titles and descriptions across all public routes', () => {
    const expected = {
      '/': {
        title: 'Branding, Marketing & E-commerce Company in Manipal, Karnataka',
        description: 'We build our own consumer brands and help Indian businesses build theirs. Branding, marketing, e-commerce and FSSAI compliance support from Manipal.',
      },
      '/about': {
        title: 'About Dashapatmaja Solutions: Brand Builders in Manipal',
        description: 'Dashapatmaja Solutions Pvt Ltd was incorporated in 2022 and is incubated at MUTBI, MAHE. Meet the Manipal team building consumer brands and client brand systems.',
      },
      '/brands': {
        title: 'Our Consumer Brands: Raw Radicles Ayurvedic Chocolate',
        description: 'Raw Radicles is the first consumer brand from Dashapatmaja Solutions: six 60 g Ayurvedic chocolate bars across three collections, built end to end in India.',
      },
      '/brands/raw-radicles': {
        title: 'Raw Radicles: Ayurvedic Chocolate Built from Scratch in India',
        description: 'Six 60 g Ayurvedic chocolate bars built from formulation brief to print-ready pack: Holy Sin, Wrath Relief and Smart Sin, by Dashapatmaja Solutions in Manipal.',
      },
      '/branding': {
        title: 'Branding & Brand Identity Agency in Manipal, Karnataka',
        description: 'Brand positioning, identity, packaging and voice for Indian businesses. Built by a Manipal team that designed and shipped its own consumer brand.',
      },
      '/marketing': {
        title: 'Digital Marketing & SEO Agency in Manipal, Udupi',
        description: 'SEO, Google and Meta campaigns, content and reporting for Indian businesses. Run by the Manipal team behind Raw Radicles. Monthly targets agreed before we start.',
      },
      '/ecommerce': {
        title: 'E-commerce Development for D2C Brands in India',
        description: 'Shopify, WooCommerce and custom storefronts, plus Amazon and Flipkart listings, payments and delivery setup, from the Manipal team that sells its own product online.',
      },
      '/blogs': {
        title: 'Insights on Branding, D2C Launches & FSSAI Compliance',
        description: 'Practical writing on brand building, D2C launches, FSSAI labelling and marketplace operations, from a team that runs its own consumer brand in India.',
      },
      '/contact': {
        title: 'Contact Dashapatmaja Solutions, Manipal, Karnataka',
        description: 'Talk to Dashapatmaja Solutions in Manipal about branding, marketing, e-commerce or a new consumer brand. We reply within one working day.',
      },
      '/start': {
        title: 'Start a Project with Dashapatmaja Solutions',
        description: 'Share your brand, marketing, e-commerce or compliance requirements. We review, identify the right team and reply within one working day.',
      },
      '/privacy': {
        title: 'Dashapatmaja Solutions Pvt Ltd | Privacy Policy',
        description: 'Read how Dashapatmaja Solutions Pvt Ltd handles information submitted through website enquiries, project-planning forms, and analytics.',
      },
      '/terms': {
        title: 'Dashapatmaja Solutions Pvt Ltd | Terms of Use',
        description: 'Read the terms that apply when using the Dashapatmaja Solutions Pvt Ltd website and contacting the company about a potential engagement.',
      },
    };

    for (const [route, meta] of Object.entries(expected)) {
      expect(getRouteMetadata(route)).toMatchObject({
        title: meta.title,
        description: meta.description,
        canonical: route,
        robots: 'index, follow',
      });
      expect(getRouteMetadata(route).structuredData['@graph']).toBeDefined();
    }
  });

  it('defines the current homepage share-card defaults', () => {
    expect(SITE_CONFIG).toMatchObject({
      defaultOgImage: 'https://dashapatmaja.in/og-home-2026.jpg',
      defaultOgImageAlt:
        'Dashapatmaja Solutions Pvt Ltd — consumer brand building and growth',
      defaultOgImageWidth: 1200,
      defaultOgImageHeight: 630,
    });
    expect(getRouteMetadata('/')).toMatchObject({
      image: SITE_CONFIG.defaultOgImage,
      imageAlt: SITE_CONFIG.defaultOgImageAlt,
      imageWidth: 1200,
      imageHeight: 630,
    });
  });

  it('defines a noindex production 404 document', () => {
    expect(NOT_FOUND_METADATA).toMatchObject({
      title: 'Dashapatmaja Solutions Pvt Ltd | Page Not Found',
      canonical: '/404.html',
      robots: 'noindex, follow',
    });
  });
});
