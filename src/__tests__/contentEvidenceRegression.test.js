import { readdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
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

const collectFiles = (directory) => readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => {
    const file = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(file) : [file];
  });

const publicSourceFiles = () => ['src', 'public', 'scripts']
  .flatMap(collectFiles)
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

  it('keeps internal audit language off public brand routes', () => {
    const publicBrandSources = [
      'src/pages/Brands.jsx',
      'src/pages/RawRadicles.jsx',
      'src/content/footerCtas.js',
    ].map((file) => readFileSync(file, 'utf8')).join('\n');

    expect(publicBrandSources).not.toMatch(
      /evidence boundary|confirmed facts|approved evidence|owner approval|does not claim/i,
    );
  });
});
