import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seedBlogPosts } from '../src/cms/seedData.js';

const EXPECTED_SLUGS = [
  'coordinating-brand-market-commerce',
  'from-packaging-to-purchase',
];

export function createSanityImportDocuments(posts = seedBlogPosts) {
  const slugs = posts.map((post) => post.slug?.current);
  if (posts.length !== 2 || slugs.some((slug, index) => slug !== EXPECTED_SLUGS[index])) {
    throw new Error(`Bootstrap is restricted to the two approved Insights slugs: ${EXPECTED_SLUGS.join(', ')}.`);
  }

  const ids = new Set();
  return posts.map(({ _id, title, slug, category, publishedAt, description, body }) => {
    if (!/^[A-Za-z0-9_-]+$/.test(_id || '') || ids.has(_id)) {
      throw new Error(`Bootstrap document ID must be stable, unique, and import-safe: ${_id || 'missing'}.`);
    }
    ids.add(_id);
    return { _id, _type: 'blogPost', title, slug, category, publishedAt, description, body };
  });
}

export function serializeSanityImport(posts = seedBlogPosts) {
  return `${createSanityImportDocuments(posts).map(JSON.stringify).join('\n')}\n`;
}

const isDirectExecution =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) process.stdout.write(serializeSanityImport());
