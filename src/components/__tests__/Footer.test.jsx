import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import Footer from '../Footer';
import { getFooterCta } from '../../content/footerCtas';

const renderFooter = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Footer />
    </MemoryRouter>,
  );

describe('Footer', () => {
  it('selects route-specific CTAs and suppresses transactional/legal routes', () => {
    expect(getFooterCta('/').href).toBe('/start');
    expect(getFooterCta('/brands').href).toBe('/brands/raw-radicles');
    expect(getFooterCta('/branding').href).toBe('/start');
    expect(getFooterCta('/marketing').href).toBe('/start');
    expect(getFooterCta('/ecommerce').href).toBe('/start');
    expect(getFooterCta('/about')).toEqual({
      eyebrow: 'Work with DSPL',
      title: 'Bring us the context. We will help define the next step.',
      text: 'Tell us what you are building, where you need support and what a good next step looks like.',
      label: 'Start a project',
      href: '/start',
    });
    expect(getFooterCta('/contact')).toBeNull();
    expect(getFooterCta('/start')).toBeNull();
    expect(getFooterCta('/privacy')).toBeNull();
    expect(getFooterCta('/terms')).toBeNull();
    expect(getFooterCta('/blogs').href).toBe('/start');
  });

  it('renders the Home CTA before verified corporate information', () => {
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
    expect(screen.getByText('Build with us')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Bring us the context. We will help define the next step.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Share where the business stands, what needs support, and what a useful outcome looks like. We reply within one working day.',
      ),
    ).toBeInTheDocument();
    for (const link of screen.getAllByRole('link', { name: 'Start a project' })) {
      expect(link).toHaveAttribute('href', '/start');
    }

    expect(
      screen.getByText(
        'Dashapatmaja Solutions Pvt Ltd develops consumer brands and provides branding, marketing, and e-commerce services.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Company' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Legal' })).toBeInTheDocument();
    expect(screen.queryByText('Incorporated')).not.toBeInTheDocument();
    expect(screen.queryByText('28 July 2022')).not.toBeInTheDocument();
    expect(screen.queryByText('MUTBI/MAHE')).not.toBeInTheDocument();
    expect(screen.queryByText('DST-NIDHI PRAYAS')).not.toBeInTheDocument();
    expect(screen.getByText(/Monday – Saturday: 9:00 AM – 6:00 PM IST/)).toBeInTheDocument();
    expect(screen.getByText(/Madhava Nagar, Manipal.*576104/)).toBeInTheDocument();
    expect(
      screen.getByText('© 2026 Dashapatmaja Solutions Pvt Ltd. All rights reserved.'),
    ).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/Â|Ã|â€|â€”/);

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
      ['Terms of Use', '/terms'],
      ['director@dashapatmaja.in', 'mailto:director@dashapatmaja.in'],
      ['dsplmanipal@gmail.com', 'mailto:dsplmanipal@gmail.com'],
      ['Call +91 88619 42440', 'tel:+918861942440'],
      ['Call +91 90725 56665', 'tel:+919072556665'],
    ]) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
    }
  });

  it('suppresses the closing CTA on Contact', () => {
    renderFooter('/contact');

    expect(screen.queryByLabelText('Closing call to action')).not.toBeInTheDocument();
  });

  it('renders the centralized Insights CTA on the /blogs route', () => {
    renderFooter('/blogs');

    expect(screen.getByText('From insight to execution')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Have a brand, market or commerce challenge worth working through?',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Bring the context, constraints, and outcome you are working towards.'),
    ).toBeInTheDocument();

    const startLinks = screen.getAllByRole('link', { name: 'Start a project' });
    expect(startLinks.some((link) => link.classList.contains('footer-cta-btn'))).toBe(true);
  });

  it('keeps the back-to-top action available', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    renderFooter();
    fireEvent.click(screen.getByRole('button', { name: 'Back to top of page' }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollTo.mockRestore();
  });
});
