import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { describe, expect, it } from 'vitest';

const scannedExtensions = new Set(['.html', '.js', '.jsx', '.json', '.mjs', '.xml']);
const forbiddenPatterns = [
  ['legacy Gmail address', /dashapatmajasolutions@gmail\.com/i],
  ['unsupported registered-trademark wording', /registered trademark/i],
  ['unsupported FSSAI-licence wording', /FSSAI licensed/i],
  ['unresolved content placeholder', /\[(?:price|duration|name|company)\]/i],
];

const allowedLinePatterns = new Map([
  ['src/pages/Contact.jsx', [/errors\[name\]/, /\[name\]:/]],
  ['src/components/ProjectPlannerForm.jsx', [/errors\[name\]/, /\[name\]:/]],
  ['src/pages/__tests__/Brands.test.jsx', [/registered trademark/i, /FSSAI licensed/i]],
  ['src/pages/__tests__/RawRadicles.test.jsx', [/registered trademark/i, /FSSAI licensed/i]],
  ['src/__tests__/contentEvidenceRegression.test.js', forbiddenPatterns.map(([, pattern]) => pattern)],
]);

const publicSourceFiles = () => execFileSync(
  'rg',
  ['--files', 'src', 'public', 'scripts'],
  { encoding: 'utf8' },
)
  .split(/\r?\n/)
  .filter(Boolean)
  .map((file) => file.replaceAll('\\', '/'))
  .filter((file) => scannedExtensions.has(extname(file)));

const isAllowedLine = (file, line) => (
  allowedLinePatterns.get(file)?.some((pattern) => pattern.test(line)) ?? false
);

describe('public content evidence boundaries', () => {
  it('contains no unsupported public claim, legacy contact, or content placeholder', () => {
    const violations = [];

    for (const file of publicSourceFiles()) {
      readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, index) => {
        for (const [label, pattern] of forbiddenPatterns) {
          if (pattern.test(line) && !isAllowedLine(file, line)) {
            violations.push(`${file}:${index + 1} ${label}`);
          }
        }
      });
    }

    expect(violations).toEqual([]);
  });

  it('uses the exact evidence-limited Raw Radicles trademark statement', () => {
    const brandsSource = readFileSync('src/pages/Brands.jsx', 'utf8')
      .replace(/\s+/g, ' ');

    expect(brandsSource).toContain('trademark application has been filed');
    expect(brandsSource).toContain('the mark is not described as registered');
  });
});
