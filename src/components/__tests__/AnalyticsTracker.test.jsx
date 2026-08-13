import { act, fireEvent, render, screen } from '@testing-library/react';
import { Link, MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AnalyticsTracker from '../AnalyticsTracker';
import {
  ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
  initGA,
  trackPageView,
} from '../../utils/analytics';

vi.mock('../../utils/analytics', () => ({
  ANALYTICS_CONSENT_EVENT: 'dspl:analytics-consent',
  getAnalyticsConsent: vi.fn(),
  initGA: vi.fn(),
  trackPageView: vi.fn(),
}));

const Harness = () => (
  <MemoryRouter initialEntries={['/about']}>
    <AnalyticsTracker />
    <Link to="/contact?from=test">Contact</Link>
  </MemoryRouter>
);

describe('AnalyticsTracker', () => {
  beforeEach(() => vi.clearAllMocks());

  it('initializes once and tracks granted route changes', () => {
    getAnalyticsConsent.mockReturnValue('granted');
    render(<Harness />);

    expect(initGA).toHaveBeenCalledTimes(1);
    expect(trackPageView).toHaveBeenLastCalledWith('/about');

    fireEvent.click(screen.getByRole('link', { name: 'Contact' }));
    expect(initGA).toHaveBeenCalledTimes(2);
    expect(trackPageView).toHaveBeenLastCalledWith('/contact?from=test');
  });

  it.each([null, 'denied'])('does nothing when consent is %s', (choice) => {
    getAnalyticsConsent.mockReturnValue(choice);
    render(<Harness />);
    expect(initGA).not.toHaveBeenCalled();
    expect(trackPageView).not.toHaveBeenCalled();
  });

  it('tracks the current path when consent is newly granted', () => {
    getAnalyticsConsent.mockReturnValue(null);
    render(<Harness />);

    act(() => {
      window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, {
        detail: 'granted',
      }));
    });

    expect(initGA).toHaveBeenCalledTimes(1);
    expect(trackPageView).toHaveBeenCalledWith('/about');
  });
});
