import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Branding from '../Branding';
import Ecommerce from '../Ecommerce';
import Marketing from '../Marketing';

vi.mock('../../hooks/useSEO', () => ({ default: vi.fn() }));

const expectNoUnapprovedCommercialClaims = (container) => {
  expect(container.textContent).not.toMatch(/\u20B9|\[(?:price|duration|name|company)\]/i);
  expect(
    screen.queryByRole('region', { name: /what collaborators say/i }),
  ).not.toBeInTheDocument();

  // Prohibited claims on capability offers and compliance items
  const offersGrid = container.querySelector('.offers-grid');
  if (offersGrid) {
    expect(offersGrid.textContent).not.toMatch(/Brand Registry|A\+\s*content|headless|print supervision|contrast ratios|principal display panel|guaranteed compliance/i);
  }
  const compliance = container.querySelector('#compliance');
  if (compliance) {
    expect(compliance.textContent).not.toMatch(/A\+\s*content|print supervision|contrast ratios|principal display panel|guaranteed compliance/i);
  }
};

describe('Branding service copy', () => {
  it('renders four capabilities, five-item packaging compliance, and ten approved FAQs', () => {
    const { container } = render(<Branding />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(4);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '4');

    // Check 4 capabilities
    for (const title of [
      'Brand identity and visual systems',
      'Market positioning',
      'Brand story and voice',
      'Packaging and brand assets',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    expect(screen.queryByRole('heading', { name: 'Naming and brand architecture' })).not.toBeInTheDocument();

    const compliance = container.querySelector('#compliance');
    expect(compliance).toBeInTheDocument();
    expect(within(compliance).getByText(/Packaging compliance for food and consumer products/i)).toBeInTheDocument();
    expect(within(compliance).getByText(/FSSAI labelling/i)).toBeInTheDocument();
    expect(within(compliance).getByText(/Regulated legal opinions stay with qualified advisers/i)).toBeInTheDocument();

    expect(compliance.querySelector('.service-detail-grid')).not.toBeInTheDocument();

    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(7);
    expect(container.textContent).not.toMatch(/4 to 8 weeks|8 to 12 weeks|six of our own food SKUs|trademark searches|legal clearance|across India, mostly remotely/i);
    expectNoUnapprovedCommercialClaims(container);
  });
});

describe('Marketing service copy', () => {
  it('renders four capabilities, approved testimonials, and ten FAQs without compliance panel', () => {
    const { container } = render(<Marketing />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(4);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '4');

    // Check 4 capabilities
    for (const title of [
      'Search engine optimisation',
      'Paid campaign management',
      'Analytics and reporting',
      'Content and copywriting',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
      expect(screen.getByText(text)).toBeInTheDocument();
    }

    // No compliance panel on Marketing
    expect(container.querySelector('#compliance')).not.toBeInTheDocument();

    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(10);
    expectNoUnapprovedCommercialClaims(container);
  });
});

describe('E-commerce service copy', () => {
  it('renders four capabilities, five-item marketplace compliance, and ten approved FAQs', () => {
    const { container } = render(<Ecommerce />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(4);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '4');

    // Check 4 capabilities
    for (const title of [
      'Store setup and build',
      'Conversion rate optimisation',
      'Marketplace and multi-channel selling',
      'Payments and delivery setup',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
      expect(screen.getByText(text)).toBeInTheDocument();
    }
    expect(screen.queryByRole('heading', { name: 'Catalogue and product content' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Payments and delivery setup' })).not.toBeInTheDocument();
    expect(screen.getByText('Four connected areas, scoped to the selected platform, channels and operating responsibilities.')).toBeInTheDocument();

    const compliance = container.querySelector('#compliance');
    expect(compliance).toBeInTheDocument();
    expect(within(compliance).getByText(/Listing and marketplace compliance/i)).toBeInTheDocument();
    expect(within(compliance).getByText(/Marketplace listing rejections/i)).toBeInTheDocument();

    // Check 5 compliance items
    const complianceItems = compliance.querySelectorAll('.service-detail-grid article');
    expect(complianceItems).toHaveLength(5);
    for (const itemTitle of [
      'Pack and catalogue consistency',
      'Catalogue data preparation',
      'Channel-ready product information',
      'Listing declarations',
      'Marketplace requirements',
    ]) {
      expect(screen.getByText(question)).toBeInTheDocument();
    }
    expect(container.textContent).not.toMatch(/4 to 6 weeks|8 to 16 weeks|few hundred SKUs|monthly retainers|Razorpay|Cashfree|PhonePe|guarantee|guaranteed|legal clearance|launches? (?:in|within)|without a developer/i);
    expectNoUnapprovedCommercialClaims(container);
  });
});
