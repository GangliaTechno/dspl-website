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
  it('renders five capabilities, five-item packaging compliance, and ten approved FAQs', () => {
    const { container } = render(<Branding />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(5);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '5');

    // Check 5 capabilities
    for (const title of [
      'Brand positioning and strategy',
      'Naming and brand architecture',
      'Visual identity system',
      'Brand voice and messaging',
      'Packaging design and production',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }

    const compliance = container.querySelector('#compliance');
    expect(compliance).toBeInTheDocument();
    expect(within(compliance).getByText(/Packaging compliance for food and consumer products/i)).toBeInTheDocument();
    expect(within(compliance).getByText(/FSSAI regulations/i)).toBeInTheDocument();
    expect(within(compliance).getByText(/Regulated legal opinions stay with qualified advisers/i)).toBeInTheDocument();

    // Check 5 compliance items
    const complianceItems = compliance.querySelectorAll('.service-detail-grid article');
    expect(complianceItems).toHaveLength(5);
    for (const itemTitle of [
      'Label content preparation',
      'Mandatory declarations',
      'Declaration placement',
      'Artwork and revision coordination',
      'Print-to-marketplace consistency',
    ]) {
      expect(within(compliance).getByRole('heading', { name: itemTitle })).toBeInTheDocument();
    }

    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(10);
    expectNoUnapprovedCommercialClaims(container);
  });
});

describe('Marketing service copy', () => {
  it('renders five capabilities, owned proof, three engagement shapes, and ten FAQs without compliance panel', () => {
    const { container } = render(<Marketing />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(5);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '5');

    // Check 5 capabilities
    for (const title of [
      'Audience and market planning',
      'Search engine optimisation',
      'Paid campaign management',
      'Content and copywriting',
      'Analytics and reporting',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }

    expect(screen.getByRole('heading', { name: 'What Raw Radicles teaches us about marketing operations' })).toBeInTheDocument();
    for (const heading of ['Audit and plan', 'Monthly programme', 'Launch sprint']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }

    // No compliance panel on Marketing
    expect(container.querySelector('#compliance')).not.toBeInTheDocument();

    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(10);
    expect(screen.getByText(/Three months for retained work/i)).toBeInTheDocument();
    expectNoUnapprovedCommercialClaims(container);
  });
});

describe('E-commerce service copy', () => {
  it('renders five capabilities, five-item marketplace compliance, and ten approved FAQs', () => {
    const { container } = render(<Ecommerce />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(5);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '5');

    // Check 5 capabilities
    for (const title of [
      'Store setup and build',
      'Catalogue and product content',
      'Conversion rate optimisation',
      'Marketplace and multi-channel selling',
      'Payments and delivery setup',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }

    const compliance = container.querySelector('#compliance');
    expect(compliance).toBeInTheDocument();
    expect(within(compliance).getByText(/Listing and marketplace compliance/i)).toBeInTheDocument();
    expect(within(compliance).getByText(/Marketplace listing rejections/i)).toBeInTheDocument();
    expect(within(compliance).getByText(/Regulated legal opinions stay with qualified advisers/i)).toBeInTheDocument();

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
      expect(within(compliance).getByRole('heading', { name: itemTitle })).toBeInTheDocument();
    }

    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(10);
    expectNoUnapprovedCommercialClaims(container);
  });
});
