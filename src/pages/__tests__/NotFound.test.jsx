import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';
import NotFound from '../NotFound';

const { trackEvent } = vi.hoisted(() => ({ trackEvent: vi.fn() }));

vi.mock('../../utils/analytics', () => ({ trackEvent }));

describe('NotFound Page Component', () => {
  it('renders recovery actions, popular routes, and 404 analytics for an unknown pathname', () => {
    render(
      <MemoryRouter initialEntries={['/missing-page']}>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('/missing-page')).toBeInTheDocument();
    expect(screen.getByText(/does not exist, has been removed, or is temporarily unavailable/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Explore popular sections' })).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Our Brands' })).toHaveAttribute('href', '/brands');
    expect(screen.getByRole('link', { name: 'Marketing' })).toHaveAttribute('href', '/marketing');
    expect(screen.getByRole('link', { name: 'Branding' })).toHaveAttribute('href', '/branding');
    expect(screen.getByRole('link', { name: 'E-Commerce' })).toHaveAttribute('href', '/ecommerce');
    expect(screen.getByRole('link', { name: /contact us/i })).toHaveAttribute('href', '/contact');
    expect(screen.queryByText('Contact Support')).not.toBeInTheDocument();

    expect(trackEvent).toHaveBeenCalledWith({
      category: 'navigation',
      action: '404_not_found',
      label: '/missing-page'
    });
  });
});
