import { describe, expect, it } from 'vitest';
import {
  BLOG_MINIMUM_POSTS,
  approvedTestimonials,
  blogPosts,
  blogsEnabled,
  hasPublishableBlog,
  packagingItems,
} from '../publication';

describe('publication gates', () => {
  it('keeps unapproved evidence empty in production', () => {
    expect(BLOG_MINIMUM_POSTS).toBe(2);
    expect(approvedTestimonials).toEqual([]);
    expect(packagingItems).toEqual([]);
    expect(blogPosts).toEqual([]);
    expect(blogsEnabled).toBe(false);
  });

  it('opens the Blog only when two approved posts exist', () => {
    const approvedPost = (slug) => ({ slug, status: 'approved' });

    expect(hasPublishableBlog([])).toBe(false);
    expect(hasPublishableBlog([approvedPost('one')])).toBe(false);
    expect(
      hasPublishableBlog([approvedPost('one'), approvedPost('two')]),
    ).toBe(true);
    expect(
      hasPublishableBlog([
        approvedPost('one'),
        { slug: 'draft', status: 'draft' },
      ]),
    ).toBe(false);
  });
});
