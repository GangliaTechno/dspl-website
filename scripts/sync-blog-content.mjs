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

const isFallbackMode =
  process.argv.includes('--fallback') ||
  process.env.SANITY_SYNC_MODE === 'fallback';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_READ_TOKEN;
const apiVersion = process.env.SANITY_API_VERSION || '2026-08-20';

const ALLOWED_CATEGORIES = new Set(['Branding', 'Marketing', 'E-commerce']);
const BLOG_MINIMUM_POSTS = 2;

async function fetchFromSanity() {
  if (!projectId) {
    throw new Error('SANITY_PROJECT_ID environment variable is missing.');
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'published',
    token: token || undefined,
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
    mainImage,
    body,
    seo
  }`;

  const now = new Date().toISOString();
  return client.fetch(query, { now });
}

function validateAndProcessPosts(rawPosts) {
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

    const slug = (typeof raw.slug === 'object' ? raw.slug?.current : raw.slug)?.trim().toLowerCase();
    if (!slug) {
      throw new Error(`Article "${title}" is missing a valid slug.`);
    }

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

    const publishedAt = raw.publishedAt;
    if (!publishedAt || Number.isNaN(new Date(publishedAt).getTime())) {
      throw new Error(`Article "${title}" has missing or invalid publishedAt ISO date.`);
    }

    const description = typeof raw.description === 'string' ? raw.description.trim() : '';
    if (!description) {
      throw new Error(`Article "${title}" is missing a description/standfirst.`);
    }

    if (!Array.isArray(raw.body) || raw.body.length === 0) {
      throw new Error(`Article "${title}" has an empty or invalid body.`);
    }

    if (raw.mainImage?.asset && !raw.mainImage.alt) {
      throw new Error(`Article "${title}" has a main image without alternative text.`);
    }

    const readingTime = calculateReadingTime(raw.body);
    const headings = extractHeadingsFromBlocks(raw.body);

    const summaryRecord = {
      _id: raw._id || `post-${slug}`,
      _createdAt: raw._createdAt || publishedAt,
      _updatedAt: raw._updatedAt || publishedAt,
      slug,
      title,
      category,
      publishedAt,
      description,
      readingTime,
      headings,
      mainImage: raw.mainImage || null,
      seo: raw.seo || null,
    };

    const fullArticleRecord = {
      ...summaryRecord,
      body: raw.body,
    };

    processedPosts.push(summaryRecord);
    fullArticleMap.set(slug, fullArticleRecord);
  }

  return { processedPosts, fullArticleMap };
}

async function runSync() {
  console.log('--- Starting DSPL Blog Content Sync ---');
  let rawPosts;

  if (isFallbackMode || !projectId) {
    console.log('ℹ Using bundled seed/fallback dataset for blog content sync.');
    rawPosts = seedBlogPosts;
  } else {
    console.log(`📡 Fetching published articles from Sanity (Project: ${projectId}, Dataset: ${dataset})...`);
    try {
      rawPosts = await fetchFromSanity();
      console.log(`✔ Successfully fetched ${rawPosts.length} published document(s) from Sanity.`);
    } catch (err) {
      console.error('❌ Failed to fetch from Sanity Content Lake:');
      console.error(err.message || err);
      if (process.env.NODE_ENV === 'production' || process.env.CI) {
        console.error('❌ Aborting production build due to content sync failure (fail-closed).');
        process.exit(1);
      }
      console.warn('⚠ Falling back to seed dataset in non-production mode.');
      rawPosts = seedBlogPosts;
    }
  }

  const { processedPosts, fullArticleMap } = validateAndProcessPosts(rawPosts);

  const blogsEnabled = processedPosts.length >= BLOG_MINIMUM_POSTS;
  const manifest = {
    syncedAt: new Date().toISOString(),
    blogsEnabled,
    minimumPosts: BLOG_MINIMUM_POSTS,
    totalPosts: processedPosts.length,
    posts: processedPosts,
  };

  const generatedDir = path.join(rootDir, 'src', 'generated');
  const blogDir = path.join(generatedDir, 'blog');

  fs.mkdirSync(blogDir, { recursive: true });

  const manifestPath = path.join(generatedDir, 'blogManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`✔ Wrote manifest to ${path.relative(rootDir, manifestPath)} (blogsEnabled: ${blogsEnabled}, ${processedPosts.length} posts).`);

  for (const [slug, fullArticle] of fullArticleMap.entries()) {
    const articlePath = path.join(blogDir, `${slug}.json`);
    fs.writeFileSync(articlePath, JSON.stringify(fullArticle, null, 2), 'utf8');
    console.log(`✔ Wrote article snapshot to ${path.relative(rootDir, articlePath)}.`);
  }

  console.log('--- DSPL Blog Content Sync Completed Successfully ---');
}

runSync().catch((err) => {
  console.error('❌ Fatal error during blog content sync:', err);
  process.exit(1);
});
