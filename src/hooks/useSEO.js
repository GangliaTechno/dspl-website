import { useEffect } from 'react';
import { organizationStructuredData } from '../seo/routeMetadata';

/**
 * Custom hook to update document title, description, canonical link, OpenGraph, and Twitter tags
 */
const useSEO = ({
  title = '',
  description = '',
  canonical = '',
  image = 'https://dashapatmaja.in/logo.png',
  type = 'website',
  robots = 'index, follow',
  structuredData = organizationStructuredData,
}) => {
  useEffect(() => {
    if (title) document.title = title;

    const setMetaTag = (selector, nameAttr, nameValue, content) => {
      if (!content) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const currentUrl = `https://dashapatmaja.in${
      canonical || window.location.pathname
    }`;

    // 2. Meta Description
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="robots"]', 'name', 'robots', robots);

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title || document.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', image);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', type);

    // 4. Twitter Card Meta Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title || document.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', image);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    let schema = document.querySelector('script[data-dspl-schema]');
    if (!schema) {
      schema = document.createElement('script');
      document.head.appendChild(schema);
    }
    schema.type = 'application/ld+json';
    schema.dataset.dsplSchema = 'organization';
    schema.textContent = JSON.stringify(structuredData);
  }, [title, description, canonical, image, type, robots, structuredData]);
};

export default useSEO;
