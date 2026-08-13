import ReactGA from 'react-ga4';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_KEY,
  getAnalyticsConsent,
  initGA,
  resetAnalyticsForTests,
  setAnalyticsConsent,
  trackEvent,
  trackPageView,
} from '../analytics';

vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn(),
  },
}));

describe('consent-aware analytics', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetAnalyticsForTests();
    vi.clearAllMocks();
  });

  it('stores and reports only explicit consent values', () => {
    expect(getAnalyticsConsent()).toBeNull();
    expect(() => setAnalyticsConsent('pending')).toThrow(TypeError);

    const listener = vi.fn();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, listener);
    setAnalyticsConsent('granted');

    expect(window.localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe('granted');
    expect(getAnalyticsConsent()).toBe('granted');
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toBe('granted');
    window.removeEventListener(ANALYTICS_CONSENT_EVENT, listener);
  });

  it.each([null, 'denied'])('sends nothing when consent is %s', (choice) => {
    if (choice) window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);

    initGA();
    trackPageView('/about');
    trackEvent({ category: 'Contact', action: 'Submit' });

    expect(ReactGA.initialize).not.toHaveBeenCalled();
    expect(ReactGA.send).not.toHaveBeenCalled();
    expect(ReactGA.event).not.toHaveBeenCalled();
  });

  it('initializes once and sends page views and events after consent', () => {
    setAnalyticsConsent('granted');

    initGA();
    initGA();
    trackPageView('/contact?from=footer');
    trackEvent({ category: 'Contact', action: 'Submit', label: 'General' });

    expect(ReactGA.initialize).toHaveBeenCalledTimes(1);
    expect(ReactGA.send).toHaveBeenCalledWith({
      hitType: 'pageview',
      page: '/contact?from=footer',
    });
    expect(ReactGA.event).toHaveBeenCalledWith({
      category: 'Contact',
      action: 'Submit',
      label: 'General',
      value: undefined,
    });
  });
});
