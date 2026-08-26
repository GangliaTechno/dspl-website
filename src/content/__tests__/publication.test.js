import { describe, expect, it } from 'vitest';
import {
  BLOG_MINIMUM_POSTS,
  approvedTestimonials,
  blogManifest,
  blogPosts,
  blogsEnabled,
  getBlogPostSummary,
  getPublishedBlogPaths,
  getPublishedBlogPosts,
  hasPublishableBlog,
  isPublishedBlogRoute,
  normalizeBlogManifest,
  packagingItems,
} from '../publication';

describe('publication gates', () => {
  it('normalizes imported artifacts without requiring a null provenance', () => {
    expect(blogManifest.sourceUpdatedAt === null || typeof blogManifest.sourceUpdatedAt === 'string').toBe(true);
    expect(blogManifest).not.toHaveProperty('syncedAt');

    const legacy = normalizeBlogManifest({ syncedAt: 'legacy', posts: [] });
    expect(legacy).toMatchObject({ sourceUpdatedAt: null, posts: [] });
    expect(legacy).not.toHaveProperty('syncedAt');

    const deterministic = normalizeBlogManifest({
      syncedAt: 'legacy',
      sourceUpdatedAt: '2026-08-24T10:00:00.000Z',
      posts: [],
    });
    expect(deterministic.sourceUpdatedAt).toBe('2026-08-24T10:00:00.000Z');
    expect(deterministic).not.toHaveProperty('syncedAt');

    expect(normalizeBlogManifest({ sourceUpdatedAt: 'not-a-timestamp' }).sourceUpdatedAt).toBeNull();
  });

  it('exposes the publication gate constants and approved evidence states', () => {
    expect(BLOG_MINIMUM_POSTS).toBe(2);
    expect(approvedTestimonials).toEqual([]);
    expect(packagingItems).toEqual([]);
    expect(blogPosts).toHaveLength(2);
    expect(blogsEnabled).toBe(true);
    expect(blogPosts.every((post) => Array.isArray(post.authors) && post.authors.length === 1 && post.authors[0].name === 'Pawan Shetty')).toBe(true);
    expect(blogManifest.posts.every((post) => Array.isArray(post.authors) && post.authors.length === 1 && post.authors[0].name === 'Pawan Shetty')).toBe(true);
  });

  it('opens the Blog only when at least two published posts exist', () => {
    const post = (slug) => ({ slug });

    expect(hasPublishableBlog([])).toBe(false);
    expect(hasPublishableBlog([post('one')])).toBe(false);
    expect(hasPublishableBlog([post('one'), post('two')])).toBe(true);
    expect(hasPublishableBlog([post('one'), post('two'), post('three')])).toBe(true);
  });

  it('provides deterministic lookup and route helpers', () => {
    expect(getPublishedBlogPosts()).toEqual(blogPosts);

    const firstPost = getBlogPostSummary('fssai-labelling-requirements-checklist-2026');
    expect(firstPost).toMatchObject({
      slug: 'fssai-labelling-requirements-checklist-2026',
      title: 'FSSAI Labelling Requirements for Packaged Food',
      category: 'Compliance',
      authors: [
        {
          _key: 'author-pawan-shetty',
          name: 'Pawan Shetty',
        },
      ],
    });

    const caseInsensitive = getBlogPostSummary('fssai-labelling-requirements-checklist-2026');
    expect(caseInsensitive).toEqual(firstPost);

    expect(getBlogPostSummary('unknown-slug')).toBeUndefined();

    const paths = getPublishedBlogPaths();
    expect(paths).toContain('/blogs/fssai-labelling-requirements-checklist-2026');
    expect(paths).toContain('/blogs/legal-metrology-packaged-commodity-rules-india');

    expect(isPublishedBlogRoute('/blogs')).toBe(true);
    expect(isPublishedBlogRoute('/blogs/fssai-labelling-requirements-checklist-2026')).toBe(true);
    expect(isPublishedBlogRoute('/blogs/legal-metrology-packaged-commodity-rules-india')).toBe(true);
    expect(isPublishedBlogRoute('/blogs/missing-article')).toBe(false);
  });
});
