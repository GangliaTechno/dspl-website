export const ANALYTICS_CONSENT_KEY = 'dspl.analytics-consent';
export const ANALYTICS_CONSENT_EVENT = 'dspl:analytics-consent';

let isInitialized = false;
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

export const isAnalyticsSupported = () => {
  const { scriptUrl, websiteId, domains } = getUmamiConfig();
  if (!scriptUrl || !websiteId) return false;
  if (typeof window === 'undefined') return false;

  const isTest = import.meta.env.MODE === 'test';
  const isDev = !isTest && Boolean(
    import.meta.env.DEV || import.meta.env.MODE === 'development',
  );
  if (isDev) return false;

  const hostname = window.location?.hostname || '';

  if (!isTest && (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1')) {
    return false;
  }

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

export const getAnalyticsConsent = () => {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

export const initAnalytics = () => {
  if (
    isInitialized ||
    isTrackingDisabled ||
    !isAnalyticsSupported() ||
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
    isInitialized = true;
    return;
  }

  try {
    const script = document.createElement('script');
    script.defer = true;
    script.src = scriptUrl;
    script.setAttribute('data-website-id', websiteId);
    if (domains) {
      script.setAttribute('data-domains', domains);
    }
    script.setAttribute('data-do-not-track', 'true');
    script.setAttribute('data-performance', 'true');
    document.head.appendChild(script);
    isInitialized = true;
  } catch (error) {
    console.error('[Analytics] Failed to initialize Umami:', error);
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

  if (value === 'denied') {
    isTrackingDisabled = true;
  } else if (value === 'granted') {
    isTrackingDisabled = false;
    initAnalytics();
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
    if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
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

export const trackEvent = (eventNameOrObject, eventData) => {
  if (
    isTrackingDisabled ||
    getAnalyticsConsent() !== 'granted' ||
    !isAnalyticsSupported()
  ) {
    return;
  }

  if (!isInitialized) {
    initAnalytics();
  }

  let eventName = '';
  let payload = undefined;

  if (typeof eventNameOrObject === 'string') {
    eventName = eventNameOrObject.trim();
    payload = sanitizeEventData(eventData);
  } else if (eventNameOrObject && typeof eventNameOrObject === 'object') {
    const { category, action, label, value } = eventNameOrObject;
    eventName = action ? `${category || 'event'}_${action}`.toLowerCase() : 'custom_event';
    const rawPayload = {};
    if (label !== undefined) rawPayload.label = label;
    if (value !== undefined) rawPayload.value = value;
    payload = sanitizeEventData(rawPayload);
  }

  if (!eventName) return;

  try {
    if (
      typeof window !== 'undefined' &&
      window.umami &&
      typeof window.umami.track === 'function'
    ) {
      if (payload) {
        window.umami.track(eventName, payload);
      } else {
        window.umami.track(eventName);
      }
    }
  } catch (error) {
    console.error('[Analytics] Error tracking event:', error);
  }
};

export const resetAnalyticsForTests = () => {
  isInitialized = false;
  isTrackingDisabled = false;
  if (typeof document !== 'undefined') {
    const scripts = document.querySelectorAll('script[data-website-id]');
    scripts.forEach((s) => s.remove());
  }
};
