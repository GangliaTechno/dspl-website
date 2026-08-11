import { describe, expect, it } from 'vitest';
import {
  getRouteMetadata,
  NOT_FOUND_METADATA,
  organizationStructuredData,
  PUBLIC_ROUTES,
} from '../routeMetadata';

describe('route metadata', () => {
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
        'Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services.',
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
