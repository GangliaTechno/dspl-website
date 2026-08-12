import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import Footer from '../Footer';

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );

describe('Footer', () => {
  it('renders one global consultation CTA before the corporate information', () => {
    const { container } = renderFooter();

    expect(container.querySelector('.footer-banner')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Ready to build something that lasts?'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Innovating Today for a Smarter Tomorrow'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /get in touch/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Start a conversation')).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Ready to build with greater clarity?',
    })).toBeInTheDocument();
    expect(screen.getByText(
      'Tell us what you are building, where you need support, and what a successful next step looks like.',
    )).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact DSPL' })).toHaveAttribute(
      'href',
      '/contact',
    );

    expect(
      screen.getByText(
        'Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Contact' })).toBeInTheDocument();

    expect(
      screen.getByAltText('Dashapatmaja Solutions Pvt Ltd logo'),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashapatmaja Solutions Pvt Ltd on LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/dashapatmaja-solutions-private-limited/',
    );

    for (const [name, href] of [
      ['Marketing', '/marketing'],
      ['Branding', '/branding'],
      ['E-commerce', '/ecommerce'],
      ['Our Brands', '/brands'],
      ['About Our Company', '/about'],
      ['Privacy Policy', '/privacy'],
      ['director@dashapatmaja.in', 'mailto:director@dashapatmaja.in'],
      ['Call +91 88619 42440', '#phone'],
    ]) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
    }
  });

  it('keeps the back-to-top action available', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    renderFooter();
    fireEvent.click(screen.getByRole('button', { name: 'Back to top of page' }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollTo.mockRestore();
  });
});
