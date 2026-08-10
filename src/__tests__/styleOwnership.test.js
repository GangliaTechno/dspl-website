import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const readSource = (relativePath) => readFileSync(resolve(relativePath), 'utf8');

describe('eager stylesheet ownership', () => {
  it('owns shared section primitives in the eager stylesheet', () => {
    const indexCss = readSource('src/index.css');
    const aboutCss = readSource('src/pages/About.css');
    const serviceCss = readSource('src/components/ServicePage.css');

    for (const selector of [
      '.section-header',
      '.section-subtitle',
      '.section-title',
      '.section-title-description',
    ]) {
      expect(indexCss).toContain(selector);
      expect(aboutCss).not.toMatch(new RegExp(`^\\${selector}\\s*\\{`, 'm'));
      expect(serviceCss).not.toMatch(new RegExp(`^\\${selector}\\s*\\{`, 'm'));
    }

    expect(indexCss).toMatch(/@media\s*\(max-width:\s*768px\)[\s\S]*?\.section\s*\{[^}]*padding:\s*4rem 0;/);
    expect(indexCss).not.toContain('.section { padding: 4rem 1rem; }');
  });

  it('keeps field primitives global and component state selectors owned by their route', () => {
    const indexCss = readSource('src/index.css');
    const contactCss = readSource('src/pages/Contact.css');
    const modalCss = readSource('src/components/WorkWithUsModal.css');

    for (const selector of [
      '.form-group',
      '.form-label',
      '.form-input',
      'select.form-input',
      'select.form-input option',
      ".form-input[aria-invalid='true']",
      '.form-error-text',
    ]) {
      expect(indexCss).toContain(selector);
    }

    for (const selector of [
      'form-row',
      'half-width',
      'form-select',
      'error-text',
      'submit-btn',
      'success-state',
      'success-icon',
      'submit-error-banner',
    ]) {
      expect(contactCss).not.toMatch(new RegExp(`^\\.${selector}\\b`, 'm'));
      expect(modalCss).not.toMatch(new RegExp(`^\\.${selector}\\b`, 'm'));
    }
  });
});
