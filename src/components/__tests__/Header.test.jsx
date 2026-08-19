import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { afterEach, describe, it, expect } from 'vitest';
import Header from '../Header';

const originalInnerWidth = window.innerWidth;

afterEach(() => {
  window.innerWidth = originalInnerWidth;
});

describe('Header Component', () => {
  it('renders logo and main navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(
      screen.getByAltText('Dashapatmaja Solutions Pvt Ltd logo'),
    ).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main Navigation' })).toBeInTheDocument();
    expect(screen.getAllByText('About')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
    for (const link of screen.getAllByRole('link', { name: 'Start a Project' })) {
      expect(link).toHaveAttribute('href', '/start');
    }
    expect(screen.queryByRole('link', { name: 'Blogs' })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /work with us/i }),
    ).not.toBeInTheDocument();

    const desktopNav = screen.getByRole('navigation', { name: 'Main Navigation' });
    expect(
      within(desktopNav).getAllByRole('link').map((link) => link.textContent),
    ).toEqual([
      'About',
      'Brands',
      'Marketing',
      'Branding',
      'E-commerce',
      'Contact',
    ]);
  });

  it('toggles mobile menu button with proper ARIA attributes', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // When closed the label reads "Open navigation menu"
    const toggleBtn = screen.getByLabelText('Open navigation menu');
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    expect(toggleBtn).toHaveAttribute('tabindex', '-1');
  });

  it('keeps the drawer open through 1039px and closes it at 1040px', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // Button label is "Open navigation menu" when closed
    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);

    window.innerWidth = 1039;
    fireEvent(window, new Event('resize'));
    // After click, label is "Close navigation menu" — but element is same button
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    window.innerWidth = 1040;
    fireEvent(window, new Event('resize'));
    expect(screen.getByLabelText('Open navigation menu')).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps the internal drawer close control inside the keyboard focus cycle', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);

    const drawer = screen.getByRole('dialog', { name: 'Navigation menu' });
    const closeButton = within(drawer).getByRole('button', {
      name: 'Close navigation menu',
    });
    const startProject = within(drawer).getByRole('link', {
      name: 'Start a Project',
    });

    await waitFor(() => expect(closeButton).toHaveFocus());
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(startProject).toHaveFocus();

    fireEvent.click(closeButton);
    expect(menuButton).toHaveFocus();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('lifts slightly while scrolling down and returns while scrolling up', async () => {
    const originalAnimationFrame = window.requestAnimationFrame;
    const originalCancelAnimationFrame = window.cancelAnimationFrame;

    window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0);
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 0,
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const header = screen.getByRole('banner');

    window.scrollY = 180;
    fireEvent.scroll(window);
    await waitFor(() => expect(header).toHaveClass('header-lifted'));
    expect(header).not.toHaveClass('header-hidden');

    window.scrollY = 100;
    fireEvent.scroll(window);
    await waitFor(() => expect(header).not.toHaveClass('header-lifted'));

    window.requestAnimationFrame = originalAnimationFrame;
    window.cancelAnimationFrame = originalCancelAnimationFrame;
    window.scrollY = 0;
  });
});
