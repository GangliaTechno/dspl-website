import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seedBlogPosts } from '../src/cms/seedData.js';

const APPROVED_SLUGS = new Set([
  'coordinating-brand-market-commerce',
  'from-packaging-to-purchase',
  'fssai-labelling-requirements-checklist-2026',
  'legal-metrology-packaged-commodity-rules-india',
]);

export function createSanityImportDocuments(posts = seedBlogPosts) {
  const slugs = posts.map((post) => post.slug?.current);
  const uniqueSlugs = new Set(slugs);

  if (
    posts.length !== APPROVED_SLUGS.size
    || uniqueSlugs.size !== APPROVED_SLUGS.size
    || [...APPROVED_SLUGS].some((slug) => !uniqueSlugs.has(slug))
  ) {
    throw new Error('Bootstrap must contain exactly the four approved Insights articles.');
  }

  const ids = new Set();
  return posts.map((post) => {
    const {
      _id,
      title,
      slug,
      category,
      publishedAt,
      description,
      body,
      authors,
      readingTimeMinutes,
      faqs,
      references,
      closingCta,
      seo,
      mainImage,
    } = post;

    if (!/^[A-Za-z0-9_-]+$/.test(_id || '') || ids.has(_id)) {
      throw new Error(`Bootstrap document ID must be stable, unique, and import-safe: ${_id || 'missing'}.`);
    }
    ids.add(_id);

    const doc = { _id, _type: 'blogPost', title, slug, category, publishedAt, description, body };
    if (authors?.length) doc.authors = authors;
    if (readingTimeMinutes != null) doc.readingTimeMinutes = readingTimeMinutes;
    if (faqs?.length) doc.faqs = faqs;
    if (references?.length) doc.references = references;
    if (closingCta) doc.closingCta = closingCta;
    if (seo) doc.seo = seo;
    if (mainImage) doc.mainImage = mainImage;

    return doc;
  });
}

export function serializeSanityImport(posts = seedBlogPosts) {
  return `${createSanityImportDocuments(posts).map(JSON.stringify).join('\n')}\n`;
}

const isDirectExecution =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) process.stdout.write(serializeSanityImport());
