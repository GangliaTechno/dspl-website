import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PrivacyPolicy from '../PrivacyPolicy';
import { setAnalyticsConsent } from '../../utils/analytics';

vi.mock('../../hooks/useSEO', () => ({ default: vi.fn() }));
vi.mock('../../utils/analytics', () => ({
  getAnalyticsConsent: vi.fn(() => null),
  setAnalyticsConsent: vi.fn(),
}));

describe('Privacy Policy', () => {
  it('describes the evidence-limited data lifecycle and applicable framework', () => {
    const { container } = render(<PrivacyPolicy />);

    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
    expect(container).toHaveTextContent('Digital Personal Data Protection Act, 2023');
    expect(container).toHaveTextContent(/as applicable provisions take effect/i);
    expect(container).toHaveTextContent(/Contact form/i);
    expect(container).toHaveTextContent(/project planner/i);
    expect(container).toHaveTextContent(/Web3Forms/i);
    expect(container).toHaveTextContent(/United States US-East Region/i);
    expect(container).toHaveTextContent(/server logs.*deleted periodically/i);
    expect(container).toHaveTextContent(/Umami Analytics/i);
    expect(container).toHaveTextContent(/cookie-free/i);
    expect(container).not.toHaveTextContent(/Google Analytics/i);
  });

  it('links processor documentation and the company contact', () => {
    render(<PrivacyPolicy />);

    expect(screen.getByRole('link', { name: 'Web3Forms privacy documentation' }))
      .toHaveAttribute('href', 'https://docs.web3forms.com/getting-started/faq');
    expect(screen.getByRole('link', { name: 'director@dashapatmaja.in' }))
      .toHaveAttribute('href', 'mailto:director@dashapatmaja.in');
    expect(screen.getByRole('link', { name: 'Call +91 88619 42440' }))
      .toHaveAttribute('href', 'tel:+918861942440');
  });

  it('offers persistent analytics consent controls', () => {
    render(<PrivacyPolicy />);
    fireEvent.click(screen.getByRole('button', { name: 'Allow analytics' }));
    expect(setAnalyticsConsent).toHaveBeenCalledWith('granted');
    fireEvent.click(screen.getByRole('button', { name: 'Decline analytics' }));
    expect(setAnalyticsConsent).toHaveBeenCalledWith('denied');
  });

  it('does not invent roles, retention promises, or legacy contacts', () => {
    const { container } = render(<PrivacyPolicy />);
    expect(container).not.toHaveTextContent(/Grievance Officer/i);
    expect(container).not.toHaveTextContent(/retain(?:ed)? for \d+ days/i);
    expect(container).not.toHaveTextContent(/dashapatmajasolutions@gmail\.com/i);
  });
});
