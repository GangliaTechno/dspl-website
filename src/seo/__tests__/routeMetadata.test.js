import { describe, expect, it } from 'vitest';
import { SITE_CONFIG } from '../../content/siteConfig';
import {
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
    ].filter((v, i, a) => a.indexOf(v) === i));

    expect(getRouteMetadata('/blogs')).toMatchObject({
      canonical: '/blogs',
      robots: 'index, follow',
      title: 'Dashapatmaja Solutions Pvt Ltd | Insights',
    });
  });

  it('defines unique metadata for every public route', () => {
    const records = PUBLIC_ROUTES.map(getRouteMetadata);

    expect(new Set(records.map((item) => item.title)).size).toBe(records.length);
    expect(records.every((item) => item.description.length >= 80)).toBe(true);
    expect(records.every((item) => item.canonical.startsWith('/'))).toBe(true);
  });

  it('contains only verified organization facts', () => {
    expect(organizationStructuredData['@type']).toEqual([
      'Organization',
      'LocalBusiness',
    ]);
    expect(organizationStructuredData.url).toBe('https://dashapatmaja.in');
    expect(organizationStructuredData.email).toContain(
      'director@dashapatmaja.in',
    );
    expect(organizationStructuredData.name).toBe(
      'Dashapatmaja Solutions Pvt Ltd',
    );
    expect(organizationStructuredData.brand).toEqual({
      '@type': 'Brand',
      name: 'Raw Radicles',
      url: 'https://dashapatmaja.in/brands/raw-radicles',
    });
    expect(organizationStructuredData.sameAs).toContain(
      'https://www.linkedin.com/company/dashapatmaja-solutions-private-limited/',
    );
  });

  it('resolves dynamic article metadata and fallbacks seamlessly', () => {
    const articleMeta = resolveMetadataForPath('/blogs/fssai-labelling-requirements-checklist-2026');
    expect(articleMeta).toMatchObject({
      title: 'FSSAI Labelling Requirements 2026: A Practical Checklist | Dashapatmaja Solutions Pvt Ltd',
      canonical: '/blogs/fssai-labelling-requirements-checklist-2026',
      type: 'article',
      robots: 'index, follow',
    });
    expect(articleMeta.structuredData['@type']).toBe('BlogPosting');

    const unknownMeta = resolveMetadataForPath('/blogs/nonexistent-slug');
    expect(unknownMeta).toEqual(NOT_FOUND_METADATA);

    const notFoundMeta = resolveMetadataForPath('/404.html');
    expect(notFoundMeta).toEqual(NOT_FOUND_METADATA);
  });

  it('defines indexable metadata for every new public route', () => {
    for (const route of ['/brands/raw-radicles', '/start', '/terms']) {
      expect(getRouteMetadata(route)).toMatchObject({
        canonical: route,
        robots: 'index, follow',
      });
    }
  });

  it('defines the exact privacy policy metadata', () => {
    expect(getRouteMetadata('/privacy')).toMatchObject({
      title: 'Dashapatmaja Solutions Pvt Ltd | Privacy Policy',
      description:
        'Read how Dashapatmaja Solutions Pvt Ltd handles information submitted through website enquiries, project-planning forms, and analytics.',
    });
  });

  it('defines the approved Home description without a geographic qualifier', () => {
    expect(getRouteMetadata('/')).toMatchObject({
      description:
        'DSPL builds its own consumer brands and helps businesses grow through coordinated branding, marketing, e-commerce and compliance support.',
    });
  });

  it('defines the current homepage title and share-card defaults', () => {
    expect(SITE_CONFIG).toMatchObject({
      defaultOgImage: 'https://dashapatmaja.in/og-home-2026.jpg',
      defaultOgImageAlt:
        'Dashapatmaja Solutions Pvt Ltd — consumer brand building and growth',
      defaultOgImageWidth: 1200,
      defaultOgImageHeight: 630,
    });
    expect(getRouteMetadata('/')).toMatchObject({
      title: 'Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth',
      description:
        'DSPL builds its own consumer brands and helps businesses grow through coordinated branding, marketing, e-commerce and compliance support.',
      image: SITE_CONFIG.defaultOgImage,
      imageAlt: SITE_CONFIG.defaultOgImageAlt,
      imageWidth: 1200,
      imageHeight: 630,
    });
  });

  it('keeps public-route descriptions free of India geographic qualifiers', () => {
    const descriptions = PUBLIC_ROUTES.map(
      (route) => getRouteMetadata(route).description,
    );

    expect(descriptions.every((description) => !/\b(?:india|indian)\b/i.test(description))).toBe(
      true,
    );
  });

  it('defines a noindex production 404 document', () => {
    expect(NOT_FOUND_METADATA).toMatchObject({
      title: 'Dashapatmaja Solutions Pvt Ltd | Page Not Found',
      canonical: '/404.html',
      robots: 'noindex, follow',
    });
  });
});
