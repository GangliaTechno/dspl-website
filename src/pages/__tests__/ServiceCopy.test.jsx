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
  it('renders four capabilities, packaging compliance, and ten approved FAQs', () => {
    const { container } = render(<Branding />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(4);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '4');
    const compliance = container.querySelector('#compliance');
    expect(compliance).toBeInTheDocument();
    expect(within(compliance).getByText(/Packaging compliance for food and consumer products/i)).toBeInTheDocument();
    expect(within(compliance).getByText(/FSSAI regulations/i)).toBeInTheDocument();
    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(10);
    expectNoUnapprovedCommercialClaims(container);
  });
});

describe('Marketing service copy', () => {
  it('renders four capabilities, owned proof, three engagement shapes, and ten FAQs', () => {
    const { container } = render(<Marketing />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(4);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '4');
    expect(screen.getByRole('heading', { name: 'What Raw Radicles teaches us about marketing operations' })).toBeInTheDocument();
    for (const heading of ['Audit and plan', 'Monthly programme', 'Launch sprint']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }
    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(10);
    expect(screen.getByText(/Three months for retained work/i)).toBeInTheDocument();
    expectNoUnapprovedCommercialClaims(container);
  });
});

describe('E-commerce service copy', () => {
  it('renders four capabilities, marketplace compliance, and ten approved FAQs', () => {
    const { container } = render(<Ecommerce />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(4);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '4');
    const compliance = container.querySelector('#compliance');
    expect(compliance).toBeInTheDocument();
    expect(within(compliance).getByText(/Listing and marketplace compliance/i)).toBeInTheDocument();
    expect(within(compliance).getByText(/Marketplace listing rejections/i)).toBeInTheDocument();
    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(10);
    expectNoUnapprovedCommercialClaims(container);
  });
});
