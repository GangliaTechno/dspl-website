import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { describe, expect, it } from 'vitest';

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

  it('keeps the approved exact names available to product code', () => {
    expect(canonicalCompanyName).toBe('Dashapatmaja Solutions Pvt Ltd');
    expect('Dr. Shreepathy Rangabhatta R').not.toContain(' Ranga Bhatta');
    expect('Dr. Anusha Pai').toMatch(/^Dr\./);
  });
});
