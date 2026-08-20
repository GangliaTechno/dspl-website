export const ANALYTICS_CONSENT_KEY = 'dspl.analytics-consent';
export const ANALYTICS_CONSENT_EVENT = 'dspl:analytics-consent';

let umamiInitialized = false;
let gaInitialized = false;
let isTrackingDisabled = false;

const BLOCKED_PII_KEYS = new Set([
  'name',
  'firstname',
  'first_name',
  'lastname',
  'last_name',
  'fullname',
  'full_name',
  'email',
  'mail',
  'phone',
  'phonenumber',
  'phone_number',
  'mobile',
  'whatsapp',
  'message',
  'brief',
  'description',
  'company',
  'companyname',
  'company_name',
  'address',
  'attachment',
  'file',
  'filename',
  'resume',
  'budget',
]);

export const getUmamiConfig = () => ({
  scriptUrl: (import.meta.env.VITE_UMAMI_SCRIPT_URL || '').trim(),
  websiteId: (import.meta.env.VITE_UMAMI_WEBSITE_ID || '').trim(),
  domains: (import.meta.env.VITE_UMAMI_DOMAINS || '').trim(),
});

export const getGaConfig = () => ({
  measurementId: (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim(),
});

export const getGaMeasurementId = () => getGaConfig().measurementId;

export const isUmamiConfigured = () => {
  const { scriptUrl, websiteId } = getUmamiConfig();
  return Boolean(scriptUrl && websiteId);
};

export const isGaConfigured = () => {
  return Boolean(getGaMeasurementId());
};

export const isRuntimeAllowed = () => {
  if (typeof window === 'undefined') return false;

  const isTest = import.meta.env.MODE === 'test';
  const isDev =
    !isTest &&
    Boolean(import.meta.env.DEV || import.meta.env.MODE === 'development');
  if (isDev) return false;

  const hostname = window.location?.hostname || '';

  if (
    !isTest &&
    (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1')
  ) {
    return false;
  }

  const { domains } = getUmamiConfig();
  if (domains) {
    const allowedList = domains
      .split(',')
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean);
    if (allowedList.length > 0 && !allowedList.includes(hostname.toLowerCase())) {
      return false;
    }
  }

  const isProd = Boolean(
    import.meta.env.PROD || import.meta.env.MODE === 'production',
  );
  return isProd || isTest;
};

export const isAnalyticsSupported = () => {
  if (!isRuntimeAllowed()) return false;
  return isUmamiConfigured() || isGaConfigured();
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
    if (
      name &&
      (name === '_ga' ||
        name.startsWith('_ga_') ||
        name === '_gid' ||
        name === '_gat' ||
        name.startsWith('_gat_'))
    ) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      if (domainParts.length >= 2) {
        const rootDomain = `.${domainParts.slice(-2).join('.')}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain};`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
      }
    }
  }
};

export const initUmami = () => {
  if (
    umamiInitialized ||
    isTrackingDisabled ||
    !isRuntimeAllowed() ||
    !isUmamiConfigured() ||
    getAnalyticsConsent() !== 'granted'
  ) {
    return;
  }

  if (typeof document === 'undefined') return;

  const { scriptUrl, websiteId, domains } = getUmamiConfig();

  const existingScript = document.querySelector(
    `script[data-website-id="${websiteId}"]`,
  );
  if (existingScript) {
    umamiInitialized = true;
    return;
  }

  try {
    if (typeof window !== 'undefined') {
      window.dsplUmamiBeforeSend = (_type, payload) =>
        getAnalyticsConsent() === 'granted' && !isTrackingDisabled
          ? payload
          : false;
    }

    const script = document.createElement('script');
    script.defer = true;
    script.src = scriptUrl;
    script.setAttribute('data-website-id', websiteId);
    if (domains) {
      script.setAttribute('data-domains', domains);
    }
    script.setAttribute('data-auto-pageview', 'false');
    script.setAttribute('data-before-send', 'dsplUmamiBeforeSend');
    script.setAttribute('data-do-not-track', 'true');
    script.setAttribute('data-performance', 'true');
    document.head.appendChild(script);
    umamiInitialized = true;
  } catch (error) {
    console.error('[Analytics] Failed to initialize Umami:', error);
  }
};

export const initGa = () => {
  if (
    gaInitialized ||
    isTrackingDisabled ||
    !isRuntimeAllowed() ||
    !isGaConfigured() ||
    getAnalyticsConsent() !== 'granted'
  ) {
    return;
  }

  if (typeof document === 'undefined') return;

  const measurementId = getGaMeasurementId();

  const existingScript = document.querySelector(
    `script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`,
  );
  if (existingScript) {
    gaInitialized = true;
    return;
  }

  try {
    if (typeof window !== 'undefined') {
      window[`ga-disable-${measurementId}`] = false;
      window.dataLayer = window.dataLayer || [];
      window.gtag =
        window.gtag ||
        function () {
          window.dataLayer.push(arguments);
        };

      window.gtag('js', new Date());
      window.gtag('consent', 'default', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      window.gtag('config', measurementId, {
        send_page_view: false,
      });
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    gaInitialized = true;
  } catch (error) {
    console.error('[Analytics] Failed to initialize Google tag (gtag.js):', error);
  }
};

export const initAnalytics = () => {
  if (
    isTrackingDisabled ||
    !isRuntimeAllowed() ||
    getAnalyticsConsent() !== 'granted'
  ) {
    return;
  }

  initUmami();
  initGa();
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
    isTrackingDisabled = true;
    if (measurementId) {
      window[`ga-disable-${measurementId}`] = true;
    }
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
    clearGaCookies();
  } else if (value === 'granted') {
    isTrackingDisabled = false;
    if (measurementId) {
      window[`ga-disable-${measurementId}`] = false;
    }
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
    initAnalytics();
    if (typeof window !== 'undefined' && isAnalyticsSupported()) {
      trackPageView(window.location?.pathname || '/');
    }
  }

  window.dispatchEvent(
    new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: value }),
  );
};

export const sanitizeEventData = (data) => {
  if (!data || typeof data !== 'object') return undefined;

  const clean = {};
  for (const [key, val] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    const normalizedKey = lowerKey.replace(/[-_]/g, '');
    if (BLOCKED_PII_KEYS.has(normalizedKey) || BLOCKED_PII_KEYS.has(lowerKey)) {
      continue;
    }
    if (
      typeof val === 'string' ||
      typeof val === 'number' ||
      typeof val === 'boolean'
    ) {
      clean[key] = val;
    }
  }
  return Object.keys(clean).length > 0 ? clean : undefined;
};

export const sanitizePath = (path) => {
  if (typeof path !== 'string') return '/';
  try {
    const clean = path.split('?')[0].split('#')[0].trim();
    return clean.length > 128 ? clean.slice(0, 128) : clean || '/';
  } catch {
    return '/';
  }
};

export const trackPageView = (path) => {
  if (
    isTrackingDisabled ||
    getAnalyticsConsent() !== 'granted' ||
    !isRuntimeAllowed()
  ) {
    return;
  }

  if (!umamiInitialized && !gaInitialized) {
    initAnalytics();
  }

  const cleanPath = sanitizePath(path);

  try {
    if (typeof window !== 'undefined') {
      if (isGaConfigured() && typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_path: cleanPath,
          page_location: window.location?.href || cleanPath,
          page_title: typeof document !== 'undefined' ? document.title : '',
        });
      }
      if (
        isUmamiConfigured() &&
        window.umami &&
        typeof window.umami.track === 'function'
      ) {
        window.umami.track((props) => ({
          ...props,
          url: cleanPath,
          title: typeof document !== 'undefined' ? document.title : '',
        }));
      }
    }
  } catch (error) {
    console.error('[Analytics] Error tracking pageview:', error);
  }
};

export const trackEvent = (eventNameOrObject, eventData) => {
  if (
    isTrackingDisabled ||
    getAnalyticsConsent() !== 'granted' ||
    !isRuntimeAllowed()
  ) {
    return;
  }

  if (!umamiInitialized && !gaInitialized) {
    initAnalytics();
  }

  let eventName = '';
  let payload = undefined;

  if (typeof eventNameOrObject === 'string') {
    eventName = eventNameOrObject.trim();
    payload = sanitizeEventData(eventData);
  } else if (eventNameOrObject && typeof eventNameOrObject === 'object') {
    const { category, action, label, value } = eventNameOrObject;
    eventName = action
      ? `${category || 'event'}_${action}`.toLowerCase()
      : 'custom_event';
    const rawPayload = {};
    if (label !== undefined) rawPayload.label = label;
    if (value !== undefined) rawPayload.value = value;
    payload = sanitizeEventData(rawPayload);
  }

  if (!eventName) return;

  try {
    if (typeof window !== 'undefined') {
      if (
        isUmamiConfigured() &&
        window.umami &&
        typeof window.umami.track === 'function'
      ) {
        if (payload) {
          window.umami.track(eventName, payload);
        } else {
          window.umami.track(eventName);
        }
      }

      if (isGaConfigured() && typeof window.gtag === 'function') {
        if (payload) {
          window.gtag('event', eventName, payload);
        } else {
          window.gtag('event', eventName);
        }
      }
    }
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

export const resetAnalyticsForTests = () => {
  umamiInitialized = false;
  gaInitialized = false;
  isTrackingDisabled = false;
  if (typeof document !== 'undefined') {
    const scripts = document.querySelectorAll(
      'script[data-website-id], script[src*="googletagmanager.com/gtag/js"]',
    );
    scripts.forEach((s) => s.remove());
  }
  if (typeof window !== 'undefined') {
    delete window.umami;
    delete window.gtag;
    delete window.dataLayer;
    delete window.dsplUmamiBeforeSend;
    const measurementId = getGaMeasurementId();
    if (measurementId) {
      delete window[`ga-disable-${measurementId}`];
    }
  }
};
