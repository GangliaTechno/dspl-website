import { useEffect } from 'react';
import { organizationStructuredData } from '../seo/routeMetadata';

const SITE_NAME = 'Dashapatmaja Solutions Pvt Ltd';

/**
 * Custom hook to update document title, description, canonical link, OpenGraph, and Twitter tags
 */
const useSEO = (metadata = {}) => {
  const {
    title = '',
    description = '',
    canonical = '',
    image = 'https://dashapatmaja.in/og-cover.jpg',
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

    const currentUrl = `https://dashapatmaja.in${
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
    setMetaByProperty('og:type', type);
    setMetaByProperty('og:site_name', SITE_NAME);

    // Twitter Card
    setMetaByName('twitter:card', 'summary_large_image');
    setMetaByName('twitter:title', title || document.title);
    setMetaByName('twitter:description', description);
    setMetaByName('twitter:image', image);

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
  }, [metadata, title, description, canonical, image, type, robots, structuredData]);
};

export default useSEO;
