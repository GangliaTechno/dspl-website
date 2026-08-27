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
    expect(getFooterCta('/brands')).toMatchObject({
      label: 'Start a project',
      href: '/start',
    });
    expect(getFooterCta('/branding')).toEqual({
      eyebrow: 'Build with us',
      title: 'Ready to build with fewer unknowns?',
      text: 'Tell us what you are building, where you need support and what a good next step looks like.',
      label: 'Start a branding project',
      href: '/start',
    });
    expect(getFooterCta('/marketing')).toEqual({
      eyebrow: 'Build with us',
      title: 'Ready to build with fewer unknowns?',
      text: 'Tell us what you are building, where you need support and what a good next step looks like.',
      label: 'Start a marketing project',
      href: '/start',
    });
    expect(getFooterCta('/ecommerce')).toEqual({
      eyebrow: 'Build with us',
      title: 'Ready to build with fewer unknowns?',
      text: 'Tell us what you are building, where you need support and what a good next step looks like.',
      label: 'Start an e-commerce project',
      href: '/start',
    });
    expect(getFooterCta('/about')).toEqual({
      eyebrow: 'Build with us',
      title: 'Ready to build with fewer unknowns?',
      text: 'Tell us what you are building, where you need support and what a good next step looks like.',
      label: 'Contact DSPL',
      href: '/contact',
    });
    expect(getFooterCta('/contact')).toBeNull();
    expect(getFooterCta('/start')).toBeNull();
    expect(getFooterCta('/privacy')).toBeNull();
    expect(getFooterCta('/terms')).toBeNull();
    expect(getFooterCta('/blogs').href).toBe('/contact');
  });

  it('renders the Brands CTA with the project-start destination', () => {
    const { container } = renderFooter('/brands');
    const cta = container.querySelector('.footer-cta-strip');

    expect(cta).toBeInTheDocument();
    expect(cta?.querySelector('.footer-cta-btn')).toHaveTextContent('Start a project');
    expect(cta?.querySelector('.footer-cta-btn')).toHaveAttribute('href', '/start');
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
        name: 'Turn a promising idea into a working project.',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Tell us the context, the constraint and the outcome you need. We reply within one working day.',
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
    expect(screen.getByText('Monday – Saturday')).toBeInTheDocument();
    expect(screen.getByText('9:00 AM – 6:00 PM IST')).toBeInTheDocument();
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

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Ready to build with fewer unknowns?',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Tell us what you are building, where you need support and what a good next step looks like.'),
    ).toBeInTheDocument();

    const contactLinks = screen.getAllByRole('link', { name: 'Contact DSPL' });
    expect(contactLinks.some((link) => link.classList.contains('footer-cta-btn'))).toBe(true);
  });

  it('keeps the back-to-top action available', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    renderFooter();
    fireEvent.click(screen.getByRole('button', { name: 'Back to top of page' }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollTo.mockRestore();
  });
});
