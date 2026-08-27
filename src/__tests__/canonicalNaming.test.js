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
const intentionalNonProductText = new Set([
  'docs/superpowers/specs/2026-07-29-homepage-hero-and-canonical-naming-design.md',
  'docs/superpowers/specs/2026-08-25-dspl-sitewide-copy-decision-matrix.md',
  'src/__tests__/canonicalNaming.test.js',
  'scripts/__tests__/verify-deployment.test.js',
]);
const approvedRootCompanyCopy = new Map([
  [
    'src/pages/Home.jsx',
    /Dashapatmaja Solutions is a Manipal-based company that develops\s+its own consumer brands and delivers branding, marketing,\s+e-commerce and product compliance support to businesses across\s+(?:Karnataka and )?India\./s,
  ],
  [
    'src/pages/__tests__/Home.test.jsx',
    /Dashapatmaja Solutions is a Manipal-based company that develops its own consumer brands and delivers branding, marketing, e-commerce and product compliance support to businesses across (?:Karnataka and )?India\./,
  ],
  [
    'src/pages/Brands.jsx',
    /Dashapatmaja Solutions built it end to end\./,
  ],
]);
const approvedSeoMetadataPatterns = [
  /About Dashapatmaja Solutions: Brand Builders in Manipal/g,
  /Contact Dashapatmaja Solutions, Manipal, Karnataka/g,
  /Start a Project with Dashapatmaja Solutions/g,
  /Raw Radicles is the first consumer brand from Dashapatmaja Solutions:/g,
  /by Dashapatmaja Solutions in Manipal\./g,
  /Talk to Dashapatmaja Solutions in Manipal/g,
];
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
    .filter((file) => !intentionalNonProductText.has(file));
}

function hasUnexpectedIncompleteCompanyName(content, file) {
  const approvedCopy = approvedRootCompanyCopy.get(file);
  let contentToCheck = approvedCopy ? content.replace(approvedCopy, '') : content;

  if (file.startsWith('src/seo/')) {
    for (const pattern of approvedSeoMetadataPatterns) {
      contentToCheck = contentToCheck.replace(pattern, '');
    }
  }

  incompleteCompanyName.lastIndex = 0;
  const hasViolation = incompleteCompanyName.test(contentToCheck);
  incompleteCompanyName.lastIndex = 0;
  return hasViolation;
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

      if (hasUnexpectedIncompleteCompanyName(content, file)) {
        violations.push(`${file}: incomplete company name`);
      }
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
    expect(COMPANY_FACTS.registeredOffice.fullAddress).toContain('Manipal, Karnataka, India 576104');
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
      'src/pages/PrivacyPolicy.jsx',
      'src/pages/TermsOfUse.jsx',
      'src/seo/structuredData.js',
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
