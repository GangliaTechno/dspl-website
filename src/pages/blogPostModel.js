import { getRouteMetadata } from '../seo/routeMetadata';
import { SITE_CONFIG } from '../content/siteConfig';

export const normalizeBlogSlug = (value = '') => value.trim().toLowerCase();

export const createBlogPostMetadata = (post, isBlogOpen = true) => ({
  ...getRouteMetadata('/blogs'),
  title: `${post.title} | ${SITE_CONFIG.siteName}`,
  description: post.description,
  canonical: `/blogs/${post.slug}`,
  type: 'article',
  robots: isBlogOpen ? 'index, follow' : 'noindex, follow',
});
