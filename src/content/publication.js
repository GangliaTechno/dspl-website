/**
 * @typedef {Object} TestimonialRecord
 * @property {string} quote
 * @property {string} name
 * @property {string} role
 * @property {string} company
 * @property {string} consentReference
 */

/**
 * @typedef {Object} PackagingRecord
 * @property {string} image
 * @property {string} [backImage]
 * @property {string} sku
 * @property {string} collection
 * @property {string} description
 * @property {string} category
 * @property {string} alt
 */

/**
 * @typedef {Object} BlogPostRecord
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string} publishedAt
 * @property {'draft'|'approved'} status
 * @property {{ heading: string, paragraphs: string[] }[]} sections
 */

export const BLOG_MINIMUM_POSTS = 2;

/** @type {readonly TestimonialRecord[]} */
export const approvedTestimonials = Object.freeze([]);

/** @type {readonly PackagingRecord[]} */
export const packagingItems = Object.freeze([]);

/** @type {readonly BlogPostRecord[]} */
export const blogPosts = Object.freeze([]);

export const hasPublishableBlog = (posts = []) =>
  posts.filter((post) => post.status === 'approved').length >=
  BLOG_MINIMUM_POSTS;

export const blogsEnabled = hasPublishableBlog(blogPosts);
