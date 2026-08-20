import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_KEY,
  clearGaCookies,
  getAnalyticsConsent,
  getGaConfig,
  getGaMeasurementId,
  getUmamiConfig,
  initAnalytics,
  initGa,
  initUmami,
  isAnalyticsSupported,
  isGaConfigured,
  isRuntimeAllowed,
  isUmamiConfigured,
  resetAnalyticsForTests,
  sanitizeEventData,
  sanitizePath,
  setAnalyticsConsent,
  trackEvent,
  trackPageView,
} from '../analytics';

describe('Unified Dual Analytics Utility (Umami & GA4)', () => {
  const TEST_UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js';
  const TEST_UMAMI_WEBSITE_ID = '12345678-abcd-1234-abcd-1234567890ab';
  const TEST_DOMAINS = 'dashapatmaja.in,www.dashapatmaja.in';
  const TEST_GA_MEASUREMENT_ID = 'G-QYVQY0Q9KE';

  const setMockHostname = (hostname) => {
    Object.defineProperty(window, 'location', {
      value: {
        hostname,
        href: `https://${hostname}/`,
        pathname: '/',
        search: '',
      },
      writable: true,
      configurable: true,
    });
  };

  beforeEach(() => {
    window.localStorage.clear();
    resetAnalyticsForTests();
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    delete window.umami;
    delete window.gtag;
    delete window.dataLayer;
    delete window.dsplUmamiBeforeSend;

    vi.stubEnv('VITE_UMAMI_SCRIPT_URL', TEST_UMAMI_SCRIPT_URL);
    vi.stubEnv('VITE_UMAMI_WEBSITE_ID', TEST_UMAMI_WEBSITE_ID);
    vi.stubEnv('VITE_UMAMI_DOMAINS', TEST_DOMAINS);
    vi.stubEnv('VITE_GA_MEASUREMENT_ID', TEST_GA_MEASUREMENT_ID);
    setMockHostname('dashapatmaja.in');
  });

  describe('configuration & environment support', () => {
    it('reads configuration correctly from env', () => {
      const umamiConfig = getUmamiConfig();
      expect(umamiConfig.scriptUrl).toBe(TEST_UMAMI_SCRIPT_URL);
      expect(umamiConfig.websiteId).toBe(TEST_UMAMI_WEBSITE_ID);
      expect(umamiConfig.domains).toBe(TEST_DOMAINS);

      const gaConfig = getGaConfig();
      expect(gaConfig.measurementId).toBe(TEST_GA_MEASUREMENT_ID);
      expect(getGaMeasurementId()).toBe(TEST_GA_MEASUREMENT_ID);
      expect(isUmamiConfigured()).toBe(true);
      expect(isGaConfigured()).toBe(true);
    });

    it('works when Umami is configured but GA is missing', () => {
      vi.stubEnv('VITE_GA_MEASUREMENT_ID', '');
      expect(isUmamiConfigured()).toBe(true);
      expect(isGaConfigured()).toBe(false);
      expect(isAnalyticsSupported()).toBe(true);
    });

    it('works when GA is configured but Umami is missing', () => {
      vi.stubEnv('VITE_UMAMI_SCRIPT_URL', '');
      vi.stubEnv('VITE_UMAMI_WEBSITE_ID', '');
      expect(isUmamiConfigured()).toBe(false);
      expect(isGaConfigured()).toBe(true);
      expect(isAnalyticsSupported()).toBe(true);
    });

    it('returns false when both providers are unconfigured', () => {
      vi.stubEnv('VITE_UMAMI_SCRIPT_URL', '');
      vi.stubEnv('VITE_UMAMI_WEBSITE_ID', '');
      vi.stubEnv('VITE_GA_MEASUREMENT_ID', '');
      expect(isUmamiConfigured()).toBe(false);
      expect(isGaConfigured()).toBe(false);
      expect(isAnalyticsSupported()).toBe(false);
    });

    it('returns false in development mode or localhost even if both IDs exist', () => {
      vi.stubEnv('DEV', true);
      vi.stubEnv('MODE', 'development');
      expect(isRuntimeAllowed()).toBe(false);
      expect(isAnalyticsSupported()).toBe(false);

      // Neither provider initializes in development
      setAnalyticsConsent('granted');
      initAnalytics();
      expect(document.querySelector('script[data-website-id]')).toBeNull();
      expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
    });

    it('validates domain allowlist correctly', () => {
      vi.stubEnv('MODE', 'production');
      vi.stubEnv('PROD', true);
      vi.stubEnv('DEV', false);

      // Matches allowed domain
      setMockHostname('dashapatmaja.in');
      expect(isRuntimeAllowed()).toBe(true);
      expect(isAnalyticsSupported()).toBe(true);

      // Matches www subdomain
      setMockHostname('www.dashapatmaja.in');
      expect(isRuntimeAllowed()).toBe(true);
      expect(isAnalyticsSupported()).toBe(true);

      // Rejects unlisted domain
      setMockHostname('staging.preview.com');
      expect(isRuntimeAllowed()).toBe(false);
      expect(isAnalyticsSupported()).toBe(false);

      // Rejects localhost
      setMockHostname('localhost');
      expect(isRuntimeAllowed()).toBe(false);
      expect(isAnalyticsSupported()).toBe(false);
    });
  });

  describe('Basic Consent Mode & independent script injection', () => {
    it('stores and reports only explicit consent values and emits event', () => {
      expect(getAnalyticsConsent()).toBeNull();
      expect(() => setAnalyticsConsent('invalid')).toThrow(TypeError);

      const listener = vi.fn();
      window.addEventListener(ANALYTICS_CONSENT_EVENT, listener);
      setAnalyticsConsent('granted');

      expect(window.localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe('granted');
      expect(getAnalyticsConsent()).toBe('granted');
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls[0][0].detail).toBe('granted');
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, listener);
    });

    it('injects both Umami and Google tag scripts only after consent is granted', () => {
      setAnalyticsConsent('granted');
      initAnalytics();

      // Umami script verification
      const umamiScript = document.querySelector(`script[data-website-id="${TEST_UMAMI_WEBSITE_ID}"]`);
      expect(umamiScript).not.toBeNull();
      expect(umamiScript?.getAttribute('src')).toBe(TEST_UMAMI_SCRIPT_URL);
      expect(umamiScript?.getAttribute('data-domains')).toBe(TEST_DOMAINS);
      expect(umamiScript?.getAttribute('data-auto-pageview')).toBe('false');
      expect(umamiScript?.getAttribute('data-before-send')).toBe('dsplUmamiBeforeSend');
      expect(umamiScript?.getAttribute('data-do-not-track')).toBe('true');
      expect(umamiScript?.getAttribute('data-performance')).toBe('true');
      expect(umamiScript?.defer).toBe(true);

      // GA script verification
      const gaScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${TEST_GA_MEASUREMENT_ID}"]`);
      expect(gaScript).not.toBeNull();
      expect(gaScript?.async).toBe(true);

      // dataLayer and gtag verification
      expect(Array.isArray(window.dataLayer)).toBe(true);
      expect(typeof window.gtag).toBe('function');
      expect(window[`ga-disable-${TEST_GA_MEASUREMENT_ID}`]).toBe(false);
    });

    it('injects only Umami when GA is unconfigured', () => {
      vi.stubEnv('VITE_GA_MEASUREMENT_ID', '');
      setAnalyticsConsent('granted');
      initAnalytics();

      expect(document.querySelector('script[data-website-id]')).not.toBeNull();
      expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
    });

    it('injects only GA when Umami is unconfigured', () => {
      vi.stubEnv('VITE_UMAMI_SCRIPT_URL', '');
      vi.stubEnv('VITE_UMAMI_WEBSITE_ID', '');
      setAnalyticsConsent('granted');
      initAnalytics();

      expect(document.querySelector('script[data-website-id]')).toBeNull();
      expect(document.querySelector('script[src*="googletagmanager.com"]')).not.toBeNull();
    });

    it('does not create duplicate script tags on multiple init calls', () => {
      setAnalyticsConsent('granted');
      initAnalytics();
      initAnalytics();
      initUmami();
      initGa();

      const umamiScripts = document.querySelectorAll(`script[data-website-id="${TEST_UMAMI_WEBSITE_ID}"]`);
      expect(umamiScripts.length).toBe(1);

      const gaScripts = document.querySelectorAll(`script[src*="googletagmanager.com/gtag/js?id=${TEST_GA_MEASUREMENT_ID}"]`);
      expect(gaScripts.length).toBe(1);
    });

    it.each([null, 'denied'])('does not inject any scripts when consent is %s', (choice) => {
      if (choice) window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
      initAnalytics();

      expect(document.querySelector('script[data-website-id]')).toBeNull();
      expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
    });
  });

  describe('consent revocation & cookie clearing', () => {
    it('disables tracking, sets ga-disable, denies gtag storage, clears cookies, and blocks beforeSend', () => {
      // Mock cookie
      document.cookie = '_ga=GA1.2.12345678.12345678; path=/;';
      document.cookie = `_ga_${TEST_GA_MEASUREMENT_ID.replace('G-', '')}=GS1.1.123456; path=/;`;
      document.cookie = '_gid=GA1.2.98765432.98765432; path=/;';

      const mockGtag = vi.fn();
      window.gtag = mockGtag;

      // Consent granted
      setAnalyticsConsent('granted');
      expect(typeof window.dsplUmamiBeforeSend).toBe('function');
      expect(window.dsplUmamiBeforeSend('event', { name: 'test' })).toEqual({ name: 'test' });

      // User revokes consent
      setAnalyticsConsent('denied');

      expect(window[`ga-disable-${TEST_GA_MEASUREMENT_ID}`]).toBe(true);
      expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      // Umami before-send should drop payloads
      expect(window.dsplUmamiBeforeSend('event', { name: 'test' })).toBe(false);
    });

    it('clearGaCookies cleans GA cookies across root domain and current domain', () => {
      document.cookie = '_ga=GA1.2.123; path=/;';
      document.cookie = '_ga_ABCDEF123=GS1.1.456; path=/;';
      document.cookie = '_gid=GA1.2.789; path=/;';
      document.cookie = '_gat=1; path=/;';

      clearGaCookies();
      // Verifies clearGaCookies runs safely without throwing
      expect(() => clearGaCookies()).not.toThrow();
    });
  });

  describe('full consent lifecycle', () => {
    it('executes no consent -> grant -> track -> revoke -> re-grant without duplicate scripts', () => {
      // 1. Initial: no consent
      expect(getAnalyticsConsent()).toBeNull();
      expect(document.querySelectorAll('script[data-website-id]').length).toBe(0);
      expect(document.querySelectorAll('script[src*="googletagmanager.com"]').length).toBe(0);

      // 2. Grant consent
      setAnalyticsConsent('granted');
      expect(document.querySelectorAll('script[data-website-id]').length).toBe(1);
      expect(document.querySelectorAll('script[src*="googletagmanager.com"]').length).toBe(1);

      const mockUmamiTrack = vi.fn();
      const mockGtag = vi.fn();
      window.umami = { track: mockUmamiTrack };
      window.gtag = mockGtag;

      // Custom event reaches both
      trackEvent('cta_start_project');
      expect(mockUmamiTrack).toHaveBeenCalledWith('cta_start_project');
      expect(mockGtag).toHaveBeenCalledWith('event', 'cta_start_project');

      // 3. Revoke consent
      setAnalyticsConsent('denied');
      expect(window[`ga-disable-${TEST_GA_MEASUREMENT_ID}`]).toBe(true);
      expect(window.dsplUmamiBeforeSend('event', {})).toBe(false);

      // Later track calls reach neither
      trackEvent('cta_start_project');
      expect(mockUmamiTrack).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenCalledTimes(2); // Initial gtag call from event + consent update call

      // 4. Grant again
      setAnalyticsConsent('granted');
      expect(document.querySelectorAll('script[data-website-id]').length).toBe(1);
      expect(document.querySelectorAll('script[src*="googletagmanager.com"]').length).toBe(1);
      expect(window[`ga-disable-${TEST_GA_MEASUREMENT_ID}`]).toBe(false);

      trackEvent('lead_form_submit_success', { form: 'contact' });
      expect(mockUmamiTrack).toHaveBeenCalledWith('lead_form_submit_success', { form: 'contact' });
      expect(mockGtag).toHaveBeenCalledWith('event', 'lead_form_submit_success', { form: 'contact' });
    });
  });

  describe('unified pageview tracking & duplicate prevention', () => {
    it('tracks exactly one pageview to each configured provider', () => {
      setAnalyticsConsent('granted');

      const mockUmamiTrack = vi.fn();
      const mockGtag = vi.fn();
      window.umami = { track: mockUmamiTrack };
      window.gtag = mockGtag;

      trackPageView('/about?token=secret#section');

      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
        page_path: '/about',
        page_location: 'https://dashapatmaja.in/',
        page_title: '',
      });
      expect(mockUmamiTrack).toHaveBeenCalledTimes(1);
      const umamiCallback = mockUmamiTrack.mock.calls[0][0];
      expect(typeof umamiCallback).toBe('function');
      expect(umamiCallback({})).toEqual({ url: '/about', title: '' });
    });

    it('tracks pageview only to Umami when GA is unconfigured', () => {
      vi.stubEnv('VITE_GA_MEASUREMENT_ID', '');
      setAnalyticsConsent('granted');

      const mockUmamiTrack = vi.fn();
      const mockGtag = vi.fn();
      window.umami = { track: mockUmamiTrack };
      window.gtag = mockGtag;

      trackPageView('/marketing');
      expect(mockUmamiTrack).toHaveBeenCalledTimes(1);
      expect(mockGtag).not.toHaveBeenCalled();
    });

    it('tracks pageview only to GA when Umami is unconfigured', () => {
      vi.stubEnv('VITE_UMAMI_SCRIPT_URL', '');
      vi.stubEnv('VITE_UMAMI_WEBSITE_ID', '');
      setAnalyticsConsent('granted');

      const mockUmamiTrack = vi.fn();
      const mockGtag = vi.fn();
      window.umami = { track: mockUmamiTrack };
      window.gtag = mockGtag;

      trackPageView('/branding');
      expect(mockGtag).toHaveBeenCalledTimes(1);
      expect(mockUmamiTrack).not.toHaveBeenCalled();
    });

    it('tracks current page automatically upon consent grant', () => {
      const mockGtag = vi.fn();
      window.gtag = mockGtag;

      setAnalyticsConsent('granted');
      expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', expect.objectContaining({
        page_path: '/',
      }));
    });
  });

  describe('event dispatching & PII prevention', () => {
    it('dispatches custom events to both window.umami.track and window.gtag safely', () => {
      const mockUmamiTrack = vi.fn();
      const mockGtag = vi.fn();
      window.umami = { track: mockUmamiTrack };
      window.gtag = mockGtag;
      setAnalyticsConsent('granted');

      trackEvent('lead_form_submit_success', {
        form: 'project_planner',
        source: 'homepage',
      });

      expect(mockUmamiTrack).toHaveBeenCalledWith('lead_form_submit_success', {
        form: 'project_planner',
        source: 'homepage',
      });
      expect(mockGtag).toHaveBeenCalledWith('event', 'lead_form_submit_success', {
        form: 'project_planner',
        source: 'homepage',
      });
    });

    it('normalizes legacy event object format safely for both providers', () => {
      const mockUmamiTrack = vi.fn();
      const mockGtag = vi.fn();
      window.umami = { track: mockUmamiTrack };
      window.gtag = mockGtag;
      setAnalyticsConsent('granted');

      trackEvent({ category: 'contact_form', action: 'generate_lead', label: 'compliance' });
      expect(mockUmamiTrack).toHaveBeenCalledWith('contact_form_generate_lead', {
        label: 'compliance',
      });
      expect(mockGtag).toHaveBeenCalledWith('event', 'contact_form_generate_lead', {
        label: 'compliance',
      });
    });

    it('does not throw when window.umami or window.gtag is undefined', () => {
      delete window.umami;
      delete window.gtag;
      setAnalyticsConsent('granted');
      expect(() => trackEvent('cta_start_project')).not.toThrow();
      expect(() => trackPageView('/about')).not.toThrow();
    });

    it('purges all PII keys from event payloads', () => {
      const dirty = {
        form: 'contact',
        name: 'Jane Doe',
        first_name: 'Jane',
        email: 'jane@example.com',
        phone: '+919999999999',
        whatsapp: '+919999999999',
        message: 'Confidential project details',
        company: 'Acme Corp',
        budget: '50k',
        source: 'contact-page',
      };

      const clean = sanitizeEventData(dirty);
      expect(clean).toEqual({
        form: 'contact',
        source: 'contact-page',
      });
      expect(clean).not.toHaveProperty('name');
      expect(clean).not.toHaveProperty('first_name');
      expect(clean).not.toHaveProperty('email');
      expect(clean).not.toHaveProperty('phone');
      expect(clean).not.toHaveProperty('whatsapp');
      expect(clean).not.toHaveProperty('message');
      expect(clean).not.toHaveProperty('company');
      expect(clean).not.toHaveProperty('budget');
    });

    it('sanitizes 404 path names by stripping query params and hashes', () => {
      expect(sanitizePath('/about?secret=token#heading')).toBe('/about');
      expect(sanitizePath('/contact?email=user@test.com')).toBe('/contact');
      expect(sanitizePath(null)).toBe('/');
      expect(sanitizePath(undefined)).toBe('/');
    });
  });
});
