import { describe, expect, it } from 'vitest';
import {
  HEADER_NAVIGATION,
  HEADER_PRIMARY_ACTION,
  createHeaderNavigation,
  getHeaderNavigationState,
  getNavigationMatch,
  normalizeNavigationPath,
} from '../headerNavigation';

describe('header navigation model', () => {
  it('keeps the approved first-level hierarchy and child order', () => {
    expect(HEADER_NAVIGATION.map((entry) => entry.label)).toEqual([
      'Company',
      'Capabilities',
      'Insights',
      'Contact',
    ]);

    expect(HEADER_NAVIGATION.find((entry) => entry.id === 'company').children.map((item) => item.label)).toEqual([
      'About DSPL',
      'Our Brands',
    ]);
    expect(HEADER_NAVIGATION.find((entry) => entry.id === 'capabilities').children.map((item) => item.label)).toEqual([
      'Branding',
      'Marketing',
      'E-commerce',
    ]);

    const allItems = HEADER_NAVIGATION.flatMap((entry) => entry.children ?? [entry]);
    expect(allItems.map((item) => item.to)).toEqual([
      '/about',
      '/brands',
      '/branding',
      '/marketing',
      '/ecommerce',
      '/blogs',
      '/contact',
    ]);
    expect(allItems.map((item) => item.description)).toEqual([
      'Company, leadership, journey and direction',
      'Consumer brands developed and operated by DSPL',
      'Positioning, identity and brand systems',
      'Strategy, campaigns, content and measurement',
      'Storefront, marketplace and commerce execution',
      undefined,
      undefined,
    ]);
    expect(JSON.stringify(HEADER_NAVIGATION)).not.toContain('Raw Radicles');
  });

  it('omits Insights when publication is disabled', () => {
    expect(createHeaderNavigation(false).map((entry) => entry.label)).toEqual([
      'Company',
      'Capabilities',
      'Contact',
    ]);
  });

  it('freezes navigation entries, child arrays, and route-prefix arrays', () => {
    expect(Object.isFrozen(HEADER_NAVIGATION)).toBe(true);

    for (const entry of HEADER_NAVIGATION) {
      expect(Object.isFrozen(entry)).toBe(true);
      if (entry.children) {
        expect(Object.isFrozen(entry.children)).toBe(true);
        for (const child of entry.children) {
          expect(Object.isFrozen(child)).toBe(true);
          if (child.activePrefixes) expect(Object.isFrozen(child.activePrefixes)).toBe(true);
        }
      }
      if (entry.activePrefixes) expect(Object.isFrozen(entry.activePrefixes)).toBe(true);
    }
    expect(Object.isFrozen(HEADER_PRIMARY_ACTION)).toBe(true);
  });

  it('normalizes trailing slashes and matches route segments safely', () => {
    expect(normalizeNavigationPath('/about///')).toBe('/about');
    expect(normalizeNavigationPath('/')).toBe('/');

    const brands = HEADER_NAVIGATION.find((entry) => entry.id === 'company').children.find(
      (item) => item.id === 'brands',
    );
    expect(getNavigationMatch('/brands/raw-radicles', brands)).toBe('location');
    expect(getNavigationMatch('/brands-other', brands)).toBeNull();
    const branding = HEADER_NAVIGATION.find((entry) => entry.id === 'capabilities').children.find(
      (item) => item.id === 'branding',
    );
    expect(getNavigationMatch('/branding/case-study', branding)).toBe('location');
    expect(getNavigationMatch('/branding-other', branding)).toBeNull();
    expect(getNavigationMatch('/start/extra', HEADER_PRIMARY_ACTION)).toBeNull();
  });

  it('returns hierarchical active state for exact and descendant routes', () => {
    const routes = [
      ['/about', { parentId: 'company', itemId: 'about', ariaCurrent: 'page' }],
      ['/brands', { parentId: 'company', itemId: 'brands', ariaCurrent: 'page' }],
      ['/brands/raw-radicles', { parentId: 'company', itemId: 'brands', ariaCurrent: 'location' }],
      ['/branding', { parentId: 'capabilities', itemId: 'branding', ariaCurrent: 'page' }],
      ['/marketing', { parentId: 'capabilities', itemId: 'marketing', ariaCurrent: 'page' }],
      ['/ecommerce', { parentId: 'capabilities', itemId: 'ecommerce', ariaCurrent: 'page' }],
      ['/blogs', { parentId: null, itemId: 'insights', ariaCurrent: 'page' }],
      ['/blogs/article', { parentId: null, itemId: 'insights', ariaCurrent: 'location' }],
      ['/contact', { parentId: null, itemId: 'contact', ariaCurrent: 'page' }],
      ['/unknown', { parentId: null, itemId: null, ariaCurrent: null }],
    ];

    for (const [pathname, expected] of routes) {
      expect(getHeaderNavigationState(pathname, HEADER_NAVIGATION)).toEqual(expected);
    }
  });

  it('activates only the primary action on its exact route', () => {
    expect(getNavigationMatch('/start', HEADER_PRIMARY_ACTION)).toBe('page');
    expect(getNavigationMatch('/start/extra', HEADER_PRIMARY_ACTION)).toBeNull();
  });
});
