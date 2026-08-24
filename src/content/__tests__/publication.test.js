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

    const firstPost = getBlogPostSummary('coordinating-brand-market-commerce');
    expect(firstPost).toMatchObject({
      slug: 'coordinating-brand-market-commerce',
      title: 'Coordinating Brand, Market, and Commerce as One System',
      category: 'Branding',
    });

    const caseInsensitive = getBlogPostSummary('COORDINATING-BRAND-MARKET-COMMERCE');
    expect(caseInsensitive).toEqual(firstPost);

    expect(getBlogPostSummary('unknown-slug')).toBeUndefined();

    const paths = getPublishedBlogPaths();
    expect(paths).toContain('/blogs/coordinating-brand-market-commerce');
    expect(paths).toContain('/blogs/from-packaging-to-purchase');

    expect(isPublishedBlogRoute('/blogs')).toBe(true);
    expect(isPublishedBlogRoute('/blogs/coordinating-brand-market-commerce')).toBe(true);
    expect(isPublishedBlogRoute('/blogs/from-packaging-to-purchase')).toBe(true);
    expect(isPublishedBlogRoute('/blogs/missing-article')).toBe(false);
  });
});
