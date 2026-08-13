import { getRouteMetadata } from '../seo/routeMetadata';

export const normalizeBlogSlug = (value = '') => value.trim().toLowerCase();

export const createBlogPostMetadata = (post, isBlogOpen = true) => ({
  ...getRouteMetadata('/blogs'),
  title: `${post.title} | Dashapatmaja Solutions Pvt Ltd`,
  description: post.description,
  canonical: `/blogs/${post.slug}`,
  type: 'article',
  robots: isBlogOpen ? 'index, follow' : 'noindex, follow',
});
