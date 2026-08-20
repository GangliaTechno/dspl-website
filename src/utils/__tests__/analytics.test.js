import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_KEY,
  getAnalyticsConsent,
  getUmamiConfig,
  initAnalytics,
  isAnalyticsSupported,
  resetAnalyticsForTests,
  sanitizeEventData,
  sanitizePath,
  setAnalyticsConsent,
  trackEvent,
} from '../analytics';

describe('Umami analytics utility', () => {
  const TEST_SCRIPT_URL = 'https://cloud.umami.is/script.js';
  const TEST_WEBSITE_ID = '12345678-abcd-1234-abcd-1234567890ab';
  const TEST_DOMAINS = 'dashapatmaja.in,www.dashapatmaja.in';

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
    vi.stubEnv('VITE_UMAMI_SCRIPT_URL', TEST_SCRIPT_URL);
    vi.stubEnv('VITE_UMAMI_WEBSITE_ID', TEST_WEBSITE_ID);
    vi.stubEnv('VITE_UMAMI_DOMAINS', TEST_DOMAINS);
    setMockHostname('dashapatmaja.in');
  });

  describe('configuration & environment support', () => {
    it('reads configuration correctly from env', () => {
      const config = getUmamiConfig();
      expect(config.scriptUrl).toBe(TEST_SCRIPT_URL);
      expect(config.websiteId).toBe(TEST_WEBSITE_ID);
      expect(config.domains).toBe(TEST_DOMAINS);
    });

    it('returns false when script URL or website ID is missing', () => {
      vi.stubEnv('VITE_UMAMI_SCRIPT_URL', '');
      expect(isAnalyticsSupported()).toBe(false);

      vi.stubEnv('VITE_UMAMI_SCRIPT_URL', TEST_SCRIPT_URL);
      vi.stubEnv('VITE_UMAMI_WEBSITE_ID', '');
      expect(isAnalyticsSupported()).toBe(false);
    });

    it('returns false in development mode', () => {
      vi.stubEnv('DEV', true);
      vi.stubEnv('MODE', 'development');
      expect(isAnalyticsSupported()).toBe(false);
    });

    it('validates domain allowlist correctly', () => {
      vi.stubEnv('MODE', 'production');
      vi.stubEnv('PROD', true);
      vi.stubEnv('DEV', false);

      // Matches allowed domain
      setMockHostname('dashapatmaja.in');
      expect(isAnalyticsSupported()).toBe(true);

      // Matches www subdomain
      setMockHostname('www.dashapatmaja.in');
      expect(isAnalyticsSupported()).toBe(true);

      // Rejects unlisted domain
      setMockHostname('staging.preview.com');
      expect(isAnalyticsSupported()).toBe(false);

      // Rejects localhost
      setMockHostname('localhost');
      expect(isAnalyticsSupported()).toBe(false);
    });
  });

  describe('consent management & revocation', () => {
    it('stores and reports only explicit consent values', () => {
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

    it('injects Umami script with correct attributes only when consent is granted', () => {
      setAnalyticsConsent('granted');
      initAnalytics();

      const script = document.querySelector(`script[data-website-id="${TEST_WEBSITE_ID}"]`);
      expect(script).not.toBeNull();
      expect(script?.getAttribute('src')).toBe(TEST_SCRIPT_URL);
      expect(script?.getAttribute('data-domains')).toBe(TEST_DOMAINS);
      expect(script?.getAttribute('data-do-not-track')).toBe('true');
      expect(script?.getAttribute('data-performance')).toBe('true');
      expect(script?.defer).toBe(true);
    });

    it('does not create duplicate script tags on multiple initAnalytics calls', () => {
      setAnalyticsConsent('granted');
      initAnalytics();
      initAnalytics();

      const scripts = document.querySelectorAll(`script[data-website-id="${TEST_WEBSITE_ID}"]`);
      expect(scripts.length).toBe(1);
    });

    it.each([null, 'denied'])('does not inject script when consent is %s', (choice) => {
      if (choice) window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
      initAnalytics();

      const script = document.querySelector('script[data-website-id]');
      expect(script).toBeNull();
    });

    it('explicitly stops tracking when consent is revoked after being granted', () => {
      const mockTrack = vi.fn();
      window.umami = { track: mockTrack };

      // User grants consent
      setAnalyticsConsent('granted');
      trackEvent('cta_start_project');
      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(mockTrack).toHaveBeenCalledWith('cta_start_project');

      // User revokes consent
      setAnalyticsConsent('denied');
      trackEvent('cta_start_project');
      // Must not have fired another track call
      expect(mockTrack).toHaveBeenCalledTimes(1);
    });
  });

  describe('event dispatching & PII prevention', () => {
    it('dispatches custom events to window.umami.track safely', () => {
      const mockTrack = vi.fn();
      window.umami = { track: mockTrack };
      setAnalyticsConsent('granted');

      trackEvent('lead_form_submit_success', {
        form: 'project_planner',
        source: 'homepage',
      });

      expect(mockTrack).toHaveBeenCalledWith('lead_form_submit_success', {
        form: 'project_planner',
        source: 'homepage',
      });
    });

    it('normalizes legacy event object format safely', () => {
      const mockTrack = vi.fn();
      window.umami = { track: mockTrack };
      setAnalyticsConsent('granted');

      trackEvent({ category: 'contact_form', action: 'generate_lead', label: 'compliance' });
      expect(mockTrack).toHaveBeenCalledWith('contact_form_generate_lead', {
        label: 'compliance',
      });
    });

    it('does not throw when window.umami is undefined', () => {
      delete window.umami;
      setAnalyticsConsent('granted');
      expect(() => trackEvent('cta_start_project')).not.toThrow();
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

