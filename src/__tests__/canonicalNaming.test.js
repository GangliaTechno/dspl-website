import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { describe, expect, it } from 'vitest';
import { COMPANY_FACTS } from '../content/companyFacts';

const canonicalCompanyName = 'Dashapatmaja Solutions Pvt Ltd';
const trackedTextExtensions = new Set([
  '.html',
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.mjs',
]);
const intentionalLegacyDiscussion = new Set([
  'docs/superpowers/specs/2026-07-29-homepage-hero-and-canonical-naming-design.md',
]);
const prohibitedVariants = [
  ['Dasha', 'Patmaja'].join(' '),
  ['Dashapatmaja', 'Services'].join(' '),
  ['Dashapatmaja', 'Solutions', 'Private', 'Limited'].join(' '),
  ['Dashapatmaja', 'Solutions', 'Pvt.', 'Ltd.'].join(' '),
  ['Mr.', 'Shreepathy', 'Ranga', 'Bhatta'].join(' '),
  ['Ms.', 'Anusha', 'Pai'].join(' '),
];
const incompleteCompanyName = new RegExp(
  `${['Dashapatmaja', 'Solutions'].join(' ')}(?! Pvt Ltd)`,
  'g',
);

function trackedTextFiles() {
  return execFileSync('git', ['ls-files', '-z'], {
    encoding: 'utf8',
  })
    .split('\0')
    .filter(Boolean)
    .filter((file) => existsSync(file))
    .filter((file) => trackedTextExtensions.has(extname(file)))
    .filter((file) => !intentionalLegacyDiscussion.has(file));
}

describe('canonical naming', () => {
  it('uses the exact company and leadership names in active tracked text', () => {
    const violations = [];

    for (const file of trackedTextFiles()) {
      const content = readFileSync(file, 'utf8');

      for (const variant of prohibitedVariants) {
        if (content.includes(variant)) {
          violations.push(`${file}: ${variant}`);
        }
      }

      if (incompleteCompanyName.test(content)) {
        violations.push(`${file}: incomplete company name`);
      }
      incompleteCompanyName.lastIndex = 0;
    }

    expect(violations).toEqual([]);
  });

  it('keeps the approved exact names and official company facts available to product code', () => {
    expect(canonicalCompanyName).toBe('Dashapatmaja Solutions Pvt Ltd');
    expect(COMPANY_FACTS.legalName).toBe('Dashapatmaja Solutions Pvt Ltd');
    expect(COMPANY_FACTS.cin).toBe('U74999KA2022PTC163810');
    expect(COMPANY_FACTS.cin).toMatch(/^U\d{5}[A-Z]{2}\d{4}PTC\d{6}$/);
    expect(COMPANY_FACTS.incorporationDate).toBe('28 July 2022');
    expect(COMPANY_FACTS.contacts.primaryPhone).toBe('+91 88619 42440');
    expect(COMPANY_FACTS.contacts.secondaryPhone).toBe('+91 90725 56665');
    expect(COMPANY_FACTS.contacts.directorEmail).toBe('director@dashapatmaja.in');
    expect(COMPANY_FACTS.contacts.projectEmail).toBe('dsplmanipal@gmail.com');
    expect(COMPANY_FACTS.registeredOffice.fullAddress).toContain('Manipal, Karnataka 576104');
    expect('Dr. Shreepathy Rangabhatta B').not.toContain(' Ranga Bhatta');
    expect('Dr. Anusha Pai').toMatch(/^Dr\./);
  });

  it('prevents the literal CIN from being hard-coded anywhere outside companyFacts.js', () => {
    const cinViolations = [];
    const ignoredFiles = new Set([
      'src/content/companyFacts.js',
      'src/__tests__/canonicalNaming.test.js',
      'scripts/audit-and-clean-assets.mjs',
    ]);

    for (const file of trackedTextFiles()) {
      if (file.startsWith('docs/') || file.startsWith('research/') || ignoredFiles.has(file)) continue;
      const content = readFileSync(file, 'utf8');
      if (content.includes('U74999KA2022PTC163810')) {
        cinViolations.push(file);
      }
    }

    expect(cinViolations).toEqual([]);
  });

  it('verifies that statutory consumers import COMPANY_FACTS directly', () => {
    const consumers = [
      'src/components/Footer.jsx',
      'src/pages/About.jsx',
      'src/pages/RawRadicles.jsx',
      'src/pages/Contact.jsx',
      'src/pages/PrivacyPolicy.jsx',
      'src/pages/TermsOfUse.jsx',
      'src/seo/routeMetadata.js',
    ];

    for (const consumerPath of consumers) {
      const content = readFileSync(consumerPath, 'utf8');
      expect(content).toContain('COMPANY_FACTS');
    }
  });

  it('verifies that metadata consumers import SITE_CONFIG directly', () => {
    const metadataConsumers = [
      'src/seo/routeMetadata.js',
      'src/hooks/useSEO.js',
      'src/entry-prerender.jsx',
      'src/pages/blogPostModel.js',
    ];

    for (const consumerPath of metadataConsumers) {
      const content = readFileSync(consumerPath, 'utf8');
      expect(content).toContain('SITE_CONFIG');
    }
  });
});
