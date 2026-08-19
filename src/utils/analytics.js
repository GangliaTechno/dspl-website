import ReactGA from 'react-ga4';

export const ANALYTICS_CONSENT_KEY = 'dspl.analytics-consent';
export const ANALYTICS_CONSENT_EVENT = 'dspl:analytics-consent';

let isInitialized = false;

export const getGaMeasurementId = () =>
  import.meta.env.VITE_GA_MEASUREMENT_ID || '';

export const isAnalyticsSupported = () => {
  const id = getGaMeasurementId();
  if (!id) return false;
  if (import.meta.env.MODE === 'test') return true;
  const isDev = Boolean(
    import.meta.env.DEV || import.meta.env.MODE === 'development',
  );
  const isProd = Boolean(
    import.meta.env.PROD || import.meta.env.MODE === 'production',
  );
  return isProd && !isDev;
};

export const getAnalyticsConsent = () => {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

export const clearGaCookies = () => {
  if (typeof document === 'undefined' || !document.cookie) return;

  const cookies = document.cookie.split(';');
  const hostname =
    typeof window !== 'undefined' ? window.location?.hostname || '' : '';
  const domainParts = hostname.split('.');

  for (const cookie of cookies) {
    const name = cookie.split('=')[0]?.trim();
    if (name && (name.startsWith('_ga') || name.startsWith('_gid'))) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      if (domainParts.length >= 2) {
        const rootDomain = `.${domainParts.slice(-2).join('.')}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
      }
    }
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

  const measurementId = getGaMeasurementId();

  if (value === 'denied') {
    if (measurementId) {
      window[`ga-disable-${measurementId}`] = true;
    }
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    clearGaCookies();
  } else if (value === 'granted') {
    if (measurementId) {
      window[`ga-disable-${measurementId}`] = false;
    }
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }

  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value }),
  );
};

export const initGA = () => {
  if (
    isInitialized ||
    !isAnalyticsSupported() ||
    getAnalyticsConsent() !== 'granted'
  ) {
    return;
  }

  const measurementId = getGaMeasurementId();

  try {
    if (typeof window !== 'undefined') {
      window[`ga-disable-${measurementId}`] = false;
    }
    ReactGA.initialize(measurementId);
    isInitialized = true;
  } catch (error) {
    console.error('[Analytics] Failed to initialize GA4:', error);
  }
};

export const trackPageView = (path) => {
  if (getAnalyticsConsent() !== 'granted' || !isAnalyticsSupported()) return;
  if (!isInitialized) initGA();
  if (!isInitialized) return;

  try {
    ReactGA.send({ hitType: 'pageview', page: path });
  } catch (error) {
    console.error('[Analytics] Error tracking pageview:', error);
  }
};

export const trackEvent = ({ category, action, label, value }) => {
  if (getAnalyticsConsent() !== 'granted' || !isAnalyticsSupported()) return;
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
