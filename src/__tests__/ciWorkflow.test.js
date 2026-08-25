import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('CI workflow', () => {
  it('builds from fallback content while Sanity is dormant', () => {
    const workflow = readFileSync(resolve('.github/workflows/ci.yml'), 'utf8');

    expect(workflow).toContain('run: npm run build:fallback');
    expect(workflow).not.toMatch(/^\s*run:\s+npm run build\s*$/m);
  });
});
