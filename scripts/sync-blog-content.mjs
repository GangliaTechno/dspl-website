import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import { seedBlogPosts } from '../src/cms/seedData.js';
import {
  calculateReadingTime,
  extractHeadingsFromBlocks,
} from '../src/utils/publicationUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const BLOG_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const BLOG_SLUG_MAX_LENGTH = 96;
const WINDOWS_RESERVED_BASENAMES = new Set([
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
]);

export function normalizeBlogSlug(value) {
  const slug = typeof value === 'string' ? value.trim().toLowerCase() : '';

  if (slug.length > BLOG_SLUG_MAX_LENGTH || !BLOG_SLUG_PATTERN.test(slug)) {
    throw new Error('Invalid blog slug: expected lowercase ASCII kebab-case with a maximum of 96 characters.');
  }
  if (WINDOWS_RESERVED_BASENAMES.has(slug)) {
    throw new Error('Invalid blog slug: reserved Windows device name is not allowed.');
  }

  return slug;
}

export function resolveArticleSnapshotPath(blogDir, value) {
  if (typeof blogDir !== 'string' || !blogDir.trim() || typeof value !== 'string') {
    throw new Error('Article snapshot path requires an explicit blog directory and slug.');
  }

  const slug = normalizeBlogSlug(value);
  const resolvedBlogDir = path.resolve(blogDir);
  const articlePath = path.resolve(resolvedBlogDir, `${slug}.json`);
  const relativePath = path.relative(resolvedBlogDir, articlePath);
  const isOwnChild =
    relativePath &&
    !path.isAbsolute(relativePath) &&
    relativePath !== '..' &&
    !relativePath.startsWith(`..${path.sep}`) &&
    path.dirname(relativePath) === '.';

  if (!isOwnChild) {
    throw new Error('Invalid article snapshot path: output must remain inside the generated blog directory.');
  }

  return articlePath;
}

function serializeSnapshot(value, label) {
  try {
    const serialized = JSON.stringify(value, null, 2);
    if (typeof serialized !== 'string') {
      throw new Error(`Unable to serialize ${label}.`);
    }
    return serialized;
  } catch (cause) {
    if (cause?.message === `Unable to serialize ${label}.`) {
      throw cause;
    }
    throw new Error(`Unable to serialize ${label}.`, { cause });
  }
}

function compareSnapshotPaths(left, right) {
  if (left === right) return 0;
  return left < right ? -1 : 1;
}

function readSnapshotInventory(sink, blogDir, desiredArticlePaths) {
  let entries;
  try {
    entries = sink.readdirSync(blogDir, { withFileTypes: true });
  } catch (cause) {
    if (cause?.code === 'ENOENT') return [];
    throw cause;
  }

  if (!Array.isArray(entries)) {
    throw new Error('Snapshot directory inventory must be an array.');
  }

  const resolvedBlogDir = path.resolve(blogDir);
  const stalePaths = [];
  for (const entry of entries) {
    const entryName = entry?.name;
    if (typeof entryName !== 'string' || !entryName.toLowerCase().endsWith('.json')) {
      continue;
    }

    if (entryName !== entryName.toLowerCase() || !entryName.endsWith('.json')) {
      throw new Error('Invalid JSON snapshot inventory entry: filename must be lowercase canonical JSON.');
    }

    const slug = entryName.slice(0, -'.json'.length);
    let articlePath;
    try {
      articlePath = resolveArticleSnapshotPath(resolvedBlogDir, slug);
    } catch (cause) {
      throw new Error('Invalid JSON snapshot inventory entry.', { cause });
    }

    if (
      path.dirname(articlePath) !== resolvedBlogDir
      || path.basename(articlePath) !== entryName
      || typeof entry.isSymbolicLink !== 'function'
      || entry.isSymbolicLink()
      || typeof entry.isFile !== 'function'
      || !entry.isFile()
      || typeof entry.isDirectory !== 'function'
      || entry.isDirectory()
    ) {
      throw new Error('Invalid JSON snapshot inventory entry: expected a regular direct child file.');
    }

    if (!desiredArticlePaths.has(articlePath)) stalePaths.push(articlePath);
  }

  return stalePaths.sort(compareSnapshotPaths);
}

export function planBlogSnapshotWrites({
  generatedDir,
  manifest,
  fullArticleMap,
  sink,
  logger = console,
} = {}) {
  if (typeof generatedDir !== 'string' || !generatedDir.trim()) {
    throw new Error('A generated directory is required.');
  }
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new Error('A manifest object is required.');
  }
  if (!(fullArticleMap instanceof Map)) {
    throw new Error('An article map is required.');
  }
  if (
    !sink
    || typeof sink.mkdirSync !== 'function'
    || typeof sink.writeFileSync !== 'function'
    || typeof sink.readdirSync !== 'function'
    || typeof sink.unlinkSync !== 'function'
  ) {
    throw new Error('An injected filesystem sink is required.');
  }
  if (!logger || typeof logger.log !== 'function') {
    throw new Error('A logger with a log function is required.');
  }

  const resolvedGeneratedDir = path.resolve(generatedDir);
  const blogDir = path.resolve(resolvedGeneratedDir, 'blog');
  const manifestPath = path.resolve(resolvedGeneratedDir, 'blogManifest.json');
  const manifestPayload = serializeSnapshot(manifest, 'manifest');
  const articleWrites = [];
  const desiredArticlePaths = new Set();

  for (const [slug, fullArticle] of fullArticleMap.entries()) {
    const articlePath = resolveArticleSnapshotPath(blogDir, slug);
    if (desiredArticlePaths.has(articlePath)) {
      throw new Error('Duplicate article snapshot path detected.');
    }
    const articlePayload = serializeSnapshot(fullArticle, 'article snapshot');
    articleWrites.push({ articlePath, articlePayload });
    desiredArticlePaths.add(articlePath);
  }

  articleWrites.sort((left, right) => compareSnapshotPaths(left.articlePath, right.articlePath));
  const stalePaths = readSnapshotInventory(sink, blogDir, desiredArticlePaths);

  return {
    blogDir,
    manifestPath,
    manifestPayload,
    articleWrites,
    stalePaths,
  };
}

export function writeBlogSnapshots({
  generatedDir,
  manifest,
  fullArticleMap,
  sink,
  logger = console,
} = {}) {
  const plan = planBlogSnapshotWrites({ generatedDir, manifest, fullArticleMap, sink, logger });

  sink.mkdirSync(plan.blogDir, { recursive: true });
  for (const { articlePath, articlePayload } of plan.articleWrites) {
    sink.writeFileSync(articlePath, articlePayload, 'utf8');
    logger.log(`✔ Wrote article snapshot to ${path.relative(rootDir, articlePath)}.`);
  }

  for (const stalePath of plan.stalePaths) {
    sink.unlinkSync(stalePath);
    logger.log(`✔ Removed stale article snapshot at ${path.relative(rootDir, stalePath)}.`);
  }

  sink.writeFileSync(plan.manifestPath, plan.manifestPayload, 'utf8');
  logger.log(`✔ Wrote manifest to ${path.relative(rootDir, plan.manifestPath)} (blogsEnabled: ${manifest.blogsEnabled}, ${manifest.totalPosts} posts).`);
}

export function resolveSyncPolicy({ argv = [], env = {} } = {}) {
  const fallbackMode = argv.includes('--fallback') || env.SANITY_SYNC_MODE === 'fallback';
  const ciEnabled = Boolean(env.CI) && !['0', 'false'].includes(String(env.CI).toLowerCase());
  const strictMode = argv.includes('--strict') || env.NODE_ENV === 'production' || ciEnabled;
  return { fallbackMode, strictMode };
}

const ALLOWED_CATEGORIES = new Set(['Branding', 'Marketing', 'E-commerce', 'Compliance']);
const BLOG_MINIMUM_POSTS = 2;
const RFC3339_TIMESTAMP_PATTERN = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

const trimEnvironmentValue = (value) => (typeof value === 'string' ? value.trim() : '');

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInMonth(year, month) {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function isRealApiVersion(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split('-').map(Number);
  return year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month);
}

export function resolveSanitySyncTarget(
  env = process.env,
  { strictMode = false, fallbackMode = false } = {},
) {
  if (fallbackMode) return null;

  const studioProjectId = trimEnvironmentValue(env.SANITY_STUDIO_PROJECT_ID);
  const studioDataset = trimEnvironmentValue(env.SANITY_STUDIO_DATASET);
  const projectId = trimEnvironmentValue(env.SANITY_PROJECT_ID);
  const dataset = trimEnvironmentValue(env.SANITY_DATASET);
  const apiVersion = trimEnvironmentValue(env.SANITY_API_VERSION);

  if (studioDataset && studioDataset !== 'production') {
    throw new Error('SANITY_STUDIO_DATASET must be exactly production.');
  }
  if (dataset && dataset !== 'production') {
    throw new Error('SANITY_DATASET must be exactly production.');
  }
  if (studioProjectId && projectId && studioProjectId !== projectId) {
    throw new Error('Sanity Studio and build project IDs must match.');
  }
  if (studioDataset && dataset && studioDataset !== dataset) {
    throw new Error('Sanity Studio and build datasets must match.');
  }
  if (apiVersion && !isRealApiVersion(apiVersion)) {
    throw new Error('SANITY_API_VERSION must be a real YYYY-MM-DD calendar date.');
  }

  const missing = [
    !projectId && 'SANITY_PROJECT_ID',
    !dataset && 'SANITY_DATASET',
    !apiVersion && 'SANITY_API_VERSION',
  ].filter(Boolean);

  if (missing.length > 0) {
    if (strictMode) {
      throw new Error(`Sanity sync target is incomplete: missing ${missing.join(', ')}.`);
    }
    return null;
  }

  return {
    projectId,
    dataset,
    apiVersion,
  };
}

function parseStrictRfc3339Timestamp(value, label = 'timestamp') {
  const match = typeof value === 'string' ? value.match(RFC3339_TIMESTAMP_PATTERN) : null;
  if (!match) {
    throw new Error(`Invalid ${label} timestamp; expected strict RFC3339.`);
  }

  const [, yearText, monthText, dayText, hourText, minuteText, secondText, , offset] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);
  const offsetMatch = offset === 'Z' ? null : offset.match(/^[+-](\d{2}):(\d{2})$/);
  const offsetHour = offsetMatch ? Number(offsetMatch[1]) : 0;
  const offsetMinute = offsetMatch ? Number(offsetMatch[2]) : 0;

  if (
    month < 1 || month > 12
    || day < 1 || day > daysInMonth(year, month)
    || hour > 23
    || minute > 59
    || second > 59
    || offset === '-00:00'
    || (offsetMatch && (offsetHour > 23 || offsetMinute > 59))
  ) {
    throw new Error(`Invalid ${label} timestamp; expected strict RFC3339.`);
  }

  const milliseconds = Date.parse(value);
  if (Number.isNaN(milliseconds)) {
    throw new Error(`Invalid ${label} timestamp; expected strict RFC3339.`);
  }

  return {
    milliseconds,
    iso: new Date(milliseconds).toISOString(),
  };
}

function hasPresentTimestamp(record, key) {
  const value = record?.[key];
  return value !== undefined
    && value !== null
    && !(typeof value === 'string' && value.trim() === '');
}

function normalizeProcessedPost(post) {
  if (!post || typeof post !== 'object' || Array.isArray(post)) {
    throw new Error('Invalid processed blog post timestamp.');
  }

  const slug = normalizeBlogSlug(post.slug);
  const publishedAt = parseStrictRfc3339Timestamp(post.publishedAt, 'publishedAt');
  const createdAt = hasPresentTimestamp(post, '_createdAt')
    ? parseStrictRfc3339Timestamp(post._createdAt, '_createdAt')
    : publishedAt;
  const updatedAt = hasPresentTimestamp(post, '_updatedAt')
    ? parseStrictRfc3339Timestamp(post._updatedAt, '_updatedAt')
    : publishedAt;

  return {
    post: {
      ...post,
      slug,
      _createdAt: createdAt.iso,
      _updatedAt: updatedAt.iso,
      publishedAt: publishedAt.iso,
    },
    publishedAt,
    sourceUpdatedAt: {
      milliseconds: Math.max(publishedAt.milliseconds, updatedAt.milliseconds),
      iso: publishedAt.milliseconds >= updatedAt.milliseconds ? publishedAt.iso : updatedAt.iso,
    },
  };
}

export async function resolveBlogSource({
  fallbackMode = false,
  strictMode = false,
  target = null,
  projectId,
  env = process.env,
  fetchPosts,
  fallbackPosts = seedBlogPosts,
  logger = console,
}) {
  if (fallbackMode) {
    logger.info('Using explicit bundled seed/fallback dataset.');
    return { rawPosts: fallbackPosts, source: 'fallback' };
  }

  const resolvedProjectId = target?.projectId || projectId;
  if (!resolvedProjectId) {
    const error = new Error('SANITY_PROJECT_ID environment variable is missing.');
    if (strictMode) throw error;
    logger.warn(`${error.message} Using local fallback because strict mode is not enabled.`);
    return { rawPosts: fallbackPosts, source: 'fallback' };
  }

  try {
    return { rawPosts: await fetchPosts(target, env), source: 'sanity' };
  } catch (cause) {
    const message = cause?.message || String(cause);
    if (strictMode) throw new Error(`Failed to fetch published Sanity content: ${message}`, { cause });
    logger.warn(`Failed to fetch published Sanity content (${message}); using local fallback because strict mode is not enabled.`);
    return { rawPosts: fallbackPosts, source: 'fallback' };
  }
}

async function fetchFromSanity(target, env = process.env) {
  if (!target?.projectId || !target.dataset || !target.apiVersion) {
    throw new Error('A validated Sanity sync target is required.');
  }

  const client = createClient({
    projectId: target.projectId,
    dataset: target.dataset,
    apiVersion: target.apiVersion,
    useCdn: false,
    perspective: 'published',
    token: env.SANITY_READ_TOKEN || undefined,
  });

  const query = `*[ _type == "blogPost" && defined(slug.current) && publishedAt <= $now ] | order(publishedAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    category,
    publishedAt,
    description,
    authors[]{ _key, name, role },
    readingTimeMinutes,
    faqs[]{ _key, question, answer },
    references[]{ _key, text, url },
    closingCta{ heading, text, label, href },
    mainImage{
      alt,
      caption,
      asset->{
        _id,
        url,
        metadata{ dimensions{ width, height } }
      }
    },
    body,
    seo{
      metaTitle,
      metaDescription,
      ogImage{
        alt,
        asset->{
          _id,
          url
        }
      }
    }
  }`;

  const now = new Date().toISOString();
  return client.fetch(query, { now });
}

function normalizeSeoOgImage(seo) {
  if (!seo) return null;
  const rawOg = seo.ogImage;
  const url = typeof rawOg === 'string' ? rawOg : rawOg?.asset?.url || null;
  return {
    ...seo,
    ogImage: url,
  };
}

function resolveReadingTime(raw, body) {
  const override = raw.readingTimeMinutes;
  if (override === undefined || override === null) {
    return calculateReadingTime(body);
  }
  if (!Number.isInteger(override) || override <= 0) {
    throw new Error(
      `Invalid readingTimeMinutes for post "${raw.title || 'unknown'}": expected a positive integer, got ${JSON.stringify(override)}.`,
    );
  }
  const auto = calculateReadingTime(body);
  return {
    minutes: override,
    text: `${override} min read`,
    wordCount: auto.wordCount,
  };
}

export function validateAndProcessPosts(rawPosts) {
  if (!Array.isArray(rawPosts)) {
    throw new Error('Expected an array of blog posts from content source.');
  }

  const seenSlugs = new Set();
  const processedPosts = [];
  const fullArticleMap = new Map();

  for (const raw of rawPosts) {
    const title = typeof raw.title === 'string' ? raw.title.trim() : '';
    if (!title) {
      throw new Error(`Article with ID "${raw._id || 'unknown'}" is missing a title.`);
    }

    const rawSlug = typeof raw.slug === 'object' ? raw.slug?.current : raw.slug;
    const slug = normalizeBlogSlug(rawSlug);

    if (seenSlugs.has(slug)) {
      throw new Error(`Duplicate slug detected: "${slug}". Slugs must be unique across all articles.`);
    }
    seenSlugs.add(slug);

    const category = typeof raw.category === 'string' ? raw.category.trim() : '';
    if (!ALLOWED_CATEGORIES.has(category)) {
      throw new Error(
        `Article "${title}" has invalid category "${category}". Allowed: ${Array.from(ALLOWED_CATEGORIES).join(', ')}.`,
      );
    }

    const publishedAt = parseStrictRfc3339Timestamp(raw.publishedAt, 'publishedAt').iso;
    const createdAt = hasPresentTimestamp(raw, '_createdAt')
      ? parseStrictRfc3339Timestamp(raw._createdAt, '_createdAt').iso
      : publishedAt;
    const updatedAt = hasPresentTimestamp(raw, '_updatedAt')
      ? parseStrictRfc3339Timestamp(raw._updatedAt, '_updatedAt').iso
      : publishedAt;

    const description = typeof raw.description === 'string' ? raw.description.trim() : '';
    if (!description) {
      throw new Error(`Article "${title}" is missing a description/standfirst.`);
    }

    if (!Array.isArray(raw.body) || raw.body.length === 0) {
      throw new Error(`Article "${title}" has an empty or invalid body.`);
    }

    // Validate dataTable row cell counts against header count
    for (const block of raw.body) {
      if (block?._type === 'dataTable') {
        const headerCount = Array.isArray(block.headers) ? block.headers.length : 0;
        if (Array.isArray(block.rows)) {
          block.rows.forEach((row, ri) => {
            const cellCount = Array.isArray(row.cells) ? row.cells.length : 0;
            if (cellCount !== headerCount) {
              throw new Error(
                `Article "${title}": dataTable row ${ri} has ${cellCount} cells but headers define ${headerCount} columns.`,
              );
            }
          });
        }
      }
    }

    // Validate authors when present
    if (raw.authors !== undefined && raw.authors !== null) {
      if (!Array.isArray(raw.authors) || raw.authors.length === 0) {
        throw new Error(`Article "${title}": authors must be a non-empty array when present.`);
      }
      for (let i = 0; i < raw.authors.length; i += 1) {
        const author = raw.authors[i];
        if (!author || typeof author.name !== 'string' || !author.name.trim()) {
          throw new Error(`Article "${title}": author at index ${i} must have a non-empty name.`);
        }
      }
    }

    // Validate closingCta.href when present
    if (raw.closingCta?.href !== undefined && raw.closingCta?.href !== null) {
      if (
        typeof raw.closingCta.href !== 'string'
        || !raw.closingCta.href.startsWith('/')
        || raw.closingCta.href.startsWith('//')
      ) {
        throw new Error(`Article "${title}": closingCta.href must be an internal path starting with / and not //.`);
      }
    }

    // Validate faqs when present
    if (raw.faqs !== undefined && raw.faqs !== null) {
      if (!Array.isArray(raw.faqs)) {
        throw new Error(`Article "${title}": faqs must be an array.`);
      }
      for (let i = 0; i < raw.faqs.length; i += 1) {
        const faq = raw.faqs[i];
        if (!faq?.question?.trim() || !faq?.answer?.trim()) {
          throw new Error(`Article "${title}": faqs[${i}] must have non-empty question and answer.`);
        }
      }
    }

    // Validate references when present
    if (raw.references !== undefined && raw.references !== null) {
      if (!Array.isArray(raw.references)) {
        throw new Error(`Article "${title}": references must be an array.`);
      }
      for (let i = 0; i < raw.references.length; i += 1) {
        const ref = raw.references[i];
        if (!ref?.text?.trim()) {
          throw new Error(`Article "${title}": references[${i}] must have non-empty text.`);
        }
      }
    }

    if (raw.mainImage?.asset && !raw.mainImage.alt) {
      throw new Error(`Article "${title}" has a main image without alternative text.`);
    }

    const readingTime = resolveReadingTime(raw, raw.body);
    const headings = extractHeadingsFromBlocks(raw.body);

    const summaryRecord = {
      _id: raw._id || `post-${slug}`,
      _createdAt: createdAt,
      _updatedAt: updatedAt,
      slug,
      title,
      category,
      publishedAt,
      description,
      readingTime,
      headings,
      authors: raw.authors?.length ? raw.authors : null,
      mainImage: raw.mainImage || null,
      seo: normalizeSeoOgImage(raw.seo),
    };

    const fullArticleRecord = {
      ...summaryRecord,
      body: raw.body,
      ...(raw.faqs?.length ? { faqs: raw.faqs } : {}),
      ...(raw.references?.length ? { references: raw.references } : {}),
      ...(raw.closingCta ? { closingCta: raw.closingCta } : {}),
    };

    processedPosts.push(summaryRecord);
    fullArticleMap.set(slug, fullArticleRecord);
  }

  return { processedPosts, fullArticleMap };
}

export function createBlogManifest(processedPosts = []) {
  if (!Array.isArray(processedPosts)) {
    throw new Error('Expected an array of processed blog posts.');
  }

  const normalizedPosts = processedPosts.map(normalizeProcessedPost);
  normalizedPosts.sort((left, right) => {
    if (left.publishedAt.milliseconds !== right.publishedAt.milliseconds) {
      return right.publishedAt.milliseconds - left.publishedAt.milliseconds;
    }

    const leftSlug = typeof left.post?.slug === 'string' ? left.post.slug : '';
    const rightSlug = typeof right.post?.slug === 'string' ? right.post.slug : '';
    if (leftSlug !== rightSlug) return leftSlug < rightSlug ? -1 : 1;

    const leftId = typeof left.post?._id === 'string' ? left.post._id : '';
    const rightId = typeof right.post?._id === 'string' ? right.post._id : '';
    if (leftId === rightId) return 0;
    return leftId < rightId ? -1 : 1;
  });

  let latestTimestamp = null;
  for (const { sourceUpdatedAt } of normalizedPosts) {
    latestTimestamp = latestTimestamp === null
      ? sourceUpdatedAt.milliseconds
      : Math.max(latestTimestamp, sourceUpdatedAt.milliseconds);
  }

  const posts = normalizedPosts.map(({ post }) => post);

  return {
    sourceUpdatedAt: latestTimestamp === null ? null : new Date(latestTimestamp).toISOString(),
    blogsEnabled: posts.length >= BLOG_MINIMUM_POSTS,
    minimumPosts: BLOG_MINIMUM_POSTS,
    totalPosts: posts.length,
    posts,
  };
}

export async function runSync({
  argv = process.argv.slice(2),
  env = process.env,
  fetchPosts = fetchFromSanity,
  sink = fs,
  logger = console,
  generatedDir = path.resolve(rootDir, 'src', 'generated'),
} = {}) {
  logger.log('--- Starting DSPL Blog Content Sync ---');
  const { fallbackMode, strictMode } = resolveSyncPolicy({
    argv,
    env,
  });
  const target = resolveSanitySyncTarget(env, { strictMode, fallbackMode });
  const { rawPosts, source } = await resolveBlogSource({
    fallbackMode,
    strictMode,
    target,
    env,
    fetchPosts,
    logger,
  });

  if (source === 'sanity') {
    logger.log(`✔ Successfully fetched ${rawPosts.length} published document(s) from Sanity.`);
  } else {
    logger.log('ℹ Using bundled seed/fallback dataset for blog content sync.');
  }

  const { processedPosts, fullArticleMap } = validateAndProcessPosts(rawPosts);

  const manifest = createBlogManifest(processedPosts);

  writeBlogSnapshots({
    generatedDir,
    manifest,
    fullArticleMap,
    sink,
    logger,
  });

  logger.log('--- DSPL Blog Content Sync Completed Successfully ---');
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isDirectExecution) {
  runSync().catch((err) => {
    console.error('❌ Fatal error during blog content sync:', err);
    process.exitCode = 1;
  });
}
