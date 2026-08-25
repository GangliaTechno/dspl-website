import { useEffect } from 'react';
import { SITE_CONFIG } from '../content/siteConfig';
import { organizationStructuredData } from '../seo/routeMetadata';

const SITE_NAME = SITE_CONFIG.siteName;

/**
 * Custom hook to update document title, description, canonical link, OpenGraph, and Twitter tags
 */
const useSEO = (metadata = {}) => {
  const {
    title = '',
    description = '',
    canonical = '',
    image = SITE_CONFIG.defaultOgImage,
    imageAlt = SITE_CONFIG.defaultOgImageAlt,
    imageWidth,
    imageHeight,
    type = 'website',
    robots = 'index, follow',
    structuredData = organizationStructuredData,
  } = metadata || {};

  useEffect(() => {
    if (!metadata) return;
    if (title) document.title = title;

    const setMetaByName = (nameValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${nameValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', nameValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setMetaByProperty = (propValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[property="${propValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', propValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setOptionalMetaByProperty = (propValue, content) => {
      if (content === undefined || content === null || content === '') {
        document.querySelector(`meta[property="${propValue}"]`)?.remove();
        return;
      }
      setMetaByProperty(propValue, content);
    };

    const currentUrl = `${SITE_CONFIG.siteUrl}${
      canonical || window.location.pathname
    }`;

    // Primary meta
    setMetaByName('description', description);
    setMetaByName('robots', robots);

    // Open Graph
    setMetaByProperty('og:title', title || document.title);
    setMetaByProperty('og:description', description);
    setMetaByProperty('og:url', currentUrl);
    setMetaByProperty('og:image', image);
    setOptionalMetaByProperty(
      'og:image:width',
      imageWidth == null ? null : String(imageWidth),
    );
    setOptionalMetaByProperty(
      'og:image:height',
      imageHeight == null ? null : String(imageHeight),
    );
    setMetaByProperty('og:image:alt', imageAlt);
    setMetaByProperty('og:type', type);
    setMetaByProperty('og:site_name', SITE_NAME);

    // Twitter Card
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', title || document.title);
    setMetaByName('twitter:description', description);
    setMetaByName('twitter:image', image);
    setMetaByName('twitter:image:alt', imageAlt);

    // Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Structured Data
    let schema = document.querySelector('script[data-dspl-schema]');
    if (!schema) {
      schema = document.createElement('script');
      document.head.appendChild(schema);
    }
    schema.type = 'application/ld+json';
    schema.dataset.dsplSchema = 'organization';
    schema.textContent = JSON.stringify(structuredData);
  }, [
    metadata,
    title,
    description,
    canonical,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    type,
    robots,
    structuredData,
  ]);
};

export default useSEO;
