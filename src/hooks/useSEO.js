import { useEffect } from 'react';

const SITE_URL = 'https://dashapatmaja.in';
const DEFAULT_IMAGE = `${SITE_URL}/src/assets/icon_orange.png`;

/**
 * Custom hook to update document title, description, canonical link, OpenGraph, and Twitter tags
 */
const useSEO = (optsOrTitle, legacyDescription) => {
  let title = '';
  let description = '';
  let canonical = '';
  let image = DEFAULT_IMAGE;
  let type = 'website';

  if (typeof optsOrTitle === 'object' && optsOrTitle !== null) {
    ({
      title = '',
      description = '',
      canonical = '',
      image = DEFAULT_IMAGE,
      type = 'website'
    } = optsOrTitle);
  } else {
    title = optsOrTitle || '';
    description = legacyDescription || '';
  }

  useEffect(() => {
    // 1. Document Title
    if (title) {
      document.title = title.includes('Dashapatmaja') ? title : `${title} | Dashapatmaja Solutions`;
    }

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

    const currentUrl = canonical ? `${SITE_URL}${canonical}` : `${SITE_URL}${window.location.pathname}`;

    // 2. Meta Description
    setMetaTag('meta[name="description"]', 'name', 'description', description);

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

  }, [title, description, canonical, image, type]);
};

export default useSEO;
