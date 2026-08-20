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
};

describe('Branding service copy', () => {
  it('renders five capabilities, compliance coordination, and five approved FAQs', () => {
    const { container } = render(<Branding />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(5);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '5');
    const compliance = container.querySelector('#compliance');
    expect(compliance.querySelector('.service-detail-grid')).toHaveAttribute('data-count', '5');
    expect(compliance).toBeInTheDocument();
    for (const text of [
      /Food Safety and Standards \(Labelling and Display\) Regulations, 2020/i,
      /Legal Metrology \(Packaged Commodities\) Rules, 2011/i,
      /claims review/i,
      /trademark coordination/i,
      /barcode and GTIN/i,
    ]) {
      expect(within(compliance).getAllByText(text).length).toBeGreaterThan(0);
    }
    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(5);
    expectNoUnapprovedCommercialClaims(container);
  });
});

describe('Marketing service copy', () => {
  it('renders English-only scope, owned proof, three engagement shapes, and five FAQs', () => {
    const { container } = render(<Marketing />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(5);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '5');
    expect(screen.getByText(/content is currently scoped in English/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What Raw Radicles teaches us about marketing operations' })).toBeInTheDocument();
    for (const heading of ['Audit and plan', 'Monthly programme', 'Launch sprint']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }
    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(5);
    expect(screen.getByText(/cannot guarantee rankings, leads, or sales/i)).toBeInTheDocument();
    expect(screen.getByText(/minimum initial commitment of three months/i)).toBeInTheDocument();
    expectNoUnapprovedCommercialClaims(container);
  });
});

describe('E-commerce service copy', () => {
  it('renders six capabilities, commerce compliance, and five approved FAQs', () => {
    const { container } = render(<Ecommerce />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(6);
    const compliance = container.querySelector('#compliance');
    expect(compliance.querySelector('.service-detail-grid')).toHaveAttribute('data-count', '6');
    for (const text of [
      /GST configuration/i,
      /HSN mapping/i,
      /settlement reconciliation/i,
      /e-way-bill process/i,
      /returns policies/i,
      /listing declarations/i,
      /qualified advisers/i,
    ]) {
      expect(within(compliance).getAllByText(text).length).toBeGreaterThan(0);
    }
    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(5);
    expectNoUnapprovedCommercialClaims(container);
  });
});
