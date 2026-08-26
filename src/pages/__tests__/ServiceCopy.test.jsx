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
  it('renders four approved capabilities, prose-led packaging compliance, and safe FAQs', () => {
    const { container } = render(<Branding />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(4);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '4');

    expect(screen.getByText('Positioning, identity, packaging and voice, developed as one practical brand system.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'A brand system your team can use' })).toBeInTheDocument();
    expect(screen.getByText(/We bring positioning, identity, packaging and messaging into one clear system\./i)).toBeInTheDocument();

    for (const title of [
      'Brand positioning and strategy',
      'Visual identity system',
      'Packaging design and production',
      'Brand voice and messaging',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    expect(screen.queryByRole('heading', { name: 'Naming and brand architecture' })).not.toBeInTheDocument();

    const compliance = container.querySelector('#compliance');
    expect(compliance).toBeInTheDocument();
    expect(within(compliance).getByText(/Packaging compliance for food and consumer products/i)).toBeInTheDocument();
    expect(within(compliance).getByText(/For packaged products, required information needs to be considered while the artwork is being developed\./i)).toBeInTheDocument();
    expect(within(compliance).getByText(/Regulated legal opinions stay with qualified advisers/i)).toBeInTheDocument();

    expect(compliance.querySelector('.service-detail-grid')).not.toBeInTheDocument();

    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(7);
    expect(container.textContent).not.toMatch(/4 to 8 weeks|8 to 12 weeks|six of our own food SKUs|trademark searches|legal clearance|across India, mostly remotely/i);
    expectNoUnapprovedCommercialClaims(container);
  });
});

describe('Marketing service copy', () => {
  it('renders four approved capabilities, owned proof, three engagement shapes, and safe FAQs without compliance panel', () => {
    const { container } = render(<Marketing />);

    expect(container.querySelectorAll('article.offer-entry')).toHaveLength(4);
    expect(container.querySelector('.offers-grid')).toHaveAttribute('data-count', '4');
    expect(container.querySelectorAll('.offer-entry .offer-number')).toHaveLength(0);

    expect(screen.getByText('Search, paid media, content and reporting, planned around measures agreed before work begins.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Marketing with measures you can review' })).toBeInTheDocument();
    expect(screen.getByText('We begin by understanding where traffic comes from, what is already being measured and what a useful result would look like. The agreed plan then defines the channels, responsibilities and reporting cadence. Because we also work on an owned consumer brand, we approach channel decisions with the same care we expect when spending our own budget.')).toBeInTheDocument();

    for (const [title, text] of [
      [
        'Search engine optimisation',
        'Review technical foundations, search intent, page structure and internal links, then prioritise improvements against the agreed audience and business goals.',
      ],
      [
        'Paid campaign management',
        'Plan and manage agreed search, social or marketplace campaigns, with account ownership, budgets and review measures made clear before activity begins.',
      ],
      [
        'Analytics and reporting',
        'Check that agreed actions can be measured, keep definitions consistent and report what changed, what it may mean and what to review next.',
      ],
      [
        'Content and copywriting',
        'Develop landing pages, articles, product copy and campaign messages around the audience, channel and approved brand voice.',
      ],
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
      expect(screen.getByText(text)).toBeInTheDocument();
    }

    expect(screen.getByRole('heading', { name: 'What Raw Radicles teaches us about marketing operations' })).toBeInTheDocument();
    for (const heading of ['Audit and plan', 'Monthly programme', 'Launch sprint']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }

    // No compliance panel on Marketing
    expect(container.querySelector('#compliance')).not.toBeInTheDocument();

    expect(screen.getByText('A focused channel mix, selected around the evidence, budget and responsibilities agreed for the engagement.')).toBeInTheDocument();

    expect(container.querySelectorAll('.faq-list .faq-item')).toHaveLength(7);
    for (const question of [
      'How is scope defined?',
      'How are the measures chosen?',
      'Can you guarantee marketing results?',
      'Who owns the advertising accounts?',
      'Can you work with our existing team or agency?',
      'What do we need to provide?',
      'How do review and reporting work?',
    ]) {
      expect(screen.getByText(question)).toBeInTheDocument();
    }
    expect(screen.getByText(/No\. We can agree the work, measures and review process/i)).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/8 to 12 weeks|6 to 9 months|three months|minimum (?:commitment|retainer)|organic rankings?|sales volume|ROAS|commercial measure|across Karnataka|across India|promising faster|buying links|wrong metric/i);
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
