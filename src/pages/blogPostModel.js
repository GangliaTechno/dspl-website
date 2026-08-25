import { getRouteMetadata, organizationStructuredData } from '../seo/routeMetadata';
import { SITE_CONFIG } from '../content/siteConfig';
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createStructuredDataGraph,
} from '../seo/structuredData';

export const normalizeBlogSlug = (value = '') => value.trim().toLowerCase();

const firstNonEmptyText = (...values) =>
  values.find((value) => typeof value === 'string' && value.trim())?.trim();

const normalizeImageCandidate = (value) => {
  if (typeof value === 'string') {
    const url = value.trim();
    return url ? { url, value: null } : null;
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;

  const url = typeof value.asset?.url === 'string' ? value.asset.url.trim() : '';
  return url ? { url, value } : null;
};

const positiveDimension = (value) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined;

const normalizeAbsoluteImageUrl = (siteUrl, image) => {
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith('//')) return `https:${image}`;
  return `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;
};

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
  const seoImage = normalizeImageCandidate(post.seo?.ogImage);
  const mainImage = normalizeImageCandidate(post.mainImage);
  const selectedImage = seoImage || mainImage;
  const image = selectedImage?.url || SITE_CONFIG.defaultOgImage;
  const absoluteImage = normalizeAbsoluteImageUrl(siteUrl, image);

  const metadata = { ...getRouteMetadata('/blogs') };
  if (image === SITE_CONFIG.defaultOgImage) {
    metadata.imageAlt = SITE_CONFIG.defaultOgImageAlt;
    metadata.imageWidth = SITE_CONFIG.defaultOgImageWidth;
    metadata.imageHeight = SITE_CONFIG.defaultOgImageHeight;
  } else {
    metadata.imageAlt = selectedImage === seoImage
      ? firstNonEmptyText(post.seo?.ogImageAlt, post.seo?.imageAlt, post.title)
      : firstNonEmptyText(post.mainImage?.alt, post.title);
    delete metadata.imageWidth;
    delete metadata.imageHeight;

    const dimensions = selectedImage?.value?.asset?.metadata?.dimensions;
    const width = positiveDimension(dimensions?.width);
    const height = positiveDimension(dimensions?.height);
    if (width !== undefined) metadata.imageWidth = width;
    if (height !== undefined) metadata.imageHeight = height;
  }

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
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    image: absoluteImage,
    ...(post.authors?.length > 0 && {
      author: post.authors.map((author) => ({
        '@type': 'Person',
        name: author.name,
        ...(author.role ? { jobTitle: author.role } : {}),
      })),
    }),
  };

  const breadcrumbs = createBreadcrumbSchema(canonicalPath, post.title);
  const faqNode = createFaqSchema(post.faqs);

  const structuredData = createStructuredDataGraph(
    organizationStructuredData,
    breadcrumbs,
    blogPosting,
    faqNode,
  );

  return {
    ...metadata,
    title,
    description,
    canonical: canonicalPath,
    type: 'article',
    image: absoluteImage,
    robots: isBlogOpen ? 'index, follow' : 'noindex, follow',
    structuredData,
  };
};
