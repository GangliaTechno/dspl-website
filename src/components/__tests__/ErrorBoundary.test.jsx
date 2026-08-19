import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';

const GoodChild = () => <div>All good</div>;
const BadChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children normally when no error', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('displays fallback UI when a child component throws', () => {
    render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
    expect(screen.getByText(/An unexpected error occurred/i)).toBeInTheDocument();
  });

  it('shows the Refresh Page button that reloads the page', () => {
    const reloadMock = vi.fn();
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...originalLocation, reload: reloadMock },
    });

    render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>,
    );

    const refreshButton = screen.getByRole('button', { name: 'Refresh Page' });
    fireEvent.click(refreshButton);
    expect(reloadMock).toHaveBeenCalledTimes(1);

    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  it('shows the Contact Us action linking directly to /contact', () => {
    render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>,
    );

    const contactLink = screen.getByRole('link', { name: 'Contact Us' });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
});

