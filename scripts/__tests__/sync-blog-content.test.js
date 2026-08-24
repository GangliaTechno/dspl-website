import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { seedBlogPosts } from '../../src/cms/seedData.js';
import {
  createBlogManifest,
  normalizeBlogSlug,
  resolveArticleSnapshotPath,
  resolveBlogSource,
  resolveSanitySyncTarget,
  resolveSyncPolicy,
  runSync,
  validateAndProcessPosts,
  writeBlogSnapshots,
} from '../sync-blog-content.mjs';

const silentLogger = { info: vi.fn(), warn: vi.fn() };
const generatedDir = path.resolve('src/generated');
const generatedBlogDir = path.join(generatedDir, 'blog');

const makeSink = () => ({
  mkdirSync: vi.fn(),
  writeFileSync: vi.fn(),
  readdirSync: vi.fn(() => []),
  unlinkSync: vi.fn(),
});

const makeDirent = (name, { file = true, directory = false, symlink = false } = {}) => ({
  name,
  isFile: vi.fn(() => file),
  isDirectory: vi.fn(() => directory),
  isSymbolicLink: vi.fn(() => symlink),
});

const makeManifest = () => ({
  blogsEnabled: true,
  minimumPosts: 2,
  totalPosts: 2,
  posts: [],
});

const makeArticleMap = () => new Map([
  ['coordinating-brand-market-commerce', { slug: 'coordinating-brand-market-commerce', body: [] }],
  ['from-packaging-to-purchase', { slug: 'from-packaging-to-purchase', body: [] }],
]);

const validSanityEnv = {
  SANITY_STUDIO_PROJECT_ID: 'studio-project',
  SANITY_STUDIO_DATASET: 'production',
  SANITY_PROJECT_ID: 'studio-project',
  SANITY_DATASET: 'production',
  SANITY_API_VERSION: '2026-08-20',
};

const makeRunLogger = () => ({
  info: vi.fn(),
  warn: vi.fn(),
  log: vi.fn(),
});

const makeProcessedPost = (slug, { updatedAt, publishedAt }) => ({
  _id: `post-${slug}`,
  _createdAt: publishedAt,
  _updatedAt: updatedAt,
  slug,
  title: `${slug} title`,
  category: 'Branding',
  publishedAt,
  description: `${slug} description`,
  readingTime: { minutes: 1, text: '1 min read', wordCount: 1 },
  headings: [],
  mainImage: null,
  seo: null,
});

const makePost = (slug) => ({
  _id: `post-${String(slug)}`,
  title: 'Boundary test article',
  slug: { current: slug },
  category: 'Branding',
  publishedAt: '2026-08-20T00:00:00.000Z',
  description: 'A valid description for the boundary test.',
  body: [{ _type: 'block', children: [{ _type: 'span', text: 'Body' }] }],
});

describe('blog content sync source policy', () => {
  it('treats build, production, and CI flags as strict while preserving explicit fallback', () => {
    expect(resolveSyncPolicy({ argv: ['--strict'], env: {} }).strictMode).toBe(true);
    expect(resolveSyncPolicy({ argv: [], env: { NODE_ENV: 'production' } }).strictMode).toBe(true);
    expect(resolveSyncPolicy({ argv: [], env: { CI: 'true' } }).strictMode).toBe(true);
    expect(resolveSyncPolicy({ argv: ['--fallback'], env: { CI: 'true' } })).toEqual({
      fallbackMode: true,
      strictMode: true,
    });
  });

  it('fails closed when strict sync lacks a project identifier', async () => {
    await expect(resolveBlogSource({
      strictMode: true,
      projectId: '',
      fetchPosts: vi.fn(),
      logger: silentLogger,
    })).rejects.toThrow('SANITY_PROJECT_ID environment variable is missing');
  });

  it('fails closed when strict live fetch is inaccessible', async () => {
    await expect(resolveBlogSource({
      strictMode: true,
      projectId: 'abc123',
      fetchPosts: vi.fn().mockRejectedValue(new Error('401 Unauthorized')),
      logger: silentLogger,
    })).rejects.toThrow(/Failed to fetch published Sanity content.*401 Unauthorized/);
  });

  it('warns and falls back only for non-strict local CMS failure', async () => {
    const result = await resolveBlogSource({
      strictMode: false,
      projectId: 'abc123',
      fetchPosts: vi.fn().mockRejectedValue(new Error('offline')),
      logger: silentLogger,
    });
    expect(result).toEqual({ rawPosts: seedBlogPosts, source: 'fallback' });
    expect(silentLogger.warn).toHaveBeenCalledWith(expect.stringMatching(/offline.*fallback/i));
  });

  it('uses published Sanity results when live fetch succeeds', async () => {
    const fetched = [{ _id: 'live-post' }];
    const result = await resolveBlogSource({
      strictMode: true,
      projectId: 'abc123',
      fetchPosts: vi.fn().mockResolvedValue(fetched),
      logger: silentLogger,
    });
    expect(result).toEqual({ rawPosts: fetched, source: 'sanity' });
  });

  it('keeps explicit fallback independent of project and network state', async () => {
    const fetchPosts = vi.fn();
    const result = await resolveBlogSource({
      fallbackMode: true,
      strictMode: true,
      projectId: '',
      fetchPosts,
      logger: silentLogger,
    });
    expect(result).toEqual({ rawPosts: seedBlogPosts, source: 'fallback' });
    expect(fetchPosts).not.toHaveBeenCalled();
  });

  it('returns one trimmed production target when strict configuration is complete', () => {
    expect(resolveSanitySyncTarget({
      SANITY_STUDIO_PROJECT_ID: ' studio-project ',
      SANITY_STUDIO_DATASET: ' production ',
      SANITY_PROJECT_ID: ' studio-project ',
      SANITY_DATASET: ' production ',
      SANITY_API_VERSION: ' 2026-08-20 ',
    }, { strictMode: true })).toEqual({
      projectId: 'studio-project',
      dataset: 'production',
      apiVersion: '2026-08-20',
    });
  });

  it.each([false, true])('uses the complete build trio as the %s-strict target without Studio values', (strictMode) => {
    expect(resolveSanitySyncTarget({
      SANITY_PROJECT_ID: ' build-project ',
      SANITY_DATASET: ' production ',
      SANITY_API_VERSION: ' 2026-08-20 ',
    }, { strictMode })).toEqual({
      projectId: 'build-project',
      dataset: 'production',
      apiVersion: '2026-08-20',
    });
  });

  it('does not use complete Studio values to fill an incomplete build target', () => {
    const studioOnly = {
      SANITY_STUDIO_PROJECT_ID: 'studio-project',
      SANITY_STUDIO_DATASET: 'production',
    };

    expect(resolveSanitySyncTarget(studioOnly, { strictMode: false })).toBeNull();
    expect(() => resolveSanitySyncTarget(studioOnly, { strictMode: true }))
      .toThrow(/SANITY_PROJECT_ID|SANITY_DATASET|SANITY_API_VERSION/);
  });

  it.each([
    'SANITY_PROJECT_ID',
    'SANITY_DATASET',
    'SANITY_API_VERSION',
  ])('rejects strict configuration with missing or whitespace-only %s', (key) => {
    const env = { ...validSanityEnv, [key]: '   ' };

    expect(() => resolveSanitySyncTarget(env, { strictMode: true })).toThrow(new RegExp(key));
  });

  it('allows non-strict fallback only for incomplete configuration', () => {
    expect(resolveSanitySyncTarget({}, { strictMode: false })).toBeNull();
    expect(resolveSanitySyncTarget({
      SANITY_STUDIO_PROJECT_ID: 'studio-project',
      SANITY_STUDIO_DATASET: 'production',
      SANITY_PROJECT_ID: 'studio-project',
      SANITY_DATASET: 'production',
    }, { strictMode: false })).toBeNull();
  });

  it.each([
    ['SANITY_STUDIO_DATASET', 'staging'],
    ['SANITY_DATASET', 'staging'],
    ['SANITY_PROJECT_ID', 'different-project'],
    ['SANITY_DATASET', 'different-dataset'],
  ])('rejects configured target violation %s=%s before fallback', (key, value) => {
    const env = { ...validSanityEnv, [key]: value };

    expect(() => resolveSanitySyncTarget(env, { strictMode: false })).toThrow(/production|match|disagree/i);
  });

  it.each([
    '2026-02-29',
    '2026-04-31',
    '2026-13-01',
    '2026-00-01',
    '2026-8-20',
  ])('rejects impossible or malformed API date %s', (apiVersion) => {
    expect(() => resolveSanitySyncTarget({ ...validSanityEnv, SANITY_API_VERSION: apiVersion }, { strictMode: false }))
      .toThrow(/API version|date/i);
  });

  it('bypasses target validation for explicit fallback', () => {
    expect(resolveSanitySyncTarget({
      SANITY_STUDIO_PROJECT_ID: 'staging-project',
      SANITY_STUDIO_DATASET: 'staging',
      SANITY_PROJECT_ID: 'different-project',
      SANITY_DATASET: 'preview',
      SANITY_API_VERSION: 'not-a-date',
    }, { strictMode: true, fallbackMode: true })).toBeNull();
  });

  it('injects the validated target into the fetcher', async () => {
    const fetchPosts = vi.fn().mockResolvedValue(seedBlogPosts);
    const sink = makeSink();
    const logger = makeRunLogger();

    await runSync({
      argv: ['--strict'],
      env: validSanityEnv,
      fetchPosts,
      sink,
      logger,
      generatedDir,
    });

    expect(fetchPosts).toHaveBeenCalledWith({
      projectId: 'studio-project',
      dataset: 'production',
      apiVersion: '2026-08-20',
    }, validSanityEnv);
  });

  it.each([[], ['--strict']])('passes the trimmed build-only target to fetch in %s mode', async (argv) => {
    const fetchPosts = vi.fn().mockResolvedValue(seedBlogPosts);
    const sink = makeSink();
    const logger = makeRunLogger();
    const env = {
      SANITY_PROJECT_ID: ' build-project ',
      SANITY_DATASET: ' production ',
      SANITY_API_VERSION: ' 2026-08-20 ',
    };

    await runSync({ argv, env, fetchPosts, sink, logger, generatedDir });

    expect(fetchPosts).toHaveBeenCalledWith({
      projectId: 'build-project',
      dataset: 'production',
      apiVersion: '2026-08-20',
    }, env);
  });

  it('rejects an invalid target before fetch or any filesystem sink call', async () => {
    const fetchPosts = vi.fn();
    const sink = makeSink();

    await expect(runSync({
      argv: [],
      env: { ...validSanityEnv, SANITY_DATASET: 'staging' },
      fetchPosts,
      sink,
      logger: makeRunLogger(),
      generatedDir,
    })).rejects.toThrow(/production/i);

    expect(fetchPosts).not.toHaveBeenCalled();
    expect(sink.mkdirSync).not.toHaveBeenCalled();
    expect(sink.writeFileSync).not.toHaveBeenCalled();
    expect(sink.readdirSync).not.toHaveBeenCalled();
    expect(sink.unlinkSync).not.toHaveBeenCalled();
  });
});

describe('CMS slug and article snapshot path boundary', () => {
  it('requires an explicit generated blog directory for snapshot resolution', () => {
    expect(() => resolveArticleSnapshotPath('safe-slug')).toThrow(/explicit blog directory/);
  });

  it.each([
    'coordinating-brand-market-commerce',
    'from-packaging-to-purchase',
  ])('preserves approved slug %s and resolves it to one exact child file', (slug) => {
    const normalized = normalizeBlogSlug(slug);
    const resolved = resolveArticleSnapshotPath(generatedBlogDir, slug);

    expect(normalized).toBe(slug);
    expect(resolved).toBe(path.join(generatedBlogDir, `${slug}.json`));
    expect(path.relative(generatedBlogDir, resolved)).toBe(`${slug}.json`);
    expect(path.dirname(resolved)).toBe(generatedBlogDir);
  });

  it('trims and lowercases uppercase CMS slugs consistently', () => {
    const rawSlug = '  FROM-PACKAGING-TO-PURCHASE  ';

    expect(normalizeBlogSlug(rawSlug)).toBe('from-packaging-to-purchase');
    expect(resolveArticleSnapshotPath(generatedBlogDir, rawSlug)).toBe(
      path.join(generatedBlogDir, 'from-packaging-to-purchase.json'),
    );
    expect(validateAndProcessPosts([makePost(rawSlug)]).processedPosts[0].slug).toBe(
      'from-packaging-to-purchase',
    );
  });

  it('keeps both existing seed CMS documents processable with their canonical slugs', () => {
    const result = validateAndProcessPosts(seedBlogPosts);

    expect(result.processedPosts.map(({ slug }) => slug)).toEqual([
      'coordinating-brand-market-commerce',
      'from-packaging-to-purchase',
    ]);
    expect(Array.from(result.fullArticleMap.keys())).toEqual([
      'coordinating-brand-market-commerce',
      'from-packaging-to-purchase',
    ]);
  });

  it.each([
    ['../../../package', 'forward-slash traversal'],
    ['..\\..\\..\\package', 'backslash traversal'],
    ['nested/path', 'nested slash'],
    ['nested\\path', 'nested backslash'],
    ['.', 'dot alias'],
    ['..', 'dotdot alias'],
    ['slug..json', 'double-dot suffix'],
    ['%2e%2e%2fpackage', 'percent-encoded traversal'],
    ['-leading', 'leading hyphen'],
    ['trailing-', 'trailing hyphen'],
    ['double--hyphen', 'double hyphen'],
    ['   ', 'whitespace-only'],
    ['safe slug', 'embedded whitespace'],
  ])('rejects %s (%s) at the slug boundary', (slug) => {
    expect(() => normalizeBlogSlug(slug)).toThrow(/Invalid blog slug/);
    expect(() => resolveArticleSnapshotPath(generatedBlogDir, slug)).toThrow(/Invalid blog slug/);
  });

  it('rejects overlength slugs after normalization', () => {
    expect(() => normalizeBlogSlug('a'.repeat(97))).toThrow(/Invalid blog slug/);
  });

  it('rejects non-string CMS slug values', () => {
    expect(() => normalizeBlogSlug(null)).toThrow(/Invalid blog slug/);
    expect(() => normalizeBlogSlug({ current: 'safe-slug' })).toThrow(/Invalid blog slug/);
  });

  it.each([
    'con',
    'prn',
    'aux',
    'nul',
    'com1',
    'com2',
    'com3',
    'com4',
    'com5',
    'com6',
    'com7',
    'com8',
    'com9',
    'lpt1',
    'lpt2',
    'lpt3',
    'lpt4',
    'lpt5',
    'lpt6',
    'lpt7',
    'lpt8',
    'lpt9',
  ])('rejects Windows reserved basename %s after normalization', (reservedName) => {
    const rawSlug = `  ${reservedName.toUpperCase()}  `;

    expect(() => normalizeBlogSlug(rawSlug)).toThrow(/reserved Windows device name/);
    expect(() => resolveArticleSnapshotPath(generatedBlogDir, rawSlug)).toThrow(/reserved Windows device name/);
  });

  it.each(['con-article', 'com10', 'lpt10', 'auxiliary', 'prn-file', 'nul-value'])('preserves ordinary Windows reserved-name near-miss %s', (slug) => {
      expect(normalizeBlogSlug(slug)).toBe(slug);
      expect(resolveArticleSnapshotPath(generatedBlogDir, slug)).toBe(
        path.join(generatedBlogDir, `${slug}.json`),
      );
    });
});

describe('preflight-first article snapshot writes', () => {
  it('requires an injected non-call-through filesystem sink', () => {
    expect(() => writeBlogSnapshots({
      generatedDir,
      manifest: makeManifest(),
      fullArticleMap: makeArticleMap(),
    })).toThrow(/sink/);
  });

  it.each([
    ['reserved-only', new Map([['con', { slug: 'con' }]])],
    ['traversal-only', new Map([['../../../package', { slug: '../../../package' }]])],
  ])('rejects %s maps before mkdir or writes', (_label, fullArticleMap) => {
    const sink = makeSink();

    expect(() => writeBlogSnapshots({
      generatedDir,
      manifest: makeManifest(),
      fullArticleMap,
      sink,
      logger: { log: vi.fn() },
    })).toThrow();
    expect(sink.mkdirSync).not.toHaveBeenCalled();
    expect(sink.writeFileSync).not.toHaveBeenCalled();
  });

  it.each([
    ['safe-then-traversal', '../../../package'],
    ['safe-then-reserved', 'con'],
  ])('preflights every map entry for %s before any sink call', (_label, invalidSlug) => {
    const sink = makeSink();
    const fullArticleMap = new Map([
      ['coordinating-brand-market-commerce', { slug: 'coordinating-brand-market-commerce' }],
      [invalidSlug, { slug: invalidSlug }],
    ]);

    expect(() => writeBlogSnapshots({
      generatedDir,
      manifest: makeManifest(),
      fullArticleMap,
      sink,
      logger: { log: vi.fn() },
    })).toThrow();
    expect(sink.mkdirSync).not.toHaveBeenCalled();
    expect(sink.writeFileSync).not.toHaveBeenCalled();
  });

  it('writes two immediate article children and the manifest exactly once after preflight', () => {
    const sink = makeSink();
    const logger = { log: vi.fn() };
    const manifest = makeManifest();
    const fullArticleMap = makeArticleMap();

    writeBlogSnapshots({ generatedDir, manifest, fullArticleMap, sink, logger });

    expect(sink.mkdirSync).toHaveBeenCalledTimes(1);
    expect(sink.mkdirSync).toHaveBeenCalledWith(generatedBlogDir, { recursive: true });
    expect(sink.readdirSync).toHaveBeenCalledWith(generatedBlogDir, { withFileTypes: true });
    expect(sink.unlinkSync).not.toHaveBeenCalled();
    expect(sink.writeFileSync).toHaveBeenCalledTimes(3);
    expect(sink.writeFileSync).toHaveBeenNthCalledWith(
      1,
      path.join(generatedBlogDir, 'coordinating-brand-market-commerce.json'),
      JSON.stringify(fullArticleMap.get('coordinating-brand-market-commerce'), null, 2),
      'utf8',
    );
    expect(sink.writeFileSync).toHaveBeenNthCalledWith(
      2,
      path.join(generatedBlogDir, 'from-packaging-to-purchase.json'),
      JSON.stringify(fullArticleMap.get('from-packaging-to-purchase'), null, 2),
      'utf8',
    );
    expect(sink.writeFileSync).toHaveBeenNthCalledWith(
      3,
      path.join(generatedDir, 'blogManifest.json'),
      JSON.stringify(manifest, null, 2),
      'utf8',
    );
    for (const [articlePath] of sink.writeFileSync.mock.calls.slice(0, 2)) {
      expect(path.dirname(articlePath)).toBe(generatedBlogDir);
    }
  });

  it('reconciles stale JSON in lexical order while preserving direct non-JSON notes', () => {
    const sink = makeSink();
    const events = [];
    sink.readdirSync.mockReturnValue([
      makeDirent('from-packaging-to-purchase.json'),
      makeDirent('obsolete-zeta.json'),
      makeDirent('notes.txt'),
      makeDirent('coordinating-brand-market-commerce.json'),
      makeDirent('obsolete-alpha.json'),
    ]);
    sink.mkdirSync.mockImplementation(() => events.push('mkdir'));
    sink.writeFileSync.mockImplementation((target) => events.push(`write:${path.basename(target)}`));
    sink.unlinkSync.mockImplementation((target) => events.push(`unlink:${path.basename(target)}`));

    writeBlogSnapshots({
      generatedDir,
      manifest: makeManifest(),
      fullArticleMap: makeArticleMap(),
      sink,
      logger: { log: vi.fn() },
    });

    expect(events).toEqual([
      'mkdir',
      'write:coordinating-brand-market-commerce.json',
      'write:from-packaging-to-purchase.json',
      'unlink:obsolete-alpha.json',
      'unlink:obsolete-zeta.json',
      'write:blogManifest.json',
    ]);
    expect(sink.unlinkSync).not.toHaveBeenCalledWith(path.join(generatedBlogDir, 'notes.txt'));
  });

  it('keeps a direct package.json stale path contained inside the blog directory', () => {
    const sink = makeSink();
    sink.readdirSync.mockReturnValue([makeDirent('package.json')]);

    writeBlogSnapshots({
      generatedDir,
      manifest: makeManifest(),
      fullArticleMap: makeArticleMap(),
      sink,
      logger: { log: vi.fn() },
    });

    expect(sink.unlinkSync).toHaveBeenCalledWith(path.join(generatedBlogDir, 'package.json'));
    expect(path.relative(generatedBlogDir, sink.unlinkSync.mock.calls[0][0])).toBe('package.json');
  });

  it.each([
    ['malformed JSON name', makeDirent('obsolete.bad.json')],
    ['uppercase JSON name', makeDirent('OBSOLETE.JSON')],
    ['reserved JSON name', makeDirent('con.json')],
    ['forward-slash JSON name', makeDirent('nested/path.json')],
    ['backslash JSON name', makeDirent('nested\\path.json')],
    ['JSON directory', makeDirent('obsolete.json', { file: false, directory: true })],
    ['JSON symlink', makeDirent('obsolete.json', { file: false, symlink: true })],
  ])('rejects %s before any mutation', (_label, entry) => {
    const sink = makeSink();
    sink.readdirSync.mockReturnValue([entry]);

    expect(() => writeBlogSnapshots({
      generatedDir,
      manifest: makeManifest(),
      fullArticleMap: makeArticleMap(),
      sink,
      logger: { log: vi.fn() },
    })).toThrow();
    expect(sink.mkdirSync).not.toHaveBeenCalled();
    expect(sink.writeFileSync).not.toHaveBeenCalled();
    expect(sink.unlinkSync).not.toHaveBeenCalled();
  });

  it('treats a missing blog directory as empty during preflight', () => {
    const sink = makeSink();
    const missingDirectory = new Error('blog directory missing');
    missingDirectory.code = 'ENOENT';
    sink.readdirSync.mockImplementation(() => { throw missingDirectory; });

    writeBlogSnapshots({
      generatedDir,
      manifest: makeManifest(),
      fullArticleMap: makeArticleMap(),
      sink,
      logger: { log: vi.fn() },
    });

    expect(sink.mkdirSync).toHaveBeenCalledTimes(1);
    expect(sink.unlinkSync).not.toHaveBeenCalled();
  });

  it('propagates a non-ENOENT inventory read failure before mutation', () => {
    const sink = makeSink();
    const readFailure = new Error('permission denied');
    readFailure.code = 'EACCES';
    sink.readdirSync.mockImplementation(() => { throw readFailure; });

    expect(() => writeBlogSnapshots({
      generatedDir,
      manifest: makeManifest(),
      fullArticleMap: makeArticleMap(),
      sink,
      logger: { log: vi.fn() },
    })).toThrow('permission denied');
    expect(sink.mkdirSync).not.toHaveBeenCalled();
    expect(sink.writeFileSync).not.toHaveBeenCalled();
    expect(sink.unlinkSync).not.toHaveBeenCalled();
  });

  it('propagates unlink failure without writing the manifest or rolling back articles', () => {
    const sink = makeSink();
    sink.readdirSync.mockReturnValue([makeDirent('obsolete.json')]);
    sink.unlinkSync.mockImplementation(() => { throw new Error('unlink failed'); });

    expect(() => writeBlogSnapshots({
      generatedDir,
      manifest: makeManifest(),
      fullArticleMap: makeArticleMap(),
      sink,
      logger: { log: vi.fn() },
    })).toThrow('unlink failed');
    expect(sink.writeFileSync).toHaveBeenCalledTimes(2);
    expect(sink.writeFileSync.mock.calls.map(([target]) => path.basename(target))).toEqual([
      'coordinating-brand-market-commerce.json',
      'from-packaging-to-purchase.json',
    ]);
  });

  it.each([
    ['cyclic manifest', (() => { const value = {}; value.self = value; return value; })()],
    ['BigInt article', new Map([
      ['coordinating-brand-market-commerce', { slug: 'coordinating-brand-market-commerce', value: 1n }],
    ])],
  ])('rejects %s before any mutation', (_label, value) => {
    const sink = makeSink();
    const manifest = value instanceof Map ? makeManifest() : value;
    const fullArticleMap = value instanceof Map ? value : makeArticleMap();

    expect(() => writeBlogSnapshots({
      generatedDir,
      manifest,
      fullArticleMap,
      sink,
      logger: { log: vi.fn() },
    })).toThrow();
    expect(sink.mkdirSync).not.toHaveBeenCalled();
    expect(sink.writeFileSync).not.toHaveBeenCalled();
    expect(sink.unlinkSync).not.toHaveBeenCalled();
  });

  it('converges on a second run using only non-call-through fake sink functions', () => {
    let inventory = [
      'coordinating-brand-market-commerce.json',
      'from-packaging-to-purchase.json',
      'obsolete.json',
    ];
    const sink = makeSink();
    sink.readdirSync.mockImplementation(() => inventory.map((name) => makeDirent(name)));
    sink.writeFileSync.mockImplementation((target) => {
      const name = path.basename(target);
      if (path.dirname(target) === generatedBlogDir && !inventory.includes(name)) inventory.push(name);
    });
    sink.unlinkSync.mockImplementation((target) => {
      inventory = inventory.filter((name) => name !== path.basename(target));
    });

    const write = () => writeBlogSnapshots({
      generatedDir,
      manifest: makeManifest(),
      fullArticleMap: makeArticleMap(),
      sink,
      logger: { log: vi.fn() },
    });

    write();
    write();

    expect(inventory.sort()).toEqual([
      'coordinating-brand-market-commerce.json',
      'from-packaging-to-purchase.json',
    ].sort());
    expect(sink.unlinkSync).toHaveBeenCalledTimes(1);
    expect(sink.readdirSync).toHaveBeenCalledTimes(2);
  });
});

describe('deterministic blog manifest provenance', () => {
  it.each([
    '2026-08-24T10:00:00Z',
    '2026-08-24T10:00:00.123Z',
    '2026-08-24T10:00:00+05:30',
    '2026-08-24T10:00:00-04:00',
    '2024-02-29T10:00:00Z',
  ])('accepts strict RFC3339 timestamp %s', (publishedAt) => {
    expect(() => createBlogManifest([
      makeProcessedPost('strict-timestamp', {
        updatedAt: publishedAt,
        publishedAt,
      }),
    ])).not.toThrow();
  });

  it.each([
    '2026-08-24',
    '08/24/2026 10:00:00Z',
    '2026-08-24 10:00:00Z',
    '2026-08-24T24:00:00Z',
    '2026-08-24T10:60:00Z',
    '2026-08-24T10:00:60Z',
    '2026-08-24T10:00:00+24:00',
    '2026-08-24T10:00:00+05:60',
    '2026-08-24T10:00:00-00:00',
    '2025-02-29T10:00:00Z',
    '2026-04-31T10:00:00Z',
  ])('rejects non-strict or impossible RFC3339 timestamp %s', (timestamp) => {
    expect(() => createBlogManifest([
      makeProcessedPost('invalid-timestamp', {
        updatedAt: timestamp,
        publishedAt: '2026-08-20T00:00:00Z',
      }),
    ])).toThrow(/timestamp/i);
  });

  it.each(['_createdAt', '_updatedAt'])('rejects invalid provided %s before processing', (field) => {
    expect(() => validateAndProcessPosts([{
      ...makePost(field === '_createdAt' ? 'invalid-created-at' : 'invalid-updated-at'),
      [field]: '2026-08-24 10:00:00Z',
    }])).toThrow(/timestamp|date/i);
  });

  it('orders the newest publication first and uses ASCII slug/id ties independent of input order', () => {
    const posts = [
      makeProcessedPost('zeta-older', {
        updatedAt: '2026-08-25T00:00:00Z',
        publishedAt: '2026-08-23T00:00:00Z',
      }),
      makeProcessedPost('newest-feature', {
        updatedAt: '2026-08-24T00:00:00Z',
        publishedAt: '2026-08-25T00:00:00Z',
      }),
      makeProcessedPost('alpha-tie', {
        updatedAt: '2026-08-24T00:00:00Z',
        publishedAt: '2026-08-24T00:00:00Z',
      }),
      { ...makeProcessedPost('same-tie', {
        updatedAt: '2026-08-24T00:00:00Z',
        publishedAt: '2026-08-24T00:00:00Z',
      }), _id: 'post-b' },
      { ...makeProcessedPost('same-tie', {
        updatedAt: '2026-08-24T00:00:00Z',
        publishedAt: '2026-08-24T00:00:00Z',
      }), _id: 'post-a' },
    ];

    const first = createBlogManifest(posts);
    const second = createBlogManifest([...posts].reverse());

    expect(first).toEqual(second);
    expect(first.posts.map(({ slug, _id }) => `${slug}:${_id}`)).toEqual([
      'newest-feature:post-newest-feature',
      'alpha-tie:post-alpha-tie',
      'same-tie:post-a',
      'same-tie:post-b',
      'zeta-older:post-zeta-older',
    ]);
  });

  it('serializes identical processed posts identically across clock changes and input order', () => {
    const posts = [
      makeProcessedPost('older-post', {
        updatedAt: '2026-08-20T04:30:00.000Z',
        publishedAt: '2026-08-19T04:30:00.000Z',
      }),
      makeProcessedPost('latest-post', {
        updatedAt: '2026-08-24T04:30:00.000Z',
        publishedAt: '2026-08-23T04:30:00.000Z',
      }),
    ];

    vi.useFakeTimers();
    try {
      vi.setSystemTime(new Date('2035-01-01T00:00:00.000Z'));
      const first = JSON.stringify(createBlogManifest(posts));
      vi.setSystemTime(new Date('2045-01-01T00:00:00.000Z'));
      const second = JSON.stringify(createBlogManifest([...posts].reverse()));

      expect(second).toBe(first);
      expect(JSON.parse(first)).toMatchObject({
        sourceUpdatedAt: '2026-08-24T04:30:00.000Z',
        totalPosts: 2,
      });
      expect(JSON.parse(first)).not.toHaveProperty('syncedAt');
    } finally {
      vi.useRealTimers();
    }
  });

  it('uses the latest valid updated or published timestamp and normalizes it to ISO', () => {
    const manifest = createBlogManifest([
      makeProcessedPost('published-fallback', {
        updatedAt: '',
        publishedAt: '2026-08-24T10:00:00+05:30',
      }),
      makeProcessedPost('updated-latest', {
        updatedAt: '2026-08-24T01:00:00-04:00',
        publishedAt: '2026-08-23T00:00:00.000Z',
      }),
    ]);

    expect(manifest.sourceUpdatedAt).toBe('2026-08-24T05:00:00.000Z');
  });

  it('uses a newer publication timestamp when it exceeds the source update timestamp', () => {
    const manifest = createBlogManifest([
      makeProcessedPost('newer-publication', {
        updatedAt: '2026-08-23T00:00:00Z',
        publishedAt: '2026-08-24T00:00:00Z',
      }),
    ]);

    expect(manifest.sourceUpdatedAt).toBe('2026-08-24T00:00:00.000Z');
  });

  it('fails closed when a selected source timestamp is invalid', () => {
    expect(() => createBlogManifest([
      makeProcessedPost('invalid-updated', {
        updatedAt: 'not-a-timestamp',
        publishedAt: '2026-08-20T00:00:00.000Z',
      }),
    ])).toThrow(/timestamp/i);

    expect(() => createBlogManifest([
      makeProcessedPost('invalid-published', {
        updatedAt: '',
        publishedAt: 'not-a-timestamp',
      }),
    ])).toThrow(/timestamp/i);
  });

  it('uses null provenance for empty input and never emits the legacy field', () => {
    const manifest = createBlogManifest([]);

    expect(manifest).toEqual({
      sourceUpdatedAt: null,
      blogsEnabled: false,
      minimumPosts: 2,
      totalPosts: 0,
      posts: [],
    });
    expect(manifest).not.toHaveProperty('syncedAt');
  });
});
