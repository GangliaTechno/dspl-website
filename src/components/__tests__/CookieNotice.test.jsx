import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CookieNotice from '../CookieNotice';
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_CONSENT_KEY,
} from '../../utils/analytics';

describe('CookieNotice', () => {
  beforeEach(() => window.localStorage.clear());

  const renderNotice = () => render(
    <MemoryRouter>
      <CookieNotice />
    </MemoryRouter>,
  );

  it('offers a clear choice and privacy link when no choice exists', () => {
    renderNotice();

    expect(screen.getByRole('region', { name: 'Analytics preferences' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Allow analytics' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
  });

  it.each([
    ['Allow analytics', 'granted'],
    ['Decline', 'denied'],
  ])('persists %s and closes the notice', (buttonName, expected) => {
    const listener = vi.fn();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, listener);
    renderNotice();

    fireEvent.click(screen.getByRole('button', { name: buttonName }));

    expect(window.localStorage.getItem(ANALYTICS_CONSENT_KEY)).toBe(expected);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('region', { name: 'Analytics preferences' })).not.toBeInTheDocument();
    window.removeEventListener(ANALYTICS_CONSENT_EVENT, listener);
  });

  it('stays hidden after a choice has already been saved', () => {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, 'denied');
    renderNotice();
    expect(screen.queryByRole('region', { name: 'Analytics preferences' })).not.toBeInTheDocument();
  });
});
