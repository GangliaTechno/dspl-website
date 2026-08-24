import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { seedBlogPosts } from '../../src/cms/seedData.js';
import { readSanityEnvironment } from '../../sanity/env.js';
import {
  createSanityImportDocuments,
  serializeSanityImport,
} from '../create-sanity-import.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const envExample = fs.readFileSync(path.join(rootDir, '.env.example'), 'utf8');

describe('Sanity setup contract', () => {
  it('requires the two Studio identifiers with an actionable local-env error', () => {
    expect(readSanityEnvironment({
      SANITY_STUDIO_PROJECT_ID: 'abc123',
      SANITY_STUDIO_DATASET: 'production',
    })).toEqual({ projectId: 'abc123', dataset: 'production' });

    expect(() => readSanityEnvironment({})).toThrow(
      /SANITY_STUDIO_PROJECT_ID.*SANITY_STUDIO_DATASET.*\.env\.local/s,
    );
  });

  it('trims production Studio values and optionally requires build-target equality', () => {
    expect(readSanityEnvironment({
      SANITY_STUDIO_PROJECT_ID: '  abc123  ',
      SANITY_STUDIO_DATASET: ' production ',
      SANITY_PROJECT_ID: ' abc123 ',
      SANITY_DATASET: ' production ',
    })).toEqual({ projectId: 'abc123', dataset: 'production' });

    expect(readSanityEnvironment({
      SANITY_STUDIO_PROJECT_ID: 'abc123',
      SANITY_STUDIO_DATASET: 'production',
    }, {
      buildProjectId: ' abc123 ',
      buildDataset: ' production ',
    })).toEqual({ projectId: 'abc123', dataset: 'production' });

    expect(() => readSanityEnvironment({
      SANITY_STUDIO_PROJECT_ID: 'abc123',
      SANITY_STUDIO_DATASET: 'staging',
    })).toThrow(/production/);

    expect(() => readSanityEnvironment({
      SANITY_STUDIO_PROJECT_ID: 'abc123',
      SANITY_STUDIO_DATASET: 'production',
      SANITY_PROJECT_ID: 'different-project',
      SANITY_DATASET: 'production',
    })).toThrow(/match|disagree/i);
  });

  it('treats optional project and dataset mirrors independently', () => {
    const studio = {
      SANITY_STUDIO_PROJECT_ID: 'abc123',
      SANITY_STUDIO_DATASET: 'production',
    };

    expect(readSanityEnvironment(studio, { buildProjectId: ' abc123 ' }))
      .toEqual({ projectId: 'abc123', dataset: 'production' });
    expect(readSanityEnvironment(studio, { buildDataset: ' production ' }))
      .toEqual({ projectId: 'abc123', dataset: 'production' });
    expect(readSanityEnvironment({ ...studio, SANITY_PROJECT_ID: '   ' }))
      .toEqual({ projectId: 'abc123', dataset: 'production' });
    expect(readSanityEnvironment({ ...studio, SANITY_DATASET: '   ' }))
      .toEqual({ projectId: 'abc123', dataset: 'production' });

    expect(() => readSanityEnvironment(studio, { buildProjectId: 'other-project' }))
      .toThrow(/match|disagree/i);
    expect(() => readSanityEnvironment(studio, { buildDataset: 'staging' }))
      .toThrow(/match|disagree|production/i);
  });

  it('converts only the two approved seeds to stable import documents', () => {
    const documents = createSanityImportDocuments(seedBlogPosts);

    expect(documents.map(({ _id }) => _id)).toEqual([
      'seed-post-coordinating-brand-market-commerce',
      'seed-post-from-packaging-to-purchase',
    ]);
    expect(documents.map(({ slug }) => slug.current)).toEqual([
      'coordinating-brand-market-commerce',
      'from-packaging-to-purchase',
    ]);
    expect(documents.every(({ _type }) => _type === 'blogPost')).toBe(true);
    for (const document of documents) {
      expect(Object.keys(document).sort()).toEqual([
        '_id', '_type', 'body', 'category', 'description', 'publishedAt', 'slug', 'title',
      ]);
      expect(document).not.toHaveProperty('_createdAt');
      expect(document).not.toHaveProperty('_updatedAt');
      expect(document).not.toHaveProperty('_rev');
      expect(document).not.toHaveProperty('mainImage');
    }

    const lines = serializeSanityImport(seedBlogPosts).trimEnd().split('\n');
    expect(lines).toHaveLength(2);
    expect(lines.map(JSON.parse)).toEqual(documents);
  });

  it('uses the authenticated transaction bootstrap and documents non-secret variables', () => {
    expect(packageJson.scripts.studio).toBe('sanity dev --host localhost --port 3333');
    const bootstrapCommand = packageJson.scripts['sanity:bootstrap'];
    expect(bootstrapCommand).toBe(
      'node --env-file-if-exists=.env.local node_modules/sanity/bin/sanity exec scripts/bootstrap-sanity.mjs --with-user-token --',
    );
    expect(bootstrapCommand).toContain('sanity exec scripts/bootstrap-sanity.mjs');
    expect(bootstrapCommand).toContain('--with-user-token');
    expect(bootstrapCommand).not.toMatch(/datasets\s+import|--replace|\.ndjson\b|[<>|]/);
    expect(bootstrapCommand).not.toContain('node_modules/.bin');
    expect(fs.existsSync(path.join(rootDir, 'node_modules', 'sanity', 'bin', 'sanity'))).toBe(true);
    for (const key of [
      'SANITY_STUDIO_PROJECT_ID=',
      'SANITY_STUDIO_DATASET=production',
      'SANITY_PROJECT_ID=',
      'SANITY_DATASET=production',
      'SANITY_API_VERSION=2026-08-20',
    ]) expect(envExample).toContain(key);
    expect(envExample).not.toContain('SANITY_READ_TOKEN=');
  });
});
