import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-QYVQY0Q9KE';
const IS_DEV = import.meta.env.DEV;

let isInitialized = false;

/**
 * Initialize Google Analytics (GA4)
 */
export const initGA = () => {
  if (isInitialized) return;

  if (IS_DEV) {
    console.log('[Analytics] Development mode active: GA4 initialization skipped in dev.');
    isInitialized = true;
    return;
  }

  try {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    isInitialized = true;
    console.log('[Analytics] GA4 initialized successfully.');
  } catch (error) {
    console.error('[Analytics] Failed to initialize GA4:', error);
  }
};

/**
 * Track Page Views (called automatically on route change in SPA)
 * @param {string} path - The path of the page (e.g. /about)
 */
export const trackPageView = (path) => {
  if (IS_DEV) {
    console.log(`[Analytics Dev] Page view tracked: ${path}`);
    return;
  }

  if (!isInitialized) {
    initGA();
  }

  try {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
    });
  } catch (error) {
    console.error('[Analytics] Error tracking pageview:', error);
  }
};

/**
 * Track Custom Events (e.g., form submission, button click)
 * @param {Object} params
 * @param {string} params.category - Event category
 * @param {string} params.action - Event action
 * @param {string} [params.label] - Optional label
 * @param {number} [params.value] - Optional numeric value
 */
export const trackEvent = ({ category, action, label, value }) => {
  if (IS_DEV) {
    console.log('[Analytics Dev] Event tracked:', { category, action, label, value });
    return;
  }

  if (!isInitialized) {
    initGA();
  }

  try {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};
