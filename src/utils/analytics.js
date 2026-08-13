import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-QYVQY0Q9KE';

export const ANALYTICS_CONSENT_KEY = 'dspl.analytics-consent';
export const ANALYTICS_CONSENT_EVENT = 'dspl:analytics-consent';

let isInitialized = false;

export const getAnalyticsConsent = () => {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

export const setAnalyticsConsent = (value) => {
  if (value !== 'granted' && value !== 'denied') {
    throw new TypeError('Analytics consent must be granted or denied.');
  }
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    // A blocked storage API must not prevent the visitor from using the site.
  }

  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value }));
};

export const initGA = () => {
  if (isInitialized || getAnalyticsConsent() !== 'granted') return;

  try {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    isInitialized = true;
  } catch (error) {
    console.error('[Analytics] Failed to initialize GA4:', error);
  }
};

export const trackPageView = (path) => {
  if (getAnalyticsConsent() !== 'granted') return;
  if (!isInitialized) initGA();
  if (!isInitialized) return;

  try {
    ReactGA.send({ hitType: 'pageview', page: path });
  } catch (error) {
    console.error('[Analytics] Error tracking pageview:', error);
  }
};

export const trackEvent = ({ category, action, label, value }) => {
  if (getAnalyticsConsent() !== 'granted') return;
  if (!isInitialized) initGA();
  if (!isInitialized) return;

  try {
    ReactGA.event({ category, action, label, value });
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

export const resetAnalyticsForTests = () => {
  isInitialized = false;
};
