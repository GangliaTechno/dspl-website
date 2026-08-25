import { getRouteMetadata, organizationStructuredData } from '../seo/routeMetadata';
import { SITE_CONFIG } from '../content/siteConfig';

export const normalizeBlogSlug = (value = '') => value.trim().toLowerCase();

/**
 * Creates dynamic SEO metadata and BlogPosting JSON-LD structured data for an article.
 *
 * @param {object} post - The post summary or full document
 * @param {boolean} [isBlogOpen=true]
 * @returns {object}
 */
export const createBlogPostMetadata = (post, isBlogOpen = true) => {
  const siteUrl = SITE_CONFIG.siteUrl;
  const canonicalPath = `/blogs/${post.slug}`;
  const title = post.seo?.metaTitle
    ? `${post.seo.metaTitle} | ${SITE_CONFIG.siteName}`
    : `${post.title} | ${SITE_CONFIG.siteName}`;
  const description = post.seo?.metaDescription || post.description;
  const rawOg = post.seo?.ogImage;
  const ogImageUrl = typeof rawOg === 'string' ? rawOg : rawOg?.asset?.url || null;
  const image =
    (typeof ogImageUrl === 'string' ? ogImageUrl : null)
    || post.mainImage?.asset?.url
    || SITE_CONFIG.defaultOgImage;

  // Ensure image is always an absolute URL for og:image and JSON-LD
  const absoluteImage = typeof image === 'string' && image.startsWith('/')
    ? `${siteUrl}${image}`
    : image;

  const blogPosting = {
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    url: `${siteUrl}${canonicalPath}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${canonicalPath}`,
    },
    articleSection: post.category,
    publisher: organizationStructuredData,
    image: absoluteImage,
    ...(post.authors?.length > 0 && {
      author: post.authors.map((author) => ({
        '@type': 'Person',
        name: author.name,
        ...(author.role ? { jobTitle: author.role } : {}),
      })),
    }),
  };

  const structuredData = post.faqs?.length > 0
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          blogPosting,
          {
            '@type': 'FAQPage',
            mainEntity: post.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ],
      }
    : {
        '@context': 'https://schema.org',
        ...blogPosting,
      };

  return {
    ...getRouteMetadata('/blogs'),
    title,
    description,
    canonical: canonicalPath,
    type: 'article',
    image: absoluteImage,
    robots: isBlogOpen ? 'index, follow' : 'noindex, follow',
    structuredData,
  };
};
