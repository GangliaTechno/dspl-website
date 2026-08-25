import { describe, expect, it } from 'vitest';
import { COMPANY_FACTS } from '../../content/companyFacts';
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createOrganizationSchema,
  createPersonSchemas,
  createStructuredDataGraph,
} from '../structuredData';

describe('structuredData module', () => {
  it('creates enriched organization schema with stable @id', () => {
    const org = createOrganizationSchema();
    expect(org['@type']).toEqual(['Organization', 'LocalBusiness']);
    expect(org['@id']).toBe('https://dashapatmaja.in/#organization');
    expect(org.name).toBe(COMPANY_FACTS.legalName);
    expect(org.alternateName).toBe('DSPL');
    expect(org.url).toBe('https://dashapatmaja.in');
    expect(org.foundingDate).toBe('2022-07-28');
    expect(org.identifier).toBe(COMPANY_FACTS.cin);
    expect(org.email).toBe('director@dashapatmaja.in');
    expect(org.telephone).toBe('+91 88619 42440');
    expect(org.openingHours).toBe('Mo-Sa 09:00-18:00');
    expect(org.areaServed).toEqual(['Manipal', 'Udupi', 'Mangalore', 'Karnataka', 'India']);
    expect(org.brand).toEqual({
      '@type': 'Brand',
      name: 'Raw Radicles',
      url: 'https://dashapatmaja.in/brands/raw-radicles',
    });
  });

  it('creates breadcrumb schema with absolute URLs and skips root and 404', () => {
    expect(createBreadcrumbSchema('/')).toBeNull();
    expect(createBreadcrumbSchema('/404.html')).toBeNull();
    expect(createBreadcrumbSchema('/404')).toBeNull();

    const aboutBreadcrumbs = createBreadcrumbSchema('/about');
    expect(aboutBreadcrumbs['@type']).toBe('BreadcrumbList');
    expect(aboutBreadcrumbs.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dashapatmaja.in' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://dashapatmaja.in/about' },
    ]);

    const rawRadiclesBreadcrumbs = createBreadcrumbSchema('/brands/raw-radicles');
    expect(rawRadiclesBreadcrumbs.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dashapatmaja.in' },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: 'https://dashapatmaja.in/brands' },
      { '@type': 'ListItem', position: 3, name: 'Raw Radicles', item: 'https://dashapatmaja.in/brands/raw-radicles' },
    ]);

    const articleBreadcrumbs = createBreadcrumbSchema('/blogs/fssai-checklist', 'FSSAI Checklist');
    expect(articleBreadcrumbs.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dashapatmaja.in' },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://dashapatmaja.in/blogs' },
      { '@type': 'ListItem', position: 3, name: 'FSSAI Checklist', item: 'https://dashapatmaja.in/blogs/fssai-checklist' },
    ]);
  });

  it('creates Person schemas for team members with stable URI @ids, worksFor references, and omitted description', () => {
    const persons = createPersonSchemas();
    expect(persons).toHaveLength(5);
    expect(persons.every((p) => p['@type'] === 'Person')).toBe(true);
    expect(persons.every((p) => p.worksFor['@id'] === 'https://dashapatmaja.in/#organization')).toBe(true);
    expect(persons.every((p) => p['@id'].startsWith('https://dashapatmaja.in/about#'))).toBe(true);
    expect(persons.every((p) => p.description === undefined)).toBe(true);

    const names = persons.map((p) => p.name);
    expect(names).toEqual([
      'Dr. Manu Sudhi',
      'Dr. Dasharathraj K Shetty',
      'Dr. Shreepathy Rangabhatta B',
      'Dr. Anusha Pai',
      'Mr. Namesh Malarout',
    ]);

    // Explicit check: confirmed name uses "Dr. Shreepathy Rangabhatta B", not "R"
    const sree = persons.find((p) => p.name.includes('Shreepathy'));
    expect(sree.name).toBe('Dr. Shreepathy Rangabhatta B');
    expect(sree['@id']).toBe('https://dashapatmaja.in/about#shreepathy-rangabhatta');
  });

  it('creates FAQPage schema from question/answer arrays and returns null for empty', () => {
    expect(createFaqSchema([])).toBeNull();
    expect(createFaqSchema(null)).toBeNull();
    expect(createFaqSchema(undefined)).toBeNull();

    const faqPage = createFaqSchema([
      { q: 'Q1?', a: 'A1.' },
      { question: 'Q2?', answer: 'A2.' },
    ]);
    expect(faqPage['@type']).toBe('FAQPage');
    expect(faqPage.mainEntity).toEqual([
      {
        '@type': 'Question',
        name: 'Q1?',
        acceptedAnswer: { '@type': 'Answer', text: 'A1.' },
      },
      {
        '@type': 'Question',
        name: 'Q2?',
        acceptedAnswer: { '@type': 'Answer', text: 'A2.' },
      },
    ]);
  });

  it('wraps multiple nodes in a clean schema.org @graph container filtering falsy items', () => {
    const graph = createStructuredDataGraph(
      { '@type': 'Organization', name: 'DSPL' },
      null,
      undefined,
      [
        { '@type': 'BreadcrumbList' },
        [{ '@type': 'FAQPage' }],
      ],
    );

    expect(graph).toEqual({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', name: 'DSPL' },
        { '@type': 'BreadcrumbList' },
        { '@type': 'FAQPage' },
      ],
    });
  });
});
