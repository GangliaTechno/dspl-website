import { describe, expect, it } from 'vitest';
import {
  getRouteMetadata,
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
});
